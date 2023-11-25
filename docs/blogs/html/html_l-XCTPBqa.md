---
title: 'HTML、CSS知识点总结'
date: 2021-05-16 09:02:55
tag: [html,css]
category: front-end-css
published: true
hideInList: false
feature: 
isTop: false
---
# html+css基础

## Html和CSS的关系

学习web前端开发基础技术需要掌握：HTML、CSS、JavaScript语言。下面我们就来了解下这三门技术都是用来实现什么的：

1. HTML是网页内容的载体。内容就是网页制作者放在页面上想要让用户浏览的信息，可以包含文字、图片、视频等。

2. CSS样式是表现。就像网页的外衣。比如，标题字体、颜色变化，或为标题加入背景图片、边框等。所有这些用来改变内容外观的东西称之为表现。

3. JavaScript是用来实现网页上的特效效果。如：鼠标滑过弹出下拉菜单。或鼠标滑过表格的背景颜色改变。还有焦点新闻（新闻图片）的轮换。可以这么理解，有动画的，有交互的一般都是用JavaScript来实现的。

## 标签大小写

1. HTML标签不区分大小写，`<h1>和<H1>`是一样的，但建议小写，因为大部分程序员都以小写为准。

## 固定的结构

一个HTML文件是有自己固定的结构的。

```html
<html>
    <head>...</head>
    <body>...</body>
</html>
```

代码讲解：

1. `<html></html>`称为根标签，所有的网页标签都在`<html>`...`</html>`中。
2. `<head>` 标签用于定义文档的头部，它是所有头部元素的容器。头部元素有`<title>、<script>、 <style>、<link>、 <meta>`等标签，头部标签在下一小节中会有详细介绍。
3. 在`<body>`和`</body>`标签之间的内容是网页的主要内容，如`<h1>、<p>、<a>、<img>`等网页内容标签，在这里的标签中的内容会在浏览器中显示出来。

## head 部分

1. 下面这些标签可用在 head 部分：

```html
<head>
    <title>...</title>
    <meta>
    <link>
    <style>...</style>
    <script>...</script>
</head>
```

2. 代码注释不仅方便程序员自己回忆起以前代码的用途，还可以帮助其他程序员很快的读懂你的程序的功能，方便多人合作开发网页代码。

语法：

<!--注释文字 -->

3. CSS注释代码

就像在Html的注释一样，在CSS中也有注释语句：用/*注释语句*/来标明（Html中使用<!--注释语句-->)

## 语义化

1. 语义化：说的通俗点就是：明白每个标签的用途（在什么情况下我可以使用这个标签才合理）比如，网页上的文章的标题就得用标题标签，网页上的各个栏目的栏目名称也可以使用标题标签。

2. 语义化的作用

* 更容易被搜索引擎收录。

* 更容易让屏幕阅读器读出网页内容。

# 认识标签（第一部分）

## `<p>`

如果想在网页上显示文章，这时就需要`<p>`标签了，把文章的段落放到`<p>`标签中。

语法：

```html
<p>段落文本</p>
```

## `<hx>`

标题标签一共有6个，h1、h2、h3、h4、h5、h6分别为一级标题、二级标题、三级标题、四级标题、五级标题、六级标题。并且依据重要性递减。`<h1>`是最高的等级。

语法：

```html
<hx>标题文本</hx>(x为1-6)
```

文章的标题前面已经说过了，可以使用标题标签，另外网页上的各个栏目的标题也可使用它们

## `<strong>/<em>`

有了段落又有了标题，现在如果想在一段话中特别强调某几个文字，这时候就可以用到`<em>`或`<strong>`标签。

但两者在强调的语气上有区别:`<em>` 表示强调，`<strong>` 表示更强烈的强调。并且在浏览器中`<em>` 默认用斜体表示，`<strong>` 用粗体表示。两个标签相比，目前国内前端程序员更喜欢使用`<strong>`表示强调

## `<em>、<strong>、<span>`的区别

1. `<em>`和`<strong>`标签是为了强调一段话中的关键字时使用，它们的语义是强调。

2. `<span>`标签是没有语义的，它的作用就是为了设置单独的样式用的，把一段话圈起来，然后用css设置样式。

## `<q>/<blockquote>`

### q标签，短文本引用

比如在你的网页的文章里想引用某个作家的一句诗，这样会使你的文章更加出彩，那么`<q>`标签是你所需要的。
语法：

```html
<q>引用文本</q>
```

1. 注意要引用的文本不用加双引号，浏览器会对q标签自动添加双引号。

2. 注意这里用`<q>`标签的真正关键点不是它的默认样式双引号（如果这样我们不如自己在键盘上输入双引号就行了），而是它的语义：引用别人的话

### blockquote标签，长文本引用

