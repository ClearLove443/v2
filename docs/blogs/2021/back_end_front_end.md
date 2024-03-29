---
title: "前后端分离与不分离的本质区别"
date: "2021-10-31 22:57:57"
tag: [back-end, front-end]
category: java
published: true
hideInList: false
feature:
isTop: false
---

## 前后端不分离

在前后端不分离的应用模式中，前端页面看到的效果都是由后端控制，由后端渲染页面或重定向，也就是后端需要控制前端的展示，前端与后端的耦合度很高。
请求的数据交互如下图:

![数据交互图](/2799137752-3e133fdfd20827f9_fix732.png)

这种应用模式比较适合纯网页应用，但是当后端对接 App 时，App 可能并不需要后端返回一个 HTML 网页，而仅仅是数据本身，所以后端原本返回网页的接口不适用于前端 App 应用，为了对接 App 后端还需再开发一套接口。

## 前后端分离

在前后端分离的应用模式中，后端仅返回前端所需的数据，不再渲染 HTML 页面，不再控制前端的效果。至于前端用户看到什么效果，从后端请求的数据如何加载到前端中，都由前端自己决定，网页有网页的处理方式，App 有 App 的处理方式，但无论哪种前端，所需的数据基本相同，后端仅需开发一套逻辑对外提供数据即可。

对应的数据交互如下图 :

![数据交互图](/2063119990-5fc70e67da45d_fix732.jfif)

在前后端分离的应用模式中 ，前端与后端的耦合度相对较低。在前后端分离的应用模式中，我们通常将后端开发的每个视图都称为一个接口，或者 API，前端通过访问接口来对数据进行增删改查。
