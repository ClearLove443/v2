---
title: "git 常见命令"
date: "2021-11-08 18:11:16"
tag: [Git]
category: command
published: true
hideInList: false
feature:
isTop: false
---

- 创建仓库

```bash
git init
```

- 列出本地分支

```bash
git branch
```

- 列出所有分支

```bash
git branch -a
```

- 创建分支

```bash
git branch (branchname)
```

- 切换分支

```bash
git checkout (branchname)
```

- 拉取远程分支并创建本地分支

```bash
git checkout -b qz51142 origin/qz51142
```

- 添加文件到暂存区

```bash
git add .
```

- 将暂存区内容添加到仓库中

```bash
git commit
git commit -m "update eh-adoption-ui .gitignore #ARTL-8599"
```

- 查看仓库当前的状态

```bash
git status
```

- 删除本地分支

```bash
git branch -d (branchname)
```

- 删除远程分支

```bash
git push origin --delete qz51142
```

- 同步分支列表

```bash
git fetch -p
```

- 查看提交历史

```bash
git log
```

- 查看指定文件的修改记录

```bash
git blame <file>
```

- 从远程获取代码并合并本地的版本

```bash
git pull <远程主机名> <远程分支名>:<本地分支名>
```

- 如果远程分支是与当前分支合并，则冒号后面的部分可以省略。

```bash
git pull <远程主机名> <远程分支名>
git pull origin master:qz51142
```

- 从将本地的分支版本上传到远程并合并

```bash
git push <远程主机名> <本地分支名>:<远程分支名>
```

- 如果本地分支名与远程分支名相同，则可以省略冒号：

```bash
git push <远程主机名> <本地分支名>

git push origin qz51142:qz51142

git reset --hard commitid
```
