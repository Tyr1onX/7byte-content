# EP010 Animation Spec

## Scene structure
单场景 5 phases，最终 timing 由 Yunyang WordBoundary 自动覆盖本地 placeholder。

### Phase 0 → 1: Hook
- 首帧标题直接显示反常识结论。
- Shutdown / Restart 双卡同时出现。
- Restart `FULL BOOT` 绿标 0.5s 内显现。

### Phase 1 → 2: Fast Startup save
- 用户会话先变 `SIGNED OUT`。
- Kernel + Drivers 沿箭头收进 `hiberfil.sys`。
- amber 只表示“保存状态”。

### Phase 2 → 3: Restore
- `hiberfil.sys` 恢复到 Kernel + Drivers。
- 出现 `RESTORE ≠ REBUILD FROM ZERO`。

### Phase 3 → 4: Restart full boot
- Kernel / Drivers / Services 三模块从 muted → accent。
- `FULL BOOT CYCLE` badge 出现。

### Phase 4 → 5: Troubleshooting
- 驱动异常 / 更新未完成 / 状态异常依次出现。
- 箭头指向 `Restart first`。
- 底部保持：`平时关机没问题 · 排故先重启`。

### Phase 5 → 6: Brand cue
- 保持最终页直至品牌句 marker。
- 到 marker 后 final opacity 置 0，canonical outro 接管。

## 审计
- 0–1s 必须可读 Hook。
- 所有 phase boundary 前后各抽帧。
- body end 不得 loop 回 Hook。
- 字幕不得盖住 hiberfil.sys、FULL BOOT、Restart first 三个核心元素。
