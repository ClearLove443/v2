---
title: "java 快速统计代码执行时间的方法"
date: "2021-12-24 20:38:22"
tag: [java]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

我们在日常开发中经常需要测试一些代码的执行时间，但又不想使用向 JMH（Java Microbenchmark Harness，Java 微基准测试套件）这么重的测试框架，所以本文就汇总了一些 Java 中比较常用的执行时间统计方法，总共包含以下 6 种，如下图所示：

![execution time](/1734b1eef8bd5f34_tplv-t2oaga2asx-watermark.png)

## 方法一：System.currentTimeMillis

此方法为 Java 内置的方法，使用 System#currentTimeMillis 来统计执行的时间（统计单位：毫秒），示例代码如下：

```java
public class TimeIntervalTest {
    public static void main(String[] args) throws InterruptedException {
        // 开始时间
        long stime = System.currentTimeMillis();
        // 执行时间（1s）
        Thread.sleep(1000);
        // 结束时间
        long etime = System.currentTimeMillis();
        // 计算执行时间
        System.out.printf("执行时长：%d 毫秒.", (etime - stime));
    }
}
```

以上程序的执行结果为：

    执行时长：1000 毫秒.

## 方法二：System.nanoTime

此方法为 Java 内置的方法，使用 System#nanoTime 来统计执行时间（统计单位：纳秒），它的执行方法和 System#currentTimeMillis 类似，示例代码如下：

```java
public class TimeIntervalTest {
    public static void main(String[] args) throws InterruptedException {
        // 开始时间
        long stime = System.nanoTime();
        // 执行时间（1s）
        Thread.sleep(1000);
        // 结束时间
        long etime = System.nanoTime();
        // 计算执行时间
        System.out.printf("执行时长：%d 纳秒.", (etime - stime));
    }
}
```

以上程序的执行结果为：

    执行时长：1000769200 纳秒.
    小贴士：1 毫秒 = 100 万纳秒。

## 方法三：new Date

此方法也是 Java 的内置方法，在开始执行前 new Date() 创建一个当前时间对象，在执行结束之后 new Date() 一个当前执行时间，然后再统计两个 Date 的时间间隔，示例代码如下：

```java
import java.util.Date;

public class TimeIntervalTest {
    public static void main(String[] args) throws InterruptedException {
        // 开始时间
        Date sdate = new Date();
        // 执行时间（1s）
        Thread.sleep(1000);
        // 结束时间
        Date edate = new Date();
        //  统计执行时间（毫秒）
        System.out.printf("执行时长：%d 毫秒." , (edate.getTime() - sdate.getTime()));
    }
}
```

以上程序的执行结果为：

    执行时长：1000 毫秒.

## 方法四：Spring StopWatch

如果我们使用的是 Spring 或 Spring Boot 项目，可以在项目中直接使用 StopWatch 对象来统计代码执行时间，示例代码如下：

```java
StopWatch stopWatch = new StopWatch();
// 开始时间
stopWatch.start();
// 执行时间（1s）
Thread.sleep(1000);
// 结束时间
stopWatch.stop();
// 统计执行时间（秒）
System.out.printf("执行时长：%d 秒.%n", stopWatch.getTotalTimeSeconds()); // %n 为换行
// 统计执行时间（毫秒）
System.out.printf("执行时长：%d 毫秒.%n", stopWatch.getTotalTimeMillis());
// 统计执行时间（纳秒）
System.out.printf("执行时长：%d 纳秒.%n", stopWatch.getTotalTimeNanos());
```

以上程序的执行结果为：

    执行时长：0.9996313 秒.
    执行时长：999 毫秒.
    执行时长：999631300 纳秒.
    小贴士： Thread#sleep 方法的执行时间稍有偏差，在 1s 左右都是正常的。

## 方法五：commons-lang3 StopWatch

如果我们使用的是普通项目，那我们可以用 Apache commons-lang3 中的 StopWatch 对象来实现时间统计，首先先添加 commons-lang3 的依赖：

```xml
<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-lang3 -->
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-lang3</artifactId>
  <version>3.10</version>
</dependency>
```

然后编写时间统计代码：

```java
import org.apache.commons.lang3.time.StopWatch;

import java.util.concurrent.TimeUnit;

public class TimeIntervalTest {
    public static void main(String[] args) throws InterruptedException {
        StopWatch stopWatch = new StopWatch();
        // 开始时间
        stopWatch.start();
        // 执行时间（1s）
        Thread.sleep(1000);
        // 结束时间
        stopWatch.stop();
        // 统计执行时间（秒）
        System.out.println("执行时长：" + stopWatch.getTime(TimeUnit.SECONDS) + " 秒.");
        // 统计执行时间（毫秒）
        System.out.println("执行时长：" + stopWatch.getTime(TimeUnit.MILLISECONDS) + " 毫秒.");
        // 统计执行时间（纳秒）
        System.out.println("执行时长：" + stopWatch.getTime(TimeUnit.NANOSECONDS) + " 纳秒.");
    }
}
```

