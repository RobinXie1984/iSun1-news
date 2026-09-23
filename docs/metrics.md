# Attention measurement v1

**Objective:** qualified reads per observed anonymous visitor × story experiment, within one language and referral channel. This is a proxy for useful attention, not eye tracking or a viral score.

| Signal | Definition |
|---|---|
| Impression | Headline at least 60% within viewport while document is visible. A fast eligible click can open before five seconds. Allocation/page load alone is not an impression. |
| hold5 | Five uninterrupted seconds of headline visibility; reset on hidden/out-of-view. |
| Open | A click from an observed feed headline into its story. Direct and next-story landings are excluded from the v1 headline experiment. |
| Qualified | At least 15 foreground active seconds after an attributed open; pause hidden tabs and after 30 seconds without interaction. |
| Complete | Qualified read plus the story-end marker visible. |
| Share intent / handoff / copy | Three distinct client events. None proves a published or received share. Confirmed shares stay null. |
| Save | Local-browser saved story. No account or cross-device sync. |
| Hide / misleading | Reader disinterest and headline-promise failure, retained beside attention. |
| Return7d | Another measured exposure at least 24 hours and less than seven days after first observation, only for fully matured seven-day cohorts. Separate from the headline winner decision. |

Per visitor, a story gets one ticket per day/language/channel/experiment; retry signals are unique on ticket + kind. A/B aggregation uses only the visitor's **first actual impression** for that experiment and cohort. A cookie has a stable 50/50 assignment. Deleting it or switching browsers can create a new anonymous identity; there is no fingerprinting. Direct/link readers remain an instrumentation limitation in v1, not invented failed opens.

Public counts are suppressed until both arms reach ten observed readers; raw small-cohort observations remain in the service database. Missing/suppressed denominators are null. The daily agent may inspect authorized database aggregates privately when useful. Network abuse buckets are rotating hashes, with bounded identity minting and ingestion; these controls reduce simple poisoning, not determined bots.

Predeclared initial review: **2026-09-27 09:00 HKT**, after at least 200 unique observed readers per arm/cohort. Primary outcome: qualified reads / impressions. Minimum worthwhile absolute lift: 3 percentage points. Use Wilson intervals and guard against increased hides/misleading feedback. The app shows at most a provisional candidate; it never auto-promotes. Repeated peeking and overlapping intervals are not a result. If sample/time/effect conditions fail, retain UNKNOWN and continue gathering data.

Social analytics are channel-specific observational evidence. Different timing, format, audience or metric definitions prevent a causal head-to-head claim. Feed-source counts and headline scores are editorial/operational facts, not audience outcomes.

Keep QA and ambiguous traffic out of audience-effect decisions. Record interface cutovers, compare matching visual contexts, and verify observation provenance before drawing conclusions. A nonempty database alone is not proof of audience learning.
