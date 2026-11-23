# A Small AI Learned to Tune Analog Circuits. Then It Met a Real Factory's Rulebook

Many phones, hearing aids and car sensors contain a layer of electronics that handles the physical world directly. These are analog circuits. They boost a faint microphone signal, clean up a sensor reading before a digital chip interprets it, and keep a battery's voltage steady. On 10 November 2026, Yan Xu and eight coauthors posted a paper describing a system called SLIC. The coauthors include MIT engineers Ruonan Han and Duane S. Boning, and SLIC stands for Small LM Iterating on Circuits. It is a compact artificial-intelligence model trained to adjust the components inside amplifier circuits until a simulated design meets its targets. MIT News reported on the work on 23 November. The results contain a twist. The small model performs strongly under some conditions and trails a far larger model under others. It also loses substantial ground when tested against simulation data from a real chip manufacturer.

That twist makes SLIC worth a close look. The project is a small, specialized AI learning a slice of skilled engineering work, and the paper measures fairly honestly where that skill holds and where it thins out.

## Why amplifiers are a balancing act

An amplifier makes a weak electrical signal stronger. That sounds like a single job, yet a designer juggles several goals at once. The SLIC paper focuses on four of them.

**Gain** is how much the circuit amplifies. **Bandwidth** is the range of frequencies the circuit handles well; think of the span from low bass notes to high whistles in audio terms. **Power consumption** is how much energy the circuit draws, which matters greatly in battery-powered devices. **Phase margin** is a measure of stability. A circuit with too little phase margin can start to ring or oscillate on its own, a little like a microphone squealing when it hears its own speaker.

These four goals pull against each other. Raising gain can shrink bandwidth, raise power use or weaken stability. Engineers therefore work in loops. They propose a design and run it through a circuit simulator, software that predicts electrical behavior from mathematical models of the devices and the manufacturing process. Then they read the predicted numbers, adjust and run it again. Much of that loop is patient, repetitive tuning.

SLIC targets one specific part of the loop. Two terms describe its boundary. A circuit's **topology** is its wiring pattern: which components connect to which. **Sizing** means choosing the dimensions and settings of those components, such as how wide or long each transistor is. SLIC works on sizing within a topology that already exists. It starts from an established amplifier design and searches for better component settings.

An everyday picture helps here, and it is purely an illustration. Imagine an assembled sound system with a row of knobs on the front and a meter beside it reporting volume, clarity, power draw and whether the speakers are close to feeding back. The wiring stays fixed. Your job is to turn the knobs until all four meter readings land in their target zones at the same time. Turning one knob shifts several readings, so you adjust, watch the meter and adjust again. SLIC plays that knob-turning role, and the circuit simulator plays the meter. Inventing a new wiring layout or designing an entire chip lies outside what this system attempts.

## A small model with a specific reason to be small

AI language models are often described by their parameter count. Parameters are the learned numbers inside the model, the internal settings adjusted during training that shape how it responds. These learned settings belong to the AI model; transistor dimensions are the circuit settings it adjusts. SLIC is built on a model with about four billion parameters, Qwen3.5-4B. That sounds large, yet it is modest next to the largest commercial systems, and it is small enough to run on an organization's own computers.

That local operation carries the practical motivation. Circuit designs and manufacturing data are closely guarded. A chip factory, called a foundry, supplies its customers with a **process design kit**, or PDK. A PDK is roughly a factory-specific recipe book and rulebook. It holds detailed models of how that factory's transistors behave, along with design rules, and companies treat it as confidential. When the model runs locally, an engineer can feed it proprietary circuits and PDK data while all of that information stays on company machines. Sending it to an outside hosted AI service becomes unnecessary in this setup. That addresses one defined data-handling concern. Broader security, from malware to other kinds of leaks, remains a separate matter that the paper leaves outside its measurements.

Running a model and training it are also different jobs. The authors report that their main training run took about 39 hours on two Nvidia B200 GPUs, powerful data-center processors. MIT News describes the finished model as small enough to run on a laptop. The paper's own measurements cover benchmark scores and those training resources; the laptop description comes from the MIT report.

## How the model learns: examples first, then consequences

