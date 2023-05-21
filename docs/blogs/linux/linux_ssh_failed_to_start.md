---
title: "Solve Failed to start OpenBSD Secure Shell server"
date: "2021-11-24 23:18:02"
tag: [ssh]
category: linux
published: true
hideInList: false
feature:
isTop: false
---

This issue is caused by a bad configuration of `/etc/ssh/sshd_config` file. When the service try to launch it does not recognize every fields of this configuration file. In order to solve this issue, you must use the tool

```bash
sudo sshd -T
```

In case /etc/ssh/sshd_config was wrong, this would show wrong parameters with lines.

You must correct this issues and then restart the service:

```bash
systemctl restart sshd.service
```
