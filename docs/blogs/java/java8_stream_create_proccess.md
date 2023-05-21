---
title: "Java8中 Stream创建流的四种方式、流的基本操作（流计算）"
date: 2022-02-15 10:10:29
tag: [java8, stream]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

## Java 对函数式编程的重视程度，看看 Java 8 加入函数式编程扩充多少功能就清楚了。Java 8 之所以费这么大功夫引入函数式编程，原因有二：

- 代码简洁函数式编程写出的代码简洁且意图明确，使用 stream 接口让你从此告别 for 循环。
- 多核友好，Java 函数式编程使得编写并行程序从未如此简单，你需要的全部就是调用一下 parallel()方法。

这一节我们学习 stream，也就是 Java 函数式编程的主角。对于 Java 7 来说 stream 完全是个陌生东西，stream 并不是某种数据结构，它只是数据源的一种视图。这里的数据源可以是一个数组，Java 容器或 I/O channel 等。正因如此要得到一个 stream 通常不会手动创建，而是调用对应的工具方法。

## 虽然大部分情况下 stream 是容器调用 Collection.stream()方法得到的，但 stream 和 collections 有以下不同：

- 无存储。stream 不是一种数据结构，它只是某种数据源的一个视图，数据源可以是一个数组，Java 容器或 I/O channel 等。
- 为函数式编程而生。对 stream 的任何修改都不会修改背后的数据源，比如对 stream 执行过滤操作并不会删除被过滤的元素，而是会产生一个不包含被过滤元素的新 stream。
- 惰式执行。stream 上的操作并不会立即执行，只有等到用户真正需要结果的时候才会执行。
- 可消费性。stream 只能被“消费”一次，一旦遍历过就会失效，就像容器的迭代器那样，想要再次遍历必须重新生成。

## 对 stream 的操作分为为两类，中间操作(intermediate operations)和结束操作(terminal operations)，二者特点是：

- 中间操作总是会惰式执行，调用中间操作只会生成一个标记了该操作的新 stream，仅此而已。
- 结束操作会触发实际计算，计算发生时会把所有中间操作积攒的操作以 pipeline 的方式执行，这样可以减少迭代次数。计算完成之后 stream 就会失效。

如果你熟悉 Apache Spark RDD，对 stream 的这个特点应该不陌生。

下表汇总了 Stream 接口的部分常见方法：

| 操作类型 | 接口方法                                                                                                                                |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| 中间操作 | concat() distinct() filter() flatMap() limit() map() peek()<br> skip() sorted() parallel() sequential() unordered()                     |
| 结束操作 | allMatch() anyMatch() collect() count() findAny() findFirst()<br> forEach() forEachOrdered() max() min() noneMatch() reduce() toArray() |

## Stream api

```
**Stream api 是java8 中提供的对集合处理的api ， 对数据进行一系列的中间操作，元数据不会发生改变
                集合讲的是数据， 流 讲的是计算（用于操作数据源，集合，数组）所生成的元素序列。**

         Stream API位于 java.util.stream.* 包下。
```

    1. Stream 自己不会存储元素
    2. Stream 不会改变源对象。相反，他们会返回一个持有结果的Stream 。
    3. Stream 操作是延迟执行的。这以为这他们会等到需要结果的时候才执行（延迟加载）。

## 一 创建里 Stream 流的若干种方式

### 通过 Collection 得 Stream（）方法（串行流）或者 parallelStream（）方法（并行流）创建 Stream

#### List

```java
List<String> list = Arrays.asList("A", "B", "C");
Stream<String> stream4 = list.stream();
System.out.println("stream4:" + stream4.collect(joining()));
```

程序输出：

    stream4:ABC

#### Set

```java
Set<String> set = new HashSet<>(Arrays.asList("A", "B", "C"));
Stream<String> stream5 = set.stream();
System.out.println("stream5:" + stream5.collect(joining()));
```

程序输出：

    stream5:ABC

#### Map

