---
title: "Angular 项目去除url中的#"
date: 2021-07-27 22:51:02
tag: [angular]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

# 1. 为什么要去除？

- Angular 官方指出：如果没有足够使用 hash 风格（#）的理由，还是尽量使用 HTML5 模式的路由风格；
- 如果配置了 hash 风格，在微信支付或是 Angular 的深路径依然会出 404 的问题；
- 当你需要使用 GA 等工具时，由于无法获取#号后的 URL，导致每次路由切换都给其发送一个路径；
- '#'有点丑。

# 2. 怎样才能去除？

有四个方法：

- 前端 + ngx
- 前端 + Apache
- 前端 + Tomcat
- GithubPages / 码云 Pages + 404 页面

## 2.1 前端

index.html 的 head 里加

```javascript
<base href="/">
```

app.module.ts

```javascript
import { ROUTER_CONFIG } from './app.routes.ts';
@NgModule({
   imports: [
    ...
    RouterModule.forRoot(ROUTER_CONFIG)
   //  RouterModule.forRoot(ROUTER_CONFIG, { useHash: true } )   这样写是带#的
  ],
})
```

app.routes.ts：

```javascript
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

export const ROUTER_CONFIG: Routes = [
  {
   ...
  }
];
```

如果只配置前端会怎么样？
如果只配置前端虽然会去掉'#'但是一刷新页面就 404，路径解析上出错了。
Angular 是单页应用，它实现了前端路由功能，后台可以不再控制路由的跳转，将原本属于后端的业务逻辑全部丢给前端。
用户刷新页面时(http://gitee.poetry/life), 请求是先被提交到了 WebServer 后台，后台路由没有对应页面的路由管理，就会出现 404 的错误。
用户如果是先访问首页(http://gitee.poetry), 然后再跳转到 页面(http://gitee.poetry/life), 则这个跳转是由 Angular 前台管理的 URL，访问是正常的。
那么我们让 WebServer 把属于 Angular 管理的路由 URL，都转发到 index.html 就可以解决 404 的问题了，也就是后面介绍的配置信息。
思考：hash 模式为什么不会 404？

## 2.2 ngx 配置

带`***`的是需要自己配置 nginx.conf 文件内容

```yaml
server {
    listen 80;  #监听的端口号
    server_name  my_server_name; # 服务器名称  ***
    root   /projects/angular/myproject/dist;  #相对于nginx的位置 ***
    index index.html; #如果index.html存在，就结束查找过程，把这个文件附加到请求的request_uri后面，并且发起一个内部的redirect。
    location / {  # / 是匹配所有的uri后执行下面操作
        try_files $uri $uri/ /index.html; #try_files先寻找名为 $uri 文件，没有则寻找 $uri/ 文件，再没有就寻找/index.html
    }
}
```

> try_files 详细解释：
> 如请求的是https://deepthan.gitee.io/poetry/life, $uri则是‘/life’,如果‘$uri’‘$uri/’都找不到，就会 fall back 到 try_files 的最后一个选项 /index.html发起一个内部 “子请求”，也就是相当于 nginx 发起一个 HTTP 请求到https://deepthan.gitee.io/poetry/index.html。 这个请求会被 location ~ .php$ { ... } catch 住，也就是进入 FastCGI 的处理程序。而具体的 URI 及参数是在 REQUEST_URI 中传递给 FastCGI 和 WordPress 程序的，因此不受 URI 变化的影响。

## 2.3 Apache

Apache 的根目录新建一个.htaccess 文件
RewriteEngine On

- 如果请求的是现有资源，则按原样执行
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]  
  RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d  
  RewriteRule ^ - [L]
- 如果请求的资源不存在，则使用 index.html
  RewriteRule ^ /index.html

## 2.4 Tomcat 配置

Tomcat/conf/web.xml 文件上添加

```xml
<error-page>
    <error-code>404</error-code>
    <location>/</location>
</error-page>
```

## 2.5 GithubPages / 码云 Pages + 404 页面

对于 github pages 或码云 Pages 来说，我们没办法直接配置 Github pages，但可以在 commit 时添加一个 404 页。简单的解决方案如下：
我们在项目的根目录新建 404.html，把 index.html 中的内容完全复制到 404.html 中就可以了。这样做 github pages 仍然会在恰当的时候给出一个 404 响应，浏览器将会正确处理该页，并正常加载我们的应用。

> 关于这方面的 hack： [S(GH)PA: The Single-Page App Hack for GitHub Pages](https://link.juejin.cn/?target=http%3A%2F%2Fwww.backalleycoder.com%2F2016%2F05%2F13%2Fsghpa-the-single-page-app-hack-for-github-pages%2F)

# 3. 带‘#’和不带‘#’原理上有什么区别呢？

## 3.1 这个得先说下什么是前端路由：

以前路由都是后台做的，通过用户请求的 url 导航到具体的 html 页面，现在我们在前端可以利用 Angular、vue、react 等通过配置文件，达到前端控制路由跳转的功能。
前端路由的实现方法：

1. 通过 hash 实现
   当 url 的 hash 发生改变时，触发 hashchange 注册的回调（低版本没有 hashchange 事件，通过轮回检测 url 实现），回调中去进行不同的操作，进行不同的内容展示。
   使用 hash 来实现的话，URI 规则中要带上#，路由中#后边的内容就是 hash，我们常说的锚点严格来说应该是页面中的 a[name]等元素。

2. HTML5 的 history api 操作浏览器的 session history 实现
   基于 history 实现的路由中不带#，就是原始的路由

## 3.2 Angular 中的路由策略

angular2 提供的路由策略也是基于上面两个原理实现的，可以在@NgModule 中通过 providers 配置或 RouterModule.forRoot()配置：
1） 路由中有#

```ts
@NgModule({
  imports:[RouterModule.forRoot(routes,{useHash:true})]
})
```

或

```ts
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  providers:[
     {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
```

HashLocationStragegy
适用于基于锚点标记的路径，比如/#/\*\*，后端只需要配置一个根路由即可。
2） html5 路由（无#）
改用 PathLocationStrategy（angular2 的默认策略，也就是 HTML5 路由），使用这个路由的常规路径不带#，这种策略需要后台配置支持，因为我们的应用是单页面应用，如果后台没有正确的配置，当用户在浏览器从一个路由跳往另外一个路由或者刷新时就会返回 404，需要在服务端里面覆盖所有的路由情况（后端可以通过 nginx 或者 apache 等配置）。

```ts
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  providers:[
    {provide: LocationStrategy, useClass: PathLocationStrategy}
    // 这一行是可选的，因为默认的LocationStrategy是PathLocationStrategy
  ]
})
```

更改 index.html 中的 base href 属性，Angular 将通过这个属性来处理路由跳转

```html
<base href="/app/" />
```

在后端的服务器上，用下面的正则去匹配所有的页面请求导向 index.html 页面。
we must render the index.html file for any request coming with below pattern
index.html

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My App</title>
  <base href="/app/">
  <body>
    <app-root>Loading...</app-root>
    <script type="text/javascript" src="vendor.bundle.js"></script>
    <script type="text/javascript" src="main.bundle.js"></script>
  </body>
</html>
```

## 3.3 前端路由优缺点

- 优点：

1. 从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。
2. 在某些场合中，用 ajax 请求，可以让页面无刷新，页面变了但 Url 没有变化，用户不能获取到想要的 url 地址，用前端路由做单页面网页就很好的解决了这个问题。

- 缺点：
  使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存。
