import{_ as s,D as t,V as d,W as r,a0 as a,Y as l,Z as e,$ as o}from"./framework-e0f7ab62.js";const p={},h={href:"https://caniuse.com/?search=inline-list-item",target:"_blank",rel:"noopener noreferrer"};function c(y,i){const n=t("ExternalLinkIcon");return d(),r("div",null,[i[3]||(i[3]=a(`<h1 id="display-的所有属性" tabindex="-1"><a class="header-anchor" href="#display-的所有属性" aria-hidden="true">#</a> display 的所有属性</h1><pre><code>/* CSS 1 */
display: none;
display: inline;
display: block;
display: list-item;

/* CSS 2.1 */
display: inline-block;

display: table;
display: inline-table;
display: table-cell;
display: table-column;
display: table-column-group;
display: table-footer-group;
display: table-header-group;
display: table-row;
display: table-row-group;
display: table-caption;
/* CSS 2.1 */

/* CSS 3 */
display: inline-list-item;
display: flex;
display: box;
display: inline-flex;

display: grid;
display: inline-grid;

display: ruby;
display: ruby-base;
display: ruby-text;
display: ruby-base-container;
display: ruby-text-container;
/* CSS 3 */

/* Experimental values */
display: contents;
display: run-in;
/* Experimental values */

/* Global values */
display: inherit;
display: initial;
display: unset;
</code></pre><p>下面就 display 的重要属性进行讲解，并配合一些相关的例子</p><h1 id="基本属性" tabindex="-1"><a class="header-anchor" href="#基本属性" aria-hidden="true">#</a> 基本属性</h1><h2 id="display-none" tabindex="-1"><a class="header-anchor" href="#display-none" aria-hidden="true">#</a> <strong>display: none</strong></h2><p>none 是 CSS 1 就提出来的属性，将元素设置为 none 的时候既不会占据空间，也无法显示，相当于该元素不存在。 该属性可以用来改善重排与重绘，同时我也经常用它来做模态窗等效果。</p><h2 id="display-inline" tabindex="-1"><a class="header-anchor" href="#display-inline" aria-hidden="true">#</a> <strong>display: inline</strong></h2><p>inline 也是 CSS 1 提出的属性，它主要用来设置行内元素属性，设置了该属性之后设置高度、宽度都无效，同时 text-align 属性设置也无效，但是设置了 line-height 会让 inline 元素居中</p><h2 id="display-block" tabindex="-1"><a class="header-anchor" href="#display-block" aria-hidden="true">#</a> <strong>display: block</strong></h2><p>设置元素为块状元素，如果不指定宽高，默认会继承父元素的宽度，并且独占一行，即使宽度有剩余也会独占一行，高度一般以子元素撑开的高度为准，当然也可以自己设置宽度和高度。</p><h2 id="display-list-item" tabindex="-1"><a class="header-anchor" href="#display-list-item" aria-hidden="true">#</a> <strong>display: list-item</strong></h2><p>此属性默认会把元素作为列表显示，要完全模仿列表的话还需要加上 <code>list-style-position，list-style-type</code></p><h2 id="display-inline-block" tabindex="-1"><a class="header-anchor" href="#display-inline-block" aria-hidden="true">#</a> <strong>display: inline-block</strong></h2><p><code>inline-block</code>为 CSS 2.1 新增的属性。 <code>inline-block</code>既具有 block 的宽高特性又具有 inline 的同行元素特性。 通过<code>inline-block</code>结合<code>text-align: justify</code> 还可以实现固定宽高的列表两端对齐布局</p><h2 id="display-table" tabindex="-1"><a class="header-anchor" href="#display-table" aria-hidden="true">#</a> <strong>display: table</strong></h2><p>table 此元素会作为块级表格来显示（类似 table），表格前后带有换行符。CSS 表格能够解决所有那些我们在使用绝对定位和浮动定位进行多列布局时所遇到的问题。例如，<code>display:table</code>的 CSS 声明能够让一个 HTML 元素和它的子节点像 table 元素一样。使用基于表格的 CSS 布局，使我们能够轻松定义一个单元格的边界、背景等样式， 而不会产生因为使用了 table 那样的制表标签所导致的语义化问题。</p><p>利用 table 的特性，我们能够轻易的实现三栏布局，并且能够兼容 IE8</p><h2 id="display-inline-list-item" tabindex="-1"><a class="header-anchor" href="#display-inline-list-item" aria-hidden="true">#</a> <strong>display: inline-list-item</strong></h2>`,18)),l("p",null,[i[1]||(i[1]=e("我在 MDN 上面看到有这个属性，但是我实际尝试发现这个属性是不能使用的，在 ",-1)),l("a",h,[i[0]||(i[0]=e("caniuse",-1)),o(n)]),i[2]||(i[2]=e(" 上面也没有找到这个元素的兼容性，所以应该是不能使用的，支持度全无。",-1))]),i[4]||(i[4]=a('<h2 id="display-flex" tabindex="-1"><a class="header-anchor" href="#display-flex" aria-hidden="true">#</a> <strong>display: flex</strong></h2><p>flex 是一种弹性布局属性 <strong>注意，设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。</strong> 主要属性有两大类：容器属性和项目的属性</p><h3 id="容器属性" tabindex="-1"><a class="header-anchor" href="#容器属性" aria-hidden="true">#</a> 容器属性</h3><ul><li>flex-direction: 属性决定主轴的方向（即项目的排列方向）。</li><li>flex-wrap: 默认情况下，项目都排在一条线（又称&quot;轴线&quot;）上。flex-wrap 属性定义，如果一条轴线排不下，如何换行。</li><li>flex-flow: 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。</li><li>justify-content: 属性定义了项目在主轴上的对齐方式。</li><li>align-items: 属性定义项目在交叉轴上如何对齐。</li><li>align-content: 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</li></ul><h3 id="项目属性" tabindex="-1"><a class="header-anchor" href="#项目属性" aria-hidden="true">#</a> 项目属性</h3><ul><li>order: 定义项目的排列顺序。数值越小，排列越靠前，默认为 0。</li><li>flex-grow: 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。</li><li>flex-shrink: 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。</li><li>flex-basis: 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。</li><li>flex: 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。</li><li>align-self: 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。</li></ul><h2 id="display-webkit-box" tabindex="-1"><a class="header-anchor" href="#display-webkit-box" aria-hidden="true">#</a> <strong>display: -webkit-box</strong></h2><p>由于某 X5 浏览器某些版本还不支持最新版的 flex 布局，所以为了保证良好的运行，建议还是使用 display: box，box 和 flex 布局的主要差别如下:</p><h3 id="容器属性-1" tabindex="-1"><a class="header-anchor" href="#容器属性-1" aria-hidden="true">#</a> 容器属性</h3><ul><li>display: box 该显示样式的新值可将此元素及其直系子代加入弹性框模型中。Flexbox 模型只适用于直系子代。</li><li>box-orient 值：horizontal | vertical | inherit 框的子代是如何排列的？还有两个值：inline-axis（真正的默认值）和 block-axis，但是它们分别映射到水平和垂直方向。</li><li>box-pack 值：start | end | center | justify 设置沿 box-orient 轴的框排列方式。因此，如果 box-orient 是水平方向，就会选择框的子代的水平排列方式，反之亦然。</li><li>box-align 值：start | end | center | baseline | stretch 基本上而言是 box-pack 的同级属性。设置框的子代在框中的排列方式。如果方向是水平的，该属性就会决定垂直排列，反之亦然。</li></ul><h3 id="项目属性-1" tabindex="-1"><a class="header-anchor" href="#项目属性-1" aria-hidden="true">#</a> 项目属性</h3><ul><li>box-flex 值：0 | 任意整数 该子代的弹性比。弹性比为 1 的子代占据父代框的空间是弹性比为 2 的同级属性的两倍。其默认值为 0，也就是不具有弹性</li></ul>',12))])}const x=s(p,[["render",c],["__file","css-display-shu-xing-xiang-jie.html.vue"]]);export{x as default};