`<blockquote>`的作用也是引用别人的文本。但它是对长文本的引用

`<q>`标签是对简短文本的引用，比如说引用一句话就用到`<q>`标签。

语法:

```html
<blockquote>引用文本</blockquote>
```

浏览器对`<blockquote>`标签的解析是缩进样式

## `<br/>`

换行标签`<br/>`
`<br/>`标签作用相当于word文档中的回车。只有一个开始标签，没有结束标签。

## `<hr/>`

分割线标签`<hr/>`
`<hr/>`标签的在浏览器中的默认样式线条比较粗，颜色为灰色

## `&nbsp;`

html特殊字符

空格：`&nbsp;`(;分号必不可少)

## `<address>`

address标签，为网页加入地址信息

语法：

```html
<address>地址信息</address>
```

如：

`<address>`北京市西城区德外大街10号`</address>`

在浏览器上显示的样式为斜体，如果不喜欢斜体，当然可以，可以在后面的课程中使用css样式来修改它`<address>`标签的默认样式

## `<code>`

在介绍语言技术的网站中，必免不了在网页中显示一些计算机专业的编程代码，当代码为一行代码时，你就可以使用`<code>`标签了，如下面例子：

```html
<code>var i=i+300;</code>
```

语法：

```html
<code>代码语言</code>
```

注意：在文章中一般如果要插入多行代码时不能使用`<code>`标签，如果是多行代码，可以使用`<pre>`标签。

`<pre>` 标签的主要作用:预格式化的文本。被包围在 pre 元素中的文本通常会保留空格和换行符。如果用以前的方法，回车需要输入`<br>`签，空格需要输入`&nbsp;`。

注意：`<pre>`标签不只是为显示计算机的源代码时用的，在你需要在网页中预显示格式时都可以使用它，只是`<pre>`标签的一个常见应用就是用来展示计算机的源代码。

# 认识标签（第二部分）

## 无序列表

ul-li是没有前后顺序的信息列表。

语法：

```html
<ul>
    <li>信息</li>
    <li>信息</li>
    ......
</ul>
```

举例：

```html
<ul>
    <li>精彩少年</li>
    <li>美丽突然出现</li>
    <li>触动心灵的旋律</li>
</ul>
```

ul-li在网页中显示的默认样式一般为：每项li前都自带一个圆点

## 有序列表

语法：

```html
<ol>
    <li>信息</li>
    <li>信息</li>
    ......
</ol>
```

举例：

下面是一个热点课程下载排行榜：

```html
<ol>
    <li>前端开发面试心法 </li>
    <li>零基础学习html</li>
    <li>JavaScript全攻略</li>
</ol>
```

`<ol>`在网页中显示的默认样式一般为：每项`<li>`前都自带一个序号，序号默认从1开始

## `<div>`容器标签

在网页制作过程过中，可以把一些独立的逻辑部分划分出来，放在一个`<div>`标签中，这个`<div>`标签的作用就相当于一个容器。

语法：

```html
<div>…</div>
```

确定逻辑部分：

什么是逻辑部分？它是页面上相互关联的一组元素。如网页中的独立的栏目版块，就是一个典型的逻辑部分。如下图所示：图中用红色边框标出的部分就是一个逻辑部分，就可以使用`<div>`标签作为容器

注释：`<div>` 是一个块级元素，也就是说，浏览器通常会在 div 元素前后放置一个换行符。

## 创建表格

创建表格的五个元素：

table、tbody、tr、th、td

1. `<table>…</table>`：整个表格以`<table>`标记开始、`</table>`标记结束。

2. `<tbody>…</tbody>`：当表格内容非常多时，表格会下载一点显示一点，但如果加上`<tbody>`标签后，这个表格就要等表格内容全部下载完才会显示。如右侧代码编辑器中的代码。（这个标签基本上不怎么用了）

3. `<tr>…</tr>`：表格的一行，所以有几对tr 表格就有几行。

4. `<td>…</td>`：表格的一个单元格，一行中包含几对`<td>...<td/>`，说明一行中就有几列。

5. `<th>…</th>`：表格的头部的一个单元格，表格表头。

6. 表格中列的个数，取决于一行中数据单元格的个数。

表格还是需要添加一些标签进行优化，可以添加标题和摘要

`<table summary="本表格记录2012年到2013年库存记录，记录包括U盘和耳机库存量">`

`<caption>2012年到2013年库存记录</caption>`

## 超链接

使用`<a>`标签，链接到别一个页面

使用`<a>`标签可实现超链接，它在网页制作中可以说是无处不在，只要有链接的地方，就会有这个标签。

语法：

```html
<a href = "目标网址">链接显示的文本</a>
```

例如：

```html
<a href = "http://www.imooc.com">click here!</a>
```

