---
title: "关于Java8 parallelStream并发安全的思考"
date: 2022-02-20 19:19:28
tag: [java8, stream, parallel]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

## 背景

Java8 的 stream 接口极大地减少了 for 循环写法的复杂性，stream 提供了 map/reduce/collect 等一系列聚合接口，还支持并发操作：parallelStream。

在爬虫开发过程中，经常会遇到遍历一个很大的集合做重复的操作，这时候如果使用串行执行会相当耗时，因此一般会采用多线程来提速。Java8 的 paralleStream 用 fork/join 框架提供了并发执行能力。但是如果使用不当，很容易陷入误区。

## Java8 的 paralleStream 是线程安全的吗

一个简单的例子,在下面的代码中采用 stream 的 forEach 接口对 1-10000 进行遍历，分别插入到 3 个 ArrayList 中。其中对第一个 list 的插入采用串行遍历，第二个使用 paralleStream，第三个使用 paralleStream 的同时用 ReentryLock 对插入列表操作进行同步：

```java
  private static List<Integer> list1 = new ArrayList<>();
  private static List<Integer> list2 = new ArrayList<>();
  private static List<Integer> list3 = new ArrayList<>();
  private static List<Integer> list4 = new ArrayList<>();
  private static Lock lock = new ReentrantLock();

  public static void main(String[] args) {
  IntStream.range(0, 10000).forEach(list1::add);

  IntStream.range(0, 1000).parallel().forEach(list2::add);
  list4 = IntStream.range(0, 10000).parallel().mapToObj(i -> i).collect(Collectors.toList());
  IntStream.range(0, 10000).forEach(i -> {
    lock.lock();
    try {
    list3.add(i);
    } finally {
    lock.unlock();
    }
  });

  list4 = IntStream.range(0, 10000).parallel().mapToObj(i -> i).collect(Collectors.toList());
  System.out.println("串行执行的大小：" + list1.size());
  System.out.println("并行执行的大小：" + list2.size());
  System.out.println("加锁并行执行的大小：" + list3.size());
  System.out.println("collect并行执行的大小：" + list3.size());
  }
```

执行结果：

```
串行执行的大小：10000
并行执行的大小：984
加锁并行执行的大小：10000
collect并行执行的大小：10000
```

并且每次的结果中并行执行的大小不一致，而串行和加锁后的结果一直都是正确结果。显而易见，stream.parallel.forEach()中执行的操作并非线程安全。

那么既然 paralleStream 不是线程安全的，是不是在其中的进行的非原子操作都要加锁呢？我在 stackOverflow 上找到了答案：

