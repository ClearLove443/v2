---
title: "angular项目版本升级"
date: "2021-10-31 18:56:51"
tag: [angular]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

1. 运行命令，启动更新程序，查看需要更新的依赖

```bash
ng update
```

2. 升级剩下的依赖

```bash
ng update --all --force
```

3. 升级完成后，需要安装

```bash
npm install
```
