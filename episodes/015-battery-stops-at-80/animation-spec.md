# Animation Spec — 插电但停在 80%

- 画布 `1920×1080 / 60fps`；主视觉约 `y=-360..300`，字幕保留带不承载关键信息。
- 最终 TTS timing 为唯一时间轴；每个 phase 总时长固定。
- Shot 1 第一稳定帧必须完整出现 `PLUGGED IN ✓ / 80% / NOT CHARGING / 不一定是坏了`，不能依赖逐字动画才能理解。
- Shot 2 使用明确的 0–100 充电上限尺，`80% LIMIT` 为强调色；不把 80% 描述为所有设备固定标准。
- Shot 3 三种策略并列，仅表达厂商实现差异，不模拟真实品牌 UI。
- Shot 4 两个行动卡并列：短期需要续航与长期插电分别处理。
- 切镜前旧 shot opacity 归零，再显示新 shot；无跨 shot 残影。
- canonical header 只在最终 composite 中 overlay；scene 内仅保留固定 watermark。
- 品牌句 cue 起点 == body end == canonical horizontal outro 起点。
