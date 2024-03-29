---
title: "接口和抽象类的区别以及使用场景"
date: "2021-12-05 16:03:06"
tag: [java]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

对于面向对象编程来说，抽象是它的四大特征之一。在 Java 中，可以通过两种形式来体现 OOP 的抽象——接口和抽象类。这两者有太多相似的地方，又有太多不同的地方。很多人在初学的时候会以为它们可以随意互换使用，但是，事实并非如此。 我们现在纵向对比二者的区别。首先，温故知新，回顾二者的定义；然后，知己知彼，聊聊二者的区别，简要介绍应用场景；其次，举例说明应用场景；最后，列举几个常见问题。

## 1、 基本概念

含有 abstract 修饰符的类即为抽象类。抽象类不能创建实例对象，含有抽象方法的类必须定义为 abstract class。在 abstract class 中，方法不必是抽象的，但是抽象方法必须在具体子类中实现，所以，不能有抽象构造方法或抽象静态方法。子类如果没有实现抽象父类中的所有抽象方法，则必须定义为 abstract 类型。

下面要注意一个问题：在《JAVA 编程思想》一书中，将抽象类定义为“包含抽象方法的类”。但是在书中其它地方发现，一个类如果不包含抽象方法，只是用 abstract 修饰，那么也是抽象类，即抽象类不一定必须包含抽象方法。个人觉得这个属于钻牛角尖的问题，因为一个抽象类如果不包含任何抽象方法，为何还要设计为抽象类？所以暂且记住这个概念吧，不必去深究为什么。

接口（interface）可以说成是抽象类的一种特例，其中的所有方法都必须是抽象的。接口中的方法定义默认为 public abstract 类型，成员变量类型默认为 public static final。

抽象类可以继承实体类。但和实体类的继承一样，也要求父类可继承，并且拥有子类可以访问到的构造函数。其实 Object 就是个实体类，Java 的 API 文档里，每个抽象类的条目里都明确写着直接或间接继承自 Object，所以这点是没有疑问的。

## 2、抽象类和接口的区别

只要明白了接口和抽象类的本质和作用，这个问题就很好回答。
||抽象类|接口|
|:--:|:--:|:--:|
|方法默认实现|支持|不支持，接口完全是抽象的|
|实现|子类使用 extends 关键字来继承抽象类。子类如果不是抽象类，需要实现抽象类中声明的所有抽象方法|子类使用关键字 implements 来实现接口，需要实现接口中声明的所有方法|
|是否有构造函数|是|否|
|与正常 Java 类的区别|不能实例化抽象类，因为有 abstract 方法|接口是完全不同的类型|
|访问修饰符|public、protected 和 default|只有 public|
|main 方法|支持|不支持|
|多继承|继承一个类和实现多个接口|只可继承一个或多个其它接口|
|速度|速度快|稍微有点慢，因为它需要时间去寻找在类中实现的方法|
|添加新方法|添加后可以给它提供默认的实现，故不需要改变现在的代码|添加后必须改变实现该接口的类|

从设计层面看，抽象类体现继承关系（is a），它主要描述类的从属关系或者父子关系，抽象类和它的派生类之间是典型的 IS-A 关系，即“子 is a 父”。

interface 可以多实现，而且不要求实现者和 interface 定义在概念本质上是一致的，仅仅是实现了 interface 定义的契约而已。它主要描述的是类型间的行为合同，接口和它的实现类之间是典型的 CAN-DO 关系，即“子 can do 父”。

## 应用场景介绍

什么时候使用抽象类和接口？

- 如果拥有一些方法并且想让它们中的一些有默认实现，那么使用抽象类吧。
- 如果想实现多重继承，那么必须使用接口。由于 Java 不支持多继承，即一个类只能有一个超类。但是，可以实现多个接口，因此可以使用接口来解决它。
- 如果基本功能在不断改变，那么就需要使用抽象类，达到解耦目的。如果不断改变基本功能并且使用接口，那么就需要改变所有实现了该接口的类。

