# Windows Has Begun Offering Tamper Checks for the Messages That Follow a Sign-In. In May 2027, Servers Are Scheduled to Start Insisting

Windows computers spend much of each working day proving who their users are to other machines: file servers, printers, internal websites and business applications. One of the long-established systems Windows uses for this job is NTLM, short for NT LAN Manager. NTLM is an authentication protocol, meaning a shared set of rules two computers follow to check an identity. Microsoft still supports it alongside Kerberos, the protocol the company describes as its preferred choice for authentication. On November 10, 2026, Microsoft began a two-stage change to how NTLM protects the messages that travel after that identity check. In the first stage, updated Windows computers offer a cryptographic tamper check, called signing, by default. Servers at their standard setting still accept partners that leave the tamper check out. The second stage, planned for May 2027, is when Windows servers are scheduled to begin requiring it.

That gap between offering and requiring is the heart of this story. It explains why a security update can be real and useful while many connections continue to travel the old way for months. It also raises a practical puzzle for every organization that still depends on NTLM. Before May 2027 arrives, how can they learn which of their connections already carry the tamper check, and which would be turned away?

## A badge at the door, tape on the boxes

To follow the change, it helps to separate three jobs that security systems do. They are easy to blur together because they often happen in the same conversation between two computers.

The first job is authentication. This is the computer equivalent of checking an identity: the server gathers evidence that the person or program connecting has access to the right credentials. NTLM handles this through what Microsoft calls a challenge-response exchange. The server poses a kind of puzzle, and the client answers in a way that only someone holding the right secret could manage. Applications can also use NTLM to set up what Microsoft calls a security context. That is a shared arrangement between the two sides that governs how they protect what they say next.

The second job is integrity, which NTLM delivers through signing. Once the two sides have authenticated, they share a session key. A session key is a secret value for that particular conversation, and it is a separate thing from the user's actual password. With signing switched on, each protected message carries a mathematical check made with that key. The receiver runs the same check. A match tells the receiver that the message is consistent with the shared session and has stayed unaltered along the way.

The third job is confidentiality. In NTLM's vocabulary this is called sealing. Sealing scrambles the contents of messages through encryption so that onlookers see gibberish.

Here is an everyday illustration to hold these apart; it is an analogy and describes no real event. Picture a large office building. Showing your identity badge to the guard at the entrance is like authentication. Later in the day, you send packages to another floor. Wrapping each package in tamper-evident tape, the kind that visibly tears if someone opens it, is like signing. Putting the contents inside an opaque locked case is like sealing. A valid badge at the front door says a lot about who walked in. It says little about whether a package delivered at three o'clock arrived exactly as it was sent. Tamper-evident tape also leaves the contents visible to anyone who looks through a clear wrapper; hiding them is the locked case's separate job. The picture has limits. Real tape and real cryptography each depend on conditions, and this comparison treats both as strong safeguards with limits of their own.

Signing also differs from other things that share its name. It is a separate idea from the digital certificates that sign websites or software. It leaves the user's password unchanged. And it covers one property of one protocol, which is a far smaller claim than total network security.

## What changed on November 10

Microsoft's support article on the change, published November 10, 2026, says that Windows updates released on or after that date begin the first phase of NTLM message-signing improvements. The company ties the work to a vulnerability tracked as CVE-2026-118737. CVE stands for Common Vulnerabilities and Exposures, a public catalogue that gives each security flaw an identifying number. Microsoft's separate vulnerability record for this number was inaccessible when the documents for this article were checked on November 11, 2026, so the flaw's severity and exploitation status remain unverified here.

A second Microsoft document, the release note for a Windows 11 security update published the same day, describes the same client behavior for Windows 11 versions 24H2, 25H2 and 26H2. That note covers those three named versions; coverage for other Windows versions belongs to their own product-specific release notes. Because both documents come from Microsoft, their agreement confirms the company's account of what it released. Independent testing of the change sits outside these documents.

In Phase 1, an updated Windows client offers cryptographic signing by default on relevant non-anonymous NTLM connections. Non-anonymous means connections tied to an actual account, as opposed to open or guest access. At its documented default, a Windows server keeps accepting both signed and unsigned clients. So the first phase changes the opening offer in each negotiation, while the server's door stays open to partners that decline.

