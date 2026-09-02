# EP010 Core — 重启为什么可能比关机再开机更彻底？

## 一句话答案
Windows 启用 Fast Startup 时，“关机”会注销用户会话，但把内核会话和已加载的部分驱动状态保存进 `hiberfil.sys`，下次启动直接恢复；`Restart` 不使用 Fast Startup，会执行完整的启动周期。

## 事实母稿
1. Microsoft 明确说明：Fast Startup 不适用于 Restart。
2. Fast Startup 下，关机时用户会话会注销，但 kernel session 不会按传统冷关机方式完全关闭，而是休眠并写入 `hiberfil.sys`。
3. 下次启动会从休眠文件恢复内核状态，因此启动更快。
4. Restart 仍执行 full boot cycle，因此在驱动、系统组件、更新等需要重新初始化的场景里更适合作为排障动作。
5. Fast Startup 是否生效取决于设备能力与设置；因此文案必须使用“如果开启了快速启动”“可能更彻底”。

## 官方参考
- Microsoft Learn — Fast startup causes hibernation or shutdown to fail: https://learn.microsoft.com/en-us/troubleshoot/windows-client/setup-upgrade-and-drivers/fast-startup-causes-system-hibernation-shutdown-fail
- Microsoft Learn — System power states / Fast startup: https://learn.microsoft.com/en-us/windows/win32/power/system-power-states
- Microsoft Learn — Updates may not install with Fast Startup: https://learn.microsoft.com/en-us/troubleshoot/windows-client/setup-upgrade-and-drivers/updates-not-install-with-fast-startup

## 禁止误导
- 禁止写成“关机根本没有关机”。
- 禁止写成“重启一定比关机好”。
- 禁止暗示 Fast Startup 本身是故障或应该默认关闭。
