---
title: "解决关于 npm build --prod ，出现 ERROR in budgets, maximum exceeded for initial. "
date: 2021-08-01 23:13:10
tag: [Angular]
category: front-end-angular
published: true
hideInList: false
feature:
isTop: false
---

执行命令 ：npm build --pord，出现以下错误

```
WARNING in Invalid background value at 11:14. Ignoring.
WARNING in budgets, maximum exceeded for initial. Budget 2 MB was exceeded by 3.73 MB.
ERROR in budgets, maximum exceeded for initial. Budget 5 MB was exceeded by 750 kB.
```

解决方案：
打开 angular.json 文件，找到 budgets 看到这段

```
"budgets": [
   {
      "type": "initial",
      "maximumWarning": "2mb",
      "maximumError": "5mb"
   }
]
```

修改相关配置即可
