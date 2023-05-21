---
title: "Windows 10 Docker InvalidOperationException Failed to set version to docker-desktop: exit code: -1"
date: 2021-07-11 11:04:27
tag: [docker]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

![](https://clearlove443.github.io//post-images/1625972721746.png)
cmd/shell 下执行

netsh winsock reset

然后重启 docker 就好了（临时方案，管不了多久，基本上重启电脑就不行了），久而久之就渴望一种永久的方法，不过还好找着了

****\*\*****\*****\*\*****下面是永久方案****\*\*\*\*****\*\*****\*\*\*\*****

1.下载 NoLsp(需要使用 VPN 等)

http://www.proxifier.com/tmp/Test20200228/NoLsp.exe

2.下载的文件建议放在 C:\Windows\System32 下，也可以随便放，位置你知道就行，如果不是 NoLsp.exe 建议重命名一下，当前也可以不重命名，使用方便就行了

cmd 下执行（管理员模式）

NoLsp.exe c:\windows\system32\wsl.exe

如果不对，肯定是路径不对。

3.启动 wsl

执行 wsl

4.效果图
![](https://clearlove443.github.io//post-images/1625972788739.png)

5.重启 Restart Docker Desktop
