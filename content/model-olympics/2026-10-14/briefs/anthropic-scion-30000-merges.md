# Claude volume forces Anthropic to replace internal Git
Report October13,2026; collectedOctober14. These are Anthropic's reported internal figures, not our independent benchmarks.
S1. Anthropic reports about2,500 code changes merged daily inMay2026, over30,000 bySeptember; its source-control team says this growth made infrastructure the bottleneck.
S2. A seven-person team built in-house Scion and review toolAntique plus related systems, fully migrating its monorepo fromGit in five months. Claude helped create the workload and build the replacement. Human engineers still steered architecture and reviewed change intent.
S3. Scion uses online clients, server-side operations and sparse/on-demand data. Anthropic reports a200x smaller CPU/memory infrastructure footprint than priorGit mirroring and25%CI CPU capacity win. These are distinct measures, not200x cheaper overall or universally200x faster.
S4. Anthropic explicitly says Scion is not a suitable general-useGit replacement; its workload and internal token spending are unusually large. No public drop-in release established. More merges are not proof of code quality, profitability or eliminated engineers.
Conflict/consequence: AI accelerates output; the machinery that accepts and checks output becomes the constraint. Unknown: independently reproduced performance, full economics, applicability elsewhere. Do not invent Dario quotes, a Git outage, engineers being fired or a universal Git death.
Source: https://www.anthropic.com/engineering/redesigning-source-control
