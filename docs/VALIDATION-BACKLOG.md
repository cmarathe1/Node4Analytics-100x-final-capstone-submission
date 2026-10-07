# N4A — User-Testing Validation Backlog

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

> **status:** live · **authoritative for:** open bets only real users can settle (V1–V9) — a different
> axis from `ROADMAP.md`, which tracks work · **last verified:** 2026-07-29.

> A living list of decisions we are making on **judgment, best-guess, or domain reasoning** that only
> **real users can confirm**. Whenever we hit one during planning or build — a place where we think "we're
> guessing here, an analyst will tell us if we're right" — add a pointer so it isn't lost. At user-testing
> time, this is the focus list: what to watch, probe, and measure.
>
> This is **not** a bug tracker or a formal test plan. It is the set of *open bets* whose verdict comes
> from users, kept so we can validate and improve deliberately rather than from memory.

## How to use
- Add an entry the moment you notice an assumption only a user can confirm.
- Keep each entry to: **the bet**, **why it needs real users**, **what to watch / how to test**, **status**.
- When testing resolves it, update **Status** and link the resulting change (ADR, doc, or code).

## Status legend
`open` — not yet tested · `watching` — being observed in testing · `confirmed` · `adjusted` · `rejected`

| # | Area | Bet (short) | Status |
|---|------|-------------|--------|
| V1 | Ingestion / knowledge graph | Our entity + claim conflict resolution matches how an analyst reads "same thing / disagree" | open |
| V2 | Ingestion / signals | Our conflict *detection* is a neutral referee and doesn't systematically tilt (bullish skew, echo-chamber inflation, taxonomy blind spots) | open |
| V3 | Ingestion / knowledge graph | Atomic-fact claim extraction is high-*precision* and the user-curated coarse attribute lens is *complete* — the graph an analyst would call "accurate and well-connected" | open |
| V4 | Foundation / generalization | The **universal analytical frame** (coarse) + sector-derived drivers (fine) genuinely generalizes across sectors *and* use cases (company / industry / portfolio / M&A), and the Library UI makes the foundation usable — not just IT-services-shaped (ADR 0024) | open |
| V5 | Ingestion / analyst workflow | A decision-grade proposition lets an analyst verify and correct evidence faster without hiding omissions or collapsing subject, publisher and originating voice | open |
| V6 | Phase 2 / positioning · workflow | Our users are on **constructive** tasks (so the orientation arc is experienced at all), and orienting to the **evidence** beats orienting to the company for them | open |
| V7 | Phase 2 / Library grammar | The evidence-led brief — **16 analytical roles in 5 landmark groups** (ADR 0059, superseding the original 8), research leads, the seven evidence states — produces a correct mental model in one scan, and reproduces across sectors. **Tested at ladder checkpoint 1** (after rung 13) | open |
| V8 | Phase 2 / Graph · Timeline | A separate Graph destination earns a sixth nav slot, and a multi-track Timeline aligns events without users inferring causation | open |

---

## V1 — Entity & claim conflict resolution
**Added:** 2026-06-22 · **Area:** Ingestion / knowledge graph · **Status:** `open`

**The bet:** The pipeline resolves messy real-world references to canonical **entities** (Infosys = INFY =
INFY.NS, parent vs. subsidiary) and canonical **attributes/topics** (operating margin = EBIT margin; "GenAI"
= "generative AI"), then mechanically decides when two claims **agree** (corroborated) or **disagree**
(contested). We are betting these resolution + normalization rules match how a real analyst judges whether
two sources are talking about the same thing, and whether they actually conflict.

**Why it needs real users:** Sameness and conflict are judgment calls at the edges, and our hero signal
(*contested*) rides on getting them right. Offline tuning handles the obvious cases; only a real analyst
exposes the edges:
- **False contradictions** — e.g. FY23 vs. FY24 margin is a time series, not a conflict.
- **Missed contradictions** — subtle hedged guidance vs. a hard reported number.
- **Over-merging** — parent and subsidiary (or two same-named people) collapsed into one.
- **Under-merging** — the same entity/attribute left split, so a real conflict never gets matched.

