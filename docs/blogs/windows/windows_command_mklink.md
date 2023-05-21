---
title: "Windows 中的 mklink 命令"
date: 2021-05-23 15:38:12
tag: [mklink, command]
category: windows
published: true
hideInList: false
feature:
isTop: false
---

Windows 链接

比如把修改 VScode 插件安装目录

把 C:\Users\{username}\.vscode\extensions(默认插件位置)的 extensions 文件夹整个剪切到你想换的位置

cmd 执行

```
mklink /D "C:\Users\{username}\.vscode\extensions" "剪切后的路径"
```
