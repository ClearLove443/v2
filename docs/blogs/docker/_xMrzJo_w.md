---
title: "Docker Desktop(WSL2)修改镜像存储位置"
date: 2021-07-11 11:28:43
tag: [docker]
category: deploy
published: true
hideInList: false
feature: /post-images/_xMrzJo_w.png
isTop: false
---

查看子系统

```bash
wsl -l -v --all
```

docker-desktop 是存放程序的，docker-desktop-data 是存放镜像的，这两个 wsl 子系统都是默认放在系统盘的。
删除所有的 image/container/wsl/hyperv 数据：

```
Troubleshoot => Clean / Purge data => hyperv
```

导出 wsl 子系统镜像:

```bash
wsl --export docker-desktop docker-desktop.tar
wsl --export docker-desktop-data docker-desktop-data.tar
```

删除子系统镜像

```bash
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data
```

重新创建 wsl 子系统：

```bash
wsl --import docker-desktop D:\docker\wsl\distro docker-desktop.tar --version 2
wsl --import docker-desktop-data D:\docker\wsl\data docker-desktop-data.tar --version 2
```

查看当前 Windows 10 PC 中已安装的 Linux 发行版

```bash
wslconfig /setdefault Name
```

设置默认 Linux 发行版

```bash
wslconfig /setdefault docker-desktop
```

运行多个 Linux 发行版

在 Windows 10 中安装好多套 Linux 发行版之后，即便没将它设置为默认的 Linux 环境，也可以启动使用。例如，用户可以直接在「开始」菜单中找到启动 Ubuntu、openSUSE Leap 和 SUSE Linux Enterprise Server 系统的快捷方式，并同时运行三套独立的环境。

如果你没在 Microsoft Store 中选择将 Linux 发行版的快捷方式固定到「开始」菜单，也只需要使用其命令名称即可从命令行或快捷方式启动 Linux 发行版。以下启动三个 Linux 发行版所需的命令：

```bash
　　Ubuntu： ubuntu

　　openSUSE Leap 42： opensuse-42

　　SUSE Linux Enterprise Server 12： sles-12
```

例如，即使 Ubuntu 是你的默认环境，仍然可以通过运行 opensuse-42 命令从任何地方启动 openSUSE。
