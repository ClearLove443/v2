---
title: "局域网调试本地项目的方法"
date: "2021-10-10 00:03:59"
tag: [Angular, Python]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

在混合开发中，Android 原生可能需要连本地的 Angular 项目去调试，首先要保证的是手机和电脑是在用一个局域网下，同时要关闭防火墙，否则可能无法正常访问

# 关闭防火墙

# 先获取本机 ip 地址

获取方式很简单，以 Windows 为例，直接在 cmd 中输入 ipconfig 回车

# Anglar 项目

## 启动

```bash
ng serve --host 0.0.0.0 --port 4200
```

或者

```bash
ng serve --host 你的ip地址 --port 4200
```

# Python 项目

## 启动

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

或者

```bash
uvicorn main:app --host 你的ip地址 --port 8000 --reload
```

# Springboot 项目

修改 application.yml 文件

```yaml
server:
  address: 0.0.0.0
  port: 8080
```

或者 application.properties 文件

```
server.address=0.0.0.0
server.port=8080
```

# NodeJs 项目

## 启动

```bash
node index.js --host 0.0.0.0
```