上面例子作用是单击click here!文字，网页链接到[慕课网](http://www.imooc.com)这个网页。

## 网页插入图片

认识`<img>`标签，为网页插入图片

在网页的制作中为使网页炫丽美观，肯定是缺少不了图片，可以使用`<img>`标签来插入图片。

语法：

```html
<img src="图片地址" alt="下载失败时的替换文本" title = "提示文本">
```

举例：

```html
<img src = "myimage.gif" alt = "My Image" title = "My Image" />
```

讲解：

1. src：标识图像的位置；

2. alt：指定图像的描述性文本，当图像不可见时（下载不成功时），可看到该属性指定的文本；

3. title：提供在图像可见时对图像的描述(鼠标滑过图片时显示的文本)；

4. 图像可以是GIF，PNG，JPEG格式的图像文件。

# 表单标签（与用户进行交互）

## `<form>`

表单是可以把浏览者输入的数据传送到服务器端，这样服务器端程序就可以处理表单传过来的数据。

语法：

```html
<form method="传送方式" action="服务器文件">
```

讲解：

1. `<form>` ：`<form>`标签是成对出现的，以`<form>`开始，以`</form>`结束。

2. action ：浏览者输入的数据被传送到的地方,比如一个PHP页面(save.php)。

3. method ： 数据传送的方式（get/post）。

## `<input>`

`<input>`输入框

文本输入框、密码输入框

当用户要在表单中键入字母、数字等内容时，就会用到文本输入框。文本框也可以转化为密码输入框。

语法：

```html
<form>
    <input type="text/password" name="名称" value="文本" />
</form>
```

1. type：

当type="text"时，输入框为文本输入框;

当type="password"时, 输入框为密码输入框。

2. name：为文本框命名，以备后台程序ASP 、PHP使用。

3. value：为文本输入框设置默认值。(一般起到提示作用)

## `<textarea>`

文本域，支持多行文本输入

当用户需要在表单中输入大段文字时，需要用到文本输入域。

语法：

```html
<textarea rows="行数" cols="列数">文本</textarea>
```

1. `<textarea>`标签是成对出现的，以`<textarea>`开始，以`</textarea>`结束。

2. cols ：多行输入域的列数。

3. rows ：多行输入域的行数。

## 单选框，复选框

单选框，复选框

语法：

```html
<input type="radio/checkbox" value="值" name="名称" checked="checked"/>
```

1. type:

     当type="radio"时，控件为单选框

    当type="checkbox"时，控件为复选框

2. value：提交数据到服务器的值（后台程序PHP使用）

3. name：为控件命名，以备后台程序ASP、PHP使用

4. checked：当设置checked="checked"时，该选项被默认选中

注意：同一组的单选按钮，name取值一定要一致，这样同一组的单选按钮才可以起到单选的作用。

## `<select>`

下拉列表框，节省空间

下拉列表在网页中也常会用到，它可以有效的节省网页空间。既可以单选、又可以多选。

语法：

```html
<option value="提交值">选项</option>
```

提交值是向服务器提交的值，选项是显示的值。

```html
<form action="save.php" method="post" >
    <label>爱好:</label>
    <select>
        <option value="看书">看书</option>
        <option value="旅游" selected="selected">旅游</option>
        <option value="运动">运动</option>
        <option value="购物">购物</option>
    </select>
</form>
```

## 下拉列表框进行多选

使用下拉列表框进行多选

下拉列表也可以进行多选操作，在`<select>`标签中设置`multiple="multiple"`属性，

就可以实现多选功能，进行多选时按下Ctrl键同时进行单击，可以选择多个选项。

如下代码：

```html
<form action="save.php" method="post" >
    <label>爱好:</label>
    <select multiple="multiple">
        <option value="看书">看书</option>
        <option value="旅游">旅游</option>
        <option value="运动">运动</option>
        <option value="购物">购物</option>
    </select>
</form>
```

## 提交按钮

提交按钮：当用户需要提交表单信息到服务器时，需要用到提交按钮。

语法：

```html
<input type="submit" value="提交">
```

1. type：只有当type值设置为submit时，按钮才有提交作用

2. value：按钮上显示的文字

## 重置按钮

重置按钮，重置表单信息

当用户需要重置表单信息到初始时的状态时，比如用户输入“用户名”后，发现书写有误，可以使用重置按钮使输入框恢复到初始状态。只需要把type设置为"reset"就可以。

语法：

```html
<input type="reset" value="重置">
```

1. type：只有当type值设置为reset时，按钮才有重置作用

2. value：按钮上显示的文字

# css样式

## 认识css样式

CSS全称为“层叠样式表 (Cascading Style Sheets)”，它主要是用于定义HTML内容在浏览器内的显示样式，如文字大小、颜色、字体加粗等。

如下列代码：

```css
p{
    font-size:12px;
    color:red;
    font-weight:bold;
}
```

使用CSS样式的一个好处是通过定义某个样式，可以让不同网页位置的文字有着统一的字体、字号或者颜色等。

## CSS代码语法

css 样式由选择符和声明组成，而声明又由属性和值组成

选择符{属性:值}

```css
p{color:red;}
```

选择符：又称选择器，指明网页中要应用样式规则的元素，如本例中是网页中所有的段（p）的文字将变成蓝色，而其他的元素（如ol）不会受到影响。

声明：在英文大括号“｛｝”中的的就是声明，属性和值之间用英文冒号“：”分隔。当有多条声明时，中间可以英文分号“;”分隔，如下所示：

```css
p{font-size:12px;color:red;}
```

## 插入形式

从CSS 样式代码插入的形式来看基本可以分为以下3种：

内联式、嵌入式和外部式三种

1. 内联式css样式

就是把css代码直接写在现有的HTML标签中，如下面代码：

```css
<p style="color:red">这里文字是红色。</p>
```

css样式代码要写在style=""双引号中，如果有多条css样式代码设置可以写在一起，中间用分号隔开。如下代码：

```css
<p style="color:red;font-size:12px">这里文字是红色。</p>
```

2. 嵌入式css样式，

就是可以把css样式代码写在`<style type="text/css"></style>`标签之间。如下面代码实现把三个`<span>`标签中的文字设置为红色：

```css
<style type="text/css">
span{
    color:red;
}
</style>
```

嵌入式css样式必须写在`<style></style>`之间，并且一般情况下嵌入式css样式写在`<head></head>`之间。

3. 外部式css样式

写在单独的一个文件中

外部式css样式(也可称为外联式)就是把css代码写一个单独的外部文件中，这个css样式文件以“.css”为扩展名，在`<head>`内（不是在`<style>`标签内）使用`<link>`标签将css样式文件链接到HTML文件内，如下面代码：

```html
<link href="base.css" rel="stylesheet" type="text/css" />
```

**注意：**

1. css样式文件名称以有意义的英文字母命名，如 main.css。

2. `rel="stylesheet" type="text/css"` 是固定写法不可修改。

3. `<link>`标签位置一般写在`<head>`标签之内。

# CSS选择器

每一条css样式定义由两部分组成，形式如下：

选择器{

样式;

}

在{}之前的部分就是“选择器”，“选择器”指明了{}中的“样式”的作用对象，也就是“样式”作用于网页中的哪些元素

## 标签选择器

标签选择器其实就是html代码中的标签。如右侧代码编辑器中的`<html>、<body>、<h1>、<p>、<img>`。例如下面代码：

```css
p{font-size:12px;line-height:1.6em;}
```

上面的css样式代码的作用：为p标签设置12px字号，行间距设置1.6em的样式。

## 类选择器

类选择器在css样式编码中是最常用到的，如右侧代码编辑器中的代码:可以实现为“胆小如鼠”、“勇气”字体设置为红色。

语法：

`.类选器名称{css样式代码;}`

注意：

1. 英文圆点开头

2. 其中类选器名称可以任意起名（但不要起中文噢）

使用方法：

第一步：使用合适的标签把要修饰的内容标记起来，如下：

```html
<span>胆小如鼠</span>
```

第二步：使用class="类选择器名称"为标签设置一个类，如下：

```html
<span class="stress">胆小如鼠</span>
```

第三步：设置类选器css样式，如下：

```css
.stress{color:red;}/*类前面要加入一个英文圆点*/
```

## ID选择器

在很多方面，ID选择器都类似于类选择符，但也有一些重要的区别：

1. 为标签设置id="ID名称"，而不是class="类名称"。

2. ID选择符的前面是井号（#）号，而不是英文圆点（.）。

## 类和ID选择器的区别

相同点：可以应用于任何元素

不同点：

1. ID选择器只能在文档中使用一次。与类选择器不同，在一个HTML文档中，ID选择器只能使用一次，而且仅一次。而类选择器可以使用多次。

下面代码是正确的：

```html
<p>三年级时，我还是一个<span class="stress">胆小如鼠</span>的小女孩，上课从来不敢回答老师提出的问题，生怕回答错了老师会批评我。就一直没有这个<span class="stress">勇气</span>来回答老师提出的问题。</p>
```

而下面代码是错误的：

```html
<p>三年级时，我还是一个<span id="stress">胆小如鼠</span>的小女孩，上课从来不敢回答老师提出的问题，生怕回答错了老师会批评我。就一直没有这个<span id="stress">勇气</span>来回答老师提出的问题。</p>
```

2. 可以使用类选择器词列表方法为一个元素同时设置多个样式。我们可以为一个元素同时设多个样式，但只可以用类选择器的方法实现，ID选择器是不可以的（不能使用 ID 词列表）。

下面的代码是正确的(完整代码见右侧代码编辑器)

```css
.stress{
    color:red
}
.bigsize{
    font-size:25px;
}
```

```html
<p>到了<span class="stress bigsize">三年级</span>下学期时，我们班上了一节公开课...</p>
```

上面代码的作用是为“三年级”三个文字设置文本颜色为红色并且字号为25px

下面的代码是不正确的(完整代码见右侧代码编辑器)

```css
#stressid{
    color:red;
}

#bigsizeid{
    font-size:25px;
}
```

```html
<p>到了<span id="stressid bigsizeid">三年级</span>下学期时，我们班上了一节公开课...</p>
```

上面代码不可以实现为“三年级”三个文字设置文本颜色为红色并且字号为25px的作用。

## 子选择器

还有一个比较有用的选择器子选择器，即大于符号(>),用于选择指定标签元素的子元素。如下面的代码：

```css
.food>li{border:1px solid red;}
```

这行代码会使class名为food下的子元素li加入红色实线边框。

## 包含(后代)选择器

包含选择器，即加入空格,用于选择指定标签元素下的后辈元素。如右侧代码编辑器中的代码：

```css
.first span{color:red;}
```

请注意这个选择器与子选择器的区别

1. 子选择器（child selector）仅是指它的直接后代，或者你可以理解为作用于子元素的第一代后代

2. 后代选择器是作用于所有子后代元素。后代选择器通过空格来进行选择，而子选择器是通过“>”进行选择。

总结：>作用于元素的第一代后代，空格作用于元素的所有后代。

# 通用选择器

通用选择器是功能最强大的选择器，它使用一个（*）号指定，它的作用是匹配html中任意标签元素，如下使用下面代码使用html中任意标签元素字体颜色全部设置为红色：

```css
* {color:red;}
```

## 伪类选择符

更有趣的是伪类选择符，为什么叫做伪类选择符，它允许给html不存在的标签设置样式，比如说我们给html中一个标签元素的鼠标滑过的状态来设置字体颜色：

```css
a:hover{color:red;}
```

这行代码会使被`<a></a>`标签包裹的文字内容中的“胆小如鼠”字体颜色在鼠标滑过时变为红色。

## 分组选择符

当你想为html中多个标签元素设置同一个样式时，可以使用分组选择符（，），如下代码为右侧代码编辑器中的h1、span标签同时设置字体颜色为红色：

```css
h1,span{color:red;}
```

它相当于下面两行代码：

```css
h1{color:red;}

span{color:red;}
```

# CSS的继承、层叠和特殊性

## 继承

CSS的某些样式是具有继承性的，那么什么是继承呢？继承是一种规则，它允许样式不仅应用于某个特定html标签元素，而且应用于其后代。比如下面代码：如某种颜色应用于p标签，这个颜色设置不仅应用p标签，还应用于p标签中的所有子元素文本，这里子元素为span标签。

但注意有一些css样式是不具有继承性的。如border:1px solid red;

## 权值

根据权值来判断使用哪个css样式

浏览器是根据权值来判断使用哪种css样式的，权值高的就使用哪种css样式。

下面是权值的规则：

标签的权值为1，类选择符的权值为10，ID选择符的权值最高为100。例如下面的代码：

```css
p{color:red;} /*权值为1*/

p span{color:green;} /*权值为1+1=2*/

.warning{color:white;} /*权值为10*/

p span.warning{color:purple;} /*权值为1+1+10=12*/

#footer .note p{color:yellow;} /*权值为100+10+1=111*/
```

注意：还有一个权值比较特殊--继承也有权值但很低，有的文献提出它只有0.1，所以可以理解为继承的权值最低

## 层叠

我们来思考一个问题：如果在html文件中对于同一个元素可以有多个css样式存在并且这多个css样式具有相同权重值怎么办？好，这一小节中的层叠帮你解决这个问题。

层叠就是在html文件中对于同一个元素可以有多个css样式存在，当有相同权重的样式存在时，会根据这些css样式的前后顺序来决定，处于最后面的css样式会被应用。

如下面代码:

```css
p{color:red;}

p{color:green;}

<p class="first">三年级时，我还是一个<span>胆小如鼠</span>的小女孩。</p>
```

最后 p 中的文本会设置为green，这个层叠很好理解，理解为后面的样式会覆盖前面的样式。

所以前面的css样式优先级就不难理解了：

内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。

## 重要性

重要性

我们在做网页代码的时，有些特殊的情况需要为某些样式设置具有最高权值，怎么办？这时候我们可以使用!important来解决。

如下代码：

```css
p{color:red!important;}

p{color:green;}

<p class="first">三年级时，我还是一个<span>胆小如鼠</span>的小女孩。</p>
```

这时 p 段落中的文本会显示的red红色。

注意：!important要写在分号的前面

# CSS格式化排版

## 文字排版

1. 文字排版--字体

我们可以使用css样式为网页中的文字设置字体、字号、颜色等样式属性。下面我们来看一个例子，下面代码实现：为网页中的文字设置字体为宋体。

```css
body{font-family:"宋体";}
```

这里注意不要设置不常用的字体，因为如果用户本地电脑上如果没有安装你设置的字体，就会显示浏览器默认的字体。（因为用户是否可以看到你设置的字体样式取决于用户本地电脑上是否安装你设置的字体。）

2. 文字排版--字号、颜色

可以使用下面代码设置网页中文字的字号为12像素，并把字体颜色设置为#666(灰色)：

```css
body{font-size:12px;color:#666}
```

3. 文字排版--粗体

我们还可以使用css样式来改变文字的样式：粗体、斜体、下划线、删除线，可以使用下面代码实现设置文字以粗体样式显示出来。

```css
p span{font-weight:bold;}
```

4. 文字排版--斜体

以下代码可以实现文字以斜体样式在浏览器中显示：

```css
p a{font-style:italic;}

<p>三年级时，我还是一个<a>胆小如鼠</a>的小女孩。</p>
```

5. 文字排版--下划线

有些情况下想为文字设置为下划线样式，这样可以在视觉上强调文字，可以使用下面代码来实现：

```css
p a{text-decoration:underline;}

<p>三年级时，我还是一个<a>胆小如鼠</a>的小女孩。</p>
```

删除线，在电商网站上经常见。

```css
p a{text-decoration:line-through;}
```

## 段落排版

1. 段落排版--缩进

中文文字中的段前习惯空两个文字的空白，这个特殊的样式可以用下面代码来实现：

```css
p{text-indent:2em;}
```

注意：2em的意思就是文字的2倍大小。

2. 段落排版--行间距

这一小节我们来学习一下另一个在段落排版中起重要作用的行间距属性（line-height），如下代码实现设置段落行间距为1.5倍。

```css
p{line-height:1.5em;}
```

3. 段落排版--字间距、字母间距

文字间隔、字母间隔设置：

如果想在网页排版中设置文字间隔或者字母间隔就可以使用 letter-spacing来实现，如下面代码：

```css
h1{
    letter-spacing:50px;
}

...

<h1>了不起的盖茨比</h1>
```

注意：这个样式使用在英文单词时，是设置字母与字母之间的间距。

单词间距设置：

如果我想设置英文单词之间的间距呢？可以使用word-spacing来实现。如下代码：

```css
h1{
    word-spacing:50px;
}
...
<h1>welcome to imooc!</h1>
```

# CSS盒模型

## 元素分类

在讲解CSS布局之前，我们需要提前知道一些知识，在CSS中，html中的标签元素大体被分为三种不同的类型：块状元素、内联元素和内联块状元素。

常用的块状元素有：

`<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>`

常用的内联元素有：

`<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>`

常用的内联块状元素有：

`<img>、<input>`

## 元素分类--块级元素

什么是块级元素？在html中`<div>、 <p>、<h1>、<form>、<ul>` 和 `<li>`就是块级元素。设置display:block就是将元素显示为块级元素。如下代码就是将行内元素a转换为块状元素，从页使用a元素具有块状元素特点。

```css
a{display:block;}
```

块级元素特点：

1. 每个块级元素都从新的一行开始，并且其后的元素也另起一行。（真霸道，一个块级元素独占一行）

2. 元素的高度、宽度、行高以及顶和底边距都可设置。

3. 元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。

## 元素分类--行内元素

在html中，`<span>、<a>、<label>、<input>、 <img>`、 `<strong>` 和`<em>`就是典型的行内元素（inline）元素。当然块状元素也可以通过代码display:inline将元素设置为行内元素。

行内元素特点：

1. 和其他元素都在一行上；

2. 元素的高度、宽度、行高及顶部和底部边距不可设置；

3. 元素的宽度就是它包含的文字或图片的宽度，不可改变。

## 元素分类--内联块状元素

内联块状元素（inline-block）就是同时具备内联元素、块状元素的特点，代码display:inline-block就是将元素设置为内联块状元素。(css2.1新增)，`<img>、<input>`标签就是这种内联块状标签。

inline-block元素特点：

1. 和其他元素都在一行上；

2. 元素的高度、宽度、行高以及顶和底边距都可设置。

## 盒模型--边框（一）

盒子模型的边框就是围绕着内容及补白的线，这条线你可以设置它的粗细、样式和颜色(边框三个属性)。

如下面代码为div来设置边框粗细为2px、样式为实心的、颜色为红色的边框：

```css
div{
    border:2px solid red;
}
```

上面是border代码的缩写形式，可以分开写：

```css
div{
    border-width:2px;
    border-style:solid;
    border-color:red;
}
```

**注意：**

1. border-style（边框样式）常见样式有：

dashed（虚线）| dotted（点线）| solid（实线）。

2. border-color（边框颜色）中的颜色可设置为十六进制颜色，如:

border-color:#888;//前面的井号不要忘掉。

## 盒模型--边框（二）

现在有一个问题，如果有想为p标签单独设置下边框，而其它三边都不设置边框样式怎么办呢？css样式中允许只为一个方向的边框设置样式：

```css
div{border-bottom:1px solid red;}
```

同样可以使用下面代码实现其它三边上、右、左边框的设置：

```css
border-top:1px solid red;

border-right:1px solid red;

border-left:1px solid red;
···
```

## 盒模型--边界

元素与其它元素之间的距离可以使用边界（margin）来设置。边界也是可分为上、右、下、左。如下代码：

```css
div{margin:20px 10px 15px 30px;}
```

也可以分开写：

```css
div{
    margin-top:20px;
    margin-right:10px;
    margin-bottom:15px;
    margin-left:30px;
}
```

如果上下左右的边界都为10px;可以这么写：

```css
div{ margin:10px;}
```

如果上下边界一样为10px，左右一样为20px，可以这么写：

```css
div{ margin:10px 20px;}
```

总结一下：padding和margin的区别，padding在边框里，margin在边框外。

## 盒模型--填充

元素内容与边框之间是可以设置距离的，称之为填充。填充也可分为上、右、下、左。如下代码：

```css
div{padding:20px 10px15px 30px;}
```

顺序一定不要搞混。可以分开写上面代码：

```css
div{
    padding-top:20px;
    padding-right:10px;
    padding-bottom:15px;
    padding-left:30px;
}
```

如果上、右、下、左的填充都为10px;可以这么写

```css
div{padding:10px;}
```

如果上下填充一样为10px，左右一样为20px，可以这么写：

```css
div{padding:10px 20px;}
```

## 盒模型代码简写

还记得在讲盒模型时外边距(margin)、内边距(padding)和边框(border)设置上下左右四个方向的边距是按照顺时针方向设置的：上右下左。具体应用在margin和padding的例子如下：

```css
margin:10px 15px 12px 14px;/*上设置为10px、右设置为15px、下设置为12px、左设置为14px*/
```

通常有下面三种缩写方法:

1. 如果top、right、bottom、left的值相同，如下面代码：

```css
margin:10px 10px 10px 10px;
```

可缩写为：

```css
margin:10px;
```

2. 如果top和bottom值相同、left和 right的值相同，如下面代码：

```css
margin:10px 20px 10px 20px;
```

可缩写为：

```css
margin:10px 20px;
```

3. 如果left和right的值相同，如下面代码：

```css
margin:10px 20px 30px 20px;
```

可缩写为：

```css
margin:10px 20px 30px;
```

注意：padding、border的缩写方法和margin是一致的。

## 颜色值缩写

关于颜色的css样式也是可以缩写的，当你设置的颜色是16进制的色彩值时，如果每两位的值相同，可以缩写一半。

例子1：

```css
p{color:#000000;}
```

可以缩写为：

```css
p{color: #000;}
```

例子2：

```css
p{color: #336699;}
```

可以缩写为：

```css
p{color: #369;}
```

# CSS布局模型

## css布局模型

清楚了CSS 盒模型的基本概念、 盒模型类型， 我们就可以深入探讨网页布局的基本模型了。布局模型与盒模型一样都是 CSS 最基本、 最核心的概念。 但布局模型是建立在盒模型基础之上，又不同于我们常说的 CSS 布局样式或 CSS 布局模板。如果说布局模型是本，那么 CSS 布局模板就是末了，是外在的表现形式。

CSS包含3种基本的布局模型，用英文概括为：Flow、Layer 和 Float。

在网页中，元素有三种布局模型：

1. 流动模型（Flow）

2. 浮动模型 (Float)

3. 层模型（Layer）

## 流动模型

流动（Flow）：自上而下。

先来说一说流动模型，流动（Flow）是默认的网页布局模式。也就是说网页在默认状态下的 HTML 网页元素都是根据流动模型来分布网页内容的。

流动布局模型具有2个比较典型的特征：

第一点，块状元素都会在所处的包含元素内自上而下按顺序垂直延伸分布，因为在默认状态下，块状元素的宽度都为100%。实际上，块状元素都会以行的形式占据位置。如右侧代码编辑器中三个块状元素标签(div，h1，p)宽度显示为100%。

第二点，在流动模型下，内联元素都会在所处的包含元素内从左到右水平分布显示。（内联元素可不像块状元素这么霸道独占一行）

右侧代码编辑器中内联元素标签a、span、em、strong都是内联元素。

## 浮动模型

块状元素这么霸道都是独占一行，如果现在我们想让两个块状元素并排显示，怎么办呢？不要着急，设置元素浮动就可以实现这一愿望。任何元素在默认情况下是不能浮动的，但可以用CSS定义为浮动，如div、p、table、img等元素都可以被定义为浮动。如下代码可以实现两个div元素一行显示。

```css
div{
    width:200px;
    height:200px;
    border:2px red solid;
    float:left;
}

<div id="div1"></div>

<div id="div2"></div>
```

注意：设置浮动的同时一定要先设置块状元素的宽度，且需要浮动的几个元素宽度加起来一定要小于容器元素的宽度。

## 层模型

什么是层布局模型？层布局模型就像是图像软件PhotoShop中非常流行的图层编辑功能一样，每个图层能够精确定位操作，但在网页设计领域，由于网页大小的活动性，层布局没能受到热捧。但是在网页上局部使用层布局还是有其方便之处的。下面我们来学习一下html中的层布局。

如何让html元素在网页中精确定位，就像图像软件PhotoShop中的图层一样可以对每个图层能够精确定位操作。CSS定义了一组定位（positioning）属性来支持层布局模型。

层模型有三种形式：

1. 绝对定位(position: absolute)

2. 相对定位(position: relative)

3. 固定定位(position: fixed)

### 层模型--绝对定位（相对于父类）

如果想为元素设置层模型中的绝对定位，需要设置position:absolute(表示绝对定位)，这条语句的作用将元素从文档流中拖出来，然后使用left、right、top、bottom属性相对于其最接近的一个具有定位属性的父包含块进行绝对定位。如果不存在这样的包含块，则相对于body元素，即相对于浏览器窗口。

如下面代码可以实现div元素相对于浏览器窗口向右移动100px，向下移动50px。

```css
div{
    width:200px;
    height:200px;
    border:2px red solid;
    position:absolute;
    left:100px;
    top:50px;
}

<div id="div1"></div>
```

### 层模型--相对定位（相对于以前）

如果想为元素设置层模型中的相对定位，需要设置position:relative（表示相对定位），它通过left、right、top、bottom属性确定元素在正常文档流中的偏移位置。相对定位完成的过程是首先按static(float)方式生成一个元素(并且元素像层一样浮动了起来)，然后相对于以前的位置移动，移动的方向和幅度由left、right、top、bottom属性确定，偏移前的位置保留不动。

如下代码实现相对于以前位置向下移动50px，向右移动100px;

```css
#div1{
    width:200px;
    height:200px;
    border:2px red solid;
    position:relative;
    left:100px;
    top:50px;
}

<div id="div1"></div>
```

### 层模型--固定定位（相对于网页窗口）

固定住某一坐标。

fixed：表示固定定位，与absolute定位类型类似，但它的相对移动的坐标是视图（屏幕内的网页窗口）本身。由于视图本身是固定的，它不会随浏览器窗口的滚动条滚动而变化，除非你在屏幕中移动浏览器窗口的屏幕位置，或改变浏览器窗口的显示大小，因此固定定位的元素会始终位于浏览器窗口内视图的某个位置，不会受文档流动影响，这与background-attachment:fixed?属性功能相同。以下代码可以实现相对于浏览器视图向右移动100px，向下移动50px。并且拖动滚动条时位置固定不变。

```css
#div1{
    width:200px;
    height:200px;
    border:2px red solid;
    position:fixed;
    left:100px;
    top:50px;
}
```

## Relative与Absolute组合使用

小伙伴们学习了12-6小节的相对定位的方法：使用position:absolute可以实现被设置元素相对于浏览器（body）设置定位以后，大家有没有想过可不可以相对于其它元素进行定位呢？答案是肯定的，当然可以。使用position:relative来帮忙，但是必须遵守下面规范：

1、参照定位的元素必须是相对定位元素的前辈元素：

```html
<div id="box1"><!--参照定位的元素-->

<div id="box2">相对参照元素进行定位</div><!--相对定位元素-->

</div>
```

从上面代码可以看出box1是box2的父元素（父元素当然也是前辈元素了）。

2、参照定位的元素必须加入position:relative;

```css
#box1{
    width:200px;
    height:200px;
    position:relative;
}
```

3、定位元素加入position:absolute，便可以使用top、bottom、left、right来进行偏移定位了。

```css
#box2{
    position:absolute;
    top:20px;
    left:30px;
}
```

这样box2就可以相对于父元素box1定位了（这里注意参照物就可以不是浏览器了，而可以自由设置了）。