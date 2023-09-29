---
tags: [
    'Packet Loss Attack',
]
---
# Packet Loss Attack Use Cases



**Technical Use Cases**

**Test Streaming Services that rely on High Data Throughput**

Services like voice and videoconferencing, multiplayer gaming, and media streaming all rely on high-bandwidth, low latency connections. In order to maximize throughput, broadcast and multicast services often use [UDP connections](https://en.wikipedia.org/wiki/User\_Datagram\_Protocol) instead of TCP. This allows for greater throughput and the ability to support more users, but at the cost of lower reliability and potentially dropped packets. Running this attack will demonstrate how packet loss affects the quality of the stream and the load on backend systems.

**Test Graceful Degradation Mechanisms**

Graceful degradation is a way of reducing load on a system while maintaining its core functionality. For example, if a user is videoconferencing and their available bandwidth drops, the videoconferencing platform can adjust by reducing video quality, or by dropping video altogether and dedicating the remaining bandwidth to audio. Packet Loss attacks are useful for testing [gradual degradation mechanisms](https://www.infoq.com/presentations/graceful-degradation-chaos-engineering/) and making sure the user experience is maintained even during an incident.

**Test Quality of Service (QoS) Policies**

If a network becomes saturated with one type of traffic (e.g. streaming video), then other applications might experience higher latency or dropped packets. Quality of Service (QoS) policies can prevent this by prioritizing certain types of traffic when bandwidth becomes limited. Packet Loss attacks can simulate these saturated conditions to help you validate and fine-tune your QoS policies.

**Business Initiatives Aligned with Packet Loss Attacks**

**Prepare for peak traffic events**

Packet loss and packet corruption can become more pronounced during periods of high traffic and network congestion. Packet loss attacks help teams ensure that large increases in network traffic doesn’t result in data loss or data corruption.

**Ensure data integrity**

Depending on the application, lost or corrupted packets may result in data loss. For applications that need to comply with data regulations, any amount of data loss can cause significant problems. Running packet loss attacks lets teams validate that their systems services can reliably detect and retransmit lost packets.

**Improve the user experience**

Many applications are impacted by packet loss including voice and videoconferencing, multiplayer gaming, and media streaming. Using packet loss attacks, teams can better prepare their real-time systems to handle unreliable networks and improve the user experience.
