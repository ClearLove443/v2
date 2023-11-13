import{_ as a,V as e,W as n,a0 as s}from"./framework-bdfa852d.js";const o={},t=s(`<p>the async pipes return signature is something like <code>&lt;T&gt;(input$: Observable&lt;T&gt;: T | null</code> always, because it returns null to the template while it&#39;s awaiting a response from an asynchronous call.</p><h1 id="you-can-do-what-you-ve-done-and-allow-null-or-if-you-know-it-will-never-be-null-use-a-non-null-assertion-operator" tabindex="-1"><a class="header-anchor" href="#you-can-do-what-you-ve-done-and-allow-null-or-if-you-know-it-will-never-be-null-use-a-non-null-assertion-operator" aria-hidden="true">#</a> you can do what you&#39;ve done and allow null, or if you know it will never be null, use a non null assertion operator:</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>loaded<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;(loaded$ | async)!&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="or-disable-type-checking-here" tabindex="-1"><a class="header-anchor" href="#or-disable-type-checking-here" aria-hidden="true">#</a> or disable type checking here:</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>loaded<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;$any(loaded$ | async)&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="or-for-this-particular-case-you-could-probably-do-something-like-this" tabindex="-1"><a class="header-anchor" href="#or-for-this-particular-case-you-could-probably-do-something-like-this" aria-hidden="true">#</a> or for this particular case you could probably do something like this:</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>loaded<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;(loaded$ | async) || false&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,7),l=[t];function i(r,c){return e(),n("div",null,l)}const u=a(o,[["render",i],["__file","angular_l6MzUAMd7.html.vue"]]);export{u as default};