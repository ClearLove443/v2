---
title: "SpringBoot集成Swagger，并导出离线文档"
date: "2021-10-09 22:38:50"
tag: [Springboot, Swagger2, Swagger3]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

# 前言

swagger3 基于 openApi3.

随着项目架构的演化，前后端分离是不可阻挡的趋势。这种模式的协作在实践的过程中经常会遇到的一个问题就是文档。
而接口文档便是其中之一，可以说是必不可少的。
但编写接口文档对开发人员来说是一大难题，而且接口还在不断的变化，还要花费精力去维护接口文档的更新。
既然存在痛点，那么必须会出现解决此痛点的产品，这就是 Swagger，目前已经更新到 Swagger3 版本了。如果你还停留在 Swagger2，建议升级到 Swagger3，整体 UI 风格及交互友好了不少。
本篇将围绕 Swagger3 与 SpringBoot 的集成和离线文档的生成来进行讲解。

# Swagger 简介

Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。总体目标是使客户端和文件系统作为服务器以同样的速度来更新。文件的方法，参数和模型紧密集成到服务器端的代码，允许 API 来始终保持同步。
官网：[swagger.io](https://swagger.io/)

# Swagger 解决的痛点

传统方式提供文档有以下痛点：

- 接口众多，实现细节复杂，编写文档耗费费力，需要持续维护；
- 接口文档需要随时进行同步；
- 接口返回的结果不明确，得构造返回结构体等；
- 不能直接在线测试接口，通常需要额外的工具，比如 PostMan 等。

当引入 Swagger 之后，以上痛点迎刃而解，同时还带来以下优点：

- 及时性 (接口变更后，前后端人员可实时看到最新版本)
- 规范性 (接口具体统一风格，如接口地址，请求方式，参数，响应格式和错误信息等)
- 一致性 (接口信息一致，不会因接口文档版本问题出现分歧)
- 可测性 (可直接基于接口文档进行测试)

# Swagger3 的改变

Swagger3.0 的改动，官方文档总结如下几点：

- 删除了对 springfox-swagger2 的依赖；
- 删除所有@EnableSwagger2...注解；
- 添加了 springfox-boot-starter 依赖项；
- 移除了 guava 等第三方依赖；
- 文档访问地址改为 http://ip:port/project/swagger-ui/index.html。

下面就来实战使用一下吧。

# Swagger2 Demo

[SpringBoot 整合 Swagger2 实现在线 API 文档](https://blog.csdn.net/csp732171109/article/details/124180234)

# Swagger2 VS Swagger3

| Swagger3                                                             | Swagger2                        | 注解说明                                               |
| :------------------------------------------------------------------- | :------------------------------ | :----------------------------------------------------- |
| @Tag(name = “接口类描述”)                                            | @Api                            | Controller 类                                          |
| @Operation(summary =“接口方法描述”)                                  | @ApiOperation                   | Controller 方法                                        |
| @Parameters                                                          | @ApiImplicitParams              | Controller 方法                                        |
| @Parameter(description=“参数描述”)                                   | @ApiImplicitParam</br>@ApiParam | Controller 方法上 @Parameters 里 Controller 方法的参数 |
| @Parameter(hidden = true) </br>@Operation(hidden = true)</br>@Hidden | @ApiIgnore                      | 排除或隐藏 api                                         |
| @Schema                                                              | @ApiModel</br>@ApiModelProperty | DTO 实体</br>DTO 实体属性                              |

## pom.xml

- swagger2

```xml
<!--  swagger2  -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
```

- swagger3

```xml
<!-- 引入Swagger3依赖 -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

# SpringBoot 集成 Swagger3

SpringBoot 集成 Swagger3 与 SpringBoot 集成其他框架的套路基本一致，通常包括：引入依赖、指定配置文件、创建配置类和使用。

## 指定配置文件

通常情况下 swagger 只能在开发环境或测试环境下开启，生产环境下需要进行关闭的。而 swagger 的开启与关闭可在 application.properties 中进行配置：

```xml
# 生产环境需设置为false
springfox.documentation.swagger-ui.enabled=true
```

## 配置类

通过@EnableOpenApi 注解启动用 Swagger 的使用，同时在配置类中对 Swagger 的通用参数进行配置。

```java
@Configuration
@EnableOpenApi
public class Swagger3Config {

    @Bean
    public Docket createRestApi() {
        //返回文档摘要信息
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withMethodAnnotation(Operation.class))
                .paths(PathSelectors.any())
                .build()
                .globalRequestParameters(getGlobalRequestParameters())
                .globalResponses(HttpMethod.GET, getGlobalResponseMessage())
                .globalResponses(HttpMethod.POST, getGlobalResponseMessage());
    }

    /**
     * 生成接口信息，包括标题、联系人等
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Swagger3接口文档")
                .description("如有疑问，可联系二师兄，微信：zhuan2quan")
                .contact(new Contact("二师兄", "https://www.choupangxia.com/", "secbro2@gmail.com"))
                .version("1.0")
                .build();
    }

    /**
     * 封装全局通用参数
     */
    private List<RequestParameter> getGlobalRequestParameters() {
        List<RequestParameter> parameters = new ArrayList<>();
        parameters.add(new RequestParameterBuilder()
                .name("uuid")
                .description("设备uuid")
                .required(true)
                .in(ParameterType.QUERY)
                .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
                .required(false)
                .build());
        return parameters;
    }

    /**
     * 封装通用响应信息
     */
    private List<Response> getGlobalResponseMessage() {
        List<Response> responseList = new ArrayList<>();
        responseList.add(new ResponseBuilder().code("404").description("未找到资源").build());
        return responseList;
    }
}
```

通过以上配置已经完成了 Spring Boot 与 Swagger 的集成，下面展示一下如何在业务逻辑中进行使用。

# 业务中使用

创建两个实体类 Goods（商品类）和 CommonResult（通用返回结果类）。

Goods 类

```java
@ApiModel("商品模型")
public class Goods {

    /**
     * 商品id
     */
    @ApiModelProperty("商品ID")
    Long goodsId;

    /**
     * 商品名称
     */
    @ApiModelProperty("商品名称")
    private String goodsName;

    /**
     * 商品价格
     */
    @ApiModelProperty("商品价格")
    private BigDecimal price;

    // 省略getter/setter
}
```

CommonResult 类：

```java
@ApiModel("API通用数据")
public class CommonResult<T> {

    /**
     * 标识代码，0表示成功，非0表示出错
     */
    @ApiModelProperty("标识代码,0表示成功，非0表示出错")
    private Integer code;

    /**
     * 描述信息，通常错时使用
     */
    @ApiModelProperty("错误描述")
    private String msg;

    /**
     * 业务数据
     */
    @ApiModelProperty("业务数据")
    private T data;

    public CommonResult(Integer status, String msg, T data) {
        this.code = status;
        this.msg = msg;
        this.data = data;
    }

    /**
     * 成功
     */
    public static <T> CommonResult<T> success(T data) {
        return new CommonResult<>(0, "成功", data);
    }

    public static <T> CommonResult<T> success(Integer code, String msg) {
        return new CommonResult<>(code, msg, null);
    }

    /**
     * 错误
     */
    public static <T> CommonResult<T> error(int code, String msg) {
        return new CommonResult<>(code, msg, null);
    }

    // 省略getter/setter
}
```

下面针对 Controller 层的接口来使用 Swagger 对应的 API。

GoodsController 类：

```java
@Api(tags = "商品信息管理接口")
@RestController
@RequestMapping("/goods")
public class GoodsController {

    @Operation(summary = "单个商品详情")
    @GetMapping("/findGoodsById")
    public CommonResult<Goods> findGoodsById(
            @Parameter(description = "商品ID,正整数")
            @RequestParam(value = "goodsId", required = false, defaultValue = "0") Integer goodsId) {
        System.out.println("根据商品ID=" + goodsId + "查询商品详情");
        Goods goods = new Goods();
        goods.setGoodsId(1L);
        goods.setGoodsName("笔记本");
        goods.setPrice(new BigDecimal(8888));
        return CommonResult.success(goods);
    }
}
```

OrderController 类：

```java
@Api(tags = "订单管理接口")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Operation(summary = "提交订单")
    @PostMapping("/order")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "用户id", dataTypeClass = Long.class, paramType = "query", example = "123"),
            @ApiImplicitParam(name = "goodsId", value = "商品id", dataTypeClass = Integer.class, paramType = "query", example = "1")
    })
    public CommonResult<String> toBuy(@ApiIgnore @RequestParam Map<String, String> params) {
        System.out.println(params);
        return CommonResult.success("success");
    }
}
```

# 展示效果

完成集成，启动 SpringBoot 项目，在访问地址：

```
http://127.0.0.1:8080/swagger-ui/index.html
```

## Swagger3 注解使用说明

经过上述实例之后，我们知道大多数 API 是如何使用的了，这了再汇总一下相关 API 的功能：

```
@Api：用在请求的类上，表示对类的说明
    tags="说明该类的作用，可以在UI界面上看到的注解"
    value="该参数没什么意义，在UI界面上也看到，所以不需要配置"