Two further distinctions matter here. An update that Microsoft has released is available. Installation on a given computer is a separate step that each organization controls. And installation by itself leaves open whether a particular connection ended up signed, because the outcome depends on what both sides agree to. Microsoft's documents describe the mechanism. Real-world measurements of adoption and effect would have to come from each organization's own records.

## A reassuring label and a weaker reality

One of the more revealing details in Microsoft's article concerns a setting with a confident name. NTLM includes an old marker called ALWAYS_SIGN. The name suggests that every message gets signed. Microsoft's documentation explains that this legacy marker, on its own, acts only as a placeholder and leaves messages lacking cryptographic integrity protection. According to Microsoft, applications that asked for certain integrity-related properties received real signing, while some applications that left those requests out could end up in a context carrying the reassuring label and missing the actual tamper check.

In the office illustration, this resembles a package stamped with the words "tamper-evident" and wrapped in ordinary tape. The stamp sounds protective. The tape behaves like any other tape.

This detail needs careful handling. NTLM has supported genuine cryptographic signing for a long time, and Microsoft states that all supported versions of Windows Server already have the capability. The November change concerns what clients ask for by default and, later, what servers will demand. The lesson of ALWAYS_SIGN is narrower and more practical: the protection a connection actually negotiated is what counts, and a label, a successful login or a reassuring setting name each tell only part of that story.

## Why a tamper check matters: relays

Microsoft's stated aim is to reduce exposure to relay attacks. At a general level, a relay works like this. An intermediary positions itself between a user's computer and some other machine. The user's computer begins a legitimate authentication exchange. The intermediary passes that exchange along to a different destination, where it can let the intermediary act with the user's identity. Because the relay works by forwarding the exchange, the intermediary can attempt it while the user's password stays unknown to it. Stealing a password and relaying a login are different problems.

Signing narrows what a relaying intermediary can do after the login succeeds. Protected follow-on messages require the session security that the two genuine parties share. An intermediary that lacks that session key has trouble producing messages that will pass the receiver's check. To return to the illustration: someone who slips into the building by trailing a genuine employee through the entrance still faces a problem when every package must carry tape that only the real sender can apply.

The scope of this benefit deserves equal clarity. Microsoft describes reduced exposure to the class of relay behavior it identifies, and its documents present that benefit as an expected effect of the design. Password guessing performed offline, malware, tricks aimed at people, and the many other ways networks get attacked are separate threats with separate defenses.

## The doors left open on purpose

Microsoft built compatibility into the first phase deliberately, and the documentation describes three kinds of openings.

The first is fallback. If a client offers signing and the server's reply lacks the matching signing support, Microsoft documents a path in which the client drops the signing request and continues with the legacy behavior. The connection works, and it carries the older, weaker protection. This path suits the current phase, when servers accept both kinds of partners. Microsoft's documents describe a different outcome for a server enforcing the Phase 2 requirement: on applicable connections, a client that leaves signing out would be rejected. Fallback therefore smooths the transition period and offers a much shakier guarantee for the period after it.

The second opening is for anonymous connections, sometimes called null sessions, and guest sessions. Microsoft's documentation exempts both from the signing requirement, including in the future phase. The reason is technical and stated plainly in the protocol specification: these sessions lack the session keys that signing depends on. Signing needs a shared secret, and these sessions lack one. This exception is scoped to signing. It describes how the protocol treats such sessions. What a particular guest account can reach depends on how each product and organization configures it, a separate question that Microsoft's signing documentation leaves to those settings.

The third concerns which machines Microsoft's promises cover. The company says supported Windows Server versions are capable of signing. Older, unsupported Windows systems and equipment from other makers that speaks NTLM, such as storage devices or specialized appliances, fall outside that statement. Their behavior depends on their own makers and settings.

## The countdown to May 2027

Phase 2 changes the stakes. Microsoft schedules Windows servers to require NTLM signing by default in May 2027. Its documents give the month and leave the exact day unspecified. Under the planned requirement, a client that declines to offer signing on an applicable connection would be rejected by a server enforcing it. Microsoft also says administrators may choose to turn on enforcement earlier after assessing compatibility. As of the November 11 review, Phase 2 is a published plan, servers at their default still accept unsigned clients, and plans can shift.

