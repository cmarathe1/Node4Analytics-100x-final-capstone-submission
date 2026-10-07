# N4A — System Architecture

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](../README.md) for current scope.

> **status:** reference · **authoritative for:** topology · the display-graph + claim contracts ·
> the layer model (L0–L3) · the invariants · **last verified against code:** 2026-10-03 (rung 17c:
> canvas files — `/canvas-files`, the `documents` view over `all_documents`).
>
> How the real product is built. Pairs with `DESIGN-SYSTEM.md` (frontend intent) and
> [`PLAN.md`](../PLAN.md) (sequencing). [`RESEARCH.md`](RESEARCH.md) justifies each technology
> choice. This file is the **contract** the parallel build tracks code against — change it
> deliberately and via an ADR.
>
> **Scope rule (2026-07-27).** This file owns *contracts and invariants* — the things that change
> slowly and that two services must agree on. It does **not** restate mechanism: the per-module
> "how" lives in the module docstrings (they cannot drift from the code they sit on), the physical
> schema lives in [`DATABASE-SCHEMA.html`](DATABASE-SCHEMA.html), and the runtime flows are drawn in
> [`MERMAID-DIAGRAMS.md`](MERMAID-DIAGRAMS.md). That split is deliberate: the previous edition
> carried mechanism detail for a pipeline three slices out of date.

## 1. Topology

```
┌─────────────────────────────────────────────────────────────────────┐
│  apps/web — Next.js 15 (App Router, React 19, TS, Tailwind v4)        │
│  • All 5 surfaces (Library, Dashboard, Canvas, Notes, Connectors)    │
│  • BFF: route handlers / server actions  • Auth.js session           │
│  • Zustand (client state) + TanStack Query (server state)            │
│  • React Flow (Canvas) · SVG deterministic layout (Graph) · Recharts │
│  • Vercel AI SDK renders streamed AI answers                         │
└───────────────┬─────────────────────────────────────────────────────┘
                │  HTTPS / SSE   (typed client from OpenAPI)
┌───────────────▼─────────────────────────────────────────────────────┐
│  services/ai — Python FastAPI (Pydantic v2)                          │
│  • Ingestion (7 stages): parse → chunk → identify → embed →          │
│    extract → resolve → harvest      (app/ingestion/stages.py)        │
│  • Run substrate: immutable mentions + rebuildable, atomically       │
│    swapped derivations (extraction_runs / resolution_runs)           │
│  • Retrieval: hybrid vector + lexical, routed by query shape         │
│  • LLM provider-router (Anthropic / OpenAI / Google) + streaming     │
│  • Connectors: yfinance, local filings, news RSS                     │
│  • Findings: computed comparisons over the claim key (no adjudication)│
└───────────────┬─────────────────────────────────────────────────────┘
                │  SQL
┌───────────────▼─────────────────────────────────────────────────────┐
│  Postgres 16 + pgvector — ONE store, 4 layers (L0–L3), 51 tables     │
│  • relational L0/L1/L3 (docs, elements, chunks, spines, claims,      │
│    relations, runs, fact_versions, canvas artifacts, workbooks)      │
│  • embeddings (pgvector) on chunks — L2                              │
│  • Apache AGE is INSTALLED but unused: L3 is relational today and    │
│    Cypher stays a deferred projection (ADR 0019 §6)                  │
│  (Redis only if/when ingestion needs a real queue)                   │
└─────────────────────────────────────────────────────────────────────┘
```

**Why split TS app / Python AI:** the rich frontend (canvas, force graph, bento) is unarguably React/TS;
the differentiating work (PDF parsing, embeddings, LLM graph extraction, multi-hop retrieval) lives in
Python's ecosystem. The boundary is a typed HTTP contract so the two halves build in parallel.

## 2. Monorepo layout (pnpm workspaces + Turborepo)

```
n4a-node-based-ui/
├─ apps/
│  └─ web/                  # Next.js app (frontend + BFF)
├─ services/
│  └─ ai/                   # FastAPI Python service (uv-managed)
├─ packages/
│  ├─ ui/                   # design-system: tokens + primitives (ports of the prototype)
│  ├─ contracts/            # source-of-truth schemas: graph schema, API DTOs (zod + JSON schema)
│  └─ config/               # shared eslint / tsconfig / tailwind presets
├─ infra/
│  └─ docker-compose.yml    # Postgres+pgvector(+AGE image), local dev
├─ data/
│  └─ seed/                 # real source documents (git-ignored); README + .gitkeep tracked
├─ docs/                    # TIERED — see docs/README.md
│  ├─ *.md                  #   live status: SESSION, PROGRESS, ROADMAP, PLAN, GOTCHAS, …
│  ├─ reference/            #   look-up, slow-changing: ARCHITECTURE, MERMAID, DATABASE-SCHEMA, RESEARCH
│  ├─ specs/                #   forward specs for work not yet built
│  ├─ decisions/            #   ADRs — the why
│  └─ archive/              #   closed programs, preserved verbatim
├─ DESIGN-SYSTEM.md         # frontend source-of-truth (intent) — reference tier, kept at root
├─ AGENTS.md / CLAUDE.md    # AI-tool ground rules
└─ .claude/                 # skills + agents (mirrored to .agents/ + .codex/)
```

## 3. The knowledge-graph schema (THE core contract)

Derived from `DESIGN-SYSTEM.md §10` / `graphData()`. This is what the ingestion pipeline must emit and
what every surface reads. Defined canonically in `packages/contracts` (zod) + mirrored as Pydantic in
`services/ai`. **Changing this is an ADR-level decision.**

> **Two altitudes (ADR 0011).** The node/edge tables below are the **display projection** — the
> human-readable graph the UI renders. Beneath them sits the **richer L3 extraction schema** (§3.1), the
> structured-claim model the pipeline actually produces and the signals engine computes over. The display
> graph is a *filtered projection* of that richer model, never a separate graph (ADR 0009). The tables
> below stay the stable frontend contract; **§3.1 is where extraction quality — and the contested signal —
> actually lives.** This split is the fix for the original schema feeling "generic": it had been
> reverse-engineered from the visualization rather than from the information structure of a financial source.

