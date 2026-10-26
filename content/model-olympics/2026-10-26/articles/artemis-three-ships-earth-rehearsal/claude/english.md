Artemis III’s Moonless Rehearsal: Three Ships, One Orbit, and Why the Hardest Step Comes Before the Moon
Headline options

Suspenseful: Three Rockets, One Crew, Zero Margin for Mismatch: NASA’s 2027 Gamble Before the Moon

Emotional Resonance: Before We Go Back to the Moon, Four Astronauts Will Practise Knocking on the Door

Counter-intuitive: NASA’s Next Big Moon Mission Won’t Go to the Moon, and That May Be the Smartest Part of the Plan

The short version

NASA’s latest Artemis III plan, set out in a report dated 23 October 2026, has no lunar landing. It describes a planned 2027 mission in low Earth orbit, where four astronauts aboard Orion would rehearse the operations NASA expects to need for lunar landings planned for 2028. Both dates are targets, not guarantees.

The planned mission would last about 14 days and bring together three spacecraft launched on three different rockets:

Orion, launched on SLS
A Blue Origin Blue Moon Mark 2 test article
A SpaceX Starship Version 3 test article

The crew would dock with Blue Moon and spend about two days evaluating it from the inside. Separately, they would dock with Starship for a planned test of up to two hours, without ever entering it.

My read is that this is an integration test, not a victory lap. NASA is trying to find out, close to home, whether vehicles built by different organisations can work together with people aboard. The tension is that every added vehicle adds a dependency. A rehearsal can build confidence only if it actually tests the risks that matter, and an announced plan is not proof that any risk has been retired.

That’s the conclusion. Here’s the story behind it.

A Moon mission that stays in Earth orbit

Imagine a startup about to launch a product that depends on two outside partners’ hardware. Shipping straight to customers and hoping the interfaces line up would be reckless. You’d build a staging environment, connect the real pieces, and watch what breaks.

According to NASA’s report, that is roughly what Artemis III has become. The mission is described as a planned low-Earth-orbit demonstration, not a Moon landing. Its job is to rehearse operations ahead of the landings planned for 2028.

The interesting part is what NASA chose to rehearse. It isn’t testing a rocket or a capsule on its own. It’s testing the connections between them: whether three spacecraft from three programmes, on three launch vehicles, can be brought together with a crew aboard and operated as one system.

My analysis: for a lunar landing architecture that relies on commercial landers, those connections may be where the hardest unknowns sit. Individual vehicles get tested individually. How they behave together only shows up when you put them together.

The cast: three vehicles, each still a test article

The brief needs a careful reading here, because headlines tend to blur the details.

Orion, launched on SLS, carries the four astronauts. It is the crew’s home for the whole mission.

Blue Moon Mark 2, from Blue Origin, flies as a test article.

Starship Version 3, from SpaceX, also flies as a test article.

“Test article” carries a lot of weight in that sentence. Nothing in NASA’s plan says either vehicle is a certified, operational lunar lander. They are versions flown to learn things. If the rehearsal works, it will be evidence feeding a later certification decision. It is not that decision.

One easy mistake is to read “astronauts will dock with both lunar landers in 2027” and conclude that the landers are ready. The plan says something smaller and more honest: the hardware will be tested.

The choreography, step by step

Here is the planned sequence as NASA describes it. Every step is a plan, not something that has happened.

Step 1: Blue Moon goes first, and has to prove it’s healthy

NASA plans to launch Orion only after Blue Moon has launched and its health has been confirmed.

This is a sensible gate, and it says a lot about how NASA is thinking. Astronauts don’t leave the ground until the vehicle they’re going to visit is in orbit and working. If Blue Moon has a problem, the crew stays home.

Analysis: this sequencing protects the crew, but it also builds a dependency into the schedule. Orion’s launch now depends on a different company’s vehicle launching on time and checking out cleanly. Product teams know this pattern well: your ship date is partly set by someone else’s ship date.

Step 2: Dock with Blue Moon and live in it for about two days

Once Orion is up, the crew would dock with Blue Moon and spend about two days evaluating it. The listed focus areas are:

The cabin: is the space usable for people?
The controls: can astronauts actually operate it?
Life support: does it keep people alive the way it should?
Interoperability: does it work properly with Orion?

Two days doesn’t sound long. Compare it, though, with any test where people are seated in a mockup for a few minutes. Living in a vehicle is different. Small annoyances add up, procedures meet real bodies and real fatigue, and assumptions made on paper meet daily use.

Analysis: this may be the most valuable part of the mission. Engineering can predict a great deal, but a crew spending real time aboard tends to surface problems that designers didn’t think to look for. That is a judgement about the value of human-in-the-loop testing in general, not a prediction of what this particular test will find.

Step 3: A later Starship launch and a second, shorter docking

A Starship test launch later in the mission would support a second docking, planned to last up to two hours.

Three details matter here, and they are easy to get wrong:

