const e=JSON.parse(`{"key":"v-0e0f4e57","path":"/blogs/docker/docker_create_kerberos_kdc.html","title":"docker本地构建kerberos 单机环境","lang":"en-US","frontmatter":{"title":"docker本地构建kerberos 单机环境","date":"2021-10-23 12:59:34","tag":["docker","kerberos","kdc","authentication"],"category":["security"],"published":true,"hideInList":false,"feature":null,"isTop":false,"description":"kerberos 简介 众所周知,kerberos 是大数据环境下最常用的安全通信的保障机制,是一种网络协议 本文不涉及 kerberos 原理,只涉及 docker 搭建 kerberos 环境 kerberos 原理 Kerberos 原理; Kerberos 原理 (https://juejin.cn/post/68449039554162196...","head":[["meta",{"property":"og:url","content":"https://clearlove443.github.io.v2/v2/blogs/docker/docker_create_kerberos_kdc.html"}],["meta",{"property":"og:site_name","content":"clearlove's blog"}],["meta",{"property":"og:title","content":"docker本地构建kerberos 单机环境"}],["meta",{"property":"og:description","content":"kerberos 简介 众所周知,kerberos 是大数据环境下最常用的安全通信的保障机制,是一种网络协议 本文不涉及 kerberos 原理,只涉及 docker 搭建 kerberos 环境 kerberos 原理 Kerberos 原理; Kerberos 原理 (https://juejin.cn/post/68449039554162196..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-05-21T04:38:09.000Z"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:tag","content":"kerberos"}],["meta",{"property":"article:tag","content":"kdc"}],["meta",{"property":"article:tag","content":"authentication"}],["meta",{"property":"article:published_time","content":"2021-10-23T12:59:34.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-21T04:38:09.000Z"}]]},"headers":[{"level":2,"title":"kerberos 简介","slug":"kerberos-简介","link":"#kerberos-简介","children":[]},{"level":2,"title":"kerberos 原理","slug":"kerberos-原理","link":"#kerberos-原理","children":[]},{"level":2,"title":"Kerberos（KDC） 几个重要的概念：","slug":"kerberos-kdc-几个重要的概念","link":"#kerberos-kdc-几个重要的概念","children":[]},{"level":2,"title":"创建配置文件","slug":"创建配置文件","link":"#创建配置文件","children":[{"level":3,"title":"创建文件夹/home/ubuntu/docker/kerberos","slug":"创建文件夹-home-ubuntu-docker-kerberos","link":"#创建文件夹-home-ubuntu-docker-kerberos","children":[]},{"level":3,"title":"创建下面目录","slug":"创建下面目录","link":"#创建下面目录","children":[]},{"level":3,"title":"修改配置文件","slug":"修改配置文件","link":"#修改配置文件","children":[]}]},{"level":2,"title":"打包 docker 镜像","slug":"打包-docker-镜像","link":"#打包-docker-镜像","children":[]},{"level":2,"title":"docker 启动及初始化","slug":"docker-启动及初始化","link":"#docker-启动及初始化","children":[{"level":3,"title":"启动","slug":"启动","link":"#启动","children":[]},{"level":3,"title":"添加管理权限","slug":"添加管理权限","link":"#添加管理权限","children":[]}]},{"level":2,"title":"kerberos client","slug":"kerberos-client","link":"#kerberos-client","children":[{"level":3,"title":"安装客户端(ubuntu)","slug":"安装客户端-ubuntu","link":"#安装客户端-ubuntu","children":[]},{"level":3,"title":"安装客户端(centos)","slug":"安装客户端-centos","link":"#安装客户端-centos","children":[]},{"level":3,"title":"设置配置/etc/krb5.conf 配置和 server 端保持一致","slug":"设置配置-etc-krb5-conf-配置和-server-端保持一致","link":"#设置配置-etc-krb5-conf-配置和-server-端保持一致","children":[]},{"level":3,"title":"使用用户名和密码的方式验证 kerberos 配置在客户端通过用户名和密码认证","slug":"使用用户名和密码的方式验证-kerberos-配置在客户端通过用户名和密码认证","link":"#使用用户名和密码的方式验证-kerberos-配置在客户端通过用户名和密码认证","children":[]},{"level":3,"title":"通过密钥登陆","slug":"通过密钥登陆","link":"#通过密钥登陆","children":[]},{"level":3,"title":"查看 principal","slug":"查看-principal","link":"#查看-principal","children":[]}]},{"level":2,"title":"windows","slug":"windows","link":"#windows","children":[{"level":3,"title":"安装客户端","slug":"安装客户端","link":"#安装客户端","children":[]},{"level":3,"title":"设置配置和 server 端保持一致","slug":"设置配置和-server-端保持一致","link":"#设置配置和-server-端保持一致","children":[]},{"level":3,"title":"设置 host","slug":"设置-host","link":"#设置-host","children":[]},{"level":3,"title":"使用用户名和密码的方式验证 kerberos 配置在客户端通过用户名和密码认证","slug":"使用用户名和密码的方式验证-kerberos-配置在客户端通过用户名和密码认证-1","link":"#使用用户名和密码的方式验证-kerberos-配置在客户端通过用户名和密码认证-1","children":[]}]}],"git":{"createdTime":1684643889000,"updatedTime":1684643889000,"contributors":[{"name":"ClearLove443","email":"1127280933@qq.com","commits":1}]},"readingTime":{"minutes":4.18,"words":1254},"filePathRelative":"blogs/docker/docker_create_kerberos_kdc.md","localizedDate":"October 23, 2021","autoDesc":true}`);export{e as data};