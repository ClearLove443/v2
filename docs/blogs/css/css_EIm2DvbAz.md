---
title: "修改css中select的下拉箭头样式"
date: 2021-05-16 12:16:45
tag: [css, select]
category: front-end-css
published: true
hideInList: false
feature:
isTop: false
---

```css
select {
  /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
  border: solid 1px #000;

  /*很关键：将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;

  /*在选择框的最右侧中间显示小箭头图片*/
  background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat
    scroll right center transparent;

  /*为下拉小箭头留出一点位置，避免被文字覆盖*/
  padding-right: 14px;

  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand {
    display: none;
  }
}
```
