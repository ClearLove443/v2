---
title: "Where is Gradle Cache Location"
date: "2021-11-27 13:55:43"
tag: [gradle, linux, windows]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

Gradle Cache Location or Gradle local repository is the location where Gradle maintain its cache, which includes all dependencies Gradle downloads from repositories when we build any project, for reusing in the next times we run the build again.

## Gradle Cache Location

Gradle uses `$USER_HOME/.gradle` as the default directory to store its local cache.
So, if you’re in Linux system: `~/.gradle`
If you’re in Windows, it should be: `C:\Users\[Your_Username]\.gradle`
For example,
In my Windows 10, the location is: `C:\Users\20293\.gradle`
In my Ubuntu 20.04, the location is: `/home/ubuntu/.gradle`

## Change Gradle Cache Location

We can change the Gradle Cache Location to some other directory by setting the environment variable `GRADLE_USER_HOME`
For example,

### In Linux

Edit the `~/.bashrc` by any editor such as: vim, nano, etc and append following line at the end of the file.

```bash
export GRADLE_USER_HOME=/mnt/d/repositories/gradle-repository
```

Then, issue below command make the environment variables effectively.

```bash
source ~/.bashrc
```

### In Windows

In Windows 7, right click My Computer and select Properties > Advanced.
In Windows 8, Windows 10, go to Control Panel > System > Advanced System Settings.

- Under System Variables, click New
- In the Variable Name field, enter `GRADLE_USER_HOME`
- In the Variable Value field, enter your desire folder, for ex: `D:\Misc\Gradle`
- Click OK

### Verification

You can verify again by open a new terminal, go to any Gradle project and run some Gradle tasks. Then check the new location where you have just set for the `GRADLE_USER_HOME`variable.
