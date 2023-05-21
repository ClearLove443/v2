---
title: "妙用Java 8中的 Function接口 消灭if...else..."
date: 2022-03-06 10:58:17
tag: [java8, function]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

## 函数式接口

### 匿名函数和闭包 的体现

- java 中无法把一个函数作为参数进行传递，返回结果也无法是一个函数

- 参数和返回只能是基本变量和实例化的对象

### 函数式接口：

1. 如果一个接口只有一个抽象方法，则是函数式接口。
2. 如果某个接口上声明了 FunctionalInterface 注解，则是函数式接口。
3. 如果接口只有一个抽象方法，但是没有声明 FunctionalInterface,依旧是。
4. 函数式接口必须要有一个抽象方法， 如果接种中定义的抽象方法和 Object 类中的方法名相同，则不能认为是一个 函数式接口，因为对象或多或少都会继承 Object。接口的抽象方法不会加 1。
5. lambda 表达式必须是方法引用或构造函数引用。
6. 高阶函数：如果一个函数接收一个函数作为参数，或者返回一个函数作为返回值，那么该函数就叫做高阶函数
7. 接口中也可以定义方法，方法用 default 修饰。默认方法，保证和老版本代码兼容。实现类默认拥有 接口中的默认方法。
8. java 中 lambda 是一个对象，其它语言中是函数,称为函数式接口.
9. 函数式接口必须有一个上下文。 MyInterface my = () -> System.out.println("123"); 必须这样（）->{} 才能存在，MyInterface 就是上下文，用来提供类型推断

```java
//函数时接口
interface 接口名{ void test(); }

//非函数式接口
interface 接口名{ void test(); void toString(); }

//函数式接口
interface 接口名
{
  void test();

  //因为这里重写来Object类中的方法
  String toString();
}
```

在开发过程中经常会使用 if...else...
进行判断抛出异常、分支处理等操作。这些 if...else...
充斥在代码中严重影响了代码代码的美观，这时我们可以利用 Java 8 的 Function 接口来消灭 if...else...。

```java
if (...){
    throw new RuntimeException("出现异常了")；
}

if (...){
    doSomething();
} else {
    doOther();
}
```

## Function 函数式接口

使用注解@FunctionalInterface 标识，并且只包含一个抽象方法的接口是函数式接口。函数式接口主要分为 Supplier 供给型函数、Consumer 消费型函数、Runnable 无参无返回型函数和 Function 有参有返回型函数。FunctionalInterface 没有实际作用，只是起标识作用。

    Function可以看作转换型函数

### FunctionalInterface 接口

```java
/**
 信息性注释类型，用于指示接口类型声明旨在成为Java语言规范定义的功能接口。
 从概念上讲，功能接口仅具有一种抽象方法。由于默认方法具有实现，因此它们不是抽象的。如果接口声明的抽象方法覆盖了java.lang.Object的公共方法之一，则该方法也不会计入接口的抽象方法计数，因为该接口的任何实现都将具有java.lang.Object或其他地方的实现。
 （这里表达的意思是如果接口中的方法定义和object中的方法一致，则不能算是函数式方法）

  请注意，可以使用lambda表达式，方法引用或构造函数引用来创建功能接口的实例。
  如果使用此注释类型对类型进行注释，则编译器需要生成错误消息，除非：
    1该类型是接口类型，而不是注释类型，枚举或类。
    2带注释的类型满足功能接口的要求。

但是，编译器会将满足功能接口定义的任何接口视为功能接口，而不管接口声明中是否存在FunctionalInterface批注。
 *
 * @jls 4.3.2. The Class Object
 * @jls 9.8 Functional Interfaces
 * @jls 9.4.3 Interface Method Body
 * @since 1.8
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface FunctionalInterface {}
```

### Supplier 供给型函数

Supplier 的表现形式为不接受参数、只返回数据

```java
/**
 * 代表结果的提供者。
 * 不需要每次调用supplier都返回新的或不同的结果。
 * @param <T> 该supplier提供的结果类型
 * @since 1.8
 */
@FunctionalInterface
public interface Supplier<T> {

    /**
     * Gets a result.
     *
     * @return a result
     */
    T get();
}
```

### Consumer 消费型函数

Consumer 消费型函数和 Supplier 刚好相反。Consumer 接收一个参数，没有返回值

