---
title: "linux ll 命令不好用了,ls 命令没有颜色了怎么办"
date: 2021-12-19 17:39:40
tag: [ll, ls, command]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

可以通过以下命令来实现`ll`的功能:

编辑 `~/.bashrc`文件添加下面命令

```bash
# vim ~/.bashrc
alias ll='ls -al'
```

其实这个命令是给`ls -l`命令起了个别名`ll`，然后写入`~/.bashrc`文件中

可以通过在～/.bashrc 文件中添加 alias 命令来修改颜色，例如原来的 ls 和 ll 命令都没有颜色，这时在～/.bashrc 文件中添加

```bash
alias ls='ls --color'
alias ll='ls -al --color'
```

生效：

```bash
source ~/.bashrc
```