**What to watch / how to test:**
- Show real contested/corroborated pairs from the Infosys basket; ask "is this a real conflict? same thing?"
- Track analyst-judged false-positive and false-negative contestation rates.
- Surface entity-resolution merges/splits in the graph and watch for wrong ones.
- Note which attributes/topics users expect treated as "the same" that we split (or vice versa).

**How we'll respond:** Treat resolution + normalization rules as **tunable with a feedback path** — a user
correction ("merge these", "split these", "not a conflict") should update the canonical spine. Design for
**correction from day one** rather than assuming the rules are perfect upfront.

---

## V2 — Directional & selection bias in conflict detection
**Added:** 2026-06-22 · **Area:** Ingestion / signals · **Status:** `open`

**The bet:** Conflict *detection* is a **neutral referee** — it surfaces disagreements with both sides cited
and source authority shown, and does **not** adjudicate who is right. We are betting the system doesn't
systematically *tilt*: skew bullish by over-trusting management/filings, inflate corroboration by counting
syndicated/reprinted news as independent sources, or stay blind to conflicts our seed attribute taxonomy
never named.

**Why it needs real users (+ an eval set):** Skew is invisible without measurement and a domain eye. An
analyst notices "you keep siding with the company" or "you missed the bear case everyone's discussing" long
before a metric does. And **selection bias enters upstream of resolution** — in *which* sources we ingest at
all — so it can't be tuned away purely in the algorithm.

**What to watch / how to test:**
- Directional skew on the Infosys basket: do we over-flag bullish corroboration / under-flag bearish conflict?
- Echo-chamber inflation: does one wire story republished across outlets count as 1 independent source or many?
- Taxonomy blind spots: ask analysts what they argue about that the system never surfaces.
- Authority handling: is source authority *shown* (user decides) or silently deciding for them?

**How we'll respond:** Keep detection deterministic and **present-don't-adjudicate**; frame polarity
directionally (improving/deteriorating), not good/bad; **count independent sources, not documents**; pin the
extraction model; keep a small labeled eval set scored for false-pos/neg *and directional skew*; balance the
connector set to include skeptical sources. Auditability (provenance to L0) + user correction is the
backstop for irreducible bias.

---

## V3 — Extraction precision & coarse-lens completeness ("the best graph")
**Added:** 2026-06-24 · **Area:** Ingestion / knowledge graph · **Status:** `open`

**The bet:** The L3 graph construction (ADR 0019) is good enough that an analyst calls it "accurate and
well-connected." Two specific bets sit under that: (1) **atomic-fact extraction is high-precision** — claims
faithfully reflect their source passage and don't "explicitize" plausible-but-absent facts (the documented
failure mode of atomic decomposition); (2) **the user-curated coarse attribute lens is complete** — it names
the things an Infosys thesis actually turns on, so real claims don't fall through into a catch-all and vanish
from contestation.

**Why it needs real users (+ a gold set):** "Best" is unmeasurable by vibes. Precision/recall need a small
hand-labeled gold set, but *completeness of the lens* and *"does this graph read as how things connect"* are
domain judgments — an analyst spots a fabricated claim or a missing coarse attribute (e.g. we never modeled
"large-deal ramp-down") faster than any metric. This is upstream of V1 (resolution) and V2 (skew): if the
claims themselves are wrong or the lens has a hole, resolution and signals are computing over bad inputs.

**What to watch / how to test:**
- Sample extracted claims against the source pages: precision (fabricated/ungrounded claims) and recall
  (real claims missed) on a labeled set of AR sections.
- Show the derived coarse spine to an analyst: "what do you argue about that isn't here?" (lens completeness).
- Watch the precision↔recall dial: we tune toward precision (a missed claim is cheaper than a fabricated
  one for a provenance-first system) — confirm that's the right call with users.
- Check the connection layer: are the seeded entity↔entity relations the ones that matter, and are any
  obviously-missing or wrong?

