---
title: "查看依赖、按照软件"
date: "2021-12-06 22:41:38"
tag: [maven, gradle]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

## gradle

```bash
gradle Dependencies --configuration compileClasspath
```

## maven

```bash
mvn dependency:tree
```

## node

```bash
npm list -g --depth=0
```

## python

```bash
pip list
```
