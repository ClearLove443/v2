import{_ as i,V as n,W as d,a0 as a}from"./framework-e0f7ab62.js";const t={};function u(s,e){return n(),d("div",null,[...e[0]||(e[0]=[a(`<p>执行命令 ：npm build --pord，出现以下错误</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>WARNING in Invalid background value at 11:14. Ignoring.
WARNING in budgets, maximum exceeded for initial. Budget 2 MB was exceeded by 3.73 MB.
ERROR in budgets, maximum exceeded for initial. Budget 5 MB was exceeded by 750 kB.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方案： 打开 angular.json 文件，找到 budgets 看到这段</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;budgets&quot;: [
   {
      &quot;type&quot;: &quot;initial&quot;,
      &quot;maximumWarning&quot;: &quot;2mb&quot;,
      &quot;maximumError&quot;: &quot;5mb&quot;
   }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改相关配置即可</p>`,5)])])}const r=i(t,[["render",u],["__file","angular_H06-CD5rt.html.vue"]]);export{r as default};
