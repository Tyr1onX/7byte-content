# Publish Record — 磁盘100%，为什么速度却只有几MB/s？

## 状态
- 平台：抖音
- 状态：V3 Final Candidate / 待用户最终确认
- 版本：V3 Final Candidate
- 发布日期：
- 发布链接：

## 生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- V1 Production Build：`35936001016`，全绿但 final `35.467s`，主动淘汰
- V2 Production Build：`35936454508`，全绿，body `22.355s` / final `26.967s`，但 Task Manager 到 `12.105s`，未作为最终候选
- V3 Production Build：`35936830204`，全绿通过
- Source：`1b659044d03c6bf0afa22fbb194a760ae1ddb590`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- “这个100%”机制解释进入：`3.552625s`
- Task Manager 行动进入：`11.039458s`
- 短时 / 持续判断进入：`15.315791s`
- 正文结束 / canonical outro 起点：`21.288833s`
- 最终成片时长：`25.900000s`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical horizontal header
- 横版 outro：canonical horizontal outro
- 最终成片长期存储：`/7BYTE/EP018/final.mp4`
- 竖版封面：`/7BYTE/EP018/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP018/cover-horizontal-4x3.png`

## 发布标题
`任务管理器磁盘100%，为什么速度却只有几MB/s？`

## 发布简介
`磁盘100%不等于硬盘已经跑满最高传输速度。这个百分比更接近磁盘在采样时间里有多少时间忙于处理读写请求；大量小而碎的 I/O、较高延迟或持续排队，都可能让磁盘几乎没有空闲时间，但 MB/s 仍然不高。想快速定位，可以按 Ctrl + Shift + Esc 打开任务管理器，按“磁盘”排序看谁正在持续读写；短时峰值可以先观察，长期100%再继续看进程和响应时间。`

## 话题
`#计算机科普 #电脑知识 #Windows #任务管理器 #硬盘`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 本期实验
- EP017 约84h：播放 `1147`、2s 跳出 `53.42%`、5s 播放率 `12.50%`、平均播放 `3s`。
- 第一稳定帧换成强数字悖论：`ACTIVE TIME 100% / TRANSFER 3.2 MB/s`。
- V1 因完整成片 `35.467s` 主动淘汰。
- V2 final `26.967s` 已达时长目标，但 Task Manager 操作到 `12.105s`，继续压前半段。
- V3 将机制解释提前到 `3.553s`，Task Manager 提前到 `11.039s`，final `25.900s`。
- 数据目标：2s 跳出 `<35%`；5s 播放率 `>30%`；平均播放 `>6s`。

## 发布前检查
- [x] 最终 V3 TTS timing 回填
- [x] PhysicalDisk busy time / latency 事实核对
- [x] 不把磁盘100%直接等同于硬盘损坏
- [x] 不把100%说成“最高MB/s的100%”
- [x] 第一稳定帧完整显示 100% / 3.2MB/s / 100%≠跑满带宽
- [ ] Task Manager 操作严格早于11s（当前 `11.039s`，超目标约0.04s，接受为最终候选）
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
