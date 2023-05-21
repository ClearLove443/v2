---
title: "SpringBoot Bean的基本定义与使用"
date: "2021-12-05 15:44:48"
tag: [springboot]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

在 Spring 中，有两个非常有名的特性，依赖注入（DI）与切面（AOP)，其中依赖注入其主要的作用，可以说就是维护 Spring 容器创建的 Bean 之间的依赖关系，简单来说就是一个 bean（假定名为 A）持有另一个 Bean（假定名为 B）的引用作为成员变量 b，则由 Spring 容器自动将 B 赋值给 A 的成员变量 b.因此在想理解依赖注入，就有必要了解下创建和使用 Bean 的几种姿势

## Bean 的几种创建方式

在 SpringBoot 的大环境下，基本上不再使用以前的 xml 配置，所以本篇博文也不再介绍以往 Spring 中，通过 xml 来声明 bean 的使用方式

### XML 方式

使用 Spring XML 方式配置，该方式用于在纯 Spring 应用中，适用于简单的小应用，当应用变得复杂，将会导致 XMl 配置文件膨胀 ，不利于对象管理。

```xml
<bean id="xxxx"  class="xxxx.xxxx"/>
```

### 注解方式

使用@Component,@Service,@Controler,@Repository 注解
这几个注解都是同样的功能，被注解的类将会被 Spring 容器创建单例对象。

- @Component : 侧重于通用的 Bean 类
- @Service：标识该类用于业务逻辑
- @Controler：标识该类为 Spring MVC 的控制器类
- @Repository: 标识该类是一个实体类，只有属性和 Setter,Getter

一个典型的实例如下

```java
@Component
public class AnoDemoBean {
    private String type = "AnoDemoBean";

    public String getName(String name) {
        return name + " _" + type;
    }
}
```

当用于 Spring Boot 应用时，被注解的类必须在启动类的根路径或者子路径下，否则不会生效。
如果不在，可以使用@ComponentScan 标注扫描的路径。
spring xml 也有相关的标签<component-scan />

```java
@ComponentScan(value={"com.microblog.blog","com.microblog.common"})
public class MicroblogBlogApplication {
    public static void main(String args[]){
        SpringApplication.run(MicroblogBlogApplication.class,args);
    }
}
```

### @Bean 定义方式

使用@Bean 注解,这种方式用在 Spring Boot 应用中。
@Configuration 标识这是一个 Spring Boot 配置类，其将会扫描该类中是否存在@Bean 注解的方法，比如如下代码，将会创建 User 对象并放入容器中。
@ConditionalOnBean 用于判断存在某个 Bean 时才会创建 User Bean.
这里创建的 Bean 名称默认为方法的名称 user。也可以@Bean("xxxx")定义。

```java
@Data
public class ConfigDemoBean {
    private String type = "ConfigDemoBean";

    public String getName(String name) {
        return name + " _" + type;
    }
}

@Configuration
public class BeanLoadConfig {
    @Bean
    public ConfigDemoBean configDemoBean() {
        return new ConfigDemoBean();
    }
}
```

需要说明的一点是 BeanLoadConfig 类本身也被 Spring 容器看为一个 Bean

### 使用注解@Import

使用注解@Import,也会创建对象并注入容器中

```java
@Import(User.class)
public class MicroblogUserWebApplication {
    public static void main(String args[]) {
        SpringApplication.run(MicroblogUserWebApplication.class, args);
    }
}
```

### 工厂类方式

FactoryBean 本质上也是一个 Bean，但是可以通过他来生成你期待的 Bean，在实际的业务场景中可能使用场景不多，但是在抽象的框架层面应用很广，一个简单的使用姿势如

```java
public class FacDemoBean {
    private String type = "FacDemoBean";

    public String getName(String name) {
        return name + " _" + type;
    }
}

public class DemoFactoryBean implements FactoryBean<FacDemoBean> {
    @Override
    public FacDemoBean getObject() throws Exception {
        return new FacDemoBean();
    }

    @Override
    public Class<?> getObjectType() {
        return FacDemoBean.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}

@Configuration
public class BeanLoadConfig {
    @Bean
    public DemoFactoryBean demoFactoryBean() {
        return new DemoFactoryBean();
    }

    @Bean
    public FacDemoBean facDemoBean(DemoFactoryBean demoFactoryBean) throws Exception {
        return demoFactoryBean.getObject();
    }
}
```

## bean 的使用

参考 [Spring 中的三种依赖注入方式](https://clearlove443.github.io/v2/blogs/2021/springboot_injection.html)