**How we'll respond:** Keep extraction **precision-guarded** (reject ungrounded claims, ADR 0019); keep the
coarse lens **user-curated and feedback-tunable** (a "this is really about X" / "add attribute Y" correction
updates the spine, same path as V1); grow the gold set as corrections arrive. Provenance to L0 is the audit
backstop for every claim.

**First responses landed (2026-06-24, ss5a — ADR 0020), status still `open`:** the precision discipline now
exists in code — a **token-overlap grounding gate** drops a fine-attribute candidate whose label isn't
supported by its source passage; a **narrative-only sampling filter** keeps Lane-2 statement lines out of the
taxonomy; the coarse lens is hand-curated in `seeds.py` (the `capital_allocation` over-merge was split after the
audit); every derived entry stores `map_method`/`map_score` so a reviewer can audit *why* it mapped. What still
needs **users + a gold set**: are the thresholds right, is the 14-attribute lens *complete*, is precision-over-
recall the correct dial.

**Reframed (2026-06-25, ADR 0024):** the audit found token-overlap grounding validates the claim's *topic*
but **not its direction** — and direction → polarity → `contested`, so a single mis-read direction is
indistinguishable from a real disagreement. The completeness bet also moves up a level: it is now whether the
**universal analytical frame** (coarse) is complete and whether the **fine** drivers (the new contestation
key) are right per sector. Planned responses: contestation at fine granularity, a **stated-vs-defaulted
period** flag, and a **targeted polarity-verification** LLM check on claims that enter a contested pair
(LLM-at-the-edge, not at bulk).

---

## V4 — Cross-sector & cross-use-case generalization ("does the foundation actually generalize")
**Added:** 2026-06-25 · **Area:** Foundation / generalization · **Status:** `open`

**The bet:** The substrate (L0–L3, the two spines, provenance, retrieval) plus the **universal analytical
frame + sector-derived fine drivers** (ADR 0024) genuinely serves analysts across **sectors** (IT, banking,
pharma, FMCG…) and across **use cases** (company research, industry research, portfolio analysis, M&A
modeling) — and the Library UI makes that foundation *usable*, not just inspectable. We are betting the
universal frame is the right altitude: abstract enough to hold for any sector, concrete enough to navigate.

**Why it needs real users:** "General" is unprovable from one sector. Only a domain analyst can tell us the
universal frame is missing a dimension their sector turns on, that a sector's fine drivers are wrong or
incomplete, or that a use case (esp. the structured-data-heavy portfolio / M&A jobs) needs something the
narrative-claim substrate doesn't provide. The audit's honest caveat — portfolio & M&A are Lane-1/2-first and
those lanes are still skeleton — is itself a bet to confirm: does the foundation *block* them, or just
*not-yet-serve* them?

**What to watch / how to test:**
- Run the foundation on a **non-IT** corpus (a bank or pharma name) via the Library UI: do the spine, claims,
  and graph read as "accurate and well-connected" to a sector specialist?
- Show the universal coarse frame to analysts in ≥2 sectors: "what do you evaluate that isn't a dimension
  here?" (frame completeness) and "are these the drivers that matter?" (fine completeness).
- Probe a use-case other than company research (industry comparison across peers; a portfolio/exposure
  question): where does the narrative-claim substrate stop and a structured lane need to begin?
- Watch whether the **Library UI** lets an analyst actually *do* their analysis, or only browse the graph.

**How we'll respond:** Keep the universal frame **user-curated** (same feedback path as V1/V3); add sectors as
**data** (seed entities + derive fine drivers), never code; treat the Lane-2 structured-data sequencing as a
deliberate, ADR-tracked decision once the Library foundation is signed off (ADR 0024 follow-up).

---

## V5 — Decision-grade proposition usefulness
**Added:** 2026-07-21 · **Area:** Ingestion / analyst workflow · **Status:** `open`

