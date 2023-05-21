---
title: "SpringBoot项目构建成jar运行，如何正确读取resource里的文件"
date: "2021-10-09 22:20:27"
tag: [Springboot]
category: back-end-java
published: true
hideInList: false
feature:
isTop: false
---

Resource 下的文件是存在于 jar 这个文件里面，在磁盘上是没有真实路径存在的，它其实是位于 jar 内部的一个路径。所以通过 ResourceUtils.getFile 或者 this.g
etClass().getResource("")方法无法正确获取文件。

这种情况下可以采用流的方式来读取文件，拿到文件流再进行相关的操作。如果你使用 Spring 框架的话，可以采用 ClassPathResource 来读取文件流，

```java
  /**
   * read jar config file
   *
   * @throws IOException
   *
   *
   */
  public File readJarConfFile(String jarConfFile) throws IOException {
    ClassPathResource resource = new ClassPathResource(jarConfFile);
    InputStream inputStream = null;
    File confCopyFile = new File(jarConfFile);
    inputStream = resource.getInputStream();
    FileUtils.copyInputStreamToFile(inputStream, confCopyFile);
    IOUtils.closeQuietly(inputStream);
    return confCopyFile;
  }
```

拿到目标文件后，再按照正常的取法如 ResourceUtils.getFile，读取即可。
使用完后，可以把复制出来的文件删除掉

```java
      // delete krb5conf file
      FileUtils.deleteQuietly(krb5confCopyFile);
```
