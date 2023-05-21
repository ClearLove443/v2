---
title: "Unix Shell编程——将命令输出结果保存到变量中"
date: 2021-12-19 18:59:24
tag: [linux]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

## 两种实现语法

```bash
var=$(命令)
var=`命令` # 注意此处不是普通的单引号
```

## 说明

1. 这两种语法均可实现将命令执行结果保存到 var 变量中，但是特殊情况下两种方式无法得到正确结果
2. 如果命令执行过程中发生错误，则输出的错误信息不会保存到 var 变量中
