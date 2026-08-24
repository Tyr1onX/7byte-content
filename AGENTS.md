# 7BYTE AI Working Context

**`main` 是唯一默认工作基线。** 新聊天 / 新 Agent 不要依赖历史 preview、render、trigger 或 episode feature 分支恢复上下文。

本仓库是 7BYTE 的**跨平台内容母仓库**。开始任务时先判断当前工作属于哪一层，然后只读取对应文件；不要无条件加载全部视频、小红书、公众号规则。

## 0. 先路由，再读取

### A. 核心选题 / 事实研究

只读取：

1. `docs/architecture.md`
2. 当前 episode 的 `core.md`（若存在）或 `idea.md`
3. 为核事实所需的当前 episode 文件

输出只能修改平台无关内容。不要在 core 中写“爆款标题”“小红书标签”“抖音钩子”等平台包装。

### B. 抖音 / 通用短视频制作

读取：

1. `docs/architecture.md`
2. `docs/workflow.md`
3. `docs/motion-design.md`
4. `docs/publishing.md`
5. `shared/platforms/douyin.md`
6. `shared/brand/production-workflow.md`
7. **如果本期是横版：`shared/brand/horizontal-video-brand-lock.md`**
8. `skills/README.md`
9. `skills/layout-safety.md`
10. `skills/auto-subtitles.md`
11. `skills/shot-design.md`
12. `skills/cover-design.md`
13. 当前 episode 的 `core.md`（若存在）或 `idea.md`，以及 `script.md`、`storyboard.md`、`design-notes.md`、`animation-spec.md`
14. 进入发布阶段后读取该期 `publish.md`

需要复用上一期经验时，优先读取上一期 `design-notes.md` 与 `publish.md`，不要从旧版本 scene 文件或临时渲染分支倒推工作流。

### C. 小红书

读取：

1. `docs/architecture.md`
2. `shared/platforms/xiaohongshu.md`
3. 当前 episode 的 `core.md`（若存在）或 `idea.md`
4. `episodes/<episode>/platforms/xiaohongshu/` 下已经存在的文件

除非任务明确需要复用视频成品或视觉资产，否则**不要读取** Motion Canvas、字幕、横版视频品牌锁、镜头动画等视频规则。

小红书创作方法默认参考外部 `SpaceZephyr/creator-buddy` 的 `xhs-Skills`；外部 Skill 负责方法，仓库只保存 7BYTE 自己已经确认的定位、平台规则、成品和数据结论。不要把整个外部 Skill 仓库复制进本仓库。

### D. 微信视频号

读取：

1. `docs/architecture.md`
2. `shared/platforms/wechat-channels.md`
3. 当前 episode 的 core / idea
4. 当前 episode 的视频成品与 `platforms/wechat-channels/`（仅当任务需要）

视频号默认复用成熟视频母版，不因为平台存在就重做一遍动画。

### E. 微信公众号

读取：

1. `docs/architecture.md`
2. `shared/platforms/wechat-official.md`
3. 当前 episode 的 core / idea
4. `platforms/wechat-official/` 已有文件

公众号是深度长文适配层，不要求每个选题都同步。

### F. 数据复盘

只读取对应平台的发布档案、metrics/analytics 文件和该篇成品；不要为了复盘小红书去加载其他平台制作规则。

---

## 内容分层规则

### Core：平台无关的唯一事实源

Core 应包含：

- 核心问题
- 观众最终需要记住什么
- 事实链路 / 关键概念
- 本期刻意不展开的边界
- 可以跨平台复用的例子或类比

Core 不包含：

- 平台标题套路
- 标签 / 话题
- 封面点击策略
- 平台特有 CTA
- 某个平台的长度、页数、画幅要求

### Platform：平台适配层

所有平台特有内容放入：

```text
episodes/<episode>/platforms/<platform>/
```

例如小红书：

```text
platforms/xiaohongshu/
├─ note.md
├─ cards.md
├─ publish.md
└─ metrics.md
```

不是每个平台、每一期都必须创建这些文件；有真实需求时再建。

### 历史兼容

EP001–EP004 等既有 episode 的 `idea.md`、`script.md`、`storyboard.md` 等不强制搬家。历史文件保持原位，避免破坏现有 Motion Canvas、脚本和发布链路。

