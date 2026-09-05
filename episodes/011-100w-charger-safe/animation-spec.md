# EP011 Animation Spec

## 时间基准
`production.json.phaseMarkers` + 最终 Yunyang WordBoundary 是唯一生产时间轴。`src/production-timing.ts` 仅为本地占位。

## Phase 0 — Hook
- `100W MAX` 与 `25W LIMIT` 开场即稳定可见。
- 0.25s 后功率表出现 `≈25W`。
- 不使用品牌片头，不等待问题句结束才给答案。

## Phase 1 — Max capability
- Source 能力列表淡入：`5V / 9V / 15V / 20V`（仅作为能力示意，不声称所有充电器均具备同一组合）。
- `MAX CAPABILITY` badge 0.4s 内出现。

## Phase 2 — Negotiation
- 依次点亮 `Source_Capabilities`、`Request`、`Accept`。
- 每步 0.45–0.7s，结果停留。
- 不画悬空 connector；使用卡片间明确箭头图标。

## Phase 3 — Negotiated output
- `100W MAX` 收敛为 `NEGOTIATED ≈25W`。
- 手机充电状态变绿。

## Phase 4 — Dynamic limits
- Battery / Temperature / Cable 三卡依次出现。
- 功率读数从 `≈25W` 变成 `≤25W`，强调“还能更低”，不制造固定实际值。

## Phase 5 — Final
- 三项结论：`设备`、`协议`、`线材`。
- 小结：`100W ≠ 强制 100W`。
- 画面保持到 body end；body end 与品牌句/canonical outro 起点一致。
