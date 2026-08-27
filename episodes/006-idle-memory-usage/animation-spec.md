# EP006 Animation Spec

## Canvas

- Width: `1920`
- Height: `1080`
- FPS: `60`
- Main content band: roughly `y=-350..280`
- Subtitle reserve: `y=320..500`
- Background / watermark: canonical horizontal brand constants
- Header: not drawn in scene; final composite owns canonical raster

## Timing source

`production.json.phaseMarkers` + final Yunyang WordBoundary timing are authoritative.

Local placeholder:

```ts
T = [0, 5.0, 15.0, 23.0, 29.0, 36.0]
```

Production Build overwrites `src/production-timing.ts`.

## Shot 1 — Hook

- Root `hook`: full-canvas Layout, initial opacity `0`.
- Main title at `y=-330`: `16GB 内存，刚开机就用了一半？`
- Task Manager card centered around `y=-30`, `980×330`.
- Memory bar: width `760`, occupied segment target `46%`.
- Main value: `7.4 / 16.0 GB`.
- Lower question: `什么都没开，内存去哪了？`
- Entry: card opacity `0→1`, scale `0.96→1`, bar width grows once.
- T0→T1 subtitle suppressed.

## Shot 2 — In Use breakdown

- Root `sources`, semantic cut from Shot 1.
- Top takeaway: `“已使用”不只等于应用列表`.
- Central physical-memory bar `1320×120`, divided into four visual segments:
  - Windows / kernel
  - drivers
  - background services
  - app working sets
- Below: four entity cards with stable icons and labels.
- Segments reveal left-to-right, but no independent flying particles.
- Final badge: `整机占用 ≠ 进程列表简单相加`.

## Shot 3 — Standby Cache

- Root `cache`.
- Left: recent-file card stack.
- Center: `Standby Cache` container.
- Right: Task Manager-like metrics group:
  - `缓存 3.8 GB`
  - `可用 8.1 GB`
- A bracket/tag explicitly states `Standby 属于 Available`.
- One file card moves into cache; afterwards all elements hold.

## Shot 4 — Reallocation

- Root `reclaim`.
- Left memory container starts with `待机缓存 3.8 GB`.
- Right application card `新应用需要 2.0 GB`.
- Connector is geometrically bound from cache right edge to app left edge.
- Main action: highlighted cache block narrows while app allocation bar grows.
- End badge: `缓存占着 ≠ 被锁死`.
- No second simultaneous motion.

## Shot 5 — What to watch

- Root `final`.
- Left: small faded `已使用 46%` card with label `单看这个不够`.
- Right/center: three checks in a horizontal row:
  1. `可用长期很低`
  2. `常用软件后接近满载`
  3. `明显卡顿`
- Main takeaway at top: `判断内存够不够，看压力，不只看开机占用`.
- Final stable text before body end: `别只盯“已使用”`.
- Body remains stable until T5.

## Outro ownership

At `T5`:

- All scene roots opacity `0` before canonical handoff.
- `body end == T5 == brand cue start == canonical outro start`.
- Normal subtitle suppressed from T5 onward.

## Visual audit boundaries

Audit at:

- `0.5s`
- every `T1..T4 ± 1 frame`
- Shot 2 full breakdown
- Shot 3 `Standby ⊂ Available` state
- Shot 4 transfer midpoint and settled state
- Shot 5 final stable frame
- `T5 - 1 frame` and `T5 + 1 frame`
- canonical outro +1s
