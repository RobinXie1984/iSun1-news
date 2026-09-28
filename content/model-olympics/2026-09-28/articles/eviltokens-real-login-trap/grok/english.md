Worked for 30s

Three viral headline options

Suspenseful: The Code on Your Screen Was Real. That Was the Trap.
Emotional Resonance: You Did Everything Right—and Still Handed Them the Inbox
Counter-intuitive: MFA Worked. That’s How They Got In.
The Login Page Was Real. The Request Was Not.

Based on Microsoft’s September 22, 2026 investigation and disruption announcements. Figures below are Microsoft’s service-wide counts unless otherwise attributed. They are not an independent census, and they are not a count of device-code phishing alone.

[Fiction — composite scene, not a documented incident.]

A facilities manager in a mid-size firm opens what looks like a password-expiry notice. The tone is familiar. The clock is ticking. She clicks. A short code appears, already copied to her clipboard. The next button sends her to a Microsoft address she recognizes. She pastes the code, completes multifactor authentication the way she has been trained to, and gets on with her day.

Nothing on that page looks stolen. Nothing asks for a password she has not already given Microsoft. Somewhere else, a session she never meant to create is already alive.

That is the shape of the trap Microsoft described last week. The company did not claim a cryptographic break in MFA. It described something colder: a legitimate authorization flow, pointed at the wrong device, blessed by a real user.

What Microsoft actually said

On September 22, 2026, Microsoft published two paired accounts of the same operation. Threat Intelligence laid out how the phishing-as-a-service platform EvilTokens abused the OAuth device-authorization grant. The Digital Crimes Unit described the court-backed disruption that followed.⁠Microsoft

Microsoft says EvilTokens emerged in February 2026 and became one of the most widely used PhaaS platforms of the year. It links the service to more than 12,000 compromised inboxes across more than 10,000 organizations worldwide. Those are Microsoft’s service-wide figures. They should be read as such.⁠Microsoft

Microsoft tracks the developers and supporters of the kit as Storm-2992. That is a tracking designation, not a courtroom identification of every customer who rented the panel.⁠Microsoft

The product was sold the way software-as-a-service is sold, only the customer was a criminal operator. Microsoft says the offer came with customer support and a management interface, for a $1,500 initiation fee plus $500 a month. Add-ons existed: anti-bot redirectors, senders, capture links. The storefront, according to Microsoft, lived on Telegram.⁠Blogs.microsoft

A genuine Microsoft domain does not establish that the authorization request is legitimate. That sentence is the whole story, compressed.

The kindness Microsoft built for televisions

Device-code authentication is not a backdoor. It is a published OAuth 2.0 grant for hardware that cannot host a normal login: smart TVs, printers, conference-room kits, Teams devices. One screen shows a short user code. Another device—usually a phone or laptop browser—opens Microsoft’s real device-login portal, enters the code, and approves access.⁠Microsoft

EvilTokens did not invent that handshake. It industrialized the lie around it.

Microsoft’s technical account of the flow is unusually specific:

A lure—password expiry, invoice, shared file, compensation notice—carries a link or attachment.
The victim lands on a page running a background script.
That script talks to Microsoft’s identity provider in real time and requests a live device code.
The page displays the code, often with a copy button, and a “Continue with Microsoft” control that opens the official portal.
The script polls, every few seconds, waiting for the victim to finish.
The victim pastes the code on Microsoft’s site. If they are already signed in, confirmation can be enough. If not, they enter a password and complete MFA—on the real domain.
The attacker, who started the request and still holds the matching device code, receives access and refresh tokens. The password never has to leave the victim.⁠Microsoft

The 15-minute window is the attack’s clock. The polling loop is the attack’s patience. The official URL is the attack’s alibi.

Memorable line: They did not steal the key. They asked you to unlock the door for a television that was never in the room.

MFA did not fail. The story around it did.

This is the part that will age badly if we tell it sloppily.

