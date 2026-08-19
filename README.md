# 7BYTE Content

7BYTE 的内容生产、镜头设计与程序化动画仓库。

这个仓库不是单纯的“脚本仓库”，而是三样东西的集合：

1. **长期 AI 工作上下文**：让后续 GPT/Agent 只读取 `main` 就能恢复 7BYTE 的视觉、节奏、技术和工作方式。
2. **每期独立创作单元**：每个 episode 保存选题、口播、分镜、设计理念、动画规格、源码与发布记录。
3. **可复用 Motion Design System**：把 Motion Canvas、程序化 UI、镜头连续性、字幕、封面与视觉 QA 经验沉淀成 skills。

## AI / Agent 从这里开始

开始新一期前，先读取 `AGENTS.md`，并按其中顺序读取：

- `shared/brand/production-workflow.md`
- `skills/README.md`
- `skills/layout-safety.md`
- `skills/auto-subtitles.md`
- `skills/shot-design.md`
- `skills/cover-design.md`
- 上一期的 `design-notes.md` / `publish.md`（需要复用经验时）

**`main` 是唯一默认工作基线。** 不要依赖历史 preview / render 分支恢复上下文。

## 当前 episode

- `episodes/001-what-happens-after-entering-baidu/` — 输入 `baidu.com` 后发生了什么？
- `episodes/002-wifi-full-signal/` — Wi-Fi 满格，为什么还是上不了网？（V21 Refined）
- `episodes/003-bandwidth-vs-download-speed/` — 1000M 宽带，为什么下载只有 100MB/s？（Final Review）
- 下一期继续从 `episodes/_template/` 创建，不从旧 episode 复制历史版本文件。

## 本地预览

```bash
npm install
npm run dev
```

然后打开 Vite 输出的本地地址。Motion Canvas 会在浏览器里提供实时预览/编辑界面；当仓库有多期视频时，会显示项目选择页。

## 固定原则

- 动画优先使用 **Motion Canvas**。
- 关系型 / 链路型 / 对比型内容默认 **1920×1080 / 16:9 / 60fps**。
- UI 默认优先程序化复现；只有真实界面明显增加可信度时才录屏。
- 每个动作都必须帮助观众理解，不为“科技感”而动。
- 同一语义对象跨镜头时遵守 owner / lifecycle / matched-geometry 规则，禁止视觉残留。
- 最终视频必须经过关键帧视觉审计；Build/CI 成功不等于视觉通过。
- 每期同时产出 **3:4 竖封面 + 4:3 横封面**，两张必须分别排版、分别审计。
- canonical 片尾只复用，不重绘。
- GitHub 保存源码、规则与发布记录；ChatGPT Library 每期长期只保留 `final.mp4 + 两张封面`。
