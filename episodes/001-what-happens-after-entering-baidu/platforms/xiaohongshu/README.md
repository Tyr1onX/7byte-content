# EP001 · 小红书适配

选题：**输入 `baidu.com` 后发生了什么？**

状态：**首篇正式图文已定稿，待发布。**

## 上游真源

- 平台无关事实：`../../core.md`
- 小红书长期规则：`../../../../shared/platforms/xiaohongshu.md`
- 外部创作方法：`SpaceZephyr/creator-buddy` → `xhs-Skills`

## 当前文件

- `note.md`：最终标题、正文、话题和备选标题。
- `cards.md`：8 张知识卡的逐页内容与准确性边界。
- `cards.html`：8 张 1080×1440 自包含 HTML，可逐页截图；支持 `?page=1` 到 `?page=8` 单页渲染。
- `publish.md`：最终采用版本、发布前检查与数据验证目标。
- `metrics.md`：发布后再创建，只记录真实后台数据。

## 首发视觉

采用 Vercel-like 黑白高对比方向：纯黑白、大字、少装饰，不引入蓝紫渐变、霓虹 glow 或无意义科技元素。账号名只在首页出现。

## 边界

不要把小红书标题、卡片页数、收藏导向等规则写回 `core.md`。如果发布后得到稳定、可复用的数据结论，再把平台级经验沉淀到 `shared/platforms/xiaohongshu.md`。