The rejection is the point of enforcement. A tamper check that partners can freely decline protects only the partners who choose to use it. A server that enforces the requirement demands signing on the connections it applies to, while anonymous and guest sessions remain exempt. The check it demands still depends on the session key and the conditions of the protocol, so the requirement raises the floor for covered connections and stops short of a universal security guarantee. The same rejection, though, can stop an older application, an aging device or a rarely used business process that depended on the unsigned path. Phase 1 lets those dependencies keep working quietly. Phase 2 is when any that remain would surface, possibly as failures.

So organizations need evidence, and Microsoft points to audit logs as a source. In the NTLM Operational log, which is one of the record books Windows keeps about its own activity, client computers can record event 4022 and servers can record event 4023. Microsoft documents enhanced versions of these events for Windows Server 2019 and later when the relevant enhanced auditing is in place. These records give administrators a place to look for connections that negotiated signing and connections that skipped it.

Reading those records takes care. Microsoft's article notes that both signed and unsigned connections can appear at the same Warning level. The severity label alone therefore gives an incomplete answer. The details inside the event, about what was negotiated, carry the meaning.

The harder problem is coverage. An audit is a sample of reality taken over some stretch of time. A quarterly payroll job, an annual archive transfer or a device that sits idle most weeks may stay silent in the logs during a short observation period and still depend on unsigned NTLM when its day comes. An empty search result over a few days is a statement about those few days. A trustworthy readiness picture needs a defined observation window, records from the relevant clients and servers, and knowledge of which applications travel which paths. That knowledge often lives with the owners of individual applications, who are a separate group from the people who manage Windows updates and from the ordinary employees using the systems.

It helps to keep two kinds of evidence apart. Unsigned NTLM traffic on a network is compatibility evidence. It shows a connection that may need attention before enforcement arrives. Evidence of a break-in belongs to a separate category, and unsigned traffic on its own sits in the compatibility category.

## The bigger picture, and the open question

This rollout sits inside a longer transition. Microsoft's technical background material names Kerberos as its preferred authentication protocol, and NTLM remains in use largely because older applications and devices still rely on it. The November change applies to NTLM alone and leaves Kerberos outside its scope. It keeps NTLM running and leaves the rest of Windows authentication in place. Its subject is signing, the integrity check; sealing, NTLM's separate confidentiality protection, answers a different question, and encryption arrangements vary from one application to the next. What the change does is tighten one property of one widely used protocol in stages, starting with a safer default offer and better visibility, and moving toward a firmer requirement.

Microsoft's documents establish the mechanism, the timeline and the tools for looking. Measurements of adoption, compatibility and security effect will live, if at all, inside each organization's own records, gathered over time by people who know which systems matter.

That leaves the question the first phase quietly sets in motion. Between now and a still-unannounced day in May 2027, each organization that relies on NTLM has a window to observe its own traffic, with the tamper check offered and the door still open. What will its logs reveal about the connections that have been traveling with ordinary tape all along, and will it find the rarest of them before the servers start checking?

## Sources

- Microsoft Support, "NTLM signing security improvements in Windows" (KB5135557), published November 10, 2026: https://support.microsoft.com/en-us/servicing/os/windows/docs/2026/11/kb5135557-ntlm-signing-security-improvements
- Microsoft Support, "November 10, 2026—KB5132061, Windows 11 24H2, 25H2 and 26H2 security update": https://support.microsoft.com/en-au/servicing/os/windows-11/2026/11/kb5132061-windows-11-24h2-25h2-26h2-security-update
- Microsoft Learn, "Microsoft NTLM," technical background, inspected November 11, 2026: https://learn.microsoft.com/en-us/windows/win32/secauthn/microsoft-ntlm
- Microsoft Open Specifications, MS-NLMP 3.4 "Session Security Details," last updated March 30, 2026, inspected November 11, 2026: https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-nlmp/d1c86e81-eb66-47fd-8a6f-970050121347