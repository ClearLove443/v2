---
title: "Windows 10 Docker desktop 初始设置"
date: 2021-07-11 11:07:53
tag: [docker]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

# docker desktop 设置

Settings => Docker Engine

```json
{
  "registry-mirrors": [
    "https://0hgxc31r.mirror.aliyuncs.com",
    "https://docker.mirrors.ustc.edu.cn/",
    "https://hub-mirror.c.163.com/",
    "https://reg-mirror.qiniu.com"
  ],
  "insecure-registries": [],
  "debug": false,
  "experimental": true,
  "features": {
    "buildkit": true
  },
  "builder": {
    "gc": {
      "enabled": true,
      "defaultKeepStorage": "20GB"
    }
  }
}
```

# Vmmen 设置

C:\Users\<username> 利用新建 .wslconfig 文件

```
[wsl2]
memory=2GB
swap=0
localhostForwarding=true
```
