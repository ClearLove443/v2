---
title: "docker 可视化管理 Portainer"
date: 2021-07-11 11:48:29
tag: [docker]
category: deploy
published: true
hideInList: false
feature: /post-images/p4DvMnCaf.jpg
isTop: false
---

# Portainer Server Deployment

```bash
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

# Portainer Agent Only Deployment

```bash
docker run -d -p 9001:9001 --name portainer_agent --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker/volumes:/var/lib/docker/volumes portainer/agent
```
