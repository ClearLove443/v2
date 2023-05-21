---
title: "html 滚动条拉不到最底下"
date: 2021-05-16 11:46:35
tag: [html, scrollbar, fixed position]
category: front-end-css
published: true
hideInList: false
feature:
isTop: false
---

容器使用绝对定位`position: fixed;`后, 高度就不会被计算在父容器里面。就会造成把一些元素遮挡住。
解决办法：添加一个空的容器。用来代替不被计算的容器。
