import{_ as i,V as n,W as d,a0 as s}from"./framework-7c77a285.js";const a={};function l(t,e){return n(),d("div",null,e[0]||(e[0]=[s(`<h2 id="_1、横向流程图源码格式" tabindex="-1"><a class="header-anchor" href="#_1、横向流程图源码格式" aria-hidden="true">#</a> 1、横向流程图源码格式：</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`\`\`mermaid
graph LR
A[方形] --&gt;B(圆角)
    B --&gt; C{条件a}
    C --&gt;|a=1| D[结果1]
    C --&gt;|a=2| E[结果2]
    F[横向流程图]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、竖向流程图源码格式" tabindex="-1"><a class="header-anchor" href="#_2、竖向流程图源码格式" aria-hidden="true">#</a> 2、竖向流程图源码格式：</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`\`\`mermaid
graph TD
A[方形] --&gt; B(圆角)
    B --&gt; C{条件a}
    C --&gt; |a=1| D[结果1]
    C --&gt; |a=2| E[结果2]
    F[竖向流程图]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、标准流程图源码格式" tabindex="-1"><a class="header-anchor" href="#_3、标准流程图源码格式" aria-hidden="true">#</a> 3、标准流程图源码格式：</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`\`\`flow
st=&gt;start: 开始框
op=&gt;operation: 处理框
cond=&gt;condition: 判断框(是或否?)
sub1=&gt;subroutine: 子流程
io=&gt;inputoutput: 输入输出框
e=&gt;end: 结束框
st-&gt;op-&gt;cond
cond(yes)-&gt;io-&gt;e
cond(no)-&gt;sub1(right)-&gt;op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、标准流程图源码格式-横向" tabindex="-1"><a class="header-anchor" href="#_4、标准流程图源码格式-横向" aria-hidden="true">#</a> 4、标准流程图源码格式（横向）：</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`\`\`flow
st=&gt;start: 开始框
op=&gt;operation: 处理框
cond=&gt;condition: 判断框(是或否?)
sub1=&gt;subroutine: 子流程
io=&gt;inputoutput: 输入输出框
e=&gt;end: 结束框
st(right)-&gt;op(right)-&gt;cond
cond(yes)-&gt;io(bottom)-&gt;e
cond(no)-&gt;sub1(right)-&gt;op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、uml-时序图源码样例" tabindex="-1"><a class="header-anchor" href="#_5、uml-时序图源码样例" aria-hidden="true">#</a> 5、UML 时序图源码样例：</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`\`\`sequence
对象A-&gt;对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B--&gt;对象A: 我很好(响应)
对象A-&gt;对象B: 你真的好吗？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6、uml-时序图源码复杂样例" tabindex="-1"><a class="header-anchor" href="#_6、uml-时序图源码复杂样例" aria-hidden="true">#</a> 6、UML 时序图源码复杂样例：</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`\`\`sequence
Title: 标题：复杂使用
对象A-&gt;对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B--&gt;对象A: 我很好(响应)
对象B-&gt;小三: 你好吗
小三--&gt;&gt;对象A: 对象B找我了
对象A-&gt;对象B: 你真的好吗？
Note over 小三,对象B: 我们是朋友
participant C
Note right of C: 没人陪我玩
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7、uml-标准时序图样例" tabindex="-1"><a class="header-anchor" href="#_7、uml-标准时序图样例" aria-hidden="true">#</a> 7、UML 标准时序图样例：</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`\`\`mermaid
%% 时序图例子,-&gt; 直线，--&gt;虚线，-&gt;&gt;实线箭头
  sequenceDiagram
    participant 张三
    participant 李四
    张三-&gt;王五: 王五你好吗？
    loop 健康检查
        王五-&gt;王五: 与疾病战斗
    end
    Note right of 王五: 合理 食物 &lt;br/&gt;看医生...
    李四--&gt;&gt;张三: 很好!
    王五-&gt;李四: 你怎么样?
    李四--&gt;王五: 很好!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8、甘特图样例" tabindex="-1"><a class="header-anchor" href="#_8、甘特图样例" aria-hidden="true">#</a> 8、甘特图样例：</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`\`\`mermaid
        gantt
        dateFormat  YYYY-MM-DD
        title 软件开发甘特图
        section 设计
        需求                      :done,    des1, 2014-01-06,2014-01-08
        原型                      :active,  des2, 2014-01-09, 3d
        UI设计                     :         des3, after des2, 5d
    未来任务                     :         des4, after des3, 5d
        section 开发
        学习准备理解需求                      :crit, done, 2014-01-06,24h
        设计框架                             :crit, done, after des2, 2d
        开发                                 :crit, active, 3d
        未来任务                              :crit, 5d
        耍                                   :2d
        section 测试
        功能测试                              :active, a1, after des3, 3d
        压力测试                               :after a1  , 20h
        测试报告                               : 48h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16)]))}const v=i(a,[["render",l],["__file","markdown-liu-cheng-tu.html.vue"]]);export{v as default};
