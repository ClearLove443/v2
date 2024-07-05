import{_ as n,V as a,W as s,a0 as e}from"./framework-a97d3b5d.js";const t={},c=e(`<p>使用 Spring Boot 时，默认情况下，配置 DataSource 非常容易。Spring Boot 会自动为我们配置好一个 DataSource。 如果在 application.yml 中指定了 spring.datasource 的相关配置，Spring Boot 就会使用该配置创建一个 DataSource。如果在 application.yml 中没有指定任何 spring.datasource 的相关配置，Spring Boot 会在 classpath 中搜索 H2、hsqldb 等内存数据库的 jar 包，如果找到了，就会自动配置一个内存数据库的 DataSource，所以，我们只要引入 jar 包即可。</p><p>但是，在某些情况下，如果我们需要配置多个数据源，应该如何在 Spring Boot 中配置呢？ 我们以 JDBC 为例，演示如何在 Spring Boot 中配置两个 DataSource。对应的，我们会创建两个 JdbcTemplate 的 Bean，分别使用这两个数据源。 首先，我们必须在 application.yml 中声明两个数据源的配置，一个使用 hive-datasource，另一个使用 hive_kerberos-datasource：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">hive-datasource</span><span class="token punctuation">:</span>
  <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>hive2<span class="token punctuation">:</span>//110.40.137.191<span class="token punctuation">:</span>10000/testdb
  <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.apache.hive.jdbc.HiveDriver
<span class="token key atrule">hive_kerberos-datasource</span><span class="token punctuation">:</span>
  <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>hive2<span class="token punctuation">:</span>//110.42.214.104<span class="token punctuation">:</span>10000/default;principal=hive/quickstart.cloudera@CLOUDERA
  <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> org.apache.hive.jdbc.HiveDriver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两个 DataSource 都使用 hivedb，但是数据库是不同的。此外，在使用多数据源的时候，所有必要配置都不能省略。 其次，我们需要自己创建两个 DataSource 的 Bean，其中一个标记为@Primary，另一个命名为 kerberosDatasource： 对于每一个 DataSource，我们都必须通过@ConfigurationProperties(prefix = &quot;xxx&quot;)指定配置项的前缀。 紧接着，我们创建两个 JdbcTemplate 的 Bean，其中一个标记为@Primary，另一个命名为 kerberosJdbcTemplate，分别使用对应的 DataSource： 注意到 kerberosJdbcTemplate 在创建时，传入的 DataSource 必须用@Qualifier(&quot;kerberosDatasource&quot;)声明，这样，才能使用第二个 DataSource</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  <span class="token doc-comment comment">/**
     * 无认证数据源配置
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;hive-datasource&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Primary</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">setNoAuthDatasource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">DataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     *
     * 无认证jdbc连接
     *
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@Primary</span>
    <span class="token class-name">JdbcTemplate</span> <span class="token function">getNoAuthDatasourceJdbc</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JdbcTemplate</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * kerberos认证数据源配置
     *
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;kerberosDatasource&quot;</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">&quot;hive_kerberos-datasource&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">DataSource</span> <span class="token function">kerberosDatasource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// kerberos 认证</span>
        <span class="token function">kerberosAuth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">DataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     *
     * kerberos认证jdbc连接
     *
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;kerberosJdbcTemplate&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">JdbcTemplate</span> <span class="token function">kerberosJdbcTemplate</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;kerberosDatasource&quot;</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JdbcTemplate</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们就创建了两个 JdbcTemplate 的 Bean。在需要使用第一个 JdbcTemplate 的地方，我们直接注入：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SomeService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">JdbcTemplate</span> jdbcTemplate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在需要使用第二个 JdbcTemplate 的地方，我们注入时需要用@Qualifier(&quot;kerberosJdbcTemplate&quot;)标识：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AnotherService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">&quot;kerberosJdbcTemplate&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">JdbcTemplate</span> kerberosJdbcTemplate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们就可以针对不同的数据源，用不同的 JdbcTemplate 进行操作。</p><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h2><p>当存在多个相同类型的 Bean，例如，多个 DataSource，多个 JdbcTemplate 时，强烈建议总是使用@Primary 把其中某一个 Bean 标识为“主要的”，使用@Autowired 注入时会首先使用被标记为@Primary 的 Bean。 相同类型的其他 Bean，每一个都需要用@Bean(name=&quot;xxx&quot;)标识名字，并且，在使用@Autowired 注入时配合@Qualifier(&quot;xxx&quot;)指定注入的 Bean 的名字。</p>`,12),p=[c];function o(i,l){return a(),s("div",null,p)}const r=n(t,[["render",o],["__file","springboot_configure_multiple_dataSource.html.vue"]]);export{r as default};
