import{_ as n,V as a,W as s,a0 as e}from"./framework-73d9479b.js";const i={},c=e(`<h2 id="bin-bash-c-字符串方式" tabindex="-1"><a class="header-anchor" href="#bin-bash-c-字符串方式" aria-hidden="true">#</a> /bin/bash -c 字符串方式</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">prj1</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> .
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile.prj1
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">SERVER_LISTEN_URI</span><span class="token punctuation">:</span> <span class="token string">&quot;tcp://0.0.0.0:9000&quot;</span>
    <span class="token comment">#执行多条指令</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> /bin/bash <span class="token punctuation">-</span>c &quot;cp /app/dtest/config.default.yml /app/config.yml <span class="token important">&amp;&amp;</span> python <span class="token punctuation">-</span>u /app/dtest/tcc.py&quot;
    <span class="token comment">#目录映射</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ..<span class="token punctuation">:</span>/app
      <span class="token punctuation">-</span> ./tmp<span class="token punctuation">:</span>/var/tmp
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">command</span><span class="token punctuation">:</span> /bin/bash <span class="token punctuation">-</span>c &quot; while true; do sleep 1; done&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="bin-bash-c-配置文件方式" tabindex="-1"><a class="header-anchor" href="#bin-bash-c-配置文件方式" aria-hidden="true">#</a> /bin/bash -c 配置文件方式</h2><h3 id="串行运行" tabindex="-1"><a class="header-anchor" href="#串行运行" aria-hidden="true">#</a> 串行运行</h3><p>如果这几个命令是没有要求并行运行，则配置如下</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">command</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> sh
  <span class="token punctuation">-</span> <span class="token punctuation">-</span>c
  <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token scalar string">
    cmd1
    cmd2
    cmd3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上配置会按顺序执行 cmd1，之后再执行 cmd2，之后 cmd3。对于可以串行的命令，这样即可。</p><h3 id="并行运行" tabindex="-1"><a class="header-anchor" href="#并行运行" aria-hidden="true">#</a> 并行运行</h3><p>有时候想配置几个常驻脚本在 docker，希望这几个脚本一起跑起来（并行运行），上述 1 的办法就不行了。 Linux 把命令行扔后台运行的一个办法就是在后面加上 &amp;，</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">command</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> sh
  <span class="token punctuation">-</span> <span class="token punctuation">-</span>c
  <span class="token punctuation">-</span> <span class="token punctuation">|</span><span class="token scalar string">
    cmd1 &amp;
    cmd2 &amp;
    cmd3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),t=[c];function l(p,d){return a(),s("div",null,t)}const o=n(i,[["render",l],["__file","docker_compose_command.html.vue"]]);export{o as default};
