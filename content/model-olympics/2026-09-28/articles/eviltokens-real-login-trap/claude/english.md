# Headline options

**Suspenseful:** The Login Page Was Real. That Was the Trap.

**Emotional resonance:** You Checked the Link. You Used MFA. You Still Let Them In.

**Counter-intuitive:** The Most Dangerous Phishing Page Is the One That Isn't Fake

---

# The Login Page Was Real. That Was the Trap.

*What Microsoft's EvilTokens investigation reveals about a phishing scheme that skips the fake website entirely*

---

### A scene (fiction)

*The following scene is invented to show how this kind of attack can unfold. The people and company are not real. It is not drawn from any specific incident in Microsoft's report.*

It's a Tuesday afternoon. Dana runs accounts payable at a mid-sized logistics firm. An email arrives that looks like a routine request to review a shared document tied to a vendor contract she's been handling. It's addressed to her by role and uses the vocabulary of her job.

The email says a verification step is required and gives her a short code.

Dana has been through the security training. She knows to hover over links and to distrust login pages with odd URLs. So she checks. The link goes to Microsoft. Not a lookalike domain, not a misspelling. The actual Microsoft sign-in page.

She enters the code, signs in, and approves the prompt on her phone the way she does a dozen times a week. The page shows a success message. The document doesn't appear. She assumes it's a glitch and returns to her inbox.

She has just authorized a session for someone else. She never typed her password into a fake site, and nobody broke her multi-factor authentication. She approved the request herself, on a genuine page, because every signal she'd been taught to check looked clean.

*End of fiction.*

---

## The part that is real

On **September 22, 2026**, Microsoft published two documents: a technical investigation from Microsoft Threat Intelligence and a disruption announcement from its Digital Crimes Unit. Both concern a criminal service called **EvilTokens**.

According to Microsoft:

- EvilTokens **emerged in February 2026**.
- Microsoft links the service to **more than 12,000 compromised inboxes across over 10,000 organizations worldwide**.
- Microsoft and its partners **seized 50 websites and disabled more than 150 supporting domains**.

One caveat applies to everything below. Those numbers are **Microsoft's own service-wide figures**. They are not an independent count, and Microsoft does not attribute all of them to the device-code technique this piece focuses on. They are the best public numbers available, and they come from one source with its own vantage point.

Even with that caveat, the scale is large: thousands of organizations in about seven months, run by a service that operated like a software business.

---

## How a real login page becomes a trap

The core problem is simple. **This attack doesn't fake the sign-in page. It fakes the reason you're on it.**

It abuses a legitimate feature called the **OAuth device authorization grant**, usually shortened to device-code flow.

You have almost certainly used it. You set up a smart TV app, and the screen says to go to a web address on your phone and enter a short code. You do, you sign in, and the TV is logged in. Typing a password on a TV remote is miserable, so the TV hands the job to a device with a real keyboard. Microsoft's documentation describes the flow as a way for devices with limited input, such as smart TVs or printers, to get access through a browser on another device.

The feature itself is fine. The weakness is an assumption built into it: **the person approving the code is also the person holding the device that requested it.**

Here is how the misuse works, as described in Microsoft's investigation:

1. The attacker starts a device-code sign-in on a device they control.
2. The attacker sends the resulting code to the victim with a convincing pretext.
3. The victim goes to Microsoft's genuine sign-in portal, enters the code, and signs in.
4. The approval authorizes the **attacker's** session.

The attacker never sees the victim's password and doesn't need to. The victim unlocks the door and the attacker walks in.

That leads to the first takeaway:

> **A real domain proves where you are. It doesn't prove what you're approving.**

For years, security training has taught people to check the URL. That advice still matters, because it stops a large share of credential-harvesting pages. But it answers the question "is this page genuine?", and this attack doesn't depend on that question. Microsoft's material makes the point directly: a genuine domain does not establish that the authorization request is legitimate.

---

## "But I have MFA"

This is where the story tends to get overstated, so the details matter.

Microsoft describes EvilTokens as circumventing **traditional MFA protections** through authorization and session context. That is different from saying MFA was broken. The report **does not establish a cryptographic break in MFA**, and Microsoft **continues to recommend MFA**.

What happened is more mundane. MFA did its job: it confirmed that the real user was present and approving. The real user was present and approving. They were approving the wrong thing.

A comparison helps. MFA is like a bouncer checking IDs. It works well at confirming that you are you. It doesn't ask who you're signing in on behalf of. If you walk up with valid ID and vouch for the stranger behind you, the bouncer lets you both in.

> **MFA verifies the person. It can't verify the person's judgment.**

So the lesson isn't to drop MFA, which would be a serious mistake. The lesson is that MFA is necessary and not sufficient, and attackers have learned to go after the part of the process that depends on a human understanding what they're approving.

---

## Crime with a subscription plan

The pricing details in Microsoft's report are among the most revealing parts of this story.

According to Microsoft, EvilTokens was sold with **customer support and a management interface**, for a **$1,500 initiation fee plus $500 per month**.

That's a SaaS pricing model: onboarding fee, monthly subscription, support, and a dashboard. Someone designed that dashboard, and someone answered support tickets from customers whose phishing campaigns weren't working as expected.

This matters because it changes who can run these attacks. A technique that once required real skill becomes something you can rent. The people behind the service handle the infrastructure, and the customer mostly supplies targets and intent.

Microsoft's Digital Crimes Unit announcement goes further and frames EvilTokens as an AI chatbot built for cybercrime. That leads to the most unsettling part of the report.

