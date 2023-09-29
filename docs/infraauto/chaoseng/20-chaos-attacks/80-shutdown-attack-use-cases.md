---
tags: [
    'Shutdown Attack',
]
---

# Shutdown Attack Use Cases



**Technical Use Cases**

**Ensuring Workloads Migrate Successfully**

When a clustered node starts its shutdown process, applications and services running on it should automatically migrate to a healthy instance. This maximizes uptime and availability, while also reducing the risk of data loss or corruption. You can use shutdown attacks to ensure that:

* Applications and services halt on the target instance and are automatically replicated to healthy instances.
* Any active connections or user sessions are closed without interrupting service.
* Load balancers automatically route traffic away from the terminated instance.

**Validating High Availability of Clustered Workloads**

Clustered systems such as Kubernetes and Kafka are designed to handle node failures, but it’s important to validate that these mechanisms behave as expected. There are situations where losing a node can cause complex problems. For example, losing more than half of the nodes in a cluster can cause cluster state to diverge between the remaining nodes, resulting in an inconsistent view or “split brain.” We can use a shutdown attack to halt one or more nodes and ensure that the cluster continues to operate without entering a split brain.

**Validating Automatic Node Restarting or Replication**

Nodes can automatically restart for a number of reasons including operating system updates, scheduled reboots, or requests from the cloud platform. Using shutdown attacks lets you recreate these scenarios to ensure that you can tolerate an unexpected shutdown or reboot of a node. This lets you:

* Test mechanisms in your cloud platform to detect and address shutdown nodes.
* Measure how long it will take to restart a failed instance as part of capacity planning.
* Determine the cost-effectiveness of using short-lived instances.

**Business Initiatives Aligned with Shutdown Attacks**

Like process killer attacks, shutdown attacks help teams maximize uptime by ensuring that automatic replication and failover processes are functioning correctly. This lets teams mitigate interruptions in service and provide a strong customer experience. In addition, shutdown attacks can help you right-size your infrastructure by simulating the use of less expensive, short-lived cloud instances.
