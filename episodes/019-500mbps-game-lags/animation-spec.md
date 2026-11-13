# Animation Spec — 500 Mbps ≠ 低延迟

- 画布 `1920×1080 / 60fps`。
- 最终 TTS WordBoundary 是唯一时间轴。
- Shot 1 第一稳定帧直接完整显示 `DOWNLOAD 500 Mbps`、`PING 180 ms`、`500 Mbps ≠ 低延迟`。
- Hook 数字不做逐字 reveal；只允许轻微状态强调，不延迟信息出现。
- Shot 2 两张指标卡保持固定位置；只用一个简洁 request/response 往返关系辅助 latency，不做复杂网络拓扑。
- Shot 3 四指标一次排开，禁止把 Download 做成唯一主视觉。
- Shot 4 的两张连接卡都保持 `500 Mbps`，只改变 latency/jitter/loss 状态，明确变量。
- 具体 `180 ms` 仅用于示意，画面不写“标准值/危险值”。
- 每次切镜旧 shot opacity 先归零，新 shot 再成为唯一 owner；无 root proxy。
- canonical header 只在最终 composite overlay；scene 内只有固定 watermark。
- 品牌句 cue 起点 == body end == canonical horizontal outro 起点。
