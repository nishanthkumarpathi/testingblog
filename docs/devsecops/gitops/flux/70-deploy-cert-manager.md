---
title: Deploy Cert Manager
tags: [
    'Flux',
    'GitOps',
    'Cert Manager',
    'Certificate'
]
---


Staging is off to a good start, but we can do better. Right now we have an IngressRoute listening on HTTP. There's no HTTPS route, and even if there was, we don't have a certificate to use with it. Let's fix that.

### Deploy Cert Manager

[Cert Manager](https://cert-manager.io/) is the de facto standard for deploying certificates in Kubernetes. Although most commonly used to connect with Let's Encrypt, it can actually install certificates from any ACME provider, Hashicorp Vault, Venafi, AWS KMS, FreeIPA, CFSSL, [and more](https://cert-manager.io/docs/configuration/external/#known-external-issuers).

I don't like to make assumptions about your environment, so I don't know how it's configured or if it will work with Let's Encrypt. To make sure that the course is accessible for everyone, we're going to use a self-signed Issuer with Cert Manager. This will demonstrate that certificates work, and you can switch it out to the provider of your choice later.

#### Directories

Make the directories for Cert Manager.

```
➤ mkdir -p crds/{production,staging}/cert-manager
➤ mkdir infrastructure/{base,production,staging}/cert-manager/issuers
```

#### Helm Repository

Cert Manager is maintained by [Jetstack](https://jetstack.io/), and we need to add their Helm repo to the `sources` Kustomization so we can use it to install the package.

```
# sources/helm/jetstack.yaml
---
apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: HelmRepository
metadata:
  name: jetstack
  namespace: flux-system
spec:
  interval: 30m
  url: https://charts.jetstack.io
```

#### CRDs

Cert Manager includes their CRDs as a collected resource in their releases, so installing them is easy with Kustomize. We need to pre-install the CRDs because we're installing a ClusterIssuer with the package, and it depends on the CRDs being present.

```
# crds/staging/cert-manager/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- https://github.com/cert-manager/cert-manager/releases/download/v1.7.1/cert-manager.crds.yaml
```

#### Base

**namespace.yaml**

We'll put Cert Manager into its own namespace.

```
# infrastructure/base/cert-manager/namespace.yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: cert-manager
```

**helmrelease.yaml**

The package installation through Helm. We'll use the same strategy of attaching `values.yaml` as an optional ConfigMap. The HelmRelease uses the `jetstack` HelmRepository we configured a few steps ago.

```
# infrastructure/base/cert-manager/helmrelease.yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: cert-manager
spec:
  chart:
    spec:
      chart: cert-manager
      sourceRef:
        kind: HelmRepository
        name: jetstack
        namespace: flux-system
  valuesFrom:
  - kind: ConfigMap
    name: cert-manager-values
    valuesKey: values.yaml
    optional: true
  interval: 1h
  releaseName: cert-manager
  targetNamespace: cert-manager
```

**self-signed.yaml**

This is the ClusterIssuer that we'll use for our Certificates. You can change this out to a different ClusterIssuer, like one for Let's Encrypt that used the HTTP01 or DNS01 challenges.

```
# infrastructure/base/cert-manager/issuers/self-signed.yaml
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: self-signed
spec:
  selfSigned: {}
```

**kustomizeconfig.yaml**

The configuration instructions for Kustomize to version our ConfigMap and Secret resources

```
# infrastructure/base/cert-manager/kustomizeconfig.yaml
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

**kustomization.yaml**

Our Kustomize instruction set

```
# infrastructure/base/cert-manager/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: cert-manager
resources:
- namespace.yaml
- helmrelease.yaml
- issuers/self-signed.yaml
configurations:
- kustomizeconfig.yaml
```

#### Staging

Our staging configuration is easy. We're not even creating a ConfigMap to override any values. All we're doing is setting the chart version.

**helmrelease.yaml**

The basic patch for the HelmRelease. This is actually academic - if we didn't have it at all, it would install the latest version of the chart, which is the same result.

```
# infrastructure/staging/cert-manager/helmrelease.yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: cert-manager
spec:
  chart:
    spec:
      version: ">=v1.7.0"
```

**kustomization.yaml**

Our Kustomize instruction set

```
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: cert-manager
bases:
- ../../base/cert-manager
patchesStrategicMerge:
- helmrelease.yaml
```

#### Commit and Push

This is a good time to add these files, commit, and push them to the repo. Flux will install Cert Manager while we're configuring our application to use it.
