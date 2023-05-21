---
title: "深层数组及对象扁平化和反扁平化对象"
date: "2021-10-18 20:17:11"
tag: [JavaScript, TypeScript]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

## 前言

有时候后台返回前端的数据结构嵌套层数过深，访问里面的属性的时候过于复杂，于是乎就有了深层数组及对象的扁平化方式。

## 数组扁平化(javascript)

### 递归：

    「步骤：」

    创建一个空的新数组；

    遍历多维数组；

    如果当前元素是非数组，将元素添加到新数组末尾；

    如果当前元素是数组，元素调用函数本身；

    返回新数组。

```javascript
function flatten(array, result) {
  result = result || [];
  array.forEach((element) => {
    if (Array.isArray(element)) {
      flatten(element, result);
    } else {
      result.push(element);
    }
  });
  return result;
}
```

### 非递归

    「步骤：」

    创建一个空的新数组；

    创建一个队列；

    循环遍历队列，每次移除首个元素；

    如果首个元素是非数组，将首个元素添加到新数组开头；

    如果首个元素是数组，将首个元素添加到队列的末尾；

    返回新数组。

```javascript
function flat(array) {
  let arr = [];
  let queue = array;
  if (!queue.length) {
    return [];
  }
  while (queue.length) {
    let val = queue.pop();
    if (Array.isArray(val)) {
      queue.push(...val);
    } else {
      arr.unshift(val);
    }
  }
  return arr;
}
flat(arr);
```

### underscore 实现源码：

```javascript
// Internal implementation of a recursive `flatten` function.
var flatten = function (input, shallow, strict, output) {
  output = output || [];
  var idx = output.length;
  for (var i = 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
      // Flatten current level of array or arguments object.
      if (shallow) {
        var j = 0,
          len = value.length;
        while (j < len) output[idx++] = value[j++];
      } else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
};
```

### 测试

```javascript
var arr = [2, [3, 4], [[5], [6]]];
var result = flatten(arr);
console.log(result);
```

## 对象扁平化(javascript)

### 递归

    「步骤：」

    创建一个空新对象；

    遍历对象属性；

    如果当前属性是基本类型，将属性及值复制到新对象上；

    如果当前属性是引用类型，将属性及值递归调用函数本身；

    返回新对象。

```javascript
function flat(obj, key = "", res = {}, isArray = false) {
  for (let [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      let tmp = isArray ? key + "[" + k + "]" : key + k;
      flat(v, tmp, res, true);
    } else if (typeof v === "object") {
      let tmp = isArray ? key + "[" + k + "]." : key + k + ".";
      flat(v, tmp, res);
    } else {
      let tmp = isArray ? key + "[" + k + "]" : key + k;
      res[tmp] = v;
    }
  }
  return res;
}
```

### 非递归

    「步骤：」

    创建一个空新对象；

    创建一个队列；

    循环遍历队列，每次移除首个元素键值对数组；

    如果首个元素键值对数组的值是基本类型，将键及值复制到新对象上；

    如果首个元素键值对数组的值是引用类型，将键及值添加到队列的末尾；

    返回新对象。

```javascript
/**
 * 使用队列或栈 扁平数组
 * @param {*} object 树形数据
 * @return {target}
 */
function flat(object) {
  let res = {};
  let queue = Object.entries(object);
  while (queue.length) {
    // 栈 FILO Array.pop() 删除数组的最后一个元素并返回删除的元素
    // const [key, obj] = queue.pop();
    // 队列 FIFO Array.shift() 删除并返回数组的第一个元素。
    let [key, obj] = queue.shift();
    Object.entries(obj).forEach((item) => {
      let [k, v] = item;
      if (typeof v != "object") {
        res[`${key}.${k}`] = v;
      } else {
        // Array.shift() 向数组的末尾添加一个或更多元素，并返回新的长度。
        queue.push([`${key}.${k}`, v]);
      }
    });
  }
  return res;
}
```

### 测试

```javascript
let object = {
  a: {
    b: {
      c: {
        d: "qdkabcd",
      },
    },
    d: {
      x: [
        {
          d: "qdkabcd",
        },
        {
          f: "qdkabcd",
        },
      ],
    },
    e: "qdkae",
  },
};
var result = flattenObj(entryObj);
console.log(result);
```

## 数组扁平化(typescript)

### 代码实现

```typescript
  flatten(array: any[], result: any[]): Array<any> {
    result = result || [];
    array.forEach((element) => {
      if (Array.isArray(element)) {
        this.flatten(element, result);
      } else {
        result.push(element);
      }
    });
    return result;
  }
```

## 对象扁平化(typescript)

### 代码实现

```typescript
  flat(obj: Object, key = '', res: { [x: string]: unknown }, isArray = false) {
    for (let [k, v] of Object.entries(obj)) {
      if (Array.isArray(v)) {
        let tmp = isArray ? key + '[' + k + ']' : key + k;
        this.flat(v, tmp, res, true);
      } else if (typeof v === 'object') {
        let tmp = isArray ? key + '[' + k + '].' : key + k + '.';
        this.flat(v, tmp, res);
      } else {
        let tmp = isArray ? key + '[' + k + ']' : key + k;
        res[tmp] = v;
      }
    }
    return res;
  }
```

## 数组对象扁平化(typescript)

### 代码实现

```typescript
let arr = [
  {
    a: {
      b: {
        c: {
          dd: "abcdd",
        },
      },
      d: {
        xx: "adxx",
      },
      e: "ae",
    },
  },
  {
    a: {
      b: {
        c: {
          dd: "abcdd",
        },
      },
      d: {
        xx: "adxx",
      },
      e: "ae",
    },
  },
];
debugger;

// 第一种
let arr2 = arr.map((e) => this.flat(e));
// 第二种
let arr3 = arr.map((e) => {
  return this.flat(e);
});
```

## 反扁平化

```javascript
function unflatten(obj) {
  let o = {};
  for (let key in obj) {
    transformKey(key, obj[key], o);
  }
  return o;
}
//转化key
function transformKey(key, value, head) {
  const arr = key.split(".");
  let tmp = head;
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i];
    let nextKey = arr[i + 1];
    //这里需要判断key 是否包含[]字符串，如果是则是数组结构
    if (/\[.+?\]/g.test(key)) {
      //可能是多维数组，匹配数组维度
      let indexs = key.match(/\[(.+?)\]/g);
      //获取数组的key值
      let _key = key.match(/^(.+?)\[/)[1];
      //构造数组需要判断是否已经存在
      tmp[_key] = tmp[_key] ? tmp[_key] : [];
      let n = tmp[_key];

      //构造完数组对数组里面进行构造
      for (let j = 0; j < indexs.length; j++) {
        let index = indexs[j].replace(/\[|\]/g, "");
        let nextIndex = indexs[j + 1];

        //数组包含数组
        if (nextIndex) {
          //构造数组需要判断是否已经存在

          n[index] = n[index] ? n[index] : [];
          //如果还包含数组，将n指针指向下一个数组
          n = n[index];
        } else {
          //如果后面还有则构造对象
          if (nextKey) {
            //构造对象需要判断是否已经存在
            n[index] = n[index] ? n[index] : {};
            tmp = n[index];
          } else {
            n[index] = value;
          }
        }
      }
    } else {
      //不是数组和之前方法保持一致
      if (nextKey) {
        //构造对象需要判断是否已经存在
        tmp[key] = tmp[key] ? tmp[key] : {};
        tmp = tmp[key];
      } else {
        tmp[key] = value;
      }
    }
  }
  return head;
}
```
