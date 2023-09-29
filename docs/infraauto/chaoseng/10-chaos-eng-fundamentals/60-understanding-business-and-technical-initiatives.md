# Understanding Business and Technical Initiatives

The overarching goal of Chaos Engineering is to improve the reliability of our applications and systems by testing how they handle failure. To do this, we need to take a structured and well-organized approach with clearly defined objectives and key performance indicators (KPIs). Running random experiments without any direction or oversight won’t yield actionable results and will put our systems at unnecessary risk.

To meet the high-level goal of improved reliability, we need to guide our Chaos Engineering adoption process using more granular objectives.&#x20;

We can break these objectives down into business and technical initiatives.&#x20;

### Business Initiatives

Chaos Engineering can help prevent extremely large losses in revenue and maintenance costs, create happier and more engaged engineers, improve on-call training for engineering teams, and improve the SEV (incident) Management Program for the entire company.

Common business initiatives are:

* Maximizing Uptime
* Security
* Compliance
* Preparing for Peak Traffic
* Cloud Migrations
* Cost Optimization
* Business Continuity

The executive team will be more interested in long-term business-oriented objectives, such as:

* Ensuring successful new product launches
* Avoiding costly and damaging downtime, which can drive down customer satisfaction and product usage
* Reducing the number of delayed releases due to reliability and stability problems
* Reducing the amount of maintenance work, rework and technical debt
* Increasing engineering productivity and change velocity
* Limiting the amount of downtime and time spent firefighting
* Reducing the number of on-call incidents and late night pages
* Reducing the rate of failures introduced by changes
* Increasing the speed of application migrations by proactively testing reliability



### Technical Initiatives

The insights from chaos experiments can mean a reduction in incidents, reduction in on-call burden, increased understanding of system failure modes, improved system design, faster mean time to detection for SEVs, and reduction in repeated SEVs.

Common technical initiatives are:

* Redundancy / Failover
* Validating Monitoring
* Data Integrity
* Right-sizing Infrastructure
* Autoscaling
* Load Balancing
* High Availability

The engineering team will be more interested in short-term operational objectives, such as:

* Limiting the amount of downtime and time spent firefighting
* Reducing the number of on-call incidents and late night pages
* Reducing the rate of failures introduced by changes
* Increasing the speed of application migrations by proactively testing reliability

### Objectives to Consider

When starting your Chaos Engineering journey, consider which objectives are important to your organization. These will guide the adoption process and allow you to track your progress towards greater reliability. Note that this list is by no means exhaustive, and should be taken more as a starting point.

If you’re not sure which objectives to track, think back to any incidents your organization experienced over the past year. Ask questions such as:

* What was the nature of the incident? Was it a hardware failure? A problem with a downstream dependency? An accident caused by a team member?
* What systems were affected? Did they become temporarily unavailable or go completely offline? How long did it take to restore them to normal service?
* What was the impact on customers? Did they experience downtime or data loss? Did your customer support team see a corresponding increase in tickets?
* How quickly was your response team alerted to the incident? Was it detected by an automated monitoring solution, or did someone notice it? Did you have an on-call crew ready to go, or did you need to scramble a response team?
* How long did it take to resolve the incident? Did you have any automated systems in place that resolved or mitigated the failure? Did you have to restore from a backup?
* How was the problem resolved? Was it an ad-hoc fix that only exists in production, or did you merge the fix back into your codebase? Did you document the fix?
* What organizational changes were made as a result? Was anyone blamed for the incident? Were policies implemented to prevent the problem in the future?

Focus on the questions that were either left unanswered, or that your teams struggled to answer. For example, if we had an automated monitoring system in place that failed to detect the incident and notify the on-call team, one of our objectives might be to test our alerting thresholds by reproducing the conditions leading up to the incident. Not only will this address the problem, but it teaches us more about our monitoring system and how to optimally tune our thresholds.\


### Tracking Progress Towards Objectives

To determine whether our fixes are directing us towards our objectives, we need to measure and track the internal state of our systems. We can do this using observability, which is the measure of a system’s internal behaviors based on its outputs. Gathering observability data lets us quantify different attributes of our systems such as performance, capacity, and throughput. This data is useful not just for understanding how our systems are operating in the current moment, but we can compare it against historical data to see how our systems have changed over time.

For example, if we implement a change that affects application performance, we can compare our metrics from before and after the change to quantify the impact on latency, throughput, etc. This helps us stay aligned with our objectives, avoid creating wasted effort, and provide the best value to the business.

Collecting the right metrics can be challenging. Modern systems are complex, and collecting every bit of observability data can quickly lead to information overload. Even just tracking the four golden signals—latency, traffic, error rate, and resource saturation—can be overwhelming in large systems.

Focus on collecting metrics that relate directly to your objectives. For **business-oriented objectives**, these might include metrics related to business efficiency and customer satisfaction, such as:

* Net Promoter Score (NPS) and Social Promoter Score (SPS): how satisfied customers are with our service, and how likely they are to promote us.
* Meaningful availability: how our customers perceive our service’s availability.
* Recovery Time Objective (RTO) and Recovery Point Objective (RPO): how long it takes our IT and business activities to recover after a disaster, and the amount of data we can tolerate losing in a failure.

For **engineering-oriented objectives**, focus on metrics related to application and infrastructure health, such as:

* Service Level Objectives: the target level of availability over time for our systems. These help define the standard of service that our customers should expect, and are therefore important guides for both the engineering team and the business.
* Golden signals: latency, traffic, error rate, and resource saturation.
* Mean Time Between Failures (MTBF): the average amount of time between outages. A low MTBF indicates that our systems experience frequent failure.
* Mean Time to Detection (MTTD): the average gap in time between when an incident actually starts and when we detect it. A low MTTD means we have an effective monitoring strategy in place and are quickly made aware of problems.
* Mean Time to Resolution (MTTR): the average gap in time between the start of an incident and when it’s resolved. A low MTTR means our teams are effective at detecting and resolving incidents.

\
