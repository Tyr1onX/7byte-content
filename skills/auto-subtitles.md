# Skill: Auto Subtitles

## 目标

把最终视频/旁白中的语音自动识别成可直接导入剪映的字幕文件，减少手工对轴。

这是剪映「识别字幕」之外的第二条正式字幕路线。两者二选一，不要求同时做。

## 成熟能力来源

优先复用成熟 ASR，而不是自己发明语音识别：

- OpenAI Whisper / Audio Transcription：可转写中文并输出带时间信息的结果；`whisper-1` 可直接返回 `srt` / `vtt` / `verbose_json`，也可以取得 word / segment timestamps。
- OpenAI 开源 Whisper CLI：可直接输出 `srt` / `vtt` / `json`，支持 `--word_timestamps`、最大行宽和最大行数。
- whisper.cpp 可作为纯本地、低依赖 fallback，也支持 SRT / VTT 输出。

## 7BYTE 默认输入

优先使用已经确定的最终旁白音频；没有单独音频时才从最终 MP4 中提取音轨。

术语提示至少包括当前 episode 中会出现的专有词，例如：

`7BYTE, baidu.com, DNS, IP, HTTPS, HTTP, GET /, HTML, CSS, JavaScript`

不要让 ASR 自行把这些词改成读音相近的中文词。

## 工作流

1. 获取最终旁白/成片。
2. ASR 转写中文并取得 segment 或 word timestamps。
3. 根据中文标点和真实停顿重新切分 subtitle cue。
4. 技术 token 保持完整，不拆开 `baidu.com` / `GET /` / `JavaScript` 等。
5. 输出一份 `SRT` 给剪映导入。
6. 人工只检查：术语、错字、断句、极少数时间边界。

## 字幕切分规则

默认目标不是逐字卡拉 OK，而是自然阅读：

- 单 cue 尽量 1–2 行。
- 一行尽量短；不要把完整长句一次塞满屏幕。
- 优先在句号、问号、逗号、自然停顿处分段。
- 相邻 cue 不重叠。
- 极短停顿不必制造空字幕；长停顿可以留空。
- 术语与后面的解释尽量不要被不自然地拆开。
- 字幕文本忠实于实际人声，不为了“文案好看”改成另一句话。

## 两种正式字幕路线

### A. 7BYTE Auto Subtitle Skill

适用于：希望减少剪映识别步骤、需要可复现 SRT、后续可能自动化批量生产。

产物：`*.srt`。

### B. 剪映识别字幕

适用于：直接在剪映完成最终剪辑，且剪映识别效果已经足够好。

产物留在剪映工程中即可。

**不要为了流程完整而两套都做。** 每一期在 `publish.md` 记录最终用了哪一条。

## 存储策略

SRT、ASR verbose JSON、word timestamps、临时 WAV 都属于**工作产物**。

默认不上传 ChatGPT 长期文件库，也不提交 GitHub；最终发布完成后可删除。只有确实需要长期复剪或跨软件迁移时，才保留最终 SRT。

GitHub 只保存本 skill、自动化源码（若后续真正实现）和本期 `publish.md` 中的字幕路线记录。
