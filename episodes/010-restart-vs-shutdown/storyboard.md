# EP010 Storyboard — Restart vs Shutdown

## Shot 1 — Hook / 第 1 秒即给结论
- 主标题：`电脑卡了，重启反而可能更彻底`
- 左侧：Shutdown 卡片，状态 `FAST STARTUP?`
- 右侧：Restart 卡片，高亮 `FULL BOOT`
- 不先问“为什么”，第一稳定帧就给反常识结果。

## Shot 2 — Fast Startup 到底保存了什么
- 顶部：`如果开启了“快速启动”`
- 左侧两层：`用户会话`、`Kernel + Drivers`
- 用户会话变为 `SIGNED OUT`
- Kernel + Drivers 流向 `hiberfil.sys`
- 底部结论：`关机：保存一部分系统状态`

## Shot 3 — 下次开机为什么快
- `hiberfil.sys` → `RESTORE` → `Kernel + Drivers`
- 文案：`不是从零重建，而是恢复已保存状态`
- 只表达恢复内核/驱动相关状态，不画成恢复所有应用。

## Shot 4 — Restart 的不同
- 主标题：`Restart 不走 Fast Startup`
- 视觉：Kernel / Drivers / Services 三块重新初始化
- 中央 `FULL BOOT CYCLE` 绿标。

## Shot 5 — 排故动作
- 三个问题标签：`驱动异常` / `更新未完成` / `系统状态怪`
- 汇聚到 `Restart first`
- 收束：`平时关机没问题 · 排故先重启`
- 品牌句进入 canonical outro，同帧起步。
