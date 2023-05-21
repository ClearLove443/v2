---
title: "windows下 在cmd中输入ls命令出现“ls不是内部或外部命令“解决方法"
date: "2021-08-29 10:51:11"
tag: [command]
category: windows
published: true
hideInList: false
feature:
isTop: false
---

在 cmd 中输入 ls 命令出现“ls 不是内部或外部命令解决
因为与这个命令相似的功能是 dir，所以以下方法可解决：

1. 在 C：\windows 目录下新建一个文件命名为 ls.bat
2. 打开编辑这个文件 输入：

```bash
@echo off
dir
```

这两句保存即可。
