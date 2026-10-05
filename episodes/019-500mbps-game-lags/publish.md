# Publish Record — 测速500Mbps，为什么打游戏还是会卡？

## 状态
- 平台：抖音
- 状态：V5 Final Candidate / 待人工确认
- 版本：V5
- 发布日期：
- 发布链接：

## 生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- V1 Production Build：`37260303320`，全绿但第一答案 `3.408s`、body `27.920s`、final `32.533s`，主动淘汰
- V2 Production Build：`37260616494`，全绿；第一答案 `2.816s`、body `22.065s`、final `26.683s`，但字幕语义切分失败，主动淘汰
- V3 Production Build：`37261080466`，全绿；第一答案 `2.816s`、body `23.236s`、final `27.850s`，但最后一条字幕仍发生未完成语义跨 cue，主动淘汰
- V4 Production Build：`37261395617`，全绿；第一答案 `2.816s`、body `23.078s`、final `27.700s`，但字幕仍发生 `都会让游戏 / 更卡` 拆分，主动淘汰
- V5 Production Build：`37261660554`，全绿通过
- Source：`1226c97692473e6469e150ec6d0927e16bc3ae22`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- 第一答案结束：`2.815791s`（目标 `<3s`，达标）
- “测速别只看Mbps”行动信息：`10.868416s`
- “下载再快”结论进入：`16.657875s`
- 正文结束 / canonical outro 起点：`22.683541s`
- 最终成片时长：`27.300000s`
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
- V2 时长与首答均达标，但最终 ASS 出现紧密短语跨 cue 拆分，因此不因 Build 全绿而放行。
- V3 主体视觉审计通过，但最后仍有 `都会影响 / 游戏体验` 的未完成语义拆分，继续拒绝。
- V4 仍有 `都会让游戏 / 更卡` 的跨 cue 拆分，继续拒绝。
- V5 最终 ASS 共 7 条正文 cue，全部为完整语义，无技术 token 拆分、无强制换行残留。
- V5 visual audit 的 contact sheet、shot boundary、正文→canonical outro 边界全部人工查看通过。
- 双封面 3:4 / 4:3 已分别完成原尺寸、50%、25% 审计。
- 数据目标：2s 跳出 `<35%`；5s 播放率 `>30%`；平均播放 `>6s`。

## 发布前检查
- [x] Cloudflare / Riot 官方资料完成事实核验
- [x] 不把 speed-test throughput 与 bandwidth 完全等同
- [x] 不把游戏卡顿全部归因于网络
- [x] 不给跨游戏统一 ping 阈值
- [x] 最终 TTS timing 回填
- [x] 第一答案在 3s 前完成
- [x] 字幕与主视觉不冲突
- [x] Production Build 全绿
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
