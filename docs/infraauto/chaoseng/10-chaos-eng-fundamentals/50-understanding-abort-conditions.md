# Understanding Abort Conditions

Safety is one of the most important factors when running Chaos Engineering experiments. This is why we start small and limit the blast radius.&#x20;

Beyond the blast radius, you should always have abort conditions defined for your experiments.&#x20;

**Abort Conditions** are system conditions that indicate when we should stop a chaos experiment in order to avoid accidental damage. ([Status Checks](https://www.gremlin.com/docs/scenarios/status-checks/) are a way to automate abort conditions during a Scenario).

It is important to set your abort conditions prior to your experiment, consider Netflix for example. At Netflix a key metric is the number of videos that users across the entire site begin watching in a given second, known as stream starts per second. When Netflix teams are running chaos experiments, if they see this drop, that is when they may halt the experiment.

Think about what your abort conditions are, keep it somewhat simple. If you have fifteen key metrics, that is too many.&#x20;

When defining abort conditions, think about the customer experience. What are the factors you will look at to determine if the customer experience is degrading? Incorporate those factors into your abort conditions.
