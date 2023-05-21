---
title: "修改 WSL2 可用内存大小和交换分区大小"
date: "2021-12-19 17:24:20"
tag: [wsl2, swap]
category: windows
published: true
hideInList: false
feature:
isTop: false
---

WSL2 默认可以使用的内存大小为主机的 80%,对于 Linux 而言即使装了桌面,一般的开发也没必要给这么多内存,分多了,反而有可能卡主机的 Windows
操作: 1.打开 Windows 资源管理器,地址栏输入 `%UserProfile%` 回车,在该目录下创建一个文件, 名字为 `.wslconfig` ,写入内容示例如下 (我电脑 8GB 内存,分给 WSL 内存 2GB,另外设置交换分区 4GB)

```yaml
[wsl2]
memory=10GB
swap=20GB
localhostForwarding=true
```

cmd 执行 `wsl --shutdown` 关闭 WSL,再重新打开即可