```java
/**
 * 表示一个接受单个输入参数且不返回结果的操作。与大多数其他功能接口不同，消费者有望通过副作用进行操作。
 (副作用，是指传入参数T 可能会被修改)
 *
 * 这是一个功能接口，其功能方法为accept（Object）。

 这是一个功能接口，因此可以用作lambda表达式或方法引用的分配目标
 *
 * @param <T> 操作输入的类型
 *
 * @since 1.8
 */
@FunctionalInterface
public interface Consumer<T> {

    /**
     * 对给定的参数执行此操作。
     *
     * @param t 输入的参数
     */
    void accept(T t);

    /**
     返回一个组成的使用者，该使用者依次执行此操作，然后执行after操作。如果执行任何一个操作均引发异常，则将其中继到组合操作的调用方。如果执行此操作引发异常，则将不执行after操作。
     *
     * @param 该操作后要执行的操作
     * @return 一个组合Consumer，该使用者依次执行此操作，然后执行after操作
     * @throws NullPointerException if {@code after} is null
     */
    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

### Runnable 无参无返回型函数

Runnable 的表现形式为即没有参数也没有返回值

```java
/**
 * Runnable接口应该由其实例旨在由线程执行的任何类实现。 该类必须定义一个名为run的无参数方法。
 * 此接口旨在为希望在活动时执行代码的对象提供通用协议。 例如， Runnable是由类Thread实现的。 处于活动状态仅意味着线程已启动且尚未停止。
 * 此外， Runnable提供了使类处于活动状态而不是子类化Thread 。 通过实例化Thread实例并将自身作为目标传入，实现Runnable的类可以在不继承Thread的情况下运行。 在大多数情况下，如果您只打算覆盖run()方法而不打算覆盖其他Thread方法，则应该使用Runnable接口。 这很重要，因为除非程序员打算修改或增强类的基本行为，否则类不应被子类化。
 * 自从：
 * JDK1.0
 * 也可以看看：
 * Thread ， java.util.concurrent.Callable
 * 作者：
 * 阿瑟·范霍夫
 * @author  Arthur van Hoff
 * @see     Thread
 * @see     java.util.concurrent.Callable
 * @since   JDK1.0
 */
@FunctionalInterface
public interface Runnable {
    /**
     * 当使用实现接口Runnable的对象创建线程时，启动线程会导致在单独执行的线程中调用对象的run方法。
     * 方法run的一般约定是它可以采取任何行动。
     * 也可以看看：
     * Thread.run()
     * @see     Thread#run()
     */
    public abstract void run();
}
```

### Function 函数

表现形式为接收一个参数，并返回一个值。Supplier、Consumer 和 Runnable 可以看作 Function 的一种特殊表现形式。

```java

/**
 * 接收一个参数返回一个结果

 * @param <T> 输入参数类型
 * @param <R> 返回结果类型
 *
 * @since 1.8
 */
@FunctionalInterface
public interface Function<T, R> {

    /**
     * 应用此function到给定的参数
     * @param t 输入参数
     * @return 返回结果
     */
    R apply(T t);

    /**
     * 返回一个组合函数，该函数首先将before函数应用于其输入，然后将该函数应用于结果。如果对任一函数的求值抛      出异常，则将其中继到组合函数的调用方。
     * @param <V> the type of input to the {@code before} function, and to the
     *           composed function
     * @param before 应用此功能之前要应用的功能
     * @return 一个组合函数，首先应用before函数，然后再应用此函数
     * @throws NullPointerException if before is null
     *
     * @see #andThen(Function)
     */
    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
      //先执行before动作获得一个结果，让你后将获得的结果应用于compose function
        return (V v) -> apply(before.apply(v));
    }

    /**
     返回一个组合函数，该函数首先将此函数应用于其输入，然后将after函数应用于结果。如果对任一函数的求值抛出异常，则将其中继到组合函数的调用方。
     * @param <V> the type of output of the {@code after} function, and of the
     *           composed function
     * @param after 应用此功能后要应用的功能
     * @return 一个组合函数，首先应用此函数，然后应用after函数
     * @throws NullPointerException if after is null
     * @see #compose(Function)
     */
    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
      //首先应用andThen function,得到一个结果，然后将此结果应用于after
        return (T t) -> after.apply(apply(t));
    }

    /**
     * 返回始终返回其输入参数的函数。
     *
     * @param <T> 函数的输入和输出对象的类型
     * @return 始终返回其输入参数的函数
     */
    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

### BiFunction 函数

表示一个接受两个参数并产生结果的函数。

