---
title: "Spring Boot配置多个DataSource"
date: 2021-09-27 20:34:33
tag: [java, multiple dataSource, jdbc]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

使用 Spring Boot 时，默认情况下，配置 DataSource 非常容易。Spring Boot 会自动为我们配置好一个 DataSource。
如果在 application.yml 中指定了 spring.datasource 的相关配置，Spring Boot 就会使用该配置创建一个 DataSource。如果在 application.yml 中没有指定任何 spring.datasource 的相关配置，Spring Boot 会在 classpath 中搜索 H2、hsqldb 等内存数据库的 jar 包，如果找到了，就会自动配置一个内存数据库的 DataSource，所以，我们只要引入 jar 包即可。

但是，在某些情况下，如果我们需要配置多个数据源，应该如何在 Spring Boot 中配置呢？
我们以 JDBC 为例，演示如何在 Spring Boot 中配置两个 DataSource。对应的，我们会创建两个 JdbcTemplate 的 Bean，分别使用这两个数据源。
首先，我们必须在 application.yml 中声明两个数据源的配置，一个使用 hive-datasource，另一个使用 hive_kerberos-datasource：

```yml
hive-datasource:
  url: jdbc:hive2://110.40.137.191:10000/testdb
  driver-class-name: org.apache.hive.jdbc.HiveDriver
hive_kerberos-datasource:
  url: jdbc:hive2://110.42.214.104:10000/default;principal=hive/quickstart.cloudera@CLOUDERA
  driver-class-name: org.apache.hive.jdbc.HiveDriver
```

这两个 DataSource 都使用 hivedb，但是数据库是不同的。此外，在使用多数据源的时候，所有必要配置都不能省略。
其次，我们需要自己创建两个 DataSource 的 Bean，其中一个标记为@Primary，另一个命名为 kerberosDatasource：
对于每一个 DataSource，我们都必须通过@ConfigurationProperties(prefix = "xxx")指定配置项的前缀。
紧接着，我们创建两个 JdbcTemplate 的 Bean，其中一个标记为@Primary，另一个命名为 kerberosJdbcTemplate，分别使用对应的 DataSource：
注意到 kerberosJdbcTemplate 在创建时，传入的 DataSource 必须用@Qualifier("kerberosDatasource")声明，这样，才能使用第二个 DataSource

```java
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
```

现在，我们就创建了两个 JdbcTemplate 的 Bean。在需要使用第一个 JdbcTemplate 的地方，我们直接注入：

```java
@Service
public class SomeService {
    @Autowired
    JdbcTemplate jdbcTemplate;
}
```

在需要使用第二个 JdbcTemplate 的地方，我们注入时需要用@Qualifier("kerberosJdbcTemplate")标识：

```java
@Service
public class AnotherService {
    @Autowired
    @Qualifier("kerberosJdbcTemplate")
    JdbcTemplate kerberosJdbcTemplate;
}
```

这样，我们就可以针对不同的数据源，用不同的 JdbcTemplate 进行操作。

## 注意事项

当存在多个相同类型的 Bean，例如，多个 DataSource，多个 JdbcTemplate 时，强烈建议总是使用@Primary 把其中某一个 Bean 标识为“主要的”，使用@Autowired 注入时会首先使用被标记为@Primary 的 Bean。
相同类型的其他 Bean，每一个都需要用@Bean(name="xxx")标识名字，并且，在使用@Autowired 注入时配合@Qualifier("xxx")指定注入的 Bean 的名字。
