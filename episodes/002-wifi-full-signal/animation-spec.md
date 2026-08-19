# EP002 Animation Spec

## 输出
- 1080×1920
- 60fps
- 黑/炭灰背景，暖白文字，`#D8FF68` 单一强调色
- 字幕走 `skills/auto-subtitles.md`，最多两行，左右安全宽度检测，整体上抬到抖音 UI 安全区
- 结尾直接复用 `/7BYTE/brand/outro-canonical.mp4`

## 视觉结构

### Phone
- 始终保持同一实体，顶部偏中。
- Wi-Fi 四格信号长期保持满格，作为贯穿本期的反差锚点。

### Router
- 位于 Phone 下方。
- Phone ↔ Router 用荧光绿弧线/链路表示本地无线连接。

### Internet chain
- Router → ISP → DNS → Server 纵向排列。
- 节点采用统一圆角卡片，不做桌面端横向流程图。
- 请求只使用一个主数据包，沿同一纵向轨道移动。

### Failure state
- 每次仅一个节点/链路变为失败状态。
- 红色仅用于 `×` / 断链，不扩散成整屏警告色。
- 手机 Wi-Fi 图标不改变。

### Troubleshooting
- 两台手机左右并排，共享一个路由器。
- 两台都失败：下方提示 `更可能是网络侧`。
- 一台失败：提示 `更可能是设备侧`。

## 动效节奏
- 普通进入/移动 0.6–1.0s。
- 关键结论停留 1.0–1.8s。
- 一次只有一个主运动对象。
- 禁止粒子、glow、无意义 zoom、快速旋转。

## 字幕
- AI/TTS 旁白优先读取 TTS speech-boundary timing。
- 技术词保护：`Wi-Fi`, `DNS`, `IP`, `Internet`, `7BYTE`。
- 单 cue 最多两行。
- 1080 宽画布默认单行最大视觉宽度约 800px。
- 字幕底部安全边距约 350–380px。
