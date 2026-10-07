# Research paper pack — the evidence behind the Phase-2 design

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](../README.md) for current scope.

> **status:** reference · **authoritative for:** which published research each Phase-2 design decision
> rests on, and the **limit** of what each paper actually supports · **last verified:** 2026-07-29.

> **Look-up, not read-through.** Open a row when you are about to change or challenge the decision it
> supports. Compiled 2026-07-28 during the Phase-2 brainstorm; promoted 2026-07-29 with the charter.
>
> **The 14 PDFs are not in this repo.** They were downloaded from author, university or institutional
> repositories, signature-checked, and **backed up by Chinmay outside the repo** — 19 MB of
> third-party PDFs does not belong in git history. Every row keeps its DOI and a stable source link,
> so any paper is one click from re-acquisition.
>
> **Supporting evidence, not a decision record.** The decisions are ADRs
> 0055 (reference outside this repository: `../decisions/0055-evidence-orientation-positioning.md`)–0058 (reference outside this repository: `../decisions/0058-transcript-structure-lane-prerequisite.md`);
> the rationale is `PHASE-2-CHARTER.md` (reference outside this repository: `../PHASE-2-CHARTER.md`).

## How to use this pack

No paper here prescribes a finished interface. Each supplies a narrower piece of evidence: how
analysts make sense of large evidence sets, which visual encodings people read accurately, what
changes in corporate disclosure can signal, how questions expose information, how people engage with
AI advice, and when a node-link graph becomes the wrong representation. The design combines those
findings with N4A's domain constraints; **it does not treat any single study as a universal rule.**

Each entry states the **design consequence** we drew and the **boundary** — what the paper does *not*
establish. Read the boundary before citing the paper in an argument.

---

### 1. Sensemaking is a loop, not a destination page

