---
title: "Kubernetes上保持运行docker容器"
date: 2023-10-29 11:25:55
category: deploy
tag: [docker, k8s, kubernetes]
# 是否置顶
sticky: false
# 是否收藏
star: false
published: true
hideInList: false
feature:
isTop: false
---

保持docker 的容器运行不停止，有以下几种方法

## docker

1. docker run

使用pseudo-tty和detach选项（docker run命令上的-itd选项）来保持容器在Docker容器上运行，不会关闭。

```sh
docker run -itd ubuntu
```

2. 使用docker-compose

```sh
docker-compose up -d
```

```yaml
services:
  ubuntu:
    image: ubuntu:latest
    restart: always
    stdin_open: true
    tty: true
    container_name: ubuntu
```

3. 指定永不完成的任务

```yaml
services:
  ubuntu:
    image: ubuntu:latest
    restart: always
    container_name: ubuntu
    command: /bin/bash -c "while true; do sleep 30; done;"
```

4. Dockerfile 指定

```
FROM ubuntu:latest

CMD /bin/bash -c "while true; do sleep 30; done;"
# CMD exec /bin/bash -c "while true; do sleep 30; done;"
# CMD exec /bin/bash -c "trap : TERM INT; sleep infinity &amp; wait"
```

```sh
docker build -t ubuntu-test .
docker run -d ubuntu-test
```

```yaml
services:
  ubuntu:
    build: .
    restart: always
    container_name: ubuntu
```

```sh
docker-compose up -d
```

## k8s

1. pod 指定CMD

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu
spec:
  containers:
  - name: ubuntu
    image: ubuntu:latest
    # Just spin &amp; wait forever
    command: [ "/bin/bash", "-c", "--" ]
    args: [ "while true; do sleep 30; done;" ]
```

2. Dockerfile指定cmd

```
FROM ubuntu:latest

CMD /bin/bash -c "while true; do sleep 30; done;"
# CMD exec /bin/bash -c "while true; do sleep 30; done;"
# CMD exec /bin/bash -c "trap : TERM INT; sleep infinity &amp; wait"
```
