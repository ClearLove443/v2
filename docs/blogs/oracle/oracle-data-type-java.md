---
title: "Oracle和Java数据类型对应关系表"
date: 2022-03-14 21:59:40
tag: [oracle, java]
category: database
published: true
hideInList: false
feature:
isTop: false
---

Oracle 和 Java 数据类型对应关系表

| oracle 字段类型       | java 数据类型 | java 数据类型        |
| :-------------------- | :------------ | :------------------- |
| varchart2             | String        | java.lang.String     |
| number(1)             | boolean       | java.lang.Boolean    |
| number(2)             | byte          | java.lang.Byte       |
| number(3)-number(4)   | short         | java.lang.Short      |
| number(5)-number(9)   | int           | java.lang.Integer    |
| number(10)-number(18) | long          | java.lang.Long       |
| number(19)-number(38) | BigDecimal    | java.math.BigDecimal |
| number                | BigDecimal    | java.math.BigDecimal |
| char                  | String        | java.lang.String     |
| date                  | Timestamp     | java.sql.Timestamp   |
| blob                  | Object        | java.lang.Object     |

insert 空字符串时，使用 null。 oracle 会自动把空字符串转换成 null。
其他类型也 insert null。

检索时，使用 IS NULL。
