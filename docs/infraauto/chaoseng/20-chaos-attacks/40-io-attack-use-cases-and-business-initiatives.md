# I/O Attack Use Cases and Business Initiatives

## **Technical Use Cases**

### **Prepare for a storage migration**

Changing storage devices can have a significant impact on latency. SSD and NVMe devices are much faster than traditional drives (HDDs), but cost more, especially in a cloud environment. Migrating to the cloud also often means migrating data to higher-latency storage solutions, such as network attached storage or storage services. Each storage location has a different number of[ IOPS](https://en.wikipedia.org/wiki/IOPS) (input/output operations per second), which affects application performance.

An IO attack can help you prepare for slower storage solutions by simulating their performance. This lets you measure the impact of slow storage on the user experience and determine the cost benefit of faster storage devices before starting a migration.

### **Test disk-heavy workloads**

Some applications require frequent or heavy disk access, such as databases. Heavy IO operations can also impact CPU and RAM usage, creating unintended side effects for applications and systems. IO attacks let you simulate these applications and operations, and observe their impact on your systems.

### **Validate the effectiveness of a cache**

Caches such as Redis can reduce IO activity by storing some data in memory. Some systems also use[ delayed write caching](https://www.thewindowsclub.com/enable-disable-disk-write-caching-windows-7-8) to temporarily store data in memory before writing to disk in order to increase performance. With an IO attack, you can validate the effectiveness of a cache by stressing the underlying disk and measuring the responsiveness of your application. If the application and cache are configured properly, there should be little to no impact on performance.

Caching can also protect you from storage that fails or becomes unavailable. For example, a [cloud storage device failure](https://www.bleepingcomputer.com/news/technology/amazon-aws-outage-shows-data-in-the-cloud-is-not-always-safe/) led to data being unavailable and in some cases lost. Using an IO attack won’t cause a disk failure, but it can simulate an unavailable disk by consuming all available IOPS and making the disk unresponsive. This lets you prepare for unexpected disk outages and ensure your cache is working effectively.

## **Business Initiatives Aligned with I/O Attacks**

### **Prepare for peak traffic events**

During a peak traffic event like Black Friday or Cyber Monday, disk-heavy services like product catalogs and order fulfillment will need to write more data to disk, reducing throughput. Running an IO attack can simulate this effect so teams can better prepare for high demand in production.

### **Improve the end user experience**

Disk latency can have an impact on the user experience (UX). Testing application performance during an IO attack can pinpoint areas of latency and allow application developers to better optimize the application.

### **Streamline new product launches**

High-bandwidth services like media streaming and file sharing applications often require high disk throughput. When preparing to launch these and similar services, use IO attacks to ensure that your services are stable and performant in periods of high demand.
