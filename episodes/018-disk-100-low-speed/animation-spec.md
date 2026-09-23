# Animation Spec — Disk 100%

- 画布 `1920×1080 / 60fps`。
- 最终 TTS WordBoundary 为唯一时间轴。
- Shot 1 第一稳定帧完整显示 `ACTIVE TIME 100%`、`TRANSFER 3.2 MB/s`、`100% ≠ 跑满带宽`。
- Hook 数字不做逐字 reveal；第一帧即完整可读。
- Shot 2 只用概念化 I/O blocks 表示持续忙碌，不伪造具体硬盘型号或基准数据。
- Shot 3 必须在第 11 秒前进入，并明确 `Ctrl + Shift + Esc` 与 `DISK ↓`。
- Shot 4 只做“短时峰值 vs 持续异常”的判断，不新增技术故事。
- 切镜前旧 shot opacity 归零，再显示新 shot；无跨 shot 残影。
- canonical header 仅在最终 composite 中 overlay；scene 内仅固定 watermark。
- 品牌句 cue 起点 == body end == canonical horizontal outro 起点。
