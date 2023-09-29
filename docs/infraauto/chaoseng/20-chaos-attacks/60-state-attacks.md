---
tags: [
    'State Attack',
    'Process Killer Attack',
    'Shutdown Attack',
    'Time Travel Attack',
]
---

# State Attacks

State attacks change the state of your environment by terminating processes, shutting down or restarting hosts, and changing the system clock. This lets you prepare your systems for unexpected changes in your environment such as power outages, node failures, clock drift, or application crashes. Learn more about each type of attack below:

Process Killer Attack

Process killer attacks allow teams to terminate a specific process or set of processes. This is mainly done to prepare for application crashes, out of memory (OOM) events, and similar events. Teams use this attack type to answer questions such as:

* If a key process dies, such as the httpd process, what happens to our website? Does it become entirely unavailable?
* Do we have recovery mechanisms, and if so, do they detect and restart the killed process?
* When a process running an application (e.g. Tomcat) terminates, what percentage of user traffic is affected, and for how long?



Shutdown Attack

Shutdown attacks shut down (and optionally reboot) the host operating system. This is much like how [Chaos Monkey](https://www.gremlin.com/chaos-monkey/), an early Chaos Engineering tool created by Netflix, works. Shutdown attacks let teams build resilience to host failures by testing how their applications and systems behave when an instance is no longer running. This answers questions such as:

* How long does it take for an instance to restart? Does my application successfully restart when the instance comes back online?
* Does my load balancer automatically reroute requests away from the failed instance? Do I have other instances available to handle these requests?
* If a user has an active session on an instance that fails, does the session gracefully continue on a different instance?
* Is there any data loss? Are ongoing processing jobs restarted?



Time Travel Attacks

Time travel attacks allow you to change the system time. This lets you prepare for scenarios such as Daylight Savings Time (DST), clock drift between hosts, and expiring SSL/TLS certificates. Teams run these attacks to determine:

* How does our application behave if the clock skews by seconds? By minutes?
* Do we have an automated process that can handle expiring SSL/TLS certificates?
* Is any data lost or corrupted when our master and read replica databases don’t have the same timestamp?
