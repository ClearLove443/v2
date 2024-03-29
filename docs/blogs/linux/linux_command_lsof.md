---
title: "linux 命令 —— lsof 命令"
date: "2021-12-22 13:30:14"
tag: [command, lsof]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

## 命令简介

lsof（list open files）是一个列出当前系统打开文件的工具。
在 linux 环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。
所以如传输控制协议 (TCP) 和用户数据报协议 (UDP) 套接字等，系统在后台都为该应用程序分配了一个文件描述符，无论这个文件的本质如何，该文件描述符为应用程序与基础操作系统之间的交互提供了通用接口。
因为应用程序打开文件的描述符列表提供了大量关于这个应用程序本身的信息，因此通过 lsof 工具能够查看这个列表对系统监测以及排错将是很有帮助的。
lsof 命令可显示系统打开的文件，因为 lsof 需要访问核心内存和各种文件，所以必须以 root 用户的身份运行它才能够充分地发挥其功能。

## 用法和参数

### 用法：

```bash
lsof [-?abhlnNoOPRtUvVX] [+|-c c] [+|-d s] [+D D] [+|-f[gG]] [+|-e s]
[-F [f]] [-g [s]] [-i [i]] [+|-L [l]] [+m [m]] [+|-M] [-o [o]] [-p s]
[+|-r [t]] [-s [p:s]] [-S [t]] [-T [t]] [-u s] [+|-w] [-x [fl]] [-Z [Z]] [--] [names]
```

### 参数说明：

    -? -h #显示出lsof的帮助信息
    -a #参数被视为AND，会影响全部的参数
    -c c #显示出以字符或字符串c开头的命令程序开启的文件，如$lsof -c init
    +d s #在文件夹s下搜寻，此参数不会继续深入搜寻此文件夹。如显示在/usr/local下被程序开启的文件：$lsof +d /usr/local +D D 同上，但是会以该文件为基础往下全部搜寻，这样花费较大的CPU时　间，请谨慎使用
    -d s　#此参数以file descriptor(FD)值显示结果，可以采用范围（1-3）或个别，如显示FD为4的进程：$lsof -d 4
    -g [s] #以程序的PGID显示，也可以采用范围或个别表示，若没有特别指定，则显示全部，如显示PGID为6的进程：$lsof -g 6
    -i #用以监听有关的任何符合的地址，若没有相关地址被指定，则监听全部
            用法： lsof -i [46][protocol][@hostname|hostaddr][:serivce|port]
            说明：　4 6　　IPv4 或 IPv6
    protocol TCP or UDP
    hostname internet host name
    hostaddr IPv4地址
    service /etc/service中的service name
    port 端口号
    -l #此参数禁止将user ID 转换为登录的名称，默认是登录名称
    +|-L [l] # +或-表示开启或关闭显示文件连接数，如果只有单纯的+L，后面没有任何数字，则表示显示全部，如果后面有数字，只有文件连接数少于该数字的会被列出
    -n #不将IP地址转换为hostname,预设是转换的
    -N #显示NFS的文件
    -p s #以PID作为显示的依据
    -P #此参数禁止将port number转换为service name,预设为转换
    +|-r [t] #控制lsof不断重复执行，t为15秒，也就是说每隔15秒再重复执行 +r 一直执行，直到没有文件被显示 -r 永远不断的执行，直到收到中断讯号(ctrl+ c)
    -R #此参数增列出PID的子程序，也就是PPID
    -s #列出文件的大小，若该文件没有大小，则留下空白
    -u s #列出login name或UID为的程序
    -v #显示lsof的版本信息

## 常用命令

- 列出所有正在使用文件

```bash
lsof
```

- 找出谁在使用某个文件

```bash
lsof /usr/sbin/httpd
```

- 递归查找某个目录中所有打开的文件

```bash
lsof +D /usr/local
```

- 列出某个用户打开的所有文件

```bash
lsof -u ubuntu |more     #单个用户
```

- 查找某个程序打开的所有文件

```bash
lsof -c httpd
```

- 列出除 root 用户外的所有用户打开的文件

```bash
lsof -u ^root
```

- 列出所有由某个 PID 对应的进程打开的文件

```bash
lsof -p 3738
```

- 列出所有 TCP 网络连接

```bash
lsof -i tcp
```

- 列举出 IP V4

```bash
lsof -i 4
```

更多 lsof 的命令如下：

```bash
lsof -i:8080：查看8080端口占用
lsof -t : 显示PID，可以与kill 配合使用，批量杀死进程
lsof abc.txt：显示开启文件abc.txt的进程
lsof -c abc：显示abc进程现在打开的文件
lsof -c -p 1234：列出进程号为1234的进程所打开的文件
lsof -g gid：显示归属gid的进程情况
lsof +d /usr/local/：显示目录下被进程开启的文件
lsof +D /usr/local/：同上，但是会搜索目录下的目录，时间较长
lsof -d 4：显示使用fd为4的进程
lsof -i -U：显示所有打开的端口和UNIX domain文件
```
