---
title: Staging-Traefik Proxy
tags: [
    'Traefik',
    'Helm',
    'HelmRelease',
    'Kustomize',
    'Kustomization',
    'Flux',
    'GitOps',
    'Staging'
]
---



With our base configuration complete, we only need to extend it to staging. This will use the Kustomize feature of `patchesStrategicMerge` to add or overwrite values from the `base` manifests with those present in the `staging` manifests.

> **PRO TIP:** Any field not present in the manifests stored in Git will **not** be managed by Flux. For example, if you plan to use a Horizontal Pod Autoscaler, leave out the `replicas` field to prevent Flux from resetting any changes implemented by the HPA.

### Configure the Chart Version

The only change that we're going to make to our HelmRelease is to grant Flux permission to automatically upgrade staging to any version of the chart `>=10.14.0`. Because we're installing CRDs separately from the `10.14.2` chart version, this might break with a future release. If so, we'll know to update the CRDs before continuing.

```
# infrastructure/staging/traefik-proxy/helmrelease.yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: traefik-proxy
spec:
  chart:
    spec:
      version: ">=10.14.0"
```

### Configure the Chart Values

We'll create a `values.yaml` file that's exactly the same as what we would use with `helm install`. In our staging environment we've activated some experimental features like HTTP/3 and opened up cross-namespace and ExternalName Service support.

HTTP/3 requires that TLS is active on the `websecure` entrypoint, so we're turning that on too.

```
# infrastructure/staging/traefik-proxy/values.yaml
---
experimental:
  http3:
    enabled: true
ports:
  websecure:
    tls:
      enabled: true
    http3: true
providers:
  kubernetesCRD:
    allowCrossNamespace: true
    allowExternalNameServices: true
  kubernetesIngress:
    publishedService:
      enabled: true
      pathOverride: traefik-system/traefik
    allowExternalNameServices: true
```

### Create the Kustomization Instructions

Finally, we're going to create a `kustomization.yaml` that pulls from our base configuration and patches it with our local configuration. It will also create a ConfigMap from our local `values.yaml` file. With the work that we did above, that ConfigMap will have a unique suffix automatically appended to it, and the HelmRelease will be patched accordingly.

```
# infrastructure/staging/traefik-proxy/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: traefik-system
bases:
- ../../base/traefik-proxy
configMapGenerator:
- name: traefik-values
  files:
  - values.yaml=values.yaml
patchesStrategicMerge:
- helmrelease.yaml
```

### Check Your Directory Structure

Your directories should now look like this:

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
│           ├── helmrelease.yaml
│           ├── kustomization.yaml
│           └── values.yaml
└── sources
    └── helm
        └── traefik-proxy.yaml
```
