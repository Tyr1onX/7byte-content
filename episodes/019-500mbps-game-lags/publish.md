# Publish Record — 测速500Mbps，为什么打游戏还是会卡？

## 状态
- 平台：抖音
- 状态：V2 Production / 制作中
- 版本：V2
- 发布日期：
- 发布链接：

## 生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- V1 Production Build：`37260303320`，全绿但第一答案 `3.408s`、body `27.920s`、final `32.533s`，主动淘汰
- V2 Production Build：待回填
- Source：待回填
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- 第一答案结束目标：`<3s`
- “测速别只看Mbps”行动信息：待回填
- “下载再快”结论进入：待回填
- 正文结束 / canonical outro 起点：待回填
- 最终成片时长：待回填
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical horizontal header
- 横版 outro：canonical horizontal outro
- 最终成片长期存储：`/7BYTE/EP019/final.mp4`
- 竖版封面：`/7BYTE/EP019/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP019/cover-horizontal-4x3.png`

## 发布标题
`测速500Mbps，为什么打游戏还是会卡？`

## 发布简介
`下载测速很高，不代表游戏延迟一定低。Mbps主要反映单位时间的数据传输速率；实时游戏还会受到延迟、抖动和丢包影响。测速时除了 Download/Upload，也可以一起看 Latency/Ping、Jitter 和 Packet Loss。网络只是游戏卡顿的可能原因之一，帧率、设备和服务器状态也可能影响体验。`

## 话题
`#计算机科普 #网络知识 #游戏网络 #延迟 #电脑知识`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 本期实验
- EP018 发布后数据尚未回填，不以未知结果做选题推断。
- 延续 EP016/EP017 已知结论：大众现象有分发潜力，但前 2–5 秒必须更快交付价值。
- 唯一实验变量：第一稳定帧 + 第一口播在前 3 秒直接给出 `500 Mbps ≠ 低延迟`。
- 数据目标：2s 跳出 `<35%`；5s 播放率 `>30%`；平均播放 `>6s`。

## 发布前检查
- [x] Cloudflare / Riot 官方资料完成事实核验
- [x] 不把 speed-test throughput 与 bandwidth 完全等同
- [x] 不把游戏卡顿全部归因于网络
- [x] 不给跨游戏统一 ping 阈值
- [ ] 最终 TTS timing 回填
- [ ] 第一答案在 3s 前完成
- [ ] 字幕与主视觉不冲突
- [ ] Production Build 全绿
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
