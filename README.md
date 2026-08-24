# 7BYTE Content

7BYTE 的跨平台内容生产仓库。

仓库统一保存：选题与事实母稿、短视频制作、程序化动画、平台适配、发布记录和长期 AI 工作上下文。**一个选题只建一个 episode；不同平台只是同一核心内容的适配层，不再为抖音、小红书、视频号、公众号分别开仓库。**

## AI / Agent 从这里开始

开始工作前先读取 `AGENTS.md`。它是路由器：先判断当前任务属于核心内容、视频、小红书、视频号还是公众号，再只加载对应规则。

**`main` 是唯一默认工作基线。** 不依赖历史 preview / render / trigger 分支恢复上下文。

## 内容模型

```text
一个选题 / episode
├─ core.md / idea.md          # 平台无关：核心问题、事实、边界、观众要记住什么
├─ 视频生产文件               # script / storyboard / animation-spec / src / cover
└─ platforms/                 # 仅在需要时创建
   ├─ xiaohongshu/
   ├─ wechat-channels/
   └─ wechat-official/
```

历史 episode 不强制迁移目录；现有 `idea.md`、`script.md` 等继续有效。新增跨平台版本时，在该 episode 下创建对应 `platforms/<platform>/`，避免平台规则污染核心母稿和其他平台版本。

平台级长期规则统一放在 `shared/platforms/`。

## 当前 episode

- `episodes/001-what-happens-after-entering-baidu/` — 输入 `baidu.com` 后发生了什么？
- `episodes/002-wifi-full-signal/` — Wi-Fi 满格，为什么还是上不了网？（V21 Refined）
- `episodes/003-bandwidth-vs-download-speed/` — 1000M 宽带，为什么下载只有 100MB/s？（V5 Brand Gold / Final）
- `episodes/004-500gb-vs-465gb/` — 500GB 硬盘，为什么电脑只显示 465GB？（制作中；实验 5–20 秒中段留存）
- 下一期继续从 `episodes/_template/` 创建，不从旧 episode 复制历史版本文件。

## 当前平台

- 抖音 / 通用短视频：主视频生产线。
- 小红书：图文知识卡 + 笔记正文，当前处于冷启动测试阶段。
- 微信视频号：预留适配层，账号策略确定后再启用。
- 微信公众号：预留长文层，不要求每个 episode 都同步。

## 本地预览

```bash
npm install
npm run dev
```

## 固定原则

- **核心内容与平台包装分离**：事实、解释链路、知识边界先进入 core；标题、封面、标签、卡片、平台话术进入对应平台目录。
- **按需加载**：做小红书不读 Motion Canvas 全套规则；做视频不读小红书运营规则。
- **一次生产，多端适配**：优先复用选题研究和知识母稿，不强求所有平台使用同一种表达形式。
- 主动画框架：Motion Canvas。
- 关系 / 链路 / 对比型解释默认 `1920×1080 / 16:9 / 60fps`。
- UI 默认程序化复现；真实 UI 只有明显增加可信度时才录屏。
- 动作必须帮助解释，不为科技感而动。
- 所有 UI 容器内部对齐显式声明并通过抽帧检查。
- 最终视频必须视觉审计；Build/CI 成功不等于视觉通过。
- 每期视频同时产出 3:4 竖封面 + 4:3 横封面。
- **横版品牌层固定复用**：EP002 云端最终成片是唯一金标；水印、左上角 canonical header、横版 canonical outro 不逐期重画。
- GitHub 保存源码、规则与发布记录；ChatGPT Library 每期长期只保留 `final.mp4 + 两张封面`，品牌 Library 单独保存固定 canonical 资产。
