Headline options

Suspenseful: One Click, Then Silence for Four Months? Inside Europe’s Unfinished Bet on Making “No” Stick

Emotional Resonance: The Small Dignity of Being Believed the First Time You Say No

Counter-intuitive: Europe’s Cookie Fix Isn’t Really About Banners. It’s About Teaching Websites to Remember a Refusal.

One Click, Then Silence: Europe Tests Whether “No” Can Finally Mean No

The short version: On 21 October 2026, the Council of the EU agreed its negotiating position on the “Digital Omnibus,” a package meant to simplify Europe’s data protection, privacy and incident-reporting rules. The most human-scale idea in it is simple. If you refuse cookie consent, the refusal should take one easy click (or an equivalent means), and the site should not ask you again for the same purpose for at least four months.

That is the headline. The fine print matters just as much. This is a proposal, not law. The European Parliament hasn’t adopted its own position, no final deal exists, and no implementation date has been set. Nothing changes today for European websites, and nothing changes for Hong Kong websites either. The proposal is also narrower than “four months without pop-ups.” It covers repeat requests for the same purpose after a refusal, not every banner, every cookie or every communication.

So this isn’t a story about a new right you already have. It’s about a design problem the EU is trying to legislate, and about whether a regulator can fix a user-interface failure without opening new gaps somewhere else.

The problem everyone recognises

Anyone who has browsed in Europe, or browsed European sites from elsewhere, knows the routine. A banner covers half the screen. “Accept all” is big and bright. Refusing means hunting through a menu, toggling switches and confirming. A week later, sometimes the next visit, the banner is back and you go through it all again.

In practice the system rewards persistence. If a site can ask again and again, it doesn’t have to win your consent once. It only has to wait until you’re tired, distracted or in a hurry. The law has long required consent for many non-essential cookies. What it hasn’t clearly settled is how much the asking can wear you down.

That is what makes this Council proposal interesting. It doesn’t only regulate what websites may do with your data. It regulates the rhythm of the conversation: how easy it is to say no, and how long a no lasts.

What the Council actually agreed

There are two documents behind this story, and the distinction between them matters.

The first is the Council’s press release from 21 October, updated on 22 October, which announces that member states agreed a position on the Digital Omnibus to simplify data protection, privacy and incident-reporting rules. The second is the mandate itself, Council document 14756/26, dated 22 October. It’s a marked-up draft, so deleted text appears on the page but isn’t part of the agreed wording. Anyone quoting it needs to read carefully, because a struck-through clause can look like policy at a glance.

Here is what the mandate proposes on cookie consent (printed page 158):

A single-click refusal. Users should be able to refuse consent through an easy, intelligible single click or an equivalent means.
A cooling-off period after refusal. Once a user refuses, no new consent request for the same purpose for at least four months.

Two phrases do most of the work: “same purpose” and “at least.” The first means a site could, in principle, still ask about a different purpose. The second makes four months a floor, not a fixed term.

What the provision doesn’t do is just as important. It isn’t a four-month ban on all pop-ups. It doesn’t stop all cookies. It doesn’t block all communications from a site. And it isn’t in force.

The quieter half: clearer exceptions

The single click will get the attention. The second part of the cookie proposal may matter more to the businesses running these sites.

According to the press release and printed pages 157–158 of the mandate, the Council proposes clearer exceptions from cookie consent for three kinds of use:

Services the user has requested
Audience measurement
Device security

These are conditional exceptions. The mandate sets conditions on each, so this doesn’t legalise unrestricted tracking, profiling or the sale of user information. And cookie rules stay in the ePrivacy Directive rather than moving somewhere new.

My analysis: the two halves fit together. If a site has a clearly lawful basis to place certain cookies without asking, it has less reason to show a banner at all. If you then make refusal easy and lasting for what remains, the banner turns into a rarer, more honest question. That is the theory. Whether it works depends on how tightly the conditions on those exceptions are drafted and enforced. Exceptions that are too wide could shrink banners mostly by shrinking what you’re asked about.

Beyond cookies: what else is in the package

The Digital Omnibus isn’t only about cookie banners. Three other parts of the Council position are worth knowing, mainly because they’re easy to misreport.

Personal data keeps its definition

According to the press release, the Council keeps the current definition of personal data. It adds provisions on pseudonymisation and identifiability, plus safeguards around proposed exceptions for sensitive data.

The misreading to avoid: this doesn’t declare all pseudonymised data anonymous, and it doesn’t give AI systems unrestricted access to personal data. For readers in AI or data work (and I count myself among them), the honest summary is that the Council is clarifying where the line between identifiable and non-identifiable sits, not erasing it.

Incident reporting: national doors, not one EU door

The original proposal included a single EU-wide entry point for incident reporting. The Council replaced it with national entry points in each member state, plus an EU-level information point.

