import{_ as n,V as s,W as a,a0 as e}from"./framework-bdfa852d.js";const t={},p=e(`<h1 id="水平居中" tabindex="-1"><a class="header-anchor" href="#水平居中" aria-hidden="true">#</a> 水平居中</h1><h2 id="水平居中可分为行内元素水平居中和块级元素水平居中" tabindex="-1"><a class="header-anchor" href="#水平居中可分为行内元素水平居中和块级元素水平居中" aria-hidden="true">#</a> 水平居中可分为行内元素水平居中和块级元素水平居中</h2><ol><li>行内元素水平居中 这里行内元素是指文本 text、图像 img、按钮超链接等，只需给父元素设置 text-align:center 即可实现。</li></ol><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.center</span><span class="token punctuation">{</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span>center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;div class=<span class="token string">&quot;center&quot;</span>&gt;水平居中&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>块级元素水平居中</li></ol><ul><li>定宽块级元素水平居中 只需给需要居中的块级元素加 margin:0 auto 即可，但这里需要注意的是，这里块状元素的宽度 width 值一定要有</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.center</span><span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span>0 auto<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span>1px solid red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  &lt;div class=<span class="token string">&quot;center&quot;</span>&gt;水平居中&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>不定宽块级元素水平居中</li></ul><p>不定宽，即块级元素宽度不固定</p><p>方法 1：设置 table 通过给要居中显示的元素，设置 display:table，然后设置 margin:0 auto 来实现</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.center</span><span class="token punctuation">{</span>
     <span class="token property">display</span><span class="token punctuation">:</span>table<span class="token punctuation">;</span>
     <span class="token property">margin</span><span class="token punctuation">:</span>0 auto<span class="token punctuation">;</span>
     <span class="token property">border</span><span class="token punctuation">:</span>1px solid red<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 &lt;div class=<span class="token string">&quot;center&quot;</span>&gt;水平居中&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法 2：设置 inline-block（多个块状元素） 子元素设置 inline-block，同时父元素设置 text-align:center</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.center</span><span class="token punctuation">{</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span>center<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.inlineblock-div</span><span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span>inline-block<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  &lt;div class=<span class="token string">&quot;center&quot;</span>&gt;
      &lt;div class=<span class="token string">&quot;inlineblock-div&quot;</span>&gt;1&lt;/div&gt;
      &lt;div class=<span class="token string">&quot;inlineblock-div&quot;</span>&gt;2&lt;/div&gt;
  &lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法 3：设置 flex 布局 只需把要处理的块状元素的父元素设置 display:flex,justify-content:center;</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.center</span><span class="token punctuation">{</span>
      <span class="token property">display</span><span class="token punctuation">:</span>flex<span class="token punctuation">;</span>
      <span class="token property">justify-content</span><span class="token punctuation">:</span>center<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  &lt;div class=<span class="token string">&quot;center&quot;</span>&gt;
      &lt;div class=<span class="token string">&quot;flex-div&quot;</span>&gt;1&lt;/div&gt;
      &lt;div class=<span class="token string">&quot;flex-div&quot;</span>&gt;2&lt;/div&gt;
  &lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法 4：position + 负 margin； 方法 5：position + margin：auto； 方法 6：position + transform；</p><p>注：这里方法 4、5、6 同下面垂直居中一样的道理，只不过需要把 top/bottom 改为 left/right，在垂直居中部分会详细讲述。</p><h1 id="垂直居中" tabindex="-1"><a class="header-anchor" href="#垂直居中" aria-hidden="true">#</a> 垂直居中</h1><h2 id="单行文本垂直居中" tabindex="-1"><a class="header-anchor" href="#单行文本垂直居中" aria-hidden="true">#</a> 单行文本垂直居中</h2><ul><li>设置 paddingtop=paddingbottom；或</li><li>设置 line-height=height； <h2 id="多行文本垂直居中" tabindex="-1"><a class="header-anchor" href="#多行文本垂直居中" aria-hidden="true">#</a> 多行文本垂直居中</h2> 通过设置父元素 table，子元素 table-cell 和 vertical-align vertical-align:middle 的意思是把元素放在父元素的中部</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.center</span><span class="token punctuation">{</span>
	<span class="token property">width</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>
	<span class="token property">height</span><span class="token punctuation">:</span>300px<span class="token punctuation">;</span>
	<span class="token property">display</span><span class="token punctuation">:</span>table<span class="token punctuation">;</span>
	<span class="token property">border</span><span class="token punctuation">:</span> 2px solid blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.table-div</span><span class="token punctuation">{</span>
	<span class="token property">display</span><span class="token punctuation">:</span>table-cell<span class="token punctuation">;</span>
	<span class="token property">verticaL-aLign</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
	<span class="token property">border</span><span class="token punctuation">:</span>IJX solid red<span class="token punctuation">;</span>
<span class="token punctuation">)</span>
&lt;div class=<span class="token string">&quot;center&quot;</span>&gt;
	&lt;div class=&quot;table-div”&gt;多行文本垂直居中〈/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="块级元素垂直居中" tabindex="-1"><a class="header-anchor" href="#块级元素垂直居中" aria-hidden="true">#</a> 块级元素垂直居中</h2><p>flex 布局</p><p>在需要垂直居中的父元素上，设置 display:flex 和 align-items：center 要求：父元素必须显示设置 height 值</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.center</span><span class="token punctuation">{</span>
	<span class="token property">width</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>
	<span class="token property">height</span><span class="token punctuation">:</span>300px<span class="token punctuation">;</span>
	<span class="token property">display</span><span class="token punctuation">:</span>flex<span class="token punctuation">;</span>
	align-items：center
<span class="token punctuation">}</span>
&lt;div class=<span class="token string">&quot;center&quot;</span>&gt;
	&lt;div&gt;垂直居中〈/div&gt;
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="水平垂直居中" tabindex="-1"><a class="header-anchor" href="#水平垂直居中" aria-hidden="true">#</a> 水平垂直居中</h2><ul><li>方法 1：flex 布局</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> //子元素水平居中
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> //子元素垂直居中
  <span class="token comment">/* aa只要三句话就可以实现不定宽高水平垂直居中。 */</span>
<span class="token punctuation">}</span>
<span class="token selector">.box &gt; div</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方法 2：绝对定位+margin:auto</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>

  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方法 3：绝对定位+负 margin</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>

  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> -100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方法 4：绝对定位+transform</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>

  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span> <span class="token comment">/* 定位父级的50% */</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/*自己的50% */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>方法 5：table-cell 实现居中</li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>
设置
<span class="token property">display</span><span class="token punctuation">:</span>table-cell<span class="token punctuation">;</span>
<span class="token property">text-align</span><span class="token punctuation">:</span>center<span class="token punctuation">;</span>
<span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),i=[p];function l(c,o){return s(),a("div",null,i)}const d=n(t,[["render",l],["__file","css_koXAnwdaZ.html.vue"]]);export{d as default};
