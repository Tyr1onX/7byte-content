# Storyboard — 什么都没开，风扇为什么突然狂转？

## Shot 1 — 0–约 5s：空桌面却高转速
- 第一稳定帧：一张极简桌面卡，无应用窗口。
- 同屏显示 `CPU ↑` 与 `FAN HIGH RPM`。
- 底部结论：`没窗口 ≠ 没任务`。
- 口播第一句先排除“风扇坏了”的直觉。

## Shot 2 — 约 5–11s：后台任务就在跑
- 切成 Task Manager 风格的后台进程列表。
- 三行只保留：`WINDOWS UPDATE` / `DEFENDER SCAN` / `SEARCH INDEX`。
- 每行用 CPU activity bar 表示资源占用，不模拟具体真实百分比。
- 顶部：`BACKGROUND TASKS`。

## Shot 3 — 约 11–17s：直接告诉观众怎么查
- `Ctrl + Shift + Esc` 键帽组合出现。
- Task Manager 进程表只突出 `CPU ↓` 列。
- 一行高占用进程被强调。
- 结论：`先看谁排在最上面`。

## Shot 4 — 约 17s–body end：偶发 vs 持续
- 左卡：`偶尔几分钟` → `先观察`。
- 右卡：`长期高占用 + 高温` → `继续排查`。
- 不引导用户直接结束系统进程。
- 品牌句起点同时切 canonical outro。
