---
title: "文件传输协议FTP、SFTP和SCP"
date: "2021-12-19 19:29:45"
tag: [ftp, sftp, scp]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

## 网络通信协议分层

### 应用层：

- HTTP（Hypertext Transfer Protocol 超文本传输协议，显示网页）
- DNS（Domain Name System）
- FTP（File Transfer Protocol）
- SFTP（SSH File Transfer Protocol，和 FTP 不一样）
- SCP（Secure copy，based on SSH）
- SSH （Secure Shell）

### 通信层：

- TCP（Transmission Control Protocol 三次握手传输协议）
- UDP

### 网络层：

- IP（Internet Protocol）
- ICMP（Internet Control Message Protocol，主要用于路由发送错误报告）

### 链接层：

- MAC（media access control）

## 文件传输协议

### FTP（File Transfer Protocol）

TCP/IP 网络上两台计算机传送文件的协议，FTP 是在 TCP/IP 网络和 INTERNET 上最早使用的协议之一，它属于网络协议组的应用层。FTP 客户机可以给服务器发出命令来下载文件，上载文件，创建或改变服务器上的目录。相比于 HTTP，FTP 协议要复杂得多。复杂的原因，是因为 FTP 协议要用到两个 TCP 连接，一个是命令链路，用来在 FTP 客户端与服务器之间传递命令；另一个是数据链路，用来上传或下载数据。FTP 是基于 TCP 协议的，因此 iptables 防火墙设置中只需要放开指定端口（21 + PASV 端口范围）的 TCP 协议即可。
FTP 工作模式：
PORT（主动）方式的连接过程是：客户端向服务器的 FTP 端口（默认是 21）发送连接请求，服务器接受连接，建立一条命令链路。当需要传送数据时，客户端在命令链路上用 PORT 命令告诉服务器：“我打开了一个 1024+的随机端口，你过来连接我”。于是服务器从 20 端口向客户端的 1024+随机端口发送连接请求，建立一条数据链路来传送数据。
PASV（Passive 被动）方式的连接过程是：客户端向服务器的 FTP 端口（默认是 21）发送连接请求，服务器接受连接，建立一条命令链路。当需要传送数据时，服务器在命令链路上用 PASV 命令告诉客户端：“我打开了一个 1024+的随机端口，你过来连接我”。于是客户端向服务器的指定端口发送连接请求，建立一条数据链路来传送数据。
PORT 方式，服务器会主动连接客户端的指定端口，那么如果客户端通过代理服务器链接到 internet 上的网络的话，服务器端可能会连接不到客户端本机指定的端口，或者被客户端、代理服务器防火墙阻塞了连接，导致连接失败。PASV 方式，服务器端防火墙除了要放开 21 端口外，还要放开 PASV 配置指定的端口范围。

### SFTP（Secure File Transfer Protocol）

安全文件传送协议。可以为传输文件提供一种安全的加密方法。SFTP 与 FTP 有着几乎一样的语法和功能。SFTP 为 SSH 的一部份，是一种传输文件到服务器的安全方式。在 SSH 软件包中，已经包含了一个叫作 SFTP(Secure File Transfer Protocol)的安全文件传输子系统，SFTP 本身没有单独的守护进程，它必须使用 sshd 守护进程（端口号默认是 22）来完成相应的连接操作，所以从某种意义上来说，SFTP 并不像一个服务器程序，而更像是一个客户端程序。SFTP 同样是使用加密传输认证信息和传输的数据，所以，使用 SFTP 是非常安全的。但是，由于这种传输方式使用了加密/解密技术，所以传输效率比普通的 FTP 要低得多，如果您对网络安全性要求更高时，可以使用 SFTP 代替 FTP

- 连接到远程服务器

```bash
#scp 命令使用端口号 22 默认 22 可省略
sftp -P 22 ubuntu@192.168.2.72
```

- 当前服务器路径

```bash
pwd
```

- 当前本地路径

```bash
lpwd
```

- 下载文件到本地

```bash
get filename
```

- 下载文件到本地

```bash
put filename
```

具体参考[登录到远程系统以复制文件 (sftp)](https://docs.oracle.com/cd/E37934_01/html/E36614/remotehowtoaccess-14.html)

### SCP（Secure Copy）

SCP 就是 Secure copy，是用来进行远程文件复制的，并且整个复制过程是加密的。数据传输使用 ssh，并且和使用和 ssh 相同的认证方式，提供相同的安全保证。

- 文件从本地复制到远程

```bash
#scp 命令使用端口号 4588 默认 22 可省略
scp -P 4588 local_file remote_username@remote_ip:remote_folder
```

- 文件夹从本地复制到远程

```bash
#scp 命令使用端口号 4588 默认 22 可省略
scp -P 4588 -r local_folder remote_username@remote_ip:remote_folder
```

- 文件从远程复制到本地

```bash
#scp 命令使用端口号 4588 默认 22 可省略
scp -P 4588 remote_username@remote_ip:remote_folder local_file
```

- 文件夹从远程复制到本地

```bash
#scp 命令使用端口号 4588 默认 22 可省略
scp -P 4588 -r remote_username@remote_ip:remote_folder local_folder
```

具体参考[如何在两个系统之间复制文件 (scp)](https://docs.oracle.com/cd/E37934_01/html/E36614/remotehowtoaccess-55154.html#remotehowtoaccess-46771)

## 比较：

- FTP 基于 TCP 来传输文件，明文传输用户信息和数据。
- SFTP 基于 SSH 来加密传输文件，可靠性高，可断点续传。
- SCP 是基于 SSH 来加密拷贝文件，但要知道详细目录，不可断点续传。
