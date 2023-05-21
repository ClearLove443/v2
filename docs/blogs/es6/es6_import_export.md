---
title: "ES6模块化之export和import的用法"
date: "2021-12-26 21:33:48"
tag: [JavaScript, TypeScript, import, export, es6]
category: es6
published: true
hideInList: false
feature:
isTop: false
---

ES6 中 export 和 import 一般的用法有两种

1. 命名导出（Named exports）
2. 默认导出（Default exports）

## 注意点

- 如果是 js 项目，则需要在 package.json 添加 `"type": "module",`ts 的话就不需要。
- 如果是 js 项目，引入的时候需要添加文件后缀`.js` , ts 的话就不需要。

## 命名导出（Named exports）

就是每一个需要导出的数据类型都要有一个 name，统一引入一定要带有{}，即便只有一个需要导出的数据类型。这种写法清爽直观，是推荐的写法。

```javascript
//------ lib.js ------
const sqrt = Math.sqrt;
function square(x) {
  return x * x;
}
function diag(x, y) {
  return sqrt(square(x) + square(y));
}

export { sqrt, square, diag };

//------ main.js ------
import { square, diag } from "lib.js";
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

把 export 直接加到声明前面就可以省略{}

```javascript
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
  return x * x;
}
export function diag(x, y) {
  return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from "lib.js";
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

无论怎样导出，引入的时候都需要{}。

## 别名引入（Aliasing named imports）

当从不同模块引入的变量名相同的时候

```javascript
import { speak } from "./cow.js";
import { speak } from "./goat.js";
```

这些写法显然会造成混乱
正确的方法是这样的

```javascript
import { speak as cowSpeak } from "./cow.js";
import { speak as goatSpeak } from "./goat.js";
```

可是，当从每个模块需要引入的方法很多的时候，这种写法就显得十分的繁琐、冗长，例如

```javascript
import { speak as cowSpeak, eat as cowEat, drink as cowDrink } from "./cow.js";

import {
  speak as goatSpeak,
  eat as goatEat,
  drink as goatDrink,
} from "./goat.js";

cowSpeak(); // moo
cowEat(); // cow eats
goatSpeak(); // baa
goatDrink(); // goat drinks
```

解决方案就是命名空间引入了

## 命名空间引入（Namespace imports）

```javascript
import * as cow from "./cow.js";
import * as goat from "./goat.js";

cow.speak(); // moo
goat.speak(); // baa
```

十分的简洁优雅

## 默认导出（Default exports）

默认导出就不需要 name 了，但是一个 js 文件中只能有一个 export default。

```javascript
//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc';
myFunc();
```

其实这种导出方式可以看成是命名导出的变种，只不过把命名写成了 default。
虽然 export default 只能有一个，但也可以导出多个方法。

```javascript
export default {
  speak() {
    return "moo";
  },
  eat() {
    return "cow eats";
  },
  drink() {
    return "cow drinks";
  },
};
```

引入与命名空间引入类似

```javascript
import cow from "./default-cow.js";
import goat from "./default-goat.js";

cow.speak(); // moo
goat.speak(); // baa
```

如果我们在编写模块的时候使用的导出方法不统一，那么引入的时候就需要考虑不同模块引入的方式。这种麻烦可以通过自引用的方法消除。方法如下

## 编写两种引入方式通用的模块

```javascript
import * as myself from "./ambidextrous-cow.js"; // import this file into itself

// this module's own namespace is its default export
export default myself;

export function speak() {
  console.log("moo");
}
```

这样在引入的时候就不需要考虑引入方式了。

```javascript
import cow from "./ambidextrous-cow";
import * as alsocow from "./ambidextrous-cow";

cow.speak(); // moo
alsocow.speak(); // moo
```

两种引入方法均可。
这种方法也有一个小缺点，就是在我们编写的模块中，有一个 function 是常用的，我们想默认导出，可 export default 已经使用了，而我们知道 export default 在一个模块中只能使用一次。这时就要使用 Object.assign

```javascript
import * as myself from "./ambidextrous-cow.js";

export default Object.assign(speak, myself);

export function speak() {
  console.log("moo");
}
```

需要注意的是，Object.assign 只能用于 function。

对应引入的例子

```javascript
import cow from "./ambidextrous-cow";
import * as alsocow from "./ambidextrous-cow";

cow(); // moo
cow.speak(); // moo
alsocow.speak(); // moo
```
