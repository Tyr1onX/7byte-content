# EP008 Animation Spec

## Canvas
- 1920×1080 / 60fps
- Background / brand chrome：锁定横版 canonical 参数
- 主视觉：y=-350..280
- 字幕保留区：y=320..500

## Timing source
最终时间由 Yunyang `-5%` WordBoundary + `production.json.phaseMarkers` 生成。本文件只定义阶段关系，不以手写秒数作为最终 source of truth。

## Phase

### P0 T0→T1 Hook
- 0.0s：标题与文件卡进入。
- +0.6s：垃圾桶动作；文件卡 opacity → 0。
- +1.2s：底层 6 个数据块仍保持可见。
- +1.8s：`文件没了 / 数据还在？` badge 出现。

### P1 T1→T2 删除语义
- 文件记录卡左侧，数据块右侧。
- 文件记录中的 pointer 收缩为 0。
- 数据块 badge 从 `已占用` 切换为 `可再次使用`。
- `数据块` 本体不消失。

### P2 T2→T3 恢复扫描
- 6 个块稳定排列。
- 扫描框从左到右移动一次，持续约 1.2s。
- 扫过旧数据块后显示 `仍有旧内容`；最后生成 `找到残留` badge。

### P3 T3→T4 HDD / SSD
- 左：HDD 卡，旧块保持并标 `等待覆盖`。
- 右：SSD 卡，`TRIM` badge 进入，随后块状态改 `可回收` 并降低 opacity。
- 强调文本：`SSD 恢复更难、更不确定`。

### P4 T4→T5 Takeaway
- 中心大字：`删除 ≠ 安全擦除`。
- 下方单一行动卡：`误删 → 停止继续写入`。
- 不加入恢复软件推荐、命令或操作步骤。

### T5
- Scene 正文 owner 全部退出。
- canonical horizontal outro 同帧进入。
- 固定品牌口播从这一帧开始。
