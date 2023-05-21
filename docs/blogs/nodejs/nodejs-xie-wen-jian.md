---
title: "node.js 写文件"
date: 2021-05-10 17:43:49
tag: [nodejs]
category: front-end-js
published: true
hideInList: false
feature:
isTop: false
---

```javascript
const fs = require("fs");
let finalProvince = "2222";
fs.writeFile("temp.js", JSON.stringify(finalProvince), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
```
