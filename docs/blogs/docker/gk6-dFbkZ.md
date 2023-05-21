---
title: "windows docker 挂载本地文件、文件夹并运行Containers"
date: 2021-07-11 19:46:13
tag: [docker]
category: deploy
published: true
hideInList: false
feature: /post-images/gk6-dFbkZ.png
isTop: false
---

# 使用 docker 模式

## Angular

```bash
docker run -d -p '80:80' --name angular-ts-demo2 -v /home/ubuntu/docker/angular-ts-demo/dist/my-app:/usr/share/nginx/html -v /home/ubuntu/docker/config/nginx/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:mainline-alpine
```

## Java

# 使用 docker-compose 方式

在项目根目录新建 docker-compose.yml 文件

## Angular

```yml
web:
  image: nginx
  volumes:
    - ./www:/usr/share/nginx/html
  ports:
    - "8080:80"
  environment:
    - NGINX_HOST=foobar.com
    - NGINX_PORT=80
```

然后 cmd 执行

```bash
docker-compose -f "docker-compose.yml" up -d --build
```

# 总结

1. 容器目录不可以为相对路径

   ```bash
   # docker run -it -v /test:soft centos /bin/bash
   invalid value "/test:soft" for flag -v: soft is not an absolute path
   See 'docker run --help'.
   ```

   直接报错，提示 soft 不是一个绝对路径，所谓的绝对路径，必须以下斜线“/”开头。

2. 宿主机目录如果不存在，则会自动生成
   如果宿主机中存在/test 目录，首先删除它
   ```bash
   [root@localhost ~]# rm -rf /test
   [root@localhost ~]# ls /
   bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
   ```
   启动容器
   ```bash
   [root@localhost ~]# docker run -it -v /test:/soft centos /bin/bash
   [root@a487a3ca7997 /]# ls
   bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  soft  srv  sys  tmp  usr  var
   ```
   查看宿主机，发现新增了一个/test 目录
   ```bash
   [root@localhost ~]# ls /
   bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  test  tmp  usr  var
   ```
