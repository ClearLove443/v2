---
title: "MongoDB配置SSL/TLS安全连接、java连接"
date: "2021-10-17 14:24:12"
tag: [mongodb, ssl, tsl]
category: big-data
published: true
hideInList: false
feature:
isTop: false
---

# 服务器端证书配置

服务器端需两个文件: `ca.pem`、`server.pem`

## 生成 ca.pem

```bash
openssl req -out ca.pem -new -x509 -days 3650 -subj "/C=CN/ST=BeiJing/O=bigdata/CN=root/CN=docker.wsl2.mongodb/emailAddress=yangxc@163.com"
# 此处会要求配置ca.pem密码，后续将会用到
```

> 参数说明
>
> -x509： 用于生成自签证书，如果不是自签证书则不需要此项
>
> -days: 证书的有效期限，默认是 365 天

## 生成 server.pem

```bash
# 生成服务器端私钥
openssl genrsa -out server.key 2048
# 生成服务器端申请文件
openssl req -key server.key -new -out server.req -subj "/C=CN/ST=BeiJing/O=bigdata/CN=server1/CN=localhost/CN=docker.wsl2.mongodb/emailAddress=yangxc@163.com"
# 生成服务器端证书
openssl x509 -req -in server.req -CA ca.pem -CAkey privkey.pem -CAcreateserial -out server.crt -days 3650

# Can't load /root/.rnd into RNG
openssl rand -writerand /home/ubuntu/.rnd

# 合并服务器端私钥和服务器端证书，生成server.pem
cat server.key server.crt > server.pem
# 校验服务器端pem文件
openssl verify -CAfile ca.pem server.pem
server.pem: OK
```

# 服务器端配置

## 修改配置文件

mongodb 的 ssl/tsl 配置默认是关闭的，需更改配置文件进行开启

- ssl

```bash
vim mongod.conf

net:
#  port: 27017
#  bindIp: 127.0.0.1
  ssl:
    # 必须使用ssl连接
    mode: requireSSL
    # 必须使用绝对路径
    PEMKeyFile: /etc/server.pem
    # 必须使用绝对路径
    CAFile: /etc/ca.pem
    # 允许不可用主机名
    allowInvalidHostnames: true
    # 允许使用自签证书,如果使用自签证书必须配置该项，否则会认证失败
    allowInvalidCertificates: true
```

- tls

```bash
vim mongod.conf

net:
#  port: 27017
#  bindIp: 127.0.0.1
  tls:
    # 必须使用ssl连接
    mode: requireTLS
    # 必须使用绝对路径
    certificateKeyFile: /etc/server.pem
    # 必须使用绝对路径
    CAFile: /etc/ca.pem
    # 允许不可用主机名
    allowInvalidHostnames: true
    # 允许使用自签证书,如果使用自签证书必须配置该项，否则会认证失败
    allowInvalidCertificates: true
```

# 启动 MongoDB 数据库

```bash
docker run --name mongo_test -d --restart always -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123456 -v /home/ubuntu/mongo/mongod.conf:/etc/mongod.conf -v /home/ubuntu/mongo/etc/ca.pem:/etc/ca.pem -v /home/ubuntu/mongo/etc/server.pem:/etc/server.pem mongo --auth --config /etc/mongod.conf
```

# 客户端证书配置

## 生成 client.pem

```bash
# 生成客户端私钥
openssl genrsa -out client.key 2048
# 生成客户端申请文件
openssl req -key client.key -new -out client.req -subj "/C=CN/ST=BeiJing/O=bigdata/CN=server1/CN=localhost/CN=docker.wsl2.mongodb/emailAddress=yangxc@163.com"
# 生成客户端证书
openssl x509 -req -in client.req -CA ca.pem -CAkey privkey.pem -CAserial ca.srl  -out client.crt -days 3650
# 合并客户端私钥和客户端证书，生成client.pem
cat client.key client.crt > client.pem
# 校验客户端pem文件
openssl verify -CAfile ca.pem client.pem
client.pem: OK
```

# 测试连接

将`ca.pem`和`client.pem/server.pem`拷贝到客户端主机，然后用 navicat 测试连接

# java 客户端 ssl 配置

两种方法，一种是直接导入到 jvm ,第二种是动态管理

## 生成 trustStore 和 keyStore

### keytool 方式

```bash
#根证书信息 trustStore
keytool -import -keystore cacerts -file ca.pem -storepass 123456
```

> 参数说明：
>
> -storepass: 密钥库密码
>
> -keystore cacerts: cacertes 为密钥库文件

```bash
#客户端 keyStore
openssl pkcs12 -export -out mongodb.pkcs12 -in client.pem
```

