# Core — 测速500Mbps，为什么打游戏还是会卡？

## 核心问题
为什么一次测速显示很高的下载 Mbps，实时游戏仍然可能延迟明显、操作反馈慢或不稳定？

## 观众最终只需要记住
测速里的下载 Mbps 主要反映单位时间实际传输了多少数据，也就是吞吐能力；它不是延迟指标。实时游戏还会受到延迟、抖动和丢包影响，所以“下载很快”不能推出“游戏一定不卡”。

## 事实链路
1. Cloudflare 的 Speed Test 将 Download throughput 定义为设备从网络边缘接收数据的速率，单位 Mbps。
2. 同一套测试把 latency 单独定义为往返时间（RTT）；jitter 是延迟随时间的变化。
3. Cloudflare AIM 在评估 gaming 网络质量时，不只看下载/上传，还同时使用 latency、packet loss、loaded latency 和 jitter。
4. Riot Games 的连接诊断同样把 Avg Latency、Avg Packet Loss、Avg Jitter 分开统计，说明实时游戏网络质量不是单一下载速率指标可以代表的。
5. 因此两条连接即使下载测速都接近 500 Mbps，只要其中一条延迟更高、抖动更大或存在丢包，游戏体验仍可能明显更差。

## 本期边界
- `500 Mbps / 180 ms` 只作为视觉示意，不代表固定套餐、固定游戏或统一阈值。
- 不声称网络是游戏卡顿的唯一原因；帧率、服务器负载、设备性能等也可能造成“卡”。
- 不把 bandwidth 与 speed-test throughput 完全等同；视频口语层只强调“Mbps 与 latency 是不同指标”。
- 不承诺某个 ping 数值以下一定流畅，不给跨游戏统一阈值。

## 事实核验
- Cloudflare Speed — Aggregated Internet Measurement: https://developers.cloudflare.com/speed/aim/
- Cloudflare One — Speed test metrics: https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/speed-test/
- Cloudflare Learning Center — What is latency?: https://www.cloudflare.com/learning/performance/glossary/what-is-latency/
- Riot Games Support — Connection Troubleshooting Log Reader: https://support.riotgames.com/en-us/league-of-legends/connectivity/connection-troubleshooting-log-reader/
- 核验日期：2026-10-05。
