---
title: "使用docker安装ubuntu镜像"
date: 2021-07-17 19:34:37
tag: [docker, linux]
category: deploy
published: true
hideInList: false
feature: /post-images/fl2jBQKOX.png
isTop: false
---

查找 Ubuntu 镜像

```bash
docker search ubuntu
```

安装 Ubuntu 镜像

```bash
docker pull ubuntu
```

查看 docker 镜像

```bash
docker images
```

运行 docker 镜像

```bash
docker run -it -d -p '8090:80'  --name ubuntu -v D:/docker/share:/docker/share ubuntu_havedocker:1.0
```

-name 自定义容器名，-p 指定端口映射，前者为虚拟机端口，后者为容器端口,成功后返回 id
查看所有启动的容器(查看所有容器加 -a)

```bash
docker ps
```

根据 id 查看容器信息

```bash
docker images
```

进入 docker(或者把容器 id 改为容器名，也可以进入)

```bash
docker exec -it [id] /bin/bash
```

容器里面也是 ubuntu 虚拟机，同样适用 Linux 命令
退出容器

```bash
exit
```

停止容器

```bash
docker stop [id]
```

制作 docker 镜像

```bash
docker commit [id] ubuntu_test1:1.0
```

1.0 为版本号，需要添加，镜像名字随意
查看镜像是否创建

此时镜像只能本地使用，在其他机器使用需打包
打包镜像并查看

```bash
docker save -o ubuntu_test1.tar ubuntu_test1:1.0
```