```java
/*

 表示一个接受两个参数并产生结果的函数。这是Function的两个领域。这是一个功能接口，其功能方法为apply（Object，Object）。
  这是一个功能接口，因此可以用作lambda表达式或方法引用的分配目标。

 * @param <T> 第一个参数
 * @param <U> 第二个参数
 * @param <R> 返回结果类型
 *
 * @see Function
 * @since 1.8
 */
@FunctionalInterface
public interface BiFunction<T, U, R> {

    /**
     * 将此函数应用于给定参数。
     *
     * @param t 第一个参数
     * @param u 第二个参数
     * @return 结果
     */
    R apply(T t, U u);

    /**
    返回一个组合函数，该函数首先将此函数应用于其输入，然后将after函数应用于结果。如果对任一函数的求值抛出异常，则将其中继到组合函数的调用方。
     * @param <V> after函数和组合函数的输出类型
     * @param after 应用此功能后要应用的功能
     * @return 一个组合函数，首先应用此函数，然后应用after函数
     * applies the {@code after} function
     * @throws NullPointerException if after is null
     */
    default <V> BiFunction<T, U, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t, U u) -> after.apply(apply(t, u));
    }
}
```

### BinaryOperator 函数

```java
/**
 表示对两个相同类型的操作数的运算，产生与该操作数相同类型的结果。对于操作数和结果均为相同类型的情况，这是BiFunction的特殊化。
 * 这是一个函数式接口，函数式方法是 {@link #apply(Object, Object)}.
 *
 * @param <T> 操作数的类型和运算符的结果
 *
 * @see BiFunction
 * @see UnaryOperator
 * @since 1.8
 */
@FunctionalInterface
public interface BinaryOperator<T> extends BiFunction<T,T,T> {
    /**
     *返回一个BinaryOperator，它根据指定的Comparator返回两个元素中的较小者
     * @param <T> 比较器的输入参数的类型
     * @param 比较器，用于比较两个值
     * @return 一个BinaryOperator，根据提供的Comparator返回较小的操作数
     * @throws NullPointerException if the argument is null
     */
    public static <T> BinaryOperator<T> minBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) <= 0 ? a : b;
    }

    /**
     返回BinaryOperator，该BinaryOperator根据指定的Comparator返回两个元素中的较大者。
     * @param <T> 比较器的输入参数的类型
     * @param 比较器，用于比较两个值
     * @return 一个BinaryOperator，根据提供的Comparator返回较大的操作数
     * @throws NullPointerException if the argument is null
     */
    public static <T> BinaryOperator<T> maxBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) >= 0 ? a : b;
    }
}
```

### Predicate 函数

```java


/**
 * 表示一个参数的谓词（布尔值函数）。这是一个功能接口，其功能方法为test（Object）。
 *
 * @param <T> the type of the input to the predicate
 *
 * @since 1.8
 */
@FunctionalInterface
public interface Predicate<T> {

    /**
     * 根据给定参数评估此谓词。 true或false
     *
     * @param t the input argument
     * @return {@code true} if the input argument matches the predicate,
     * otherwise {@code false}
     */
    boolean test(T t);

     /**
     * 返回表示该谓词与另一个谓词的短路逻辑与的组合谓词。在评估组合谓词时，如果该谓词为假，则不会评估另一个谓词。
    在评估任一谓词过程中引发的任何异常都会中继给调用者；如果对此谓词的求值抛出异常，则不会对另一个谓词求值。
     *
     * @param other a predicate that will be logically-ANDed with this
     *              predicate
     * @return a composed predicate that represents the short-circuiting logical
     * AND of this predicate and the {@code other} predicate
     * @throws NullPointerException if other is null
     */
    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    /**
     * 返回表示此谓词逻辑否定的谓词。
     * @return a predicate that represents the logical negation of this
     * predicate
     */
    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    /**
     *返回一个组成的谓词，该谓词表示此谓词和另一个谓词的短路逻辑或。在评估组合谓词时，如果该谓词为true，则不会评估另一个谓词。
     *
   在评估任一谓词过程中引发的任何异常都会中继给调用者；如果对此谓词的求值抛出异常，则不会对另一个谓词求值。
     * @param other a predicate that will be logically-ORed with this
     *              predicate
     * @return a composed predicate that represents the short-circuiting logical
     * OR of this predicate and the {@code other} predicate
     * @throws NullPointerException if other is null
     */
    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    /**
     *返回一个谓词，该谓词根据Objects.equals（Object，Object）测试两个参数是否相等。
     *
     * @param <T> the type of arguments to the predicate
     * @param targetRef the object reference with which to compare for equality,
     *               which may be {@code null}
     * @return a predicate that tests if two arguments are equal according
     * to {@link Objects#equals(Object, Object)}
     */
    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

## 使用小技巧

### 处理抛出异常的 if

1. 定义函数

定义一个抛出异常的形式的函数式接口, 这个接口只有参数没有返回值是个消费型接口

```java
/**
 * 抛异常接口
 **/
@FunctionalInterface
public interface ThrowExceptionFunction {

