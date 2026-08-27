# EP006 Core — 为什么电脑刚开机，内存就占了一半？

## 核心问题

16GB 内存的 Windows 电脑刚开机、没有主动打开多少软件时，任务管理器为什么可能已经显示使用了数 GB？这是不是说明内存被“浪费”了？

## 观众最终只需要记住什么

1. 任务管理器里的“已使用”不只来自肉眼可见的应用窗口，还包括 Windows 内核、驱动、后台服务、进程工作集等系统实际正在使用的物理内存。
2. 进程列表里的数字不能简单相加后拿来和整机“已使用”做一一对应；系统内存还有内核、驱动及其他系统分配。
3. Windows 会把近期使用的数据和文件保留在缓存/待机内存中；待机内存在应用需要时可重新分配，并计入“可用”内存。
4. 判断内存是否真的不够，不应只看开机后“已使用”百分比。更值得看“可用”是否长期很低，以及正常使用时是否持续接近满载并出现明显卡顿。

## 事实链路

- Windows 启动后，操作系统本身、内核、设备驱动、系统服务和启动项都已经在运行，即使桌面上没有打开应用窗口。
- Microsoft 对内存指标的定义中，`Available` 包含 free memory 与 standby memory；standby pages 保存缓存数据/文件，并可在应用需要时变为可用。
- `In Use` 包含系统和进程正在实际使用的内存，不等同于“当前打开的几个软件”的列表之和。
- 因此“开机占用较高”本身不是内存泄漏的证据；只有在可用内存长期偏低、内存压力高并伴随实际性能问题时，才值得进一步排查启动项、异常进程、驱动或泄漏。

## 本期刻意不展开

- 不展开 pagefile / commit limit 的完整机制。
- 不展开 working set、private bytes、paged pool、nonpaged pool 的逐项定义。
- 不教观众手动清 standby list；正常情况下不需要把“空闲 RAM”当成目标。
- 不把 Memory Compression 当成本期主角，避免把所有不可见占用归因于单一机制。
- 不给出“占用超过 X% 就异常”的伪阈值。

## 可跨平台复用的例子

- `16GB → 已使用 7.4GB → 可用 8.1GB`：强调“已使用高一些”与“没有可用内存”不是同一件事。
- 把内存想成工作台：正在工作的材料占一部分，最近刚用过的材料放在手边缓存；真正要腾位置时，缓存部分可以让位。

## 术语

- In use / 已使用：当前正在被系统、驱动、进程等实际占用的物理内存。
- Available / 可用：可立即提供给进程使用的内存，包含 free 与 standby。
- Standby / 待机：保存缓存数据但不处于主动使用状态的页面，可在需要时重新分配。

## 事实来源

- Microsoft Learn — Results for the Memory Footprint assessment：定义 Available、In Use、Standby Memory。
  https://learn.microsoft.com/en-us/windows-hardware/test/assessments/results-for-the-memory-footprint-assessment
- Microsoft Sysinternals — RAMMap：说明 Windows 物理内存会按进程、内核、驱动、standby list、文件缓存等多种类别分配。
  https://learn.microsoft.com/en-us/sysinternals/downloads/rammap
