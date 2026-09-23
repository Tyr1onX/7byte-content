# Core — 磁盘100%，为什么速度却只有几MB/s？

## 核心问题
Windows 里磁盘“100%”为什么可能和很低的 MB/s 同时出现？

## 观众最终只需要记住
磁盘 100% 不等于硬盘已经达到最高传输速度。Windows 的磁盘忙碌/活动时间指标描述的是磁盘在采样时间里有多少时间忙于处理读写请求；吞吐量（MB/s）是另一件事。大量小而碎的随机 I/O、较高延迟或持续排队，都可能让磁盘几乎没有空闲时间，却只有不高的 MB/s。

## 事实链路
1. Microsoft 的 PhysicalDisk 性能计数器把 `PercentDiskTime` 定义为“磁盘忙于处理读写请求的时间占比”。
2. 同一组计数器还独立提供读写字节率、平均传输延迟、队列长度等指标，因此“忙碌时间”与“吞吐量”并不是同一个量。
3. 微软性能排障文档强调，磁盘问题还需要结合 `Avg. Disk sec/Read`、`Avg. Disk sec/Write` 等延迟指标判断；短时峰值可以容忍，持续高延迟更值得排查。
4. Task Manager 可以查看磁盘活动和进程资源使用；`Ctrl + Shift + Esc` 可直接打开。
5. 大量小操作可以让磁盘持续忙碌，但每次操作传输的数据量并不大，因此 MB/s 仍可能很低。

## 本期边界
- 不把“磁盘100%”直接等同于硬盘损坏。
- 不声称低 MB/s + 100% 一定由随机 I/O 导致；驱动、后台任务、磁盘本身状态等都可能参与。
- 不建议看到系统进程就直接结束。
- 本期只教用户先理解指标，再按磁盘占用定位当前进程；持续异常时再看延迟和磁盘状态。

## 事实核验
- Microsoft Learn — Win32_PerfRawData_PerfDisk_PhysicalDisk: https://learn.microsoft.com/en-us/previous-versions/aa394308(v=vs.85)
- Microsoft Support — System configuration tools in Windows / Task Manager: https://support.microsoft.com/en-us/windows/experience/system-configuration-tools-in-windows
- Microsoft Learn — Troubleshoot performance problems in Windows: https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/troubleshoot-performance-problems-in-windows
- 核验日期：2026-09-24。
