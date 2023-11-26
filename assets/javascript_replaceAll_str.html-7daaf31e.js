import{_ as s,V as a,W as n,a0 as e}from"./framework-b293865d.js";const t={},p=e(`<p>There’s no easy way to replace all string occurrences in JavaScript. Java, which had served an inspiration for JavaScript in the first days, has the replaceAll() method on strings since 1995!</p><p>In this post, you’ll learn how to replace all string occurrences in JavaScript by splitting and joining a string, and string.replace() combined with a global regular expression.</p><p>Moreover, you’ll read about the new proposal string.replaceAll() (at stage 4) that brings the replace all method to JavaScript strings. This is the most convenient approach.</p><h1 id="splitting-and-joining-an-array" tabindex="-1"><a class="header-anchor" href="#splitting-and-joining-an-array" aria-hidden="true">#</a> Splitting and joining an array</h1><p>If you google how to “replace all string occurrences in JavaScript”, most likely the first approach you’d find is to use an intermediate array.</p><p>Here’s how it works:</p><ul><li>Split the string into pieces by the search string:</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> pieces <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>search<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>Then join the pieces putting the replace string in between:</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> resultingString <span class="token operator">=</span> pieces<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>replace<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>For example, let’s replace all spaces &#39; &#39; with hyphens &#39;-&#39; in &#39;duck duck go&#39; string:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> search <span class="token operator">=</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> replaceWith <span class="token operator">=</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token string">&quot;duck duck go&quot;</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>search<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>replaceWith<span class="token punctuation">)</span><span class="token punctuation">;</span>
result<span class="token punctuation">;</span> <span class="token comment">// =&gt; &#39;duck-duck-go&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>&#39;duck duck go&#39;.split(&#39; &#39;)</code> splits the string into pieces: [&#39;duck&#39;, &#39;duck&#39;, &#39;go&#39;]. Then the pieces <code>[&#39;duck&#39;, &#39;duck&#39;, &#39;go&#39;].join(&#39;-&#39;)</code> are joined by inserting &#39;-&#39; in between them, which results in the string <code>&#39;duck-duck-go&#39;</code>.</p><p>Here’s a generalized helper function that uses splitting and joining approach:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token parameter">string<span class="token punctuation">,</span> search<span class="token punctuation">,</span> replace</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> string<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span>search<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>replace<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;abba&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;i&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// =&gt; &#39;ibbi&#39;</span>
<span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;go go go!&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;move&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// =&gt; &#39;move move move!&#39;</span>
<span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">&quot;oops&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;z&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;y&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// =&gt; &#39;oops&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This approach requires transforming the string into an array, and then back into a string. Let’s continue looking for better alternatives.</p><h1 id="replace-with-a-global-regular-expression" tabindex="-1"><a class="header-anchor" href="#replace-with-a-global-regular-expression" aria-hidden="true">#</a> replace() with a global regular expression</h1><p>The string method string.replace(regExpSearch, replaceWith) searches and replaces the occurrences of the regular expression regExpSearch with replaceWith string.</p><p>To make the method replace() replace all occurrences of the pattern you have to enable the global flag on the regular expression:</p><ul><li>Append g after at the end of regular expression literal: ·<code>/search/g</code></li><li>Or when using a regular expression constructor, add &#39;g&#39; to the second argument: <code>new RegExp(&#39;search&#39;, &#39;g&#39;)</code> Let’s replace all occurrences of &#39; &#39; with &#39;-&#39;:</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> searchRegExp <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\s</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> replaceWith <span class="token operator">=</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token string">&quot;duck duck go&quot;</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>searchRegExp<span class="token punctuation">,</span> replaceWith<span class="token punctuation">)</span><span class="token punctuation">;</span>
result<span class="token punctuation">;</span> <span class="token comment">// =&gt; &#39;duck-duck-go&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The regular expression literal <code>/\\s/g</code> (note the g global flag) matches the space &#39; &#39;.</p><p><code>&#39;duck duck go&#39;.replace(/\\s/g, &#39;-&#39;)</code> replaces all matches of <code>/\\s/g</code> with <code>&#39;-&#39;</code>, which results in <code>&#39;duck-duck-go&#39;</code>.</p><p>You can easily make case insensitive replaces by adding i flag to the regular expression:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> searchRegExp <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">duck</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gi</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> replaceWith <span class="token operator">=</span> <span class="token string">&quot;goose&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token string">&quot;DUCK Duck go&quot;</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>searchRegExp<span class="token punctuation">,</span> replaceWith<span class="token punctuation">)</span><span class="token punctuation">;</span>
result<span class="token punctuation">;</span> <span class="token comment">// =&gt; &#39;goose goose go&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The regular expression /duck/gi performs a global case-insensitive search (note i and g flags). <code>/duck/gi</code> matches &#39;DUCK&#39;, as well as &#39;Duck&#39;.</p><p>Invoking <code>&#39;DUCK Duck go&#39;.replace(/duck/gi, &#39;goose&#39;)</code> replaces all matches of <code>/duck/gi</code> substrings with <code>&#39;goose&#39;</code>.</p><h2 id="regular-expression-from-a-string" tabindex="-1"><a class="header-anchor" href="#regular-expression-from-a-string" aria-hidden="true">#</a> Regular expression from a string</h2><p>When the regular expression is created from a string, you have to escape the characters <code>- [ ] / { } ( ) * + ? . \\ ^ $ |</code> because they have special meaning within the regular expression.</p><p>Because of that, the special characters are a problem when you’d like to make replace all operation. Here’s an example:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> search <span class="token operator">=</span> <span class="token string">&quot;+&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> searchRegExp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span>search<span class="token punctuation">,</span> <span class="token string">&quot;g&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Throws SyntaxError</span>
<span class="token keyword">const</span> replaceWith <span class="token operator">=</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token string">&quot;5+2+1&quot;</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>searchRegExp<span class="token punctuation">,</span> replaceWith<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The above snippet tries to transform the search string <code>&#39;+&#39;</code> into a regular expression. But <code>&#39;+&#39;</code> is an invalid regular expression, thus SyntaxError: Invalid regular expression: <code>/+/</code>is thrown.</p><p>Escaping the character <code>&#39;\\\\+&#39;</code> solves the problem.</p><p>Nevertheless, does it worth escaping the search string using a function like escapeRegExp() to be used as a regular expression? Most likely not.</p><h2 id="replace-with-a-string" tabindex="-1"><a class="header-anchor" href="#replace-with-a-string" aria-hidden="true">#</a> replace() with a string</h2><p>If the first argument search of string.replace(search, replaceWith) is a string, then the method replaces only the first occurrence of search:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> search <span class="token operator">=</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> replace <span class="token operator">=</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token string">&quot;duck duck go&quot;</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>search<span class="token punctuation">,</span> replace<span class="token punctuation">)</span><span class="token punctuation">;</span>
result<span class="token punctuation">;</span> <span class="token comment">// =&gt; &#39;duck-duck go&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>&#39;duck duck go&#39;.replace(&#39; &#39;, &#39;-&#39;)</code> replaces only the first appearance of a space.</p><h1 id="replaceall-method" tabindex="-1"><a class="header-anchor" href="#replaceall-method" aria-hidden="true">#</a> replaceAll() method</h1><p>Finally, the method string.replaceAll(search, replaceWith) replaces all appearances of search string with replaceWith.</p><p>Let’s replace all occurrences of &#39; &#39; with &#39;-&#39;:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> search <span class="token operator">=</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> replaceWith <span class="token operator">=</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token string">&quot;duck duck go&quot;</span><span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span>search<span class="token punctuation">,</span> replaceWith<span class="token punctuation">)</span><span class="token punctuation">;</span>
result<span class="token punctuation">;</span> <span class="token comment">// =&gt; &#39;duck-duck-go&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>&#39;duck duck go&#39;.replaceAll(&#39; &#39;, &#39;-&#39;)</code> replaces all occurrences of &#39; &#39; string with &#39;-&#39;.</p><p>string.replaceAll(search, replaceWith) is the best way to replace all string occurrences in a string</p><p>Note that currently, the method support in browsers is limited, and you might require a polyfill.</p><h2 id="the-difference-between-replaceall-and-replace" tabindex="-1"><a class="header-anchor" href="#the-difference-between-replaceall-and-replace" aria-hidden="true">#</a> The difference between replaceAll() and replace()</h2><p>The string methods replaceAll(search, replaceWith) and replace(search, replaceWith) work the same way, expect 2 things:</p><p>If search argument is a string, replaceAll() replaces all occurrences of search with replaceWith, while replace() only the first occurence If search argument is a non-global regular expression, then replaceAll() throws a TypeError exception.</p><h1 id="key-takeaway" tabindex="-1"><a class="header-anchor" href="#key-takeaway" aria-hidden="true">#</a> Key takeaway</h1><p>The primitive approach to replace all occurrences is to split the string into chunks by the search string, the join back the string placing the replace string between chunks: <code>string.split(search).join(replaceWith)</code>. This approach works, but it’s hacky.</p><p>Another approach is to use string.replace(/SEARCH/g, replaceWith) with a regular expression having the global flag enabled.</p><p>Unfortunately, you cannot easily generate regular expressions from a string at runtime, because the special characters of regular expressions have to be escaped. And dealing with a regular expression for a simple replacement of strings is overwhelming.</p><p>Finally, the new string method string.replaceAll(search, replaceWith) replaces all string occurrences. The method is a proposal at stage 4, and hopefully, it will land in a new JavaScript standard pretty soon.</p><p>My recommendation is to use string.replaceAll() to replace strings.</p>`,54),c=[p];function o(r,i){return a(),n("div",null,c)}const u=s(t,[["render",o],["__file","javascript_replaceAll_str.html.vue"]]);export{u as default};