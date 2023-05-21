---
title: "lombok注解@Data使用在继承类上时出现警告"
date: "2021-10-09 23:11:55"
tag: [lombok]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

ombok 为我们提供了@Data 注解，帮助我们省略了@Setter,@Getter,@ToString 等注解，一般对于普通的实体类使用该注解，不会出现什么问题，但是当我们把这个注解，使用在派生类上，就出现了一个小问题。
@Data 注解的地方会出现警告：

```
Generating equals/hashCode implementation but without a call to superclass, even though this class
does not extend java.lang.Object. If this is intentional, add '@EqualsAndHashCode(callSuper=false)'
to your type.
```

意思是默认子类的 equals 和 hashCode 方法，不会包含或者考虑基类的属性。我们可以通过反编译工具查看项目 target/classes 目录下的 User.class 的 hashCode 方法，默认情况下属性都是使用的他自身的属性。
当我们根据警告提示，加上注解@EqualsAndHashCode(callSuper=true) ，警告消失。
这么一来，好像就解决了在继承情况下使用@Data 注解的警告问题。但是问题是，每一个继承的类，都需要这么来解决，也不是很方便。

另一种办法，就是通过自定义 lombok.config 文件来解决。
lombok.config 文件需要放在 src/main/java 文件夹下的目录中（也可以放在实体同级目录下），放在 src/main/resources 目录下，不会生效。下面，我们通过这种方式来解决这个警告的问题。

1. 新建 lombok.config 文件，然后配置:

```
config.stopBubbling=true
lombok.equalsAndHashCode.callSuper=call
```

2. pom.xml 文件中需要加入如下插件：

```xml
<plugin>
  	<groupId>org.apache.maven.plugins</groupId>
  	<artifactId>maven-compiler-plugin</artifactId>
  	<configuration>
  		<source>1.8</source>
  		<target>1.8</target>
  	</configuration>
</plugin>
```

然后，我们可以检验一下，警告是否就没有了。
