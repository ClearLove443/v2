---
title: "linux清空文件内容"
date: 2021-12-19 18:47:19
tag: [linux]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

1. 使用 cat 命令情况，命令如下：

```bash
cat /dev/null > file_name
```

2. 使用 vi/vim 命令打开文件后，输入"%d"清空，后保存即可。但当文件内容较大时，处理较慢，命令如下：

```bash
vim file_name
:%d
:wq
```

3. 使用 echo 命令清空，此时会在文件中写入一个空行“\n"，命令如下：

```bash
echo "">file_name
```

推荐使用 cat 命令。
