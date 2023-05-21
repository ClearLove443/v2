---
title: "Linux 系统查看用户组"
date: 2021-10-27 20:32:20
tag: [linux]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

## 方法一: groups 命令法，groups 命令可以查看某个用户所属的用户组

- 只执行 groups 命令，可以查看系统当前登录用户的所属组
- groups wuliang, 查询特定用户的用户组，在 groups 后面跟用户名即可

## 方法二：查看 /etc/group 法

```bash
cat /etc/group | grep wuliang
```

## 方法二：id 命令法，id 命令也可以查看某个用户所属的用户组

- 只执行 id 命令，可以查看系统当前登录用户的用户组
- id wuliang, 查询特定用户的用户组，在 id 后面跟用户名即可
