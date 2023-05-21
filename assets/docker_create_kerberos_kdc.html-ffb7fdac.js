import{_ as i,D as l,V as d,W as r,Y as e,Z as a,$ as s,a0 as c}from"./framework-8e76daeb.js";const t={},u=e("h2",{id:"kerberos-简介",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kerberos-简介","aria-hidden":"true"},"#"),a(" kerberos 简介")],-1),o=e("p",null,"众所周知,kerberos 是大数据环境下最常用的安全通信的保障机制,是一种网络协议 本文不涉及 kerberos 原理,只涉及 docker 搭建 kerberos 环境",-1),v=e("h2",{id:"kerberos-原理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kerberos-原理","aria-hidden":"true"},"#"),a(" kerberos 原理")],-1),p=e("ul",null,[e("li",null,"Kerberos 原理")],-1),b={href:"https://juejin.cn/post/6844903955416219661",target:"_blank",rel:"noopener noreferrer"},m=e("ul",null,[e("li",null,"使用 Kerberos 进行网络身份验证")],-1),k={href:"https://documentation.suse.com/zh-cn/sles/15-SP2/html/SLES-all/cha-security-kerberos.html",target:"_blank",rel:"noopener noreferrer"},h=c(`<h2 id="kerberos-kdc-几个重要的概念" tabindex="-1"><a class="header-anchor" href="#kerberos-kdc-几个重要的概念" aria-hidden="true">#</a> Kerberos（KDC） 几个重要的概念：</h2><ul><li>Principal：任何服务器所提供的用户、计算机、服务都将被定义成 Principal。</li><li>Instances：用于服务 principals 和特殊管理 Principal。</li><li>Realms：Kerberos 安装提供的独特的域的控制，把它想象成你的主机和用户所属的主机或者组。官方约定这域需要大写。默认的，Ubuntu 将把 DNS 域名转换为大写当成这里的域。 本例使用</li><li>Key Distribution Center: （KDC）由三部分组成，一是 principal 数据库，认证服务器，和票据授予服务器。每个 Realm 至少要有一个。</li><li>Ticket Granting Ticket：由认证服务器（AS）签发，Ticket Granting Ticket (TGT)使用用户的密码加密，这个密码只有用户和 KDC 知道。</li><li>Ticket Granting Server: (TGS) 根据请求签发服务的票据。</li><li>Tickets：确认两个 Principal 的身份。一个主体是用户，另一个是由用户请求的服务。门票会建立一个加<code>***</code>，用于在身份验证会话中的安全通信。</li><li>Keytab Files：从 KDC 主数据库中提取的文件，并且包含的服务或主机的加***。</li></ul><h2 id="创建配置文件" tabindex="-1"><a class="header-anchor" href="#创建配置文件" aria-hidden="true">#</a> 创建配置文件</h2><h3 id="创建文件夹-home-ubuntu-docker-kerberos" tabindex="-1"><a class="header-anchor" href="#创建文件夹-home-ubuntu-docker-kerberos" aria-hidden="true">#</a> 创建文件夹/home/ubuntu/docker/kerberos</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir /home/ubuntu/docker/kerberos
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建下面目录" tabindex="-1"><a class="header-anchor" href="#创建下面目录" aria-hidden="true">#</a> 创建下面目录</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
├── ./conf
│   ├── ./conf/hosts
│   ├── ./conf/kadm5.acl
│   ├── ./conf/kdc.conf
│   └── ./conf/krb5.conf
├── ./Dockerfile
└── ./keytab
    └── ./keytab/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h3><ul><li>./conf/hosts</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
ff00::0	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.18.0.4	ef6d55663265
127.0.0.1 kdc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>./conf/kadm5.acl</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cloudera-scm/admin@HADOOP.COM	*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>./conf/kdc.conf</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[kdcdefaults]
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>./conf/krb5.conf</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>includedir /etc/krb5.conf.d/

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>./Dockerfile</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM centos:7
RUN yum install -y krb5-server krb5-libs krb5-auth-dialog krb5-workstation
CMD [&quot;/usr/sbin/init&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="打包-docker-镜像" tabindex="-1"><a class="header-anchor" href="#打包-docker-镜像" aria-hidden="true">#</a> 打包 docker 镜像</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /home/ubuntu/docker/kerberos <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">docker</span> build <span class="token parameter variable">-t</span> kdc:1.0 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等待打包构建镜像,因为涉及到 kerberos 的下载安装,可能会比较慢 使用 docker images 命令可以看到新生成的 docker 镜像</p><h2 id="docker-启动及初始化" tabindex="-1"><a class="header-anchor" href="#docker-启动及初始化" aria-hidden="true">#</a> docker 启动及初始化</h2><h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run --privileged=true -p 88:88 -p 749:749 -p 750:750 -d --name=&quot;my_kdc&quot; -v /home/ubuntu/docker/kerberos/conf/kdc.conf:/var/kerberos/krb5kdc/kdc.conf -v /home/ubuntu/docker/kerberos/conf/krb5.conf:/etc/krb5.conf -v /home/ubuntu/docker/kerberos/conf/hosts:/etc/hosts -v /home/ubuntu/docker/kerberos/conf/kadm5.acl:/var/kerberos/krb5kdc/kadm5.acl -v /home/ubuntu/docker/kerberos/keytab:/keytab/ kdc:1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>首先进入容器的 bash</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> my_kdc <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>rm /var/kerberos/krb5kdc/principal*</p><ul><li>初始化数据库</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kdb5_util create <span class="token parameter variable">-s</span> <span class="token parameter variable">-r</span> HADOOP.COM
<span class="token comment"># password =&gt; password</span>

kdb5_util create <span class="token parameter variable">-s</span> <span class="token parameter variable">-r</span> HADOOP.COM <span class="token parameter variable">-P</span> password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>启动 kdc</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start kadmin krb5kdc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看状态</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl status kadmin
systemctl status krb5kdc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加管理权限" tabindex="-1"><a class="header-anchor" href="#添加管理权限" aria-hidden="true">#</a> 添加管理权限</h3><ul><li>进入 kadmin 交互命令行</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kadmin.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>增加管理员用户并设置密码</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>addprinc cloudera-scm/admin@HADOOP.COM
<span class="token comment"># password =&gt; password</span>

addprinc <span class="token parameter variable">-pw</span> password cloudera-scm/admin@HADOOP.COM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>测试连接是否成功</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kinit cloudera-scm/admin@HADOOP.COM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>增加普通用户并设置密码</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>addprinc hdfs/kdc@HADOOP.COM
<span class="token comment"># password =&gt; password</span>

addprinc <span class="token parameter variable">-pw</span> password hdfs/kdc@HADOOP.COM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>测试连接是否成功</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kinit hdfs/kdc@HADOOP.COM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>查看用户列表</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>listprincs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>删除用户</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用管理员用户</span>
kinit cloudera-scm/admin@HADOOP.COM

kadmin
delete_principal test/kdc@HADOOP.COM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>导出 keytab 文件到指定目录</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ktadd <span class="token parameter variable">-k</span> /keytab/admin.keytab <span class="token parameter variable">-norandkey</span> cloudera-scm/admin@HADOOP.COM
ktadd <span class="token parameter variable">-k</span> /keytab/hdfs.keytab <span class="token parameter variable">-norandkey</span> hdfs/kdc@HADOOP.COM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kerberos-client" tabindex="-1"><a class="header-anchor" href="#kerberos-client" aria-hidden="true">#</a> kerberos client</h2><h3 id="安装客户端-ubuntu" tabindex="-1"><a class="header-anchor" href="#安装客户端-ubuntu" aria-hidden="true">#</a> 安装客户端(ubuntu)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt-get</span> <span class="token function">install</span> krb5-user <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装客户端-centos" tabindex="-1"><a class="header-anchor" href="#安装客户端-centos" aria-hidden="true">#</a> 安装客户端(centos)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> krb5-workstation krb5-libs <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="设置配置-etc-krb5-conf-配置和-server-端保持一致" tabindex="-1"><a class="header-anchor" href="#设置配置-etc-krb5-conf-配置和-server-端保持一致" aria-hidden="true">#</a> 设置配置/etc/krb5.conf 配置和 server 端保持一致</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/krb5.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
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
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用用户名和密码的方式验证-kerberos-配置在客户端通过用户名和密码认证" tabindex="-1"><a class="header-anchor" href="#使用用户名和密码的方式验证-kerberos-配置在客户端通过用户名和密码认证" aria-hidden="true">#</a> 使用用户名和密码的方式验证 kerberos 配置在客户端通过用户名和密码认证</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kinit hdfs/kdc@HADOOP.COM
<span class="token comment"># password =&gt; password</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过密钥登陆" tabindex="-1"><a class="header-anchor" href="#通过密钥登陆" aria-hidden="true">#</a> 通过密钥登陆</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kinit <span class="token parameter variable">-kt</span> /keytab/hdfs.keytab hdfs/kdc@HADOOP.COM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看-principal" tabindex="-1"><a class="header-anchor" href="#查看-principal" aria-hidden="true">#</a> 查看 principal</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>klist <span class="token parameter variable">-k</span> hdfs.keytab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> windows</h2><h3 id="安装客户端" tabindex="-1"><a class="header-anchor" href="#安装客户端" aria-hidden="true">#</a> 安装客户端</h3><p>安装 MIT Kerberos Ticket Manager</p><h3 id="设置配置和-server-端保持一致" tabindex="-1"><a class="header-anchor" href="#设置配置和-server-端保持一致" aria-hidden="true">#</a> 设置配置和 server 端保持一致</h3><p>C:\\ProgramData\\MIT\\Kerberos5\\krb5.ini</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">libdefaults</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">default_realm</span> <span class="token punctuation">=</span> <span class="token value attr-value">CLOUDERA</span>
<span class="token key attr-name">dns_lookup_kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
<span class="token key attr-name">dns_lookup_realm</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
<span class="token key attr-name">ticket_lifetime</span> <span class="token punctuation">=</span> <span class="token value attr-value">86400</span>
<span class="token key attr-name">renew_lifetime</span> <span class="token punctuation">=</span> <span class="token value attr-value">604800</span>
<span class="token key attr-name">forwardable</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
<span class="token key attr-name">default_tgs_enctypes</span> <span class="token punctuation">=</span> <span class="token value attr-value">aes128-cts</span>
<span class="token key attr-name">default_tkt_enctypes</span> <span class="token punctuation">=</span> <span class="token value attr-value">aes128-cts</span>
<span class="token key attr-name">permitted_enctypes</span> <span class="token punctuation">=</span> <span class="token value attr-value">aes128-cts</span>
<span class="token key attr-name">udp_preference_limit</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span>
<span class="token key attr-name">kdc_timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">3000</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">realms</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">CLOUDERA</span> <span class="token punctuation">=</span> <span class="token value attr-value">{</span>
<span class="token key attr-name">kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">quickstart.cloudera</span>
<span class="token comment">#kdc = kdc</span>
<span class="token key attr-name">admin_server</span> <span class="token punctuation">=</span> <span class="token value attr-value">quickstart.cloudera</span>
}

<span class="token key attr-name">HADOOP.COM</span> <span class="token punctuation">=</span> <span class="token value attr-value">{</span>
<span class="token key attr-name">kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">kdc</span>
<span class="token key attr-name">admin_server</span> <span class="token punctuation">=</span> <span class="token value attr-value">kdc</span>
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置-host" tabindex="-1"><a class="header-anchor" href="#设置-host" aria-hidden="true">#</a> 设置 host</h3><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># C:\\Windows\\System32\\drivers\\etc\\hosts
# kdc host
192.168.50.28 kdc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用用户名和密码的方式验证-kerberos-配置在客户端通过用户名和密码认证-1" tabindex="-1"><a class="header-anchor" href="#使用用户名和密码的方式验证-kerberos-配置在客户端通过用户名和密码认证-1" aria-hidden="true">#</a> 使用用户名和密码的方式验证 kerberos 配置在客户端通过用户名和密码认证</h3><ul><li><p>admin user cloudera-scm/admin@HADOOP.COM password</p></li><li><p>hdfs usrr</p></li></ul><p>hdfs/kdc@HADOOP.COM password</p>`,74);function g(f,_){const n=l("ExternalLinkIcon");return d(),r("div",null,[u,o,v,p,e("p",null,[e("a",b,[a("Kerberos 原理"),s(n)])]),m,e("p",null,[e("a",k,[a("使用 Kerberos 进行网络身份验证"),s(n)])]),h])}const O=i(t,[["render",g],["__file","docker_create_kerberos_kdc.html.vue"]]);export{O as default};
