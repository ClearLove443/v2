import{_ as e,V as s,W as a,a0 as n}from"./framework-bdfa852d.js";const l={},i=n(`<ol><li>使用 cat 命令情况，命令如下：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /dev/null <span class="token operator">&gt;</span> file_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>使用 vi/vim 命令打开文件后，输入&quot;%d&quot;清空，后保存即可。但当文件内容较大时，处理较慢，命令如下：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> file_name
:%d
:wq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>使用 echo 命令清空，此时会在文件中写入一个空行“\\n&quot;，命令如下：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span><span class="token operator">&gt;</span>file_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>推荐使用 cat 命令。</p>`,7),t=[i];function c(o,d){return s(),a("div",null,t)}const u=e(l,[["render",c],["__file","linux_empty_file_contents.html.vue"]]);export{u as default};