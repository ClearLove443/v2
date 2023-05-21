---
title: "Spring Boot 中常见的注解"
date: 2022-01-16 19:53:38
tag: [springboot, annotation]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

## 一.SpringBoot/spring

### @SpringBootApplication:

包含@Configuration、@EnableAutoConfiguration、@ComponentScan 通常用在主类上；

### @Repository:

用于标注数据访问组件，即 DAO 组件；

### @Service:

用于标注业务层组件；

### @RestController:

用于标注控制层组件(如 struts 中的 action)，包含@Controller 和@ResponseBody；

### @Controller:

用于标注是控制层组件，需要返回页面时请用@Controller 而不是@RestController；

### @Component:

泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注；

### @ResponseBody:

表示该方法的返回结果直接写入 HTTP response body 中，一般在异步获取数据时使用，在使用@RequestMapping 后，返回值通常解析为跳转路径，
加上@responsebody 后返回结果不会被解析为跳转路径，而是直接写入 HTTP response body 中；比如异步获取 json 数据，加上@responsebody 后，会直接返回 json 数据；

### @RequestBody:

参数前加上这个注解之后，认为该参数必填。表示接受 json 字符串转为对象 List 等；

### @ComponentScan:

组件扫描。个人理解相当于，如果扫描到有@Component @Controller @Service 等这些注解的类，则把这些类注册为 bean

### @Configuration:

指出该类是 Bean 配置的信息源，相当于 XML 中的，一般加在主类上；

### @Import：

用来导入其他配置类。

### @ImportResource：

用来加载 xml 配置文件。

### @Bean:

相当于 XML 中的,放在方法的上面，而不是类，意思是产生一个 bean,并交给 spring 管理；

### @Value：

注入 Spring boot application.properties 配置的属性的值。

### @Inject：

等价于默认的@Autowired，只是没有 required 属性

### @EnableAutoConfiguration:

让 Spring Boot 根据应用所声明的依赖来对 Spring 框架进行自动配置，一般加在主类上；

### @AutoWired:

byType 方式。把配置好的 Bean 拿来用，完成属性、方法的组装，它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作；
当加上（required=false）时，就算找不到 bean 也不报错；

### @Qualifier:

当有多个同一类型的 Bean 时，可以用@Qualifier("name")来指定。与@Autowired 配合使用；

### @Resource(name="name",type="type")：

没有括号内内容的话，默认 byName。与@Autowired 干类似的事；

### @RequestMapping:

RequestMapping 是一个用来处理请求地址映射的注解，可用于类或方法上。用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径；

    该注解有六个属性:
    params:指定request中必须包含某些参数值是，才让该方法处理。
    headers:指定request中必须包含某些指定的header值，才能让该方法处理请求。
    value:指定请求的实际地址，指定的地址可以是URI Template 模式
    method:指定请求的method类型， GET、POST、PUT、DELETE等
    consumes:指定处理请求的提交内容类型（Content-Type），如application/json,text/html;
    produces:指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。

### @GetMapping、@PostMapping 等:

相当于@RequestMapping（value="/"，method=RequestMethod.GetPostPutDelete 等） 。是个组合注解；

### @RequestParam:

用在方法的参数前面。相当于 request.getParameter；

### @PathVariable:

路径变量。如 RequestMapping("user/get/mac/{macAddress}") ；

```java
public String getByMacAddress(
@PathVariable("macAddress") String macAddress){
    //do something;
}
```

参数与大括号里的名字相同的话，注解后括号里的内容可以不填。

### @JsonBackReference

解决嵌套外链问题

### @RepositoryRestResourcepublic

配合 spring-boot-starter-data-rest 使用

## 二.Jpa

### @Entity:

### @Table(name=""):

表明这是一个实体类。一般用于 jpa ，这两个注解一般一块使用，但是如果表名和实体类名相同的话，@Table 可以省略；

### @MappedSuperClass:

用在确定是父类的 entity 上。父类的属性子类可以继承；

### @NoRepositoryBean:

一般用作父类的 repository，有这个注解，spring 不会去实例化该 repository；

### @Column:

如果字段名与列名相同，则可以省略；

### @Id:

表示该属性为主键；

### @GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "repair_seq"):

表示主键生成策略是 sequence（可以为 Auto、IDENTITY、native 等，Auto 表示可在多个数据库间切换），指定 sequence 的名字是 repair_seq；

### @SequenceGeneretor(name = "repair_seq", sequenceName = "seq_repair", allocationSize = 1):

name 为 sequence 的名称，以便使用，sequenceName 为数据库的 sequence 名称，两个名称可以一致；

### @Transient:

表示该属性并非一个到数据库表的字段的映射,ORM 框架将忽略该属性.
如果一个属性并非数据库表的字段映射,就务必将其标示为@Transient,否则,ORM 框架默认其注解为@Basic；

### @Basic(fetch=FetchType.LAZY):

标记可以指定实体属性的加载方式；

### @JsonIgnore:

作用是 json 序列化时将 java bean 中的一些属性忽略掉,序列化和反序列化都受影响；

### @JoinColumn(name="loginId"):

一对一：本表中指向另一个表的外键。一对多：另一个表指向本表的外键。

### @OneToOne

对应 Hibernate 配置文件中的一对一

### @OneToMany

对应 Hibernate 配置文件中的一对多

### @ManyToOne:

对应 Hibernate 配置文件中的多对一

## 三.全局异常处理

### @ControllerAdvice:

包含@Component。可以被扫描到。统一处理异常；

### @ExceptionHandler(Exception.class):

用在方法上面表示遇到这个异常就执行以下方法。

## 四.springcloud

### @EnableEurekaServer:

用在 springboot 启动类上，表示这是一个 eureka 服务注册中心；

### @EnableDiscoveryClient:

用在 springboot 启动类上，表示这是一个服务，可以被注册中心找到；

### @LoadBalanced:

开启负载均衡能力；

### @EnableCircuitBreaker:

用在启动类上，开启断路器功能；

### @HystrixCommand(fallbackMethod="backMethod"):

用在方法上，fallbackMethod 指定断路回调方法；

### @EnableConfigServer:

用在启动类上，表示这是一个配置中心，开启 Config Server；

### @EnableZuulProxy:

开启 zuul 路由，用在启动类上；

### @SpringCloudApplication:

包含

- @SpringBootApplication
- @EnableDiscovertyClient
- @EnableCircuitBreaker

分别是 SpringBoot 注解、注册服务中心 Eureka 注解、断路器注解。对于 SpringCloud 来说，这是每一微服务必须应有的三个注解，所以才推出了@SpringCloudApplication 这一注解集合。
