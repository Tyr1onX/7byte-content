# Repository Architecture

## 总体模型：一个选题，一个 episode，多平台适配

7BYTE 不再按平台拆仓库。一个知识选题只建立一个 `episode`，平台之间共享同一份核心事实和解释链路；抖音、小红书、视频号、公众号只保存各自的包装与交付物。

```text
7byte-content/
├─ AGENTS.md                  # AI 路由入口：先判断任务，再按需加载
├─ docs/                      # 仓库级架构、视频生产、发布规则
├─ skills/                    # 可复用的视频/视觉生产能力
├─ shared/
│  ├─ brand/                  # 跨 episode 品牌资产与固定规则
│  └─ platforms/              # 各平台长期规则，仅按当前任务加载
└─ episodes/
   └─ NNN-slug/
      ├─ core.md              # 新 episode 推荐：平台无关事实母稿
      ├─ idea.md              # 历史兼容；若无 core，可承担核心问题入口
      ├─ script.md            # 视频层
      ├─ storyboard.md        # 视频层
      ├─ design-notes.md      # 视频层
      ├─ animation-spec.md    # 视频层
      ├─ publish.md           # 视频发布档案
      ├─ cover/               # 视频封面
      ├─ src/                 # Motion Canvas
      └─ platforms/           # 需要哪个平台才创建哪个目录
         ├─ xiaohongshu/
         ├─ wechat-channels/
         └─ wechat-official/
```

## 三层结构

### 1. Core：平台无关的内容真源

Core 负责“讲什么”，不负责“在哪个平台怎么包装”。

推荐字段：

- 核心问题
- 观众最终只需要记住什么
- 事实链路 / 关键概念
- 事实边界与本期刻意不展开的部分
- 可跨平台复用的类比、例子、术语表
- 需要核验的事实来源或备注

Core 禁止混入：

- 爆款标题公式
- 平台标签 / 话题
- 封面点击策略
- 平台 CTA
- 页数、画幅、时长等平台交付要求

这样可以保证小红书的“收藏导向”不会污染视频口播，视频的“强 Hook / 时间线”也不会反向污染公众号长文。

### 2. Platform：平台适配层

平台特有规则统一放在 `shared/platforms/`；单篇平台成品放在：

```text
episodes/<episode>/platforms/<platform>/
```

推荐约定：

#### 小红书

```text
platforms/xiaohongshu/
├─ note.md       # 正文、标题候选、标签、发布文案
├─ cards.md      # 6–9 张卡片的逐页内容
├─ publish.md    # 最终采用版本与发布时间/链接
└─ metrics.md    # 曝光、点击、收藏、评论、搜索来源等复盘
```

#### 视频号

```text
platforms/wechat-channels/
├─ publish.md
└─ metrics.md
```

默认优先复用成熟视频母版，不为视频号另做一套动画。

#### 公众号

```text
platforms/wechat-official/
├─ article.md
├─ publish.md
└─ metrics.md
```

公众号只承接值得展开的深度内容，不要求每期同步。

### 3. Production：具体制作层

现有 `script.md`、`storyboard.md`、`animation-spec.md`、`src/`、`cover/` 属于视频制作层。它们可以继续保留在 episode 根目录，避免破坏现有 Motion Canvas、构建脚本和发布链路。

## 历史兼容策略

EP001–EP004 等历史 episode **不做强制迁移**。

- 既有 `idea.md` 继续有效。
- 既有视频文件不移动。
- 当某个历史 episode 第一次扩展到其他平台时，再创建 `core.md` 和对应 `platforms/<platform>/`。
- 不为了目录“看起来统一”去重写已经稳定的历史文件。

## 新增 episode

1. 创建新的 `episodes/NNN-slug/`。
2. 从 `episodes/_template/core.md` 创建平台无关母稿。
3. 如果制作视频，再创建/填写 `idea.md`、`script.md`、`storyboard.md`、`design-notes.md`、`animation-spec.md`。
4. 从 `episodes/_template/publish.md` 创建视频 `publish.md`。
5. 需要某个平台时，再创建 `platforms/<platform>/`；不预建空目录。
6. 创建 `cover/cover.json`，为视频两张封面提供内容。
7. 把该期 `src/project.ts` 加入 `vite.config.ts`。
8. 每一期/每次大改使用独立分支 + PR。
9. 发布后把最终版本和真实数据写回对应平台的 `publish.md` / `metrics.md`，不覆盖历史。

## AI 阅读成本控制

仓库变大不等于上下文变大。`AGENTS.md` 必须只充当路由器：

- 做小红书：`core + shared/platforms/xiaohongshu + 本期小红书目录`
- 做视频：`core + 视频生产规则 + 本期视频文件`
- 做公众号：`core + shared/platforms/wechat-official + 本期公众号目录`
- 做复盘：`对应平台 publish + metrics + 成品`

禁止“为了保险”一次性加载所有平台规则。

## 固定品牌与二进制资产

- GitHub 保存规则、源码、配置和每期发布记录。
- canonical 片尾和最终成片/封面等较大的二进制发布资产放长期文件库；GitHub 中记录其权威路径。
- canonical 片尾属于“素材”，不是每期重新设计的任务。

## Motion Canvas 项目选择

根目录 `vite.config.ts` 显式列出各 episode 的 `project.ts`。Motion Canvas 支持 project 数组，因此 `npm run dev` 后可以在浏览器中选择要预览的 episode。

## 为什么不是裸 HTML

HTML/CSS/JS 仍然可以作为某些 UI 的实现手段，但不再承担整个动画的时间轴和镜头系统。Motion Canvas 负责时间、空间、镜头与渲染；HTML/UI 只在适合它的地方出现。
