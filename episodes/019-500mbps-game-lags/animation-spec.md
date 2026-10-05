# Animation Spec — 500 Mbps ≠ low latency

- 画布 `1920×1080 / 60fps`。
- 最终 TTS WordBoundary 是唯一时间轴 source of truth。
- Shot 1 第一稳定帧完整显示 `DOWNLOAD 512 Mbps`、`PING 180 ms`、`500M ≠ 低延迟`。
- Hook 不做逐字/逐数字 reveal。
- Shot 2 两个指标保持空间稳定：左吞吐量、右往返延迟；不把两者做成同一进度条。
- Shot 3 必须明确 `测速节点 ≠ 游戏服务器`，避免把测速站 Ping 当成游戏 Ping。
- Shot 4 只表达“稳定 vs 波动”与 packet loss 的存在，不扩展原因。
- 每个 shot 切换前旧 owner 完整退场；无跨 shot proxy 残留。
- 所有容器显式声明 layout / alignment。
- canonical header 只在最终 composite overlay；scene 内只放固定 watermark。
- 品牌句 cue start == body end == canonical horizontal outro start。
