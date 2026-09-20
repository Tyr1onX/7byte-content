# Animation Spec — C盘越用越满

- 画布 `1920×1080 / 60fps`。
- 最终 TTS WordBoundary 为唯一时间轴。
- Shot 1 第一稳定帧完整出现 `NEW APPS: 0`、`80 GB FREE → 8 GB FREE` 和 `很多空间 ≠ 应用本体`。
- Shot 1 不依赖逐字动画才能看懂。
- Shot 2 不使用伪造的精确 GB 值，只使用类别卡与占用块。
- Shot 3 的 `Settings → System → Storage` 路径必须明显，目标第 10 秒前进入。
- Shot 4 强调系统清理入口，禁止呈现“直接删除 Windows 文件夹”的操作。
- 切镜前旧 shot opacity 归零，再显示新 shot；无跨 shot 残影。
- canonical header 仅在最终 composite 中 overlay；scene 内仅固定 watermark。
- 品牌句 cue 起点 == body end == canonical horizontal outro 起点。
