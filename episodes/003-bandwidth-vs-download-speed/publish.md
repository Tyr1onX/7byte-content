# Publish Record — 1000M 宽带，为什么下载只有 100MB/s？

## 状态
- 平台：抖音
- 状态：**V5 人工审阅中 / 尚未覆盖最终发布文件**
- 发布日期：
- 发布链接：

## V5 审阅视频
- 画布：1920×1080 / 16:9
- 帧率：60fps
- 总时长：`50.216667s`
- 正文：`0–45.592s`
- 横版 canonical 片尾：`45.592s` 起
- AI 人声：`zh-CN-YunyangNeural`
- 固定品牌句：`这里是 7BYTE，把计算机讲简单一点。`，cue start = `45.592s`，与横版片尾同帧起步
- 字幕路线：最终 TTS timing；Hook 与固定品牌句主动抑制普通字幕
- 当前审阅文件：本地 `EP003-v5-review.mp4`；用户确认前不覆盖 `/7BYTE/EP003/final.mp4`

## 横版固定品牌层

本期 V5 开始以 **EP002 云端最终成片作为唯一横版视觉金标**：

- 正文品牌背景：`#0F100E`
- 中央 `7BYTE` 水印：使用 `shared/brand/horizontal-video-chrome.ts` 固定参数，不再逐期修改
- 左上角品牌头：`/7BYTE/brand/header-horizontal.png`
  - 来自 EP002 云端最终成片的实际透明裁切，不是重新绘制
  - 最终 1920×1080 合成坐标：`left=28px, top=18px`
  - 固定尺寸：`278×76`
  - 不新增额外外框、横线、角标或 episode 信息
- 横版片尾：`/7BYTE/brand/outro-horizontal-canonical.mp4`
  - 1920×1080 / 60fps
  - 主体保持 canonical 比例
  - 左右背景使用同一 `#0F100E`，禁止黑边 / 竖版插入感
- 竖版 canonical 继续保留：`/7BYTE/brand/outro-canonical.mp4`

长期规范见 `shared/brand/horizontal-video-brand-lock.md`。

## 封面
- 竖封面：`/7BYTE/EP003/cover-vertical-3x4.png`（1080×1440 / 3:4）
- 横封面：`/7BYTE/EP003/cover-horizontal-4x3.png`（1440×1080 / 4:3）
- 固定品牌：权威头像 + 7BYTE
- 本期主标题：`1000M 宽带，为什么下载只有 100MB/s？`
- 主视觉：`1000 Mbps → ÷8 → 125 MB/s`
- 两个比例分别布局；均已检查原尺寸 / 50% / 25% 缩略图

## 发布文案

### 标题
`1000M 宽带，为什么下载只有 100MB/s？`

### 简介
`千兆宽带里的 1000M 通常指 Mbps，而下载软件常显示 MB/s。8 bit = 1 Byte，所以 1000 Mbps 换算后理论约是 125 MB/s；实际速度还会受协议开销、服务器和设备影响。`

### 话题
`#计算机科普 #计算机基础 #网络基础 #宽带 #网速`

### 合集
如果账号已有“计算机基础 / 网络基础”类合集，放入对应合集；没有则本期不为合集强行新建。

### 自主声明
发布时按抖音实际页面选项处理，不在仓库预设平台侧状态。

## 发布前检查
- [x] V5 审阅成片 1920×1080 / 16:9 / 60fps
- [x] 单一正确 Yunyang 旁白，无叠音
- [x] TTS timing 已成为 scene 时间轴 source of truth
- [x] 字幕使用真实 TTS timing；技术 token 完整
- [x] Hook 大标题与字幕无重复堆叠
- [x] 8 个 bit 数量与布局正确，所有容器内部对齐已修正
- [x] `1000 Mbps ÷ 8 = 125 MB/s` 表达准确清晰
- [x] `≈100 MB/s` 仅作为实际下载示意，不表达成固定承诺值
- [x] 现实因素已从纯文字 pill 恢复为可识别的服务器 → 协议层 → 下载任务 / 设备 UI
- [x] Shot 边界已用精确 seek 复核，无空档、叠影、旧单位残留或提前泄漏
- [x] 正文结尾没有 loop 回 Hook
- [x] V5 正文水印使用 EP002 固定参数
- [x] V5 左上角使用 EP002 云端提取的 canonical header，没有额外重绘 chrome
- [x] V5 横版片尾无黑色侧边栏 / 竖版嵌入感
- [x] `body end == 45.592s == 品牌口播 start == 横版片尾 start`
- [x] 竖 3:4 与横 4:3 封面已分别完成三档缩略图 QA
- [ ] 用户确认 V5
- [ ] 用户确认后覆盖 `/7BYTE/EP003/final.mp4`
- [ ] 用户确认后再做 PR 最终收尾 / 合并决定

## 关键制作复盘

### V1 → V2：边界与信息层级
- 首轮实际渲染发现 Shot 1→2 / Shot 2→3 有 fade-to-empty 空档，Shot 3→4 / Shot 4→5 有 muddy overlap。
- 改为干净 semantic cut；圆头进度线增加显式 opacity lifecycle。
- `8 bit = 1 Byte` 视觉整体放大。

### V2 → V4：布局与 UI 识别
- 用户发现多个框内文字默认落在左上角。根因是容器只有尺寸/边框，没有显式 layout 对齐。
- 所有信息卡、bit 单元和 badge 改为显式 `layout + alignItems + justifyContent`。
- “协议开销 / 服务器 / 设备”不再只是文字标签，改为服务器 → TCP/TLS/IP → 下载任务 / 设备 UI。
- 品牌口播移动到 canonical outro 起点。

### V4 → V5：品牌一致性锁定
- V4 左上角虽然“像 EP002”，但仍是重新绘制的近似组件，存在额外外框 / 线条，违反品牌一致性。
- 片尾用黑色 padding 适配竖版 canonical，导致明显的竖视频嵌入感。
- V5 改为：**EP002 云端最终成片 = 唯一金标**。
- 左上角直接使用从 EP002 最终成片提取的 canonical PNG。
- 正文基础色和水印参数回到 EP002 原值。
- 新增长期横版 canonical 片尾，使用同色背景而不是黑色 padding。
- 横版品牌层正式沉淀为 `shared/brand/horizontal-video-brand-lock.md`，以后不允许逐期重新设计。

### 审计工具修正
WebM 边界帧必须使用精确 seek，不能依赖关键帧近似；`scripts/audit-video-visual.sh` 已修正。

## 本期实验变量

本期最终得到的结论不是“越少对象越好”，而是：

**减少无关对象，但保留可识别 UI；内容层可以每期变化，品牌 chrome 必须固定。**

## 发布后数据

| 时间点 | 播放 | 点赞 | 评论 | 收藏 | 分享 | 完播率 | 平均播放时长 | 新增粉丝 | 备注 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24h |  |  |  |  |  |  |  |  |  |
| 72h |  |  |  |  |  |  |  |  |  |
| 7d |  |  |  |  |  |  |  |  |  |

## 复盘
- 哪个环节可能有效：
- 哪个环节需要改：
- 下期只准备验证的一个变量：
- 备注：
