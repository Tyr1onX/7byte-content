# Publish Record — 电脑都关机了，为什么鼠标键盘还亮着？

## 状态
- 平台：抖音
- 状态：已发布
- 版本：V4 Final
- 发布日期：2026-08-28 18:00
- 发布链接：

## 最终生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Production Build：`33031195483`，全绿通过
- Source：`2929988356c1d413e805e0c222a4ef9b6d1e2399`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- 正文结束 / canonical outro 起点：约 `24.407s`
- 最终成片时长：约 `29.02s`
- `+5VSB` 机制进入：约 `9.13s`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical `/7BYTE/brand/header-horizontal.png`
- 横版 outro：canonical `/7BYTE/brand/outro-horizontal-canonical.mp4`
- 品牌句与 outro 同帧起步
- 最终成片长期存储：`/7BYTE/EP007/final.mp4`
- 竖版封面：`/7BYTE/EP007/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP007/cover-horizontal-4x3.png`

## 发布标题
`电脑都关机了，为什么鼠标键盘还亮着？`

## 发布简介
`关机不等于物理断电。桌面机仍接着交流电时，ATX 电源的 +5VSB 待机供电可能继续给软开机、唤醒电路和部分 USB 端口供电，所以系统已经关机，外设仍可能亮灯或继续充电。`

## 话题
`#计算机科普 #电脑知识 #Windows #主板 #USB`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 自主声明
- 按发布时抖音实际 UI 与内容情况选择，不在仓库预设平台状态。

## 本期策略
- 继续 `48h` 左右发布节奏，不把频率作为新变量。
- 原目标成片约 `36–42s`；结合 EP006 的中段留存表现，V4 主动压缩口播，最终约 `29.02s`。
- 核心结论 `关机 ≠ 物理断电` 在约 `3.92s` 建立，`+5VSB` 在约 `9.13s` 进入，避免把关键解释拖到 20 秒后。

## 发布前检查
- [x] 最终 TTS timing 回填
- [x] Hook 前 3–5 秒问题成立
- [x] `关机 ≠ 物理断电` 表达准确
- [x] `+5VSB` 只描述为待机供电，不误说所有 USB 必然持续供电
- [x] BIOS / UEFI 设置明确说明因主板而异
- [x] G3 / Mechanical Off 视觉表达准确
- [x] 字幕与主视觉不冲突
- [x] 视觉审计通过
- [x] canonical header / watermark / outro 完全复用
- [x] 品牌句与 canonical outro 同帧开始
- [x] 3:4 + 4:3 两张封面分别审计
- [x] 用户人工确认最终成片

## 发布后数据

| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 早期 | 5321 | 50 | 6 | 17 | 4 | 28.54% | 39.88% | 4.64% | 8s | 1 | 推荐页 99.2%；平均播放占比 27.38% |
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
