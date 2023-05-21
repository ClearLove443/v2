---
title: "Linux 创建文件命令总结"
date: 2021-08-29 10:15:22
tag: [linux]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

1. vi 或 vim

```bash
[root@localhost ~]# vim file1.txt  //直接创建并打开一个文件file1.txt
```

用 vim 编辑器编辑文本后，如果是新创建的文件，默认保存在当前目录下，如果想保存到指定目录下，可以在 vim 编辑器中，按 Esc 键切换到命令模式，然后用 w 命令写到指定目录下的指定新建文件，如写到/tmp/test.txt 文件，则在 vi 命令模式下输入:w /tmp/test.txt 写好后，在/tmp 目录下新的文件 test.txt 就被创建了。

2. touch

```bash
[root@localhost ~]# touch file2.txt  //创建新的空文件file2.txt
```

touch 的另一个作用是更改一个文件或目录的时间。

3. echo

```bash
[root@localhost ~]# echo "this is a new file" > file3.txt   //创建文件file3.txt并将this is a new file写入
（说明：使用>指令覆盖文件原内容并重新输入内容，若文件不存在则创建文件。）
[root@localhost ~]# echo "add contents" >>file3.txt    //在已存在的文件补充写入新内容add contents
（说明：使用>>指令向文件追加内容，原内容将保存。）
```

拓展： Linux 中输出重定向>和>>的区别，>是覆盖，>>是追加

```
> 会重写文件，如果文件里面有内容会覆盖。
>> 追加文件。也就是如果文件里面有内容会把新内容追加到文件尾
```

4. less 、more 、cat
   三者都是将文件内容输出到标准输出，其中 less 和 more 可以分页显示，cat 是显示全部。
   三者可以根据已经存在的文件创建新的文件。假设已经存在文件 1.txt。
   cat 1.txt > 2.txt
   less 1.txt > 3.txt
   more 1.txt > 4.txt
   此时创建的文件内容都和 1.txt 中文件内容相同。

cat 命令可以一次显示整个文件，如果文件比较大，使用不是很方便；适用于文件内容少的情况。
cat 主要有三大功能：
1）一次显示整个文件:cat filename
2）从键盘创建一个文件:cat > filename 只能创建新文件,不能编辑已有文件.
3）将几个文件合并为一个文件:cat file1 file2 > file

more 命令可以让屏幕在显示满一屏幕时暂停，此时可按空格健继续显示下一个画面，或按 Q 键停止显示。

less 命令也可以分页显示文件，和 more 命令的区别就在于它支持上下键卷动屏幕，当结束浏览时，只要在 less 命令的提示符“: ”下按 Q 键即可。

5. cd

```bash
[root@localhost ~]# cd > file3.txt  //创建新的空文件file3.txt
[root@localhost ~]# cd >> file4.txt  //创建新的空文件file3.txt
```

cd 最主要的作用是切换目录，在 cd 后面跟>或>>再加上文件名就可以创建一个内容为空的文件。它和 echo 的区别之处在于 echo 可写文件内容，而 cd 并不能。
