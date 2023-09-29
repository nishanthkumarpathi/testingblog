---
title: Docker Network
tags: ['Docker', 'Docker Network', 'Docker Network Management']
---

## Types

Bridge or Docker0 - the default virtual network mapped to the host IP. It allows containers to communicate with each other when running on the same docker host.

host - a special network that attaches the container directly to the host by skipping the virtual network.

none - Only localhost interface is available in container

## Docker Command Reference

Here you will find commands to manage Docker networks and this blog post will be updated with new commands as my knowledge of Docker networks grows.

### List networks

```shell
docker network ls
```

### Inspect a network

```shell
docker network inspect <<NETWORK-NAME>>
```
### Create a virtual network:

To use a custom bridge, we can use the --driver option.

```shell
docker network create <<NETWORK-NAME>>
```

### Connect a container to a network

```shell
docker network connect <<NETWORK-NAME>> <<CONTAINER-NAME>>
```

### Disconnect a container from a network

```shell
docker network disconnect <<NETWORK-NAME>> <<CONTAINER-NAME>>
```

### Connect to a network while starting a container

```shell
docker container run -d --name <<CONTAINER-NAME>> --network <<NETWORK-NAME>> <image>
```




