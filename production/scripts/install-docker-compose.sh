#!/usr/bin/bash

# The following instructions were extracted from https://docs.docker.com/compose/install/

# 0 - prevent interactive mode
export DEBIAN_FRONTEND=noninteractive

# 1 - setup a stable release
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 2 - apply executable permission to the binary
sudo chmod +x /usr/local/bin/docker-compose

# 3 - check the docker-compose installed version
docker-compose --version
