---
title: "python如何不生成pycache文件夹"
date: "2021-12-27 23:28:17"
tag: [Python]
category: python
published: true
hideInList: true
feature:
isTop: false
---

## 前言

用 python 编写好一个工程，在第一次运行后，总会发现工程根目录下生成了一个**pycache**文件夹，里面是和 py 文件同名的各种 `*.pyc` 或者 `*.pyo` 文件。

先大概了解一下 python 基本运行机制。Python 程序运行时不需要编译成二进制代码，而直接从源码运行程序，简单来说是，Python 解释器将源码转换为字节码，然后再由解释器来执行这些字节码。

解释器的具体工作：

1. 完成模块的加载和链接；

2. 将源代码编译为 PyCodeObject 对象(即字节码)，写入内存中，供 CPU 读取；

3. 从内存中读取并执行，结束后将 PyCodeObject 写回硬盘当中，也就是复制到.pyc 或.pyo 文件中，以保存当前目录下所有脚本的字节码文件；

4. 之后若再次执行该脚本，它先检查【本地是否有上述字节码文件】和【该字节码文件的修改时间是否与其脚本一致】。是就直接执行，否则重复上述步骤。

pyc 文件的生成是什么情况下生成呢：

python 解释器会将 `*.py` 脚本文件进行编译，并将编译结果保存到**pycache**目录中。

下次再执行工程时，若解释器发现这个 `*.py` 脚本没有修改过，就会跳过编译这一步，直接运行以前生成的保存在 `__pycache__`文件夹里的`*.pyc` 文件。
这样工程较大时就可以大大缩短项目运行前的准备时间；如果你只需执行一个小工程，没关系 忽略这个文件夹就行。

## 什么时候会出现**pycache**文件夹？

工程目录下有**main**.py 文件，和其他将要调用的模块时。如果只有当前运行的脚本 "**main**"，则不会生成 **pycache** 的文件。

当 import 导入另一个模块的时候会生成
python3 会生成 **pycache**

## 如何不生成编译文件呢：

1. 执行的时候 使用 -B 参数 即

```bash
python3 -B test.py
```

里面的包含的就不会生成 pyc 了

2. 设置环境变量

```bash
export PYTHONDONTWRITEBYTECODE=1
```

3. 在引入的地方写

```bash
import sys
sys.dont_write_bytecode = True
```

以上三种方式都可以实现不生成 pyc 文件。
