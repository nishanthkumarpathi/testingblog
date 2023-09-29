---
tags: [
    'CPU Attack',
    'CPU Stress'
]
---

# CPU Attack Use Cases & Business Initiatives

## Technical Use Cases

### Ensure stability and performance under stress

Heavy traffic can place a high load on systems, but our systems must remain operational even when the CPU is stressed. Performance testing tools are often used to recreate heavy load, but we can use CPU attacks to create the same impact. This is also useful for preparing for noisy neighbors when migrating from a dedicated data center to a shared environment, such as a public cloud.

### Validate autoscaling and alerting mechanisms

Cloud platforms and orchestration tools can automatically scale up applications and systems to meet increased demand. In addition, monitoring and alerting tools can notify you when capacity gets low. However, it’s up to engineers to set these thresholds and configure these mechanisms. CPU attacks let you trigger scaling thresholds to make sure your applications can scale quickly and effectively, as well as trigger alerts to make sure your alerting mechanisms are configured properly. Triggering autoscaling mechanisms also lets you ensure that you can reliably migrate workloads to other nodes and load balance traffic.

### Validate resource quotas

With containers,[ resource quotas](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) limit the resources that are made available to any one container. This is useful for preventing rampant consumption caused by runaway processes, while ensuring that each container has enough resources to run effectively. CPU attacks let you test these quotas and understand how your applications respond when they exhaust their available resources. It also lets you ensure that your orchestration tool enforces quotas as expected.

## Business Initiatives Aligned with CPU Attacks

### Prepare for peak traffic events

Increasing CPU usage simulates the effects of high demand that would normally only be experienced during a high traffic event like Black Friday or Cyber Monday. CPU attacks let you safely simulate the impact of these events in a controlled environment to better prepare for them.

### Streamline cloud migrations

Before starting a cloud migration, use CPU attacks to simulate cloud conditions such as noisy neighbors on shared infrastructure, or instances with reduced CPU capacity. This will help prevent unexpected issues from arising once you start the migration process.

### Reduce operating expenses

It’s easy to over-provision CPU capacity based on expectations of production traffic, especially in a cloud environment. CPU attacks can help you measure the performance of your applications under various levels of CPU demand, giving you the necessary information to adjust capacity. Validating autoscaling also makes it possible to dynamically adjust capacity in real-time, further reducing costs.
