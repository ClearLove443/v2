---
title: docker kafka 外网访问不到
date: "2021-12-31 18:55:48"
tag: [docker]
category: kafka
published: true
hideInList: false
feature:
isTop: false
---

需要设置 advertised.listeners 参数。

## listeners

docker 中也可以用`KAFKA_LISTENERS`代替
listeners 就是主要用来定义 Kafka Broker 的 Listener 的配置项。是 kafka 真正 bind 的地址。

## advertised.listeners

docker 中也可以用`KAFKA_ADVERTISED_LISTENERS`代替
advertised.listeners 参数的作用就是将 Broker 的 Listener 信息发布到 Zookeeper 中。是暴露给外部的 listeners，如果没有设置，会用 listeners。
