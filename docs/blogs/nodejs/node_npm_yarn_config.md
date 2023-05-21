---
title: "node安装后的设置(node_global和node_cache) - windows"
date: 2021-05-23 15:31:26
tag: [node, install]
category: setting
published: true
hideInList: false
feature:
isTop: false
---

## npm

使用 npm 安装模块分为本地安装和全局安装。

本地安装：npm install express 会安装到当前项目

全局安装：npm install express -g 会安装到指定的目录(node_global)

另外，如果没有设置全局目录 node_global，那么全局安装的文件将会保存到 C:\Users\hades\AppData\Roaming\npm (hases 是自己设置的计算机名字)

安装好 node 后，要设置一下 node_global 和 node_cache(node 缓存文件夹)

1. 在 node 安装目录创建 node_global 和 node_cache 文件夹

2. 设置环境变量：

用户变量设置：将用户变量中 PATH 的值改成 D:\Program Files\nodejs\node_global，没有 PATH，可以直接添加。

系统变量设置：添加变量 NODE_PATH 值为：D:\Program Files\nodejs\node_modules

3. 打开 cmd，执行

```bash
npm config set prefix "D:\Program Files\nodejs\node_global"

npm config set cache "D:\Program Files\nodejs\node_cache"
```

4. 有时候用 npm 拉取包可能会很慢，可以用淘宝 npm 镜像代替 npm 进行拉包，就像 github 和 gitee

执行：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## yarn 2.0 以上

```bash

# 先安装1.X
npm -g install yarn

# 安装3.x版本
export https_proxy=http://192.168.2.10:7890
yarn set version stable

# 查看版本号
yarn --version

# 本机设置(全局设置)
vim ~/.yarnrc.yml

globalFolder: "D:\\repositories\\yarn3-repository\\Data\\global"
yarnPath: "D:\\repositories\\yarn3-repository\\.yarn\\releases\\yarn-3.2.0.cjs"
cacheFolder: "D:\\repositories\\yarn3-repository\\Cache"
installStatePath: "D:\\repositories\\yarn3-repository\\.yarn\\install-state.gz"
npmRegistryServer: "https://repo.huaweicloud.com/repository/npm/"
# angular 项目必须设置  默认pnp
nodeLinker: node-modules


# 单个项目设置
yarn config set prefix "D:\repositories\yarn3-repository\Data"
yarn config set globalFolder "D:\repositories\yarn3-repository\Data\global"
yarn config set yarnPath "D:\repositories\yarn-repository\.yarn\releases\yarn-3.2.0-rc.10.cjs"
yarn config set installStatePath "D:\repositories\yarn3-repository\.yarn\install-state.gz"

yarn config set cacheFolder "D:\repositories\yarn3-repository\Cache"
yarn config set link-folder "D:\repositories\yarn3-repository\Data\link"
yarn config set pnpUnpluggedFolder "D:\repositories\yarn3-repository\.yarn\unplugged"

yarn config set npmRegistryServer "http://127.0.0.1:8081/repository/npm_huawei"
yarn config set unsafeHttpWhitelist --json '["127.0.0.1"]'

# nodeLinker 默认值是 pnp, yarn install后不生成node_modules目录，项目运行有些依赖会报错，建议直接改 node-modules
yarn config set nodeLinker node_modules
```

### Accessing the list of commands

```bash
yarn help
```

### Starting a new project

```bash
yarn init
```

### Installing all the dependencies

```bash
yarn
yarn install
```

### Adding a dependency

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

### Adding a dependency to different categories of dependencies

```bash
yarn add [package] --dev  # dev dependencies
yarn add [package] --peer # peer dependencies
```

### Adding a global dependency(not support)

[Adding a global dependency](https://stackoverflow.com/questions/43895201/how-to-install-a-list-of-many-global-packages-with-yarn)

```bash
yarn global add [package]
```

### Upgrading a dependency

```bash
yarn up [package]
yarn up [package]@[version]
yarn up [package]@[tag]
```

### Removing a dependency

```bash
yarn remove [package]
```

### Upgrading Yarn itself

```bash
yarn set version latest
yarn set version from sources
```
