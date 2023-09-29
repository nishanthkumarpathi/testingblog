---
title: Deploy to Production
tags: [
    'Flux',
    'GitOps',
    'Production'
]
---

Our base and staging environments are complete, and we know that we want our production environment to replicate staging with some changes made for stability.

We're going to everything in one lesson:

1. Configure Traefik Proxy
2. Configure Cert Manager
3. Configure our demo application
4. Add the initial Flux manifests
5. Commit and push to our Git repository
6. Bootstrap Flux in production

When we complete the last step, our empty production cluster will come to life with the CRDs, infrastructure, and apps.

### Configure Traefik Proxy

Let's start with Traefik Proxy.

#### Configure the CRDs

Create the manifest for Kustomize being careful to set the CRDs path to use the same chart version that we're going to install into production. For Traefik Proxy that's `v10.14.1`.

```
# crds/production/traefik-proxy/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/ingressroute.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/ingressroutetcp.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/ingressrouteudp.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/middlewares.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/middlewarestcp.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/serverstransports.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/tlsoptions.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/tlsstores.yaml
- https://github.com/traefik/traefik-helm-chart/raw/v10.14.1/traefik/crds/traefikservices.yaml
```

#### Configure the Helm Values

This is a simulation, but we're going to pretend that we're not yet ready to approve some of the items that we've configured for Traefik Proxy in staging. For example, staging runs the new HTTP/3 extensions, which are still experimental. We'll keep those out of production for now.

Because of how Traefik Proxy handles persistent storage for its certificate store, the default configuration is to terminate the running instance before starting a new one. Because we're using Cert Manager, that doesn't apply to us. Instead we're going to change our production environment to start a new instance before terminating the old one. This will provide the best experience for people using our application.

All of these changes happen in `values.yaml`.

```
# infrastructure/production/traefik-proxy/values.yaml
---
ports:
  websecure:
    tls:
      enabled: true
providers:
  kubernetesCRD:
    allowCrossNamespace: true
    allowExternalNameServices: true
  kubernetesIngress:
    publishedService:
      enabled: true
      pathOverride: traefik-system/traefik
    allowExternalNameServices: true
rollingUpdate:
  maxUnavailable: 0
```

#### Configure the HelmRelease

Our staging environment will always update to the latest chart version automatically, but we want to pin our production environment to a specific version and only upgrade when we've tested it in staging.

```
# infrastructure/production/traefik-proxy/helmrelease.yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: traefik-proxy
spec:
  chart:
    spec:
      version: "10.14.1"
```

#### Configure Kustomize

All that remains is to configure Kustomize to load the base resources, patch them with our local ones, and create the ConfigMap for our values.

```
# infrastructure/production/traefik-proxy/kustomization.yaml
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

### Configure Cert Manager

We already know that we want our application to use TLS, so we'll add Cert Manager to production.

#### Configure the CRDs

Like above, configure Kustomize to pull the correct CRDs that match the Helm chart version we'll install below. For Cert Manager, that's `v1.7.1`.

```
# crds/production/cert-manager/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- https://github.com/cert-manager/cert-manager/releases/download/v1.7.1/cert-manager.crds.yaml
```

#### Configure the HelmRelease

Like above, we'll pin the chart to a specific version. For Cert Manager that conveniently maps to the version of the application as well. Win!

```
# infrastructure/production/cert-manager/helmrelease.yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: cert-manager
spec:
  chart:
    spec:
      version: "v1.7.1"
```

#### Configure Kustomize

Our Kustomize config is practically boilerplate.

```
# infrastructure/production/cert-manager/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: cert-manager
bases:
- ../../base/cert-manager
patchesStrategicMerge:
- helmrelease.yaml
```

### Configure Our Application

The final step for production is to deploy our application.

#### Create the Deployment

The only change between staging and production will be the color of the icon, which we'll change to white.

```
# apps/production/traefik-demo/deployment.yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: traefik-demo
spec:
  template:
    spec:
      containers:
      - name: traefik-demo
        env:
        - name: ICON_COLOR
          value: white
```

#### Create the Certificate

The only change to our certificate is the hostname. Instead of a new certificate, we could have created a single certificate with both hostnames provided in the `dnsNames` field, or we could have even used a wildcard certificate.

However, this would have created a new problem: how do we get the same Secret to both clusters?

One way to solve this is to use [kubed](https://appscode.com/products/kubed/) from [AppsCode](https://appscode.com/). Kubed can copy information like Secrets between namespaces or even between clusters and is an excellent way to replicate resources from where they're created to where you need them.

Remember to update the IP in the hostname.

```
# apps/production/traefik-demo/certificate.yaml
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: traefik-demo
spec:
  dnsNames:
  - traefik-demo.10.68.0.71.sslip.io
