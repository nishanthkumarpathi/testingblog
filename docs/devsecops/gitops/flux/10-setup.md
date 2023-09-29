---
title: Setup
---


Our environment has two clusters: staging and production. Each cluster runs the same applications, but changes are first applied to staging and tested before being added or updated in production.

Since we're dealing with versioned objects like container images, Git repositories, and Helm charts, it's easy to use one version in staging and then update the manifests to deploy or upgrade the resources in production.

The standard way to do this with Kustomize is to have a `base` directory that contains a configuration that is then patched when deployed. The work happens in the `staging` and `production` directories.

Our directory layout follows this model and also breaks the installation down into multiple components:

* `crds` - The Custom Resource Definitions that are used by infrastructure components we install
* `infrastructure` - Core components of the cluster like Traefik Proxy and Cert Manager. These support the operation of the cluster and are not directly consumed by users
* `apps` - The web applications that our users interact with
* `clusters` - The directory that contains the Flux instructions for our clusters

### Why Are CRDs Separate?

Most packages have their CRDs bundled with the Helm chart, which makes it easy to install everything all at once. This works when installing _only_ the Helm chart, but oftentimes when using Flux, we'll install the chart _and_ something that uses the CRDs that the chart installs. That might be a ClusterIssuer that goes in with Cert Manager, or an IngressRoute that goes in with Traefik Proxy.

Kustomize will assemble all of the manifests and then perform a dry-run installation test. If the CRDs aren't installed first, the test will fail, and Kustomize won't install anything.

The way to solve this is to install CRDs first, then the chart and any connected resources. We do this with Flux by stating that the `infrastructure` components depend on the `crd` components. This ensures that the CRDs go in first.

### Make the Directories

Create a directory in your workspace. Flux uses the name `fleet-infra`, but you're free to use any name that you like. This will be the base of your GitOps repository.

```
mkdir fleet-infra
cd fleet-infra
```

Once inside this directory, create the entire directory environment for the two clusters and the sources. We'll populate these directories throughout the remainder of the course.

```
mkdir -p {apps,infrastructure}/{base,production,staging}
mkdir -p {clusters,crds}/{production,staging}
mkdir -p sources/helm
```

When you're done, your directory structure should look like the following:

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
├── crds
│   └── production
│   └── staging
├── infrastructure
│   ├── base
│   ├── production
│   └── staging
└── sources
    └── helm
```

Now you're ready to start creating resources.
