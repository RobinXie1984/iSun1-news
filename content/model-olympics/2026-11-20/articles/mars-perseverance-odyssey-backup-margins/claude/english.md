# Two Alarms at Mars: Can the Backups Carry the Science Home?

In the autumn of 2026, two of NASA's machines at Mars sounded alarms within a week of each other. On October 30, the Perseverance rover, which drives across the Martian surface studying rocks and collecting samples, switched itself to a backup radio and entered a protective standby. From November 4 to 6, the Mars Odyssey orbiter spent time in the same kind of standby, and engineers subsequently determined that one of the spinning wheels it uses to aim itself had stopped turning. Odyssey has circled the planet since 2001. On November 19, NASA published an update describing both problems. The agency is running two separate investigations. It reports that both spacecraft remain in contact with Earth, and it has paused science work on each while engineers study what went wrong.

The people behind those investigations belong to a small group of institutions. NASA is the United States' civilian space agency. Its Jet Propulsion Laboratory, or JPL, is a mission engineering laboratory in California that the California Institute of Technology manages for NASA. JPL leads the work on both problems. Odyssey has an additional partner: the aerospace company Lockheed Martin built the orbiter and operates it. On Earth, the link to these machines runs through NASA's Deep Space Network. This international set of giant radio dishes sits at three sites: Goldstone, California; Madrid, Spain; and Canberra, Australia. Engineers use those dishes to send commands outward, track where spacecraft are, and collect the scientific data that comes back.

A radio fault on one machine and a wheel fault on another both matter for the same reason. To see why, it helps to know how pictures and measurements usually travel from the Martian surface to Earth.

## The usual road home

A rover is a modest broadcaster. It carries limited power and relatively small antennas, so NASA usually arranges a two-stage trip for its data. First, the rover sends its files a short distance upward to a spacecraft passing overhead in orbit. It uses UHF radio for this step. UHF stands for ultra high frequency, a band of radio waves well suited to that short hop. The orbiter has a larger radio and more power to spend, so it forwards the data across the long gulf to the Deep Space Network on Earth. NASA calls this arrangement the Mars Relay Network. The handoffs depend on timing. An orbiter can collect from a rover while the two are in view of each other, and that window opens and closes as the orbiter travels around the planet.

A rover can also talk to Earth directly. Perseverance carries a high-gain antenna that it can aim precisely at Earth. Through that antenna it communicates on X-band, a higher range of radio frequencies that NASA uses for long-distance links with deep-space missions. That direct line is valuable. According to NASA's update, it also carries data at a significantly lower rate than the relay route through an orbiter.

A hypothetical comparison, offered purely as an illustration, makes the difference concrete. Imagine a business that ships big parcels every day on a scheduled delivery truck. It also keeps an emergency telephone on the wall. If the truck route closes, the telephone still lets the business talk with headquarters, report problems and receive instructions. Those conversations matter enormously. The telephone moves words, though, and the truck moves boxes. A business limited to its telephone can keep everyone informed while the warehouse fills with work it has set aside.

In this picture, the relay route through orbiters plays the part of the truck. The direct X-band line plays the part of the telephone. The comparison describes the gap between keeping in touch and moving a large volume of science. It leaves aside the question of which particular orbiter would have carried Perseverance's data during this episode.

That gap sits at the center of both stories.

## A missed heartbeat on the surface

Perseverance's trouble began inside the rover itself. Its main computer keeps watch over the equipment around it. The primary UHF radio, the one the rover uses to send data up to orbiters, normally sends the computer a steady electronic signal that NASA calls a heartbeat. This heartbeat is an internal health check, a regular signal confirming that the radio is alive and working. It travels through the rover's own wiring and is separate from any message to Earth.

