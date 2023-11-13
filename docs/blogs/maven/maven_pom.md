---
title: "Maven项目pom文件模版 "
date: "2021-11-27 17:04:43"
tag: [maven, springoot, java]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

创建 maven 项目 pom 文件模版以及各种打包方式

## 初始模板

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.example</groupId>
  <artifactId>App</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>demo</name>
  <packaging>jar</packaging>

  <!-- springboot 项目 -->
  <!-- <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.5</version>
    <relativePath/>
  </parent> -->

  <properties>
    <java.version>1.8</java.version>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  <dependencies>
    <!-- 各种依赖 -->
  </dependencies>
  <build>
    <!-- 打包插件 -->
  </build>
</project>
```

## 打包和运行方式

[Apache Maven](https://maven.apache.org/plugins/index.html)

- 使用 maven-assembly-plugin 插件；打的 jar 包是完整的，可以单独执行。打包速度较慢。 不适合 springboot 项目。
- 使用 maven-jar-plugin 和 maven-dependency-plugin 插件，打的 jar 不包含依赖,不能单独执行。可以打包 springboot 项目
- 使用 maven-shade-plugin 插件，可以打包 springboot 项目。
- 使用 spring-boot-maven-plugin 插件。

### maven-assembly-plugin 插件

- ssembly 插件支持将项目的所有依赖、文件都打包到同一个输出文件中。目前支持输出以下文件类型：

- zip
- tar
- tar.gz (or tgz)
- tar.bz2 (or tbz2)
- tar.snappy
- tar.xz (or txz)
- jar
- dir
- war

- 在 POM.xml 中引入插件，指定打包格式的配置文件 assembly.xml(名称可自定义，可不指定，使用默认)，并指定作业的主入口类：

```xml
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.6.0</version>
        <configuration>
          <archive>
            <manifest>
              <mainClass>${groupId}.${artifactId}</mainClass>
            </manifest>
          </archive>
          <descriptors>
            <descriptor>assembly.xml</descriptor>
          </descriptors>
        </configuration>
        <executions>
          <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <!-- 或其他适当的构建阶段 -->
            <goals>
              <goal>single</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
```

- assembly.xml 文件内容如下：

```xml
<assembly xmlns="http://maven.apache.org/ASSEMBLY/2.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/ASSEMBLY/2.0.0
                              http://maven.apache.org/xsd/assembly-2.0.0.xsd">

    <id>jar-with-dependencies</id>

    <!--指明打包方式-->
    <formats>
        <format>jar</format>
    </formats>

    <includeBaseDirectory>false</includeBaseDirectory>
    <dependencySets>
        <dependencySet>
            <outputDirectory>/</outputDirectory>
            <useProjectArtifact>true</useProjectArtifact>
            <unpack>true</unpack>
            <scope>runtime</scope>
            <!--这里以排除 storm 环境中已经提供的 storm-core 为例，演示排除 Jar 包-->
            <excludes>
                <exclude>org.apache.storm:storm-core</exclude>
            </excludes>
        </dependencySet>
    </dependencySets>
</assembly>
```

- 打包命令

```bash
mvn assembly:assembly
```

打包后会同时生成两个 JAR 包，其中后缀为 jar-with-dependencies 是含有第三方依赖的 JAR 包，后缀是由 assembly.xml 中 `<id>` 标签指定的，可以自定义修改。

- 运行命令

- 单个 main 方法并且设置了 mainClass

```bash
java -jar jarfile
```

- 单个 main 方法没有设置 mainClass 或者多个 main 方法

```bash
java -cp jarfile com.example.App
```

### maven-jar-plugin 插件

打的 jar 包不是可执行 jar 包，和依赖没有合并，是分离的。

如果你想把某些没有被 Maven 管理 JAR 包打入到最终的 JAR 中，比如你在 resources/lib 下引入的其他非 Maven 仓库中的 JAR，此时可以使用 maven-jar-plugin 和 maven-dependency-plugin 插件将其打入最终的 JAR 中。

- pom 设置

```xml
  <build>
      <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <configuration>
                <archive>
                    <manifest>
                        <!-- 是否绑定依赖，将外部jar包依赖加入到classPath中 -->
                        <addClasspath>true</addClasspath>
                          <!--指定依赖目录-->
                        <classpathPrefix>lib/</classpathPrefix>
                        <!-- 可选，有多个main方法可以不指定 -->
                        <mainClass>${groupId}.${artifactId}</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-dependency-plugin</artifactId>
              <executions>
                <execution>
                    <id>copy-dependencies</id>
                    <phase>package</phase>
                    <goals>
                        <!--将 resources/lib 目录所有 Jar 包打进最终的依赖中-->
                        <goal>copy-dependencies</goal>
                    </goals>
                    <configuration>
                        <!--将 resources/lib 目录所有 Jar 包一并拷贝到输出目录的 lib 目录下-->
                        <outputDirectory>
                            ${project.build.directory}/lib
                        </outputDirectory>
                    </configuration>
                </execution>
            </executions>
        </plugin>
      </plugins>
    </build>
