# 7BYTE 固定视频工作流

这是后续每一期的默认流程。除非用户明确要求升级品牌/流程，否则不要重新发明一套。

开始任何横版 episode 前，除了本文件外，**必须读取 `shared/brand/horizontal-video-brand-lock.md`**。EP002 云端最终成片是横版品牌层的唯一视觉金标。

## 1. 每期必须有 GitHub 记录

`episodes/<episode>/` 至少保留：
- `idea.md`：本期只回答什么问题。
- `script.md`：最终口播稿。
- `storyboard.md` / `animation-spec.md`：动画与时间轴。
- `design-notes.md`：本期画幅、空间结构和特殊视觉决策。
- `cover/cover.json`：本期封面内容。
- `publish.md`：最终发布档案与数据复盘。

## 2. 选题与脚本

- 一条视频只解决一个主问题。
- 口播先自然、口语化，再考虑时长。
- 技术术语必须准确。

## 3. 先确定画幅与空间契约

在写 scene 前读取 `skills/layout-safety.md`，先确定正文画布、主视觉区、字幕保留区、平台 UI 避让区。

当前默认：**关系型、链路型、对比型解释优先 16:9 / 1920×1080 / 60fps**。只有内容天然适合手机 UI 或单列纵向叙事时，才明确改回竖版。

不能先按一个画幅写完，再在最后阶段强行裁成另一个画幅。

## 4. AI 人声

- 先确定最终声音，再对齐动画。
- 禁止在已经带声音的视频上继续叠新旁白。
- 每期在 `publish.md` 记录 voice。
- 当前基准：`zh-CN-YunyangNeural`。

## 5. Motion Canvas 动画

- 最终人声 / TTS timing 是时间轴 source of truth。
- 每个 phase 必须有明确总时长，不能靠注释估算累计时间。
- 动作保持利落，主要靠状态停留配合口播。
- 一次只突出一个主运动对象。
- 动画必须帮助解释因果。
- Scene 必须遵守主视觉区 / 字幕区的空间契约。
- 每个 UI 容器必须显式声明内部布局；有边框和宽高不等于子文字会自动居中。
- 多节点图优先稳定 Layout；大的拓扑变化优先切换独立 shot，不让一组节点同时乱移动、缩放、改尺寸。
- 所有 connector 必须绑定节点几何，禁止手工悬空线段。
- `project.meta`、capture viewport、最终输出尺寸必须一致；不一致直接失败。

### “减少对象”不是“删除 UI”

减少复杂度时，只删除**无关拓扑、重复解释、没有语义的装饰对象和不必要 handoff**。

不得把本来能提供识别和记忆的实体全部退化成文字 pill。若旁白明确提到服务器、设备、下载器、浏览器、路由器等对象，且这些对象有助于理解关系，优先用简洁的程序化 UI / 图标 / 状态组件表达。

判断标准：画面对象数量可以少，但观众仍应能一眼认出“这是什么、它和谁发生关系”。

### 横版品牌层是固定组件，不属于单期设计

横版视频的背景色、水印、左上角品牌头与片尾全部按 `shared/brand/horizontal-video-brand-lock.md` 执行。

硬规则：

- **背景和水印**：使用 `shared/brand/horizontal-video-chrome.ts` 的固定参数，不逐期修改。
- **左上角品牌头**：最终合成时直接 overlay `/7BYTE/brand/header-horizontal.png`，固定在 `1920×1080` 的 `(28px, 18px)`，尺寸 `278×76`。不得在 scene 内重画近似版本，不新增额外线条、外框或标签。
- **header owner 唯一**：scene 只负责正文内容和水印，最终 composite 只叠一份 canonical header。
- **横版片尾**：直接 append `/7BYTE/brand/outro-horizontal-canonical.mp4`；禁止每期重新把竖版片尾适配成横版。
- **竖版片尾**：继续使用 `/7BYTE/brand/outro-canonical.mp4`。

## 6. 画面文字规则

旁白 + 字幕负责完整句子。Motion Canvas 里的文字负责帮助理解视觉结构。

优先使用：实体名、状态、关系标签、决策结果、简短模型 / 图例。

默认删除：当前字幕的同义复述、一直变化的全局 headline、“标题句 + 说明句 + 字幕句”三遍说同一件事。

若 Hook 标题已经完整呈现当前口播，可在这一 cue 抑制字幕，避免同屏重复。

## 7. 字幕

默认优先 `skills/auto-subtitles.md`：

- TTS 旁白直接读取 TTS timing；真人/外部音频再走 ASR。
- 最多两行。
- 每行做实际像素宽度检测。
- 技术 token 不拆。
- 字幕只能出现在预先留出的字幕带。
- 若某句由清晰的大标题 / canonical 片尾完整承担，可有意识地抑制该 cue，而不是同屏重复。

剪映「识别字幕」仍可作为替代路线，但两者二选一，不重复长期保存。

## 8. 固定片尾与品牌句

横版唯一权威片尾：`/7BYTE/brand/outro-horizontal-canonical.mp4`。

竖版唯一权威片尾：`/7BYTE/brand/outro-canonical.mp4`。

