---
title: "Hadoop Rename command"
date: 2021-09-02 23:10:53
tag: [hadoop, command, hdfs]
category: big-data
published: true
hideInList: false
feature:
isTop: false
---

First of all you can not rename a directory of file in hadoop/HDFS

but you can do :

```bash
Hadoop fs -mv /warehouse/bigdata/data/test /warehouse/bigdata/data/test_d
```

If you want to do this for all your 200 HDFS part files then you have to write Shell/bash script to do this in recursive loop.

just write above hadoop command in shell loop.

follow this: https://www.cyberciti.biz/tips/renaming-multiple-files-at-a-shell-prompt.html

and this how to rename all file in a folder with a prefix in a single unix command?
