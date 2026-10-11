Headline options

Suspenseful: The AI Agent Got Caught Reaching for Your Files. Whether It Got Them Depended on One Setting.

Emotional resonance: You Finally Got a Leash for Your AI Agent. Now Check Who’s Holding It.

Counter-intuitive: Microsoft’s New AI Sandbox Has a Mode That Lets the Agent Through. That’s a Feature, Not a Bug, If You Use It Right.

The Log Said “Denied.” The File Was Already Gone.

On Microsoft Execution Containers, and why the mode you pick matters more than the sandbox’s name.

Here’s a sentence that can be true and still mislead you:

“The sandbox caught the agent trying to read your SSH keys.”

“Caught” sounds like “stopped.” In one of the three modes Microsoft has just described for its new AI agent containment system, it means the opposite. The access was recorded, and then it went through.

That gap between recorded and blocked is the most important thing in this story. Most people will skim past it.

What actually happened (the facts)

On October 7, 2026, Microsoft published a developer announcement on its Windows Developer Blog saying that Microsoft Execution Containers (MXC) is generally available. This article was written four days later. It covers that announcement and the project’s public GitHub repository, not a launch happening today.

According to Microsoft’s announcement, the basic idea is simple:

Developers or organizations define which resources an AI agent may use. That definition sits outside the agent’s control.
A runtime enforces the policy through what Microsoft calls containment backends: different underlying technologies that do the actual isolation.

One caveat up front, because it governs everything below: this is a vendor announcement, not an independent security audit. Everything about how MXC behaves comes from Microsoft describing its own product. Nobody outside Microsoft has published a verdict on whether it holds up under attack, at least not in the material this piece draws on.

The three modes, and the one that trips people up

The announcement lists three modes. Here they are as Microsoft describes them, in plain language:

1. Enforcement. Access the policy doesn’t grant gets blocked. You don’t get an activity report of those attempts.

2. Learning. Ungranted access is blocked and recorded. You get the block and the paper trail.

3. Permissive. Access the policy would deny is allowed and recorded. Microsoft notes that other operating-system or organizational restrictions still apply, so Permissive doesn’t remove every protection on the machine. It does mean MXC’s own policy isn’t the thing stopping the access.

Put side by side:

Mode	Ungranted access	Recorded?
Enforcement	Blocked	No activity report
Learning	Blocked	Yes
Permissive	Allowed	Yes

Look at the right-hand column. Two modes produce records. Only one of those two blocks anything.

A record is not always a block. That’s the whole lesson. The rest of this article is about why that matters in practice.

Why would anyone want a mode that lets things through?

(From here, this is my analysis, not Microsoft’s claims.)

At first glance, Permissive looks like a sandbox with the door open. Why ship it?

Because writing a correct policy is hard.

Say you’re deploying an agent that refactors code. What does it legitimately need? The repo, obviously. A package cache, probably. Maybe a temp directory. A network endpoint for documentation? A config file in your home folder you forgot about?

If you guess too tight and switch straight to Enforcement, the agent breaks in odd ways, and you spend an afternoon working out why. If you guess too loose, you’ve built a sandbox that contains nothing.

Permissive (and Learning, more safely) gives you the agent’s real behaviour on record so you can write a policy based on what happens rather than what you imagine happens. Microsoft’s announcement presents activity reporting as a tool for policy authors. One detail: per the announcement, that activity reporting for process containers is Windows-only.

So the modes aren’t three security levels. They’re closer to three stages of a workflow: observe, then tighten, then lock.

The danger is a deployment that gets stuck at stage one.

The setting nobody remembers changing

(Hypothetical scenario, for illustration. This is not a reported incident.)

Picture an ordinary team. Someone sets up an agent in Permissive mode during a pilot to see what it touches. The logs look reassuring: every out-of-policy access shows up neatly as an entry. The pilot goes well, the agent goes into wider use, and nobody revisits the mode because the dashboard is full of activity and “full of activity” feels like “being watched.”

Six months later, someone asks: was this agent ever actually stopped from doing anything?

The honest answer, in that imagined setup, is no. It was observed doing everything.

To be clear: nothing in the source material says this has happened to anyone. There is no reported exploit, no breach, no incident. I’m describing a failure pattern that the mode design makes possible, not one that has been observed. But it’s the kind of quiet misconfiguration that builds up in real organizations, because a log that says “flagged” reads a lot like “handled.”

Visibility is not protection. It’s the raw material you use to build protection.

The part that is a real strength

To be fair to the design, the brief’s most important positive claim is this: the allowed resources are defined outside the agent’s control.

That matters. A common worry with AI agents is that they’ll reason their way into broader access: talk themselves past a guardrail, edit their own config, or be prompted by a malicious document into requesting more. Under the design Microsoft describes, the agent cannot grant itself more authority. The boundary is set by a human or an organization, not by the thing being contained.

