# iSun1: attention methodology and skill audit

Research checked 20 September 2026. This is an implementation brief, not evidence that iSun1 has achieved audience lift.

## Build this first

One sourced event → 20 distinct framings → two competing headline packages → native rendering → attributed outcomes → one narrowly justified change. Keep the event and its claims stable while the packaging changes. Treat every model score as an editorial hypothesis until readers respond.

The smallest defensible loop is an owned-site A/B experiment with a fixed assignment, a variant ID that survives opening the story, and active reading telemetry. Generate 20 internally; expose two to preserve learning power when traffic is small. Keep all 20 and why the other 18 lost. This is a proposed design, not a platform formula.

## What to take from the strongest sources

| System | Verified lesson | iSun1 implementation | Limit |
|---|---|---|---|
| Toutiao | Its creator help describes interest matching and staged distribution; early clicks, shares and likes inform further recommendation. The same page says misleading headlines, misleading covers and false content can stop distribution. | Event selection and headline selection are separate; measure audience response to the first exposure, then the delivered story. | No published universal score or fixed traffic-pool threshold. Help page updated 19 February 2025. [Official explanation](https://baike.toutiao.com/detail/211/221/0?enter_from=left_navigation). |
| Douyin | Its public interactive explainer separates representation, candidate retrieval and ranking, and includes exploration to avoid repetitive recommendations. It describes likes, saves, shares and comments as inputs. | Retain an exploration slot; record hook family and audience, rather than repeating yesterday's winning wording. | An educational model, not full production weights. Page and its linked JS were read; no guessed weights. [Official explainer](https://trust.douyin.com/algorithm/). |
| TikTok | The recommendation explainer uses explicit and implicit signals, including viewing completion, plus negative feedback and diversity. Its Creative Codes recommend a hook/body/close and delivering the proposition in the opening seconds. | The first frame and spoken first line carry a specific surprise; deliver evidence immediately after the hook; record watch/reading retention. | The six-second creative guidance concerns ads, not a causal guarantee for organic news. The recommendation explainer dates to 2020. [Recommendation explanation](https://newsroom.tiktok.com/how-tiktok-recommends-videos-for-you?lang=en), [Creative Codes](https://ads.tiktok.com/business/library/Creative_Codes_ENG.pdf). |
| X | Current open source predicts several actions, including dwell, clicks, sharing, follows and negative feedback, and separates ranking from eligibility. Its September 2026 README explicitly rejects interpreting weights as multipliers of raw counts. | Keep a metric vector, including dissatisfaction, and inspect eligibility separately from editorial appeal. | Public code/config is a dated reference with omitted components, not a portable viral formula. Do not use the old “one reply equals N likes” advice. [Current X repository](https://github.com/xai-org/x-algorithm). |
| News Minimalist | Separates significance from personal relevance; scores event attributes, deduplicates coverage, and permits short feeds when little matters. | Keep consequence, novelty and evidence quality visible before choosing stories. A slow day can yield a better experiment instead of manufactured breaking news. | Its assertion that significance is objective is the creator's position; iSun1's editorial judgment remains explicit. [Methodology](https://www.newsminimalist.com/about). |
| Ground News | Groups coverage of the same event; its factuality ratings apply to publications, not individual claims. | Event clusters retain source lineage and disagreements. Ten copies of a press release count as one origin. | Source reputation is a prior, never proof of a particular claim. [FAQ](https://ground.news/frequently-asked-questions), [rating scope](https://help.ground.news/en/articles/5224577). |
| Particle | Current site visibly groups article coverage under story cards; its article-level political-spectrum explainer supplies excerpts and reasons for ratings. | Borrow the event object and inspectable rationale, not its current story assertions or any automatic truth score. | Product patterns, not evidence of iSun1 audience impact. [Site](https://particle.news/), [methodology](https://particle.news/blog/political-spectrum-ratings-on-individual-articles). |
| Perplexity | Its Discover Daily launch describes rendering sourced search material as brief audio with inline source links. | One evidence package can become text or audio without researching five different stories. | Product self-description; no independently verified engagement lift. [Discover Daily](https://www.perplexity.ai/en-GB/hub/blog/perplexity-partners-with-elevenlabs-to-launch-discover-daily-podcast). |

Headline experiments have stronger evidence than influencer formulas. A 2024 study using over 30,000 field experiments found simpler news headlines attracted more clicks; general readers processed simpler headlines differently from professional writers. Use ordinary words and concrete actors, then test locally. [Original research abstract](https://pubmed.ncbi.nlm.nih.gov/38838159/).

A registered Upworthy study found a causal CTR increase from negative words within its historic experiment setting. That does not establish improved comprehension, trust, return, or transfer to iSun1. Preserve conflict when the event contains it; also test wonder, ingenuity and relief. [Original study](https://www.nature.com/articles/s41562-023-01538-4). The [Upworthy Research Archive](https://upworthy.natematias.com/about-the-archive.html) describes 2013–2015 headline-and-image packages, so a dataset reuse must isolate image changes and split evaluation by story, not randomly by headline.

## The editorial method

Start with: who wanted what, what got in the way, what changed, and who pays or gains. The “WTF” is the largest **supported** gap between reasonable expectation and observed reality. It can be a reversal, absurdly large scale, tiny detail with large consequences, an institution contradicting itself, or an ordinary person's impossible choice. Do not manufacture villains, intent, universal reactions or certainty.

Create five angle families with four genuinely different versions each: reversal; human stakes; revealed mechanism; scale/comparison; unresolved next consequence. Substitute a supported family when an event lacks one. Each version records its claim IDs, emotional promise, opening payoff and one reason it may fail. At least two should earn attention through awe, usefulness or relief when facts support them. These counts are iSun1's generation discipline, not research-backed optimums.

Select a clear control and a challenger with a different mechanism. Read them aloud. Ask: could any company announcement wear this headline? If yes, find a named actor, visible act, credible number or sharper consequence. Preserve attribution in allegations and forecasts. Amplify tone, rhythm, juxtaposition and metaphor; never inflate the event's magnitude or invent the material premise.

Platform adapters change form, not facts: site = headline, short opening and evidence; LinkedIn = professional consequence and a supported point of view; X = one sharp assertion plus proof; WeChat = natural Chinese scene and fuller causal story; short video = first frame, spoken hook, proof, turn and consequence. Avoid invented first-person experience in Robin's voice. Learn platform results as channel-specific observations, then promote only repeatable mechanisms into the shared system.

## Measurement that does not lie

| Intent | Owned-site event/denominator | Boundary |
|---|---|---|
| Stop | Card stays at least 50% visible for 1 second / eligible rendered cards | A viewability proxy, not eye tracking. A five-second view is a stronger optional event. |
| Open | Attributed story opens / viewable card exposures | Preserve experiment and variant IDs through click; deduplicate retries. |
| Consume | Opens with at least 20 active visible seconds and at least 50% scroll / attributed opens | A provisional proxy; short stories and video need separate rules. Pause timing in hidden tabs. |
| Share | Share-intent action / consumed reads | Native share-sheet completion and clipboard use are not proof another person received or read it. Track referred visits separately. |
| Return | Eligible first-time reader cohorts with another session within 7 days / matured cohorts | Unmatured cohorts and unavailable identifiers are null, not zero; do not fingerprint. |

Initial objective: qualified reads per eligible exposure; keep CTR and consumption-per-open visible as diagnostics. A clickier headline that loses qualified reads is a mismatch candidate. Keep corrections, misleading-headline feedback, hides/unsubscribes where available, and Robin taste vetoes next to performance. Do not collapse unavailable cross-platform metrics into fabricated zeros or one common engagement score.

Assign site variants consistently per anonymous browser and experiment; serve concurrently in the same placement. Define a review time, primary metric and minimum effect worth acting on before exposure. Show counts and uncertainty. With sparse traffic, report UNKNOWN and retain the challenger instead of crowning a winner. Social post A versus post B is observational when time/audience differ. Simulated readers and model scores can reject weak drafts; neither count as measured attention.

Daily improvement record: hypothesis → one changed variable → release/version → actual exposure → result or UNKNOWN → next test. A useful improvement can fix broken attribution, replace a weak opening or remove a demonstrably bad writing rule. Do not promise audience improvement every day when evidence has not matured.

## Skill audit and reuse decision

Public file snapshots, repository trees, revision IDs and SHA-256 values are in `third-party-audit/`. Audit scope: manually read the candidate `SKILL.md` texts (the two rejected viral candidates were reviewed for suitability and red flags, not certified), read available license files, inspect tree inventory. No candidate code was executed, and no skills were installed by this research task. A clean text review is not a full security guarantee.

| Candidate and pinned revision | Verdict | Reason |
|---|---|---|
| [blader/humanizer](https://github.com/blader/humanizer/tree/9862685f575c65a8247f90369951df1b3416e3d6) `9862685f575c65a8247f90369951df1b3416e3d6` | Reuse narrowly | Version 3.0.0 explicitly preserves facts and treats input as material, not instructions. MIT license includes Siqi Chen's notice. Recommend only exact `SKILL.md` + `LICENSE` + local provenance; do not install its plugin, workflow or validator script. Its punctuation and formatting preferences remain subordinate to Robin's taste and fact preservation. No evidence it predicts virality or AI detector outcomes. |
| [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop/tree/8da1f030185bdfe8471220585162991eaeb970e9) `8da1f030185bdfe8471220585162991eaeb970e9` | Do not add another runtime skill | MIT. Useful filler/rhythm critique, but blanket removal of all adverbs/passives and quotable lines is too rigid for dramatic news. References not fully audited; redundant with Humanizer. |
| [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh/tree/91f3d394db8419c20d67ebe22a96cf8fee0a404b) `91f3d394db8419c20d67ebe22a96cf8fee0a404b` | Reject unchanged | MIT file exists, but examples add previously absent dates, institutions, product features and reactions. An unknown founding date becomes a precise year allegedly from registration records. This teaches the exact factual drift a news engine must prevent. Use original Chinese editorial rules in the project skill instead. |
| [aaaronmiller/create-viral-content](https://github.com/aaaronmiller/create-viral-content/tree/51483020215d9259c7565511c289d87ac43d3bcb) `51483020215d9259c7565511c289d87ac43d3bcb` | Reject unchanged | Malformed frontmatter; broad automatic activation, conflicting reference-loading directions, hardcoded personal paths and unsupported universal percentage rules. Example adds invented personal experiment results. Metadata says MIT but tree has no license file; redistribution terms are insufficiently documented in this audit. |
| [tenfoldmarc/viral-skill](https://github.com/tenfoldmarc/viral-skill/tree/6018b7ec91d0c1eeb83a15e6885b753c816d7248) `6018b7ec91d0c1eeb83a15e6885b753c816d7248` | Reject unchanged | No license file in inspected tree; extensive setup interview, hardcoded global config and optional paid scraping/tool setup. Personal voice grounding is useful as an idea; no package reuse needed. |

The project-local `isun1-storycraft/SKILL.md` below is an original concise implementation draft. Combine it with the vetted Humanizer text if useful, preserving the MIT notice for that upstream file. Install only inside the owning project after root resolves its canonical location. No global skill mirror edits are needed.

## 中文要点

最小闭环是一个有证据的事件、20 个不同切口、两个同时测试的标题版本、可追踪的真实阅读结果，以及一次有依据的修改。事实、标题预测分和实测表现分别保存。标题可以放大语气、反差和节奏，不能放大事实的程度、编造数字、动机或人物经历。

头条与抖音的可借鉴之处是兴趣匹配、反馈和探索；TikTok 提醒我们在开头兑现吸引力；X 当前代码说明应看多种行为，不能把权重误读为点赞兑换率。News Minimalist 的价值在事件筛选，Ground News 和 Particle 的价值在同一事件的多来源整理，Perplexity 展示了同一证据包的多形式表达。各平台的表现都只能作为当地实验结果，不能替 Robin 决定媒体品味。

优先采用 Humanizer v3 的保留事实原则及本项目原创技能。拒绝未经修改的旧中文 Humanizer，因为其范例为追求具体而增加原文没有的日期、来源与功能；拒绝把“爆款技能”的宣传数字当证据。初期看每次有效曝光带来的合格阅读，点击、停留、分享意图和回访分别保留。没有流量或观察期未成熟时记录 UNKNOWN，不宣布虚假的赢家。
