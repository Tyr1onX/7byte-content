# EP002 Design Notes

- 继续使用 7BYTE 黑/炭灰 + 暖白 + `#D8FF68` 单强调色。
- 本期最重要的视觉锚点是：**手机 Wi-Fi 始终满格，但路由器之后可以失败。**
- 本期采用 **16:9 / 1920×1080 横版正文**。这个选题本质是链路关系，横向空间更适合解释 `设备 → 路由器 → 运营商 → DNS → 服务器`。
- 故障状态只用少量红色 `×`/边框，不把整屏变红。
- 正文约 57.45 秒，随后直接进入 canonical 片尾。
- 字幕采用 Auto Subtitle Skill：真实 TTS timing、最多两行、像素宽度检测，并预留独立字幕带。
- Hook 已经完整显示标题，因此 Hook 对应字幕 cue 主动抑制；canonical 片尾同理，不再叠一遍相同字幕。
- 片尾不设计：直接复用 canonical；横版中只等比缩放并居中留黑，不拉伸、不裁内容、不重绘。
- 封面仍分别准备 3:4 与 4:3；视频画幅和平台封面画幅是两件不同的事。

## V1：竖版布局事故

V1 竖版出现标题被手机遮挡、链路节点与字幕重叠、文字接近可读区边缘。根因不是单个坐标写错，而是布局契约缺失：

1. **画布方向与信息结构不匹配**：天然横向的网络链路被强行纵向堆叠。
2. **动画层与字幕层互不知情**：Motion Canvas 与 FFmpeg 字幕争用同一片底部空间。
3. **只检查字幕出屏，不检查字幕遮挡正文。**
4. **大量绝对坐标 + 节点移动/缩放**，状态变化后空间关系失效。
5. **渲染几何缺少强校验**，旧 capture 默认值可能与项目画布不一致。

因此改为横版，并建立主视觉区 / 字幕保留区。

## V2：横版后仍然暴露的结构问题

横版解决了空间不足，但第一次横版仍出现：

- 开头出现两段孤立短线。
- 手机 / 路由器移动后，连接线没有继续接在节点边缘。
- 完整链路下方出现与节点分离的长线。
- headline / detail / chip 与字幕重复表达同一句话。
- 正文末尾又回到了开头 Hook 画面。

### 根因 1：connector 是静态坐标，不是关系

旧代码里存在无 ref、无显隐管理的 `<Line>`，并且大量 `points={[固定坐标]}`。节点位置改变，线条不会跟着改变；节点 opacity 为 0 时，这些线条仍然可见，于是出现开场“幽灵短线”。

**修复：** 所有连接线必须绑定节点几何：

```tsx
points={() => [from().right(), to().left()]}
```

connector 与对应节点必须放在同一个 shot/group 中，group 隐藏时整组一起隐藏。

### 根因 2：用一组 live nodes 承担多套拓扑

旧实现让 phone/router 同时负责“本地 Wi-Fi 图”和“完整网络链路”，中间不断移动、缩放、改尺寸。这使每个状态都需要重新维护大量绝对坐标，极易出现覆盖和断线。

**修复：** 大的概念变化使用独立 shot。每个 shot 自包含节点、connector、状态标记；切镜时整组切换。组件风格可以复用，但运行时拓扑不强行复用。

### 根因 3：画面文字被当成第二套字幕

旧版本持续改变大 headline，又有 detail / chip / fail badge，同时底部还有字幕，导致同一句解释出现两到三遍。

**修复：**

- 旁白 + 字幕负责完整句子。
- 画面文字只保留实体名、状态、关系标签、决策结果、图例和简短模型。
- 不再用全局 headline 在整条视频里逐句复述旁白。
- Hook 大标题与 canonical 片尾如果已经完整承担当前口播，对应字幕 cue 可主动抑制。

### 根因 4：代码注释时间 ≠ 真实 scene 时间

旧版本注释写着 `49–57.5s`，但真实 generator 由多个 `yield*` 累加后提前结束。浏览器播放器结束后自动回到第 0 帧，而 capture 仍在继续，因此正文尾部录进了开头画面。