**The bet:** The 1F proposition contract (ADR 0053) matches how a fundamental Indian public-equity analyst
updates coverage: enough context to verify the statement, correct attribution across company/broker/news
voices, valid period/basis/comparator semantics, visible omissions, and an append-only correction path.

**Why it needs real users:** Field precision can be green while the review object is slow, noisy or shaped
unlike an analyst's working notes. Only observation reveals which context is sufficient, which unresolved
fields deserve interruption, whether precision-over-recall is tuned correctly, and whether the correction
cost is lower than checking the source manually.

**What to watch / how to test:**
- Give an analyst a fresh results/transcript/broker bundle; compare time to verify and classify a proposition
  with the source-only baseline.
- Ask who made each statement and whether quoted/reprinted evidence is an independent view.
- Present revision, actual-vs-guidance, adjacent-period and restatement pairs; ask whether N4A's relation
  matches the analyst's judgment.
- Record corrections by field and whether the analyst trusts the downstream update receipt.
- Ask what important evidence the coverage receipt missed; measure omissions, not just accepted volume.

**How we'll respond:** Tune evidence-bundle context, coverage budgets and review interruption thresholds from
observed corrections. Keep raw evidence immutable, grow property-based gold cases from recurring correction
classes, and do not promote a review warning into a contested signal.

---

## V6 — Does the evidence reframe hold for our actual users?
**Added:** 2026-07-29 · **Area:** Phase 2 / positioning · workflow · **Status:** `open`

**The bet:** ADR 0055 rests on two claims. (a) Our users are on **constructive** tasks — the Kuhlthau
workplace finding is that the exploration→formulation arc is *not experienced at all* on routine
monitoring tasks, so on a routine task the whole orientation surface is overhead. (b) Orienting to the
**evidence they assembled** is more valuable to them than orienting to the company, which Screener and
Tijori already do free.

**Why it needs real users:** This is the **largest unclosed gap in the entire Phase-2 research** —
carried as R3 through two research rounds and never closed. Every workflow source behind the charter is
Western, secondary and practitioner-authored. Nothing in the pack is direct observation of an Indian
analyst working, and the constructive/routine split is precisely the kind of claim that reads as obvious
and is often wrong in the field.

**What to watch / how to test:**
- Observe (don't ask) what an analyst does in the first five minutes on a name they are picking up, and
  on a name they already cover. Are these two behaviours or one?
- Does the analyst ever want "what changed since I last looked" — the routine end — from this surface?
  If yes, the single-mode decision (§2.2) is wrong, not just incomplete.
- Do they read the evidence boundary at all, or scroll past it to the content?
- Ask what they would have opened Screener/Tijori for during the session. Every such moment is either a
  gap or a correct boundary — record which.
- **R6:** are informal predictions (capacity, headcount, launch dates) frequent enough in Indian
  transcripts to support a guidance-versus-delivery series? A corpus test over the twelve transcripts,
  not a user test.

**How we'll respond:** If the split is real, the declared-lens design (§2.2) is vindicated and earnings-
update becomes the second lens. If users are mostly on routine tasks, the brief is the wrong default and
the phase re-sequences toward change-detection. Do **not** resolve this by adding an inferred mode.

---

## V7 — Does the Library grammar produce a correct mental model, and reproduce?
**Added:** 2026-07-29 · **Area:** Phase 2 / Library grammar · **Status:** `open`

**The bet:** ADR 0056's grammar — **sixteen** analytical roles in five landmark groups (ADR 0059
superseded the original eight), research leads, the seven evidence states,
one module anatomy — lets an analyst build a correct model of an unfamiliar company in 60–90 seconds,
and does so on a bank, an industrial, a consumer company and a sparse discloser as well as on the two
foundation specimens.

**Why it needs real users:** Every part of this is a judgment call no gate can settle. Which roles are
*necessary* in the first frame versus too heavy for orientation; whether putting leads above detailed
movement improves question quality or weakens the model users form; whether "research lead" reads
better than "evidence signal" to an Indian equity analyst; how much evidence posture fits in the first
line before it stops being scannable; whether the seven states are legible as *different* things or
collapse into "missing" in the reader's head.

