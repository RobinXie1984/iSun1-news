# He Built a Window Into Cloud Networking. Who Will Get to Look Through It?

Cloud computing depends on a delicate arrangement: many customers share the same physical computers while their work and data remain separated. Behind an online service, a server may run several software-defined computers, each with its own traffic to send and rules to obey. The machinery that directs those messages helps determine how efficiently the server works and how that separation is maintained. On November 2, 2026, MIT News reported that Jeffery Lim, a computer engineer at MIT Lincoln Laboratory, had built and tested a programmable hardware platform that brings selected parts of this machinery within researchers’ reach.

Lim developed the platform, called VNS, while pursuing a master’s degree at Boston University. Its purpose is to give researchers something they can examine and change as they investigate cloud networking. Commercial providers have developed sophisticated hardware for this work, but their mature designs are generally proprietary. Researchers exploring a new idea therefore face a practical difficulty: the equipment they can modify may reproduce only part of the environment they hope to improve.

VNS offers a working instrument for narrowing that distance. Its reported tests include a promising performance comparison and a visible limit as firewall workloads grow. Its wider significance rests on another step. MIT’s report says Lim plans to release the design as open source, allowing others to inspect and extend it. Whether researchers can obtain the design and reproduce useful experiments remains an open question.

To understand why that matters, begin inside a shared server. A virtual machine is a software-defined computer that uses a portion of the physical machine’s processing power, memory and other resources. Software called a hypervisor manages these virtual machines. This arrangement lets a cloud provider divide powerful equipment among customers, often called tenants, while maintaining boundaries around their activity.

The virtual machines also need to communicate. Their data travels in small units called packets, which carry information used to deliver them to the right destination. A network interface card, or NIC, connects the physical computer to a network. Inside the server, a software-based virtual switch can direct packets and apply policies governing which traffic may pass.

That software performs useful work, and each packet it handles consumes some of the server’s processing capacity. The central processing unit, or CPU, must divide its attention between customers’ applications and supporting tasks. As network demands grow, moving some packet-handling work into specialized hardware can leave more CPU capacity available for applications.

One established technique has the long name single-root input/output virtualization, usually shortened to SR-IOV. It lets a single physical network device present separate virtual functions to virtual machines. These functions give the machines a more direct route through the networking hardware. The hypervisor continues managing virtual machines, while more of the packet-handling work follows the hardware path.

Amazon Web Services describes SR-IOV as part of enhanced networking on supported EC2 instances, its rentable cloud computers. Microsoft explains that Azure Accelerated Networking sends traffic around the host’s software switch and moves the relevant networking policies into hardware. These vendor descriptions establish the architectural idea. They also reveal the engineering challenge at its center: routing, traffic separation and access checks still require a place to happen.

Imagine, as an illustration, a shared building whose deliveries all pass through a central desk. The desk reads destinations, sorts packages and checks which deliveries may enter particular areas. Giving tenants direct loading lanes can reduce the desk’s workload. The lanes then need their own arrangements for sorting deliveries and checking entry permissions. The work has changed location. This analogy describes the movement of decisions; computer security depends on the actual hardware and software enforcing them.

For researchers, the crucial issue is access to that new decision-making location. A useful experimental system needs to do more than give each virtual machine a direct hardware connection. It also needs to represent the routing and policy functions that make shared networking practical. According to MIT’s account, Lim found research hardware with partial SR-IOV support and identified functions that needed to be added.

His background helps explain how he approached the problem. MIT reports that he studied electrical and computer engineering at the University of Colorado Boulder and worked with programmable chips in industry. After joining Lincoln Laboratory in 2018, his work included radar for detecting breathing beneath rubble, radar for satellites and debris, and investigations of radiation-induced faults in chips.

He moved to the laboratory’s Secure Resilient Systems and Technology Group in 2022 and entered its Lincoln Scholars graduate program in 2024. Benjamin Nahill served as his laboratory mentor, and Martin Herbordt advised him at Boston University. That path brought experience in hardware behavior and system resilience to a problem where both matter: making shared computing infrastructure easier to study under realistic conditions.

VNS stands for Verilog Network Switch. It is built around a field-programmable gate array, or FPGA, a chip whose digital circuitry can be reconfigured. Installing an application changes the instructions a computer runs; configuring an FPGA changes how programmable circuit resources are arranged to perform a task. This flexibility makes the chip useful for researchers who want to try different hardware designs.

VNS is also a SmartNIC, meaning that it handles networking tasks that a server’s CPU might otherwise perform. Lim’s two central additions were a switching fabric and a network function engine. These names describe two connected jobs: deciding where packets go and applying rules as they move.

The switching fabric provides routes through the device. Some packets travel between virtual machines on the same server; others need to leave that server for a destination elsewhere. The manuscript’s abstract describes a hardware flow table that redirects packets. Such a table gives the hardware instructions for directing particular traffic, bringing an essential switching function into the experimental design.

The network function engine handles firewall rules for individual tenants. A firewall checks traffic against rules about permitted communication. Per-tenant handling matters because customers sharing one physical machine may require different policies. The shared device must apply the rules associated with the relevant tenant as it processes traffic.

