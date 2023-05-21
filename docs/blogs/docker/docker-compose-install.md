---
title: "docker 安装 docker compose"
date: 2021-08-29 09:20:01
tag: [linux, docker]
category: deploy
published: true
hideInList: false
feature:
isTop: false
---

## Finds the latest version

```bash
compose_version=$(curl -fsSL -o /dev/null -w "%{url_effective}" https://github.com/docker/compose/releases/latest | xargs basename)
```

## Downloads the binary to the plugins folder

```bash
curl -fL --create-dirs -o /usr/local/bin/docker-compose \
    "https://github.com/docker/compose/releases/download/${compose_version}/docker-compose-linux-$(uname -m)"
```

## Assigns execution permission to it

```bash
chmod +x /usr/local/bin/docker-compose
```

## Test the installation

```bash
docker-compose --version
```
