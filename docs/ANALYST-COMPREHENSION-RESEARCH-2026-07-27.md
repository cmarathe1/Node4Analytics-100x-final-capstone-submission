# The Comprehension Layer — research, diagnosis and design rationale for Phase 2

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

> **status:** live · **authoritative for:** the research case and design rationale for the pre-graph
> comprehension surface; the measured state of the foundation corpus as of this date ·
> **last verified:** 2026-07-27.

> **What this document is.** A first-principles research pass on one question: *what should an analyst
> meet first when they open a company, and why?* It measures what our foundation data actually is,
> establishes from external evidence how analysts really build understanding, and derives a design.
>
> **What it is not.** Not a description of the system as built. Not a plan of record — it is input to
> the Phase-2 charter, deliberately written from a fresh perspective rather than as an extension of
> existing designs, per the instruction that produced it.
>
> **Relationship to its neighbours.** `PHASE-1-HOLISTIC-REVIEW-2026-07-24.md` (reference outside this repository: `PHASE-1-HOLISTIC-REVIEW-2026-07-24.md`)
> §6.1 already named the absence ("no ten-minute readiness brief yet"). This document does the work of
> establishing *what that brief should be, why, and what it costs* — and it reaches one conclusion the
> review did not: a material part of the gap is in the belief layer, not the display layer.

---

## 0. Method and epistemic status — read this first

**What is measured.** Every number in §1 and §2 was queried live against the running Postgres store on
2026-07-27 (`ws-infosys-foundation`, `ws-hdfc-foundation`). Queries are reproducible; the notable ones
are inlined so they can be re-run. Where I state a defect, a verbatim example from the data is given.

**What is cited.** External findings in §3–§4 carry a source. I have marked practitioner/peer-reviewed
sources apart from content-marketing ones, because the difference matters.

**What is weak, stated plainly.** Three background research agents (analyst-workflow primary sources,
comprehension literature, competitor teardown) were dispatched and **all three died on a session usage
limit before returning anything.** I re-ran the highest-value questions myself with a much smaller
search budget. The consequence: §3's theory spine is solid (the load-bearing papers were reached
directly), but §4's competitive teardown is **thin** — I have Screener.in, Obsidian and AlphaSense at
useful depth and the rest at surface level. **The three research tracks should be re-run when budget
allows**; §9 lists exactly what is still missing. No finding below depends on a source I did not read.

**One structural bias to declare.** I profiled the data before doing the external research. That order
was deliberate (ground first, then look outward) but it means the research questions I chose were
shaped by defects I had already found. A second pass that reads the literature first might weight
things differently.

---

## PART I — WHAT WE ACTUALLY HAVE

## 1. The foundation corpus, measured

Two workspaces, built as deliberate opposites: an IT services exporter and a bank. That contrast is
well chosen — it is the cheapest available test of whether any design generalises across sectors,
because almost nothing in the two companies' KPI vocabularies overlaps.

| | `ws-infosys-foundation` | `ws-hdfc-foundation` |
|---|---|---|
| Documents | 18 | 19 |
| Annual reports | 2 (FY25, FY26) | 3 (FY24, FY25, FY26) |
| Concall transcripts | 6 | 6 |
| Earnings presentations | 0 | 3 |
| Broker research | 1 | 3 |
| Quarterly financials / factsheets / PR / news | 9 | 7 |

Aggregate: **37 documents · 3,342 pages · 55,508 parsed elements · 12,219 chunks (100 % embedded) ·
2,667 tables with structured rows · 1,268 transcript turns across 114 named speakers.**

This is a genuinely good corpus. It has multi-year depth (HDFC has three consecutive annual reports),
it has the full authority spread from audited filing down to news, and it has both companies' own voice
and the street's. **The raw material for everything below already exists.** That is the most important
finding in this section, and it reframes Phase 2: the problem is rarely acquisition, it is promotion.

### 1.1 The parse layer is strong; the promotion layer is where things stop

`elements` is rich and well-typed — 27,428 paragraphs, 15,285 headings, 2,667 tables, 1,268 transcript
turns, with speakers, bounding boxes and per-row table structure. The Phase-1 parse work shows here.

But four tables that a company model needs are **empty**:

```
fin_facts        0
line_items       0
vendor_snapshots 0
acquisitions     0
```

The numbers are not missing from the corpus. They are sitting in `elements.rows`, unpromoted. Page 17
of the Infosys FY25-26 annual report parses to:

```json
["In US$ million, except per equity share data*","FY 2026","FY 2025","FY 2024","FY 2023","FY 2022"]
["Revenues","20,158","19,277","18,562","18,212","16,311","Carbon offset programs"]
["3,00,000+"]
["Net profit#","3,313","3,158","3,167","2,981","2,963"]
["14","84%"]
```

That is the five-year headline series, correctly aligned — and it is already enough to say something an
analyst would stop on: **revenue +4.6 % in FY26, a four-year CAGR near 5.4 %, and net profit of $3,313 mn
against $3,167 mn two years earlier — essentially three flat years of profit.** No language model was
needed to notice that. It is subtraction.

Two lessons sit in that fragment. First, the promotion job is tractable. Second, it must be
**contamination-tolerant**: `"Carbon offset programs"` and `["3,00,000+"]` are bleed from adjacent
infographics on a design-heavy AR page. Any promoter that assumes clean rectangular tables will fail on
exactly the pages that matter most. This is the same class of defect the 1D₁ parse gate was built to
catch (the broker alternating-shaded-row witness); it recurs at the promotion boundary.

### 1.2 The passport classifier fails on the numerically densest documents

**11 of 37 documents are `document_kind = 'unknown'` and `authority_tier = 'unverified'`.** They are not
marginal files. They are:

- every quarterly consolidated and standalone financial statement (4 docs, ~143 pages)
- every factsheet (2 docs)
- every press release (2 docs)
- HDFC's three "Key Parameters" results releases
- both news items

So the documents carrying the cleanest, most structured, most recent numbers are the ones the system
declines to classify — and therefore the ones whose claims inherit the lowest trust. An exchange-filed
quarterly result is a `primary_exchange_filed` artifact of high authority; it is currently indistinguishable
from an unattributed blog post. This is a bounded, deterministic fix (filename and cover-page patterns for
results filings are highly regular) and it gates trust everywhere downstream.

## 2. The belief layer, measured — and where it will not carry a first screen

492 claims · 329 relations · 233 entities · 358 concepts. Now the structure of it.

### 2.1 The relation layer knows the *shape* of the business, and it is good

| Relation | Infosys | HDFC |
|---|---|---|
| `parent_of` | 36 | 12 |
| `partners` | 24 | 27 |
| `offers` | 17 | 23 |
| `has_segment` | 9 | 19 |
| `operates_in` | 8 | 1 |
| `regulated_by` | 3 | 2 |
| `competes` | 2 | 0 |

Nearly all of it is `explicit` or `reported` evidence from `audited_filing`. Spot-checked, it is correct:
Infosys' Ind AS 108 verticals (financial services, retail/CPG/logistics, manufacturing, life sciences,
energy/utilities, hi-tech, communications), its geographies (India, North America, Europe, US, RoW), its
products (Finacle, Topaz, Topaz Fabric, Panaya, Stater), its subsidiaries.

