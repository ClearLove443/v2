---
title: "docker 常用命令"
date: 2021-07-17 10:40:55
tag: [docker]
category: deploy
published: true
hideInList: false
feature: /post-images/Ec4h0aLBU.png
isTop: false
---

# 场景一：镜像下载、运行及删除

| COMMAND                                                                 | DESC                                                            |
| :---------------------------------------------------------------------- | :-------------------------------------------------------------- | --- |
| 查看                                                                    |                                                                 |
| docker images                                                           | 列出所有镜像(images)                                            |
| docker ps                                                               | 列出正在运行的容器(containers)                                  |
| docker ps -a                                                            | 列出所有的容器                                                  |
| docker pull centos                                                      | 下载 centos 镜像                                                |
| docker top ‘container’                                                  | 查看容器内部运行程序                                            |
| 镜像                                                                    |                                                                 |
| docker rmi [image-id]                                                   | 删除镜像                                                        |
| docker rmi $(docker images -q)                                          | 删除所有镜像                                                    |
| docker rmi $(sudo docker images --filter "dangling=true" -q --no-trunc) | 删除无用镜像                                                    |
| docker build -t wp-api .                                                | 构建 1 个镜像,-t(镜像的名字及标签) wp-api(镜像名) .(构建的目录) |
| docker run -i -t wp-api                                                 | -t -i 以交互伪终端模式运行,可以查看输出信息                     |
| docker run -d -p 80:80 wp-api                                           | 镜像端口 -d 后台模式运行镜像                                    |
| ocker run --help                                                        | 帮助                                                            | s   |
| 容器                                                                    |                                                                 |
| docker kill ‘container’                                                 | 停止正在运行的容器                                              |
| docker rm ‘container’                                                   | 删除没有运行的容器                                              |
| docker exec -it 容器 ID sh                                              | 进入容器                                                        |
| docker stop ‘container’                                                 | 停止一个正在运行的容器，‘container’可以是容器 ID 或名称         |
| docker start ‘container’                                                | 启动一个已经停止的容器                                          |
| docker restart ‘container’                                              | 重启容器                                                        |
| docker run -i -t -p :80 LAMP /bin/bash                                  | 运行容器并做 http 端口转发                                      |
| docker exec -it ‘container’ /bin/bash                                   | 进入 ubuntu 类容器的 bash                                       |
| docker exec -it /bin/sh                                                 | 进入 alpine 类容器的 sh                                         |
| docker rm docker ps -a -q                                               | 删除所有已经停止的容器                                          |
| docker kill $(docker ps -a -q)                                          | 杀死所有正在运行的容器，$()功能同``                             |

更多命令查看[Docker 命令大全 | 菜鸟教程](https://www.runoob.com/docker/docker-command-manual.html)

# 场景二：下载镜像并直接运行

```bash
docker run  --name ubuntu -it ubuntu bash
docker cp dd ubuntu:tmp/ #复制文件dd 到容器的/tmp 目录
Ctrl-p Ctrl-q  #退出
```

# 修改镜像，并保存到私有仓库

```bash
docker exec -it ubuntu bash
apt-get update
apt-get install apache2
Ctrl-p Ctrl-q  #退出
docker commit -a "mir355" -m "ubuntu add apache2" {ID}  private/ubuntu_apache:v1   #保存镜像
docker stop ubuntu
docker rm ubuntu
docker run -i -t --name apache2 -p 8080:80 private/ubuntu_apache:v1 /bin/bash
/etc/init.d/apache2 start
Ctrl-p Ctrl-q  #退出
#通过 docker tag重命名镜像，使之与registry匹配
docker tag private/ubuntu_apache:v1 127.0.0.1:5000/private/ubuntu_apache:v1
#保存到私有仓库
docker push 127.0.0.1:5000/private/ubuntu_apache:v1
curl http://127.0.0.1:5000/v2/_catalog

#下载镜像
docker pull 127.0.0.1:5000/private/ubuntu_apache:v1
```
