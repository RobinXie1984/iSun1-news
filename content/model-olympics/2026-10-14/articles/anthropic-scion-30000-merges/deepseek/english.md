Three Viral Headline Options

Suspenseful: Anthropic’s AI Wrote So Much Code That Git Couldn’t Keep Up—So Seven Engineers Built a Replacement

Emotional Resonance: When Your Own Success Breaks Your Tools: The Story Behind Anthropic’s Git Replacement

Counter-intuitive: The Real AI Bottleneck Isn’t Writing Code. It’s Accepting It.

The Bottleneck Moved

In May 2026, Anthropic’s engineers were merging about 2,500 code changes every day. By September, that number had exploded past 30,000. The source-control team looked at the curve and delivered a blunt verdict: the infrastructure was now the bottleneck.

That’s a strange sentence to write in the year 2026. For two decades, the story of software has been about writing code faster. IDEs, frameworks, cloud CI, microservices—every wave of tooling promised to shorten the distance between idea and commit. Git sat at the center of that story, a near-universal substrate for collaboration. It wasn’t glamorous. It was just there. Like plumbing.

Then AI arrived and turned the faucet on full blast. Anthropic reports that Claude helped create the workload—and then helped build the replacement for the machinery that couldn’t handle it. A seven-person team built an in-house system called Scion, plus a review tool called Antique and related systems, fully migrating the company’s monorepo away from Git in five months.

Read that again. Seven people. Five months. A monorepo migration.

If you’ve ever worked on a large codebase, you know that sentence should be impossible. Monorepo migrations are the software equivalent of open-heart surgery while the patient is running a marathon. They are political, technical, and emotional quagmires. And yet, according to Anthropic’s own engineering report, it happened.

The story here isn’t “Git is dead.” Anthropic explicitly says Scion is not a suitable general-use Git replacement. There’s no public drop-in release. The story is subtler and more important: AI didn’t just accelerate code production. It changed the physics of code acceptance.

The Numbers That Broke the Assumption

Anthropic’s internal figures are striking, and they need to be handled with care. These are Anthropic’s reported internal numbers, not independent benchmarks. The company says it went from roughly 2,500 merged changes per day in May 2026 to over 30,000 by September. That’s a twelvefold increase in four months.

The source-control team’s conclusion was not that engineers were slacking or that the code was low quality. The conclusion was that the system for accepting, reviewing, and integrating changes had become the constraint. The machinery of collaboration—not the act of coding—was the thing holding the line.

That is a profound inversion. For years, the developer experience conversation focused on writing code: autocomplete, linting, refactoring tools, faster compilers. The assumption was that if you made writing easier, everything downstream would benefit. But when writing becomes dramatically easier, the downstream systems get slammed. Review queues swell. CI pipelines strain. Merge conflicts multiply. The human attention required to verify intent becomes the scarcest resource.

Anthropic’s answer was not to hire an army of reviewers. It was to rebuild the substrate. Scion uses online clients, server-side operations, and sparse, on-demand data. The company reports a 200x smaller CPU and memory infrastructure footprint compared to prior Git mirroring, and a 25% CI CPU capacity win. Those are distinct measures, and Anthropic is careful to note they are not a claim of 200x cheaper overall or universally 200x faster. The 200x refers to the infrastructure footprint. The 25% is a CI capacity improvement. They are pieces of a puzzle, not a magic bullet.

Still, the direction is unmistakable. The old model—mirror the entire repository, clone it everywhere, run heavy operations on every client—was built for a world where changes were relatively rare. In a world of 30,000 daily merges, that model becomes a tax on every single operation. Scion’s sparse, on-demand approach is a bet that you don’t need the whole world on every desk. You need the part that matters, when it matters.

The takeaway: When your code generation outpaces your code acceptance, you don’t have an AI problem. You have a plumbing problem.

Seven People and a Monorepo

The human story here is just as interesting as the technical one. Anthropic says a seven-person team built Scion, Antique, and related systems. Claude helped create the workload and helped build the replacement. Human engineers still steered architecture and reviewed change intent.

That last sentence matters. It’s easy to read “AI built a Git replacement” as a story about automation eating itself. But the source material is clear: humans remained in the loop for architecture and intent. Claude contributed to the workload and to the construction, but the steering wheel was held by people.

This is not a story about engineers being fired. Anthropic does not say that. In fact, the source material explicitly warns against that interpretation: more merges are not proof of code quality, profitability, or eliminated engineers. The seven-person team is evidence of focus, not replacement.

What it does suggest is a shift in what engineering leverage looks like. If a small team can build and migrate a source-control system for one of the most demanding AI workloads in the world, then the bottleneck is no longer raw headcount. It’s architectural judgment. It’s the ability to see that the old substrate is the problem and to design a new one.

The five-month migration timeline is the part that should make infrastructure veterans sit up. Monorepo migrations are usually measured in years. They involve endless compatibility shims, developer training, edge cases, and political battles. Anthropic’s claim is that this happened in five months. If independently reproduced, that would be a remarkable data point about what small, focused teams can do when the pain is acute and the mandate is clear.

