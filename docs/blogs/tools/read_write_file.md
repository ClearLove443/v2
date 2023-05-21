---
title: "文件操作相关"
date: 2022-02-17 19:21:07
tag: [Java, python]
category: io
published: true
hideInList: false
feature:
isTop: false
---

下面列出不同语言常见文件操作

## python

### 读取文件

```python
file_path = "abstest.py"
with open(file_path, "r", encoding="utf-8") as fp:
    contents = fp.readlines()
print(type(contents))
# <class 'list'>
```

### 写入文件

- "x" - 创建 - 将创建一个文件，如果文件存在则返回错误
- "a" - 追加 - 如果指定的文件不存在，将创建一个文件
- "w" - 写入 - 如果指定的文件不存在，将创建一个文件，会覆盖原文件

```python
file_path = "abstestbak.py"
with open(file_path, "w", encoding="utf-8") as fp2:
    # fp2.write("".join(contents))
    fp2.writelines(contents)
```

### 删除文件

```python
file_path = "abstestbak.py"
if os.path.exists(file_path):
    os.remove(file_path)
```

## java

```xml
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>
```

### 读取文件

```java
File file = new File("test.txt");
List<String> lines = FileUtils.readLines(file)
```

```java
File file = new File("test.txt");
List<String> lines = IOUtils.readLines(new FileInputStream(file), "UTF-8");
```

### 写入文件

- 会覆盖员文件，如果指定的文件不存在，将创建一个文件。

```java
File file = new File("test.txt");
List<String> lines = new ArrayList<>();
.....
FileUtils.writeLines(file, "UTF-8", lines);
```

- 不会覆盖原文件

```java
File file = new File("test.txt");
OutputStream os = new FileOutputStream(file, true);
IOUtils.writeLines(lines, null, os, "UTF-8");
```

## nodejs

[Node.js 文件系统](https://www.runoob.com/nodejs/nodejs-fs.html)
