# Open-source code that can improve iSun1 headlines now

Checked 20 September 2026. Scope: three repositories; selected source files, exact HEAD revisions and license evidence. No repository code was executed, no dependencies installed, and no product files changed. Downloaded source snapshots and revision metadata are in `headline-code-audit/`.

**Recommendation:** borrow Upworthy's controlled comparison method, use TrendRadar only to discover an overlooked contradiction, and select our own sharper drafts through pairwise competition. None of the three supplies a validated, ready-to-use “viral headline” scorer for iSun1. The immediate improvement must come from better story choices and stronger writing, followed by actual reader tests.

## 1. Upworthy's official teaching code: reuse the comparison design

Repository: [natematias/design-governance-experiments](https://github.com/natematias/design-governance-experiments/tree/6bb86954c7f1709324f79a119a8b28492c4aa81a). HEAD `6bb86954c7f1709324f79a119a8b28492c4aa81a`, dated 14 May 2021. This notebook is linked by the [official Upworthy Archive documentation](https://upworthy.natematias.com/about-the-archive). Repository [LICENSE](https://github.com/natematias/design-governance-experiments/blob/6bb86954c7f1709324f79a119a8b28492c4aa81a/LICENSE) is MIT, copyright J. Nathan Matias. The archive's data/documentation has a separate CC BY 4.0 statement; preserve that distinction.

Actual code inspected:

- [`upworthy_methods.py`](https://github.com/natematias/design-governance-experiments/blob/6bb86954c7f1709324f79a119a8b28492c4aa81a/2020/assignments/upworthy-archive-project/upworthy_methods.py): `get_clickthrough_rates()`, `create_pairwise_matrix()` and `get_valid_tests()` compare variants within the same experiment and reject packages that fail a supplied comparability check.
- [`selecting_upworthy_archive_packages.py.ipynb`](https://github.com/natematias/design-governance-experiments/blob/6bb86954c7f1709324f79a119a8b28492c4aa81a/2020/assignments/upworthy-archive-project/selecting_upworthy_archive_packages.py.ipynb): `is_valid_comparison()` requires the other package properties, including `eyecatcher_id`, to match when comparing headlines. `has_number()` and `has_notable_person()` are concrete experimental treatments, not proof those features always help.
- [`lecture-17-meta-analysis.R.ipynb`](https://github.com/natematias/design-governance-experiments/blob/6bb86954c7f1709324f79a119a8b28492c4aa81a/2020/lecture-code/lecture-17-meta-analysis.R.ipynb): computes clicks/impressions and demonstrates within-test analysis with `plm(..., index="clickability_test_id", model="within")`, rather than treating different stories' CTR as a headline contest.

**Use today:** compare an actor-led headline against a consequence-led headline for the exact same story, card, image and placement. Track which meaningful treatment changed, such as a verified number, named actor, consequence, reversal or unanswered mechanism. Keep counts with the text.

**Do not transplant blindly:** the lesson's `get_comparisons()` intentionally selects minimum/maximum observed effects to explore selection sensitivity; using only those extremes as training winners would exaggerate results. Its old notebook also predates the [June 2024 archive correction](https://upworthy.natematias.com/2024-06-upworthy-archive-update.html): the maintainers flagged potential randomization problems in about 22% of tests and discourage causal analysis of 25 June 2013–10 January 2014. Any later training should use corrected data and inspect the supplied risk indicator, whose naming differs across documentation versions.

## 2. TrendRadar: find story tension; do not mistake its scores for headline quality

Repository: [sansan0/TrendRadar](https://github.com/sansan0/TrendRadar/tree/792bcc3928b1617bba09df34989fd5675c159b86). HEAD `792bcc3928b1617bba09df34989fd5675c159b86`, dated 13 September 2026. [License](https://github.com/sansan0/TrendRadar/blob/792bcc3928b1617bba09df34989fd5675c159b86/LICENSE): GPL v3. Reimplement a small idea in iSun1 rather than vendoring this application or copying its modules into a differently licensed product.

Actual code inspected:

- [`trendradar/core/analyzer.py`](https://github.com/sansan0/TrendRadar/blob/792bcc3928b1617bba09df34989fd5675c159b86/trendradar/core/analyzer.py#L17): `calculate_news_weight()` combines average capped rank score, capped appearance count and fraction of high-ranked observations. This ranks existing trend items. It does not inspect a new headline's prose or predict its CTR.
- [`trendradar/ai/filter.py`](https://github.com/sansan0/TrendRadar/blob/792bcc3928b1617bba09df34989fd5675c159b86/trendradar/ai/filter.py#L310): `AIFilter.classify_batch()` classifies titles against interest tags; `_parse_classify_response()` keeps the highest-scoring tag per item. The score is topical relevance. It correctly distinguishes failure (`None`) from no matches (`[]`), but parsing can fill a missing score with `0.5`; iSun1 should keep unknown evidence unknown.
- [`config/ai_analysis_prompt.txt`](https://github.com/sansan0/TrendRadar/blob/792bcc3928b1617bba09df34989fd5675c159b86/config/ai_analysis_prompt.txt): asks for contrasts between hotlists and RSS, disagreement, cross-platform differences and rank trajectories. It explicitly distinguishes staying near the top from rising rapidly.

**Use today:** for a promising event, compare the popular framing with the source document. Find the overlooked detail that makes the popular summary incomplete. That is a candidate hook: a costly exception, a reversal, a benefit with a catch, a tiny decision with a large consequence. Check the detail before using it.

**Do not import:** hardcoded platform stereotypes, fixed platform-count labels implying universal importance, or the demand to explain future outcomes when evidence cannot. A rise in rank is attention evidence, not verification. Full TrendRadar would add collection and alerting infrastructure while leaving today's headline-writing problem unsolved.

## 3. A genuine pairwise headline ranker: borrow the idea, reject deployment

Repository: [RozaKr/upworthy-headlines-prediction](https://github.com/RozaKr/upworthy-headlines-prediction/tree/5e9812e38616400048808bbce88691f338c2a9bb). HEAD `5e9812e38616400048808bbce88691f338c2a9bb`, dated 28 July 2026. No LICENSE file or other explicit code license was present in the inspected full tree. Read for methodology; do not copy or deploy.

Actual code inspected:

- [`01_build_pairs.py`](https://github.com/RozaKr/upworthy-headlines-prediction/blob/5e9812e38616400048808bbce88691f338c2a9bb/01_build_pairs.py): `build_pairs()` generates both A/B orders; `make_split()` splits by experiment ID. These are useful precautions against label-position shortcuts and within-experiment leakage.
- [`common.py`](https://github.com/RozaKr/upworthy-headlines-prediction/blob/5e9812e38616400048808bbce88691f338c2a9bb/common.py): `load_pairs()` excludes identical-headline pairs; `evaluate()` reports all-pair and selected-subset results. Separating those results is more honest than promoting only the highest number.
- [`03_sbert_pairs.py`](https://github.com/RozaKr/upworthy-headlines-prediction/blob/5e9812e38616400048808bbce88691f338c2a9bb/03_sbert_pairs.py): `encode_unique()` caches embeddings; `features()` combines embedding differences/products with structural differences; `main()` fits logistic regression and an MLP. This is a real learning pipeline, not a prompt renamed an algorithm.

**Material limitations found in code:** `build_pairs()` never requires equal `eyecatcher_id`, so different-headline/different-image pairs remain confounded. [`00_prepare_data.py`](https://github.com/RozaKr/upworthy-headlines-prediction/blob/5e9812e38616400048808bbce88691f338c2a9bb/00_prepare_data.py) loads the 2020 exploratory file and contains no correction-window/risk filter. “Significant” pairs use unadjusted pairwise p-values. Test-ID splits do not establish separation of an underlying story appearing in several tests. The reported AUC was not reproduced and does not establish transfer to 2026 iSun1, Chinese headlines or qualified reading. `encode_unique()` loads cached object arrays with `allow_pickle=True`; do not load downloaded caches. No runtime execution was attempted.

**Use today:** compare two eligible headlines against each other, swap their order, and ask why a reader would choose one. This is an editorial selection aid, not measured attention. Keep facts constant and change the hook mechanism. Use actual site experiments to decide whether the choice worked.

## Immediate rewrite recipe

This is our editorial synthesis, not a claimed result of the repositories:

1. Extract the most unexpected verified detail. State why it is surprising in ordinary language; remove topic-label wording such as “New developments in…” and “What this means for…”.
2. Write 20 candidates with different promises: four reversals, four human/cost consequences, four striking scales or comparisons, four mechanisms, four next-choice tensions. Replace any unsupported family instead of forcing it.
3. For each, ask what the reader learns in the headline and what question the first paragraph pays off. The headline should expose the dramatic fact; the story can reveal how it happened. Avoid vague “You won't believe…” bait.
4. Make the final round a pairwise contest: clear versus dramatic, then direct consequence versus curious mechanism. Prefer the line with a concrete actor, strong verb and the sharper true surprise. A number earns its place only when it makes the event easier to feel.
5. Ship two materially different candidates with fixed image/placement. Read qualified consumption beside CTR. Today's editorial winner remains a hypothesis until enough readers respond.

中文结论：最该借用的是 Upworthy 对同一故事做受控比较的方法。TrendRadar 能帮助找到热搜叙事与原始材料之间的落差，但它的热度分、相关度分都不是标题吸引力分。公开的 SBERT 排序仓库有真实代码，却存在图片混杂、旧数据筛选缺失和许可不明，今天不适合部署。马上改稿的重点是把最反常、最有代价的真实细节放进标题，再用正文兑现“为什么会这样”。
