---
title: Deploy the Application
tags: [
    'Flux',
    'GitOps',
    'Application'
]
---



We're going to deploy `monachus/traefik-demo` as our application. It will show a colored block for every Pod in the Deployment, and it has a number of options that we can configure via environment variables. We'll only focus on one, `ICON_COLOR`, which will give us a different color in staging and production.

You can learn more about this demo application from [GitHub](https://github.com/oskapt/traefik-demo) or [Docker Hub](https://hub.docker.com/r/monachus/traefik-demo).

### Make the Directories

We need to create `traefik-demo` in the `apps` directory for the base and our two environments.

```
mkdir -p apps/{base,staging,production}/traefik-demo
```

### Configure the Base Manifests

Start off like we did with Traefik Proxy in the `infrastructure` directory, first creating a base and then extending it to the staging environment with overrides.

Create each of the following files in their corresponding location in your directory.

#### namespace.yaml

This creates the Namespace into which our application will be installed. We're using `traefik-demo`.

```
# apps/base/traefik-demo/namespace.yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: traefik-demo
```

#### deployment.yaml&#x20;

This performs the installation of the application.

```
# apps/base/traefik-demo/deployment.yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: traefik-demo
  name: traefik-demo
spec:
  selector:
    matchLabels:
      app: traefik-demo
  template:
    metadata:
      labels:
        app: traefik-demo
    spec:
      containers:
      - image: monachus/traefik-demo
        name: traefik-demo
        ports:
        - containerPort: 8080
        livenessProbe:
          initialDelaySeconds: 10
          periodSeconds: 5
          httpGet:
            path: "/"
            port: 8080
```

#### service.yaml

This creates a ClusterIP service and maps port 80 to 8080 in the container.

```
# apps/base/traefik-demo/service.yaml
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: traefik-demo
  name: traefik-demo
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8080
  selector:
    app: traefik-demo
```

#### ingressroute.yaml

This creates an IngressRoute resource on port 80. The base template doesn't include any rules. Those will be added by the staging and production patches.

```
# apps/base/traefik-demo/ingressroute.yaml
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-demo-http
spec:
  entryPoints:
  - web
```

#### kustomization.yaml

This is the instruction set for Kustomize itself.

```
# apps/base/traefik-demo/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: traefik-demo
resources:
- namespace.yaml
- deployment.yaml
- service.yaml
- ingressroute.yaml
```

### Configure the Staging Environment

Configure the staging resources by copying these files to their corresponding locations.

#### deployment.yaml

This adds an `env` key which sets the `ICON_COLOR` to blue.

```
# apps/staging/traefik-demo/deployment.yaml
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
          value: blue
```

#### ingressroute.yaml

Here we add the Rule to the ingressroute. Be sure to edit the Host information to change the IP to the IP of your staging cluster.

```
# apps/staging/traefik-demo/ingressroute.yaml
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-demo-http
spec:
  routes:
  - kind: Rule
    match: Host("traefik-demo.10.68.0.70.sslip.io")
    services:
    - name: traefik-demo
      port: 80
```

#### kustomization.yaml

We'll pull in the base configuration and then patch the resources with our local manifests.

```
# apps/staging/traefik-demo/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: traefik-demo
bases:
- ../../base/traefik-demo
patchesStrategicMerge:
- deployment.yaml
- ingressroute.yaml
```

### Cluster Config

Add the `apps` Kustomization below into the `clusters/staging` directory. Note that it depends on the `infrastructure` Kustomization, which ensures that if we brought all of this up at once, we'd get the CRDs, Traefik Proxy, and then the applications.

```
# clusters/staging/apps.yaml
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
  path: ./apps/staging
  prune: true
  wait: true
```

### Add, Commit and Push

Add these files, commit them to the repo, and then push them out to the remote. Wait for it to reconcile (or trigger it), and you should see the application deploy into `traefik-demo`.

> **PRO TIP:** This is one of those times where you're reconcile `flux-system` so that it picks up the new `apps` Kustomization.

Once Flux is done, you should see `apps` in the output of `flux get kustomization`:

```
➤ flux get kustomization
NAME            READY MESSAGE                         REVISION      SUSPENDED
sources         True  Applied revision: main/4a1f097  main/4a1f097  False
crds            True  Applied revision: main/4a1f097  main/4a1f097  False
flux-system     True  Applied revision: main/4a1f097  main/4a1f097  False
infrastructure  True  Applied revision: main/4a1f097  main/4a1f097  False
apps            True  Applied revision: main/4a1f097  main/4a1f097  False
```

If you reach out to the URL you set in the ingressroute, you should see the Traefik gopher load on a blue background.

If you want to see Kubernetes load balancing in action, you can scale up the Deployment to more than one replica.

```
➤ kubectl scale deploy/traefik-demo --replicas=3 -n traefik-demo

deployment.apps/traefik-demo scaled
```

![](https://files.cdn.thinkific.com/file\_uploads/627287/images/50e/69e/3a0/traefik-demo-staging.png)

Because the `replicas` field isn't in Git, Flux won't try to change it to a different value during reconciliation. It only enforces the portions of the configuration that are in the repository.

### Check Your Directory Structure

Your repository should now look like this:

```
➤ tree .
.
├── apps
│   ├── base
│   │   └── traefik-demo
│   │       ├── deployment.yaml
│   │       ├── ingressroute.yaml
│   │       ├── kustomization.yaml
│   │       ├── namespace.yaml
│   │       └── service.yaml
│   ├── production
│   │   └── traefik-demo
│   └── staging
│       └── traefik-demo
│           ├── deployment.yaml
│           ├── ingressroute.yaml
│           └── kustomization.yaml
├── clusters
│   ├── production
│   └── staging
│       ├── apps.yaml
│       ├── crds.yaml
│       ├── flux-system
│       │   ├── gotk-components.yaml
│       │   ├── gotk-sync.yaml
│       │   └── kustomization.yaml
│       ├── infrastructure.yaml
│       └── sources.yaml
├── crds
│   ├── production
│   │   └── traefik-proxy
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
