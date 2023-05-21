const e=JSON.parse(`{"key":"v-d8ef0f1a","path":"/blogs/springboot/springboot_scheduled.html","title":"SpringBoot之定时任务详解","lang":"en-US","frontmatter":{"title":"SpringBoot之定时任务详解","date":"2021-10-20T23:13:59.000Z","tag":["SpringBoot"],"category":["back-end-java"],"published":true,"hideInList":false,"feature":null,"isTop":false,"description":"使用 SpringBoot 创建定时任务非常简单，目前主要有以下三种创建方式： 一、基于注解(@Scheduled); 二、基于接口（SchedulingConfigurer） 前者相信大家都很熟悉，但是实际使用中我们往往想从数据库中读取指定时间来动态执行定时任务，这时候基于接口的定时任务就派上用场了。; 三、基于注解设定多线程定时任务; 基于注解@S...","head":[["meta",{"property":"og:url","content":"https://clearlove443.github.io.v2/v2/blogs/springboot/springboot_scheduled.html"}],["meta",{"property":"og:site_name","content":"clearlove's blog"}],["meta",{"property":"og:title","content":"SpringBoot之定时任务详解"}],["meta",{"property":"og:description","content":"使用 SpringBoot 创建定时任务非常简单，目前主要有以下三种创建方式： 一、基于注解(@Scheduled); 二、基于接口（SchedulingConfigurer） 前者相信大家都很熟悉，但是实际使用中我们往往想从数据库中读取指定时间来动态执行定时任务，这时候基于接口的定时任务就派上用场了。; 三、基于注解设定多线程定时任务; 基于注解@S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-05-21T04:38:09.000Z"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:tag","content":"SpringBoot"}],["meta",{"property":"article:published_time","content":"2021-10-20T23:13:59.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-21T04:38:09.000Z"}]]},"headers":[{"level":2,"title":"创建定时器","slug":"创建定时器","link":"#创建定时器","children":[]},{"level":2,"title":"1、导入依赖包：","slug":"_1、导入依赖包","link":"#_1、导入依赖包","children":[]},{"level":2,"title":"2、添加数据库记录：","slug":"_2、添加数据库记录","link":"#_2、添加数据库记录","children":[]},{"level":2,"title":"3、创建定时器","slug":"_3、创建定时器","link":"#_3、创建定时器","children":[]},{"level":2,"title":"创建多线程定时任务","slug":"创建多线程定时任务","link":"#创建多线程定时任务","children":[]}],"git":{"createdTime":1684643889000,"updatedTime":1684643889000,"contributors":[{"name":"ClearLove443","email":"1127280933@qq.com","commits":1}]},"readingTime":{"minutes":5.33,"words":1600},"filePathRelative":"blogs/springboot/springboot_scheduled.md","localizedDate":"October 20, 2021","autoDesc":true}`);export{e as data};
