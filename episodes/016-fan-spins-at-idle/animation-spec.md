# Animation Spec — 空桌面但风扇高速

- 画布 `1920×1080 / 60fps`；字幕保留带不承载关键信息。
- 最终 TTS timing 为唯一时间轴。
- Shot 1 第一稳定帧完整出现 `NO APP WINDOWS / CPU ↑ / FAN HIGH RPM / 没窗口 ≠ 没任务`，不能依赖逐字动画理解。
- Shot 1 → Shot 2 必须在“没窗口，不等于CPU没任务”结束时切换，目标早于第 6 秒。
- Shot 2 的后台任务只是事实示例，不显示伪造的精确 CPU 百分比；只使用 activity bar。
- Shot 3 明确展示 `Ctrl + Shift + Esc` 与 `CPU ↓` 排序关系；不要引导直接结束系统进程。
- Shot 4 做两种情境卡片，不增加新的技术故事。
- 切镜前旧 shot opacity 归零，再显示新 shot；无跨 shot 残影。
- canonical header 只在最终 composite 中 overlay；scene 内仅保留固定 watermark。
- 品牌句 cue 起点 == body end == canonical horizontal outro 起点。
