#!/usr/bin/env python3
"""Create a WeChat Official Account draft from one Markdown article.

This script intentionally stops at draft creation. Final publish / scheduled mass send
stays manual in the WeChat backend.
"""

from __future__ import annotations

import argparse
import html
import json
import mimetypes
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

API_BASE = "https://api.weixin.qq.com/cgi-bin"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def load_config(workspace: Path) -> dict[str, Any]:
    config_path = workspace / "config.json"
    if not config_path.exists():
        return {}
    return json.loads(read_text(config_path))


def parse_frontmatter(markdown: str) -> tuple[dict[str, str], str]:
    if not markdown.startswith("---\n"):
        return {}, markdown
    end = markdown.find("\n---\n", 4)
    if end == -1:
        return {}, markdown

    meta: dict[str, str] = {}
    for line in markdown[4:end].splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip()
    return meta, markdown[end + 5 :].lstrip()


def inline_markdown(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)
    return escaped


def markdown_to_html(markdown: str) -> str:
    lines = markdown.splitlines()
    blocks: list[str] = []
    list_items: list[str] = []
    ordered_items: list[str] = []

    def flush_lists() -> None:
        nonlocal list_items, ordered_items
        if list_items:
            blocks.append("<ul>" + "".join(list_items) + "</ul>")
            list_items = []
        if ordered_items:
            blocks.append("<ol>" + "".join(ordered_items) + "</ol>")
            ordered_items = []

    for raw in lines:
        line = raw.strip()
        if not line:
            flush_lists()
            continue

        if line.startswith("# "):
            flush_lists()
            blocks.append(f"<h1>{inline_markdown(line[2:].strip())}</h1>")
        elif line.startswith("## "):
            flush_lists()
            blocks.append(f"<h2>{inline_markdown(line[3:].strip())}</h2>")
        elif line.startswith("- "):
            ordered_items = []
            list_items.append(f"<li>{inline_markdown(line[2:].strip())}</li>")
        elif re.match(r"^\d+\.\s+", line):
            list_items = []
            item = re.sub(r"^\d+\.\s+", "", line)
            ordered_items.append(f"<li>{inline_markdown(item)}</li>")
        else:
            flush_lists()
            blocks.append(f"<p>{inline_markdown(line)}</p>")

    flush_lists()
    return "\n".join(blocks)


def render_template(workspace: Path, content_html: str) -> str:
    template_path = workspace / "templates" / "article.html"
    if not template_path.exists():
        return content_html
    return read_text(template_path).replace("{{ content }}", content_html)


def post_json(url: str, payload: dict[str, Any]) -> dict[str, Any]:
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def post_multipart(url: str, field_name: str, file_path: Path) -> dict[str, Any]:
    boundary = "----wenzhou-boundary"
    mime = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
    file_bytes = file_path.read_bytes()
    body = b"".join(
        [
            f"--{boundary}\r\n".encode(),
            f'Content-Disposition: form-data; name="{field_name}"; filename="{file_path.name}"\r\n'.encode(),
            f"Content-Type: {mime}\r\n\r\n".encode(),
            file_bytes,
            f"\r\n--{boundary}--\r\n".encode(),
        ]
    )
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return json.loads(response.read().decode("utf-8"))


def assert_wechat_ok(result: dict[str, Any], action: str) -> None:
    errcode = result.get("errcode", 0)
    if errcode not in (0, None):
        raise RuntimeError(f"{action} failed: {json.dumps(result, ensure_ascii=False)}")


def get_access_token() -> str:
    existing = os.getenv("WECHAT_MP_ACCESS_TOKEN")
    if existing:
        return existing

    appid = os.getenv("WECHAT_MP_APPID")
    secret = os.getenv("WECHAT_MP_APPSECRET")
    if not appid or not secret:
        raise RuntimeError("Missing WECHAT_MP_ACCESS_TOKEN or WECHAT_MP_APPID/WECHAT_MP_APPSECRET")

    query = urllib.parse.urlencode(
        {"grant_type": "client_credential", "appid": appid, "secret": secret}
    )
    with urllib.request.urlopen(f"{API_BASE}/token?{query}", timeout=30) as response:
        result = json.loads(response.read().decode("utf-8"))
    assert_wechat_ok(result, "get_access_token")
    return result["access_token"]


def upload_cover(access_token: str, cover: Path | None) -> str:
    existing = os.getenv("WECHAT_MP_COVER_MEDIA_ID")
    if existing:
        return existing
    if cover is None:
        raise RuntimeError("Missing cover image. Pass --cover or set WECHAT_MP_COVER_MEDIA_ID")

    query = urllib.parse.urlencode({"access_token": access_token, "type": "image"})
    result = post_multipart(f"{API_BASE}/material/add_material?{query}", "media", cover)
    assert_wechat_ok(result, "upload_cover")
    return result["media_id"]


def create_draft(access_token: str, article: dict[str, Any]) -> dict[str, Any]:
    result = post_json(f"{API_BASE}/draft/add?access_token={access_token}", {"articles": [article]})
    assert_wechat_ok(result, "create_draft")
    return result


def build_article(workspace: Path, article_path: Path, cover_media_id: str, digest: str | None) -> dict[str, Any]:
    config = load_config(workspace)
    markdown = read_text(article_path)
    meta, body = parse_frontmatter(markdown)
    content_html = render_template(workspace, markdown_to_html(body))

    defaults = config.get("wechat_draft_defaults", {})
    account = config.get("account", {})

    title = meta.get("title") or article_path.stem
    author = meta.get("author") or account.get("author", "")

    return {
        "title": title,
        "author": author,
        "digest": digest or body.replace("\n", " ")[:120],
        "content": content_html,
        "content_source_url": defaults.get("content_source_url", ""),
        "thumb_media_id": cover_media_id,
        "show_cover_pic": defaults.get("show_cover_pic", 0),
        "need_open_comment": defaults.get("need_open_comment", 0),
        "only_fans_can_comment": defaults.get("only_fans_can_comment", 0),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("article", type=Path)
    parser.add_argument("--workspace", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--cover", type=Path)
    parser.add_argument("--digest")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if args.dry_run:
        article = build_article(args.workspace, args.article, "DRY_RUN_COVER_MEDIA_ID", args.digest)
        print(json.dumps({"articles": [article]}, ensure_ascii=False, indent=2))
        return 0

    access_token = get_access_token()
    cover_media_id = upload_cover(access_token, args.cover)
    article = build_article(args.workspace, args.article, cover_media_id, args.digest)
    result = create_draft(access_token, article)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
