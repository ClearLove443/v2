---
title: "nginx 开启gzip压缩"
date: 2021-08-01 23:04:06
tag: [Angular]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

# 优化打包编译方式

使用 `ng build '-c=prod'` `ng build --prod --aot` `ng build --aot` 或者`ng serve --aot`

# nginx 进行文件压缩

修改/mydata/nginx/conf 目录下的 nginx.conf 配置文件，开启 GZIP 压缩；

```
http {
    gzip on; #开启gzip
    gzip_disable "msie6"; #IE6不使用gzip
    gzip_vary on; #设置为on会在Header里增加 "Vary: Accept-Encoding"
    gzip_proxied any; #代理结果数据的压缩
    gzip_comp_level 6; #gzip压缩比（1~9），越小压缩效果越差，但是越大处理越慢，所以一般取中间值
    gzip_buffers 16 8k; #获取多少内存用于缓存压缩结果
    gzip_http_version 1.1; #识别http协议的版本
    gzip_min_length 1k; #设置允许压缩的页面最小字节数，超过1k的文件会被压缩
    gzip_types application/javascript text/css; #对特定的MIME类型生效,js和css文件会被压缩
    include /etc/nginx/conf.d/*.conf;
}
```

nginx 返回请求头中添加了 Content-Encoding: gzip 的信息，设置成功
