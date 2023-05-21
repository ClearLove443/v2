---
title: 'adb 常用命令'
date: 2022-12-26 15:25:28
tag: [adb,command]
category: android
published: true
hideInList: false
feature:
isTop: false
---

常用adb指令：

# 在设备上启用 adb 调试

```
在搭载 Android 4.2 及更高版本的设备上，“开发者选项”屏幕默认情况下处于隐藏状态。如需将其显示出来，请依次转到设置 > 关于手机，然后点按 build 号七次。返回上一屏幕，在底部可以找到开发者选项。
```

# 查看设备列表

```bash
adb devices
```

# 杀ADB的服务

```sh
# 有时候需要杀掉进程
adb kill-server
```

# 杀ADB的进程

```cmd
taskkill /F /IM adb.exe
```

# 从电脑端向手机复制文件

```sh
#只有一个设备的时候。不需要指定 -s
adb -s 8d820e38 push test.txt //sdcard/test.txt
```

```cmd
#只有一个设备的时候。不需要指定 -s
adb -s 8d820e38 push test.txt /sdcard/test.txt
```

# 从手机向电脑复制文件

```sh
#只有一个设备的时候。不需要指定 -s
adb -s 8d820e38 pull //sdcard/test.txt test.txt
```

```cmd
#只有一个设备的时候。不需要指定 -s
adb -s 8d820e38 pull /sdcard/test.txt test.txt
```

# 重启Android设备

```sh
# 重启系统
adb reboot

# 重启到recovery
adb reboot recovery

# 重启到bootloader
adb reboot bootloader
```

# 连接指定设备

```sh
#只有一个设备的时候。不需要指定 -s
adb -s 8d820e38 shell
```

# adb安装apk

```sh
# 覆盖安装是使用 -r 选项
adb install +包名
```

# adb卸载apk

```sh
adb uninstall  +包名
```

# 网络连接Android设备

```sh
adb connect +设备IP
```

# pm Package Manager , 可以用获取到一些安装在 Android 设备上得应用信息

## 列出所有的应用的包名

```sh
adb shell pm list package
```

## 列出对应包名.apk 位置

```sh
adb shell pm path+包名
```

## 安装应用（目标 apk 存放于PC端，用 adb install 安装   目标 apk 存放于Android设备上，用 pm install 安装）

```sh
adb shell pm install +apk存放路径
```

# 截图命令

```sh
adb shell screencap -p /sdcard/DCIM/screenTest.png
```

# 4.4以上系统版本新增的录制命令

```sh
# 执行命令后操作手机，ctrl + c 结束录制，录制结果保存至 sdcard/ 下
adb shell screenrecord /sdcard/demo.mp4
```

# 列出设备上的输入法

```sh
adb shell ime list -s
```

# 获取系统版本

```sh
adb shell getprop ro.build.version.release
```

# 获取系统api版本

```sh
adb shell getprop ro.build.version.sdk
```

# 获取手机相关制造商信息

```sh
adb shell getprop | grep "model\|version.sdk\|manufacture\|hardware\|platform\|revision\|serialno\|product.name\|brand"
```

# 获取手机系统信息（ CPU，厂商名称等）

```sh
adb shell "cat /system/build.prop | grep "product""
```

# 获取手机设备型号

```sh
adb -d shell getprop ro.product.model
```

# 获取手机厂商名称

```sh
adb -d shell getprop ro.product.brand
```

# 获取手机的序列号

```sh
adb get-serialno
adb shell getprop ro.serialno
```

# 获取手机MAC地址

```sh
adb shell cat /sys/class/net/wlan0/address
```

# 获取手机内存信息

```sh
adb shell cat /proc/meminfo
```

# 获取手机存储信息

```sh
adb shell df
```

# 获取手机内部存储信息

```sh
adb shell df /data
```

# 获取Android设备屏幕分辨率

```sh
adb shell "dumpsys window | grep mUnrestrictedScreen"
```

# 查看运行进程

```sh
adb shell procrank
```

# 关闭或杀掉进程

```sh
adb shell kill 366
```

# 保留数据和缓存文件，重新安装，升级

```sh
adb install -r test.apk
```

# 卸载app但保留数据和缓存文件

```sh
adb uninstall -k cnblogs.apk
```

# 查看目录下的文件大小

```sh
adb shell du -sh *
```

# 查看正在运行的Services

```sh
adb shell dumpsys activity services [<packagename>]
```

# 查看正在运行的Activity

```sh
adb shell dumpsys activity [<packagename>]
```

# clear 清除应用数据

```sh
adb shell pm clear com.baidu
```

# 查看指定进程PID

```sh
adb shell ps +  进程的包名
```

# 查看进程具体的信息

```sh
# 查看进程的文件结构
adb shell cat /proc/1460/maps

# 查看进程的状态
adb shell cat /proc/1460/maps
```

# findstr 和 grep过滤搜索

```sh
adb shell ps | grep "com.linux.test"
```

```cmd
adb shell ps|findstr /i "com.android.launcher3"
```
