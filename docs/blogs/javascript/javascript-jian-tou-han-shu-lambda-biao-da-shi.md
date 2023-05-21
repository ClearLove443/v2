---
title: "JavaScript 箭头函数（Lambda表达式）"
date: 2021-03-02 18:36:43
tag: [JavaScript]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

- Lambda 表达式(箭头函数)用于表示一个函数，所以它和函数一样，也拥有参数、返回值、函数体，但它没有函数名，所以 Lambda 表达式相当于一个匿名函数。

- 使用方法

```
()=>{}
```

小括号里放参数，大括号里放函数体

- 箭头函数做回调参数

```javascript
[5, 8, 9].map((item) => item + 1); // -> [6, 9, 10]
```

- 当箭头函数有一个参数时，参数两边的括号是可有可无的

```javascript
const foo = (bar) => bar + 1;
const bar = (baz) => baz + 1;
```

- 箭头函数不带参数时，必须要用括号

```javascript
const foo = () => "foo";
```

- 如果函数体不是只一行，应该用花括号，并显式地返回（如果需要返回值）

```javascript
const foo = (bar) => {
  const baz = 5;
  return bar + baz;
};
foo(1); // -> 6
```
