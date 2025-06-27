import{_ as s,V as a,W as t,a0 as p}from"./framework-7c77a285.js";const e={};function o(i,n){return a(),t("div",null,n[0]||(n[0]=[p(`<ul><li>有时需要同时运行多个不同的批处理文件，可以使用多线程方式来实现。</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">import</span> threading

reports <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;4&#39;</span><span class="token punctuation">]</span> <span class="token comment"># 批处理文件名</span>
filepath <span class="token operator">=</span> <span class="token string">&#39;**&#39;</span> <span class="token comment"># 批处理文件路径</span>


<span class="token keyword">def</span> <span class="token function">run_bat</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># 定义运行python文件函数</span>
    os<span class="token punctuation">.</span>system<span class="token punctuation">(</span>filepath <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">&#39;.bat&#39;</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>  <span class="token comment"># 多线程运行python文件</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> reports<span class="token punctuation">:</span>
        task <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>run_bat<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token punctuation">)</span><span class="token punctuation">)</span>
        task<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)]))}const l=s(e,[["render",o],["__file","python_running_batch_files_with_multiple_threads.html.vue"]]);export{l as default};
