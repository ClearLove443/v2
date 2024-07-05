import{_ as n,V as a,W as s,a0 as e}from"./framework-a97d3b5d.js";const t={},l=e(`<p>保持docker 的容器运行不停止，有以下几种方法</p><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2><ol><li>docker run</li></ol><p>使用pseudo-tty和detach选项（docker run命令上的-itd选项）来保持容器在Docker容器上运行，不会关闭。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>使用docker-compose</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">ubuntu</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">:</span>latest
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">stdin_open</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">tty</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>指定永不完成的任务</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">ubuntu</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">:</span>latest
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ubuntu
    <span class="token key atrule">command</span><span class="token punctuation">:</span> /bin/bash <span class="token punctuation">-</span>c &quot;while true; do sleep 30; done;&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>Dockerfile 指定</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM ubuntu:latest

CMD /bin/bash -c &quot;while true; do sleep 30; done;&quot;
# CMD exec /bin/bash -c &quot;while true; do sleep 30; done;&quot;
# CMD exec /bin/bash -c &quot;trap : TERM INT; sleep infinity &amp;amp; wait&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> ubuntu-test <span class="token builtin class-name">.</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> ubuntu-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">ubuntu</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> .
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="k8s" tabindex="-1"><a class="header-anchor" href="#k8s" aria-hidden="true">#</a> k8s</h2><ol><li>pod 指定CMD</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ubuntu
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ubuntu
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">:</span>latest
    <span class="token comment"># Just spin &amp;amp; wait forever</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--&quot;</span> <span class="token punctuation">]</span>
    <span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;while true; do sleep 30; done;&quot;</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>Dockerfile指定cmd</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM ubuntu:latest

CMD /bin/bash -c &quot;while true; do sleep 30; done;&quot;
# CMD exec /bin/bash -c &quot;while true; do sleep 30; done;&quot;
# CMD exec /bin/bash -c &quot;trap : TERM INT; sleep infinity &amp;amp; wait&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),i=[l];function u(c,p){return a(),s("div",null,i)}const d=n(t,[["render",u],["__file","docker_keep_pod_running.html.vue"]]);export{d as default};