**This is the single most under-used asset in the system.** It is verifiable, structural, sector-agnostic
by construction, and it is precisely the "what is this company" frame an analyst needs before anything
else can register as surprising. Today it is rendered as undifferentiated nodes in a force graph.

### 2.2 …but the claim layer has collapsed to a single subject, so the two layers cannot join

| Workspace | Claims on the parent entity | Total |
|---|---|---|
| Infosys | 242 | 243 |
| HDFC | 219 | 249 |

Infosys has **one** non-parent subject in 243 claims, and it is `citizens_bank` — a client from a case
study, promoted to claim subject. HDFC does slightly better (subsidiaries appear: HDB Financial, HSL,
HDFC ERGO, HDFC AMC, HDFC Life) but has exactly **one** segment-level claim (`retail_banking`) out of 249.

The consequence is precise and severe. **Relations know the parts; claims know the movement; nothing
joins them.** The system can tell you Infosys has seven verticals, and it can tell you 44 things about
"demand outlook", but it cannot tell you demand outlook *in financial services versus manufacturing* —
which is the actual question. A first screen that says "here are the segments" and then "here is what's
happening" without connecting the two is two lists, not a brief.

### 2.3 The claim key is effectively 11 buckets wide, because fine attributes are 4 % populated

```
attribute_fine populated: 20 / 492 = 4.1%
section_class  populated:  0 / 492 = 0%
```

The concept registry holds 358 concepts and 84 fine attributes. Claims almost never reference them. So
the operative claim key is `(subject, coarse_attribute, period)` across **11** coarse buckets:
demand_outlook, profitability, capital_allocation, growth, operating_efficiency, risk, cash_generation,
competitive_position, balance_sheet_strength, management_governance, valuation.

This matters far more than it looks, and §2.6 proves why on real data.

### 2.4 88 % of the belief layer is the company talking about itself

| Authority tier | Claims |
|---|---|
| `company_stated` | 339 |
| `audited_filing` | 94 |
| `unverified` | 52 |
| `broker_research` | **7** |

By voice: management 289 · company 170 · **analyst 13** · journalist 3.

Independent (broker or news) claims per attribute for Infosys:

| Attribute | Claims | Independent |
|---|---|---|
| demand_outlook | 44 | **0** |
| profitability | 40 | **0** |
| capital_allocation | 39 | **0** |
| growth | 26 | **0** |
| operating_efficiency | 25 | **0** |
| risk | 23 | **0** |
| cash_generation | 19 | **0** |
| competitive_position | 14 | 1 |
| valuation | 1 | 1 |

**Nine of eleven topics have zero independent verification.** Partly that is corpus composition — one
broker note for Infosys. But it means any "here is what's happening at this company" view built from
today's claims is, structurally, *management's own narrative rendered as system knowledge*. Under the
provenance invariant that is not a lie — every claim is correctly attributed. It is worse than a lie in
one specific way: it is *accurate and misleading at the same time*, because the aggregate reads as
knowledge while being testimony.

This is the strongest argument in this document for a particular design choice, and I will return to it:
**the asymmetry should be shown, not smoothed.** "94 % of what this system knows about FY26 came from
the company itself" is a more useful first sentence than any summary.

### 2.5 The highest-authority documents are the least mined — a 21× gap

| Document kind | Docs | Pages | Claims | Claims/page |
|---|---|---|---|---|
| transcript | 12 | 376 | 282 | **0.750** |
| presentation | 3 | 111 | 57 | 0.514 |
| unknown | 13 | 174 | 52 | 0.299 |
| broker_research | 4 | 31 | 7 | 0.226 |
| annual_report | 5 | **2,650** | 94 | **0.035** |

Annual reports are **79 % of the corpus by page and 19 % of its claims.** Extraction yield from a live
earnings call is 21× that from an audited annual report.

The belief layer therefore over-weights the corpus's most rhetorical, least durable source and
under-mines its most authoritative one. That is exactly backwards from how the authority ladder is meant
to work, and it is invisible in any test that counts claims rather than claims-per-page-per-tier.

### 2.6 The coarse bucket makes "disagreement" unmeasurable — proof

The most promising raw material for a hook is topics where sources disagree. Query the claim clusters
with mixed polarity and it looks abundant: `operating_efficiency / FY2026` has 20 claims across 7
documents carrying all three polarities. On the coarse key, that is a textbook contested topic.

It is not. Here is the actual content, chronologically:

| Asserted | Polarity | Claim (truncated) |
|---|---|---|
| 2025-01-21 | stable | "We are expecting for FY26 … 20,000 plus fresher hiring." |
| 2025-04-22 | improving | "…the negative consultancy and professional charges in the…" |
| 2025-04-22 | deteriorating | "Q4 generally has a seasonality in terms of lower working…" |
| 2025-07-28 | stable | "…we are operating at a peak [utilization]" |
| 2025-07-28 | improving | "On the SG&A bump up of almost 90 bps this quarter…" |
| 2025-07-28 | deteriorating | "On the depreciation and amortization, the decrease to almost 50 bps…" |
| 2025-07-28 | deteriorating | "Attrition increased marginally to 14.4%." |
| 2025-10-21 | improving | "And we also onboarded 12,000 freshers." |
| 2025-10-21 | deteriorating | "Subcontractor usage has come down from the range of 11%…" |
| 2025-10-21 | improving | "…pre-COVID, we were at close to 30% onsite, 70% offshore." |
| 2026-01-19 | deteriorating | "Utilization, excluding trainees was down by 1% sequentially at 84.1%…" |
| 2026-02-24 | improving | "They automated the entire workflow, increasing the extent of automation…" |
| 2026-02-24 | improving | "…the bank has talked about a $450 mn cost run rate reduction target…" |
| 2026-02-24 | deteriorating | "As a result of taking automation to about 70%, the turnaround time reduced from…" |

**At least seven unrelated sub-topics** are in this one bucket: fresher hiring, cost lines (consultancy,
SG&A, D&A), working-day seasonality, utilization, attrition, subcontractor mix, onsite/offshore mix, AI
productivity, and client case studies. Mixed polarity here is **bucket noise, not contestation.** And
because `attribute_fine` is 4 % populated, *there is no way to tell the two apart* — a genuine reversal
in management's utilization commentary is indistinguishable from D&A and attrition landing in the same
drawer.

The same query surfaces four further defect classes worth naming, because each is a root class rather
than an instance:

**(a) Polarity sign-flips on inverse metrics.** "…turnaround time *reduced* from…" → tagged
**deteriorating**. "Subcontractor usage has *come down* from 11 %" → tagged **deteriorating**. Both are
improvements; for an IT services firm, falling subcon usage is a margin positive and every analyst knows
it. The extractor is reading the direction of the *number* rather than the direction of the *business
meaning*. ADR 0011's "directional, not good/bad" polarity rule was meant to prevent judgment creeping
in — it does not protect against a metric whose good direction is down, and lower-is-better metrics
(attrition, cost ratios, GNPA, turnaround time, days-sales-outstanding) are a large fraction of what
matters in both sectors.

