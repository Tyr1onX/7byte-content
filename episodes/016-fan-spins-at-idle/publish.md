# Publish Record — 什么都没开，风扇为什么突然狂转？

## 状态
- 平台：抖音
- 状态：V1 Candidate / 待生产与人工确认
- 版本：V1 Candidate
- 发布日期：
- 发布链接：

## 生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Production Build：待运行
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- 横版 header：canonical horizontal header
- 横版 outro：canonical horizontal outro
- 最终成片长期存储：`/7BYTE/EP016/final.mp4`（待确认后归档）
- 竖版封面：`/7BYTE/EP016/cover-vertical-3x4.png`（待确认后归档）
- 横版封面：`/7BYTE/EP016/cover-horizontal-4x3.png`（待确认后归档）

## 发布标题
`明明什么都没开，电脑风扇为什么突然狂转？`

## 发布简介
`桌面没开窗口，不代表 CPU 真空闲。Windows Update、Microsoft Defender 扫描、Windows Search 索引等后台任务都可能短暂占用资源，处理器负载和温度上升时风扇会提高转速。想快速定位，可以按 Ctrl + Shift + Esc 打开任务管理器，按 CPU 排序看谁正在占资源；偶尔几分钟可以先观察，长期高占用或持续高温再继续排查。`

## 话题
`#计算机科普 #电脑知识 #Windows #电脑技巧 #笔记本`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 本期实验
- 保持约 `48h` 发布节奏。
- EP015 约 85h：播放 `1602`、2s 跳出 `31.68%`、5s 播放率 `31.97%`、完播率 `3.22%`、平均播放 `5s`、平均播放占比 `19.11%`。
- EP016 不继续只压总时长；把第二个有效信息点“没窗口 ≠ CPU 没任务”提前到第 `6s` 前。
- 操作价值 `Ctrl + Shift + Esc → CPU ↓` 尽量在 `15s` 前交付。
- 目标正文约 `22–25s`，完整成片约 `27–30s`。
- 目标：2s 跳出 `<30%`；5s 播放率 `>40%`；平均播放 `>7s`。

## 发布前检查
- [ ] 最终 TTS timing 回填
- [x] Windows 后台任务 / 风扇关系事实核对
- [x] 不把后台 CPU 任务说成所有风扇加速的唯一原因
- [x] 第一稳定帧完整显示空桌面 / CPU ↑ / FAN HIGH RPM / 没窗口 ≠ 没任务
- [ ] 第二信息点在 6s 前完成
- [ ] Task Manager 操作在 15s 前进入
- [ ] 字幕与主视觉不冲突
- [ ] 视觉审计与 shot boundary 通过
- [ ] canonical header / watermark / outro 完全复用
- [ ] 品牌句与 canonical outro 同帧开始
- [ ] 3:4 + 4:3 双封面原尺寸 / 50% / 25%审计
- [ ] 用户人工确认最终成片

## 发布后数据
| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
