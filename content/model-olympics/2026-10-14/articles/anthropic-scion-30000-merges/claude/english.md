Headline Options

1. Suspenseful: 30,000 Code Changes a Day: The Moment Anthropic’s AI Outgrew Git

2. Emotional Resonance: Seven Engineers, Five Months, and a Machine That Wouldn’t Slow Down

3. Counter-intuitive: AI Didn’t Make Coding the Bottleneck. It Made Everything Else the Bottleneck.

30,000 Code Changes a Day: The Moment Anthropic’s AI Outgrew Git

A note on sourcing: this piece is based on an Anthropic engineering report published October 13, 2026. All performance figures below are Anthropic’s own reported internal numbers. They haven’t been independently benchmarked. Where I’m interpreting rather than reporting, I’ll say so.

The number that changes the question

Start with two figures.

May 2026: about 2,500 code changes merged per day, according to Anthropic.

September 2026: more than 30,000 per day.

That’s four months. By simple arithmetic, it’s more than a twelvefold increase.

The usual story about AI and software is that the job is to make writing code faster. Get more output per engineer, ship features sooner, clear the backlog.

Anthropic’s report describes what happens after you succeed at that.

According to the company’s source-control team, this growth made infrastructure the bottleneck. The constraint wasn’t writing the code anymore. It was the system that receives code, tracks it, and checks it.

Speed doesn’t remove the bottleneck. It moves it downstream.

Part I: When the plumbing becomes the product

Every engineer knows Git. It’s been the default way software teams track changes for close to two decades. It’s distributed, reliable, and so common it’s almost invisible.

Invisible infrastructure has a weakness, though: nobody thinks about it until it can’t keep up.

Here is what Anthropic reports about its own case:

Merged code changes rose from roughly 2,500 a day to more than 30,000 a day between May and September 2026.
The source-control team says this growth turned infrastructure into the limiting factor.
Claude, Anthropic’s own AI model, helped create that workload.

That last point is the plot twist. Anthropic didn’t hit a scaling wall because of a viral product launch or a hiring spree. Based on its own account, much of the pressure came from an AI writing and proposing changes at a pace the existing tooling wasn’t designed for.

My read: For years, the scarce resource in software was the engineer’s time. When AI makes that time less scarce, the scarce resource shifts to whatever sits between “code written” and “code accepted”: review, testing, merging, storage, compute. Anthropic’s report is an early, concrete example of that shift happening inside one company.

Part II: Seven people, five months

Anthropic’s response was to build a replacement rather than patch the old system.

According to the report:

A seven-person team built an in-house source-control system called Scion.
They also built a review tool called Antique, plus related systems.
They fully migrated the company’s monorepo off Git in five months.
Claude helped build the replacement.
Human engineers still steered architecture and reviewed change intent.

Pay attention to that last line, because it’s easy to skim past.

This isn’t a story about an AI building its own infrastructure unsupervised. By Anthropic’s account, the division of labor was clear: the AI contributed to the building, and humans decided what got built and judged whether each change did what it was supposed to do.

AI can write the change. Someone still has to know why the change should exist.

There’s a loop here worth naming. Claude helped generate the volume that broke the old system. Claude then helped build the new system that handles that volume. The tool created the problem and helped engineer the fix, with people holding the steering wheel the whole time.

My read: A seven-person team migrating an entire company’s monorepo in five months is notable on its face. The report doesn’t give a full breakdown of how much of that speed came from AI assistance versus team expertise versus scope decisions, so I’d be careful about attributing the timeline to any single factor. What we can say is that Anthropic chose to build rather than buy or adapt, and reports completing the migration.

Part III: What Scion actually does differently

Anthropic describes Scion’s design in a few broad strokes:

Online clients, meaning developers work against a live, connected system rather than each holding a complete independent copy.
Server-side operations, which shift heavy work from individual machines to central infrastructure.
Sparse and on-demand data, so you only pull what you actually need, when you need it.

If you know Git, you’ll notice these move away from some of its founding ideas. Git was built so every developer could carry the full history and work offline. That’s a strength for open-source projects spread across the world. It becomes a cost when one organization has one giant repository and an enormous, constant stream of changes flowing into it.

My read: Scion looks less like a “better Git” and more like a different bet about where the work should happen. Git distributes the burden. Scion, as described, centralizes it. Which design wins depends entirely on your workload, and that’s exactly the caveat Anthropic itself makes (more on that below).

Part IV: The 200x number, and what it doesn’t mean

Here’s where headlines tend to go wrong, so let’s go slowly.

Anthropic reports two results:

A 200x smaller CPU and memory infrastructure footprint compared with its prior Git mirroring setup.
A 25% CI CPU capacity win, meaning gains on the compute used for continuous integration, the automated building and testing of code.

These are two separate measurements. They measure different things.

Here’s what the 200x figure does not say:

It does not say Scion is 200x cheaper overall.
It does not say Scion is 200x faster at everything.
It does not say the same result would show up for anyone else.

