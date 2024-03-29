---
title: "Python 连续运行多条批处理无效"
date: 2021-03-03 17:42:43
tag: [python, cmd]
category: python
published: true
hideInList: false
feature:
isTop: false
---

在 os.system 中连续执行多条语句的情况，语句如下

    cmd1 = 'cd ' + filepath + i
    cmd2 = '.\gradlew build'

如果分为两次执行，即: os.system(cmd1) os.system(cmd2)，在执行第二条语句的时候会提示 gradlew 不是内部命令，也就是没有进入到相应的路径。

os.system 的工作原理如下：
Execute the command (a string) in a subshell. This is implemented by calling the Standard C function system(), and has the same limitations...

关于子进程的创建需要明确两点：父进程的环境变量 (environment variables) 会默认传递到子进程中(工作目录 PWD 就是环境变量之一)
使用 system 函数，子进程无法影响父进程中的环境变量
根据这两点，执行 os.system(path) 引发的工作目录变更作用范围仅限于第一个被创建的子进程，故而当前的工作目录没有变更，到执行 os.system(upd) 就会报错

要达到预期的效果，如果仍使用 os.system，有两种方法。

- 确保工作目录的变更和 svn 都在子进程中进行，可以使用复合语句（如 os.system('cd path-to-repo && svn ci')）或多个语句（如 os.system('cd path-to-repo; svn ci')）。
- 先在父进程中切换工作目录(os.chdir('path-to-repo'))，再利用 1.中提到的原理，执行子进程即可(os.system('svn ci'))。