That’s the right architecture. It moves the trust question somewhere you can actually reason about.

But notice where it moves it: to whoever chooses the policy and the mode.

So the question for anyone deploying an MXC-contained agent isn’t “is my agent sandboxed?” It’s:

Who wrote the policy?
Who picked the mode?
When was either last reviewed?

The agent can’t promote itself. A tired admin with a Permissive config from last quarter effectively already has.

“Generally available” doesn’t mean “equally mature”

Back to facts. Per Microsoft’s announcement, the containment backends don’t all cover the same ground:

Process backends cover Windows 11, macOS and Linux.
Session isolation is Windows-only.
MicroVM is experimental on Windows and Linux.

Microsoft also says the backends have different properties. Not every backend gives the same isolation, which is what you’d expect when one is a process boundary and another is a virtual machine.

And Microsoft describes deeper enterprise identity and management integrations as coming soon. Those are on the roadmap, not all delivered. If your organization’s plan depends on central identity-based policy management, read the announcement as “planned,” not “available.”

The official microsoft/mxc GitHub README adds a second layer:

It still labels certain VM backends experimental.
It separately warns that the --audit flag turns off sandbox security and must not be used to run untrusted code.

That second point is worth pausing on. In the project’s own documentation, Microsoft says plainly that a particular flag removes the protection. The material I’m working from doesn’t say how --audit relates to the Permissive mode in the announcement, so I won’t claim they’re the same thing. But the theme repeats: there are ways to run this system where you get observation and lose security, and the docs tell you so.

“Generally available” describes the product. It doesn’t certify every backend, every flag, or every policy you write.

What we don’t know

A story like this is easy to oversell, so here’s the list of things the available material does not establish:

Independent exploit resistance. No third-party audit or red-team result is part of this record. We don’t know how hard MXC is to escape.
Adoption. No numbers on how many developers or organizations use it.
Incident reduction. No data showing that MXC reduces real-world security incidents.
Performance. No benchmark figures for any backend.
A universal safe default. Nothing here says one mode or policy is right for every integration. The right setting depends on the agent, the data, and the threat.

One more point, because it’s an easy assumption to make: there’s no indication that every AI product automatically runs inside MXC. It’s something developers and organizations choose to adopt and configure. If you’re using an AI tool, “Microsoft launched an agent sandbox” tells you nothing about whether your tool is in one, or in which mode.

Five takeaways you can actually use

1. Read the mode before you read the logs.
A log full of flagged accesses means very different things in Learning and in Permissive. Find out which one you’re looking at first.

2. Treat Permissive as a time-limited phase.
If you use it to discover what an agent needs, set an end date. A discovery mode with no deadline has quietly become the policy.

3. Learning is the honest middle ground.
It blocks and records. If you want visibility without leaving the door open, it’s the mode that, by Microsoft’s description, gives you both.

4. Match the backend to the risk, and respect the word “experimental.”
Process isolation and a MicroVM aren’t interchangeable. Microsoft calls MicroVM experimental, and the README calls certain VM backends experimental. Plan accordingly.

5. Never run untrusted code with --audit.
That’s not my advice. It’s in Microsoft’s own README.

The bigger picture

(Analysis.)

For the past couple of years, the conversation about AI agent safety has mostly been about the model: will it follow instructions, resist prompt injection, refuse the bad request. Those questions still matter. But MXC, as Microsoft describes it, reflects a different and arguably sturdier philosophy: assume the agent might misbehave, and limit what it can reach regardless.

That’s how we’ve long treated untrusted code. You don’t ask a random binary to behave; you run it somewhere it can’t hurt you. Applying the same principle to AI agents is overdue.

But every containment system shares one property: it’s exactly as strong as the configuration someone chose. The agent can’t widen its own boundary. That makes the human who draws the boundary the most important security control in the system, and the easiest one to forget.

The headline for this announcement isn’t “AI agents are now contained.” It’s narrower and more useful:

Microsoft has given you a lock, a camera, and a setting that decides whether the lock is engaged. Know which one you’re relying on.

Your turn

If an AI agent were running on your machine or your team’s systems tomorrow, could you name who chose its access policy, and which mode it’s running in?

And if you had to pick one setting for the first month: Learning, Permissive, or straight to Enforcement? Tell me which and why.

Sources: Microsoft Windows Developer Blog, announcement dated October 7, 2026 (blogs.windows.com/windowsdeveloper/2026/10/07/microsoft-execution-containers-policy-driven-containment-for-ai-agents/); microsoft/mxc repository README (github.com/microsoft/mxc). Descriptions of MXC’s behaviour reflect Microsoft’s own claims and have not been independently verified. Hypothetical scenarios are labelled as such and do not describe reported incidents.