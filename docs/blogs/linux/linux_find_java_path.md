---
title: "Linux如何查看JDK的安装路径"
date: "2021-12-19 17:31:18"
tag: [linux, java]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

如何在一台 Linux 服务器上查找 JDK 的安装路径呢？ 有那些方法可以查找定位 JDK 的安装路径？是否有一些局限性呢？ 下面总结了一下如何查找 JDK 安装路径的方法。

## echo $JAVA_HOME

使用`$JAVA_HOME`的话能定位 JDK 的安装路径的前提是配置了环境变量`$JAVA_HOME`，否则根本定位不到 JDK 的安装路径。

## which java

首先要申明一下 which java 是定位不到安装路径的。which java 定位到的是 java 程序的执行路径。网上的资料都是人云亦云，完全不去思考。那么怎么定位到 java 的安装路径呢？下面我们来看看例子吧,如下所示

```bash
java -version
openjdk version "11.0.11" 2021-04-20
OpenJDK Runtime Environment (build 11.0.11+9-Ubuntu-0ubuntu2.20.04)
OpenJDK 64-Bit Server VM (build 11.0.11+9-Ubuntu-0ubuntu2.20.04, mixed mode, sharing)

which java
/usr/bin/java

ls -lrt /usr/bin/java
lrwxrwxrwx 1 root root 22 Nov 28 15:59 /usr/bin/java -> /etc/alternatives/java

ls -lrt /etc/alternatives/java
lrwxrwxrwx 1 root root 43 Nov 28 15:59 /etc/alternatives/java -> /usr/lib/jvm/java-11-openjdk-amd64/bin/java

cd /usr/lib/jvm
ls -al

total 4
drwxr-xr-x 1 root root 4096 Nov 28 15:58 .
drwxr-xr-x 1 root root 4096 Dec 18 21:05 ..
-rw-r--r-- 1 root root 2047 Apr 21  2021 .java-1.11.0-openjdk-amd64.jinfo
lrwxrwxrwx 1 root root   25 Jul 17  2019 default-java -> java-1.11.0-openjdk-amd64
lrwxrwxrwx 1 root root   21 Apr 21  2021 java-1.11.0-openjdk-amd64 -> java-11-openjdk-amd64
drwxr-xr-x 1 root root 4096 Nov 28 15:58 java-11-openjdk-amd64
drwxr-xr-x 1 root root 4096 Nov 28 15:58 openjdk-11
```

`whereis java` 也是如此，它本身不能定位到安装路径。可以通过上面例子去定位安装路径
