# 7BYTE 固定视频工作流

这是后续每一期的默认流程。除非明确升级品牌/流程，否则不要重新发明一套。

## 1. 每期必须有 GitHub 记录

`episodes/<episode>/` 至少保留：
- `idea.md`：本期只回答什么问题。
- `script.md`：最终口播稿。
- `storyboard.md` / `animation-spec.md`：动画与时间轴。
- `cover/cover.json`：本期封面内容。
- `publish.md`：最终发布档案与数据复盘。

## 2. 选题与脚本

- 一条视频只解决一个主问题。
- 口播先自然、口语化，再考虑时长。
- 技术术语必须准确。

## 3. AI 人声

- 先确定最终声音，再对齐动画。
- 禁止在已经带声音的视频上继续叠新旁白。
- 每期在 `publish.md` 记录 voice。
- 当前基准：`zh-CN-YunyangNeural`。

## 4. Motion Canvas 动画

- 最终人声是时间轴基准。
- 动作保持利落，主要靠状态停留配合口播。
- 一次只突出一个主运动对象。
- 动画必须帮助解释因果。
- 最终正文：1080×1920 / 60fps。

## 5. 固定片尾

唯一权威片尾：
`/7BYTE/brand/outro-canonical.mp4`

规则：直接复用，不重新生成、不根据描述复刻。`shared/brand/outro-template.py` 只能复制 canonical 资产。

## 6. 字幕二选一

程序化正文默认不烧字幕。

### A. 7BYTE Auto Subtitle Skill
读取 `skills/auto-subtitles.md`：
- 从最终旁白/MP4 自动 ASR。
- 生成 SRT。
- 检查 DNS / HTTPS / HTTP / GET / HTML / CSS / JavaScript 等技术词。
- 导入剪映后只调样式。

### B. 剪映「识别字幕」
- 直接识别最终旁白。
- 检查错字、技术词、断句。

哪条更省事、更准就用哪条；不要同时做两套再长期保存两份。

## 7. 两张固定封面

每期必须同时准备：
- 竖封面：3:4。
- 横封面：4:3。

固定：权威头像 + 7BYTE、黑/炭灰、暖白、少量 `#D8FF68`。

变化：本期核心标题 + 一个直接相关的主视觉。

默认禁止：EP001/EP002、系列名、分类标签、角标、大量说明小字。

判断标准：**缩小后，一眼知道视频讲什么。**

## 8. 发布信息

发布前写入本期 `publish.md`：
- 标题。
- 简介。
- 话题。
- 合集/自主声明（如适用）。
- 字幕路线。
- 两张封面。
- 最终成片。
- 发布日期与链接。

## 9. 发布前检查

- [ ] 1080×1920 / 60fps。
- [ ] 单一正确旁白，无叠音。
- [ ] 无旧字幕残留。
- [ ] 字幕技术词/断句已检查。
- [ ] canonical 片尾正确。
- [ ] 竖 3:4 + 横 4:3 两张封面。
- [ ] 封面无编号/系列标签等冗余元素。
- [ ] 标题、简介、话题已记录。
- [ ] 最终三个发布资产已进长期文件库。

## 10. 最小长期存储

### 每期 ChatGPT 文件库
只保留：
```text
/7BYTE/EPxxx/
├─ final.mp4
├─ cover-vertical-3x4.png
└─ cover-horizontal-4x3.png
```

### 品牌 ChatGPT 文件库
只保留：
```text
/7BYTE/brand/
├─ avatar.png
└─ outro-canonical.mp4
```

默认不长期保存：preview、中间视频、旧封面、TTS 试听、review JSON、ASR verbose JSON、临时 WAV/WebM、重复 reference、ZIP 备份、最终 SRT（除非以后确实需要跨软件复剪）。

### GitHub
保存真正有价值的：源码、skills、品牌规则、episode 文档、封面配置、`publish.md`。不堆每次导出的二进制和临时文件。

## 11. 发布后测试

每期 `publish.md` 记录平台能看到的数据，建议观察 24h / 72h / 7d：播放、互动、完播率、平均播放时长、转化等。

EP001 是新账号第一条正式样本，只做 baseline。后续用多条视频形成可比较样本，再判断选题、开头、时长、封面和动画复杂度哪些真正有效。