新 episode 优先从 `episodes/_template/` 建立 `core.md`，再按实际发布平台增加适配目录。

---

## 7BYTE 品牌目标

7BYTE 是不露脸的计算机知识品牌：**把每天在用、但很少有人真正讲清楚的科技问题讲简单。**

跨平台时保持知识内核和品牌识别一致，但允许表达形式不同：

- 短视频：靠时间、镜头和口播解释。
- 小红书：靠问题式封面、知识卡片、搜索与收藏价值解释。
- 视频号：优先复用视频母版，按微信语境调整包装。
- 公众号：用长文补足完整推理和背景。

## 默认视频技术决策

- 主动画框架：Motion Canvas。
- Remotion：主要作为 motion-graphics skill / sequencing / constants-first 的参考；需要其生态能力时再引入。
- 图标：优先统一 SVG 图标体系（如 Lucide），禁止 AI 随机生成风格不一致的“科技图标”。
- 真实 UI：可录制，但不是强制；若程序化复现更省事且不影响真实性，优先复现。
- **关系型、链路型、对比型解释默认优先 16:9 / 1920×1080 / 60fps。** 内容天然适合手机 UI 或单列叙事时，才在 `design-notes.md` 明确选择竖版。
- 画幅必须在 scene 开发前确定；禁止最后阶段把竖版硬裁成横版或反过来。
- `project.meta`、capture viewport 和最终输出尺寸必须一致。
- Motion Canvas 必须预留字幕带；字幕不能和正文争抢同一块画布。
- 每个 UI 容器必须显式声明内部布局与对齐；禁止依赖默认子节点位置。
- 默认字幕路线优先使用 `skills/auto-subtitles.md`；剪映识别字幕可作为替代，但二选一。
- 每一期视频必须同时准备竖 3:4 和横 4:3 两张平台封面，并按照 `skills/cover-design.md` 分别布局、分别审计。
- 视频 episode 必须维护 `publish.md`，记录最终标题、简介、话题、封面、声音、成片存储和发布状态。

## 固定品牌资产（视频）

**横版品牌层不允许逐期重新设计。EP002 云端最终成片是唯一视觉金标。** 具体参数与资产见 `shared/brand/horizontal-video-brand-lock.md`。

横版固定：

- 正文背景 / 水印：使用 `shared/brand/horizontal-video-chrome.ts` 的固定参数。
- 左上角品牌头：只使用 `/7BYTE/brand/header-horizontal.png`，最终合成固定 `(28px, 18px)`、`278×76`；不得重画近似头像、额外外框、横线或标签。
- 横版片尾：只使用 `/7BYTE/brand/outro-horizontal-canonical.mp4`；不得每期把竖版片尾临时塞进横版。
- 横版片尾左右背景必须与品牌背景 `#0F100E` 一致，**禁止黑色侧边栏 / 明显竖版嵌入感**。
- 固定品牌口播 `这里是 7BYTE，把计算机讲简单一点。` 必须与片尾起点同帧开始。

竖版固定：

- 片尾使用 `/7BYTE/brand/outro-canonical.mp4`。

封面保持统一品牌语言，但内容必须围绕当期核心问题变化。封面默认不加入 `EP001`、系列编号、类别标签、无意义角标等额外 chrome。核心语义图标不得为了赶工临时手绘近似；文字必须按真实 bounding box 布局。

## 视觉禁区（视频）

除非某一期有明确理由，不要默认使用：蓝紫渐变、玻璃拟态、霓虹 glow、背景粒子、无意义赛博网格、发光小球代替数据包、频繁 zoom/旋转、0.2 秒级的快速飞入。

## 动画判断标准

每个动作都回答至少一个问题：
- 观众现在应该看哪里？
- 这个动作表达了什么因果关系？
- 它是否让下一句口播更容易理解？
- 它是否仍然遵守标题区 / 主视觉区 / 字幕区的空间契约？

答不上来就删掉这个动作。

跨 shot 延续同一对象时，必须遵守 `skills/shot-design.md` 的 owner / proxy lifecycle / matched-geometry 规则；下一镜头稳定画面出现前，旧 owner 和临时 proxy 必须完整退场，禁止幽灵残留。