```java
Map<String, String> map = new HashMap<>();
map.put("1", "A");
map.put("2", "B");
map.put("3", "C");
Stream<String> stream6 = map.values().stream();
System.out.println("stream6:" + stream6.collect(Collectors.joining()));

map.entrySet().stream();
map.keySet().stream();
```

程序输出：

    stream6:ABC

### 通过 Stream 类中得 of（）静态方法获取流

#### Stream.of 可变参数

```java
Stream<String> stream1 = Stream.of("A", "B", "C");
System.out.println("stream1:" + stream1.collect(Collectors.joining()));
```

程序输出：

    stream1:ABC

#### Stream.of 数组

```java
String[] values = new String[]{"A", "B", "C"};
Stream<String> stream2 = Stream.of(values);
System.out.println("stream2:" + stream2.collect(Collectors.joining()));
```

程序输出：

    stream2:ABC

看 Stream.of 源码，上面这两种方式其实就是下面那种的包装版。

```java
public static<T> Stream<T> of(T... values) {
    return Arrays.stream(values);
}
```

我们直接使用源码中的方式也是一样的。

### 通过 Arrays 中得静态方法 stream（）

```java
String[] values = new String[]{"A", "B", "C"};
Stream<String> stream3 = Arrays.stream(values);
System.out.println("stream3:" + stream3.collect(Collectors.joining()));
```

程序输出：

    stream3:ABC

### 创建无限流(迭代、生成)

```java
     //迭代（需要传入一个种子，也就是起始值，然后传入一个一元操作）
     Stream<Integer> stream1 = Stream.iterate(2, (x) -> x * 2);

     //生成(无限产生对象)
     Stream<Double> stream2 = Stream.generate(() -> Math.random());

```

也可以使用 limit 指定生成元素个数

```java
Stream<String> stream7 = Stream.iterate("A", e -> String.valueOf((char) (e.charAt(0) + 1))).limit(3);
System.out.println("stream7:" + stream7.collect(Collectors.joining()));
```

### 使用 Pattern

```java
String value = "A B C";
Stream<String> stream8 = Pattern.compile("\\W").splitAsStream(value);
System.out.println("stream8:" + stream8.collect(Collectors.joining()));
```

程序输出：

    stream8:ABC

### 使用 Files.lines

```java
try {
    Stream<String> stream9 = Files.lines(Paths.get("d:/data.txt"));
    System.out.println("stream9:" + stream9.collect(Collectors.joining()));
} catch (IOException e) {
    e.printStackTrace();
}
```

data.txt 文件内容如下：

```
A
B
C
```

程序输出：

    stream9:ABC

## 操作

## 二 Stream 中间操作

    多个中间操作可以连接起来形成一个流水线，除非流水线终止操作，否则中间操作不会执行任何处理。
    终止操作时一次性全部处理，称为“延迟加载”

### 1 筛选切片

1. 过滤

```java
List<String> list = Arrays.asList("1","2","3","4","0","222","33");
Stream<String> stream = list.stream().filter((x) -> {
            System.out.println(" api  中间操作。");
            return x.equals("3");
        });
        //终止操作：只有执行终止操作才会执行全部。即：延迟加载
        stream.forEach(System.out::println);
```

结果

```
 api  中间操作。
 api  中间操作。
 api  中间操作。
3
 api  中间操作。
 api  中间操作。
 api  中间操作。
 api  中间操作。
```

2. limit() 截断流，使其元素不超过给定数量。

```java
List<String> list = Arrays.asList("1","2","3","4","0","222","33","3","3");
 Stream<String> stream = list.stream().filter((x) -> {
            System.out.println(" api  中间操作。");
            return x.equals("3");
        });
        //取两个 ， 可以配合其他得中间操作，并截断流，取到相应的元素个数，这不会往下执行，可以提高效率
        stream.limit(2).forEach(System.out::println);
```

3. skip(n) 跳过元素

skip（n），返回一个扔掉了前 n 个元素的流。若流中元素不足 n 个，则返回一个空，与 limit（n）互补。

