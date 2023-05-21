---
title: "Running Docker on WSL2 without Docker Desktop"
date: "2021-12-19 16:47:17"
tag: [docker, wsl2, windows]
category: docker
published: true
hideInList: false
feature:
isTop: false
---

So, now that Docker Desktop is paid under certain scenarios, you may want to switch to something else.
This is a straight to the point guide on how to make Docker CE run fully on WSL2.

## What you will get

A full-fledged Docker installation on WSL2
Docker Daemon automatic start without any crazy hacks

## What you will not get

Docker Daemon sharing between Windows and WSL (i.e. you cannot run docker from Windows PowerShell)
Docker Daemon sharing between WSL distributions

## Requisites

I will consider that you already have WSL2 working, and you are using Ubuntu as your distribution.

## Guide

1. Install Docker CE on Ubuntu by following the [official guide](https://docs.docker.com/engine/install/ubuntu/):

```bash
# Ensures not older packages are installed
sudo apt-get remove docker docker-engine docker.io containerd runc

# Ensure pre-requisites are installed
sudo apt-get update
sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg \
  lsb-release

# Adds docker apt repository
echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" |
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Adds docker apt key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg |
    sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Refreshes apt repos
sudo apt-get update

# Installs Docker CE
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

2. Perform the [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/):

```bash
# Ensures docker group exists
sudo groupadd docker

# Ensures you are part of it
sudo usermod -aG docker $USER

# Now, close your shell and open another for taking the group changes into account
```

3. Make Docker Daemon start on WSL initialization:
   If you are enrolled in Windows Insiders, you can use a brand-new feature of WSL to start the Docker Daemon during the initialization. You only need to add:

```yaml
[boot]
command = "service docker start"
```

To your `/etc/wsl.conf` within your WSL distribution. Then, restart it with `wsl.exe --shutdown`. To verify that it works, you can run `docker version`. If you do not receive any permission denied error, you are good.

But if you are not enrolled in Windows Insiders, you can achieve a similar result with the following approach:
Open the ~/.profile (or ~/.zprofile if you are using ZSH rather than Bash) in your WSL distribution, and add a section like so to it:

```bash
if service docker status 2>&1 | grep -q "is not running"; then
    wsl.exe -d "${WSL_DISTRO_NAME}" -u root -e /usr/sbin/service docker start >/dev/null 2>&1
fi
```

This piece of code will run every time you open a new shell on your WSL distribution. It checks whether the Docker Daemon is running, and if not, starts it without prompting for credentials. Without any noticeable delay.

To verify, after making the changes, open a new shell and run the docker version command. If you do not receive any permission denied error, you are good.

If you are unsure about which method to choose, you can choose both. It's harmless, I do it on mine.

## Bonus

1. Installing Docker Compose (v2+):

```bash
# Finds the latest version
compose_version=$(curl -fsSL -o /dev/null -w "%{url_effective}" https://github.com/docker/compose/releases/latest | xargs basename)

# Downloads the binary to the plugins folder
curl -fL --create-dirs -o /usr/local/bin/docker-compose \
    "https://github.com/docker/compose/releases/download/${compose_version}/docker-compose-linux-$(uname -m)"

# Assigns execution permission to it
chmod +x /usr/local/bin/docker-compose
```

To verify it works you can run `docker compose version`.

2. Installing Docker Compose Switch (to use the docker-compose command):

```bash
# Finds the latest version
switch_version=$(curl -fsSL -o /dev/null -w "%{url_effective}" https://github.com/docker/compose-switch/releases/latest | xargs basename)

# Downloads the binary
sudo curl -fL -o /usr/local/bin/docker-compose \
    "https://github.com/docker/compose-switch/releases/download/${switch_version}/docker-compose-linux-$(dpkg --print-architecture)"

# Assigns execution permission to it
sudo chmod +x /usr/local/bin/docker-compose
```

PS: I suggest to install the `docker-compose` to `/usr/local/bin/` because otherwise, the VS Code - Remote Containers extension will not find it.

To verify it works, you can run `docker-compose version`.

3. Install the Docker Credential Helper:

You will need this if you want Docker to store your credentials securely when you perform docker login. Thanks to the WSL interoperability between Windows, you can install the Windows version of the Docker Credential Helper inside of WSL itself.

```bash
# Finds the latest version
wincred_version=$(curl -fsSL -o /dev/null -w "%{url_effective}" https://github.com/docker/docker-credential-helpers/releases/latest | xargs basename)

# Downloads and extracts the .exe
sudo curl -fL \
    "https://github.com/docker/docker-credential-helpers/releases/download/${wincred_version}/docker-credential-wincred-${wincred_version}-$(dpkg --print-architecture).zip" |
    zcat | sudo tee /usr/local/bin/docker-credential-wincred.exe >/dev/null

# Assigns execution permission to it
sudo chmod +x /usr/local/bin/docker-credential-wincred.exe
```

Then, configure your Docker CLI to use it by assuring that the following is present in your `~/.docker/config.json`:

```json
{
  "credsStore": "wincred.exe"
}
```

To verify that it works, you can try to `docker login` and if not, Docker will complain about storing credentials in plain text

4. Enabling Docker BuildKit:

As it came enabled by Docker Desktop before. It's simple, ensure that the following is present in your `/etc/docker/daemon.json`:

```json
{
  "features": {
    "buildkit": true
  }
}
```

You will need to edit this file as root, so make sure to use `sudo` before running your editor (`sudo vim /etc/docker/daemon.json`).

## Final considerations

The entire setup process may take some time, but you will have achieved almost everything that Docker Desktop used to provide to you (by the way, I use [kind](https://github.com/kubernetes-sigs/kind/releases) as an alternative to Docker Desktop's built-in K8s).

However, you can achieve a similar (and even higher/better) level of easiness that Docker Desktop provided to you by wrapping all the steps above in your dotfiles installation steps.

For example, in this [dotfiles](https://github.com/felipecrs/dotfiles#install-the-dotfiles-manually), every single of these steps are automated, including configuring /etc/docker/daemon.json, changing ~/.profile, and even providing a way to automatically update your extra binaries (docker-compose, or the wincred.exe) every time you update your dotfiles (by using a feature of chezmoi - a dotfiles manager which I totally recommend).
