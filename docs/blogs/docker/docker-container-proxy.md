---
title: "docker使用宿主机代理"
date: 2021-08-29 09:20:01
tag: [linux, docker]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

# 使用网络模式：`--network=host`

```bash
docker run -it --network=host --name="Host-Proxy-Test" ubuntu:16.04

```

# docker-compose 方式

```yml
version: "3"
services:
  web:
    user: root # 为了避免一些权限问题 在这我使用了root
    restart: always # 重启方式
    image: jenkins/jenkins:lts # 指定服务所使用的镜像 在这里我选择了 LTS (长期支持)
    container_name: jenkins # 容器名称
    volumes: # 卷挂载路径
      - /home/ubuntu/jenkins/jenkins_home/:/var/jenkins_home # 这是我们一开始创建的目录挂载到容器内的jenkins_home目录
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker # 这是为了我们可以在容器内使用docker命令
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose
    network_mode: host
```

```bash
docker-compose up -d
```
