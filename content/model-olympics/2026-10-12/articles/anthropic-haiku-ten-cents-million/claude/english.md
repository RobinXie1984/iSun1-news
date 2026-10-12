Three Headline Options

Suspenseful: Ten Cents per Million Tokens. The Real Cost Starts After the Price Table.

Emotional Resonance: For Anyone Who Shelved an AI Idea Because “It’ll Never Pencil Out”: Read This First

Counter-intuitive: The Cheapest AI Model Isn’t Always the Cheapest Way to Get Work Done

Ten Cents, and the Fine Print That Matters

On October 7, 2026, Anthropic announced Claude Haiku 5.5. The headline number spread quickly: $0.10 per million input tokens.

At that price, input stops looking like a cost line. You can almost picture it: every support ticket triaged, every log line read, every document summarized.

That number is real. It sits in Anthropic’s own price table. But the most expensive thing an AI team can believe this week is that ten cents is what their work will cost.

This piece separates what Anthropic said from what I think it means. I label each part, because when the subject is cheap tokens, guesswork can become expensive.

Part 1: What Anthropic actually announced

All of the following comes from Anthropic’s official announcement page. These are the company’s claims, not independent findings.

The positioning. Anthropic introduced Haiku 5.5 for high-volume, cost-sensitive, and speed-sensitive tasks, and as a subagent working alongside larger Claude models. That describes how the company sees the model’s role. It is not evidence of how often the model succeeds at any particular task.

The price table. Prices are per million tokens. Each line has two rates: one for prompts up to 100,000 tokens and one for prompts over 100,000 tokens.

Category	≤100K-token prompts	>100K-token prompts
Input	$0.10	$0.50
Output	$0.50	$2.50
Cache reads	$0.01	$0.05
Cache writes	$0.125	$0.625

The efficiency claims. Anthropic says the average run cost is roughly 75% below Haiku 4.5, and calls Haiku 5.5 its fastest small model. The 75% figure is an aggregate that depends on workload. It does not promise every user a 75% saving.

A new control. Haiku 5.5 adds adjustable effort, a setting that lets you trade cost against intelligence. Where the best setting lands still depends on the workload.

The benchmark. Anthropic’s table for the OSWorld 2.1 offline subset reports:

Haiku 5.5: 72.4%
Haiku 4.5: 15.7%
Sonnet 5.5: 83.9%

These are benchmark scores reported by the vendor. They are not success rates on live websites, they do not guarantee safety, and they do not show the model can be left to run unattended. I have not reproduced them.

That is the factual record. Everything after this point is my analysis.

Part 2: The ten-cent misunderstanding

(Analysis)

The most common misreading takes three forms, all wrong:

“I can send a million-token prompt for ten cents.” No. Any prompt over 100,000 tokens is billed at the higher tier.
“A task costs ten cents.” No. A million tokens is a billing unit, not a task.
“Input is the bill.” No. Output, cache reads, and cache writes are separate charges.

A price per million tokens is a meter rate, not a receipt.

Here is a concrete example. I am using the listed prices and made-up workloads.

Hypothetical Task A, a short extraction job: 20,000 input tokens and 2,000 output tokens, in the ≤100K tier.

Input: 20,000 × $0.10/M = $0.002
Output: 2,000 × $0.50/M = $0.001
Total per attempt: $0.003

That is genuinely tiny. A thousand of these costs about three dollars.

Hypothetical Task B, the same job with a 150,000-token context: it crosses the 100K line.

Input: 150,000 × $0.50/M = $0.075
Output: 2,000 × $2.50/M = $0.005
Total per attempt: $0.080

That is about 27 times Task A, for the same 2,000 words of output.

(Caveat: this arithmetic assumes the higher rate applies to the whole prompt once it crosses 100K, which is how the table’s “prompts up to / over” framing reads. Check the official page for the exact billing rule before you build a budget on it.)

The 100,000-token line is the most important number on the page, and it isn’t the one people are posting about.

If your pipeline throws whole codebases, full contracts, or long chat histories at the model, you may not be paying ten-cent prices at all. You would be paying fifty-cent input and $2.50 output, which is still cheap, but a different business model.

Part 3: Caching

(Analysis, using arithmetic on the listed prices)

The cache rows are easy to skip, but they matter.

In the ≤100K tier:

Normal input: $0.10/M
Cache write: $0.125/M, a 25% premium the first time
Cache read: $0.01/M, one-tenth the normal input price

The break-even math is short. Writing to cache costs $0.025/M more than plain input. Each later read saves $0.09/M compared with plain input. One reuse more than pays for the write.

Suppose a team sends the same 50,000-token system prompt and reference pack thousands of times a day. Caching that block is close to a free discount. Teams that don’t structure their prompts so a stable prefix can be cached leave the biggest lever on this price card unused.

Cheap input is one discount. Repeated input you never pay full price for again is a much bigger one.

Part 4: The per-success problem

(Analysis, with an entirely hypothetical example)

This is the central tension, and the honest version of the story.

