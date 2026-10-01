# Animation Spec — 无痕不是匿名

- 画布 1920×1080，60fps；所有 shot 使用完整画布 root，内容保持在 y=-360..300。
- 每个 phase 采用 all(waitFor(T[next]-T[current]), animations)，所有动画包含于阶段总时长。
- Shot 1：第一帧完整显示结论与隐私窗口，结果不依赖逐字动画；0.8秒后局部强调。
- Shot 2：浏览器历史列表变为“本机未保留”，窗口对象保持稳定。
- Shot 3：文件与书签两个对象依次强调，关闭窗口不删除它们。
- Shot 4：浏览器、网站与网络节点稳定呈现，仅一个可见连接关系改变；不模拟真实流量或账户。
- Shot 5：本机记录 / 网络身份双栏结论，最终稳定保持至 body end。
- 每个 shot root 初始 opacity=0；切换先隐藏旧 owner 再显示新 owner；没有跨 shot proxy。
- 片尾由 canonical 视频承担；品牌句 cue 与 body end 同帧。
