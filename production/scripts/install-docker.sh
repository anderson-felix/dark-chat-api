#!/usr/bin/bash

# The following instructions were extracted from https://docs.docker.com/engine/install/ubuntu/

# 0 - prevent interactive mode
export DEBIAN_FRONTEND=noninteractive

# 1 - update the apt package index
sudo apt-get update -y
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release -y

# 2 - add docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor --batch --yes -o /usr/share/keyrings/docker-archive-keyring.gpg

# 3 - setup a stable repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4 - install docker
sudo apt-get update -y
sudo apt-get install docker-ce docker-ce-cli containerd.io -y

# 5 - create the docker group
sudo groupadd docker

# 6 - add the current user permanently to the docker group
sudo usermod -aG docker $USER

# 7 - verify the install version
docker --version

# 8 - reboot signal
export NEED_REBOOT=true
