---
title: "jQuery 获取元素(父节点,子节点,兄弟节点)"
date: 2021-03-03 15:30:51
tag: [jQuery, html]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

获取节点元素

```javascript
$("#test1").parent(); // 父节点
$("#test1").parents(); // 全部父节点
$("#test1").parents(".mui-content"); //返回class为mui-content的父节点
$("#test1").children(); // 全部子节点
$("#test1").children("#test1"); //返回id为test1的子节点
$("#test1").contents(); // 返回id为test里面的所有内容，包括节点和文本
$("#test1").contents("#test1"); //返回id为test里面的id为#test1的节点和文本
$("#test1").prev(); // 上一个兄弟节点
$("#test1").prevAll(); // 之前所有兄弟节点
$("#test1").next(); // 下一个兄弟节点
$("#test1").nextAll(); // 之后所有兄弟节点
$("#test1").siblings(); // 所有兄弟节点
$("#test1").siblings("#test2"); //返回id为test2的兄弟节点
$("#test").find("#test1"); // 选中id为test后代中 id为test1的节点
```

注意上面的方法 返回的是 jquery 集合 需要继续用 jq 的方法操作或取值
如果想要转为 dom 直接操作的只需要 取它的下标即可
如: $("#test1").parent()[0] 返回的就是 dom 节点
