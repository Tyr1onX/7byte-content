import importlib.util
import tempfile
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).with_name("create_wechat_draft.py")
spec = importlib.util.spec_from_file_location("create_wechat_draft", MODULE_PATH)
mod = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(mod)


class CreateWechatDraftTest(unittest.TestCase):
    def test_parse_frontmatter(self):
        meta, body = mod.parse_frontmatter("---\ntitle: 标题\nauthor: 一团\n---\n# 正文\n")
        self.assertEqual(meta["title"], "标题")
        self.assertEqual(meta["author"], "一团")
        self.assertEqual(body, "# 正文\n")

    def test_make_digest_removes_markdown(self):
        digest = mod.make_digest("# 标题\n\n![图](a.png)\n\n**重点**内容")
        self.assertEqual(digest, "标题 重点内容")

    def test_dry_run_replaces_local_image(self):
        with tempfile.TemporaryDirectory() as tmp:
            workspace = Path(tmp)
            (workspace / "templates").mkdir()
            (workspace / "templates" / "article.html").write_text("{{ content }}", encoding="utf-8")
            article = workspace / "article.md"
            image = workspace / "a.png"
            image.write_bytes(b"fake")
            article.write_text("---\ntitle: 测试\nauthor: 一团\n---\n# 测试\n\n![图](a.png)\n", encoding="utf-8")

            markdown = article.read_text(encoding="utf-8")
            _, body = mod.parse_frontmatter(markdown)
            uploaded = mod.upload_article_images("", article, body, dry_run=True)
            built = mod.build_article(
                workspace,
                article,
                mod.DRY_RUN_COVER_MEDIA_ID,
                None,
                uploaded,
            )

            self.assertEqual(built["title"], "测试")
            self.assertIn(mod.DRY_RUN_IMAGE_URL, built["content"])


if __name__ == "__main__":
    unittest.main()
