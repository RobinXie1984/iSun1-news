Worked for 34s

Three headline options

Suspenseful: They Didn’t Need Your Password. They Needed You to Join Hotel Wi‑Fi.
Emotional Resonance: The Lobby Network Turned a Business Trip Into a Hunting Ground
Counter-intuitive: The Most Dangerous Sign-In Page Was the Real Microsoft One

You land late. The lobby smells like carpet cleaner and conference coffee. The front desk slides over a room key and, without thinking, you tap the network everyone else is on: Hotel-Guest. A captive-portal page loads. Accept. Browse. Check email. That is the whole ritual — the most ordinary five seconds of modern travel.

That ritual is now part of an espionage story.

On 10 September 2026, Anthropic published a threat-intelligence report describing an operator it tracks as GTG-20006. Anthropic says the actor compromised at least three hotel Wi‑Fi suppliers, then used guest and device information to decide who was worth further attention. That “at least three” is a supplier count. It does not tell us how many hotels, how many travelers, or how many corporate accounts were affected. The public record does not establish those numbers.⁠Anthropic

Two earlier investigations had already sketched the machinery. ReliaQuest published on 23 July 2026. Microsoft published on 31 July 2026, naming the campaign CaptiveCrunch and attributing it to Storm-2945, a sub-cluster of Midnight Blizzard. Anthropic later said its attribution for GTG-20006 is consistent with public reporting that links the actor to Midnight Blizzard. Those are vendor assessments, not courtroom verdicts. Treat them as such.⁠Microsoft

What follows is the sequence the reports actually support — and the line they refuse to cross.

The box behind the front desk

ReliaQuest’s July investigation is the first public snapshot of the hospitality version of an old trick: take the network that answers every guest’s DNS query, then lie.

Researchers said attackers had gained administrative control of captive-portal appliances used at hotels and other shared venues. Those boxes sit at the edge of guest Wi‑Fi. Compromise one, and you can rewrite the internet’s phone book for everyone who joins. ReliaQuest reported compromised gateways in multiple U.S. cities and internationally in India and Saudi Arabia, with activity ongoing since at least June 2026. Traffic they observed came from people working in financial services, professional services, legal, healthcare, energy, and retail — a traveling-staff pattern, not a single-industry smash-and-grab.⁠Reliaquest

The point of the rewrite was not to steal every cat video. It was to intercept people trying to reach Microsoft services. ReliaQuest named lookalike domains used in the activity, including m365-owa[.]com, owa-ms365[.]com, ms365-device[.]com, and ms365-live[.]com. In some cases the redirect served Microsoft-themed pages. In a limited number of observed cases, hotel-network redirects were paired with device-code abuse: the victim was steered into approving a session the attacker had already started. Valid OAuth tokens then went to an attacker-controlled client. That path does not require collecting a password on a fake sign-in form.⁠Reliaquest

ReliaQuest assessed the tradecraft as similar to earlier router campaigns associated with APT28 / Forest Blizzard. Similarity is not identity. The firm did not claim this hospitality campaign was FrostArmada, and it did not claim every guest on every hotel network saw the same lure.

Takeaway line: The attack did not have to live in your inbox. It could live in the appliance that tells your phone where login.microsoftonline.com is.

CaptiveCrunch: when the “update” is the payload

Eight days later, Microsoft published the fuller operational picture it called CaptiveCrunch.

Microsoft said that since early May 2026 it had observed Storm-2945 conducting widespread but targeted traffic-manipulation attacks on hospitality networks and other environments served by captive portals. The company assessed Storm-2945 as an operational sub-cluster of Midnight Blizzard — the Russia-linked actor also publicly associated with SVR activity — based on technical and operational overlaps, including similarities to the earlier Storm-2372 cluster known for device-code and OAuth phishing. That is Microsoft’s investigative finding.⁠Microsoft

The campaign, as Microsoft described it, was not one trick repeated identically. Some guests were redirected through actor-controlled phishing infrastructure. Other activity led to malware delivery. Fake-update lures — the family of prompts researchers often group under “ClickFix” — told a tired traveler that the browser or the OS needed a fix. Microsoft detailed two families in particular:

CornFlake, a Go-based Windows remote-access tool that persisted under bland names such as svchost32.exe / “Cloud Sync Service.”
ChocoShell, a PowerShell infostealer aimed at browser data and Microsoft 365 tokens.

Microsoft also said Storm-2945 had leveraged AI to support a significant portion of the operation, including signs of AI-assisted code generation. The reports describe several tactics. They do not imply that every targeted traveler encountered the same attack.⁠Microsoft

Takeaway line: The captive portal is the one page travelers are trained to click through without thinking. That is why owning the real portal beats building a fake hotel.

The approval you give without noticing

Device-code authorization is not a hack by itself. It is a legitimate Microsoft sign-in flow: a constrained device (or an app acting like one) shows a code; you approve it on another device; the requesting application receives tokens. Microsoft documents this as the OAuth 2.0 device authorization grant.⁠Volexity

The abuse is social, not cryptographic. An attacker starts the flow. You are pushed — by a redirect, a prompt, a “connect this device” screen — to the genuine Microsoft device-code page. You approve what looks like your own session. The tokens land with the attacker’s client. Multi-factor authentication can already have been satisfied, because you completed it.

Volexity documented separate Russian-linked device-code cases in February 2025, including use of genuine Microsoft device-code pages. Those cases explain the mechanism. They are not extra hotel-campaign victims automatically folded into CaptiveCrunch. The 2025 evidence and the 2026 hospitality evidence sit in different files.⁠Volexity

