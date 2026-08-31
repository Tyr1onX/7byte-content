# EP009 Design Notes

## 数据驱动目标

EP008 跑一天左右：播放约 `630`、2s 跳出 `47.18%`、5s 播放率 `27.30%`、平均播放约 `6.32s`、完播率 `4.23%`。主要问题不是解释后段，而是 0–2 秒失守。

本期把实验变量锁成一个：**第 1 秒内先给新信息，不先完整念问题。**

Hook 固定：`直接拔 U 盘，不一定会坏。`

## 发布节奏

- 继续约 `48h` 一期。
- 不把发布频率作为本期新变量。

## 画幅与空间契约

- `1920×1080 / 16:9 / 60fps`
- 主视觉约 `y=-350..300`
- 字幕保留带约 `y=320..500`
- Scene 不绘制 canonical header；最终 composite 唯一 overlay。
- `project.meta == capture == final output`

## 品牌层

完全复用横版品牌锁：`#0F100E` 背景、固定中央水印、canonical header、canonical horizontal outro、Yunyang `-5%`。

## 视觉结构

1. U 盘 + 正在写进度条，先建立“危险来自写入中”。
2. 写入队列收尾 → `Safe to remove`。
3. Windows 两种删除策略对比，Quick removal 明确标 `DEFAULT since 1809`。
4. 两个红灯条件：复制中 / Better performance。
5. 最终只保留一个行动结论：`不确定 → 安全弹出`。

## 视觉语气

- 关系 / 状态解释，不做赛博粒子。
- 每个状态变化 `0.6–1.0s`。
- 一次只突出一个主运动对象。
- 不使用真实 Windows 截图；程序化策略卡更清楚，也避免版本 UI 差异。

## 技术边界

- Quick removal 只说“Windows 不再默认缓存这类磁盘写入 / 设备空闲时风险更低”，不说“绝对可以随便拔”。
- Better performance 明确必须安全弹出。
- 不把灯灭等同于绝对没有内部写入。

## 字幕

- 7BYTE Auto Subtitle Skill。
- T0→T1 Hook 大标题承担完整第一 cue，普通字幕抑制。
- `Windows 10 1809`、`Quick removal`、`Better performance` 不拆。
- T5 起 canonical outro cue 抑制。
