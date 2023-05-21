---
title: "使用frp进行内网穿透"
date: "2021-08-29 11:19:16"
tag: [frp]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

# frp http -> https

客户端 a(笔记本) -> 服务器端 b(路由器)

由于路由器每次重启 软件会重新安装 ，故选择 frp

证书配置在客户端，这点和 nginx 不同，nginx 证书配置在服务器端

hpps https 指定的端口配置在服务器端
tcp 指定的端口 配置在客户端端

网络架构

wsl2(局域网无法访问，只有本机(笔记本)可以访问) -> 笔记本(配置 nginx，反向代理 wsl2 端口，让局域网可以访问。 配置 frpc(frp 客户端)，配置 https 证书) -> 路由器(frp 服务端) -> 外网可以访问 wsl2 的 web 应用

# 为什么需要内网穿透功能

从公网中访问自己的私有设备向来是一件难事儿。
自己的主力台式机、NAS 等等设备，它们可能处于路由器后，或者运营商因为 IP 地址短缺不给你分配公网 IP 地址。如果我们想直接访问到这些设备（远程桌面，远程文件，SSH 等等），一般来说要通过一些转发或者 P2P 组网软件的帮助。
我有一台计算机位于一个很复杂的局域网中，我想要实现远程桌面和文件访问，目前来看其所处的网络环境很难通过简单的端口映射将其暴露在公网之中，我试过这么几种方法：

1. 远程桌面使用 TeamViewer。可用，但需要访问端也拥有 TeamViewer 软件，不是很方便，希望能使用 Windows 自带的远程桌面。且 TeamViewer 不易实现远程文件访问。
2. 使用蒲公英 VPN 软件进行组网，可用，但免费版本网络速度极慢，体验不佳，几乎无法正常使用。
3. 使用花生壳软件进行 DDNS 解析，可用，但同第二点所述，免费版本有带宽限制，无法实际使用。
4. 搭建 frp 服务器进行内网穿透，可用且推荐，可以达到不错的速度，且理论上可以开放任何想要的端口，可以实现的功能远不止远程桌面或者文件共享。

# frp 是什么

简单地说，frp 就是一个反向代理软件，它体积轻量但功能很强大，可以使处于内网或防火墙后的设备对外界提供服务，它支持 HTTP、TCP、UDP 等众多协议。我们今天仅讨论 TCP 和 UDP 相关的内容。

# 准备工作

搭建一个完整的 frp 服务链，我们需要

1. VPS 一台（也可以是具有公网 IP 的实体机）
2. 访问目标设备（就是你最终要访问的设备）
3. 简单的 Linux 基础（会用 cp 等几个简单命令即可）

# VPS 相关

- 因为 frp 的原理是利用服务端（所准备的 VPS）进行转发，因而 VPS 的速度直接决定了之后连接的质量，请根据自己的需要选择相应主机配置。

# 服务端设置

SSH 连接到 VPS 之后运行如下命令查看处理器架构，根据架构下载不同版本的 frp

```bash
arch
```

查看结果，如果是“X86_64“即可选择”amd64”，
运行如下命令，根据架构不同，选择相应版本并进行下载

```bash
wget https://github.com/fatedier/frp/releases/download/v0.22.0/frp_0.22.0_linux_amd64.tar.gz
```

然后解压

```bash
tar -zxvf frp_0.22.0_linux_amd64.tar.gz
```

文件夹改个名，方便使用

```bash
cp -r frp_0.22.0_linux_amd64 frp
```

把解压出来的文件夹复制到你想要的目录下，为了方便我直接放在用户目录下了，进入该目录

```bash
cd frp
```

查看一下文件

```bash
ls -a
```

我们只需要关注如下几个文件

frps
frps.ini
frpc
frpc.ini
前两个文件（s 结尾代表 server）分别是服务端程序和服务端配置文件，后两个文件（c 结尾代表 client）分别是客户端程序和客户端配置文件。
因为我们正在配置服务端，可以删除客户端的两个文件

```bash
rm frpc
rm frpc.ini
```