Two limits matter more than any scare headline:

Merely connecting to Wi‑Fi does not establish that an account was compromised.
A real sign-in domain does not tell you whose session you are authorizing.

Takeaway line: The password page was the old con. The new con is getting you to bless a session that was never yours.

September: the suppliers, the guest list, the sorting hat

Anthropic’s 10 September 2026 report is what turns a hospitality-network problem into a targeting story.

GTG-20006, Anthropic wrote, did not only go after organizations directly. To reach targets indirectly, the actor compromised at least three hospitality vendors that operate hotel guest Wi‑Fi. With stolen admin credentials, it modified DNS records so they pointed at actor-owned services. Guests on those vendors’ networks who connected had traffic, device identifiers, and IP addresses sent to the actor’s servers. ClickFix-style lures were then staged to deliver Windows, Android, and iOS malware.⁠Anthropic

Then comes the detail that should follow every traveler home: the actor combined guest information stolen from hotel management systems with data stolen from individual guest devices, and used the blend to focus further operations. Anthropic said particular targets of interest were individuals associated with Ukraine, including government officials and drone manufacturers. Microsoft’s July write-up is the method paper Anthropic points back to.⁠Misuseofai

Around that hotel vector sits a larger espionage machine Anthropic says it disrupted. The firm reported GTG-20006 targeting more than 20 organizations — ministries, defense and intelligence bodies, embassies, think tanks, defense-industrial firms — concentrated in Ukraine and Europe, with activity also described in the Middle East and among maritime-related government agencies in Asia. It described customized AI-driven workflows that automated large stretches of the operation: infrastructure, phishing, persistence, command-and-control, even rebuilding implants after security products flagged them. Humans, Anthropic said, stayed in the loop to set targets and review what was stolen. One operator is described as a Russian speaker using the handle “JackPoterz.” Attribution is “consistent with” public Midnight Blizzard reporting, not a sworn identity parade.⁠Anthropic

Anthropic also reported other GTG-20006 outcomes that are not the hotel story and should not be flattened into it: bulk mailbox exports from drone-component manufacturers; theft of a drone-vision SDK; a separate North African government-technology intrusion in which more than 300,000 national identity records and commercial-registry data on more than 500,000 companies were exfiltrated. Those figures belong to those incidents. They are not a census of hotel guests.

Takeaway line: The Wi‑Fi was not the prize. The Wi‑Fi was a filter. The prize was knowing which guest was worth a second look.

A composite night that is not a quotation

[Fiction — a composite scene, not a documented incident. No real traveler is being described.]

A procurement manager from a midsize manufacturer checks in after a delayed flight. She joins guest Wi‑Fi so the boarding-pass app will load. A page insists the browser is out of date. She is tired. She has clicked a hundred hotel portals. She clicks again. Nothing dramatic happens. She sleeps. In the morning her mail still opens. The fiction ends there, because that is how this class of operation is supposed to feel: not cinematic, just slightly more convenient than it should be.

The nonfiction resumes at the limits.

What the record does not say

This is the part most “hotel Wi‑Fi is owned” posts skip.

Compromising suppliers is not a count of hotels.
Device identifiers and IP addresses on a hostile resolver are not, by themselves, a looted inbox.
Device-code theft requires the user’s approval.
ReliaQuest, Microsoft, and Anthropic describe overlapping tradecraft across different dates and different slices of visibility. They do not prove that every targeted traveler saw one identical attack.
The sources do not establish that all hotel networks are affected.
The original brief for this story was checked on 20 September 2026. The sources do not verify whether the reported campaign was still active on that date.

Uncertainty is not a footnote. It is the difference between a threat intelligence report and a panic.

How to travel like the network is hostile — because sometimes it is

Microsoft’s practical advice is unglamorous and correct: treat hotel, conference, airport, and other guest wireless as untrustworthy. Prefer a phone hotspot, eSIM, or enterprise-managed travel router. Do not download “updates” a captive portal hands you. Do not type corporate credentials into a page the network pops up the moment you connect. Security teams can go further: block or tightly control the device-code flow in Entra ID, require phishing-resistant MFA, restrict where new MFA methods can be registered, and hunt for the infrastructure and malware families Microsoft published.⁠Microsoft

A VPN helps after it is up. It does not bless the five seconds before it is up, and it does not save you from approving a device-code prompt on a real Microsoft page.

None of that is a moral lecture about coffee-shop Wi‑Fi. It is a response to a specific design: hospitality networks concentrate travelers, captive portals concentrate trust, and a small number of suppliers concentrate the blast radius.

The line worth keeping

Espionage used to look like a spear-phish with a misspelled ministry. This campaign family looks like infrastructure doing the sorting first. Join the network. Announce a device. Leak a guest record. Then, only then, spend malware or an approval prompt on the people who match a list.

The old security slogan was “don’t click the link.” The sharper slogan now is narrower and harder:

Don’t authorize a session you did not start — even when the page is real.

The reports from 23 July, 31 July, and 10 September 2026 do not say your next hotel is compromised. They say a class of hotel plumbing was useful enough to state-linked operators that it became a targeting system. That is already enough.

Your turn: Last time you joined hotel or conference Wi‑Fi, what did you actually click — the portal, a “browser update,” a Microsoft approval prompt — and would you still click it tonight?

29 sources