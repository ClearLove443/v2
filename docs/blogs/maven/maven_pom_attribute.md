---
title: "maven 常用插件及属性"
date: "2021-12-06 22:33:32"
tag: [maven, springoot, java]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

## 常用 build 插件介绍

- maven-resources-plugin
  该插件的作用是用于复制指定的文件,可以用于 jar 包和配置文件分离。也可以把前后台项目打包到一起。

```xml
    <build>
        <plugins>
            <plugin>
                <artifactId>maven-resources-plugin</artifactId>
                <executions>
                    <execution>
                        <id>copy-resources</id>
                        <phase>package</phase>
                        <goals>
                            <goal>copy-resources</goal>
                        </goals>
                        <configuration>
                            <resources>
                                <resource>
                                    <directory>conf/</directory>
                                    <filtering>true</filtering>
                                    <!-- include any other file types you want to filter -->
                                    <includes>
                                        <include>**/*.*</include>
                                    </includes>
                                    <!-- exclude any other file types you want to filter -->
                                    <!-- <excludes>
                                        <exclude>**/*.map</exclude>
                                    </excludes> -->
                                </resource>
                            </resources>
                            <outputDirectory>${project.build.directory}/conf</outputDirectory>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

## 六大属性

### 内置属性(Maven 预定义,用户可以直接使用)

- ${project.basedir}

当前项目所在的目录，即包含 pom.xml 文件的目录

- ${basedir}

同 project.basedir

- ${version}

表示项目版本

- ${project.baseUri}

当前项目所在的目录，表示为 URI。自 Maven 2.1.0 起

- ${maven.build.timestamp}

表示生成开始时间 （UTC） 的时间戳。自 Maven 2.1.0-M1 起

- ${maven.build.timestamp.format}

表示属性${maven.build.timestamp}的展示格式,默认值为 yyyyMMdd-HHmm,可自定义其格式,其类型可参考 java.text.SimpleDateFormat。用法如下：

```xml
<properties>
  <maven.build.timestamp.format>yyyy-MM-dd HH:mm:ss</maven.build.timestamp.format>
</properties>
```

### POM 属性(使用 pom 属性可以引用到 pom.xml 文件对应元素的值)

- ${project.build.directory}

${project.basedir}/target

- ${project.build.sourceEncoding}

表示主源码的编码格式

- ${project.build.sourceDirectory}

表示主源码路径

- ${project.build.finalName}

表示输出文件名称

- ${project.version}

表示项目版本,与${version}相同

### 自定义属性

`<properties>...</properties>` 可以定义自定义属性
例如

```xml
<frontend-src-dir>${project.basedir}/src/main/web</frontend-src-dir>
```

就定义了 frontend-src-dir 属性，在其他地方使用${frontend-src-dir}使用该属性值。

### settings.xml 文件属性

与 pom 属性同理,用户使用以 settings.开头的属性引用 settings.xml 文件中的 XML 元素值
${settings.localRepository}表示本地仓库的地址

### Java 系统属性

所有的 Java 系统属性都可以使用 Maven 属性引用
使用 mvn help:system 命令可查看所有的 Java 系统属性;
System.getProperties()可得到所有的 Java 属性;
${user.home}表示用户目录;

### 环境变量属性

所有的环境变量都可以用以 env.开头的 Maven 属性引用
使用 mvn help:system 命令可查看所有环境变量;
${env.JAVA_HOME}表示 JAVA_HOME 环境变量的值;
