---
title: Kubectl Autocomplete
tags: ['Kubernetes', 'Kubectl', 'Kubectl Autocomplete', 'Kubectl Autocomplete Setup', 'Kubectl Autocomplete Bash', 'Kubectl Autocomplete Zsh']
---

## Enable Kubectl Autocomplete

### Bash Shell

Set up autocomplete in bash into the current shell, bash-completion package should be installed first.

```bash
source <(kubectl completion bash)
```

Add autocomplete permanently to your bash shell.

```bash
echo "source <(kubectl completion bash)" >> ~/.bashrc
```

You can also use a shorthand alias for kubectl that also works with completion:

```bash
alias k=kubectl
complete -o default -F __start_kubectl k
```

### Zsh Shell

Set up autocomplete in zsh into the current shell

```bash
source <(kubectl completion zsh)
```

Add autocomplete permanently to your zsh shell

```bash
echo '[[ $commands[kubectl] ]] && source <(kubectl completion zsh)' >> ~/.zshrc
```