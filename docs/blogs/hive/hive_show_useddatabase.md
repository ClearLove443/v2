---
title: "hive命令行显示当前数据库"
date: "2021-10-09 22:53:50"
tag: [hive]
category: big-data
published: true
hideInList: false
feature:
isTop: false
---

在 hive 命令行不知道当前数据库有时会带来麻烦。

1、可以在 hive 命令行执行以下语句显示当前数据库：

```bash
select current_database();
```

2、可以设置 hive 属性在命令行显示当前数据库：

```bash
set hive.cli.print.current.db=true;
```
