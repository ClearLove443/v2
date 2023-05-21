---
title: Kafka为什么要放弃Zookeeper
date: "2021-12-31 19:18:00"
tag: [kafka, zookeeper]
category: kafka
published: true
hideInList: false
feature:
isTop: false
---

最近，confluent 社区发表了一篇文章，主要讲述了 Kafka 未来的 2.8 版本将要放弃 Zookeeper，这对于 Kafka 用户来说，是一个重要的改进。之前部署 Kafka 就必须得部署 Zookeeper，而之后就只要单独部署 Kafka 就行了。[1]

## Kafka 简介

Apache Kafka 最早是由 Linkedin 公司开发，后来捐献给了 Apack 基金会。

Kafka 被官方定义为分布式流式处理平台，因为具备高吞吐、可持久化、可水平扩展等特性而被广泛使用。目前 Kafka 具体如下功能：

- 消息队列,Kafka 具有系统解耦、流量削峰、缓冲、异步通信等消息队列的功能。
- 分布式存储系统，Kafka 可以把消息持久化，同时用多副本来实现故障转移，可以作为数据存储系统来使用。
- 实时数据处理，Kafka 提供了一些和数据处理相关的组件，比如 Kafka Streams、Kafka Connect，具备了实时数据的处理功能。

下面这张图是 Kafka 的消息模型：[2]

![Kafka1](/8c3ab9af88001949566c76389b3153c7.png-wh_600x-s_230681648.png)

通过上面这张图，介绍一下 Kafka 中的几个主要概念：

- producer 和 consumer: 消息队列中的生产者和消费者，生产者将消息推送到队列，消费者从队列中拉取消息。
- consumer group:消费者集合，这些消费者可以并行消费同一个 topic 下不同 partition 中的消息。
- broker：Kafka 集群中的服务器。
- topic：消息的分类。
- partition：topic 物理上的分组，一个 topic 可以有 partition，每个 partition 中的消息会被分配一个有序的 id 作为 offset。每个 consumer group 只能有一个消费者来消费一个 partition。

## Kafka 和 Zookeeper 关系

Kafka 架构如下图：图片从图中可以看到，Kafka 的工作需要 Zookeeper 的配合。那他们到底是怎么配合工作呢?

看下面这张图：

![Kafka2](/d6b1845894f2a2ba16afb06984cb45e5.png)

从图中可以看到，Kafka 的工作需要 Zookeeper 的配合。那他们到底是怎么配合工作呢？
看下面这张图：

![Kafka3](/73196028cf801ff19ff2ac1afa960c14.png-wh_600x-s_3091085894.png)

### 注册中心

#### broker 注册

从上面的图中可以看到，broker 分布式部署，就需要一个注册中心来进行统一管理。Zookeeper 用一个专门节点保存 Broker 服务列表，也就是 /brokers/ids。
broker 在启动时，向 Zookeeper 发送注册请求，Zookeeper 会在/brokers/ids 下创建这个 broker 节点，如/brokers/ids/[0...N]，并保存 broker 的 IP 地址和端口。
这个节点临时节点，一旦 broker 宕机，这个临时节点会被自动删除。

#### topic 注册

Zookeeper 也会为 topic 分配一个单独节点，每个 topic 都会以/brokers/topics/[topic_name]的形式记录在 Zookeeper。
一个 topic 的消息会被保存到多个 partition，这些 partition 跟 broker 的对应关系也需要保存到 Zookeeper。
partition 是多副本保存的，上图中红色 partition 是 leader 副本。当 leader 副本所在的 broker 发生故障时，partition 需要重新选举 leader，这个需要由 Zookeeper 主导完成。
broker 启动后，会把自己的 Broker ID 注册到到对应 topic 节点的分区列表中。
我们查看一个 topic 是 xxx，分区编号是 1 的信息，命令如下：

```bash
[root@master] get /brokers/topics/xxx/partitions/1/state

{"controller_epoch":15,"leader":11,"version":1,"leader_epoch":2,"isr":[11,12,13]}
```

当 broker 退出后，Zookeeper 会更新其对应 topic 的分区列表。

#### consumer 注册

消费者组也会向 Zookeeper 进行注册，Zookeeper 会为其分配节点来保存相关数据，节点路径为/consumers/{group_id}，有 3 个子节点，如下图:

![Kafka4](/63ab7e224c073c3ac9a391ad68622e75.png-wh_600x-s_1924041234.png)

这样 Zookeeper 可以记录分区跟消费者的关系，以及分区的 offset。[3]

### 负载均衡

broker 向 Zookeeper 进行注册后，生产者根据 broker 节点来感知 broker 服务列表变化，这样可以实现动态负载均衡。
consumer group 中的消费者，可以根据 topic 节点信息来拉取特定分区的消息,实现负载均衡。
实际上，Kafka 在 Zookeeper 中保存的元数据非常多，看下面这张图：

![Kafka5](/01360056c4ebf173e0b63b3c5a77bd71.png-wh_600x-s_3713766394.png)

随着 broker、topic 和 partition 增多，保存的数据量会越来越大。

## Controller 介绍

