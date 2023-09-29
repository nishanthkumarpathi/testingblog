---
tags: [
    'Disk Attack',
    'Disk Cleanup'
]
---

# Disk Attack Use Cases & Business Initiatives

## **Technical Use Cases**

### **Test disk capacity and throughput**

Disk attacks are often used to simulate reading or writing a large data set, such as a restored backup, replicated database, or large log file. Not only does this let teams verify disk capacity before migrating a workload, but the process of filling in disk space also impacts performance. If an application reads or writes large amounts of data, this can cause disk throughput to drop, which in turn causes application throughput to drop. A large disk attack can therefore test capacity, throughput, and concurrency simultaneously.

### **Test automatic disk cleanup, compression, and provisioning**

Teams use several automated mechanisms to add disk capacity. Automatic cleanup and compression tools can prevent disks from filling too quickly, such as[ log rotation](https://en.wikipedia.org/wiki/Log\_rotation). Some systems also provide dynamic storage provisioning (e.g.[ sharding](https://en.wikipedia.org/wiki/Shard\_\(database\_architecture\))) to dynamically increase disk capacity as demand increases. Disk quota systems limit the amount of disk space used by specific applications or processes. Disk attacks let teams test these mechanisms and ensure they work as expected.

### **Validate monitoring and alerting mechanisms**

As with other resources, teams should monitor disk usage to avoid problems caused by running out of disk space. Once you’ve set monitoring and alerting thresholds, use a disk attack to ensure that teams are notified of low capacity early enough to respond to and mitigate the issue.

## **Business Initiatives Aligned with Disk Attacks**

### **Reduce operating expenses**

Persistent storage can be particularly expensive in cloud environments, especially for faster, higher-capacity types of storage. Disk attacks let teams simulate the effect of less expensive storage devices on their workloads, which can save money without compromising performance.

### **Reduce the risk of outages**

Disk exhaustion can lead to unexpected outages. By using disk attacks to proactively test monitoring and alerting capabilities, teams can potentially eliminate disk usage as a cause of high-severity incidents and outages.

\
