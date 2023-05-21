---
title: "JavaScript 判断字符串是不是为空"
date: 2021-03-03 15:20:47
tag: [JavaScript]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

判断字符串是否为空，代码如下：

```javascript
var test = "";
if (!test) {
  alert("为空");
}

if (!!test) {
  alert("不为空");
}
```