Cheap raw input changes the economics of volume. It does not by itself make each successful outcome cheap.

A token bill tells you what you spent. It does not tell you what you got. The unit of value in a business is not the token or the attempt. It is the successful, verified result.

A rough formula:

Cost per success ≈ (cost per attempt + cost to check it + expected cost of handling failures) ÷ success rate

Here are two invented models on an invented task, to show how the ranking can flip.

Scenario 1: failures are cheap to catch. An automated check costs $0.002 per attempt, and failures are simply retried.

Cheap model: $0.003 per attempt, 60% success → (0.003 + 0.002) ÷ 0.6 ≈ $0.008 per success
Pricier model: $0.030 per attempt, 90% success → (0.030 + 0.002) ÷ 0.9 ≈ $0.036 per success

The cheap model wins by more than 4x.

Scenario 2: failures are expensive. Each failure that gets through costs $0.50 of human review.

Cheap model: 0.005 + (0.4 × $0.50) = $0.205 per attempt
Pricier model: 0.032 + (0.1 × $0.50) = $0.082 per attempt

Now the “expensive” model costs less than half as much.

Nothing about the models changed between the two scenarios. Only the cost of being wrong changed.

The price of a model is set by the vendor. The price of a mistake is set by your workflow.

That is why the adjustable effort setting is interesting. In principle it lets a team spend more reasoning only on the steps where mistakes are costly. Whether that works for a given workload is something teams will have to measure. The announcement can’t settle it.

Part 5: The subagent pattern

(Analysis)

Anthropic positions Haiku 5.5 partly as a subagent alongside larger Claude models. I think this is the most important strategic signal in the announcement, more than the price itself.

The pattern looks like this. A larger model plans, delegates, and judges. Many smaller, faster, cheaper calls do the bulk work: reading, extracting, classifying, drafting, checking. The larger model reviews what comes back.

If that architecture works, small models are not “budget versions” of big ones. They are the workforce layer under an orchestrator, and the price card reflects that role: you don’t pay a workforce like a strategist.

The OSWorld numbers fit this story. Going from 15.7% for Haiku 4.5 to 72.4% for Haiku 5.5 on Anthropic’s reported offline subset is a large jump. Sonnet 5.5’s 83.9% still sits above it, which matches the “small model under a bigger model” framing.

Three cautions come with that reading:

These are vendor-reported scores on an offline subset, and I haven’t reproduced them.
A benchmark score is not a live-website success rate. The real web has logins, pop-ups, layout changes, and edge cases that offline subsets may not capture.
A high score is not proof the model can run unattended, and not a safety guarantee. Whether you need a human or a larger model checking the work is a decision about your own risk.

A benchmark tells you a model can. Production tells you how often it does.

Part 6: What isn’t known

To be explicit about the limits here:

Real task savings for any specific team are unknown. The 75% figure is Anthropic’s workload-dependent average.
Actual invoices from real deployments aren’t in the source material.
How well customer deployments succeed is not established by the announcement.
A universal “best model” doesn’t exist in this data. The OSWorld table itself shows a tradeoff, not a single winner.
Independent replication of the benchmark scores has not been done by me.

Anything that claims certainty on these points this week is ahead of the evidence.

Part 7: A practical playbook

(Analysis and recommendations)

If you run AI workloads, here is what I would do this month:

Find out which tier your prompts actually fall into. Measure your real prompt length distribution. If a large share is over 100K tokens, your effective price is 5x the headline.
Model output as its own line item. Generation-heavy work such as long drafts, code, and reports is dominated by output pricing, not input.
Restructure prompts for caching. Put stable content first and variable content last. One reuse covers the write premium.
Measure cost per verified success, not cost per call. Run a small A/B on your own tasks with your own checker. Vendor averages can’t stand in for your error rates.
Price your failures explicitly. If you don’t know what a wrong answer costs you, you can’t choose a model rationally.
Test the effort settings by step. Low effort for bulk extraction, higher effort for decisions that are costly to reverse. Then measure.
Treat benchmarks as a hypothesis, not a promise. Use OSWorld-style numbers to decide what to test, not what to trust.
The takeaway

Ten cents per million input tokens is a real price, and a genuine shift in what high-volume AI work can cost. Tasks that never made economic sense, like reading every log, classifying every ticket, or pre-screening every document, may now be worth trying.

Price is where the analysis starts, though. Output, the 100K-token line, caching, effort, retries, checking, and the cost of being wrong all sit between the headline number and the bill you’ll actually care about.

Cheap tokens make experiments affordable. Only measurement makes them profitable.

Your turn: In your own workflow, what does a wrong answer actually cost: a cheap retry, or an expensive human cleanup? And has anyone measured that number yet?

Source: Anthropic, “Claude Haiku 5.5,” announced October 7, 2026: https://www.anthropic.com/claude-haiku-5-5. All prices, positioning, efficiency claims and benchmark figures are as reported by Anthropic. Worked examples are hypothetical illustrations, not measured results.