---
title: "将HTML特殊转义为实体字符"
date: 2021-05-16 11:39:01
tag: [html, JavaScript]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

前端开发工作中，经常需要将 HTML 的左右尖括号等转义成实体形式。我们不能把<，>，&等直接显示在最终看到的网页里。需要将其转义后才能在网页上显示。

转义字符（Escape Sequence）也称字符实体(Character Entity)。定义转义字符串的主要原因是

1. “<”和“>”等符号已经用来表示 HTML TAG，因此不能直接当作文本中的符号来使用。但有时需求是在 HTML 页面上使用这些符号，所以需要定义它的转义字符串。
2. 有些字符在 ASCII 字符集中没有定义（如版权符号“©”）。因此需要使用转义字符（“©”对应的转义字符是“&copy;”）来表示。

这里提供两个函数 escape 和 unescape，分别实现将 HTML 转义为实体和回转。

# 方式一、一个映射表+正则替换

```javascript
var keys =
  Object.keys ||
  function (obj) {
    obj = Object(obj);
    var arr = [];
    for (var a in obj) arr.push(a);
    return arr;
  };
var invert = (function (obj) {
  obj = Object(obj);
  var result = {};
  for (var a in obj) result[obj[a]] = a;
  return result;
})`var entityMap = {
    escape: {
      '&': '&',
      '<': '<',
      '>': '>',
      '"': '"',
      "'": '''
    }
}`;
entityMap.unescape = invert(entityMap.escape);
var entityReg = {
  escape: RegExp("[" + keys(entityMap.escape).join("") + "]", "g"),
  unescape: RegExp("(" + keys(entityMap.unescape).join("|") + ")", "g"),
};

// 将HTML转义为实体
function escape(html) {
  if (typeof html !== "string") return "";
  return html.replace(entityReg.escape, function (match) {
    return entityMap.escape[match];
  });
}
// 将实体转回为HTML
function unescape(str) {
  if (typeof str !== "string") return "";
  return str.replace(entityReg.unescape, function (match) {
    return entityMap.unescape[match];
  });
}
```

# 方式二、利用浏览器 DOM API

```javascript
// 将HTML转义为实体
function escape(html) {
  var elem = document.createElement("div");
  var txt = document.createTextNode(html);
  elem.appendChild(txt);
  return elem.innerHTML;
}
// 将实体转回为HTML
function unescape(str) {
  var elem = document.createElement("div");
  elem.innerHTML = str;
  return elem.innerText || elem.textContent;
}
```

有个缺陷是只能转义“< > & ”，对于单引号，双引号都不转义。另外一些非 ASCII 也不能转义。选择时须注意。

# 比较：

方式 1 代码量较大，但灵活性，完整性都比方式 2 强。可根据需求添加或减少映射表 entityMap，且可以运行在任意 JS 环境中。

方式 2 为 hack 方式，代码量少很多，利用浏览器内部 API 就行了转义和转回（主流浏览器都支持）。不具完整性，很明显只能在浏览器环境中使用（比如不能在 Node.js 中跑）。
