import{_ as e,V as s,W as i,a0 as a}from"./framework-e0f7ab62.js";const l={};function t(d,n){return s(),i("div",null,[...n[0]||(n[0]=[a(`<p>有时候 Vscode 同时导入了多种项目，比如 java 和 angular，就需要对它们进行不同方式缩进设置。</p><ul><li>安装 EditorConfig 插件</li><li>在工作空间根目录新建.editorconfig 文件</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># Editor configuration, see https://editorconfig.org</span>
root = true

<span class="token punctuation">[</span>*<span class="token punctuation">]</span>
charset = utf<span class="token punctuation">-</span><span class="token number">8</span>
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
quote_type = single

<span class="token punctuation">[</span><span class="token important">*.java</span><span class="token punctuation">]</span>
indent_style = space
indent_size = 4
editor.tabSize = 4

<span class="token punctuation">[</span><span class="token important">*.md</span><span class="token punctuation">]</span>
max_line_length = off
trim_trailing_whitespace = false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)])])}const r=e(l,[["render",t],["__file","vscode_override_user_setting.html.vue"]]);export{r as default};
