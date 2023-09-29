---
title: Hadolint Usage
tags: ['Docker', 'Hadolint']
---

### Hadolint CLI Usage

```bash
hadolint <Dockerfile>
```

```bash
hadolint --trusted-registry my-company.com:500 <Dockerfile> # Warn when using untrusted FROM images
```

```bash
hadolint --trusted-registry my-company.com:500 <Dockerfile> # Warn when using untrusted FROM images
```

### Hadolint Docker Container Usage

Docker comes to the rescue, providing an easy way how to run hadolint on most platforms. Just pipe your Dockerfile to docker run:

```bash
docker run --rm -i hadolint/hadolint < Dockerfile
```
# OR

```bash
docker run --rm -i ghcr.io/hadolint/hadolint < Dockerfile
```

### Hadolint Podman Usage

```bash
podman run --rm -i docker.io/hadolint/hadolint < Dockerfile
```

# OR

```bash
podman run --rm -i ghcr.io/hadolint/hadolint < Dockerfile
```

### Hadolint Windows Powershell Usage

```powershell
cat .\Dockerfile | docker run --rm -i hadolint/hadolint
```
