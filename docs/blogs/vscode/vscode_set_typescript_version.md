---
title: "在VSCode中默认使用settings.json中定义的TypeScript版本"
date: 2021-05-23 15:43:53
tag: [vscode]
category: setting
published: true
hideInList: false
feature:
isTop: false
---

当 VSCode 打开 typescript 文件,使用 node_modules 里面的 TypeScript 版本，而不是 VSCode 的版本

快捷键 <kbd>Ctrl</kbd>+<kbd>,</kbd> 打开 settings.json，添加如下设置

```json
"typescript.tsdk": "node_modules/typescript/lib",
```

然后打开右下角 typescript 版本，选择`Use Workspace Version`