接口更多的是在系统架构设计方面发挥作用，主要用于定义模块之间的通信契约。而抽象类在代码实现方面发挥作用，可以实现代码的重用。例如，模板方法设计模式就是抽象类的一个典型应用，假设某个项目的所有 HTTP 请求都要用相同的方式进行权限判断、访问日志记录和异常处理，那么就可以定义一个抽象的基类，让所有的 controller 都继承这个抽象基类，在抽象基类的 service 方法中实现上述功能，在各个子类中只是完成各自的业务逻辑代码，伪代码如下：

```java
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class BaseServlet extends HttpServlet {
   public final void service(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

 // 记录访问日志
 // 进行权限判断
}

 protected abstract void doService(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException;
 // 注意访问权限定义成protected，显得既专业，又严谨，因为它是专门给子类用的
 }

 class MyServlet1 extends BaseServlet {
 protected void doService(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
 // 本Servlet只处理的具体业务逻辑代码
 }
 }
```

基类方法中间的某段代码不确定，留给子类去实现。

温馨提示：这道题的思路是先从总体解释抽象类和接口的基本概念，然后再比较两者的语法细节，最后再说两者的应用区别。比较两者语法细节区别的条理是：先从一个类中的构造方法、普通成员变量和方法（包括抽象方法），静态变量和方法，继承性等 6 个方面逐一去比较回答，接着从第三者继承的角度的回答，特别是最后用了一个典型的例子来展现自己深厚的技术功底。

## 4、举例说明

下面看一个网上流传最广泛的例子——门和警报——门都有 open( )和 close( )两个动作，通过抽象类和接口来定义这个抽象概念。

```java
abstract class Door {
    public abstract void open();
    public abstract void close();
}
```

或者

```java
interface Door {
    public abstract void open();
    public abstract void close();
}
```

但是现在如果需要门具有报警 alarm( )的功能，那么该如何实现？下面提供两种思路：

- 将这三个功能都放在抽象类里面，但是这样一来所有继承于这个抽象类的子类都具备了报警功能，但是有的门并不一定具备报警功能；
- 将这三个功能都放在接口里面，需要用到报警功能的类就实现接口中的 open( )和 close( )，也许这个类根本就不具备 open( )和 close( )功能，比如火灾报警器。

从这里可以看出， Door 的 open() 、close()和 alarm()根本就属于两个不同范畴内的行为，open()和 close()属于门本身固有的行为特性，而 alarm()属于延伸的附加行为。因此最好的解决办法是单独将报警设计为一个接口，包含 alarm()行为,Door 设计为单独的一个抽象类，包含 open 和 close 两种行为。再设计一个报警门继承 Door 类和实现 Alarm 接口。

```java
interface Alram {
    void alarm();
}

abstract class Door {
    void open();
    void close();
}

class AlarmDoor extends Door implements Alarm {
    void oepn() {
      //....
    }
    void close() {
      //....
    }
    void alarm() {
      //....
    }
}
```

## 5、问与答

Q1：接口是否可继承接口?

答：接口可以继承接口。

Q2：抽象类是否可实现(implements)接口?

答：抽象类可以实现接口。

Q3：抽象类是否可继承实体类(concrete class)?

答：抽象类可以继承实体类。

Q4：抽象类中是否可以有静态的 main 方法？

答：抽象类中可以有静态的 main 方法。

Q5：抽象类与普通类的区别是？

答：二者的区别就是 ① 不能创建实例对象，② 允许有 abstract 方法。也可以这么理解——抽象类就是一个不能实例化的普通类，不过如果方法加了 abstract，那么就必须在子类里面重写。

Q6：抽象类为什么不能实例化对象？

答：现实生活中也有抽象类的例子，比如说人类是一个抽象类，我们无法创建一个称作人类的对象，但是，人可以在继承人类后来创建对象。况且抽象类中的抽象方法只有声明，是未实现的方法，如果实例化了，又如何去实现方法调用呢？

Q7：abstract 和 final 能否共用？

答：抽象类需要被继承才能使用，而被 final 修饰的类无法被继承，所以 abstract 和 final 是不能共存的。
