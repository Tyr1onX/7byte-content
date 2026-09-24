# Design Notes — 100% busy ≠ full bandwidth

## 数据驱动目标
EP017 约84h：播放 1147、2s 跳出 53.42%、5s 播放率 12.50%、完播率 1.75%、平均播放 3s、平均播放占比 12.71%。

本期直接给同时成立但直觉冲突的两个数字：`ACTIVE TIME 100%` 与 `TRANSFER 3.2 MB/s`。

## Hook
第一稳定帧完整显示：
- `DISK 0`
- `ACTIVE TIME 100%`
- `TRANSFER 3.2 MB/s`
- `100% ≠ 跑满带宽`

## Production 迭代
- V1 Build `35936001016`：body `30.855s`，final `35.467s`，主动淘汰。
- V2 Build `35936454508`：body `22.355s`，final `26.967s`；Task Manager `12.105s`，仍比目标晚。
- V3：再次压缩第一句与机制解释，目标 Task Manager < `11s`，final `25–27s`。

## 视觉路线
1. 数字悖论：100% active time vs 3.2 MB/s。
2. 时间轴：小 I/O block 几乎占满忙碌时间；`BUSY TIME` 与 `BYTES / SEC` 是不同维度。
3. Task Manager：`Ctrl + Shift + Esc` → `DISK ↓`。
4. `SHORT SPIKE → 先观察`；`SUSTAINED 100% + HIGH LATENCY → 继续排查`。

## 数据目标
- 2s 跳出 <35%
- 5s 播放率 >30%
- 平均播放 >6s
