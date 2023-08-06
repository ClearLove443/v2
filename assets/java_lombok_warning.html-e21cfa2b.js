const t=JSON.parse(`{"key":"v-6a6902fe","path":"/blogs/java/java_lombok_warning.html","title":"lombok注解@Data使用在继承类上时出现警告","lang":"en-US","frontmatter":{"title":"lombok注解@Data使用在继承类上时出现警告","date":"2021-10-09 23:11:55","tag":["lombok"],"category":["back-end-java"],"published":true,"hideInList":false,"feature":null,"isTop":false,"description":"ombok 为我们提供了@Data 注解，帮助我们省略了@Setter,@Getter,@ToString 等注解，一般对于普通的实体类使用该注解，不会出现什么问题，但是当我们把这个注解，使用在派生类上，就出现了一个小问题。 Data 注解的地方会出现警告： 意思是默认子类的 equals 和 hashCode 方法，不会包含或者考虑基类的属性。我们可...","head":[["meta",{"property":"og:url","content":"https://clearlove443.github.io.v2/v2/blogs/java/java_lombok_warning.html"}],["meta",{"property":"og:site_name","content":"clearlove's blog"}],["meta",{"property":"og:title","content":"lombok注解@Data使用在继承类上时出现警告"}],["meta",{"property":"og:description","content":"ombok 为我们提供了@Data 注解，帮助我们省略了@Setter,@Getter,@ToString 等注解，一般对于普通的实体类使用该注解，不会出现什么问题，但是当我们把这个注解，使用在派生类上，就出现了一个小问题。 Data 注解的地方会出现警告： 意思是默认子类的 equals 和 hashCode 方法，不会包含或者考虑基类的属性。我们可..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-05-21T04:38:09.000Z"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:tag","content":"lombok"}],["meta",{"property":"article:published_time","content":"2021-10-09T23:11:55.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-21T04:38:09.000Z"}]]},"headers":[],"git":{"createdTime":1684643889000,"updatedTime":1684643889000,"contributors":[{"name":"ClearLove443","email":"1127280933@qq.com","commits":1}]},"readingTime":{"minutes":1.45,"words":435},"filePathRelative":"blogs/java/java_lombok_warning.md","localizedDate":"October 9, 2021","autoDesc":true}`);export{t as data};