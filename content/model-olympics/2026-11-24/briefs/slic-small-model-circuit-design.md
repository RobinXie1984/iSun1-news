# A small model learns circuit tuning

Report date:23November2026. Paper:10November2026.

MIT researchers and collaborators report SLIC, a locally deployable four-billion-parameter model trained to tune device sizes in existing amplifier circuit layouts described by connection topologies. Simulator feedback guides successive parameter changes. The benchmark tests joint gain, bandwidth, power and stability specifications.

In the paper’s840 in-distribution tasks, SLIC-Random reaches74.9%within four turns versus GPT-6-Astra’s67.1%; within eight turns the figures are87.1%and90.6%. Held-out topology results and transfer to a commercial foundry process show meaningful remaining gaps. These are simulator task-success rates, not chip manufacturing yields. Training used two B200 GPUs for roughly39hours; local inference does not mean training was done on a laptop.

The work’s positive promise is specialized feedback-driven engineering assistance that can operate without sending proprietary process inputs to an external model service. Full design, robustness verification and physical layout remain further work. No independent reproduction or commercial savings are established here.

Sources: [Xu and colleagues, SLIC paper, CC BY4.0](https://arxiv.org/html/2611.13452v1), [MIT report](https://news.mit.edu/2026/ai-driven-technique-could-help-engineers-design-analog-chips-faster-and-less-expensive-1123), [authors’ research artifacts](https://slic-agent.github.io/).

The cover is an AI-generated concept, separately labelled. Source photographs and scientific figures are linked rather than reproduced.
