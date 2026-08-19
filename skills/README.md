# 7BYTE Skills

Skills 是给 AI/Agent 的可复用“专业知识包”。

当前：
- `shot-design.md`：把知识点拆成可理解的镜头。
- `motion-canvas.md`：用 Motion Canvas 实现解释型动画。
- `programmatic-ui.md`：决定何时复现 UI、何时真实录屏，并规定解释型 UI 的文字职责、connector 和 shot 规则。
- `layout-safety.md`：先确定画幅与空间契约，固定主视觉区 / 字幕区，约束 connector、时间轴和结尾，避免重叠、悬空线、播放器 loop 等视觉事故。
- `auto-subtitles.md`：从最终旁白自动生成字幕；TTS 优先读取原始 timing，真人音频再走 ASR，并执行像素宽度、语义切分、空间安全和重复信息检查。
- `visual-system.md`：固定 7BYTE 的品牌层、背景水印、左上角 Brand Bug、语义配色、UI 舒适度和最终视觉审计规则，让多期视频逐渐形成统一视觉识别。

最终渲染后必须再运行：

```bash
scripts/audit-video-visual.sh final.mp4 visual-audit
```

生成 contact sheet 和开头/结尾边界帧，并由人或视觉模型实际看图。**Build/CI 通过不能替代视觉审计。**

使用方式：先读取当前 episode 文档，再只加载真正相关的 skill，不把所有规则一股脑塞进每次任务。
