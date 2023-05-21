---
title: "html 中引用资源路径问题"
date: 2021-05-15 12:51:09
tag: [html]
category: front-end-html
published: true
hideInList: false
feature:
isTop: false
---

../和./和/的区别

./ 当前目录
../ 父级目录
/ 根目录

./SRC/   这样写表示，当前目录中的 SRC 文件夹；  ../SRC/   这样写表示，当前目录的上一层目录中 SRC 文件夹； /SRC/   这样写表示，项目根目录（可以指磁盘根目录，也可以指项目根目录，具体根据实际情况而定）

比如说`C:\Users\jj\Desktop\colors7\index.html`中 的`<link type="text/css" href="/css/index.css">`会跳到`file:///C:/css/index.css` 。就报错啦

什么？ 你要直接写 href="css/index.css"？目前的测试效果是等同于当前目录，即./
