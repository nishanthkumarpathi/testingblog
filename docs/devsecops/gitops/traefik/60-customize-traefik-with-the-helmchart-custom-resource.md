---
tags: [
    'Traefik',
    'Helm',
    'HelmChart',
    'HelmChartConfig',
    'HelmChartConfigResource',
]
---


# Customize Traefik With the HelmChart Custom Resource

K3s installs Traefik Proxy by placing a manifest into `/var/lib/rancher/k3s/server/manifests`. This file contains a HelmChart resource that installs the version of Traefik Proxy that ships with the particular installed version of K3s.

If you wish to modify Traefik, you have two options:

1. Modify the existing installation with a HelmChartConfig resource. When you do this, you need to stay within the range of Helm options and CRDs for the particular version of Traefik Proxy that K3s installed.
2. Instruct K3s to disable Traefik Proxy and install your own version.

The second option is cleaner, and that's what you'll learn how to do in this lesson. You'll discover some "gotchas" that might have caught you by surprise!

### Why Can't I Just Update Traefik?

The K3s project uses a custom installation of Traefik Proxy. This might be because of the SLA that SUSE provides for its customers who run K3s, or it might be related to K3s installations in air-gapped environments.

The manifest file located in `/var/lib/rancher/k3s/server/manifests` installs Traefik in two parts: the CRDs and the application. The chart information for these two components is stored locally, in `/var/lib/rancher/k3s/server/charts`, which means that if you want to upgrade to a new version, your workflow looks something like this:

1. Clone the Traefik Helm repo to your local machine
2. Extract the CRDs from the chart
3. Create a tarball of the CRDs
4. Create a tarball of the application
5. Match version numbers of both tarballs to the version of the chart
6. Upload both to your K3s cluster
7. Update the server manifest to point to your new chart

If you don't perform these steps to update the CRDs, then options available in newer versions of the Traefik Proxy application won't match to the installed CRDs.

This is a lot of work, and it's far easier to simply remove Traefik and install it via Helm.

### Remove the Default Traefik Proxy From K3s

To remove Traefik Proxy, you can perform one of the following.

#### If You Use k3sup

You can re-run your installation command with `--disable traefik` to disable Traefik Proxy.

#### If You Use the cURL Command

K3s offers [several different ways](https://rancher.com/docs/k3s/latest/en/installation/install-options/how-to-flags/#example-b-install-k3s-exec) to configure the installation, either with flags or environment variables. The easiest is to append `--disable traefik`:

```
curl -sfL https://get.k3s.io | sh -s - --disable traefik
```

#### The Easy Way

If K3s is already running, you can edit `/etc/systemd/system/k3s.service` and add the flags to disable Traefik Proxy in the `ExecStart` block.

```
ExecStart=/usr/local/bin/k3s \
    server \
        # other values here
        '--disable' \
        'traefik' \
```

This is the output of the two methods shown above, and you may find it faster to do it yourself. After making the edits and saving this file, run the following two commands:

```
systemctl daemon-reload
systemctl restart k3s
```

K3s will restart and disable and uninstall Traefik Proxy.

### Something To Watch Out For

When you disable Traefik Proxy in K3s, it continues to monitor for the file `/var/lib/rancher/k3s/server/manifests/k3s/traefik.yaml`, and if it appears, K3s will delete it. This is because it thinks that file is part of its own internal Traefik install process, and since Traefik Proxy is disabled, that file should not be present.

If you reinstall via the manifests directory, as we'll do in a moment, name the file anything other than `traefik.yaml`.

### Reinstall Traefik Proxy

You can reinstall it via the `helm` command, or via GitOps if you're set up for that. Since we're showcasing the unique features of K3s, we'll reinstall it via a HelmChart. When we do this, we'll also activate some of the newest features in Traefik Proxy.

This manifest points to a specific version of the Helm chart, which will install Traefik Proxy 2.5.4. Paste this into `/var/lib/rancher/k3s/server/manifests/traefik-helm.yaml` on your K3s cluster, and then watch the output of `kubectl get po -w -n kube-system` and wait for the install to complete.

```
---
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: traefik
  namespace: kube-system
spec:
  repo: https://helm.traefik.io/traefik
  chart: traefik
  version: 10.9.0
  set:
    global.systemDefaultRegistry: ""
  valuesContent: |-
    experimental:
      http3:
        enabled: true
      plugins:
        enabled: true
    rollingUpdate:
      maxUnavailable: 0
    rbac:
      enabled: true
    ports:
      websecure:
        tls:
          enabled: true
        http3: true
    podAnnotations:
      prometheus.io/port: "8082"
      prometheus.io/scrape: "true"
    providers:
      kubernetesCRD:
        allowCrossNamespace: true
        allowExternalNameServices: true
      kubernetesIngress:
        publishedService:
          enabled: true
    priorityClassName: "system-cluster-critical"
    tolerations:
    - key: "CriticalAddonsOnly"
      operator: "Exists"
    - key: "node-role.kubernetes.io/control-plane"
      operator: "Exists"
      effect: "NoSchedule"
    - key: "node-role.kubernetes.io/master"
      operator: "Exists"
      effect: "NoSchedule"'
```

Check the version of Traefik Proxy:

```
➤ kubectl get deploy traefik -n kube-system -o jsonpath='{.spec.template.spec.containers[0].image}'

traefik:2.5.4
```

Edit `traefik-helm.yaml` and change the `version` tag to `10.14.1`. This will upgrade Traefik Proxy to version 2.6.0.

```
sed -i 's/10.9.0/10.14.1/' traefik-helm.yaml
```

Watch the output of `kubectl get po -w -n kube-system`. K3s will detect the change in your file and perform a Helm upgrade to the application. When it completes look at the version again:

```
➤ kubectl get deploy traefik -n kube-system -o jsonpath='{.spec.template.spec.containers[0].image}'

traefik:2.6.0
```

### How Can You Find the Chart Version?

To find the chart version, look at the [Traefik Helm chart repository](https://github.com/traefik/traefik-helm-chart/), and view the list of available tags under the branch selector.

![](https://files.cdn.thinkific.com/file\_uploads/627287/images/d12/162/109/chart-version-tags.png)

Helm chart versions don't directly correspond to application versions. Traefik Proxy defaults to installing the version specified in `appVersion` in `Chart.yaml`, so if that hasn't changed, look at the commit history to see if the changes affect your deployment before upgrading.

### What Features Did We Just Enable?

Traefik Proxy is constantly under development, so features will appear in the Traefik Labs Helm chart before they will appear in the K3s release. We just enabled the following features:

* HTTP/3 support
* Start a new Traefik Proxy Pod before stopping the old one
* Permit CRD usage across namespaces (great for reusing Middleware)
* Permit the use of ExternalNameServices

### Conclusion

You now know how to customize the installation of Traefik Proxy in your K3s environment and how to keep it updated by using the HelmChart CRD. This is powerful stuff! How will you start using it? I have some ideas for you in the next lesson.
