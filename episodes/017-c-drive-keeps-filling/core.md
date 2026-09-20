# Core — C盘没装新软件，为什么还是越来越满？

## 核心问题
用户没有主动安装新软件时，为什么 Windows 系统盘仍可能逐渐减少可用空间？

## 观众最终只需要记住
“没装新软件”不等于系统盘不会增长。Windows 更新、临时文件、回收站、系统与保留空间，以及本地保留的云文件等，都可能占用 C 盘。最稳妥的第一步不是手动删除 Windows 目录，而是先进入“设置 → 系统 → 存储”查看分类，再使用“临时文件 / 清理建议 / 存储感知”等系统提供的清理入口。

## 事实链路
1. Windows 的“存储”设置会把空间拆分为“已安装的应用、临时文件、系统与保留空间”等类别。
2. Windows 会保留一部分存储用于临时文件、缓存和更新相关流程；这部分会出现在“系统与保留空间”中。
3. Storage Sense 可以清理临时文件和回收站项目；默认情况下，它主要作用于系统驱动器。
4. Windows 更新在下载和应用更新时可能临时需要额外空间，旧版本 Windows 文件也可能在更新后一段时间保留。
5. “清理建议”会分析系统并列出临时文件、旧安装、大型或未使用文件等可清理内容。
6. OneDrive 等云文件既可能在线仅可用，也可能保留本地副本，从而占用本地磁盘空间。

## 本期边界
- 不声称所有 C 盘增长都来自 Windows；第三方应用缓存、下载目录、用户文件等也可能占用空间。
- 不把“系统与保留空间”说成垃圾文件。
- 不建议直接删除 Windows、ProgramData 等系统目录。
- “清理建议”仍需用户确认条目后再删除。

## 事实核验
- Microsoft Support — Storage settings in Windows: https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/storage-settings-in-windows
- Microsoft Support — Manage drive space with Storage Sense: https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/manage-drive-space-with-storage-sense
- Microsoft Support — Free up drive space in Windows: https://support.microsoft.com/en-us/windows/experience/storage-filemanagement/free-up-drive-space-in-windows
- Microsoft Support — Free up space for Windows updates: https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/free-up-space-for-windows-updates
- Microsoft Learn — Configure Storage Sense in Windows: https://learn.microsoft.com/en-us/windows/configuration/storage/storage-sense
- 核验日期：2026-09-20。