On October 30, the heartbeat stopped arriving. The rover's fault protection software counted the missing signals. This software is a set of automatic rules that responds to problems faster than engineers on Earth could. After 25 missed heartbeats, a span of about 100 seconds, it acted. It shut off the unresponsive primary radio, switched to the backup UHF radio and put the rover into safe mode. Safe mode is a protective state in which a spacecraft sets aside nonessential activities, keeps itself healthy and waits for instructions from home. NASA describes this sequence as fault protection working as designed. The reason the primary radio fell silent remains an open question in the update.

Engineers then brought Perseverance out of safe mode, and NASA now describes the rover as stable. The recovery revealed a second concern. When the team measured the backup UHF radio during testing, its output came in at about half the power the team expected. That figure is a measurement of radio power. The update leaves its effect on data rate, range or the radio's working life unstated. The primary radio was unresponsive, and the backup measured at about half its expected power. The team therefore stopped using both UHF radios. That pause will last while it works out what caused the problems and whether either radio can operate safely.

That decision moved the rover onto its telephone line. Perseverance now communicates directly with Earth through its high-gain antenna on X-band, and the Deep Space Network receives the signal. That path carries data more slowly than the orbiter relay. The team therefore paused the rover's science and instrument work and reserved the available bandwidth for diagnostics. Bandwidth here means the amount of data a link can carry in a given time.

One visible consequence follows. Perseverance has stopped taking new pictures with its cameras for now, so NASA's public feed of raw rover images has stopped filling with fresh views. The quiet feed reflects the pause in new picture-taking. The rover itself keeps talking to its engineers.

JPL's plan, as NASA describes it, runs in a deliberate order. The team is first examining how the backup radio is performing and what recovery options exist. After that, it will continue working on the primary radio. The team hopes to resume science by the end of November.

## A stalled wheel in orbit

Odyssey's problem concerns aim. A spacecraft in orbit needs to point itself in particular directions. Its solar panels face the Sun for power, its instruments face the surface, and its antennas face Earth or a rover below. Pointing is a separate job from traveling. Odyssey's path around Mars follows its orbit. Pointing means turning the spacecraft in place, the way a person standing in one spot can face north and then east.

Odyssey usually turns itself with reaction wheels. These are heavy wheels sealed inside the spacecraft's body. Their job is turning, and they stay far above the Martian ground. When a motor spins one of them faster or slower in one direction, the rest of the spacecraft turns gently the opposite way. Physicists describe this balancing effect in terms of angular momentum, the amount of spinning motion an object carries. By adjusting the speeds of several wheels, controllers can turn the spacecraft in any direction they choose. The wheels run on electricity, so routine pointing with wheels spares the spacecraft's limited supply of rocket propellant.

Odyssey launched with four reaction wheels. One failed in 2013. Its wheel-based pointing system needs at least three, so the orbiter had been working at exactly the minimum. Then one of the remaining three stopped spinning. Odyssey stayed in safe mode from November 4 to 6 and has since left it. Its instruments and science remain offline during the investigation.

With too few working wheels, Odyssey now aims itself with small thrusters that burn hydrazine, a rocket fuel. Each small puff turns the spacecraft, and each puff spends fuel the orbiter carried from Earth at launch. NASA's team estimates that Odyssey has enough fuel for one to two months if it orients itself solely with thrusters. The team is refining that figure. The estimate describes how long fuel would last under that particular way of operating. NASA presents it as a working estimate tied to that condition, separate from any date for the end of the mission.

The update includes one encouraging observation. During a test, the faulty wheel moved when commanded. A single commanded movement is a first data point. Further testing will show whether the wheel can turn dependably, again and again, as part of everyday pointing. NASA's teams aim to bring Odyssey's science and relay work back during the last week of November, after further tests and analysis.

## A quarter century of service

Odyssey's importance comes partly from its record. It launched in April 2001 and entered orbit around Mars that October, on a mission planned to last just over two and a half years. By the time of the 2026 update, it had spent about 25 years at Mars. NASA calls it the agency's longest-running mission at the planet.

