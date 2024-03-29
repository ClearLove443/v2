---
title: "Impala更新元数据：invalidate metadata和refresh"
date: "2021-12-19 18:36:26"
tag: [impala, hive]
category: big-data
published: true
hideInList: false
feature:
isTop: false
---

## refresh

对于通过 hive 加载，插入，改变的数据操作，或者通过 hdfs 对数据进行改变的操作，impala 都无法自动识别数据的变化，可以使用`refresh table_name`，该语句可以让 impala 识别到数据的变化，可以对某张表更新元数据，也可以对某张表的某分区更新元数据。

```bash
refresh [table];                           -- 刷新表table的元数据
refresh [table] partition [partition];     -- 刷新表table的partition分区元数据
```

## invalidate metadata

对于通过 Hive 创建，删除或者修改表等操作，Impala 无法自动感知到 Hive 元数据的变化，想让 Impala 识别到这个变化需要在 impala shell 中输入`invalidate metadata`，该语句会使得 impala 原元数据失效并且重新从元数据库同步元数据信息。可以对所有表执行，也可以指定某张表

```bash
invalidate metadata;           -- tongbu所有表的元数据
invalidate metadata [table];   -- 废除表table的元数据
```

## 更新元数据的使用

- invalidate metadata 会加载相关表的所有元数据信息，这个操作对于有很多分区的大表成本非常高，refresh 加载元数据更快，因为它只要加载新增的数据文件块的位置数据
- 如果数仓中发生了增删表或改变表结构的行为，如 create table、drop table、alter table add column 等，就使用 invalidate metadata [table]语句。
- 如果数仓中某表加入了新数据，或者有分区的改动，如 load data、alter table add partition 等，就使用 refresh [table] (partition [partition])语句。
- invalidate metadata 比起 refresh 而言要重量级得多，并且它造成 impalad 之间查询不一致也会更严重。因此，也几乎禁止使用 不带表名的 invalidate metadata 语句。
- 如果数仓中涉及到非常大批量的元数据更改，那么建议直接重启 catalogd 和 statestored，这总比使用不带表名的 invalidate metadata 来得高效一些。