- [using-java-8-parallel-streams](https://codereview.stackexchange.com/questions/60401/using-java-8-parallel-streams)

- [parallel-streams-collectors-and-thread-safety](https://stackoverflow.com/questions/22350288/parallel-streams-collectors-and-thread-safety)

在上面两个问题的解答中，证实 paralleStream 的 forEach 接口确实不能保证同步，同时也提出了解决方案：使用 collect 和 reduce 接口。

[parallelism](http://docs.oracle.com/javase/tutorial/collections/streams/parallelism.html)

在 Javadoc 中也对 stream 的并发操作进行了相关介绍：

    The Collections Framework provides synchronization wrappers, which add automatic synchronization to an arbitrary collection, making it thread-safe.

Collections 框架提供了同步的包装，使得其中的操作线程安全。

那么 reduce 也能保证线程安全吗，我们在进行如下测试。

## reduce 示例

现在给你一组指定的数组，需要你计算出每个数字的乘积。这种情况我们采用 stream 可以用一个链式代码直接一步到位，省去了写 for 循环的这样臃肿的代码。

```java
 public static void main(String[] args) {
        long[] array = new long[]{3, 123, 1, 31, 56, 61, 22};
        long total = Arrays.stream(array)
                .reduce(1, (acc, next) -> acc * next);
        System.out.println(total);
    }
```

如果我们拿到的结果还需要乘以一个固定的数字 m ，那么我们只需要修改代码为：

```java
 int total = Arrays.stream(array)
                .reduce(m, (acc, next) -> acc * next);

```

如果数字过多串行流的顺序执行会不会导致效率很低呢？于是我又尝试采用 parallel() 来执行程序

```java
 public static void main(String[] args) {
        long[] array = new long[]{3, 123, 1, 31, 56, 61, 22};
        long total = Arrays.stream(array)
                .parallel()
                .reduce(1, (acc, next) -> acc * next);
        System.out.println(total);
    }

```

意外的发现，当 m=1 的时候，串行流和并行流取得的结果是一致的，而当 m 不为 1 时，两者的结果并不匹配。比如当 m=3 的时候，串行流的运算结果为 2578991184 而并行流的运算结果为 1880084573136 。是什么导致了这样的误差呢？

## ForkJoinPool

Java Streams 默认使用同一个 ForkJoinPool 执行并行流。 ForkJoinPool 主要就是将任务递归拆分为多个块，然后可以独立地计算每个块。

Stream.reduce 顺序执行的时候是这样的：

![1](/40c3b318a03e4490b3fb3753a2d0e78f_tplv-k3u1fbpfcp-watermark.awebp)

并行流的算法其实也非常简单，我们假设任务仅被分成 2 部分：

![2](/fc97c5dceef24e599ba5ecb96669eace_tplv-k3u1fbpfcp-watermark.awebp)

每个块都多乘了一次 m ，并行流给每个任务块都应用了给定的标识 m 。知道了这个刚刚的 bug 我们也就可以解决了。我们可以将每个标识 m 都采用 1 ，乘 1 并不会影响程序结果，然后得到最后的结果只会再乘以 m ：

```java
 public static void main(String[] args) {
        long[] array = new long[]{3, 123, 1, 31, 56, 61, 22};
        long total = Arrays.stream(array)
                .parallel()
                .reduce(1, (acc, next) -> acc * next) * m;
        System.out.println(total);
    }

```

## 注意事项

再使用流的时候，有哪些小细节应该注意呢。

- 应用到并行流的任何操作都必须是符合缩减操作的三个约束条件，无状态，不干预，关联性！因为这三大约束确保在并行流上执行操作的结果和在顺序流上执行的结果是相同的
- paralleStream 里直接去修改变量是非线程安全的，但是采用 collect 和 reduce 操作就是满足线程安全的了。

- 在采用并行流收集元素到集合中时，最好调用 collect 方法，一定不要采用 Foreach 方法或者 map 方法。

- 当对方法替换的同时，必须关注方法处理的过程中，是否用到线程不安全的类型例如 HashMap,ArrayList 等待，方法内部使用不会出现线程安全问题，当变量在方法外部定义尤为重要，使用并行流需谨慎，时刻考虑线程安全问题。否则可能造成程序死锁，或数据的准确性。造成的后果完全取决于使用非线程安全类的效果。

- parallelStream 默认采用 forkjoin 底层实现，线程池的数量取决于计算机的核数。
  比如当数据量不大时，顺序执行往往比并行执行更快，毕竟准备线程池和相关资源也是需要时间的。
  再比如当任务涉及到 I/O 操作并且任务之间不互相依赖时，那么并行化就是一个不错的选择。

### Reduce 应当可拆分

如果不确定流是串行流（比如它作为函数参数来提供），则 reduce 函数的 identity 不应影响单个任务块的结果。即求和函数的 identity 必须为 0 ，而求乘积的 identity 必须为 1。

### 合理采用并行流

并不是所有流操作都应该并行化。例如 map ，flatMap 和 filter 是无状态的，因此我们可以采用并行流的做法。而 sort ，distinct 和 limit 不但不会带来性能提升，反而可能会引发错误。
并且，并行化的有效性在很大程度上取决于流的来源。 ArrayList ，array 或 IntStream.range 支持随机访问，这意味着它们可以轻松拆分。但是 LinkedList 分解需要 O(n) 时间。还有 Stream.iterate 和 BufferedReader 也要尽量避免采用并行流，因为它们的开头都有未知的长度，因此很难估算拆分来源。

### 编写单元测试

并行流虽然具备潜在的性能优势，但是同时也可能带来一些致命的错误，因此，每次将串行流替换为并行流时，为了确保功能未被破坏。需要编写一定的单元侧试。

## 参考链接

- [跟我学 Java 8 新特性之 Stream 流（四）并行流](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247486643&idx=1&sn=d5bbaf6ff97c6ba04ff037bf92a36d62&chksm=eb538985dc24009384af9a0fe196c8c97a7d0bb89cd6703e6b3dbe1bc6e7001727d9d932a260&scene=21#wechat_redirect)
