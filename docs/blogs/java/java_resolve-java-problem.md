---
title: "resolve java.lang.NoClassDefFoundError: javax/xml/bind/JAXBException"
date: "2021-09-25 22:41:22"
tag: [java]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

add the following to pom.xml.

```xml
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.1</version>
</dependency>
```
