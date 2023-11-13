import{_ as l,V as n,W as e,Y as s,Z as a}from"./framework-bdfa852d.js";const t={},m=s("p",null,"各编程语言中 Base64 编码解码的方法 (其中 String str 表示原文本，String base64 表示编码结果)",-1),r=s("p",null,[a("| 语言 | Base64 编码 | Base64 解码 | | :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------- | | JavaScript | base64 = btoa(str); // IE 10- 需要引入 base64.js 且不支持汉字 "),s("br"),a(" 或 "),s("br"),a(" // 需要引入 CryptoJS "),s("br"),a(" var s = CryptoJS.enc.Utf8.parse(str); "),s("br"),a(" base64 = CryptoJS.enc.Base64.stringify(s); | str = atob(base64); // IE 10- 需要引入 base64.js 且不支持汉字 "),s("br"),a(" 或 "),s("br"),a(" // 需要引入 CryptoJS"),s("br"),a(" var s = CryptoJS.enc.Base64.parse(base64); "),s("br"),a(" str = s.toString(CryptoJS.enc.Utf8); | | Linux Shell "),s("br"),a("(以 test 为例) | "),s("code",null,"// dGVzdAo="),a(),s("br"),s("code",null,"$ echo test | base64"),a(" | "),s("code",null,"// test "),s("br"),a(),s("code",null,"$ echo dGVzdAo= | base64 -d "),a(" | | Java | base64 = new BASE64Encoder()"),s("br"),a(".encode(str.getBytes()); | str = new String(new BASE64Decoder()"),s("br"),a(" .decodeBuffer(base64)); | | Python | import base64 "),s("br"),a(" base64 = base64.b64encode(str) | import base64 str = base64.b64decode(base64) | | PHP | "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"b"),s("mi",null,"a"),s("mi",null,"s"),s("mi",null,"e"),s("mn",null,"64"),s("mo",null,"="),s("mi",null,"b"),s("mi",null,"a"),s("mi",null,"s"),s("mi",null,"e"),s("mn",null,"6"),s("msub",null,[s("mn",null,"4"),s("mi",null,"e")]),s("mi",null,"n"),s("mi",null,"c"),s("mi",null,"o"),s("mi",null,"d"),s("mi",null,"e"),s("mo",{stretchy:"false"},"(")]),s("annotation",{encoding:"application/x-tex"},"base64 = base64_encode(")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord mathnormal"},"ba"),s("span",{class:"mord mathnormal"},"se"),s("span",{class:"mord"},"64"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"ba"),s("span",{class:"mord mathnormal"},"se"),s("span",{class:"mord"},"6"),s("span",{class:"mord"},[s("span",{class:"mord"},"4"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.1514em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"e")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mord mathnormal"},"co"),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord mathnormal"},"e"),s("span",{class:"mopen"},"(")])])]),a("str); | "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"s"),s("mi",null,"t"),s("mi",null,"r"),s("mo",null,"="),s("mi",null,"b"),s("mi",null,"a"),s("mi",null,"s"),s("mi",null,"e"),s("mn",null,"6"),s("msub",null,[s("mn",null,"4"),s("mi",null,"d")]),s("mi",null,"e"),s("mi",null,"c"),s("mi",null,"o"),s("mi",null,"d"),s("mi",null,"e"),s("mo",{stretchy:"false"},"(")]),s("annotation",{encoding:"application/x-tex"},"str = base64_decode(")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6151em"}}),s("span",{class:"mord mathnormal"},"s"),s("span",{class:"mord mathnormal"},"t"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"r"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"ba"),s("span",{class:"mord mathnormal"},"se"),s("span",{class:"mord"},"6"),s("span",{class:"mord"},[s("span",{class:"mord"},"4"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3361em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"d")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"eco"),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord mathnormal"},"e"),s("span",{class:"mopen"},"(")])])]),a("base64); | | C#/.NET | byte[] bytes = System.Text.Encoding.UTF8.GetBytes(str);"),s("br"),a("base64 = System.Convert.ToBase64String(bytes); | byte[] bytes = System.Convert"),s("br"),a(" .FromBase64String(base64); "),s("br"),a(" str = System.Text.Encoding.UTF8"),s("br"),a(".GetString(bytes); | | Perl | use MIME::Base64; "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"b"),s("mi",null,"a"),s("mi",null,"s"),s("mi",null,"e"),s("mn",null,"64"),s("mo",null,"="),s("mi",null,"e"),s("mi",null,"n"),s("mi",null,"c"),s("mi",null,"o"),s("mi",null,"d"),s("msub",null,[s("mi",null,"e"),s("mi",null,"b")]),s("mi",null,"a"),s("mi",null,"s"),s("mi",null,"e"),s("mn",null,"64"),s("mo",{stretchy:"false"},"(")]),s("annotation",{encoding:"application/x-tex"},"base64 = encode_base64(")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6944em"}}),s("span",{class:"mord mathnormal"},"ba"),s("span",{class:"mord mathnormal"},"se"),s("span",{class:"mord"},"64"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"e"),s("span",{class:"mord mathnormal"},"n"),s("span",{class:"mord mathnormal"},"co"),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"e"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3361em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"b")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"a"),s("span",{class:"mord mathnormal"},"se"),s("span",{class:"mord"},"64"),s("span",{class:"mopen"},"(")])])]),a("str); | use MIME::Base64; "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("mi",null,"s"),s("mi",null,"t"),s("mi",null,"r"),s("mo",null,"="),s("mi",null,"d"),s("mi",null,"e"),s("mi",null,"c"),s("mi",null,"o"),s("mi",null,"d"),s("msub",null,[s("mi",null,"e"),s("mi",null,"b")]),s("mi",null,"a"),s("mi",null,"s"),s("mi",null,"e"),s("mn",null,"64"),s("mo",{stretchy:"false"},"(")]),s("annotation",{encoding:"application/x-tex"},"str = decode_base64(")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6151em"}}),s("span",{class:"mord mathnormal"},"s"),s("span",{class:"mord mathnormal"},"t"),s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"r"),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord mathnormal"},"eco"),s("span",{class:"mord mathnormal"},"d"),s("span",{class:"mord"},[s("span",{class:"mord mathnormal"},"e"),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3361em"}},[s("span",{style:{top:"-2.55em","margin-left":"0em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mathnormal mtight"},"b")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mord mathnormal"},"a"),s("span",{class:"mord mathnormal"},"se"),s("span",{class:"mord"},"64"),s("span",{class:"mopen"},"(")])])]),a('base64); | | Golang | import b64 "encoding/base64" '),s("br"),a(" ... "),s("br"),a(" base64 := b64.StdEncoding"),s("br"),a('.EncodeToString([]byte(str)) | import b64 "encoding/base64" '),s("br"),a(" ... "),s("br"),a(" str := b64.StdEncoding"),s("br"),a('.DecodeString(base64) | | Ruby | require "base64" base64 = Base64.encode64(str) | require "base64" str = Base64.decode64(base64) | | MySQL/MariaDB | // 参数也可以是一个字段 '),s("br"),a(" SELECT TO_BASE64(str); | // 参数也可以是一个字段 "),s("br"),a(" SELECT FROM_BASE64(base64); | | PostgreSQL | SELECT encode(str, 'base64'); | SELECT decode(base64, 'base64'); |")],-1),i=[m,r];function c(o,p){return n(),e("div",null,i)}const d=l(t,[["render",c],["__file","base64_encoding_decoding.html.vue"]]);export{d as default};