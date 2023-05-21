---
title: "Angular 元素之间没有间距"
date: 2021-05-18 19:03:47
tag: [angular]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

默认情况下，Angular 6 以上将应用程序的 angularCompilerOption：preserveWhitespaces 设置为 false。就会导致元素之间没有间距。

解决办法如下

目前，在 JIT 模式下，我们可以将其设置为 CompileOptions :
main.ts

```typescript
platformBrowserDynamic().bootstrapModule(AppModule, {
  preserveWhitespaces: true,
});
```

对于 aot，我们必须将此选项添加到
tsconfig.app.json

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "es2015",
    "types": []
  },
  "exclude": ["test.ts", "**/*.spec.ts"],
  "angularCompilerOptions": {
    "preserveWhitespaces": true
  }
}
```