**What to watch / how to test:**
- The charter §9 orientation test, timed, on a company the analyst does not cover.
- **Distinguishing test:** can they tell three documents from three independent origins? An observed
  fact from a management explanation from a system lead? not-applicable from not-disclosed from
  not-acquired?
- Watch for the failure this design exists to prevent: does a **quiet absence read as completeness**?
- Run the same property tests cross-sector (charter §9). The design fails if it only looks complete on
  Infosys/HDFC or needs company-specific production logic.
- Which governance/reporting checks are extractable precisely enough to earn a visible slot — and note
  that both foundation specimens are clean large-caps, so this content renders empty on them.

**How we'll respond:** Cut roles that don't earn the first frame rather than shrinking them. If the
seven states collapse in perception, the fix is display treatment, **never** merging the states in the
read model — the distinctions are what make absence honest.

---

## V8 — Does Graph earn a sixth nav slot, and does the Timeline stay honest?
**Added:** 2026-07-29 · **Area:** Phase 2 / Graph · Timeline · **Status:** `open`

**The bet:** ADR 0057's separation — Graph as its own destination, persistent views split from
contextual actions — improves repeat use enough to justify a sixth top-level item; and ADR 0056 §8's
multi-track Timeline helps analysts align market, operating and disclosure events **without** inferring
causation that the evidence does not support.

**Why it needs real users:** A sixth nav item is a permanent cost paid by every user on every visit. And
the causation risk is a real hazard, not a styling concern: putting a price line above company events on
one axis is *exactly* the arrangement that invites post-hoc storytelling. We mitigate it with copy
("Alignment shows sequence — not causation") and mark design, but only observation shows whether the
mitigation works.

**What to watch / how to test:**
- Do analysts return to Graph directly, or only via Library handoffs? If only via handoffs, the
  destination isn't earning its slot and the contextual entry was sufficient.
- Are Focus and Trace understood as contextual actions **without training**?
- Is the relationship table used — and by whom? It is the keyboard/non-visual equivalent, not a fallback.
- **The causation probe:** after using the Timeline, ask what caused a move. Any answer sourced from
  adjacency alone is a design failure, regardless of what the caption said.
- Which Timeline tracker rows earn permanent slots by company archetype, and when should a row be
  **omitted** rather than shown empty?
- Which price lookback orients without duplicating Dashboard or encouraging short-term anchoring?

**How we'll respond:** If Graph is only reached contextually, demote it back into a handoff surface and
reclaim the nav slot — that is a cheap reversal and should be treated as one. If the causation probe
fails, weaken the visual coupling (separate the price lane, or drop it) before weakening the caption.

---

## V9 — Does an AI expert's story of the company help, or anchor?
**Added:** 2026-10-01 · **Area:** Phase 2 / Library rung 14 (ADR 0145) · **Status:** `open`

**The bet:** analysts want an expert's account of the company, with a standing story, a current
chapter, and the AI's interpretations marked with falsifiers (the equation was dropped, 0146). They also read the
standing marks (*filed · attributed · the AI's interpretation*) and discount each correctly.

**Why it needs real users:** the 2026-09-30 research found **no direct evidence** that analysts want
per-company mechanism prose. Existing tools show descriptions, KPI tables and event summaries, and
nobody has studied the gap between them. A fluent story is also exactly what anchors: the FactSet
GenAI study found richer content alongside *lower* forecast accuracy.

**What to watch / how to test:**
- **The anchoring probe:** after reading the story, ask the analyst's own view of a disagreement it
  laid out. Answers that repeat the AI's framing without its evidence are a failure.
- Can an analyst say, unprompted, which sentences were the AI's interpretation?
- New-name onboarding: time to a correct one-paragraph description, with and without the module.
- Do falsifiers get opened, and are they what the analyst would watch?

**How we'll respond:** if the anchoring probe fails, cut interpretations before cutting facts, and
make the standing marks louder. If the module goes unread, shrink it to the lede and the
current chapter.

---
