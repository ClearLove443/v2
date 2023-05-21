---
title: "linux 添加和删除用户"
date: 2022-01-16 12:25:56
tag: [linux, user]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

## 添加用户

```bash
sudo adduser username

sudo cat /etc/shadow

tom:$6$iXDRKGEq$3FdFbXuwnPk7lSozGCsIws3q/o3HhYYpdiKqt6cQ3yGMIQxMLO93KXRAgD5uJJaCQhvZOiuEwkh6ti8I3AYL50:17599:0:99999:7:::
```

## 添加用户到 sudo 用户组

```bash
usermod -aG sudo username
usermod -aG docker ubuntu
```

## 配置sudo不要密码

```bash
# %sudo 代表group 指定具体的用户，去掉%
sudo vim /etc/sudoers
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL
```

## 删除用户

```bash
sudo userdel username

参数：
  -r  remove home directory and mail spool
  -f  force removal of files, even if not owned by user
  -z  remove any SELinux user mapping for the user
```
