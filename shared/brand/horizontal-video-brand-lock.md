# 7BYTE 横版品牌视觉锁定规范

> **唯一视觉金标：ChatGPT Library 中的 EP002 最终成片。**
>
> 后续横版 episode 不再“参考”“复刻”“近似”这套品牌层，而是直接复用固定资产与固定参数。除非用户明确要求品牌升级，否则以下内容禁止逐期改动。

## 1. 固定画布与品牌底色

横版正文基准：

- `1920×1080`
- `60fps`
- Background: `#0F100E`
- Surface: `#191A17`
- Raised: `#22231F`
- Border: `#383B33`
- Primary text: `#F4F1E8`
- Secondary text: `#969A90`
- Accent: `#D8FF68`
- Accent dark: `#1D2411`

代码中的固定参数来自：

`shared/brand/horizontal-video-chrome.ts`

不得为了单期画面“更协调”而修改这些品牌基础色。

## 2. 正文中央水印：固定，不逐期设计

横版正文的背景水印永远使用同一参数：

```text
text          = 7BYTE
x             = 0
y             = 10
opacity       = 0.028
fontSize      = 250
fontWeight    = 800
letterSpacing = 18
```

要求：

- 水印位于最底层。
- 不动画。
- 不加 episode 编号、分类名或额外 slogan。
- 不因为某一镜主体遮住水印而移动它。
- 不允许每期重新决定透明度、位置、字号。

## 3. 左上角品牌头：必须使用固定资产

唯一横版品牌头资产：

`/7BYTE/brand/header-horizontal.png`

它是从 **EP002 云端最终成片** 中提取并透明化的实际品牌头，不是根据描述重新绘制的版本。

在 `1920×1080` 最终合成画布中的固定像素位置：

```text
left   = 28px
top    = 18px
width  = 278px
height = 76px
```

规则：

- 直接 overlay 该 PNG。
- 不再单独拼“头像 + 文字 + 下划线 + 外框”。
- 不使用 Lucide 猫图标代替头像。
- 不新增外框、额外横线、角标、episode 编号或其他装饰。
- 不改变 PNG 内部线条、文字、头像比例。
- 正文每一个 shot 都必须保持同一品牌头；进入片尾时退出。
- **最终合成层只允许存在一个 header owner。** Scene 内不要再画第二套近似品牌头。

## 4. 横版片尾：使用横版 canonical，不再临时适配竖版

竖版 canonical 保留：

`/7BYTE/brand/outro-canonical.mp4`

横版 canonical 固定为：

`/7BYTE/brand/outro-horizontal-canonical.mp4`

横版片尾由已确认的 canonical 动画生成：

- 去除原 canonical 约 `0.291667s` 的无效 pre-roll。
- 主体按高度等比适配到 `1080px`。
- 完整输出 `1920×1080 / 60fps`。
- 左右空余区域使用 **同一品牌背景 `#0F100E`** 填充。
- 不使用黑色 padding。
- 不拉伸主体。
- 不裁掉头像、品牌名或动画内容。

因此，后续横版视频必须直接 append：

`/7BYTE/brand/outro-horizontal-canonical.mp4`

禁止每期再次手工把竖版片尾塞进横屏。

## 5. 固定品牌口播必须与片尾同步

固定句：

`这里是 7BYTE，把计算机讲简单一点。`

规则：

- 该句属于片尾，不属于正文最后一镜。
- `body end == 品牌句 cue start == 横版片尾 start`。
- 品牌句默认不再烧普通字幕，因为片尾已经承担品牌文字。
- 禁止先在正文中把品牌句说完，再切片尾。
- 禁止先进入片尾一段时间，品牌句才开始。

## 6. 审计门槛

横版成片交付前必须抽查：

- `0–1s`：左上角品牌头是否已经存在。
- 任一正文中段：品牌头与 EP002 金标是否一致；水印是否保持固定位置/透明度。
- `body end - 1 frame`：品牌头仍属于正文，画面无重复 owner。
- `body end + 1 frame`：已经进入横版 canonical 片尾；正文品牌头已退出。
- 片尾中段：左右背景必须和中心片尾背景融为同色，不能出现黑色竖版插入感。
- 最终视频规格仍为 `1920×1080 / 60fps`。

只要品牌头、水印、片尾任何一项与金标不一致，都属于**阻断发布问题**。

## 7. 固定品牌文件库

```text
/7BYTE/brand/
├─ avatar.png
├─ header-horizontal.png
├─ outro-canonical.mp4
└─ outro-horizontal-canonical.mp4
```

- `avatar.png`：封面等场景的权威头像。
- `header-horizontal.png`：横版正文左上角唯一品牌头。
- `outro-canonical.mp4`：竖版 canonical 片尾。
- `outro-horizontal-canonical.mp4`：横版 canonical 片尾。

不要用新生成的近似资产覆盖这些文件。