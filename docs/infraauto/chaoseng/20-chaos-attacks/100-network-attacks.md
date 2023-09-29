---
tags: [
    'Network Attack',
    'DNS Attack',
    'Blackhole Attack',
    'Latency Attack',
    'Packet Loss Attack'
]
---

# Network Attacks

Network attacks let you simulate unhealthy network conditions including dropped connections, high latency, packet loss, and DNS outages. This lets you build applications that are resilient to unreliable network conditions. Learn more about each of the different Network Attacks below:



Blackhole Attacks

Applications often have many dependencies (both known and unknown) to downstream systems and services. Although our systems are becoming increasingly dependent on networks, we can’t guarantee network availability at all times. This forces us to think of ways to proactively compensate for situations where dependencies are unavailable or unreachable. Blackhole attacks let you simulate these outages by dropping network traffic between services. This lets you uncover hard dependencies, test fallback and failover mechanisms, and prepare your applications for unreliable networks.

Blackhole attacks can answer questions such as:

* Where do dependencies exist within our system?
* Do we have monitoring in place to alert on the unavailability of each service?
* Does our application gracefully degrade if a dependency is unavailable?
* Is the user experience negatively affected when a downstream dependency is unavailable?
* Do we have dependencies that we think are non-critical, but can actually bring down our entire application?



DNS Attacks

The Domain Name System (DNS) is a system for naming computers, services, and other resources connected to a network, such as the Internet or a private network. DNS associates domain names with IP addresses, allowing resources to reference each other using names instead of addresses.

The DNS attack simulates a DNS outage by blocking network access to DNS servers. This lets you prepare for DNS outages, test your fallback DNS servers, and validate DNS resolver configurations. This answers question such as:

* Do you have a secondary DNS server and do your services fallback automatically to it?
* Do you gracefully reroute calls back to the primary once it’s back online?
* How do your services behave during a major DNS outage, such as the [DynDNS](https://www.dynstatus.com/incidents/nlr4yrr162t8) or [Akamai](https://techcrunch.com/2021/07/22/a-dns-outage-just-took-down-a-good-chunk-of-the-internet/) outages?



Latency Attacks

Latency is the amount of time taken for a network request to travel from one network endpoint to another. A number of factors can affect latency including the physical distance between endpoints, the number of routers and switches, the maximum throughput of the connection, and the speed at which both devices can process network data. With user-facing services like websites, lower latency contributes to faster load times, which has a [positive impact on user experience and conversion rates](https://blog.hubspot.com/marketing/page-load-time-conversion-rates).

The Latency attack injects a delay into outbound network traffic, letting you validate your system’s responsiveness under slow network conditions. This helps maximize the performance and responsiveness of user-facing applications, improve the throughput of backend systems, ensure messages aren’t lost, and test automatic load distribution across nodes. Latency attacks answer questions such as:

* What impact does network traffic have on latency? Do we have enough capacity to handle traffic bursts?
* How does latency impact the user experience?
* Can we reliably redistribute traffic from high latency nodes to low latency nodes?
* If there’s a high latency event, what’s our recovery time to return to a normal, real-time user experience?



Packet Loss Attacks

Streaming services, such as live video or multiplayer gaming, rely on a high throughput of data.

When a network becomes congested, packets may become queued, and if the queue becomes too large, packets can be lost or dropped due to capacity thresholds on your hardware. Packet Loss attacks let you replicate this condition and simulate the end user experience when a percentage of outbound network packets are unexpectedly dropped or corrupted. Packet Loss attacks help teams validate:

* Do we have any mechanisms in place for detecting and re-sending failed packets? What impact does this have on network saturation, latency and throughput?
* If we have packet corruption, does the user experience gracefully degrade, or does it fail?
* At what point does the system go from providing a degraded experience to failing?
* Once packet loss returns to a normal level, does the system and user experience recover?
