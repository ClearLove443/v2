---
title: "Exception in monitor thread while connecting to server localhost:27017 while accessing MongoDB with Java"
date: "2021-10-18 21:34:00"
tag: [springboot, mongodb]
category: big-data
published: true
hideInList: false
feature:
isTop: false
---

have the following exception when running Java app for MongoDB:

```
[localhost:27017] org.mongodb.driver.cluster : Exception in monitor thread while connecting to server localhost:27017 while accessing MongoDB with Java
```

I was to add exclusion annotation to my main annotated class,

i.e. instead of

```java
@SpringBootApplication
```

I should have

```java
@SpringBootApplication
@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class})
```
