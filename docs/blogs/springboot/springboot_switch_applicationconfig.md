---
title: "SpringBoot - 多Profile使用与切换-指定配置文件"
date: "2021-10-27 20:16:29"
tag: [SpringBoot, Profiles]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

Profile 是 Spring 对不同环境提供不同配置功能的支持，可以通过激活、指定参数等方式快速切换环境。

## 多 Profile 文件

文件名格式：

```yaml
application-{profile}.properties
```

默认使用 application.properties 配置文件。

```yaml
spring.profiles.active=dev
```

## yml 多文档快

yml 文件中支持使用三个短横线分割文档块的方式。

```yaml
server:
  port: 8082
spring:
  profiles:
    active: dev
---
spring:
  profiles: dev
server:
  port: 8083
---
spring:
  profiles: prod
server:
  port: 8084
---
spring:
  profiles: default
server:
  port: 80
---
```

## 激活指定配置方式

### 配置文件方式

```yaml
spring:
  profiles:
    active: dev
```

或者

```yaml
spring.profiles.active=dev
```

### 命令行方式

不打包 运行

```bash
mvn clean spring-boot:run -Dspring-boot.run.jvmArguments='-Dserver.port=9002 -Dspring.profiles.active=uat2'
```

在打包后运行的时候，添加参数

```bash
# 命令行中指定启动端口
java -jar spring-boot-02-config-0.0.1-SNAPSHOT.jar --server.port=9000 --spring.profiles.active=dev

# 传入虚拟机系统属性
java - Dserver.port=9000 -Dspring.profiles.active=uat2 -jar bootsample.jar
```

### 编辑 Configurations，填写命令行参数或虚拟机参数

- idea

VM options

```bash
-Dspring.profiles.active=dev
```

Program arguments

```bash
--spring.profiles.active=dev
```

- VS Code

VM options

```json
"vmArgs": "-Dspring.profiles.active=dev"
```

Program arguments

```json
"args": "--spring.profiles.active=dev"
```
