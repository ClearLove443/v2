import{_ as e,V as a,W as n,a0 as i}from"./framework-bdfa852d.js";const d={},s=i(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>Markdown 是一种纯文本格式的标记语言。通过简单的标记语法，它可以使普通文本内容具有一定的格式。 Markdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。 Markdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。 Markdown 编写的文档后缀为 .md, .markdown</p><h2 id="markdown-应用" tabindex="-1"><a class="header-anchor" href="#markdown-应用" aria-hidden="true">#</a> Markdown 应用</h2><p>Markdown 能被使用来撰写电子书，如：Gitbook。 当前许多网站都广泛使用 Markdown 来撰写帮助文档或是用于论坛上发表消息。例如：GitHub、简书、reddit、Diaspora、Stack Exchange、OpenStreetMap 、SourceForge 等。</p><h2 id="markdown-标题" tabindex="-1"><a class="header-anchor" href="#markdown-标题" aria-hidden="true">#</a> Markdown 标题</h2><h3 id="_1-使用-和-标记一级和二级标题" tabindex="-1"><a class="header-anchor" href="#_1-使用-和-标记一级和二级标题" aria-hidden="true">#</a> 1. 使用 = 和 - 标记一级和二级标题</h3><pre><code>我展示的是一级标题
=================
我展示的是二级标题
-----------------
</code></pre><p>效果如下： <img src="https://ClearLove443.github.io/post-images/1614412772893.jpg" alt="" loading="lazy"></p><h3 id="_2-使用-号标记" tabindex="-1"><a class="header-anchor" href="#_2-使用-号标记" aria-hidden="true">#</a> 2. 使用 # 号标记</h3><p>使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下： <img src="https://ClearLove443.github.io/post-images/1614412697511.gif" alt="" loading="lazy"></p><h2 id="markdown-段落" tabindex="-1"><a class="header-anchor" href="#markdown-段落" aria-hidden="true">#</a> Markdown 段落</h2><p>Markdown 段落没有特殊的格式，直接编写文字就好，段落的换行是使用两个以上空格加上回车。 当然也可以在段落后面使用一个空行来表示重新开始一个段落。</p><h3 id="字体" tabindex="-1"><a class="header-anchor" href="#字体" aria-hidden="true">#</a> 字体</h3><p>Markdown 可以使用以下几种字体：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>*斜体文本*
_斜体文本_
**粗体文本**
__粗体文本__
***粗斜体文本***
___粗斜体文本___
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如下： <em>斜体文本</em><em>斜体文本</em><strong>粗体文本</strong><strong>粗体文本</strong><strong><em>粗斜体文本</em></strong><strong><em>粗斜体文本</em></strong></p><h3 id="分隔线" tabindex="-1"><a class="header-anchor" href="#分隔线" aria-hidden="true">#</a> 分隔线</h3><p>你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>***

* * *

*****

- - -

----------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除线" tabindex="-1"><a class="header-anchor" href="#删除线" aria-hidden="true">#</a> 删除线</h3><p>如果段落上的文字要添加删除线，只需要在文字的两端加上两个波浪线 *~~ 即可</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>~~BAIDU.COM~~
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="下划线" tabindex="-1"><a class="header-anchor" href="#下划线" aria-hidden="true">#</a> 下划线</h3><p>下划线可以通过 HTML 的 u 标签来实现：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;u&gt;带下划线文本&lt;/u&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="脚注" tabindex="-1"><a class="header-anchor" href="#脚注" aria-hidden="true">#</a> 脚注</h3><p>脚注是对文本的补充说明。 Markdown 脚注的格式如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[^要注明的文本]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="markdown-列表" tabindex="-1"><a class="header-anchor" href="#markdown-列表" aria-hidden="true">#</a> Markdown 列表</h2><p>Markdown 支持有序列表和无序列表。</p><p>无序列表使用星号(*)、加号(+)或是减号(-)作为列表标记，这些标记后面要添加一个空格，然后再填写内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项


- 第一项
- 第二项
- 第三项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示效果如下：</p><ul><li>第一项</li><li>第二项</li><li>第三项</li></ul><ul><li>第一项</li><li>第二项</li><li>第三项</li></ul><ul><li>第一项</li><li>第二项</li><li>第三项</li></ul><p>有序列表使用数字并加上 . 号来表示，如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 第一项
2. 第二项
3. 第三项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示效果如下:</p><ol><li>第一项</li><li>第二项</li><li>第三项</li></ol><h3 id="列表嵌套" tabindex="-1"><a class="header-anchor" href="#列表嵌套" aria-hidden="true">#</a> 列表嵌套</h3><p>列表嵌套只需在子列表中的选项前面添加四个空格即可：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示效果如下:</p><ol><li>第一项： <ul><li>第一项嵌套的第一个元素</li><li>第一项嵌套的第二个元素</li></ul></li><li>第二项： <ul><li>第二项嵌套的第一个元素</li><li>第二项嵌套的第二个元素</li></ul></li></ol><h2 id="markdown-区块" tabindex="-1"><a class="header-anchor" href="#markdown-区块" aria-hidden="true">#</a> Markdown 区块</h2><p>Markdown 区块引用是在段落开头使用 &gt; 符号 ，然后后面紧跟一个空格符号：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; 区块引用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示效果如下：</p><blockquote><p>区块引用</p></blockquote><p>另外区块是可以嵌套的，一个 &gt; 符号是最外层，两个 &gt; 符号是第一层嵌套，以此类推：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; 最外层
&gt; &gt; 第一层嵌套
&gt; &gt; &gt; 第二层嵌套
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示效果如下：</p><blockquote><p>最外层</p><blockquote><p>第一层嵌套</p><blockquote><p>第二层嵌套</p></blockquote></blockquote></blockquote><p>区块中使用列表 区块中使用列表实例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt; 区块中使用列表
&gt; 1. 第一项
&gt; 2. 第二项
&gt; + 第一项
&gt; + 第二项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示效果如下：</p><blockquote><p>区块中使用列表</p><ol><li>第一项</li><li>第二项</li></ol><ul><li>第一项</li><li>第二项</li></ul></blockquote><p>列表中使用区块 如果要在列表项目内放进区块，那么就需要在 &gt; 前添加四个空格的缩进。 列表中使用区块实例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>* 第一项
    &gt; 菜鸟教程
* 第二项
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显示效果如下：</p><ul><li>第一项 <blockquote><p>菜鸟教程</p></blockquote></li><li>第二项</li></ul><h2 id="超链接" tabindex="-1"><a class="header-anchor" href="#超链接" aria-hidden="true">#</a> 超链接</h2><p>语法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[超链接名](超链接地址 &quot;超链接title&quot;)
title可加可不加
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[简书](http://jianshu.com)
[百度](http://baidu.com)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注：Markdown 本身语法不支持链接在新页面中打开，貌似简书做了处理，是可以的。别的平台可能就不行了，如果想要在新页面中打开的话可以用 html 语言的 a 标签代替。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;a href=&quot;超链接地址&quot; target=&quot;_blank&quot;&gt;超链接名&lt;/a&gt;
示例
&lt;a href=&quot;https://www.jianshu.com/u/1f5ac0cf6a8b&quot; target=&quot;_blank&quot;&gt;简书&lt;/a&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="表格" tabindex="-1"><a class="header-anchor" href="#表格" aria-hidden="true">#</a> 表格</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>|表头|表头|表头|
|:---|:--:|---:|
|内容|内容|内容|
|内容|内容|内容|

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实例如下：</p><table><thead><tr><th style="text-align:left;">左对齐</th><th style="text-align:right;">右对齐</th><th style="text-align:center;">居中对齐</th></tr></thead><tbody><tr><td style="text-align:left;">单元格</td><td style="text-align:right;">单元格</td><td style="text-align:center;">单元格</td></tr><tr><td style="text-align:left;">单元格</td><td style="text-align:right;">单元格</td><td style="text-align:center;">单元格</td></tr></tbody></table><p>表格内手动换行 使用 HTML <code>&lt;br&gt;</code> 标签，在本行末尾输入<code>&lt;br&gt;</code></p><h2 id="markdown-代码" tabindex="-1"><a class="header-anchor" href="#markdown-代码" aria-hidden="true">#</a> Markdown 代码</h2><p>单行代码：代码之间分别用一个反引号包起来</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`printf()\` 函数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显示效果如下： <code>printf()</code> 函数</p><h3 id="代码区块" tabindex="-1"><a class="header-anchor" href="#代码区块" aria-hidden="true">#</a> 代码区块</h3><p>用 \`\`\` 包裹一段代码，并指定一种语言（也可以不指定）：</p><p>实例如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ready</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&quot;RUNOOB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,84),l=[s];function t(r,c){return a(),n("div",null,l)}const o=e(d,[["render",t],["__file","markdown-basic-grammar.html.vue"]]);export{o as default};
