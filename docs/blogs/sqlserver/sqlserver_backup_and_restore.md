---
title: "使用 sqlpackage 备份和还原 SQL Server "
date: 2021-06-19 17:05:47
tag: [sqlserver]
category: database
published: true
hideInList: false
feature:
isTop: false
---

[SqlPackage](https://docs.microsoft.com/zh-cn/sql/tools/sqlpackage/sqlpackage-export?view=sql-server-ver15)。

# 备份

```bash
sqlpackage.exe /TargetFile:"D:\docker\SQL Server\sqldb-coredx-runtime-ac-dev001.bacpac" /Action:Export /SourceServerName:"127.0.0.1" /SourceUser:"sa" /SourcePassword:"!SqlServer2" /SourceDatabaseName:"mdmDB"
```

# 还原

```bash
sqlpackage.exe /SourceFile:"D:\docker\SQL Server\sqldb-coredx-runtime-ac-dev001.bacpac" /Action:Import /TargetServerName:"127.0.0.1" /TargetUser:"sa" /TargetPassword:"!SqlServer2" /TargetDatabaseName:"mdmDB"
```
