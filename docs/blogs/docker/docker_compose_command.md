---
title: "docker-compose command 执行多条指令"
date: "2021-12-19 17:46:23"
tag: [docker, docker-compose, command]
category: docker-compose
published: true
hideInList: false
feature:
isTop: false
---

## /bin/bash -c 字符串方式

```yaml
services:
  prj1:
    build:
      context: .
      dockerfile: Dockerfile.prj1
    environment:
      SERVER_LISTEN_URI: "tcp://0.0.0.0:9000"
    #执行多条指令
    command: /bin/bash -c "cp /app/dtest/config.default.yml /app/config.yml && python -u /app/dtest/tcc.py"
    #目录映射
    volumes:
      - ..:/app
      - ./tmp:/var/tmp
    ports:
      - "9000:9000"
    links:
      - redis
```

另一个示例：

```yaml
command: /bin/bash -c " while true; do sleep 1; done"
```

## /bin/bash -c 配置文件方式

### 串行运行

如果这几个命令是没有要求并行运行，则配置如下

```yaml
command:
  - sh
  - -c
  - |
    cmd1
    cmd2
    cmd3
```

如上配置会按顺序执行 cmd1，之后再执行 cmd2，之后 cmd3。对于可以串行的命令，这样即可。

### 并行运行

有时候想配置几个常驻脚本在 docker，希望这几个脚本一起跑起来（并行运行），上述 1 的办法就不行了。
Linux 把命令行扔后台运行的一个办法就是在后面加上 &，

```yaml
command:
  - sh
  - -c
  - |
    cmd1 &
    cmd2 &
    cmd3
```
