Three headline options

Suspenseful: The Microsoft Login Was Real. So Why Did It Let an Attacker In?
Emotional Resonance: You Checked the Link. You Used MFA. You Could Still Be Approving a Stranger’s Access.
Counter-intuitive: The Phishing Trap That Didn’t Need a Fake Website—or Your Password
Writing

The most unsettling detail in Microsoft’s investigation is also the easiest to misunderstand.

The login page could be real.

Not a convincing copy. Not a Microsoft logo pasted onto a suspicious website. Not a misspelled address that a careful employee might catch before their first coffee.

Microsoft’s genuine sign-in portal.

And yet, by completing the process, a person could authorize a session controlled by an attacker.

That is the trap at the center of Microsoft’s September 22, 2026, investigation into EvilTokens: criminals could exploit a legitimate authorization process by misleading people about what they were approving.

The password did not have to be handed over. The website did not have to be counterfeit. The victim’s participation could supply the missing permission.

The address bar could tell the truth while the invitation told a lie.

According to Microsoft, EvilTokens emerged in February 2026. By its September announcement, the company linked the service to more than 12,000 compromised inboxes across over 10,000 organizations worldwide.

Those are Microsoft’s figures for the service as a whole. They are not an independently verified census, and they should not be presented as a count of compromises caused exclusively by device-code phishing.

Even with those boundaries, the finding challenges a familiar piece of security advice: check that you are on the real website.

That advice still matters.

It just cannot answer every question that matters.

Consider an illustrative scenario—not a documented victim account.

An employee receives a work-related message asking them to complete a verification step. The request appears relevant to their responsibilities. They follow the instructions and arrive at a genuine Microsoft sign-in page. They enter the supplied code and complete the authentication steps requested.

They believe they are completing the task described in the message.

Instead, they may be approving access associated with an attacker-controlled session.

No invented dialogue is needed to make the scenario disturbing. Its power comes from how ordinary the individual actions can look.

Receive a request. Open a legitimate page. Sign in. Approve.

The employee and the system can both do what they believe they are supposed to do—and still produce a result the employee never intended.

To understand why, start somewhere less sinister: a television.

Typing a long password with a TV remote is an experience that seems designed to test whether entertainment is worth the effort. Devices with limited input need an easier way to connect to an account.

The legitimate device-authorization flow provides one. A device displays a code. The user opens a verification page in a browser on another device, signs in, and uses that code to approve access.

The browser is where the person interacts. The authorization benefits the session associated with the code.

That separation is useful.

It also creates an opportunity for deception.

If an attacker initiates a request and persuades someone else to approve it, the person may authenticate successfully while misunderstanding whose session receives access.

The critical question is therefore larger than whether the page belongs to Microsoft.

It is: What request am I approving, and how did it reach me?

The distinction may sound small. Operationally, it is enormous.

A genuine portal establishes something about the destination. It does not establish that the story directing someone there is honest.

A real bank counter does not make every payment instruction legitimate. A real signing service does not make every contract wise to sign. A real authorization page does not make every authorization appropriate.

Trust in the infrastructure cannot substitute for understanding the transaction.

This is also where the language around multifactor authentication needs care.

Microsoft describes attackers circumventing traditional MFA protections through authorization and session context. That does not establish that EvilTokens cryptographically broke MFA.

Nor does it mean people should stop using it. Microsoft continues to recommend MFA.

The problem is that successfully verifying a person’s identity does not necessarily establish that the person understands the request they are completing.

Authentication addresses who is present. The deception targets what that person believes is happening.

An employee might recognize every step of the sign-in process and still be mistaken about why they are performing it.

A stronger identity check cannot, by itself, repair a false explanation.

That is a harder lesson to teach than spotting a fake logo. It requires people to pause at precisely the moment a familiar page may make them feel reassured.

EvilTokens adds another layer to this story: the reported use of AI.

According to Microsoft, the service included capabilities for tailoring lures to people’s roles and analyzing compromised mailboxes for financial conversations and trusted relationships.

These are reported capabilities, not proof that AI caused every compromise attributed to the service.

But their significance is clear enough without exaggeration.

A generic fraudulent message has to compete with everything else in an inbox. A request that appears connected to someone’s actual responsibilities has a better chance of feeling relevant.

After a mailbox is compromised, the information inside can help criminals understand more than its owner’s identity. It can reveal whom that person trusts, what business is underway, and where financial decisions are being discussed.

That information can help attackers select impersonation targets.

The danger is not that a machine suddenly understands a company perfectly. It is that criminals may need less time and effort to find material they can exploit.

An inbox is a working record of relationships.

It contains the language colleagues use with one another. The conversations that establish familiarity. The transactions that make certain requests seem unsurprising.

Access to those details can make the next approach more convincing.

The first compromise can supply the context for the second deception.

