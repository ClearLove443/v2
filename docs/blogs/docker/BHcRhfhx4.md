---
title: "Windows 10 Docker desktop create Postgres engine"
date: 2021-07-11 11:27:34
tag: [docker, Postgresql]
category: database
published: true
hideInList: false
feature:
isTop: false
---

cmd 运行

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```

持久化数据库

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -v D:/docker/PostgreSql/data:/var/lib/postgresql/data -d postgres
```
