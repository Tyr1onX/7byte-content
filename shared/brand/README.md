# 7BYTE Brand System

这里保存 7BYTE 长期固定的品牌生产规则与可复现源文件。

- `assets/douyin-avatar-384.jpg`：权威头像的仓库运行副本，用于程序化封面。
- `cover-template.py`：长期固定封面模板；只通过 episode 配置改变标题和主视觉信息。
- **片尾唯一权威版本不是重新生成的模板，而是用户已经认可的 EP001 V5 成片末尾。**
- `outro-template.py`：仅作为“复制 canonical 片尾”的保护脚本，禁止根据描述重新绘制片尾。
- `production-workflow.md`：固定视频生产、发布、字幕和最小存储流程。

ChatGPT 长期文件库中的品牌二进制资产只保留两项：

- `/7BYTE/brand/avatar.png`
- `/7BYTE/brand/outro-canonical.mp4`

不再长期保存重复 reference、ZIP 备份、失败版/旧版资产。

原则：**封面模板稳定，片尾直接复用 canonical 成片，云端只保存真正需要复用的二进制资产。**