```

- 打包命令

```bash
mvn package
```

- 运行命令

- 单个 main 方法并且设置了 mainClass

```bash
java -jar jarfile
```

- 单个 main 方法没有设置 mainClass 或者多个 main 方法

```bash
java -cp jarfile com.example.App
```

### scala-maven-plugin

```xml
<plugin>
  <groupId>net.alchim31.maven</groupId>
  <artifactId>scala-maven-plugin</artifactId>
  <version>4.8.1</version>
  <executions>
    <execution>
      <?m2e execute onConfiguration?>
      <goals>
        <goal>compile</goal>
        <goal>testCompile</goal>
      </goals>
    </execution>
  </executions>
  <configuration>
    <scalaVersion>${scala.version}</scalaVersion>
  </configuration>
</plugin>
```

### maven-shade-plugin 插件

`maven-shade-plugin` 比 `maven-assembly-plugin` 功能更为强大，比如你的工程依赖很多的 JAR 包，而被依赖的 JAR 又会依赖其他的 JAR 包，这样,当工程中依赖到不同的版本的 JAR 时，并且 JAR 中具有相同名称的资源文件时，shade 插件会尝试将所有资源文件打包在一起时，而不是和 assembly 一样执行覆盖操作

通常使用 maven-shade-plugin 就能够完成大多数的打包需求，其配置简单且适用性最广，因此建议优先使用此方式。

- pom 设置

```xml
  <build>
    <plugins>
      <plugin>
          <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.5.1</version>
            <configuration>
                <createDependencyReducedPom>true</createDependencyReducedPom>
                <filters>
                    <filter>
                        <artifact>*:*</artifact>
                        <excludes>
                            <exclude>META-INF/*.SF</exclude>
                            <exclude>META-INF/*.sf</exclude>
                            <exclude>META-INF/*.DSA</exclude>
                            <exclude>META-INF/*.dsa</exclude>
                            <exclude>META-INF/*.RSA</exclude>
                            <exclude>META-INF/*.rsa</exclude>
                            <exclude>META-INF/*.EC</exclude>
                            <exclude>META-INF/*.ec</exclude>
                            <exclude>META-INF/MSFTSIG.SF</exclude>
                            <exclude>META-INF/MSFTSIG.RSA</exclude>
                        </excludes>
                    </filter>
                </filters>
                <artifactSet>
                    <excludes>
                        <exclude>org.apache.storm:storm-core</exclude>
                    </excludes>
                </artifactSet>
            </configuration>
            <executions>
              <execution>
                <phase>package</phase>
                <goals>
                    <goal>shade</goal>
                </goals>
                <configuration>
                  <!-- 打包 Spring boot 项目的时候，去掉这里的配置 -->
                  <transformers>
                    <!-- Merge META-INF/services files -->
                    <transformer
                      implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
                    <!-- Merge MANIFEST.MF files -->
                    <transformer
                      implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer"/>
                    <!-- Merge custom configuration files -->
                    <transformer
                        implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
                      <resource>test.conf</resource>
                    </transformer>
                  </transformers>
                  <!-- 可选，有多个main方法可以不指定 -->
                  <!-- <mainClass>javademo.MongodbDemo</mainClass> -->
                  <mainClass>scala.MongoDemo</mainClass>
                </configuration>
            </execution>
          </executions>
      </plugin>
    </plugins>
  </build>
```

在上面的配置中，排除了部分文件，这是因为有些 JAR 包生成时，会使用 jarsigner 生成文件签名 (完成性校验)，分为两个文件存放在 META-INF 目录下：

- a signature file, with a .SF extension；
- a signature block file, with a .DSA, .RSA, or .EC extension。

如果某些包的存在重复引用，这可能会导致在打包时候出现 Invalid signature file digest for Manifest main attributes 异常，所以在配置中排除这些文件。

- 打包命令

```bash
mvn package
```

- 运行命令

- 单个 main 方法并且设置了 mainClass

```bash
java -jar jarfile
```

- 单个 main 方法没有设置 mainClass 或者多个 main 方法

```bash
java -cp jarfile com.example.App
```

### 打包 Scala 文件

如果你使用到 Scala 语言进行编程，此时需要特别注意 ：默认情况下 Maven 是不会把 scala 文件打入最终的 JAR 中，需要额外添加 maven-scala-plugin 插件，常用配置如下：

```xml
  <build>
      <plugins>
        <plugin>
            <groupId>org.scala-tools</groupId>
            <artifactId>maven-scala-plugin</artifactId>
            <version>2.15.1</version>
            <executions>
                <execution>
                    <id>scala-compile</id>
                    <goals>
                        <goal>compile</goal>
                    </goals>
                    <configuration>
                        <includes>
                            <include>**/*.scala</include>
                        </includes>
                    </configuration>
                </execution>
                <execution>
                    <id>scala-test-compile</id>
                    <goals>
                        <goal>testCompile</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
  </build>
```

### spring-boot-maven-plugin 插件

- pom 设置

```xml
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
```

- 打包命令

```bash
mvn package
```

- 运行命令

```bash
java -jar jarfile
```
