# Core — 测速500M，为什么打游戏还是会卡？

## 核心问题
测速下载已经达到约 500 Mbps，为什么实时游戏仍可能出现明显卡顿或操作延迟？

## 观众最终只需要记住
高下载吞吐量不等于低延迟。下载 Mbps 描述单位时间能传多少数据；实时游戏更关心数据往返游戏服务器要多久，以及这个延迟是否稳定。即使下载速度很高，只要到游戏服务器的往返延迟较高，操作反馈仍会慢；延迟波动和丢包也会进一步影响实时体验。

## 事实链路
1. Cloudflare AIM 不只看下载/上传速度，还独立测量 latency、loaded latency、jitter 和 packet loss，并据此分别评估 gaming、streaming 和 RTC 质量。
2. IETF RFC 9439 将 bandwidth、network delay、delay variation（jitter）和 packet loss rate 定义为不同的网络性能指标。
3. 实时交互对延迟敏感：一次输入需要经过网络到达服务器并返回结果，吞吐量很高并不能消除这段往返等待。
4. Jitter 本质上是包延迟的变化；packet loss 则表示数据包未成功到达。两者都与“下载 Mbps”是不同维度。
5. 测速站点测到的 latency 是到测试节点的结果，不应直接当成到游戏服务器的 latency；实际排查游戏卡顿时，优先看游戏内或到游戏服务器路径上的 Ping/延迟数据。

## 本期边界
- 不把“游戏卡”全部归因于网络；帧率、CPU/GPU、游戏服务器本身也可能造成卡顿。
- 不给出“多少 ms 一定算好/坏”的绝对阈值，因为不同游戏、地区和服务器路径不同。
- 不把普通测速站的 Ping 直接等同于游戏服务器 Ping。
- 不展开 Wi-Fi 信道、Bufferbloat、路由优化、加速器等后续专题。

## 事实核验
- Cloudflare Developers — Aggregated Internet Measurement: https://developers.cloudflare.com/speed/aim/
- Cloudflare Developers — Troubleshooting a slow website / Internet connection metrics: https://developers.cloudflare.com/speed/troubleshooting/slow-website/
- RFC 9439 — ALTO Performance Cost Metrics: https://www.rfc-editor.org/rfc/rfc9439.html
- RFC 3550 — RTP / interarrival jitter: https://www.rfc-editor.org/rfc/rfc3550.html
- 核验日期：2026-10-05。
