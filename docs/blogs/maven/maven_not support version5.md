---
title: "maven报错：不再支持源选项 5。请使用 6 或更高版本。"
date: "2021-10-03 11:41:51"
tag: [maven]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

# 问题描述

在构建某个 maven 项目的时候发生了异常，遇到以下错误，理论上是由于没有指定 JAVA 版本导致的。

- [ERROR] 不再支持源选项 5。请使用 6 或更高版本。
- [ERROR] 不再支持目标选项 1.5。请使用 1.6 或更高版本。

#　解决方案
pom.xml 文件中增加 maven 编译的 java.version jdk 版本设置，以及 maven.compiler.source 资源编译 jdk 版本设置和 maven.compiler.target 资源构建 jdk 版本设置

```
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
        <java.version>1.8</java.version>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
```
