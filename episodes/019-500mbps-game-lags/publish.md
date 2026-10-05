# Publish Record — 测速500M，为什么打游戏还是会卡？

## 状态
- 平台：抖音
- 状态：V1 制作中 / 待 Production Build
- 版本：V1
- 发布日期：
- 发布链接：

## 生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Production Build：待运行
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical horizontal header
- 横版 outro：canonical horizontal outro
- 最终成片长期存储：`/7BYTE/EP019/final.mp4`
- 竖版封面：`/7BYTE/EP019/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP019/cover-horizontal-4x3.png`

## 发布标题
`测速500M，为什么打游戏还是会卡？`

## 发布简介
`下载速度快，不代表网络延迟一定低。Mbps 描述单位时间能传多少数据；实时游戏更在意你到游戏服务器的数据往返要多久，以及这个延迟是否稳定。排查游戏网络卡顿时，不要只看下载速度，优先看游戏内 Ping；如果延迟还会明显波动，再继续看抖动和丢包。`

## 话题
`#计算机科普 #网络知识 #游戏网络 #Ping #电脑知识`

## 本期实验
- EP018 发布后数据尚未回填，不虚构结论。
- 本期唯一实验变量：答案在前 3 秒完整交付。
- 首帧使用 `DOWNLOAD 512 Mbps / PING 180 ms` 数字冲突。
- 数据目标：2s 跳出 <35%；5s 播放率 >30%；平均播放 >6s。

## 发布前检查
- [x] bandwidth / latency / jitter / packet loss 事实核验
- [x] 不把测速站 Ping 直接等同于游戏服务器 Ping
- [x] 不把所有游戏卡顿归因于网络
- [ ] Production Build 全绿
- [ ] 最终 timing 回填
- [ ] 字幕与主视觉审计
- [ ] shot boundary / ownership 审计
- [ ] canonical header / watermark / outro 审计
- [ ] 3:4 + 4:3 双封面独立审计
- [ ] 用户人工确认最终成片

## 发布后数据
| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
