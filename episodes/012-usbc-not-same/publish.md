# Publish Record — 同样是 Type-C，为什么有的能接显示器，有的不能？

## 状态
- 平台：抖音
- 状态：V2 制作中
- 版本：V2 Candidate
- 发布日期：
- 发布链接：

## 生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical horizontal header
- 横版 outro：canonical horizontal outro
- 最终成片长期存储：`/7BYTE/EP012/final.mp4`
- 竖版封面：`/7BYTE/EP012/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP012/cover-horizontal-4x3.png`

## 发布标题
`同样是Type-C，为什么有的能接显示器，有的不能？`

## 发布简介
`USB Type-C 不等于一张固定的功能清单。外形相同的 Type-C 端口，实际支持的数据协议、显示输出、USB PD 功率都可能不同，线材本身也可能限制这些能力。买拓展坞、显示器或高速硬盘前，除了看“Type-C”，还要确认数据、视频和供电规格。`

## 话题
`#计算机科普 #TypeC #USB #电脑知识 #数码知识`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 本期实验
- 继续约 `48h` 发布节奏。
- EP011 当前约 20h：播放 `1121`、2s 跳出 `27.81%`、5s 完播 `42.99%`、完播率 `3.28%`、平均播放约 `7s`。
- EP012 锁定“第一帧具体冲突 + 5秒内第二次信息推进”，并主动压缩正文时长。
- V1 Production Build `34016598306` 全绿，但正文约 `37.42s`、完整成片约 `42.03s`，与本期“压缩 5s 后流失空间”的实验目标冲突，因此不作为最终候选。
- V2 删除重复修饰和非必要铺垫，不改变技术结论与视觉结构。
- 目标：2s 跳出保持 `<30%`；5s 播放率提升到 `>50%`；平均播放占比回到 `>25%`。

## 发布前检查
- [ ] 最终 V2 TTS timing 回填
- [x] 第一稳定帧已有 `DISPLAY ✓ / NO SIGNAL ×` 完整冲突
- [x] `USB-C ≠ USB 3.2 / USB4 / USB PD` 表述核对
- [x] DisplayPort Alt Mode / USB4 显示能力边界核对
- [x] 不把所有 USB-C 都说成支持视频
- [x] 线材能力表述不过度绝对化
- [ ] 字幕与主视觉不冲突
- [ ] 视觉审计通过
- [ ] shot boundary / body end ownership 审计通过
- [ ] canonical header / watermark / outro 完全复用
- [ ] 品牌句与 canonical outro 同帧开始
- [x] 3:4 + 4:3 双封面完成原尺寸 / 50% / 25% 审计
- [ ] 用户人工确认最终成片

## 发布后数据

| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
