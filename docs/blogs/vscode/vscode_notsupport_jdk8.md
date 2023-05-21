---
title: "Vs Code中不再支持JDK8的解决方案"
date: "2021-10-09 23:31:02"
tag: [jdk]
category: vscode
published: true
hideInList: false
feature:
isTop: false
---

- 解决方案 1

如果不是必须使用 JDK8，可以选择更换为 JDK11 或更新

- 解决方案 2

官方说可以在 settings.json 中配置 java.configuration.runtimes，这个配置仍然支持 Java1.5 到 14
不过依旧需要安装 JDK11，用来启动 Java 语言服务器，具体的编译版本则可以自行选择

```json
"java.home": "/path/to/jdk-11",
"java.configuration.runtimes": [
  {
    "name": "JavaSE-1.8",
    "path": "/path/to/jdk-8",
    "default": true
  },
  {
    "name": "JavaSE-11",
    "path": "/path/to/jdk-11",
  },
]
```

- 解决方案 3
  照常使用以前版本，直接选中该拓展的设置–>安装另一个版本–>选择安装的版本：0.64.1

然后关闭拓展更新：
在设置中关闭 Extensions: Auto Update
