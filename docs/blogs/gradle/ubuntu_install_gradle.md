---
title: "Ubuntu install gradle"
date: "2025-06-27 10:59:12"
tag: [gradle, linux]
category: install
published: true
hideInList: false
feature:
isTop: false
---



## download gradle to tmp folder

```sh
wget https://services.gradle.org/distributions/gradle-8.14.2-bin.zip -P /tmp
```

## unzip to opt folder

```sh
sudo unzip -d /opt/gradle /tmp/gradle-8.14.2-bin.zip
```

## create gradle profile

```sh
sudo vim /etc/profile.d/gradle.sh

export GRADLE_HOME=/opt/gradle/gradle-8.14.2
export PATH=${GRADLE_HOME}/bin:${PATH}
```

## activate gradle profile

```sh
source /etc/profile.d/gradle.sh
```

## verify gradle install

```sh
gradle -v
```
