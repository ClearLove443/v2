import{_ as n,V as e,W as i,a0 as d}from"./framework-0db4e8b6.js";const a={},s=d(`<h1 id="优化打包编译方式" tabindex="-1"><a class="header-anchor" href="#优化打包编译方式" aria-hidden="true">#</a> 优化打包编译方式</h1><p>使用 <code>ng build &#39;-c=prod&#39;</code> <code>ng build --prod --aot</code> <code>ng build --aot</code> 或者<code>ng serve --aot</code></p><h1 id="nginx-进行文件压缩" tabindex="-1"><a class="header-anchor" href="#nginx-进行文件压缩" aria-hidden="true">#</a> nginx 进行文件压缩</h1><p>修改/mydata/nginx/conf 目录下的 nginx.conf 配置文件，开启 GZIP 压缩；</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http {
    gzip on; #开启gzip
    gzip_disable &quot;msie6&quot;; #IE6不使用gzip
    gzip_vary on; #设置为on会在Header里增加 &quot;Vary: Accept-Encoding&quot;
    gzip_proxied any; #代理结果数据的压缩
    gzip_comp_level 6; #gzip压缩比（1~9），越小压缩效果越差，但是越大处理越慢，所以一般取中间值
    gzip_buffers 16 8k; #获取多少内存用于缓存压缩结果
    gzip_http_version 1.1; #识别http协议的版本
    gzip_min_length 1k; #设置允许压缩的页面最小字节数，超过1k的文件会被压缩
    gzip_types application/javascript text/css; #对特定的MIME类型生效,js和css文件会被压缩
    include /etc/nginx/conf.d/*.conf;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx 返回请求头中添加了 Content-Encoding: gzip 的信息，设置成功</p>`,6),c=[s];function t(l,r){return e(),i("div",null,c)}const p=n(a,[["render",t],["__file","angular_mFx6MMDD1.html.vue"]]);export{p as default};
