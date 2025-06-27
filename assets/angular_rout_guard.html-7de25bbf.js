import{_ as s,V as a,W as t,a0 as p}from"./framework-7c77a285.js";const o={};function e(c,n){return a(),t("div",null,n[0]||(n[0]=[p(`<p>angular 防止未经授权的访问</p><p>使用路由守卫来防止用户未经授权就导航到应用的某些部分。Angular 中提供了以下路由守卫：</p><ul><li>CanActivate</li><li>CanActivateChild</li><li>CanDeactivate</li><li>Resolve</li><li>CanLoad</li></ul><p>创建一项服务 router-guard.service.ts：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Injectable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@angular/core&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>
  ActivatedRouteSnapshot<span class="token punctuation">,</span>
  CanActivate<span class="token punctuation">,</span>
  Router<span class="token punctuation">,</span>
  RouterStateSnapshot<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@angular/router&quot;</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * RouterGuardService
 *
 * <span class="token keyword">@export</span>
 * <span class="token keyword">@class</span> RouterGuardService
 * <span class="token keyword">@implements</span> <span class="token punctuation">{</span>CanActivate<span class="token punctuation">}</span>
 */</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  providedIn<span class="token operator">:</span> <span class="token string">&quot;root&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">RouterGuardService</span> <span class="token keyword">implements</span> <span class="token class-name">CanActivate</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> router<span class="token operator">:</span> Router<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * canActivate
   *
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>ActivatedRouteSnapshot<span class="token punctuation">}</span> _route
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>RouterStateSnapshot<span class="token punctuation">}</span> _state
   * <span class="token keyword">@returns</span> <span class="token punctuation">{</span>boolean<span class="token punctuation">}</span>
   * <span class="token keyword">@memberof</span> RouterGuardService
   */</span>
  <span class="token keyword">public</span> <span class="token function">canActivate</span><span class="token punctuation">(</span>
    _route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span>
    _state<span class="token operator">:</span> RouterStateSnapshot
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span>_state<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> token <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&quot;token&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&quot;token&quot;</span> <span class="token operator">+</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigateByUrl</span><span class="token punctuation">(</span><span class="token string">&quot;/account/login&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在路由模块(app-routing.module.ts)中，在 routes 配置中使用相应的属性。这里的 canActivate 会告诉路由器它要协调到这个特定路由的导航。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> DashboardLayoutsComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;src/shared/layouts/dashboard-layouts.component&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> NgModule <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@angular/core&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> RouterModule<span class="token punctuation">,</span> Routes <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@angular/router&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> RouterGuardService <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./services/router-guard.service&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> routes<span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">&quot;account&quot;</span><span class="token punctuation">,</span>
    <span class="token function-variable function">loadChildren</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
      <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;../business/pages/account/account.module&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> m<span class="token punctuation">.</span>AccountModule
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> DashboardLayoutsComponent<span class="token punctuation">,</span>
    canActivate<span class="token operator">:</span> <span class="token punctuation">[</span>RouterGuardService<span class="token punctuation">]</span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> redirectTo<span class="token operator">:</span> <span class="token string">&quot;system/home&quot;</span><span class="token punctuation">,</span> pathMatch<span class="token operator">:</span> <span class="token string">&quot;full&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        path<span class="token operator">:</span> <span class="token string">&quot;examples&quot;</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadChildren</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
          <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;../business/pages/examples/examples.module&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> m<span class="token punctuation">.</span>ExamplesModule
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        path<span class="token operator">:</span> <span class="token string">&quot;system&quot;</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadChildren</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
          <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;../business/pages/dashboard/dashboard.module&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> m<span class="token punctuation">.</span>DashboardModule
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        path<span class="token operator">:</span> <span class="token string">&quot;exception&quot;</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadChildren</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
          <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;./pages/exception/exception.module&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
            <span class="token punctuation">(</span>m<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> m<span class="token punctuation">.</span>ExceptionModule
          <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// Exception</span>
  <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&quot;**&quot;</span><span class="token punctuation">,</span> redirectTo<span class="token operator">:</span> <span class="token string">&quot;exception/404&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * AppRoutingModule
 *
 * <span class="token keyword">@export</span>
 * <span class="token keyword">@class</span> AppRoutingModule
 */</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">NgModule</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>
    RouterModule<span class="token punctuation">.</span><span class="token function">forRoot</span><span class="token punctuation">(</span>routes<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      useHash<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      relativeLinkResolution<span class="token operator">:</span> <span class="token string">&quot;legacy&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span> <span class="token punctuation">[</span>RouterModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppRoutingModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)]))}const u=s(o,[["render",e],["__file","angular_rout_guard.html.vue"]]);export{u as default};
