# Storyboard — 测速500Mbps，为什么打游戏还是会卡？

## Shot 1 — 0–约3s：答案先给
- 第一稳定帧完整显示：
  - `DOWNLOAD 500 Mbps`
  - `PING 180 ms`
  - `500 Mbps ≠ 低延迟`
- 数字同时出现，不逐字 reveal。
- `500 / 180` 明确作为示意，不给“合格阈值”暗示。

## Shot 2 — 约3–12s：两个指标看不同东西
- 左：`THROUGHPUT` → `单位时间传多少`
- 右：`LATENCY / RTT` → `一次往返等多久`
- 只保留一个简洁往返关系，不堆协议细节。
- 口播建立“下载速度”和“响应等待”是两个维度。

## Shot 3 — 约12–18s：测速别只看 Mbps
- Speed Test 风格四指标：
  - `DOWNLOAD`
  - `LATENCY`
  - `JITTER`
  - `PACKET LOSS`
- 视觉上弱化 DOWNLOAD，强调后三项是实时游戏还需要关注的网络指标。

## Shot 4 — 约18s–body end：同样下载，不同体验
- 左卡：`500 Mbps / LOWER LATENCY` → `响应更快`
- 右卡：`500 Mbps / HIGHER LATENCY / JITTER / LOSS` → `体验可能更差`
- 不把具体 ms 当统一标准。
- 品牌句起点同时切 canonical outro。
