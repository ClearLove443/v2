---
title: "如何从WSL中删除windows的PATH"
date: "2021-12-19 17:54:55"
tag: [wsl, path]
category: windows
published: true
hideInList: false
feature:
isTop: false
---

编辑 `~/.bashrc` 文件, 添加下面内容

```bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
```
