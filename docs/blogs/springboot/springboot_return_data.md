---
title: "SpringBoot系列: 返回文本、网页、图片"
date: "2021-11-01 22:22:39"
tag: [SpringBoot系列, web, response]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

前面几篇博文介绍了如何获取 get/post 传参，既然是 http 请求，一般也都是有来有往，有请求参数传递，就会有数据返回。那么我们通过 springboot 搭建的 web 应用，可以怎样返回数据呢？

本篇将主要介绍以下几种数据格式的返回实例

- 返回文本
- 返回数组
- 返回 json 串
- 返回静态网页
- 返回图片

## 数据返回姿势实例

以下返回实例都放在同一个 Controller 中，具体定义如下

```java
@Controller
@RequestMapping(path = "data")
public class DataRespRest {
}
```

1. 文本返回
   这个属于基础功能了，发起请求，返回一串文本，在 SpringMVC 的体系中，要实现这种通常的写法通常是直接定义方法的返回为 String；当然还有另外一种非常基础的写法，直接将返回的数据通过 HttpServletResponse 写入到输出流中

下面给出这两种写法的实例

```java
@ResponseBody
@GetMapping(path = "str")
public String strRsp() {
    return "hello " + UUID.randomUUID().toString();
}

@ResponseBody
@GetMapping(path = "str2")
public void strRsp2(HttpServletResponse response) throws IOException {
    Map<String, String> ans = new HashMap<>(2);
    ans.put("a", "b");
    ans.put("b", "c");
    response.getOutputStream().write(JSON.toJSONString(ans).getBytes());
    response.getOutputStream().flush();
}
```

注意上面的实现中，方法上面多了一个注解`@ResponseBody`，这个表示返回数据，而不是视图（后面会详细说明）

strRsp2 的输出借助了 FastJson 来实现将 map 序列化为 json 串，然后写入输出流

从上面的输出也可以看出，第一种返回方式，ResponseHeaders 的 Content-Type: text/html;charset=UTF-8；而第二种方式则没有这个响应头，需要我们自己主动设置（这里注意一下即可，在后面的返回图片中有实例）

2. 返回数组
   前面请求参数的博文中，我们看到请求参数允许传入数组，那么我们返回可以直接返回数组么？讲道理的话，应该没啥问题

```java
/**
 * 返回数组
 *
 * @return
 */
@ResponseBody
@GetMapping(path = "ary")
public String[] aryRsp() {
    return new String[]{UUID.randomUUID().toString(), LocalDateTime.now().toString()};
}
```

注意下响应头，为`application/json`, 也就是说 SpringMVC 将数组当成 json 串进行返回了

3. Bean 返回
   在我们实际的业务开发中，这种应该属于非常常见的使用姿势了，直接返回一个 POJO，调用者接收的是一个 json 串，可以很容易的反序列化为需要的对象

```java
/**
 * 返回POJO
 *
 * @return
 */
@ResponseBody
@GetMapping(path = "bean")
public DemoRsp beanRsp() {
    return new DemoRsp(200, "success", UUID.randomUUID().toString() + "--->data");
}
```

4. 网页返回
   前面都是直接返回数据，但是我们平常在使用浏览器，更多的是发起一个请求，然后返回一个网页啊，难道说 springmvc 不能直接返回网页么？

当然返回网页怎么可能会不支持，（题外话：个人感觉在前后端分离逐渐流行之后，直接由后端返回网页的 case 不太多了，前端和后端作为独立的项目部署，两者之间通过 json 串进行交流；这里扯远了），我们下面看一下 SpringMVC 中如何返回网页

我们可以从上面直接返回字符串的 case 中，得到一个思路，如果我直接返回一个 html 文本，会怎样？既然返回 content-type 是 text/html，那浏览器应该可以解析为网页的，下面实测一下

```java
@ResponseBody
@GetMapping(path = "html")
public String strHtmlRsp() {
    return "<html>\n" + "<head>\n" + "    <title>返回数据测试</title>\n" + "</head>\n" + "<body>\n" +
            "<h1>欢迎欢迎，热烈欢迎</h1>\n" + "</body>\n" + "</html>";
}
```

浏览器发起请求之后，将我们返回的 html 文本当做网页正常渲染了，所以我们如果想返回网页，就这么干，没毛病！
上面这种方式虽然说可以返回网页，然而在实际业务中，如果真要我们这么干，想想也是可怕，还干什么后端，分分钟全栈得了！！！
下面看一下更常规的写法，首先我们需要配置下返回视图的前缀、后缀, 在 application.yml 配置文件中添加如下配置

```yaml
spring:
  mvc:
    view:
      prefix: /
      suffix: .html
```

然后我们的静态网页，放在资源文件的 static 目录下，下面是我们实际的项目截图，index.html 为我们需要返回的静态网页

接下来就是我们的服务接口

```java
/**
 * 返回视图
 *
 * @return
 */
@GetMapping(path = "view")
public String viewRsp() {
    return "index";
}
```

注意下上面的接口，没有@ResponseBody 注解，表示这个接口返回的是一个视图，会从 static 目录下寻找名为 index.html（前缀路径和后缀是上面的 application.yml 中定义）的网页返回

5. 图片返回
   图片返回与前面的又不太一样了，上面介绍的几种 case 中，要么是返回文本，要么返回视图，而返回图片呢，更多的是返回图片的字符数组，然后告诉浏览器这是个图片，老哥你按照图片渲染

直接返回二进制流，上面在介绍文本返回的两种方式中，有个直接通过 HttpServletResponse 向输出流中写数据的方式，我们这里是不是可以直接这么用呢？

下面给出一个从网络下载图片并返回二进制流的实际 case

```java
/**
 * 返回图片
 */
@GetMapping(path = "img")
public void imgRsp(HttpServletResponse response) throws IOException {
    response.setContentType("image/png");
    ServletOutputStream outStream = response.getOutputStream();

    String path = "https://spring.hhui.top/spring-blog/imgs/info/info.png";
    URL uri = new URL(path);
    BufferedImage img = ImageIO.read(uri);
    ImageIO.write(img, "png", response.getOutputStream());
    System.out.println("--------");
}
```

注意下上面的实例 case，首先设置了返回的 ContentType，然后借助 ImateIO 来下载图片（个人不太建议这种写法，很容易出现 403；这里演示主要是为了简单…），并将图片写入到输出流

## 小结

1. 返回数据小结
   本篇博文主要介绍了几种常见数据格式的返回使用姿势，本文更多的是一种使用方式的实例 case 演示，并没有涉及到底层的支持原理，也没有过多的提及如何设置响应头，web 交互中常见的 cookies/session 也没有说到，这些将作为下篇的内容引入，恳请关注

下面做一个简单的小结

- 返回纯数据

* 添加`@ResponseBody`注解，则表示我们返回的是数据，而不需要进行视图解析渲染；
* 如果一个`controller`中全部都是返回数据，不会返回视图时，我们可以在添加`@RestController`注解，然后这个类中的接口都不需要添加@ResponseBody 注解了
* 返回视图时，我们会根据接口返回的字符串，结合定义的前缀，后缀，到资源路径的`static`目录下寻找对应的静态文件返回
* 可以直接通过向`HttpServletResponse`的输出流中写数据的方式来返回数据，如返回图片常用这种 case
