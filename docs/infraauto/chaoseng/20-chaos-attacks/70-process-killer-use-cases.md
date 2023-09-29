---
tags: [
    'Process Killer Attack',
]
---

# Process Killer Use Cases



**Technical Use Cases**

**Testing Automatic Restarts**

Watchdog processes like systemd can automatically detect and restart failed processes. Container orchestrators like Kubernetes perform a similar function by detecting and restarting failed containers. Process killer attacks can confirm that:

* The watchdog is properly configured to detect and restart the killed process.
* The detection threshold is low enough to prevent lengthy outages.
* The process successfully restarts with no data loss or corruption.

\


**Test Leader Re-Election for Clustered Workloads**

Clustered workloads like Kafka or Kubernetes require one or more nodes to act as leaders in order to maintain a consistent cluster state. If a leader fails, another node is automatically elected as the new leader. We can ensure this process works as expected by running a process killer attack on the Kafka or Kubernetes process on a node, then validating that a new leader is elected and that cluster state is maintained.

**Business Initiatives Aligned with Process Killer Attacks**

Process killer attacks help teams maximize the availability of a service. Teams can use process killer to test automatic recovery processes and ensure that services continue operating without disrupting the user experience. Not only does this reduce downtime, but it reduces the risk of a poor user experience.