My analysis: this is a familiar EU trade-off between central simplicity and national control. One door is easier for companies operating across borders. Many doors keep authority with member states. The Council chose the latter, with an EU-level point for information. How smooth this is for a company reporting in several countries will depend on implementation details not yet settled.

The 96-hour line

The mandate’s printed page 137 includes a proposed GDPR breach-notification rule. For breaches likely to create a high risk to individuals’ rights and freedoms, notification should happen without undue delay and, where feasible, no later than 96 hours after becoming aware of the breach.

This is the clause most likely to be misread, so let’s be direct. It is not a 96-hour grace period. The core obligation is “without undue delay.” The 96-hour figure is an outer limit that applies “where feasible.” A company that waits three days because the clock allows it is reading the text backwards. The proposal also doesn’t remove reporting obligations.

The story behind the story: memory as a privacy feature

Now for the counter-intuitive part.

We usually think privacy means a system forgetting things: deleting data, minimising collection, letting records expire. The four-month rule asks a website to remember something about you, namely that you said no.

That’s a design insight, and as a builder I find it the most elegant part of the proposal. A refusal that’s forgotten on the next page load isn’t really a refusal. It’s a delay. For “no” to mean anything, the system has to retain it.

(Analysis, not source fact: this creates an engineering puzzle. How does a site remember your refusal without tracking you? Presumably it needs to store some signal of your choice, and how that interacts with the cookie rules themselves is the kind of detail the final text and future guidance would need to address. The brief I’m working from doesn’t settle it, so I’ll flag it as an open question rather than answer it.)

Who wins, who worries

The Council’s ministers framed the package as reducing costs and strengthening competitiveness. Those are policy aims, not measured outcomes. Neither the press release nor the mandate offers quantified savings or demonstrated privacy improvements. When you see coverage saying “EU cuts compliance costs by X,” check whether X came from the source. In this case, it didn’t.

With that caveat, here is my reading of the tensions. This is analysis, not legal advice.

For users, the upside is plain: less repetition and a refusal that holds. The risk sits in the exceptions. If “audience measurement” or “requested services” are interpreted loosely, users could see fewer banners partly because less is being asked.

For publishers and platforms, fewer repeat requests could mean a cleaner experience and less friction. But the four-month rule removes a tactic some sites have relied on, which is asking until users give in. Consent rates built on persistence would likely fall. That isn’t a side effect; it’s arguably the point.

For regulators, the hard part is enforcement. A single-click refusal is easy to write into law and harder to verify across millions of sites. “Equivalent means” will need interpretation. So will “same purpose,” because a site could rephrase a purpose to reopen the question. The final text will need to close that loophole, or enforcement will have to.

For incident response teams, national entry points and the 96-hour outer limit could bring clarity. The risk is that the number becomes a target instead of a ceiling.

The meta-lesson for anyone who builds products: a regulator is trying to fix a user-interface failure with a legal instrument. That’s hard. Interfaces change faster than laws, and every rule creates a new optimisation target. The four-month rule is a bet that you can change incentives, not just require a button.

Why this matters from Hong Kong

I’m writing from Hong Kong, so here is the local angle, carefully. This is an EU negotiating position. It does not apply to Hong Kong websites, and nothing in it changes anyone’s obligations today. Existing rules can’t be switched off on the strength of a Council mandate.

Still, the EU’s privacy rules have a way of setting design norms beyond Europe, because many global products end up building one consent flow for every market. Whether this proposal travels depends on whether it survives negotiation with Parliament and in what form. I’m not suggesting any business change its compliance setup now. I’m saying this is worth watching if you build products used by Europeans.

What happens next

The next step is the European Parliament. It must adopt its own position before the two institutions negotiate a final text, and there’s no established timetable for a final agreement or implementation. Any of the provisions above could change: the single click, the four-month floor, the exceptions and the 96-hour line.

So take the four-month refusal as a sign of direction, not a done deal. Europe is publicly testing an idea that’s surprisingly rare in digital policy: that respecting someone’s choice includes respecting it the second time, and the tenth.

If it survives, the most visible change won’t be a new kind of banner. It’ll be a banner that, after you say no, doesn’t come back for a while.

Sources
S1: Council of the EU press release, “Digital rulebook: Council agrees position to simplify data protection, privacy and cyber reporting rules,” 21 October 2026 (updated 22 October 2026). https://www.consilium.europa.eu/en/press/press-releases/2026/10/21/digital-rulebook-council-agrees-position-to-simplify-data-protection-privacy-and-cyber-reporting-rules/
S2: Council mandate document ST 14756/26, dated 22 October 2026, notably printed pages 137, 157–158. Marked-up draft; deleted text is not agreed Council wording. https://data.consilium.europa.eu/doc/document/ST-14756-2026-INIT/en/pdf

This article is analysis of a negotiating position, not legal advice. Facts are drawn from a brief compiled on 25 October 2026.