Microsoft describes circumvention of traditional MFA protections through authorization and session context. The report does not establish a cryptographic break in MFA. Microsoft continues to recommend MFA, and it points defenders toward phishing-resistant methods such as FIDO / passkeys where they can.⁠Microsoft

What happened, in plain language: the victim performed a real authentication for a request they did not understand. MFA proved the person was present. It did not prove the device deserved to exist.

If you already had a session, the extra friction was even thinner. Paste, confirm, done.

Security theater loves a villain who “bypasses MFA.” The more precise sentence is less cinematic and more useful: MFA answered a different question than the one the attacker needed you to ask.

The question MFA answers: Is this person you?

The question the victim needed: What, exactly, am I authorizing—and for whom?

A logo in the address bar cannot answer the second question.

After the click: the inbox becomes a map

Compromise was only the on-ramp. Microsoft says EvilTokens offered AI capabilities for tailoring lures to people’s roles and for analyzing compromised mailboxes for financial conversations and trusted relationships. Criminals could use that information to choose impersonation targets. That is a description of reported product features. It is not proof that AI caused every compromise.⁠Microsoft

The Digital Crimes Unit put the same idea more sharply. From Microsoft’s disruption post:

“AI was not simply helping attackers write more convincing messages. It helped them decide who to target, who to impersonate, and how to most effectively exploit the relationship to extract as much money as possible.”⁠Blogs.microsoft

Preset prompts, as Microsoft describes them, hunted the boring, expensive sentences in a company: wire-transfer talk, vendor invoices, the people who can move money, the names everyone already trusts. Summarize. Translate. Rank. Draft the follow-up in the victim’s own register.⁠Blogs.microsoft

Microsoft also describes malicious inbox rules used to hide the traffic that follows—forwarding, deletion, burial of warnings. Behavior varied between incidents. Not every operator ran the same playbook. Some used the panel as a blunt instrument. Some used it as a research desk.⁠Microsoft

The economic point is uglier than the technical one. Business email compromise used to require a human who could sit in a stolen mailbox and read. That labor was slow, language-bound, and sloppy. A dashboard that can scan for “who pays whom” compresses days into minutes. Microsoft’s own lesson to organizations is exactly that: once an inbox is open, assume the contents can be understood quickly. Then verify payment changes on a channel you already trust—not the thread that just asked you to.⁠Blogs.microsoft

Memorable line: The first theft is access. The second theft is context.

A product, not a masterpiece

It helps to stop calling this “hacking” as if it were a lone genius at a dark terminal.

EvilTokens was merchandised. Microsoft describes kits, templates, landing pages, a control panel, and support. Lure themes reported around the same announcement include construction bids, partnership agreements, compensation and benefits notices, password-expiry warnings, invoices, voicemail and eFax notices, e-signature requests. The menu is the tell. Crime at this scale looks like onboarding.⁠Axios

Infrastructure, in Microsoft’s write-up, leaned on short-lived nodes, redirects through high-reputation platforms, and pages designed to bore scanners: fake CAPTCHAs, image links, multi-stage hops. In April 2026, Microsoft tracked a campaign aligned with EvilTokens that spun up thousands of unique polling nodes and used Node.js backend logic to slip past signature- and pattern-based detection. That is commodity cloud abuse wearing a custom shirt.⁠Microsoft

SpyCloud, a partner in the disruption, published its own visibility: more than 8,700 unique victim accounts with a captured device-code token in its dataset, across thousands of corporate domains and dozens of countries, with first captures in mid-February 2026. That is a partner’s collection, not Microsoft’s 12,000 figure, and the two should not be flattened into one number.⁠Spycloud

Coinbase’s work on related crypto rails has been reported separately as tracing on the order of a million dollars across hundreds of addresses. Treat that as partner-attributed financial tracing, not a full profit-and-loss statement for the service.⁠Csoonline