**(b) Modality inversion.** "On the guidance, for this quarter we declined 3.5 %" → tagged `guidance`
(it is *reported* — the word "guidance" appears but the statement is an actual). "We are expecting …
20,000 plus fresher hiring" → tagged `reported/stable` (it is `guidance`). Modality is being taken from
vocabulary rather than from the grammatical stance of the sentence. Since ADR 0053 makes
actual-vs-guidance a `variance_to_expectation` relationship rather than a conflict, an inverted modality
does not merely mislabel one claim — it routes the pair down the wrong comparison path entirely.

**(c) Non-claims promoted to claims.** `"So, Sandeep, it is a factor of the demand and supply
environment."` is filed as `demand_outlook / improving / opinion`. `"Our stellar execution in a
seasonally weak quarter is a clear reflection of our ability to navigate the uncertain environment
effectively."` is filed under `risk / stable`. The first is conversational connective tissue; the second
is management puffery indexed as a risk assessment. There is a noise floor, and it is not trivial.

**(d) Wrong subject on case-study claims.** "…the bank has talked about a $450 mn cost run rate reduction
target" and "They automated the entire workflow…" are claims about an Infosys *client*, carried under
`subject = infosys`. Combined with §2.2's collapse, client achievements are being absorbed into the
covered company's record. This is the most dangerous of the four, because it is not noise — it is a
confident, well-cited, *false* attribution.

**Design consequence, stated bluntly: a first screen cannot render the claim list.** Any surface that
shows claims individually, or counts them, or infers a mood from their polarity mix, inherits every
defect above and presents it with the authority of a designed interface. Whatever we build first must be
robust to a noisy claim layer — which means it should lean on the *deterministic* substrates (relations,
document metadata, transcript structure, table rows, text diffs) and treat model-extracted claims as
supporting evidence reached by a click, not as the headline.

### 2.7 Period grounding is mostly *defaulted*, and one date bug is a day-truncation

`period_kind`: fiscal_year 329 · quarter 89 · **date 68** · range 6. But `period_kind` understates the
problem. By **source**:

| Period source | Infosys | HDFC | Share |
|---|---|---|---|
| source-stated | 17 | 28 | **9 %** |
| inferred | 80 | 88 | 34 % |
| defaulted | 146 | 133 | **57 %** |

**Only 9 % of claims carry a period the source actually stated.** 57 % are defaulted. Since ADR 0011
requires overlapping periods for contestation and ADR 0053 makes supersession semantic rather than merely
chronological, a majority-defaulted period field means the temporal machinery is largely operating on
assumptions rather than evidence. This is materially worse than the `period_kind` counts suggest, and it
is the sharpest form of G2 in the holistic review.

**And the odd date cluster has a specific cause.** I flagged `2026-03-03` ×21 as "a spurious day
component"; the foundation audit diagnoses it exactly: source language **"March 31, 2026" is being stored
as `2026-03-03` instead of `2026-03-31`** — a day-truncation defect affecting at least **25 active claims
across 11 documents** (14 Infosys, 11 HDFC), including margin, asset-quality, capital, tax, dividend and
cash-flow propositions. The wrong ISO value is already present in the raw mention while the cited body
visibly reads day 31.

That is a deterministic, must-fix data-layer bug with an obvious gate: compare the provider-normalised
date against the literal date in the cited text, reject or flag disagreement, and add a **"March 31
remains March 31"** gold property. The display layer must expose period provenance — it must **not**
normalise around a known upstream defect.

### 2.9 Corrections and additions from the foundation audit

The user's own generated audit (`data/derived/foundation/` (reference outside this repository: `../data/derived/foundation/`) —
`README.md` plus a per-company report and a 98 MB reproducible DB dump) independently reaches the same
core conclusions from a different direction. Where it is more precise than my queries, it wins; where it
adds facts I did not have, they are folded in here. **Its numbers agree with mine on every overlapping
measure** (37 docs · 3,342 pages · 55,508 elements · 2,667 tables · 12,219 chunks · 492 claims · 358
concepts · `fin_facts=0` · 20 fine attributes · the full relation-type table), which is useful mutual
verification.

**(a) The read-time projection explodes, and ~99.8 % of it is coarse-frame.** Infosys projects **1,580
comparisons · 890 signals · 164 graph nodes · 583 graph edges**; HDFC 1,482 · 1,144 · 143 · 463.
**1,578 of 1,580 comparisons and 888 of 890 signals operate at the coarse frame.** The audit records the
consequence in the same terms §2.6 reaches independently: *"the audit observed unrelated claims being
paired as revisions — for example, working-capital sufficiency versus headcount under
`balance_sheet_strength`."* Two independent passes found the same defect on different examples, which
makes it a structural property rather than an unlucky sample.

This also corrects my §3 estimate: the Infosys graph is **164 nodes and 583 edges** — average degree
**~7.1**. Edge density, not node count, is what makes it unreadable, and 583 edges is far past any
node-link legibility threshold in §4(a).

**Signal mix:** `time_series 456` · `variance 150` · `revised 134` · `corroborated 102` ·
`comparison_flagged 48`. The largest class by far is time series across adjacent periods — which is Band
2's material, currently rendered as signal cards instead of a series.

**(b) There is a large review universe beneath the active layer, and a first screen must not imply
otherwise.** The funnel from raw mentions to active claims:

| Stage | Infosys | HDFC |
|---|---|---|
| raw claim mentions | 946 | 1,062 |
| extraction-kept | 704 | 666 |
| review-required | 197 | 317 |
| rejected | 45 | 79 |
| resolution deduplications | 381 | 322 |
| `out_of_lens` drops | 79 | 87 |
| **active claims** | **243** | **249** |

So 492 active claims are the survivors of **~2,008 raw mentions**. This matters directly for Band 3c: *"no
source covers this"* and *"we dropped it as outside the lens"* and *"it is sitting in review"* are three
different states, and collapsing them into silence would be dishonest in exactly the way the project's
honest-states rule (P4) forbids. **The silence map must distinguish them.**

**(c) Passport confirmation is worse than §1.2 said.** Not 11 of 37 — **all 37 passports carry
`metadata_confidence = needs_confirmation`**, because no analyst has confirmed acquisition metadata for
any document. The 11 `unknown`/`unverified` are the subset that also failed classification.

**(d) The concept registry is mostly provisional, and provisional must never become a headline.** Each
workspace has **53 canonical** concepts against **108 (Infosys) / 144 (HDFC) provisional**. The
provisional pool contains plausible candidates ("deposit mobilisation", "legacy modernization") beside
clear noise — transcript titles and broker names promoted to concepts. Any Band-3 topic view must draw
from canonical concepts only; a provisional concept surfacing as a first-screen theme would put parser
noise in the most authoritative position on the page.

**(e) One genuinely positive finding I had missed.** The 20 resolved fine attributes are **correctly
sector-shaped**: EBIT margin, voluntary attrition, large-deal TCV, onsite/offshore mix, ROE and
constant-currency growth for Infosys; NIM, CASA, loan growth, cost-to-income and GNPA for HDFC. That is
evidence the **universal registry design works** — sector-specific concepts held without company
hard-coding, exactly as ADR 0049 intends and consistent with the no-example-specific-logic rule. The
problem is coverage (4 %), not architecture. This is a meaningfully more optimistic read than §2.3 alone
suggests, and it means the fix is population, not redesign.

