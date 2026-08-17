# Animation Spec v1

画布：1080×1920，9:16。

## Stable coordinates
- Computer / browser anchor: x = -300, y = 180
- DNS: x = 260, y = -240
- Server: x = 300, y = 180

坐标只是 blocking 起点，可以根据手机预览继续调，但同一实体在后续镜头中不要无理由换位。

## Timing defaults
- 普通出现/淡入：0.5–0.8s
- packet 位移：1.0–1.3s
- 关键结果停留：0.7–1.2s
- 主状态 crossfade：0.6–1.0s

## States
1. Browser input
2. Question
3. DNS request
4. DNS response / IP
5. Connection line
6. Secure state
7. HTTP GET packet
8. HTML/CSS/JS/IMG response sequence
9. Rendered page state
10. 7BYTE outro

## Acceptance
- 任何 1 秒截图都应该能知道当前在讲哪一步。
- 同时快速移动的主对象最多 1 个。
- 关键文案在手机尺寸上可读。
- 没有蓝紫霓虹、背景粒子和无意义 glow。
