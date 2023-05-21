---
title: "linux 修改文件目录拥有者及用户组"
date: 2021-07-25 23:44:04
tag: [linux]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

## 修改目录及其子目录拥有者

```bash
# chown   -R : 进行递归,连同子目录下的所有文件、目录
sudo chown -R ubuntu /home/ubuntu/docker
```
