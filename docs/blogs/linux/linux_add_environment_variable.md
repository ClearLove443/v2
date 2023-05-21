---
title: "linux添加环境变量"
date: "2021-10-25 23:51:00"
tag: [environment]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

## 添加环境变量之前需要明白以下几点：

1. Linux 的环境变量是保存在变量 PATH 中(window 也是保存在 PATH 中)，可通过命令 echo $PATH 输出查看

2. Linux 环境变量值之间是通过冒号分隔的( : )

其格式为：`PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>`

## 临时添加环境变量 PATH：

可通过 export 命令，如

```bash
export PATH=$PATH:/usr/local/nginx/sbin/，将/usr/local/nginx/sbin/目录临时添加到环境变量中
```

## 当前用户永久添加环境变量：

编辑.bashrc 文件 `vim ~/.bashrc` <<---- 通过这种方式，在关闭 xshell 后，添加的环境变量仍然生效

文件末尾添加：`export PATH="$PATH:/usr/local/nginx/sbin/"`

```bash
source ~/.bashrc
```

## 所有用户永久添加环境变量：

编辑/etc/profile 文件 vim /etc/profile <<---- 通过这种方式，在关闭 xshell 后，添加的环境变量不生效

文件末尾添加：export PATH="$PATH:/usr/local/nginx/sbin/"

```bash
source  /etc/profile
```

## 总结：

linux 添加环境变量注意几点：

1. 变量之前使用冒号分隔
2. 使用命令 export
3. export 时，需要有$PATH
4. 在文件的末尾添加
5. 配置文件有，/etc/profile 和 ~/.bashrc
6. 添加 bin 或者 sbin 目录即可
