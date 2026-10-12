The Ten-Cent Illusion: What Anthropic’s Haiku 5.5 Actually Changes

Three headline options:

Suspenseful: Anthropic Just Dropped a Ten-Cent AI Model. The Real Price Is Higher.

Emotional Resonance: The Race to Make AI Cheap Enough to Never Think About

Counter-intuitive: Cheap Input Tokens Won’t Save You. Here’s What Will.

On October 7, 2026, Anthropic introduced Claude Haiku 5.5—a small model it describes as its cheapest, fastest, and most capable to date, designed for high-volume, cost-sensitive tasks and as a subagent alongside larger Claude models-
11
. The headline number that ricocheted across developer forums and news aggregators was $0.10 per million input tokens for prompts up to 100,000 tokens-
1
.

Ten cents. A dime. It sounds like the kind of number that changes everything.

It is not the whole story. But it might be the beginning of one.

The Pricing Table Is Not the Bill

Anthropic’s launch pricing for Haiku 5.5 breaks across two tiers. For prompts up to 100,000 tokens: $0.10 per million input tokens, $0.50 per million output tokens, $0.01 for cache reads, and $0.125 for cache writes. Above 100,000 tokens: $0.50 input, $2.50 output, $0.05 cache reads, $0.625 cache writes.

Here is the sentence that matters more than the ten-cent figure: a million input tokens is a billing unit, not a permitted low-price single million-token prompt or a complete task for ten cents. Output and cache categories are separate line items. The dime buys you the raw fuel, not the drive.

Anthropic says the model costs roughly 75% less to run on average compared to Haiku 4.5, its predecessor-
11
. That is a vendor aggregate claim—workload-dependent, not a guaranteed saving for every user. Haiku 5.5 also introduces an adjustable effort setting, meaning developers can dial the model toward cost or toward intelligence-
11
. The tradeoff is real, and it shifts with every workload.

[Analysis: The launch does not mean Anthropic has eliminated the cost of AI. It means the entry price for raw input has collapsed. The economics of a completed task—output generation, retries, verification, and checking—remain the true cost center.]

The Benchmark That Raised Eyebrows

Anthropic’s own benchmark table tells a sharper story than the pricing page. On OSWorld 2.1, an offline subset test of computer-use capability, Haiku 5.5 scored 72.4%, up from 15.7% for Haiku 4.5-
11
. On Terminal-Bench 4.0, it scored 39.2%, against 0.0% for its predecessor-
11
. Sonnet 5.5, the larger sibling, still scored higher on OSWorld at 83.9%-
11
.

These are vendor-reported benchmark scores. They are not live website success rates, safety guarantees, or proof of unattended reliability. No independent reproduction has been cited in this account. But the direction of the jump—from single-digit agentic coding to double-digit performance on the same class of tasks—is the part that matters for anyone building automated workflows.

[Analysis: The pricing makes high-volume operations cheaper. The benchmark jump makes more of those operations possible without a human in the loop. Those two facts compound. That is the real shift.]

What “75% Cheaper” Doesn’t Cover

Anthropic’s claim of 75% lower average run cost is a workload-dependent aggregate-
11
. The raw input price cut is dramatic—down from $1 and $5 for Haiku 4.5 to $0.10 and $0.50 for Haiku 5.5-
1
. But a task is not a prompt. A task is a sequence: input, reasoning, output, possibly a retry, possibly a verification pass. Each step bills separately.

TechRepublic’s coverage put it plainly: “Token prices alone do not determine which model is cheaper for a completed task. Token consumption, retries and accuracy can all change the final bill”-
1
.

This is the gap between the marketing number and the invoice. A model that is ten times cheaper per input token but twice as likely to require a retry may not save you anything. A model that is faster may save you latency, which is a different currency than dollars.

[Analysis: The honest takeaway is not “AI just got 90% cheaper.” It is that the cost of the first token fell sharply, and the cost of a finished job depends on everything that happens after that first token.]

The Quiet Battle Behind the Price Tag

Anthropic is not alone in cutting prices. OpenAI had already reduced API pricing on its own small models. Chinese developers—Moonshot, Z.ai, DeepSeek—are narrowing the capability gap while competing on cost-
19
. Enterprise buyers are no longer comparing only answer quality; they are calculating cost per task-
19
.

The pressure is structural. Companies deploying AI at scale need the per-task math to work. That is why Haiku 5.5 is positioned not as a replacement for larger models but as a subagent—the component that handles the repetitive subtasks that were previously too expensive to run continuously-
1
.

[Analysis: The ten-cent input tier is not a gift. It is a land grab for the high-volume, low-margin layer of the AI stack. Anthropic wants to be the default utility for the unglamorous work—summaries, classification, database queries, browser automation—so that larger models remain the premium layer on top.]

What We Don’t Know

This account does not have monthly credits with Anthropic. It has not changed its production models. It has not received a paid invoice showing a 75% saving. It has not seen independent reproduction of the benchmark scores. It does not know whether Haiku 5.5 will be the universal best model for any particular workload. The official article was read in a signed-in Chrome session via a newsroom link; the /news/claude-haiku-5-5 path returned a 404 and is not the source path.

Those are not caveats to bury. They are the boundary between what the vendor says and what is known.

The takeaway: A ten-cent input tier changes the volume economics of AI. It does not change the success economics. The next real contest is not who can charge the least for a token. It is who can produce the most reliable finished task at the lowest total cost—including the retries you never see on the pricing page.

Your turn: If input is nearly free but output and retries still cost, what would you actually run differently—and what would you still hesitate to automate?