---
title: "CSS-水平居中、垂直居中、水平垂直居中"
date: 2021-05-23 15:52:20
tag: [CSS, html]
category: front-end-css
published: true
hideInList: false
feature:
isTop: false
---

# 水平居中

## 水平居中可分为行内元素水平居中和块级元素水平居中

1. 行内元素水平居中
   这里行内元素是指文本 text、图像 img、按钮超链接等，只需给父元素设置 text-align:center 即可实现。

```css
.center{
        text-align:center;
}
<div class="center">水平居中</div>
```

2. 块级元素水平居中

- 定宽块级元素水平居中
  只需给需要居中的块级元素加 margin:0 auto 即可，但这里需要注意的是，这里块状元素的宽度 width 值一定要有

```css
.center{
      width:200px;
      margin:0 auto;
      border:1px solid red;
  }
  <div class="center">水平居中</div>
```

- 不定宽块级元素水平居中

不定宽，即块级元素宽度不固定

方法 1：设置 table
通过给要居中显示的元素，设置 display:table，然后设置 margin:0 auto 来实现

```css
.center{
     display:table;
     margin:0 auto;
     border:1px solid red;
 }
 <div class="center">水平居中</div>
```

方法 2：设置 inline-block（多个块状元素）
子元素设置 inline-block，同时父元素设置 text-align:center

```css
.center{
      text-align:center;
  }
  .inlineblock-div{
      display:inline-block;
  }
  <div class="center">
      <div class="inlineblock-div">1</div>
      <div class="inlineblock-div">2</div>
  </div>
```

方法 3：设置 flex 布局
只需把要处理的块状元素的父元素设置 display:flex,justify-content:center;

```css
.center{
      display:flex;
      justify-content:center;
  }
  <div class="center">
      <div class="flex-div">1</div>
      <div class="flex-div">2</div>
  </div>
```

方法 4：position + 负 margin；
方法 5：position + margin：auto；
方法 6：position + transform；

注：这里方法 4、5、6 同下面垂直居中一样的道理，只不过需要把 top/bottom 改为 left/right，在垂直居中部分会详细讲述。

# 垂直居中

## 单行文本垂直居中

- 设置 paddingtop=paddingbottom；或
- 设置 line-height=height；
  ## 多行文本垂直居中
  通过设置父元素 table，子元素 table-cell 和 vertical-align
  vertical-align:middle 的意思是把元素放在父元素的中部

```css
.center{
	width:200px;
	height:300px;
	display:table;
	border: 2px solid blue;
}
.table-div{
	display:table-cell;
	verticaL-aLign: middle;
	border:IJX solid red;
)
<div class="center">
	<div class="table-div”>多行文本垂直居中〈/div>
</div>
```

## 块级元素垂直居中

flex 布局

在需要垂直居中的父元素上，设置 display:flex 和 align-items：center
要求：父元素必须显示设置 height 值

```css
.center{
	width:200px;
	height:300px;
	display:flex;
	align-items：center
}
<div class="center">
	<div>垂直居中〈/div>
</div>
```

## 水平垂直居中

- 方法 1：flex 布局

```css
.box {
  height: 600px;
  display: flex;
  justify-content: center; //子元素水平居中
  align-items: center; //子元素垂直居中
  /* aa只要三句话就可以实现不定宽高水平垂直居中。 */
}
.box > div {
  background: green;
  width: 200px;
  height: 200px;
}
```

- 方法 2：绝对定位+margin:auto

```css
div {
  width: 200px;
  height: 200px;
  background: green;

  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```

- 方法 3：绝对定位+负 margin

```css
div {
  width: 200px;
  height: 200px;
  background: green;

  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
```

- 方法 4：绝对定位+transform

```css
div {
  width: 200px;
  height: 200px;
  background: green;

  position: absolute;
  left: 50%; /* 定位父级的50% */
  top: 50%;
  transform: translate(-50%, -50%); /*自己的50% */
}
```

- 方法 5：table-cell 实现居中

```css

设置
display:table-cell;
text-align:center;
vertical-align: middle;
```
