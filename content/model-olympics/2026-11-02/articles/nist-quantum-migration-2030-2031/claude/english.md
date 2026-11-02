Headline options

Suspenseful: Locked Boxes Waiting for a Future Key: NIST Finalizes Its Roadmap for Post-Quantum Encryption

Emotional Resonance: Secrets Meant to Last for Decades: Why NIST’s October 27 Roadmap Matters for the Information We Want Kept Safe

Curious Question: How Do You Protect a Secret From a Computer That Arrives Later? NIST’s New Roadmap Lays Out the Plan

Locked Boxes Waiting for a Future Key

Every time you open a banking app, send a private message, or install a software update, two quiet jobs happen in the background.

The first job is called key establishment. Your device and a distant computer agree on a shared secret key, a bit like two friends settling on a private code word before they start passing notes. Everything they say afterward is scrambled with that code word.

The second job is the digital signature. A signature is a mathematical seal. It shows who sent something and confirms that it arrived exactly as sent, the way a wax seal on an old letter showed the sender and revealed any tampering.

A large share of the internet’s trust rests on these two jobs. The methods behind them belong to a family called public-key cryptography, and they have worked well for decades. The story here concerns what happens to that family when a new kind of computer arrives.

The organization and the future machine

The organization at the center of this story is NIST, the US National Institute of Standards and Technology. NIST develops measurement and technical standards: shared rulebooks that let products, government agencies and companies work from the same technical language. When NIST publishes a cryptography standard, federal systems follow it, and many of the companies that build or supply those systems follow it too.

The bigger picture involves quantum computers, machines that process information using the physics of extremely small particles. Researchers expect that a sufficiently powerful quantum computer could solve the math puzzles that today’s public-key signatures and key establishment depend on. The arrival date of such a machine remains uncertain.

Post-quantum cryptography is the response. It is a set of new algorithms that run on ordinary computers, the phones, laptops and servers people already use, and are designed to resist attacks from that future quantum machine. It is software math. Quantum communications hardware, which sometimes shares the headlines, is a separate field.

Here is an analogy, and it is an analogy only. Picture today’s public-key method as a clever padlock design used on millions of doors. Experts predict that a future quantum computer would work like a master tool for that particular lock design. Post-quantum cryptography is a new lock design that engineers have built to hold up against that tool. The comparison simplifies the math, and it applies to the public-key jobs described above, the signatures and the key agreements. It describes a future risk to one family of methods; it leaves the rest of today’s encryption out of the picture.

From new locks to a schedule for changing them

NIST released its first post-quantum standards in August 2024. Those were the new lock designs.

The question that followed was practical: which old locks get replaced, with what, and by when? NIST published a draft answer on November 12, 2024. On October 27, 2026, it released the final version, a report titled Transition to Post-Quantum Cryptography Standards, catalogued as NIST IR 8547. Its authors are Dustin Moody, Ray Perlner, Andrew Regenscheid, Angela Robinson and David Cooper.

The report names the public-key signature and key-establishment standards that NIST considers quantum-vulnerable, and it names their intended replacements. So the news of October 27 is a finished migration roadmap. Quantum risk and the first post-quantum standards both entered the picture years earlier; this report turns them into a plan.

NIST also describes the timelines around that plan. According to NIST, 2035 is the broad target for federal migration, a goal associated with National Security Memorandum 10. NIST adds that Executive Order 14412 moved earlier dates onto the most important federal systems, which it describes as high-value assets and high-impact systems: 2030 for key establishment and 2031 for digital signatures.

Those dates describe federal targets as NIST presents them. Companies that supply federal agencies may feel their effect as well, depending on the requirements in their own contracts and agency rules. The exact schedule for any specific algorithm or use sits in the report itself and in the rules of each agency. The dates mark planned work; the timing of a capable quantum computer remains an open scientific question.

Why plan for a machine that has yet to arrive

The urgency comes from a risk with a memorable name: harvest now, decrypt later.

Return to the padlock picture. Imagine someone gathering locked boxes today and stacking them in a warehouse, waiting for the day they own the master tool. In the digital version, an adversary copies scrambled data now and keeps it, planning to unscramble it once quantum capability exists. This is a risk mechanism that shapes planning. The NIST materials describe it as a possibility; they present it as a reason to start early.

That is why the lifetime of a secret matters so much. A discount code needs protecting for a week. Medical histories, legal records, trade secrets and government files may need protecting for decades. Data in that second group could still be valuable on the day a powerful quantum computer appears.

NIST says that especially sensitive or long-lived data may make it a priority to migrate key establishment first, using the standard known as FIPS 203. One way to read this guidance through the analogy: the boxes in the warehouse were sealed with code words agreed at the time, so upgrading how those code words are created protects the conversations happening from today onward.

Why the swap takes years

Changing locks sounds simple until you look at where they are. Cryptography lives deep inside software libraries, hardware chips, cloud services, vendor products and certificates issued by outside organizations. In padlock terms, many locks sit inside doors that other companies built, and some of the keys belong to other building owners. NIST describes this full cryptographic supply chain, with its many dependencies and different uses, as the source of the migration’s complexity. The cost and success of each migration will vary from one organization to the next.

NIST also allows hybrid approaches, which combine a conventional method with a post-quantum one. Its own summary compares this to putting two padlocks on the same door. The trade-off, NIST notes, is extra computing work.

To help organizations find and replace their locks, NIST’s National Cybersecurity Center of Excellence (NCCoE) runs a migration project with partners from many industries. That work covers tools, cryptographic visibility (finding where cryptography is used across a system), risk management, and crypto agility, which means building systems that can switch algorithms smoothly when the time comes.

The question that remains

The standards exist. The roadmap is final. The federal target dates are on paper. What happens next depends on thousands of organizations, each with its own buried locks, its own suppliers and its own secrets of differing lifespans. Standards and plans make the migration possible; completing it and making it safe remain work in progress.

That leaves a question for every hospital, bank, agency and company holding information meant to last: how do you protect secrets with long lifetimes while the infrastructure that will protect them is still being rebuilt?