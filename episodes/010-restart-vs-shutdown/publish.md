# Publish Record — 电脑卡了，为什么重启比关机再开机更管用？

## 状态
- 平台：抖音
- 状态：最终确认 / 待发布
- 版本：V2 Final
- 发布日期：
- 发布链接：

## 最终生产基线
- 画布：`1920×1080 / 16:9`
- 帧率：`60fps`
- Voice：`zh-CN-YunyangNeural`
- Voice rate：`-5%`
- Production Build：`33601829051`，全绿通过
- Source：`b8693d62dd55b0d215cc26e95242e643a45f94bf`
- Timing：最终 TTS WordBoundary + `production.json.phaseMarkers`
- Fast Startup 解释进入：约 `4.895s`
- 下次开机恢复：约 `13.632s`
- Restart / Full Boot 核心区别：约 `16.934s`
- 排故场景：约 `22.461s`
- 行动结论：约 `28.461s`
- 正文结束 / canonical outro 起点：约 `32.684s`
- 最终成片时长：约 `37.30s`
- 字幕：7BYTE Auto Subtitle Skill；Hook 与 canonical outro cue 抑制普通字幕
- 横版 header：canonical horizontal header
- 横版 outro：canonical horizontal outro
- 品牌句与 outro 同帧起步

## 发布标题
`电脑卡了，为什么“重启”比关机再开机更管用？`

## 发布简介
`Windows 开启“快速启动”时，普通关机会注销用户，但可把内核会话和部分驱动状态保存到休眠文件，下次开机直接恢复；Restart 不使用 Fast Startup，而是执行完整启动周期。所以排查驱动、更新或异常系统状态时，“重启”往往比关机再开更有效。`

## 话题
`#计算机科普 #电脑知识 #Windows #电脑技巧 #系统`

## 合集
- 如已有“计算机基础”合集，加入该合集；否则不为单期新建。

## 本期实验
- 继续约 `48h` 发布节奏。
- 固定 EP009 已验证的 Hook 规则：第 1 秒直接给反常识新信息。
- 第一稳定帧直接显示：`电脑卡了，重启反而可能更彻底`。
- V1 Production Build 虽通过，但完整成片约 `46.95s`；主动压缩解释后重跑 V2，最终约 `37.30s`。
- 重点观察：2s 跳出能否继续维持在 30% 以下，同时提高中段留存与收藏/评论。

## 发布前检查
- [x] 最终 TTS timing 回填
- [x] 第 1 秒已经出现新信息
- [x] Fast Startup / Restart 技术边界由 Microsoft 官方文档核对
- [x] 不把“关机”说成“没关机”
- [x] 不建议默认关闭 Fast Startup
- [x] 字幕与主视觉不冲突
- [x] 视觉审计通过
- [x] shot boundary / body end ownership 审计通过
- [x] canonical header / watermark / outro 完全复用
- [x] 品牌句与 canonical outro 同帧开始
- [x] 3:4 + 4:3 双封面完成原尺寸 / 50% / 25% 审计
- [x] 用户人工确认最终成片

## 发布后数据

| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 2s跳出 | 5s完播 | 完播率 | 平均时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h | | | | | | | | | | | |
| 72h | | | | | | | | | | | |
| 7d | | | | | | | | | | | |
