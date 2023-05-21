---
title: "做省市区联动时，将数据调整到合适结构的两种常用方法"
date: 2021-05-10 17:18:49
tag: [JavaScript, 解构]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

进行省市县三级联动的时候，需要把数据转换成指定类型的对象。
就需要对对象的解构。

# 起因

省市区联动，或者城市名称匹配，是很常用的功能。在实现他们的时候，经常会出现这样的情况：拿到的行政区划数据 和 渲染所需要的结构 不相符。通常我会用 JS 把它们处理成合适的结构。

# 核心思路

遍历其子元素或属性，在遍历的回调函数中，通过临时对象，将数据重新组织成需要的结构，再将其 push 进一个新构建的数组中。遍历完成后，该数组就是想要的最后结果。

# 两种套路：数组 VS 对象。

对于数组和对象，有不同的遍历方式。

- 对于数组，视情况可用 map(), forEach()，filter()等方法；

- 对于对象，可以结合使用 for in 与 Object.keys() 来遍历其属性。

> 注：Object.keys()可以返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for…in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。

# 例子

# 1、数组

有组数据

```javascript
var data1 = [
  {
    provinceCode: "33",
    provinceName: "浙江省",
    cityCode: "3301",
    cityName: "杭州市",
  },
  {
    provinceCode: "33",
    provinceName: "浙江省",
    cityCode: "3302",
    cityName: "宁波市",
  },
  {
    provinceCode: "33",
    provinceName: "浙江省",
    cityCode: "3303",
    cityName: "温州市",
  },
];
```

需要转换成`{provinceCode:"",provinceName:"",children:[]}`这种类型的模版。具体实现如下

```javascript
function formatdata(data) {
  var data = [...data];
  // 对象模版
  var city = {
    provinceCode: "",
    provinceName: "",
    children: [],
  };
  city.provinceCode = data[0].provinceCode;
  city.provinceName = data[0].provinceName;
  // 方法一
  // var children = [];
  // data.forEach(i = >{
  // 	var {
  // 		cityCode: cityCode,
  // 		cityName: cityName
  // 	} = i;
  // 	children.push({
  // 		cityCode: cityCode,
  // 		cityName: cityName
  // 	});
  // }) city.children = children;
  // 方法二：
  city.children = data1.map((i) => {
    var { cityCode: cityCode, cityName: cityName } = i;
    return {
      cityCode: cityCode,
      cityName: cityName,
    };
  });
  var city_json = JSON.stringify(city); // 对像转换成json
  var city2 = JSON.parse(city_json, (key, value) => {
    return value;
  }); // json 转换成对象
  console.log(city_json);
  console.log(city2);
}
formatdata(data1);
```

# 2、对象

```javascript
const fs = require("fs");
const rawData = {
  北京市: {
    市辖区: [
      "东城区",
      "西城区",
      "朝阳区",
      "丰台区",
      "石景山区",
      "海淀区",
      "门头沟区",
      "房山区",
      "通州区",
      "顺义区",
      "昌平区",
      "大兴区",
      "怀柔区",
      "平谷区",
      "密云区",
      "延庆区",
    ],
  },
  天津市: {
    市辖区: [
      "和平区",
      "河东区",
      "河西区",
      "南开区",
      "河北区",
      "红桥区",
      "东丽区",
      "西青区",
      "津南区",
      "北辰区",
      "武清区",
      "宝坻区",
      "滨海新区",
      "宁河区",
      "静海区",
      "蓟州区",
    ],
  },
};
//目标结构
// const options = [{
//   value: '浙江',
//   label: '浙江',
//   children: [{
//     value: 'hangzhou',
//     label: 'Hangzhou',
//     children: [{
//       value: 'xihu',
//       label: 'West Lake',
//     }],
//
//   }]
// }];
const finalArr = [];
for (let prop of Object.keys(rawData)) {
  let tempObj = {};
  tempObj.label = prop;
  tempObj.value = prop;
  tempObj.children = [];

  for (let pr of Object.keys(rawData[prop])) {
    let tempTempObj = {};
    tempTempObj.label = pr;
    tempTempObj.value = pr;

    let tempTempArr = [];

    //最内层变成数组的了
    rawData[prop][pr].map((item) => {
      let tempTempTempObj = {};
      tempTempTempObj.label = item;
      tempTempTempObj.value = item;
      tempTempArr.push(tempTempTempObj);
    });

    tempTempObj.children = tempTempArr;
    tempObj.children.push(tempTempObj);
  }
  finalArr.push(tempObj);
}
console.log(finalArr);

fs.writeFile("temp.js", JSON.stringify(finalArr), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
```

运行

```javascript
node test.js
```
