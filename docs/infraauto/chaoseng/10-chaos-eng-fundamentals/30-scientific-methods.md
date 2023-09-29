# Scientific Methods

### Overview of the Scientific Method

* **Observe** the System to Identify Potential Risks and Collect Baseline Data
* Form a **Hypothesis**
* **Experiment** and Test the Hypothesis
* **Analyze** the Results
* **Expand** Scope and Re-Test
* **Share** Results
* **Repeat**

### Observing the System and Identifying Potential Risks and Creating a Baseline

To measure how systems change during an experiment, it is important to understand how they behave now. This involves collecting relevant metrics from  target systems under normal load, which will provide a baseline for comparison. Using this data, you can measure exactly how much our systems change in response to the attack.

If you don't have baseline metrics, that is OK. With Gremlin you can use [Status Checks](https://www.gremlin.com/docs/scenarios/status-checks/) to automatically that your systems are available and responsive.&#x20;

If [Attack Visualizations](https://www.gremlin.com/docs/infrastructure-layer/attacks/#monitor-attacks-in-real-time) is enabled in the Gremlin web app, the Gremlin UI will automatically chart CPU utilization for CPU attacks, memory (RAM) utilization for memory attacks, and system uptime for shutdown attacks. This will also record utilization metrics immediately before and after the attack. For other metrics, use your monitoring solution of choice.

### Formulating a Hypothesis

One of the most powerful questions in Chaos Engineering is "Does this work the way I think it does?".&#x20;

Once you've got an idea how you think your system will work, think about how you would validate it. What type of failure could you inject to help you prove or disprove this hypothesis? What happens if your systems don’t respond the way you expected? You've chosen a scenario -- the exact failure to simulate -- to inject. What happens next?&#x20;

This is an excellent thought exercise to work through as a team. By discussing the scenario, you can hypothesize on the expected outcome when running in production. What will be the impact to customers, to our service or to our dependencies?

Once you have a hypothesis you’ll want to determine which metrics to measure in order to verify or disprove your hypothesis.&#x20;

It's good to have a key performance metric that correlates to customer success (such as orders per minute, or stream starts per second). **As a rule of thumb, if you ever see an impact to these metrics, you want to halt the experiment immediately.**

### Understanding the Blast Radius in Experiments

After you have formed your hypothesis, you want to look at how you can minimize your Blast Radius prior to your experiment.

The **Blast Radius** is the subset of a system that can be impacted by an attack; the worst case impact of a failed experiment. Usually measured in customer impact (i.e. 10% of customers could be impacted), but may be expressed in hosts, services, or other discrete parts of a customer’s infrastructure. When running chaos experiments, it is recommended to run the smallest version possible, limiting the blast radius, and then scaling larger over time.

You want to start with the smallest possible experiment to test in your system, from there you can expand the blast radius of your experiment.

### Setting Abort Conditions

Always have a backup plan in case things go wrong, but accept that sometimes even the backup plan can fail.&#x20;

Talk through how you’re going to revert the impact. If you’re running commands by hand, be thoughtful not to break ssh or control plane access to your instances.

One of the core aspects of Gremlin is safety. All of our attacks can be reverted immediately, allowing you to safely abort and return to steady state if things go wrong. Our agents will also immediately halt any ongoing attacks if they lose connection to the Gremlin Control Plane.

### Analyzing the Results

After running your first experiment, hopefully, there will likely be one of two outcomes: either you’ve verified that your system is resilient to the failure you introduced, or you’ve found a problem you need to fix. Both of these are good outcomes. On one hand, you’ve increased your confidence in the system and its behavior, and on the other you’ve found a problem before it caused an outage.

Make sure you have documented the experiments and results.

### Share the Results

A key outcome of Chaos Engineering is learning. Through experimentations you are learning about your systems, validating your hypotheses, and teaching your teammates.&#x20;

Sharing the results of your Chaos Engineering experiments will help other teams understand how to run their own experiments and where weaknesses in their systems are.