**修复：** TTS cue 时间是唯一时间基准。每个 phase 使用：

```tsx
yield* all(
  waitFor(phaseDuration),
  ...phaseAnimations,
);
```

只要其他动画都短于 phaseDuration，这个阶段的真实总时长就固定。正文最终再 trim 到明确的 body end，之后才拼 canonical 片尾。

## V4 当前视觉架构

### Shot 1：Hook

- 只有标题、手机失败状态、`Wi-Fi 满格 / 网页打不开` 的并列对照。
- **不存在任何 connector 节点**，因此第 0 帧不可能再出现孤立线条。

### Shot 2：本地 Wi-Fi

- 手机 → 路由器使用绿色 reactive connector。
- 路由器 → Internet 使用中性 connector，并在讲 Wi-Fi 信号时主动降权。
- 画面文字只有实体和 `Wi-Fi 信号强度` 标签，不复述整句旁白。

### Shot 3：完整访问路径

- 设备 → 路由器 → 运营商 → DNS → 网站服务器横向固定。
- 所有 connector 直接绑定相邻卡片边缘。
- 故障示例通过节点红色边框 + `×` 表达，不再增加整句故障 banner。
- 下方只保留图例：绿色是 Wi-Fi 图标能反映的部分，灰色是需要另外判断的后续网络。

### Shot 4：快速排查

- `换网站` / `你的设备` / `另一台设备` 形成决策 UI。
- 结果只显示一次：`多个设备都失败 → 优先检查网络侧`。

### Shot 5：最终模型

用两个映射表达概念，不重复最后一句字幕：

`Wi-Fi 图标 → 手机 ↔ 路由器（本地无线链路）`

`能否上网 → 整条网络路径`

中间用 `≠` 强化二者不是同一个判断。

## 强制视觉审计

V4 渲染后已经按关键帧审计：

- Hook 初始帧：无孤立线条。
- 本地链路：connector 两端接到手机/路由器边缘。
- 完整链路：四段 connector 均接边，无悬空长线。
- 三种失败状态：没有卡片/文字互相遮挡。
- 排障 UI：字幕位于底部独立安全带，没有覆盖卡片。
- 最终模型：无文本内部重叠。
- 正文末尾：保持最终模型，没有回到 Hook。
- canonical 片尾：只等比适配，没有重绘。

以后每一期都运行 `scripts/audit-video-visual.sh` 生成 contact sheet，并由人或视觉模型实际看图；CI build 成功不能替代这一关。

## V9 视觉实验 01：7-byte packet

在不推翻当前已接受版本的前提下，第一项长期视觉实验只改 **Shot 3 的数据流表达**。

### 目的

让“请求继续向后走”不再只依赖静态 connector，同时尝试建立一个未来可复用的 7BYTE 招牌动作。

### 形式

- 一个 packet 由 **7 个小方块**组成，呼应 `7BYTE`。
- 使用 `#D8FF68`，尾部到头部透明度逐渐增强，表达方向，但不使用 glow。
- packet 只在真正有“数据 / 请求向前传播”含义时出现，不做持续循环背景装饰。
- 当前 EP002 只让它依次经过：`设备 → 路由器 → 运营商 → DNS → 网站服务器`。
- 不增加任何解释文字；字幕仍负责完整口播。

### V9 暴露的问题

理念成立，但首次实现的 packet 是按时间段硬切显隐：到达某个时间点立即出现，时间段结束立即消失。即使位置正确，也会产生明显的“贴纸突然被放上去 / 拿走”的感觉，破坏对象连续性。

**结论：任何承担因果关系的瞬态对象都必须有完整生命周期，不能只有“移动”而没有“进入 / 离开”。**

## V10：packet 生命周期修正

保留 7-byte packet 概念，只修运动品质：

1. 在源节点附近用约 `0.14s` 淡入，而不是瞬间显示。
2. hop 内使用 ease-in-out 运动，不做匀速机械滑行。
3. 到达目标节点时用约 `0.16s` 淡出，表达“被节点接收”，而不是突然消失。
4. 两个 hop 之间留约 `0.12s` 呼吸间隔，再从下一个节点重新发出。
5. packet 仍不穿过卡片主体；出现、运动、消失都发生在 connector 上。
6. 验收必须抽取进入 / 中段 / 到达三个阶段的关键帧，而不只看运动中间帧。

