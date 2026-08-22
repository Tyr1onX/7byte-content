# EP004 Animation Spec

## Project

- Canvas: `1920×1080`
- FPS: `60`
- Background: canonical `HORIZONTAL_BRAND.background`
- Main band: approximately `y=-350..280`
- Subtitle band: approximately `y=320..500`

## Timing

Scene 从 `src/production-timing.ts` 读取 `T`。

默认占位值只供本地开发；Production Build 生成 Yunyang TTS/VTT 后，按 `production.json.phaseMarkers` 自动回填真实 phase start：

`T = [hook, manufacturer, windows, calculation, final-model, canonical-outro]`

任何动画都必须在自己的 `phase(from,to)` 内完成，禁止靠注释累计时间。

## Phase 1 — Hook

稳定构图：

- SSD card: `x≈-430, y≈-20, 620×300`
- Windows drive card: `x≈430, y≈-20, 620×300`
- `500 GB` / `465 GB` 为一级数字
- `35GB 去哪了？` 位于主视觉底部，不进入字幕带

建立顺序：500GB → 465GB → 问号。

## Phase 2 — Manufacturer ruler

- 同一个 byte-pool 卡位于中心偏上
- 底部是一条三段式 ruler：`1000 × 1000 × 1000`
- 左侧 badge：`厂商 · 十进制`
- 结果：`500 GB`

不要把 5000 亿个字节画成大量粒子；使用一个明确的 byte-pool / database 实体。

## Phase 3 — Windows ruler

- byte-pool 保持同一语义 owner
- ruler 变成 `1024 × 1024 × 1024`
- 三个 unit step 作为一个 group reveal，不从三处乱飞
- 后半段出现 `更准确：GiB` badge
- Windows 磁盘 UI 在右侧作为结果预告，但 465.7 不提前完整揭示

## Phase 4 — Calculation

稳定公式：

`500,000,000,000 B  →  ÷1024³  →  465.7`

- 左值 x≈-520
- divide x≈0
- result x≈520
- 只有 divide 是主动关系对象
- 结果出现后留正常阅读停顿

## Phase 5 — Final model

- Windows drive UI 主体：`≈465 GB`
- 低权重状态：`格式化` / `系统与恢复分区`
- 底部结论：`同一堆 Bytes · 两把不同的尺子`
- 不再加入新解释

## Ownership

- byte-pool 从 Phase 2 → 3 是同一 semantic owner；允许 matched position，不允许复制两份并同时可见。
- Windows drive 从 Hook 可在 Phase 4/5 重新建立，但不同 shot 不用强行做复杂 proxy。
- 所有临时 ruler / badge 在 phase end 必须明确归零或由当前 shot root 一次性退出。

## Visual audit targets

至少检查：

1. Hook first stable frame
2. `500GB vs 465GB` 同屏
3. `1000×1000×1000`
4. `1024×1024×1024` 刚建立
5. `更准确：GiB` 揭示帧
6. `500,000,000,000 ÷ 1024³ → 465.7`
7. final Windows drive UI
8. body-end ±1 frame / canonical outro ownership