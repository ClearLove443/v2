import{_ as n,V as s,W as a,a0 as e}from"./framework-73d9479b.js";const t={},o=e(`<h1 id="docker-desktop-设置" tabindex="-1"><a class="header-anchor" href="#docker-desktop-设置" aria-hidden="true">#</a> docker desktop 设置</h1><p>Settings =&gt; Docker Engine</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;https://0hgxc31r.mirror.aliyuncs.com&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;https://docker.mirrors.ustc.edu.cn/&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;https://hub-mirror.c.163.com/&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;https://reg-mirror.qiniu.com&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;insecure-registries&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;debug&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;experimental&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;features&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;buildkit&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;builder&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;gc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;defaultKeepStorage&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20GB&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="vmmen-设置" tabindex="-1"><a class="header-anchor" href="#vmmen-设置" aria-hidden="true">#</a> Vmmen 设置</h1><p>C:\\Users&lt;username&gt; 利用新建 .wslconfig 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[wsl2]
memory=2GB
swap=0
localhostForwarding=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),p=[o];function i(r,c){return s(),a("div",null,p)}const u=n(t,[["render",i],["__file","jlMpUapWA.html.vue"]]);export{u as default};
