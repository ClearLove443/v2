---
title: "IDEA不推荐你使用@Autowired"
date: "2021-12-05 11:45:44"
tag: [springboot]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

但是当我们使用 IDEA 写代码的时候，经常会发现@Autowired 注解下面是有小黄线的，我们把小鼠标悬停在上面，可以看到这个如下图所示的警告信息：
`Field injection is not recommended`
那么为什么 IDEA 会给出 Field injection is not recommended 这样的警告呢？

## Spring 中的三种依赖注入方式

### Constructor Injection

在 Spring4.3.x 中增加了新的特性：如果类只提供了一个带参数的构造方法，则不需要对对其内部的属性写 @Autowired 注解，Spring 会自动为你注入属性。

`Constructor Injection`是构造器注入，是我们日常最为推荐的一种使用方式。

> 官方推荐理由
> 单一职责: 当使用构造函数注入的时候，你会很容易发现参数是否过多，这个时候需要考虑你这个类的职责是否过大，考虑拆分的问题；而当使用@Autowired 注入 field 的时候，不容易发现问题
> 依赖不可变: 只有使用构造函数注入才能注入 final
> 依赖隐藏:使用依赖注入容器意味着类不再对依赖对象负责，获取依赖对象的职责就从类抽离出来，IOC 容器会帮你自动装备。这意味着它应该使用更明确清晰的公用接口方法或者构造器，这种方式就能很清晰的知道类需要什么和到底是使用 setter 还是构造器
> 降低容器耦合度: 依赖注入框架的核心思想之一是托管类不应依赖于所使用的 DI 容器。换句话说，它应该只是一个普通的 POJO，只要您将其传递给所有必需的依赖项，就可以独立地实例化。这样，您可以在单元测试中实例化它，而无需启动 IOC 容器并单独进行测试（使用一个可以进行集成测试的容器）。如果没有容器耦合，则可以将该类用作托管或非托管类，甚至可以切换到新的 DI 框架。
> 使用构造器的使用能避免注入的依赖是空的情况。 因为在 bean 的生命周期里面先执行的是 bean 的构造器，然后才给 bean 里面的属性赋值。

具体形式如下：

```java
@Controller
public class UserController {

    private final UserService userService;

    // @Autowired(可省略)
    public UserController(UserService userService){
        this.userService = userService;
    }

}
```

这种注入方式很直接，通过对象构建的时候建立关系，所以这种方式对对象创建的顺序会有要求，当然 Spring 会为你搞定这样的先后顺序，除非你出现循环依赖，然后就会抛出异常。

### Field Injection

`@Autowired`注解的一大使用场景就是`Field Injection`
具体形式如下：

```java
@Controller
public class UserController {

    @Autowired
    private UserService userService;

}
```

这种注入方式通过 Java 的反射机制实现，所以 private 的成员也可以被注入具体的对象。

### Setter Injection

`Setter Injection`也会用到`@Autowired`注解，但使用方式与`Field Injection`有所不同，`Field Injection`是用在成员变量上，而`Setter Injection`的时候，是用在成员变量的 Setter 函数上。
具体形式如下：

```java
@Controller
public class UserController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService){
        this.userService = userService;
    }
}
```

这种注入方式也很好理解，就是通过调用成员变量的 set 方法来注入想要使用的依赖对象。

### 三种依赖注入的对比

在知道了 Spring 提供的三种依赖注入方式之后，我们继续回到本文开头说到的问题：IDEA 为什么不推荐使用 Field Injection 呢？
我们可以从多个开发测试的考察角度来对比一下它们之间的优劣：

#### 可靠性

从对象构建过程和使用过程，看对象在各阶段的使用是否可靠来评判：

- Field Injection：不可靠
- Constructor Injection：可靠
- Setter Injection：不可靠

由于构造函数有严格的构建顺序和不可变性，一旦构建就可用，且不会被更改。

#### 可维护性

主要从更容易阅读、分析依赖关系的角度来评判：

- Field Injection：差
- Constructor Injection：好
- Setter Injection：差

还是由于依赖关键的明确，从构造函数中可以显现的分析出依赖关系，对于我们如何去读懂关系和维护关系更友好。

#### 可测试性

当在复杂依赖关系的情况下，考察程序是否更容易编写单元测试来评判

- Field Injection：差
- Constructor Injection：好
- Setter Injection：好

`Constructor Injection`和`Setter Injection`的方式更容易 Mock 和注入对象，所以更容易实现单元测试。

#### 灵活性

主要根据开发实现时候的编码灵活性来判断：

- Field Injection：很灵活
- Constructor Injection：不灵活
- Setter Injection：很灵活

由于`Constructor Injection`对 Bean 的依赖关系设计有严格的顺序要求，所以这种注入方式不太灵活。相反`Field Injection`和`Setter Injection`就非常灵活，但也因为灵活带来了局面的混乱，也是一把双刃剑。

#### 循环关系的检测

对于 Bean 之间是否存在循环依赖关系的检测能力：

- Field Injection：不检测
- Constructor Injection：自动检测
- Setter Injection：不检测

#### 性能表现

不同的注入方式，对性能的影响

- Field Injection：启动快
- Constructor Injection：启动慢
- Setter Injection：启动快

主要影响就是启动时间，由于 Constructor Injection 有严格的顺序要求，所以会拉长启动时间。

#### 所以，综合上面各方面的比较，可以获得如下表格：

|       注入方式        | 可靠性 | 可维护性 | 可测试性 | 灵活性 | 循环关系的检测 | 性能影响 |
| :-------------------: | :----: | :------: | :------: | :----: | :------------: | :------: |
|    Field Injection    | 不可靠 |    低    |    差    | 很灵活 |     不检测     |  启动快  |
| Constructor Injection |  可靠  |    高    |    好    | 不灵活 |    自动检测    |  启动慢  |
|   Setter Injection    | 不可靠 |    低    |    好    | 很灵活 |     不检测     |  启动慢  |

结果一目了然，`Constructor Injection`在很多方面都是优于其他两种方式的，所以`Constructor Injection`通常都是首选方案！
而`Setter Injection`比起`Field Injection`来说，大部分都一样，但因为可测试性更好，所以当你要用`@Autowired`的时候，推荐使用`Setter Injection`的方式，这样 IDEA 也不会给出警告了。同时，也侧面也反映了，可测试性的重要地位啊！

## 总结

最后，对于今天的问题讨论，我们给出两个结论，方便大家记忆：

1. 依赖注入的使用上，`Constructor Injection`是首选。
2. 使用`@Autowired`注解的时候，要使用`Setter Injection`方式，这样代码更容易编写单元测试。
