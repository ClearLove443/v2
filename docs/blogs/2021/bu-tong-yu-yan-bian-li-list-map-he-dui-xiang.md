---
title: "不同语言遍历list map 和对象"
date: 2021-05-13 10:34:54
category: loop
tag: [list, map, JavaScript, Python]
published: true
hideInList: false
feature:
isTop: false
---

# JavaScript

原生 javascript 没有 List

## 遍历数组

```javascript
{
  let array = new Array();
  array.push("test1");
  array.push("test2");
  array.forEach((v) => console.log(v)); // test1 test2
}
```

## 遍历 map

```javascript
{
  let map = new Map();
  map.set("1", "test1");
  map.set("2", "test2");
  map.forEach((v, k, map) => console.log({ k, v })); // {k: "1", v: "test1"} {k: "2", v: "test2"}
}
```

## 遍历对象

```javascript
{
  let object = new Object();
  object = { 1: "test1", 2: "test2" };
  for (let k in object) {
    let v = object[i];
    console.log({ k, v }); // {k: "1", v: "test1"} {k: "2", v: "test2"}
  }
}
```

# python

## 遍历数组

```python
list = [1, 2, 3, 4]
for i in range(len(list)):
    print("序号：%s   值：%s" % (i + 1, list[i]))  # 序号：1   值：1 序号：2   值：2 序号：3   值：3 序号：4   值：4
```

## 遍历 map(字典)

```python
map = {"a": "1", "b": "2", "c": "3"}

for k, v in map.items():
    print({k, v})  # {"1", "a"} {"2", "b"} {"3", "c"}
```

## 遍历 json 对象

```python
import json
json = "{ "name":"Bill", "age":63, "city":"Seattle"}"
map = json.loads(json)
for k, v in map.items():
    print({k, v})
```

# java

## 遍历 list

```java
String[] array = {"1" ,"2", "3", "4"};
List<String> list = Arrays.asList(array);
list.forEach(v -> System.out.println(v));   // 1 2 3 4
```

## 遍历 map

```java
Map<String, String> map = new HashMap<>();
map.put("1", "test1");
map.put("2", "test2");
map.forEach((k, v) -> System.out.println("k:" + k + " v:" + v)); // k:1 v:test1 k:2 v:test2
```
