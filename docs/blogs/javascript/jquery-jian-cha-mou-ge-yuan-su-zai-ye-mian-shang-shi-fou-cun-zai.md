---
title: "jQuery检查某个元素在页面上是否存在"
date: 2021-03-03 15:16:28
tag: [html, jQuery]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

用 jQuery 检查某个元素在网页上是否存在时，应该根据获取元素的长度来判断，代码如下：

```javascript
if ($("#tt").length > 0) {
  // 元素存在时执行的代码
}
```
