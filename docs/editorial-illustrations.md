# Editorial illustrations —2026-09-22

Robin selected the ivory institutional journal with navy Night mode and an image beside each story. The five public/images JPEGs were independently generated using built-in ImageGen, visually inspected, then optimized for delivery. They are conceptual illustrations, not source evidence. Images are served from the same origin; no third-party image tracking. Original raster references and design QA captures remain under canonical work/design/20260922-journal (excluded from Git/runtime).

- mars.jpg: geological strata and planetary orb; intentionally conceptual, not a rover photograph.
- robot.jpg: anonymous industrial robot arm; not an FF model photograph.
- galaxy.jpg: spiral-galaxy illustration; not Roman survey output.
- oversight.jpg: computing cube and magnifying lens metaphor.
- security.jpg: hotel key and network-device metaphor.
- eviltokens.jpg (September23): brass key, doorway and envelope, a conceptual authorization-trap illustration. Built-in ImageGen; inspected and optimized to960×720,118,940bytes. No genuine login interface, documentary image or evidence is implied. Same image for both headline arms.

Render bilingual AI-illustration captions and alt text. Keep image/placement equal across headline variants. When adding a new story, provide a matching verified-source image with usage rights or a clearly labelled conceptual illustration, and add its route to the fixed build allowlist and story-art mapping. Unknown stories currently receive a generic galaxy illustration; replace that fallback before selecting a new lead. No external URLs or input-driven file paths enter the image route.

## October12 — IMAGEGEN editorial series replaces simple topic art

Robin approved three rich IMAGEGEN previews, then authorized the same style across all32 topics. Use conceptual photographic-surreal scenes with ivory, ink-green, brass and a restrained oxblood accent; strong physical depth, tactile materials and a story-specific focal subject. Keep important content visible at small sizes. No invented news photographs, quotations, document contents, logos or proof of products/events. Captions explicitly identify IMAGEGEN and imagined editorial scenes. These visuals sit outside untouched manuscripts and do not imply factual verification.

The approved32-image series lives under public/editorial-art/imagegen-v2, with 1200×800 and600×400 JPEG variants. Preserve generatedPNG originals privately and priorSVG/JPEG releases for rollback. The Stories thumbnails request the small version; article/salon views use responsive srcset/sizes, reserve dimensions and lazy-load. Never crop the central concept to fill an arbitrary card. The reviewed content/editorial-art.json manifest covers both sizes and hashes; the canonical build rejects missing or changed bytes.

Public images are separately packaged as Cloudflare Worker Static Assets, using the scoped EDITORIAL_ART binding. They do not enlarge the executable Worker or require a third-party image host. The independent reader passes only that binding into the canonical reader, with no analytics/database authority. Only64 reviewedJPEG paths are dispatched; private provenance is outside the asset directory. Missing binding is503, unlisted paths404. Existing domains and security settings are preserved. Future topics need their own reviewed conceptual image, both variants and updated map/manifest/allowlist; do not silently fall back to simple art.

Cloudflare asset-binding reference: https://developers.cloudflare.com/workers/static-assets/binding/ . Deploy through the existing independent release wrapper and test asset bytes/MIME on both hosts plus fresh Hong Kong evidence. Validate EN/ZH, Day/Night, phone/tablet widths and old article links. Physical handset access and audience effect require their own evidence.
