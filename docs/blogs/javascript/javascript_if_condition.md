---
title: "JS中判断对象是否为空"
date: 2022-03-09 19:15:49
tag: [javaScript, condition]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

if(condition){} 中，有以下几种类型会被判定为假值：

- null
- undefined
- 0
- ""
- false
- void 0
- NaN

如果一个变量是没有声明的是不能直接判断的，比如下面的判断会报错。

```javaScript
// 在全局域，非方法内
if(a) {
    console.log(1)
} else {
    console.log(2)
}
// 会报错，因为a没有声明不能直接调用
```

但是如果一个变量已经声明过（不管变量是否被赋值过），比如在一个方法内

```javaScript
if(typeof a !== 'undefined' && a !== null) {
    console.log(1)
} else {
    console.log(2)
}
// 是不是要判断空值（比如false， '', NaN这些的），要看楼主的需求
```

或者这样的

```javaScript
var a;
if(a) {
    console.log(1)
} else {
    console.log(2)
}
```

这时候是没有问题的

PS：基本上不存在 a == undefined 这样的判断，如果是未声明的 undefined， 这样判断会报错， 换成 typeof a == 'undefined'。如果是对象的属性，直接调用确实是 undefinde， 但也不会 obj.a == undefinded 判断，而是直接判断 null，或判断空值就行 if (obj.a == null) 或 if (obj.a), 注意是两等号，会自动类型转换，不能三个等。