---

## What AI adds

Microsoft reports that EvilTokens had AI capabilities for two purposes:

1. **Tailoring lures to people's roles.** A finance lead gets something that reads like finance work, and an HR manager gets something that reads like HR work.
2. **Analyzing compromised mailboxes** for **financial conversations and trusted relationships.**

The second capability is the one to think about carefully. According to Microsoft, once an inbox is compromised, the tooling can help identify who the victim pays, who pays them, and whom they trust. Criminals could then use that information to choose whom to impersonate next.

Microsoft's framing needs to be stated precisely. These are **reported capabilities**. The report doesn't claim AI caused every compromise, and this piece doesn't either. What the capabilities show is where these tools are heading.

In older phishing, the attacker had to guess what would work on you. With mailbox analysis, the attacker can read your existing correspondence and learn it. Your inbox records who you trust, how those people write, and when money moves. For an attacker, that is a map for the next attack.

> **The first breach isn't the goal. It's the reconnaissance.**

Microsoft's technical report also describes **malicious inbox rules that conceal communications.** These are rules that quietly move or hide certain messages so the real account owner doesn't see them. Microsoft notes that **behavior varied between incidents**, so this wasn't a single fixed playbook. The general concern is clear enough: an attacker who can hide your replies from you can sit inside a conversation you believe you're having.

---

## The takedown is not a cure

Seizing 50 websites and disabling more than 150 domains is meaningful. Takedowns like this raise costs for criminals, disrupt operations, and send a message.

But the brief is explicit that the disruption **does not establish eradication or complete account recovery.**

The key technical point for anyone who might be affected: **access could persist after a password reset if the associated sessions and tokens remained valid.**

Most people's instinct after a suspected compromise is to change the password. It feels decisive. But this attack never relied on the password. The attacker holds an authorized session. If that session and its tokens stay valid, changing the password is like changing the lock on the front door while the intruder is already in the living room.

> **You can't fix a stolen session by changing a password that was never stolen.**

This is why incident response for this class of attack has to include revoking sessions and tokens, not only resetting credentials.

---

## What to do about it

Microsoft's published guidance comes down to a few concrete moves. Here is each one in practical terms.

**1. Audit device-code use.**
Many organizations don't know whether anyone uses device-code sign-in at all. Find out. If the answer is "a few conference room devices and nothing else," that's useful, because it means most device-code sign-ins would be anomalies.

**2. Block it where possible.**
Microsoft provides Conditional Access controls to restrict device-code authentication flows. If your people don't need it, turn it off. Attackers can't exploit a flow that doesn't exist in your environment.

**3. Restrict the exceptions you actually need.**
Legitimate device-code uses remain, and Microsoft says so. Some devices do need this flow. Scope those exceptions tightly: specific users, specific devices, specific conditions. Don't leave a broad opening because one printer needs a narrow one.

**4. Verify money movement through a second channel.**
This is the step every person can take, whether or not they manage IT. If a vendor emails to change bank details, or a request for an unusual payment arrives, **confirm it through a trusted channel you already had.** Call the number on file, not the one in the email. Ask in person. Use a separate messaging thread you started.

The reason this works: an attacker who controls an inbox can make email look fully trustworthy, because it is coming from a real account. The attacker is much less likely to control your phone call with a colleague you've known for years.

> **When the channel is compromised, the channel can't vouch for itself.**

For individual users, one habit covers most of this:

**If you didn't start the sign-in, don't finish it.**

If a code shows up and you didn't just turn on a TV, set up a device, or knowingly begin a login, stop. Entering someone else's code on a genuine page is how the whole scheme works.

---

## The bigger lesson

Security advice has long been built around spotting fakes: fake domains, fake logos, fake urgency. That training helped, and much of it still does.

EvilTokens, as Microsoft describes it, points to a shift. The attack uses a real page, a real feature, and a real MFA prompt. The only fake element is the story that gets the victim to the page.

When every technical signal is genuine, the remaining defense is understanding what an action actually does. Before approving anything, the question to ask isn't only "is this real?" It's also:

**"What exactly am I authorizing, and for whom?"**

That question works on this attack, and it will likely work on the next variant too, because attackers will keep looking for the gap between what a button does and what we assume it does.

---

## Key takeaways

- A **real login page** can still be part of a trap. The domain tells you where you are, not what you're approving.
- **MFA wasn't broken.** It was sidestepped by getting the real user to approve the wrong request. Keep using MFA.
- EvilTokens was sold **as a service**, with support and a dashboard, for $1,500 up front plus $500 per month, according to Microsoft.
- Microsoft reports **AI tooling** used to tailor lures and scan compromised inboxes for financial relationships. These are reported capabilities, not proof that AI drove every breach.
- **A password reset may not be enough** if the attacker's sessions and tokens remain valid.
- **Audit, block, and restrict** device-code sign-in, and **verify payment changes through a second channel.**

*Sources: Microsoft Threat Intelligence, "Unmasking EvilTokens," and Microsoft Digital Crimes Unit, "Disrupting EvilTokens," both published September 22, 2026; Microsoft Learn documentation on the OAuth device authorization grant and on restricting device code authentication flows. Figures are Microsoft's own and have not been independently verified.*

---

**Your turn:** Before today, did you know that entering a code on a genuine Microsoft page could hand someone else access to your account? And does your organization actually know how many of its people use device-code sign-in? Tell me in the comments. I'm curious how many teams could answer that second question right now.

---

I can also put this into a doc if you want a version to share or keep editing.