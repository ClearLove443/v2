import{_ as n,V as s,W as a,a0 as t}from"./framework-bdfa852d.js";const p={},e=t(`<h1 id="一-组件之间传值的方法" tabindex="-1"><a class="header-anchor" href="#一-组件之间传值的方法" aria-hidden="true">#</a> 一.组件之间传值的方法</h1><h2 id="_1-父子组件之间的传值方法" tabindex="-1"><a class="header-anchor" href="#_1-父子组件之间的传值方法" aria-hidden="true">#</a> 1.父子组件之间的传值方法</h2><h3 id="_1-1-ininput-和-output-方法" tabindex="-1"><a class="header-anchor" href="#_1-1-ininput-和-output-方法" aria-hidden="true">#</a> 1.1 @InInput 和@Output 方法</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>·子组件 component<span class="token punctuation">.</span>ts
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">testExample</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span><span class="token punctuation">{</span>
	@Input test<span class="token operator">:</span>any <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	@Output testFun <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventEmitter</span><span class="token operator">&lt;</span>any<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


父组件模版引用子组件
<span class="token operator">&lt;</span>test<span class="token operator">-</span>example <span class="token punctuation">[</span>test<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;test&quot;</span> <span class="token punctuation">(</span>testFun<span class="token punctuation">)</span><span class="token operator">=</span><span class="token string">&quot;testFun($event)&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>test<span class="token operator">-</span>example<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>@Input 修饰的变量为父组件传入子组件的输入属性. @Outpue 修饰的子组件传入父组件的输出属性.</p><h3 id="_1-2-inputs-和-outputs" tabindex="-1"><a class="header-anchor" href="#_1-2-inputs-和-outputs" aria-hidden="true">#</a> 1.2 inputs 和 outputs</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>子组件 component<span class="token punctuation">.</span>ts
@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
     <span class="token comment">//...</span>
    <span class="token literal-property property">inputs</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">outputs</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;testFun&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

 父组件模版引用子组件
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">testExample</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span><span class="token punctuation">{</span>
    <span class="token literal-property property">test</span><span class="token operator">:</span>any <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    testFun <span class="token operator">=</span> <span class="token keyword">new</span> 	<span class="token class-name">EventEmitter</span><span class="token operator">&lt;</span>any<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-viewchild-父组件获取子组件的引用" tabindex="-1"><a class="header-anchor" href="#_1-3-viewchild-父组件获取子组件的引用" aria-hidden="true">#</a> 1.3 @ViewChild,父组件获取子组件的引用</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Component<span class="token punctuation">,</span> AfterViewInit<span class="token punctuation">,</span> ViewChild <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@angular/core&quot;</span><span class="token punctuation">;</span>
@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">selector</span><span class="token operator">:</span> <span class="token string">&quot;collection&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;contact-collect (click)=&quot;collectTheContact()&quot;&gt;&lt;/contact-collect&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CollectionComponent</span> <span class="token punctuation">{</span>
  @<span class="token function">ViewChild</span><span class="token punctuation">(</span>ContactCollectComponent<span class="token punctuation">)</span> contactCollect<span class="token operator">:</span> ContactCollectComponent<span class="token punctuation">;</span>
  <span class="token function">ngAfterViewInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
  <span class="token punctuation">}</span>

  <span class="token function">collectTheContact</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>contactCollect<span class="token punctuation">.</span><span class="token function">collectTheContact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ViewChild 是属性装饰器,用来从模板视图中获取匹配的元素.视图查询在 ngAfterViewInit 钩子函数调用前完成,因此在 ngAfterViewInit 钩子函数中,就能正常获取查询的元素. ViewChildren 装饰器用来从模板中获取匹配的多个元素,返回的结果是一个 QueryList 集合, 使用模板变量名设置查询条件</p><h3 id="_1-4-局部变量-父组件获取子组件引用" tabindex="-1"><a class="header-anchor" href="#_1-4-局部变量-父组件获取子组件引用" aria-hidden="true">#</a> 1.4 局部变量，父组件获取子组件引用</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">template</span><span class="token operator">:</span>\`
        <span class="token operator">&lt;</span>contact<span class="token operator">-</span><span class="token function">collect</span> <span class="token punctuation">(</span>click<span class="token punctuation">)</span><span class="token operator">=</span><span class="token string">&quot;collectTheContact()&quot;</span> #collect<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>contact<span class="token operator">-</span>collect<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>绑定局部变量 collect(以#号标记),以此来获取子组件类的实例对象.</p><h2 id="_2-非父子组件之间传值" tabindex="-1"><a class="header-anchor" href="#_2-非父子组件之间传值" aria-hidden="true">#</a> 2.非父子组件之间传值</h2><h3 id="_2-1-service" tabindex="-1"><a class="header-anchor" href="#_2-1-service" aria-hidden="true">#</a> 2.1 service</h3><p>需要双向的触发(发送信息/接收信息)</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>service<span class="token punctuation">.</span>ts
<span class="token keyword">import</span> <span class="token punctuation">{</span> Component<span class="token punctuation">,</span> Injectable<span class="token punctuation">,</span> EventEmitter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@angular/core&quot;</span><span class="token punctuation">;</span>
@<span class="token function">Injectable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">myService</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token literal-property property">info</span><span class="token operator">:</span> string <span class="token operator">=</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组件 1 向 service 传递信息</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> myService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../../service/myService.service&#39;</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
<span class="token function">constructor</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token keyword">public</span> <span class="token literal-property property">service</span><span class="token operator">:</span> myService</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token function">changeInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>service<span class="token punctuation">.</span>info <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>service<span class="token punctuation">.</span>info <span class="token operator">+</span> <span class="token string">&quot;1234&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组件 2 从 service 获取信息</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> myService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../../service/myService.service&#39;</span><span class="token punctuation">;</span>
<span class="token operator">...</span>
<span class="token function">constructor</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token keyword">public</span> <span class="token literal-property property">service</span><span class="token operator">:</span> myService</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token function">showInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>service<span class="token punctuation">.</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-使用-behaviorsubject" tabindex="-1"><a class="header-anchor" href="#_2-2-使用-behaviorsubject" aria-hidden="true">#</a> 2.2 使用 BehaviorSubject</h3><p>发布者订阅者模式,当数据改变时,订阅者也能得到响应 service</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@angular/core&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Subject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rxjs&#39;</span><span class="token punctuation">;</span>
@<span class="token function">Injectable</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">PcServiceService</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token comment">// 创建Subject实例</span>
    emitChangeSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Subject</span><span class="token operator">&lt;</span>any<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 创建Observable</span>
    changeEmitted$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>emitChangeSource<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 调用该方法发布消息</span>
    <span class="token function">emitChange</span><span class="token punctuation">(</span>change<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>emitChangeSource<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>change<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组件调用 service 的方法传信息和接收信息</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">public</span> <span class="token literal-property property">service</span><span class="token operator">:</span> PcServiceService</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token function">changeValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// 调用服务发布消息</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>service<span class="token punctuation">.</span><span class="token function">emitChange</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

form<span class="token operator">!</span><span class="token operator">:</span> any<span class="token punctuation">;</span>
<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">public</span> <span class="token literal-property property">service</span><span class="token operator">:</span> PcServiceService</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 订阅消息</span>
    service<span class="token punctuation">.</span>emitChangeSource<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">text</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>form <span class="token operator">=</span> text<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-路由传值" tabindex="-1"><a class="header-anchor" href="#_2-3-路由传值" aria-hidden="true">#</a> 2.3 路由传值</h3><h4 id="_2-3-1-在查询参数中传递" tabindex="-1"><a class="header-anchor" href="#_2-3-1-在查询参数中传递" aria-hidden="true">#</a> 2.3.1 在查询参数中传递</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//传递数据</span>
<span class="token operator">...</span>
<span class="token operator">&lt;</span>a <span class="token punctuation">[</span>routerLink<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;[&#39;/stock&#39;]&quot;</span> <span class="token punctuation">[</span>queryParams<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;{id: 1}&quot;</span><span class="token operator">&gt;</span>股票详情<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>
<span class="token comment">// http://localhost:4200/stock?id=1</span>

<span class="token comment">//接受参数</span>
<span class="token operator">...</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ActivatedRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@amgular/router&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">StockComponent</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token literal-property property">stockId</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token literal-property property">routeInfo</span><span class="token operator">:</span> ActivatedRoute<span class="token punctuation">)</span>
    <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>stockId <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>routeInfo<span class="token punctuation">.</span>snapshot<span class="token punctuation">.</span>queryParams<span class="token punctuation">[</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-2-在路由路径中传递" tabindex="-1"><a class="header-anchor" href="#_2-3-2-在路由路径中传递" aria-hidden="true">#</a> 2.3.2 在路由路径中传递</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//修改配置</span>
<span class="token keyword">const</span> <span class="token literal-property property">routes</span><span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span><span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">redirectTo</span><span class="token operator">:</span> <span class="token string">&#39;/index&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">pathMatch</span><span class="token operator">:</span> <span class="token string">&#39;full&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;index&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> IndexComponent<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;stock/:id&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> StocksComponent <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;**&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> ErrorPageComponent <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">//传递数据</span>
<span class="token operator">...</span><span class="token punctuation">[</span>
<span class="token punctuation">]</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token operator">&lt;</span>a <span class="token punctuation">[</span>routerLink<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">&quot;[&#39;/stock&#39;, 1]&quot;</span><span class="token operator">&gt;</span>股票详情<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>
<span class="token comment">// http://localhost:4200/stock/1</span>

<span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/stock&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">queryParams</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">productId</span><span class="token operator">:</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;moon&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//接受参数</span>
<span class="token operator">...</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ActivatedRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@amgular/router&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">StockComponent</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token literal-property property">stockId</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token literal-property property">routeInfo</span><span class="token operator">:</span> ActivatedRoute<span class="token punctuation">)</span>
    <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>stockId <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>routeInfo<span class="token punctuation">.</span>snapshot<span class="token punctuation">.</span>params<span class="token punctuation">[</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>productId <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>routeInfo<span class="token punctuation">.</span>snapshot<span class="token punctuation">.</span>queryParams<span class="token punctuation">[</span><span class="token string">&#39;productId&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-3-在路由配置中传递" tabindex="-1"><a class="header-anchor" href="#_2-3-3-在路由配置中传递" aria-hidden="true">#</a> 2.3.3 在路由配置中传递</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//路由配置配置</span>
<span class="token keyword">const</span> <span class="token literal-property property">routes</span><span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">redirectTo</span><span class="token operator">:</span> <span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">pathMatch</span><span class="token operator">:</span> <span class="token string">&quot;full&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&quot;index&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> IndexComponent<span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&quot;Index Page&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&quot;stock/:id&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> StocksComponent<span class="token punctuation">,</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&quot;Stock Page&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&quot;**&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> ErrorPageComponent<span class="token punctuation">,</span> <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&quot;Stock Page&quot;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">//接受参数</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>routeInfo<span class="token punctuation">.</span>snapshot<span class="token punctuation">.</span>date<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&quot;title&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="二-其它传值方式" tabindex="-1"><a class="header-anchor" href="#二-其它传值方式" aria-hidden="true">#</a> 二.其它传值方式</h1><p>cookie、session、storage</p>`,35),o=[e];function c(l,i){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","angular-zu-jian-chuan-zhi-fang-fa.html.vue"]]);export{u as default};