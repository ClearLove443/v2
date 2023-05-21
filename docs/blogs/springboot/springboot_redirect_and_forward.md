---
title: "SpringBoot系列: url重定向和转发"
date: "2021-10-31 19:12:37"
tag: [SpringBoot系列, redirect, forward]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

Web UI 项目中, 很多 Spring controller 视图函数直接返回 html 页面, 还有一些视图函数是要重定向或转发到其他的 url 上.

## 定义

### 请求转发

浏览器向服务器发起仅一次请求、
服务器可以多次转发这个请求，寻找同一 web 程序下的资源
然后将结果返回给浏览器

### 举例说明

劫匪朝要张三 100W（request），
不管他是朝几个人、怎么借的、（内部多次转发）
打钱给劫匪（response）
但张三只能是朝自己认识的人借钱（调用你认识的人、内部资源）

### 重定向

浏览器想服务器发起第 1 次请求
服务器返回第 1 个结果一个 url 和状态码 302
然后浏览器发起第 2 次请求
使用服务器返回的 url、这次请求的范围甚至可以是其余站外的资源
访问这个 url 会导致地址栏的 url 的改变
然后服务器返回第 2 个结果到浏览器

### 举例说明

你来问一个熟人问题（request-1）
熟人说不会（response-1）让你去度娘问（url）
你去度娘问网友（调用非熟人的资源、request）
得到了答案（response）

## redirect 和 forward 的区别:

- 重定向 redirect: 完整的重定向包含两次 request-response 过程, 第一次是访问原始 url, 第二次是服务器通知客户端访问重定向后的 url. 重定向完成后, 浏览器的地址是重定向后的 url, 而不是原始的 url.

重定向的使用场景: 因为重定向会修改浏览器地址, 所以 form 提交应该使用重定向, 以免用户刷新页面导致 form 重复提交。

比如我们在逛淘宝，没有登录就点击购买时，会跳转到登录界面，这其实就是一个重定向。本文主要介绍对于后端而言，可以怎样支持 302 重定向。

转发 forward: 完整的转发仅包含一次 request-response 过程, 用户发出 request 后, 服务器端视图函数先处理自己的逻辑, 然后在服务器端有调用另一个视图函数, 最后将 response 返回给浏览器.

请求转发的挑战、为同一业务功能服务
重定向偏向于、不同业务功能之间的跳转

另外请求转发与重定向明显的一个区别就是：
如果应该使用重定向的地方、
使用请求转发会有重复操作的隐患

## 转发和重定向的选择

1. 重定向的速度比转发慢，因为浏览器还得发出一个新的请求，如果在使用转发和重定向都无所谓的时候建议使用转发。
2. 因为转发只能访问当前 WEB 的应用程序，所以不同 WEB 应用程序之间的访问，特别是要访问到另外一个 WEB 站点上的资源的情况，这个时候就只能使用重定向了。

## 实现方式

### 转发 forward

在 Spring MVC 中, 构建 forward 目标有两种方式:

1. 以字符串的形式构建目标 url, url 需要加上 forward: 前缀
2. 使用 ModelAndView 对象来设置转发的 forward 目标, viewName 可以省略 forward: 前缀, viewName 应该是目标 url, 而不是目标视图的函数名.
   传参方式:
3. 以字符串的形式构建目标 url, 可以使用 query variable 的格式拼 url
4. 使用 ModelAndView 对象来增加 attribute Object, 其结果也是在拼接 url.
   取参的方式: 可以使用 @RequestParam 来取参.

### 重定向 redirect

redirect 目标有三种构建方式

1. 使用 redirect: 前缀 url 方式构建目标 url
2. 使用 HttpServletResponse 重定向
3. 使用 RedirectView
4. 使用 ModelAndView 类型指定目标, ModelAndView 视图名默认是 forward, 所以对于 redirect, 需要加上 redirect: 前缀

传参和取参方式:

1. 传参: 以字符串的形式构建目标 url, 可以使用 query variable 的格式拼 url. 取参: @RequestParam()来 fetch
2. 传参: 可以用 HttpServletRequest.getParameterMap()来 fetch
3. 传参: redirectAttributes.addAttribute() 加的 attr. 取参: @RequestParam()来 fetch
4. 传参: redirectAttributes.addFlashAttribute() 加的 attr. 取参: @ModelAttribute()来 fetch

Flash attribute 的特点:

1. addFlashAttribute() 可以是任意类型的数据(不局限在 String 等基本类型), addAttribute()只能加基本类型的参数.
2. addFlashAttribute() 加的 attr, 不会出现在 url 地址栏上.
3. addFlashAttribute() 加的 attr, 一旦 fetch 后, 就会自动清空, 非常适合 form 提交后 feedback Message.

#### 小结

这里主要介绍了两种常见的后端重定向方式，都比较简单，这两种方式也有自己的适用场景（当然并不绝对）

1. 在返回视图的前面加上 redirect 的方式，更加适用于视图的跳转，从一个网页跳转到另一个网页
2. HttpServletResponse#sendRedirec 的方式更加灵活，可以在后端接收一次 http 请求生命周期中的任何一个阶段来使用，比如有以下几种常见的场景

- 某个接口要求登录时，在拦截器层针对所有未登录的请求，重定向到登录页面
- 全局异常处理中，如果出现服务器异常，重定向到定制的 500 页面
- 不支持的请求，重定向到 404 页面

## 项目源码

[项目:](https://gitee.com/ClearLove443/spring-boot-demo/tree/master/spring-boot/207-web-response)
