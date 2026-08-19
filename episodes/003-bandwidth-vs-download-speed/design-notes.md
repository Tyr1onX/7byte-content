# EP003 Design Notes

## 本期视觉目标

这期不继续增加网络拓扑复杂度，而是验证：**只靠数字、单位和一个清晰的 8→1 转换，能不能把知识点讲得比复杂流程图更快、更稳。**

核心视觉记忆：

1. `8 bit = 1 Byte`
2. `1000 Mbps ÷ 8 = 125 MB/s`

但“减少对象”只指减少无关拓扑、重复解释和 handoff，**不等于删除能提供识别与记忆的 UI 实体。**

## 画幅与空间契约

- 正文：`1920×1080 / 16:9 / 60fps`。
- 主视觉优先保持在约 `y=-360..280`。
- 底部约 `y=320..500` 作为字幕保留带。
- `project.meta`、capture viewport、最终输出必须完全一致。
- 正文中央水印和左上角品牌头不是本期设计变量，完全服从横版品牌锁定规范。

## 横版品牌基线（V5 起冻结）

**唯一视觉金标：EP002 云端最终成片。**

完整规范见 `shared/brand/horizontal-video-brand-lock.md`。

正文基础色固定为：

- Background: `#0F100E`
- Surface: `#191A17`
- Raised: `#22231F`
- Border: `#383B33`
- Primary text: `#F4F1E8`
- Secondary text: `#969A90`
- Accent: `#D8FF68`
- Accent dark: `#1D2411`

中央水印固定：`7BYTE / x=0 / y=10 / opacity=0.028 / fontSize=250 / fontWeight=800 / letterSpacing=18`。

左上角正文品牌头最终合成时直接 overlay：

`/7BYTE/brand/header-horizontal.png`

固定位置与大小：`left=28px / top=18px / 278×76`。它来自 EP002 云端最终成片的实际透明裁切，不允许再用 Motion Canvas 拼一个“类似”的头像、文字、下划线或外框。

横版片尾直接使用：

`/7BYTE/brand/outro-horizontal-canonical.mp4`

不再每期临时将竖版 canonical 塞进横屏；片尾背景必须与 `#0F100E` 融为同色，不允许黑色侧边栏。

## 数字与单位层级

- `1000`、`125` 是一级视觉对象，使用大字号、稳定字宽与充分留白。
- `Mbps`、`MB/s` 与数字保持明确绑定，但视觉权重略低。
- `b` 与 `B` 在解释单位时单独高亮。
- `÷ 8` 是关系对象，不是普通正文。
- 技术 token 不拆开。

## 8 bit → 1 Byte

- 使用 **8 个**等尺寸、简单、非发光的小单元表示 8 bit。
- 8 个单元先完整建立，再聚合/归组到 `1 Byte` 外框。
- 不使用 EP002 的 7-byte packet 组件或 7 个方块外观。
- 聚合必须能看清“8 变 1”。
- 结果 `8 bit = 1 Byte` 保留阅读停顿。
- 所有 bit cell、Byte badge 和顶部 b/B 卡片都必须显式 `layout + alignItems + justifyContent`，禁止依赖默认子节点位置。

## Shot / transition 原则

- 本期默认不用复杂 handoff proxy。
- 没有共享 semantic owner 的 shot 边界优先干净 semantic cut。
- 若引入 proxy，仍执行“一语义对象、一可见 owner”和完整退休生命周期。
- 一次只有一个主运动对象。
- 重要结果出现后留出正常阅读时间。

## 现实下载 UI

旁白说到协议开销、服务器和设备时，不允许只出现三个写字的 pill。

V4 起使用可识别关系：

`服务器 → TCP/TLS/IP 协议层 → 下载任务 UI / 设备`

要求：

- 服务器必须能一眼识别为 server。
- 协议层用简洁的 `TCP / TLS / IP` token 表示开销，不展开协议细节。
- 终点是实际下载任务 UI，包含下载速度和进度关系。
- 设备 / 写盘只作为影响因素，不能扩成新知识点。

## 画面文字职责

旁白 + 字幕负责完整句子；画面只保留数字、单位、关系、实体名和状态。

禁止再出现全局 headline 每句跟着口播改字，也不放解释段落作为第二套字幕。

## “约 100MB/s”如何表达

