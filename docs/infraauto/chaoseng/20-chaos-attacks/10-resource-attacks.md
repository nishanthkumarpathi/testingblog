---
tags: [
    'Resource Attack',
    'CPU Attack',
    'Memory Attack',
    'Disk Attack',
    'I/O Attack',
]
---
# Resource Attacks

Resource attacks generate load across computing resources including CPU, memory, and storage. This lets you prepare for sudden changes in load, validate autoscaling rules, test monitoring and alerting configurations, and make sure your systems are stable even under heavy demand.



### CPU Attacks

CPU attacks are often called the “Hello World” of Chaos Engineering, referring to introductory programming exercises that simply print the phrase “Hello World”. While CPU attacks are simple and a great starting point, unlike a “Hello World” program, they’re also extremely useful for real-world applications.

Although modern computers typically have multiple cores per CPU (and for higher-end systems and servers, multiple CPUs) in order to run multiple concurrent operations, they still have limits. These limits are easy to hit in normal, everyday operations—for example, when multiple applications compete for resources (often called the “[noisy neighbor](https://www.gremlin.com/blog/secure-chaos-engineering-on-kubernetes-clusters-without-being-a-noisy-neighbor/)” problem). CPU attacks help you ensure that your application behaves as expected even when CPU capacity is limited or exhausted. CPU attacks can also help test and validate automatic remediation processes, such as auto-scaling and load balancing.

CPU attacks can answer questions such as:

* How is the user experience impacted when CPU resources are exhausted?
* Do I have monitoring and alerting in place to detect CPU spikes?
* Do I have quotas configured to limit CPU by application/process/container?
* Do I have cleanup scripts to get rid of corrupted threads?

### Memory Attacks

Memory (or RAM, short for random access memory) is a critical resource that determines how many processes can run simultaneously on a system, as well as how much data those processes can work with at any given time. RAM is essential to both system stability and performance. While it’s possible to exhaust CPU capacity without significant consequences, exhausting RAM can cause a system to lock up, processes to close, and create significant disk activity due to [memory paging](https://en.wikipedia.org/wiki/Memory\_paging) (also known as [thrashing](https://en.wikipedia.org/wiki/Thrashing\_\(computer\_science\))).

The Memory attack consumes a set amount of RAM, either as a specific amount (in MB or GB) or as a percentage of total system memory. By purposefully consuming memory, you can test your systems to ensure they can tolerate a sudden increase in usage, and to gauge the impact on performance. Running Memory attacks can answer questions such as:

* How does application and system performance/stability degrade as memory resources become scarce?
* Do we have alerting set up to detect when memory becomes scarce? Is it working?
* How does the system handle low-memory or out-of-memory (OOM) situations? Does it crash? Does the “OOM Killer” process start closing applications?
* When the application degrades due to memory loss, is any user data lost?

### Disk Attacks

Disk space is a necessary resource for persistent data such as operating system files, database records, configuration files, and logs for troubleshooting and debugging. Disks also perform critical operational functions, such as providing swap space for virtual memory, which prevents system crashes due to out-of-memory errors. Modern systems typically use solid-state drives (SSDs) instead of more traditional hard disk drives (HDDs), but the word “disk” refers to all kinds of persistent storage.

Disk attacks will help you determine how your systems and applications behave when storage space is limited or unavailable. They can also help validate dynamic storage provisioning systems, such as [database sharding](https://en.wikipedia.org/wiki/Shard\_\(database\_architecture\)) and [persistent volumes in Kubernetes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). Disk attacks can answer questions such as:

* Do we have alerts set up to tell us when disk usage is close to capacity? Is the lead time long enough?
* When the disk is almost full, do we know how to mitigate the situation?
* Do we have mechanisms or policies in place to add capacity when we run low?
* Do our applications fail when the disk is full? Is user data lost as a result of this failure?

### I/O Attacks

Reading and writing to disks often remains the slowest part of most applications, especially when using spinning disks. As applications handle larger volumes of data and perform more operations, the increased IO (short for input/output) can have a magnifying effect on latency and even lead to timeouts and incidents. It can also impact your CPU resources.

IO attacks allow you to simulate heavy IO operations and view their effect on your applications. With this knowledge, you can build more reliable applications by optimizing your systems for faster IO (e.g. moving to SSDs), using caching mechanisms to avoid disk interactions, or performing heavy read/write operations in memory while periodically persisting to disk.

IO attacks answer questions such as:

* What happens when the application can’t write to disk due to latency? Is the user forced to wait? Do they need to resubmit their request?
* How much disk latency can the system handle before data becomes corrupt or unavailable?
* Do we have alerts in place to detect IO bottlenecks? Do we know how IO impacts other performance issues, such as high request latency?
