---
title: "Pom文件依赖包仓库顺序"
date: 2022-06-03 11:56:57
tag: [maven, dependency]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

Pom 文件依赖包仓库顺序

## 依赖库来源

POM 依赖一个库

```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>fastjson</artifactId>
  <version>1.2.47</version>
</dependency>
```

会从如下几个地方获取

本地仓库 、POM 文件中指定的仓库地址、Setting.xml 中 profile 指定的仓库地址、中央仓库地址

## 各种仓库

### 本地仓库：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
          <localRepository>D:\repositories\maven-repository</localRepository>
```

### pom.xml 中定义的仓库： (可以配置多个)

```xml
<repositories>
  <repository>
    <id>huaweicloud</id>
    <name>Public Repositories</name>
    <url>https://repo.huaweicloud.com/repository/maven/</url>
  </repository>
</repositories>
```

### setting.xml 中定义的仓库： (可以配置多个)

```xml
  <profiles>
    <profile>
        <id>nexus</id>
        <repositories>
          <repository>
            <id>huaweicloud</id>
            <name>Public Repositories</name>
            <url>https://repo.huaweicloud.com/repository/maven/</url>
          </repository>
        </repositories>
  </profiles>
```

### 中央仓库：

默认中央仓库：http://repo1.maven.org/maven2/

### 镜像(mirror): （配置多个只有第一个生效）

中央仓库 central 通常使用镜像 mirror 覆盖，如

```xml
  <mirrors>
    <mirror>
        <id>huaweicloud</id>
        <mirrorOf>*</mirrorOf>
        <url>https://repo.huaweicloud.com/repository/maven/</url>
    </mirror>
  </mirrors>
```

mirrorOf 标签里面放置的是 repository 配置的 id,为了满足一些复杂的需求，Maven 还支持更高级的镜像配置：

```
external:* = 不在本地仓库的文件才从该镜像获取
repo,repo1 = 远程仓库 repo 和 repo1 从该镜像获取
*,!repo1 =  所有远程仓库都从该镜像获取，除 repo1 远程仓库以外
* = 所用远程仓库都从该镜像获取
```

## 总结：

1. 顺序 本地仓库 > setting.xml 中定义仓库 > pom 文件中定义仓库 > 中央仓库(会被 mirror 覆盖)

2. 一旦某个仓库 id(除本地仓库)定义了镜像(mirrors) 将以镜像为准，本身仓库 URL 将失去作用
