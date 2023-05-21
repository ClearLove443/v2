---
title: "Memory Address of Objects in Java"
date: "2021-12-24 20:46:55"
tag: [java]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

[java-stack-heap](https://www.baeldung.com/java-stack-heap)
[java-stack-heap](https://www.guru99.com/java-stack-heap.html)
[Java Heap Space vs Stack – Memory Allocation in Java](https://www.journaldev.com/4098/java-heap-space-vs-stack-memory)
[Reference Variable in Java](https://www.geeksforgeeks.org/reference-variable-in-java/)

## 1. Overview

In this quick tutorial, we're going to see how to find the memory address of objects in Java.

Before going any further, it's worth mentioning that the memory layout of runtime data areas is not part of the JVM specification and is left to the discretion of the implementor. Therefore, each JVM implementation may have a different strategy to layout objects and arrays in memory. This will, in turn, affect the memory addresses.

In this tutorial, we're focusing on one specific JVM implementation: the HotSpot JVM. We also may use the JVM and HotSpot JVM terms interchangeably throughout the tutorial.

## 2. Dependency

To find the memory address of objects in the JVM, we're going to use the Java Object Layout (JOL) tool. Therefore, we need to add the jol-core dependency:

```xml
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.10</version>
</dependency>
```

## 3. Memory Address

To find the memory address of a particular object in the JVM, we can use the addressOf() method:

```java
String answer = "42";

System.out.println("The memory address is " + VM.current().addressOf(answer));
```

This will print:
The memory address is 31864981224
There are different compressed reference modes in the HotSpot JVM. Because of these modes, this value may not be completely accurate. Therefore, we shouldn't go and perform some native memory manipulations based on this address, as it may cause weird memory corruptions.

Also, memory addresses in most JVM implementations are subject to change as the GC moves the objects around from time to time.

## 4. Identity Hash Code

There's a common misconception that the memory addresses of objects in the JVM are represented as part of their default toString implementations, such as java.lang.Object@60addb54. That is, many think that the “60addb54” is the memory address of that particular object.

Let's check this assumption:

```java
Object obj = new Object();

System.out.println("Memory address: " + VM.current().addressOf(obj));
System.out.println("toString: " + obj);
System.out.println("hashCode: " + obj.hashCode());
System.out.println("hashCode: " + System.identityHashCode(obj));
```

This will print the following:

    Memory address: 31879960584
    toString: java.lang.Object@60addb54
    hashCode: 1622006612
    hashCode: 1622006612

Quite interestingly, the "60addb54" is the hexadecimal version of the hash code, which is 1622006612. The hashCode() method is one of the common methods for all Java objects. When we don't declare a hashCode() method for a class, Java will use the identity hash code for it.

As shown above, the identity hash code (that part after @ in toString) and the memory address are different.
