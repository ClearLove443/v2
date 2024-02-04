import{_ as n,V as s,W as a,a0 as e}from"./framework-74e9649d.js";const t={},p=e(`<div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">select</span> <span class="token punctuation">{</span>
  <span class="token comment">/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/</span>
  <span class="token property">border</span><span class="token punctuation">:</span> solid 1px #000<span class="token punctuation">;</span>

  <span class="token comment">/*很关键：将默认的select选择框样式清除*/</span>
  <span class="token property">appearance</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">-moz-appearance</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token property">-webkit-appearance</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>

  <span class="token comment">/*在选择框的最右侧中间显示小箭头图片*/</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&quot;http://ourjs.github.io/static/2015/arrow.png&quot;</span><span class="token punctuation">)</span></span> no-repeat
    scroll right center transparent<span class="token punctuation">;</span>

  <span class="token comment">/*为下拉小箭头留出一点位置，避免被文字覆盖*/</span>
  <span class="token property">padding-right</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>

  <span class="token comment">/*清除ie的默认选择框样式清除，隐藏下拉箭头*/</span>
  <span class="token selector">select::-ms-expand</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),c=[p];function i(l,o){return s(),a("div",null,c)}const r=n(t,[["render",i],["__file","css_EIm2DvbAz.html.vue"]]);export{r as default};
