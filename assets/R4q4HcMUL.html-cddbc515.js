import{_ as e,D as s,V as i,W as l,Y as a,Z as t,$ as p,a0 as r}from"./framework-73d9479b.js";const o={},c={href:"https://developer.aliyun.com/article/708980",target:"_blank",rel:"noopener noreferrer"},d=r(`<h2 id="方法一" tabindex="-1"><a class="header-anchor" href="#方法一" aria-hidden="true">#</a> 方法一</h2><p>运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token string">&#39;9090:9090&#39;</span> <span class="token parameter variable">--name</span> springboot-demo <span class="token parameter variable">-v</span> D:/Workspace/SpringBootDemo/target/SpringBootDemo-0.0.1-SNAPSHOT.war:/app.jar openjdk:11.0.11-jre-slim <span class="token function">java</span> <span class="token parameter variable">-jar</span> /app.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="方法二" tabindex="-1"><a class="header-anchor" href="#方法二" aria-hidden="true">#</a> 方法二</h2><p>先制作镜像， Dockerfile 设置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 添加 Java 8 镜像来源
# FROM openjdk:11.0.11-jre-slim
FROM openjdk:8u322-jre-slim-buster

# 添加参数
ARG JAR_FILE

# 添加 Spring Boot 包
ADD demo-0.0.1-SNAPSHOT.war app.jar

# 执行启动命令
ENTRYPOINT [&quot;java&quot;,&quot;-Djava.security.egd=file:/dev/./urandom&quot;,&quot;-jar&quot;,&quot;/app.jar&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>制作镜像命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> tomcat:v1 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行实例命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">-d</span> tomcat:v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>powershell 执行</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token punctuation">.</span>\\gradlew build <span class="token punctuation">;</span> docker build <span class="token operator">-</span>t tomcat:v1 <span class="token punctuation">.</span> <span class="token punctuation">;</span> docker run <span class="token operator">-</span>p 8080:8080 <span class="token operator">-</span>d tomcat:v1 <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="方法三" tabindex="-1"><a class="header-anchor" href="#方法三" aria-hidden="true">#</a> 方法三</h2><p>docker-compose</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">springboot</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> openjdk<span class="token punctuation">:</span>latest
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> springboot
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8080<span class="token punctuation">:</span><span class="token number">8080</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./app/app.jar<span class="token punctuation">:</span>/app/app.jar
    <span class="token key atrule">command</span><span class="token punctuation">:</span> java <span class="token punctuation">-</span>jar /app/app.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,17);function u(v,m){const n=s("ExternalLinkIcon");return i(),l("div",null,[a("p",null,[a("a",c,[t("Spring boot"),p(n)])]),d])}const b=e(o,[["render",u],["__file","R4q4HcMUL.html.vue"]]);export{b as default};
