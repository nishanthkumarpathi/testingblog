---
tags: [
    'Time Travel Attack',
    'Time Travel',
]
---
# Time Travel Attack Use Cases

**Technical Use Cases**

**Prepare for Daylight Savings Time (DST) and Leap Years**

Clock changes caused by Daylight Savings Time and leap years can cause communication problems between systems and applications, resulting in discarded messages or incorrect timestamps. These events often aren’t thoroughly tested due to their infrequency, but can nonetheless have significant effects on time-sensitive systems. You can use a Time Travel attack to move the system clock forward or backward one hour, test your application, and verify the integrity of your data.

**Ensure Security by Testing TLS Certificate Expiration**

TLS certificates are a cornerstone of modern Internet security and depend on accurate timekeeping. Certificates expire after a certain amount of time and must be renewed and replaced, or else communication will be disrupted. Time Travel attacks let you test the impact of clock skew on encryption and make sure that you stay ahead of expiring certificates by testing notifications and automatic renewal processes.

**Prepare for "End of Epoch" Problems**

The systems that computers use to track time can have their own unexpected behaviors. For example, the Year 2000 problem (Y2K) was caused by computers storing the current year as a two-digit number, which meant that they couldn’t differentiate between January 1, 2000 and January 1, 1900 as they were both stored as “00.” Similarly, the 2038 problem is caused by a limitation of how 32-bit Unix-based systems store date and time values. On January 19, 2038, this value will overflow and roll the date back to December 13, 1901. If you’re not sure whether your systems are protected, you can use the Time Travel attack to proactively test them by moving the date forward. You can use this same strategy to prepare for similar “end of epoch” events.

**Test Clock Sync (NTP) Between Nodes**

Systems that share data often require synchronized system clocks, which are best managed using a service like NTP. Mismatched timestamps can lead to problems like discarded messages and data conflicts. It’s possible that NTP may be unavailable and your clocks will drift. Using Time Travel lets you simulate clock drift and NTP outages simultaneously so that you can proactively prepare for an outage.

**Business Initiatives Aligned with Time Travel Attacks**

Time tracking is essential to security and compliance. The encryption methods that allow for secure communications between your systems and your customers rely on clock synchronization, which is why mismatched system clocks can have a significant impact on system stability and usability. Time travel attacks allow teams to prepare for potential situations where clocks can become desynchronized, determine the impact on security and compliance, and mitigate this impact in advance of a production incident.
