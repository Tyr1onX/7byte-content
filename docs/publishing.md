# 7BYTE 发布记录规范

`shared/brand/production-workflow.md` 定义短视频生产流程；本文主要定义视频发布档案，并说明跨平台发布记录放在哪里。

## 1. Episode 根目录的 `publish.md`：视频发布档案

路径：

```text
episodes/NNN-slug/publish.md
```

它保留现有语义：记录本期**视频母版 / 抖音主发布版本**使用了什么声音、封面、标题、成片存储位置等。为了兼容现有 episode，不移动、不改名。

### 必填字段

```md
# Publish Record

## 状态
- 平台：抖音
- 状态：制作中 / 待发布 / 已发布
- 发布日期：YYYY-MM-DD
- 发布链接：发布后补

## 最终视频
- 画布：1080×1920
- 帧率：60fps
- 字幕：剪映语音识别
- AI 人声：<voice>
- 成片长期存储：<path>

## 封面
- 竖封面：3:4，<file/path>
- 横封面：4:3，<file/path>
- 固定品牌：权威头像 + 7BYTE
- 本期主标题：<title>
- 主视觉：<visual>

## 发布文案
### 标题
<title>

### 简介
<description>

### 话题
#tag1 #tag2 #tag3

### 合集
<collection / 无>

### 自主声明
<实际选择 / 无>

## 发布后记录
- 备注：
- 若重新发布：追加新的版本和日期，不覆盖旧记录。
```

## 2. 其他平台的发布档案

不要把小红书、视频号、公众号字段继续堆进根目录 `publish.md`。各平台使用：

```text
episodes/<episode>/platforms/<platform>/publish.md
```

例如：

```text
episodes/001-what-happens-after-entering-baidu/platforms/xiaohongshu/publish.md
episodes/001-what-happens-after-entering-baidu/platforms/wechat-channels/publish.md
episodes/001-what-happens-after-entering-baidu/platforms/wechat-official/publish.md
```

每个平台只记录自己真实采用的标题、正文/成品、发布时间、链接和状态。数据复盘放同目录的 `metrics.md`，避免跨平台指标混在一起。

## 规则

1. 根目录 `publish.md` 继续服务视频母版 / 抖音主线，发布前完成主要字段，发布后补日期/链接。
2. 视频每一期必须同时有竖 3:4 和横 4:3 两张封面。
3. 视频封面不出现 `EP001`、系列编号、类别标签等多余信息，除非未来明确修改品牌规则。
4. 最终视频默认不烧录程序化字幕，使用剪映识别最终旁白。
5. 视频片尾只使用 canonical 固定资产，不允许 episode 自己做新片尾。
6. 各平台发布文案记录实际使用版本；发布时临时改字，之后同步回对应 `publish.md`。
7. 二进制成片可以不进 Git，但必须在记录中写明长期存储位置。
8. 不要求每一期同步所有平台；没有发布就不创建虚假的发布记录。