```java
List<String> list = Arrays.asList("1","2","3","4","0","222","33","3","3");
        Stream<String> stream = list.stream().filter((x) -> {
            System.out.println(" api  中间操作。");
            return x.equals("3");
        });
        //skip（n），返回一个扔掉了前n个元素的流。若流中元素不足n个，则返回一个空，与limit（n）互补。
        stream.skip(3).limit(1).forEach(System.out::println);
```

4. 筛选

distinct 通过流所生成元素的 hashCode（）和 equals（）去除重复元素

```java
List<String> list = Arrays.asList("1","2","3","4","0","222","33","3","3");
 Stream<String> stream = list.stream();
        stream.distinct().forEach(System.out::println);
```

```
1
2
3
4
0
222
33
```

5. 映射

map - 接受 lambda 将元素转换为其他形式或提取信息。
接受一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新元素

flatMap 接受一个函数作为参数，将流中的每个值都转成另一个流，然后把所有流连成一个流

```java
List<Stu> stuList = Arrays.asList(new Stu("a",1),new Stu("ab",3),new Stu("c",11),new Stu("f",12));

   Stream<Stu> stream = stuList.stream();
        //取出list中所有的年龄
        stream.map(Stu::getAge).forEach(System.out::println);
        //把所有年龄再返回一个集合
        List<Integer> collect = stream.map(Stu::getAge).collect(Collectors.toList());

        stream.flatMap(stu -> test1.filterCharacter(stu.getName())).forEach(System.out::println);
```

6. 排序

sorted 有两种方法，一种是不传任何参数，叫自然排序，还有一种需要传 Comparator 接口参数，叫做定制排序

```java
        //自然排序
        List<String> collect = list.stream().sorted().collect(Collectors.toList());

        //定制排序
        List<String> collect2 = list.stream().sorted((o1, o2) -> {
            if(o1.length()>o2.length()){
                return 1;
            }else
            if(o1.length()<o2.length()){
                return -1;
            }else {
                return 0;
            }
        }).collect(Collectors.toList());
```

## 三 Stream 终止操作

实体类

```java
public class Person {
    String name ;
    String sex ;
    int age;
    Status statusEnum;

    public Person(String name, String sex, int age, Status statusEnum) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.statusEnum = statusEnum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Status getStatusEnum() {
        return statusEnum;
    }

    public void setStatusEnum(Status statusEnum) {
        this.statusEnum = statusEnum;

}

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", age=" + age +
                ", statusEnum=" + statusEnum +
                '}';
    }
}
```

操作

```java
 List<Person> persons = Arrays.asList(
                          new Person("张三", "男", 76, Status.FREE),
              new Person("李四", "女", 12, Status.BUSY),
               new Person("王五", "男", 35, Status.BUSY),
               new Person("赵六", "男", 3, Status.FREE),
               new Person("钱七", "男", 56, Status.BUSY),
               new Person("翠花", "女", 34, Status.VOCATION),
               new Person("翠花", "女", 34, Status.FREE),
               new Person("翠花", "女", 34, Status.VOCATION)
              );
```

### 1 查找与匹配

1. allMatch —— 检查是否匹配所有元素。

```java
    public void test1(){
        boolean allMatch = persons.stream().allMatch((x) -> {
            return x.getStatusEnum().equals(Status.FREE);
        });

        System.out.println(allMatch);
    }
```

2. anyMatch —— 检查是否至少匹配一个元素。

```java
    public void test2(){
        boolean allMatch = persons.stream().anyMatch((x) -> {
            return x.getStatusEnum().equals(Status.FREE);
        });

        System.out.println(allMatch);
    }
```

3. noneMatch —— 检查是否没有匹配所有元素。

检查 所有的是否都是 FREE ----- 结果是 false

```java
    public void test3(){
        boolean allMatch = persons.stream().noneMatch((x) -> {
            return x.getStatusEnum().equals(Status.FREE);
        });

        System.out.println(allMatch);
    }
```

