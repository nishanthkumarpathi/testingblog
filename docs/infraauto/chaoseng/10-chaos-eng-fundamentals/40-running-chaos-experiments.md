# Running Chaos Experiments

### Start with a Hypothesis

Start with a hypothesis stating the question that you’re trying to answer, and what you think the result will be. For example, if your experiment is to test whether your web server can handle increased load, your hypothesis might state that “as CPU usage increases, request throughput remains consistent.”

### Define Your Blast Radius

The blast radius includes any and all components affected by the test. A smaller blast radius will limit the potential damage done by the test. We strongly recommend you start with the smallest blast radius possible. Once you are more comfortable running chaos experiments, you can increase the blast radius to include more components.

### Run the Experiment

Make sure you have a way to stop the experiment and revert any changes it introduced before you begin the experimentation process.

### Analyze the Data

Does it confirm or reject your hypothesis? Use the results to address failure points in your systems and refine your experiment.

### Share the Results

Once you have completed your experiments and analyzed the data, share your results, and the failures widely in the organization. Sharing the results allows the organization to understand how using Chaos Engineering practices leads to more reliable systems by either validating a hypothesis or discovering a potential failure.

