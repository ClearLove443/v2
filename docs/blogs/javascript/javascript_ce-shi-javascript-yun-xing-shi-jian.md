---
title: "测试 JavaScript 运行时间"
date: 2021-03-03 10:59:36
tag: [JavaScript, console]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

# 有时候需要知道指定的方法运行了多长时间，可以使用以下的方法。

```javascript
$(function () {
        console.time("测试 fn 速度: ");
        testFunction();
        console.timeEnd("测试 fn 速度: ");
}
```

另外，console 还有其他比较有趣的方法。

- console.count(label) 输出运行次数
- console.table(object|array) 输出表格形态的数据（在动态绘制的检查时用的较多）
- console.group(label) 和 console.groupEnd(label) 将 console 结果进行分组（分类及减少输出版面，但也加大了我们的脑回路呀）（group = groupCollapsed 是一样的）
- console.trace() 检测方法的调用来源，超级赞
- console.profile(label) 和 console.profileEnd(label) 是 time 的升级版，不但测速，直接测性能了，需要到 profile 面板里面才能看到结果
- console.assert(boolean, string) 提示报错可以少个判断
