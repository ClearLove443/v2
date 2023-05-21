---
title: "SpringBoot系列: 自定义返回Http Code的n种姿势"
date: "2021-11-01 21:22:39"
tag: [SpringBoot系列, web]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

W 虽然 http 的提供了一整套完整、定义明确的状态码，但实际的业务支持中，后端并不总会遵守这套规则，更多的是在返回结果中，加一个 code 字段来自定义业务状态，即便是后端 5xx 了，返回给前端的 http code 依然是 200

那么如果我想遵守 http 的规范，不同的 case 返回不同的 http code 在 Spring 中可以做呢?

本文将介绍四种设置返回的 HTTP CODE 的方式

- @ResponseStatus 注解方式
- ResponseEntity
- HttpServletResponse#setStatus
- HttpServletResponse#sendError

## ResponseStatus 使用

通过注解`@ResponseStatus`，来指定返回的 http code, 一般来说，使用它有两种姿势，一个是直接加在方法上，一个是加在异常类上

### 装饰方法

直接在方法上添加注解，并制定对应的 code

```java
/**
 * 注解方式，只支持标准http状态码
 *
 * @return
 */
@GetMapping("ano")
@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "请求参数异常!")
public String ano() {
    return "{\"code\": 400, \"msg\": \"bad request!\"}";
}
```

实测一下，返回结果如下

```bash
curl 'http://127.0.0.1:8080/code/ano' -i
HTTP/1.1 400
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Sun, 05 Jan 2020 01:29:04 GMT
Connection: close

{"timestamp":"2020-01-05T01:29:04.673+0000","status":400,"error":"Bad Request","message":"请求参数异常!","path":"/code/ano"}
```

当我们发起请求时，返回的状态码为 400，返回的数据为 springboot 默认的错误信息格式

虽然上面这种使用姿势可以设置 http code，但是这种使用姿势有什么意义呢？

如果看过 web 系列教程中的：[SpringBoot 系列教程 web 篇之全局异常处理](https://clearlove443.github.io/v2/blogs/2021/springBoot_handle_global_exception.html) 可能就会有一些映象，配合`@ExceptionHandler`来根据异常返回对应的状态码

一个推荐的使用姿势，下面表示当你的业务逻辑中出现数组越界时，返回 500 的状态码以及完整的堆栈信息

```java
@ResponseBody
@ExceptionHandler(value = ArrayIndexOutOfBoundsException.class)
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public String handleArrayIndexOutBounds(HttpServletRequest request, HttpServletResponse response,
        ArrayIndexOutOfBoundsException e) throws IOException {
    log.info("array index out conf!");
    return "aryIndexOutOfBounds: " + getThrowableStackInfo(e);
}
```

### 装饰异常类

另外一种使用姿势就是直接装饰在异常类上，然后当你的业务代码中，抛出特定的异常类，返回的 httpcode 就会设置为注解中的值

```java
/**
 * 异常类 + 注解方式，只支持标准http状态码
 *
 * @return
 */
@GetMapping("exception/500")
public String serverException() {
    throw new ServerException("内部异常哦");
}

@GetMapping("exception/400")
public String clientException() {
    throw new ClientException("客户端异常哦");
}

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "服务器失联了，请到月球上呼叫试试~~")
public static class ServerException extends RuntimeException {
    public ServerException(String message) {
        super(message);
    }
}

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "老哥，你的请求有问题~~")
public static class ClientException extends RuntimeException {
    public ClientException(String message) {
        super(message);
    }
}
```

测试结果如下，在异常类上添加注解的方式，优点在于不需要配合@ExceptionHandler 写额外的逻辑了；缺点则在于需要定义很多的自定义异常类型

```bash
curl 'http://127.0.0.1:8080/code/exception/400' -i
HTTP/1.1 400
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Sun, 05 Jan 2020 01:37:07 GMT
Connection: close

{"timestamp":"2020-01-05T01:37:07.662+0000","status":400,"error":"Bad Request","message":"老哥，你的请求有问题~~","path":"/code/exception/400"}%

➜  ~ curl 'http://127.0.0.1:8080/code/exception/500' -i
HTTP/1.1 500
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Sun, 05 Jan 2020 01:37:09 GMT
Connection: close

{"timestamp":"2020-01-05T01:37:09.389+0000","status":500,"error":"Internal Server Error","message":"服务器失联了，请到月球上呼叫试试~~","path":"/code/exception/500"}

```

### 注意

ResponseStatus 注解的使用姿势，只支持标准的 Http Code（必须是枚举类 org.springframework.http.HttpStatus）

## ResponseEntity

这种使用姿势就比较简单了，方法的返回结果必须是 ResponseEntity，下面给出两个实际的 case

```java
@GetMapping("401")
public ResponseEntity<String> _401() {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"code\": 401, \"msg\": \"未授权!\"}");
}

@GetMapping("451")
public ResponseEntity<String> _451() {
    return ResponseEntity.status(451).body("{\"code\": 451, \"msg\": \"自定义异常!\"}");
}
```

实测结果

```bash
curl 'http://127.0.0.1:8080/code/401' -i
HTTP/1.1 401
Content-Type: text/plain;charset=UTF-8
Content-Length: 34
Date: Sun, 05 Jan 2020 01:40:10 GMT

{"code": 401, "msg": "未授权!"}

curl 'http://127.0.0.1:8080/code/451' -i
HTTP/1.1 451
Content-Type: text/plain;charset=UTF-8
Content-Length: 40
Date: Sun, 05 Jan 2020 01:40:19 GMT

{"code": 451, "msg": "自定义异常!"}
```

从上面的使用实例上看，可以知道这种使用方式，不仅仅支持标准的 http code，也支持自定义的 code（如返回 code 451)

