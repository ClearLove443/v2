import{_ as n,V as s,W as a,a0 as e}from"./framework-80bf61a6.js";const t={},p=e(`<h2 id="函数式接口" tabindex="-1"><a class="header-anchor" href="#函数式接口" aria-hidden="true">#</a> 函数式接口</h2><h3 id="匿名函数和闭包-的体现" tabindex="-1"><a class="header-anchor" href="#匿名函数和闭包-的体现" aria-hidden="true">#</a> 匿名函数和闭包 的体现</h3><ul><li><p>java 中无法把一个函数作为参数进行传递，返回结果也无法是一个函数</p></li><li><p>参数和返回只能是基本变量和实例化的对象</p></li></ul><h3 id="函数式接口-1" tabindex="-1"><a class="header-anchor" href="#函数式接口-1" aria-hidden="true">#</a> 函数式接口：</h3><ol><li>如果一个接口只有一个抽象方法，则是函数式接口。</li><li>如果某个接口上声明了 FunctionalInterface 注解，则是函数式接口。</li><li>如果接口只有一个抽象方法，但是没有声明 FunctionalInterface,依旧是。</li><li>函数式接口必须要有一个抽象方法， 如果接种中定义的抽象方法和 Object 类中的方法名相同，则不能认为是一个 函数式接口，因为对象或多或少都会继承 Object。接口的抽象方法不会加 1。</li><li>lambda 表达式必须是方法引用或构造函数引用。</li><li>高阶函数：如果一个函数接收一个函数作为参数，或者返回一个函数作为返回值，那么该函数就叫做高阶函数</li><li>接口中也可以定义方法，方法用 default 修饰。默认方法，保证和老版本代码兼容。实现类默认拥有 接口中的默认方法。</li><li>java 中 lambda 是一个对象，其它语言中是函数,称为函数式接口.</li><li>函数式接口必须有一个上下文。 MyInterface my = () -&gt; System.out.println(&quot;123&quot;); 必须这样（）-&gt;{} 才能存在，MyInterface 就是上下文，用来提供类型推断</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//函数时接口</span>
<span class="token keyword">interface</span> 接口名<span class="token punctuation">{</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token comment">//非函数式接口</span>
<span class="token keyword">interface</span> 接口名<span class="token punctuation">{</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">void</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token comment">//函数式接口</span>
<span class="token keyword">interface</span> 接口名
<span class="token punctuation">{</span>
  <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//因为这里重写来Object类中的方法</span>
  <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在开发过程中经常会使用 if...else... 进行判断抛出异常、分支处理等操作。这些 if...else... 充斥在代码中严重影响了代码代码的美观，这时我们可以利用 Java 8 的 Function 接口来消灭 if...else...。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;出现异常了&quot;</span><span class="token punctuation">)</span>；
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">doOther</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="function-函数式接口" tabindex="-1"><a class="header-anchor" href="#function-函数式接口" aria-hidden="true">#</a> Function 函数式接口</h2><p>使用注解@FunctionalInterface 标识，并且只包含一个抽象方法的接口是函数式接口。函数式接口主要分为 Supplier 供给型函数、Consumer 消费型函数、Runnable 无参无返回型函数和 Function 有参有返回型函数。FunctionalInterface 没有实际作用，只是起标识作用。</p><pre><code>Function可以看作转换型函数
</code></pre><h3 id="functionalinterface-接口" tabindex="-1"><a class="header-anchor" href="#functionalinterface-接口" aria-hidden="true">#</a> FunctionalInterface 接口</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 信息性注释类型，用于指示接口类型声明旨在成为Java语言规范定义的功能接口。
 从概念上讲，功能接口仅具有一种抽象方法。由于默认方法具有实现，因此它们不是抽象的。如果接口声明的抽象方法覆盖了java.lang.Object的公共方法之一，则该方法也不会计入接口的抽象方法计数，因为该接口的任何实现都将具有java.lang.Object或其他地方的实现。
 （这里表达的意思是如果接口中的方法定义和object中的方法一致，则不能算是函数式方法）

  请注意，可以使用lambda表达式，方法引用或构造函数引用来创建功能接口的实例。
  如果使用此注释类型对类型进行注释，则编译器需要生成错误消息，除非：
    1该类型是接口类型，而不是注释类型，枚举或类。
    2带注释的类型满足功能接口的要求。

但是，编译器会将满足功能接口定义的任何接口视为功能接口，而不管接口声明中是否存在FunctionalInterface批注。
 *
 * <span class="token keyword">@jls</span> 4.3.2. The Class Object
 * <span class="token keyword">@jls</span> 9.8 Functional Interfaces
 * <span class="token keyword">@jls</span> 9.4.3 Interface Method Body
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">FunctionalInterface</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="supplier-供给型函数" tabindex="-1"><a class="header-anchor" href="#supplier-供给型函数" aria-hidden="true">#</a> Supplier 供给型函数</h3><p>Supplier 的表现形式为不接受参数、只返回数据</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 代表结果的提供者。
 * 不需要每次调用supplier都返回新的或不同的结果。
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> 该supplier提供的结果类型
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * Gets a result.
     *
     * <span class="token keyword">@return</span> a result
     */</span>
    <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="consumer-消费型函数" tabindex="-1"><a class="header-anchor" href="#consumer-消费型函数" aria-hidden="true">#</a> Consumer 消费型函数</h3><p>Consumer 消费型函数和 Supplier 刚好相反。Consumer 接收一个参数，没有返回值</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 表示一个接受单个输入参数且不返回结果的操作。与大多数其他功能接口不同，消费者有望通过副作用进行操作。
 (副作用，是指传入参数T 可能会被修改)
 *
 * 这是一个功能接口，其功能方法为accept（Object）。

 这是一个功能接口，因此可以用作lambda表达式或方法引用的分配目标
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> 操作输入的类型
 *
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Consumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 对给定的参数执行此操作。
     *
     * <span class="token keyword">@param</span> <span class="token parameter">t</span> 输入的参数
     */</span>
    <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     返回一个组成的使用者，该使用者依次执行此操作，然后执行after操作。如果执行任何一个操作均引发异常，则将其中继到组合操作的调用方。如果执行此操作引发异常，则将不执行after操作。
     *
     * <span class="token keyword">@param</span> 该操作后要执行的操作
     * <span class="token keyword">@return</span> 一个组合Consumer，该使用者依次执行此操作，然后执行after操作
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">after</span></span><span class="token punctuation">}</span> is null
     */</span>
    <span class="token keyword">default</span> <span class="token class-name">Consumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">andThen</span><span class="token punctuation">(</span><span class="token class-name">Consumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> after<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>after<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span> <span class="token function">accept</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span> after<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="runnable-无参无返回型函数" tabindex="-1"><a class="header-anchor" href="#runnable-无参无返回型函数" aria-hidden="true">#</a> Runnable 无参无返回型函数</h3><p>Runnable 的表现形式为即没有参数也没有返回值</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Runnable接口应该由其实例旨在由线程执行的任何类实现。 该类必须定义一个名为run的无参数方法。
 * 此接口旨在为希望在活动时执行代码的对象提供通用协议。 例如， Runnable是由类Thread实现的。 处于活动状态仅意味着线程已启动且尚未停止。
 * 此外， Runnable提供了使类处于活动状态而不是子类化Thread 。 通过实例化Thread实例并将自身作为目标传入，实现Runnable的类可以在不继承Thread的情况下运行。 在大多数情况下，如果您只打算覆盖run()方法而不打算覆盖其他Thread方法，则应该使用Runnable接口。 这很重要，因为除非程序员打算修改或增强类的基本行为，否则类不应被子类化。
 * 自从：
 * JDK1.0
 * 也可以看看：
 * Thread ， java.util.concurrent.Callable
 * 作者：
 * 阿瑟·范霍夫
 * <span class="token keyword">@author</span>  Arthur van Hoff
 * <span class="token keyword">@see</span>     <span class="token reference"><span class="token class-name">Thread</span></span>
 * <span class="token keyword">@see</span>     <span class="token reference"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">Callable</span></span>
 * <span class="token keyword">@since</span>   JDK1.0
 */</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 当使用实现接口Runnable的对象创建线程时，启动线程会导致在单独执行的线程中调用对象的run方法。
     * 方法run的一般约定是它可以采取任何行动。
     * 也可以看看：
     * Thread.run()
     * <span class="token keyword">@see</span>     <span class="token reference"><span class="token class-name">Thread</span><span class="token punctuation">#</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="function-函数" tabindex="-1"><a class="header-anchor" href="#function-函数" aria-hidden="true">#</a> Function 函数</h3><p>表现形式为接收一个参数，并返回一个值。Supplier、Consumer 和 Runnable 可以看作 Function 的一种特殊表现形式。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * 接收一个参数返回一个结果

 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> 输入参数类型
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>R<span class="token punctuation">&gt;</span></span> 返回结果类型
 *
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 应用此function到给定的参数
     * <span class="token keyword">@param</span> <span class="token parameter">t</span> 输入参数
     * <span class="token keyword">@return</span> 返回结果
     */</span>
    <span class="token class-name">R</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 返回一个组合函数，该函数首先将before函数应用于其输入，然后将该函数应用于结果。如果对任一函数的求值抛      出异常，则将其中继到组合函数的调用方。
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>V<span class="token punctuation">&gt;</span></span> the type of input to the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">before</span></span><span class="token punctuation">}</span> function, and to the
     *           composed function
     * <span class="token keyword">@param</span> <span class="token parameter">before</span> 应用此功能之前要应用的功能
     * <span class="token keyword">@return</span> 一个组合函数，首先应用before函数，然后再应用此函数
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if before is null
     *
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">andThen</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token punctuation">)</span></span>
     */</span>
    <span class="token keyword">default</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">&gt;</span></span> <span class="token function">compose</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">V</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> before<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>before<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//先执行before动作获得一个结果，让你后将获得的结果应用于compose function</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">V</span> v<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">apply</span><span class="token punctuation">(</span>before<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     返回一个组合函数，该函数首先将此函数应用于其输入，然后将after函数应用于结果。如果对任一函数的求值抛出异常，则将其中继到组合函数的调用方。
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>V<span class="token punctuation">&gt;</span></span> the type of output of the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">after</span></span><span class="token punctuation">}</span> function, and of the
     *           composed function
     * <span class="token keyword">@param</span> <span class="token parameter">after</span> 应用此功能后要应用的功能
     * <span class="token keyword">@return</span> 一个组合函数，首先应用此函数，然后应用after函数
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if after is null
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">compose</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token punctuation">)</span></span>
     */</span>
    <span class="token keyword">default</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">andThen</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">R</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> after<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>after<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//首先应用andThen function,得到一个结果，然后将此结果应用于after</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> after<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token function">apply</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回始终返回其输入参数的函数。
     *
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> 函数的输入和输出对象的类型
     * <span class="token keyword">@return</span> 始终返回其输入参数的函数
     */</span>
    <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> t <span class="token operator">-&gt;</span> t<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bifunction-函数" tabindex="-1"><a class="header-anchor" href="#bifunction-函数" aria-hidden="true">#</a> BiFunction 函数</h3><p>表示一个接受两个参数并产生结果的函数。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*

 表示一个接受两个参数并产生结果的函数。这是Function的两个领域。这是一个功能接口，其功能方法为apply（Object，Object）。
  这是一个功能接口，因此可以用作lambda表达式或方法引用的分配目标。

 * @param &lt;T&gt; 第一个参数
 * @param &lt;U&gt; 第二个参数
 * @param &lt;R&gt; 返回结果类型
 *
 * @see Function
 * @since 1.8
 */</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BiFunction</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">U</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 将此函数应用于给定参数。
     *
     * <span class="token keyword">@param</span> <span class="token parameter">t</span> 第一个参数
     * <span class="token keyword">@param</span> <span class="token parameter">u</span> 第二个参数
     * <span class="token keyword">@return</span> 结果
     */</span>
    <span class="token class-name">R</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">,</span> <span class="token class-name">U</span> u<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
    返回一个组合函数，该函数首先将此函数应用于其输入，然后将after函数应用于结果。如果对任一函数的求值抛出异常，则将其中继到组合函数的调用方。
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>V<span class="token punctuation">&gt;</span></span> after函数和组合函数的输出类型
     * <span class="token keyword">@param</span> <span class="token parameter">after</span> 应用此功能后要应用的功能
     * <span class="token keyword">@return</span> 一个组合函数，首先应用此函数，然后应用after函数
     * applies the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">after</span></span><span class="token punctuation">}</span> function
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if after is null
     */</span>
    <span class="token keyword">default</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">BiFunction</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">U</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">andThen</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">R</span><span class="token punctuation">,</span> <span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> after<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>after<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">,</span> <span class="token class-name">U</span> u<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> after<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token function">apply</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> u<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="binaryoperator-函数" tabindex="-1"><a class="header-anchor" href="#binaryoperator-函数" aria-hidden="true">#</a> BinaryOperator 函数</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 表示对两个相同类型的操作数的运算，产生与该操作数相同类型的结果。对于操作数和结果均为相同类型的情况，这是BiFunction的特殊化。
 * 这是一个函数式接口，函数式方法是 <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token punctuation">#</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span>.
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> 操作数的类型和运算符的结果
 *
 * <span class="token keyword">@see</span> <span class="token reference"><span class="token class-name">BiFunction</span></span>
 * <span class="token keyword">@see</span> <span class="token reference"><span class="token class-name">UnaryOperator</span></span>
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BinaryOperator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">BiFunction</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span><span class="token class-name">T</span><span class="token punctuation">,</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     *返回一个BinaryOperator，它根据指定的Comparator返回两个元素中的较小者
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> 比较器的输入参数的类型
     * <span class="token keyword">@param</span> 比较器，用于比较两个值
     * <span class="token keyword">@return</span> 一个BinaryOperator，根据提供的Comparator返回较小的操作数
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the argument is null
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">BinaryOperator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">minBy</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> comparator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>comparator<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> comparator<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">?</span> a <span class="token operator">:</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     返回BinaryOperator，该BinaryOperator根据指定的Comparator返回两个元素中的较大者。
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> 比较器的输入参数的类型
     * <span class="token keyword">@param</span> 比较器，用于比较两个值
     * <span class="token keyword">@return</span> 一个BinaryOperator，根据提供的Comparator返回较大的操作数
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the argument is null
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">BinaryOperator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">maxBy</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> comparator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>comparator<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> comparator<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">?</span> a <span class="token operator">:</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="predicate-函数" tabindex="-1"><a class="header-anchor" href="#predicate-函数" aria-hidden="true">#</a> Predicate 函数</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>

<span class="token doc-comment comment">/**
 * 表示一个参数的谓词（布尔值函数）。这是一个功能接口，其功能方法为test（Object）。
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> the type of the input to the predicate
 *
 * <span class="token keyword">@since</span> 1.8
 */</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 根据给定参数评估此谓词。 true或false
     *
     * <span class="token keyword">@param</span> <span class="token parameter">t</span> the input argument
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if the input argument matches the predicate,
     * otherwise <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">false</span></span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token class-name">T</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>

     <span class="token doc-comment comment">/**
     * 返回表示该谓词与另一个谓词的短路逻辑与的组合谓词。在评估组合谓词时，如果该谓词为假，则不会评估另一个谓词。
    在评估任一谓词过程中引发的任何异常都会中继给调用者；如果对此谓词的求值抛出异常，则不会对另一个谓词求值。
     *
     * <span class="token keyword">@param</span> <span class="token parameter">other</span> a predicate that will be logically-ANDed with this
     *              predicate
     * <span class="token keyword">@return</span> a composed predicate that represents the short-circuiting logical
     * AND of this predicate and the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">other</span></span><span class="token punctuation">}</span> predicate
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if other is null
     */</span>
    <span class="token keyword">default</span> <span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">and</span><span class="token punctuation">(</span><span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>other<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">test</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> other<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回表示此谓词逻辑否定的谓词。
     * <span class="token keyword">@return</span> a predicate that represents the logical negation of this
     * predicate
     */</span>
    <span class="token keyword">default</span> <span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">negate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token operator">!</span><span class="token function">test</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     *返回一个组成的谓词，该谓词表示此谓词和另一个谓词的短路逻辑或。在评估组合谓词时，如果该谓词为true，则不会评估另一个谓词。
     *
   在评估任一谓词过程中引发的任何异常都会中继给调用者；如果对此谓词的求值抛出异常，则不会对另一个谓词求值。
     * <span class="token keyword">@param</span> <span class="token parameter">other</span> a predicate that will be logically-ORed with this
     *              predicate
     * <span class="token keyword">@return</span> a composed predicate that represents the short-circuiting logical
     * OR of this predicate and the <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java">other</span></span><span class="token punctuation">}</span> predicate
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if other is null
     */</span>
    <span class="token keyword">default</span> <span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">or</span><span class="token punctuation">(</span><span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> other<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">requireNonNull</span><span class="token punctuation">(</span>other<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">test</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">||</span> other<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     *返回一个谓词，该谓词根据Objects.equals（Object，Object）测试两个参数是否相等。
     *
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> the type of arguments to the predicate
     * <span class="token keyword">@param</span> <span class="token parameter">targetRef</span> the object reference with which to compare for equality,
     *               which may be <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token keyword">null</span></span></span><span class="token punctuation">}</span>
     * <span class="token keyword">@return</span> a predicate that tests if two arguments are equal according
     * to <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Objects</span><span class="token punctuation">#</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span>
     */</span>
    <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Predicate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">isEqual</span><span class="token punctuation">(</span><span class="token class-name">Object</span> targetRef<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> targetRef<span class="token punctuation">)</span>
                <span class="token operator">?</span> <span class="token class-name">Objects</span><span class="token operator">::</span><span class="token function">isNull</span>
                <span class="token operator">:</span> object <span class="token operator">-&gt;</span> targetRef<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用小技巧" tabindex="-1"><a class="header-anchor" href="#使用小技巧" aria-hidden="true">#</a> 使用小技巧</h2><h3 id="处理抛出异常的-if" tabindex="-1"><a class="header-anchor" href="#处理抛出异常的-if" aria-hidden="true">#</a> 处理抛出异常的 if</h3><ol><li>定义函数</li></ol><p>定义一个抛出异常的形式的函数式接口, 这个接口只有参数没有返回值是个消费型接口</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 抛异常接口
 **/</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ThrowExceptionFunction</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 抛出异常信息
     *
     * <span class="token keyword">@param</span> <span class="token parameter">message</span> 异常信息
     * <span class="token keyword">@return</span> void
     **/</span>
    <span class="token keyword">void</span> <span class="token function">throwMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建工具类 VUtils 并创建一个 isTure 方法，方法的返回值为刚才定义的函数式接口-ThrowExceptionFunction。ThrowExceptionFunction 的接口实现逻辑为当参数 b 为 true 时抛出异常.</p><ol start="2"><li>编写判断方法</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 *  如果参数为true抛出异常
 *
 * <span class="token keyword">@param</span> <span class="token parameter">b</span>
 * <span class="token keyword">@return</span> com.example.demo.func.ThrowExceptionFunction
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ThrowExceptionFunction</span> <span class="token function">isTure</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>errorMessage<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>errorMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>使用方式</li></ol><p>调用工具类参数参数后，调用函数式接口的 throwMessage 方法传入异常信息。当出入的参数为 false 时正常执行。</p><h3 id="处理-if-分支操作" tabindex="-1"><a class="header-anchor" href="#处理-if-分支操作" aria-hidden="true">#</a> 处理 if 分支操作</h3><ol><li>定义函数式接口</li></ol><p>创建一个名为 BranchHandle 的函数式接口，接口的参数为两个 Runnable 接口。这两个两个 Runnable 接口分别代表了为 true 或 false 时要进行的操作</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 分支处理接口
 **/</span>
<span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BranchHandle</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 分支操作
     *
     * <span class="token keyword">@param</span> <span class="token parameter">trueHandle</span> 为true时要进行的操作
     * <span class="token keyword">@param</span> <span class="token parameter">falseHandle</span> 为false时要进行的操作
     * <span class="token keyword">@return</span> void
     **/</span>
    <span class="token keyword">void</span> <span class="token function">trueOrFalseHandle</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> trueHandle<span class="token punctuation">,</span> <span class="token class-name">Runnable</span> falseHandle<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>编写判断方法</li></ol><p>创建一个名为 isTureOrFalse 的方法，方法的返回值为刚才定义的函数式接口-BranchHandle</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 参数为true或false时，分别进行不同的操作
 *
 * <span class="token keyword">@param</span> <span class="token parameter">b</span>
 * <span class="token keyword">@return</span> com.example.demo.func.BranchHandle
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">BranchHandle</span> <span class="token function">isTureOrFalse</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>trueHandle<span class="token punctuation">,</span> falseHandle<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">{</span>
            trueHandle<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            falseHandle<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>使用方式</li></ol><p>参数为 true 时，执行 trueHandle</p><p>参数为 false 时，执行 falseHandle</p><h3 id="如果存在值执行消费操作-否则执行基于空的操作" tabindex="-1"><a class="header-anchor" href="#如果存在值执行消费操作-否则执行基于空的操作" aria-hidden="true">#</a> 如果存在值执行消费操作，否则执行基于空的操作</h3><ol><li>定义函数</li></ol><p>创建一个名为 PresentOrElseHandler 的函数式接口，接口的参数一个为 Consumer 接口。一个为 Runnable,分别代表值不为空时执行消费操作和值为空时执行的其他操作</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 空值与非空值分支处理
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PresentOrElseHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span> <span class="token keyword">extends</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 值不为空时执行消费操作
     * 值为空时执行其他的操作
     *
     * <span class="token keyword">@param</span> <span class="token parameter">action</span> 值不为空时，执行的消费操作
     * <span class="token keyword">@param</span> <span class="token parameter">emptyAction</span> 值为空时，执行的操作
     * <span class="token keyword">@return</span> void
     **/</span>
   <span class="token keyword">void</span> <span class="token function">presentOrElseHandle</span><span class="token punctuation">(</span><span class="token class-name">Consumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">super</span> <span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> action<span class="token punctuation">,</span> <span class="token class-name">Runnable</span> emptyAction<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>编写判断方法</li></ol><p>创建一个名为 isBlankOrNoBlank 的方法，方法的返回值为刚才定义的函数式接口-PresentOrElseHandler</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 参数为true或false时，分别进行不同的操作
 *
 * <span class="token keyword">@param</span> <span class="token parameter">b</span>
 * <span class="token keyword">@return</span> com.example.demo.func.BranchHandle
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">PresentOrElseHandler</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">isBlankOrNoBlank</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>consumer<span class="token punctuation">,</span> runnable<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>str <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            runnable<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            consumer<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>使用方式 调用工具类参数参数后，调用函数式接口的 presentOrElseHandle 方法传入一个 Consumer 和 Runnable 参数不为空时，打印参数</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testVutils</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">VUtils</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">throwMessage</span><span class="token punctuation">(</span><span class="token string">&quot;你是真的就报错了&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">VUtils</span><span class="token punctuation">.</span><span class="token function">isTureOrFalse</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trueOrFalseHandle</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;为true，我是真的&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;false，我是假的&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 为空不为空</span>


        <span class="token class-name">VUtils</span><span class="token punctuation">.</span><span class="token function">isBlankOrNoBlank</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">presentOrElseHandle</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Consumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;不为空&quot;</span><span class="token operator">+</span> o<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;为空字符串&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">VUtils</span><span class="token punctuation">.</span><span class="token function">isBlankOrNoBlank</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">presentOrElseHandle</span><span class="token punctuation">(</span><span class="token punctuation">(</span>cunsumerParam<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;不为空&quot;</span><span class="token operator">+</span>cunsumerParam<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;为空字符串&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">VUtils</span><span class="token punctuation">.</span><span class="token function">isBlankOrNoBlank</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">presentOrElseHandle</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;为空字符串&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结尾" tabindex="-1"><a class="header-anchor" href="#结尾" aria-hidden="true">#</a> 结尾</h2><p>Function 函数式接口是 java 8 非常重要的特性，利用好 Function 函数可以极大的简化代码</p>`,63),c=[p];function l(o,i){return s(),a("div",null,c)}const r=n(t,[["render",l],["__file","java8_function_reduce_ifelse.html.vue"]]);export{r as default};
