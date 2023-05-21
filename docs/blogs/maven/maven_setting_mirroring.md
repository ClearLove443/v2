---
title: "Java开发者必备神器Maven国内镜像加速深度测试"
date: "2021-10-09 23:57:58"
tag: [Maven]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

Maven 是当前流行的项目管理工具，但官方的库在国内经常连不上，连上以后龟一般的速度也能让你崩溃，这时候也许你会去搜索下如何加速。
百度搜索 maven 镜像 会发现绝大部分都在推荐 阿里云 的镜像服务，但是阿里云的镜像服务真的好用吗？去国内各大云厂商搜索了下发现都提供了镜像服务，到底哪个是最快的呢？这里进行深度测试。各大厂商也是鸡贼，对关键字也做了处理比如腾讯的 腾讯云镜像 maven 腾讯云 maven 镜像

镜像地址

- 阿里云 https://maven.aliyun.com/mvn/view
- 腾讯云 https://mirrors.cloud.tencent.com/
- 华为云 https://mirrors.huaweicloud.com/

下载速度
配置文件准备
示例程序使用之前多数据源配置的程序样例，文末有下载方式

我们使用华为云 maven 镜像加速下载下来的配置文件为模板，复制三份，mirror 分别指定为华为云、阿里云、腾讯云的地址，文件命名为 settings_ali.xml settings_huawei.xml settings_tencent.xml

maven 本地缓存路径使用默认的地址 ${user.home}/.m2/repository ,每次构建之前需要清理本地缓存文件

```bash
rm -rf /root/.m2/repository/*
```

我们使用 maven 命令行窗口指定特定 settings.xml 的方式进行测试
maven 命令如下

```bash
mvn clean package -Dmaven.test.skip=true -s settings_ali.xml
```

完整的脚本
这里以华为云为例，脚本执行 100 次

```bash
#!/bin/bash
echo '' > huawei
for ((i=1; i<=100; i ++))
do
    echo $i
    rm -rf /root/.m2/repository/*
    # start_mill=$((`date '+%s'`*1000+`date '+%N'`/1000000))
    mvn clean package -Dmaven.test.skip=true -s settings_huawei.xml >> huawei
    # end_mill=$((`date '+%s'`*1000+`date '+%N'`/1000000))
    # diff=$[10#$end_mill-10#$start_mill]
    #echo $diff >> huawei
done
grep 'Total time' huawei |awk 'BEGIN {max = 0} {if ($4>max) max=$4 fi} END {print "Max=", max}'
grep 'Total time' huawei |awk 'BEGIN {min = 6553565} {if ($4<min) min=$4 fi} END {print "Min=", min}'
grep 'Total time' huawei |awk '{sum+=$4}END{print "Average = ", sum/NR}'
```

使用到了 awk 进行统计

结论
用户体验： 华为云>腾讯云>阿里云
下载速度： 华为云>阿里云>腾讯云

用户体验无所谓了一次性配置，我们肯定首选下载速度最快的华为云了。

小技巧：使用 nohup 让脚本后台运行，nohup sh mvn-tencent.sh &
