---
title: conda init doesn't work in bash on Windows
date: 2022-02-19 19:36:52
tag: [conda]
category: python
published: true
hideInList: true
feature:
isTop: false
---

- conda init creates a .bash_profile file with the correct initialisation, but git-bash.exe loads .bashrc (thanks to Auss' comment)
- My bash home directory was not equal to my windows home directory. Conda created `C:\Users\<username>\.bash_profile` and bash needs `~/.bashrc`, but ~/ was not equal to `C:\Users\<username>\`.

solution was to run next command in git terminal or VS Code

```bash
conda init bash
cat ~/.bash_profile >> ~/.bashrc
source ~/.bashrc
conda activate base
```
