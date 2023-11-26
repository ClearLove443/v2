---
title: '修复 "System has not been booted with systemd as init system "的错误。'
date: 2021-07-17 21:05:58
tag: [linux, docker]
category: deploy
published: true
hideInList: false
feature: /post-images/tSZR0Ce0z.jpg
isTop: false
---

在 Windows 里面用 WSL 或者docker 使用 Ubuntu，那么系统就是 SysV 而不是 systemd。
运行 systemctl 命令时，你的系统就会出错（针对 Linux 系统的 systemd init 系统）。

| Systemd command(linux)                 | Sysvinit command(windows => docker => linux) |
| :------------------------------------- | :------------------------------------------- |
| sudo systemctl start service\_\_name   | sudo service service\_\_name start           |
| sudo systemctl stop service\_\_name    | sudo service service\_\_name stop            |
| sudo systemctl restart service\_\_name | sudo service service\_\_name restart         |
| sudo systemctl status service\_\_name  | sudo service service\_\_name status          |
| sudo systemctl enable service\_\_name  | sudo service service\_\_name enable          |
| sudo systemctl disable service\_\_name | sudo service service\_\_name disable         |

## 替换 systemctl

```sh
sudo apt install python
wget https://raw.githubusercontent.com/gdraheim/docker-systemctl-replacement/master/files/docker/systemctl.py -O /bin/systemctl
sudo chmod a+x /bin/systemctl
```
