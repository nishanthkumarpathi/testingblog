---
title: Kubernetes Context Configuration
tags: ['Kubernetes', 'Kubernetes Context Configuration', 'Kubernetes Context']
---

### Get the current context

```bash
kubectl config current-context
```

### Get the list of contexts

```bash
kubectl config get-contexts
```

### Switch the context

```bash
kubectl config use-context <context-name>
```

### Set the default namespace for the current context

```bash
kubectl config set-context --current --namespace=<namespace-name>
```

### Set the default namespace for the current context

```bash
kubectl config set-context --current --namespace=<namespace-name>
```

### Display the first user

```bash
kubectl config view -o jsonpath='{.users[].name}'
```

### Get a list of users

```bash
kubectl config view -o jsonpath='{.users[*].name}'
```

### Display list of contexts

```bash
kubectl config get-contexts
```

### Display the current-context

```bash
kubectl config current-context
```

### Set the default context to my-cluster-name

```bash
kubectl config use-context my-cluster-name
```

### Set a cluster entry in the kubeconfig

```bash
kubectl config set-cluster my-cluster-name
```

### Configure the URL to a proxy server for requests made by this client in the kubeconfig

```bash
kubectl config set-cluster my-cluster-name --proxy-url=my-proxy-url
```

### Add a new user to your kubeconf that supports basic auth

```bash
kubectl config set-credentials kubeuser/foo.kubernetes.com --username=kubeuser --password=kubepassword
```

### Permanently save the namespace for all subsequent kubectl commands in that context

```bash
kubectl config set-context --current --namespace=ggckad-s2
```

### Set a context utilizing a specific username and namespace

```bash
kubectl config set-context gce --user=cluster-admin --namespace=foo && kubectl config use-context gce
```

### Delete user foo

```bash
kubectl config unset users.foo
```

### Short alias to set/show context/namespace (only works for bash and bash-compatible shells, current context to be set before using kn to set namespace)

```bash
alias kx='f() { [ "$1" ] && kubectl config use-context $1 || kubectl config current-context ; } ; f'
alias kn='f() { [ "$1" ] && kubectl config set-context --current --namespace $1 || kubectl config view --minify | grep namespace | cut -d" " -f6 ; } ; f'
```
