---
title: "docker 发布SpringBoot项目"
date: 2021-07-11 21:53:20
tag: [docker, Spring boot, java]
category: deploy
published: true
hideInList: false
feature: /post-images/R4q4HcMUL.png
isTop: false
---

[Spring boot](https://developer.aliyun.com/article/708980)

## 方法一

运行

```bash
docker run -d -p '9090:9090' --name springboot-demo -v D:/Workspace/SpringBootDemo/target/SpringBootDemo-0.0.1-SNAPSHOT.war:/app.jar openjdk:11.0.11-jre-slim java -jar /app.jar
```

## 方法二

先制作镜像，
Dockerfile 设置

```
# 添加 Java 8 镜像来源
# FROM openjdk:11.0.11-jre-slim
FROM openjdk:8u322-jre-slim-buster

# 添加参数
ARG JAR_FILE

# 添加 Spring Boot 包
ADD demo-0.0.1-SNAPSHOT.war app.jar

# 执行启动命令
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
```

制作镜像命令

```bash
docker build -t tomcat:v1 .
```

运行实例命令

```bash
docker run -p 8080:8080 -d tomcat:v1
```

powershell 执行

```powershell
.\gradlew build ; docker build -t tomcat:v1 . ; docker run -p 8080:8080 -d tomcat:v1 ;
```

## 方法三

docker-compose

```yaml
services:
  springboot:
    image: openjdk:latest
    restart: always
    container_name: springboot
    ports:
      - 8080:8080
    volumes:
      - ./app/app.jar:/app/app.jar
    command: java -jar /app/app.jar
```

运行

```bash
docker-compose up -d
```