## HttpServletResponse

这种使用姿势则是直接操作`HttpServletResponse`对象，手动录入返回的结果

### setStatus

```java
/**
 * response.setStatus 支持自定义http code，并可以返回结果
 *
 * @param response
 * @return
 */
@GetMapping("525")
public String _525(HttpServletResponse response) {
    response.setStatus(525);
    return "{\"code\": 525, \"msg\": \"自定义错误码 525!\"}";
}
```

输出结果

```bash
curl 'http://127.0.0.1:8080/code/525' -i
HTTP/1.1 525
Content-Type: text/plain;charset=UTF-8
Content-Length: 47
Date: Sun, 05 Jan 2020 01:45:38 GMT

{"code": 525, "msg": "自定义错误码 525!"}
```

使用方式比较简单，直接设置 status 即可，支持自定义的 Http Code 返回

### sendError

使用这种姿势的时候需要注意一下，只支持标准的 http code，而且 response body 中不会有你的业务返回数据，如

```java
/**
 * send error 方式，只支持标准http状态码; 且不会带上返回的结果
 *
 * @param response
 * @return
 * @throws IOException
 */
@GetMapping("410")
public String _410(HttpServletResponse response) throws IOException {
    response.sendError(410, "send 410");
    return "{\"code\": 410, \"msg\": \"Gone 410!\"}";
}

@GetMapping("460")
public String _460(HttpServletResponse response) throws IOException {
    response.sendError(460, "send 460");
    return "{\"code\": 460, \"msg\": \"Gone 460!\"}";
}
```

输出结果

```bash
curl 'http://127.0.0.1:8080/code/410' -i
HTTP/1.1 410
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Sun, 05 Jan 2020 01:47:52 GMT

{"timestamp":"2020-01-05T01:47:52.300+0000","status":410,"error":"Gone","message":"send 410","path":"/code/410"}

curl 'http://127.0.0.1:8080/code/460' -i
HTTP/1.1 500
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Sun, 05 Jan 2020 01:47:54 GMT
Connection: close

{"timestamp":"2020-01-05T01:47:54.719+0000","status":460,"error":"Http Status 460","message":"send 460","path":"/code/460"}
```

从上面的 case 也可以看出，当我们使用 send error 时，如果是标准的 http code，会设置对响应头；如果是自定义的不被识别的 code，那么返回的 http code 是 500

## 小结

上面介绍了几种常见的设置响应 http code 的姿势，下面小结一下使用时的注意事项

### ResponseStatus

- 只支持标准的 http code
- 装饰自定义异常类，使用时抛出对应的异常类，从而达到设置响应 code 的效果
- 缺点对非可控的异常类不可用
- 结合@ExceptionHandler，用来装饰方法

### ResponseEntity

形如：

```java
return ResponseEntity.status(451).body("{\"code\": 451, \"msg\": \"自定义异常!\"}");
```

- 感觉是最强大的使用姿势，就是写起来没有那么简洁
- 支持自定义 code，支持设置 response body

### HttpServletResponse

- setStatus: 设置响应 code，支持自定义 code，支持返回 response body
- sendError: 只支持标准的 http code，如果传入自定义的 code，返回的 http code 会是 500

## 项目源码

[项目:](https://gitee.com/ClearLove443/spring-boot-demo/tree/master/spring-boot/207-web-response)
