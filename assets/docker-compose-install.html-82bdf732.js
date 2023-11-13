import{_ as a,V as s,W as e,a0 as n}from"./framework-bdfa852d.js";const t={},i=n(`<h2 id="finds-the-latest-version" tabindex="-1"><a class="header-anchor" href="#finds-the-latest-version" aria-hidden="true">#</a> Finds the latest version</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">compose_version</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> <span class="token parameter variable">-o</span> /dev/null <span class="token parameter variable">-w</span> <span class="token string">&quot;%{url_effective}&quot;</span> https://github.com/docker/compose/releases/latest <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">basename</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="downloads-the-binary-to-the-plugins-folder" tabindex="-1"><a class="header-anchor" href="#downloads-the-binary-to-the-plugins-folder" aria-hidden="true">#</a> Downloads the binary to the plugins folder</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-fL</span> --create-dirs <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose <span class="token punctuation">\\</span>
    <span class="token string">&quot;https://github.com/docker/compose/releases/download/<span class="token variable">\${compose_version}</span>/docker-compose-linux-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="assigns-execution-permission-to-it" tabindex="-1"><a class="header-anchor" href="#assigns-execution-permission-to-it" aria-hidden="true">#</a> Assigns execution permission to it</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="test-the-installation" tabindex="-1"><a class="header-anchor" href="#test-the-installation" aria-hidden="true">#</a> Test the installation</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8),o=[i];function l(r,c){return s(),e("div",null,o)}const p=a(t,[["render",l],["__file","docker-compose-install.html.vue"]]);export{p as default};