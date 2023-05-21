---
title: "Linux ssh 设置密钥登录"
date: "2021-10-23 11:45:19"
tag: [linux, ssh]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

有时候我们希望不用每次登录 linux 服务器都要输入密码，那么这个时候可以选择 ssh 密钥登录，就是 rsa 公钥放到服务器上，私钥放在客户端上，每次登录的时候，用密钥登录；这样更方便也更安全

- 先生成一个 rsa 密钥对

```bash
ssh-keygen -t rsa
```

默认生成的密钥文件在~/.ssh 目录下

- 检查下.ssh 目录下 authorized_keys 文件是否存在，没有的话，创建一个,然后将 id_rsa.pub 的内容追加到 authorized_keys 文件尾

```bash
cd ~/.ssh
touch authorized_keys
# 将id_rsa.pub的内容追加到authorized_keys
cat id_rsa.pub >> authorized_keys
```

修改.ssh 的权限为 700, authorized_keys 的权限为 600 或者更严格的 400，否则登录的时候会提示 server refuse you key,

```bash
cd ..
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

如果你要设置的用户不是 root,比如是 git 之类的
那么你要设置的.ssh 目录应该是 /home/git/.ssh, 并且要将.ssh 目录和 authorized_keys 文件的文件所有者改为 git

```bash
chown -R git:git .ssh
```

- 修改下 ssh 的配置 /etc/ssh/sshd_config

```bash
# RSAAuthentication yes
PubkeyAuthentication yes
# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile      .ssh/authorized_keys
```

这里有一点很重要，在你配置密钥登录成功之前，千万不要太自信将
PasswordAuthentication 设置 no，否则你密钥登录不了，然后又禁止密码登录，就悲剧了
在密钥登录设置成功之后，可以将 PasswordAuthentication 设置为 no，禁用密码登录了，比较安全

- 将私钥文件 id_rsa 拷贝到你的客户端
  如果你是要在 windows 上使用 putty 客户端登陆 linux 服务器
  那么你还需要将这个私钥稍微转换下
  打开 putty key generator 工具
  File -> Load private key, 然后点 save private key, 就转换完毕，window 下私钥一般以.ppk 后缀结尾，比如另存为 id_rsa.ppk

- putty 密钥登录
  使用 putty 登录的时候，填好服务器地址之后，在
  Connection -> Data 界面，Auto-login username 填入你的用户名
  Connection -> SSh -> Auth 界面，Private key file for authentication, browse 选择你的私钥文件 id_rsa.ppk，
  然后你可以把这些配置 save 下，以后就不用每次都配置一遍；最后点 open,
