---
title: Secure the Application
tags: [
    'Traefik',
    'TLS',
    'HTTPS',
    'HTTP',
    'Redirect',
    'Middleware',
    'Certificate',
    'IngressRoute',
    'ClusterIssuer',
    'Lets Encrypt',
    'Cert Manager'
]
---

With Cert Manager and a ClusterIssuer in place, we're ready to secure our application with the following steps:

1. Add a Middleware to redirect HTTP to HTTPS
2. Add a Certificate
3. Update the IngressRoute
   1. Use the Middleware for HTTP
   2. Add a new IngressRoute for HTTPS

### Create the Middleware

Redirecting HTTP to HTTPS uses the [RedirectScheme](https://doc.traefik.io/traefik/middlewares/http/redirectscheme/) middleware. This is such a common activity that I like to put it in a central location, usually alongside Traefik Proxy itself. For this class, that's in the `traefik-system` namespace.

#### Create the Middleware Directory

```
➤ mkdir infrastructure/base/traefik-proxy/middleware
```

#### Add the Middleware Manifest

This file contains two manifests, one for each type of redirect: temporary and permanent.

```
# infrastructure/base/traefik-proxy/middleware/redirect-scheme.yaml
---
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: redirect-scheme-permanent
  namespace: traefik-system
spec:
  redirectScheme:
    scheme: https
    permanent: true
---
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: redirect-scheme-temporary
  namespace: traefik-system
spec:
  redirectScheme:
    scheme: https
    permanent: false
```

#### Update the Kustomization Manifest

I'm pasting the complete file below, but you only need the line that adds the middleware to the `resources` key.

```
# infrastructure/base/traefik-proxy/kustomization.yaml
---
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: traefik-system
resources:
- namespace.yaml
- helmrelease.yaml
- middleware/redirect-scheme.yaml
configurations:
- kustomizeconfig.yaml
```

### Add a Certificate

We've added the self-signed ClusterIssuer already. When we add a Certificate resource that references the issuer, Cert Manager will generate the certificate and store it in the Secret that we point to in the manifest.

#### Create the Base Configuration

Like other base configurations, this holds the common components for the resource. Specific components, like the `dnsNames` attribute, will be patched in for each environment.

```
# apps/base/traefik-demo/certificate.yaml
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: traefik-demo
spec:
  issuerRef:
    kind: ClusterIssuer
    name: self-signed
  secretName: traefik-demo-crt
```

Update `kustomization.yaml` to include the Certificate.

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
- certificate.yaml
```

#### Create the Staging Configuration

Any data that you need to override for the staging environment goes into its directory. For our self-signed certificate, that's only the `dnsNames` key. Of course, self-signed certificates aren't the correct solution for a production environment, and they have [some caveats](https://cert-manager.io/docs/configuration/selfsigned/#caveats).

If you're running in an environment that can't use certificates from LetsEncrypt (even with the DNS01 challenge type), consider creating your own CA with [Hashicorp Vault](https://learn.hashicorp.com/tutorials/vault/pki-engine) or your own [internal private CA](https://cert-manager.io/docs/configuration/selfsigned/#bootstrapping-ca-issuers) that you've bootstrapped with cert-manager.

> **NOTE:** Remember to update the DNS name in the manifest below to match the hostname you're using in the IngressRoute for your environment.

```
# apps/staging/traefik-demo/certificate.yaml
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: traefik-demo
spec:
  dnsNames:
  - traefik-demo.10.68.0.70.sslip.io
```

Update `kustomization.yaml` to include the Certificate.

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
- certificate.yaml
- ingressroute.yaml
```

### Update the IngressRoute

With both the Middleware and the Certificate in place, we want to create an IngressRoute for HTTPS and also tell Traefik Proxy to redirect HTTP to it.

#### Update the Base Configuration

Like we did before, we'll start by adding the base configuration before patching in the Route information in the staging overlay.

```
# infrastructure/base/traefik-demo/ingressroute.yaml
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-demo-http
spec:
  entryPoints:
  - web
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-demo-https
spec:
  entryPoints:
  - websecure
  tls:
    secretName: traefik-demo-crt
```

#### Update the Staging Configuration

Update `ingressroute.yaml` for the staging environment to look like the following example. Remember to change the URL to fit your environment.

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
    match: Host("traefik-demo.10.68.0.70.sslip.io")
    services:
    - name: traefik-demo
      port: 80
```

#### Should It Be a Temporary or Permanent Redirect?

Many sites on the Internet tell you to always use a permanent redirect (a 301 or 308). What they don't tell you is that a permanent redirect is exactly what you'd expect: _permanent_.

When a browser receives a permanent redirect, it caches it **forever**, and it never checks with the origin site again to see if the redirect changed. For something like a redirect from HTTP to HTTPS or a redirect from an old blog slug to a new one, that's the right solution. For other things, like a URL shortener where the target might change in the future, or anything else where the target might change, a temporary redirect is better.

The only way to update a cached permanent redirect is to drop the browser cache, and if you don't have a way to communicate with a visitor that's still being sent to the wrong destination, how can you tell them to drop the cache to resolve it?

This doesn't mean that you should use a temporary redirect either. It only means that you shouldn't _blindly_ choose one or the other without considering if the outcome is what you truly want.
