---
title: "JavaScript 中 map()、forEach()、reduce()、filter()、some()、every、lastIndexOf()、indexOf()的区别"
date: 2021-05-10 16:50:39
tag: [JavaScript, map, forEach, reduce, filter]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

# map()

map()方法按照原始数组元素顺序依次处理元素，返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。可看作是对原数组进行映射。

注意：map()方法不会对空数组进行检测。

```javascript
array.map(function(currentValue,index,arr), thisValue)
//参数：当前元素、当前元素的索引、当前元素所属的数组

var wallets = people.map(function (dude) {
return dude.wallet;
});
```

# forEach()

forEach()方法用于遍历数组的每个元素，将元素传给回调函数。

注意：forEach()对于空数组是不会调用回调函数的。

```javascript
array.forEach(function(currentValue, index, arr), thisValue)
//参数：当前元素、当前元素的索引、当前元素所属的数组

people.forEach(function (dude) {
dude.pickUpSoap();
});
```

# reduce()

reduce()方法是让数组中的前项和后项做某种计算，并累计最终值。

```javascript
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)初始值
//参数：初始值(计算结束的返回值)、当前元素、当前元素的索引、当前元素所属的数组

var totalMoney = wallets.reduce(function (countedMoney, wallet) {
return countedMoney + wallet.money;
}, 0);
```

# filter()

filter()方法会筛选出数组中符合条件的项，组成一个新数组。

```javascript
array.filter(function(currentValue,index,arr), thisValue)
//参数：当前元素、当前元素的索引、当前元素所属的数组

var fatWallets = wallets.filter(function (wallet) {
return wallet.money > 100;
});
```

# some()

对数组中的每个元素都执行一次指定的函数（callback），直到此函数返回 true，如果发现这个元素，some 将返回 true，如果回调函数对每个元素执行后都返回 false ，some 将返回 false。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略。

```javascript
//检查是否有数组元素大于等于10：

function isBigEnough(element, index, array) {
  return element >= 10;
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough);
// passed is false
passed = [12, 5, 8, 1, 4].some(isBigEnough);
// passed is true
//结果：
//[2, 5, 8, 1, 4].some(isBigEnough) ： false
//[12, 5, 8, 1, 4].some(isBigEnough) ： true
```

# every()

对数组中的每个元素都执行一次指定的函数（callback），直到此函数返回 false，如果发现这个元素，every 将返回 false，如果回调函数对每个元素执行后都返回 true ，every 将返回 true。它只对数组中的非空元素执行指定的函数，没有赋值或者已经删除的元素将被忽略

```javascript
//测试是否所有数组元素都大于等于10：

function isBigEnough(element, index, array) {
  return element >= 10;
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
//结果：
//[12, 5, 8, 130, 44].every(isBigEnough) 返回 ： false
//[12, 54, 18, 130, 44].every(isBigEnough) 返回 ： true
```

# lastIndexOf()

语法

```javascript
var index = array.lastIndexOf(searchElement[, fromIndex]);
```

参数说明
searchElement： 要搜索的元素
fromIndex ： 开始搜索的位置，默认为数组的长度（length），在这样的情况下，将搜索所有的数组元素。搜索是反方向进行的。
功能说明
比较 searchElement 和数组的每个元素是否绝对一致（===），当有元素符合条件时，返回当前元素的索引。如果没有发现，就直接返回 -1 。

```javascript
//查找符合条件的元素：
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, 2);
// index is 0
index = array.lastIndexOf(2, -2);
// index is 0
index = array.lastIndexOf(2, -1);
// index is 3
//结果：
//[2, 5, 9, 2].lastIndexOf(2) ： 3
//[2, 5, 9, 2].lastIndexOf(7) ： -1
//[2, 5, 9, 2].lastIndexOf(2, 3) ： 3
//[2, 5, 9, 2].lastIndexOf(2, 2) ： 0
//[2, 5, 9, 2].lastIndexOf(2, -2) ： 0
//[2, 5, 9, 2].lastIndexOf(2, -1) ： 3
```

# indexOf():

功能与 lastIndexOf()一样，搜索是正向进行的

```javascript
//查找符合条件的元素：

var array = [2, 5, 9];
var index = array.indexOf(2);
// index is 0
index = array.indexOf(7);
// index is -1
//结果：
//[2, 5, 9].indexOf(2) ： 0
//[2, 5, 9].indexOf(7) ： -1
```

# 总结

## 相同点：

都会循环遍历数组中的每一项；

1. map()、forEach()和 filter()方法里每次执行匿名函数都支持 3 个参数，参数分别是：当前元素、当 前元素的索引、当前元素所属的数组；
2. 匿名函数中的 this 都是指向 window；
3. 只能遍历数组。

## 不同点：

1. map()速度比 forEach()快；
2. map()和 filter()会返回一个新数组，不对原数组产生影响；forEach()不会产生新数组，返回 undefined；reduce()函数是把数组缩减为一个值(比如求和、求积)；
3. map()里可以用 return，而 forEach()里用 return 不起作用，forEach()不能用 break，会直接报错；
4. reduce()有 4 个参数，第一个参数为初始值。
