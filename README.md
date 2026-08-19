# 7BYTE Content

7BYTE 的内容生产、镜头设计与程序化动画仓库。

这个仓库不是单纯的“脚本仓库”，而是三样东西的集合：

1. **长期 AI 工作上下文**：让后续 GPT/Agent 知道 7BYTE 的视觉、节奏、技术和工作方式。
2. **每期独立创作单元**：每个 episode 自己保存选题、口播、分镜、设计理念、动画规格和源码。
3. **可复用 Motion Design System**：把 Motion Canvas、程序化 UI、图标、镜头节奏等沉淀成 skills。

## 本地预览

```bash
npm install
npm run dev
```

然后打开 Vite 输出的本地地址。Motion Canvas 会在浏览器里提供实时预览/编辑界面；当仓库有多期视频时，会显示项目选择页。

## 当前 episode

- `episodes/001-what-happens-after-entering-baidu/` — 输入 `baidu.com` 后发生了什么？

## 原则

- 动画优先使用 **Motion Canvas**，不把“裸 HTML/CSS 炫技”当默认方案。
- 借鉴 Remotion Prompt-to-Motion-Graphics 的 **skills / constants-first / sequencing** 思路，但不强依赖 Remotion。
- UI 默认优先程序化复现；只有真实界面本身能明显增加可信度时才录屏。
- 真实录屏可用 OBS，最后剪辑/字幕/口播在剪映完成。
- 每一帧的运动都应该帮助观众理解，不为“科技感”而动。
