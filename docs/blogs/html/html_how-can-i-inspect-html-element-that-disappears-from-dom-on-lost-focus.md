---
title: "如何检查失去焦点后从DOM中消失的html元素"
date: "2021-10-10 00:09:21"
tag: [html]
category: front-end-html
published: true
hideInList: false
feature:
isTop: false
---

在 Chrome 浏览器中，打开开发人员工具，然后选择元素选项卡，然后打开要检查的元素的父节点的上下文菜单，在上下文菜单中，单击中断(break on) >子树修改(subtree modifications)。

之后，您只需要单击页面，就可以进入检查器，而不会失去焦点或丢失要检查的元素。
