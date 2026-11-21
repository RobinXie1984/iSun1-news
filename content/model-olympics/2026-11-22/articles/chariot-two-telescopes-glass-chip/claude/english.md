# Starlight From Two Mountain Telescopes Met Inside a Sliver of Glass. What Must the Chip Prove Next?

On Mount Wilson, in the hills above Los Angeles, six telescopes stand spread across the mountaintop. Together they form the CHARA Array, which Georgia State University operates. Each telescope collects starlight on its own. The array then sends that light along carefully managed paths to a central laboratory, where beams from different telescopes are brought together and measured.

Between May 2024 and July 2025, a research team sent light from two of those telescopes into a centimetre-scale piece of glass. The two beams combined inside it. The team calls the instrument CHARIOT. Heriot-Watt University in Edinburgh described the work in a report on October 27, 2026. The US National Science Foundation published an adapted version of that report on November 19, 2026. The researchers' own detailed account, with Aline Dinkelaker as lead author, is a preprint submitted on September 28, 2026. A preprint is a scientific paper shared publicly ahead of, or alongside, formal journal publication.

The contrast in sizes is what makes the story intriguing. The telescopes stand far apart, and their light travels a long way. Yet the decisive meeting of the two beams happens in a component small enough to rest in the palm of a hand. So what exactly shrank, and what did the test under the real night sky establish?

The first part has a precise answer. The chip takes over one job: combining the beams. The telescopes, the distances between them, the pipes and fibres that carry the light, the cameras that record it and the observatory around them all remain at full size. The second part of the question takes the rest of this story.

## Why astronomers join light from separate telescopes

A telescope does two separate jobs, and they depend on different things.

The first job is collecting light. That depends on the area of the main mirror. A bigger mirror catches more particles of light, called photons, so it can detect fainter objects.

The second job is seeing fine detail. That means telling apart two stars that sit very close together in the sky, or making out the shape of a single star's glowing surface. Detail depends on the width across which light is gathered. Wider spans show finer detail.

Interferometry is the technique that exploits the second job. Astronomers place telescopes far apart and combine their light. The pair can then measure detail on a scale linked to the distance between them, which astronomers call the baseline. The trade-off is plain. Two telescopes some distance apart gain sharpness connected to that distance. They still collect only the light that lands on their own two mirrors. An imaginary solid mirror spanning the whole gap would gather vastly more. Interferometry therefore suits bright targets and very fine structure: stellar sizes, the shapes of stars, and pairs of stars too close for a single telescope to separate.

The measurement itself relies on the fact that light behaves like a wave. Suppose waves from the same star arrive at two telescopes and are then brought together with their timing matched. Where crests meet crests, the light grows brighter. Where crests meet troughs, the light cancels. The result is a pattern of bright and dark bands called fringes.

A star that looks like a perfect point produces crisp, high-contrast fringes. A star with a measurable size produces fringes with lower contrast. Light from different parts of its glowing disc forms slightly shifted fringe patterns, and those patterns partly blur one another. A star with a close companion leaves a different signature. Its fringe contrast rises and falls as the spacing and direction between the telescopes change, because the patterns from the two stars line up at some spacings and orientations and partly cancel at others. Astronomers call the fringe contrast "visibility." A closely related quantity, the squared visibility, is the contrast multiplied by itself, a form that suits the measurement. By tracking how fringe contrast changes with telescope spacing and orientation, astronomers infer the size and shape of objects far too small for any single telescope to resolve.

The timing has to be carefully managed. Starlight reaches one telescope a tiny moment before it reaches another, so the array adjusts the lengths of the light paths to compensate. The instrument then controls and measures the remaining difference between the two paths, keeping it within the narrow range where fringes appear and steady enough for them to be measured. The light involved here has a wavelength of a few millionths of a metre, which gives a sense of how fine that control is.

An imagined scene helps show the idea; it is an illustration, separate from the real apparatus. Picture two friends standing at opposite ends of a long pond, each holding a stopwatch. A pebble drops somewhere far off, and each friend writes down the moment every ripple crest passes. Later they sit at a table and lay their notebooks side by side. By lining up the two sets of arrival times, they can see how the pattern of crests at one end compares with the pattern at the other, and from the delay between them they can work out the direction the ripples came from. The comparison works when the two stopwatches agree and both notebooks reach the table intact.