    /**
     * 抛出异常信息
     *
     * @param message 异常信息
     * @return void
     **/
    void throwMessage(String message);
}
```

创建工具类 VUtils 并创建一个 isTure 方法，方法的返回值为刚才定义的函数式接口-ThrowExceptionFunction。ThrowExceptionFunction 的接口实现逻辑为当参数 b 为 true 时抛出异常.

2. 编写判断方法

```java
/**
 *  如果参数为true抛出异常
 *
 * @param b
 * @return com.example.demo.func.ThrowExceptionFunction
 **/
public static ThrowExceptionFunction isTure(boolean b){

    return (errorMessage) -> {
        if (b){
            throw new RuntimeException(errorMessage);
        }
    };
}
```

3. 使用方式

调用工具类参数参数后，调用函数式接口的 throwMessage 方法传入异常信息。当出入的参数为 false 时正常执行。

### 处理 if 分支操作

1. 定义函数式接口

创建一个名为 BranchHandle 的函数式接口，接口的参数为两个 Runnable 接口。这两个两个 Runnable 接口分别代表了为 true 或 false 时要进行的操作

```java
/**
 * 分支处理接口
 **/
@FunctionalInterface
public interface BranchHandle {

    /**
     * 分支操作
     *
     * @param trueHandle 为true时要进行的操作
     * @param falseHandle 为false时要进行的操作
     * @return void
     **/
    void trueOrFalseHandle(Runnable trueHandle, Runnable falseHandle);

}
```

2. 编写判断方法

创建一个名为 isTureOrFalse 的方法，方法的返回值为刚才定义的函数式接口-BranchHandle

```java
/**
 * 参数为true或false时，分别进行不同的操作
 *
 * @param b
 * @return com.example.demo.func.BranchHandle
 **/
public static BranchHandle isTureOrFalse(boolean b){

    return (trueHandle, falseHandle) -> {
        if (b){
            trueHandle.run();
        } else {
            falseHandle.run();
        }
    };
}
```

3. 使用方式

参数为 true 时，执行 trueHandle

参数为 false 时，执行 falseHandle

### 如果存在值执行消费操作，否则执行基于空的操作

1. 定义函数

创建一个名为 PresentOrElseHandler 的函数式接口，接口的参数一个为 Consumer 接口。一个为 Runnable,分别代表值不为空时执行消费操作和值为空时执行的其他操作

```java
/**
 * 空值与非空值分支处理
 */
public interface PresentOrElseHandler<T extends Object> {

    /**
     * 值不为空时执行消费操作
     * 值为空时执行其他的操作
     *
     * @param action 值不为空时，执行的消费操作
     * @param emptyAction 值为空时，执行的操作
     * @return void
     **/
   void presentOrElseHandle(Consumer<? super T> action, Runnable emptyAction);

}
```

2. 编写判断方法

创建一个名为 isBlankOrNoBlank 的方法，方法的返回值为刚才定义的函数式接口-PresentOrElseHandler

```java
/**
 * 参数为true或false时，分别进行不同的操作
 *
 * @param b
 * @return com.example.demo.func.BranchHandle
 **/
public static PresentOrElseHandler<?> isBlankOrNoBlank(String str){

    return (consumer, runnable) -> {
        if (str == null || str.length() == 0){
            runnable.run();
        } else {
            consumer.accept(str);
        }
    };
}
```

3. 使用方式
   调用工具类参数参数后，调用函数式接口的 presentOrElseHandle 方法传入一个 Consumer 和 Runnable 参数不为空时，打印参数

```java
 @Test
    public void testVutils(){
        VUtils.isTrue(false).throwMessage("你是真的就报错了");

        VUtils.isTureOrFalse(true).trueOrFalseHandle(()->{
            System.out.println("为true，我是真的");
        },()->{
            System.out.println("false，我是假的");
        });

        // 为空不为空


        VUtils.isBlankOrNoBlank("123").presentOrElseHandle(new Consumer<Object>() {
            @Override
            public void accept(Object o) {
                System.out.println("不为空"+ o.toString());
            }
        }, () -> {
            System.out.println("为空字符串");
        });

        VUtils.isBlankOrNoBlank("123").presentOrElseHandle((cunsumerParam)->{
            System.out.println("不为空"+cunsumerParam);
        }, () -> {
            System.out.println("为空字符串");
        });

        VUtils.isBlankOrNoBlank("123").presentOrElseHandle(System.out::println, () -> {
            System.out.println("为空字符串");
        });
    }

```

## 结尾

Function 函数式接口是 java 8 非常重要的特性，利用好 Function 函数可以极大的简化代码
