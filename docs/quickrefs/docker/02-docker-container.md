---
title: Docker Container Management
tags: ['Docker', 'Docker Container', 'Docker Container Management']
---

### List all the Running Containers
```shell
docker ps
```

### List all the Containers (irrespective of the state)
```shell
docker ps -a
```
Please note: -a is the short form for --all and they both can be used interchangeably.

```shell
docker ps -all
```

### List all the Running Containers with the File Size
```shell
docker ps --size
```

```shell
docker container ls -s
```
### List the IDs of the Running Containers
```shell
docker ps -q
```

```shell
docker container ls -q
```

### List the IDs of all the Containers (irrespective of the state)

```shell
docker ps -aq
```

```shell
docker container ls -aq
```

### Filter container list

List all the containers that are in the exited state.

```shell
docker ps --filter "status=exited"
```

List all the containers that are in the running state.


```shell
docker ps -a -f status=running
```

### Creating a new Container using Docker Image

The docker create command is used to create a new container using a Docker image. It does not run the container but just adds a writable layer on top of the Docker image. We'll have to run the docker start command to run the created container.

As docker create command interacts with the containerobject, we can also use the below command:

```shell
docker container create <image>
```

### Creating a new Container using Docker Image with some fixed name

```shell
docker create --name <container-name> <image>
```

```shell
docker container create --name <container_name> <image_name>
```

### Start a Docker Container

```shell
docker start <container-id>
```

```shell
docker container start <container-id>
```

### Stop a running Docker Container

```shell
docker stop <container-id>
```

```shell
docker container stop <container-id>
```

### Restart a Docker container

```shell
docker restart <container_id or container_name>
```

```shell
docker container restart <container_id or container_name>
```

### Pause a running Container

```shell
docker pause <container_id or container_name>
```

```shell
docker container pause <container_id or container_name>
```

### Unpause a paused Container
To again run the paused container, we can use the below command:
    
    ```shell
    docker unpause <container_id or container_name>
    ```

    ```shell
    docker container unpause <container_id or container_name>
    ```

### Docker Run command
The docker run command is used to create a new container from a Docker image. It is a combination of docker create and docker start commands.

```shell
docker run <image>
```

```shell
docker container run <image>
```

### Docker Run command in Foreground and Detached Modes

```shell
docker run -it <image>
```

```shell
docker container run -it <image>
```

### Delete the container on the exited state

```shell
docker rm <container-id>
```

```shell
docker container rm <container-id>
```

### Run the container in daemon mode

```shell
docker run -d <image>
```

```shell
docker container run -d <image>
```

### Run Docker Container with a name using the run command

```shell
docker run --name <container-name> <image>
```

```shell
docker container run --name <container-name> <image>
```

### Listing Processes running in a Docker Container
    
    ```shell
    docker top <container-id>
    ```

    ```shell
    docker container top <container-id>
    ```

### Map ports of a Docker Container
    
    ```shell
    docker run -p <host-port>:<container-port> <image>
    ```

    ```shell
    docker container run -p <host-port>:<container-port> <image>
    ```
### Rename a Docker Container

### Run the Docker Container in an Interactive Mode

### Get Inside the Running Container (Literally!)

### Start a Docker Container and keep it running

### Copy a File from a Container to a Host

### Copy a File from the Host to the Docker Container

### Remove a specific Docker Container

### Remove a Docker Container after it exits

### Delete all the Stopped Containers

### Delete all the Docker Containers

### Create a Docker image from a Docker Container

### Run command inside the Docker Container

### Set Environment Variable in a Docker Container

### Set Environment Variable in a Docker Container using a File