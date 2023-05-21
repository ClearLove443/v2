---
title: "Python创建字典（Map）"
date: 2021-05-15 13:12:11
tag: [python, map]
category: python
published: true
hideInList: true
feature:
isTop: false
---

# 创建空字典

```python
>>> dic = {}
>>> type(dic)
<type 'dict'>
```

# 直接赋值创建

```python
>>> dic = {'spam':1, 'egg':2, 'bar':3}
>>> dic
{'bar': 3, 'egg': 2, 'spam': 1}
```

# 通过关键字 dict 和关键字参数创建

```python
>>> dic = dict(spam = 1, egg = 2, bar =3)
>>> dic
{'bar': 3, 'egg': 2, 'spam': 1}
```

# 通过二元组列表创建

```python
>>> list = [('spam', 1), ('egg', 2), ('bar', 3)]
>>> dic = dict(list)
>>> dic
{'bar': 3, 'egg': 2, 'spam': 1}
```

# dict 和 zip 结合创建

```python
>>> dic = dict(zip('abc', [1, 2, 3]))
>>> dic
{'a': 1, 'c': 3, 'b': 2}
```

# 通过字典推导式创建

```python
>>> dic = {i:2*i for i in range(3)}
>>> dic
{0: 0, 1: 2, 2: 4}
```

# 通过 dict.fromkeys()创建

```python
>>> dic = dict.fromkeys(range(3), 'x')
<!-- more -->

>>> dic
{0: 'x', 1: 'x', 2: 'x'}
```

# 其他

```python
>>> list = ['x', 1, 'y', 2, 'z', 3]
>>> dic = dict(zip(list[::2], list[1::2]))
>>> dic
{'y': 2, 'x': 1, 'z': 3}
```