两者都直接复用，不重新生成、不根据描述复刻。

正文必须在明确的 body end 停止；最终 trim 后再拼 canonical。严禁播放器 loop 后把开头重新录进结尾。

如果口播最后一句是固定品牌句 `这里是 7BYTE，把计算机讲简单一点。`：

- 这句属于 **canonical outro**，不是正文最后一镜。
- `body end == 该句 cue start == canonical outro start`。
- 该品牌句默认抑制普通字幕，避免与片尾自身文字重复。
- 禁止“品牌句在正文里已经说完 → 再切片尾”。
- 禁止“片尾已经开始 → 过一段时间才说品牌句”。

横版片尾背景必须和正文品牌背景融为同色。**任何黑色左右边栏、明显的竖视频嵌入感，均视为阻断发布问题。**

## 9. 两张固定封面

每期必须同时准备：竖封面 3:4、横封面 4:3。

固定：权威头像 + 7BYTE、黑/炭灰、暖白、少量 `#D8FF68`。

变化：本期核心标题 + 一个直接相关的主视觉。

默认禁止：EP001/EP002、系列名、分类标签、角标、大量说明小字。

判断标准：**缩小后，一眼知道视频讲什么。**

## 10. 强制视觉审计

**Build/CI 通过不等于视频通过。最终视频必须再经过视觉审计。**

运行：

```bash
scripts/audit-video-visual.sh final.mp4 visual-audit
```

必须检查：
- 0–1 秒是否有孤立线条 / 未初始化元素。
- 每次 shot 切换是否有上一镜头残留、黑闪或不必要重叠。
- 每条 connector 是否真正接到节点边缘。
- 卡片、标题、图标、状态文字是否互相覆盖。
- 所有框内文字/图标是否按设计对齐，而不是默认落在左上角。
- 画面文字是否只是在重复字幕。
- 字幕是否进入主视觉区。
- `7BYTE` 水印是否与固定参数一致，而不只是“看起来差不多”。
- 横版正文左上角是否为 `/7BYTE/brand/header-horizontal.png` 的唯一 owner，且位置/尺寸固定。
- 最复杂帧是否信息过密，同时是否仍保留可识别 UI / 实体而非退化成纯文字标签。
- 正文最后 2 秒是否保持正确结论画面。
- `body end - 1 frame` 与 `body end + 1 frame` 是否完成干净 ownership 切换。
- 固定品牌口播与 canonical outro 是否同帧起步。
- 横版片尾两侧背景是否与中心同色，没有黑边和竖版插入感。

任一失败都回到 scene/layout 或 final composite 修复，然后**重新渲染 + 重新抽帧审计**。

## 11. 发布信息

发布前写入本期 `publish.md`：标题、简介、话题、合集/自主声明（如适用）、字幕路线、两张封面、最终成片、发布日期与链接。

## 12. 发布前检查

- [ ] 画幅与本期 `design-notes.md` 一致。
- [ ] 60fps。
- [ ] `project.meta == capture == final output`。
- [ ] 单一正确旁白，无叠音。
- [ ] Connector 全部接边、无孤立线条。
- [ ] 所有 UI 容器内部对齐已抽帧检查。
- [ ] 主视觉没有进入字幕保留带。
- [ ] 字幕没有覆盖正文，且技术词/断句/宽度已检查。
- [ ] 画面文字没有充当第二套字幕。
- [ ] 横版水印与 `HORIZONTAL_BRAND.watermark` 完全一致。
- [ ] 横版左上角使用 canonical header，且没有第二套近似 header。
- [ ] 正文结尾没有 loop 回开头。
- [ ] 横版使用 `outro-horizontal-canonical.mp4`；竖版使用 `outro-canonical.mp4`。
- [ ] 若有固定品牌口播，其 cue 与 canonical outro 起点同步。
- [ ] 片尾背景无黑色侧边栏 / 竖版嵌入感。
- [ ] 已生成并实际审阅 visual audit contact sheet。
- [ ] 竖 3:4 + 横 4:3 两张封面。
- [ ] 标题、简介、话题已记录。

## 13. 最小长期存储

### 每期 ChatGPT 文件库

```text
/7BYTE/EPxxx/
├─ final.mp4
├─ cover-vertical-3x4.png
└─ cover-horizontal-4x3.png
```

### 品牌 ChatGPT 文件库

```text
/7BYTE/brand/
├─ avatar.png
├─ header-horizontal.png
├─ outro-canonical.mp4
└─ outro-horizontal-canonical.mp4
```

默认不长期保存 preview、中间视频、旧封面、TTS 试听、review JSON、ASR verbose JSON、临时 WAV/WebM、视觉审计截图、重复 reference、ZIP 备份和最终 SRT（除非确实需要跨软件复剪）。

GitHub 只保存真正有价值的源码、skills、品牌规则、episode 文档、可复用审计脚本、封面配置和 `publish.md`。

## 14. 发布后测试

每期 `publish.md` 记录平台可见数据，建议观察 24h / 72h / 7d：播放、互动、完播率、平均播放时长、转化等。
