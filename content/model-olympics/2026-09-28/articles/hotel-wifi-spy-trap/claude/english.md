## Three headline options

**Suspenseful:** The Hotel Login Page Was Real. That Was the Trap.

**Emotional Resonance:** You Did Everything Right on the Hotel Wi-Fi. It May Not Have Been Enough.

**Counter-intuitive:** The Most Dangerous Hotel Wi-Fi Attack Never Asks for Your Password

---

# The Hotel Login Page Was Real. That Was the Trap.

*A story about hotel Wi-Fi, a six-digit code, and why a good habit can be turned against you.*

---

### Room 1412, 11:47 p.m.

*The following scene is fiction. It's a composite written to show the attack mechanism described in the reports below. It is not a reconstruction of any real victim.*

She lands after a fourteen-hour flight. The hotel lobby smells like lilies and floor polish. Her badge still hangs on its lanyard in her bag, and her Monday deck is due in the morning.

In the room she opens her laptop and joins the hotel network. The familiar captive portal appears: room number, last name, accept terms.

Then one more screen appears.

It says the hotel's network requires her work account to be verified before she gets full access. It gives her a short code. It sends her to a Microsoft sign-in page.

She's been trained for this. She checks the address bar, and it's a real Microsoft domain. It isn't a lookalike or a typo. The padlock is there and the certificate is valid.

She enters the code. She approves the prompt on her phone. The Wi-Fi works.

She finishes the deck and goes to sleep believing she did everything right.

By the standard most of us were taught, she did.

---

## The part that isn't fiction

On **September 10, 2026**, Anthropic published its September threat-intelligence report. It describes an espionage operator that compromised **at least three hotel Wi-Fi suppliers** and combined guest and device information to choose whom to target.

The number is easy to misread, so it's worth being precise about it. "At least three" counts **suppliers**, meaning the companies that provide Wi-Fi systems to hotels. It does not tell us how many hotels were affected. It does not tell us how many travelers were targeted, and it does not tell us how many corporate accounts were compromised. The report doesn't establish any of those figures, and neither will this article.

The choice of target is still the notable part. The operator didn't need to break into hundreds of hotels one by one. It went after the companies whose systems sit underneath many of them, and it used the kind of data those systems handle to decide who was worth attacking.

**Memorable line #1:** *The attackers didn't pick a hotel. They picked a layer.*

---

## Three reports describe the same terrain

Anthropic's report is the most recent of several. The picture comes from investigations published at different times, and each deserves its own attribution.

**ReliaQuest, July 23, 2026.** The security firm reported that DNS poisoning tactics had spread to hospitality Wi-Fi. It described **redirects on hotel networks**. It described **account-authorization lures that arrived without any phishing email**. It said the attacks were aimed at **corporate staff who travel**.

**Microsoft, July 31, 2026.** Microsoft described a campaign it calls **CaptiveCrunch** and attributed it to a **sub-cluster of Midnight Blizzard**, a threat actor Microsoft tracks under that name. Microsoft reported **AI-assisted activity** and **malware lures disguised as fake updates**. These are Microsoft's investigative findings and Microsoft's attribution, and they should be read that way.

**Anthropic, September 10, 2026.** Anthropic reported the compromise of hotel Wi-Fi suppliers and the use of combined guest and device data to select targets.

These reports describe **several different tactics**. Some people may have been offered a fake update. Others may have been redirected. In a smaller number of observed cases, something subtler happened, and that case is where our fictional traveler's story comes from.

The reports do not say that every targeted traveler met the same attack. They also do not say that every hotel network is compromised.

---

## The attack that skips your password

For twenty years, security training has taught the same reflex: **check the URL before you type your password.** It's good advice. Many phishing attacks depend on a fake page, and a fake page gives itself away in the address bar.

The mechanism ReliaQuest described in its limited observed cases, where hotel-network redirects were paired with **device-code abuse**, doesn't need a fake page.

It helps to know what the device code flow is. It's a **legitimate** Microsoft sign-in method, documented on Microsoft Learn, built for devices that are awkward to type on, such as smart TVs, conference-room systems and command-line tools. The device shows a short code. You open a browser on another device, go to the real Microsoft page, enter the code and approve. After that, **the application that requested the code receives tokens** that let it act as you.

That design is the weakness. Nothing in the flow tells you **whose application** asked for the code.

In the abuse scenario:

1. The **attacker** starts a device-code sign-in from their own client.
2. The attacker gets a code and passes it to the victim, in this case through a lure on the hotel network.
3. The victim goes to the **real** Microsoft page, which passes every URL check, enters the code and approves.
4. **Valid OAuth tokens go to the attacker's client.**

The victim's password never touches a fake page, and it doesn't need to. The attacker never collects it.

**Memorable line #2:** *Checking the URL tells you where you are. It doesn't tell you who you're letting in.*

**Memorable line #3:** *The password isn't the prize anymore. The permission is.*

---

## This technique isn't new, and that matters

This isn't the first time the technique has been documented. In **February 2025**, Volexity published cases in which attackers used **genuine Microsoft device-code pages** to get victims to authorize sessions.

