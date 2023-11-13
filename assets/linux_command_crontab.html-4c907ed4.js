import{_ as n,V as a,W as s,a0 as e}from"./framework-bdfa852d.js";const i={},l=e(`<h2 id="命令简介" tabindex="-1"><a class="header-anchor" href="#命令简介" aria-hidden="true">#</a> 命令简介</h2><p>我们经常使用的是 crontab 命令是 cron table 的简写，它是 cron 的配置文件，也可以叫它作业列表，我们可以在以下文件夹内找到相关配置文件。</p><ul><li>/var/spool/cron/ 目录下存放的是每个用户包括 root 的 crontab 任务，每个任务以创建者的名字命名</li><li>/etc/crontab 这个文件负责调度各种管理和维护任务。</li><li>/etc/cron.d/ 这个目录用来存放任何要执行的 crontab 文件或脚本。 我们还可以把脚本放在/etc/cron.hourly、/etc/cron.daily、/etc/cron.weekly、/etc/cron.monthly 目录中，让它每小时/天/星期、月执行一次。</li></ul><p>nc 实际上是 ncat 的软链接。ncat 是为 Nmap(Network Mapper) 项目编写的，是 Nmap 套件中的一员，它旨在成为可靠的后端工具，可立即为其他应用程序和用户提供网络连接。ncat 不仅可以使用 IPv4 和 IPv6，还可以为用户提供几乎无限的潜在用途。</p><p>crontab 的使用 我们常用的命令如下：</p><pre><code>crontab [-u username]　　　　//省略用户表表示操作当前用户的crontab
    -e      (编辑工作表)
    -l      (列出工作表里的命令)
    -r      (删除工作作业)
</code></pre><p>我们用 crontab -e 进入当前用户的工作表编辑，是常见的 vim 界面。每行是一条命令。</p><p>crontab 的命令构成为 时间+动作，其时间有分、时、日、月、周五种，操作符有</p><ul><li><ul><li>取值范围内的所有数字</li></ul></li><li>/ 每过多少个数字</li><li><ul><li>从X到Z</li></ul></li><li>，散列数字</li></ul><h2 id="使用简介-ubuntu" tabindex="-1"><a class="header-anchor" href="#使用简介-ubuntu" aria-hidden="true">#</a> 使用简介（ubuntu）</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">cron</span>

<span class="token function">sudo</span> /usr/sbin/service <span class="token function">cron</span> start

<span class="token function">crontab</span> <span class="token parameter variable">-e</span>

* * * * * <span class="token function">sync</span><span class="token punctuation">;</span> <span class="token builtin class-name">echo</span> <span class="token number">3</span> <span class="token operator">&gt;</span> /proc/sys/vm/drop_caches

<span class="token function">sudo</span> /usr/sbin/service <span class="token function">cron</span> restart

<span class="token function">sudo</span> /usr/sbin/service <span class="token function">cron</span> status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="格式" tabindex="-1"><a class="header-anchor" href="#格式" aria-hidden="true">#</a> 格式</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>f1 f2 f3 f4 f5 program
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>其中 f1 是表示分钟，f2 表示小时，f3 表示一个月份中的第几日，f4 表示月份，f5 表示一个星期中的第几天。program 表示要执行的程序。</li><li>当 f1 为 <em>时表示每分钟都要执行 program，f2 为</em> 时表示每小时都要执行程序，以此类推</li><li>当 f1 为 a-b 时表示从第 a 分钟到第 b 分钟这段时间内要执行，f2 为 a-b 时表示从第 a 到第 b 小时都要执行，以此类推</li><li>当 f1 为 <em>/n 时表示每 n 分钟个时间间隔执行一次，f2 为</em>/n 表示每 n 小时个时间间隔执行一次，以此类推</li><li>当 f1 为 a, b, c,… 时表示第 a, b, c,… 分钟要执行，f2 为 a, b, c,… 时表示第 a, b, c…个小时要执行，以此类推</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>*    *    *    *    *
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- 星期中星期几 (0 - 7) (星期天 为0)
|    |    |    +---------- 月份 (1 - 12)
|    |    +--------------- 一个月中的第几天 (1 - 31)
|    +-------------------- 小时 (0 - 23)
+------------------------- 分钟 (0 - 59)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h2><h3 id="实例-1-每-1-分钟执行一次-mycommand" tabindex="-1"><a class="header-anchor" href="#实例-1-每-1-分钟执行一次-mycommand" aria-hidden="true">#</a> 实例 1：每 1 分钟执行一次 myCommand</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>* * * * * myCommand
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-2-每小时的第-3-和第-15-分钟执行" tabindex="-1"><a class="header-anchor" href="#实例-2-每小时的第-3-和第-15-分钟执行" aria-hidden="true">#</a> 实例 2：每小时的第 3 和第 15 分钟执行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">3,15</span> * * * * myCommand
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-3-在上午-8-点到-11-点的第-3-和第-15-分钟执行" tabindex="-1"><a class="header-anchor" href="#实例-3-在上午-8-点到-11-点的第-3-和第-15-分钟执行" aria-hidden="true">#</a> 实例 3：在上午 8 点到 11 点的第 3 和第 15 分钟执行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">3,15</span> <span class="token number">8</span>-11 * * * myCommand
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-4-每隔两天的上午-8-点到-11-点的第-3-和第-15-分钟执行" tabindex="-1"><a class="header-anchor" href="#实例-4-每隔两天的上午-8-点到-11-点的第-3-和第-15-分钟执行" aria-hidden="true">#</a> 实例 4：每隔两天的上午 8 点到 11 点的第 3 和第 15 分钟执行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">3,15</span> <span class="token number">8</span>-11 */2  *  * myCommand
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-5-每周一上午-8-点到-11-点的第-3-和第-15-分钟执行" tabindex="-1"><a class="header-anchor" href="#实例-5-每周一上午-8-点到-11-点的第-3-和第-15-分钟执行" aria-hidden="true">#</a> 实例 5：每周一上午 8 点到 11 点的第 3 和第 15 分钟执行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">3,15</span> <span class="token number">8</span>-11 * * <span class="token number">1</span> myCommand
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-6-每晚的-21-30-重启-smb" tabindex="-1"><a class="header-anchor" href="#实例-6-每晚的-21-30-重启-smb" aria-hidden="true">#</a> 实例 6：每晚的 21:30 重启 smb</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">30</span> <span class="token number">21</span> * * * /etc/init.d/smb restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-7-每月-1、10、22-日的-4-45-重启-smb" tabindex="-1"><a class="header-anchor" href="#实例-7-每月-1、10、22-日的-4-45-重启-smb" aria-hidden="true">#</a> 实例 7：每月 1、10、22 日的 4 : 45 重启 smb</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">45</span> <span class="token number">4</span> <span class="token number">1,10</span>,22 * * /etc/init.d/smb restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-8-每周六、周日的-1-10-重启-smb" tabindex="-1"><a class="header-anchor" href="#实例-8-每周六、周日的-1-10-重启-smb" aria-hidden="true">#</a> 实例 8：每周六、周日的 1 : 10 重启 smb</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">10</span> <span class="token number">1</span> * * <span class="token number">6,0</span> /etc/init.d/smb restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-9-每天-18-00-至-23-00-之间每隔-30-分钟重启-smb" tabindex="-1"><a class="header-anchor" href="#实例-9-每天-18-00-至-23-00-之间每隔-30-分钟重启-smb" aria-hidden="true">#</a> 实例 9：每天 18 : 00 至 23 : 00 之间每隔 30 分钟重启 smb</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">0,30</span> <span class="token number">18</span>-23 * * * /etc/init.d/smb restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-10-每星期六的晚上-11-00-pm-重启-smb" tabindex="-1"><a class="header-anchor" href="#实例-10-每星期六的晚上-11-00-pm-重启-smb" aria-hidden="true">#</a> 实例 10：每星期六的晚上 11 : 00 pm 重启 smb</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">0</span> <span class="token number">23</span> * * <span class="token number">6</span> /etc/init.d/smb restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-11-每一小时重启-smb" tabindex="-1"><a class="header-anchor" href="#实例-11-每一小时重启-smb" aria-hidden="true">#</a> 实例 11：每一小时重启 smb</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">0</span> */1 * * * /etc/init.d/smb restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实例-12-晚上-11-点到早上-7-点之间-每隔一小时重启-smb" tabindex="-1"><a class="header-anchor" href="#实例-12-晚上-11-点到早上-7-点之间-每隔一小时重启-smb" aria-hidden="true">#</a> 实例 12：晚上 11 点到早上 7 点之间，每隔一小时重启 smb</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">0</span> <span class="token number">23</span>-7/1 * * * /etc/init.d/smb restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="几种便捷写法" tabindex="-1"><a class="header-anchor" href="#几种便捷写法" aria-hidden="true">#</a> 几种便捷写法</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@hourly 代表 <span class="token number">0</span> * * * * ，每个小时运行一次
@daily 代表 <span class="token number">0</span> <span class="token number">0</span> * * * ，每天凌晨运行一次
@weekly 代表 <span class="token number">0</span> <span class="token number">0</span> * * <span class="token number">0</span> ，每周星期天凌晨运行一次
@monthly 代表 <span class="token number">0</span> <span class="token number">0</span> <span class="token number">1</span> * * ，每个月第一天凌晨运行一次
@yearly 代表 <span class="token number">0</span> <span class="token number">0</span> <span class="token number">1</span> <span class="token number">1</span> * ，每年的头一分钟运行一次
@reboot 重启后执行一次
@reboot root /sbin/service httpd start  <span class="token comment"># 开机启动apache</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>/etc/cron.d/下面的文件和/etc/crontab 文件格式一样。 /etc/cron.d/0hourly 文件控制定时执行/etc/cron.hourly/下面的程序</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/cron.d/0hourly
<span class="token comment"># Run the hourly jobs</span>
<span class="token assign-left variable"><span class="token environment constant">SHELL</span></span><span class="token operator">=</span>/bin/bash
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/sbin:/bin:/usr/sbin:/usr/bin
<span class="token assign-left variable">MAILTO</span><span class="token operator">=</span>root
01 * * * * root run-parts /etc/cron.hourly
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>/etc/anacrontab 文件控制定时执行/etc/cron.daily/, /etc/cron.monthly/,/etc/cron.weekly/下面的命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/anacrontab
<span class="token comment"># /etc/anacrontab: configuration file for anacron</span>

<span class="token comment"># See anacron(8) and anacrontab(5) for details.</span>

<span class="token assign-left variable"><span class="token environment constant">SHELL</span></span><span class="token operator">=</span>/bin/sh
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/sbin:/bin:/usr/sbin:/usr/bin
<span class="token assign-left variable">MAILTO</span><span class="token operator">=</span>root
<span class="token comment"># the maximal random delay added to the base delay of the jobs</span>
<span class="token assign-left variable">RANDOM_DELAY</span><span class="token operator">=</span><span class="token number">45</span>
<span class="token comment"># the jobs will be started during the following hours only</span>
<span class="token assign-left variable">START_HOURS_RANGE</span><span class="token operator">=</span><span class="token number">3</span>-22

<span class="token comment">#period in days   delay in minutes   job-identifier   command</span>
<span class="token number">1</span> <span class="token number">5</span> cron.daily    <span class="token function">nice</span> run-parts /etc/cron.daily
<span class="token number">7</span> <span class="token number">25</span>  cron.weekly   <span class="token function">nice</span> run-parts /etc/cron.weekly
@monthly <span class="token number">45</span> cron.monthly    <span class="token function">nice</span> run-parts /etc/cron.monthly
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,46),r=[l];function d(c,t){return a(),s("div",null,r)}const u=n(i,[["render",d],["__file","linux_command_crontab.html.vue"]]);export{u as default};