Over that time, NASA says, Odyssey mapped the chemical makeup of the Martian surface. It helped mission planners judge the hazards and scientific promise of possible landing sites. It also mapped water molecules and buried ice within about a meter, roughly three feet, of the surface. Odyssey has served as a messenger too. NASA credits it with relaying the first images from several landed missions, including Spirit, Opportunity, Phoenix and Curiosity.

That long career invites a guess that age caused the stalled wheel. NASA's update describes the fault and leaves its cause under investigation, so the guess stays a guess. The record does establish value. Odyssey has spent a quarter century at Mars, and its relay radio has carried rover data home for years. Its instruments and science remain offline during the current investigation, and restoring them is part of the team's stated aim. That long service makes the orbiter worth protecting carefully.

## What would count as recovery?

Put the two stories side by side and a pattern appears. Each spacecraft has reached a stable state through a different mechanism, and each mechanism carries a cost.

On Perseverance, fault protection switched from the unresponsive primary UHF radio to the backup. Testing then measured that backup at about half its expected output power. NASA says the team has stopped using both UHF radios pending evaluation. The rover's current contact with Earth runs over the slower direct X-band line, so science stays paused to give engineers room to diagnose.

On Odyssey, thrusters now handle the pointing that wheels used to do. That method keeps the orbiter aimed. It also spends a fuel supply that the team estimates would last one to two months if thrusters did all the pointing.

That raises a natural question. When backup arrangements keep a spacecraft stable and in contact but shrink what it can do, or burn through a limited reserve, what would real recovery look like?

The update suggests a ladder of steps, each one observable. The first rung is contact, and both spacecraft have reached it: they are out of safe mode and communicating.

The second rung is a dependable route for real work. For Perseverance, that means learning whether either UHF radio can be used, and under what conditions, so the rover can return to the faster relay path. For Odyssey, it means learning whether the stalled wheel can turn reliably enough to rejoin the pointing system. A working wheel would relieve the thrusters and stretch the fuel outlook. If thruster pointing continues, the team needs a refined fuel estimate to plan around.

The top rung is the one the public can see. It would mean science instruments switched back on and fresh images flowing into Perseverance's feed. It would also mean Odyssey once again collecting measurements and relaying data.

The order of the plans reflects that ladder. Reserving Perseverance's bandwidth for diagnostics trades some days of pictures for a clearer understanding of its radios. Keeping Odyssey's instruments off while engineers test a wheel trades some days of measurements for a better chance of preserving a long-lived orbiter. A rover that has spent years crossing Martian terrain and an orbiter with 25 years of service each represent capabilities that would be very hard to replace. A careful pause can therefore protect more science over the long run than a hurried restart would. That reasoning is an interpretation of the choices NASA describes. The update itself sets out the decisions and their goals.

This account rests on NASA's November 19 update and on NASA's background pages about its antennas and relay network. It reflects the status NASA reported on that date:

- Both spacecraft are in contact with Earth.
- Science is paused on each.
- The causes are under investigation.
- Testing measured the rover's backup UHF radio at about half its expected output power, and the team has stopped using both UHF radios pending evaluation.
- The orbiter currently points itself with thrusters, under a conditional fuel estimate.

The engineering records behind those findings remain with the mission teams.

The calendar now holds two dated aims. Odyssey's team hopes to restore science and relay work in the last week of November. Perseverance's team hopes to resume science by the end of the month. Each target describes an intention. The coming updates will show whether the backups can carry the science home again. Another possibility remains open: a rover that has worked on Mars for years and an orbiter with about 25 years of service may continue in a slower, more careful mode for a while longer.

## Sources

- NASA Science Editorial Team, "NASA's Perseverance, Odyssey Teams Investigate Technical Issues," November 19, 2026: https://science.nasa.gov/blogs/mars/2026/11/19/nasas-perseverance-odyssey-teams-investigate-technical-issues/
- NASA, Deep Space Network (background page; publication date unspecified): https://www.nasa.gov/communicating-with-missions/dsn/
- NASA Science, Mars Relay Network (background page; publication date unspecified): https://science.nasa.gov/mars/mars-relay-network/