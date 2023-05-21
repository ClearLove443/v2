---
title: "在 TypeScript 中, 如何动态地添加属性给一个对象"
date: "2021-10-18 21:11:16"
tag: [typescript]
category: front-end-ts
published: true
hideInList: false
feature:
isTop: false
---

如果是自己定义的对象，想动态给对象增加 key，value，obj.xx=xx,obj[xx]=xx，都会报错，一种优雅快速的方式是：

```typescript
interface LooseObject {
  [key: string]: any;
}

var obj: LooseObject = {};
```

这种方式还可以对对象做一些类型规则，比如在 LooseObject 里加必须的字段和其他字段必须接受的类型等。