```

#### Create the IngressRoute

We'll start out with both IngressRoutes, with HTTP redirecting to HTTPS. We can do this because the Middleware is in the base configuration and will have already been installed as part of the `infrastructure` Kustomization.

Remember to update the IP in the URL.

```
# apps/production/traefik-demo/ingressroute.yaml
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-demo-http
spec:
  routes:
  - kind: Rule
    match: Host("traefik-demo.10.68.0.71.sslip.io")
    services:
    - name: traefik-demo
      port: 80
    middlewares:
    - name: redirect-scheme-permanent
      namespace: traefik-system
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-demo-https
spec:
  routes:
  - kind: Rule
    match: Host("traefik-demo.10.68.0.71.sslip.io")
    services:
    - name: traefik-demo
      port: 80
```

#### Create the Kustomize Configuration

We're finally ready to create our configuration for Kustomize to tie everything together.

```
# apps/production/traefik-demo/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: traefik-demo
bases:
- ../../base/traefik-demo
patchesStrategicMerge:
- deployment.yaml
- certificate.yaml
- ingressroute.yaml
```

### Add the Initial Flux Manifests

We'll take the manifests from `clusters/staging` and if necessary, change any paths that point to staging before saving them into `clusters/production`.

#### Sources

No changes are needed for this manifest.

```
# clusters/production/sources.yaml
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

#### CRDs

Change the `path` to `./crds/production`.

```
# clusters/production/crds.yaml
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
  path: ./crds/production
  prune: true
  wait: true
```

#### Infrastructure

Change the `path` to `./infrastructure/production`

```
# clusters/production/infrastructure.yaml
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
  path: ./infrastructure/production
  prune: true
```

#### Apps

Change the `path` to `./apps/production`

```
# clusters/production/apps.yaml
---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: apps
  namespace: flux-system
spec:
  interval: 10m0s
  dependsOn:
  - name: infrastructure
  sourceRef:
    kind: GitRepository
    name: flux-system
  path: ./apps/production
  prune: true
  wait: true
```

### Commit and Push to the Git Repository

Add everything to Git, commit, and push.

```
➤ git add crds/production
➤ git add infrastructure/production/
➤ git add apps/production
➤ git add clusters/production
➤ git commit -m 'add production'

[main 927ddbb] add production
 9 files changed, 112 insertions(+)
 create mode 100644 apps/production/traefik-demo/certificate.yaml
 create mode 100644 apps/production/traefik-demo/deployment.yaml
 create mode 100644 apps/production/traefik-demo/ingressroute.yaml
 create mode 100644 apps/production/traefik-demo/kustomization.yaml
 create mode 100644 clusters/production/apps.yaml
 create mode 100644 clusters/production/crds.yaml
 create mode 100644 clusters/production/infrastructure.yaml
 create mode 100644 clusters/production/sources.yaml
 create mode 100644 crds/production/cert-manager/kustomization.yaml
 create mode 100644 crds/production/traefik-proxy/kustomization.yaml
 create mode 100644 infrastructure/production/cert-manager/helmrelease.yaml
 create mode 100644 infrastructure/production/cert-manager/kustomization.yaml
 create mode 100644 infrastructure/production/traefik-proxy/helmrelease.yaml
 create mode 100644 infrastructure/production/traefik-proxy/kustomization.yaml
 create mode 100644 infrastructure/production/traefik-proxy/values.yaml

➤ git push
```

### Bootstrap Flux in Production

Although we just committed and pushed, all of the manifests that we added to the repo are in directories that no one is watching. We need to bootstrap the production cluster to use `clusters/production`, at which point it will load and deploy all of the resources we just created.

Switch your Kubernetes context and run the following command against the production cluster.

> **NOTE:** **ALWAYS** check which cluster you're connected to before running `flux bootstrap` - it can destroy an existing cluster by pointing it at the wrong manifest directory.

```
➤ flux bootstrap github \
        --personal \
        --owner=$GITHUB_USER \
        --repository=$GITHUB_REPO \
        --branch=main \
        --path=clusters/production
```

Compared to staging, this is a huge deployment. It will build out our entire cluster from scratch with the contents of the repository. On the first pass, it might show an error in the output of `flux get kustomization` about not being able to find a parent resource, but these will shake out once all the Flux components are running.

You may also see an error that it can't connect to Cert Manager. This happens because Flux has completed the `infrastructure` deployment, but the Cert Manager Pods aren't up yet. If it doesn't clear on its own, run `flux reconcile kustomization apps`, and it will resolve.

### Check the Application

Visit your application's URL in a browser, and you should see a happy gopher on a white background. Just like in staging, you can scale up the number of replicas without Flux interfering.

![](https://files.cdn.thinkific.com/file\_uploads/627287/images/448/f87/b73/traefik-demo-production.png)

### Congratulations!!! 🎉 🎊 🍾

You should be immensely proud of what you've just created. You have configured a complete environment with two Kubernetes clusters managed by Flux, with a Git repository as the source of truth.

It seems like a lot, but once you've spent some time with GitOps, you'll wonder how you ever lived without it. There is so much satisfaction that comes from having this much control over your clusters.

In the next lesson we'll talk about workflows for using GitOps successfully that ultimately result in doing less work.

Who doesn't want to do less work?
