---
title: Base-Traefik Proxy
tags: [
    'Flux',
    'Kustomize',
    'Traefik'
]
---

We'll start by installing Traefik Proxy into our staging environment.

Traefik Proxy doesn't separate out the CRDs into their own package, but we can point Kustomize to the URLs for each of the manifests in a particular chart version. At the time that I'm writing this, the Helm chart is on v10.14.2. Before copying and pasting the commands below, [check the tags in the chart repository](https://github.com/traefik/traefik-helm-chart/tree/master/traefik) and update the YAML as necessary.

![](https://files.cdn.thinkific.com/file\_uploads/627287/images/01b/dd7/662/chart-version-tags.png)

### Create the Directories

First create the `traefik-proxy` directory in each of `base`, `staging`, and `production` in the `infrastructure` directory, and also in the `crds` directory.

```
mkdir -p infrastructure/{base,production,staging}/traefik-proxy
mkdir -p crds/{production,staging}/traefik-proxy
```

### Add the CRDs

Create a `kustomization.yaml` in `crds/traefik-proxy/kustomization.yaml` that loads all of the CRDs for our chart version.

> **PRO TIP:** This is the least automated portion of the workflow, but it's the only way to get the correct CRDs by chart version for charts that don't offer a release or include a `kustomization.yaml` file in their contents. It's important that the URLs are tied to a specific chart version so that you control what goes into staging and what goes into production. For charts that offer releases, you can pull them from the release assets with `?ref=x.x.x`. See the Kustomize documentation for examples.

```
# crds/staging/traefik-proxy/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/ingressroute.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/ingressroutetcp.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/ingressrouteudp.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/middlewares.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/middlewarestcp.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/serverstransports.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/tlsoptions.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/tlsstores.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.2/traefik/crds/traefikservices.yaml
```

### Add the HelmRepository Source

We're installing Traefik Proxy from Helm, which means we need to tell Flux where it can find the repository. We'll create a file in `sources/helm` that gives it this information.

```
# sources/helm/traefik-proxy.yaml
---
apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: HelmRepository
metadata:
  name: traefik-proxy
  namespace: flux-system
spec:
  interval: 30m
  url: https://helm.traefik.io/traefik
```

### Add the Base Configuration

The base configuration will be used by both staging and production, so we'll add it first. It should be as generic as possible, and we'll override certain fields with specific values when we configure the actual cluster manifests in a moment.

Each file in our base configuration is named for the resource that it applies. In cases where you have multiple instances of a resource, such as multiple Services or IngressRoutes, put them into the same file, separated by `---`. You'll see this later when we add HTTPS to our application.

Create each of the following files in their corresponding location in your directory.

#### namespace.yaml

This creates the Namespace into which Traefik Proxy will be installed. We're using `traefik-system`.

```
# infrastructure/base/traefik-proxy/namespace.yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: traefik-system
```

#### helmrelease.yaml

This performs the installation of the Helm chart.

```
# infrastructure/base/traefik-proxy/helmrelease.yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: traefik-proxy
spec:
  chart:
    spec:
      chart: traefik
      sourceRef:
        kind: HelmRepository
        name: traefik-proxy
        namespace: flux-system
  valuesFrom:
  - kind: ConfigMap
    name: traefik-values
    valuesKey: values.yaml
    optional: true
  interval: 1h
  releaseName: traefik-proxy
  targetNamespace: traefik-system
```

#### kustomizeconfig.yaml

This additional configuration instructs Kustomize to version the ConfigMap and Secret fields in the HelmRelease.

```
# infrastructure/base/traefik-proxy/kustomizeconfig.yaml
---
nameReference:
- kind: ConfigMap
  version: v1
  fieldSpecs:
  - path: spec/valuesFrom/name
    kind: HelmRelease
- kind: Secret
  version: v1
  fieldSpecs:
  - path: spec/valuesFrom/name
    kind: HelmRelease
```

#### kustomization.yaml

This is the instruction set for Kustomize itself.

```
# infrastructure/base/traefik-proxy/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: traefik-system
resources:
- namespace.yaml
- helmrelease.yaml
configurations:
- kustomizeconfig.yaml
```

### How Will We Configure Helm Values?

The HelmRelease custom resource offers multiple ways to set or override the values in a chart, including:

* [Use ConfigMaps and Secrets within the cluster](https://fluxcd.io/docs/guides/helmreleases/#refer-to-values-in-configmap-and-secret-resources)
* [Use ConfigMaps and Secrets generated by Kustomize](https://fluxcd.io/docs/guides/helmreleases/#refer-to-values-in-configmaps-generated-with-kustomize)
* [Use values set inside the HelmRelease](https://fluxcd.io/docs/guides/helmreleases/#refer-to-values-inside-the-chart)

In this class we'll be using the second option, having Kustomize generate a ConfigMap that contains our `values.yaml` content.

We're defining the ConfigMap in the base HelmRelease and setting it `optional: true` so that the chart _could_ be installed with default values.

### What's Up With `kustomizeconfig.yaml`?

When working with ConfigMaps and Secrets, GitOps has two schools of thought. Kubernetes will update these resources inside the container without reloading the Pod, and while that's super convenient, it means that the operational state of the cluster might not be the same as what's reflected in the Git repository.

Since GitOps relies on the repository to be the single source of truth, Kustomize defaults to appending a unique suffix to ConfigMap and Secret resources so that any change to their values changes the identifier and performs a restart of the resource.

If you don't want to do this, you can disable it, and your resources will update in place.

It automatically detects and swaps out ConfigMap and Secret resource names in Deployments, StatefulSets, DaemonSets, and Jobs/CronJobs, but it doesn't know about custom resources like Flux's HelmRelease.

The instructions in `kustomizeconfig.yaml` tell Kustomize to apply the same modifications to ConfigMap and Secret fields in the HelmRelease manifest.

### Check Your Directory Structure

At this point your directory should look like this:

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
└── sources
    └── helm
        └── traefik-proxy.yaml
```
