---
title: "解决Gradle、Maven项目build后没有mybatis的mapper.xml文件问题"
date: "2021-10-03 09:39:48"
tag: [gradle, maven, mybatis]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

Gradle、Maven 都默认只把 resources 目录当作资源目录，所以在编译时就不会把 java 目录下的 mapper.xml 文件编译到输出目录，所以需要在相关文件中修改默认资源目录。

# Maven

在 pom.xml 文件中加入

```xml
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

# gradle

在 build.gradle 文件中加入

```
sourceSets.main.resources.srcDirs = ["src/main/java","src/main/resources"]
```
