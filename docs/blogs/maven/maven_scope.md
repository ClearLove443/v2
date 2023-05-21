---
title: "Maven Dependency Scope"
date: "2021-12-05 16:04:47"
tag: [maven]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

## 导语：

Dependency scope 是用来限制 Dependency 的作用范围的, 影响 maven 项目在各个生命周期时导入的 package 的状态。自从 2.0.x 后，新增了 1 种，现在有了 6 种 scope

## 常用 scope 介绍

### compile

默认的 scope,表示 dependency 可以在生命周期中使用。而且这些 dependencies 会传递到依赖的项目中。

### rovided

跟 compile 相似，但是表明了 dependency 由 JDK 或者容器提供。
例如 Servlet AP 和一些 Java EE APIs。这个 scope 只能作用在编译和测试时，同时没有传递性。
使用这个时，不会将包打入本项目中，只是依赖过来。（when building a web application for the Java Enterprise Edition, you would set the dependency on the Servlet API and related Java EE APIs to scope provided because the web container provides those classes. This scope is only available on the compilation and test classpath, and is not transitive.）

### runtime

表示 dependency 不作用在编译时，但会作用在运行和测试时

### test

表示 dependency 作用在测试时，不作用在运行时。

### system

跟 provided 相似，但是在系统中要以外部 JAR 包的形式提供，maven 不会在 repository 查找它。 例如：

```xml
<dependencies>
　　<dependency>
　　　<groupId>javax.sql</groupId>
　　　<artifactId>jdbc-stdext</artifactId>
　　　<version>2.0</version>
　　　<scope>system</scope>
　　　<systemPath>${java.home}/lib/rt.jar</systemPath>
　　</dependency>
</dependencies>
```

### import (Maven 2.0.9 之后新增)

它只使用在`<dependencyManagement>`中，表示从其它的 pom 中导入 dependency 的配置，例如 (B 项目导入 A 项目中的包配置)：
