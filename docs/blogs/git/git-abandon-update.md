---
title: "git 放弃修改，放弃增加文件操作"
date: "2021-11-16 17:46:07"
tag: [Git]
category: command
published: true
hideInList: false
feature:
isTop: false
---

1. 本地修改了一些文件 (并没有使用 git add 到暂存区)，想放弃修改

- 单个文件/文件夹：

```bash
git checkout -- filename
```

- 所有文件/文件夹：

```bash
git checkout .
```

2. 本地新增了一些文件 (并没有 git add 到暂存区)，想放弃修改

- 单个文件/文件夹：

```bash
rm  -rf filename
```

- 所有文件：

```bash
git clean -xdf
```

> 删除新增的文件，如果文件已经已经 git add 到暂存区，并不会删除！

- 所有文件和文件夹：

```bash
git clean -xdff
```

> [谨慎操作] 本命令删除新增的文件和文件夹，如果文件已经已经 git add 到暂存区，并不会删除！

3. 本地修改/新增了一些文件，已经 git add 到暂存区，想放弃修改

- 单个文件/文件夹：

```bash
git reset HEAD filename
```

- 所有文件/文件夹：

```bash
git reset HEAD .
```

4. 本地通过 git add 和 git commit 后，想要撤销此次 commit

- 撤销 commit, 同时保留该 commit 修改：

```bash
git reset commit_id
```

这个 commit_id 是你想要回到的那个节点，可以通过 git log 查看，可以只选前 6 位。

> 撤销之后，你所做的已经 commit 的修改还在工作区！

- 撤销 commit, 同时本地删除该 commit 修改：

```bash
git reset --hard commit_id
```

这个 commit_id 是你想要回到的那个节点，可以通过 git log 查看，可以只选前 6 位

> [谨慎操作] 撤销之后，你所做的已经 commit 的修改将会清除，仍在工作区/暂存区的代码也将会清除！