**(f) Known parse and resolution residue**, for completeness: three pages lack extractable body text (AR
FY24–25 p.30; AR FY25–26 p.2, p.33) with minimum document text coverage 99.48 % and no document
requiring OCR; one duplicate product entity awaits judgment (`AI Next` vs `EdgeVerve AI Next`) with five
further fuzzy candidates queued and deliberately **not** destructively merged; 48 comparisons are flagged
and 429 report `frameCompleteness = review_required`. The last figure is the review inbox G4 gave a verb
to, and it is already material.

**(g) The baseline is reproducible.** `n4a-foundation-20260727.dump` (98,762,386 bytes, SHA-256
`819A5EB3…E92F15`) captures this exact state, restorable into a fresh database. Every measurement in
Part I can therefore be re-verified after any Phase-2 change — which is what makes the numbers above a
baseline rather than an anecdote.

### 2.8 The richest independent signal in the corpus is parsed and then discarded

1,268 transcript turns. 114 named speakers. Among them: `Moderator` (82 turns — which marks the
prepared-remarks/Q&A boundary), management (Salil Parekh 154, Jayesh Sanghrajka 164, Srinivasan
Vaidyanathan 155, Sashidhar Jagdishan 63), and **named sell-side analysts** — Abhishek Murarka 22, Kunal
Shah 21, Ankur Rudra 20, Vibhor Singhal 19, Sandeep Shah 17, Mahrukh Adajania 15.

So the system already knows, per call, who asked what, in what order, and whether it came before or after
the moderator handed over. And the belief layer contains **13 analyst-voice claims out of 492.**

Hold that against §2.4: the corpus's only genuinely independent professional voice is *the questions the
street chose to ask* — and it is thrown away. §3.3 shows this is also where analysts themselves spend
most of their reading attention. I think this is the single largest available opportunity in the system,
and §5 builds on it.

## 3. What the current surface does with all this

`apps/web/app/library/library-workspace.tsx` (reference outside this repository: `../apps/web/app/library/library-workspace.tsx`) is
**3,776 lines in one file** (F14: "difficult to change safely"). Its layout:

```
SourcePanel (collapsible)  |  GraphPanel (NOT collapsible)  |  RightRail (collapsible)
```

The graph is not the *default* centre view. It is the **only** centre view — the two side rails collapse,
the graph cannot. Entering the Library is structurally identical to entering the graph.

For Infosys that graph projects **164 nodes and 583 edges** (HDFC: 143 / 463) — average degree **~7.1** —
and its largest single entity category is `company` (80 nodes), overwhelmingly subsidiaries and alliance
partners. The first thing an analyst meets, therefore, is a 164-node / 583-edge force layout whose
dominant visual mass is a list of legal entities. **Edge density, not node count, is the binding
constraint** (§4a).

That is the thing to fix, and §4 establishes why it is a predictable failure rather than a matter of taste.

---

## PART II — WHAT THE EVIDENCE SAYS

## 4. Why graph-first fails — and it is not a preference

Four independent lines of evidence converge, and the convergence is what makes this a finding rather
than an opinion.

