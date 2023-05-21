---
title: "maven与gradle的相互转换"
date: 2021-07-13 23:55:41
tag: [Maven, Gradle]
category: back-end-maven
published: true
hideInList: false
feature: /post-images/tGpXzOwd3.png
isTop: false
---

# gradle --> maven

## gradlew 版本 7.0 以下，以 6.8.1 举例

在 build.gradle 最外层增加以下内容

```
apply plugin: 'java'
apply plugin: 'maven'
```

然后执行 ./gradlew install
成功后将在 build\poms 目录下生成 pom-default.xml 文件，把它复制到根目录下，改名成 pom.xml 即可

# maven --> gradle

先保证本机安装了 gradle 2.0 以上的版本
然后在 maven 项目的根目录下运行

```
gradle init --type pom
```
