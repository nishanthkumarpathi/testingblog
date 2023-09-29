# Understanding Scenarios

A [Scenario](https://www.gremlin.com/docs/scenarios/overview/) is a set of [Status Checks](https://www.gremlin.com/docs/scenarios/status-checks/) and Gremlin [attacks](https://www.gremlin.com/docs/infrastructure-layer/attacks/) that you define with a name, description, hypothesis, and detailed results. Once created and configured, a Scenario is run through a sequence of attacks with an expanding blast radius (number of hosts included in the attack) and magnitude (intensity of the attack). After each run of a Scenario, you can easily record your observations as well as edit the Scenario to expand the blast radius and magnitude to iterate on the experiment.

Scenarios can be used to recreate a past outage that impacted your system, or it can be used to automate a sequence of attacks to iteratively grow the blast radius of a Chaos Engineering experiment.

Scenarios allow you to link attacks together, growing both the blast radius and magnitude over time. Once created, these Scenarios become a shareable resource for your team, complete with a name, description, hypothesis, and a place to record your notes and observations.&#x20;

With Scenarios, users can create a sequence of attacks and increase the blast radius and magnitude.&#x20;

Inside Gremlin you will also find Recommended Scenarios, these are based on real-world outages, which allow for validation of a systems' ability to withstand each of the scenarios and avoid costly downtime.&#x20;

[Recommended Scenarios ](https://app.gremlin.com/scenarios/recommended)guide you through Chaos Engineering experiments to be sure that your application is reliable despite resource constraints, unreliable networks, unavailable dependencies, and more, preventing these types of outages from affecting your business and your customers.

After creating, running, and adding results to a Scenario you can, schedule it to run on an on-going basis to verify the results of your Scenario and prevent drifting into failure. Select the days of the week you would like it to run, the maximum number of times it can run, and the time window in which it can run.
