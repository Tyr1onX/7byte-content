# Animation Spec — 合盖、睡眠与 Modern Standby

- 画布 `1920×1080 / 60fps`；完整画布 root，主要内容保持在 `y=-360..300`，字幕保留带不进入主视觉。
- 最终 TTS timing 为唯一时间轴；每个 phase 使用 `all(waitFor(phase), animations)` 或等价固定总时长结构。
- Shot 1：第一帧完整显示合盖笔记本、背包、电量下降与温度上升结果；0.7 秒后仅局部强调，不依赖逐字动画建立 Hook。
- Shot 2：稳定展示 `S0 LOW POWER IDLE`，三个小事件 `NETWORK / MAINTENANCE / DEVICE` 只做短暂 pulse，避免误导成持续高负载。
- Shot 3：正常路径以大部分时间静默的低功耗条表示，只有少量短脉冲。
- Shot 4：左右对照；左侧 `LOW POWER`，右侧 `BLOCKED`。右侧 blocker 只列 `DRIVER / DEVICE / TASK`，不把任何一个设为唯一原因。
- Shot 5：`RAM → hiberfil.sys → S4`，并给出 `短暂停用：睡眠 / 长时间携带：休眠` 的行动结论。
- 每个 shot root 初始显隐明确；切镜前旧 shot opacity 先归零，再显示新 shot。无跨 shot proxy。
- 所有卡片使用显式 layout；不使用手工悬空 connector。
- canonical header 只在最终 composite 中 overlay；scene 内只画固定 watermark。
- 品牌句 cue 起点 == body end == canonical horizontal outro 起点。