The evidentiary boundary needs stating clearly. **The Volexity cases are separate.** They show that the mechanism works in practice. They are **not** additional victims of the hotel campaign, and they shouldn't be counted as its history. They matter because they show the method has been used before, which makes the hotel reports harder to dismiss as a theoretical exercise.

What seems to have changed is the delivery. In 2025 a phishing message had to put the code in front of you. On a compromised hotel network, the Wi-Fi itself can do that.

**Memorable line #4:** *The phishing email is optional when the Wi-Fi does the talking.*

---

## Why the hotel is the ideal place for this

Think about the traveler's position.

You're tired and in an unfamiliar place, on a network you didn't choose and can't inspect. You're used to hotel Wi-Fi being awkward, with odd portals, room-number prompts and pages saying "click here to continue." A strange extra step doesn't look alarming. It looks like hotel Wi-Fi.

You also have a deadline. You need the connection now.

Now consider what the operator had, according to Anthropic. It wasn't a random list of guests. It had **guest and device information**, combined and used to **select** targets. The same lure can be shown to the one person worth attacking while the other two hundred guests see nothing unusual.

That isn't mass phishing. It's **precision staging**.

**Memorable line #5:** *A hotel is the one place where a strange login screen looks normal.*

---

## What the evidence doesn't say

Honest reporting on security is mostly about stating limits, so here they are.

**Connecting to hotel Wi-Fi does not mean your account was compromised.** The device-code scenario depends on **you approving** the session. If you never entered a code you didn't start yourself, that path wasn't used against you.

**A real sign-in domain doesn't show whose session you're approving.** That's the core lesson, and it cuts both ways: it isn't a reason to panic every time you see a Microsoft page.

**The sources don't establish that all hotel networks are affected.** Anthropic's figure is at least three suppliers. That is a floor on suppliers and says nothing about the scale of hotels or victims.

**The sources don't confirm whether the campaign was still active** when this story's record was last checked on **September 20, 2026**. It may be ongoing, reduced, or changed. We don't know.

**The multiple tactics shouldn't be merged into one story.** Fake updates, DNS redirects and device-code abuse all appear in the reporting. The device-code pairing specifically was reported in **limited observed cases**.

**Memorable line #6:** *Fear spreads faster than facts. Keep the facts.*

---

## What to actually do, in concrete terms

This part is practical: three habits for travelers and three controls for the people who run corporate IT.

**If you travel for work:**

**Never enter a device code you didn't generate yourself.** This is the most useful rule here. If you're setting up a TV or a CLI tool you started, fine. If a *Wi-Fi portal*, a pop-up, or "the hotel" hands you a code to enter on a Microsoft page, stop. No legitimate hotel network needs your corporate identity to give you internet access.

**Treat "update required" prompts on hotel networks as suspicious by default.** Microsoft's report describes fake-update lures. Update only through your operating system's own settings or your company's managed tools, and never from a pop-up that appears while you're getting online.

**Use your phone's hotspot for anything sensitive.** A hotel network is someone else's infrastructure, and per these reports, possibly someone else's supplier's. Your phone's mobile connection removes that whole layer. A company VPN helps once you're connected, but a captive portal loads before the VPN does.

**If you run identity or security for a company:**

**Restrict the device code flow.** Most employees never need it. Microsoft Entra lets administrators block or limit device-code authentication through Conditional Access. If only a few conference-room devices need it, allow those and block the rest.

**Watch for device-code sign-ins in your logs,** especially from users who are traveling and especially where the approval and the token use come from different places.

**Update your training.** "Check the URL" is incomplete now. Add this: **"A real page can still be doing someone else's work."**

---

## Back to Room 1412

*Returning to the fictional scene.*

Our traveler checked the URL. She checked the padlock. She used her authenticator app. She did everything her annual training asked of her.

What she didn't have was a single extra question: **"Who asked for this code?"**

That question costs nothing and takes a few seconds, and it's absent from most security training today.

This story isn't mainly about a specific group or a specific set of hotel suppliers, though those details matter and the attribution belongs to the researchers who did the work. It's about how attackers study a safety habit closely enough to build an attack that passes it.

We taught people to verify the page, so attackers started using the real page.

**Final takeaway:** *Security habits have a shelf life. The attacker is the one checking whether yours has expired.*

---

## Sources

This article is based on these reports, and all attributions and findings belong to their authors: Anthropic, *September 2026 Threat Intelligence Report* (Sept 10, 2026); Microsoft Security, *CaptiveCrunch: Midnight Blizzard targets travelers worldwide* (July 31, 2026); ReliaQuest, *DNS poisoning tactics expand to hospitality* (July 23, 2026); Volexity, *Multiple Russian threat actors targeting Microsoft device code authentication* (Feb 13, 2025, which covers separate cases that explain the mechanism); Microsoft Learn, *Device authorization grant* (documentation).

---

## Your turn

Has a hotel, airport, or conference Wi-Fi portal ever asked you for something that felt a bit off, like an extra login, an "urgent update," or a code to enter somewhere else? **Did you click through, or did you stop?** Tell me in the comments. I suspect many of us have approved something at midnight that we'd question at noon.

---

I can also put this into a doc for editing or cut it down into a LinkedIn-length version.