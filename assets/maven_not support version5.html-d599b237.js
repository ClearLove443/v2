import{_ as e,V as n,W as t,a0 as i}from"./framework-bdfa852d.js";const l={},a=i(`<h1 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述" aria-hidden="true">#</a> 问题描述</h1><p>在构建某个 maven 项目的时候发生了异常，遇到以下错误，理论上是由于没有指定 JAVA 版本导致的。</p><ul><li>[ERROR] 不再支持源选项 5。请使用 6 或更高版本。</li><li>[ERROR] 不再支持目标选项 1.5。请使用 1.6 或更高版本。</li></ul><p>#　解决方案 pom.xml 文件中增加 maven 编译的 java.version jdk 版本设置，以及 maven.compiler.source 资源编译 jdk 版本设置和 maven.compiler.target 资源构建 jdk 版本设置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.encoding&gt;UTF-8&lt;/maven.compiler.encoding&gt;
        &lt;java.version&gt;1.8&lt;/java.version&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),r=[a];function s(o,c){return n(),t("div",null,r)}const v=e(l,[["render",s],["__file","maven_not support version5.html.vue"]]);export{v as default};