SLIC works in turns. In each turn, the model looks at the current design and its simulated results. It proposes relative changes to component settings, and it writes a short natural-language explanation of its reasoning. A relative change might be an instruction such as "widen this transistor by a fifth"; that example is illustrative. The simulator runs the revised design and reports new numbers. The model reads them and proposes the next adjustment, continuing until the targets are met or the allowed number of turns runs out.

The written explanations give engineers an inspectable trail of the design process, a little like a lab notebook. A smoothly worded explanation, however, leaves open whether the stated reasoning is physically correct or truly reflects how the model reached its choice. The simulator's numbers carry the real evidence.

Training happened in two stages. First came **supervised fine-tuning**, learning by imitation. A larger "teacher" model generated worked examples of circuit optimization using openly available process models. The researchers filtered those examples and trained SLIC to copy the good ones, much as a student studies solved homework problems.

The second stage was **reinforcement learning**, learning from consequences. Here SLIC attempted multi-turn optimizations itself and received rewards based on what the simulator reported. The reward rules were strict. **Validity gates** rejected designs that were physically or electrically invalid, such as settings outside allowed ranges or circuits that fail to operate. A design earned full credit only when all four specifications were satisfied together. After that, extra margin beyond the targets earned a bonus. The reward depended on simulated circuit performance, regardless of how fluent the explanation sounded.

The team added one more technique, called Reward-Guided Rollout Steering. During an optimization, the system generates several candidate next moves and uses simulator feedback to choose which one to continue from. The paper tests three selection policies. "Random" picks among candidates in a randomized way, "Softmax" favors better-scoring candidates with some randomness, and "Greedy" always takes the top scorer. These count as distinct versions in the results tables.

## The test: familiar circuits and strangers

To measure the system, the researchers built a benchmark of 41 amplifier topologies. They used 35 for training and for "in-distribution" testing, meaning test problems drawn from circuit families the model had practiced on. They held back six topologies with different connection structures, circuits the model had never seen during training. The evaluation included 840 tasks on the familiar topologies and 240 on the held-out ones. Each task supplies a starting design and a set of target values.

The headline metric is called **Pass@1**, and it is easy to misread. Here it means that a single optimization attempt succeeds within the turn budget. Success requires all four targets to land within a 5% tolerance while passing the validity gates. That single attempt can include many back-and-forth turns with the simulator. Pass@1 is therefore a share of benchmark tasks solved in simulation. Manufacturing yield and real-world accuracy are different measures entirely.

The comparison model was GPT-6-Astra, a much larger general-purpose system. One detail of method matters. Most SLIC results are averages over three evaluation runs, while Astra was evaluated once per task.

## The ranking flips

With a tight budget of four turns on the familiar circuits, SLIC-Random solved 74.9% of tasks. Astra solved 67.1%. The small specialist came out ahead.

Extending the budget to eight turns on the same familiar circuits changed the order. SLIC reached 87.1% and Astra 90.6%, giving the larger model a lead of 3.5 percentage points. With more chances to consult the simulator, the general model caught up and passed the specialist.

The six unfamiliar topologies widened the gap. On those 240 held-out tasks at eight turns, SLIC-Softmax solved 72.6%, and Astra solved 86.2%. That is a 13.6-point lead for the larger model on the same task set. Comparing SLIC's 87.1% on familiar circuits against Astra's 86.2% on unfamiliar ones would mix two different tests, so the fair reading stays within each table.

These numbers describe a specialist with a real strength. It is efficient when attempts are scarce and the circuits resemble its practice material. On new wiring patterns, the broader model generalizes more successfully at this budget. The six held-out topologies test one particular kind of unfamiliarity, and amplifier designs in the wild vary far more widely.

## Changing the factory

Circuits also behave differently depending on how they are manufactured. Chipmakers label their manufacturing technologies by "process nodes," named in nanometers; a nanometer is one billionth of a meter. A node name such as "65 nm" identifies a generation of manufacturing technology. It serves as a label, and the individual features on a chip have many different sizes.

SLIC trained exclusively on openly published predictive technology models for a 65 nm process. These are public, approximate stand-ins for how transistors at that node behave. The researchers then tested the trained model, with its settings left unchanged, on five process nodes it had never encountered, ranging from 22 to 130 nm. The authors report that the learned skill transferred to those nodes. That transfer was measured in simulation with process models, and fabricated devices played no part.

