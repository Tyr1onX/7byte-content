# EP005 Animation Spec

## Global

- Canvas: `1920×1080`
- FPS: `60`
- Background: `HORIZONTAL_BRAND.background`
- Watermark: exact `HORIZONTAL_BRAND.watermark`
- Main visual band: `y=-350..280`
- Subtitle band: bottom reserved area; body objects must stay above it.
- Timing source: final Yunyang WordBoundary → `production-timing.ts`

## Phase map

`T = [0, standard, history, iec1998, legacyUI, finalModel, outro]`

Each phase must use `all(waitFor(phaseDuration), ...animations)` so animation duration is contained inside the narration phase.

## Shot 1 / Hook

- Title center-top: `同样是 1GB，为什么有两种算法？`
- Left card: drive/package `500 GB`
- Right card: Windows `465 GB`
- Center relation: `同一块硬盘`
- Motion:
  - left card in `0.45s`
  - right card delayed `0.45s`, in `0.45s`
  - question / mismatch indicator delayed `1.1s`, in `0.35s`
- No brand intro animation.

## Shot 2 / Standard definitions

- One shared Bytes pool centered upper-middle.
- Left ruler card: `GB = 10^9 B`, accent.
- Right ruler card: `GiB = 2^30 B`, neutral → accent when revealed.
- Main motion: same Bytes pool visually branches to the two ruler definitions.
- `GiB` reveal gets at least `0.8s` stable reading time.

## Shot 3 / Historical reason

- Left: recognizable early-computer / memory card with memory icon.
- Center: `1024` block / binary counter.
- Right: `1000` decimal ruler.
- Relation label: `1024 ≈ 1000`.
- Old labels `KB / MB / GB` appear only after the relation is established.
- Do not imply 1024 equals 1000; use `≈` visually.

## Shot 4 / IEC 1998

- Standard document card: `IEC · 1998`.
- Two rows / lanes:
  - Decimal: `kB → MB → GB`
  - Binary: `KiB → MiB → GiB`
- Main motion: mixed old labels separate into two stable lanes.
- Accent only the final `GB / GiB` pair after the lanes settle.
- Hold final pair for >= `1.0s` if phase duration permits.

## Shot 5 / Windows legacy label

- Programmatic Explorer-style disk UI, not a generic text rectangle.
- Include drive icon, capacity bar, `465 GB` text.
- Small timeline: `1998 → today`.
- Standard `GiB` badge appears near the computed value while UI owner still displays `GB`.
- Visual message: `计算口径：binary` / `显示标签：GB`.
- Avoid saying “Windows wrong” on-screen.

## Shot 6 / Final model

- Left: `1 GB = 10^9 B`
- Right: `1 GiB = 2^30 B`
- Center / lower visual: `500 GB ≈ 465.7 GiB`
- Final takeaway: `定义已分开 · 显示习惯未完全统一`
- This conclusion stays stable until `bodyEnd`.
- At `bodyEnd == brand cue start`, body disappears and canonical horizontal outro starts.

## Audit boundaries

Production timing should expose each phase boundary. Visual audit must inspect:

- `0.0 / 0.5 / 1.0 / 2.0s`
- each `Tn - 1 frame / Tn + 1 frame`
- GiB first reveal
- `1998 IEC` stable frame
- Explorer UI stable frame
- `bodyEnd - 1 frame / bodyEnd + 1 frame`
