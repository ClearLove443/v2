---
title: "修改 PowerShell 代码页为 UTF-8"
date: 2021-05-15 12:10:42
tag: [powershell]
category: windows
published: true
hideInList: false
feature:
isTop: false
---

# 通过注册表修改

以下代码存为 \*.reg 文件：

```
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Console\%SystemRoot%_System32_WindowsPowerShell_v1.0_powershell.exe]
"CodePage"=dword:0000fde9
```

双击运行此文件。

注：

- 65001(UTF-8) 的十六进制表示为：0000fde9

- 963(GBK) 的十六进制表示为：000003a8

# 手动修改

每次启动后输入：`chcp 65001`

# 第三方控制台

`Conemu/Cmder`

在此 Settings>Startup>Environment 选项下，添加 chcp 65001
注：yarn 的进度条在其中有问题
