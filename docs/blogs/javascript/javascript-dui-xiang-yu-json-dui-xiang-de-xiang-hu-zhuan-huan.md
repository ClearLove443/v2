---
title: "JavaScript 对象与 JSON 对象的相互转换"
date: 2021-05-10 17:10:23
tag: [JavaScript, json]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

# 一、全局 JSON 对象

ES5 定义了全局对象 JSON，对解析 JSON 的行为制定了规范。
JSON 对象有两个方法：stringify() 和 parse()。

# 二、JavaScript 对象序列化为 JSON 对象

JSON.stringify( js 对象 [, 过滤器] [, 选项])
二三参数可选，js 对象中的函数和原型成员将被忽略，值为 undefined 的属性也被跳过。
默认情况下，返回的 JSON 不包含任何空格字符和缩进。

```javascript
var book = {
  title: "Professional JavaScript",
  authors: ["Nicholas C. Zakas"],
  edition: 3,
  year: 2011,
};

var jsonText = JSON.stringify(book);
```

过滤器为数组：JSON.stingify() 的结果只包含数组中列出的属性。

```javascript
var book = {
  title: "Professional JavaScript",
  authors: ["Nicholas C. Zakas"],
  edition: 3,
  year: 2011,
};

var jsonText = JSON.stringify(book, ["title", "edition"]);
```

jsonText 的值为 {"title": "Professional JavaScript", "edition": 3}

过滤器为函数：函数接收两个参数，键名和值(key, value)。函数体中根据键名处理对应的值。

```javascript
var book = {
  title: "Professional JavaScript",
  authors: ["Nicholas C. Zakas"],
  edition: 3,
  year: 2011,
};

var jsonText = JSON.stringify(book, function (key, value) {
  switch (key) {
    case "authors":
      return value.join(",");
    case "year":
      return 5000;
    case "edition":
      return undefined;
    default:
      return value;
  }
});
```

序列化后的 jsonText 值为：{"title": "Professional JavaScript", "authors": "Nicholas C. Zakas", "year": 5000}

第三个参数用于控制结果的缩进：
参数为数值 ----- 表示缩进的空格数。

```javascript
var book = {
            title: "Professional JavaScript",
            authors: ["Nicholas C. Zakas"],
            edition: 3,
            year: 2011
           };

var jsonText = JSON.stringify(book, null, 4);
jsonText 中的字符串：
{
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    "edition": 3,
    "year": 2011
}
```

参数为字符串 ----- 表示使用该字符串进行缩进。

```javascript
var book = {
            title: "Professional JavaScript",
            authors: ["Nicholas C. Zakas"],
            edition: 3,
            year: 2011
           };

var jsonText = JSON.stringify(book, null, " - -");
jsonText 中的字符串：
{
--"title": "Professional JavaScript",
--"authors": [
----"Nicholas C. Zakas"
--],
--"edition": 3,
--"year": 2011
}
```

（还可以为对象定义 toJSON() 方法，实现对其进行自定义序列化的需求。）

# 三、JSON 对象解析为  JavaScript 对象

JSON.parse(json 对象 [, 还原函数])
还原参数接收两个参数，键和值。如果返回 undefined，则表示从结果中删除相应的键；如果返回其他值，则将该值插入到结果中。

```javascript
var book = {
  title: "Professional JavaScript",
  authors: ["Nicholas C. Zakas"],
  edition: 3,
  year: 2011,
  releaseDate: new Date(2011, 11, 1),
};

var jsonText = JSON.stringify(book);
var bookCopy = JSON.parse(jsonText, function (key, value) {
  if (key == "releaseDate") {
    return new Date(value);
  } else {
    return value;
  }
});
```
