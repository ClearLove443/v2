---
title: "Angular项目部署到 ngnix服务器 刷新 404"
date: 2021-07-27 22:33:49
tag: [Angular]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

# 一、angular 默认路由 h5 路由

将 angular 项目的 index.html 的标签修改为 `<base href="/myangular/">` 重新编译部署
修改 ngnix 服务器的配置文件 nginx.conf

```json
location /myangular {
            alias  /html/myangular;#angular项目所在目录
            index  index.html index.htm;
            try_files $uri $uri/ /index.html =404;
        }
```

# 二、angular hash 路由 #（不需要修改服务器）

直接在 angular 项目的 app.module.ts 文件中添加相关配置

## 方法 1：

```javascript
imports: [
   RouterModule.forRoot(routers, {useHash: true})
],
```

## 方法 2：

```javascript
//导入hash模块
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
@NgModule({
//进行配置
providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]，
}
```
