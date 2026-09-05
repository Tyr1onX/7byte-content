# Publish Record — 100W 充电器给 25W 手机充电，会不会把手机充坏？

## 状态
- 平台：抖音
- 状态：制作中
- 版本：V1 Candidate
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
- 最终成片长期存储：`/7BYTE/EP011/final.mp4`
- 竖版封面：`/7BYTE/EP011/cover-vertical-3x4.png`
- 横版封面：`/7BYTE/EP011/cover-horizontal-4x3.png`

## 发布标题
`100W充电器给25W手机充电，会不会把手机充坏？`

## 发布简介
`100W 是充电器能提供的最大能力，不代表它会一直向设备输出 100W。以 USB PD 为例，充电器会先公布可提供的电压/电流能力，设备再请求自己能接受的供电条件，之后才按协商结果输出；电量、温度、协议和线材还会进一步限制实际充电功率。`

## 话题
`#计算机科普 #充电器 #快充 #USB #手机知识`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 本期实验
- 继续约 `48h` 发布节奏。
- EP010 约 48h：播放 `2391`、2s 跳出 `39.17%`、5s 完播 `36.26%`、完播率 `2.49%`、平均播放 `9s`。
- EP011 不只做“第一秒给结论”，而是第一稳定帧同时给**具体数字冲突**：`100W MAX → 25W LIMIT → ≈25W`。
- 目标：2s 跳出重新压回 `<30%`，5s 播放率回到 `>50%` 附近；若仍失败，下一期优先调整选题冲突而不是继续微调开场措辞。

## 发布前检查
- [ ] 最终 TTS timing 回填
- [ ] 第一稳定帧已有 `100W / 25W / ≈25W` 的完整冲突
- [ ] USB PD Source / Sink / Request 表述核对
- [ ] 不把 100W 说成固定输出
- [ ] 不把私有快充兼容性说成绝对
- [ ] 字幕与主视觉不冲突
- [ ] 视觉审计通过
- [ ] shot boundary / body end ownership 审计通过
- [ ] canonical header / watermark / outro 完全复用
- [ ] 品牌句与 canonical outro 同帧开始
- [ ] 3:4 + 4:3 双封面完成原尺寸 / 50% / 25% 审计
- [ ] 用户人工确认最终成片

## 发布后数据

| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
