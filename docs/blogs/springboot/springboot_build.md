---
title: "SpringBoot打包实现静态文件、配置文件、jar包分离"
date: "2021-10-03 09:48:13"
tag: [springboot]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

在 pom.xml 文件里面添加

```xml
<plugins>
        <!--定义项目的编译环境-->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
        <!--maven的测试用例插件，建议跳过。-->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <configuration>
                <skip>true</skip>
            </configuration>
        </plugin>
        <!--这个是springboot的默认编译插件，他默认会把所有的文件打包成一个jar-->
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <mainClass>com.ruoyi.RuoYiApplication</mainClass>
                <fork>true</fork>
                <addResources>true</addResources>
                <outputDirectory>${project.build.directory}/jar</outputDirectory>
            </configuration>
        </plugin>
        <!-- 打JAR包 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <configuration>
                <!-- 不打包资源文件（配置文件和依赖包分开） -->
                <excludes>
                    <exclude>*.yml</exclude>
                    <exclude>*.properties</exclude>
                    <exclude>mybatis/**</exclude>
                    <exclude>static/**</exclude>
                </excludes>
                <archive>
                    <manifest>
                        <addClasspath>true</addClasspath>
                        <!-- MANIFEST.MF 中 Class-Path 加入前缀 -->
                        <classpathPrefix>lib/</classpathPrefix>
                        <!-- jar包不包含唯一版本标识 -->
                        <useUniqueVersions>false</useUniqueVersions>
                        <!--指定入口类 -->
                        <mainClass>com.ruoyi.Application</mainClass>
                    </manifest>
                    <manifestEntries>
                        <!--MANIFEST.MF 中 Class-Path 加入资源文件目录 -->
                        <Class-Path>./config/</Class-Path>
                    </manifestEntries>
                </archive>
                <outputDirectory>${project.build.directory}</outputDirectory>
            </configuration>
        </plugin>
        <!-- 该插件的作用是用于复制依赖的jar包到指定的文件夹里 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-dependency-plugin</artifactId>
            <executions>
                <execution>
                    <id>copy-dependencies</id>
                    <phase>package</phase>
                    <goals>
                        <goal>copy-dependencies</goal>
                    </goals>
                    <configuration>
                        <outputDirectory>${project.build.directory}/lib/</outputDirectory>
                    </configuration>
                </execution>
            </executions>
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
                                <directory>src/main/resources</directory>
                                <includes>
                                    <include>*.yml</include>
                                    <include>*.properties</include>
                                    <include>mybatis/**</include>
                                    <include>static/**</include>
                                </includes>
                            </resource>
                        </resources>
                        <outputDirectory>${project.build.directory}/config</outputDirectory>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
```

<mainClass>com.ruoyi.Application</mainClass>
这个位置要修改成自己启动类路径 其他可以不改
如果还有文件夹需要分离出来，就在 includes 的里面继续添加即可
然后 clean 然后 package
config：所有的配置文件、静态文件会存放在 config 文件夹下

jar：这里面是不分离的完整 jar 包
lib：这是所有依赖的 lib 包文件
admin-4.1.0.jar :这是分离之后的 jar 包文件
然后启动的话 直接把文件放在同级目录，然后运行 java -jar admin-4.1.0.jar 即可

如果不需要 改回原来的 pom 配置即可

```xml
<plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <fork>true</fork> <!-- 如果没有该配置，devtools不会生效 -->
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.0.0</version>
                <configuration>
                    <failOnMissingWebXml>false</failOnMissingWebXml>
                    <warName>${artifactId}</warName>
                </configuration>
            </plugin>
        </plugins>
        <finalName>${artifactId}</finalName>
```
