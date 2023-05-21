---
title: "Vscode 给不同文件定义不同缩进"
date: "2021-10-31 13:48:25"
tag: [vscode]
category: setting
published: true
hideInList: false
feature:
isTop: false
---

有时候 Vscode 同时导入了多种项目，比如 java 和 angular，就需要对它们进行不同方式缩进设置。

- 安装 EditorConfig 插件
- 在工作空间根目录新建.editorconfig 文件

```yaml
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
quote_type = single

[*.java]
indent_style = space
indent_size = 4
editor.tabSize = 4

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```
