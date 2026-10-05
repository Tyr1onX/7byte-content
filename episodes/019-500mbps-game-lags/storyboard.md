# Storyboard — 测速500M，为什么打游戏还是会卡？

## Shot 1 — 0–约4s：数字冲突
- 第一稳定帧完整显示：
  - `DOWNLOAD 512 Mbps`
  - `PING 180 ms`
  - `500M ≠ 低延迟`
- 第一口播直接给答案，不先铺问题。

## Shot 2 — 约4–10s：吞吐量 vs 往返等待
- 左侧：`THROUGHPUT`，用并行数据块表示“单位时间能搬多少”。
- 右侧：`ROUND TRIP`，`YOU → GAME SERVER → YOU` 表示一次操作往返。
- 结论只保留：`能传多少 ≠ 要等多久`。
- 不使用“高速公路”类比替代真实网络关系。

## Shot 3 — 约10–16s：真正排查游戏延迟
- 游戏 HUD / 网络统计风格面板。
- `PING 180 ms` 成为唯一高亮指标。
- 次级提示：`测速节点 ≠ 游戏服务器`。
- 行动结论：`先看游戏里的 PING`。

## Shot 4 — 约16s–body end：延迟是否稳定
- 左：`PING 42 → 45 → 43 ms` / `STABLE`
- 右：`PING 42 → 160 → 55 ms` / `JITTER ↑`
- 下方只补 `PACKET LOSS` 作为第二层排查项，不展开原因。
- 品牌句起点同时切 canonical outro。
