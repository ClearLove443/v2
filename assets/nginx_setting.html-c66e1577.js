import{_ as e,D as i,V as l,W as t,Y as n,Z as s,$ as c,a0 as d}from"./framework-0db4e8b6.js";const o={},r=d(`<p>Nginx 是一个高性能的 HTTP 和反向代理 web 服务器，同时也提供了 IMAP/POP3/SMTP 服务，其因丰富的功能集、稳定性、示例配置文件和低系统资源的消耗受到了开发者的欢迎。 本文，我们总结了一些常用的 Nginx 配置代码</p><h2 id="侦听端口" tabindex="-1"><a class="header-anchor" href="#侦听端口" aria-hidden="true">#</a> 侦听端口</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>server <span class="token punctuation">{</span>
  <span class="token comment"># Standard HTTP Protocol</span>
  listen 80;
  <span class="token comment"># Standard HTTPS Protocol</span>
  listen 443 ssl;
  <span class="token comment"># For http2</span>
  listen 443 ssl http2;
  <span class="token comment"># Listen on 80 using IPv6</span>
  listen <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>80;
  <span class="token comment"># Listen only on using IPv6</span>
  listen <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>80 ipv6only=on;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="访问日志" tabindex="-1"><a class="header-anchor" href="#访问日志" aria-hidden="true">#</a> 访问日志</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>server <span class="token punctuation">{</span>
  <span class="token comment"># Relative or full path to log file</span>
  access_log /path/to/file.log;
  <span class="token comment"># Turn &#39;on&#39; or &#39;off&#39;</span>
  access_log on;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="域名" tabindex="-1"><a class="header-anchor" href="#域名" aria-hidden="true">#</a> 域名</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>server <span class="token punctuation">{</span>
  <span class="token comment"># Listen to yourdomain.com</span>
  server_name yourdomain.com;
  <span class="token comment"># Listen to multiple domains server_name yourdomain.com www.yourdomain.com;</span>
  <span class="token comment"># Listen to all domains</span>
  server_name <span class="token important">*.yourdomain.com;</span>
  <span class="token comment"># Listen to all top-level domains</span>
  server_name yourdomain.<span class="token important">*;</span>
  <span class="token comment"># Listen to unspecified Hostnames (Listens to IP address itself)</span>
  server_name &quot;&quot;;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="静态资产" tabindex="-1"><a class="header-anchor" href="#静态资产" aria-hidden="true">#</a> 静态资产</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>server <span class="token punctuation">{</span>
listen 80;
server_name yourdomain.com;
location / <span class="token punctuation">{</span>
root /path/to/website;
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向" aria-hidden="true">#</a> 重定向</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>server <span class="token punctuation">{</span>
listen 80;
server_name www.yourdomain.com;
return 301 http<span class="token punctuation">:</span>//yourdomain.com$request_uri;
<span class="token punctuation">}</span>
server <span class="token punctuation">{</span>
listen 80;
server_name www.yourdomain.com;
location /redirect<span class="token punctuation">-</span>url <span class="token punctuation">{</span>
return 301 http<span class="token punctuation">:</span>//otherdomain.com;
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> 反向代理</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>server <span class="token punctuation">{</span>
  listen 80;
  server_name yourdomain.com;
  location / <span class="token punctuation">{</span>
    proxy_pass http<span class="token punctuation">:</span>//0.0.0.0<span class="token punctuation">:</span>3000;
    <span class="token comment"># where 0.0.0.0:3000 is your application server (Ex: node.js) bound on 0.0.0.0 listening on port 3000</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>upstream node_js <span class="token punctuation">{</span>
server 0.0.0.0<span class="token punctuation">:</span>3000;
server 0.0.0.0<span class="token punctuation">:</span>4000;
server 123.131.121.122;
<span class="token punctuation">}</span>
server <span class="token punctuation">{</span>
listen 80;
server_name yourdomain.com;
location / <span class="token punctuation">{</span>
proxy_pass http<span class="token punctuation">:</span>//node_js;
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ssl-协议" tabindex="-1"><a class="header-anchor" href="#ssl-协议" aria-hidden="true">#</a> SSL 协议</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>server <span class="token punctuation">{</span>
  listen 443 ssl;
  server_name yourdomain.com;
  ssl on;
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/privatekey.pem;
  ssl_stapling on;
  ssl_stapling_verify on;
  ssl_trusted_certificate /path/to/fullchain.pem;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_session_timeout 1h;
  ssl_session_cache shared<span class="token punctuation">:</span>SSL<span class="token punctuation">:</span>50m;
  add_header Strict<span class="token punctuation">-</span>Transport<span class="token punctuation">-</span>Security max<span class="token punctuation">-</span>age=15768000;
<span class="token punctuation">}</span>
<span class="token comment"># Permanent Redirect for HTTP to HTTPS</span>
server
<span class="token punctuation">{</span>
  listen 80;
  server_name yourdomain.com;
  return 301 https<span class="token punctuation">:</span>//$host$request_uri;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),u={href:"https://nginxconfig.io",target:"_blank",rel:"noopener noreferrer"};function p(v,m){const a=i("ExternalLinkIcon");return l(),t("div",null,[r,n("p",null,[s("其实可以采用可视化的方式对 Nginx 进行配置，我在 GitHub 上发现了一款可以一键生成 Nginx 配置的神器，相当给力。 先来看看它都支持什么功能的配置：反向代理、HTTPS、HTTP/2、IPv6, 缓存、WordPress、CDN、Node.js 支持、 Python (Django) 服务器等等。 "),n("a",u,[s("nginx 在线配置"),c(a)])])])}const h=e(o,[["render",p],["__file","nginx_setting.html.vue"]]);export{h as default};
