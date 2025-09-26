---
title: "Windows10 子系统(WSL2) 安装、 修改目录"
date: "2021-11-25 11:36:45"
tag: [wsl2, windows]
category: windows
published: true
hideInList: false
feature:
isTop: false
---

## 先决条件

必须运行 Windows 10 版本 2004 及更高版本（内部版本 19041 及更高版本）或 Windows 11。
以下命令皆在windows 终端预览版打开

子系统和本机公用相同端口，要避免端口冲突

## 安装

### 启用子系统（powsershell 打开）

```sh
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
````

### 列出可用发行版

```bash
wsl -l -o
```

### 将wsl2设置为默认

```bash
wsl --set-default-version 2
```

### cmd 管理员 打开

启用后 模拟器和vmware都无法使用 VM VirtualBox 可以使用 关闭设置为off
启用虚拟机平台 Windows 功能并确保在 BIOS 中启用虚拟化

```bash
bcdedit /set hypervisorlaunchtype auto
```

### 安装 Ubuntu-24.04

```bash
wsl --install -d Ubuntu-24.04
```

### 升级 Ubuntu-24.04 可选

```bash
wsl.exe --set-version Ubuntu-24.04 2
```

## 启动默认发行版

```bash
wsl
```

## 启动指定发行版

```bash
wsl -d Ubuntu-24.04
```

## 退出

```bash
exit
```

## 关机所有发行版

```bash
wsl --shutdown
```

## 关机指定发行版

```bash
wsl -t Ubuntu-24.04
```

## 访问windows 文件

```bash
ll /mnt
```

## 修改安装目录

### 使用 wsl

- 首先查看所有分发版本

```bash
wsl -l --all  -v
````

- 导出分发版为tar文件到d盘

```bash
wsl --export Ubuntu-24.04 /g/ubuntu24.04.tar
```

```cmd
wsl --export Ubuntu-24.04 g:\ubuntu24.04.tar
```

- 注销指定分发版

```bash
wsl --unregister Ubuntu-24.04
```

- 重新导入并安装分发版在g:ubuntu/2204

```bash
wsl --import Ubuntu-24.04 /g/ubuntu/2204 /g/ubuntu24.04.tar
```

```cmd
wsl --import Ubuntu-24.04 g:\ubuntu\2204 g:\ubuntu24.04.tar
```

- 设置默认登陆用户为安装时用户名

```bash
'/C/Program Files/WindowsApps/CanonicalGroupLimited.ubuntu24.04onWindows_2004.2021.825.0_x64__79rhkp1fndgsc/ubuntu2004.exe' config --default-user ubuntu
```

```bash
'/C/Program Files/WindowsApps/CanonicalGroupLimited.ubuntu24.04onWindows_2004.2021.825.0_x64__79rhkp1fndgsc/ubuntu2004.exe' config --default-user root
```

- 删除tar文件(可选)

```bash
rm /g/ubuntu24.04.tar
```

### 使用LxRunOffline

- 首先查看所有分发版本

```bash
'/g/Program Files/LxRunOffline/LxRunOffline' list
````

= 查看安装路径

```bash
'/g/Program Files/LxRunOffline/LxRunOffline' get-dir -n Ubuntu-24.04
```

- 子系统迁移

```bash
'/g/Program Files/LxRunOffline/LxRunOffline' move -n Ubuntu-24.04 -d /g/ubuntu/2204/
```

查询系统目录，查看是否迁移成功

如果迁移后查询系统目录仍然在C潘，可以尝试删除子系统再重新下载来重试。

## 更换镜像源

- 备份配置文件

```bash
sudo cp -a /etc/apt/sources.list /etc/apt/sources.list.bak
```

- 修改sources.list文件

```bash
将http://archive.ubuntu.com和http://security.ubuntu.com替换成http://192.168.2.10:8081/repository/apt-huawei

sudo sed -i "s@http://.*archive.ubuntu.com@http://192.168.2.10:8081/repository/apt-huawei/@g" /etc/apt/sources.list
sudo sed -i "s@http://.*security.ubuntu.com@http://192.168.2.10:8081/repository/apt-huawei/@g" /etc/apt/sources.list
```

- 更新索引

```bash
apt-get update
```

## Xshell连接win10 Linux子系统

- 查看ip

```bash
ifconfig
```

- 配置SSH服务

```bash
## 先删ssh
sudo apt-get remove --purge openssh-server
 ## 在安装ssh
sudo apt-get install openssh-server
 ## 删配置文件，让ssh服务自己想办法链接
sudo rm /etc/ssh/ssh_config
sudo service ssh --full-restart
```

- 使用Xshell登录
上面命令执行完之后，在xshell中输入用户名和ip就可以通过xshell登录自己电脑的Linux。