经过上一节的讲述，我们看到了 Kafka 对 Zookeeper 的依赖非常大，Kafka 离开 Zookeeper 是没有办法独立运行的。那 Kafka 是怎么跟 Zookeeper 进行交互的呢?

如下图：[4]Kafka 集群中会有一个 broker 被选举为 Controller 负责跟 Zookeeper 进行交互，它负责管理整个 Kafka 集群中所有分区和副本的状态。其他 broker 监听 Controller 节点的数据变化。

Controller 的选举工作依赖于 Zookeeper，选举成功后，Zookeeper 会创建一个/controller 临时节点。

Controller 具体职责如下：

- 监听分区变化

比如当某个分区的 leader 出现故障时，Controller 会为该分区选举新的 leader。当检测到分区的 ISR 集合发生变化时，Controller 会通知所有 broker 更新元数据。当某个 topic 增加分区时，Controller 会负责重新分配分区。

- 监听 topic 相关的变化
- 监听 broker 相关的变化
- 集群元数据管理

下面这张图展示了 Controller、Zookeeper 和 broker 的交互细节：

![Kafka6](/8c1872cf1934dfa6605c0ac41ee011af.png-wh_600x-s_3619584714.png)

Controller 选举成功后，会从 Zookeeper 集群中拉取一份完整的元数据初始化 ControllerContext，这些元数据缓存在 Controller 节点。当集群发生变化时，比如增加 topic 分区，Controller 不仅需要变更本地的缓存数据，还需要将这些变更信息同步到其他 Broker。

Controller 监听到 Zookeeper 事件、定时任务事件和其他事件后，将这些事件按照先后顺序暂存到 LinkedBlockingQueue 中，由事件处理线程按顺序处理，这些处理多数需要跟 Zookeeper 交互，Controller 则需要更新自己的元数据。

## Zookeeper 带来的问题

Kafka 本身就是一个分布式系统，但是需要另一个分布式系统来管理，复杂性无疑增加了。

### 运维复杂度

使用了 Zookeeper，部署 Kafka 的时候必须要部署两套系统，Kafka 的运维人员必须要具备 Zookeeper 的运维能力。

### Controller 故障处理

Kafaka 依赖一个单一 Controller 节点跟 Zookeeper 进行交互，如果这个 Controller 节点发生了故障，就需要从 broker 中选择新的 Controller。如下图,新的 Controller 变成了 broker3。

![Kafka6](/59ea31b7ae4017f29ab6c18b78a234ee.jpg-wh_600x-s_961669565.jpg)

新的 Controller 选举成功后，会重新从 Zookeeper 拉取元数据进行初始化，并且需要通知其他所有的 broker 更新 ActiveControllerId。老的 Controller 需要关闭监听、事件处理线程和定时任务。分区数非常多时，这个过程非常耗时，而且这个过程中 Kafka 集群是不能工作的。

### 分区瓶颈

当分区数增加时，Zookeeper 保存的元数据变多，Zookeeper 集群压力变大，达到一定级别后，监听延迟增加，给 Kafaka 的工作带来了影响。

所以，Kafka 单集群承载的分区数量是一个瓶颈。而这又恰恰是一些业务场景需要的。

## 升级

升级前后的架构图对比如下：

![Kafka7](/af8a6e2527cc126816713c84a4f46fa5.png)

KIP-500 用 Quorum Controller 代替之前的 Controller，Quorum 中每个 Controller 节点都会保存所有元数据，通过 KRaft 协议保证副本的一致性。这样即使 Quorum Controller 节点出故障了，新的 Controller 迁移也会非常快。
官方介绍，升级之后，Kafka 可以轻松支持百万级别的分区。
Kafak 团队把通过 Raft 协议同步数据的方式 Kafka Raft Metadata mode,简称 KRaft
Kafka 的用户体量非常大，在不停服的情况下升级是必要的。
目前去除 Zookeeper 的 Kafka 代码 KIP-500 已经提交到 trunk 分支，并且计划在未来的 2.8 版本发布。
Kafaka 计划在 3.0 版本会兼容 Zookeeper Controller 和 Quorum Controller，这样用户可以进行灰度测试。[5]

## 总结

在大规模集群和云原生的背景下，使用 Zookeeper 给 Kafka 的运维和集群性能造成了很大的压力。去除 Zookeeper 是必然趋势，这也符合大道至简的架构思想。

Reference

- [1]参考 1: [Apache Kafka Made Simple: A First Glimpse of a Kafka Without ZooKeeper](https://www.confluent.io/blog/kafka-without-zookeeper-a-sneak-peek/)

- [2]参考 2: [Kafka Controller 工作原理](https://blog.csdn.net/Zidingyi_367/article/details/110490910)

- [3]参考 3: [Zookeeper 在 Kafka 中的作用](https://www.jianshu.com/p/a036405f989c)

- [4]参考 4: [直击 Kafka 的心脏——控制器](https://honeypps.com/mq/kafka-controller-analysis/)

- [5]参考 5: [消息系统兴起二次革命：Kafka 不需要 ZooKeeper](https://mp.weixin.qq.com/s/ev6NM6hptltQBuTaCHJCQQ)