In this picture, the friends are the telescopes, the width of the pond is the baseline, and the table is the beam combiner. CHARIOT shrank the table. The real instrument goes further than the friends do: it combines the light waves themselves, in real time, which is a stricter version of the same comparison.

## Writing paths for light inside glass

The field behind the chip is photonics, the engineering of light in small, guided spaces. The key structure is a waveguide, a narrow channel that steers light along a set route, much as an optical fibre carries internet signals under the sea.

According to the team's preprint, they made their waveguides with a technique called ultrafast laser inscription. Extremely short laser pulses are focused inside a block of glass. At the focus, the glass changes slightly in a way that lets it hold and steer light. By moving the focus through the block, the team traced channels in three dimensions, directly inside the solid material.

The glass is a type of quartz called low-OH Infrasil. "Low-OH" means the glass contains very little hydroxyl, a water-related ingredient that absorbs some infrared light. That property suits this instrument, which works in the K band. The K band is a slice of near-infrared light with wavelengths a little over two micrometres, roughly three times longer than the deep red light at the edge of human vision.

The broad appeal of putting the combining job into glass is stability. A traditional beam combiner uses mirrors, lenses and beam splitters arranged on a laboratory table, and each piece needs careful alignment. In a photonic chip, the light paths are fixed inside a single solid piece.

The team frames its achievement narrowly and specifically. Their claim is the first on-sky demonstration of beam combination, in the K band, using a component made by ultrafast laser inscription. Optical interferometry itself, and photonic devices in astronomy, both have longer histories. The claim covers this fabrication method, in this band, tested on real starlight.

## Three runs on the mountain

The preprint describes three engineering runs, each a stretch of observing time devoted to testing the instrument.

The first, in May 2024, produced first fringes from real stars. That step matters because a device can perform well on a laboratory bench and still struggle once real starlight arrives. On the sky it meets air turbulence, vibration and the whole chain of telescope optics. The May run also met its own hardware trouble. The controller of a scanning stage failed, causing a loss of signal, and the authors suspect that camera vibration affected some data. They link some anomalous values from that run to these technical problems. For some of them, the authors remain uncertain whether a weaker signal or lingering technical issues was the cause, and for one target they suspect camera effects.

The second run, in October 2024, involved changes to the optics, along with repairs, and ran into hardware problems that affected the amount of light reaching the instrument. These were engineering setbacks, the ordinary friction of building an instrument.

The third run, in July 2025, used an improved chip that let more light through. This run produced the team's strongest results.

That chronology suggests a useful way to read the result: as a ladder. The first rung is detecting fringes at all. The second is measuring their contrast precisely. The third is calibration: comparing the target with well-understood reference stars, so that raw readings become trustworthy facts about the star itself. The top rung is using those facts to learn something new about the universe. Each rung demands more than the one below it. CHARIOT has firmly reached the first rung. For bright stars, it has also reached the second.

## What the numbers say

In the July 2025 run, the team measured the raw squared visibility of fringes on stars brighter than about magnitude 2 in the K band. The relative standard error of those squared-visibility measurements was below 1%.

Two terms need explaining. Astronomical magnitude is a backwards scale: smaller numbers mean brighter stars, and each step of one magnitude corresponds to roughly two and a half times less light. So "brighter than magnitude 2" describes some of the brightest stars in the infrared sky. Relative standard error expresses the uncertainty in an estimated value as a percentage of that value. A figure under 1% means each estimate of the squared visibility on those bright stars carried an uncertainty smaller than one-hundredth of that squared value.

That figure carries a specific meaning. It concerns the statistical precision of raw squared-visibility measurements on bright stars under the conditions of that run. It is distinct from image accuracy, from finished calibration, and from any planet detection.

The preprint places other figures alongside it. Separate measurements varied from one another by a few percent. That is a second, distinct quantity. Each individual estimate carried a small statistical uncertainty, while the results of separate measurements differed from each other by more than that uncertainty alone would suggest. The authors also report losses of light, along with losses of coherence, meaning fringe contrast lowered by the instrument itself. In their conclusion, they put the throughput of the fibre-connected beam combiner at about 40%. In other words, roughly two-fifths of the light entering that component comes out the other side. That figure describes the component alone. The efficiency of the entire telescope system is a separate and lower figure, since the system includes the combiner plus every mirror and fibre along the way.

