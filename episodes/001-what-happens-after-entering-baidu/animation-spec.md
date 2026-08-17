# Animation Spec v2

画布：1080×1920，9:16。预览 30fps，最终目标 60fps。

## 视觉基线
- 背景：炭黑 `#111210`
- 主文字：米白 `#F2F0E7`
- 次文字：灰绿 `#9B9E95`
- 主强调：酸黄绿 `#D9FF6A`
- 次强调：暖米色 `#E9D9B5`
- 禁止默认蓝紫渐变、霓虹 glow、玻璃卡片、背景粒子。

## Stable coordinates
在抽象网络阶段保持空间连续：
- Browser anchor: x ≈ -300, y ≈ 220, scale ≈ 0.56
- DNS: x ≈ 290, y ≈ -190
- Server: x ≈ 300, y ≈ 350

同一实体不能因为进入下一句口播就无理由换位置。布局变化必须表达叙事变化，例如最终浏览器重新回到画面中心。

## Timing defaults
- 普通淡入：0.35–0.65s
- 主要布局变化：0.8–1.0s
- packet 单程位移：1.0–1.3s
- packet 到达后的停顿：0.45–0.8s
- 关键结果阅读：0.8–1.3s
- 禁止把主要语义运动压缩到 0.2–0.3s。

## Motion rule
同一时刻最多一个主要运动对象。

`packet` 是网络传输阶段的主运动对象；DNS、server、browser 主要承担稳定锚点。不要同时让节点漂移、缩放、发光、旋转。

## States
1. Programmatic browser input
2. Browser moves to persistent left anchor
3. DNS query packet
4. DNS answer packet / IP result
5. DNS de-emphasis
6. Server appears at fixed right anchor
7. Connection path draws
8. HTTPS secure state
9. HTTP `GET /` packet
10. Server acknowledgement
11. HTML response → structure appears
12. CSS response → visual styling appears
13. JS response → interaction state appears
14. IMG/assets response → page becomes fuller
15. Network infrastructure fades
16. Same browser returns to center / render complete
17. Six-step summary
18. 7BYTE outro

## UI realism
程序化浏览器要像“浏览器”，但不追求像素级复制 Edge/Chrome：
- 有 tab 区、地址栏、内容区；
- UI 元素尺寸与间距符合真实软件习惯；
- 不展示真实账号、书签、扩展、通知或本机路径；
- 若后续发现程序化 UI 明显降低可信度，再替换开头/结尾为 OBS 真实录屏，不影响中间 Motion Canvas 结构。

## Causality
资源返回必须改变页面：
- HTML → 结构；
- CSS → 样式；
- JS → 可交互状态；
- IMG/assets → 资源完善。

如果一个飞行动画抵达后画面没有发生语义变化，则删掉该飞行动画。

## Acceptance
- 任意阶段暂停 1 秒，观众能判断当前在讲 DNS / 连接 / HTTPS / HTTP / 资源 / 渲染中的哪一步。
- 手机上最小必要文本仍可读。
- 没有明显“AI 科技模板”视觉。
- 网络数据使用 packet，而不是发光粒子。
- 运动速度允许观众跟上口播，不抢口播。
- 开头与结尾都回到浏览器，形成视觉闭环。
