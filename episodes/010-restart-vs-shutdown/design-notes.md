# EP010 Design Notes

## 视觉目标
延续 7BYTE 深色桌面系统语言，但避免把 Fast Startup 画成“坏功能”。核心视觉冲突不是红色警告，而是 `RESTORE` 与 `FULL BOOT` 两条不同路径。

## Hook
- 第一稳定帧必须已经能读到：`电脑卡了，重启反而可能更彻底`。
- Restart 使用品牌绿；Shutdown 使用中性灰，不使用危险红。
- 观众即使静音，也能在 1 秒内理解冲突。

## 颜色
- 品牌背景/表面/边框：canonical horizontal brand tokens。
- Restart / Full Boot：accent green。
- Fast Startup / hiberfil：amber，表达“更快的另一条路径”，不是错误。
- 红色只用于异常场景的小标签，不作为 Fast Startup 主色。

## 信息密度
- 每屏只讲一个动作关系。
- 不展示注册表、控制面板路径或复杂电源状态编号。
- `hiberfil.sys` 是唯一允许出现的技术文件名。

## 动效
- Hook：Restart 卡片 0.3–0.6s 内稳定高亮。
- Fast Startup：Kernel + Drivers 块向 hiberfil.sys 收拢。
- Restore：反向恢复。
- Restart：三块依次重新初始化并统一亮绿。
- 最终页保持到 body end marker，避免回跳 Hook。
