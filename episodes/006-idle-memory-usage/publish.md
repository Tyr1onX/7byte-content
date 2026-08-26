# Publish Record — 16GB 内存，为什么电脑刚开机就占了一半？

## 状态
- 平台：抖音
- 状态：制作中
- 版本：Production Candidate
- 发布日期：
- 发布链接：

## 最终生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical `/7BYTE/brand/header-horizontal.png`
- 横版 outro：canonical `/7BYTE/brand/outro-horizontal-canonical.mp4`
- 品牌句与 outro 同帧起步
- 最终成片长期存储：`/7BYTE/EP006/final.mp4`
- 竖版封面：`/7BYTE/EP006/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP006/cover-horizontal-4x3.png`

## 发布标题
`16GB 内存，为什么电脑刚开机就占了一半？`

## 发布简介
`任务管理器里的“已使用”不只来自你看得见的软件，Windows 内核、驱动、后台服务和进程工作集都会占物理内存。缓存里的待机内存则属于“可用”，应用真正需要时可以重新分配。判断内存够不够，别只盯开机占用率，更要看可用内存和实际卡顿。`

## 话题
`#计算机科普 #计算机基础 #Windows #电脑知识 #内存`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 自主声明
- 按发布时抖音实际 UI 与内容情况选择，不在仓库预设平台状态。

## 本期实验变量

1. **时长压缩**：EP005 为 50s+；EP006 目标最终约 40s，把核心反转提前到正文约 20–24 秒前。
2. **发布节奏**：本期成片完成后按“中间空两天再发”的节奏发布，用于和 EP005 的隔一天节奏做后续样本比较。

除以上两项外，横版品牌层、Yunyang `-5%`、字幕路线和整体 Motion 语言保持稳定。

## 发布前检查
- [ ] 最终 TTS timing 回填
- [ ] Hook 前 3–5 秒问题成立
- [ ] `In Use / Available / Standby` 表达准确
- [ ] Standby 明确属于 Available，不误说成全部计入已使用
- [ ] 进程列表与整机占用关系没有过度简化
- [ ] 核心反转在目标时间内出现
- [ ] 字幕与主视觉不冲突
- [ ] 视觉审计通过
- [ ] canonical header / watermark / outro 完全复用
- [ ] 品牌句与 canonical outro 同帧开始
- [ ] 3:4 + 4:3 两张封面分别审计
- [ ] 用户人工确认最终成片

## 发布后数据

| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
