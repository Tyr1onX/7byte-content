# 公众号草稿自动化流程

## 目标

把“聊天生成内容 → 手动导入 DOCX → 手动改标题/作者/封面/原创声明”的流程，收敛为：

```text
Markdown 正文 + 封面图
  ↓
上传正文图片到微信图文图片接口
  ↓
上传封面到永久素材，或复用已有封面 media_id
  ↓
调用草稿接口创建公众号草稿
  ↓
后台人工检查
  ↓
人工勾选原创声明
  ↓
人工发布 / 定时群发
```

## 本地环境变量

不要把下面内容写进仓库。

```bash
export WECHAT_MP_APPID="你的 AppID"
export WECHAT_MP_APPSECRET="你的 AppSecret"
```

如果你已经有可用 access_token，也可以临时直接使用：

```bash
export WECHAT_MP_ACCESS_TOKEN="你的 access_token"
```

如果封面已经提前上传过，也可以直接复用封面永久素材 ID：

```bash
export WECHAT_MP_COVER_MEDIA_ID="封面永久素材 media_id"
```

## Markdown 文件格式

```markdown
---
title: 微信消息不提醒怎么办？先检查这4个地方
author: 一团
digest: 明明有人发微信，手机却不响，先检查这几个通知开关。
---

# 微信消息不提醒怎么办？先检查这4个地方

正文内容……

![截图说明](../../covers/2026-09/example.png)
```

说明：

- `title` 会写入公众号草稿标题。
- `author` 会写入作者。
- `digest` 可选，不写则自动取正文前部文字。
- 本地 Markdown 图片会先上传到微信图文图片接口，再替换成微信图片 URL。
- 封面图不从正文里自动推断，统一用 `--cover` 或 `WECHAT_MP_COVER_MEDIA_ID` 指定。

## 干跑检查

```bash
cd wechat-content-workspace
python tools/create_wechat_draft.py archive/2026-09/2026-09-01_微信越来越占空间先清这3处重要聊天别乱删.md --dry-run
```

先看输出 JSON 是否包含：

- title
- author
- digest
- content
- thumb_media_id
- need_open_comment
- only_fans_can_comment

## 创建草稿

方式一：上传本地封面图。

```bash
cd wechat-content-workspace
python tools/create_wechat_draft.py archive/2026-09/2026-09-01_微信越来越占空间先清这3处重要聊天别乱删.md --cover covers/2026-09/cover.png
```

方式二：复用已经上传过的封面素材。

```bash
cd wechat-content-workspace
export WECHAT_MP_COVER_MEDIA_ID="封面永久素材 media_id"
python tools/create_wechat_draft.py archive/2026-09/2026-09-01_微信越来越占空间先清这3处重要聊天别乱删.md
```

成功后，进入公众号后台草稿箱检查。

## 测试

```bash
cd wechat-content-workspace
python tools/test_create_wechat_draft.py
```

## 人工保留步骤

- 检查正文和封面。
- 确认标题、摘要、作者。
- 勾选原创声明。
- 点击发布或定时群发。

## 不做的事

- 不模拟公众号后台网页登录。
- 不绕过扫码。
- 不保存 Cookie。
- 不自动群发。
- 不把密钥写进 GitHub。
