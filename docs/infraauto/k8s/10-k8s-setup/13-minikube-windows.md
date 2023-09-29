---
title: Minikube Setup on Windows
tags: ['Minikube', 'Minikube on Windows']
---

# Minikube Setup on Windows

### Introduction

Minikube is a tool that makes it easy to run Kubernetes locally. In this guide, we will walk you through the process of installing Minikube on a Windows system.

### 
Prerequisites
Before you begin, you will need:
* Windows 10 or later
* At least 2GB of free memory
* At least 20GB of free disk space
* Administrative access
* Install [Chocolatey package manager](https://chocolatey.org/install) which is used for the installation
* Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/), the Kubernetes command-line tool

### Installing Minikube

To install Minikube on Windows, follow these steps:

1. Open PowerShell as Administrator and install minikube using Chocolatey:
    
    ```powershell
    choco install minikube
    ```

### Starting Minikube
1. Once the installation is complete, you can start Minikube:

    ```powershell
    minikube start
    ```

### Verifying the Installation

1. To ensure that Minikube is properly installed and running, you can check its status:
    
    ```powershell
    minikube status
    ```

## Troubleshooting

If you encounter issues when trying to start Minikube, here are a few things you can try:
1. Make sure that virtualization is enabled in your BIOS settings.
2. Try updating Minikube:

    ```powershell
    minikube delete
    ```

    
    ```powershell
    choco upgrade minikube
    ```

    
    ```powershell
    minikube start
    ```

## Conclusion

Congratulations, you have successfully installed and set up Minikube on your Windows machine! You can now begin developing and testing your Kubernetes applications locally.


