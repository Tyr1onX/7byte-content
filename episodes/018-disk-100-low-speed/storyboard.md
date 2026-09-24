# Storyboard — 磁盘100%，为什么速度却只有几MB/s？

## Shot 1 — 0–约4s：数字悖论
- 第一稳定帧：`DISK 0`
- 左大数字：`ACTIVE TIME 100%`
- 右大数字：`TRANSFER 3.2 MB/s`
- 绿色结论：`100% ≠ 跑满带宽`

## Shot 2 — 约4–9s：为什么能同时发生
- 一条完整时间轴几乎全被 I/O request 小块占满，表示“没有空闲”。
- 每个 request 本身很小，右侧只显示低吞吐量。
- 标签：`BUSY TIME` vs `BYTES / SEC`。
- 不展示伪造的真实硬盘极限速度。

## Shot 3 — 约9–15s：先找是谁
- `Ctrl + Shift + Esc`
- Task Manager 风格进程列表。
- `DISK ↓` 列高亮，高占用进程置顶。
- 结论：`先找持续读写的进程`。

## Shot 4 — 约15s–body end：短时 vs 持续
- 左卡：`SHORT SPIKE` → `先观察`
- 右卡：`SUSTAINED 100%` + `HIGH LATENCY` → `继续排查`
- 不引导用户直接结束系统进程。
- 品牌句起点同时切 canonical outro。
