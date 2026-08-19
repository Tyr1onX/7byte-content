# Animation Spec v3

画布：1080×1920，9:16。预览 30fps，最终目标 60fps。目标成片约 58～62 秒。

## 视觉基线
- 背景：炭黑 `#111210`
- 主文字：米白 `#F2F0E7`
- 次文字：灰绿 `#9B9E95`
- 主强调：酸黄绿 `#D9FF6A`
- 次强调：暖米色 `#E9D9B5`
- 禁止默认蓝紫渐变、霓虹 glow、玻璃卡片、背景粒子。

## 竖屏舞台
EP.001 采用 V3 vertical-first 方案：
- Browser 为主要视觉锚点；
- 网络流程沿画面纵向展开；
- DNS / Server 出现在浏览器下方；
- packet 沿同一条纵向路径运动；
- 不再使用横向桌面信息图式构图。

同一实体不能因为进入下一句口播就无理由换位置。布局变化必须表达叙事变化，例如最终浏览器重新回到画面中心。

## Timing defaults
### 真正的运动速度
- 普通淡入/淡出：0.3–0.55s
- 主要布局变化：0.75–1.0s
- packet 单程位移：1.1–1.4s
- 页面状态变化：0.35–0.6s

这些动作不应该为了凑一分钟而整体变成慢动作。

### 阅读与口播停留
- 主字幕切换后：先留 0.8–1.4s 让观众读到当前句意；
- packet 抵达关键节点后：0.7–1.2s；
- DNS 得到 IP 的结果：1.8–2.5s；
- `连接已建立`：约 2s；
- `HTTPS · 加密通道`：约 2.5–3.5s；
- 每个 HTML / CSS / JS / IMG 状态变化后：0.7–1.1s；
- 最终完整网页：至少 2.5s。

**成片变长主要靠状态停留，不靠把所有 tween 放慢。**

## 60 秒粗时间轴
- 00:00–00:07 Hook / 地址栏输入
- 00:07–00:20 DNS
- 00:20–00:31 Connection + HTTPS
- 00:31–00:38 HTTP GET
- 00:38–00:51 HTML / CSS / JS / IMG
- 00:51–00:56 Render
- 00:56–01:00 Summary + Outro

## Motion rule
同一时刻最多一个主要运动对象。

`packet` 是网络传输阶段的主运动对象；DNS、server、browser 主要承担稳定锚点。不要同时让节点漂移、缩放、发光、旋转。

## States
1. Programmatic browser input
2. Browser moves to upper anchor
3. DNS query packet
4. DNS answer packet / IP result
5. Server replaces DNS endpoint
6. Connection established
7. HTTPS secure state
8. HTTP `GET /` packet
9. HTML response → structure appears
10. CSS response → visual styling appears
11. JS response → interaction state appears
12. IMG/assets response → page becomes fuller
13. Network infrastructure fades
14. Same browser returns to center / render complete
15. Six-step summary
16. 7BYTE outro

## UI realism
程序化浏览器要像“浏览器”，但不追求像素级复制 Edge/Chrome：
- 有返回、刷新、地址栏、内容区；
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

## Voice-over sync
Motion Canvas 的最终节奏以真实口播音频为主，不以“代码里每段平均几秒”为主。

在无音频阶段先按上面的 60 秒粗时间轴工作；口播录好后，再把关键切换点贴到实际关键词：`DNS`、`IP`、`连接`、`HTTPS`、`GET /`、`HTML`、`CSS`、`JavaScript`、`图片`、`解析 / 排版 / 绘制`。

## Acceptance
- 任意阶段暂停 1 秒，观众能判断当前在讲 DNS / 连接 / HTTPS / HTTP / 资源 / 渲染中的哪一步。
- 手机上最小必要文本仍可读。
- 没有明显“AI 科技模板”视觉。
- 网络数据使用 packet，而不是发光粒子。
- 运动速度允许观众跟上口播，不抢口播。
- 关键状态有足够停留时间，不出现“字幕刚出来画面就切走”。
- 开头与结尾都回到浏览器，形成视觉闭环。
