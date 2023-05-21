---
title: "ubuntu 安装 beeline"
date: "2021-09-25 15:59:52"
tag: [beeline, ubuntu, hive]
category: big-data
published: true
hideInList: false
feature:
isTop: false
---

Although Beeline is included on the head nodes, you may want to install it locally. The install steps for a local machine are based on a Windows Subsystem for Linux.

# Update package lists. Enter the following command in your bash shell:

```bash
sudo apt-get update
```

# Install Java if not installed. You can check with the which java command.

```bash
java -version
```

## If no java package is installed, enter the following command:

```bash
sudo apt install openjdk-8-jre-headless
```

## Open the bashrc file (often found in ~/.bashrc):

```bash
nano ~/.bashrc
```

## Amend the bashrc file. Add the following line at the end of the file:

```bash
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
```

Then press Ctrl+X, then Y, then enter.

# Download Hadoop and Beeline archives, enter the following commands:

```bash
wget https://archive.apache.org/dist/hadoop/core/hadoop-2.7.3/hadoop-2.7.3.tar.gz
wget https://archive.apache.org/dist/hive/hive-1.2.1/apache-hive-1.2.1-bin.tar.gz
```

# Unpack the archives, enter the following commands:

```bash
tar -xvzf hadoop-2.7.3.tar.gz
tar -xvzf apache-hive-1.2.1-bin.tar.gz
```

# Further amend the bashrc file. You'll need to identify the path to where the archives were unpacked. If using the Windows Subsystem for Linux, and you followed the steps exactly, your path would be /mnt/c/Users/user/, where user is your user name.

## Open the file: `nano ~/.bashrc`

## Modify the commands below with the appropriate path and then enter them at the end of the bashrc file:

```bash
export HADOOP_HOME=/path_where_the_archives_were_unpacked/hadoop-2.7.3
export HIVE_HOME=/path_where_the_archives_were_unpacked/apache-hive-1.2.1-bin
PATH=$PATH:$HIVE_HOME/bin
```

## Then press Ctrl+X, then Y, then enter.

# Close and then reopen you bash session.

# Test your connection. Use the connection format from Over public or private endpoints, above.