**GraphNode** (`packages/contracts/src/graph.ts`)
| field | type | notes |
|---|---|---|
| `id` | string (uuid) | stable |
| `category` | `source \| theme \| position \| person \| metric \| company \| segment \| geography \| entity` | drives color (cat palette) & shape. `position` (ADR 0027) = the analyst's `(subject, fine_driver, period)` cell, polarity collapsed; it replaced `claim` (a claim is now *evidence behind* a position). `segment` / `geography` / `entity` arrive from the connection layer — a **projection** of the stored `entity_type` (ADR 0028 split `geography` out of `segment`: where a company operates and what it sells are different analyst questions) |
| `label` / `summary` | string | display + 1–2 line inspector description |
| `stance` | `supports \| contradicts \| contested \| neutral`? | positions only; set by the signals layer reading the position's Sides |
| `degree` | int | derived server count. **Not a size** since rung 15 (ADR 0136 D3): the canvas sizes a node by the edges it DRAWS, and the legend says size is not importance |
| `provenance` | `Citation[]` | **never empty for AI-derived nodes** — schema-enforced for `position` |
| `metrics` | json? | value / delta / unit (+ open catchall). Fields are `.nullish()`, never `.optional()` — Python sends explicit `null` |
| `trust` | `proposed \| confirmed`? | **axis 2 of 3** — corroboration soft-gate (ADR 0027 §5): `proposed` until a 2nd independent source / curation. Shown + ranked down, never hidden |
| `confidence` | float [0,1]? | **axis 3 of 3** — *extraction* quality only (modality, stated-vs-defaulted period, groundedness). Computed at assemble time, never a `Claim` field |
| `detail` | `NodeDetail`? | what arriving at the node hands back (ADR 0136 D5): `metric` → the brief's `MetricSeries` read under the Graph's scope (gaps `unexplained`); `position` → its `FindingStatement`s (rung 12's one kind rule), polarity sides, and a quote only for a named speaker's direct/quoted words. Refined both ways to its own category |

> **The three trust axes never collapse into one score** (ADR 0027 §5): **authority** (who asserted
> it — on the claim, *shown* not weighted) · **corroboration** (`trust`) · **extraction confidence**
> (`confidence`). A single blended number is exactly the dishonest artifact invariant #9 forbids.

**GraphEdge** — one universal relation vocabulary (D61)
| field | type | notes |
|---|---|---|
| `id`, `source`, `target` | string | |
| `type` | analytical: `supports \| contradicts \| about \| mentions \| cites` · derived hierarchy: `has_theme \| discusses \| parent_of` · **connection layer**: `competes \| supplies \| partners \| serves \| operates_in \| has_segment \| offers \| regulated_by` · **filed figure**: `reports` (company → metric, rung 15) | ONE vocabulary for seeded and harvested edges alike — a seeded and a harvested subsidiary assertion converge on one `parent_of` edge (D64). Drawn in four FAMILIES (structural · source link · supports · contradicts) on evidence tokens (ADR 0136 D4) |
| `weight` | float [0,1] | **display strength only** (spring length). Derived from `atoms.bestEvidenceLabel`; since D63 it is never a model's self-reported confidence |
| `provenance` | `Citation[]` | schema-enforced non-empty for **every** edge (ADR 0136 D2): a derived edge carries one passage per document from what it derives from; a curated seed, with no document, is not drawn |
| `atoms` | `EdgeAtoms`? | **what the edge is made of (D63)** — `mentionsByLineage` (per *voice*, not per document), `documents`, `bestEvidenceLabel`, `topSourceAuthority`. Nullish on curated seeds |

> **Anything that communicates trust to the analyst reads `atoms`, never `weight`.** "2 voices ·
> 3 documents · reported · audited filing" is a sentence an analyst can act on; "0.87" is not. A
> scalar silently merged four different questions and read as calibrated while carrying an LLM's
> opinion of its own extraction.

**GraphResponse.seed** (rung 15, ADR 0136 D6) — where a contextual handoff landed: `{ref: ObjectRef, status: resolved|unresolved, reason: excluded_by_scope|not_in_record|no_graph_object, nodeIds, outOfScope}`, resolved by the door at render time under the Graph's scope. A node id never travels in a link.

**EvidenceLabel** (computed, never model-self-assigned — D62): `reported` (a mandated disclosure
table) > `explicit` (prose that states the relationship) > `co-mentioned` (a grounded name-drop with
no stated relation — withheld from the map as a **review lead**, not rendered as fact).

**Citation** (the provenance atom — on every AI output, note, signal, edge)
`{ docId, docTitle, sourceType, locator, chunkId?, snippet?, anchor? }`. Since 1D the `locator`
carries the **section path** and a cross-page chunk carries a page *range* — but a locator is a
**LABEL, not an address**, and nothing may parse one back into coordinates. Since rung 10b
(ADR 0109) `anchor: ObjectRef | null` is the address the product can OPEN: a narrative citation
anchors to its page, a Lane-2 fact to the **cell** it was read from. Nullable, because not every
producer can anchor — an analyst's own note is in no document — and every such absence is a
DECLARED row in `app/provenance/anchors.py` with a reason and a named unblocker.

**Other core entities:** `Document` (per-layer honest stage states — see §4), `Chunk` (a **view over
parse elements** + embedding + locator), `Note`, `Conviction` (`high|building|watching|pass`,
shared/global), `Board`, `Connector`.

### 3.1 The extraction schema (L3) — the structured claim  *(ADR 0011)*

The unit that powers the signals is a **structured Claim**, not a free-text node. Every claim carries a
**shared key** so agreement/disagreement is *computed*, not LLM-guessed. This is the schema the ingestion
pipeline emits at L3; the §3 node/edge tables are its display projection.

**Claim (L3)**
| field | type | notes |
|---|---|---|
| `id` | uuid | |
| `subject` | entityId | resolved against the **entity spine** (Infosys = INFY = INFY.NS) |
| `attribute` | `{ coarse: attributeId, fine?: metricId }` | resolved against the **attribute spine**; *fine* drives **contestation** (finest shared granularity), *coarse* drives **navigation/rollup** (refined by ADR 0024; the fine level becomes a **typed concept with a definition signature**, and contestation keys on the **comparability frame** — ADR 0049 — see below) |
| `period` | `{ kind: fiscal_year\|quarter\|date\|range, value, is_estimate }` | **referent period** — what reality the claim describes; Indian FY (Apr–Mar) |
| `asserted_at` | timestamp (IST) | **assertion time** — when it was said (source publication; ingestion as fallback) |
| `polarity` | directional, per attribute (e.g. `improving\|deteriorating\|stable`) | never `good\|bad` — neutral framing (anti-bias) |
| `modality` | `reported\|guidance\|opinion\|estimate` | guidance ⇒ referent period is in the future vs. `asserted_at` |
| `quant?` | **tagged**: `{ kind: "point", value, unit }` XOR `{ kind: "bounded_range", low, high, unit }` | optional; filled when a figure was stated; **always** for Lane-2 facts. A discriminated union, not three nullable numbers — "a point that also has a high" is unrepresentable, so the comparator never guesses which endpoint is authoritative (ADR 0068) |
| `direction?` | `up\|down\|flat` | **observed movement**, lifted out of `quant` so a claim can assert movement with no figure or carry a figure with no movement. The **only** input to contestation (ADR 0068) |
| `assessment?` | `favorable\|unfavorable\|mixed\|neutral` | the speaker’s **stance** — shown, never compared. Separate from `direction` because deriving contestation from good/bad language would *manufacture* conflict, which invariant 9 forbids |
| `source` | `ClaimSource` | `docId` + `authority_tier` (**shown**, never a hidden weight) + the 1B passport roles |
| `body` | string | the human-readable assertion |
| `provenance` | `Citation[]` | resolves down to a page range in L0 (never empty — schema-enforced `.min(1)`) |
| `supersedes?` | claimId | same-lineage, frame-compatible prior proposition this **semantically revises/restates**; chronology alone is insufficient |
| **— the 1F-2/1F-3 proposition envelope (ADR 0053) —** | | every field below is `.nullish()`: **null means NOT YET EXTRACTED, never a plausible default** (the anti-coercion contract, D51) |
| `attribution` | `{ voice, speaker?, speakerRole?, originatorEntityId?, status, originLineageId?, publisherLineageId? }` | **who said it, through whom.** `voice` ∈ `management \| company \| analyst \| journalist \| unknown`; `status` ∈ `direct \| quoted \| paraphrased \| unknown`. A quoted CFO resolves to the *company's* lineage atom, so a journalist reproducing a quote is not counted as an independent voice |
| `objectKind` | `ResearchObjectKind`? | the typed research object asserted (D39) |
| `causalOrigin` | enum? | why a causal link exists — required for mechanism hypotheses |
| `frame` | `MeasurementFrame` | **the structured measurement frame (ADR 0085)** — six dimensions, each paired with the **tier** that supplied it: `consolidation` · `adjustment` (+ `adjustmentItem`) · `accountingStandard` · `denominationCurrency` · `currencyBasis` · `averaging`. It is **INHERITED, never extracted**: `inline` → `table` → `section` → `document` → floor. **0 of 559** basis-empty claims carried a basis word in the claim body, so a frame the extractor filled would have been a frame no producer fills. A tier that names two values stops the cascade at `unspecified` rather than falling through |
| — the tier asymmetry | | only `inline`/`table`/`section` count as **STATED**. A `document` value may **BLOCK** a comparison but may never **CLEAR** one: a brake may fire on weak evidence, a verdict may not (ADR 0086) |
| `basis` / `comparator` / `scenario` / `qualifiers` | string? | the comparability facets. `basis` is the **pre-6a-i** pipe-joined string, now read through the frame's lens by `frame_from_legacy_basis()` — it is *broader* than the frame (it also carried definition and scope discriminations like `earning_assets` vs `total_assets`), so it still blocks until **rung 6d re-homes those values**. `comparator` ∈ `level \| yoy \| qoq \| vs_guidance \| vs_estimate` · `scenario` is the condition a guidance rests on · `qualifiers` are material scope caveats. A mismatch **blocks** comparability rather than false-contesting |
| `sectionClass` | string? | the 1D section the evidence was read from — an *inherited* section-level fact, like the frame |

**Two authority dimensions, never one (finding F4).** `AuthorityTier` says what the **artifact** is
(how formally it was published — the 1B passport). `EvidenceClass` says what kind of **statement**
this exact cited proposition is, derived deterministically from the 1D section class, the 1F voice,
object kind, modality and attribution status — never model-guessed, with `unclassified` as the honest
floor. Without the second dimension an audited annual report stamps `audited_filing` on a management
*guidance* sentence: the analyst is shown unaudited prose wearing an auditor's seal. This is the
**inherited-trust** family — a trust label earned by a coarse object being inherited by a finer one
that never earned it.

**`PeriodSource`** distinguishes `stated` (the source named the period) from `inferred` (normalized
from a trusted 1D envelope) from `defaulted` (the document's fiscal year). It cannot be recovered
after the fact, so it is captured at resolve time — a defaulted period is a weaker basis for an
overlapping-period contest than a stated one.

**The shared key (refined, ADR 0024).** A claim is keyed on `(subject, attribute, period)`. Two claims
**contest** iff they share the **finest attribute granularity they have in common** (same `fine` → contest on
fine; otherwise no contest, or at most a flagged coarse-level "related tension") with **overlapping referent
period** and **opposing polarity**, from **independent sources** (same lineage ⇒ *supersession*, not
contestation). **Contestation fires at `fine`, not `coarse`** — the coarse lens is deliberately abstract (a
universal analytical dimension; see below), so "operating vs gross vs net margin" all roll up to
`profitability` and must *not* false-contest. **Coarse is the navigation/rollup layer; fine is the
contestation key** (this refines ADR 0011 §7's "coarse drives contestation"; refined **again** below to the comparability *frame* — ADR 0049/0050). A Lane-2 KPI fact and a
Lane-3/4 narrative claim still meet on this key — enabling **fact-vs-claim contestation** (management
guidance vs. the reported number).

**Refined again — the comparability frame (ADR 0049, 2026-07-19).** Fine-*label* matching is
necessary but **not sufficient**: two propositions are comparable only when their **frames** match
closely enough —
`subject scope · concept · referent interval · definition/basis · comparator · modality/scenario ·
qualifiers`. Without the frame these all false-contest: NIM on total assets vs. interest-earning
assets · voluntary vs. total attrition · standalone vs. consolidated · "improved YoY" vs. "declined
QoQ" · actual vs. guidance vs. broker estimate · TCV vs. large-deal TCV · an announced partnership vs.
realized revenue · a forecast disagreement vs. a contradiction about historical fact. The relation
between two frames is therefore **typed**, not boolean: `equivalent` · `supporting` ·
`revision`/`supersession` · `opposing` · `variance_to_expectation` · `narrower`/`broader` ·
`related_not_comparable`. **Comparability is graded and silence is a failure mode** — sparsely
populated frames under strict matching drive contestation to zero, and a signals layer that never
fires looks calm while being broken; a missing frame dimension yields *"possibly comparable — flagged"*, never
a silent `not_comparable`. **Absence is tested as ASYMMETRY** (ADR 0086): one side states a
dimension and the other is silent ⇒ we cannot confirm they match, but *symmetric* silence blocks
nothing — two sources that framed nothing are not thereby disagreeing, and blocking there would
make `contested` unreachable in principle rather than merely rare. A **defaulted period is not a
comparison key** either (`period_source` is `defaulted` on **63.9%** of claims), so a period we
assumed is not a period that overlaps. **Three ideas stay separate** (collapsing them is how bias enters):
observed **direction** (up/down/flat) · economic **effect** (beneficial/adverse *under stated
conditions*) · investment **stance** (bullish/bearish vs. expectations and valuation) — "higher is
better" is unsafe for many measures, extending invariant #9's anti-bias rule from polarity to the
whole frame. The fine level also becomes **typed** (`measure` · `mechanism` · `business_object` ·
`event_state` · `analytical_frame`), with business objects living in the **entity** spine — a flat
attribute vocabulary that mixes a product (Topaz), a mechanism (pricing pressure) and a measure (NIM)
cannot support safe comparison at all. Built in Phase-1 **1E** (registry + governance) and **1F**
(frame population on live extraction).

**Decision-grade extraction (ADR 0053, 2026-07-21).** 1F consumes context-preserving evidence bundles
assembled from 1D elements/edges rather than isolated sentences. Coverage combines mandatory structural,
active-concept-targeted and ontology-independent open lanes with a visible denominator. One discriminated
proposition envelope has kind-specific adapters for filings/results, presentations, transcripts, broker
research and news. Filing/publisher/covered-entity document roles stay separate from author/speaker and
originating statement voice, so a quotation is not mistaken for an independent assertion. Temporal
comparison is semantic: guidance revision/restatement may supersede, actual-vs-guidance is
`variance_to_expectation`, and adjacent periods are a time series. Analyst corrections append a reviewed
version over immutable raw evidence and trigger narrow re-resolution.

**Two resolution spines, one mechanism.** L1 holds an **entity spine** (canonical companies / people /
segments / clients, each **sector-tagged**, seeded from a market master / the documents — ADR 0024 §4)
*and* an **attribute spine** (canonical KPIs / topics, two-level). Resolution maps messy mentions onto both
— attribute normalization is the *same mechanism* as entity resolution, applied to the predicate, and
without it contested/corroborated silently fail. **The attribute spine is sector-general (ADR 0024 §2):** the
**coarse** lens is the **equity analyst's universal analytical frame** — a small, stable, sector-agnostic set
(growth · profitability · cash generation · balance-sheet strength · capital allocation · demand/outlook ·
competitive position · management & governance · operating efficiency · risk · valuation) that holds for a
bank, a pharma co, or an IT co alike; the **fine** drivers beneath it (NIM/GNPA for a bank, attrition/TCV for
IT, USFDA/pipeline for pharma) are **derived bottom-up from the corpus** and selected by the subject's sector
tag. **Contents are derived from the corpus, not fixed in the schema**; the *shape and governance* are the
contract. **The fine level is a governed, typed registry (ADRs 0049–0052), not a flat list:** a stable
concept identity has a **family**; append-only definition versions carry formula/denominator, unit
family, stock-vs-flow, period grain, regime and effective dates; a sourced proposition separately
carries the basis and actual/guidance/estimate modality it used. The definition signature is an
audit/cache fingerprint—not the comparison key; comparison inspects normalized facets. Lifecycle is
`provisional` (durable and reviewable, but **never resolves claims**) vs. `canonical` (drives
cross-document resolution). Only deterministic operations auto-promote; model-inferred concepts and
merges need review. Evidence atoms persist per lineage/role rather than emitting a premature scalar
independence count. Business-model packs are many-to-one **entity-scoped applicability rows** (a
universal bank, an SFB, an NBFC and an insurer cannot share one "financials" pack); a document run
only snapshots the packs it consumed. `attributes_fine`/`entities` are filtered live projections;
retired rows remain as historical FK anchors while governed loaders exclude them.

**Entity types (L3, coarse):** company · person · segment · geography · client · product/service · deal ·
theme/topic · risk. These project up to the display `category` set
(`source|theme|position|person|metric|company`; `position` replaced `claim` — ADR 0027).

## 4. Ingestion pipeline — a router into extraction lanes (ADR 0011)

Financial inputs are **not uniform**: a balance-sheet table, a 300-page annual report, a concall Q&A, and a
one-line BSE announcement are different *information shapes*. So ingestion is **not one assembly line** — it
is a **router** that classifies each input by shape and sends it down the matching **extraction lane**. All
lanes converge on the shared schema (§3 / §3.1) + the provenance spine (§10). Classify by **information
shape** and **authority/modality**, never by source label.

**The four lanes:**
1. **Structured-record** — yfinance prices/fundamentals; NSE/BSE listing / ISIN / index masters;
   shareholding. → land as **L1 rows**; **never embed, never LLM-extract**; read via a structured-query
   tool. The masters **seed the entity spine**.
2. **Financial-statement / KPI** — normalized **periodized KPIs** → L1. **Split by where the canonical
   structured source lives (ADR 0017):** **Lane 2a — statutory financials** (revenue, margins, segment
   revenue, balance sheet, cash flow) come from a **structured feed** (quarterly results / **XBRL** /
   yfinance) — a Track-D *connector* job, **not** document parsing; cite the filing row. **Lane 2b —
   operational KPIs** (attrition, utilization, headcount, deal TCV, onsite/offshore mix), which are *not* in
   statutory XBRL, come from the **canonical small artifact** — the company's **quarterly fact sheet**
   (2–3 pp, fixed layout) — via VLM/document-AI + **arithmetic/range validation** + provenance,
   template-per-filer. **Don't OCR KPIs out of the 300-page annual report** — that is the worst source for
   exact numbers (industry practice: consume structured filings, hard-extract only the residual, with
   human-in-the-loop). **Lane 2a has a live yfinance bootstrap** (ADR 0033, `app/dashboard/statements.py`
   → `fact_versions` at `vendor_data` tier — the XBRL/premium filing-grade upgrade stays deferred).
   **Lane 2b LANDED at rung 6b (ADR 0088)** — `app/facts/` reads the results/KPI lane
   **deterministically** (a cell's meaning is its coordinates; no model in the numeric path) and
   writes `fact_mentions` → `fact_versions` → `active_facts` with a **cell** anchor on every figure.
   The warning above still holds and is now a rule the router enforces: an annual report is read for
   its **named statements only**, never exhaustively — HDFC's AR offers 717 table elements and 31 are
   admitted. A cell whose column states no period, whose unit the line item does not have, or whose
   label the vocabulary does not name is REFUSED with a reason, never guessed.
   **Every fact carries the PRINTED precision it was read at** (`fact_versions.value_step`, on the
   wire as `StatementReading.valueStep`, both contract sides). Two readings of one measurement agree
   only at the coarser precision each source stated, so `33.6%` and `34%` are one reading while
   `33%` and `34%` are a real disagreement — and the precision is **read off `value_text`, never
   re-derived from the float**, which is how a version of this rule once declared 100 and 200 equal
   (ADR 0091). It also governs presentation: a filing that printed `34%` renders `34%`, because
   inventing a decimal overstates certainty AND hides why two readings collapse (0092). Agreement is
   a TOLERANCE, not an equivalence — it does not chain — so a group collapses only when **every**
   pair agrees, never when each member merely matches some retained peer (0093).
   **Identity is two-level**: `fact_versions.id` is minted per (run × mention), while `fact_key` is
   the fact and survives a re-run; a change receipt and any stable ordering must key on the latter.
3. **Narrative-claim** — MD&A, risk factors, strategy, news, notes. → structured **claim** extraction → L3.
4. **Dialogue-claim** — concall transcripts, user↔AI conversations. → **speaker-aware** segmentation
   (prepared remarks vs. Q&A) → claims with **speaker provenance** → L3.
   Since Phase-2 step 2 (ADR 0058) a transcript also carries a resolved **speaker object**
   (`app/ingestion/speakers.py` → `transcript_speakers` / `transcript_events`): who each literal
   label IS (host by phrase family · management by elimination · questioner + the firm the document
   **stated**), and which announced event the turn sits in, so a file running a media round *and* an
   analyst call stops pooling journalists with sell-side analysts. Fully deterministic — no model
   call — and it is **not a second voice ontology**: `voiceForSpeaker`
   (`packages/contracts/src/transcript.ts`) is the one projection onto `StatementVoice` (invariant 8).
   The stated questioner firm is the only place independence is *stated* rather than inferred, and
   origins are counted per **firm**, never per speaker (invariant 9).

The **annual report's primary job is Lane 3** — its prose (MD&A, risk, strategy) → structured claims, the
*contested*-signal fuel (ADR 0017). Its KPI tables are **not** the demo's source of truth for exact numbers;
those come from Lane 2a/2b (structured feed + fact sheet). This is the non-generic answer to "extract all
the relevant information": **match the extractor to the information shape and the number to its canonical
source**, rather than chunking everything or wringing tables from the report that is worst at them.

**The seven stages each text-bearing lane runs** — the canonical list is
`app/ingestion/stages.py::ALL_STAGES`, and `documents.stages` (JSONB) mirrors it so the Library
renders a per-stage strip:

```
parse → chunk → identify → embed → extract → resolve → harvest
└──── base: no text ⇒ document `error` ────┘   └─ degrade to `ready_partial`, never a fake `ready` ─┘
```

1. **parse** — PDF → **typed elements** (heading · paragraph · list_item · table · table_caption ·
   footnote · transcript_turn · toc_entry · page_artifact), each carrying literal *and* normalized
   text separately, page/bbox/reading order, parent + continuation edges (ADR 0046). The page stays
   the **provenance anchor** but is no longer the parse *unit*. An image-only document flags
   `ocr_required` and lands `blocked_ocr` — never a clean zero-text success. In the service, parse +
   chunk run in a **spawned process of their own per job** (`ingestion/isolated.py`, ADR 0135): a
   GIL-bound parse cannot starve the service's other threads, a native crash fails only its own
   document, and a reading never depends on what else the process parsed before.
2. **chunk** — **chunks are VIEWS over elements** (ADR 0047), not a character window: a size-budgeted
   group under a **per-type policy** (a table is atomic and splits between rows with the header
   repeated; a transcript turn is never split; a chunk never crosses a section boundary). Page
   furniture is dropped from chunks but kept in L1 page text. Each carries a **context envelope**
   (period hint, section path + class, basis, speakers, table metadata) stored separately from the text.
3. **identify** — content-based **filer (issuer) resolution** from the document's own front matter by
   scored corroboration, never the filename (ADR 0030 + finding G1). The issuer anchors claim subject,
   `document_roles`, lineage atoms and the connection layer's centre, so a wrong anchor makes a whole
   document's output confidently wrong. A filer the spine never met is bound here, before
   extraction, when exactly ONE NSE/BSE listing shares its identity (**door 4**, ADR 0132 —
   `company/identify.py`): minted governed with its ticker, its business model inferred once
   (`entities.sector_source = 'inferred'`, correctable). Only the residual — no or an ambiguous
   listing — waits on the analyst (`/companies`, ADR 0131), and a confirm re-derives what it
   staled (`parallel.rederive_after_passport_change`: facts → claims re-resolve → harvest).
4. **embed** — provider-agnostic embeddings → `pgvector` (L2).
5. **extract** — evidence **bundles**, not sentences (ADR 0053 / D52): a bundle restores the heading,
   the question a Q&A answer answers, the caption a table's rows belong to, the section class + basis,
   and the speaker. Which bundles reach the extractor is decided by the **coverage planner** (D55) —
   three lanes under a bounded budget with a visible denominator — which replaced a blind even stride
   over document order that could spend a 60-page call entirely on prepared remarks and never say what
   it missed. Extraction runs on a **pinned model** so "what counts as a claim" is reproducible even
   though *Ask* is multi-provider. **Precision over recall** — a claim whose body isn't grounded in its
   source passage is rejected, not stored; for contestation a fabricated claim is worse than a missed one.
6. **resolve — the two-spine stage (EDC: extract → define → canonicalize, ADR 0019).** Map mentions to
   canonical **entities** (Infosys = INFY = INFY.NS) *and* normalize predicates to canonical **attributes**
   (operating margin = EBIT margin) — the two spines canonicalized **independently**. Match is
   **embedding-first** (exact alias → cosine over labels/definitions with a threshold) with an **LLM verify
   only on the ambiguous residual** (guards over-merging; no LLM at bulk merge, so resolution is cheap,
   reproducible, and incremental). Without **attribute** normalization the contested/corroborated signals
   silently fail — claims that disagree never match. The **attribute spine is hybrid** — a small,
   user-curated **coarse** lens (the **universal analytical frame**: a sector-agnostic navigation/rollup
   layer, holding *attributes* not *dimensions*) + **fine** drivers derived bottom-up from the corpus
   (sector-specific; the **contestation key** — ADR 0024). Resolution carries a **user-correction feedback
   path** (merge/split) from day one (`VALIDATION-BACKLOG` V1).
7. **harvest — the business-model connection layer** (ADR 0054), its own durable stage because it is
   the longest LLM pass. **Two lanes:**
   * a **deterministic disclosure lane** — Ind AS 108 / AS-17 segment notes and revenue-by-geography
     tables yield segment/geography relations with **zero LLM calls**, labeled `reported`. The reported
     segment set is the company's segment *authority*: prose mentions reconcile against it (D67).
     Mandated disclosures are the richest relation source in an AR, and the pre-1G chunk sampler
     structurally excluded them (a digit-density filter drops tables).
   * a **planned LLM lane** for prose, gated twice: a **grounding** gate (the quote is verbatim in the
     passage *and* names the entity) and a **relational** gate (the quote contains a construction
     appropriate to the kind). A journalist's aside that merely names a rival passes grounding but
     asserts no rivalry — rendering it as a solid `competes` edge is exactly the fabricated
     relationship invariant #1 forbids, so it stays `co-mentioned`: a **review lead**, not a fact.

**After the seven stages, the orchestrator reads the document's filed figures** (Lane 2, ADR 0129 —
`parallel._facts_stage` over `app/facts/lifecycle.py`, the CLI's one implementation): deterministic,
keyless, after embed ∥ extract, and it never fails the document. It is **not** a strip stage yet.

**Everything expensive is immutable; everything derived is rebuildable — the run substrate (ADR 0045).**
An **extraction run** persists every parsed mention (kept *and* rejected, with reasons) as immutable
`claim_mentions` / `relation_mentions`; a **resolution run** is a rebuildable derivation over those
saved mentions × a content-addressed **spine snapshot**. A rerun writes a *staged* run, validates, then
flips `active` in one transaction under a per-(doc, layer) advisory lock — a partial unique index is the
structural backstop, and a failed rerun leaves the last good run active. Consumers read only the
`active_claims` / `active_relations` / `active_concept_mentions` views, so a staged, retired or failed
run is *structurally invisible*. **Re-resolving the whole corpus against a changed spine costs zero
extraction-provider calls.**

The **same router ingests more than filings** — news, notes, conversations, and AI-derived artifacts feed it
too, each tagged `source: filing|news|note|conversation|ai` and `trust: user-confirmed|ai-proposed`, so
user-curated facts outrank AI-extracted ones. **Time-series bypass extraction entirely** (Lane 1) — they
stay structured and out of the RAG path (see §10).

Progress is streamed to the client (SSE). For the demo, FastAPI background tasks suffice; swap to
arq/Redis if concurrency grows.

## 5. Retrieval & Ask N4A (grounded, graph-coupled)

- **The Graph's Ask is evidence-structured, not prose (rung 16, ADR 0137).** `POST /graph/ask` →
  `GraphAnswer`: a TEMPLATED standing (`filed` · `attributed_only` · `cannot_settle`) and five
  blocks — Observed (filed figures from the view's metric series; statements whose kind is
  `observed`) · Attributed · Alternatives · Missing · Discriminate — with no free-text answer
  field. The model (`graph_ask_model`) only SELECTS numbered items, groups explanations and asks;
  a statement's section is its epistemic kind, a contest is the comparator's `contested` finding,
  a why or a forecast is never settled, a figure the question names is always shown
  (`match_line_items`), and every refusal is on the answer. A decline carries nothing, and says
  whether nothing READ bears on the question or nothing has been read from the view yet.
  Retrieval is always bounded to the view's own documents — `hybrid_retrieve` takes a REQUIRED
  `doc_ids` (the chunk search has no workspace filter, which is how an unscoped `/ask` once
  answered one workspace from another's, and how a whole-workspace Canvas table still could).

- **Built as the composable kernel, vector-first, graph-additive (ADR 0017).** `/ask` is the §11 primitive
  pipeline `resolveScope → retrieve → assembleContext → callModel → enforceCitations` behind a **query
  router**. It shipped vector-first over L2; the **L3 leg is now live inside the semantic route** —
  `claims_layer` surfaces relevant structured claims beside the chunk evidence (a claim is already
  provenance-gated, so it is a first-class citeable source) and returns the node ids to focus.
- **One definition of "the included sources" (`ResearchScope`, finding F3a / ADR 0065 §3 / 0084).**
  Graph, Ask and Findings pass through **one** server-side scope resolver, hashed into the query key.
  They previously disagreed: the graph returned the whole workspace and the *browser* deleted nodes by
  citation, Ask scoped server-side, and Signals ignored scope entirely — so switching off a broker note
  removed it from the graph and from Ask while the rail still showed the contest that note had created.
  `mode` decides the EMPTY case (`selected` with no documents means exactly nothing), a populated
  `docIds` narrows under either mode, and `period` matches on the **calendar interval** a label denotes
  — `FY25` and `FY2025` are one period, and a quarter is inside its year (invariant #5).
  **The conversion happens ONCE, above every route** (ADR 0092). `None` (no scope given) and `[]`
  (every source switched off) are opposite instructions and both falsy, so any route re-deriving the
  mode from list truthiness answers a deselected-everything question from the whole workspace — which
  happened on the numeric route and then, after that fix, on the findings route. Routes now consume
  one resolved scope; there is nothing left for a new route to re-derive.
- **Route the query (4-way taxonomy):** **semantic** (prose → **hybrid** vector + lexical-keyword, fused,
  then **rerank**; *live*) · **graph/traversal** ("how connected / most central" → typed-edge traversal;
  *needs L3*) · **findings** ("what's contested / corroborated / what are the gaps" → the computed
  projection; *live* — answered **deterministically** from the ranked feed, no model in the path, so
  invariant #9 holds and ADR 0081's "a model never decides what surfaces" is untouched) ·
  **structured-KPI** (numeric "attrition / margin %" → Lane 2 structured query; *live since rung 6b* —
  `app/dashboard/kpi.py` answers deterministically from `active_facts`, and where the record states a
  measurement on more than one basis it DISCLOSES the others in the sentence rather than picking one,
  ADR 0088 §9). A route
  without its backend **declines honestly** rather than answering numeric questions from prose (the ss3
  lesson: the only "attrition" text in the AR is an actuarial footnote); the findings route now declines
  only when the projection is genuinely EMPTY. (See `RESEARCH.md §2`.)
- **Build a grounded prompt** from retrieved chunks (+ relevant subgraph once L3 exists); call the
  **provider-router**. **`enforceCitations()` is non-bypassable** — ≥1 `Citation`, and any citation whose
  `chunkId` was not in the retrieved evidence is **rejected** (the model cannot fabricate provenance; §8).
- **Return**: `{ answer, citations[], focusNodeIds[], layoutHint? }` — the app streams the answer **and**
  focuses the cited subgraph (the core "AI acts on the visible structure" promise).
- **Findings engine — computed, not guessed (ADR 0011 / 0079–0084).** Findings are deterministic
  projections over the structured claim key `(subject, attribute, period)`, **not** LLM-emitted edges.
  One feed, two kinds: a **lead** (the record is DEFICIENT) and an **observation** (it is SUFFICIENT and
  worth knowing). A family name is an ASSERTION, so each carries a predicate — `corroborated` needs ≥2
  INDEPENDENT lineages, a `trend` needs ≥3 periods AND an established direction (ADR 0082). Identity is
  DURABLE (the `findings` table): `version` moves on evidence, not on recomputation, and a finding whose
  evidence disappears is `superseded` with a receipt — but only a **whole-workspace** projection may say
  so, because a scoped read is a view, not a retraction (ADR 0084):
  - **contested** — claims sharing the key at the **finest common attribute granularity** (`fine`, not the
    abstract `coarse` rollup — ADR 0024) with **overlapping referent period** + **opposing polarity** from
    **independent sources** (same lineage ⇒ *superseded*, not contested). Counts **independent sources, not
    documents** (syndicated news deduped) — and collapses **within-source restatements** to one claim per
    `(source, key, polarity)` first, so one report repeating itself can't inflate the signal.
    **Sharing `fine` is necessary but not sufficient (ADR 0049):** the two claims' **comparability
    frames** must also match (basis, comparator, modality/scenario, qualifiers) — otherwise NIM on
    total assets "contests" NIM on interest-earning assets, and management guidance "contests" the
    reported actual. Frames that share a concept but not a basis are surfaced as *related /
    possibly-comparable*, never as a silent non-result — **an engine that never fires is as dishonest
    as one that fires wrongly.**
  - **corroborated** — same key + same polarity from independent sources.
  - **central** — high degree / betweenness.
  - **emerging** — recent `asserted_at`.
  - **revised / trajectory** — a claim with a `supersedes` chain (e.g. "guidance revised down").

  The engine **detects and presents**; it **never adjudicates** who is right — it shows both sides with
  source authority displayed and lets the analyst judge (the user's judgment is first-class). This is the
  primary defense against injected bias (`VALIDATION-BACKLOG` V2).

## 6. LLM provider-router (multi-provider)

`services/ai/llm/` exposes one interface: `complete()`, `stream()`, `embed()`, `list_models()`. Adapters
for Anthropic, OpenAI, Google; model registry mirrors the mockup's switcher (Claude Sonnet/Opus, GPT-4o,
Gemini 2.5 Pro, local). Keys are **server-side only**. Per-call model selection + automatic failover.
Optionally front with OpenRouter/Vercel AI Gateway (see `RESEARCH.md §4`).

## 7. API surface (FastAPI → OpenAPI → typed TS client)

**Live today** (the full spec is generated from FastAPI; types via `openapi-typescript`):

| Router | Endpoints |
|---|---|
| `/documents` | list (**the Library only** — a canvas file is not listed) · `GET /events` (SSE ingestion progress) · `GET /chunk/{id}` (evidence text) · `GET /{doc_id}/file` (raw L0 bytes) · `GET /{doc_id}/preview` (page 1's top band as a PNG, cached by the L0 sha256 — the canvas Source card, ADR 0152 D1) · `DELETE /{doc_id}` (source + everything derived; a canvas file 404s — its delete is its own). The reads addressed by id (chunk · file · preview · pages) serve any standing |
| `/companies` | `GET /pending?workspaceId=` — filers primary documents name with no company yet, what waits on each, listing candidates and the business-model vocabulary; also a company whose model was INFERRED (`inferredSector`) · `POST /confirm` — mints once, writes sector + ticker only on an analyst-born company, schedules the re-derive cascade (ADR 0131–0132) |
| `/healthz` | liveness, `async` and scan-free; `codeStale` is true when a file under `app/` changed after the answering worker loaded (the Library shows one restart banner, ADR 0134 D1 / 0135 D4) |
| `/graph` | `GET ""` (the analyst-decision graph under a server-side scope: `docIds`·`mode`·`period`, plus a handoff's `seed` — a JSON `ObjectRef` resolved into `GraphResponse.seed` — and `origin`; ADR 0136) · **`POST /ask`** (rung 16, ADR 0137 — see §5) · `POST /relations/{edge_id}/corrections` · `POST /entities/{entity_id}/corrections` — **G4: an analyst decision is recorded, not a permanent lead**. A relation trimmed by the scope carries only its in-scope passages, its atoms withheld |
| `/ask` | `POST ""` — streamed grounded answer or honest decline (Canvas AI nodes; passage retrieval bounded to the workspace since rung 16) |
| `/claims` | `GET /comparisons` · `POST /comparisons/{id}/corrections` · `POST /{claim_id}/corrections` (append-only reviewed versions over immutable evidence) |
| `/findings` | `GET ""` — the ranked band (leads + observations), scope-aware, durable identity |
| `/dashboard` | `/instruments` · `/company/{isin}` (+ `/prices`, `/chart/pe`, `/chart/sales-margin`, `/statements`, `/news`) · `POST`/`DELETE /company/{isin}/kb` (explicit KB opt-in) |
| `/canvas` | `/models` · canvases CRUD + `PUT /graph` · `POST …/nodes/{id}/run` and `…/assistant` (SSE) · document export/import (.docx) · artifacts · `GET …/{id}/usage` (what each AI operation cost, per node and board — ADR 0152 D2). An AI node reads its `ctx` (sources, notes) and its `in` (an earlier step's or an Ask answer's EVIDENCE, each citation carried — 0152 D3). A run whose wired source is still being read is refused, by name (0149 D8) |
| `/canvas-files` | rung 17c, ADR **0149**: `POST ""` (files dropped on ONE canvas → per file `reading` · `already_in_library` · `already_a_canvas_file` · `refused`+reason; PDF, or Word/text through a LibreOffice rendition; the left half of the reading only — parse · chunk · identify (find, never mint) · embed) · `GET ""` (each file with its origin canvas, placements, citers, the join verdict, the filed-figures hint) · `GET /{id}` · `GET /{id}/manifest` (canvases, wires, citing artifacts) · `DELETE /{id}` (its Source steps leave every canvas, each canvas's `rev` moves; artifacts stay) · `POST /{id}/add-to-library {section}` (the right half on the SAME id; **409** with the reason for another company's filing) |
| `/workbooks` | create · meta + sheets · download `.xlsx` |
| `/evidence` | `GET ""` — the evidence-state grid for one subject (rung 8, ADR 0099). One state per `(role, period)` cell, DERIVED by the recorded precedence over six receipts (0094); `withComparability` is **reported, never implied** |
| `/captures` | `GET ""` (paged, `before` → `nextCursor`) · `POST ""` — the quick-capture verb over a typed `ObjectRef`. A versioned target MUST send `observedVersion` (**422** without it) and a stale one is refused (**409**) — `If-Match`, not a client-computed hash (ADR 0101) |

| `/brief` | `GET /head?workspaceId=` — the coverage brief's company head and the record's own shape: identity · declared basis · reported span · the filer census (rung 10a, ADR 0105/0106). A **mixed-issuer workspace answers 200 carrying `ambiguous_issuer`**, never a 503 — the one place this deliberately differs from `/evidence`, which cannot draw a grid over two filers. `workspaceId` has no default · `GET /series?workspaceId=` — the brief's *what changed* module (rung 11a, ADR 0112–0115): one line per metric with its SPANS on the wire, each silence with its reason and precision, basis breaks, and every other document-stated metric listed `sparse` or `offAxis`. A mixed-issuer workspace is REFUSED here, as a 200 carrying a reason — a series is one company's figure over time · `GET /structure` (rung 11b, ADR 0120) and `GET /attention` (rung 12, ADR 0122; its judgments go through `/review/inbox` + `POST /review/decisions`) · `GET /timeline?workspaceId=` — the Timeline landmark (rung 13, ADR 0126–0128): pins, checkpoints and coverage spans, each dated by what a source PRINTED; an event carries its `action` and the source `clause` that ties it to the date, and every record not drawn is listed with its reason (`not_confirmed` · `ambiguous` · `bounded` · …) · **since rung 16 series/structure/timeline take `docIds`+`mode`** (ADR 0137 D8): the series axis stays the record's (a toggle-caused silence is `outside_view`) and each counts what the toggles set aside (`outOfView`) |
| `/evidence/passage` | `POST ""` — the **terminal resolution of every citation in the product** (rung 10b, ADR 0109–0111). Body `{workspaceId, anchor, chunkId?}`; a POST for a read, because the body carries an `ObjectRef` union that query params would flatten into the bare `{type,id}` the union exists to refuse. A ref that no longer resolves is a **200** carrying `missing`/`changed` with its reason; only an unreachable store is a 503. The facsimile is PARSED ELEMENTS, never page text, and every mark states what it RESTS ON (`highlight.basis`) |
| `/market` | `GET /context?workspaceId=` — the market row and the receipt that makes it readable (rung 9, ADR 0102–0104). Workspace → **exactly one** filing issuer → ticker → listed instrument → provider, with a named reason at every break. **A provider outage is a 200 carrying an `unavailable` receipt, never a 5xx** — a market outage is a fact about the world, not a fault in this service; a STORE failure is a 503. **This lane writes nothing and carries no `Citation`:** a price is orientation context, never evidence (charter §6·2 D1) · `GET /history?workspaceId=&start=&end=` — the Timeline's price lane (rung 13, ADR 0126 D8 / 0128 D5): a DAILY series with a series receipt, each close dated by the session that ended it |

**Not built:** `/notes`, `/conviction`, `/connectors` (Notes + Connectors surfaces are
Stage-3 remainder — see [`ROADMAP.md`](../ROADMAP.md)).

**Contract-first is the parallelization enabler:** the OpenAPI spec + `packages/contracts` are written
*before* the tracks diverge, with a mock server, so frontend and backend never block each other.

## 8. Auth & security (demo posture, SaaS-ready shape)

- **Auth.js (NextAuth v5)** — seeded demo user + optional Google OAuth; sessions via Postgres.
- Data model carries `workspaceId` everywhere from day one (multi-tenant-ready) even though the demo runs
  one workspace.
- Secrets in env / a secrets manager; **provider keys only in the Python service**. Rate-limit `/ask`
  and ingestion. Validate/scan uploaded files. Provenance integrity: citations are stored, never
  client-fabricated. Full posture in `docs/decisions/` as we harden.

## 9. Non-negotiable invariants (enforced in review)

1. **Provenance or it doesn't ship** — no AI output, note, signal, or edge without `Citation[]`; the AI
   kernel's citation-enforcement step is non-bypassable (§11).
2. **Token layer first** — every color/surface is a CSS var from the design system; zero one-off hex.
3. **Contract-first** — cross-service changes update `packages/contracts` + OpenAPI in the same change.
4. **Graph motion off React state** — positions, drags, pan and zoom live in refs and write the DOM
   (ADR 0140; the force sim it once meant is gone).
5. **Indian-market correctness** — currency ₹, NSE/BSE tickers, IST timestamps, lakh/crore where shown.
6. **The user's judgment is first-class** — conviction / stars / pins / custom metrics are shared, global,
   inline-editable, and consistent across every surface.
7. **Derived layers are rebuildable** — vectors (L2) and the graph (L3) are indexes over L0/L1, never the
   source of truth; every citation resolves *down* to a raw L0 artifact (§10).
8. **One substrate, scoped projections** — AI roles coordinate through shared state + provenance events
   (blackboard), never agent-to-agent chatter; build no second store/graph/memory system (§11).
9. **Conflicts are detected, not adjudicated (ADR 0011).** Contestation is **computed** deterministically
   from the structured claim key `(subject, attribute, period, polarity)` — never LLM-guessed; the system
   presents both sides with source authority **shown** and lets the user decide. Polarity is directional
   (`improving/deteriorating`), never `good/bad`; corroboration counts **independent sources, not documents**.
10. **Claims are temporally grounded (ADR 0011 / ADR 0053).** Every claim carries a **referent period**
    (Indian FY) and an **assertion time**; contestation requires **overlapping referent period**.
    Supersession additionally requires a frame-compatible semantic revision/restatement: chronology alone
    is insufficient; actual-vs-guidance is `variance_to_expectation`, and adjacent periods are a time series.

## 10. Storage as a layer system (L0–L3)

> **The full physical schema — every table and view, every column, FK and CHECK vocabulary — is
> rendered in [`DATABASE-SCHEMA.html`](DATABASE-SCHEMA.html)** (open it in a browser). This section
> describes the layer *model*; that document is the table-by-table reference. It is **hand-maintained
> against `services/ai/app/db/schema.sql`** (there is no generator, by decision — 2026-07-27): update
> it in the same change that adds a table. `services/ai/tests/test_docs_drift.py` fails if a table
> exists in the schema and not in that document, so the two cannot silently diverge.

The four storage formats are **not parallel stores** — they are four layers of one corpus, each lower
layer more *derived* and less *authoritative*. (ADR 0009.)

| Layer | What lives here | Role | Rebuildable? |
|---|---|---|---|
| **L0 — raw artifacts** | original PDFs/HTML + markdown conversion, conversation transcripts | provenance ground truth; every citation resolves to a byte/page range here | no — truth |
| **L1 — system of record** | `documents` · `elements` (typed parse output) · `chunks` (views over elements, +`locator`) · the **entity + attribute spines** · the typed **concept registry** (`concepts`, `concept_definitions`, applicability) · `instruments` / `line_items` · **periodized KPIs in TWO shapes — the fact tables (`fact_mentions` → `fact_versions` → the `active_facts` view: measurements — revenue, net income, EPS, cash flows; a **measurement frame**+`currency`, no polarity) and the claim tables (assertions: margins, growth, guidance; `polarity`+`modality`) — a numeric-lookup tool must query BOTH (ADR 0033, ADR 0039). **There is no `fin_facts` table**: rung 6a-ii replaced it (`DROP TABLE IF EXISTS public.fin_facts`) because it had no run/version/active-swap, so invariant #7 was true of claims and merely asserted of facts (ADR 0085/0087)** · canvas/workbook artifacts | normalized facts; the relational backbone everything attaches to | no — authoritative |
| **L2 — semantic index** | `chunks.embedding` (pgvector, HNSW cosine) | a similarity index *over* L1 | yes — re-embed |
| **L3 — graph** | entities · **claims** (`claim_mentions` immutable → `claim_versions` derived, read via the `active_claims` view) · **relations** (`relation_mentions` → `relation_versions` → `active_relations`) · `document_roles` · the review-version tables, all with provenance (**relational source-of-truth; Apache AGE is installed but unused — a deferred projection, ADR 0019 §6**) | multi-hop structure; a *projection* of L1 via LLM extraction | yes — re-extract, and re-*resolve* with zero provider calls |

> ⚠ **There is no `claims` table.** The pre-1C flat table was dropped (`DROP TABLE IF EXISTS
> public.claims`, pre-live under D12 — a documented clean reset is the supported path, never a
> backfill). Read `active_claims`; write `claim_versions` through a resolution run. Non-run producers
> (the Dashboard lens bridge's `computed`-tier claims, deterministically rebuilt from `active_facts`)
> write `claim_versions` with `run_id NULL` and own their own delete-and-rewrite lifecycle.

**What a document IS to its workspace — one rule, in the name (rung 17c, ADR 0149).** The
table is `all_documents`; `documents` is a VIEW of it (`standing = 'library'`, `WITH LOCAL CHECK
OPTION`). A **canvas file** — a file dropped on a canvas — is a document with `standing =
'canvas'`: same tables, same L0 file, same id, read by the canvas steps WIRED to it and by nothing
else. The ~86 readers of `documents` (brief, leads, Graph, findings, facts, story, timeline, every
count) therefore cannot see one by doing nothing; the readers that must — the ingestion lifecycle,
reads ADDRESSED by id inside a workspace, a canvas step's wired read, `app/canvas_files/` — name
`all_documents`, on an allow-list `canvas_files_probe` greps. It fails CLOSED: a new reader that
forgets canvas files 404s one, never leaks it. *Add to Library* moves a file to `library` on the same
id and runs the right half of the reading (identify with door 4 → extract ∥ → facts → harvest), so
every citation made on a canvas stays valid.

**Identity / lineage spine.** Stable ids thread the layers (`workspaceId / entityId / attributeId / docId /
chunkId / nodeId / claimId`); every derived object carries the ids of what it came from. Provenance resolves
*down* the stack: `claim/edge → chunk(s) in L1 → page-range in L0`. This chain is the product's credibility —
keep it intact or the four layers silently drift. **Two canonical spines** live in L1 — an **entity spine**
and an **attribute spine** (ADR 0011) — and the **period vocabulary is shared** across L1 time-series, L1
KPIs, and L3 claims, so a structured fact and a narrative claim meet on the same `(subject, attribute,
period)` key.

**Time-series is a different animal — keep it out of the RAG path.** Prices/fundamentals are structured
L1 rows (TimescaleDB hypertables only if volume demands). AI reads them via a **structured-query tool**,
never via vector similarity — *numbers must never be embedded and fuzzily retrieved* (that is how RAG
hallucinates financials). The model queries the table for the exact figure and cites the row. **Periodized
KPIs land in L1 from their canonical structured source, not the AR** — statutory financials from a feed
(Lane 2a), operational KPIs from the quarterly fact sheet (Lane 2b) — per ADR 0017.

**Two graph roles, one graph, two projections.** The AI-optimal graph is dense and fine-grained; the
human-optimal graph (react-force-graph) is the opposite — render all of L3 and you get a hairball. The
human view is a **filtered/aggregated projection** of L3 (degree thresholds, claims collapsed into themes
— the design system's progressive disclosure), computed as a query over the same graph. Never a separate
display graph.

**Storage of L3 — relational first, Apache AGE deferred (ADR 0019).** The canonical claim / entity /
attribute / edge tables live in **relational Postgres**, queried with SQL — that is the source of truth the
**signals engine** computes over (the *contested* signal is a group-over-key, not a graph traversal). At demo
scale (one company, hundreds of claims) AGE buys nothing — it stores graph data in heap tables with a B-tree
lookup per hop, so shallow traversals are as fast via recursive CTEs. **Apache AGE / Cypher is added as a
*projection*** when the visual graph + graph-traversal retrieval slice genuinely needs it; because claims are
the source of truth and the graph is a rebuildable projection (invariant #7), standing it up later is a
projection build, not a migration.

## 11. AI architecture — blackboard + composable kernel

AI plays many roles (graph extraction, Ask N4A, Canvas AI node, per-node helper, signals), reactive and
— later — proactive. They are **not** separate agents that message each other; that compounds error and
breaks provenance. Instead: a **blackboard**. (ADR 0010.)

**Coordination is via the shared substrate, not chatter.** Every role reads/writes the same store (L0–L3,
§10) and coordinates through an **event / provenance log**. When one role produces a node/insight/board it
writes it *with citations*; that artifact becomes available to the others. Roles "communicate" by leaving
durable, attributed artifacts — never by talking to each other.

**Four shared services:** Context Assembly · Knowledge Substrate (Postgres, §10) · Event/Provenance log ·
Provider router (§6).

**One kernel, many thin roles.** The kernel is a set of composable primitives, **not** a monolith:
`resolveScope()` · `assembleContext(policy)` · `retrieve()` · `callModel(tier)` · `enforceCitations()` ·
`writeArtifact()` · `emitEvent()`. A **role** is a thin composition of these (a middleware pipeline),
declared via a profile and free to drop to code where it genuinely differs:

```
profile = { role, scope_resolver, retrieval_policy, model_tier, tool_set, output_contract, write_perms }
```

**Design rules:**
- **`enforceCitations()` is non-bypassable middleware** — the structural guarantee behind invariant 1.
- **Context assembly is separated from the agent** — `scope → retrieve → pack` is a pure-ish, testable
  function reused by reactive and (later) proactive paths.
- **Tools are the extensibility surface**, not bespoke agents: `read_subgraph`, `query_timeseries`,
  `search_chunks`, `propose_node`, `edit_file`, `build_board`. A role ≈ tools + scope + system prompt +
  model.
- **In Canvas, the user's edges *are* the scope spec** — the visual graph configures the agent's context.

**Roles (examples):** graph-extractor (batch, propose-only writes) · library-assistant (whole-workspace
subgraph, streaming) · canvas-node (scoped to connected inputs) · node-helper (node inputs + type + task).

**Read vs. acquire are different profiles.** *Ask N4A* (library-assistant) is **read-only** — it retrieves
over the corpus already present and writes nothing. A **source-discovery agent** (NotebookLM-style "search
the web to seed the corpus", *deferred — a forthcoming brainstorm*, ADR 0017) is an **acquisition** profile:
web-search tools + `writeArtifact` into **L0**, feeding the *same* ingestion router (§4) — never a parallel
pipeline. Its **coverage map is the attribute spine** (§3.1): the canonical KPI/topic set built for
extraction doubles as "what a thorough analysis needs," so discovery can target the gaps. One artifact, two
uses — designing the spine for L3 also serves discovery later.

**Reactive now, proactive later.** Reactive = synchronous, in the request path (build first). Proactive =
event-driven watchers over the same log (deferred). **Memory** = the substrate viewed through a
recency/episode lens: conversation transcripts + note/conversation-derived claims now (tagged
`source`/`trust` so user-curated facts outrank AI-extracted ones); an episodic layer later.
User-behaviour/telemetry-driven personalization is explicitly deferred.

**Open forks (not yet locked, tracked in PROGRESS):** (a) one global workspace graph vs. per-collection
graphs; (b) AI write autonomy — propose-only vs. direct-write; (c) whether conversation/note-derived
claims enter the *same* graph as document-derived claims from day one.
