---
title: "ubuntu 安装 jenkins"
date: 2021-09-06 22:12:31
tag: [jenkins, ubuntu]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

Jenkins 是一款开源自动化服务器，可用于轻松设置持续集成和持续交付（CI / CD）管道。

持续集成（CI）是 DevOps 的一种实践，团队成员定期将其代码更改提交到版本控制存储库，然后运行自动构建和测试。 持续交付（CD）是一系列的实践，代码更改会自动生成，测试并部署到生产中。

Jenkins 可以作为独立应用程序安装，也可以作为 Java servlet 容器（例如 Apache Tomcat ）中的 servlet 安装，也可以作为 Docker 容器运行。

本文介绍了如何在 Ubuntu 20.04 上将 Jenkins 作为独立服务安装

# 安装 Java

```bash
apt update
apt install openjdk-11-jdk
```

安装完成后，请检查 Java 版本:

```bash
java -version
```

# 安装 Jenkins

在 Ubuntu 上安装 Jenkins 相对简单。 我们将启用 Jenkins APT 存储库，导入存储库 GPG 密钥，并安装 Jenkins 软件包。

使用以下 wget 命令导入 Jenkins 存储库的 GPG 密钥：

```bash
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
```

接下来，使用以下命令将 Jenkins 存储库添加到系统中：

```bash
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
```

启用 Jenkins 存储库后，通过输入以下命令更新 apt 包列表并安装最新版本的 Jenkins:

```bash
apt update
apt install jenkins
```

如果收到错误消息：

```bash
Error: W: GPG error: https://pkg.jenkins.io/debian-stable binary/ Release: The following signatures couldn’t be verified because the public key is not available: NO_PUBKEY 9B7D32F2D50582E6"
```

请将密钥导入：

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 9B7D32F2D50582E6
```

Jenkins 服务将在安装过程完成后自动启动。 您可以通过打印服务状态进行验证：

```bash
systemctl status jenkins
```

您应该看到类似以下的内容

```bash
● jenkins.service - LSB: Start Jenkins at boot time
     Loaded: loaded (/etc/init.d/jenkins; generated)
     Active: active (exited) since Thu 2020-07-16 20:22:12 UTC; 15min ago
...
```

# 调整防火墙

如果要在受防火墙保护的远程 Ubuntu 服务器上安装 Jenkins，则需要打开端口 8080。

通常，您只想允许从特定 IP 地址或 IP 范围访问 Jenkins 服务器。 例如，要仅允许来自“ 192.168.121.0/24”子网的连接，可以运行以下命令：

```bash
sudo ufw allow proto tcp from 192.168.121.0/24 to any port 8080
```

如果您需要允许从任何地方访问，请执行以下操作：

```bash
sudo ufw allow 8080
```

# 设置 Jenkins

要设置新安装的 Jenkins，请打开浏览器，键入域或 IP 地址，然后输入端口 8080，http://your_ip_or_domain:8080。

提示您输入在安装过程中创建的管理员密码：

使用 cat 在终端上显示密码：

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

您应该看到一个 32 个字符长的字母数字密码，如下所示：

```bash
06cbf25d811a424bb236c76fd6e04c47
```

从终端复制密码，将其粘贴到“管理员密码”字段中，然后单击“继续”。

在下一个屏幕上，设置向导将询问您是否要安装建议的插件或要选择特定的插件。

点击“安装建议的插件 Install suggested plugins”选项，安装过程将立即开始。

安装了插件后，系统将提示您设置第一个管理员用户。 填写所有必填信息，然后单击“保存并继续”。

下一页将要求您设置 Jenkins 实例的 URL。 该字段将填充自动生成的网址。

通过单击 Save and Finish 按钮确认 URL，然后完成设置过程。

单击 Start using Jenkins 按钮，您将被重定向到以您在前面的步骤之一中创建的 admin 用户身份登录的 Jenkins 仪表板。

至此，您已经在服务器上成功安装了 Jenkins。

# 修改 Jenkins 配置文件

停止 jenkins

```bash
systemctl stop jenkins
```

## 上传自定义的 ca 证书

```bash
mkdir /opt/jenkins/update-center-rootCAs
wget https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt -O /opt/jenkins/update-center-rootCAs/update-center.crt
chown root.root -R /opt/jenkins/update-center-rootCAs
```

## 修改默认执行用户

最近在需要在 jenkins 执行 shell 脚本，由于 Jenkins 之前是默认在线安装的，这样 jenkins 设置了默认用户 jenkins 权限
如果要执行 root 用户命令，则报权限错误

所以要更换 jenkins 为 root 用户
改变步骤如下：
首先查找在线安装 jenkins 的目录, 然后执行

```bash
find / -name "jenkins"
```

编辑文件 /etc/default/jenkins

```bash
vim /etc/default/jenkins
JENKINS_USER=root
JENKINS_GROUP=root
```

## 修改 jenkins 默认工作空间

在`/etc/profile`文件最后添加 JENKINS_HOME

```bash
echo "export JENKINS_HOME=/opt/jenkins" >> /etc/profile
. /etc/profile
```

重新启动 jenkins 服务

```bash
systemctl start jenkins
```

确认结果

```bash
top
```

执行 jenkins 的用户变成了 root

启动网页确认工作空间。

## 修改插件下载地址

```
https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/updates/huawei/update-center.json
```