**Peter Pirolli and Stuart Card (2005),** "The Sensemaking Process and Leverage Points for Analyst
Technology as Identified Through Cognitive Task Analysis."
[Source](https://andymatuschak.org/files/papers/Pirolli%2C%20Card%20-%202005%20-%20The%20sensemaking%20process%20and%20leverage%20points%20for%20analyst%20technology%20as.pdf)

- **Design consequence:** Library supports the foraging loop — scan evidence, create a frame, find a
  tension, investigate, return — rather than acting as a terminal document grid.
- **Boundary:** the field work concerns intelligence analysis, not equity research. We reuse the
  sensemaking loop, not its workflow or terminology.

### 2. Prefer position and length for quantitative comparison

**William S. Cleveland and Robert McGill (1984),** "Graphical Perception: Theory, Experimentation,
and Application to the Development of Graphical Methods." *JASA* 79(387), 531–554.
DOI: [10.1080/01621459.1984.10478080](https://doi.org/10.1080/01621459.1984.10478080)

- **Design consequence:** segment comparisons use aligned bars and geographic mix a composition bar;
  area, decorative bubbles and angle encodings are excluded from precise comparison tasks.
- **Boundary:** elementary perceptual tasks. Supports the choice of *encoding*, not which financial
  metric matters.

### 3. Disclosure change is itself a research lead

**Lauren Cohen, Christopher J. Malloy and Quoc Nguyen (2020),** "Lazy Prices." *Journal of Finance*
75(3), 1371–1415. DOI: [10.1111/jofi.12885](https://doi.org/10.1111/jofi.12885) ·
[Harvard DASH](https://dash.harvard.edu/entities/publication/576a041c-19c4-47d8-b28d-2a5ef079f54f)

- **Design consequence:** *What changed* surfaces definition changes, stopped disclosures and
  revisions as first-class leads instead of silently carrying a series through a changed frame.
- **Boundary:** US filings and return predictability. We apply only the general observation that
  active reporting changes can be informative — **not** the alpha claim.

### 4. Analyst questions can reveal information beyond prepared disclosure

**Dawn Matsumoto, Maarten Pronk and Erik Roelofsen (2011),** "What Makes Conference Calls Useful?"
*The Accounting Review* 86(4), 1383–1414. DOI: [10.2308/accr-10034](https://doi.org/10.2308/accr-10034)
· [Erasmus repository](https://repub.eur.nl/pub/25721/)

- **Design consequence:** transcript questions and answers stay distinct evidence types, and the
  Timeline preserves speaker and section context instead of flattening a call into one summary.
  Direct support for ADR 0058.
- **Boundary:** the repository PDF is Roelofsen's dissertation (the article is Chapter 2). US-market
  based; it does not establish that every Q&A answer is more reliable.

### 5. AI should make the analyst think before it recommends

**Krzysztof Z. Gajos and Lena Mamykina (2022),** "Do People Engage Cognitively with AI? Impact of AI
Assistance on Incidental Learning." *IUI '22*, 794–806.
DOI: [10.1145/3490099.3511138](https://doi.org/10.1145/3490099.3511138) ·
[Author source](https://www.eecs.harvard.edu/~kgajos/papers/2022/gajos2022people.pdf)

- **Design consequence:** AI retrieves and explains evidence without pre-empting judgment; Ask
  separates observation from attribution from alternatives rather than leading with a verdict.
- **Boundary:** the experiments use nutritional decisions and simulated AI. Transfer to investment
  research is a **design hypothesis needing analyst testing**, not an established result.

### 6. A precise information gap creates useful curiosity

**George Loewenstein (1994),** "The Psychology of Curiosity: A Review and Reinterpretation."
*Psychological Bulletin* 116(1), 75–98.
DOI: [10.1037/0033-2909.116.1.75](https://doi.org/10.1037/0033-2909.116.1.75)

- **Design consequence:** a research lead articulates a *specific* contradiction or missing fact and
  turns it into an answerable question, instead of vague urgency or red "risk" decoration.
- **Boundary:** explains a motivational mechanism; it does not justify manufacturing uncertainty,
  ranking facts by drama, or dark patterns.

### 7. Node-link diagrams are task- and density-dependent

**Mohammad Ghoniem, Jean-Daniel Fekete and Philippe Castagliola (2004),** "A Comparison of the
Readability of Graphs Using Node-Link and Matrix-Based Representations." *IEEE InfoVis*.
DOI: [10.1109/INFVIS.2004.1](https://doi.org/10.1109/INFVIS.2004.1) ·
[Author source](https://mohammad.ghoniem.info/research/ivs-usability-2005.pdf)

- **Design consequence:** Graph uses progressive disclosure, focus neighbourhoods, explicit paths and
  filtered groups rather than one dense corpus-wide network; a readable relationship table remains
  available for precise lookup. Underpins ADR 0057.
- **Boundary:** generic graphs and older layouts. The crossover point is **not** a product threshold —
  test representative analyst tasks and real graph sizes.

### 8. Preserve context while expanding a local graph

**Frank van Ham and Adam Perer (2009),** "Search, Show Context, Expand on Demand." *IEEE TVCG* 15(6),
953–960. DOI: [10.1109/TVCG.2009.108](https://doi.org/10.1109/TVCG.2009.108) ·
[Author source](https://perer.org/papers/adamPerer-DOIGraphs-InfoVis2009.pdf)

- **Design consequence:** Graph begins with a scoped, stable subgraph; selection reveals a path and
  nearby context; explicit expansion protects the analyst's mental map.
- **Boundary:** degree-of-interest is an interaction strategy — **not permission to compute an opaque
  "importance" score.** Scope controls stay exposed; no hidden source weights.

### 9. Uncertainty belongs in the task, not in a generic confidence badge

**Jessica Hullman (2020),** "Why Authors Don't Visualize Uncertainty." *IEEE TVCG* 26(1), 130–139.
DOI: [10.1109/TVCG.2019.2934287](https://doi.org/10.1109/TVCG.2019.2934287) ·
[Author source](https://users.eecs.northwestern.edu/~jhullman/Value_of_Uncertainty_Vis_CR.pdf)

- **Design consequence:** show the source boundary, frame mismatch, missing period, contested claim
  and provenance path — the decision-relevant *reason* for uncertainty — instead of one
  decontextualised confidence percentage. This is the research backing for ADR 0056's "eight separate
  fields, no single score."
- **Boundary:** an interview study of visualization authors. It argues for contextual, actionable
  uncertainty; it does not prescribe one universal uncertainty visualization.

### 10. Human–AI behaviour must remain legible and correctable

**Saleema Amershi et al. (2019),** "Guidelines for Human-AI Interaction." *CHI '19*, Article 3.
DOI: [10.1145/3290605.3300233](https://doi.org/10.1145/3290605.3300233) ·
[Microsoft Research](https://www.microsoft.com/en-us/research/uploads/prod/2019/01/Guidelines-for-Human-AI-Interaction-camera-ready.pdf)

- **Design consequence:** source scope is visible and editable, citations expose why an output
  exists, Ask shows the subgraph it used, and suggestions can be dismissed or corrected.
- **Boundary:** 18 broad heuristics validated across product examples; they need contextual evaluation
  against a high-accountability investment workflow.

### 11. Separate domain questions, data, visual encoding and interaction

**Tamara Munzner (2009),** "A Nested Model for Visualization Design and Validation." *IEEE TVCG*
15(6), 921–928. DOI: [10.1109/TVCG.2009.111](https://doi.org/10.1109/TVCG.2009.111) ·
[Author source](https://www.cs.ubc.ca/labs/imager/tr/2009/NestedModel/)

- **Design consequence:** a module keeps a stable *contract* but selects its visual primitive only
  after the available data shape is known — the formal basis for "stable landmarks, adaptive
  contents."
- **Boundary:** a design and validation framework. It does not specify N4A's sector ontology, module
  thresholds, or which analytical questions matter most.

### 12. Name graph views by the task, not by the layout algorithm

**Matthew Brehmer and Tamara Munzner (2013),** "A Multi-Level Typology of Abstract Visualization
Tasks." *IEEE TVCG* 19(12), 2376–2385.
DOI: [10.1109/TVCG.2013.124](https://doi.org/10.1109/TVCG.2013.124) ·
[UBC](https://www.cs.ubc.ca/labs/imager/tr/2013/MultiLevelTaskTypology/)

- **Design consequence:** persistent Explore and Communities *views* with Focus and Trace as
  contextual *actions* — the analyst's purpose — while force, radial placement, path algorithms and
  clustering stay implementation techniques (ADR 0057 §4).
- **Boundary:** a domain-independent task vocabulary. N4A's split is a product interpretation that
  must be validated on real research tasks.

### 13. A useful graph supports several distinct interaction intentions

**Ji Soo Yi, Youn-ah Kang, John Stasko and Julie Jacko (2007),** "Toward a Deeper Understanding of
the Role of Interaction in Information Visualization." *IEEE TVCG* 13(6), 1224–1231.
DOI: [10.1109/TVCG.2007.70515](https://doi.org/10.1109/TVCG.2007.70515) ·
[Author source](https://faculty.cc.gatech.edu/~stasko/papers/infovis07-interaction.pdf)

- **Design consequence:** the graph covers select, explore, filter, connect and reconfigure
  behaviours as **coordinated** capabilities rather than unrelated destinations.
- **Boundary:** characterises intentions across many systems; it does not prove every category
  deserves a visible control.

### 14. Natural language and direct graph manipulation reinforce each other

**Arjun Srinivasan and John Stasko (2017),** "Orko: Facilitating Multimodal Interaction for Visual
Network Exploration and Analysis." *IEEE TVCG* 24(1), 511–521.
DOI: [10.1109/TVCG.2017.2745219](https://doi.org/10.1109/TVCG.2017.2745219) ·
[Author source](https://faculty.cc.gatech.edu/~john.stasko/papers/infovis17-orko.pdf)

- **Design consequence:** Ask is coupled to graph state — a question highlights nodes and links, the
  answer reports that footprint, and direct node selection supplies context for follow-ups.
- **Boundary:** Orko studies a general network interface with touch and speech. N4A's text Ask and
  provenance requirements are adaptations, not results the paper established.

---

## Cited in an earlier review, deliberately not saved as a PDF

**Lawrence D. Brown, Andrew C. Call, Michael B. Clement and Nathan Y. Sharp (2016),** "The Activities
of Buy-Side Analysts and the Determinants of Their Stock Recommendations." *JAE* 62(1), 139–156.
DOI: [10.1016/j.jacceco.2016.06.002](https://doi.org/10.1016/j.jacceco.2016.06.002) ·
[SSRN record](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2458544)

SSRN's automated download returned a Cloudflare "Just a moment…" challenge **rendered as a PDF**.
That counterfeit was detected and deleted rather than filed as research. Recorded here because a
silently-wrong source is worse than a missing one. No Phase-2 interface decision depends on it.

## Web standards and practitioner context

Deliberately not saved as "papers" — converting web pages to PDFs blurs source type and revision date:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — keyboard, focus visibility, contrast, target sizing,
  motion constraints.
- [CFA Institute: Company Analysis](https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/company-analysis-past-and-present) —
  professional context for business-model and historical-driver orientation.
- [IFRS Integrated Reporting Framework](https://www.ifrs.org/issued-standards/integrated-reporting/framework/) —
  the inputs → activities → outputs → outcomes frame behind the analytical roles. It does not
  prescribe an interface.
- [Infosys Integrated Annual Report 2024–25](https://www.infosys.com/investors/reports-filings/annual-report/annual/documents/infosys-ar-25.pdf) —
  primary-source grounding for the mockup's offerings, scale, industry and geography mix.
- Bloomberg Terminal and Koyfin product material — density and multi-view comparison context, not
  causal evidence for any decision.

## Interpretation guardrails

- **Evidence is not universality.** Most of this is not Indian-market-specific, and several are US or
  Western user studies. Validate terminology, workflow and source-authority cues with Indian equity
  analysts before treating any of it as settled.
- **A finding is not a feature request.** Each "design consequence" is our inference; the charter's
  acceptance tests decide whether it actually helps.
- **Provenance outranks polish.** A visual simplification must never erase source lineage, period,
  unit, frame, assertion time or contestation.
- **Task success outranks engagement.** Measure time to orient, correct issue selection, comparison
  accuracy, provenance recovery and correction behaviour — never clicks or time-on-page.
- **Stable grammar is not a fixed template.** Outer questions and evidence states repeat across
  companies; sector concepts and valid primitives adapt.
- **AI explanation is not analyst endorsement.**
- **Temporal adjacency is not causality.**
