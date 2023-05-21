---
title: "bat 批处理文件运行时隐藏cmd 窗口"
date: 2021-03-03 10:04:14
tag: [bat, cmd, vbs]
category: windows
published: true
hideInList: false
feature:
isTop: false
---

# 直接执行 cmd 命令的时候，显示的黑框不太美观。可以把黑框隐藏掉。推荐使用第一种。

- 新建个 vbs 文件

```
set ws=WScript.CreateObject("WScript.Shell")
'ws.Run "yy.bat",0

Dim cmd1
cmd = "java -jar 11.war"
'ws.Run cmd, 0
```

可以在 vbs 文件调用需要执行的批处理文件，或者把批处理直接定义在 vbs 里面

- 编辑 bat 文件，在开头处写入

```
@echo off
if "%1" == "h" goto begin
mshtavbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
REM
```

缺点：这个方法运行 bat 时，cmd 窗口还是闪了一下。