然后修改 frps.ini 文件

```bash
vim frps.ini
```

这个文件应有如下格式

```
[common]
bind_port = 7000
dashboard_port = 7500
token = 12345678
dashboard_user = admin
dashboard_pwd = admin
vhost_http_port = 10080
vhost_https_port = 10443
```

> 如果没有必要，端口均可使用默认值，token、user 和 password 项请自行设置。

- “bind_port”表示用于客户端和服务端连接的端口，这个端口号我们之后在配置客户端的时候要用到。
- “dashboard_port”是服务端仪表板的端口，若使用 7500 端口，在配置完成服务启动后可以通过浏览器访问 x.x.x.x:7500 （其中 x.x.x.x 为 VPS 的 IP）查看 frp 服务运行信息。
- “token”是用于客户端和服务端连接的口令，请自行设置并记录，稍后会用到。
- “dashboard_user”和“dashboard_pwd”表示打开仪表板页面登录的用户名和密码，自行设置即可。
- “vhost_http_port”和“vhost_https_port”用于反向代理 HTTP，HTTPS 主机时使用.
  编辑完成后保存（vim 保存如果不会请自行搜索）。
  之后我们就可以运行 frps 的服务端了

```bash
./frps -c frps.ini
```

如果看到屏幕输出这样一段内容，即表示运行正常，如果出现错误提示，请检查上面的步骤。

```
2019/01/12 15:22:39 [I] [service.go:130] frps tcp listen on 0.0.0.0:7000
2019/01/12 15:22:39 [I] [service.go:172] http service listen on 0.0.0.0:10080
2019/01/12 15:22:39 [I] [service.go:193] https service listen on 0.0.0.0:10443
2019/01/12 15:22:39 [I] [service.go:216] Dashboard listen on 0.0.0.0:7500
2019/01/12 15:22:39 [I] [root.go:210] Start frps success
```

此时访问 x.x.x.x:7500 并使用自己设置的用户名密码登录，即可看到仪表板界面

# 服务端后台运行

至此，我们的服务端仅运行在前台，如果 Ctrl+C 停止或者关闭 SSH 窗口后，frps 均会停止运行，因而我们使用 nohup 命令将其运行在后台。

nohup 后台程序管理或关闭相关命令可自行查询资料，上面这个连接中也有所提及。

```bash
nohup ./frps -c frps.ini &

或者
./frps -c frps.ini 2>&1 &
```

输出如下内容即表示正常运行

```
nohup: ignoring input and appending output to 'nohup.out'
```

此时可先使用 Ctrl+C 关闭 nohup，frps 依然会在后台运行，使用 jobs 命令查看后台运行的程序

```bash
jobs
```

在结果中我们可以看到 frps 正在后台正常运行

```
[1]+  Running                 nohup ./frps -c frps.ini &
此时访问 x.x.x.x:7500 依然可以打开仪表板界面，至此，服务端即设置完成，你可以关闭SSH窗口了。
```

# 客户端设置

> frp 的客户端就是我们想要真正进行访问的那台设备，大多数情况下应该会是一台 Windows 主机，因而本文使用 Windows 主机做例子；Linux 配置方法类似，不再赘述。

同样地，根据客户端设备的情况选择相应的 frp 程序进行下载，Windows 下下载和解压等步骤不再描述。
假定你下载了“frp_0.22.0_windows_amd64.zip”，将其解压在了 C 盘根目录下，并且将文件夹重命名为“frp”，可以删除其中的 frps 和 frps.ini 文件。
用文本编辑器打开 frpc.ini，与服务端类似，内容如下。

