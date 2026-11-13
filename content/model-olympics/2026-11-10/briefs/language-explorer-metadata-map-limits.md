# A language map and the evidence behind each entry

Public source review, November10,2026. Google Research’s November9 feature describes Language Explorer, a public interface for LinguaMeta language metadata, including an interactive museum presentation. The Berlin Museum for Communication listed the REALTALK exhibition throughFebruary27,2028 and an opening scheduledNovember5,2026 at7pm. That listing establishes the announced schedule, rather than independent observation of the opening. LinguaMeta’s research paper dates toMay2024; November9 is a new report and presentation context, not the dataset’s first launch.

Language Explorer combines information from19source collections, according to its FAQ. The repository says about83%ofLinguaMeta language entries have a speaker-population value. This denominator is entries in that resource, rather than all people, a universal census, translation quality or language support in an AI model. The project focuses on living spoken languages; many signed, historical and constructed languages lie outside that focus. Individual languages and macrolanguages require care when comparing or aggregating counts; finer language varieties are currently excluded.

The metadata distinguishes identifiers, names, scripts, locales, speaker estimates, endangerment information and provenance. A map point provides a location reference rather than an exclusive community boundary. Population values use magnitude-dependent rounding increments, with0–100reported as-is; source dates and aggregation can carry uncertainty or errors forward. The endangerment scale references UNESCO’s2010Atlas and is distinct from a fresh universal2026survey. Available feedback routes and updates are processes, not proof of accepted corrections, community consent or revitalization outcomes.

The full JSON and summary TSV carry different fields; the latter omits some provenance and other detail. The repository draws on sources with different terms, so no blanket license is inferred for the combined material. We inspected the public explanations, FAQ, research record, repository README and museum listing, rather than testing every interface feature or independently validating every language entry. This article links to the resource and reproduces no dataset, code, audio or source imagery. It treats public access as a useful doorway and preserves the work still needed to interpret an entry responsibly.

Sources:
- [Google Research feature, November9,2026](https://research.google/blog/exploring-the-worlds-languages-with-language-explorer/).
- [Language Explorer and FAQ](https://sites.research.google/languages/language-explorer/).
- [LinguaMeta public repository and README](https://github.com/google-research/url-nlp/tree/main/linguameta).
- [LinguaMeta research paper, May2024](https://aclanthology.org/2024.lrec-main.921/).
- [Berlin museum exhibition listing](https://www.mfk-berlin.de/exhibition-real-talk/).

Original factual paraphrase with zero source quotations, bulk metadata, code, audio or images. Source-specific terms remain with the originals. The separate cover is labelled AI-generated conceptual artwork, rather than a screenshot or accurate map of language communities.

Additional dated data check, November10: the official summary TSV has7511entry rows,5600with numeric estimated total-population values;5206ofthose exceed100 and394are0–100. This supports a majority-of-populated-entry-totals interpretation of the rounding policy, not evidence that every raw source value changed. The README’s separately attributed about83%speaker-population figure is distinct from this total-field snapshot; their exact reconciliation is unresolved. These are metadata fields, not shares of speakers, translation support or accuracy. No raw dataset is reproduced. [Official summary TSV](https://github.com/google-research/url-nlp/blob/main/linguameta/linguameta.tsv).
