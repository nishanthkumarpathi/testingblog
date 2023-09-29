---
title: Minikube
---

### Puase Minikube

Pause Kubernetes without impacting deployed applications:

    ```bash
    minikube pause
    ```

### Unpause a paused instance:

    ```bash
    minikube unpause
    ```

### Halt the cluster:

    ```bash
    minikube stop
    ```

### Change the default memory limit (requires a restart):

    ```bash
    minikube config set memory 9001
    ```

### Browse the catalog of easily installed Kubernetes services:

    ```bash
    minikube addons list
    ```


### Create a second cluster running an older Kubernetes release

    ```bash
    minikube start -p aged --kubernetes-version=v1.16.1
    ```


### Delete all of the minikube clusters

    ```bash
    miniube delete --all
    ```