Then came the sterner test. The team evaluated SLIC with a commercial process design kit, TSMC's 65 nm PDK, using Cadence Spectre, an industry-standard circuit simulator. TSMC is the foundry that supplies this PDK, so the test uses the kind of confidential, detailed factory data real engineers work with. This is the same node SLIC trained on, now described by the factory's own detailed models.

Performance dropped sharply. On the held-out tasks at eight turns, SLIC-Random succeeded on 49.9% of tasks with the commercial PDK. On the same tasks with the open predictive model, it had succeeded on 70.6%, a gap of 20.7 percentage points. On the familiar tasks, success fell from 86.9% with the open model to 55.8% with the commercial one, a 31.1-point decline.

This is the central adverse result, and it cuts two ways. Solving roughly half the tasks under a real foundry's models, after training only on public approximations, shows a meaningful degree of transfer. The decline also shows that the public models and the factory's detailed models differ in ways the AI has to cope with, and its practiced instincts carried over only partly.

The paper also reports 83.2% success on held-out tasks when SLIC is given 32 turns. That figure comes from the open predictive-model benchmark. Turn budget and process model are separate conditions. One sets how long the AI may search, while the other sets which world it is searching in. The published commercial-PDK comparison uses an eight-turn budget, so the effect of longer search under the factory's models remains an open measurement.

## What sits around the result

The authors list the work still ahead for a complete design flow. Their limitations appendix names three stages: generating new topologies, verifying designs across variations in process, voltage and temperature, and handling physical layout. Engineers abbreviate that middle stage as PVT. A real chip has to work when it runs hot or cold, when its supply voltage sags and when manufacturing varies slightly from wafer to wafer. Physical layout, the actual geometric arrangement of components on silicon, introduces effects of its own. The present study covers amplifiers and four metrics. Other circuit types, and properties such as noise and offset, are listed as future work. Production designs would still pass through process-specific checks and human engineering signoff.

The authors' project pages link the code, data and design traces behind the paper, and the team reports that the work has been accepted at NeurIPS 2026, a major AI conference. MIT News lists support for the research including Analog Devices, IBM and MACOM's John L. Ocampo Endowment Fund. These ties to chip companies are useful context for readers.

As of late November 2026, the published study measures a training method and the authors' own simulated benchmark results, and it describes local operation as a capability of the design. Its evidence comes from circuit simulations run by the research team.

## The question underneath

The most interesting idea in SLIC may lie beyond circuits entirely. The project shows a small model gaining genuine skill because it worked inside a tight feedback loop. Each action had a clear target, a trustworthy scorekeeper and a limited number of tries. The simulator acted like a demanding coach who grades every move on measurable results. That structure carried the specialist a long way, and on familiar problems with few attempts it outperformed a giant general model.

The same results trace the edges of that skill. A larger budget favored the bigger model. New circuit structures favored it more. Swapping public approximations for a real factory's detailed models cut the specialist's success rate by between 20 and 31 points.

For an engineering company, the possibility is attractive: a modest model running on its own computers, beside its own confidential factory data, handling rounds of repetitive tuning. The evidence so far points to a sharper question that each new process and circuit family will have to answer through fresh testing. When the meter itself changes, and the factory's real rulebook replaces the public sketch, how much of what a small AI learned on practice problems still holds?

## Sources

- [S1] Yan Xu, Zhengqi Gao, Ching-Yun Ko, Zhang-Wei Hong, Wenjie Lu, Tao Yu, Xin Zhang, Duane S. Boning, Ruonan Han. "SLIC: Reinforcement Fine-Tuning Small LMs for Multi-Turn Analog Circuit Optimization." arXiv:2611.13452v1, 10 November 2026. CC BY 4.0. https://arxiv.org/html/2611.13452v1 ; https://arxiv.org/abs/2611.13452
- [S2] Adam Zewe. "AI-driven technique could help engineers design analog chips faster and less expensively." MIT News, 23 November 2026. https://news.mit.edu/2026/ai-driven-technique-could-help-engineers-design-analog-chips-faster-and-less-expensive-1123
- [S3] SLIC project pages (authors' research artifacts: code, data, traces). https://slic-agent.github.io/ ; https://hangroup.mit.edu/slic/