---
title: "CSS display 属性详解"
date: 2021-05-15 10:49:56
tag: [css, display]
category: front-end-css
published: true
hideInList: false
feature:
isTop: false
---

# display 的所有属性

    /* CSS 1 */
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

下面就 display 的重要属性进行讲解，并配合一些相关的例子

# 基本属性

## **display: none**

none 是 CSS 1 就提出来的属性，将元素设置为 none 的时候既不会占据空间，也无法显示，相当于该元素不存在。
该属性可以用来改善重排与重绘，同时我也经常用它来做模态窗等效果。

## **display: inline**

inline 也是 CSS 1 提出的属性，它主要用来设置行内元素属性，设置了该属性之后设置高度、宽度都无效，同时 text-align 属性设置也无效，但是设置了 line-height 会让 inline 元素居中

## **display: block**

设置元素为块状元素，如果不指定宽高，默认会继承父元素的宽度，并且独占一行，即使宽度有剩余也会独占一行，高度一般以子元素撑开的高度为准，当然也可以自己设置宽度和高度。

## **display: list-item**

此属性默认会把元素作为列表显示，要完全模仿列表的话还需要加上 `list-style-position，list-style-type`

## **display: inline-block**

`inline-block`为 CSS 2.1 新增的属性。 `inline-block`既具有 block 的宽高特性又具有 inline 的同行元素特性。 通过`inline-block`结合`text-align: justify` 还可以实现固定宽高的列表两端对齐布局

## **display: table**

table 此元素会作为块级表格来显示（类似 table），表格前后带有换行符。CSS 表格能够解决所有那些我们在使用绝对定位和浮动定位进行多列布局时所遇到的问题。例如，`display:table`的 CSS 声明能够让一个 HTML 元素和它的子节点像 table 元素一样。使用基于表格的 CSS 布局，使我们能够轻松定义一个单元格的边界、背景等样式， 而不会产生因为使用了 table 那样的制表标签所导致的语义化问题。

利用 table 的特性，我们能够轻易的实现三栏布局，并且能够兼容 IE8

## **display: inline-list-item**

我在 MDN 上面看到有这个属性，但是我实际尝试发现这个属性是不能使用的，在 [caniuse](https://caniuse.com/?search=inline-list-item) 上面也没有找到这个元素的兼容性，所以应该是不能使用的，支持度全无。

## **display: flex**

flex 是一种弹性布局属性
**注意，设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。**
主要属性有两大类：容器属性和项目的属性

### 容器属性

- flex-direction: 属性决定主轴的方向（即项目的排列方向）。
- flex-wrap: 默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap 属性定义，如果一条轴线排不下，如何换行。
- flex-flow: 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。
- justify-content: 属性定义了项目在主轴上的对齐方式。
- align-items: 属性定义项目在交叉轴上如何对齐。
- align-content: 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

### 项目属性

- order: 定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
- flex-grow: 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
- flex-shrink: 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
- flex-basis: 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。
- flex: 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。
- align-self: 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

## **display: -webkit-box**

由于某 X5 浏览器某些版本还不支持最新版的 flex 布局，所以为了保证良好的运行，建议还是使用 display: box，box 和 flex 布局的主要差别如下:

### 容器属性

- display: box
  该显示样式的新值可将此元素及其直系子代加入弹性框模型中。Flexbox 模型只适用于直系子代。
- box-orient
  值：horizontal | vertical | inherit
  框的子代是如何排列的？还有两个值：inline-axis（真正的默认值）和 block-axis，但是它们分别映射到水平和垂直方向。
- box-pack
  值：start | end | center | justify
  设置沿 box-orient 轴的框排列方式。因此，如果 box-orient 是水平方向，就会选择框的子代的水平排列方式，反之亦然。
- box-align
  值：start | end | center | baseline | stretch
  基本上而言是 box-pack 的同级属性。设置框的子代在框中的排列方式。如果方向是水平的，该属性就会决定垂直排列，反之亦然。

### 项目属性

- box-flex
  值：0 | 任意整数
  该子代的弹性比。弹性比为 1 的子代占据父代框的空间是弹性比为 2 的同级属性的两倍。其默认值为 0，也就是不具有弹性
