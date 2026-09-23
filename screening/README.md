# iSun World Radar — review prototype

Discover beyond the daily briefing, screen underlying events, and let Robin correct the selection before story production. This module is deliberately independent of `content/`, the live site and publication. No scheduler or automatic publication is installed.

## Smallest learning loop

1. Read expandable public RSS/Atom sources plus GDELT's global discovery feed.
2. Preserve publication, observation and update timestamps separately. Deduplicate links and exact titles; AI event grouping remains a proposal, never independent corroboration.
3. Allocate a bounded AI budget across languages and publishers. Keep the rest visible as a backlog, not rejected stories.
4. Estimate significance and narrative potential separately. Open accessible article excerpts for top candidates and reassess; failed reassessment clears the current score.
5. Review the top ten, promising small stories, and five reproducible samples outside the top ten. Save decisions with evidence revisions and concurrency protection.
6. Export chosen events as a research handoff. Up to twelve prior human decisions enter the next classification prompt as calibration examples. This is prompt calibration, not trained-model improvement or measured audience lift.

## Run

From the repository root, Python3.10+, system curl and a compatible Codex CLI with an existing authorized login:

```sh
python3 screening/screen.py collect
python3 screening/screen.py evaluate --budget 144 --batch-size 24 --enrich 10
python3 screening/screen.py serve --port 4174
```

Open `http://127.0.0.1:4174`. `--run <ID>` pins evaluation/review to a saved run. `--sources <registry.json>` selects an alternative registry. `ISUN_SCREEN_CODEX` can point to an existing compatible CLI; use an existing CLI compatible with the classifier adapter. No credentials are included or copied. The classifier isolates user configuration and uses `gpt-6-astra` with medium reasoning. No dependency on the daily briefing.

`work/screening/runs/<ID>` retains immutable evidence snapshots, model responses and versioned `reviews.json`. These stay outside Git. The server binds loopback only. Use the actual127.0.0.1 URL; host/origin/token validation protects review writes. Stale decisions are rejected; refresh and review the changed evidence. No public service is required.

## Method and sources

Inspired by [News Minimalist's public methodology](https://www.newsminimalist.com/about), which describes significance dimensions including scale, immediate impact, novelty, potential, legacy, positivity and credibility. Its current full weighting is not public. Our explicit provisional weights in `rubric.json` are an iSun proposal: scale25%, impact30%, novelty10%, potential25%, legacy10%. Each factor0–4; weighted total ×2.5 gives0–10. Missing factors make the total null. No calibrated cutoff exists yet. Positivity is separate; credibility is an evidence question, not a popularity multiplier. Story potential is a separate prediction.

The starting registry has27 entries,25 enabled:24 publisher feeds across eight declared language families plus GDELT. It includes world, regional, business, scientific, environment, health, culture and sport reporting rather than only AI/finance. Two CNA feeds remain disabled because their published terms need review for this use. Other feeds provide discovery metadata and links; access does not grant full-text republication rights.

[GDELT's documented article-list feed](https://blog.gdeltproject.org/announcing-the-gdelt-article-list-rss-feed/) is a rolling15-minute discovery sample, not a full-day archive. Publisher feeds retain up to seven days of reported publication dates. Neither means all online news has been seen. Feed failures and disabled sources remain visible. Unknown language, inaccessible/paywalled text, and unverified event dates remain unknown.

## Review boundary

This subsystem is a review prototype. Connecting it to story production requires an explicit editorial decision. Suggested first review: judge the ten selected events, rescue a worthwhile reject, and explain one wrong score. Actual selection quality, recall across the web, ranking calibration and reader impact are UNKNOWN until observed.

Validation: `python3 -m unittest discover -s tests/screening -v`; existing engine `npm test`. Relevant failures include false freshness, private redirects, missing model scores, duplicate-source confidence, stale approvals and concurrent review writes.

## Review handoff

When moving reviews between workspaces, compare the run ID, evidence revision and review version before importing. Preserve conflicting versions for resolution; never overwrite a newer review. Verify transferred file hashes. Local decisions do not affect another classifier run until explicitly imported.
