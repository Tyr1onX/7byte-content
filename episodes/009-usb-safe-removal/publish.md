# Publish Record — U 盘真的不能直接拔吗？

## 状态
- 平台：抖音
- 状态：生产审计通过 / 待用户最终确认
- 版本：V1 Final Candidate
- 发布日期：
- 发布链接：

## 最终生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Production Build：`33353078839`，全绿通过
- Source：`8bb06dc9cfa15caf772941eb920b8ac419b4322f`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- Hook → 安全弹出解释：约 `6.355s`
- Windows 10 1809 / Quick removal：约 `12.211s`
- “正在复制 / Better performance”风险场景：约 `25.987s`
- 行动结论：约 `31.105s`
- 正文结束 / canonical outro 起点：约 `35.091s`
- 最终成片时长：约 `39.70s`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical `/7BYTE/brand/header-horizontal.png`
- 横版 outro：canonical `/7BYTE/brand/outro-horizontal-canonical.mp4`
- 品牌句与 outro 同帧起步
- 最终成片长期存储：`/7BYTE/EP009/final.mp4`
- 竖版封面：`/7BYTE/EP009/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP009/cover-horizontal-4x3.png`

## 发布标题
`U盘真的不能直接拔吗？“安全弹出”到底在保护什么？`

## 发布简介
`真正危险的不是“拔”这个动作，而是外部存储仍有未完成写入时突然断开。Windows 10 1809 起默认使用“快速删除”策略，设备空闲时直接拔的风险比旧默认策略低；但正在复制文件或使用“更好的性能”策略时，仍应先安全弹出。`

## 话题
`#计算机科普 #电脑知识 #U盘 #Windows #数据安全`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 自主声明
- 按发布时抖音实际 UI 与内容情况选择。

## 本期实验
- 保持约 `48h` 发布节奏。
- 不再把“核心答案约 3 秒进入”当作合格 Hook；第一稳定帧和第一句直接给新信息：`直接拔 U 盘，不一定会坏。`
- 重点测试：反常识结论在第 1 秒内可见，是否能修复 EP008 的 0–2 秒流失。
- 本期没有为追求 30 秒强行删掉 Windows 1809 / Quick removal 的关键边界；完整成片约 `39.70s`，但前端信息密度明显高于 EP008。

## 发布前检查
- [x] 最终 TTS timing 回填
- [x] 第 1 秒内已经出现新信息，而不是只问问题
- [x] Quick removal / Better performance 表述与微软文档一致
- [x] 不把 Quick removal 说成绝对安全
- [x] 正在写入时不建议直接断开
- [x] 字幕与主视觉不冲突
- [x] 视觉审计通过
- [x] shot boundary / body end ownership 审计通过
- [x] canonical header / watermark / outro 完全复用
- [x] 品牌句与 canonical outro 同帧开始
- [x] 3:4 + 4:3 两张封面分别完成原尺寸 / 50% / 25% 审计
- [ ] 用户人工确认最终成片

## 发布后数据

| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
