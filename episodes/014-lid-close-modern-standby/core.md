# Core — 合盖、睡眠与 Modern Standby

## 核心问题
Windows 笔记本合盖后，为什么还可能继续耗电，甚至在背包里发热？

## 观众最终只需要记住
合盖通常只是触发睡眠，不等于关机。部分 Windows 电脑使用 Modern Standby（S0 低功耗空闲），系统在睡眠期间仍可能因为网络、维护任务或设备事件短暂活动。正常情况下功耗应很低；如果驱动、外设或后台任务没能顺利进入低功耗，耗电可能明显增加。长时间携带时，休眠通常比睡眠更省电、更稳妥。

## 事实链路
1. Windows 支持多种电源状态；Modern Standby 属于 S0 low-power idle，而传统睡眠常见 S1–S3。
2. 在 Modern Standby 中，系统可快速从低功耗状态响应硬件或网络事件；特定软件活动和系统维护可能短暂运行。
3. Windows 10 2004 起，Modern Standby 默认使用 Adaptive Connected Standby；系统会按场景控制睡眠期间的网络连接，不应把“睡眠”描述成持续全速联网。
4. 休眠是 S4：系统把内存状态保存到休眠文件，硬件设备关闭到更低功耗水平，恢复速度通常慢于睡眠，但更适合较长时间断续携带。
5. “合盖就一定发热”是错误表述。正常系统应进入低功耗；背包发热往往意味着设备没有顺利维持低功耗状态，具体原因可能与驱动、外设、任务或厂商实现有关。

## 本期边界
- 不把所有 Windows 笔记本都说成支持 Modern Standby。
- 不声称睡眠期间网络一定保持连接。
- 不把所有背包发热都归因于 Modern Standby。
- 不讨论厂商 BIOS 细节、SleepStudy 深度诊断或驱动调试。

## 事实核验
- Microsoft Learn, System power states: https://learn.microsoft.com/en-us/windows/win32/power/system-power-states
- Microsoft Learn, Modern Standby states: https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/modern-standby-states
- Microsoft Learn, Modern Standby network connectivity: https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/modern-standby-network-connectivity
- Microsoft Learn, System sleeping states / S4: https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/system-sleeping-states
- 核验日期：2026-09-12。
