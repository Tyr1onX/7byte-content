# Publish Record — 文件都删了，为什么还能恢复？

## 状态
- 平台：抖音
- 状态：生产审计通过 / 待用户最终确认
- 版本：V2 Final Candidate
- 发布日期：
- 发布链接：

## 最终生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Production Build：`33227182401`，全绿通过
- Source：`eedd146b5806da3befac4563a9b3973820c9d263`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- 核心答案进入：约 `3.026s`
- HDD 边界进入：约 `15.000s`
- SSD / TRIM 边界进入：约 `17.566s`
- 正文结束 / canonical outro 起点：约 `31.552s`
- 最终成片时长：约 `36.17s`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical `/7BYTE/brand/header-horizontal.png`
- 横版 outro：canonical `/7BYTE/brand/outro-horizontal-canonical.mp4`
- 品牌句与 outro 同帧起步
- 最终成片长期存储：`/7BYTE/EP008/final.mp4`
- 竖版封面：`/7BYTE/EP008/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP008/cover-horizontal-4x3.png`

## 发布标题
`文件都删了，为什么恢复软件还能找回来？`

## 发布简介
`普通删除通常不是立刻把底层数据全部擦掉，而是先让原来占用的空间变成“可再次使用”。在旧数据被覆盖前，恢复软件有时还能扫描到残留；SSD 还会受到 TRIM 和控制器回收机制影响，因此恢复通常更困难、更不确定。`

## 话题
`#计算机科普 #电脑知识 #数据恢复 #硬盘 #SSD`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 自主声明
- 按发布时抖音实际 UI 与内容情况选择。

## 本期策略
- 继续约 `48h` 发布节奏。
- 延续短正文实验：核心答案约 `3.03s` 即建立；正文约 `31.55s`，完整成片约 `36.17s`。
- SSD / TRIM 作为必要边界放在约 `17.57s`，不把恢复教程或软件推荐塞进本期。
- 第一轮生产审计发现正文结束与品牌 cue marker 不一致，会在片尾前出现播放器 loop；已修正 phase marker/body end 所有权并完整重跑 Production Build 与 Visual Audit，V2 无 loop 回开头。

## 发布前检查
- [x] 最终 TTS timing 回填
- [x] Hook 前 3–5 秒问题成立
- [x] `删除 ≠ 立即擦除` 表达准确且不过度绝对
- [x] 不承诺删除文件一定能恢复
- [x] SSD / TRIM 只表述为释放通知与后续回收，不说瞬间清零
- [x] 字幕与主视觉不冲突
- [x] 视觉审计通过
- [x] shot boundary / body end ownership 审计通过，无 loop 回开头
- [x] canonical header / watermark / outro 完全复用
- [x] 品牌句与 canonical outro 同帧开始
- [x] 3:4 + 4:3 两张封面分别审计
- [ ] 用户人工确认最终成片

## 发布后数据

| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
