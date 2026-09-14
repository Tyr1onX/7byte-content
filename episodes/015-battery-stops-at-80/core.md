# Core — 插着电为什么停在 80%

## 核心问题
笔记本明明插着电，为什么电量会停在 80% 左右、不再继续充到 100%？

## 观众最终只需要记住
这不一定是故障。部分 Windows 笔记本或厂商软件会启用 Smart charging / 电池保养模式，主动把最大充电水平限制在低于 100% 的范围，减少长期满电状态对锂离子电池寿命的不利影响。阈值由厂商和机型决定，80% 只是常见策略之一。

## 事实链路
1. Microsoft 明确说明：部分设备制造商会在 Windows 中实现 Smart charging；启用后，设备可能不会充到 100%，这是为了帮助维持长期电池健康。
2. Microsoft 的 Surface Smart charging 在特定条件下可把最大充电量限制为 80%。
3. 不同厂商实现不同。Lenovo 部分机型的 Conservation mode 会把电量维持在约 75%–80%。
4. 因此不能把“插电但低于 100%”一概判断成电池损坏，也不能把 80% 说成所有 Windows 设备的固定阈值。
5. 如果马上需要长时间离电使用，应按具体厂商应用 / 电源设置查看是否可以暂时恢复满充；长期插电时，保留智能充电通常更符合其设计目的。

## 本期边界
- 不声称所有笔记本都有 80% 限制。
- 不声称只要停在 80% 就一定是 Smart charging；电源适配器、温度、硬件故障等也可能导致无法继续充电。
- 不把 Windows 自己描述为统一控制所有 OEM 阈值；实现由设备制造商决定。
- 不给所有用户统一的开关路径；行动建议只说查看厂商电池 / 充电设置。

## 事实核验
- Microsoft Support — Use Smart charging in Windows: https://support.microsoft.com/en-us/windows/experience/power-battery/use-smart-charging-in-windows
- Microsoft Support — Smart charging on Surface: https://support.microsoft.com/surface/battery/smart-charging-on-surface
- Microsoft Support — Caring for your battery in Windows: https://support.microsoft.com/en-us/windows/experience/power-battery/caring-for-your-battery-in-windows
- Lenovo Support — Conservation mode examples: https://support.lenovo.com/jp/ja/solutions/ht517195
- 核验日期：2026-09-14。
