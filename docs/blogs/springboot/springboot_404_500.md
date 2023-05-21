---
title: "SpringBoot系列: 404、500异常页面配置"
date: "2021-11-01 21:30:39"
tag: [SpringBoot系列, 异常页面, web]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

当出现异常的场景下，如 404 请求 url 不存在，，403 无权，500 服务器异常时，我们可以如何处理

## 异常页面配置

在 SpringBoot 项目中，本身提供了一个默认的异常处理页面，当我们希望使用自定义的 404,500 等页面时，可以如何处理呢？

1. 默认异常页面配置
   在默认的情况下，要配置异常页面非常简单，在资源路径下面，新建 error 目录，在下面添加 400.html, 500.html 页面即可

项目结构如上，注意这里的实例 demo 是没有使用模板引擎的，所以我们的异常页面放在 static 目录下；如果使用了如 FreeMaker 模板引擎时，可以将错误模板页面放在 template 目录下

接下来实际测试下是否生效, 我们先定义一个可能出现服务器 500 的服务

```java
@Controller
@RequestMapping(path = "page")
public class ErrorPageRest {

    @ResponseBody
    @GetMapping(path = "divide")
    public int divide(int sub) {
        System.out.println("divide1");
        return 1000 / sub;
    }
}
```

请求一个不存在的 url，返回我们定义的 400.html 页面
`http://localhost:8080/page/divide2`

```html
<html>
  <head>
    <title>404页面</title>
  </head>
  <body>
    <h3>页面不存在</h3>
  </body>
</html>
```

请求一个服务器 500 异常，返回我们定义的 500.html 页面
`http://localhost:8080/page/divide?sub=0`

```html
<html>
  <head>
    <title>500页面</title>
  </head>
  <body>
    <h2 style="color: red;">服务器出现异常!!!</h2>
  </body>
</html>
```

2. BasicErrorController
   看上面的使用比较简单，自然会有个疑问，这个异常页面是怎么返回的呢？

从项目启动的日志中，注意一下`RequestMappingHandlerMapping`

可以发现里面有个/error 的路径不是我们自己定义的，从命名上来看，这个多半就是专门用来处理异常的 Controller -> BasicErrorController， 部分代码如下

```java
@Controller
@RequestMapping("${server.error.path:${error.path:/error}}")
public class BasicErrorController extends AbstractErrorController {


    @RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
        HttpStatus status = getStatus(request);
        Map<String, Object> model = Collections
                .unmodifiableMap(getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.TEXT_HTML)));
        response.setStatus(status.value());
        ModelAndView modelAndView = resolveErrorView(request, response, status, model);
        return (modelAndView != null) ? modelAndView : new ModelAndView("error", model);
    }


    @RequestMapping
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        HttpStatus status = getStatus(request);
        if (status == HttpStatus.NO_CONTENT) {
            return new ResponseEntity<>(status);
        }
        Map<String, Object> body = getErrorAttributes(request, getErrorAttributeOptions(request, MediaType.ALL));
        return new ResponseEntity<>(body, status);
    }
```

这个 Controller 中，一个返回网页的接口，一个返回 Json 串的接口；我们前面使用的应该是第一个，那我们什么场景下会使用到第二个呢？

- 通过制定请求头的 Accept，来限定我们只希望获取 json 的返回即可

3. 小结
   本篇内容比较简单，归纳为两句话如下

将自定义的异常页面根据 http 状态码命名，放在/error 目录下
在异常状况下，根据返回的 http 状态码找到对应的异常页面返回

## 项目源码

[项目:](https://gitee.com/ClearLove443/spring-boot-demo/tree/master/spring-boot/207-web-response)
