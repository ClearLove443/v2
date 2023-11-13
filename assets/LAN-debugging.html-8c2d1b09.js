import{_ as a,V as e,W as s,a0 as n}from"./framework-bdfa852d.js";const r={},i=n(`<p>在混合开发中，Android 原生可能需要连本地的 Angular 项目去调试，首先要保证的是手机和电脑是在用一个局域网下，同时要关闭防火墙，否则可能无法正常访问</p><h1 id="关闭防火墙" tabindex="-1"><a class="header-anchor" href="#关闭防火墙" aria-hidden="true">#</a> 关闭防火墙</h1><h1 id="先获取本机-ip-地址" tabindex="-1"><a class="header-anchor" href="#先获取本机-ip-地址" aria-hidden="true">#</a> 先获取本机 ip 地址</h1><p>获取方式很简单，以 Windows 为例，直接在 cmd 中输入 ipconfig 回车</p><h1 id="anglar-项目" tabindex="-1"><a class="header-anchor" href="#anglar-项目" aria-hidden="true">#</a> Anglar 项目</h1><h2 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ng serve <span class="token parameter variable">--host</span> <span class="token number">0.0</span>.0.0 <span class="token parameter variable">--port</span> <span class="token number">4200</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ng serve <span class="token parameter variable">--host</span> 你的ip地址 <span class="token parameter variable">--port</span> <span class="token number">4200</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="python-项目" tabindex="-1"><a class="header-anchor" href="#python-项目" aria-hidden="true">#</a> Python 项目</h1><h2 id="启动-1" tabindex="-1"><a class="header-anchor" href="#启动-1" aria-hidden="true">#</a> 启动</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>uvicorn main:app <span class="token parameter variable">--host</span> <span class="token number">0.0</span>.0.0 <span class="token parameter variable">--port</span> <span class="token number">8000</span> <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>uvicorn main:app <span class="token parameter variable">--host</span> 你的ip地址 <span class="token parameter variable">--port</span> <span class="token number">8000</span> <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="springboot-项目" tabindex="-1"><a class="header-anchor" href="#springboot-项目" aria-hidden="true">#</a> Springboot 项目</h1><p>修改 application.yml 文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">address</span><span class="token punctuation">:</span> 0.0.0.0
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者 application.properties 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server.address=0.0.0.0
server.port=8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="nodejs-项目" tabindex="-1"><a class="header-anchor" href="#nodejs-项目" aria-hidden="true">#</a> NodeJs 项目</h1><h2 id="启动-2" tabindex="-1"><a class="header-anchor" href="#启动-2" aria-hidden="true">#</a> 启动</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">node</span> index.js <span class="token parameter variable">--host</span> <span class="token number">0.0</span>.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,22),d=[i];function l(t,p){return e(),s("div",null,d)}const o=a(r,[["render",l],["__file","LAN-debugging.html.vue"]]);export{o as default};