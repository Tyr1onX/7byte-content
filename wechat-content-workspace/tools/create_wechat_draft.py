#!/usr/bin/env python3
"""Create a WeChat Official Account draft from one Markdown article.

This script intentionally stops at draft creation. Final publish / scheduled mass send
stays manual in the WeChat backend.

Flow:
1. Get access_token from env or AppID/AppSecret.
2. Upload local Markdown images to the article-image endpoint and replace them with
   WeChat-hosted image URLs.
3. Upload cover as a permanent image material, or reuse WECHAT_MP_COVER_MEDIA_ID.
4. Create one draft with /cgi-bin/draft/add.
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
DRY_RUN_COVER_MEDIA_ID = "DRY_RUN_COVER_MEDIA_ID"
DRY_RUN_IMAGE_URL = "https://mmbiz.qpic.cn/dry-run-image"


class WeChatError(RuntimeError):
    """Raised when WeChat returns an API error."""


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
        meta[key.strip()] = value.strip().strip('"').strip("'")
    return meta, markdown[end + 5 :].lstrip()


def make_digest(text: str, limit: int = 120) -> str:
    plain = re.sub(r"!\[[^\]]*]\([^)]+\)", "", text)
    plain = re.sub(r"#+\s*", "", plain)
    plain = re.sub(r"\*\*(.+?)\*\*", r"\1", plain)
    plain = re.sub(r"\s+", " ", plain).strip()
    return plain[:limit]


def inline_markdown(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)
    return escaped


def resolve_image_path(article_path: Path, image_ref: str) -> Path | None:
    parsed = urllib.parse.urlparse(image_ref)
    if parsed.scheme or image_ref.startswith("//"):
        return None
    return (article_path.parent / urllib.parse.unquote(image_ref)).resolve()


def markdown_to_html(
    markdown: str,
    article_path: Path,
    uploaded_images: dict[str, str],
) -> str:
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

    def image_html(markdown_image: re.Match[str]) -> str:
        alt = html.escape(markdown_image.group(1))
        image_ref = markdown_image.group(2).strip()
        src = uploaded_images.get(image_ref, image_ref)
        return f'<img src="{html.escape(src)}" alt="{alt}" />'

    def inline(text: str) -> str:
        replaced = re.sub(r"!\[([^\]]*)]\(([^)]+)\)", image_html, text)
        return inline_markdown(replaced)

    for raw in lines:
        line = raw.strip()
        if not line:
            flush_lists()
            continue

        image_only = re.fullmatch(r"!\[([^\]]*)]\(([^)]+)\)", line)
        if image_only:
            flush_lists()
            blocks.append(image_html(image_only))
        elif line.startswith("# "):
            flush_lists()
            blocks.append(f"<h1>{inline(line[2:].strip())}</h1>")
        elif line.startswith("## "):
            flush_lists()
            blocks.append(f"<h2>{inline(line[3:].strip())}</h2>")
        elif line.startswith("- "):
            ordered_items = []
            list_items.append(f"<li>{inline(line[2:].strip())}</li>")
        elif re.match(r"^\d+\.\s+", line):
            list_items = []
            item = re.sub(r"^\d+\.\s+", "", line)
            ordered_items.append(f"<li>{inline(item)}</li>")
        else:
            flush_lists()
            blocks.append(f"<p>{inline(line)}</p>")

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
    if not file_path.exists():
        raise FileNotFoundError(file_path)

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
        raise WeChatError(f"{action} failed: {json.dumps(result, ensure_ascii=False)}")


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


def find_local_markdown_images(article_path: Path, body: str) -> dict[str, Path]:
    images: dict[str, Path] = {}
    for image_ref in re.findall(r"!\[[^\]]*]\(([^)]+)\)", body):
        local_path = resolve_image_path(article_path, image_ref.strip())
        if local_path is not None:
            images[image_ref.strip()] = local_path
    return images


def upload_article_image(access_token: str, image_path: Path) -> str:
    query = urllib.parse.urlencode({"access_token": access_token})
    result = post_multipart(f"{API_BASE}/media/uploadimg?{query}", "media", image_path)
    assert_wechat_ok(result, "upload_article_image")
    if "url" not in result:
        raise WeChatError(f"upload_article_image missing url: {json.dumps(result, ensure_ascii=False)}")
    return result["url"]


def upload_article_images(
    access_token: str,
    article_path: Path,
    body: str,
    *,
    dry_run: bool,
) -> dict[str, str]:
    uploaded: dict[str, str] = {}
    for image_ref, image_path in find_local_markdown_images(article_path, body).items():
        if dry_run:
            uploaded[image_ref] = DRY_RUN_IMAGE_URL
        else:
            uploaded[image_ref] = upload_article_image(access_token, image_path)
    return uploaded


def create_draft(access_token: str, article: dict[str, Any]) -> dict[str, Any]:
    result = post_json(f"{API_BASE}/draft/add?access_token={access_token}", {"articles": [article]})
    assert_wechat_ok(result, "create_draft")
    return result


def validate_article(article: dict[str, Any]) -> None:
    title = str(article.get("title", ""))
    author = str(article.get("author", ""))
    digest = str(article.get("digest", ""))
    content = str(article.get("content", ""))

    if not title:
        raise ValueError("title is required")
    if len(author) > 16:
        raise ValueError("author must be <= 16 characters")
    if len(digest) > 120:
        raise ValueError("digest must be <= 120 characters")
    if not content:
        raise ValueError("content is required")
    if len(content.encode("utf-8")) > 1024 * 1024:
        raise ValueError("content must be <= 1 MiB")


def build_article(
    workspace: Path,
    article_path: Path,
    cover_media_id: str,
    digest: str | None,
    uploaded_images: dict[str, str],
) -> dict[str, Any]:
    config = load_config(workspace)
    markdown = read_text(article_path)
    meta, body = parse_frontmatter(markdown)
    content_html = render_template(workspace, markdown_to_html(body, article_path, uploaded_images))

    defaults = config.get("wechat_draft_defaults", {})
    account = config.get("account", {})

    title = meta.get("title") or article_path.stem
    author = meta.get("author") or account.get("author", "")

    article = {
        "title": title,
        "author": author,
        "digest": digest or meta.get("digest") or make_digest(body),
        "content": content_html,
        "content_source_url": defaults.get("content_source_url", ""),
        "thumb_media_id": cover_media_id,
        "show_cover_pic": int(defaults.get("show_cover_pic", 0)),
        "need_open_comment": int(defaults.get("need_open_comment", 0)),
        "only_fans_can_comment": int(defaults.get("only_fans_can_comment", 0)),
    }
    validate_article(article)
    return article


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("article", type=Path)
    parser.add_argument("--workspace", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--cover", type=Path)
    parser.add_argument("--digest")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    markdown = read_text(args.article)
    _, body = parse_frontmatter(markdown)

    if args.dry_run:
        uploaded_images = upload_article_images("", args.article, body, dry_run=True)
        article = build_article(
            args.workspace,
            args.article,
            DRY_RUN_COVER_MEDIA_ID,
            args.digest,
            uploaded_images,
        )
        print(json.dumps({"articles": [article]}, ensure_ascii=False, indent=2))
        return 0

    access_token = get_access_token()
    uploaded_images = upload_article_images(access_token, args.article, body, dry_run=False)
    cover_media_id = upload_cover(access_token, args.cover)
    article = build_article(args.workspace, args.article, cover_media_id, args.digest, uploaded_images)
    result = create_draft(access_token, article)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
