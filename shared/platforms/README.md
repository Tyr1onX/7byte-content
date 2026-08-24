# Platform Rules

这里保存 7BYTE 各平台**长期有效、已经确认**的适配规则。

原则：

1. 平台规则只影响平台适配层，不修改 core 的事实与知识边界。
2. AI/Agent 只读取当前任务对应的平台文件，不批量加载全部平台规则。
3. 外部运营 Skill / 工具不整仓复制进来；这里只记录 7BYTE 自己采用的规则、验证结果和必要引用。
4. 平台规则必须能被真实数据推翻。出现稳定数据后，优先更新这里，而不是继续沿用最初假设。
5. 单篇成品和单篇数据放在 `episodes/<episode>/platforms/<platform>/`，不要堆到 shared。

当前文件：

- `douyin.md`：抖音 / 通用短视频包装与发布原则。
- `xiaohongshu.md`：小红书定位、内容结构、图文与复盘原则。
- `wechat-channels.md`：微信视频号预留规则。
- `wechat-official.md`：微信公众号长文预留规则。
