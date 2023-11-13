import{_ as n,V as s,W as a,a0 as t}from"./framework-bdfa852d.js";const p={},e=t(`<p>进行省市县三级联动的时候，需要把数据转换成指定类型的对象。 就需要对对象的解构。</p><h1 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h1><p>省市区联动，或者城市名称匹配，是很常用的功能。在实现他们的时候，经常会出现这样的情况：拿到的行政区划数据 和 渲染所需要的结构 不相符。通常我会用 JS 把它们处理成合适的结构。</p><h1 id="核心思路" tabindex="-1"><a class="header-anchor" href="#核心思路" aria-hidden="true">#</a> 核心思路</h1><p>遍历其子元素或属性，在遍历的回调函数中，通过临时对象，将数据重新组织成需要的结构，再将其 push 进一个新构建的数组中。遍历完成后，该数组就是想要的最后结果。</p><h1 id="两种套路-数组-vs-对象。" tabindex="-1"><a class="header-anchor" href="#两种套路-数组-vs-对象。" aria-hidden="true">#</a> 两种套路：数组 VS 对象。</h1><p>对于数组和对象，有不同的遍历方式。</p><ul><li><p>对于数组，视情况可用 map(), forEach()，filter()等方法；</p></li><li><p>对于对象，可以结合使用 for in 与 Object.keys() 来遍历其属性。</p></li></ul><blockquote><p>注：Object.keys()可以返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for…in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。</p></blockquote><h1 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h1><h1 id="_1、数组" tabindex="-1"><a class="header-anchor" href="#_1、数组" aria-hidden="true">#</a> 1、数组</h1><p>有组数据</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> data1 <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">provinceCode</span><span class="token operator">:</span> <span class="token string">&quot;33&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">provinceName</span><span class="token operator">:</span> <span class="token string">&quot;浙江省&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cityCode</span><span class="token operator">:</span> <span class="token string">&quot;3301&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cityName</span><span class="token operator">:</span> <span class="token string">&quot;杭州市&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">provinceCode</span><span class="token operator">:</span> <span class="token string">&quot;33&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">provinceName</span><span class="token operator">:</span> <span class="token string">&quot;浙江省&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cityCode</span><span class="token operator">:</span> <span class="token string">&quot;3302&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cityName</span><span class="token operator">:</span> <span class="token string">&quot;宁波市&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">provinceCode</span><span class="token operator">:</span> <span class="token string">&quot;33&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">provinceName</span><span class="token operator">:</span> <span class="token string">&quot;浙江省&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cityCode</span><span class="token operator">:</span> <span class="token string">&quot;3303&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">cityName</span><span class="token operator">:</span> <span class="token string">&quot;温州市&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要转换成<code>{provinceCode:&quot;&quot;,provinceName:&quot;&quot;,children:[]}</code>这种类型的模版。具体实现如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">formatdata</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>data<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 对象模版</span>
  <span class="token keyword">var</span> city <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">provinceCode</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">provinceName</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  city<span class="token punctuation">.</span>provinceCode <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>provinceCode<span class="token punctuation">;</span>
  city<span class="token punctuation">.</span>provinceName <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>provinceName<span class="token punctuation">;</span>
  <span class="token comment">// 方法一</span>
  <span class="token comment">// var children = [];</span>
  <span class="token comment">// data.forEach(i = &gt;{</span>
  <span class="token comment">// 	var {</span>
  <span class="token comment">// 		cityCode: cityCode,</span>
  <span class="token comment">// 		cityName: cityName</span>
  <span class="token comment">// 	} = i;</span>
  <span class="token comment">// 	children.push({</span>
  <span class="token comment">// 		cityCode: cityCode,</span>
  <span class="token comment">// 		cityName: cityName</span>
  <span class="token comment">// 	});</span>
  <span class="token comment">// }) city.children = children;</span>
  <span class="token comment">// 方法二：</span>
  city<span class="token punctuation">.</span>children <span class="token operator">=</span> data1<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> <span class="token punctuation">{</span> <span class="token literal-property property">cityCode</span><span class="token operator">:</span> cityCode<span class="token punctuation">,</span> <span class="token literal-property property">cityName</span><span class="token operator">:</span> cityName <span class="token punctuation">}</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">cityCode</span><span class="token operator">:</span> cityCode<span class="token punctuation">,</span>
      <span class="token literal-property property">cityName</span><span class="token operator">:</span> cityName<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> city_json <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>city<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 对像转换成json</span>
  <span class="token keyword">var</span> city2 <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>city_json<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// json 转换成对象</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>city_json<span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>city2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">formatdata</span><span class="token punctuation">(</span>data1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2、对象" tabindex="-1"><a class="header-anchor" href="#_2、对象" aria-hidden="true">#</a> 2、对象</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;fs&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> rawData <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">北京市</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">市辖区</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;东城区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;西城区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;朝阳区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;丰台区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;石景山区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;海淀区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;门头沟区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;房山区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;通州区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;顺义区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;昌平区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;大兴区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;怀柔区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;平谷区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;密云区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;延庆区&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">天津市</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">市辖区</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;和平区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;河东区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;河西区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;南开区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;河北区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;红桥区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;东丽区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;西青区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;津南区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;北辰区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;武清区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;宝坻区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;滨海新区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;宁河区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;静海区&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;蓟州区&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//目标结构</span>
<span class="token comment">// const options = [{</span>
<span class="token comment">//   value: &#39;浙江&#39;,</span>
<span class="token comment">//   label: &#39;浙江&#39;,</span>
<span class="token comment">//   children: [{</span>
<span class="token comment">//     value: &#39;hangzhou&#39;,</span>
<span class="token comment">//     label: &#39;Hangzhou&#39;,</span>
<span class="token comment">//     children: [{</span>
<span class="token comment">//       value: &#39;xihu&#39;,</span>
<span class="token comment">//       label: &#39;West Lake&#39;,</span>
<span class="token comment">//     }],</span>
<span class="token comment">//</span>
<span class="token comment">//   }]</span>
<span class="token comment">// }];</span>
<span class="token keyword">const</span> finalArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> prop <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>rawData<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> tempObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  tempObj<span class="token punctuation">.</span>label <span class="token operator">=</span> prop<span class="token punctuation">;</span>
  tempObj<span class="token punctuation">.</span>value <span class="token operator">=</span> prop<span class="token punctuation">;</span>
  tempObj<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> pr <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>rawData<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> tempTempObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    tempTempObj<span class="token punctuation">.</span>label <span class="token operator">=</span> pr<span class="token punctuation">;</span>
    tempTempObj<span class="token punctuation">.</span>value <span class="token operator">=</span> pr<span class="token punctuation">;</span>

    <span class="token keyword">let</span> tempTempArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">//最内层变成数组的了</span>
    rawData<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">[</span>pr<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> tempTempTempObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
      tempTempTempObj<span class="token punctuation">.</span>label <span class="token operator">=</span> item<span class="token punctuation">;</span>
      tempTempTempObj<span class="token punctuation">.</span>value <span class="token operator">=</span> item<span class="token punctuation">;</span>
      tempTempArr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tempTempTempObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    tempTempObj<span class="token punctuation">.</span>children <span class="token operator">=</span> tempTempArr<span class="token punctuation">;</span>
    tempObj<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tempTempObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  finalArr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tempObj<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>finalArr<span class="token punctuation">)</span><span class="token punctuation">;</span>

fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token string">&quot;temp.js&quot;</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>finalArr<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;The file has been saved!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>node test<span class="token punctuation">.</span>js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,19),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","javascript-zhong-shu-zu-zhuan-huan-cheng-zhi-ding-mo-ban.html.vue"]]);export{r as default};
