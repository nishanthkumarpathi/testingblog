---
title: Bootstrap Staging
tags: [
    'Flux',
    'GitOps',
    'Staging'
]
---

### Check For Errors

Before committing anything to a repository, it's a good idea to check that the resources build. This will catch typos or other errors that will cause Kustomize to fail. It won't check any dry-run mistakes like resources being installed without CRDs, but it will still save you time.

```
➤ kustomize build infrastructure/staging/traefik-proxy
apiVersion: v1
kind: Namespace
metadata:
  name: traefik-system
---
apiVersion: v1
data:
  values.yaml: |-
    ---
...
```

Check the generated manifests for patch integrity, such as looking to make sure that our HelmRelease has our version pattern applied correctly. You can also check that the ConfigMap name includes the suffix in the ConfigMap and also in the HelmRelease:

```
  valuesFrom:
  - kind: ConfigMap
    name: traefik-values-5bt7mc7c46
    optional: true
    valuesKey: values.yaml
```

### Tell Flux What To Do

Flux will load everything from `clusters/staging` and will use that information to load other resources from the Git repository.

We need it to load the `sources` directory for the HelmRepositories, along with `crds/staging` and `infrastructure/staging` for the infrastructure components we just created. The resources in infrastructure won't work without the HelmRepository or the CRDS, so we're also setting a `dependsOn` value in the `infrastructure.yaml` manifest. That assures that everything is loaded and processed in the proper order.

#### Add CRDs

```
# clusters/staging/crds.yaml
---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: crds
  namespace: flux-system
spec:
  interval: 10m0s
  sourceRef:
    kind: GitRepository
    name: flux-system
  path: ./crds/staging
  prune: true
  wait: true
```

#### Add Sources

```
# clusters/staging/sources.yaml
---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: sources
  namespace: flux-system
spec:
  interval: 10m0s
  sourceRef:
    kind: GitRepository
    name: flux-system
  path: ./sources
  prune: true
```

#### Add Infrastructure

```
# clusters/staging/infrastructure.yaml
---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: infrastructure
  namespace: flux-system
spec:
  dependsOn:
  - name: sources
  - name: crds
  interval: 10m0s
  sourceRef:
    kind: GitRepository
    name: flux-system
  path: ./infrastructure/staging
  prune: true
```

**PRO TIP:** We're using `prune: true`, which tells Flux to delete any resources that it doesn't find in Git, including unreferenced ConfigMaps that it created. This is useful to keep your cluster matching the repo exactly, but if you're new to Flux, or if you ever want to stop using Flux, you can turn that off. After Flux reconciles with the repository, it won't delete anything from the cluster that no longer appears in Git.

Before continuing, make sure that your directory structure looks like this:

```
➤ tree .
.
├── apps
│   ├── base
│   ├── production
│   └── staging
├── clusters
│   ├── production
│   └── staging
│       ├── crds.yaml
│       ├── infrastructure.yaml
│       └── sources.yaml
├── crds
│   └── staging
│       └── traefik-proxy
│           └── kustomization.yaml
├── infrastructure
│   ├── base
│   │   └── traefik-proxy
│   │       ├── helmrelease.yaml
│   │       ├── kustomization.yaml
│   │       ├── kustomizeconfig.yaml
│   │       └── namespace.yaml
│   ├── production
│   │   └── traefik-proxy
│   └── staging
│       └── traefik-proxy
│           ├── helmrelease.yaml
│           ├── kustomization.yaml
│           └── values.yaml
└── sources
    └── helm
        └── traefik-proxy.yaml
```

### Bring up Flux

Flux knows how to talk to Bitbucket, GitHub, Gitlab, and generic Git. For our class we're using GitHub and the corresponding variable names. If you're using a different provider, see [the instructions](https://fluxcd.io/docs/installation/#bootstrap) on how to bootstrap your cluster.

#### Prerequisites

1. Create a Personal Access Token (PAT) or similar token for Flux.
2. Set this token as `GITHUB_TOKEN`
3. Set your username or org name as `GITHUB_USER`
4. Set your repository name as `GITHUB_REPO`. Use only the bare name, like `traeik-gitops`.

> **PRO TIP:** If you're on a Mac and don't want to leave your token in the command-line history, you can copy it to the clipboard and then use `export GITHUB_TOKEN=(pbpaste)` to safely assign it to the variable.

#### Create the Initial Commit

Initialize a Git repository in `fleet-infra`, then add and commit everything. Set a remote for your GitHub repository, and then push the local repo to it.

```
➤ git init
Initialized empty Git repository in /Users/monachus/Documents/workspace/monachus/traefik/academy/traefik-and-gitops/fleet-infra/.git/

➤ git add .

➤ git commit -m 'initial commit'
[master (root-commit) cf456ff] initial commit
 11 files changed, 133 insertions(+)
 create mode 100644 clusters/staging/infrastructure.yaml
 create mode 100644 clusters/staging/sources.yaml
 create mode 100644 crds/traefik-proxy/kustomization.yaml
 create mode 100644 infrastructure/base/traefik-proxy/helmrelease.yaml
 create mode 100644 infrastructure/base/traefik-proxy/kustomization.yaml
 create mode 100644 infrastructure/base/traefik-proxy/kustomizeconfig.yaml
 create mode 100644 infrastructure/base/traefik-proxy/namespace.yaml
 create mode 100644 infrastructure/staging/traefik-proxy/helmrelease.yaml
 create mode 100644 infrastructure/staging/traefik-proxy/kustomization.yaml
 create mode 100644 infrastructure/staging/traefik-proxy/values.yaml
 create mode 100644 sources/helm/traefik-proxy.yaml

➤ git branch -M main
➤ git remote add origin git@github.com:oskapt/traefik-fleet-infra.git
➤ git push -u origin main

Enumerating objects: 24, done.
Counting objects: 100% (24/24), done.
Delta compression using up to 16 threads
Compressing objects: 100% (17/17), done.
Writing objects: 100% (24/24), 2.56 KiB | 1.28 MiB/s, done.
Total 24 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), done.
To github.com:oskapt/traefik-fleet-infra.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

The next command requires that you're also connected to the cluster in which you wish to bootstrap Flux. Make sure that you're connected to your staging cluster before continuing.

When you run this command, Flux will install resources into the `flux-system` namespace, fetch the Git repository, and perform the installation of everything you've configured.

```
flux bootstrap github \
  --personal \
  --owner=$GITHUB_USER \
  --repository=$GITHUB_REPO \
  --branch=main \
  --path=clusters/staging
```

#### Verify the Installation

If all goes well, you should see the new `traefik-system` namespace come up with `traefik-proxy` Pods running inside of it.

```
➤ k get po -n traefik-system -l 'app.kubernetes.io/name=traefik'
NAME                             READY   STATUS    RESTARTS   AGE
traefik-proxy-5798757787-l2j8t   1/1     Running   0          2d18h
```

### Congratulations!!! 🎉 🎊 🍾

You now have a Kubernetes cluster whose configuration is automated and managed by Flux, with a Git repository as the source of truth. From this point on, the work that you'll do with this cluster will happen in the repository and not directly on the cluster.

This is a big step, and it's one that you should be proud of. The feeling of confidence that comes from both knowing _and controlling_ what happens in a cluster is one of relief. GitOps will prevent configuration drift and enforce repeatability, and those are the hardest aspects to manage in a Kubernetes cluster.
