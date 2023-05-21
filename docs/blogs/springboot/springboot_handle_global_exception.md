---
title: "SpringBoot系列: 全局异常处理"
date: "2021-11-01 21:45:39"
tag: [SpringBoot系列, 异常处理, web]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

当我们的后端应用出现异常时，通常会将异常状况包装之后再返回给调用方或者前端，在实际的项目中，不可能对每一个地方都做好异常处理，再优雅的代码也可能抛出异常，那么在 Spring 项目中，可以怎样优雅的处理这些异常呢?

本文将介绍一种全局异常处理方式，主要包括以下知识点

- @ControllerAdvice Controller 增强
- @ExceptionHandler 异常捕获
- @ResponseStatus 返回状态码
- NoHandlerFoundException 处理（404 异常捕获）

## 异常处理

1. `@ControllerAdvice`
   我们通常利用`@ControllerAdvice`配合注解`@ExceptionHandler`来实现全局异常捕获处理

- `@ControllerAdvice`为所有的`Controller`织入增强方法
- `@ExceptionHandler`标记在方法上，表示当出现对应的异常抛出到上层时（即没有被业务捕获），这个方法会被触发
  下面我们通过实例进行功能演示

### 异常捕获

我们定义两个异常捕获的 case，一个是除 0，一个是数组越界异常

```java
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    public static String getThrowableStackInfo(Throwable e) {
        ByteArrayOutputStream buf = new ByteArrayOutputStream();
        e.printStackTrace(new java.io.PrintWriter(buf, true));
        String msg = buf.toString();
        try {
            buf.close();
        } catch (Exception t) {
            return e.getMessage();
        }
        return msg;
    }

    @ResponseBody
    @ExceptionHandler(value = ArithmeticException.class)
    public String handleArithmetic(HttpServletRequest request, HttpServletResponse response, ArithmeticException e)
            throws IOException {
        log.info("divide error!");
        return "divide 0: " + getThrowableStackInfo(e);
    }

    @ResponseBody
    @ExceptionHandler(value = ArrayIndexOutOfBoundsException.class)
    public String handleArrayIndexOutBounds(HttpServletRequest request, HttpServletResponse response,
            ArrayIndexOutOfBoundsException e) throws IOException {
        log.info("array index out error!");
        return "aryIndexOutOfBounds: " + getThrowableStackInfo(e);
    }
}
```

在上面的测试中，我们将异常堆栈返回调用方

### 示例服务

增加几个测试方法

```java
@Controller
@RequestMapping(path = "page")
public class ErrorPageRest {

    @ResponseBody
    @GetMapping(path = "divide")
    public int divide(int sub) {
        return 1000 / sub;
    }

    private int[] ans = new int[]{1, 2, 3, 4};

    @ResponseBody
    @GetMapping(path = "ary")
    public int ary(int index) {
        return ans[index];
    }
}
```

### 测试说明

实例测试如下，上面我们声明捕获的两种异常被拦截并输出对应的堆栈信息；

但是需要注意

- 404 和未捕获的 500 异常则显示的 SpringBoot 默认的错误页面；
- 此外我们捕获返回的 http 状态码是 200

2. `@ResponseStatus`
   上面的 case 中捕获的异常返回的状态码是 200，但是在某些 case 中，可能更希望返回更合适的 http 状态码，此时可以使用 ResponseStatus 来指定

使用方式比较简单，加一个注解即可

```java
@ResponseBody
@ExceptionHandler(value = ArithmeticException.class)
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public String handleArithmetic(HttpServletRequest request, HttpServletResponse response, ArithmeticException e)
        throws IOException {
    log.info("divide error!");
    return "divide 0: " + getThrowableStackInfo(e);
}
```

3. 404 处理
   通过`@ControllerAdvice`配合`@ExceptionHandler`可以拦截 500 异常，如果我希望 404 异常也可以拦截，可以如何处理？

首先修改配置文件 application.properties，将 NoHandlerFoundException 抛出来

```yaml
# 出现错误时, 直接抛出异常
spring.mvc.throw-exception-if-no-handler-found=true
# 设置静态资源映射访问路径，下面两个二选一，
spring.mvc.static-path-pattern=/statics/**
# spring.resources.add-mappings=false
```

其次是定义异常捕获

```java
@ResponseBody
@ExceptionHandler(value = NoHandlerFoundException.class)
@ResponseStatus(HttpStatus.NOT_FOUND)
public String handleNoHandlerError(NoHandlerFoundException e, HttpServletResponse response) {
    return "noHandlerFound: " + getThrowableStackInfo(e);
}
```

## 项目源码

[项目:](https://gitee.com/ClearLove443/spring-boot-demo/tree/master/spring-boot/209-web-error)
