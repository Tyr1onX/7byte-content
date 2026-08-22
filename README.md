# 7BYTE Content

7BYTE 的内容生产、镜头设计与程序化动画仓库。

这个仓库同时保存长期 AI 工作上下文、每期独立创作单元，以及可复用的 Motion Design / Production System。

## AI / Agent 从这里开始

开始新一期前先读取 `AGENTS.md`，并按其中顺序读取品牌、workflow、skills 和上一期复盘。

**`main` 是唯一默认工作基线。** 不依赖历史 preview / render / trigger 分支恢复上下文。

## 当前 episode

- `episodes/001-what-happens-after-entering-baidu/` — 输入 `baidu.com` 后发生了什么？
- `episodes/002-wifi-full-signal/` — Wi-Fi 满格，为什么还是上不了网？（V21 Refined）
- `episodes/003-bandwidth-vs-download-speed/` — 1000M 宽带，为什么下载只有 100MB/s？（V5 Brand Gold / Final）
- `episodes/004-500gb-vs-465gb/` — 500GB 硬盘，为什么电脑只显示 465GB？（制作中；实验 5–20 秒中段留存）
- 下一期继续从 `episodes/_template/` 创建，不从旧 episode 复制历史版本文件。

## 本地预览

```bash
npm install
npm run dev
```

## 固定原则

- 主动画框架：Motion Canvas。
- 关系 / 链路 / 对比型解释默认 `1920×1080 / 16:9 / 60fps`。
- UI 默认程序化复现；真实 UI 只有明显增加可信度时才录屏。
- 动作必须帮助解释，不为科技感而动。
- 所有 UI 容器内部对齐显式声明并通过抽帧检查。
- 最终视频必须视觉审计；Build/CI 成功不等于视觉通过。
- 每期同时产出 3:4 竖封面 + 4:3 横封面。
- **横版品牌层固定复用**：EP002 云端最终成片是唯一金标；水印、左上角 canonical header、横版 canonical outro 不逐期重画。
- GitHub 保存源码、规则与发布记录；ChatGPT Library 每期长期只保留 `final.mp4 + 两张封面`，品牌 Library 单独保存固定 canonical 资产。
