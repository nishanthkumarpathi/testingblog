---
title: Managing Flux
tags: [
    'Flux',
    'GitOps',
    'Staging',

]
---



When you bootstrapped your cluster, Flux added a new diretory to the `clusters/staging` path:

```
➤ tree clusters/staging
clusters/staging
├── crds.yaml
├── flux-system
│   ├── gotk-components.yaml
│   ├── gotk-sync.yaml
│   └── kustomization.yaml
├── infrastructure.yaml
└── sources.yaml
```

This directory holds information about Flux itself. You shouldn't need to edit these files, since Flux knows to pull in the other three manifests that you created. If you add additional Kustomizations in the future, Flux will pick them up automatically.

> **PRO TIP:** Before you can push changes to the repo, run `git pull` to bring your local copy in sync with the remote repo.

### Basic Usage

The `flux` command gives you ways to control and interact with the resources that Flux creates.

The most common activity is to view the status of all Kustomizations:

```
➤ flux get kustomization
NAME            READY MESSAGE                         REVISION      SUSPENDED
sources         True  Applied revision: main/8ad0d7b  main/8ad0d7b  False
crds            True  Applied revision: main/8ad0d7b  main/8ad0d7b  False
flux-system     True  Applied revision: main/8ad0d7b  main/8ad0d7b  False
infrastructure  True  Applied revision: main/8ad0d7b  main/8ad0d7b  False
```

This output shows that all Kustomizations are synchronized and deployed and it shows the current commit hash from Git. Any issues that arise when deploying manifests will appear here as error messages. These are usually directly from Kustomize and may appear cryptic. They usually happen when a dependency is not present (like a missing CRD), or when a `kustomization.yaml` references a file that doesn't exist.

### Triggering Flux

Flux will reconcile the repo and its resources at the interval that you've set in the Flux Kustomizations. If you're doing active development and prefer not to wait, you can force Flux to do a run with a combination of `flux reconcile source` and `flux reconcile kustomization`. For example, to force a run on the `infrastructure` resources:

```
➤ flux reconcile source git flux-system
► annotating GitRepository flux-system in flux-system namespace
✔ GitRepository annotated
◎ waiting for GitRepository reconciliation
✔ fetched revision main/8ad0d7b302be3fd253568ad84354a79385c98908

➤ flux reconcile kustomization infrastructure
► annotating Kustomization infrastructure in flux-system namespace
✔ Kustomization annotated
◎ waiting for Kustomization reconciliation
✔ applied revision main/8ad0d7b302be3fd253568ad84354a79385c98908
```

### Processing New Kustomizations

The `flux-system` Kustomization is special.

If you add a new top-level Kustomization (i.e. as a peer to `infrastructure`, `sources`, or `crds`), telling Flux to reconcile `flux-system` will pull it into the active configuration, at which point Flux will also reconcile it and all the other Kustomizations. Once it shows up in the output of `flux get kustomizations`, you can reconcile it independently.

### Check Chart Versions

```
➤ flux get source chart
NAME                          READY MESSAGE                                         REVISION  SUSPENDED
traefik-system-traefik-proxy  True  Pulled 'traefik' chart with version '10.14.2'.  10.14.2   False
```

### Check Git Repository Hashes

You can have multiple Git repositories connected to Flux as sources. The main cluster configuration happens from your `fleet-infra` repository, which shows up as `flux-system` in the output of `flux get source git`:

```
➤ flux get source git
NAME        READY MESSAGE                         REVISION      SUSPENDED
flux-system True  Fetched revision: main/8ad0d7b  main/8ad0d7b  False
```

If you have other repositories configured for certain applications, they'll also show up here.

### Other Useful Flux Commands

Remember that the `flux` command interacts with the cluster your current Kubernetes config file points to. You can see other resources that Flux can show you with `--help`:

```
➤ flux get --help
The get sub-commands print the statuses of Flux resources.

Usage:
  flux get [command]

Available Commands:
  alert-providers Get Provider statuses
  alerts          Get Alert statuses
  all             Get all resources and statuses
  helmreleases    Get HelmRelease statuses
  images          Get image automation object status
  kustomizations  Get Kustomization statuses
  receivers       Get Receiver statuses
  sources         Get source statuses

➤ flux get source --help
The get source sub-commands print the statuses of the sources.

Usage:
  flux get sources [command]

Aliases:
  sources, source

Available Commands:
  all         Get all source statuses
  bucket      Get Bucket source statuses
  chart       Get HelmChart statuses
  git         Get GitRepository source statuses
  helm        Get HelmRepository source statuses
```
