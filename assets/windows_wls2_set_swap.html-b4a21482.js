import{_ as s,V as n,W as a,a0 as l}from"./framework-e0f7ab62.js";const d={};function i(o,e){return n(),a("div",null,[...e[0]||(e[0]=[l(`<p>WSL2 默认可以使用的内存大小为主机的 80%,对于 Linux 而言即使装了桌面,一般的开发也没必要给这么多内存,分多了,反而有可能卡主机的 Windows 操作: 1.打开 Windows 资源管理器,地址栏输入 <code>%UserProfile%</code> 回车,在该目录下创建一个文件, 名字为 <code>.wslconfig</code> ,写入内容示例如下 (我电脑 8GB 内存,分给 WSL 内存 2GB,另外设置交换分区 4GB)</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">[</span>wsl2<span class="token punctuation">]</span>
memory=10GB
swap=20GB
localhostForwarding=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>cmd 执行 <code>wsl --shutdown</code> 关闭 WSL,再重新打开即可</p>`,3)])])}const t=s(d,[["render",i],["__file","windows_wls2_set_swap.html.vue"]]);export{t as default};
