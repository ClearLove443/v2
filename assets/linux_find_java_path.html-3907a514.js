import{_ as n,V as a,W as s,a0 as e}from"./framework-0db4e8b6.js";const r={},o=e(`<p>如何在一台 Linux 服务器上查找 JDK 的安装路径呢？ 有那些方法可以查找定位 JDK 的安装路径？是否有一些局限性呢？ 下面总结了一下如何查找 JDK 安装路径的方法。</p><h2 id="echo-java-home" tabindex="-1"><a class="header-anchor" href="#echo-java-home" aria-hidden="true">#</a> echo $JAVA_HOME</h2><p>使用<code>$JAVA_HOME</code>的话能定位 JDK 的安装路径的前提是配置了环境变量<code>$JAVA_HOME</code>，否则根本定位不到 JDK 的安装路径。</p><h2 id="which-java" tabindex="-1"><a class="header-anchor" href="#which-java" aria-hidden="true">#</a> which java</h2><p>首先要申明一下 which java 是定位不到安装路径的。which java 定位到的是 java 程序的执行路径。网上的资料都是人云亦云，完全不去思考。那么怎么定位到 java 的安装路径呢？下面我们来看看例子吧,如下所示</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-version</span>
openjdk version <span class="token string">&quot;11.0.11&quot;</span> <span class="token number">2021</span>-04-20
OpenJDK Runtime Environment <span class="token punctuation">(</span>build <span class="token number">11.0</span>.11+9-Ubuntu-0ubuntu2.20.04<span class="token punctuation">)</span>
OpenJDK <span class="token number">64</span>-Bit Server VM <span class="token punctuation">(</span>build <span class="token number">11.0</span>.11+9-Ubuntu-0ubuntu2.20.04, mixed mode, sharing<span class="token punctuation">)</span>

<span class="token function">which</span> <span class="token function">java</span>
/usr/bin/java

<span class="token function">ls</span> <span class="token parameter variable">-lrt</span> /usr/bin/java
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">22</span> Nov <span class="token number">28</span> <span class="token number">15</span>:59 /usr/bin/java -<span class="token operator">&gt;</span> /etc/alternatives/java

<span class="token function">ls</span> <span class="token parameter variable">-lrt</span> /etc/alternatives/java
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">43</span> Nov <span class="token number">28</span> <span class="token number">15</span>:59 /etc/alternatives/java -<span class="token operator">&gt;</span> /usr/lib/jvm/java-11-openjdk-amd64/bin/java

<span class="token builtin class-name">cd</span> /usr/lib/jvm
<span class="token function">ls</span> <span class="token parameter variable">-al</span>

total <span class="token number">4</span>
drwxr-xr-x <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">28</span> <span class="token number">15</span>:58 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">1</span> root root <span class="token number">4096</span> Dec <span class="token number">18</span> <span class="token number">21</span>:05 <span class="token punctuation">..</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">2047</span> Apr <span class="token number">21</span>  <span class="token number">2021</span> .java-1.11.0-openjdk-amd64.jinfo
lrwxrwxrwx <span class="token number">1</span> root root   <span class="token number">25</span> Jul <span class="token number">17</span>  <span class="token number">2019</span> default-java -<span class="token operator">&gt;</span> java-1.11.0-openjdk-amd64
lrwxrwxrwx <span class="token number">1</span> root root   <span class="token number">21</span> Apr <span class="token number">21</span>  <span class="token number">2021</span> java-1.11.0-openjdk-amd64 -<span class="token operator">&gt;</span> java-11-openjdk-amd64
drwxr-xr-x <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">28</span> <span class="token number">15</span>:58 java-11-openjdk-amd64
drwxr-xr-x <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">28</span> <span class="token number">15</span>:58 openjdk-11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>whereis java</code> 也是如此，它本身不能定位到安装路径。可以通过上面例子去定位安装路径</p>`,7),p=[o];function t(l,i){return a(),s("div",null,p)}const u=n(r,[["render",t],["__file","linux_find_java_path.html.vue"]]);export{u as default};
