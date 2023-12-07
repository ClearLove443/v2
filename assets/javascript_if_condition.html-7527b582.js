import{_ as i,V as e,W as n,a0 as l}from"./framework-73d9479b.js";const a={},d=l(`<p>if(condition){} 中，有以下几种类型会被判定为假值：</p><ul><li>null</li><li>undefined</li><li>0</li><li>&quot;&quot;</li><li>false</li><li>void 0</li><li>NaN</li></ul><p>如果一个变量是没有声明的是不能直接判断的，比如下面的判断会报错。</p><div class="language-javaScript line-numbers-mode" data-ext="javaScript"><pre class="language-javaScript"><code>// 在全局域，非方法内
if(a) {
    console.log(1)
} else {
    console.log(2)
}
// 会报错，因为a没有声明不能直接调用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是如果一个变量已经声明过（不管变量是否被赋值过），比如在一个方法内</p><div class="language-javaScript line-numbers-mode" data-ext="javaScript"><pre class="language-javaScript"><code>if(typeof a !== &#39;undefined&#39; &amp;&amp; a !== null) {
    console.log(1)
} else {
    console.log(2)
}
// 是不是要判断空值（比如false， &#39;&#39;, NaN这些的），要看楼主的需求
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者这样的</p><div class="language-javaScript line-numbers-mode" data-ext="javaScript"><pre class="language-javaScript"><code>var a;
if(a) {
    console.log(1)
} else {
    console.log(2)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候是没有问题的</p><p>PS：基本上不存在 a == undefined 这样的判断，如果是未声明的 undefined， 这样判断会报错， 换成 typeof a == &#39;undefined&#39;。如果是对象的属性，直接调用确实是 undefinde， 但也不会 obj.a == undefinded 判断，而是直接判断 null，或判断空值就行 if (obj.a == null) 或 if (obj.a), 注意是两等号，会自动类型转换，不能三个等。</p>`,10),s=[d];function c(v,r){return e(),n("div",null,s)}const u=i(a,[["render",c],["__file","javascript_if_condition.html.vue"]]);export{u as default};
