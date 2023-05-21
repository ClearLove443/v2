const t=JSON.parse(`{"key":"v-6adeb960","path":"/blogs/linux/linux_forgot_root_password.html","title":"linux 忘记root密码怎么办","lang":"en-US","frontmatter":{"title":"linux 忘记root密码怎么办","date":"2022-01-16T12:00:35.000Z","tag":["linux"],"category":["linux"],"published":true,"hideInList":false,"feature":null,"isTop":false,"description":"linux账户保存在/etc/passwd，密码保存在/etc/shadow文件中。前者无需超级用户权限即可阅读。 通过man 5 passwd，man 5 shadow可查看文件中各字段含义。 如果你只有 root 用户，而忘记了密码，那没办法，即使暴力破解或者字典破解，由于你不知道加密算法中使用的 salt，是破解不了的。 但是如果你的某个用户拥有...","head":[["meta",{"property":"og:url","content":"https://clearlove443.github.io.v2/push_blog_v2/blogs/linux/linux_forgot_root_password.html"}],["meta",{"property":"og:site_name","content":"clearlove's blog"}],["meta",{"property":"og:title","content":"linux 忘记root密码怎么办"}],["meta",{"property":"og:description","content":"linux账户保存在/etc/passwd，密码保存在/etc/shadow文件中。前者无需超级用户权限即可阅读。 通过man 5 passwd，man 5 shadow可查看文件中各字段含义。 如果你只有 root 用户，而忘记了密码，那没办法，即使暴力破解或者字典破解，由于你不知道加密算法中使用的 salt，是破解不了的。 但是如果你的某个用户拥有..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-05-21T04:38:09.000Z"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:tag","content":"linux"}],["meta",{"property":"article:published_time","content":"2022-01-16T12:00:35.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-21T04:38:09.000Z"}]]},"headers":[{"level":2,"title":"什么是加密函数","slug":"什么是加密函数","link":"#什么是加密函数","children":[]},{"level":2,"title":"什么是 salt？","slug":"什么是-salt","link":"#什么是-salt","children":[]},{"level":2,"title":"如何修改密码？","slug":"如何修改密码","link":"#如何修改密码","children":[{"level":3,"title":"添加用户","slug":"添加用户","link":"#添加用户","children":[]},{"level":3,"title":"添加用户到 sudo 用户组","slug":"添加用户到-sudo-用户组","link":"#添加用户到-sudo-用户组","children":[]},{"level":3,"title":"删除用户","slug":"删除用户","link":"#删除用户","children":[]}]}],"git":{"createdTime":1684643889000,"updatedTime":1684643889000,"contributors":[{"name":"ClearLove443","email":"1127280933@qq.com","commits":1}]},"readingTime":{"minutes":4.12,"words":1235},"filePathRelative":"blogs/linux/linux_forgot_root_password.md","localizedDate":"January 16, 2022","autoDesc":true}`);export{t as data};
