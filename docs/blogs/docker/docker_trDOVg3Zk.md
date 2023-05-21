---
title: "linux配置docker镜像源"
date: 2021-07-25 23:47:27
tag: [linux, docker]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

## 创建或修改 /etc/docker/daemon.json 文件，并写入以下内容：

```bash
vim /etc/docker/daemon.json
```

```json
{
  "registry-mirrors": [
    "https://0hgxc31r.mirror.aliyuncs.com",
    "https://docker.mirrors.ustc.edu.cn/",
    "https://hub-mirror.c.163.com/",
    "https://reg-mirror.qiniu.com",
    "https://mirror.ccs.tencentyun.com"
  ],
  "insecure-registries": [
    "http://192.168.2.10:5000",
    "http://192.168.50.28:8082",
    "http://192.168.50.28:8081",
    "http://192.168.50.28:5000"
  ]
}
```

## 依次执行以下命令，重新启动 Docker 服务。

```bash
systemctl daemon-reload
service docker restart
```

## 检查是否生效

```bash
docker info
```

## 在返回信息最底下有如下信息则表示成功

```bash
Registry Mirrors:
   https://0hgxc31r.mirror.aliyuncs.com
   https://docker.mirrors.ustc.edu.cn/
   https://hub-mirror.c.163.com/
   https://reg-mirror.qiniu.com
   https://mirror.ccs.tencentyun.com
```
