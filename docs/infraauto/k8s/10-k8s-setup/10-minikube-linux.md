---
title: Minikube Setup on Linux
tags: ['Minikube Setup', 'Minikube', 'Minikube Setup on Ubuntu', 'Minikube Setup using Debian Package', 'Minikube Setup using RPM Package' ]
---

### Introduction
Minikube is an open-source tool that makes it easy to run Kubernetes on your local machine for day-to-day development. This tutorial provides step-by-step instructions on how to install Minikube on Ubuntu.

### Prerequisites

Before you start, make sure you have the following:

* Hardware Capactiy:
    - 2 CPUs or more
    - 2GB of free memory
    - 20GB of free disk space
    - Internet connection
* Ubuntu 20.04 or later with Container or virtual machine manager, such as: Docker, QEMU, Hyperkit, Hyper-V, KVM, Parallels, Podman, VirtualBox, or VMware Fusion/Workstation
* Access to a terminal window/command line
* The kubectl command-line tool, which you can install by following the instructions [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

### Installing Minikube Binary

To install Minikube on Ubuntu, follow these steps:

1. Update the package lists for upgrades and new package installations:
    
    ```bash
    sudo apt update
    ```
2. Download the latest version of Minikube:
    
    ```bash
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    ```
3. Copy the downloaded file and give it executable rights:
    
    ```bash
    sudo install minikube-linux-amd64 /usr/local/bin/minikube
    ```

### Installing Minikube Debian Package

1. Update the package lists for upgrades and new package installations:
    
    ```bash
    sudo apt update
    ```

2. Download the latest version of Minikube:
    
    ```bash
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
    ```

3. Install the downloaded package:
    
    ```bash
    sudo dpkg -i minikube_latest_amd64.deb
    ```

### Installing Minikube RPM Package

1. Update the package lists for upgrades and new package installations:
    
    ```bash
    sudo yum update
    ```

2. Download the latest version of Minikube:
    
    ```bash
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-latest.x86_64.rpm
    ```

3. Install the downloaded package:
    
    ```bash
    sudo rpm -ivh minikube-latest.x86_64.rpm
    ```

### Starting Minikube

1. Start Minikube:
    
    ```bash
    minikube start
    ```

### Verifying the Installation

1. To confirm that Minikube is running:

    ```
    minikube status
    ```

### Troubleshooting

If you encounter issues when starting Minikube, you can try the following:

1. Check the system requirements and ensure your machine meets them.
2. Try updating Minikube: 
    
    ```bash
    minikube delete
    ```

    ```bash
    minikube start
    ```

### Conclusion

You should now have Minikube running on your Ubuntu system. You can start deploying and managing your applications on your local Kubernetes environment. Happy Kubeing!
