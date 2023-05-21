import{_ as n,V as s,W as a,a0 as e}from"./framework-8e76daeb.js";const i={},t=e(`<h2 id="创建或修改-etc-docker-daemon-json-文件-并写入以下内容" tabindex="-1"><a class="header-anchor" href="#创建或修改-etc-docker-daemon-json-文件-并写入以下内容" aria-hidden="true">#</a> 创建或修改 /etc/docker/daemon.json 文件，并写入以下内容：</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/docker/daemon.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;https://0hgxc31r.mirror.aliyuncs.com&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;https://docker.mirrors.ustc.edu.cn/&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;https://hub-mirror.c.163.com/&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;https://reg-mirror.qiniu.com&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;https://mirror.ccs.tencentyun.com&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;insecure-registries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;http://192.168.2.10:5000&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;http://192.168.50.28:8082&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;http://192.168.50.28:8081&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;http://192.168.50.28:5000&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="依次执行以下命令-重新启动-docker-服务。" tabindex="-1"><a class="header-anchor" href="#依次执行以下命令-重新启动-docker-服务。" aria-hidden="true">#</a> 依次执行以下命令，重新启动 Docker 服务。</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl daemon-reload
<span class="token function">service</span> <span class="token function">docker</span> restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检查是否生效" tabindex="-1"><a class="header-anchor" href="#检查是否生效" aria-hidden="true">#</a> 检查是否生效</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="在返回信息最底下有如下信息则表示成功" tabindex="-1"><a class="header-anchor" href="#在返回信息最底下有如下信息则表示成功" aria-hidden="true">#</a> 在返回信息最底下有如下信息则表示成功</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Registry Mirrors:
   https://0hgxc31r.mirror.aliyuncs.com
   https://docker.mirrors.ustc.edu.cn/
   https://hub-mirror.c.163.com/
   https://reg-mirror.qiniu.com
   https://mirror.ccs.tencentyun.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),r=[t];function c(o,d){return s(),a("div",null,r)}const u=n(i,[["render",c],["__file","docker_trDOVg3Zk.html.vue"]]);export{u as default};
