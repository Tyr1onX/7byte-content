# EP007 Core — 电脑关机后，为什么鼠标键盘还亮着？

## 核心问题

电脑已经执行“关机”，屏幕和系统都停了，为什么鼠标、键盘、USB 灯效甚至部分 USB 充电仍可能继续？这是不是说明电脑没有真正关好？

## 观众最终只需要记住什么

1. “系统关机”和“切断交流电源”不是同一件事。完整关机属于 ACPI 的 Soft Off（S5）；真正完全无供电对应 Mechanical Off（G3）。
2. ATX 电源只要仍接着交流电，通常会保留 `+5VSB` 待机供电。主电源轨关闭时，它仍可给软开机控制、部分唤醒电路等提供电源。
3. 是否把待机电送到 USB / 灯效，由主板设计和 BIOS/UEFI 设置决定。因此关机后 USB 设备仍亮，并不等于 Windows 仍在正常运行。
4. 如果不希望关机后继续供电，可在 BIOS/UEFI 中查找 `ErP Ready`、`USB power in S5` 等相关选项；名称和行为因主板而异，并可能同时影响关机充电、唤醒等功能。

## 事实链路

- Microsoft 将 S5 定义为 Soft Off；G3 Mechanical Off 才是系统完全关闭并不再消耗电力的状态。
- Intel ATX 电源设计指南规定 `+5VSB` 是待机输出，只要交流电存在就保持有效，用于主电源轨关闭时仍需工作的电路，例如软电源控制、Wake-on-LAN 等。
- 主板可以把待机电用于 USB 端口或灯效。ASUS 官方支持文档明确提供 `ErP Ready (S4+S5 / S5)` 等设置，用于关闭关机/休眠后的 USB 待机供电；具体菜单会因主板而不同。
- 因此“关机后鼠标灯还亮”通常是电源状态与主板待机供电策略的结果，不是单凭这一现象就能判断系统关机失败。

## 本期刻意不展开

- 不展开 Windows Fast Startup 的 S4/混合关机细节，避免把主问题变成电源状态课程；本期结论对“交流电仍接通时存在待机供电”仍成立。
- 不展开不同厂商所有 BIOS 菜单路径，只强调名称会变化。
- 不把 Wake-on-LAN 是否支持 S5 说成所有主板都一致；厂商 BIOS 可能有额外实现。
- 不建议用户为了熄灯盲目修改 BIOS；只说明可检查对应设置及其副作用。

## 可跨平台复用的例子

- `主供电 OFF / +5VSB ON`：最直观解释为什么“电脑看起来关了”但仍有少量电路活着。
- `关机 ≠ 拔电源`：用软件电源状态和物理断电做一眼可懂的对比。

## 术语

- S5 / Soft Off：完整关机后的软关闭状态。
- G3 / Mechanical Off：交流电源切断后的机械关闭状态。
- `+5VSB`：ATX 电源的 5V 待机输出，在交流电存在时保持有效，为待机/唤醒等电路供电。
- ErP Ready：部分主板 BIOS 中用于降低 S4/S5 待机功耗、关闭部分待机供电的设置名称。

## 事实来源

- Microsoft Learn — System power states
  https://learn.microsoft.com/en-us/windows/win32/power/system-power-states
- Intel — ATX Version 3 Multi Rail Desktop Platform Power Supply Design Guide, +5VSB Required
  https://edc.intel.com/content/www/us/en/design/ipla/software-development-platforms/client/platforms/alder-lake-desktop/atx-version-3-0-multi-rail-desktop-platform-power-supply-design-guide/2.1a/-5vsb-required/
- ASUS Support — How to disable standby power of the USB connected device
  https://www.asus.com/support/faq/1042220/
