---
title: Access the Dashboard
tags: [
    'Traefik',
    'Dashboard',
    'Port Forwarding'
]
---

# Access the Dashboard With Port Forwarding

If you only need occasional access to a Kubernetes network resource that isn't exposed by a Service or an Ingress, then you can use port forwarding.

Port forwarding will open a tunnel through the Kubernetes API to the internal service, connecting its port to a port running on your local machine.

```
➤ kubectl -n kube-system port-forward deploy/traefik 9000:9000

Forwarding from 127.0.0.1:9000 -> 9000
Forwarding from [::1]:9000 -> 9000
```

Point a browser at [http://localhost:9000/dashboard/](http://localhost:9000/dashboard/), and you'll be taken to the Traefik Proxy dashboard.

![](https://files.cdn.thinkific.com/file\_uploads/627287/images/3d3/757/de9/traefik-dashboard.png)

The dashboard shows you information about the dynamic configuration of Traefik Proxy, starting with Entrypoints, then HTTP, TCP, and UDP Routers, Services, and Middleware, and then ending with information about enabled features and providers.

Drilling into these sections show you the connection between the components, which provider they're on, and what middleware are attached to each of them.
