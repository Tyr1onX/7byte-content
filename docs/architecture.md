# Repository Architecture

## 两层结构

### 仓库级：长期稳定上下文

- `AGENTS.md`：AI 工作入口。
- `docs/`：品牌级架构、motion 规则、生产流程。
- `skills/`：可复用的镜头/动画/程序化 UI 能力。
- `shared/`：未来沉淀跨 episode 的组件、图标包装、主题 token。

这些内容应保持稳定，只有在我们真的改变 7BYTE 的长期方法时才修改。

### Episode 级：每条视频独立

每个 episode 都是一个独立创作单元：

```text
episodes/NNN-slug/
├─ idea.md
├─ script.md
├─ storyboard.md
├─ design-notes.md
├─ animation-spec.md
└─ src/
   ├─ project.ts
   ├─ project.meta
   └─ scenes/
```

不同视频可以有不同设计理念；仓库级规范不是把所有视频做成同一个模板，而是提供共同语言和质量底线。

## Motion Canvas 项目选择

根目录 `vite.config.ts` 显式列出各 episode 的 `project.ts`。Motion Canvas 支持 project 数组，因此 `npm run dev` 后可以在浏览器中选择要预览的 episode。

新增 episode 时：
1. 复制 episode 骨架。
2. 完成该期独立文档。
3. 把它的 `src/project.ts` 加入 `vite.config.ts`。
4. 在独立分支/PR 中开发。

## 为什么不是裸 HTML

HTML/CSS/JS 仍然可以作为某些 UI 的实现手段，但不再承担整个动画的时间轴和镜头系统。Motion Canvas 负责时间、空间、镜头与渲染；HTML/UI 只在适合它的地方出现。
