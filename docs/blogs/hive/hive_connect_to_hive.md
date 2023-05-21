---
title: "jdbc连接hive的几种方式"
date: "2021-09-25 21:51:43"
tag: [hive, jdbc, beeline]
category: big-data
published: true
hideInList: false
feature:
isTop: false
---

# Java 使用 JDBC 连接 Hive

正常情况下的 url：

```
jdbc:hive2://node1:10000/default
```

这种情况下，都是默认的，没有权限限制
jdbc url 完整的格式

```
jdbc:hive2://<host>:<port>/dbName;sess_var_list?hive_conf_list#hive_var_list
```

- sess_var_list 参数列表：session 参数，如 principal，serviceDiscoveryMode 等等；
- hive_conf_list 参数列表：hive 的配置参数，hive-site.xml 中的配置项；
- hive_var_list 参数列表：hive 的变量参数；

例如，使用用户名和密码连接的 URL 为

```
jdbc:hive2://localhost:10000;AuthMech=3;UID=UserName;PWD=Password
```

其中，UID 默认为 hive，AuthMech 默认为 2
hive jdbc 连接安全机制也分以下几种情况，分别为无权限、Kerberos、用户名与用户名和密码，安全机制属性为 AuthMech，例如：

```
jdbc:hive2://localhost:10000;AuthMech=0
dbc:hive2://localhost:10000;AuthMech=1;KrbRealm=EXAMPLE.COM;KrbHostFQDN=hs2.example.com;KrbServiceName=hive
jdbc:hive2://localhost:10000;AuthMech=2;UID=hs2
jdbc:hive2://localhost:10000;AuthMech=3;UID=hs2;PWD=*****
jdbc:hive2://localhost:10000;AuthMech=3;SSL=1;SSLKeyStore=C:\\Users\\bsmith\\Desktop\\keystore.jks;SSLKeyStorePwd=*****;UID=hs2;PWD=*****
```

如果要指定 hive 执行 sql 时候的相关参数，即 hive-site.xml 中的某些变量，就需要增加在？后面，key=value 形式，多个用分号分隔。例如：

```
jdbc:hive2://ubuntu:11000/db2?hive.cli.conf.printheader=true;hive.exec.mode.local.auto.inputbytes.max=9999#stab=salesTable;icol=customerID
jdbc:hive2://?hive.cli.conf.printheader=true;hive.exec.mode.local.auto.inputbytes.max=9999#stab=salesTable;icol=customerID
jdbc:hive2://ubuntu:11000/db2;user=foo;password=bar
jdbc:hive2://server:10001/db;user=foo;password=bar?hive.server2.transport.mode=http;hive.server2.thrift.http.path=hs2
jdbc:hive2://zk01:2181,zk02:2181,zk03:2181/;serviceDiscoveryMode=zooKeeper;zooKeeperNamespace=hiveserver2
```

具体的解析代码在 hive-jdbc 中，类文件为 HiveConnection.java。解析大致流程为：

```java
// Now parse the connection uri with dummy authority
URI jdbcURI = URI.create(uri.substring(URI_JDBC_PREFIX.length()));
// dbname and session settings（获取第一部分参数）
String sessVars = jdbcURI.getPath();
// parse hive conf settings（获取第二部分参数）
String confStr = jdbcURI.getQuery();
// parse hive var settings（获取第三部分参数）
String varStr = jdbcURI.getFragment();
```

## 使用 jdbc 连接

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>demo</artifactId>
  <version>1.0-SNAPSHOT</version>
  <name>demo</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>
  <dependencies>
    <dependency>
        <groupId>org.apache.hive</groupId>
        <artifactId>hive-jdbc</artifactId>
        <version>1.1.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.hadoop</groupId>
        <artifactId>hadoop-common</artifactId>
        <version>2.6.0</version>
    </dependency>
    <!-- jdk 9 以上需要添加 -->
    <dependency>
        <groupId>jdk.tools</groupId>
        <artifactId>jdk.tools</artifactId>
        <version>1.6</version>
        <scope>system</scope>
        <systemPath>C:\Program Files\Eclipse Foundation\jdk-8.0.302.8-hotspot\lib\tools.jar</systemPath>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
  </build>