4. findFirst —— 返回第一个元素。

```java
 public void test4(){
      Optional<Person> first = persons.stream().findFirst();

      System.out.println(first.get());
  }
```

5. findAny —— 返回当前流中任意元素。

```java
public void test5(){
     Optional<Person> first = persons.stream().findAny();
     //first.orElse(new Person());  如果没空 可以穿一个新的对象去代替它
     System.out.println(first.get());
 }
```

6. count —— 返回流中元素总个数。

```java
  public void test6(){
      long first = persons.stream().count();
      System.out.println(first);
  }
```

7. max —— 返回流中最大值。

```java
public void test7(){
     Optional<Person> person = persons.stream().max((x,y) ->  Integer.compare(x.age, y.age));
     System.out.println(person.get());
 }
```

8. min —— 返回流中最小值。

```java
public void test8(){
      Optional<Person> person = persons.stream().min((x,y) ->  Integer.compare(x.age, y.age));
      System.out.println(person.get());
  }
```

### 2 归约 : 可以将流中元素反复结合在一起，得到一个值

1. reduce（T identitty，BinaryOperator）首先，需要传一个起始值，然后，传入的是一个二元运算。

```java
  public void test9(){
       List<Integer> list = Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
               // identitty 起始值 0  然后与集合中的值进行 相应的运算，再次赋值给 identity 然后 在进行运算。
                Integer sum = list.stream().reduce(0, (x, y) -> x + y);
       System.out.println(sum);
   }
```

2. reduce（BinaryOperator）此方法相对于上面方法来说，没有起始值，则有可能结果为空，所以返回的值会被封装到 Optional 中。

map 和 reduce 的连接通常称为 map-reduce 模式，因 Google 用它来进行网络搜索而出名。
用 map 来提取 对象中某个属性，然后再用 reduce 进行归约。

```java
    public void test10() {
        Optional<Integer> reduce = persons.stream().map(Person::getAge).reduce(Integer::sum);
        System.out.println(reduce.get());
    }
```

3. 收集 collect（将流转换为其他形式。接收一个 Collector 接口得实现，用于给其他 Stream 中元素做汇总的方法）

Collector 接口中方法得实现决定了如何对流执行收集操作（如收集到 List，Set，Map）。
但是 Collectors 实用类提供了很多静态方法，可以方便地创建常见得收集器实例。

- 1 Collectors.toList（） 将流转换成 List

```java
 public void test11() {
     List<Person> collect = persons.stream().collect(Collectors.toList());
     collect.forEach(System.out::println);
 }
```

- 2 将流转换成 HashSet

```java
     public void test12() {
      //hashset会去重复
          Set<String> collect = persons.stream().map(Person::getName).collect(Collectors.toSet());
          collect.forEach(System.out::println);
      }
```

- 3 将流转换成其他集合

```java
public void test13() {

      Set<Integer> collect = persons.stream().map(Person::getAge).collect(Collectors.toCollection(LinkedHashSet::new));
      collect.forEach(System.out::println);
  }

```

- 4 将流转换成 Map

```java

// TopicCurrentOffsetRepository.java
public interface TopicCurrentOffsetRepository extends MongoRepository<TopicCurrentOffset, TopicPartition>{}

// ConsmerScheduleTask.java
public class ConsmerScheduleTask {

  private final TopicCurrentOffsetRepository topicCurrentOffsetRepository;
  private final Map<TopicPartition, Long> beginningOffsets = new ConcurrentHashMap<>();


  public ConsmerScheduleTask(TopicCurrentOffsetRepository topicCurrentOffsetRepository) {
    this.topicCurrentOffsetRepository = topicCurrentOffsetRepository;
  }

  public void test(){

    // list -> map
    topicCurrentOffsetRepository.findAll().stream().collect(
            Collectors.toMap(TopicCurrentOffset::getTopicPartition,
                TopicCurrentOffset::getOffset));

    // map(entry) -> map
    beginningOffsets.entrySet().stream().filter(e -> e.getValue() < endOffsets.get(e.getKey()))
            .collect(Collectors.toMap(Map.Entry::getKey,
                e -> currentOffsets.get(e.getKey()) != null ? currentOffsets.get(e.getKey()) + 1000 : e.getValue()))

    // map(key) -> map
    Document flatMap = new org.bson.Document();
    flatMap.keySet().stream().collect(Collectors.toMap(e -> e, e -> ""));
  }
 }
```

