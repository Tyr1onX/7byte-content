# Animation Spec — USB-C 能力分层

## Shot 1 Hook
- 两张相同端口卡同时出现。
- 0.25s 后左侧显示器路径点亮为绿色；右侧 `NO SIGNAL` 红色出现。
- 不移动两张端口卡，避免开场视觉抖动。

## Shot 2 Connector
- USB-C connector 卡作为唯一中心 owner。
- `DATA / DISPLAY / POWER` 三个问号以 0.35s 间隔依次点亮。

## Shot 3 Data
- 中心 connector 退场后，`USB 2.0` / `USB4` 两卡成为新 owner。
- 分叉箭头由中间向左右延展；卡片本身不横向飞行。

## Shot 4 Display
- 显示器卡稳定；`DP Alt Mode` 与 `USB4 Display` 两条能力路径依次变亮。
- 只表达“有实现才有视频”，不模拟真实协议包。

## Shot 5 Power + Cable
- `USB PD` 与 `CABLE` 两张卡依次进入。
- 线材标签只做能力对比，不画复杂针脚。

## Shot 6 Final
- `数据 / 视频 / 供电` 三卡依次出现。
- 最终 badge：`别只看 Type-C`。
- 品牌句开始时正文 owner 清空，交给 canonical outro。