It’s a specific comparison: Scion’s CPU and memory footprint versus Anthropic’s previous Git mirroring infrastructure. That’s it.

The 25% CI figure is more modest-sounding and arguably more useful as a reality check. CI is where every proposed change gets built and tested. If merge volume is in the tens of thousands a day, CI compute is a serious line item, and a quarter of capacity reclaimed matters. But it’s a 25% gain, not a 200x one, and the two shouldn’t be blended into one dramatic claim.

The biggest number in a story is rarely the most important one. Ask what it was measured against.

My read: I’d treat both figures as credible signals of direction, published by the company that built the system, about its own environment. Until someone outside Anthropic reproduces them on a comparable workload, they’re claims, not benchmarks.

Part V: The caveats Anthropic put in writing

This is the part of the report I’d most want people to read, because the company essentially argues against the most exciting version of its own story.

According to Anthropic:

Scion is not a suitable general-use Git replacement.
The company’s workload is unusually large.
Its internal token spending is unusually large.
No public drop-in release has been established.

So if you’re a five-person startup wondering whether to abandon Git tomorrow: by Anthropic’s own account, this wasn’t built for you, and it isn’t available to you as a ready-made swap.

There are also things the merge numbers don’t prove, and the brief I’m working from is explicit on this:

More merges are not proof of better code quality.
More merges are not proof of profitability.
More merges are not proof that engineers were eliminated.

That last one is worth repeating because it’s the easiest leap to make. Nothing in the report says Anthropic cut engineers because of this. The only staffing detail we have is that a seven-person team built the new system, and that humans continued to guide architecture and review intent.

Volume is a measurement of activity, not value. Thirty thousand merges a day tells you a lot about throughput. It tells you very little, on its own, about whether those changes were good.

Part VI: What we still don’t know

Honest reporting means listing the gaps. Based on the material available, these remain open:

Independent reproduction. No third party has verified the performance figures.
Full economics. We don’t have the total cost of building, running, and maintaining Scion, or how it compares to the old setup on all costs, not just CPU and memory.
Applicability elsewhere. Anthropic says its situation is unusual. Whether any of this transfers to other organizations is unknown.

None of these gaps make the report less interesting. They make it a case study rather than a verdict.

Part VII: The real lesson, and it’s not about Git

Here’s where I’ll step fully into analysis.

The headline-friendly version of this story is “AI kills Git.” That isn’t what happened, and Anthropic says as much. Git isn’t dying. One company with an extreme workload replaced it internally.

The more durable lesson is about where pressure goes when AI speeds things up.

Think of a factory that suddenly gets a machine able to produce parts twelve times faster. The parts don’t ship twelve times faster unless inspection, packing, and loading can keep up. Very quickly, the new machine isn’t the story. The loading dock is.

Software has its own loading dock: version control, code review, automated testing, deployment. For decades these systems were sized for human pace, because humans were the slowest part. Anthropic’s report suggests that assumption can break, at least at the high end.

A few practical implications for anyone building with AI, framed as my own reading:

1. Measure the pipe, not just the faucet.
If AI raises your team’s output, the next question is what happens to everything downstream. Are review queues growing? Is CI compute climbing? Is merge time stretching? The bottleneck you’ll hit next is probably not where you’re currently looking.

2. Human judgment moves up, it doesn’t disappear.
In Anthropic’s account, people steered architecture and reviewed change intent. That’s a revealing phrase. When a machine can produce the change, the human job concentrates on whether the change should exist and whether it does what it claims. That’s harder to automate, and arguably more valuable.

3. Read company benchmarks the way you’d read a company’s earnings guidance.
Useful, informative, and written by someone with an interest in the result. Anthropic deserves credit for including strong limiting language. That’s exactly why the limiting language should travel with the numbers whenever they’re quoted.

4. Don’t copy the solution. Copy the diagnosis.
Very few organizations need their own source-control system. Many will eventually need to ask the question Anthropic asked: which part of our pipeline was quietly built for a slower world?

The takeaway in one line

The first job of AI was making work faster. The second job, which is arriving now, is rebuilding everything that wasn’t built for that speed.

Anthropic’s report is one company’s account of reaching that second phase earlier than most. Its numbers are self-reported, its solution is explicitly not for general use, and big questions about cost and portability are still open. But the shape of the problem it describes is likely to show up elsewhere, in smaller forms, as AI-generated output grows.

The interesting question isn’t whether your team will ever need to replace Git.

It’s what your version of Git is.

So here’s my question for you: If AI doubled your team’s output tomorrow, which part of your workflow would break first? Code review, testing, approvals, deployment, or something nobody’s thought to check? Tell me in the comments. I suspect the answers will be more varied, and more revealing, than any benchmark.

Source: Anthropic Engineering, “Redesigning source control” (reported October 13, 2026). https://www.anthropic.com/engineering/redesigning-source-control. All figures are Anthropic’s internal reported numbers, not independent benchmarks.