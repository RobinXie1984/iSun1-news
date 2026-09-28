# iSun1 Story Engine

Real events. Twenty competing framings. An honest attention loop.

[iSun1.news](https://isun1.news) is a bilingual news journal that starts from a verified event, finds its strongest supported surprise, and tests two headlines while preserving the underlying facts. It includes an institutional Day/Night interface, labelled AI illustrations, a reader, Hook Lab, and a small-cohort-aware Pulse view.

The source includes six event packets, 120 bilingual headline candidates, source-linked claims, and platform drafts for X, LinkedIn, WeChat and short video. Drafts are not published posts; shot plans are not finished videos. Audience improvement remains unproven until adequate observations exist.

## September 28 Model Olympics pilot

Read the [original model editions](content/model-olympics/README.md): six shared story briefs, independent English and Chinese submissions, and no automatic ranking. Robin will review the one-week pilot after October 4. Missing submissions remain explicitly unavailable; the existing audience thresholds do not gate this pilot. These are unedited model drafts, not independently verified reporting. The website uses Robin’s selected ivory editorial salon with English/Chinese and Day/Night.

## Run locally

Use Node 22+ with `node:sqlite` support and Python 3.10+. No runtime package installation is required.

```sh
npm run validate
npm run build
npm test
python3 -m unittest discover -s tests/screening -v
node scripts/preview.mjs
```

Open `http://127.0.0.1:4173/?preview=1`. Preview excludes attention measurement. The local server uses an isolated SQLite database under ignored `work/`; it does not connect to the live site's database.

```sh
npm run discover
npm run export
```

Discovery writes candidate links, not verified stories. Export writes platform drafts, not social posts. The separate [World Radar prototype](screening/README.md) screens broader news sources and requires editorial review before story production.

## How the loop works

1. Verify an event and its dates against primary evidence.
2. Write a shared fact spine: surprise, conflict, consequence and uncertainty.
3. Generate twenty genuinely different framings with claim references.
4. Test two frozen variants of the same story within a language/referral cohort.
5. Measure opt-in impressions, active reading and negative feedback. Keep missing values null.
6. Review sufficient observations before revising editorial choices. Never call a model score or tiny sample a winner.

Published experiments are immutable. Preserve the previous packet in `content/story-history.json`, assign a new experiment ID when changing its stimulus, and run `npm run seal` after review. [Measurement definitions](docs/metrics.md) describe the limits; [the runbook](docs/runbook.md) covers editing, deployment and recovery.

## Deploy your own instance

The Worker is portable; production hosting credentials and destination IDs are not included. See [deployment instructions](docs/runbook.md#deployment). `npm run build` works without a hosting account. `npm run build:release` fails explicitly until a valid destination is configured. Never connect a fork to another operator's production resources.

## Source and attribution

This repository is a reviewed public source snapshot. `PUBLIC_SOURCE_MANIFEST.json` records hashes of files copied unchanged from the maintained source. Private operational history and visitor observations are excluded.

The project-local `isun1-storycraft` skill encodes the editorial method. The vendored `humanizer` text is pinned and carries its upstream MIT license and provenance under `.agents/skills/humanizer/`. No upstream executable code is installed. Other third-party ideas and references are attributed in [the methodology](docs/attention-methodology.md). Publication of this repository does not add a new license to material without one.