For this task, VNS uses an eBPF softcore engine. Here, eBPF provides a way to express small packet-processing programs. A softcore is a processor implemented using the FPGA’s programmable circuitry. Together, these elements let the design run packet-processing logic inside the networking hardware. Lim adapted earlier doctoral research by Zaid Tahir, who also worked with Herbordt.

That description establishes what the engine is intended to do. Its support for per-tenant firewall rules is a design capability; a comprehensive assessment of isolation and resistance to attacks would require separate security evidence. Likewise, the use of eBPF describes the programming approach, with the exact supported features determined by this implementation.

These details explain the platform’s research value. A more direct path for packets changes where decisions occur. VNS gives researchers a reconfigurable place to study those decisions together with the traffic they govern. Its relevance comes from making selected cloud-networking mechanisms available for experimentation, with scope bounded by the functions it implements.

The next question is whether such a system works well enough to support meaningful experiments. MIT reports that Lim built two servers at home to test the design and also used the Mass Open Cloud’s Open Cloud Testbed to gather measurements and validate it. These are accounts of physical testing. They establish a hardware project with measured behavior, while independent reproduction by an outside team remains unverified.

Lim and Herbordt’s manuscript, presented in September 2026 according to MIT, supplies the numerical comparison. In its abstract, the authors report competitive throughput against a commercial SR-IOV NIC under a matched feature configuration, at moderate firewall rule depths of 0 to 64 rules. Throughput describes the amount of data moved over time. Matching the enabled features matters because the work performed by each device shapes the meaning of a speed comparison.

For 16-rank all-to-all collectives in that comparison, the authors report a 10%–13% performance advantage. A rank is a participating process—a running part of a program—in the communication experiment. In an all-to-all exchange, each participating process communicates with every other. The count describes software participants; their placement across physical machines depends on the experimental setup.

The percentage belongs to that particular workload and comparison. The available abstract supports the authors’ description of a performance advantage, while the precise calculation behind the percentage requires the full methods. Translating it into a general reduction in application running time, or a customer’s cloud bill, would require additional evidence connecting the benchmark to those outcomes.

The same abstract describes an important constraint. Beyond moderate firewall rule depths, delay in the programmable FPGA packet path becomes visible. In everyday terms, processing traffic through the programmable design takes time, and that delay becomes more apparent with deeper rule sets. The available abstract gives the direction of this limitation; its size and detailed progression require the underlying measurements.

That result fits the authors’ positioning of VNS as reconfigurable research hardware. Its scientific usefulness includes the ability to change a mechanism and observe the consequences. The performance comparison suggests room for useful experimentation under specified conditions, while the deeper-rule behavior identifies a condition that deserves attention.

The evidence available for this article consists of the manuscript’s repository abstract and metadata, alongside MIT’s institutional account and the vendor architecture descriptions. Full-manuscript retrieval was rate-limited during source collection, leaving the detailed tables and methods outside this review. The benchmark figures therefore remain attributed author results, with their experimental interpretation bounded by the abstract.

Boston University’s 2026 Master’s Societal Impact Award recognized the project’s potential. That recognition adds context to its reception. Performance and security judgments depend on the corresponding measurements and tests, and outside replication remains a separate milestone.

The prospective research uses are substantial. A platform that represents more of the hardware path could help investigators study ways to strengthen hypervisors, the software managing virtual machines, in a more realistic networking environment. It could also support experiments with high-performance datacenter designs. In both cases, the value would come from making an architectural choice testable and allowing its effects to be observed.

MIT also reports that Lim is considering whether lessons from the project could apply to constrained embedded systems, such as drones or satellites. These are computers built into larger devices, often operating within tight limits on resources. That direction remains a prospect. The reported achievement is the cloud-networking research prototype and its testing.

The distinction becomes especially important around the word “open.” The manuscript’s title describes VNS as open-source, while MIT’s November 2 report says Lim plans an open-source release. The source record establishes the intended research character of the design. A publicly accessible code repository, license and build process remain unverified.

A release could give another group the opportunity to inspect the design, build it on compatible hardware and repeat an experiment. Successful reproduction would then provide a shared starting point for changes: a different routing choice, a revised packet-processing program or another firewall workload. Each step would turn accessibility into evidence about how the system behaves.

The achievement already reported is concrete: Lim has built and tested a programmable platform that exposes selected mechanisms of cloud networking to investigation. Its larger promise depends on what other researchers can do with it. When the design reaches their hands, will they be able to turn this working prototype into an experiment they can repeat—and then into a question of their own?

## Sources

- [MIT News / MIT Lincoln Laboratory, November 2, 2026: reporting on Jeffery Lim’s VNS platform, testing and research plans](https://news.mit.edu/2026/jeffery-lim-wants-to-open-up-cloud-research-1102).
- [Jeffery Lim and Martin Herbordt, 2026: VNS manuscript abstract and metadata, MIT DSpace](https://dspace.mit.edu/handle/1721.1/176308). Benchmark claims draw on the abstract; full-paper methods were unavailable for review.
- [Amazon Web Services: EC2 enhanced networking documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html). Retrieved November 4, 2026; publication date unspecified.
- [Microsoft Learn: Azure Accelerated Networking architecture overview](https://learn.microsoft.com/en-us/azure/virtual-network/accelerated-networking-overview). Retrieved November 4, 2026; publication date unspecified.