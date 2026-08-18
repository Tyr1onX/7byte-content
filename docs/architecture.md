# Repository Architecture

## 两层结构

### 仓库级：长期稳定上下文

- `AGENTS.md`：AI 工作入口。
- `docs/`：品牌级架构、motion 规则、生产与发布流程。
- `skills/`：可复用的镜头/动画/程序化 UI 能力。
- `shared/`：跨 episode 的品牌资产、组件、图标包装、主题 token。

这些内容应保持稳定，只有在我们真的改变 7BYTE 的长期方法时才修改。

### Episode 级：每条视频独立

每个 episode 都是一个从“选题”一直留档到“正式发布”的独立创作单元：

```text
episodes/NNN-slug/
├─ idea.md
├─ script.md
├─ storyboard.md
├─ design-notes.md
├─ animation-spec.md
├─ publish.md              # 最终发布档案，必须保留
├─ cover/
│  └─ cover.json           # 本期封面内容配置
└─ src/
   ├─ project.ts
   ├─ project.meta
   └─ scenes/
```

`publish.md` 是每一期的最终索引：记录最终视频规格、声音、两张封面、标题、简介、话题、合集/声明、长期存储位置、发布日期和发布链接。

不同视频可以有不同内容与视觉主角；仓库级规范不是把所有视频做成同一个模板，而是固定品牌识别、生产步骤、发布记录和质量底线。

## 新增 episode

1. 创建新的 `episodes/NNN-slug/`。
2. 复制并填写本期 `idea.md`、`script.md`、`storyboard.md`、`design-notes.md`、`animation-spec.md`。
3. 从 `episodes/_template/publish.md` 创建本期 `publish.md`。
4. 创建 `cover/cover.json`，为本期两张封面提供内容。
5. 把该期 `src/project.ts` 加入 `vite.config.ts`。
6. 在独立分支/PR 中开发与验收。
7. 发布前完成 `publish.md` 的主要字段；发布后补日期、链接和复盘，不覆盖历史。

## 固定品牌与二进制资产

- GitHub 保存规则、源码、配置和每期发布记录。
- canonical 片尾和最终成片/封面等较大的二进制发布资产放长期文件库；GitHub 中记录其权威路径。
- canonical 片尾属于“素材”，不是每期重新设计的任务。

## Motion Canvas 项目选择

根目录 `vite.config.ts` 显式列出各 episode 的 `project.ts`。Motion Canvas 支持 project 数组，因此 `npm run dev` 后可以在浏览器中选择要预览的 episode。

## 为什么不是裸 HTML

HTML/CSS/JS 仍然可以作为某些 UI 的实现手段，但不再承担整个动画的时间轴和镜头系统。Motion Canvas 负责时间、空间、镜头与渲染；HTML/UI 只在适合它的地方出现。
