---
title: "springboot指定端口"
date: 2022-02-15 09:48:26
tag: [port, spingboot]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

Spring Boot 框架提供了用于运行 Spring Boot 应用程序的默认嵌入式服务器(Tomcat)。它在端口 8080 上运行。可以在 Spring Boot 中更改端口。

我们可以在 Spring Boot 中更改端口。通过使用以下接口和属性文件:

- 使用 application.properties 文件
- 使用 application.yml 文件
- 使用 maven spring-boot plugin
- 命令行中指定启动端口
- 传入虚拟机系统属性
- 使用 EmbeddedServletContainerCustomizer 接口
- 使用 WebServerFactoryCustomizer 界面

## 设置系统属性

```
示例
server.port=8082
```

## 使用 application.properties 文件

```java
    // 示例
    System.setProperty("server.port", "8082");
```

我们还可以将 port 属性设置为 0。它将扫描应用程序的随机端口。每当我们重新启动应用程序时，它都会使用一个新端口。

## 使用 application.yml 文件

```yaml
示例
server:
      port:8082
```

## 使用 maven spring-boot plugin(springboot2.X)

```bash
mvn clean spring-boot:run -Dspring-boot.run.jvmArguments='-Dserver.port=8088 -Dspring.profiles.active=uat2'
```

## 命令行中指定启动端口

```bash
java -jar bootsample. jar --server.port=9000 --spring.profiles.active=dev
```

## 传入虚拟机系统属性

```bash
java - Dserver.port=9000 -Dspring.profiles.active=uat2 -jar bootsample.jar
```

## 使用 EmbeddedServletContainerCustomizer 接口

如果您使用的是 Spring Boot 1.x 版本，它将提供一个接口 EmbeddedServletContainerCustomizer 更改默认端口。

### EmbeddedServletContainerCustomizer 接口

通过使用 EmbeddedServletContainerCustomizer，我们可以自定义自动配置的嵌入式 Servlet 容器。在启动容器本身之前，所有这种类型的 Bean 都会通过容器工厂获得回调。因此，我们可以设置 端口，地址和 均匀错误页面。它在 org.springframework.boot.context.embedded 包中定义

```java
示例
@Component
public class ServerCustomizer implements EmbeddedServletContainerCustomizer
{
    @Override
    public void customize(ConfigurableEmbeddedServletContainer container)
    {
        container.setPort(8097);
    }
}
```

## 使用 WebServerFactoryCustomizer 接口

Spring Boot 2.x 版本提供了 WebServerFactoryCustomizer 接口来更改默认端口。它在包 org.springframework.boot.web.server 中定义。它解析 Web 服务器工厂类型的参数 T

```java
示例
@Component
public class ServerCustomizer implements WebServerFactoryCustomizer< ConfigurableWebServerFactory <
{
    @Override
    public void customize(ConfigurableWebServerFactory factory)
    {
        factory.setPort(9001);
    }
}
```
