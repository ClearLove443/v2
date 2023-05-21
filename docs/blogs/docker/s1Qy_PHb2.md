---
title: "Use SSH to Connect to a Docker Container"
date: 2021-07-17 20:30:19
tag: [linux, docker, ssh]
category: deploy
published: true
hideInList: false
feature: /post-images/s1Qy_PHb2.jpg
isTop: false
---

You can connect to a Docker container using SSH (Secure Shell). Normally, SSH is used to connect remotely over a network to a server. The technology works the same when connecting to a virtual Docker container on your system.

# Step 1: Enable SSH on System

Start by installing and enabling the SSH service:

## Enable SSH on Ubuntu 18.04:

```
sudo apt-get install ssh
sudo systemctl ssh start
sudo systemctl ssh enable
service ssh status
```

## Enable SSH on CentOS 7:

```bash
yum –y install openssh-server openssh-clients
service sshd start
service sshd enable
service sshd status
```

Step 2: Get IP Address of Container
Get the container’s IP address by using the docker inspect command and filtering out the results.

For modern Docker engines, use the command:

```bash
sudo docker inspect -f "{{ .NetworkSettings.IPAddress }}" container_name
```

For older Docker engines, run:

```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name
```
