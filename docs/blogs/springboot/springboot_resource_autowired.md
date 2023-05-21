---
title: "java @Resource和@Autowired区别对比"
date: "2021-12-05 12:10:13"
tag: [springboot]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

## @Resource 和@Autowired

- `@Resource`和`@Autowired`都可以用来装配 bean，都可以用于字段或 setter 方法。
- `@Autowired`默认按类型装配，默认情况下必须要求依赖对象必须存在，如果要允许 null 值，可以设置它的 required 属性为 false。
- `@Resource`默认按名称装配，当找不到与名称匹配的 bean 时才按照类型进行装配。名称可以通过 name 属性指定，如果没有指定 name 属性，当注解写在字段上时，默认取字段名，当注解写在 setter 方法上时，默认取属性名进行装配。

  > 注意：如果 name 属性一旦指定，就只会按照名称进行装配。

- `@Autowire`和`@Qualifier`配合使用效果和@Resource 一样：

```java
@Autowired(required = false)
@Qualifier("example")
private Example example;

@Resource(name = "example")
private Example example;
```

- `@Resource`装配顺序

1.  如果同时指定 name 和 type，则从容器中查找唯一匹配的 bean 装配，找不到则抛出异常
2.  如果指定 name 属性，则从容器中查找名称匹配的 bean 装配，找不到则抛出异常
3.  如果指定 type 属性，则从容器中查找类型唯一匹配的 bean 装配，找不到或者找到多个抛出异常
4.  如果都不指定，则自动按照 byName 方式装配，如果没有匹配，则回退一个原始类型进行匹配，如果匹配则自动装配

简要对比表格
|注解对比|@Resource|@Autowire|
|:--:|:--:|:--:|
|注解来源|JDK|Spring|
|装配方式|优先按名称|优先按类型|
|属性|name、type|required|
