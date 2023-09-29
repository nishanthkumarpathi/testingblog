# GameDays

GameDays

GameDays were coined by Jesse Robbins when he worked at Amazon and was responsible for availability. Jesse created GameDays with the goal of increasing reliability by purposefully creating major failures on a regular basis. They also help facilitate the value of [Chaos Engineering](https://www.gremlin.com/community/tutorials/chaos-engineering-the-history-principles-and-practice/). Typically, a GameDay would run between 2-4 hours, and involve a team of engineers who either develop an application, or support it, but ideally it involved members from both sides of an application. To help with your first GameDay, this is a general workflow of what a GameDay would look like, starting with activities leading up to the GameDay, and ending with a recap and reflection section afterwards.

GameDay Preparation: : Ahead of any GameDay, preparation work is equally important to the activities that will happen at the GameDay itself. In preparation, we would gather the following information:

Ahead of any GameDay, preparation work is equally important to the activities that will happen at the GameDay itself. In preparation, we would gather the following information:

Target:

1. In any GameDay, an exact target or targets should be specified. Without it, it’s impossible to bring in the right people to run and observe the GameDay. It could be as simple as “Cassandra cluster” or “Inventory service” in which case at least those that either run or use the service can make a decision whether they can or want to attend.

Time and Place

Quite often a skipped over assumption is that in a GameDay we all know where everyone will be, and have an obvious medium for communications for the event. Sometimes it’s assumed to be an all in-person event, but in reality one person is actually dialing in. Lining up the logistics for the right day and communication channels to be used can be quite difficult. Make sure all of this information is kept in the calendar invite as well as documented in the GameDay doc.

Things to include:

* Precise date
* War room for in-person attendance (make sure it fits enough people)
* Dial-in information - including conferencing link, phone number and code to join

Agenda items:

* Start
* Whiteboarding session and debates on assumptions
* Test cases and scoping
* Execution
* Recap
* Key People in Attendance

A GameDay can’t happen without people, and a GameDay can be difficult to be productive without key people present. This could be the overall tech lead of an application stack, or someone in Site Reliability to make sure the right dashboards are available for monitoring, or otherwise, the development team members to provide insight to certain behaviors.

Goals Of The GameDay

When planning, we need a goal for the GameDay. This is to ensure that we create relevant test cases. Sometimes the goal is to replay as many previous production impacts as possible, to test whether or not the current systems are more or less resilient. Other times, it’s to ensure a new system being put in place has all the right monitoring, alerts and metrics in place before it is deployed to production.

Day Of The GameDay

This is the exciting part! A lot of planning has been conducted up to this point and now it’s time to execute! All the right people are dialed in, or otherwise present. Everyone’s got a cup of coffee in hand and ready to triage. Let’s cause some havoc! But wait…

Whiteboarding

With so many great minds present and aligned on the goal of the GameDay, it’s the perfect time to whiteboard out a system’s architecture. This session helps paint a clear picture of what we’re about to break, and makes obvious some areas worth testing. It also brings everyone up to date on the latest build of a system, so that the picture is consistent across everyone’s minds.

Test Cases Scoping

Test cases are developed to help answer the question, “What could go wrong?” or “Do we know what will happen if this breaks?” As a team looks at the architecture that’s on the whiteboard, you will start to identify areas of concern. “What if Redis becomes slow?” “What if a host on Cassandra goes away?” and we start writing these down as a test case.

Scoping is important because there’s oftentimes two angles to a blast radius:

* Impact at the host level - How bad this failure is.
* Amount of hosts - How widespread this failure is.

Depending on how X and Y are scoped, they simulate very different types of failures. In most GameDays, especially for latency tests, multiple tests are run with different values selected for latency injected, and number of hosts targeted for this failure. It’s important to be rigorous in this aspect of test coverage, which ultimately leads to some need for automation past the GameDay.

Not displayed on the scope graph is how long you want to run an experiment. As we’ve learned, not all applications show a fault within a minute. Sometimes systems, especially hosts with plenty of resources, take time to get backed up or slowed down. It’s important to determine a good duration to run the test that will show a change in your system.

Lastly, but never least, have an abort plan. This is especially important if you are testing in production. The last thing we want a chaos experiment to do is stay around long past its welcome, wreaking havoc beyond your desire. Before metrics start dipping, determine ahead of time how much of a dip is enough for you to pull the plug on the experiment. You want to scrape skin without drawing blood.

Execution

Once a set of test cases are determined, it’s time to execute. Have a sip of coffee and watch the main dashboard that is to be used to monitor this exercise. Some key questions to ask as tests are being conducted:

* Do we have enough information?
* Is the behavior what we expected?
* What is the customer seeing if this were to happen?
* What’s happening to systems upstream or downstream?

Collect and document this info, then move on to the next test.

Recap

What happened? Was that expected? What do we do next?

After tests are run, it’s good to take some time to wind down, then have a follow up recap. This should be done relatively soon after the GameDay (days, not weeks), as the experience is still fresh for everyone.

During recap, review the glaring tests that showed interesting results first. Discuss in-depth what happened, and why it happened, and the follow up items. It’s as if an incident were to have happened, and you are now doing an incident review, only this was done and experienced in a controlled environment (feels better, no?). Fill out the bug tickets, implement monitoring changes, or add an item to the runbook, as these are all valuable things to do in review of any incident.

For the tests that have resulted in no impact, it’s also important to touch on them as well. Some things to do, especially if a particular test were to have shown impact before, is to applaud the fix that was rolled out that mitigated a failure state. But more importantly, it’s good to review this and consider implementing this test in an automated way so that subsequent builds don’t introduce a regression.



