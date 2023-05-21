---
title: "Python 多线程运行批处理文件"
date: 2021-03-03 10:25:53
tag: [python, cmd]
category: python
published: true
hideInList: false
feature:
isTop: false
---

- 有时需要同时运行多个不同的批处理文件，可以使用多线程方式来实现。

```python
import os
import threading

reports = ['1', '2', '3', '4'] # 批处理文件名
filepath = '**' # 批处理文件路径


def run_bat(i):  # 定义运行python文件函数
    os.system(filepath + i + '.bat')


if __name__ == '__main__':  # 多线程运行python文件
    for i in reports:
        task = threading.Thread(target=run_bat, args=(i, ))
        task.start()
```
