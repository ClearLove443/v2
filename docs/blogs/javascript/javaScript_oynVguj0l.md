---
title: "用js实现模糊查询的几种方法"
date: 2021-05-23 17:35:08
tag: [JavaScript]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

1. indexof 方法

```
语法：stringObject.indexOf(searchvalue, fromindex)
```

```
参数：searchvalue 必需。规定需检索的字符串值。 fromindex 可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。
```

```
说明：该方法将从头到尾地检索字符串 stringObject，看它是否含有子串 searchvalue。开始检索的位置在字符串的 fromindex 处或字符串的开头（没有指定 fromindex 时）。如果找到一个 searchvalue，则返回 searchvalue 的第一次出现的位置。stringObject 中的字符位置是从 0 开始的。如果没有找到，将返回 -1。
```

```javaScript
/**
   * 使用indexof方法实现模糊查询
   * @param  {Array}  list     进行查询的数组
   * @param  {String} keyWord  查询的关键词
   * @return {Array}           查询的结果
   */
  function fuzzyQuery(list, keyWord) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].indexOf(keyWord) >= 0) {
        arr.push(list[i]);
      }
    }
    return arr;
  }
```

2. split 方法

```
语法：stringObject.split(separator, howmany)
```

```
参数：separator 必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。howmany 可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
```

```
说明：该方法通过在 separator 指定的边界处将字符串 stringObject 分割成子串并返回子串数组。返回的数组中的字串不包括 separator 自身。如果 stringObject 中不存在 separator，将返回一个只包含stringObject的数组。故可以根据返回数组的长度来判断是否存在子字符串 separator 。
```

```javascript
/**
 * 使用spilt方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
function fuzzyQuery(list, keyWord) {
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].split(keyWord).length > 1) {
      arr.push(list[i]);
    }
  }
  return arr;
}
```

3. match 方法

```
语法：stringObject.match(searchvalue) 或 stringObject.match(regexp)
```

```
参数：searchvalue 必需。规定要检索的字符串值。regexp 必需。规定要匹配的模式的 RegExp 对象。如果该参数不是 RegExp 对象，则需要首先把它传递给 RegExp 构造函数，将其转换为 RegExp 对象。
```

```
说明：该方法将在字符串 stringObject 内检索指定的值，或找到一个或多个正则表达式的匹配。如果没有找到任何匹配的文本，将返回 null 。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。
```

```javascript
/**
 * 使用match方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
function fuzzyQuery(list, keyWord) {
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].match(keyWord) != null) {
      arr.push(list[i]);
    }
  }
  return arr;
}
```

4. test 方法（正则匹配）

```
语法：RegExpObject.test(string)
```

```
参数：string 必需。要检测的字符串。
```

```
说明：该方法用于检测一个字符串是否匹配某个模式。如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
```

```javascript
/**
 * 使用test方法实现模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
function fuzzyQuery(list, keyWord) {
  var reg = new RegExp(keyWord);
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (reg.test(list[i])) {
      arr.push(list[i]);
    }
  }
  return arr;
}
```

# 性能测试

    测试条件：一个长度为100的数组，每个方法测试50次，取平均值。
    indexof 方法耗费时间： 0.048ms
    split 方法耗费时间： 0.037ms
    match 方法耗费时间： 0.178ms
    test 方法耗费时间： 0.039ms

# 结论

1. 从上面测试结果可以看出在几百几千甚至几万条数据量的情况下，前端去处理都是没问题的，相比发送一个 ajax 请求去后台来说，前端还是具有很大优势的，能节省不少时间。

2. 相比其他方法，match 方法性能最差，消耗的时间差不多是其他方法的 3-4 倍，虽说这一点点时间相比发送 ajax 来说，也算提高了很多既然我们在一开始就是为了提高用户体验，那么我们也应该追求极致啦，所以 match 选手落败。

3. 除了 match 方法，其他三个方法在性能上差不多。不过在这里有一点需要提出的就是， test 方法因为使用到了正则表达式，所以能够实现的功能会比较强大，写出来的代码也更加简洁。打个比方，在不区分大小写的模糊搜索条件下， test 方法只需在正则表达式中添加修饰符 i 即可实现不区分大小写，而 indexof 方法和 split 方法则要通过多次的方法调用和逻辑运算符才能实现效果。
