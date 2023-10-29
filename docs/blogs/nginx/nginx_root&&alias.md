---
title: "Nginx root vs alias"
date: 2023-10-29 11:19:31
category: setting
tag: [nginx]
# 是否置顶
sticky: false
# 是否收藏
star: false
published: true
hideInList: false
feature:
isTop: false
---

使用 root 时, 服务器里真实的资源路径是 root 的路径拼接上 location 指定的路径.
使用alias顾名思义是代指 location 的别名, 不论location 是什么, 资源的真实路径都是alias所指定的,所以location是匹配浏览器输入的地址, 真实访问的路径就是alias 指定的路径

其它区别

1. alias 只能配置在location 中, 而root 可以配置在 server, http 和 location 中.
2. alias 后面必须要以 "/" 结尾, 否则会查找不到文件, 报404错误; 而 root 对 "/" 可有可无.

root实例：

```conf
location ^~ /t/ {
  root /www/root/html/;
}
```

如果一个请求的URI是/t/a.html时，web服务器将会返回服务器上的/www/root/html/t/a.html的文件。

alias实例：

```conf
location ^~ /t/ {
  alias /www/root/html/new_t/;
}
```

如果一个请求的URI是/t/a.html时，web服务器将会返回服务器上的/www/root/html/new_t/a.html的文件。注意这里是new_t，因为alias会把location后面配置的路径丢弃掉，把当前匹配到的目录指向到指定的目录。
