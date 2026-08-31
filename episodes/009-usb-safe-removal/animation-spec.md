# EP009 Animation Spec

## Global

- Canvas：`1920×1080`
- FPS：`60`
- Background / watermark：`HORIZONTAL_BRAND`
- Main visual band：`y=-350..300`
- Subtitle reserve：`y=320..500`
- Timing source：Production Build 最终 Yunyang WordBoundary markers

## T0 → T1 — Hook

- `0.00–0.35s`：Hook root opacity 0→1。
- `0.15–0.65s`：U 盘主体 scale `0.96→1`。
- `0.55–1.30s`：写入进度条宽度推进到约 72%。
- `1.20s` 后：`正在写 = 风险` badge 出现。
- 禁止先做“标题问句”；第一稳定帧直接可读 `直接拔 U 盘，不一定会坏`。

## T1 → T2 — Flush / release

- 写入队列 3 个 block 依次点亮。
- 约 45% phase 时，队列归零。
- 随后 `Safe to remove` badge 0→1。
- U 盘位置保持不变，避免对象跳位。

## T2 → T3 — Policy compare

- Quick removal 与 Better performance 左右并列。
- Quick removal 初始即为主要 owner；`DEFAULT · Windows 10 1809+` badge 延迟约 `0.6s` 出现。
- 写入缓存开关：Quick removal 显示 `Write cache OFF`；Better performance 显示 `Write cache ON`。
- 不做复杂滑块变形，只做状态高亮。

## T3 → T4 — Red flags

- `正在复制 68%` 卡先出现并推进一次进度。
- `Better performance · Cache ON` 卡延迟约 `0.8s` 出现。
- 底部 warning：`这两种情况 → 先弹出`。

## T4 → T5 — Takeaway

- 大关系：`不确定` → `安全弹出`。
- 箭头和结果 badge 延迟出现。
- 次级说明只保留：`空闲 + Quick removal：风险更低`。

## T5 起 — Outro

- Body trim 到 T5。
- canonical header 退出，直接 append `/7BYTE/brand/outro-horizontal-canonical.mp4`。
- 品牌句与 outro 第一帧同起。