以上程序的执行结果为：

    执行时长：1 秒.
    执行时长：1000 毫秒.
    执行时长：1000555100 纳秒.

## 方法六：Guava Stopwatch

除了 Apache 的 commons-lang3 外，还有一个常用的 Java 工具包，那就是 Google 的 Guava，Guava 中也包含了 Stopwatch  统计类。
首先先添加 Guava 的依赖：

```xml
<!-- https://mvnrepository.com/artifact/com.google.guava/guava -->
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>29.0-jre</version>
</dependency>
```

然后编写时间统计代码：

```java
import com.google.common.base.Stopwatch;

import java.util.concurrent.TimeUnit;

public class TimeIntervalTest {
    public static void main(String[] args) throws InterruptedException {
        // 创建并启动计时器
        Stopwatch stopwatch = Stopwatch.createStarted();
        // 执行时间（1s）
        Thread.sleep(1000);
        // 停止计时器
        stopwatch.stop();
        // 执行时间（单位：秒）
        System.out.printf("执行时长：%d 秒. %n", stopwatch.elapsed().getSeconds()); // %n 为换行
        // 执行时间（单位：毫秒）
        System.out.printf("执行时长：%d 豪秒.", stopwatch.elapsed(TimeUnit.MILLISECONDS));
    }
}
```

以上程序的执行结果为：

    执行时长：1 秒.
    执行时长：1000 豪秒.

## 方法六：aop

为了性能调优，需要先统计出来每个方法的执行时间，直接在方法前后 log 输出太麻烦，可以用 AOP 来加入时间统计

```xml
<dependency>
 <groupId>org.springframework.boot</groupId>
 <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

在 application.properties 中加入配置

```yaml
spring.aop.auto=true
```

spring.aop.auto 属性默认是开启的，也就是说只要引入了 AOP 依赖后，默认已经增加了@EnableAspectJAutoProxy。 切记千万不要加入多余的信息，如@EnableAspectJAutoProxy！

### 实现具体代码

```java
@Component
@Aspect
public class LogAspect {
    private static final Log LOG = LogFactory.getLog(LogAspect.class);
    /**
   * 定义一个切入点.
   * 解释下：
   *
   * ~ 第一个 * 代表任意修饰符及任意返回值.
   * ~ 第二个 * 定义在web包或者子包
   * ~ 第三个 * 任意方法
   * ~ .. 匹配任意数量的参数.
   */
    @Pointcut("execution(* com.wedo.stream.service..*.*(..))")
       public void logPointcut(){
    }
    @org.aspectj.lang.annotation.Around("logPointcut()")
       public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable{
        //       LOG.debug("logPointcut " + joinPoint + "\t");
        long start = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long end = System.currentTimeMillis();
            LOG.error("+++++around " + joinPoint + "\tUse time :
 " + (end - start) + " ms!");
            return result;
        }
        catch (Throwable e) {
            long end = System.currentTimeMillis();
            LOG.error("+++++around " + joinPoint + "\tUse time :
" + (end - start) + " ms with exception : " + e.getMessage());
            throw e;
        }
    }
}
```

### 注意问题

aop 后方法不能正确返回值
这个代理方法一定要返回值，否则，在代码中就没有返回值了。

    //这样是不对的
     public void doAround(ProceedingJoinPoint joinPoint){}

Spring 的文档中这么写的：Spring AOP 部分使用 JDK 动态代理或者 CGLIB 来为目标对象创建代理。如果被代理的目标实现了至少一个接口，则会使用 JDK 动态代理。所有该目标类型实现的接口都将被代理。若该目标对象没有实现任何接口，则创建一个 CGLIB 代理。
默认是 JDK 动态代理，更改为 cglib

## 总结

本文介绍了 6 种实现代码统计的方法，其中 3 种是 Java 内置的方法：

- System.currentTimeMillis()
- System.nanoTime()
- new Date()

还介绍了 3 种常用框架 spring、commons-langs3、guava 的时间统计器 StopWatch。
在没有用到 spring、commons-langs3、guava 任意一种框架的情况下，推荐使用 System.currentTimeMillis() 或 System.nanoTime() 来实现代码统计，否则建议直接使用 StopWatch 对象来统计执行时间。
