# Skill: Auto Subtitles

## 目标

把最终旁白自动变成可直接导入剪映或烧录进视频的字幕，尽量减少手工对轴。

这是剪映「识别字幕」之外的第二条正式字幕路线。两者二选一，不要求同时做。

## 首先判断旁白来源

### A. AI/TTS 旁白

**优先直接使用 TTS 自己产生的 speech-boundary / subtitle timestamps，不要再把同一段 AI 声音拿去 ASR 一遍。**

原因：
- 文本本来就是已知的，不存在“识别错字”这一层误差。
- TTS 引擎知道实际合成时的时间边界，对齐通常比重新转录更稳。
- 技术词可直接保持稿件写法，例如 `baidu.com`、`DNS`、`GET /`、`JavaScript`。

EP001 的 `zh-CN-YunyangNeural` 旁白就是这条路线：读取合成时输出的时间边界，再自动按中文标点、长度和阅读节奏拆成较短字幕 cue。

### B. 真人录音 / 外部音频

这时才使用真正的 ASR：
- OpenAI Whisper / Audio Transcription。
- OpenAI 开源 Whisper CLI。
- whisper.cpp 作为本地 fallback。

输出 segment / word timestamps 后再做中文断句和术语校正。

## 7BYTE 默认输入

优先使用已经确定的最终旁白音频；没有单独音频时才从最终 MP4 中提取音轨。

术语提示/保留词至少包括当前 episode 中会出现的专有词，例如：

`7BYTE, baidu.com, DNS, IP, HTTPS, HTTP, GET /, HTML, CSS, JavaScript`

## 自动字幕工作流

1. 获取最终旁白/成片。
2. 判断声音来源：
   - TTS → 读取合成边界；
   - 真人/未知来源 → ASR 获取时间戳。
3. 根据中文标点、长度和停顿自动重新切分 subtitle cue。
4. 技术 token 保持完整，不拆开 `baidu.com` / `GET /` / `JavaScript` 等。
5. 输出 `SRT`，或者在需要预览时直接烧录出一条 demo MP4。
6. 人工只检查：技术词、断句、极少数时间边界。

## 字幕切分规则

默认目标不是逐字卡拉 OK，而是自然阅读：

- 单 cue 尽量 1–2 行。
- 优先在句号、问号、逗号、冒号和自然停顿处分段。
- 一条字幕不要一次塞满整句长口播。
- 相邻 cue 不重叠。
- 极短停顿不必制造空字幕；长停顿可以留空。
- 技术词作为整体处理。
- 字幕文本忠实于实际旁白，不为了“文案好看”改成另一句话。
- 字幕样式固定，不允许每条字幕自己决定字号、位置或换行风格。

## 两种正式字幕路线

### A. 7BYTE Auto Subtitle Skill

适用于：希望减少剪映识别步骤、需要可复现字幕、后续继续自动化批量生产。

产物：工作阶段的 `*.srt`；需要验收时可额外生成带字幕 demo MP4。

### B. 剪映识别字幕

适用于：直接在剪映完成最终剪辑，且剪映识别效果已经足够好。

产物留在剪映工程中即可。

**不要为了流程完整而两套都做。** 每一期在 `publish.md` 记录最终用了哪一条。

## 存储策略

SRT、ASR verbose JSON、word timestamps、临时 WAV 都属于**工作产物**。

默认不上传 ChatGPT 长期文件库，也不提交 GitHub；最终发布完成后可删除。只有确实需要长期复剪或跨软件迁移时，才保留最终 SRT。

GitHub 只保存本 skill、真正可复用的自动化源码和本期 `publish.md` 中的字幕路线记录。
