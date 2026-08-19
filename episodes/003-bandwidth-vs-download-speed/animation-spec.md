# EP003 Animation Spec

> 本文件只定义可执行结构和几何契约。最终绝对时间由最终 TTS timing 回填。

## Project

- Canvas: `1920×1080`
- FPS: `60`
- Main visual band: approximately `y=-360..280`
- Subtitle reserved band: approximately `y=320..500`
- Background watermark: canonical faint `7BYTE`, bottom-most layer

## Constants-first

Scene 中优先集中定义：

```ts
const BG = '#111210';
const SURFACE = '#1B1D1A';
const TEXT = '#F3F1E8';
const MUTED = '#A7AAA1';
const ACCENT = '#D8FF68';

const CANVAS_W = 1920;
const CANVAS_H = 1080;
const SUBTITLE_TOP = 320;
```

数字、单位、bit cell 尺寸、gap、shot anchor、phase duration 全部 constants-first，不把大量 magic numbers 散在 JSX 中。

## Phase 1 — Hook

### Stable composition

- Left group anchor: `x≈-480, y≈-30`
  - large `1000`
  - unit `Mbps`
  - small label `宽带`
- Right group anchor: `x≈480, y≈-30`
  - large `≈100`
  - unit `MB/s`
  - small label `下载`
- Center relation: `?`

### Motion

- 两组数字使用轻微 opacity + scale 建立，不从屏幕外高速飞入。
- `1000 Mbps` 先稳定，随后 `≈100 MB/s` 建立冲突。
- 最后只高亮单位中的 `b` / `B`，为下一镜铺垫。

## Phase 2 — bit vs Byte

### Stable composition

- Top/left token: `bit` / highlighted `b`
- Top/right token: `Byte` / highlighted `B`
- Center 8-bit group centered around `x=0, y≈20`

### Bit cells

- Exactly 8 cells.
- Recommended cell size: `64–76px` square.
- Gap: `16–22px`.
- Cells must be normal geometry, no glow.
- First establish all 8 cells as one semantic group; do not animate eight unrelated fly-ins from different directions.

### Aggregate animation

1. 8 cells become fully visible.
2. Short hold.
3. Group spacing contracts smoothly.
4. A single Byte container/frame establishes around the group or the group transitions to a unified Byte representation.
5. Result label: `8 bit = 1 Byte`.
6. Hold result for reading.

The animation must visually preserve the count of 8 until the grouping relationship is understood.

## Phase 3 — Conversion

### Stable equation

Centered horizontal equation:

`1000 Mbps   →   ÷ 8   →   125 MB/s`

Recommended anchors:

- `1000 Mbps`: `x≈-520`
- `÷ 8`: `x≈0`
- `125 MB/s`: `x≈520`

### Motion

- Reuse/match geometry from the previous unit explanation where useful.
- `÷8` becomes the only active relationship.
- `125` appears after the divide operation, not at the same time as every element.
- End state marks `125 MB/s` with small status label `理论上限`.

No connector line is needed unless it materially improves reading; arrows may be typographic relation elements rather than network-style connectors.

## Phase 4 — Theory vs Actual

### Stable composition

- Theory anchor: `x≈-430`
  - `125 MB/s`
  - label `理论上限`
- Actual anchor: `x≈430`
  - download bar / numeric readout around `≈100 MB/s`
  - label `实际下载`

### Motion

- Start from the theoretical maximum.
- A single progress/readout object settles lower than 125 as an illustrative actual value.
- Four muted factor chips may appear only after the main comparison is clear:
  - `协议开销`
  - `服务器`
  - `网络链路`
  - `设备`
- Chips should not animate independently in four directions; use one grouped reveal.

## Phase 5 — Final Model

Centered final model:

`运营商：Mbps   →   ÷ 8   →   下载软件：MB/s`

Secondary result:

`1000 Mbps → 理论约 125 MB/s`

- Keep composition stable for final narration.
- No new explanatory text during the final hold.
- Body end must be at or after the final narration cue end.
- Capture may be longer, but final body is trimmed to explicit body end before canonical outro concatenation.

## Timing contract

After final TTS is generated:

- Parse exact TTS cue boundaries.
- Define phase start/end from narration semantics.
- Each phase owns an explicit `phaseDuration`.
- Internal animations run inside that duration, e.g.:

```ts
yield* all(
  waitFor(phaseDuration),
  ...phaseAnimations,
);
```

Do not accumulate `animation + waitFor + transition` and assume comments equal real elapsed time.

## Ownership / cleanup invariants

- One semantic number/unit has one visible owner in stable frames.
- Any temporary matched-geometry proxy must retire before the next shot reaches its stable state.
- Ephemeral refs must be `opacity = 0` at shot end unless explicitly promoted to the next shot's sole owner.
- No root-level primitive may remain visible without a current-shot semantic role.

## Visual audit frame targets

At minimum inspect:

1. Hook first stable frame.
2. First `b/B` highlight.
3. 8-bit group before aggregation.
4. Aggregation midpoint.
5. Final `8 bit = 1 Byte` state.
6. `1000 ÷ 8 = 125` fully established.
7. Theory vs actual most complex frame.
8. Every shot boundary at `-3/-1/0/+1/+3` frames.
9. Final body last 2 seconds.
10. Canonical outro +1 second.
