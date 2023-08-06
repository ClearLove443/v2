---
title: "JS实现时间戳转时间格式"
date: 2021-08-29 09:50:14
tag: [JavaScript]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

## 老方法

js格式化时间
平常用的基本是这个方法，用 Date 方法依次将年月日时分秒一个个算出来，然后拼接成需要的时间格式字符串。

```javascript
function frontOneHour(fmt) {
  var currentTime = new Date(new Date().getTime());
  console.log(currentTime); // Wed Jun 20 2018 16:12:12 GMT+0800 (中国标准时间)
  var o = {
    "M+": currentTime.getMonth() + 1, // 月份
    "d+": currentTime.getDate(), // 日
    "h+": currentTime.getHours(), // 小时
    "m+": currentTime.getMinutes(), // 分
    "s+": currentTime.getSeconds(), // 秒
    "q+": Math.floor((currentTime.getMonth() + 3) / 3), // 季度
    S: currentTime.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (currentTime.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
}
// 调用
frontOneHour("yyyy-MM-dd hh:mm:ss");
```

## 新思路

为了将时间戳转换为我们需要的时间格式，我们写了两个函数，加起来十几行。前段时间，部门大佬告知了另外一种方式，一行代码完成时间戳转换为‘YYYY-MM-DD HH:mm:ss:sss’形式的时间格式，顿时代码精简了很多，话不多说，亮出代码

```javascript
const convertTime = (time = +new Date()) =>
  new Date(time + 8 * 3600 * 1000)
    .toJSON()
    .substr(0, 19)
    .replace("T", " ")
    .replace(/-/g, "-");
convertTime();
convertTime(1641871698565);
convertTime(1594197632 * 1000);
```

Date 的‘toJSON’方法返回格林威治时间的 JSON 格式字符串，实际是使用‘toISOString’方法的结果。字符串形如‘2018-08-09T10:20:54.396Z’，转化为北京时间需要额外增加八个时区，我们需要取字符串前 19 位，然后把‘T’替换为空格，即是我们需要的时间格式。

把时间格式中的‘-’修改为‘.’或者其他符号都是可以的。对比老方法，这种方法代码量比以前省了不止一星半点的，读起来也简洁多了。如果时间格式需要毫秒数，只需要获取前 23 位字符串，和上面一样用 replace 方法替换。
