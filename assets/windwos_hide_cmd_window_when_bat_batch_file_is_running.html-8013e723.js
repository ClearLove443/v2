import{_ as e,V as i,W as n,a0 as t}from"./framework-0db4e8b6.js";const d={},s=t(`<h1 id="直接执行-cmd-命令的时候-显示的黑框不太美观。可以把黑框隐藏掉。推荐使用第一种。" tabindex="-1"><a class="header-anchor" href="#直接执行-cmd-命令的时候-显示的黑框不太美观。可以把黑框隐藏掉。推荐使用第一种。" aria-hidden="true">#</a> 直接执行 cmd 命令的时候，显示的黑框不太美观。可以把黑框隐藏掉。推荐使用第一种。</h1><ul><li>新建个 vbs 文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>set ws=WScript.CreateObject(&quot;WScript.Shell&quot;)
&#39;ws.Run &quot;yy.bat&quot;,0

Dim cmd1
cmd = &quot;java -jar 11.war&quot;
&#39;ws.Run cmd, 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在 vbs 文件调用需要执行的批处理文件，或者把批处理直接定义在 vbs 里面</p><ul><li>编辑 bat 文件，在开头处写入</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@echo off
if &quot;%1&quot; == &quot;h&quot; goto begin
mshtavbscript:createobject(&quot;wscript.shell&quot;).run(&quot;&quot;&quot;%~nx0&quot;&quot; h&quot;,0)(window.close)&amp;&amp;exit
:begin
REM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>缺点：这个方法运行 bat 时，cmd 窗口还是闪了一下。</p>`,7),a=[s];function l(c,u){return i(),n("div",null,a)}const r=e(d,[["render",l],["__file","windwos_hide_cmd_window_when_bat_batch_file_is_running.html.vue"]]);export{r as default};
