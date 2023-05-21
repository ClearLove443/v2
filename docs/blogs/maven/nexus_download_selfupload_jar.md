---
title: "Nexus 下载自定义上传的jar"
date: "2021-10-09 23:27:47"
tag: [nexus]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

最近在本地 Nexus 中添加了一个外部依赖包，通过 Nexus 后台可以查看，通过 URL 也可以访问，可是本地开发环境就是说找不到。

错误如下：

[ERROR] Failed to execute goal on project enterprise-server: Could not resolve dependencies for project com.thgy:enterprise-server:jar:1.0-SNAPSHOT: Failure to find net.ipmarker:IPMarker_DevAPI_JavaSDK:jar:2.0 in http://nexus.xxxx.xxx/repository/maven-public/ was cached in the local repository, resolution will not be reattempted until the update interval of nexus has elapsed or updates are forced -> [Help 1]

通过上面发现，问题在于，maven 并没有从 nexus 上寻找新包，原因就是时间没有到（而包是我刚上传的）。

后面发现 maven 有一个参数：

```
-U,--update-snapshots                  Forces a check for missing releases and updated snapshots on
```

通过命令行：

```bash
mvn -U compile
```

就可以把项目需要的包下载下来了。

另外：
通过管理后台上传时，注意勾选生产 POM 文件。
