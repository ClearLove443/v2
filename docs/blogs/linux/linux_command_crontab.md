---
title: "linux 命令 —— crontab 命令 定时任务"
date: 2022-01-19 19:16:28
tag: [command, crontab]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

## 命令简介

我们经常使用的是 crontab 命令是 cron table 的简写，它是 cron 的配置文件，也可以叫它作业列表，我们可以在以下文件夹内找到相关配置文件。

- /var/spool/cron/ 目录下存放的是每个用户包括 root 的 crontab 任务，每个任务以创建者的名字命名
- /etc/crontab 这个文件负责调度各种管理和维护任务。
- /etc/cron.d/ 这个目录用来存放任何要执行的 crontab 文件或脚本。
  我们还可以把脚本放在/etc/cron.hourly、/etc/cron.daily、/etc/cron.weekly、/etc/cron.monthly 目录中，让它每小时/天/星期、月执行一次。

nc 实际上是 ncat 的软链接。ncat 是为 Nmap(Network Mapper) 项目编写的，是 Nmap 套件中的一员，它旨在成为可靠的后端工具，可立即为其他应用程序和用户提供网络连接。ncat 不仅可以使用 IPv4 和 IPv6，还可以为用户提供几乎无限的潜在用途。

crontab 的使用
我们常用的命令如下：

    crontab [-u username]　　　　//省略用户表表示操作当前用户的crontab
        -e      (编辑工作表)
        -l      (列出工作表里的命令)
        -r      (删除工作作业)

我们用 crontab -e 进入当前用户的工作表编辑，是常见的 vim 界面。每行是一条命令。

crontab 的命令构成为 时间+动作，其时间有分、时、日、月、周五种，操作符有

- * 取值范围内的所有数字
- / 每过多少个数字
- - 从X到Z
- ，散列数字

## 使用简介（ubuntu）

```bash
sudo apt-get update
sudo apt-get install cron

sudo /usr/sbin/service cron start

crontab -e

* * * * * sync; echo 3 > /proc/sys/vm/drop_caches

sudo /usr/sbin/service cron restart

sudo /usr/sbin/service cron status
```

## 格式

```bash
f1 f2 f3 f4 f5 program
```

- 其中 f1 是表示分钟，f2 表示小时，f3 表示一个月份中的第几日，f4 表示月份，f5 表示一个星期中的第几天。program 表示要执行的程序。
- 当 f1 为 _时表示每分钟都要执行 program，f2 为_ 时表示每小时都要执行程序，以此类推
- 当 f1 为 a-b 时表示从第 a 分钟到第 b 分钟这段时间内要执行，f2 为 a-b 时表示从第 a 到第 b 小时都要执行，以此类推
- 当 f1 为 _/n 时表示每 n 分钟个时间间隔执行一次，f2 为_/n 表示每 n 小时个时间间隔执行一次，以此类推
- 当 f1 为 a, b, c,… 时表示第 a, b, c,… 分钟要执行，f2 为 a, b, c,… 时表示第 a, b, c…个小时要执行，以此类推

```
*    *    *    *    *
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- 星期中星期几 (0 - 7) (星期天 为0)
|    |    |    +---------- 月份 (1 - 12)
|    |    +--------------- 一个月中的第几天 (1 - 31)
|    +-------------------- 小时 (0 - 23)
+------------------------- 分钟 (0 - 59)
```

## 实例

### 实例 1：每 1 分钟执行一次 myCommand

```bash
* * * * * myCommand
```

### 实例 2：每小时的第 3 和第 15 分钟执行

```bash
3,15 * * * * myCommand
```

### 实例 3：在上午 8 点到 11 点的第 3 和第 15 分钟执行

```bash
3,15 8-11 * * * myCommand
```

### 实例 4：每隔两天的上午 8 点到 11 点的第 3 和第 15 分钟执行

```bash
3,15 8-11 */2  *  * myCommand
```

### 实例 5：每周一上午 8 点到 11 点的第 3 和第 15 分钟执行

```bash
3,15 8-11 * * 1 myCommand
```

### 实例 6：每晚的 21:30 重启 smb

```bash
30 21 * * * /etc/init.d/smb restart
```

### 实例 7：每月 1、10、22 日的 4 : 45 重启 smb

```bash
45 4 1,10,22 * * /etc/init.d/smb restart
```

### 实例 8：每周六、周日的 1 : 10 重启 smb

```bash
10 1 * * 6,0 /etc/init.d/smb restart
```

### 实例 9：每天 18 : 00 至 23 : 00 之间每隔 30 分钟重启 smb

```bash
0,30 18-23 * * * /etc/init.d/smb restart
```

### 实例 10：每星期六的晚上 11 : 00 pm 重启 smb

```bash
0 23 * * 6 /etc/init.d/smb restart
```

### 实例 11：每一小时重启 smb

```bash
0 */1 * * * /etc/init.d/smb restart
```

### 实例 12：晚上 11 点到早上 7 点之间，每隔一小时重启 smb

```bash
0 23-7/1 * * * /etc/init.d/smb restart
```

## 几种便捷写法

```bash
@hourly 代表 0 * * * * ，每个小时运行一次
@daily 代表 0 0 * * * ，每天凌晨运行一次
@weekly 代表 0 0 * * 0 ，每周星期天凌晨运行一次
@monthly 代表 0 0 1 * * ，每个月第一天凌晨运行一次
@yearly 代表 0 0 1 1 * ，每年的头一分钟运行一次
@reboot 重启后执行一次
@reboot root /sbin/service httpd start  # 开机启动apache
```

/etc/cron.d/下面的文件和/etc/crontab 文件格式一样。
/etc/cron.d/0hourly 文件控制定时执行/etc/cron.hourly/下面的程序

```bash
cat /etc/cron.d/0hourly
# Run the hourly jobs
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
01 * * * * root run-parts /etc/cron.hourly
```

/etc/anacrontab 文件控制定时执行/etc/cron.daily/, /etc/cron.monthly/,/etc/cron.weekly/下面的命令

```bash
cat /etc/anacrontab
# /etc/anacrontab: configuration file for anacron

# See anacron(8) and anacrontab(5) for details.

SHELL=/bin/sh
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
# the maximal random delay added to the base delay of the jobs
RANDOM_DELAY=45
# the jobs will be started during the following hours only
START_HOURS_RANGE=3-22

#period in days   delay in minutes   job-identifier   command
1 5 cron.daily    nice run-parts /etc/cron.daily
7 25  cron.weekly   nice run-parts /etc/cron.weekly
@monthly 45 cron.monthly    nice run-parts /etc/cron.monthly
```
