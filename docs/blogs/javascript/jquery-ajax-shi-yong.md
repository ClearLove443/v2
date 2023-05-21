---
title: "Jquery Ajax使用"
date: 2021-04-06 16:43:26
tag: [jQuery, Ajax]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

# 使用 Ajax 获取的值作为函数的返回值

ajax 默认使用异步方式，要将异步改为同步方式

```javascript
var errorMessage = test("", "", "");

function test(checkedCode, checkedName, subScreenId) {
  let errorMessage = "";
  let request = {
    checkedCode: checkedCode,
    checkedName: checkedName,
    subScreenId: subScreenId,
  };
  $.ajax({
    url: "",
    type: "post",
    dataType: "json",
    data: request,
    async: false, //请求方式：同步
  })
    .done(function (data, textStatus, jqXHR) {
      errorMessage = data;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    });
  return errorMessage;
}
```
