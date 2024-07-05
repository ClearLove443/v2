import{_ as e,V as i,W as n,a0 as d}from"./framework-a97d3b5d.js";const t={},a=d(`<p>执行命令 ：npm build --pord，出现以下错误</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WARNING in Invalid background value at 11:14. Ignoring.
WARNING in budgets, maximum exceeded for initial. Budget 2 MB was exceeded by 3.73 MB.
ERROR in budgets, maximum exceeded for initial. Budget 5 MB was exceeded by 750 kB.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方案： 打开 angular.json 文件，找到 budgets 看到这段</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;budgets&quot;: [
   {
      &quot;type&quot;: &quot;initial&quot;,
      &quot;maximumWarning&quot;: &quot;2mb&quot;,
      &quot;maximumError&quot;: &quot;5mb&quot;
   }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改相关配置即可</p>`,5),s=[a];function u(l,r){return i(),n("div",null,s)}const c=e(t,[["render",u],["__file","angular_H06-CD5rt.html.vue"]]);export{c as default};