当前仍属于 **episode-local 视觉实验**。只有后续视频也验证这种 packet 生命周期自然、清晰，才考虑提炼为 shared 组件。


## V14：Shot ownership / 提前泄漏修复

用户在 Hook 手机浏览器内发现一个提前出现的绿色小点。定位到它不是渲染随机噪声，而是 SHOT 1 JSX 内遗留的无 ref `<Circle>`：它与 loader 同层、默认可见，但语义属于后续“数据沿链路移动”的视觉语言，因此在当前镜头提前泄漏。

**根因：** shot 虽然按 Layout 分组，但内部仍允许存在没有明确语义归属、没有生命周期控制的静态 primitive。此前只检查 connector 是否孤立，没有检查“当前 shot 是否包含下一 shot 才应该出现的视觉元素”。

**修复：** 删除 Hook 中该静态绿色 Circle。以后执行 shot ownership gate：每个可见 primitive 必须回答“它属于当前 shot 的哪个信息角色”；回答不了就删除或移动到正确 shot。

**边界审计：** 每次切镜必须检查 `切换前 2–3 帧 / 边界帧 / 切换后 2–3 帧`，专门查提前泄漏、残留元素和下一镜头预显。


## V16 endpoint refinement

- Accepted visual change: the endpoint uses one quiet container with one dominant smartphone glyph; nested card chrome is removed.
- Principle: endpoint identity should come from the device silhouette.


## V17 object continuity experiment

- Scope: only the Shot 2 → Shot 3 transition is changed; V16 endpoint, Focus System, BytePacket, subtitles, brand layers and outro remain intact.
- V15 problem: Shot 2 faded out and Shot 3 faded in, forcing the viewer to rebuild the same phone/router relationship.
- V17 keeps the visible phone/router and their reactive connector on screen, moves/scales them into the topology positions, then crossfades to simplified typed nodes at those same positions.
- The Internet placeholder and its line retract/fade first. Shot 3 c1 is pre-drawn while hidden, so the local wireless link reads as one continuous object.
- Audit continuity before/during/after the handoff for double images, connector jumps, premature downstream nodes and temporary residue.


## V20 diagnostic ownership + residual guard

### Root cause fixed

V19 introduced a root-level `handoffDevice` proxy to bridge Shot 3 into Shot 4. Because the proxy lived outside the `diagnostic` layout, fading `diagnostic` could not hide it. Shot 5 then appeared while the proxy was still alive for another 0.72s, creating a real cross-shot visual residue. The diagnostic left side also duplicated the same semantic object: the proxy card said `设备`, while a separate `diagYourLabel` below said `你的设备 / × 上不了网`. This split ownership caused crowding, weak hierarchy, and alignment drift.

### Permanent guard rules

1. **One semantic object, one visible owner.** A handoff proxy may exist only during transfer; target-scene labels/status belong inside that same object, never as a second detached representation.
2. **Proxy lifecycle is mandatory:** spawn aligned with source → transfer ownership → become target representation or retire → opacity must be zero before the next shot introduces a replacement.
3. **Root-level transition proxies are not covered by scene opacity.** Every root-level proxy must therefore have an explicit retirement animation and post-transition zero-opacity state.
4. **Boundary-frame audit:** inspect at least `-3 / -1 / boundary / +1 / +3` frames for every scene handoff. Fail if a semantic object appears twice, a proxy survives after its owner scene, or a detached label remains.
5. **No detached status labels for persistent objects.** Identity + state should travel together whenever the object itself is continuous.
6. **Shot-end invariant:** every ephemeral transition ref must be invisible (`opacity = 0`) before the next shot stable composition is fully visible.

V20 folds `你的设备 / × 上不了网` into the persistent device card, balances the diagnostic flow as `换一个网站 → 你的设备 → 另一台设备`, and fully retires the proxy before the final Wi-Fi-vs-Internet model appears.