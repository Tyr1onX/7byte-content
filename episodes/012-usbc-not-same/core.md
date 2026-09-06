# Core — USB-C 外形相同，能力为什么不同

## 核心事实

1. **USB Type-C 不是 USB 3.2，也不是 USB4。** USB-IF 的 Type-C 产品与包装指南明确要求这些术语不要互换；Type-C 产品是否支持 USB 3.2、USB4、USB Power Delivery，要看具体实现。
2. 因此，同样是 USB-C 接口，数据能力可以不同。最基础的 USB 2.0 Type-C 实现可只有 USB 2.0 数据能力，而其他产品可以实现更高阶 USB 数据协议。
3. **视频能力不是看到 Type-C 就自动存在。** DisplayPort 可以通过 USB-C 的 Alternate Mode 工作；USB4 也能承载数据与显示协议。但设备端必须实际实现相应能力。
4. **供电能力同样独立。** USB Power Delivery 与 USB Type-C 不是同义词，具体可用功率取决于设备、端口、协议与线材实现。
5. 线材也可能成为限制项：外观都是 Type-C，但支持的数据代际、视频/Alt Mode 与供电能力可以不同。

## 口播边界
- 不说“Type-C 只是形状”，而说“Type-C 主要规定连接器/接口体系，不等于具体功能清单”。
- 不把所有 USB-C 都说成能输出视频。
- 不把 DisplayPort Alt Mode 与 USB4 混成同一种协议；只说两者都可能让 USB-C 承担显示能力。
- 不把“同样的线一定不同”说成绝对，只说线材能力也需要匹配。

## 参考
- USB-IF, USB Type-C Language, Product and Packaging Guidelines：Type-C ≠ USB 3.2 / USB4；Type-C ≠ USB PD；产品能力会变化。
- USB-IF, USB4：USB4 可在 USB Type-C 上承载并动态共享数据与显示协议。
- VESA, DisplayPort over USB-C：DisplayPort 可通过 USB-C Alternate Mode 提供视频输出。
