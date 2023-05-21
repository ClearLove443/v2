---
title: "Vs Code 关闭单词拼写错误 警告 Unknown word"
date: 2021-05-23 17:29:36
tag: [vscode]
category: hot-key
published: true
hideInList: false
feature:
isTop: false
---

快捷键 <kbd>Ctrl</kbd>+<kbd>,</kbd> 打开 settings.json，添加如下设置

```
"cSpell.diagnosticLevel": "Hint",
```
