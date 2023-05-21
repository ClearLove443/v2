---
title: "Python 列表（List）遍历方法"
date: 2021-04-06 16:17:27
tag: [python, list]
category: python
published: true
hideInList: false
feature:
isTop: false
---

#方法 1

```python
for i in list:  #多个值相同的时候，取的下标不正确
    print ("序号：%s   值：%s" % (list.index(i) + 1, i))
```

#方法 2

```python
for i in range(len(list)):
    print ("序号：%s   值：%s" % (i + 1, list[i]))
```

#方法 3

```python
for i, val in enumerate(list):
    print ("序号：%s   值：%s" % (i + 1, val))
```

#方法 4

```python
for i, val in enumerate(list, 2):
    print ("序号：%s   值：%s" % (i + 1, val))
```
