---
title: "JS中判断对象是否包含某个key的方法"
date: 2021-07-18 23:58:17
tag: [JavaScript]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

方法一

```javascript
!("key" in obj); //结果为false，表示不包含；否则表示包含
```

方法二

```javascript
obj.hasOwnProperty("key"); //obj表示对象，结果为false表示不包含；否则表示包含
```

模糊查找对象的 key
some():
对数组中的每个元素都执行一次指定的函数（callback），直到此函数返回 true，如果发现这个元素，some 将返回 true，如果回调函数对每个元素执行后都返回 false ，some 将返回 false。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略

````javascript
    var typeTexts = {
      'task': '任务消息',
      'item':'项目消息',
      'system': '系统消息',
      'schedule': '日程消息',
      'people': '成员消息'
    }
    let isTask = Object.keys(typeTexts).some(key => key.includes('task'))
    ```
````