**(a) The topology/task mismatch is measured, not aesthetic.** The Obsidian graph view is the largest
natural experiment in "give people a knowledge graph and see if they use it." The community verdict is
blunt: it becomes "a tangled web that's more fun to look at than navigate" past roughly **200 notes**,
and the one regime where it stays legible is **under ~50 nodes**
([Code Culture](https://codeculture.store/blogs/developer-culture/obsidian-graph-view-useful);
[KnodeGraph](https://knodegraph.com/blog/obsidian-graph-view-alternative/)). Our Infosys graph is ~190
nodes — inside the failure band, outside the legible one. The sharpest formulation of *why* is worth
quoting because it is exactly our problem: the graph is *"a topological map of your connections, not an
operational view of your knowledge work. It does not show priorities, status, or what you need right
now."* The counter-case ([Eleanor Konik's defence](https://www.eleanorkonik.com/p/its-not-just-a-pretty-gimmick-in-defense-of-obsidians-graph-view))
does not contradict this — it defends the graph for *small, scoped, already-understood* vaults, which is
precisely the second-step role.

**(b) The graph-visualisation literature abandoned overview-first for large graphs two decades ago.** Van
Ham & Perer's *"Search, Show Context, Expand on Demand"* (IEEE TVCG 15(6), 2009 —
[PDF](https://perer.org/papers/adamPerer-DOIGraphs-InfoVis2009.pdf)) opens by noting that although
displaying an overview of an entire graph is the field's common goal, *"there are many situations where
such an overview is not relevant or practical for users, as analyzing the global structure may not be
related to the main task of users that have semi-specific information needs."* Their prescription
inverts Shneiderman's mantra: begin from a **point of interest**, compute a degree-of-interest function,
and expand context on demand. An analyst opening a company has exactly a semi-specific information need.
**The literature's answer is not "no graph" — it is "the graph needs an entry point, and the entry point
is not the graph."**

**(c) Curiosity has a precondition, and a hairball violates it.** Loewenstein's information-gap theory
([Golman & Loewenstein, CMU](https://www.cmu.edu/dietrich/sds/docs/golman/Information-Gap%20Theory%202016.pdf);
[overview](https://psychologyfanatic.com/information-gap-theory/)) establishes that curiosity does not
arise from ignorance. It arises from **awareness of a specific, bounded piece of missing information**,
plus a belief that it is findable and that the answer matters. In Loewenstein's words: *"There are many
things that people don't know and that don't bother them, but awareness of specific pieces of missing
information can prompt an unreasonably strong desire to fill these gaps."* And critically: *complete
ignorance does not produce curiosity; partial knowledge that reveals a specific gap does.*

A 190-node graph delivers the wrong quantity on both axes. It is not partial knowledge — it is total
undifferentiated structure. It identifies no specific gap, so it generates no specific question. It
produces the feeling of *much to know* rather than *one thing I need to find out*, and those are
different states with different behaviours.

**(d) Experts are actively harmed by scaffolding.** The expertise reversal effect (Kalyuga and colleagues;
[Instructional Science special issue](https://link.springer.com/article/10.1007/s11251-009-9102-0);
[summary](https://idtips.substack.com/p/the-expertise-reversal-effect-when)) shows that guidance which
helps novices *degrades* expert performance: the expert already holds the schema, so external
explanation forces them to reconcile two representations and adds working-memory load instead of
removing it. Kalyuga's trade-apprentice studies found text explanations alongside wiring diagrams became
"not just unhelpful but actively detrimental" as expertise rose.

This is the mechanism behind a complaint we should expect to hear about any summary we generate: *"it
tells me what I already know."* That is not a quality failure that better prose fixes. It is structural.
**For our user, explanation is a cost.** What an expert wants is not our schema — it is our *evidence*,
positioned where their own schema will catch on it.

**The synthesis.** Graph-first fails because it is topology offered to someone who has no frame to hang
it on, at a node count past legibility, identifying no specific gap, in a medium that cannot say what
matters now. Every one of those four clauses is independently attested. The user's intuition — that the
graph is a good second step and a bad first one — is not just correct; it is the consensus position of
the literature that studies this, and we are on the wrong side of it.

## 5. How analysts actually build understanding

> Caveat from §0: the primary-source agent died before returning. This section rests on fewer sources
> than it should. The three load-bearing findings below were each read directly and are solid; the
> broader ethnography of an Indian analyst's week is **not yet done** (§9).

**(a) Sensemaking has two loops, and the expensive one is not search.** Pirolli & Card's *The Sensemaking
Process and Leverage Points for Analyst Technology* (2005 —
[PDF](https://www3.cs.stonybrook.edu/~mueller/teaching/cse591_visAnalytics/sensemaking.pdf)) — derived
from cognitive task analysis of *intelligence analysts*, about as close a cousin to equity research as the
literature offers — models the work as a **foraging loop** (search, filter, read, extract) feeding a
**sensemaking loop** (schematise, build a case, tell a story). Four phases: gather, represent, develop
insight, act.

The leverage point is the **transition** between the loops — turning foraged fragments into a schema. Our
system is, almost exactly, a very good foraging engine: it fetches, parses, chunks, embeds, extracts,
resolves, cites. What it does not do is help with schematisation, which is where an analyst's cost
actually sits. And a force graph is not a schema — it is more foraging output, in a new shape.

**(b) Analysts allocate attention to unscripted material, roughly 3:1.** On earnings calls, professionals
*"skim prepared remarks in 5 minutes and read the Q&A carefully in 15 minutes"*
([HeyGoTrade](https://www.heygotrade.com/en/blog/reading-earnings-call-transcripts-5-signals-pros-catch/) —
practitioner-oriented content, corroborated across several independent write-ups; treat the exact ratio
as indicative, the direction as reliable). The reason given is structural rather than stylistic:
*prepared remarks are scripted and lawyer-reviewed; the Q&A is live, and management answers on its feet.*
The named signals practitioners track are **hedging language, topic pivots, repeated phrases, comparison
gaps, and analyst follow-up patterns** — four of the five being *differences over time*, not levels.

Set against §2.8: the part of the corpus analysts read hardest is the part whose structure we parse and
then discard.

**(c) "What changed in the language" is the highest-value signal in a filing, and this is empirical.**
Cohen, Malloy & Nguyen, *Lazy Prices*, Journal of Finance 2020
([NBER w25084](https://www.nber.org/system/files/working_papers/w25084/w25084.pdf);
[SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1658471)) measure year-over-year textual change
across the full history of US quarterly and annual filings, 1995–2014. A portfolio short "changers" and
long "non-changers" earns up to **188 bps monthly alpha — over 22 % a year.** Changes predict future
earnings, profitability, news, and firm-level bankruptcies. The most informative changes are in
**executive-team language, litigation, and the risk-factor section.**

This is as strong a result as this literature produces, and its design implication is direct: **the diff
between consecutive annual reports is worth more than either report read alone.** We hold Infosys FY25 +
FY26 and HDFC FY24 + FY25 + FY26 — one two-year pair and one three-year run, already parsed into
section-pathed elements. We compute no diffs at all.

The mechanism also explains why an *absence* deserves the loudest treatment. A metric that was disclosed
last year and is not disclosed this year is the strongest form of change, and it is invisible to every
retrieval system — because you cannot retrieve what is not there. Only a diff finds it.

**(d) The professional convention puts structure before numbers before opinion.** The Capital IQ tearsheet
opens with a **business description naming the main sources of revenue and operations**, then market data
and financials, with drill-downs to statements, estimates and charts alongside
([Babson guide, PDF](https://www.babson.edu/media/babson/assets/cutler-center/CapIQ_Basic-Functionality-and-Navigation_Stegeman_FINAL.pdf)).
Sell-side initiation notes follow the same arc: business and industry, then segment detail, then
projections, then valuation ([Sell Side Handbook](http://sellsidehandbook.com/careers/equity-research/);
[M&I](https://mergersandinquisitions.com/equity-research-careers/)). Initiation *takes months* — which
tells us the ten-minute brief is not a compressed initiation note. It is the thing that tells you where
to spend the months.

**(e) The one product that has solved the question-provoking first screen is Indian and free.**
Screener.in's company page carries a **"Pros and Cons"** block generated from financial-statement analysis
and recent news, described as letting an investor *"know the risks and advantages of a stock at a
glance"* ([Screener features](https://www.screener.in/features/);
[review](https://www.strike.money/reviews/screener-in)). It is the most-loved element on the most-used
Indian research site, and the reason is structural: it is **short, specific, two-sided, and mechanically
derived.** It does not conclude. It hands you six sentences that each imply a question, and the natural
next action is to go check one.

Two things to take and one to leave. Take the **two-sidedness** — the negative column is non-optional and
appears at equal weight. Take the **derivation** — users trust it because it reads as computed rather
than opined. Leave the **generic ruleset**: Screener's rules are sector-blind, so they fire the same
checks on a bank and a software exporter. We have a sector-aware concept registry and can do better than
"promoter holding has decreased."

**(f) The gap in existing AI research tools is verification, not fluency.** Even sympathetic reviews of
AlphaSense's generative summaries land on the same limit: useful for *finding* divergent opinion, but not
for *generating a synthesis* an analyst will rely on — *"requiring analysts to still manually go through
materials to develop reliable synthesis"* ([IntuitionLabs review](https://intuitionlabs.ai/articles/alphasense-platform-review);
[G2](https://www.g2.com/products/alphasense/reviews)). Reported weak points: nuance lost in
context-dependent language, stale or incomplete financial-statement sections.

**This is our actual competitive position, and it is worth being clear-eyed about it.** We will not win
on summary quality — that is a model capability, purchasable by anyone, and §4(d) says experts discount
it anyway. Phase 1 built something harder to copy: an immutable run substrate, section-pathed citations
down to an L0 artifact, deterministic comparison, authority at acquisition. **The differentiator is
verifiability and computed structure, not fluency.** A first screen designed to show off summary quality
would be competing on our weakest axis. One designed so every statement is one click from the page it
came from competes on our strongest.

---

## PART III — THE DESIGN

## 6. The organising idea: the hook is a *bounded gap*, not a summary

The instruction that produced this document contained the answer to its own question. *"It needs to be
the middle part of the understanding process."* Loewenstein explains why that is exactly right:

- **Zero knowledge** (today's graph: 190 undifferentiated nodes) → no specific gap is identified → no
  specific question forms. Only a diffuse sense of volume.
- **Complete knowledge** (an AI summary that concludes) → the gap is closed on the reader's behalf → no
  question forms, and §4(d) says the expert pays a cognitive-load penalty for reading our schema anyway.
- **The middle** → a specific, bounded, findable absence, in a frame solid enough for the absence to be
  visible → the question forms **in the analyst's head**, and it is theirs.

So the design objective inverts the usual one. **Maximise the number of specific gaps identified, not the
number of answers delivered.** Everything below follows from that sentence.

Segel & Heer's narrative-visualisation taxonomy gives us the shape
([Stanford PDF](http://vis.stanford.edu/files/2010-Narrative-InfoVis.pdf)): author-driven experiences are
linear and non-interactive; reader-driven ones have no prescribed order and high interactivity. Their
**Martini Glass** structure joins them — a short author-driven *stem* that establishes the story, opening
into a reader-driven *bowl* for free exploration.

That is our architecture, and it names the graph's correct role:

```
   the stem  →  THE BRIEF        author-ordered, ~2 minutes, ends in questions not conclusions
   the bowl  →  GRAPH / ASK / PDF   reader-driven, entered already holding a point of interest
```

And this is precisely van Ham & Perer's prescription: *search, show context, expand on demand.* **The
brief is how the analyst acquires the point of interest that makes the graph work.** The graph is not
demoted — it is finally given the entry condition it has always needed.

## 7. The Brief — four bands, fixed order

Names are working titles. The **order is the load-bearing claim** and it derives from §5(d) (structure
before numbers before opinion), from Klein's data-frame requirement that a frame must exist before data
can be anomalous, and from the rule that each band must be readable in one glance before the next earns
attention.

> **DECIDED 2026-07-27 (Chinmay): one surface, state-dependent entry.** §9·1 raised initiation
> ("orient me on a new company") versus maintenance ("what changed since I last looked") as two
> different products. The call is **one surface with the same four bands, where entry state decides
> which band arrives expanded** — first visit expands SHAPE, return visit expands FRICTION with SHAPE
> collapsed to a reference strip. See §7.0 for what this costs and the two traps it walks into.

### 7.0 What "state-dependent" requires — and two traps in it

The decision is right: it avoids building two products, and both jobs genuinely want the same four
bands in a different emphasis. But it is not free, and two consequences need designing rather than
discovering.

**Trap 1 — this is exactly the "hidden personalization" the review warned against.** Holistic review
§6.5 says Phase 2 should use *"explicit saved task lenses, not hidden personalization."* An automatic
mode switch based on visit history **is** hidden personalization, and the failure mode is specific: an
analyst who cannot tell which mode they are in cannot tell whether an empty FRICTION band means
"nothing changed" or "you are in initiation mode and this band is collapsed." **Resolution: the state
must be visible and overridable.** Name the mode on screen, show what watermark produced it, and let
the analyst flip it in one click. The system's guess is then a *labelled default*, which is a lens —
not personalization.

**Trap 2 — it needs a last-viewed watermark, and writing one on view brushes against ADR 0033.** The
KB-opt-in rework established that *viewing a company never writes the KB* — an explicit
`POST/DELETE …/kb` is the only mutation path. A "since you last looked" delta needs per-analyst read
state, which is a write on view. **These do not actually conflict, but only if kept apart:** the
watermark belongs in a private per-user read-state table, never in the shared KB or the workspace's
belief layer. It must not affect what any other analyst sees, and it must not participate in
`ResearchScope`. If a watermark can change a projection, the projection stops being reproducible.

**And one clarification the decision forces: there are *two* different deltas, and conflating them
would be a mistake.**

| Delta | Question | Mechanism | Where it lives |
|---|---|---|---|
| **Corpus delta** | what arrived in the system since I last looked | new documents, new claim/relation versions since run *X* | Band 3, top, on return visits |
| **Disclosure delta** | what the *company* changed in its own language YoY | section-aligned diff of consecutive filings (§5c) | Band 3b, always |

The first is about *us*; the second is about *them*. Only the second carries the *Lazy Prices* warrant.
An analyst returning after a week wants the first; an analyst forming a view wants the second. Both are
FRICTION, and they must be visually distinct — a new broker note arriving is not the same event as a
risk factor being reworded.

**One thing this decision makes cheaper than expected:** the immutable run substrate already supports
the corpus delta. `claim_versions` carries `run_id`, `resolution_runs` and `extraction_runs` are
retained, and `active_claims` is a view over versions. "What is new since run *X*" is a query, not new
infrastructure. That is Phase 1's run substrate paying off in a way it was not specifically designed
for.

### Band 1 — SHAPE · *what this company is* (≈10 seconds)

Segments with revenue weight · geographies · products · the subsidiary tree · regulators. Rendered as
**structure, not prose** — a compact diagram or dense list, tokens-only, `--ease-mech` transitions only.

- **Answers:** what · where · who
- **Source:** the relation layer (§2.1), `audited_filing`, deterministic
- **Available today:** yes, essentially as-is
- **Why first:** it is the frame. Nothing later can register as surprising without it. It is also the
  band that makes the design sector-agnostic — "segments, geographies, products, subsidiaries" is a
  universal skeleton, and it is why HDFC and Infosys can share one layout without either looking wrong.
- **Why not prose:** §4(d). A generated paragraph describing Infosys to an equity analyst is pure
  redundancy cost.

### Band 2 — MOVEMENT · *what the numbers did* (≈20 seconds)

The multi-year headline series and the quarterly trajectory. Sparkline-dense, tabular figures,
₹ lakh/crore-aware, **no commentary whatsoever.**

- **Answers:** when · how much
- **Source:** `fin_facts` — **empty (§1.1).** This band is blocked.
- **Available today:** **no.** This is the #1 prerequisite.
- **Why it cannot be skipped:** every professional first screen in §5(d)–(e) is anchored on a financial
  time series, and Band 3's most valuable comparisons are number-to-narrative. Without it, "management
  says margins are improving" has nothing to sit against. Shipping a brief without Band 2 means shipping
  a narrative-only company model — the exact overstatement the holistic review's §6.3 warned about.

### Band 3 — FRICTION · *what does not sit still* (≈2 minutes) — **this is the hook**

Three sub-bands. Each is question-shaped. **None concludes.** Each item shows its provenance inline and
is one click from the cited page.

**3a · What the street pressed on.** Mine the Q&A halves of the transcripts (§2.8: `Moderator` marks the
boundary, speakers are named): which topics did named sell-side analysts raise, how often, across how
many consecutive calls, and did management's answer *change*? Show the question and the two answers
side by side.
- *Why this is the strongest available hook.* It is not our opinion — it is the observed behaviour of
  other professionals, which is both the highest-credibility and lowest-presumption content we can put
  on screen. It is the corpus's only genuinely independent voice (§2.4). It is where analysts already
  spend 3× their reading attention (§5b). It is inherently interrogative — it *is* a list of questions.
  And it is buildable now from deterministic parse structure, so it does not inherit §2.6's claim-layer
  noise.
- *Available today:* the substrate yes; the mining, no. **Highest value-to-cost item in this document.**

**3b · What changed in the language.** Year-over-year diff of consecutive annual reports, section by
section, weighted toward risk factors, MD&A, segment disclosure, accounting policy, and executive
commentary — the sections *Lazy Prices* identifies as most informative. **A disclosure that disappeared
is the loudest item on the page**, because no retrieval system can surface an absence.
- *Why:* §5(c). 188 bps monthly alpha is the strongest empirical warrant in this document, and we have
  the year-pairs already parsed.
- *Available today:* no. Needs a section-aligned diff over `elements`. Moderate cost, deterministic,
  no model required for detection (a model may later *describe* a diff, but must not decide it).

**3c · What nobody independent has verified.** The silence map: per topic, who has spoken — company,
auditor, street, press — and who has not. Render §2.4 honestly: *nine of eleven topics have zero
independent verification.*
- *Why:* Loewenstein's bounded absence in its purest form, and the direct answer to the review's §6.2
  ("a quiet absence can still look complete"). It also converts our thinnest data into an asset: a
  system that says *"this is testimony, not verification"* earns more trust than one that shows 44
  confident claims. This is the six-thinking-hats black hat given a permanent, non-optional home — see
  §8.
- *Available today:* **yes.** Pure aggregation over document metadata and claim authority. Cheapest item
  here and it should not wait.

### Band 4 — DOORS · *the handoff*

Every Band-3 item is a launch point: into the graph **focused on that node**, into Ask **pre-seeded with
that question**, into the PDF **at the cited page**. Nothing in the brief is a dead end.

- This is the martini glass opening, and the graph's new correct role.
- Also fixes the review's §6.4 (citation verification friction). If Band 3's whole purpose is to make an
  analyst want to check something, then the cost of checking is the design's central metric.

### What must NOT be in the brief

Stated as prohibitions because each is a live temptation:

1. **No verdict, score, or rating.** The moment we conclude, the analyst stops forming their own view and
   starts auditing ours — and invariant 9 (conflicts detected, not adjudicated) becomes a lie at the
   display layer even while the belief layer honours it.
2. **No generated prose describing the company.** §4(d). Redundancy cost for an expert.
3. **No individual claim cards, and no counts of claims.** §2.6. A count over a noisy layer with a
   collapsed subject and a 4 %-populated fine key is a confident number that means nothing.
4. **No polarity mix rendered as sentiment or mood.** §2.6 proves it is bucket noise, and §2.6(a) proves
   the polarity itself sign-flips on lower-is-better metrics.
5. **No hiding the authority asymmetry.** Show that it is 88 % self-reported. It is the most useful
   uncomfortable fact we have.

## 8. The proposed frameworks, assessed honestly

The brief that commissioned this document offered several thinking models "as random ideas." Taking them
seriously means saying which earn a place and which would be decoration — and per the standing directive
to bring an independent view rather than agree, two of the five do not survive.

**Aristotle's rhetoric — partly, and one part matters a lot.**
*Ethos* is the whole ballgame for this audience: credibility is built by citation, by deterministic
derivation, and — most of all — by publicly admitting what we do not know. Band 3c is an ethos
instrument. *Logos* is satisfied by the same. *Kairos* (timeliness) maps cleanly onto "what changed since
you last looked," a real and buildable idea. **But *pathos* must be actively excluded.** Emotional
framing in a research tool reads as hype to a professional and destroys the ethos the rest is buying.
This is my main hesitation about the word "hook": in media a hook is engagement bait, and an expert who
smells engineering-for-attention discounts everything around it. I would rather name the mechanism than
the effect — **Friction**, or **Tension** — because the mechanism is *unresolved tension*, not capture.

**Six Thinking Hats — a category error, with one salvageable part.** De Bono's hats are a *facilitation
protocol for a group generating divergent ideas in sequence*. Our user is one expert doing convergent
analysis on fixed evidence. Six lenses on a first screen would be six times the redundancy that §4(d)
says already harms experts. Do not build it. **The salvageable part:** de Bono's real insight is that the
critical view must be *structurally scheduled* rather than left to whoever remembers. Band 3c is that,
permanently — the black hat as furniture instead of an exercise.

**Orbit-shift and gravity — useful on us, not in the product.** These are strategy lenses, and they earn
their place at exactly one moment: the question *"what gravity holds us to graph-first?"* The honest
answer is that the graph is the most technically impressive thing we built and it flatters the
substrate — which is why it ended up as the only non-collapsible pane. Naming that is the whole value.
Putting orbit-shift language in the interface would be nonsense.

**Sensemaking / information-gap theory — load-bearing.** §4(c), §5(a) and §6 are built on them. These are
not decoration; they are the reason the design has the shape it does.

**Jobs-to-be-done / user story — necessary, and currently under-evidenced.** The per-band "answers:"
lines in §7 are exactly this, and they are the discipline that stops a band existing because it looks
good. But see §9: our model of the analyst's job is still thinner than it should be.

## 9. What I could not establish, and what it would change

Named precisely so this document is not read as more settled than it is.

1. **The primary-source ethnography of an Indian analyst's week is not done.** The agent died first. This
   is the largest gap. What it would change: the Band order in §7, and whether the ten-minute brief is
   even the right *unit* — an analyst covering 25 names in a results season may need a "what changed
   since I last looked" delta far more than a "who is this company" orientation. **Those are different
   products, and I assumed the initiation case without evidence that it is the dominant one.**
   > **Partly resolved 2026-07-27:** Chinmay's call is **both, one surface, state-dependent** (§7.0), so
   > the design no longer *depends* on knowing which job dominates. The research is still worth doing —
   > it now determines which mode should be the **default for a first-ever visit** and how a watermark
   > should decay (is a two-week-old visit still a "return"?), rather than which product to build.
   > Downgraded from the weakest joint to an open calibration question.
2. **The competitive teardown is thin.** Screener.in, Obsidian and AlphaSense at useful depth; Bloomberg
   DES, Tegus, Daloopa, Hebbia, Fiscal.ai, Tijori, Trendlyne at surface level. What it would change:
   whether "what the street pressed on" is genuinely white space or already shipped somewhere.
3. **No user has seen any of this.** Every entry V1–V5 in [`VALIDATION-BACKLOG.md`](VALIDATION-BACKLOG.md)
   is still open. §7's band order is a reasoned hypothesis, not a validated one, and it is cheap to test
   with a paper prototype before any code.
4. **Whether the analyst-question mining is as clean as §2.8 implies.** I verified speakers and turn
   counts exist. I did not verify that the `Moderator` turn reliably marks the Q&A boundary across all
   twelve transcripts, nor that analyst names and firms resolve cleanly. **Check this before committing
   to Band 3a** — it is the load-bearing assumption behind my highest-priority recommendation.
5. **Sector generalisation is untested beyond two companies.** Two is enough to catch IT-vs-bank
   overfitting and not enough to claim universality. An NBFC or a manufacturer would test Band 1's
   universal skeleton properly.

## 10. The conclusion the data forces, and it revises the current plan

[`SESSION.md`](SESSION.md) frames Phase 2 as the merged analyst-experience phase, starting from the
*display*-side findings the holistic review routed forward. The belief/display split was the right
instrument — a wrong belief is Phase 1, a wrong picture is Phase 2 — and Phase 1 closed honestly against it.

**The measurements in Part I say the split has been applied one notch too literally.** Three of the four
bands in §7 are blocked or degraded by belief-layer state, not by display work:

| Prerequisite | Measured state | Blocks |
|---|---|---|
| `fin_facts` / `line_items` populated | **0 rows** (§1.1) | Band 2 entirely |
| `attribute_fine` populated | **4.1 %** (§2.3) | any trustworthy topic-level view; §2.6 |
| Claim subject below the parent entity | **242/243 on the parent** (§2.2) | joining shape to movement |
| Polarity correct on lower-is-better metrics | **sign-flips found** (§2.6a) | any directional display |
| Passport on results filings | **11/37 unverified** (§1.2) | trust weighting throughout |

These are not pictures that are wrong. They are beliefs that are missing, coarse, mis-subjected or
mis-signed — and no amount of display craft compensates. A beautiful brief over this layer would be a
confident surface built on a foundation that cannot feed it, which is the failure mode the belief/display
line was drawn to prevent, arriving from the other direction.

> **DECIDED 2026-07-27 (Chinmay): Phase 2 is widened to include the five prerequisites above.** They are
> in-scope Phase-2 work rather than a separate Phase 1.5, on the reasoning that the display cannot be
> built honestly without them and splitting them into their own phase would only relabel the dependency.
> **What this obliges us to do:** each prerequisite is belief-layer work and therefore needs a
> belief-layer gate, not a screenshot — a prerequisite is "done" when a suite can fail on it, per the
> project's own rule that *a gate that can never fire is as dishonest as one that fires wrongly*.
> Concretely: `fin_facts` promotion needs golden-page number gates (including the contaminated AR pages
> of §1.1); inverse-metric polarity needs must-fire positives on lower-is-better metrics; the passport
> fix needs the 11 currently-unverified documents as its positive set. Widening the scope does **not**
> widen the belief/display line — it moves five items across it deliberately, with evidence, which is
> different from blurring it.

So the recommended shape of Phase 2 is **not display-first**. It is:

1. **Ship Band 3c now.** The silence map is pure aggregation over data we already hold, it needs no model,
   and it is the single most trust-building thing we could put on screen. It also delivers a real hook on
   day one, which de-risks everything after it.
2. **Verify §2.8's assumptions, then build Band 3a.** Best value-to-cost in this document: an independent,
   interrogative, deterministic hook from a substrate that is already parsed.
3. **Promote numbers into `fin_facts`, contamination-tolerantly.** Unblocks Band 2. Note this is squarely
   a *belief*-layer job that a *display* phase depends on — which is the point of this section.
4. **Then Band 3b (the AR diff),** whose empirical warrant is the strongest here and which needs only
   section-aligned elements.
5. **Band 1 throughout** — it is nearly free and it is the frame the rest needs.
6. **Fix the fine-attribute population, the claim subject, and inverse-metric polarity before any
   topic-level display ships.** §2.6 is the proof that a topic view built today would render noise with
   the authority of design.

And one structural change independent of all bands: **the centre pane must become switchable.** As long as
`GraphPanel` is the only non-collapsible centre view, the Library *is* the graph, and no amount of
additional surface changes what an analyst meets first.

**The one-sentence version.** We built an excellent foraging engine and then pointed it at the wrong loop:
the analyst's cost is schematisation, and our answer to schematisation is currently a 190-node force graph
that identifies no gap — so the first screen should be a short, ordered, deterministic brief whose entire
purpose is to leave the analyst holding *their own* specific question, with the graph waiting on the other
side of it.

---

### Sources

**Peer-reviewed / primary**
- Pirolli & Card, *The Sensemaking Process and Leverage Points for Analyst Technology*, 2005 — [PDF](https://www3.cs.stonybrook.edu/~mueller/teaching/cse591_visAnalytics/sensemaking.pdf)
- van Ham & Perer, *"Search, Show Context, Expand on Demand"*, IEEE TVCG 15(6), 2009 — [PDF](https://perer.org/papers/adamPerer-DOIGraphs-InfoVis2009.pdf) · [IEEE](https://dl.acm.org/doi/10.1109/TVCG.2009.108)
- Cohen, Malloy & Nguyen, *Lazy Prices*, Journal of Finance, 2020 — [NBER w25084](https://www.nber.org/system/files/working_papers/w25084/w25084.pdf) · [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1658471) · [Wiley](https://onlinelibrary.wiley.com/doi/abs/10.1111/jofi.12885)
- Segel & Heer, *Narrative Visualization: Telling Stories with Data*, InfoVis 2010 — [Stanford PDF](http://vis.stanford.edu/files/2010-Narrative-InfoVis.pdf)
- Golman & Loewenstein, *Information Gap Theory*, CMU — [PDF](https://www.cmu.edu/dietrich/sds/docs/golman/Information-Gap%20Theory%202016.pdf) · [curiosity paper](https://www.cmu.edu/dietrich/sds/docs/golman/golman_loewenstein_curiosity.pdf)
- Kalyuga et al., expertise reversal effect — [Instructional Science special issue](https://link.springer.com/article/10.1007/s11251-009-9102-0) · [Cambridge Handbook ch. 40](https://www.cambridge.org/core/books/cambridge-handbook-of-expertise-and-expert-performance/cognitive-load-and-expertise-reversal/03F656FD334F23214426ACB4118FEBF9)

**Practitioner / product — useful, not peer-reviewed**
- [Code Culture — "Obsidian's Graph View Is Beautiful and Almost Completely Useless"](https://codeculture.store/blogs/developer-culture/obsidian-graph-view-useful) · [KnodeGraph on the hairball ceiling](https://knodegraph.com/blog/obsidian-graph-view-alternative/) · [Eleanor Konik's defence](https://www.eleanorkonik.com/p/its-not-just-a-pretty-gimmick-in-defense-of-obsidians-graph-view) (the counter-case)
- [HeyGoTrade — reading a transcript like a buy-side analyst](https://www.heygotrade.com/en/blog/how-to-read-earnings-call-transcript-buy-side/) · [5 signals pros catch](https://www.heygotrade.com/en/blog/reading-earnings-call-transcripts-5-signals-pros-catch/)
- [Screener.in features](https://www.screener.in/features/) · [independent review](https://www.strike.money/reviews/screener-in)
- [Capital IQ navigation guide, Babson, PDF](https://www.babson.edu/media/babson/assets/cutler-center/CapIQ_Basic-Functionality-and-Navigation_Stegeman_FINAL.pdf)
- [Sell Side Handbook — equity research](http://sellsidehandbook.com/careers/equity-research/) · [M&I — ER careers and initiation](https://mergersandinquisitions.com/equity-research-careers/) · [AnalystPrep — elements of a research report](https://analystprep.com/cfa-level-1-exam/equity/elements-of-company-research-report/)
- [IntuitionLabs — AlphaSense platform review](https://intuitionlabs.ai/articles/alphasense-platform-review) · [G2 reviews](https://www.g2.com/products/alphasense/reviews)

**Internal**
- Live query against `n4a-postgres` (host 5433), both foundation workspaces, 2026-07-27
- `data/derived/foundation/` (reference outside this repository: `../data/derived/foundation/`) — the foundation audit + per-company reports + the reproducible 98 MB DB dump
- `PHASE-2-ANALYST-ORIENTATION-RESEARCH-2026-07-27.md` (reference outside this repository: `PHASE-2-ANALYST-ORIENTATION-RESEARCH-2026-07-27.md`) — the parallel audit run the same day, reaching the same core conclusions independently. **Read it alongside this document, not instead of it**: it is deeper on the data audit (the read-time projection explosion, the raw-mention→active-claim funnel, the "March 31 → 2026-03-03" day-truncation diagnosis, canonical-vs-provisional registry split) and carries material this document does not — hook families, eligibility gates before ranking, ranking without an opaque importance score, the explicit epistemic grammar, and automation bias / productive friction. This document is the stronger of the two on external evidence (§4–§5) and on the Phase-2 scope argument (§10).
- `PHASE-1-HOLISTIC-REVIEW-2026-07-24.md` (reference outside this repository: `PHASE-1-HOLISTIC-REVIEW-2026-07-24.md`) §6, §8, §11
- `apps/web/app/library/library-workspace.tsx` (reference outside this repository: `../apps/web/app/library/library-workspace.tsx`)
- ADRs 0011 (claim key, directional polarity), 0027, 0037, 0042–0054, 0053 (supersession / variance-to-expectation)