### openssl 方式

```bash
#根证书信息 trustStore
openssl pkcs12 -export -out server.p12 -in server.crt -inkey server.key -name server.12
```

```bash
#客户端 keyStore
openssl pkcs12 -export -out keystore -in client.pem
```

## 第一种 ssl 方法

### 添加依赖

```xml
<dependency>
   <groupId>org.mongodb</groupId>
   <artifactId>mongo-java-driver</artifactId>
   <version>3.8.1</version>
</dependency>
```

### 连接代码

```java
package com.example;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class Mongo {
  public static void main(String[] args) {
    // 配置信任库
    System.setProperty("javax.net.ssl.trustStore", "cacerts");
    System.setProperty("javax.net.ssl.trustStorePassword", "123456");
    // 配置信任证书
    System.setProperty("javax.net.ssl.keyStore", "mongodb.pkcs12");
    System.setProperty("javax.net.ssl.keyStorePassword", "password");
    // 连接mongo数据库
    MongoClientURI uri = new MongoClientURI("mongodb://admin:123456@localhost:27017/?ssl=true&authSource=admin");
    MongoClient client = new MongoClient(uri);
    // 获取mongo数据库中的库名
    System.out.println(client.listDatabaseNames().first());
  }
}
```

## 第二种动态加载 ssl

1. 通过 System setProperty 设置程序运行时属性的方式，可能会增加程序的不安全性，特别是在使用第三方库的时候。自定义 KeyManager TrustManager，生成定制 SSLContext 实例可以解决这个问题，而且不会污染系统属性。
2. 不需要添加服务端证书至 JVM 证书库，只需在程序中指定 jdk 支持格式的证书、client 端 keystore 即可。

### 添加依赖

```xml
    <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongo-java-driver</artifactId>
      <version>3.8.1</version>
    </dependency>
    <dependency>
      <groupId>org.springframework.data</groupId>
      <artifactId>spring-data-mongodb</artifactId>
      <version>3.2.5</version>
    </dependency>
    <dependency>
      <groupId>org.apache.httpcomponents</groupId>
      <artifactId>httpcore</artifactId>
      <version>4.4.9</version>
    </dependency>
```

### 连接代码

```java
package com.example;

import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.SecureRandom;

import javax.net.SocketFactory;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

public class Mongo {
  public static void main(String[] args) {
    try {

      String trustStore = "cacerts";
      String trustStorePassword = "123456";

      String keyStore = "mongodb.pkcs12";
      String keyStorePassword = "password";

      // 添加SSL认证
      SocketFactory socketFactory = createSocketFactory(trustStore, trustStorePassword, keyStore, keyStorePassword);
      // 设置ssl配置
      MongoClientOptions sslOptions = MongoClientOptions.builder().socketFactory(socketFactory).sslEnabled(true)
          .sslInvalidHostNameAllowed(true).build();

      // init mongo
      String username = "admin";
      String password = "123456";
      String dbName = "admin";
      String ip = "127.0.0.1";
      int port = 27017;
      MongoCredential credential = MongoCredential.createCredential(username, dbName, password.toCharArray());

      MongoClient client2 = new MongoClient(new ServerAddress(ip, port), credential, sslOptions);
      System.out.println(client2.listDatabaseNames().first());
      client2.close();
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }

  }

  /**
   * 创建一个SocketFactory.
   *
   * @param trustStorePath keyStore 真实路径
   * @param trustStorePwd  keyStore 真实路径
   * @param keyStorePath   keyStore 路径
   * @param keyStorePwd    keyStore密码
   * @return
   * @throws Exception
   */
  private static SocketFactory createSocketFactory(String trustStorePath, String trustStorePwd, String keyStorePath,
      String keyStorePwd) throws Exception {
    SSLContext sslContext = SSLContext.getInstance("SSL");
    KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
    FileInputStream myKeyStore = new FileInputStream(keyStorePath);
    keyStore.load(myKeyStore, keyStorePwd.toCharArray());
    myKeyStore.close();
    // default SunX509
    KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
    kmf.init(keyStore, keyStorePwd.toCharArray());

    // set up a TrustManager that trusts everything
    // 1.trust specific sslCaKeystore
    KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
    TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
    FileInputStream myTrustStore = new FileInputStream(trustStorePath);
    trustStore.load(myTrustStore, trustStorePwd.toCharArray());
    myTrustStore.close();
    tmf.init(trustStore);
    sslContext.init(kmf.getKeyManagers(), tmf.getTrustManagers(), new SecureRandom());
    return sslContext.getSocketFactory();
  }
}
```