CHARA's earlier instrument, JouFLU, offers a reference point. JouFLU reported sub-percent precision on stars around K magnitude 3 and brighter, and its limiting magnitude, the faintest it could work with, was about 4.5.

CHARIOT's reported sub-percent group covers brighter stars, around K magnitude 2 and brighter. Its fringe detection reaches further. One example in the preprint is the star HD210824, at K magnitude 5.212. CHARIOT recorded fringes from it with a relative standard error of about 4.61%, in what the authors describe as poor-to-moderate seeing. Seeing is the astronomers' term for how much turbulence in Earth's atmosphere blurs and shakes starlight.

These figures come from different instruments, observing periods and conditions. Each set describes the range that instrument has demonstrated; a matched side-by-side trial lies outside these reports. The authors' own reading is that CHARIOT is approaching the best precision of the former instrument and has already detected fainter targets. Improving the precision of measurements on those fainter stars is a goal they set for future work.

## Why a swappable test bench matters

The most practical feature of CHARIOT may be its design as a test bench. According to the Heriot-Watt report and the preprint, the combiner chip can be exchanged for a different one in a few hours, with optical adjustments. It is a deliberate process, closer to a scheduled refit than a quick plug-in, and that scale of effort is still modest for testing new hardware at a working observatory.

That gives designers a real array of telescopes on which to try new chip layouts. They can test them against genuine starlight, in addition to laboratory light sources. Each new design can be tried, measured and compared within a single observing campaign.

The goals ahead are clearly ambitious. CHARA has six telescopes, and the current chip combines two beams. Combining more beams at once would let the array measure more baselines simultaneously, building a richer picture of a target on each night. The team and the institutional reports also point toward several kinds of science. One is the study of exozodiacal dust, the warm dust that circles some other stars, similar to the dust in the inner solar system that produces the faint glow called zodiacal light. Another is the detection of close stellar companions. Planet science is a further, longer-term aim. All of these remain goals and possibilities. The measured achievement is the two-beam engineering demonstration described above. The reports examined here quantify instrument performance; a measured comparison of cost, maintenance or commercial timelines lies outside what this review establishes.

The sources also call for a note on how much independent support the story has. The NSF update adapts the Heriot-Watt report, so the two pages form a single line of institutional reporting about the same work. The detailed evidence comes from the authors' preprint. A related journal publication exists; its DOI points to Monthly Notices of the Royal Astronomical Society. Its final text was unavailable for this article, so any differences between it and the preprint remain unchecked here. The record examined for this article consists of the team's own measurements; whether another group has repeated the work elsewhere lies outside what these sources establish. Repeatability, calibration, more beams and fainter targets are the open areas that further evidence would need to address.

Taken as a whole, the record shows a genuine step from laboratory bench to night sky. A centimetre-scale piece of laser-written glass joined starlight from two telescopes on a mountain. Over three runs, it moved from first fringes, through hardware setbacks, to precise squared-visibility measurements on bright stars and fringe detection on fainter ones. Alongside that success stand 40% throughput for the combiner, variation of a few percent between measurements, and faint-star precision that the team aims to improve.

The next chapter turns on a single, testable question. When the glass carries light from more of CHARA's six telescopes and points at dimmer stars, will its readings hold steady from one measurement to the next and from one night to the next, closely enough for the dust, companions and planets the team hopes to study?

## Sources

- S1 — US National Science Foundation, "Photonic chip could help reshape future astronomical instruments," November 19, 2026 (adapted from S2): https://www.nsf.gov/mps/updates/photonic-chip-could-help-reshape-future-astronomical
- S2 — Heriot-Watt University, "Tiny photonic chip links telescopes together to view the universe in astonishing details," October 27, 2026: https://www.hw.ac.uk/news/2026/tiny-photonic-chip-links-telescopes-together-to-view-the-universe-in-astonishing-details
- S3 — Aline N. Dinkelaker and colleagues, "Stellar interferometry with a K-band integrated optics beam combiner instrument at the CHARA Array — I. First on-sky fringes for CHARIOT," preprint submitted September 28, 2026: https://arxiv.org/abs/2609.35194 (full text: https://arxiv.org/html/2609.35194v1)
- Related journal record (final text unchecked for this article): https://doi.org/10.1093/mnras/stag1745