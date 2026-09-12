# Publish Record — 电脑都合盖了，为什么还会发热掉电？

## 状态
- 平台：抖音
- 状态：V1 Final Candidate / 待用户最终确认
- 版本：V1 Final Candidate
- 发布日期：
- 发布链接：

## 生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Production Build：`34694250751`，第 4 次尝试全绿通过
- Source：`68c7930652d22537ebfa7696e96560e14309f82a`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- Modern Standby 解释进入：约 `3.316s`
- 正常低功耗状态：约 `15.066s`
- 异常未进入低功耗：约 `17.526s`
- 休眠行动建议：约 `25.355s`
- 正文结束 / canonical outro 起点：约 `32.631s`
- 最终成片时长：约 `37.25s`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical horizontal header
- 横版 outro：canonical horizontal outro
- 成片长期存储：`/7BYTE/EP014/final.mp4`（待用户确认后归档）
- 竖版封面：`/7BYTE/EP014/cover-vertical-3x4.png`（待用户确认后归档）
- 横版封面：`/7BYTE/EP014/cover-horizontal-4x3.png`（待用户确认后归档）

## 发布标题
`电脑都合盖了，为什么还会发热掉电？`

## 发布简介
`合盖通常只是触发睡眠，不等于关机。部分 Windows 笔记本支持 Modern Standby：屏幕关闭后，系统进入 S0 低功耗空闲，仍可能因为网络、维护任务或设备事件短暂活动。正常情况下功耗应该很低；如果驱动、外设或后台任务没顺利进入低功耗，就可能持续耗电甚至发热。长时间放包里时，休眠通常更省电、更稳妥。`

## 话题
`#计算机科普 #电脑知识 #Windows #笔记本 #电脑技巧`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 本期实验
- 保持约 `48h` 发布节奏与固定品牌。
- 对照 EP012：播放 `933`、2s 跳出 `39.60%`、5s 播放率 `28.40%`、平均播放 `5.99s`。
- 不再让第一帧先承担抽象技术定义，而是直接给“合盖 + 掉电 + 发热”三个可见事实，再解释 Modern Standby。
- 目标观察：2s 跳出是否重新压到 `<30%`，5s 播放率是否回到 `>45%`，平均播放时长是否回升。
- 首次 Production Build 因 GitHub Hosted Runner 未分配而连续 3 次在执行任何 step 前失败；Runner 恢复后，第 4 次尝试从 checkout 到 visual audit / artifact upload 全流程通过。

## 发布前检查
- [x] 最终 TTS timing 回填
- [x] Microsoft 官方电源状态 / Modern Standby / S4 事实核对
- [x] 不把所有 Windows 笔记本都说成 Modern Standby
- [x] 不声称睡眠期间网络一定保持连接
- [x] 不把所有背包发热都归因于 Modern Standby
- [x] 第一稳定帧完整显示“合盖 + 掉电 + 发热”冲突
- [x] 字幕与主视觉不冲突
- [x] 视觉审计与 shot boundary 通过
- [x] canonical header / watermark / outro 完全复用
- [x] 品牌句与 canonical outro 同帧开始
- [x] 3:4 + 4:3 双封面原尺寸 / 50% / 25%审计
- [ ] 用户人工确认最终成片

## 发布后数据
| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
