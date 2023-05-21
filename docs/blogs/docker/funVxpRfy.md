---
title: "WIndows 10 Docker desktop create Sql Server 2019 engine"
date: 2021-07-11 11:24:22
tag: [docker, SQL Server]
category: database
published: true
hideInList: false
feature:
isTop: false
---

cmd 运行

```bash
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=!SqlServer2' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```
