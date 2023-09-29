---
tags: ['Chaos Engineering', 
'Chaos Engineering Fundamentals',
'Blast Radius',
'Blackhole Attack',
'DNS Attack',
'Latency Attack',
'Packet Loss Attack',
'Process Killer',
'Shutdown Attack',
'Time Travel Attack',
'CPU Attack',
'Disk Attack',
'I/O Attack',
'Memory Attack',
'State Attack',
'Network Attack',
'Resource Attack'
]
---

# Chaos Engineering Glossary



Common terms and definitions related to the practice of Chaos Engineering with Gremlin.

#### **Abort Conditions**

System conditions that indicate when we should stop a chaos experiment in order to avoid negative impact to the users. Consider SLIs, SLAs, and SLOs when setting up abort conditions, and regularly review those [conditions](https://www.gremlin.com/community/tutorials/ensuring-reliability-with-gremlin-status-checks-and-pagerduty/) to confirm that your applications are safe throughout the experiment. [Status Checks](https://www.gremlin.com/docs/scenarios/status-checks/) are a way to automate the evaluation of abort conditions during a Scenario.

#### **Attack**

An [attack](https://www.gremlin.com/docs/application-layer/attacks/) is a term for creating or injecting failure in some part of a system, such as causing networking problems or exhausting resources. Attacks are a way to test your system to better understand how they operate in dynamic environments and uncover vulnerabilities. An attack is the part of a Chaos Engineering experiment where failure is injected into the system. These are broken down into State, Resource, and Network attacks.&#x20;

* See our [Stages documentation](https://www.gremlin.com/docs/infrastructure-layer/attacks/#attack-stage-progression) for stages and possible outcomes of attacks.

#### **Attacked Target**

Any [Target](https://www.gremlin.com/docs/infrastructure-layer/targets/) that has run at least one attack. An attacked target has a unique ID per team.&#x20;

#### **Blackhole Attack**

A Gremlin attack that drops network traffic. Blackhole attacks let you simulate these outages by dropping network traffic between services. This lets you uncover hard dependencies, test fallback and failover mechanisms, and prepare your applications for unreliable networks. Blackhole attacks can answer questions such as:

* Where do dependencies exist within our system?
* Do we have monitoring in place to alert on the unavailability of each service?
* Does our application gracefully degrade if a dependency is unavailable?
* Is the user experience negatively affected when a downstream dependency is unavailable?
* Do we have dependencies that we think are non-critical, but can actually bring down our entire application?

#### **Blast Radius**

The subset of a system that can be impacted by an attack; the worst case impact of an experiment that discovers a flaw.  Blast radius is measured in percentage of users impacted, number of hosts or services, or other discrete parts of the system.&#x20;

* When running chaos experiments, it is recommended to limit the blast radius to the smallest impact possible, then scale as you gain more confidence in your systems. See also _magnitude_.

#### **Bootcamp**

A hands-on [training session](https://www.gremlin.com/bootcamps/) that covers the tools and techniques of practicing Chaos Engineering using Gremlin.

#### **Business Continuity Plan (BCP)**

Defined procedures outlining how a business will continue to operate during a disaster. BCP’s are more in depth and used along with the Disaster Recovery Plan (DRP).

#### **Chaos Commander**

This person is responsible for implementing and executing experiments using the Gremlin application.

#### **Chaos General**

This person is the decision-maker. They call the experiment schedule, decide when abort conditions are met, and otherwise own the exercise.

#### **Chaos Observer**

This person will work with the scribe to gather data and correlate the effects of the experiments using monitoring, observability, alerting tools and verifying the user experience.

#### **Chaos Scribe**

This person is responsible for recording the experiments and results on the Notes & Observation section of the Gremlin application.

#### **Chaos Champion**

Members of the global [Chaos Engineering community](https://www.gremlin.com/blog/announcing-the-gremlin-chaos-champion-program/) who are extremely active contributors and help others learn.

**Chaos Conf**

The annual Chaos Engineering community [conference](https://chaosconf.io/) hosted by Gremlin.[ ](https://chaosconf.io/)

#### **Chaos Engineer**

A practitioner of Chaos Engineering, often a Site Reliability Engineer or DevOps practitioner.

#### **Chaos Engineering**

The science of performing intentional experimentation on a system by injecting precise and measured amounts of stress to observe how the system responds for the purpose of understanding and improving the system’s resilience.

#### **Chaos Experiment**

An intentional, proactive injection of harm into a working system to test robustness for the purpose of improvement.  Chaos experiments follow the [scientific method](https://www.britannica.com/science/scientific-method) with components designed for socio-technical systems:

1. Observation of the system
2. Formulate a hypothesis
3. Inject failure
4. Analyze the data
5. Share and repeat

#### **Continuous Chaos**

Using Chaos Engineering in a CI/CD pipeline or other scheduled, automated fashion.

#### **CPU Attack**

A Gremlin attack that generates high load for one or more CPU resources. CPU attacks can help answer questions such as:

* How is the user experience impacted when CPU resources are exhausted?
* Do I have monitoring and alerting in place to detect CPU spikes?
* Do I have quotas configured to limit CPU by application/process/container?
* Do I have cleanup scripts to get rid of corrupted threads?

**Dependency**

Any independently maintained software component that is used within an application to provide features or functionality. A _hard (or tightly coupled) dependency_ is required to run the application, and any downtime will bring down the application. A _soft (or loosely coupled) dependency_ is not required, but might provide additional features that become unavailable when the dependency is unavailable.

* **internal dependencies**: dependencies owned by other developers within the same organization.&#x20;
* **external dependencies**: dependencies owned by teams, organizations, or developers outside of the organization. This includes third-party and SaaS services.
* **direct and indirect dependencies**: any dependency that a service requires in order to run. An example of direct vs indirect dependencies is;  If Service A is dependent on Service B, and Service B is dependent on Service C. Then Service A has a direct dependency on service B and an indirect dependency on service C.

#### **Disaster Recovery (DR)**

The practice of restoring an organization’s IT operations after a disruptive event, such as a natural disaster. [Disaster recovery](https://www.gremlin.com/community/tutorials/testing-disaster-recovery-with-chaos-engineering/) uses defined formal procedures (the Disaster Recovery Plan, DRP) along with the BCP for responding to major outages with the goal of bringing infrastructure and applications back online as soon as possible.&#x20;

#### **Disk Attack**

A Gremlin attack that consumes disk space. Disk attacks will help you determine how your systems and applications behave when storage space is limited or unavailable. They can also help validate dynamic storage provisioning systems, such as [database sharding](https://en.wikipedia.org/wiki/Shard\_\(database\_architecture\)) and [persistent volumes in Kubernetes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). Disk attacks can answer questions such as:

* Do we have alerts set up to tell us when disk usage is close to capacity? Is the lead time long enough?
* When the disk is almost full, do we know how to mitigate the situation?
* Do we have mechanisms or policies in place to add capacity when we run low?
* Do our applications fail when the disk is full? Is user data lost as a result of this failure?

#### **DNS Attack**

A Gremlin attack that blocks access to DNS servers. DNS attacks let you prepare for DNS outages, test your fallback DNS servers, and validate DNS resolver configurations. These attacks answer question such as:

* Do you have a secondary DNS server and do your services fallback automatically to it?
* Do you gracefully reroute calls back to the primary once it’s back online?
* How do your services behave during a major DNS outage, such as the [DynDNS](https://www.dynstatus.com/incidents/nlr4yrr162t8) or [Akamai](https://techcrunch.com/2021/07/22/a-dns-outage-just-took-down-a-good-chunk-of-the-internet/) outages?

#### **Failure Mode**

A way in which a system can fail; a cause of failure. See [FMEA definition](https://asq.org/quality-resources/fmea).

#### **FireDrill**

The process of training teams to respond to incidents, as opposed to a GameDay where teams focus on the technical outcomes within the system.&#x20;

#### **GameDay**

A specified time set aside for a team to run one or more chaos experiments and then focus on the technical outcomes.&#x20;

#### **Golden Signals**

The [four metrics](https://sre.google/sre-book/monitoring-distributed-systems/#xref\_monitoring\_golden-signals)  that should be measured in user facing systems; latency, traffic, error rate, and resource saturation.&#x20;

#### **Gremlin Agent**

Also called the _Gremlin daemon_. Our installable binary that orchestrates attacks on a host. We provide [different versions of the agen](https://www.gremlin.com/docs/infrastructure-layer/installation/)t for Linux, Windows, Docker, and Kubernetes. It works by polling the [Gremlin API](https://app.gremlin.com/api) for running attacks, and if there’s work available, invokes the failure mode(s) requested.

* In Scenarios, a [Status Check](https://www.gremlin.com/docs/scenarios/status-checks/) is a step that evaluates the health of your environment. If the Status Check fails, the Scenario will automatically halt and will record results from the run.
* In the event of a [LostCommunication error](https://www.gremlin.com/docs/infrastructure-layer/common-errors-with-solutions/), the Gremlin agent will trigger it's dead-man switch and cease all attacks.

#### **Gremlin API**

The means by which users can control and automate everything Gremlin does. Everything within Gremlin can be done via the [API](https://www.gremlin.com/docs/api-reference/examples/).

#### **Gremlin Control Plane**

The entire network (for a given organization) of all Gremlin clients connected to the Gremlin API.&#x20;

* Install the Gremlin agent on your new instance, configure its credentials, then start it up to join it to the Gremlin Control Plane.

#### **Gremlin Client**

Any unique instance of code that uses the Gremlin API, such as the Gremlin command-line client that is responsible for creating the local impact within the host. [_Gremlin client_](https://www.gremlin.com/docs/infrastructure-layer/daemon-client-overview/) is NOT a synonym for _Gremlin daemon_. The daemon is just one of many kinds of clients.

#### **Gremlin Daemon**

See _Gremlin agent_.

#### **High Availability (HA)**

The characteristic of a system which aims to ensure an agreed level of operational performance—usually uptime—for a defined period of time. In other words, ensuring systems meet operational goals for as long as possible. Traditionally this is done by using replication and redundancy to ensure operations can continue when failure occurs.

#### **Hypothesis**

As defined by [Oxford Languages](https://languages.oup.com/google-dictionary-en/): A supposition or proposed explanation made on the basis of limited evidence as a starting point for further investigation.&#x20;

* Creating a Chaos Engineering hypothesis: You have expectations based on what you know about a system and how it will react to failure injections. You have chosen the exact failure to inject. What happens next? Think through related systems such as autoscaling groups, automatic failover, monitoring and alerting. This is an excellent thought exercise to work through as a team. By discussing the scenario, you can hypothesize on the expected outcome before running it live. What will be the impact to customers, to your service, or to your dependencies?

#### **Incident**

Any unplanned degradation of service, problem, or issue that affects a customer's ability to use a product. For more information check out [this](https://response.pagerduty.com/before/what\_is\_an\_incident/) resource on incident classification and response.&#x20;

#### **IO attack**

A Gremlin attack that puts read/write pressure on input/output devices, such as storage drives. IO attacks allow you to simulate heavy IO operations and view their effect on your application. With this knowledge you can build more reliable applications by optimizing your systems for faster IO (e.g. moving to SSDs), using caching mechanisms to avoid disk interactions, or performing heavy read/write operations in memory while periodically persisting to disk. IO attacks answer questions such as:

* What happens when the application can’t write to disk due to latency? Is the user forced to wait? Do they need to resubmit their request?
* How much disk latency can the system handle before data becomes corrupt or unavailable?
* Do you have alerts in place to detect IO bottlenecks? Do you know how IO impacts other performance issues, such as high request latency?

**Latency Attack**

A Gremlin attack that adds latency to all matching egress network traffic. Latency attacks let you validate your system’s responsiveness under slow network conditions. This helps maximize the performance and responsiveness of user-facing applications, improve the throughput of backend systems, ensure messages aren’t lost, and test automatic load distribution across nodes. Latency attacks answer questions such as:

* What impact does network traffic have on latency? Do we have enough capacity to handle traffic bursts?
* How does latency impact the user experience?
* Can we reliably redistribute traffic from high latency nodes to low latency nodes?
* If there’s a high latency event, what’s our recovery time to return to a normal, real-time user experience?

**Magnitude**

How severe each attack is. For example, a CPU attack would have a different magnitude if it targeted 10% of CPU versus 20% of CPU. This is often used in conjunction with blast radius.&#x20;

#### **Memory Attack**

A Gremlin attack that consumes memory. By purposefully consuming memory, you can test your systems to ensure they can tolerate a sudden increase in usage, and to gauge the impact on performance. Running Memory attacks can answer questions such as:

* How does application and system performance/stability degrade as memory resources become scarce?
* Do we have alerting set up to detect when memory becomes scarce? Is it working?
* How does the system handle low-memory or out-of-memory (OOM) situations? Does it crash? Does it start closing applications?
* When the application degrades due to memory loss, is any user data lost?

#### **Metrics**

A method of measuring something, or the results obtained from this. To ensure you have collected the most [useful metrics](https://www.gremlin.com/community/tutorials/chaos-engineering-monitoring-metrics-guide/) for your Chaos Engineering experiments you will need to ensure you can cover the following:

* Infrastructure Monitoring metrics
* Alerting and On-Call metrics
* High Severity (SEV) metrics
* Application metrics

#### **Network Attacks**

Network Gremlins allow you to see the impact of lost or delayed traffic to your application and to test how your service behaves when you are unable to reach one of your dependencies, internal or external. Limit the impact to only the traffic you want to test by specifying ports, hostnames, and IP addresses. Network Gremlins are:

* [Blackhole](https://www.gremlin.com/docs/infrastructure-layer/attacks/blackhole)
* [Latency](https://www.gremlin.com/docs/infrastructure-layer/attacks/latency)
* [Packet Loss](https://www.gremlin.com/docs/infrastructure-layer/attacks/packetloss)
* [DNS](https://www.gremlin.com/docs/infrastructure-layer/attacks/dns)

#### **Nominal State**

Performing or achieved within expected, acceptable limits; normal and satisfactory.

#### **Observability**

A measure of how well internal states of a system can be inferred from knowledge of its external outputs.

#### **Outage**

The result of the system failing to function because of an unexpected event.

\


**Priority (e.g. P0, P1)**

How important a task, event, or issue is. Commonly used to prioritize tasks. Lower numbers are higher in priority: for example, Priority 0 (P0) means high priority, and Priority 1 (P1) is lower.

#### **Packet Loss Attack**

A Gremlin attack that introduces packet loss to all matching egress network traffic. Packet Loss attacks let you replicate this condition and simulate the end user experience when a percentage of outbound network packets are unexpectedly dropped or corrupted. Packet Loss attacks help teams validate:

* If we have packet corruption, does the user experience fail gracefully?
* Do we have any mechanisms in place for detecting and re-sending failed packets? What impact does this have on network saturation, latency and throughput?
* At what point does the system go from providing a degraded experience to failing?
* Once packet loss returns to a normal level, does the system and user experience recover?

#### **Process Killer attack**

A Gremlin attack that terminates a specified process. This is mainly done to prepare for application crashes, Out Of Memory (OOM), and similar events. Teams use the Process Killer attack to answer questions such as:

* If a key process dies, such as the httpd process, what happens to your website? Does it become entirely unavailable?
* Do you have recovery mechanisms, and if so, do they detect and restart the killed process?
* When a process running your application (e.g. Tomcat) terminates, what percentage of user traffic is affected, and for how long?

#### **Recommended Scenarios**

[Recommended Scenarios](https://www.gremlin.com/blog/introducing-scenarios/) are based on real-world outages you can run in a couple of clicks, where you can validate your systems’ ability to withstand each of them and avoid downtime in a few minutes time.

#### **Recovery Time Objective (RTO)**

Recovery time objective (RTO) is the measure of how quickly systems become operational after a failure. It is a target recovery time, or the maximum amount of time we’re willing to tolerate being down.&#x20;

#### **Recovery Point Objective (RPO)**

The recovery point objective (RPO) is the amount of data loss or data corruption that we are willing to tolerate due to an event. This is measured by the difference in time between our last backup and the time of the failure, at which point we assume that any data stored on the failed system is lost. The actual amount of data loss is measured by the recovery point actual (RPA).

#### **Reliability**

The capability of being relied on; dependability, trustworthiness. In Gremlin usage, this is how well you can trust that a system will remain available.

* Note: resilience and reliability are not interchangeable. Reliability is the outcome organizations strive for, a state where they can trust their systems.&#x20;

#### **Resilience**

The ability to recover quickly from adversity, change, or other problems in socio-technical systems. In Gremlin usage, this is how well a system recovers from degraded conditions or failures.

* Using Chaos Engineering to test your Incident Response is an example of resiliency.
* Note: resilience and reliability are not interchangeable. Reliability is the outcome, and resilience is the way you achieve that outcome. Making systems more resilient to failure results in them being more reliable.

#### **Resource Attacks**

Resource Gremlins are simple to run and understand. They reveal how your service degrades when starved of CPU, memory, IO, or disk. This lets you prepare for sudden changes in load, validate autoscaling rules, test monitoring and alerting configurations, and make sure your systems are stable even under high demand.

Types of Resource Gremlins are:

* [CPU](https://www.gremlin.com/docs/infrastructure-layer/attacks/cpu)
* [Memory](https://www.gremlin.com/docs/infrastructure-layer/attacks/memory)
* [IO](https://www.gremlin.com/docs/infrastructure-layer/attacks/io)
* [Disk](https://www.gremlin.com/docs/infrastructure-layer/attacks/disk)

#### **Robustness**

The ability to maintain operations during a disruption, failure, or incident. A robust system can keep working even in a stressful environment.

* Using Chaos Engineering to test your automated failover is an example of robustness.

#### **Runbooks**

Sometimes referred to as playbooks, these provide engineers with detailed instructions on how to restore service during or after an incident.&#x20;

#### **Scenarios**

A [Scenario](https://www.gremlin.com/docs/scenarios/overview/) is a set of [Status Checks](https://www.gremlin.com/docs/scenarios/status-checks/) and Gremlin attacks that you define with a name, description, hypothesis, and detailed results.&#x20;

* Scenarios can be used to recreate a past outage that impacted your system, or it can be used to automate a sequence of attacks to iteratively grow the blast radius of a Chaos Engineering experiment.

#### **Service**

A service is a set of functionality provided by one or more systems within an environment. Development teams are often responsible for building and maintaining individual services that other teams consume. A service running on multiple hosts is called a _distributed service_.

* In the Gremlin product, the Gremlin agent can [auto-discover services](https://www.gremlin.com/docs/infrastructure-layer/services/) running on the user's systems. Users can then view details about the service, view each service's attack history, and run experiments on the service.

#### **Service Level Objectives**

The target level of availability over time for our systems. These help define the standard of service that our customers should expect, and are therefore important guides for both the engineering team and the business.

#### **Severity**&#x20;

The degree in which an incident or outage is affecting an organization’s business metrics. Generally on a scale of Sev-0 through Sev-5, with Sev-0 being the most urgent. For information on how to establish a high severity incident management program check out [this](https://www.gremlin.com/community/tutorials/how-to-establish-a-high-severity-incident-management-program/) series.

#### **State Attacks**&#x20;

State attacks change the state of your environment by terminating processes, shutting down or restarting hosts, and changing the system clock. This lets you prepare your systems for unexpected changes in your environment such as a power outage, node failure, clock drift, or application crash.

#### **Status Checks**

A feature in the Gremlin product to automatically check and validate information from a 3rd party API. Status Checks will halt the scenario if the validation fails.

#### **Steady State**

See _Nominal State._

#### **Shutdown Attack**

The Shutdown Gremlin issues a system call to shut down or reboot the operating system on which the target is running on. This is much like how [Chaos Monkey](https://www.gremlin.com/chaos-monkey/), an early Chaos Engineering tool created by Netflix, works. Shutdown attacks let teams build resilience to host failures by testing how their applications and systems behave when an instance is no longer running. This answers questions such as:

* How long does it take for an instance to restart? Does my application successfully restart when the instance comes back online?
* Does my load balancer automatically reroute requests away from the failed instance? Do I have other instances available to handle these requests?
* If a user has an active session on an instance that fails, does the session gracefully continue on a different instance?
* Is there any data loss? Are ongoing processing jobs restarted?

#### **Target**

Any unique host or container that you can run an attack or Scenario on.

#### **Team**

Groups of users. In the Gremlin product, each company is subdivided into one or more teams, which each have a unique ID (the _team ID_). Users register their Gremlin agents to a team.

#### **Time to Acknowledge, Detect, and Recovery**

* **Time to Acknowledge (TTA)**: The time from when an alert is triggered to when an alert is acknowledged (or when work begins)
* **Time to Detection (TTD)**: The time from when an incident starts to when the first impact of the incident is visible.&#x20;
* **Time to Recovery/Resolution (TTR)**: The time between when an incident starts and when the incident is resolved.

\


**Time Travel attack**

A Gremlin attack that changes the host’s system time. Time Travel attacks let you prepare for scenarios such as Daylight Savings Time (DST), clock drift between hosts, and expiring SSL/TLS certificates. Teams run these attacks when wondering:

* How does my application behave if the clock skews by seconds? By minutes?
* Do we have an automated process that can handle expiring certificates?
* Is any data lost or corrupted when our master and read replica databases don’t have the same timestamp?
