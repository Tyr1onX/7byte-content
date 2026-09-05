# EP011 Core — 100W 充电器为什么不会把小功率手机“硬灌坏”？

## 核心问题
一个标称 100W 的 USB-C 充电器，接到只支持更低功率的手机上，为什么通常不会把 100W 强行输出给手机？

## 观众只需要记住
**充电器上的 100W 是它“最多能提供多少”的能力上限，不是固定输出。** 在 USB Power Delivery 这类标准里，供电端先公布可提供的电压/电流能力，受电设备再请求自己支持的功率档位，建立供电合约后才按协商结果输出。

## 事实链路
1. USB PD 把供电端定义为 Source，把受电端定义为 Sink。
2. Source 会通过 `Source_Capabilities` 告知可提供的电压/电流能力；Sink 根据自身能力选择并发送 `Request`。
3. Source 接受请求后才切换到协商后的供电条件，因此“100W 充电器”并不等于任何设备都会收到 100W。
4. 实际充电功率还可能低于设备标称上限：电池电量、温度、设备充电策略、协议兼容性和线材能力都可能限功率。
5. USB-IF 当前 USB PD 规格可支持高于 100W 的功率；100W 只是本期用于解释“最大能力 ≠ 固定输出”的常见例子。

## 重要边界
- 本期只讨论**正规、符合对应 USB/快充协议的充电器、设备与线材**。
- 不把“设备会自己拿多少电”作为唯一解释；在高电压 USB PD 场景里，关键是先协商，再输出。
- 不承诺所有品牌私有快充协议都能互相跑到最高功率；不兼容时通常会回落到双方都支持的条件。
- 不展开完整 PDO / RDO 位域、PPS / EPR 细节。
- 不把“大功率充电器可用”扩展成“任何来路不明的充电器都安全”。

## 核查来源
- USB-IF：USB Charger (USB Power Delivery)。
- USB-IF：USB Power Delivery Specification / compliance materials，包含 `Source_Capabilities`、Sink `Request` 与 negotiated power level 的要求。
