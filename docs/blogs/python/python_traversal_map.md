---
title: "Python 字典（Map）遍历方法"
date: 2021-04-06 16:30:29
tag: [python, map]
category: python
published: true
hideInList: false
feature:
isTop: false
---

```python
a = {'a': '1', 'b': '2', 'c': '3'}
```

# （1）遍历 key 值

```python
for key in a:
    print(key+':'+a[key])

for key in a.keys():
    print(key+':'+a[key])
```

# （2）遍历 value 值

```python
for value in a.values():
    print(value)
```

# （3）遍历字典项

```python
for kv in a.items():
    print(kv)

>>>('a', '1')
>>>('b', '2')
>>>('c', '3')
```

# （4）遍历字典健值

```python
for key,value in a.items():
    print(key+':'+value)

for (key,value) in a.items():
    print(key+':'+value)

>>>a:1
>>>b:2
>>>c:3
```