The crew would not enter Starship. This is a docking test, not a stay aboard.
The two dockings have different geometry and different objectives. They are not the same procedure repeated with a different partner.
Two hours is the planned length of the docking test, not of the mission. The mission is planned to run about 14 days.

So the two partner vehicles get very different treatment. The crew would live in one for about two days and connect to the other for up to two hours without going inside. NASA’s material doesn’t call this a ranking, and readers shouldn’t treat it as one. The brief is clear that this is a description of plans, not a result of any competition between vendors.

Step 4: More Orion testing, then home

After the docking work, additional Orion tests may take up to five extra days before the crew returns.

The areas NASA names as intended test targets include integrated software, communications, control and procedures. These are the less visible layers that make separate machines behave like one system.

Why rehearse in Earth orbit at all?

The core question is how a mission that stays near Earth can build confidence for a landing on the Moon.

Historical context (mine, not from NASA’s report): there is a well-known precedent. In March 1969, Apollo 9 tested the lunar module in Earth orbit, including separating from and redocking with the command module, before any crew flew it near the Moon. Testing a new vehicle near home before taking it far away has a long history in human spaceflight.

The reasoning, as I understand it, goes like this:

Earth orbit is closer to rescue options. In low Earth orbit, the trip home is relatively short compared with a lunar journey. If something goes wrong, the choices are simpler.

Integration risk doesn’t depend on location. Whether docking hardware mates correctly, whether software on different vehicles communicates, whether crew procedures make sense: those questions have answers wherever the vehicles happen to be.

You learn while there’s still time to change things. A rehearsal planned for 2027, ahead of landings planned for 2028, leaves room to adjust if problems turn up. Any team that has found a serious bug in staging, rather than in production, understands this value.

Here is the limit, and it needs saying directly: an Earth-orbit rehearsal can’t test everything a lunar landing requires. Descent to the surface, landing, surface operations and the lunar environment are not part of what this mission is described as doing. The rehearsal can reduce some categories of risk. It can’t stand in for all of them.

The skeptic’s corner

Since I value adversarial review, here is the strongest case against getting too optimistic. All of it is analysis of the plan. None of it describes a documented failure, budget overrun or vendor result.

1. Three vehicles means three ways to slip.
Orion on SLS, Blue Moon and Starship each have their own launch, readiness and schedule. The mission depends on all of them lining up. In any project, the critical path is set by the slowest dependency. Coordinating three vehicles creates real schedule and interface dependencies.

2. A gated sequence protects crews and constrains schedules.
Making Orion wait for Blue Moon’s health confirmation is the right call for safety. It also means that a delay on one vehicle passes through to the crewed launch.

3. Test articles aren’t the final product.
What gets learned from a Blue Moon Mark 2 test article and a Starship Version 3 test article applies to the extent those vehicles resemble what would eventually fly to the Moon. How closely they will match isn’t something the brief establishes.

4. An announcement is not a result.
This one is the most important. NASA has said what it intends to test. It has not shown that the risks are reduced or that the hardware passed. Those claims can only come after the mission flies, if it flies as planned.

5. The dates are targets.
2027 for the rehearsal, 2028 for landings. NASA’s own framing presents these as planned dates, and readers should hold them loosely.

What builders can take from this

Set the spacecraft aside for a moment, because the pattern applies to almost any complex system with more than one supplier.

Test the seams, not only the parts. Every vendor’s component can pass its own tests and the integrated system can still fail. NASA’s plan is built around seams: docking interfaces, cross-vehicle communications, shared procedures.

Gate expensive steps on cheap confirmations. Confirming Blue Moon’s health before launching the crew is the spacecraft version of “don’t deploy to production until staging is green.”

Match test depth to the question. About two days living in Blue Moon and up to two hours docked with Starship are different test designs for different objectives. Not every check has to be exhaustive. It has to answer the specific question it was built for.

Report plans as plans. The most useful thing in NASA’s framing may be its restraint. It calls these vehicles test articles, calls the dates targets, and describes the mission as a demonstration. In a field where press releases often outrun the hardware, that’s worth noting.

The bottom line

If the plan holds, Artemis III in 2027 would be four astronauts in Earth orbit working through a carefully gated, two-week rehearsal with machines that aren’t yet certified for the Moon. It is less cinematic than a landing, and arguably more important to whether a landing goes well.

The open question isn’t whether rehearsing is a good idea. On the logic of integration testing, it clearly is. The open questions are whether three vehicles on three rockets can be lined up on schedule, and whether what is learned in orbit carries over to the much harder job of landing.

We’ll only know once the mission flies. For now, it’s a well-reasoned plan, and the honest response is to watch the evidence as it comes in rather than celebrate early.

Illustration suggestion: a conceptual, clearly non-photographic image, such as three abstract shapes converging around a single point of light above a curved horizon, with the Moon small and distant in the corner. Avoid anything that resembles a news photograph or an engineering diagram.

Source: NASA, “NASA’s Artemis III Mission to Test Future Moon Lander Operations,” report dated 23 October 2026; brief compiled 26 October 2026. All 2027 and 2028 operations described are plans, not completed flights.