Hook 中 `≈100 MB/s` 是常见现象示例，不是承诺值。

确定性结论只有：

`1000 Mbps ÷ 8 = 125 MB/s（理论换算值）`

现实部分表达“实际通常低于理论换算值”，并用协议、服务器、设备作为影响因素。

## 字幕与人声

- AI 人声：`zh-CN-YunyangNeural`。
- TTS timing 是 scene 时间轴唯一 source of truth。
- 横版默认单行字幕优先。
- Hook 已有完整问题标题时抑制对应字幕。
- 固定品牌句 `这里是 7BYTE，把计算机讲简单一点。` 属于片尾，默认抑制普通字幕。
- `body end == 45.592s == 品牌句 cue start == 横版 canonical outro start`。

## 封面方向

两张封面必须分别布局：3:4 与 4:3。

核心只保留 `1000M → 125MB/s` 或 `1000M 为什么只有 100MB/s？`，不把服务器链路塞进封面。

## 强制视觉审计

最终渲染重点检查：

- 0–1 秒初始化是否干净。
- 左上角是否为 canonical header 唯一 owner。
- 中央 `7BYTE` 水印参数是否与 EP002 固定值一致。
- 所有框内文字 / 图标是否真的居中或按设计对齐。
- 8 个 bit 是否完整、等距、无重叠。
- `1000 → ÷8 → 125` 是否不互相覆盖。
- 服务器 → 协议 → 下载器是否一眼可识别。
- 字幕是否始终停留在预留字幕带。
- Shot 边界是否出现双影、残留或提前泄漏。
- `45.592s - 1 frame` 仍属于正文；`45.592s + 1 frame` 已属于片尾。
- 片尾左右背景必须与中心同色，不得有黑色竖版插入感。

## V1 → V2：边界与信息层级

首轮实际渲染发现：

1. Shot 1→2、Shot 2→3 有 fade-to-empty 空档。
2. Shot 3→4、Shot 4→5 有 muddy overlap。
3. 圆头进度线 `end=0` 仍出现绿色小点。
4. 核心 `8 bit → 1 Byte` 视觉比例偏小。

V2 改为干净 semantic cut、显式进度线 opacity lifecycle，并放大核心 8→1 关系。

## V2 → V4：容器对齐与 UI 记忆点

用户实际审阅发现：

- 多个卡片中的文字普遍落在框的左上角。
- 左上角品牌元素缺失。
- “服务器 / 协议开销 / 设备”全部变成文字标签，缺乏 EP002 那种可识别 UI 和记忆点。
- 固定品牌口播在正文说完后才切片尾，声音与品牌动画不同步。

根因：

- 只定义 `Rect` 尺寸/边框并不会自动让子节点居中。
- “更少对象”的目标被错误解释成“删除 UI”。
- 品牌 chrome 没有作为不可变层处理。

V4 修正：

- 所有 UI 容器显式声明内部 layout / 对齐。
- 恢复服务器 → 协议 → 下载任务 / 设备 UI。
- body end 移到 `45.592s`，品牌口播与片尾同步。

## V4 → V5：品牌层从“参考”升级为“固定资产”

V4 仍有两个严重品牌一致性问题：

1. 左上角虽然按 EP002 风格重画，但仍是近似版本，出现额外外框、线条和比例差异。
2. 竖版 canonical outro 用黑色 padding 放进横屏，形成明显的竖视频嵌入感；EP002 云端成片并不是这种效果。

V5 处理：

- 直接从 EP002 云端最终成片提取真实左上角品牌头，透明化后保存为 `/7BYTE/brand/header-horizontal.png`。
- 最终合成固定在 `(28,18)`、`278×76`；scene 不再拥有第二套 header。
- 正文背景、Surface、Muted 与中央水印恢复到 EP002 金标参数。
- 从竖版 canonical 生成一次性的长期横版 canonical：`/7BYTE/brand/outro-horizontal-canonical.mp4`。
- 横版 canonical 使用 `#0F100E` 填充空余区域，不使用黑色 padding。
- 以后横版 episode 直接复用这两个品牌资产，禁止逐期重新适配。

## 审计工具修正

WebM 边界帧必须使用精确 seek，不能依赖邻近关键帧；`scripts/audit-video-visual.sh` 已修正。
