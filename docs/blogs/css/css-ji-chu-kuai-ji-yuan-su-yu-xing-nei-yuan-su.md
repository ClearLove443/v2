---
title: "CSS基础-块级元素与行内元素"
date: 2021-05-15 10:29:52
tag: [html, css]
category: front-end-css
published: true
hideInList: false
feature:
isTop: false
---

    文章总结了什么是块级元素、行内元素；有哪些块级元素、行内元素；块级元素与行内元素间的相互转换；行内置换元素的特殊性。

# 什么是块级元素、行内元素

|              | 是否独占一行 | width、height | padding、margin                                 | 默认宽高             |
| :----------- | :----------- | :------------ | :---------------------------------------------- | :------------------- |
| 块级元素     | 是           | 有效          | 有效                                            | 撑满父元素           |
| 行内元素     | 否           | 无效          | padding 有效；margin 水平方向有效，竖直方向无效 | 随内部元素的内容变化 |
| 行内块级元素 | 否           | 有效          | 有效                                            | 随内部元素的内容变化 |

## 块级元素：

    独占一行；元素的宽高、以及内外边距都可设置；元素宽度在不设置的情况下，是它本身父容器的100%

## 行内元素：

    不会自动进行换行；元素的宽高不可设置；内边距可以设置、外边距水平方向有效，竖直方向无效；元素宽度在不设置的情况下，随内部元素的内容变化。

# 有哪些块级元素、行内元素

## 常见块级元素：

    div , h1---h6 , p , ul , ol , dl , table , form

- div - 常用块级元素，也是 css layout 的主要标签
- h1---h6 标题
- p - 段落
- ul - 非排序列表
- ol - 排序表单
- dl - 定义列表
- table - 表格
- form - 交互表单
- hr - 水平分隔线
- pre - 格式化文本
- address - 地址
- blockquote - 块引用
- header - HTML5 区段头或页头。
- footer - HTML5 区段尾或页尾。
- section - HTML5 一个页面区段。
- article - HTML5 文章内容。
- aside - HTML5 伴随内容。
- hgroup - HTML5 标题组。
- menu - HTML5 菜单列表
- figcaption - HTML5 图文信息组标题
- figure - HTML5 图文信息组
- audio - HTML5 音频播放
- video - HTML5 视频
- output - HTML5 表单输出

## 常见行内元素：

    span , a  ,strong  ,b ,em  , i  , big  ,small  ,label
    img , input  , select ,textarea（属于行内置换元素，下文详解）

- span - 常用内联容器，定义文本内区块
- a - 锚点
- strong - 粗体强调
- b - 粗体
- em - 强调
- i - 斜体
- small - 小字体文本
- big - 大字体
- sub - 下标
- sup - 上标
- label - 表格标签
- img - 图片\* input - 输入框
- select - 项目选择
- textarea - 多行文本输入框
- abbr - 缩写
- code - 计算机代码(在引用源码的时候需要)
- acronym - 首字
- bdo - bidi override
- br - 换行
- cite - 引用
- dfn - 定义字段
- font - 字体设定(不推荐)
- kbd - 定义键盘文本
- q - 短引用
- s - 中划线(不推荐)
- samp - 定义范例计算机代码
- strike - 中划线
- tt - 电传文本
- u - 下划线
- var - 定义变量

# 行内元素与块级元素间的相互转换

    行内元素和块级元素都不是绝对的，可以相互转换,，通常有这些方式可以转换。

1. display，将元素设置为块级、行内或是其它。
2. float，隐形地把内联元素转换为行内块级元素。不会占据一行，相当于 display：inline-block;
3. position,属性值为 absolute、fixed 时,隐形地把内联元素转换为块级元素，其它属性值不会做转换。

# 置换元素

`<img>、<input>、<textarea>、<select>、<object>`是行内元素，但是它们却可以设置宽高，这是为什么呢？因为它们是行内置换元素。
置换元素：内容不受 CSS 视觉格式化模型控制，CSS 渲染模型并不考虑对此内容的渲染，且元素本身一般拥有固有尺寸（宽度，高度，宽高比）的元素，被称之为置换元素。浏览器根据元素的标签和属性，来决定元素的具体显示内容。 例如：浏览器会根据`<img>`标签的 src 属性的值来读取图片信息并显示出来，而如果查看 html 代码，则看不到图片的实际内容；`<input>`标签的 type 属性来决定是显示输入框，还是单选按钮等。
置换元素在其显示中生成了框，这也就是有的内联元素能够设置宽高的原因。
