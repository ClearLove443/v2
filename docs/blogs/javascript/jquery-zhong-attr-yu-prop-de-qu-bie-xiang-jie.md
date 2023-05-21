---
title: "Jquery中attr与prop的区别详解"
date: 2021-04-06 15:56:44
tag: [jQuery]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

# .attr()

获取匹配的元素集合中的第一个元素的属性的值 或 设置每一个匹配元素的一个或多个属性

# .prop()

获取匹配的元素集中第一个元素的属性（property）值或设置每一个匹配元素的一个或多个属性。

# prop()函数的结果:

      1.如果有相应的属性，返回指定属性值。
      2.如果没有相应的属性，返回值是空字符串。

# attr()函数的结果:

      1.如果有相应的属性，返回指定属性值。
      2.如果没有相应的属性，返回值是undefined。

# 总结

对于 HTML 元素本身就带有的固有属性，在处理时，使用 prop 方法。
对于 HTML 元素我们自己自定义的 DOM 属性，在处理时，使用 attr 方法。
具有 true 和 false 两个属性的属性，如 checked, selected 或者 disabled 使用 prop()