4. Collectors.counting() 元素个数

```java
 public void test14() {

      Long collect = persons.stream().map(Person::getAge).collect(Collectors.counting());
      System.out.println(collect);
  }
```

5. 将流转换为其他形式 ， 接受一个 conllectors 接口的实现，用于给 Stream 中元素做汇总的方法

```java
public void test14s() {
        // 1 对元素进行汇总方法
        DoubleSummaryStatistics collect = persons.stream().collect(Collectors.summarizingDouble(Person::getAge));
        IntSummaryStatistics collect2 = persons.stream().collect(Collectors.summarizingInt(Person::getAge));
        System.out.println(collect.getMax());
        System.out.println(collect.getAverage());
        System.out.println(collect.getCount());
        System.out.println(collect.getMin());
        System.out.println(collect.getSum());
```

```java
       String collect1 = persons.stream().map(Person::getName).collect(Collectors.joining("，","头","尾"));
        String collect3 = persons.stream().map(Person::getName).collect(Collectors.joining());
        System.out.println(collect1); //头张三，李四，王五，赵六，钱七，翠花，翠花，翠花尾
        System.out.println(collect3); // 张三李四王五赵六钱七翠花翠花翠花

```

```
    1. Collectors.averagingDouble()
    2. Collectors.averagingDouble()
    3. Collectors.averagingLong()

    平均数，这三个方法都可以求平均数，不同之处在于传入得参数类型不同，返回值都为Double
```

```java
    public void test15() {

        Double s = persons.stream().collect(Collectors.averagingDouble(Person::getAge));
        System.out.println(s);
    }
```

8. Collectors.maxBy（） 求最大值

```java
      public void test16() {

          Optional<Person> collect = persons.stream().collect(Collectors.maxBy((o1, o2) -> Integer.compare(o1.age, o2.age)));
          System.out.println(collect.get().age);
      }
```

9. Collectors.minBy（） 求最小值

```java
 public void test17() {

     Optional<Person> collect = persons.stream().collect(Collectors.minBy((o1, o2) -> Integer.compare(o1.age, o2.age)));
     System.out.println(collect.get().age);
 }
```

10. Collectors.groupingBy（）分组 ，返回一个 map

```java
  // 按照 Status 分组
  public void test18() {

      Map<Status, List<Person>> collect = persons.stream().collect(Collectors.groupingBy(Person::getStatusEnum));
      collect.forEach((status, people) -> {
          System.out.println(" status === " + status);
          people.forEach(System.out::println);
      });
  }
```

11. 多级分组

```java
 public void test19() {

     Map<Status, Map<String, List<Person>>> collect = persons.stream().collect(Collectors.groupingBy(Person::getStatusEnum,Collectors.groupingBy(Person::getSex)));
     Map<Status, Map<String, List<Person>>> collect2 = persons.stream().collect(Collectors.groupingBy(Person::getStatusEnum,Collectors.groupingBy(
             e->{
                 if (e.getAge()>10){
                     return "小孩";
                 }else {
                     return "大人";
                 }
             }
     )));
     System.out.println(collect);
     System.out.println(collect2);
 }
```

12. 分区

Collectors.partitioningBy（） 分区，参数中传一个函数，返回 true，和 false 分成两个区

```java
public void test20() {
      // 年龄大于39的分区  不满足再的分区
      Map<Boolean, List<Person>> collect = persons.stream().collect(Collectors.groupingBy(e -> e.getAge() > 30));

      System.out.println(collect);
  }
```
