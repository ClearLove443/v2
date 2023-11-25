import{_ as n,V as e,W as s,a0 as a}from"./framework-b293865d.js";const c={},t=a(`<h1 id="传输文件到-docker-容器" tabindex="-1"><a class="header-anchor" href="#传输文件到-docker-容器" aria-hidden="true">#</a> 传输文件到 docker 容器</h1><p>首先需要知道 docker 容器的 container_id ,可以使用 docker ps 命令来查看你要操作的 docker 容器的 container_id</p><p>Docker 容器向宿主机传送文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 格式:</span>

<span class="token function">docker</span> <span class="token function">cp</span> container_id:<span class="token operator">&lt;</span>docker容器内的路径<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>本地保存文件的路径<span class="token operator">&gt;</span>

<span class="token comment"># 比如:</span>

<span class="token function">docker</span> <span class="token function">cp</span> 10704c9eb7bb:/root/test.text /home/vagrant/test.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="宿主机向-docker-容器传送文件" tabindex="-1"><a class="header-anchor" href="#宿主机向-docker-容器传送文件" aria-hidden="true">#</a> 宿主机向 docker 容器传送文件</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 格式:</span>

<span class="token function">docker</span> <span class="token function">cp</span> 本地文件的路径 container_id:<span class="token operator">&lt;</span>docker容器内的路径<span class="token operator">&gt;</span>
<span class="token comment"># 比如:</span>

<span class="token function">docker</span> <span class="token function">cp</span>  /home/vagrant/test.txt 10704c9eb7bb:/root/test.text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[t];function i(d,r){return e(),s("div",null,o)}const p=n(c,[["render",i],["__file","send_file_to_docker.html.vue"]]);export{p as default};
