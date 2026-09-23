CREATE TABLE IF NOT EXISTS exposures (
 id TEXT PRIMARY KEY,
 visitor TEXT NOT NULL,
 session TEXT NOT NULL,
 story_id TEXT NOT NULL,
 experiment_id TEXT NOT NULL,
 hook_id TEXT NOT NULL,
 language TEXT NOT NULL,
 channel TEXT NOT NULL,
 created_at INTEGER NOT NULL,
 UNIQUE(visitor, session, story_id, experiment_id, language, channel)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS signals (
 exposure_id TEXT NOT NULL REFERENCES exposures(id),
 kind TEXT NOT NULL,
 created_at INTEGER NOT NULL,
 PRIMARY KEY(exposure_id,kind)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS exposures_cohort ON exposures(experiment_id,language,channel,created_at);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS exposures_visitor ON exposures(visitor,created_at);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS rate_limits (bucket TEXT PRIMARY KEY, hits INTEGER NOT NULL, expires_at INTEGER NOT NULL);
