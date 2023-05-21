---
title: "查看端口占用情况"
date: "2021-10-23 11:17:53"
tag: [linux, windows]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

# linux

Linux 查看端口占用情况可以使用 `lsof` 和 `netstat` 命令。

## lsof

lsof(list open files)是一个列出当前系统打开文件的工具。

### 常用命令

- 查看端口占用：

```bash
lsof -i:端口号
```

- 查看端口占用 PID：

```bash
lsof -i:端口号 -t
```

## netstat

netstat -tunlp 用于显示 tcp，udp 的端口和进程等相关情况。

netstat 查看端口占用语法格式：

```bash
netstat -tunlp | grep 端口号
```

- -t (tcp) 仅显示 tcp 相关选项
- -u (udp)仅显示 udp 相关选项
- -n 拒绝显示别名，能显示数字的全部转化为数字
- -l 仅列出在 Listen(监听)的服务状态
- -p 显示建立相关链接的程序名

更多命令：

```bash
netstat -ntlp   //查看当前所有tcp端口
netstat -ntulp | grep 80   //查看所有80端口使用情况
netstat -ntulp | grep 3306   //查看所有3306端口使用情况
netstat -anp | grep ssh    // 查看进程占用的端口
```

## ps

Linux ps （英文全拼：process status）命令用于显示当前进程的状态，类似于 windows 的任务管理器。

语法

```bash
ps [options] [--help]
```

ps 的参数非常多, 在此仅列出几个常用的参数并大略介绍含义

- -A 列出所有的进程
- -w 显示加宽可以显示较多的资讯
- -au 显示较详细的资讯
- -aux 显示所有包含其他使用者的行程
- au(x) 输出格式

查找指定进程格式：

```bash
ps -aux | grep 进程关键字(可以是端口号)
```

## kill

在查到端口占用的进程后，如果你要杀掉对应的进程可以使用 kill 命令：

```bash
kill -9 PID
```

杀死占用某端口的所有进程

```bash
kill -9 $(lsof -i:端口号 -t)
```

# windows

## 查找所有运行的端口

输入命令：

```bash
netstat -ano
```

## 查看被占用端口对应的 PID

输入命令：

```bash
netstat -aon|findstr "8081"
```

## 查看指定 PID 的进程

继续输入命令：

```bash
tasklist|findstr "9088"
```

## 结束进程

强制（/F 参数）杀死 pid 为 9088 的所有进程包括子进程（/T 参数）：

```bash
taskkill /T /F /PID 9088
```
