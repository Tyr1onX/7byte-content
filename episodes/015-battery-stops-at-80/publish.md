# Publish Record — 插着电，为什么停在80%？

## 状态
- 平台：抖音
- 状态：V2 Final Candidate / 待用户最终确认
- 版本：V2 Final Candidate
- 发布日期：
- 发布链接：

## 生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Production Build：`34838813887`，全绿通过
- Source：`83a59e7d8e679d6a94b3c1fc2367f7691734535a`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- Smart charging 解释进入：`4.750s`
- “80% 不是统一标准”：`12.842s`
- 行动选择进入：`15.697s`
- 正文结束 / canonical outro 起点：`23.696708s`
- 最终成片时长：`28.316667s`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical horizontal header
- 横版 outro：canonical horizontal outro
- 最终成片长期存储：`/7BYTE/EP015/final.mp4`（待用户确认后归档）
- 竖版封面：`/7BYTE/EP015/cover-vertical-3x4.png`（待用户确认后归档）
- 横版封面：`/7BYTE/EP015/cover-horizontal-4x3.png`（待用户确认后归档）

## 发布标题
`插着电，为什么电量一直停在80%？`

## 发布简介
`笔记本插着电却不继续充到100%，不一定是电池坏了。部分设备会启用 Smart charging 或厂商的电池保养模式，主动把最大充电水平限制在低于100%的范围，减少长期满电对锂离子电池寿命的不利影响。不同厂商和机型的阈值并不一样，80%只是常见策略之一。`

## 话题
`#计算机科普 #电脑知识 #笔记本 #电池 #Windows`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 本期实验
- 保持约 `48h` 发布节奏，不同时改分发节奏。
- EP014 约发布后 46h：播放 `1022`、2s 跳出 `36.99%`、5s 播放率 `21.35%`、完播率 `2.35%`、平均播放 `5.25s`、平均播放占比 `14.06%`。
- EP015 第一稳定帧压缩成一个数字冲突：`PLUGGED IN ✓ / 80% / NOT CHARGING`，第一句立即交付“不一定是坏了”。
- V1 Production Build `34838406620` 虽全绿，但完整成片约 `32.817s`，主动拒绝作为最终候选。
- V2 Production Build `34838813887` 将正文压到 `23.697s`、完整成片 `28.317s`，进入本期 `27–30s` 目标区间。
- 目标：2s 跳出 `<30%`；5s 播放率 `>45%`；平均播放 `>7s`。

## 发布前检查
- [x] 最终 V2 TTS timing 回填
- [x] Microsoft Smart charging 事实核对
- [x] 不把 80% 说成所有设备统一阈值
- [x] 不把“低于100%不充”全部归因为智能充电
- [x] 第一稳定帧完整显示插电 / 80% / 不继续充的冲突
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
