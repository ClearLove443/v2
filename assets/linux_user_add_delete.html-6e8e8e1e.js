import{_ as a,V as s,W as e,a0 as n}from"./framework-a97d3b5d.js";const i={},d=n(`<h2 id="添加用户" tabindex="-1"><a class="header-anchor" href="#添加用户" aria-hidden="true">#</a> 添加用户</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> adduser username

<span class="token function">sudo</span> <span class="token function">cat</span> /etc/shadow

tom:<span class="token variable">$6</span><span class="token variable">$iXDRKGEq</span><span class="token variable">$3FdFbXuwnPk7lSozGCsIws3q</span>/o3HhYYpdiKqt6cQ3yGMIQxMLO93KXRAgD5uJJaCQhvZOiuEwkh6ti8I3AYL50:17599:0:99999:7:::
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加用户到-sudo-用户组" tabindex="-1"><a class="header-anchor" href="#添加用户到-sudo-用户组" aria-hidden="true">#</a> 添加用户到 sudo 用户组</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">usermod</span> <span class="token parameter variable">-aG</span> <span class="token function">sudo</span> username
<span class="token function">usermod</span> <span class="token parameter variable">-aG</span> <span class="token function">docker</span> ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置sudo不要密码" tabindex="-1"><a class="header-anchor" href="#配置sudo不要密码" aria-hidden="true">#</a> 配置sudo不要密码</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># %sudo 代表group 指定具体的用户，去掉%</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/sudoers
%sudo   <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL:ALL<span class="token punctuation">)</span> NOPASSWD:ALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除用户" tabindex="-1"><a class="header-anchor" href="#删除用户" aria-hidden="true">#</a> 删除用户</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">userdel</span> username

参数：
  <span class="token parameter variable">-r</span>  remove home directory and mail spool
  <span class="token parameter variable">-f</span>  force removal of files, even <span class="token keyword">if</span> not owned by user
  <span class="token parameter variable">-z</span>  remove any SELinux user mapping <span class="token keyword">for</span> the user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),l=[d];function r(o,c){return s(),e("div",null,l)}const u=a(i,[["render",r],["__file","linux_user_add_delete.html.vue"]]);export{u as default};
