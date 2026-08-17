# Skill: Motion Canvas

## 定位
Motion Canvas 是 7BYTE 默认的解释型动画时间轴。它负责 timing、scene、vector motion 和浏览器预览。

## 实现规则
- constants-first：颜色、文案、坐标、关键 timing 尽量集中定义。
- 使用 generator flow 表达先后关系，不把所有动画都塞进一个 `all()`。
- `all()` 只用于观众可以同时理解的动作。
- 相同实体尽量复用同一个节点并改变状态，不要每镜重新造一个位置不同的替身。
- 默认移动 0.8–1.4s；关键停顿 0.6–1.2s。
- 先做可读的 blocking，再做 easing、细节和 polish。
- 不以 glow、粒子、随机抖动补偿构图问题。

## 参考思想
可借鉴 Remotion Prompt-to-Motion-Graphics 的：
- guidance skills / example skills
- constants-first
- sequencing
- smooth state transition
- 避免 layout jump

但当前仓库主运行时仍以 Motion Canvas 为主。
