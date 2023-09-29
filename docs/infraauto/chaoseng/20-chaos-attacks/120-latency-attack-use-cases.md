---
tags: [
    'Latency Attack',
    'Latency'
]
---

# Latency Attack Use Cases



**Technical Use Cases**

**Migrate to the Cloud**

Cloud environments can introduce more latency compared to on-premises data centers, especially when resources are spread out across multiple availability zones or regions. Running Latency attacks before a cloud migration can help you determine how your application will perform in a higher latency environment.

**Simulate Unstable Network Conditions and Poor Connectivity**

Modern applications are often designed with the assumption that users and cloud providers will always have stable, fast Internet connections. This isn’t always the case: cloud provider networks can become saturated, users have data caps and bandwidth limits, and users may be located far from your hosting provider.

Latency attacks can recreate these conditions and show how your systems would realistically perform in a real-world scenario. You can then optimize your application to ensure a consistently good user experience across a wide range of network conditions.

**Configure Load Balancing Rules**

Many network gateway and load balancing tools can automatically reroute traffic between nodes based on latency. For example, [Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy-latency) can route individual DNS queries to the AWS Region that gives a user the lowest latency. You can ensure this is configured correctly by running a Latency attack on a specific node, availability zone, or even an entire region, and validate that traffic is rerouted to a faster resource.

**Fine-Tune Timeout and Retry Thresholds**

Without a well-tuned timeout, users could end up waiting an unknown length of time for a response from the server. The longer your service takes to respond to a user, the more likely they are to [abandon you for a competitor](https://www.business.com/articles/website-page-speed-affects-behavior/). Timeouts ensure that requests take no more than the specified amount of time to process, and Latency attacks help you verify that this is the case.&#x20;

Retry mechanisms let you repeat requests that fail or take too long to complete. This lowers the risk of a request failing due to short-lived errors, such as a temporary network disconnection. [Like with timeouts](https://www.gremlin.com/blog/jose-esquivel-a-roadmap-towards-chaos-engineering-chaos-conf-2019/), Latency attacks let you validate that your retry mechanisms are configured and working properly.

**Test Concurrency Control**

For time-sensitive workloads such as a messaging queue or distributed database, latency can cause problems with data integrity, distributed lock management, and replication. Latency attacks let you preemptively test these mechanisms to make sure they’re resilient and won’t result in unexpected behaviors.

**Business Initiatives Aligned with Latency Attacks**

**Prepare for peak traffic events and improve the user experience**

Peak traffic events result in a significant increase in network traffic, which can lead to increased network latency. In turn, this can cause instability and increased errors. Running latency attacks lets you proactively recreate high latency events, observe and mitigate the effects of latency on your systems, and be better prepared for when they happen.

**Streamline a cloud migration**

When migrating from on-premises to a cloud platform or service, network latency becomes a performance factor. Cloud infrastructure and services communicate entirely over the network, and if your services are distributed, the amount of latency increases. Running latency attacks on-premises allows you to observe the impact of additional latency on your applications before beginning a migration.
