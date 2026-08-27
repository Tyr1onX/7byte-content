# EP007 Animation Spec

## Canvas
- Width: `1920`
- Height: `1080`
- FPS: `60`
- Main visual band: `y=-350..280`
- Subtitle reserve: `y=320..500`
- Canonical background / watermark from horizontal brand constants
- Canonical header is final-composite-only

## Timing
Final Yunyang WordBoundary markers are authoritative.

Local placeholder:
```ts
T = [0, 4.5, 9.5, 16.0, 24.0, 32.0, 36.0]
```

## Shot 1 — Hook (T0→T1)
- Title: `电脑都关机了，鼠标键盘怎么还亮？`
- Center: dark desktop PC card.
- Lower/right: mouse + keyboard cards with accent light.
- One glow reveal only.
- Subtitle suppressed.

## Shot 2 — Soft off ≠ AC removed (T1→T2)
- Left card: `系统关机 / Soft Off`.
- Right card: AC plug still connected.
- Center: `≠`.
- Badge: `交流电仍接通`.
- No G3 detail yet.

## Shot 3 — Standby rail (T2→T3)
- PSU centered-left; motherboard centered-right.
- Main rails row fades to `OFF`.
- `+5VSB` row grows left→right in accent.
- Arrow/rail terminates at motherboard edge visually.
- Badge: `主供电关了，待机轨还在`.

## Shot 4 — USB still powered (T3→T4)
- Motherboard at left.
- Three use cards at right: Power Button / Wake / USB.
- USB branch is highlighted last.
- Mouse light turns on after USB branch highlight.
- Badge: `系统关机 ≠ USB 必然断电`.

## Shot 5 — BIOS control (T4→T5)
- UEFI card with two illustrative rows:
  - `ErP Ready` → Enabled
  - `USB Power in S5` → Off / model-dependent
- Toggle animates once.
- Warning card: `可能同时影响关机充电 / 唤醒`.
- Small note: `名称因主板而异`.

## Shot 6 — G3 / takeaway (T5→T6)
- AC plug/power strip on left.
- PSU/standby indicator on right.
- Main action: AC connection visually cuts; `+5VSB` bar shrinks to zero.
- Final badge: `G3 Mechanical Off`.
- Takeaway: `关机 ≠ 物理断电`.
- Hold until T6.

## Outro
- `body end == T6 == brand cue start == canonical outro start`.
- All scene roots opacity `0` at handoff.
- Normal subtitles suppressed from T6.

## Audit
- 0.5s hook
- each T1..T5 ±1 frame
- Shot 3 full rail state
- Shot 4 USB highlight
- Shot 5 toggle settled state
- T6 -1 frame / +1 frame
- canonical outro +1s