The picture that survives all the caveats is still stark: someone productized a legitimate Microsoft flow, rented it monthly, and attached an analyst that never sleeps.

The raid, and the part a raid cannot do

Microsoft and Health-ISAC obtained authorization from the U.S. District Court for the Eastern District of Virginia. Microsoft calls this the Digital Crimes Unit’s 40th court-authorized disruption. Partners named in the company’s account include Cloudflare, Coinbase, OpenAI, Railway, SpyCloud, the Shadowserver Foundation, and TRM Labs. Health-ISAC joined as co-plaintiff; Microsoft says healthcare organizations were among those targeted.⁠Blogs.microsoft

The visible scoreboard: 50 websites seized, more than 150 supporting domains disabled.

In the United Kingdom, the Metropolitan Police Service arrested two men, aged 32 and 38, on suspicion of offenses connected with the alleged operation. Both were released on police bail while the investigation continued. An arrest is not a conviction. Microsoft did not present the takedown as a finished biography of every operator.⁠Blogs.microsoft

Microsoft is explicit about the limits. Seizure does not establish eradication. It does not establish complete account recovery. Access can persist after a password reset if associated sessions and tokens remain valid. A new password changes what you type next. It does not automatically evict a refresh token that was issued last Tuesday.⁠Blogs.microsoft

From the same disruption post:

“The infrastructure supporting EvilTokens has been disrupted, but the model it demonstrated will not disappear with it.”⁠Blogs.microsoft

That is the adult sentence in the press release. Kits get cloned. Flows stay documented. The next panel will have a different name and the same clipboard button.

What still works, if you actually do it

Legitimate device-code uses remain. Do not pretend every printer login is a crime. Microsoft’s guidance is narrower and more operational:

Audit who is allowed to use device-code flow.
Block it where you can. Keep exceptions tight and named.
Watch for anomalous device-code authentications, then look immediately for new inbox rules.
If you suspect compromise, resetting a password is not the whole job. Revoke sessions and tokens. Microsoft notes that ordinary session revocation can leave access tokens alive for a short window; in hands-on fraud, that window is enough. Temporary account disablement is the ugly, effective option.
Treat payment-detail changes, new beneficiaries, and “updated wiring instructions” as out-of-band problems. Call the number you already have. Do not reply inside the thread that asked.
Keep MFA. Prefer phishing-resistant methods. MFA is still a pillar. It is not a personality test for every OAuth grant.⁠Microsoft

Users need a shorter script than a Conditional Access policy:

If a page hands you a code and tells you to paste it into Microsoft to “continue,” ask one question first: what device is waiting on the other end? If the honest answer is “I don’t know,” you are not completing a login. You are deputizing a stranger.

Memorable line: A real website can still host a fake intention.

The takeaway that travels

EvilTokens is easy to misremember as an AI story or an MFA story. It is both only at the edges.

At the center it is a consent story. A user was asked to bless a session. The blessing happened on a trusted domain. The session belonged to someone else. Automation made the ask cheap. A language model made the stolen mail searchable. A monthly fee made the whole chain available to people who could not have built it.

We keep training people to hunt for misspelled domains and greedy password forms. Those lessons are not wrong. They are incomplete. The next expensive mistake will look like compliance. It will wear the correct TLS certificate. It will thank you for completing verification.

Password reset is hygiene. Token revocation is eviction. Second-channel verification is the only adult answer to a sentence that begins, “Please update our bank details.”

Microsoft disrupted a storefront. It did not repeal the device-code grant, and it should not. The grant still has honest work to do in rooms full of screens that have no keyboards. The work left for everyone else is narrower: stop treating “I signed in at login.microsoft.com” as the end of the sentence.

The sentence has a second clause now: signed in to what?

Your turn.

If a page handed you a six- or seven-character code tomorrow and sent you to Microsoft’s real device-login site, what would you check before you pasted it—and would your company even know if you guessed wrong?

10 sources