But—and this is important—it has not been independently reproduced. These are Anthropic’s internal figures. The company has not released Scion publicly. There is no drop-in replacement. The report is a case study, not a product announcement.

What Scion Actually Is (and Isn’t)

It’s worth being precise about what Anthropic built. Scion is not a general-purpose Git killer. Anthropic explicitly says it is not suitable as a general-use Git replacement. The workload is unusual. The internal token spending is unusually large. The system was designed for Anthropic’s specific constraints, not for the average team of five shipping a web app.

This matters because the headline “Anthropic replaces Git” could easily be misread as “Git is obsolete.” That is not what the source says. Git remains the default for the vast majority of software teams. It is battle-tested, ubiquitous, and deeply embedded in tooling ecosystems. Scion is a bespoke solution to a bespoke problem.

What Scion represents is a pattern. When a system becomes the bottleneck, you have two choices: optimize the system, or replace it. Anthropic chose replacement. But replacement only makes sense when the workload is extreme enough to justify the cost. For most teams, the right answer is still to optimize their Git workflows, improve CI caching, and reduce review latency.

The 200x footprint reduction and 25% CI CPU win are impressive numbers, but they are also contextual. They describe a specific workload at a specific scale. They do not describe a universal truth about Git’s inefficiency. Git was not designed for 30,000 daily merges in a single monorepo. It was designed for distributed collaboration on a scale that seemed enormous in 2005. Anthropic’s workload is not 2005. It’s not even 2025. It’s something new.

The real lesson: Git wasn’t killed. It was outgrown. And outgrowing a tool is not the same as disproving it.

The Conflict No One Is Talking About

The deeper story here is about a conflict that AI acceleration creates inside engineering organizations. AI makes code generation cheaper. It does not make code acceptance cheaper. In fact, it makes acceptance more expensive, because the volume of changes increases while the human attention required to review them stays roughly constant.

This is the bottleneck Anthropic’s source-control team identified. It’s not that Claude wrote bad code. It’s that Claude wrote so much code that the existing machinery for accepting it became the limiting factor. The company could have thrown more engineers at the problem. Instead, it rebuilt the machinery.

That’s a choice every organization will eventually face. As AI coding assistants become more capable, the volume of proposed changes will rise. Review queues will grow. CI systems will strain. The gap between “code written” and “code merged” will widen. The organizations that thrive will be the ones that treat acceptance infrastructure as a first-class engineering problem, not an afterthought.

There’s also a cultural dimension. When output increases, the temptation is to celebrate the output. “We merged 30,000 changes this month” sounds like a victory. But more merges are not proof of code quality. They are not proof of profitability. They are not proof that engineers were eliminated. They are proof that the system accepted more changes. That’s it.

Anthropic’s report is admirably clear about this. It doesn’t claim that Scion made the code better. It claims that Scion made the infrastructure viable. Those are different things. The company is not saying “our code is 200x better.” It’s saying “our infrastructure footprint is 200x smaller.” The distinction matters.

What We Still Don’t Know

The source material is honest about the unknowns. We don’t have independent reproduction of the performance claims. We don’t have the full economics of building and maintaining Scion. We don’t know how applicable this approach is to other organizations. Anthropic’s workload and internal token spending are unusually large. What works for them may not work for anyone else.

We also don’t know what the long-term maintenance burden looks like. Building a source-control system in five months is impressive. Maintaining it for five years is a different challenge. Every custom system accumulates complexity. Every bespoke solution creates a dependency on the team that built it. Anthropic has not said how it plans to sustain Scion, or whether it will eventually open-source it.

And we don’t know whether the 30,000 daily merges represent a permanent plateau or a waypoint on a steeper curve. If AI coding assistants continue to improve, the volume could keep rising. Scion might be a solution for today’s bottleneck, not tomorrow’s.

What we do know is that the bottleneck moved. It didn’t disappear. It shifted from writing code to accepting it. That shift is the story. The specific solution—Scion, Antique, sparse data, server-side operations—is one answer to one version of the problem. The problem itself is general.

The Line That Stays With You

Here’s the line I keep coming back to: AI didn’t just write the code. It rewrote the rules of code acceptance.

Anthropic’s seven-person team didn’t set out to replace Git. They set out to keep up with Claude. The replacement was a consequence, not a goal. That’s how infrastructure evolution usually happens. Not through grand declarations, but through the quiet realization that the old plumbing can’t handle the new pressure.

Git is not dead. Anthropic says so explicitly. But Git is no longer the ceiling for every workload. For teams operating at Anthropic’s scale, the ceiling has moved. For everyone else, the question is simpler: if your output tripled tomorrow, would your infrastructure survive—or would you be the bottleneck?

What’s the one piece of your development pipeline that would break first if your AI assistant started merging 10x more code next month?