This is where the story moves beyond the person who completed the original authorization.

A compromised mailbox can expose conversations involving customers, suppliers, coworkers, and other trusted contacts. Those people may later encounter an impersonation attempt shaped by information they reasonably believed was private.

The harm can travel through relationships.

Microsoft’s technical report also describes malicious inbox rules used to conceal communications, although behavior varied between incidents.

That detail deserves attention because concealment changes what an account owner can observe. If relevant messages are hidden, the visible inbox may provide an incomplete picture of what is happening.

A person checking their email may not see the very exchanges that would alert them to misuse.

The reporting does not establish that every EvilTokens incident followed the same sequence or used the same features. There is no basis for turning the investigation into one universal attack script.

What it does describe is a service with capabilities spanning deception, access, analysis, and concealment.

And it came with a commercial wrapper.

Microsoft says EvilTokens was offered for a $1,500 initiation fee plus $500 monthly, with customer support and a management interface.

The price is striking. The support may be more revealing.

It suggests an effort to package criminal capability into something customers could operate and maintain: an interface to manage activity, assistance when problems arose, and recurring payments to keep using the service.

That does not make every buyer effective. It does not tell us what any particular criminal earned.

It does illustrate how an operation can become easier to distribute when its creators sell the machinery and help others use it.

Cybercrime does not always arrive looking like an extraordinary technical breakthrough.

Sometimes it arrives looking like subscription software.

On September 22, Microsoft also announced disruption action. The company said it and its partners seized 50 websites and disabled more than 150 supporting domains.

Those are concrete actions against the service’s infrastructure.

They are not proof of eradication.

They also do not establish that every affected account had been recovered or that all previously granted access had ended.

This distinction matters because a public takedown announcement and an individual organization’s recovery are different milestones.

Disrupting infrastructure can interfere with an operation. Recovering an account requires understanding and addressing the access that already exists.

In particular, Microsoft warns that access could persist after a password reset if associated sessions and tokens remained valid.

A password change may be necessary. It may not be sufficient.

That can feel counterintuitive to someone who has spent years learning that an account compromise means a stolen password, and that replacing the password closes the incident.

But an authorization-based attack can leave behind access whose continued validity needs separate attention.

The practical lesson is to investigate what was authorized, not simply whether the password was exposed.

For security teams, Microsoft’s guidance includes auditing device-code use, blocking the flow where possible, and restricting necessary exceptions.

The qualification matters: legitimate uses remain.

Organizations need to understand where the flow serves a real operational purpose and where it creates unnecessary exposure. A blanket assumption that every device-code request is malicious would misrepresent both the technology and the guidance.

The more useful approach is deliberate control: know who needs the capability, constrain its use, and investigate activity that does not fit.

For employees, the decision point is equally concrete.

An unexpected message should not get to define what a login or approval means simply because it sends the recipient to a familiar website.

Before approving, establish what the request is for. If its origin or purpose is unclear, verify through an established route.

That principle becomes especially important when money enters the conversation.

Microsoft recommends checking unusual transactions or payment changes through a trusted second channel.

The word “trusted” is doing real work here.

Replying in the same conversation may not provide independent confirmation if the mailbox involved has been compromised. A second channel needs to give you a way to verify the request outside the potentially affected exchange—for example, through contact details you already know to be reliable.

The point is not to make every business transaction cumbersome. It is to introduce a meaningful check when a request changes something consequential.

A brief verification can interrupt a deception that has otherwise borrowed all the right context.

For business leaders, this also changes the conversation after an incident.

Asking only why someone failed to spot a suspicious website may miss the mechanism entirely. In this case, the website could be genuine.

The more productive questions concern the authorization: why was the flow available, what did the person believe they were approving, and what controls could have limited the consequence?

That shift does not remove individual responsibility. It makes the investigation more accurate.

Training cannot be built entirely around mistakes the victim did not make.

The broader lesson from the September 22 reporting is that familiar security signals have specific limits.

A genuine domain is valuable evidence about where you are.

MFA is valuable protection for authentication.

A password reset is a valuable recovery action.

None should be stretched into a guarantee about every other part of an interaction.

The attack described by Microsoft exploited the space between a legitimate process and a person’s understanding of that process.

That space deserves as much attention as the login page itself.

EvilTokens is unsettling because the story can begin with a person trying to be careful. They check the destination. They recognize the provider. They follow the expected steps.

What they need next is a different habit: verifying the purpose of the approval.

Do not stop at “Is this page real?” Ask “Is this request mine?”

If a colleague sent you to the genuine Microsoft login page today, what would make you pause before approving—and does your team share that same rule?

Reporting basis: Microsoft’s September 22, 2026, technical investigation and disruption announcement, with its documentation on device authorization and restricting device-code authentication, as summarized in the supplied factual snapshot checked September 23, 2026. This article is not a September 28 news update.