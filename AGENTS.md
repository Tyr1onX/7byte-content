# 7BYTE AI Working Context

在本仓库工作的 AI/Agent 开始任何 episode 前，先读取：

1. `docs/architecture.md`
2. `docs/motion-design.md`
3. `docs/workflow.md`
4. `docs/publishing.md`
5. `shared/brand/production-workflow.md`
6. `skills/README.md`
7. 当前 episode 目录中的 `idea.md`、`script.md`、`storyboard.md`、`design-notes.md`、`animation-spec.md`；若该期已经进入发布阶段，还必须读取 `publish.md`。

## 目标

7BYTE 是不露脸的计算机知识短视频品牌。主要形态：AI/真人旁白 + 程序化动画/程序化 UI + 必要时真实录屏。

## 默认技术决策

- 主动画框架：Motion Canvas。
- Remotion：主要作为 motion-graphics skill / sequencing / constants-first 的参考；需要其生态能力时再引入。
- 图标：优先统一 SVG 图标体系（如 Lucide），禁止 AI 随机生成风格不一致的“科技图标”。
- 真实 UI：可录制，但不是强制；若程序化复现更省事且不影响真实性，优先复现。
- 最终视频：9:16，1080×1920，60fps。
- 默认最终成片不烧程序化字幕；进入剪映后基于最终旁白执行语音识别字幕。
- 每一期必须同时准备竖 3:4 和横 4:3 两张封面。
- 每一期必须维护 `publish.md`，记录最终标题、简介、话题、封面、声音、成片存储和发布状态。

## 固定品牌资产

- 片尾必须直接复用 canonical 片尾，不允许重新生成或“照着做一版”。
- 封面保持统一品牌语言，但内容必须围绕当期核心问题变化。
- 封面默认不加入 `EP001`、系列编号、类别标签、无意义角标等额外 chrome。

## 视觉禁区

除非某一期有明确理由，不要默认使用：蓝紫渐变、玻璃拟态、霓虹 glow、背景粒子、无意义赛博网格、发光小球代替数据包、频繁 zoom/旋转、0.2 秒级的快速飞入。

## 动画判断标准

每个动作都回答至少一个问题：
- 观众现在应该看哪里？
- 这个动作表达了什么因果关系？
- 它是否让下一句口播更容易理解？

答不上来就删掉这个动作。
