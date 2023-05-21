---
title: "传输文件到 docker 容器"
date: "2021-10-09 23:37:07"
tag: [docker]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

# 传输文件到 docker 容器

首先需要知道 docker 容器的 container_id ,可以使用 docker ps 命令来查看你要操作的 docker 容器的 container_id

Docker 容器向宿主机传送文件

```bash
# 格式:

docker cp container_id:<docker容器内的路径> <本地保存文件的路径>

# 比如:

docker cp 10704c9eb7bb:/root/test.text /home/vagrant/test.txt
```

# 宿主机向 docker 容器传送文件

```bash
# 格式:

docker cp 本地文件的路径 container_id:<docker容器内的路径>
# 比如:

docker cp  /home/vagrant/test.txt 10704c9eb7bb:/root/test.text
```