```
[common]
server_addr = x.x.x.x
server_port = 7000
token = won517574356
[rdp]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 7001
[smb]
type = tcp
local_ip = 127.0.0.1
local_port = 445
remote_port = 7002

[https]
type = https
local_ip = 127.0.0.1
local_port = 80

# 需要反向代理的域名（https 必须设置 当访客通过此域名访问 A 机器时，才会将请求反向代理到此 Web 服务）
custom_domains = onlyyounotothers.top

# 接下来的配置是支持 https 的重点配置
# 配置插件，将 https 请求转换成 http 请求后再发送给本地 Web 服务程序
plugin = https2http
# 转换成 http 后，发送到本机的 11080端口
plugin_local_addr = 127.0.0.1:80
# 可能是 frp 的 Bug？这里必须写成 127.0.0.1，稍后解释
plugin_host_header_rewrite = 127.0.0.1
# 指定代理方式为 frp
plugin_header_X-From-Where = frp
# 指定成你在前面部分导出的证书的路径
plugin_crt_path = ./onlyyounotothers.top_bundle.crt
plugin_key_path = ./onlyyounotothers.top.key
```

其中 common 字段下的三项即为服务端的设置。

- “server_addr”为服务端 IP 地址，填入即可。
- “server_port”为服务器端口，填入你设置的端口号即可，如果未改变就是 7000
- “token”是你在服务器上设置的连接口令，原样填入即可。

# 自定义规则

frp 实际使用时，会按照端口号进行对应的转发.
上面 frpc.ini 的 rdp、smb 字段都是自己定义的规则，自定义端口对应时格式如下。

- “[xxx]”表示一个规则名称，自己定义，便于查询即可。
- “type”表示转发的协议类型，有 TCP 和 UDP 等选项可以选择，如有需要请自行查询 frp 手册。
- “local_port”是本地应用的端口号，按照实际应用工作在本机的端口号填写即可。
- “remote_port”是该条规则在服务端开放的端口号，自己填写并记录即可。

> RDP，即 Remote Desktop 远程桌面，Windows 的 RDP 默认端口是 3389，协议为 TCP，建议使用 frp 远程连接前，在局域网中测试好，能够成功连接后再使用 frp 穿透连接。
>
> SMB，即 Windows 文件共享所使用的协议，默认端口号 445，协议 TCP，本条规则可实现远程文件访问。
> 配置完成 frpc.ini 后，就可以运行 frpc 了
> frpc 程序不能直接双击运行！

使用命令提示符或 Powershell 进入该目录下

```bash
cd C:\frp
```

并执行

```bash
./frpc -c frpc.ini
```

运行 frpc 程序，窗口中输出如下内容表示运行正常。

```
2019/01/12 16:14:56 [I] [service.go:205] login to server success, get run id [2b65b4e58a5917ac], server udp port [0]
2019/01/12 16:14:56 [I] [proxy_manager.go:136] [2b65b4e58a5917ac] proxy added: [rdp smb]
2019/01/12 16:14:56 [I] [control.go:143] [smb] start proxy success
2019/01/12 16:14:56 [I] [control.go:143] [rdp] start proxy success
```

不要关闭命令行窗口，此时可以在局域网外使用相应程序访问 x.x.x.x:xxxx （IP 为 VPS 的 IP，端口为自定义的 remote_port）即可访问到相应服务。

# 客户端后台运行及开机自启

frpc 运行时始终有一个命令行窗口运行在前台，影响美观，我们可以使用一个批处理文件来将其运行在后台，而且可以双击执行，每次打开 frpc 不用再自己输命令了。
在任何一个目录下新建一个文本文件并将其重命名为“frpc.bat”，编辑，粘贴如下内容并保存。

```
@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
REM
cd C:\frp
frpc -c frpc.ini
exit
```

> 将 cd 后的路径更改为你的 frpc 实际存放的目录。

之后直接运行这个 .bat 文件即可启动 frpc 并隐藏窗口（可在任务管理器中退出）。
至于开机启动，把这个 .bat 文件直接扔进 Windows 的开机启动文件夹(C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp)就好了 :)
至此，客户端配置完成，之后就是你自己根据需要在 frpc.ini 后追加规则即可。
强烈建议你在使用 frp 直接测试内网穿透前，先在局域网内测试好相关功能的正常使用，并配置好可能会影响的 Windows 防火墙等内容，在内网调试通过后再使用 frp 进行内网穿透测试。
