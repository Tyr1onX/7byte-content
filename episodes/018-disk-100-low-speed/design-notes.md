# Design Notes — 100% busy ≠ full bandwidth

## 数据驱动目标
EP017 约84h：播放 1147、2s 跳出 53.42%、5s 播放率 12.50%、完播率 1.75%、平均播放 3s、平均播放占比 12.71%。

本期不再用“逐渐变化”的抽象异常，而是直接给**同时成立但直觉冲突的两个数字**：`ACTIVE TIME 100%` 与 `TRANSFER 3.2 MB/s`。

## Hook
第一稳定帧必须完整显示：
- `DISK 0`
- `ACTIVE TIME 100%`
- `TRANSFER 3.2 MB/s`
- `100% ≠ 跑满带宽`

第一句话立即解释：`磁盘显示100%，不代表硬盘已经跑满速度。`

## 视觉路线
1. 数字悖论：100% active time vs 3.2 MB/s。
2. 时间轴：磁盘整段都在“忙”，但每个 I/O block 很小；旁边显示 `BUSY TIME` 和 `BYTES / SEC` 是两个维度。
3. Task Manager：`Ctrl + Shift + Esc` → Processes → `DISK ↓`，高占用进程置顶。
4. 短时 vs 持续：`SPIKE → OBSERVE`；`SUSTAINED 100% + HIGH LATENCY → INVESTIGATE`。

## 本期实验目标
- 第一答案在 2 秒内完整交付。
- 指标差异解释尽量在第 6 秒前完成。
- Task Manager 操作在第 11 秒前进入。
- 正文目标约 21–23s，完整成片约 26–28s。
- 目标：2s 跳出 <35%，5s 播放率 >30%，平均播放 >6s。
