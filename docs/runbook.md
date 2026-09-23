# Editorial loop and operation

## Change a story

1. Discover candidate events with `npm run discover`; inspect primary evidence independently. A feed title alone is not verification.
2. Establish dates, claims, sources, surprise, conflict, consequence and uncertainty before writing twenty bilingual framings.
3. Preserve existing published packets and their experiment IDs. To revise a stimulus, retain its exact previous packet in history and create a distinct experiment ID.
4. Review claims and framing; use `npm run seal` to record newly reviewed experiment fingerprints.
5. Run validation, build and tests. Inspect changed English/Chinese desktop/mobile views with `?preview=1` so QA remains outside observations.
6. Export platform drafts when useful. A draft is not a post. Publication requires an authorized destination and verified result.

Keep observed results separate from editorial predictions. Record the hypothesis, exact change, checks, measured result or UNKNOWN, and next test. Empty or suppressed samples do not establish either success or failure.

## Deployment

`npm run build` produces a portable Worker in `dist/server/`. It requires no production destination. Local output contains only the logical `DB` binding; no real project or database identifier is supplied.

For Sites, create or select your own authorized project using its supported hosting workflow. Copy `.openai/hosting.example.json` to `.openai/hosting.json` and add the exact `project_id` returned for that project. The real configuration file is ignored by Git. Then run:

```sh
npm run build:release
npm test
```

Release mode requires a nonempty Sites project ID and the expected `DB` binding. Missing or malformed configuration stops before build output is generated. These checks validate configuration shape, not account ownership or deployment authorization.

Publish the exact checked source and build through the supported provider workflow. The Worker entrypoint is `dist/server/index.js`; package its Wrangler metadata plus root `.openai/hosting.json` and `.openai/drizzle` migrations/journal. Validate the current provider's archive requirements before uploading. A successful upload alone does not prove deployment or public access: verify deployment status, health, preview feed, HTTPS and a fresh browser response.

For another Workers-compatible host, configure your own database using that provider's supported tools, bind it as `DB`, and apply the SQL migrations. `dist/server/wrangler.json` deliberately omits a database ID; it is not ready for direct production deployment without operator configuration.

## Recovery and privacy

- Retain the previous successful release for rollback. Avoid destructive resets and history rewrites.
- Database migrations are additive. Do not edit an already-applied migration or drop attention records to simplify a release.
- Preview uses a local database under ignored `work/`. Never point QA at production collection.
- Keep raw observations private. Public metrics suppress small cohorts; missing denominators and unavailable outcomes remain null.
- Preserve consent and measurement exclusions when changing navigation or layout.
- Record design cutovers and exclude ambiguous QA traffic from audience conclusions. A nonempty database does not prove a real readership.

World Radar remains a separate review prototype. Its research handoff is not publication approval; enabling a recurring collection or production integration is an explicit operator choice.
