# 公众号草稿自动化流程

## 目标

把“聊天生成内容 → 手动导入 DOCX → 手动改标题/作者/封面/原创声明”的流程，收敛为：

```text
Markdown 正文 + 封面图
  ↓
脚本上传封面
  ↓
脚本创建公众号草稿
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

如果封面已经提前上传过，也可以直接复用封面素材 ID：

```bash
export WECHAT_MP_COVER_MEDIA_ID="封面永久素材 media_id"
```

## 干跑检查

```bash
python tools/create_wechat_draft.py archive/2026-09/2026-09-01_微信越来越占空间先清这3处重要聊天别乱删.md --dry-run
```

先看输出 JSON 是否包含：

- title
- author
- digest
- content
- thumb_media_id

## 创建草稿

```bash
python tools/create_wechat_draft.py archive/2026-09/2026-09-01_微信越来越占空间先清这3处重要聊天别乱删.md --cover covers/2026-09/cover.png
```

成功后，进入公众号后台草稿箱检查。

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