@ApiOperation：用在请求的方法上，说明方法的用途、作用
    value="说明方法的用途、作用"
    notes="方法的备注说明"

@ApiImplicitParams：用在请求的方法上，表示一组参数说明
    @ApiImplicitParam：用在@ApiImplicitParams注解中，指定一个请求参数的各个方面
        name：参数名
        value：参数的汉字说明、解释
        required：参数是否必须传
        paramType：参数放在哪个地方
            · header --> 请求参数的获取：@RequestHeader
            · query --> 请求参数的获取：@RequestParam
            · path（用于restful接口）--> 请求参数的获取：@PathVariable
            · body（不常用）
            · form（不常用）
        dataType：参数类型，默认String，其它值dataType="Integer"
        defaultValue：参数的默认值

@ApiResponses：用在请求的方法上，表示一组响应
    @ApiResponse：用在@ApiResponses中，一般用于表达一个错误的响应信息
        code：数字，例如400
        message：信息，例如"请求参数没填好"
        response：抛出异常的类

@ApiModel：用于响应类上，表示一个返回响应数据的信息
            （这种一般用在post创建的时候，使用@RequestBody这样的场景，
            请求参数无法使用@ApiImplicitParam注解进行描述的时候）
    @ApiModelProperty：用在属性上，描述响应类的属性

```

# 导出离线文档

Swagger 为我们提供了方便的在线文档支持，但某些场景下我们需要把接口文档提供给合作人员，而不是直接给一个地址。此时，我们就需要将接口文档导出为离线文档。

这里我们集成增强文档 knife4j 来实现离线文档的导出

## 添加 knife4j 依赖

在 pom.xml 中增加 knife4j 的依赖：

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

## 启动 knife4j

在上面配置 Swagger 的 Swagger3Config 中添加@EnableKnife4j 注解，该注解可以开启 knife4j 的增强功能。

```java
@EnableKnife4j
@Configuration
@EnableOpenApi
public class Swagger3Config {
    // ...
}
```

此时，如果依旧访问 http://localhost:8080/swagger-ui/index.html 会发现显示并没有变化。这里我们需要访问 http://localhost:8080/doc.html。
