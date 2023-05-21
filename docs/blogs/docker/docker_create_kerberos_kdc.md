---
title: "docker本地构建kerberos 单机环境"
date: "2021-10-23 12:59:34"
tag: [docker, kerberos, kdc, authentication]
category: security
published: true
hideInList: false
feature:
isTop: false
---

## kerberos 简介

众所周知,kerberos 是大数据环境下最常用的安全通信的保障机制,是一种网络协议
本文不涉及 kerberos 原理,只涉及 docker 搭建 kerberos 环境

## kerberos 原理

- Kerberos 原理

[Kerberos 原理](https://juejin.cn/post/6844903955416219661)

- 使用 Kerberos 进行网络身份验证

[使用 Kerberos 进行网络身份验证](https://documentation.suse.com/zh-cn/sles/15-SP2/html/SLES-all/cha-security-kerberos.html)

## Kerberos（KDC） 几个重要的概念：

- Principal：任何服务器所提供的用户、计算机、服务都将被定义成 Principal。
- Instances：用于服务 principals 和特殊管理 Principal。
- Realms：Kerberos 安装提供的独特的域的控制，把它想象成你的主机和用户所属的主机或者组。官方约定这域需要大写。默认的，Ubuntu 将把 DNS 域名转换为大写当成这里的域。 本例使用
- Key Distribution Center: （KDC）由三部分组成，一是 principal 数据库，认证服务器，和票据授予服务器。每个 Realm 至少要有一个。
- Ticket Granting Ticket：由认证服务器（AS）签发，Ticket Granting Ticket (TGT)使用用户的密码加密，这个密码只有用户和 KDC 知道。
- Ticket Granting Server: (TGS) 根据请求签发服务的票据。
- Tickets：确认两个 Principal 的身份。一个主体是用户，另一个是由用户请求的服务。门票会建立一个加`***`，用于在身份验证会话中的安全通信。
- Keytab Files：从 KDC 主数据库中提取的文件，并且包含的服务或主机的加\*\*\*。

## 创建配置文件

### 创建文件夹/home/ubuntu/docker/kerberos

```
mkdir /home/ubuntu/docker/kerberos
```

### 创建下面目录

```
.
├── ./conf
│   ├── ./conf/hosts
│   ├── ./conf/kadm5.acl
│   ├── ./conf/kdc.conf
│   └── ./conf/krb5.conf
├── ./Dockerfile
└── ./keytab
    └── ./keytab/
```

### 修改配置文件

- ./conf/hosts

```
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
ff00::0	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.18.0.4	ef6d55663265
127.0.0.1 kdc
```

- ./conf/kadm5.acl

```
cloudera-scm/admin@HADOOP.COM	*
```

- ./conf/kdc.conf

```
[kdcdefaults]
 kdc_ports = 88
 kdc_tcp_ports = 88

[realms]
 HADOOP.COM = {
  #master_key_type = aes256-cts
  acl_file = /var/kerberos/krb5kdc/kadm5.acl
  dict_file = /usr/share/dict/words
  admin_keytab = /var/kerberos/krb5kdc/kadm5.keytab
  max_renewable_life = 7d
  supported_enctypes = aes128-cts:normal des3-hmac-sha1:normal arcfour-hmac:normal camellia256-cts:normal camellia128-cts:normal des-hmac-sha1:normal des-cbc-md5:normal des-cbc-crc:normal
 }
```

- ./conf/krb5.conf

```
includedir /etc/krb5.conf.d/

[logging]
 default = FILE:/var/log/krb5libs.log
 kdc = FILE:/var/log/krb5kdc.log
 admin_server = FILE:/var/log/kadmind.log

[libdefaults]
 dns_lookup_kdc = false
 dns_lookup_realm = false
 ticket_lifetime = 24h
 renew_lifetime = 7d
 forwardable = true
 default_realm = HADOOP.COM
 udp_preference_limit = 1
[realms]
 HADOOP.COM = {
  kdc = kdc
  admin_server = kdc
 }

[domain_realm]
 .hadoop.com = HADOOP.COM
 hadoop.com = HADOOP.COM
```

- ./Dockerfile

```
FROM centos:7
RUN yum install -y krb5-server krb5-libs krb5-auth-dialog krb5-workstation
CMD ["/usr/sbin/init"]
```

## 打包 docker 镜像

```bash
cd /home/ubuntu/docker/kerberos && sudo docker build -t kdc:1.0 .
```

等待打包构建镜像,因为涉及到 kerberos 的下载安装,可能会比较慢
使用 docker images 命令可以看到新生成的 docker 镜像

## docker 启动及初始化

### 启动

```
docker run --privileged=true -p 88:88 -p 749:749 -p 750:750 -d --name="my_kdc" -v /home/ubuntu/docker/kerberos/conf/kdc.conf:/var/kerberos/krb5kdc/kdc.conf -v /home/ubuntu/docker/kerberos/conf/krb5.conf:/etc/krb5.conf -v /home/ubuntu/docker/kerberos/conf/hosts:/etc/hosts -v /home/ubuntu/docker/kerberos/conf/kadm5.acl:/var/kerberos/krb5kdc/kadm5.acl -v /home/ubuntu/docker/kerberos/keytab:/keytab/ kdc:1.0
```

- 首先进入容器的 bash

```bash
sudo docker exec -it my_kdc bash
```

rm /var/kerberos/krb5kdc/principal\*

- 初始化数据库

```bash
kdb5_util create -s -r HADOOP.COM
# password => password

kdb5_util create -s -r HADOOP.COM -P password
```

- 启动 kdc

```bash
systemctl start kadmin krb5kdc
```

- 查看状态

```bash
systemctl status kadmin
systemctl status krb5kdc
```

### 添加管理权限

- 进入 kadmin 交互命令行

```bash
kadmin.local
```

- 增加管理员用户并设置密码

```bash
addprinc cloudera-scm/admin@HADOOP.COM
# password => password

addprinc -pw password cloudera-scm/admin@HADOOP.COM
```

- 测试连接是否成功

```
kinit cloudera-scm/admin@HADOOP.COM
```

- 增加普通用户并设置密码

```bash
addprinc hdfs/kdc@HADOOP.COM
# password => password

addprinc -pw password hdfs/kdc@HADOOP.COM
```

- 测试连接是否成功

```
kinit hdfs/kdc@HADOOP.COM
```

- 查看用户列表

```bash
listprincs
```

- 删除用户

```bash
# 使用管理员用户
kinit cloudera-scm/admin@HADOOP.COM

kadmin
delete_principal test/kdc@HADOOP.COM
```

- 导出 keytab 文件到指定目录

```bash
ktadd -k /keytab/admin.keytab -norandkey cloudera-scm/admin@HADOOP.COM
ktadd -k /keytab/hdfs.keytab -norandkey hdfs/kdc@HADOOP.COM
```

## kerberos client

### 安装客户端(ubuntu)

```bash
apt-get install krb5-user -y
```

### 安装客户端(centos)

```bash
yum install krb5-workstation krb5-libs -y
```

### 设置配置/etc/krb5.conf 配置和 server 端保持一致

```bash
cat > /etc/krb5.conf << EOF
[libdefaults]
default_realm = CLOUDERA
dns_lookup_kdc = false
dns_lookup_realm = false
ticket_lifetime = 86400
renew_lifetime = 604800
forwardable = true
default_tgs_enctypes = aes128-cts
default_tkt_enctypes = aes128-cts
permitted_enctypes = aes128-cts
udp_preference_limit = 1
kdc_timeout = 3000
[realms]
CLOUDERA = {
# kdc = quickstart.cloudera
kdc = 110.42.214.104
admin_server = quickstart.cloudera
}
HADOOP.COM = {
#kdc = kdc
kdc = 110.40.137.191
admin_server = kdc
}
EOF
```

### 使用用户名和密码的方式验证 kerberos 配置在客户端通过用户名和密码认证

```bash
kinit hdfs/kdc@HADOOP.COM
# password => password
```

### 通过密钥登陆

```bash
kinit -kt /keytab/hdfs.keytab hdfs/kdc@HADOOP.COM
```

### 查看 principal

```bash
klist -k hdfs.keytab
```

## windows

### 安装客户端

安装 MIT Kerberos Ticket Manager

### 设置配置和 server 端保持一致

C:\ProgramData\MIT\Kerberos5\krb5.ini

```ini
[libdefaults]
default_realm = CLOUDERA
dns_lookup_kdc = false
dns_lookup_realm = false
ticket_lifetime = 86400
renew_lifetime = 604800
forwardable = true
default_tgs_enctypes = aes128-cts
default_tkt_enctypes = aes128-cts
permitted_enctypes = aes128-cts
udp_preference_limit = 1
kdc_timeout = 3000
[realms]
CLOUDERA = {
kdc = quickstart.cloudera
#kdc = kdc
admin_server = quickstart.cloudera
}

HADOOP.COM = {
kdc = kdc
admin_server = kdc
}
```

### 设置 host

```conf
# C:\Windows\System32\drivers\etc\hosts
# kdc host
192.168.50.28 kdc
```

### 使用用户名和密码的方式验证 kerberos 配置在客户端通过用户名和密码认证

- admin user
  cloudera-scm/admin@HADOOP.COM password

- hdfs usrr

hdfs/kdc@HADOOP.COM password