</project>
```

jdbc 连接 hive

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        List<Map<String, Object>> resultList = connectToHive();
        System.out.println(resultList);
    }

    /**
     * jdbc 连接 hive, 无kerberos认证
     *
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    private static List<Map<String, Object>> connectToHive() throws ClassNotFoundException, SQLException {
        String url = "jdbc:hive2://110.40.137.191:10000/testdb";
        String driver = "org.apache.hive.jdbc.HiveDriver";
        String username = "";
        String password = "";
        String sql = "select * from employee";
        Connection connection = null;
        Class.forName(driver);
        connection = DriverManager.getConnection(url, username, password);
        // Statement statement = connection.createStatement();
        // ResultSet resultSet = statement.executeQuery(sql);

        PreparedStatement pstmt = connection.prepareStatement(sql);
        // pstmt.setInt(1, 1);
        // pstmt.setString(2, "2");
        ResultSet resultSet = pstmt.executeQuery();
        List<Map<String, Object>> resultList = convertList(resultSet);
        resultSet.close();
        pstmt.close();
        connection.close();
        return resultList;
    }

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.security.UserGroupInformation;

    public static void main(String[] args) throws ClassNotFoundException, SQLException, IOException {

        // kerberos 认证
        kerberosAuth();
        List<Map<String, Object>> resultList = connectToHiveWithKerBeros();
        System.out.println(resultList);
    }

    /**
     * kerberos 认证
     *
     * @throws IOException
     *
     *
     */
    public static void kerberosAuth() throws IOException {

        // kdc server 直接复制出来 默认路径 /etc/krb5.conf
        System.setProperty("java.security.krb5.conf", "krb5.conf");
        Configuration conf = new Configuration();
        conf.setBoolean("hadoop.security.authorization", true);
        conf.set("hadoop.security.authentication", "kerberos");
        UserGroupInformation.setConfiguration(conf);
        UserGroupInformation.loginUserFromKeytab("hdfs/quickstart.cloudera@CLOUDERA", "hdfs.keytab");
    }

    /**
     * jdbc 连接 hive，使用kerberos 认证
     *
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     * @throws IOException
     */
    private static List<Map<String, Object>> connectToHiveWithKerBeros()
            throws ClassNotFoundException, SQLException, IOException {
        String url = "jdbc:hive2://110.42.214.104:10000/default;principal=hive/quickstart.cloudera@CLOUDERA";
        String driver = "org.apache.hive.jdbc.HiveDriver";

        String sql = "select * from customers";
        Connection connection = null;
        Class.forName(driver);
        connection = DriverManager.getConnection(url);
        // Statement statement = connection.createStatement();
        // ResultSet resultSet = statement.executeQuery(sql);

        PreparedStatement pstmt = connection.prepareStatement(sql);
        // pstmt.setInt(1, 1);
        // pstmt.setString(2, "2");
        ResultSet resultSet = pstmt.executeQuery();
        List<Map<String, Object>> resultList = convertList(resultSet);
        resultSet.close();
        pstmt.close();
        connection.close();
        return resultList;
    }

    /**
     * 将ResultSet结果集遍历到List中
     *
     * @param rs
     * @return
     * @throws SQLException
     */
    private static List<Map<String, Object>> convertList(ResultSet rs) throws SQLException {
        List<Map<String, Object>> list = new ArrayList<>();
        ResultSetMetaData md = rs.getMetaData();// 获取键名
        int columnCount = md.getColumnCount();// 获取行的数量
        while (rs.next()) {
            Map<String, Object> rowData = new HashMap<>();// 声明Map
            for (int i = 1; i <= columnCount; i++) {
                rowData.put(md.getColumnName(i), rs.getObject(i));// 获取键名及值
            }
            list.add(rowData);
        }
        return list;
    }
```

## 集成到 spring boot 中，使用 DataSourceSpy/JdbcTemplate 连接

pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>demo2</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>Spring Boot Blank Project (from https://github.com/making/spring-boot-blank)</name>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.2.7.RELEASE</version>
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <start-class>com.example.App</start-class>
        <java.version>1.8</java.version>
        <log4jdbc.log4j2.version>1.16</log4jdbc.log4j2.version>
        <rest.assured.version>2.3.3</rest.assured.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.bgee.log4jdbc-log4j2</groupId>
            <artifactId>log4jdbc-log4j2-jdbc4.1</artifactId>
            <version>${log4jdbc.log4j2.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.hive</groupId>
            <artifactId>hive-jdbc</artifactId>
            <version>1.1.0</version>
            <exclusions>
                <exclusion>
                    <groupId>org.eclipse.jetty.aggregate</groupId>
                    <artifactId>jetty-all</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-common</artifactId>
            <version>2.6.0</version>
        </dependency>

        <!-- jdk 9 以上需要添加 -->
        <dependency>
            <groupId>jdk.tools</groupId>
            <artifactId>jdk.tools</artifactId>
            <version>1.6</version>
            <scope>system</scope>
            <systemPath>C:\Program Files\Eclipse Foundation\jdk-8.0.302.8-hotspot\lib\tools.jar</systemPath>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
            <!-- 该插件的作用是用于复制指定的文件 -->
            <plugin>
                <artifactId>maven-resources-plugin</artifactId>
                <executions>
                    <execution> <!-- 复制配置文件 -->
                        <id>copy-resources</id>
                        <phase>package</phase>
                        <goals>
                            <goal>copy-resources</goal>
                        </goals>
                        <configuration>
                            <resources>
                                <resource>
                                    <directory>conf/</directory>
                                    <includes>
                                        <include>*.*</include>
                                    </includes>
                                </resource>
                            </resources>
                            <outputDirectory>${project.build.directory}/conf</outputDirectory>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

App.java

```java
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
```

DataSourceConfig.java

```java
package com.example.config;

import java.io.IOException;

import javax.sql.DataSource;

import org.apache.hadoop.security.UserGroupInformation;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DataSourceConfig {

    /**
     * 无认证数据源配置
     *
     * @return
     */
    @Bean
    @ConfigurationProperties(prefix = "hive-datasource")
    @Primary
    public DataSource setNoAuthDatasource() {
        return DataSourceBuilder.create().build();
    }

    /**
     *
     * 无认证jdbc连接
     *
     */
    @Bean
    @Primary
    JdbcTemplate getNoAuthDatasourceJdbc(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    /**
     * kerberos认证数据源配置
     *
     * @return
     */
    @Bean(name = "kerberosDatasource")
    @ConfigurationProperties(prefix = "hive_kerberos-datasource")
    DataSource kerberosDatasource() {

        // kerberos 认证
        kerberosAuth();
        return DataSourceBuilder.create().build();
    }

    /**
     *
     * kerberos认证jdbc连接
     *
     */
    @Bean(name = "kerberosJdbcTemplate")
    JdbcTemplate kerberosJdbcTemplate(@Qualifier("kerberosDatasource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    /**
     *
     * 可以在控制台看到执行结果,不支持低版本jdbc驱动
     *
     * @throws IOException
     *
     */
    // @Bean
    // @Primary
    // DataSourceSpy dataSource2() {

    // return new DataSourceSpy(realDataSource());
    // }
    @Value("${hive_kerberos-datasource.krb5conf}")
    private String krb5conf;
    @Value("${hive_kerberos-datasource.krb5keytab}")
    private String krb5keytab;
    @Value("${hive_kerberos-datasource.principal}")
    private String principal;

    /**
     * kerberos 认证
     *
     * @throws IOException
     *
     *
     */
    public void kerberosAuth() {

        // kdc server 直接复制出来 默认路径 /etc/krb5.conf
        System.setProperty("java.security.krb5.conf", krb5conf);
        System.setProperty("sun.security.krb5.debug", "true");
        org.apache.hadoop.conf.Configuration conf = new org.apache.hadoop.conf.Configuration();
        conf.setBoolean("hadoop.security.authorization", true);
        conf.set("hadoop.security.authentication", "kerberos");
        UserGroupInformation.setConfiguration(conf);
        try {
            UserGroupInformation.loginUserFromKeytab(principal, krb5keytab);
            System.out.println("kerberos 认证成功");
        } catch (Exception e) {
            System.out.println("kerberos 认证失败");
        }
    }
}
```

HiveController.java

```java
package com.example;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

// import lombok.Data;

@RestController
public class HiveController {
    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    JdbcTemplate jdbcTemplate2;

    @Autowired
    @Qualifier("kerberosJdbcTemplate")
    JdbcTemplate kerberosJdbcTemplate;
    private static final Logger logger = LoggerFactory.getLogger(HiveController.class);

    @RequestMapping("/")
    String hello() {
        return "Hello World!";
    }

    @RequestMapping("/createSuccessful")
    String createSuccessful() {
        return "createSuccessful!";
    }

    // @Data
    // static class Result {
    // private final int left;
    // private final int right;
    // private final long answer;
    // }

    // // SQL sample
    // @RequestMapping("calc")
    // Result calc(@RequestParam int left, @RequestParam int right) {
    // MapSqlParameterSource source = new MapSqlParameterSource().addValue("left",
    // left).addValue("right", right);
    // return jdbcTemplate.queryForObject("SELECT :left + :right AS answer", source,
    // (rs, rowNum) -> new Result(left, right, rs.getLong("answer")));
    // }

    @RequestMapping("/create")
    public ModelAndView create() {

        StringBuffer sql = new StringBuffer("create table IF NOT EXISTS ");
        sql.append("HIVE_TEST");
        sql.append("(KEY STRING, VALUE STRING)");
        // sql.append("PARTITIONED BY (KEY STRING)"); // 分区存储
        sql.append("ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n' "); // 定义分隔符
        sql.append("STORED AS TEXTFILE"); // 作为文本存储

        // drop table
        // StringBuffer sql = new StringBuffer("DROP TABLE IF EXISTS ");
        // sql.append("HIVE_TEST1");
        logger.info(sql.toString());
        jdbcTemplate2.execute(sql.toString());
        return new ModelAndView("/createSuccessful");
    }

    @RequestMapping("/insert")
    public String insert() {
        jdbcTemplate2.execute("insert into hive_test(key, value) values('Neo','Chen')");
        return "Done";
    }

    @RequestMapping("/selectNoauthDb")
    public List<Map<String, Object>> select() {
        String sql = "select key, value from HIVE_TEST";
        return jdbcTemplate2.queryForList(sql);
    }

    @RequestMapping("/selectKerberosDb")
    public List<Map<String, Object>> select2() {
        String sql = "select * from customers";
        return kerberosJdbcTemplate.queryForList(sql);
    }

    @RequestMapping("/drop")
    public String drop() {
        StringBuffer sql = new StringBuffer("DROP TABLE IF EXISTS ");
        sql.append("HIVE_TEST");
        logger.info(sql.toString());
        jdbcTemplate2.execute(sql.toString());
        return "Done";
    }
}
```

application.yml

```yaml
server:
  address: 0.0.0.0
  port: 8080
spring:
  datasource:
    url: jdbc:hive2://110.40.137.191:10000/testdb
    driverClassName: org.apache.hive.jdbc.HiveDriver
logging:
  level:
    jdbc:
      sqltiming: DEBUG
      resultsettable: DEBUG
hive-datasource:
  url: jdbc:hive2://110.40.137.191:10000/testdb
  driver-class-name: org.apache.hive.jdbc.HiveDriver
hive_kerberos-datasource:
  url: jdbc:hive2://110.42.214.104:10000/default;principal=hive/quickstart.cloudera@CLOUDERA
  driver-class-name: org.apache.hive.jdbc.HiveDriver
  krb5conf: conf/krb5.conf
  krb5keytab: conf/hdfs.keytab
  principal: hdfs/quickstart.cloudera@CLOUDERA
```

# bash 使用 beeline 连接

## 连接模版

```bash
beeline -u url -e sql
```

可以执行多个 sql

## 连接例子

```bash
beeline -u 'jdbc:hive2://110.40.137.191:10000/testdb' -e 'show databases' -e 'select * from employee'
```
