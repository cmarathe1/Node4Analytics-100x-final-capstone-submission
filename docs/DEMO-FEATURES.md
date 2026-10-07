# N4A — Demo Feature Log

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

> **status:** live · **authoritative for:** the demo highlight reel and Q&A prep · **last verified:**
> 2026-10-05.

> A living log of the features that will **matter at demo time** — the proof points worth showing and the
> answers worth having ready. We build continuously; the small, clever, or differentiating touches are the
> easiest to forget and the hardest to reconstruct later under pressure. So whenever we ship (or lock) a
> feature that a viewer would notice or ask about, we capture it here **while the reasoning is fresh**:
> what it is, why it matters for the demo, how it works, and the exact moment to show it.
>
> This is the demo-facing twin of [`VALIDATION-BACKLOG.md`](VALIDATION-BACKLOG.md): that file tracks *open
> bets* we need users to confirm; this one banks *proof points* we want to present. It is **not** a feature
> spec or a backlog of work — `PLAN.md` is the plan. This is the curated highlight reel + Q&A prep.

## How to use
- **Add an entry when a feature is demo-relevant** — i.e. it is *differentiating*, *non-obvious*,
  *India-specific*, or *likely to draw a question*. Don't log routine CRUD/plumbing (see "What counts" below).
- Add it **the moment it lands** (or the moment a hero feature is locked, as `planned`) — don't batch it for later.
- Keep each entry tight: **Why it matters (demo angle)** · **How it works** · **Demo moment**. Link to code
  (`file:line`), the relevant `ARCHITECTURE.md` section, and the ADR — don't restate them.
- Update **Status** as the feature matures, and keep the index table in sync.
- Group the entry under the surface it lives on (or **Cross-cutting** for platform-wide proof points).

## What counts (and what doesn't)
**Log it** if a viewer would say "wait, how did it do that?" or an analyst would push on it: the contested
signal, provenance resolving to a page, real Indian-filing ingestion, the multi-provider switch, lakh/crore
correctness, a Canvas pipeline running on real data. **Skip** generic plumbing: a list view, a settings
toggle, a standard form — unless it has a non-obvious twist worth a talking point.

## Status legend
`planned` — locked, not built yet · `building` — in progress · `built` — works, not demo-polished ·
`demo-ready` — rehearsed and polished · `cut` — dropped (kept here with the reason, so we don't relitigate)

## Index

| # | Feature | Surface | Status | Demo angle (one-liner) |
|---|---------|---------|--------|------------------------|
| F1 | Computed findings feed (leads + observations) | Library | **built** | The hero "aha" — what an analyst would have noticed is *computed* over live claims, not guessed; every family name carries a predicate, and the two families that cannot yet decide say so |
| F2 | Routed ingestion + live progress | Library | **built** | Watch a real Indian filing become a graph, live |
| F3 | Grounded Ask that focuses the subgraph | Library | **built** | The answer *and* the graph light up together, cited |
| F4 | Every citation OPENS — the page, in context, one move back | Cross-cutting | **built** | Click any citation chip → read the exact filing passage |
| F5 | Mid-session multi-provider switch | Cross-cutting | building | Same question, Claude → GPT → Gemini, keys server-side |
| F6 | ₹ lakh/crore-aware screener | Dashboard | **built** | It speaks Indian-market units natively |
| F7 | Sector-general analytical frame | Cross-cutting | built | Not an Infosys demo — the same lens reads a bank or a pharma co |
| F8 | Parallel multi-doc ingest + SSE progress | Library | **built** | Upload N reports at once; per-document progress strips fire live |
| F9 | Orbital knowledge graph — progressive disclosure | Library | **built** | Calm three-zone shape at rest; positions bloom as moons on demand |
| F10 | Three-axis trust model (authority/confidence/corroboration) | Library | **built** | Reliability isn't one number — three dials, none guessed |
| F11 | Company-agnostic ingestion (content-based filer ID + presentation decks) | Library | **built** | Drop in a company nobody tuned this on — it still gets the name right |
| F12 | Cited financial facts + deterministic Ask-N4A KPI answers | Dashboard | **built** | The vendor-lane original; superseded in substance by F33 — lead with a FILED figure, not a snapshot |
| F33 | The filed number, cited to its **cell** — and the record caught disagreeing with itself | Dashboard | **built** | Not just the number: the row, the column and the verbatim text it was read from — and two audited filings ₹6,025 crore apart, both shown, distinguished from rounding |
| F13 | Geography/segment canonicalization in the connection layer | Library | **built** | "The US," "U.S.," and "United States" collapse to one node — the graph doesn't fragment on phrasing |
| F14 | Browse freely, curate deliberately (Dashboard KB opt-in) | Dashboard | **built** | Window-shop 10 companies with zero KB clutter; one button lands the one you're actually researching |
| F15 | Wire sources into an AI node, watch the scope BE the citation | Canvas | **built** | The edges you draw are the exact audit trail of what the AI was allowed to read |
| F16 | Sources → AI → cited **table**: every cell carries its quote | Canvas | **built** | "Deal wins ≥ ₹500cr per call, one row each, with the quote" — a grid where no cell is anonymous |
| F17 | Excel node: a living model the AI edits, versioned + audited | Canvas | **built** | "Update FY26E growth to management's guidance" — it edits the sheet, cites the call, lands a new revertible version |
| F18 | Document node: a living memo the AI co-authors, citations chain to L0 | Canvas | **built** | "Build me a two-section comparison memo" — it plans, drafts, cites through every upstream artifact, and never touches your hand-written words |
| F19 | Deterministic Word round-trip (export + mirror-a-reference import) | Canvas | **built** | Export a cited memo to a real .docx with real headings — or hand it a template report and watch it match the structure |
| F20 | Cited numbers from a source with zero readable text | Canvas | **built** | A vendor data card has no prose to search — the agent still returns a cited Net Income, because it queries structure, not text |
| F21 | The agent verifies its own spreadsheet math | Canvas | **built** | "Extend this projection" — it fills the formula pattern correctly, then re-opens the file to prove the numbers actually compute |
| F22 | Focus views + clickable provenance — the analyst's desk, not postcards | Canvas | **built** | Open any cramped node into a full-viewport document/spreadsheet/reader; edit the sheet directly, click a citation marker to see its source chunk, Esc back to the canvas |
| F23 | We measure our own extraction's honesty (no-fabrication trust floor) | Cross-cutting | **built** | The answer to *"how do you know it doesn't hallucinate?"* — a no-claim passage must produce **nothing**, and we watch that with an analyst-outcome eval, not assume it |
| F24 | A broker note can never become audited evidence | Cross-cutting | **built** | Every source's authority is fixed at the front door by *what it is*, not guessed later — and the same PDF uploaded twice under two names stays **one** source, so it can't corroborate itself |
| F25 | Honest failure states + change receipts — the pipeline never lies about itself | Cross-cutting | **built** | "No API key" is not "done"; a failed re-run keeps the last good result; every re-derivation shows an added/revised/removed receipt; correcting a source's identity quarantines the contaminated claims instantly |
| F26 | Citations name *where in the filing* — not just a page | Cross-cutting | **built** | `AR FY25 · Auditor's Report · p.187` — an analyst knows whether a number came from the audited statements, the MD&A, or the AGM back matter, before clicking |
| F27 | Document role ≠ statement voice (quoted mgmt, broker voice) | Cross-cutting | **built** | A news article quoting management is not a second source; a broker's estimate stays the broker's voice |
| F28 | A filing becomes a business-model map — every connection shows *why* it's trusted | Library | **built** | Segments/geographies from the audited disclosure read `reported`; a competitor stated in prose reads `explicit`; a bare name-drop stays a review lead, not an edge — each with the verbatim quote |
| F29 | Held-out proof: two untuned companies, ingested blind, clean | Cross-cutting | **built** | The receipt behind F7 — TCS + ICICI, never tuned for, ingested end to end in 765s; all four invariant scans clean, and on the one cover it couldn't read the system **refused instead of guessing** |
| F31 | Guidance is a **band**, and “healthy growth” is not a direction | Cross-cutting | **built** | “2–3% in constant currency” is stored as a band with both endpoints, not as *2*; and a speaker calling growth *healthy* never manufactures a contradiction |
| F32 | *“FY26 growth was 9.6%”* — **three different numbers, all true** | Cross-cutting | **built** | Rupee, dollar and constant-currency growth are three **frames**, not three opinions; the system keeps them apart instead of averaging them into one wrong number — and never invents a frame the document did not state |
| F40 | An empty cell says WHY it is empty | Cross-cutting | **built** | Every tool shows blanks; ask one whether the blank is the company's silence, a filing we never fetched or a parser that choked. Nine states DERIVED by a recorded precedence — and the one it refuses to assert is *"they did not disclose it"* |
| F34 | A capture of a number you never saw is **refused** | Cross-cutting | **built** | The clip carries the server's own receipt for what was on screen; a re-parse between render and click makes it a **409**, not a citation that quietly points somewhere else |
| F35 | The price tells you **when it was true** — and when it can't, it says which of us failed | Cross-cutting | **built** | Every other tool stamps a quote with the moment it asked; we shipped that too, and it was **four hours wrong** on an ordinary evening reading. Now the row carries the provider's own clock, and a feed that has stopped, a reading nobody dated and a refresh **we** failed are three different sentences |
| F38 | The business, in its own parts — and a figure that can prove which part it belongs to | Cross-cutting | **built** | An Indian segment note is TRANSPOSED and inconsistent about it, so the parts of a business are the one filed table nobody reads reliably. We read 276 of them across three issuers, never sum a total the note did not print, and every figure re-derives from the cell its citation opens — swap two parts' values and every total still agrees, which is why the sum is not the proof |
| F36 | A filed figure opens onto its **CELL** — and the viewer says what the mark RESTS ON | Cross-cutting | **built** | The citation lands on the number, not the page — and a mark that cannot be verified says so instead of looking identical to one that can |
| F37 | A line that will not lie about the quarters it skips — or the basis that moved under it | Library | **built** | Every chart joins the dots. Ours refuses to join across a quarter it has no figure for, says WHICH kind of silence each one is, and marks the quarter HDFC's profit is filed twice, ₹790 crore apart, on two bases |
| F39 | How the business divides — a share of the total the NOTE printed, and the gap it did not account for | Library | **built** | Every segment chart fills to 100% by dividing by its own parts; ours divides by the total the company printed, draws the gap, and shows a rename instead of inventing a collapse |
| F41 | What deserves attention — and a judgment we refuse to honour over evidence we did not show you | Library | **built** | Every research tool ranks its alerts by a severity score somebody invented; ours orders by the RECENCY of the evidence underneath. And mark a lead *not material* while your source scope hides half of it — the form is not even offered |
| F42 | A timeline that knows WHEN — and will not pin what a source only paraphrased | Library | **built** | Every "events" strip dates a document by its PDF export stamp and an event by what a model guessed. Ours draws only a date the source PRINTED, and pins a dividend only where the passage says the same company paid the same dividend on that exact day |
| F44 | A graph where every line answers *"which document says so?"* — and a lead you can walk into it | Graph | **built** | Half of our own edges once had no document behind them. Now every line carries its passages, a connection no document in scope states is not drawn, size is labelled *connections shown here, not importance*, and a lead or metric in the brief lands ON its object in the Graph and routes back (ADR 0136) |
| F46 | *How this business works* — an expert's story where every sentence says what kind of claim it is | Library | **built** | An AI-written brief you can audit sentence by sentence: filed, attributed or N4A's reading (with its falsifier), never a made-up number, never a winner on a disagreement (ADR 0145/0146) |
| F45 | Ask the Graph *why* — and it says what the record files, who merely claims it, and what it cannot settle | Graph | **built** | No prose blob: a structured answer on the basis and period you asked, disagreements between filings shown rather than settled, and a decline when the record cannot answer (ADR 0137/0138/0144) |
| F43 | Drop in a company you have never covered — the brief builds itself, and says what it inferred | Library | **built** | The exchange's register vouches for who a filer is before a claim is read; the business model is inferred once and labelled; a bank's brief fills from the RBI ratios note, Form B and its segment note (ADR 0131–0135) |
| F47 | One switch, everywhere — a source you turn off stays off in Library, Graph and Canvas | Cross-cutting | **built** | Switch a filing off once; reload, open a second window, open Graph or Canvas — it is off there too, and Canvas says so quietly instead of silently reading it |
| F48 | Continue an Ask on Canvas — and chain steps by their evidence, metered to the cent | Canvas | **built** | A Graph chat moves to a board with its whole history; a step fed by another step cites the ORIGINAL filing pages, never "the previous step said so"; every AI call shows its tokens and dollars |
| F49 | Drop any file on a canvas — it is read where you wire it and speaks nowhere else | Canvas | **built** | A scratch PDF or Word note can be cited by your memo without ever appearing in a brief count, a lead or the Graph; *Add to Library* promotes it in place, citations intact |
| F30 | The press round and the analyst call stop being the same transcript | Library | **built** | One PDF often holds a media conference *and* an earnings call — we split them and type each questioner from the firm the document **stated**, so "what the street pressed on" isn't polluted by journalists |

> Seeded entries below are genuinely-locked hero features pulled from the architecture (see each entry's
> links); their **Demo moment** is illustrative until built. Expand and re-status them as they land, and
> append new ones as we go.

---

## Library

### F1 · Computed findings feed (leads + observations) · `[Library]` · **`built`**
**Why it matters (demo angle):** The headline differentiator. N4A surfaces where independent sources
*disagree* on a thesis — and the disagreement is **computed deterministically**, not an LLM hunch. This is
the moment that separates N4A from "chat over my PDFs." Pre-empts the obvious skeptical question: *"How do
you actually know it's contested — did a model just decide that?"*
**How it works:** A signals-engine query over the shared claim key `(subject, attribute, period)`: two
claims contest iff they share the key with overlapping referent period and **opposing directional polarity**
from **independent sources** (same lineage ⇒ supersession, not contestation). The LLM only extracts what a
single passage says; it never sees both sides and picks a winner. Extraction runs on a **pinned model** so
"what counts as contested" is reproducible. **1E (ADR 0049) refined the flat key into a factored
comparability FRAME** (`subject · concept · interval · basis · comparator · modality · qualifiers`) so an
under-specified pair reads `flagged`, never a false `contested`. See `ARCHITECTURE.md §3.1, §5`; invariant 9;
ADR 0011/0049.
**Built so far (2026-06-24/25, ss5a–ss5d):** the full **knowledge structure** is now live across multiple
sources. ss5a stood up the two resolution spines (`python -m app.spine.cli`, ADR 0019/0020): the **coarse
attribute lens** (the key's `attribute` dimension) is a **user-curated, Indian-IT-specific 14-attribute set** —
the honest answer to *"who decided these are the same metric?"*: a human curates the lens, the machine only
normalizes mentions onto it (embedding-first, pinned-model on the ambiguous residual). ss5b then produces the
**claims** themselves (`python -m app.claims.cli`, ADR 0021): atomic-fact extraction → two-spine resolve →
the relational `claims` table, with each claim on the shared key `(subject, attribute_coarse, period)`, a
**directional** polarity (margin-down and attrition-down map to *opposite* stances, no good/bad), and a
citation to its page — verified on the real AR (e.g. revenue growth 9.6% p.82, a client-risk factor → client
health p.136). ss5d (`python -m app.merge.cli`, ADR 0023) proved the structure survives **multi-source
ingestion**: proposed entities from doc 1 accumulate as resolution candidates for doc 2; the competes/parent_of
connection layer survives with both endpoints intact. The group-over-key now has rows from multiple independent
sources. **1E (2026-07-21, ADR 0049–0052)** built the contested *computation* itself —
`app/spine/compare.py`, deterministic and gated by the `registry` eval suite (comparability 15/15,
**0 false contests**, must-fire 2/2) — plus the typed registry the frame keys on. **1F (ADR 0053,
user-verified 2026-07-22) wired it to LIVE extraction and made this real:** `app/claims/compare.py`
projects live `active_claims` through the factored comparator and serves two-sided cited results over
`GET /signals` + the Library **Signals rail**. The semantic relations distinguish a **revision** (later
same-lineage guidance), a **variance-to-expectation** (actual vs. broker estimate), and an
adjacent-period **time series** from a genuine **contest** — so the badge fires only on real
disagreement between independent sources, never on a source updating itself, and no model ever names a
winner. Release gate **`propositions` 30/30** (contest 4/4 · 0 false contests); proven on Postgres +
`ws-demo` (28 comparison receipts → 22 signals).
**Rung 5 (2026-08-24, ADR 0079–0084) turned the rail into a ranked FEED and the object into a
`Finding`.** `GET /findings` replaces `GET /signals`; one feed carries two kinds — a **lead** (the
record is deficient) and an **observation** (it is sufficient and worth knowing), because reading a
document set builds a model of the business as well as a list of doubts. Every family name is now an
ASSERTION with a predicate behind it: `corroborated` needs ≥2 **independent** lineages, a `trend` needs
≥3 periods *and* an established direction. Identity is durable, so a falsifier or a note can bind to a
finding and survive re-ingestion.
> ⚠ **Honest state for a demo: `contested` currently fires ZERO times.** Not a bug — `basis` is empty
> on ~93% of claims, so the frame test cannot decide, and the system declines rather than guessing
> (unblocker: **rung 6a**). `corroborated` is also zero: 191 comparisons DO span two lineages and none
> agrees, because an independent source restates a number approximately (unblocker: **rung 7**). What
> IS live and demo-able today: **measurement gaps** (67), **consistent record** (51), **revisions**
> (42), **expectation vs outcome** (21), **unresolved drivers** (13). Demo those, and let the two zeros
> be the *point* — a system that says "I can't decide this" is the differentiator, not a gap.
**Demo moment:** Ask *"what are the main gaps in the record?"* in Library Ask → a **deterministic**,
ranked, cited answer computed from the claim key with no model in the path; the same pipeline feeds
the brief's *What deserves attention* (rung 12), each lead resolving to every document it rests on.

### F2 · Routed ingestion with live progress · `[Library]` · **`built`**
**Why it matters (demo angle):** Proves "real data from day one" and makes the pipeline *visible* — a real
NSE/BSE annual report becoming a knowledge graph in front of the viewer, not a pre-baked fixture. The
router (4 lanes by information shape) is the non-generic answer to "how do you extract everything useful?"
**How it works:** Ingestion classifies each input by shape and routes it down a lane (structured-record ·
financial-statement/KPI · narrative-claim · dialogue-claim). The **annual report's primary lane is 3**
(prose → claims); exact numbers come from their canonical structured sources — **Lane 2a** (statutory
financials via a feed) + **Lane 2b** (operational KPIs via the quarterly fact sheet), ADR 0017 — not by
OCR-ing the report. Shared stages `parse → chunk → embed → extract → resolve → harvest` stream progress over
SSE, mirroring the prototype's `parsing|embedding|graphing` states. See `ARCHITECTURE.md §4`; ADR 0011 / 0017.
**Built so far (2026-06-23):** the `parse → chunk → land → embed` stages run on the real Infosys AR
FY25-26 (383 pp → 1407 chunks → 1407 vectors): structure-enriched parse extracts bordered tables as Markdown
and **preserves lakh/crore grouping** (`1,48,819`) with page-anchored provenance (ADR 0014); chunks persist
to L0/L1 Postgres (ADR 0015); the `embed` stage writes pgvector L2 via a provider-agnostic router (ADR 0016).
A nice secondary talking point: the parser already speaks Indian-market number formatting, not just the
screener (F6).
**Built (2026-06-27, ss7):** the full upload → Library surface flow is live. `POST /documents` ran
parse→embed synchronously and set `status=graphing`; claim extraction ran in an autocommit background
task, flipping to `ready` when done. The Library polled every 1.5s while any source was mid-ingest.
**Built (2026-07-02, H2):** `POST /documents/batch` (F8) is now the *only* upload path — the sync
endpoint above is gone. Live SSE progress drives per-stage strips in the sources panel (parsing →
embedding → graphing → ready), with polling as reconnect fallback; delete still cascades cleanly
through all derived layers. **Demo moment:** Drop in a real Infosys filing (alone or alongside
others) → watch the staged progress strip advance live → real entity+claim nodes appear in the graph
as it completes.

### F3 · Grounded Ask that focuses the cited subgraph · `[Library]` · **`built`**
**Why it matters (demo angle):** Delivers the core promise — "AI acts on the visible structure." The answer
streams *and* the graph re-focuses on exactly the nodes the answer is built from, every claim cited. Shows
the AI and the knowledge graph are one system, not two bolted together.
**How it works:** The query is routed (point-lookup → vector top-k; "what's contested/central/connected" →
graph traversal), a grounded prompt is assembled from retrieved chunks + the relevant subgraph, and the
response returns `{ answer, citations[], focusNodeIds[], layoutHint? }` which the app streams while focusing
the subgraph. See `ARCHITECTURE.md §5`; invariant 1.
**Built (2026-06-27, ss7):** **fully live end-to-end** in the Library UI. The answer kernel now blends
**L2 chunks + L3 structured claims** (`claims_layer.py`: token-overlap + label-weighted scoring; broad queries
use `top_claims_by_theme` round-robin by coarse density). `focus_from_citations` maps the final cited
evidence to `(claim_node_id, entity_node_uuid)` pairs — those become `focusNodeIds` in the `AskResponse`.
In the Library, the cited nodes highlight in the graph canvas immediately after the answer arrives. Citation
chips in the Ask N4A rail are clickable: each resolves to the L0 chunk text via `GET /documents/chunk/{id}`
(the provenance chain in action). Scope is enforced by `scope.docIds` (the switched-on sources, invariant #6)
passed from the Library's include/exclude toggles. Verified live: *"What does management say about operating
margin this year?"* → cited answer + graph focus on the relevant claim nodes. ADR 0017/0018/0026.
**Q&A prep (a nuance that lands with technical viewers):** *"Why not just embed the financials and ask?"* —
because numeric KPIs (attrition %, margin) are **tabular**, and fuzzily retrieving numbers is how RAG
hallucinates financials. N4A routes those to **Lane-2 structured queries** and reserves the vector index for
prose claims — demonstrated empirically: a vector probe for "attrition trend" surfaces an actuarial footnote,
not the KPI (ADR 0011 / 0016).
**Demo moment:** Ask *"What does management say about margins?"* → answer streams in with citation chips →
click a chip to read the exact filing passage → graph zooms to the cited claim nodes.

## Cross-cutting

### F30 · The press round and the analyst call stop being the same transcript · `[Library]` · **`built`**
**Why it matters (demo angle):** Indian concall PDFs routinely staple two *different events* together — a
media conference and the analyst earnings call. Pooled, they make "what the street pressed on" meaningless:
a journalist's question about a leadership change sits beside a sell-side question on margins as if they
carried the same weight. We separate them, and we type each questioner from the firm **the document itself
named** — never inferred. It is also the only place in the whole corpus where source independence is
*stated* rather than inferred, which is what invariant 9 needs.
**How it works:** `app/ingestion/speakers.py` — fully deterministic, **no model call**. The host role is
found by the **phrase family** it speaks, never a literal label (some issuers use a conferencing operator,
others a named IR host — a string rule passes one sector and silently does nothing on the other).
Management is derived by **elimination**: not the host, never introduced ⇒ company-side. Events split at an
**announcement**; where a pooled file never names its opening media round, the boundary is emitted as kind
`unknown` rather than guessed. Origins count **firms, not speakers**, so two analysts from one house are
one origin, and an unresolved firm counts as none. Persisted to `transcript_speakers`/`transcript_events`;
`voiceForSpeaker` projects onto the existing `StatementVoice` (invariant 8 — not a second ontology).
**Demo moment:** run `uv run python -m app.eval.transcript_baseline`. Point at a pooled file showing
**2 events**, then at the origins column: *"twelve questioners, eleven independent origins — two of them
work at the same house, so we count them once."*
**Built (2026-08-02, Phase-2 rungs 0–2, ADR 0058):** measured over **26 transcripts / 9 issuers** — host
role resolved 25/25 of the documents whose role is findable, pooled files 5/5 segmented, 256 independent
origins summed per call (97 distinct houses corpus-wide) from 276 resolved questioners, zero bleed. **Not yet consumed downstream** —
`claims/extract.py` still gets `voice` from the model, so don't claim the speaker object is driving
extraction.


### F4 · Every citation OPENS — onto the page, in context, with one move back · `[Cross-cutting]` · **`built`**
**Why it matters (demo angle):** The structural answer to *"how do I trust what the AI said?"* — not a
label, and not a quote handed back to you, but **the document itself**, open at the cited passage, with
the metadata that decides what it is worth beside it. An analyst mid-argument will not click a citation
they are afraid of losing their place to, so the return is a recorded ticket: scroll position restored
**before** focus, so closing the viewer puts them back exactly where they were.
**How it works:** `Citation.anchor: ObjectRef | null` is an ADDRESS, not a label — `locator` stays the
sentence a human reads and **nothing parses it back into coordinates** (rung 10b, ADR 0109). Clicking any
chip calls `POST /evidence/passage {workspaceId, anchor, chunkId?}`; the server resolves the anchor,
fetches the page's parsed ELEMENTS (never page text — a string search fails silently on hyphenation and
draws nothing over a page that does hold the evidence), and marks exactly the elements
`chunks.edges.elements` says the passage was built from. One viewer, mounted **once** in the root layout,
so every surface rungs 11–26 adds inherits it by existing. Deep-linkable: `?ev=<anchor>` beside
`workspaceId`.
**Built (2026-09-12, rung 10b):** `app/evidence/viewer/` — the overlay, the store, the return ticket, the
URL. Replaced **two** older chips (the Library's and Canvas's), which disagreed with each other and both
called a Lane-2 fact citation unclickable while its locator spelled out the cell. The 65,269 citations
minted before the field existed were **backfilled, not re-ingested** — deterministic, so no baseline
expired. **0 → 1,910/1,910 citations an analyst can see now carry an address and open.**
**Demo moment:** After an Ask answer arrives, click a citation chip → the filing opens at the cited
paragraph, highlighted in context, with the issuer, the published date and the passport state beside it.
Press **Esc** → you are back exactly where you were, mid-sentence. Then copy the link and paste it in a
fresh tab: the same passage, in the same workspace.

### F36 · A filed figure opens onto its **CELL** — and the viewer says what the mark RESTS ON · `[Cross-cutting]` · **`built`**
**Why it matters (demo angle):** Two things no other tool in this space does. First, a citation on a
**number** lands on the number — the row, the column, the exact cell of the statement it was read from,
outlined on the page. Second, and rarer: the viewer **tells you whether it checked**. A mark is an
assertion — *this is the evidence you were shown* — and an assertion that cannot be verified says so
rather than looking identical to one that can.
**How it works:** `cell` is an arm of the `ObjectRef` union carrying the **whole anchor** (ADR 0089): the
verbatim row label, the column label, the printed value, and the column's own header cells. On open, the
resolver compares all of them against the live grid — so a re-parse that restated the figure, shifted the
row, or moved the column onto another period reports **`changed`**, names both readings, and **withholds
the highlight**. `PassageResponse.highlight.basis` is then `anchor_content` (the ref's own content was
compared and matched) or `recorded_position` (something occupies the coordinate; nothing proves it is what
was cited) — present-iff a mark exists, refused for a ref type that carries no content, and refused unless
the response SHOWS the grid holding the cited value (ADR 0110/0111).
**Built (2026-09-12, rung 10b + two audits):** `certified_column_header` mints a receipt only where the
grid WITNESSES the reading; `read_passage` fetches the facsimile unmarked, judges *that* grid, then marks
it. Measured over the whole corpus: **1,910 citations opened, 1,910 resolved — 460 verified against their
own content, 1,450 honestly reporting a recorded position, zero drift.**
**Demo moment:** Open a filed figure — say HDFC's *Profit before tax × Q3 FY26* — and the cell `242.6` is
outlined inside the income statement, in context. The rail reads *"Marked from the cell this figure was
read from — its row label, its column heading and the figure it printed all still match the document."*
Then open a narrative citation from a concall: the passage is marked, and the rail says plainly that the
mark rests on a recorded position, because the reference keeps no copy of the words. **The product knows
the difference, and tells you.**

### F37 · A line that will not lie about the quarters it skips — or the basis that moved under it · `[Library]` · **`built`**

**Why it matters (demo angle):** Every financial chart makes two claims it never states: that
neighbouring points are comparable, and that the quarters on its axis are the quarters there are. A
charting library joins whatever survives a null filter, so a missing quarter becomes a confident
straight segment, and a figure given on a different basis becomes a "move". Neither failure is
visible to the analyst reading the chart. The demo line: *"this chart shows you where it is NOT
allowed to draw a line, and why."*

**How it works:** Phase-2 rung 11a (ADR
0112 (reference outside this repository: `decisions/0112-a-line-is-an-assertion-about-the-spans-between-its-points.md`), audited by
0113 (reference outside this repository: `decisions/0113-a-mark-means-one-thing.md`) →
0114 (reference outside this repository: `decisions/0114-a-flag-is-judged-over-the-whole-and-drawn-where-it-is-read.md`) →
0115 (reference outside this repository: `decisions/0115-a-comparison-is-judged-on-every-reading-and-a-claim-on-every-period.md`)). The
spans between points travel on the wire, one per adjacent pair, and a silent quarter is a union arm
with **no number in it** — a renderer has nothing to join across. Each silence carries rung 7's
reason and the precision it was reached at, so *we do not hold that filing* and *we hold it and it
does not state this* are different captions. A treatment moving underneath the line is a **break**,
but only where the two bases actually disagree at the precision each printed, and only over some of
the line's periods: a treatment stated every quarter is a parallel reading, not a warning on every
point. Every other filed metric is listed with why it is not drawn — reported once, at another grain,
or before the window — so a thin record never looks complete. Deterministic, no model, and every
drawn figure opens onto its cell (F36).

**Demo moment:** Open `/library?workspaceId=ws-hdfc-foundation` → *What changed* → profit after tax.
At Q1 FY2026 the line gives way to an amber rule: *"Two bases, different figures"* — ₹18,160 crore on
one, ₹17,370 crore on the other. Expand the source history: both rows, both cells, one click each.
Then switch to Infosys and point at the faint rules where the record is silent, each captioned with
which kind of silence it is. Closing line: *"add a rounder print of a number we already had, and the
break stays — we test that, because our own fix once erased it."*

### F46 · *How this business works* — an expert's story where every sentence says what kind of claim it is · `[Library]` · **`built`**

**Why it matters (demo angle):** Every "AI summary of a filing" reads the same: fluent, confident, and
impossible to audit. An analyst cannot tell which sentence the filing states, which one a broker
merely says, and which one the model made up by connecting two facts. Ours is written the way an
expert would brief a colleague, and then **every sentence wears its standing**: *filed*, *attributed*
(with the speaker) or *N4A's reading*, and a reading carries the one observation that would prove it
wrong. A number can only come from a filed figure, a cause only from a named source or a marked
reading, and the story **never says what the record lacks** (an absence it cannot see is not a
finding). Where sources disagree it lays out both sides and what would settle it, and never picks.

**How it works:** ADR 0145 (reference outside this repository: `decisions/0145-how-this-business-works-is-an-expert-story-checked-before-it-ships.md`)
→ 0146 (reference outside this repository: `decisions/0146-the-expert-story-is-laid-out-to-be-read-says-no-absence-and-is-reviewed-whole.md`).
Code gathers a numbered dossier (`F#` figures, `C#` claims, `P#` passages); one model call writes the
story as JSON; **a pure function enforces the rules** (the same function the contract and the probe
call, so there is one implementation); a *different* model reviews each statement seeing only its own
citations; a final pass drops a sentence that leans on one that was withheld. The output schema has no
verdict field and no free number, so the defects are unrepresentable rather than discouraged. The
story is kept per workspace and keyed on the record, so opening the page never calls a model.
Instrument: `app.eval.story_probe` — plants eight defects (a stray numeral, an uncited sentence, a
cause read off a filing…), shows a naive writer breaks all eight, and shows the enforcer withholds them.

**Demo moment:** `/library?workspaceId=ws-hdfc-foundation` → scroll to *How this business works*. Click
any sentence: its trail opens in place with the filed passage, or the speaker, or the reading's
falsifier. Click a figure inside a sentence and the filing page opens at the cell. Toggle **Filed ·
Attributed · N4A's reading** to dim everything else. Closing line: *"the AI is free to reason, but
it's not free to hide what kind of claim it's making."* Q&A: *"what stops it inventing a number?"* —
code, not a prompt: a numeral that is not a filed figure is withheld and counted. *Honest limit:* in
the stored stories no sentence cites a figure the record carries two ways, so the restated-figure
mark is proven in tests, not shown live.

### F45 · Ask the Graph *why* — and it says what the record files, who merely claims it, and what it cannot settle · `[Graph]` · **`built`**

**Why it matters (demo angle):** Every research chatbot answers *"why did revenue move?"* with a
fluent paragraph, and nothing in it says which sentence the filing supports and which one a model
supplied. Ours used to do the same, and cited its whole context when the model cited nothing. Now
the answer has no free-text field at all. It separates what the company **filed** from what someone
**attributed**, lists the explanations that stay live and what would discriminate between them, and
says per requested metric and period what is and is not in view. Where two filings disagree, both
readings are shown; nothing picks a winner. Where the record cannot settle the question, it
declines, and it says so differently when nothing has been read yet.

**How it works:** ADR 0137 (reference outside this repository: `decisions/0137-an-answer-is-structured-by-the-record-and-every-view-reads-one-scope.md`)
→ 0138 (reference outside this repository: `decisions/0138-an-answer-is-read-off-the-question-asked.md`) →
0144 (reference outside this repository: `decisions/0144-every-projection-keeps-the-evidences-qualifications.md`). `POST /graph/ask`
resolves one `QuestionFrame` (subject, metrics, period, basis, the follow-up chain) that every
stage reads. The model only selects and labels. The record sorts, counts and decides the standing,
and a label may use only its statements' words. Figures are filed readings, with their
restatements carried. Instrument: `app.eval.graph_ask_probe`.

**Demo moment:** `/graph?workspaceId=ws-hdfc-foundation` → Ask → *"Why did revenue from operations
move?"* The answer comes back **cannot settle**: the filed figures, the attributed explanations
each with their speaker, and what is missing. Ask *"what was consolidated PAT in FY25?"* and the
answer names its basis. Ask something off the record and watch it decline. Closing line: *"it is
allowed to say 'the record doesn't settle this', and that's the answer an analyst can trust."*

### F44 · A graph where every line answers *"which document says so?"* — and a lead you can walk into it · `[Graph]` · **`built`**

**Why it matters (demo angle):** Every knowledge-graph demo draws a hairball where a bigger bubble
is supposed to mean "more important" and a line means "the AI thinks these are related". Ask one
*which document says this company is linked to that theme* and it has no answer. Before this slice,
half of our own edges had none either. Now every line drawn carries the passages it rests on, and
a connection no document in scope states is not drawn at all. Switch a filing off and its edges,
its figures and its passages go with it. A bubble's size is labelled *connections shown here, not
importance*. Metric nodes are the brief's own series, figure for figure. The analyst also never
starts from a blank canvas: a lead or a metric row in the brief hands its scope, its period and
itself into the Graph, lands ON the object, and routes back.

**How it works:** ADR 0136 (reference outside this repository: `decisions/0136-the-graph-draws-what-a-document-in-scope-says.md`).
`build_graph` refuses to emit an uncited edge. A derived edge carries one citation per document
from the evidence it derives from. Metric nodes come from `series_over`, the same core as
`/brief/series`, run over facts whose source document is in scope. `GET /graph?seed=<ObjectRef>`
resolves the handoff at render time, and an unresolved seed comes back as a 200 with its reason.
Size is computed in the browser from the visible edges.

**Demo moment:** `/library?workspaceId=ws-infosys-foundation` → *What deserves attention* → open a
lead → *Trace in graph*. The Graph opens on that lead's positions, with an origin bar that names the
lead, the scope and *Back to the brief*. Click an edge's node: **Details** shows its statements,
who said each one and the documents behind it. Switch an annual report off in the scope panel and
watch the edges it alone supported disappear and the bubbles shrink. Closing line: *"nothing on
this canvas is here because a model thought so. Every line opens on a page."*

### F43 · Drop in a company you have never covered — the brief builds itself, and says what it inferred · `[Library]` · **`built`**

**Why it matters (demo angle):** Most research tools either need an admin to set a new company up,
or they guess its identity from the file name and quietly file everything under the wrong name. Ours
decides the company from the filing's own front matter. It binds it only when the exchange's
register vouches for exactly ONE listing with that identity, and it does so before a single claim
is read, so every claim is filed under the right company from the start. It infers the business
model once, labels it *inferred*, and lets the analyst change it. A company it cannot vouch for
gets one card asking once, not a row of amber "Partial"s. A bank's brief then fills from what a
bank actually prints: the RBI *Business ratios* note (NIM, cost of deposits, ROA), the Form B P&L
lines and a segment note with merged header cells. Where no filing gives a figure (GNPA, CAR for a
quarter), the company's own call fills it, labelled as *stated*, and a filed figure always wins.
The demo line: *"five PDFs of a bank we never set up, nothing clicked, and six minutes later its
brief has its ticker, its NIM and its segments, each one opening on the page that printed it."*

**How it works:** ADRs 0131 (reference outside this repository: `decisions/0131-a-new-company-is-confirmed-once.md`)–0135 (reference outside this repository: `decisions/0135-a-parse-runs-in-its-own-process.md`).
Door 4 (`company/identify.py`) runs at identify; `/companies/pending` + `/confirm` handle only the
residual, and a confirm re-derives what it staled (facts → re-resolve → harvest). A transcript is
dated by the quarter its cover says it reports, not the fiscal year containing the call.
`brief/stated.py` admits a call figure only if it is a reported, point-in-time level with a fixed
period and no hedge. The parse runs in its own process, so the service keeps answering during a
400-page annual report.

**Demo moment:** Fresh workspace → drop IDFC FIRST Bank's two annual reports and three earnings
calls → click nothing. Watch the strip: identify binds *IDFC FIRST Bank · NSE: IDFCFIRSTB*. When it
settles, the head reads *banking · inferred from its filings · Change*. In *What changed*, NIM
6.64 → 6.36 opens on the Business-ratios page; GNPA carries the *stated* mark and opens on the
call's sentence. In *Business structure*, the segments reconcile to the note's printed total.
Closing line: *"we let the exchange vouch for who a company is, never a model's guess — and the
company's own words fill only what no filing covers."*

### F42 · A timeline that knows WHEN — and will not pin what a source only paraphrased · `[Library]` · **`built`**

**Why it matters (demo angle):** A company timeline looks trivial and is almost always wrong in two
quiet ways. A document is dated by its PDF's export stamp, which was WRONG for 15 of our 43 seed
documents. An event is dated by whatever period an extraction model wrote down, so *"declared an
interim dividend on October 16"* lands on 1 October. Ours draws a date only when a source PRINTED
it, and pins a company event only when its claim and a clause of the cited passage assert the same
whole thing: the same action, on the same object, by the same actor and organ, that actually
happened, on an exact day. *"Paid interest on June 30"* does not confirm *"paid its dividend"*.
*"Approved no dividend"* is not an approval. *"Completed before June 30"* is listed as a bound, not
pinned on the 30th. The demo line: *"every pin here is the event its claim names — and everything
we could not date is listed with the reason, not dropped."*

**How it works:** Phase-2 rung 13 (ADR
0126 (reference outside this repository: `decisions/0126-a-mark-on-a-time-axis-asserts-when-and-says-how-it-knows.md`), audited by
0127 (reference outside this repository: `decisions/0127-a-date-is-the-date-of-an-action-and-a-clause-says-which.md`) and
0128 (reference outside this repository: `decisions/0128-a-pin-asserts-the-whole-proposition.md`)). `ingestion/dateline.py` reads a
document's date off its opening page, and a call's date off its own title block, never its cover
letter's. Against a hand-read gold set it scores 0 WRONG (31 dates, 12 correct refusals, calls
21/21). `claims/when.py` binds the witness clause to the claim's argument. Three temporal objects
are told apart without colour: a **pin**, a counted **checkpoint** and a dashed **span** for a
period with no evidence, which is rung 7's gap and routes to its lead. No field or word links two
marks (*"Sequence, not causation"*), and the daily price lane beneath shares only the x axis.

**Demo moment:** Open `/library?workspaceId=ws-infosys-foundation` → *Timeline*. Point at the
owner lane: *Dividend payout · paid* on 30 June, *· declared* on 16 October, the December buyback.
Click a pin: the citation opens on the exact clause that states the date. Scroll to the list below
the axis: the 6 November buyback *approval* is `not_confirmed`, because the passage says the
ballot's *results were declared* that day, not that shareholders approved it. Click the Q1 FY26 span:
it takes you to the coverage-gap lead in *What deserves attention*. Closing line: *"a transcript's
call is dated by its own title block, not the letter that filed it a week later — and every date
on this axis opens on the line that prints it."*

### F41 · What deserves attention — and a judgment we refuse to honour over evidence we did not show you · `[Library]` · **`built`**

**Why it matters (demo angle):** Every research product has an alerts feed, and every one of them
ranks by a severity score somebody invented, then quietly forgets what you told it. Two things are
different here. **Leads are ordered by the recency of the evidence underneath them** — the record
decides what sits at the top, not our opinion of what matters, and the module says so. And **a
judgment sticks only over the evidence it was taken over**: mark a lead *not material* and that
decision is recorded against a digest of what was actually on your screen. Narrow your source scope
so the page no longer draws the whole lead and the form is not offered at all; change the record
underneath and the decision reopens itself rather than silently applying to something else. The
demo line: *"we will not let you dismiss something you were only shown half of."*

**How it works:** Phase-2 rung 12 (ADR
0122 (reference outside this repository: `decisions/0122-a-lead-is-a-cited-reason-to-look-and-a-judgment-sticks-only-over-what-it-saw.md`),
audited by 0123 (reference outside this repository: `decisions/0123-a-source-toggle-is-a-view-and-every-set-aside-comparison-is-counted.md`),
0124 (reference outside this repository: `decisions/0124-a-judgment-names-the-evidence-it-saw-and-the-boundary-measures-it.md`) and
0125 (reference outside this repository: `decisions/0125-a-receipt-is-a-property-of-the-thing-not-of-the-request.md`)). Leads are
computed from the claim comparator through ONE `is_one_thing` predicate that the evidence grid
reads too, so a pair of *different* measures sharing a concept counts toward neither side — the
repair for all 56 buckets the previous build called measurement gaps. An absence cites a
**procedure**, not the company: `provenance` XOR an `AbsenceReceipt`, and its unit is what is
absent, so one unheld filing is one lead listing every duty it would discharge. Decisions are
append-only in `finding_review_versions`; both arms of `POST /review/decisions` carry
`observedEvidence`, and the door takes its **own** covering measurement rather than quoting the
store's, refusing **409** over evidence that is not what was drawn. What was withheld is counted
per reason, so nothing disappears silently.

**Demo moment:** Open `/library?workspaceId=ws-infosys-foundation` → *What deserves attention*.
Seven leads, topped by the most recently-evidenced one, with a *See all* for the rest and a line
saying what was held back and why. Open a **coverage-gap** lead: it cites the directed review that
looked and came back empty — *"a review of these documents found no disclosure"* — never *"the
company did not disclose it"*. Now toggle one of its documents out of scope: the *not material*
button is gone, because the page is no longer showing the whole lead. Toggle it back, mark it not
material, and it moves to *Reviewed*. Closing line: *"the badge says how many decisions you owe and
how many are optional — and it is the same two numbers the inbox counts."*

### F39 · How the business divides — a share of the total the NOTE printed, and the gap it did not account for · `[Library]` · **`built`**

**Why it matters (demo angle):** Every "revenue by segment" chart makes the parts add up to 100%.
It does that by dividing by the sum of the parts, which fills every bar and erases whatever the
parts do not cover. It also puts a share and a growth rate side by side with nothing to stop the
analyst reading *"28%, +2.9%"* as *"the share grew 2.9%"*. And it matches last year to this year by
label, so an issuer that renamed a segment in its own report shows one segment vanishing and a new
one appearing. The demo line: *"these shares are of the total the company printed — and where the
parts don't reach it, we draw the gap instead of hiding it."*

**How it works:** Phase-2 rung 11b (ADR
0120 (reference outside this repository: `decisions/0120-a-share-is-of-the-printed-whole-and-a-delta-is-the-notes-own.md`), audited by
0121 (reference outside this repository: `decisions/0121-within-rounding-is-what-the-printed-figures-can-explain.md`)), built on the
segment facts of F38. A share divides by the total the segment note printed. The gap row is judged
at each figure's own printed precision, so rounding dust is *"adds up"* and a real difference is
drawn with its amount. Growth is taken only against the prior-year comparative the SAME note
printed. A comparative label no part carries is listed as a probable rename, never guessed. The
column says what its number IS (YoY % or Δ share in points), and every figure, including the prior
one the growth rate rests on, opens onto its cell (F36). Deterministic, with no model involved.

**Demo moment:** Open `/library?workspaceId=ws-hdfc-foundation` → *Business structure* → the FY2025
consolidated note from the disclosure list. *"Other banking business"* shows no growth, and the
page says why in plain text: *"The comparative names no part under the same label"*. The next
line shows that the FY2024 comparative calls it *"Other banking operations"* at the same figure.
Then open Infosys, where the tracks stop well short of full, and click any share's chip to land on
the note's own cell. Closing line: *"we'd rather show you a rename than invent a collapse."*

### F8 · Parallel multi-doc ingest with per-doc SSE progress · `[Library]` · **`built`**
**Why it matters (demo angle):** Drop in five annual reports at once and watch each one progress
independently — parsing, embedding, graphing — as parallel workers fan out. No queuing, no waiting for one
to finish before the next starts. The "upload everything at once" UX that analysts actually want.
**How it works:** `POST /documents/batch` persists all PDFs to disk, dispatches `ingest_documents_parallel`
as a FastAPI background task. The orchestrator uses `asyncio.gather` over per-doc workers (semaphore-capped),
each running `land → asyncio.gather(embed ∥ extract) → finalize`. A `ProgressHub` in-process pub/sub
fans `ProgressEvent`s to any connected `GET /documents/events` SSE streams (one per workspace). Advisory
locks on entity spine writes prevent concurrent documents from racing on the same entity (`hashtext(name)`
as lock key). The arq migration path is a one-afternoon mechanical refactor — same stage functions, swap
`asyncio.gather` for `enqueue_job`. See ADR 0026.
**Built (2026-06-27, ss7):** `ingestion/parallel.py` + `db/pool.py` + `llm/concurrency.py` +
`spine/autoseed.py` + `GET /documents/events` SSE route live — but with **zero frontend consumers**:
the Library UI still queued uploads one-at-a-time through a separate synchronous single-file
endpoint that never emitted SSE, so this feature was real on the backend and invisible in the demo.
**Built (2026-07-02, H2):** the frontend now drives this directly. The Library surface calls the
one unified `uploadLibraryDocuments` (a single file is a batch of one — the old synchronous endpoint
+ its divergent status vocabulary are gone) and subscribes to `GET /documents/events` via
`EventSource`; each row renders a live **6-segment per-stage strip** (parse/chunk/embed/extract/
resolve/graph) from the durable `stages`, with 1.5s polling as an automatic reconnect fallback. Two
robustness bugs only a live run surfaced, now fixed: a Windows event-loop issue that silently broke
every batch upload outside `--reload` (`app/__main__.py`), and a poll/DDL deadlock under concurrent
ingest (`ensure_schema`) — both invisible to the offline test suite.
**Refined (2026-07-05):** the connection harvest (clients/competitors/geographies) is now its own
durable stage (`harvest`, replacing a no-op `graph` marker) with its own SSE transition, instead of
hiding inside a still-pulsing `extract` segment — the strip's last segment now reflects genuine work.
The status pill's word (Reading/Indexing/Extracting/Connecting) is derived from whichever stage is
running, so it can never say something the strip disagrees with.
**Demo moment:** Upload three annual reports at once via the picker (single click, one multi-select)
→ the picker returns instantly, no blocking → watch three progress strips animate concurrently as
each doc transitions `parse → chunk → embed → extract → resolve → harvest`, landing Ready
independently — not one-at-a-time.

### F9 · Orbital knowledge graph — progressive disclosure by design · `[Library]` · **`built`**
**Why it matters (demo angle):** The default "Key positions" graph used to be a hairball — every
position fanned out from the center at once. The orbital view instead shows a **calm, three-zone
structure at rest** (company + sources at center, structural facts in a middle ring, themes as
outer "planets") and reveals the unbounded class — positions — only on demand, as **moons** the user
blooms per theme. It's the difference between "here is everything, good luck" and "here is the
shape of the thesis; drill in where you want." A visual answer to "won't this get unreadable with a
real corpus?"
**How it works:** A client-side `layoutGroup` classifier (`graph-utils.ts`) buckets every node into
center/middle/outer using edge topology, not just category (a company is only "central" if it
*sources* the `has_theme`/`has_segment` hierarchy — a company merely mentioned in a position stays
in the middle ring, so a competitor's own annual report doesn't hijack the hub). Zones are **elastic
bands** — a low-strength `forceRadial` *suggests* an orbit while charge/link/collision still jostle
nodes, so dragging a node lets it spring back rather than snapping to a rigid ring. Positions are
hidden by default and bloom from their theme's current position (not fly in from center) when a
theme is double-tapped or revealed from its card; any number of themes can stay open at once, each
revealed position keeping its full connectivity (theme + company + sources). See ADR 0029.
**Built (2026-07-03):** `graph-canvas.tsx` (radial + angular d3 forces, moon link tuning, greedy
label de-overlap, bloom seeding) + `graph-utils.ts` (`layoutGroup`/`primaryCompanyIds`/absolute
degree→radius bands/`buildOrbitalGraph`) + `library-store.ts` (multi-theme expand/reveal state).
**Refined same day (session 2):** double-tap now recenters on any node's neighborhood (not just
themes) at a calm mid-zoom instead of slamming to max zoom on a single dot; collapsing a theme now
correctly clears positions that were individually revealed from its card (a bug where the two
disclosure paths — bloom-all-via-theme vs. reveal-one-via-card — could desync); hovering a node adds
a third opacity tier so same-category siblings (e.g. other themes) stay faintly scannable instead of
fully washing out; center-zone classifier tightened to structural-hub-only, fixing a harvested
competitor company incorrectly rendering at the hub.
**Demo moment:** Open Key positions on a multi-document corpus → point out the calm three-zone
shape at rest → double-tap the "Growth" theme and watch its positions bloom outward from the theme,
not fly in from nowhere → double-tap a second theme to show multi-expand → hover a theme to show
its connections lock at full brightness while sibling themes stay dimly visible for comparison.

### F10 · Three-axis trust model — authority, confidence, corroboration kept separate · `[Library]` · **`built`**
**Why it matters (demo angle):** Skeptics ask "how do you know this is reliable?" as if there's one
answer. N4A's honest answer is that reliability isn't one number — *who said it* (authority), *how
cleanly it was extracted* (confidence), and *how many independent sources agree* (corroboration) are
three different questions that must never collapse into a single opaque score (invariant #9's
detect-don't-adjudicate posture applied to trust itself, not just contestation).
**How it works:** `app/graph/trust.py` computes extraction confidence at assemble time from
signals already on the claim — modality (`reported` scores higher than `opinion`), whether the
referent period was stated or defaulted, and numeric groundedness — clamped to `[0,1]` and rendered
as the node's **interior fill opacity** (a soft gate: a low-confidence node fades, it is never
hidden). Corroboration separately drives the `proposed`/`confirmed` ring style via one unified
promotion ladder (`promote()`) used by both positions and harvested entities, replacing two
previously-divergent rules. Confidence is a rebuildable *projection* — it is not a new `Claim`
field, so re-running assembly always reproduces it (invariant #7). See ADR 0027 §5.
**Built (2026-07-03):** `trust.py` (the three-axis model + promotion ladder) + `confidence` field
on `GraphNode` (zod + Pydantic, additive) + the entity harvester now emits its own per-mention
confidence (`harvest.py`) instead of a flat weight + `harvest_gold.py` (an offline precision gate,
11/11 cases, mirroring `claims/gold.py`'s posture for the harvester).
**Demo moment:** Point at a dashed-ring node (single-source, `proposed`) next to a solid-ring one
(`confirmed`) — different question from a node whose *interior* looks faded (low extraction
confidence) even though its ring might be solid. Two independent dials, both visible, neither
guessed by an LLM.

### F11 · Company-agnostic ingestion — content-based filer identity + presentation decks · `[Library]` · **`built`**
**Why it matters (demo angle):** The natural follow-up to F7 ("this only works because you tuned it
on Infosys/IT, right?") is *"okay, upload one of MY company's reports, live."* Before this fix, a
document from an unfamiliar company could attribute every claim to a company named after the PDF
**filename** (e.g. "Investor Update 26 Q2") — a visible, embarrassing failure if it happened on
stage. It also proves the pipeline handles more than annual reports: quarterly investor decks now
contribute real management commentary instead of ~nothing.
**How it works:** `app/ingestion/filer.py` reads the document's own cover for an
*"<X> Limited/Ltd"* pattern (Indian issuers name themselves this way) before falling back to the
filename; if that finds nothing, one grounded LLM pass fills the gap — but its answer is **rejected
unless it's verbatim in the document**, so a filer can never be invented (invariant #1). Separately,
investor-presentation decks get their own `DocKind` and a relaxed narrative digit-ratio gate (0.28 vs.
0.12) so their prose commentary reaches the claim extractor without admitting raw KPI tables (the
pipe-table guard still blocks those). See ADR 0030, ADR 0031.
**Built (2026-07-05):** diagnosed from a real user upload (`docs/archive/INGESTION-ROBUSTNESS-PLAN.md`) of
~5–6 documents from a company outside the seed corpus — one annual report silently vanished (a
separate NUL-byte crash fix, not itself a demo point), the rest extracted almost nothing and what did
land was attributed to a filename. Both root causes fixed; `services/ai` pytest 228 passed.
**Demo moment:** Upload a real annual report or investor deck from a company nobody has seen before
→ watch it land, attribute claims to the *actual* company name (not the PDF filename), and — if it's
a quarterly deck — surface real management commentary instead of one or two starved fragments.

### F13 · Geography/segment canonicalization in the connection layer · `[Library]` · **`built`**
**Why it matters (demo angle):** A knowledge graph that mints a separate node for "the US," "U.S.,"
and "United States" looks broken the moment someone clicks around it — the exact "wait, why are
there three nodes for the same country?" question a technical viewer would ask. Fixing it is a
credibility signal for the whole connection layer, not a cosmetic tweak.
**How it works:** `app/graph/harvest.py`'s `refine_mention` runs every geography/segment mention
through a canonicalizer before it's harvested: a ~32-place gazetteer (`_GEO_GAZETTEER`) rewrites known
variants to one label and carries their aliases onto the minted entity so they merge on the spine;
a place *outside* the gazetteer only survives if the source quote actually uses it locatively
(`_looks_locative` — a preposition like "in"/"across" or a market/region/operations head noun), so a
city or office name doesn't get mistaken for a market. Segment mentions run through `normalize_segment`,
which strips noise suffixes ("… vertical," "… segment") and drops mentions that reduce to a bare
capability buzzword ("Generative AI," "Cloud") rather than an actual business line. Offline-scored by
`harvest_gold.py`'s gold gate (11/11 + 7 new refinement cases, no DB/provider key needed).
**Demo moment:** Point at a company mentioned operating in "the US" in one filing and "United States"
in another — show the graph has **one** geography node, not two — then contrast with a raw-LLM
extraction that wouldn't have caught the merge.

### F28 · A filing becomes a business-model map — every connection shows *why* it's trusted · `[Library]` · **`built`**
**Why it matters (demo angle):** Most "knowledge graphs" over filings are extraction topologies — a
tangle of co-occurrence edges with no way to tell a company's *audited* segment split from a name that
happened to appear in the same sentence. N4A's connection layer answers the analyst's real question —
*"who are this company's segments, geographies, clients, competitors, regulators, subsidiaries — and
should I believe each one?"* — and shows the **basis** on every edge, so trust isn't a vibe. It's the
proof point for "this is analyst infrastructure, not a demo graph." India-specific: the highest-trust
edges come straight from the **mandated Ind AS 108 / AS-17 segment and revenue-by-geography
disclosures** every Indian AR must carry.
**How it works:** Harvest runs two lanes (ADR 0054). A **deterministic disclosure lane**
(`app/graph/disclosures.py`) reads the mandated segment/geography notes with **zero LLM calls** and
mints `reported` edges — segment names taken from the note's *defining enumeration*, not generic table
rows. A **planner-selected LLM lane** finds relationships in prose; a second deterministic gate
(`app/graph/relational.py::classify_relationship`) then computes, from the already-grounded quote,
whether the sentence actually **states** the relationship (`explicit`) or merely name-drops it
(`co-mentioned`). Only `reported`/`explicit` edges go live; a `co-mentioned` name-drop stays a
**review lead** and never renders as a solid edge (the "the likes of HCLTech…" case). Every edge
carries its own verbatim quote and its **atoms** — how many mentions, distinct *voices*, distinct
documents, and the top source authority backed it (D63) — instead of a made-up confidence number.
`uv run python -m app.graph.harvest --show` prints it as a business-model map per company, bucketed and
in a fixed reading order. Guarded by the `relations` eval gate (recall 13/15, per-kind precision, the
D67 authoring-free invariant scans), with **no company name in any production code path**.
**Demo moment:** Run `--show` on an ingested Infosys + HDFC. Show a bank's **Retail / Wholesale**
segments reading `reported · mandated disclosure` with the audited note's quote; show `Infosys →
competes → TCS` reading `explicit · stated in prose` on "…your peer, TCS…"; then show that a passing
"the likes of HCLTech" did **not** become an edge — it's sitting in review. Three tiers of trust,
computed, on one screen.

### F29 · Held-out proof: two untuned companies, ingested blind, clean · `[Cross-cutting]` · **`built`**
**Why it matters (demo angle):** This is the **receipt** behind F7. "It's sector-general" is an
assertion; *"here is what happened when we pointed it at two companies it had never seen"* is evidence,
and it's the answer to the most damaging skeptical question a viewer has. It also demonstrates the
posture that separates research infrastructure from a demo: on the one document it genuinely could not
read, the system **refused rather than guessed**.
**How it works:** D68 (ADR 0054) is a blind held-out protocol, not a spot check. TCS + ICICI FY25-26
annual reports were ingested into an isolated workspace sourced from a **separate directory** — the
connector uses `rglob`, so flat staging would have silently leaked the tuned corpus and destroyed the
blind property. The case set was authored from the ARs' own disclosures *before* running (zero-shot
rule). Both documents ran parse → chunk → embed → extract → resolve → harvest in **765s**, producing 86
nodes and 66 relations, and **all four D67 invariant scans came back clean on a workspace nobody
designed for them** (`duplicate_entity 0 · generic_noun 0 · self_edge 0 · mistyped_geography 0`). The
defects that *do* exist are typed and visible rather than silent: three fuzzy same-entity candidates
surfaced as review leads below the auto-merge bar, and one passport sits at `needs_confirmation`. The
headline is the filer: TCS's Integrated Annual Report never writes "<Company> Limited" on its cover, and
an earlier build anchored it on a hallucinated *"Practitioners' Limited"*. Now the deterministic
detector correctly finds **no** candidate, the grounded LLM pass **also declines**, and a title→spine
alias fallback resolves the real `tcs` entity — 51 relations correctly anchored.
**Demo moment:** When asked "isn't this tuned for Infosys?", show the D68 numbers, then tell the TCS
cover-page story: *refuse-then-fall-back beat guess-confidently.* Land it on the honest limit — the
deterministic detector still has no coverage for that cover shape, and we know it, which is why the
fallback exists.

## Dashboard

### F6 · ₹ lakh/crore-aware screener · `[Dashboard]` · `built`
**Why it matters (demo angle):** Small detail, big credibility with an Indian-market audience — the company
page parses and formats ₹ lakh/crore correctly, uses NSE/BSE tickers and IST, where a generic tool would
mangle them. Signals the product was built *for* this market, not localized as an afterthought.
**How it works:** Indian-market correctness is a non-negotiable invariant (5): `apps/web/app/dashboard/format.ts`
formats monetary values in lakh/crore with en-IN digit grouping (tested, `format.test.ts`);
`services/ai/app/dashboard/kpi.py`'s `_indian_grouping` mirrors it server-side for Ask-N4A answer text;
`statements.py`'s `fiscal_year_label`/`quarter_label` derive Indian-FY labels (Dec-enders get `CY`, never
forced to March); all fetch timestamps are IST (`Asia/Kolkata`). Market data via the connector registry
(yfinance, `app/ingestion/connectors/yfinance_market.py`, ADR 0008). See `ARCHITECTURE.md §9` invariant 5.
**Demo moment:** Open a company's statement table and point out the ₹ crore formatting, the "fetched
&lt;date&gt;" IST stamp, and — for a December year-ender if one's in the corpus — the `CY` label instead of a
wrongly-forced `FY`.

### F33 · The filed number, cited to its cell — and the record caught disagreeing with itself · `[Dashboard]` · **`built`**
**Why it matters (demo angle):** Every competitor shows you a number. This shows you **where on the page it
came from** — the row label, the column label and the verbatim text of the cell — and, when two audited
filings state the same measurement differently, it **shows you both instead of picking one**. That second
half is the demo that cannot be faked by a spreadsheet with an LLM on top: the system found a real ₹6,025
crore restatement in HDFC Bank's own reports, and it distinguishes that from mere rounding, because it
knows the precision each source printed to. There is **no model anywhere in this path** — a cell's meaning
is its coordinates, so a model here would be a guessing layer over data we can read exactly.
**How it works:** `app/facts/` reads the results/KPI lane deterministically → immutable `fact_mentions`
(each anchored to a **cell**: coordinate *plus* verbatim row/column/value text, because a re-parse moves
coordinates) → `fact_versions` → an atomic swap into `active_facts`. Scope is a **router**, not an
intention: every table of a results filing, but only an annual report's **named statements** — HDFC's AR
offers 717 tables and 31 are admitted. A cell whose column states no period, whose unit the line item does
not have, or whose label the vocabulary does not name is **refused with a persisted reason**, never
guessed, so `figure_cells == kept + rejected + notes_dropped` holds per table. Each fact stores the
**printed precision** it was read at (`value_step`), so `33.6%` and `34%` collapse as one reading while
`33%` and `34%` stay a real disagreement — and agreement is judged across the **whole** group, because it
is a tolerance and does not chain.
**Demo moment:** ask *"HDFC Bank advances FY2024"*. The answer leads with **₹25,65,891 crore**, then says
*"The record does not state this once: ₹25,71,917 crore"* — two audited annual reports, ₹6,025 crore apart,
both cited. Then ask for the CASA ratio and note it answers **`33.6%`**, not `33.60%`: it prints what the
filing printed. Finally, switch every source off and ask again — it **declines**, on the numeric and the
findings routes alike.
**Built (2026-08-30, Phase-2 rungs 6b/6c/6d, ADR 0088–0093):** **508** facts across **4 issuers / 2
sectors**, two of which own no results document; **30/30** gold figures read off the page; **0** guessed
periods; **0** incomplete anchors; **37/37** landed facts reachable through `answer_question` itself, cited
only to the scoped document. **What it does NOT do:** the citation *names* the cell, it does not open the
PDF at it — no document viewer is built. And Ask cannot yet read a calendar-dated period label
(`Year ended March 31, 2024`), which is **9 of the 63** period words our own citations show; the gap is
declared and gated, not silent.


### F12 · Cited financial facts + deterministic Ask-N4A KPI answers · `[Dashboard]` · `built`
**Why it matters (demo angle):** The Dashboard's actual moat argument (ADR 0033), made concrete: Screener.in's
cells are dead ends, ours aren't, and — unlike an LLM bolted onto a spreadsheet — every number is
**deterministic**, never hallucinated. Pre-empts "how do I know this number is real?"
**How it works:** A yfinance statement fetch lands as a real **L0 artifact** (bytes on disk + `sources`/
`documents` rows, `services/ai/app/dashboard/statements.py::land_snapshot`) before a conservative field
mapper (`map_snapshot_to_facts`) turns it into `fact_versions` rows — each carrying a `Citation` that resolves
to that stored snapshot. The company page's statement tables project those facts (`statement_table`), so
every cell has a citation popover. Ask-N4A's `structured_kpi` route (previously an honest decline,
`app/retrieval/router.py` + `app/dashboard/kpi.py`) now answers "What was Infosys revenue in FY2025?"
straight from `active_facts` — regex-matched line item + period, zero LLM in the numeric path — and cites
the same snapshot. A miss with a hard numeric cue ("exact", "%") still declines rather than guessing from
prose. **Superseded in substance by F33 (2026-08-30):** `fin_facts` was dropped at rung 6a-ii, the vendor
lane now writes `fact_versions` → `active_facts` beside the FILED lane, and the demo figure to lead with is
a filed one cited to its cell — not a vendor snapshot.
**Demo moment:** Click a statement cell's citation → the vendor snapshot. Then ask Ask-N4A the same figure
in words and show the identical cited number come back, next to a narrative citation from the Library on
another question — same trust model, two data lanes.

### F14 · Browse freely, curate deliberately (Dashboard KB opt-in) · `[Dashboard]` · **`built`**
**Why it matters (demo angle):** Undercuts the natural worry about any "AI that ingests everything you
look at" — here, *looking* is free. A research workspace should reflect what an analyst decided
mattered, not everywhere their cursor happened to land. It's also a concrete instance of invariant
#6 (the user's judgment is first-class): the KB is *curated*, not scraped.
**How it works:** `app/dashboard/instruments.py` splits identity into a read-only `resolve_entity`
(backs every `GET` — search, overview, statements preview) and a write-only `ensure_entity`, called
from exactly one place: `POST /dashboard/company/{isin}/kb` (`routers/dashboard.py`, whose module
docstring states the rule — "GET never writes the knowledge base"). That one endpoint lands the
entity, the statement facts, the derived ratios, and the lens-bridge claims together; `DELETE .../kb`
tears the same set back down. `CompanyOverview.kb` reports read-only membership (`inKb`, fact/claim
counts) so the UI can show "not in your knowledge base yet" honestly.
**Demo moment:** Search and open several companies, showing the Library graph stays untouched — then
open Statements on the one you're actually researching and click **"Add to knowledge base"**: the
vendor source card and computed-tier positions appear immediately in the Library graph.

## Canvas

### F15 · Wire sources into an AI node, watch the scope BE the citation · `[Canvas]` · `built`
**Why it matters (demo angle):** The Canvas's core differentiator vs. Library's Ask (`CANVAS-PLAN.md`
§1 J1): the analyst *composes the scope by hand* by drawing edges, and that wiring diagram doubles
as the audit trail — no separate "what did it read" question to answer, the graph already shows it.
Also demonstrates the same provenance discipline (invariant #1) extending to a brand-new surface on
day one, not bolted on later.
**How it works:** A `source` node's `context` edge into an `ai` node's context port is the *entire*
scope declaration — `resolveScope` (`services/ai/app/canvas/run.py`) reads exactly the directly-wired
documents, one-hop only (ADR 0034), and passes them as `AskRequest.scope.docIds` into the same kernel
`/ask` already uses. When ≥2 documents are wired, `balance_docs` retrieves per-document instead of
global top-k, so a "contrast these two calls" task can't have one document dominate the context.
Unwiring a source flips the node to a `stale` chip live; the run endpoint streams over SSE
(`POST /canvases/{id}/nodes/{nodeId}/run`) with citation chips reusing the Library's evidence viewer.
**Demo moment:** Drag two earnings-call transcripts onto the canvas, wire both into one `ai` node, ask
it to contrast management's margin commentary — watch the streamed answer cite both sources. Then
unwire one, hit re-run, and show the answer (and its citations) shrink to just the remaining source —
the wiring diagram *is* what changed.

### F16 · Sources → AI → cited table, every cell carrying its quote · `[Canvas]` · `built`
**Why it matters (demo angle):** Analysts think in grids, not paragraphs (the Hebbia Matrix lesson,
`CANVAS-PLAN.md` §2/J2) — a cited table is worth ten cited paragraphs. The differentiator is that the
provenance is **per-cell**: click any value and see the exact source passage it came from, so a
comparison grid is auditable at the granularity you actually reason at.
**How it works:** `app/canvas/table_run.py` asks the model for STRICT JSON (`columns` +
`{value, citations}` cells), validates it against the `TablePayload` contract with **one repair
round**, and a still-failing contract is a *visible node error*, never a best-effort render. Cells may
only cite the `[C#]` markers the model was handed; a row whose every cell fails citation validation is
**dropped** (an ungrounded row is a fabrication risk), and if nothing survives, the run **declines**
rather than land an anonymous table — invariant #1, enforced down to the DB CHECK.
**Demo moment:** Wire two earnings calls into an `ai` node, flip its output to `table`, ask "every deal
win ≥ ₹500cr mentioned, one row per deal, with the quote." Get a sortable grid; click a cell → the
evidence viewer opens on the exact sentence. Note there's no row you can't trace.

### F17 · The Excel node: a living model the AI edits, versioned and audited · `[Canvas]` · `built`
**Why it matters (demo angle):** This is J3 — model work, the daily reality of an analyst — and it's
where most AI tools get the trust posture wrong (silent mutation, or a static file the AI only
comments on). Ours treats the workbook as a **living document**: the AI *directly edits* the sheet, but
every turn lands a new immutable version (one-click revert) plus a `changeset` audit, and
source-grounded edits carry the citation. It's the conservative first answer to "how much may the AI
write" — write freely, but only ever as a new revertible version (ADR 0035).
**How it works:** The Excel node is backed by its own versioned `workbooks` store (not the Library — an
.xlsx is a model, not a research source). A node-scoped **agent** (`app/canvas/excel/assistant.py`) is
the first profile over a generic bounded tool-calling loop (`app/llm/agent.py` — tool-calling is now
the router's third capability beside embed/complete); deterministic openpyxl `ops.py` does the actual
cell work while the model only makes judgments. The assistant can also `search_sources` over the node's
1-hop wired scope — so an edit can be grounded in a connected transcript.
**Demo moment:** Open a real working model, wire in the earnings call, and ask "update FY26E revenue
growth to management's guidance." Watch it locate the guidance (cited), edit the cell, and land a new
version — then revert it in one click to prove the original is intact.

### F18 · The Document node: a living memo the AI co-authors, citations chain to L0 · `[Canvas]` · `built`
**Why it matters (demo angle):** This is the deliverable analysts actually produce — a memo, not a
grid — and it closes the trust loop the hardest way: the AI writes *prose*, yet every factual
sentence still resolves to a source. A technical audience notices the depth here: a citation in the
memo can point at an upstream **table cell**, whose own citation points at a transcript passage —
click through and the chain holds two hops deep. It also demonstrates the co-authorship posture: ask
for edits and it works around your hand-written sections, never silently rewriting them.
**How it works:** The outline and every section's content live in node params (analyst-owned,
autosaved like sticky text); the assistant (`document_assistant.py`, agent profile #2) exposes
`add_section`/`move_section`/`delete_section`/`set_document_title`/`write_section`/`read_source` over
a bounded tool loop. `write_section` **rejects** any content that resolves no `[C#]` marker while the
turn's citation palette has entries — an in-band `ToolExecutionError` the model self-repairs from,
observed live. An upstream artifact's own citation, when cited, expands to *its* source-resolving
citations (invariant #7 chains). Staleness is a derived alert from `consumed` producer freshness —
never auto-recomputed. See ADR 0036/0038.
**Demo moment:** Wire a cited table and an AI-node transcript summary into a Document node, ask the
assistant to "build a two-section thesis memo from these" — watch it plan the outline, create both
sections, draft cited content, and verify itself before finishing. Click a citation in the memo,
then click through its source table cell's own citation, to the original transcript line. Re-run the
upstream table and reload the document — see exactly the section that consumed it flagged stale.

### F19 · Deterministic Word round-trip — export a real .docx, or mirror a reference report · `[Canvas]` · `built`
**Why it matters (demo angle):** Analysts live in Word, not markdown — "can I actually send this" is
the natural next question after F18. The round-trip is **deterministic** (no LLM in the conversion),
so formatting fidelity is guaranteed rather than a model's best guess, and importing a firm's own
report template lets the AI mirror its structure instead of inventing one.
**How it works:** `docx_io.py` (python-docx, no LLM) maps the supported markdown subset to native
Word styles on export — document title → Title style, sections → Heading 1, each cited section
closes with a small-italics Sources line — and parses Title/Heading structure back into sections on
import (`.docx` or `.md`), splitting any oversized section at a block boundary under the param cap.
An import lands as a full-replacement `document` artifact (`model_id="import"`) in the same
versioned audit chain an AI turn uses — restorable, never a silent overwrite. The node also renders
markdown natively (`markdown.tsx`, React-elements-only, no `innerHTML`) so what's on screen already
matches what exports.
**Demo moment:** Export a drafted memo to `.docx` and open it in Word to show real headings, bold
figures, and a formatted comparison table — then import a firm's own report template and ask the
assistant to draft a new section that matches its section structure and tone.

### F20 · Cited numbers from a source with zero readable text · `[Canvas]` · `built`
**Why it matters (demo angle):** A vendor market-data card (Dashboard's yfinance connector, ADR
0033) has **no text chunks at all** — it's structured JSON, not a parsed document, so semantic
search literally cannot see inside it. A real user test wired one into the Excel node and asked
for a Net Income table; the agent honestly reported it found nothing, which was itself the
tell — the fix (`get_filed_figures` unioning `claims` with the measurement store, L1's
measurement-shaped table) means the agent now reaches the SAME structured store the Dashboard's own KPI answers use,
with the SAME citation discipline, whether or not there's a sentence to quote.
**How it works:** `app/canvas/figures.py` (new) queries `claims` (assertions — margins, growth)
and `active_facts` (measurements — revenue, net income, EPS; `fin_facts` was dropped at rung 6a-ii,
ADR 0087) under one doc-scoped WHERE clause and
merges the results; each figure returns with its stored `Citation[]` resolving to the L0 vendor
snapshot (invariant #7). A two-pass match (exact-all-words, then a ranked any-word widen) means
an analyst's own phrasing ("net revenue") still finds the vendor's stored label ("Total revenue")
instead of a false empty. See ADR 0039.
**Demo moment:** Wire the plain Yahoo Finance card (no annual report, no PDF) into an Excel node
and ask for a 3-year Net Income / Revenue / margin table — watch it land real numbers with
citations, then point out there is no text anywhere in that source to have "read."

### F21 · The agent verifies its own spreadsheet math · `[Canvas]` · `built`
**Why it matters (demo angle):** LLMs writing spreadsheet formulas by hand is a known
transposition-error trap — a live test caught the default model referencing the WRONG cell one
column over (`D4` pointed at `B4` instead of `C4`): syntactically perfect, silently wrong, the
exact failure mode a skeptical finance audience worries about most. Two independent fixes close
it: a deterministic fill-handle tool removes the hand-copying entirely, and a mid-turn recalc
lets the agent check its OWN work before claiming done.
**How it works:** `fill_range` (openpyxl's `Translator`) tiles a formula pattern across a target
range with relative references walked and `$`-absolute references pinned — no cell is
individually re-derived by the model. `recalc_and_read` round-trips the turn's in-memory workbook
through a real LibreOffice recalc and reads back COMPUTED values (flagging any `#REF!`/`#DIV/0!`
cell by address) — registered only when the recalc engine is present, so the tool never appears
somewhere it can't work. Both are server-side only (no install burden on the end user).
**Demo moment:** Ask the Excel node to extend a growth projection three more year-columns, then
ask it to verify — watch the trace show `fill_range` then `recalc_and_read`, and open the file to
confirm the formula chain (`=C4*(1+$B$1)`, `=D4*(1+$B$1)`, …) references correctly.

### F22 · Focus views + clickable provenance — the analyst's desk, not postcards · `[Canvas]` · `built`
**Why it matters (demo angle):** The canvas's wiring (ports, edges, staleness, cited runs) was
already expert-grade, but every document on it lived in a ~300px card — real work (reading a memo,
scanning a model, checking a source) didn't fit. C8 gives each node a full-viewport **focus view**
built from the *same* store as the card (no forked state), so the desk finally has desk-sized
surfaces. Paired with it, citations stop being an always-on noisy chip row and become a **progressive
grammar** (ADR 0040): the inline `[n]` marker in the AI's own prose is the clickable primary
affordance, containers collapse to a quiet `cited · N` pill, and — the load-bearing guarantee —
zero-citation AI content still shows a *loud* warning, so quieting evidence can never hide *missing*
evidence.
**How it works:** one overlay mechanism (`focus-overlay.tsx`) renders a per-type body — document
(section sidebar + a Preview tab with Word-style endnotes), Excel (a desk-sized grid with **direct
cell editing** landing as versioned edit sessions, ADR 0041), source (a selectable, locator-anchored
text layer via `GET /documents/{id}/file` + `/pages`, built highlight-ready for future Notes), plus
ai/table/chart. A layered Esc stack peels evidence → typing → overlay one level at a time; a running
stream survives open/close. Clickable markers resolve to the same chunk → L0 trail the Library uses —
provenance is unchanged data, only its *display* is progressive. See ADR 0040/0041, `CANVAS-PLAN.md`
§7.
**Demo moment:** On a busy canvas, open a Document node into focus — read the memo full-width, click
a `[2]` in a sentence to pop its source chunk in the sidebar; switch to the Excel node, type a new
assumption straight into a cell and press Done to land one revertable version; press Esc twice to
land back on the canvas exactly where you were.

### F47 · One switch, everywhere — the saved scope · `[Cross-cutting]` · **`built`**

**Why it matters (demo angle):** Every research tool has a "filter" that lives in one tab and dies on
reload. An analyst who switches a broker note off the brief and then asks the Graph a question
gets an answer that still read it. Ours is **one saved scope per workspace**: the Library and the
Graph write it, every door that answers reads it, and Canvas shows it **quietly** (a mark on the
Source node and on a citation) without ever filtering by it, because a wire decides what a step
reads.

**How it works:** ADR 0148 (reference outside this repository: `decisions/0148-canvas-is-where-the-work-happens-one-saved-scope-read-never-obeyed.md`).
`scope_exclusions` rows written as deltas (`PATCH /scope`), so a stale second tab cannot undo the
first one's toggle; the client sends the scope, no door reads the saved object, and nothing goes out
until the scope is known. A canvas opens in the workspace the URL names, on the most recently updated
board (one advisory-locked door), and starts blank. Instrument: `app.eval.scope_probe` — flips a real
document through one client, reads it through a fresh one, restores the analyst's exact state, and
replays today's browser-memory scope to prove the gate can fire.

**Demo moment:** switch one filing off in `/library`, open `/graph` in a second window — it is off
there with no reload; open `/canvas` — the Source node wears the quiet mark and the inspector says
what it means.

### F48 · Continue an Ask on Canvas — chained by evidence, metered to the cent · `[Canvas]` · **`built`**

**Why it matters (demo angle):** The Graph answers a question; the work happens on a board. **Continue
on Canvas** moves the chat, with every turn, into an Ask node that follows up with the same
machinery. Wire it (or any AI step) into another step and the downstream step reads the upstream's
**evidence**, not just its words: each upstream citation becomes a context block carrying the
original page, so the downstream can only cite filings. The answer leads with 1–4 checked sentences
(filed · attributed · N4A's reading with its falsifier), and every AI node carries a quiet meter of
the tokens and dollars its calls cost, from the provider's own usage report.

**How it works:** ADR 0150 (reference outside this repository: `decisions/0150-one-model-catalogue-a-two-control-picker-and-gpt-6-1-sol.md`),
0151 (reference outside this repository: `decisions/0151-an-ask-answers-first-in-checked-sentences.md`),
0152 (reference outside this repository: `decisions/0152-canvas-work-is-metered-chained-by-evidence-and-pans-like-a-page.md`),
0153 (reference outside this repository: `decisions/0153-work-in-flight-belongs-to-where-it-started.md`). One catalogue file
(`models.toml`) drives the picker (model + reasoning effort), pricing and the pin check, so adding a
model is one edit. A carried citation is re-read from the store before it is shown; withdrawn
support is said, never cited. Instruments: `canvas_work_probe` (G1–G6).

**Demo moment:** ask the Graph why NIM moved → *Continue on Canvas* → follow up on the board → wire
it into a memo and read its citations opening onto the filing's own pages → open the node's usage.

### F49 · Canvas files — read where wired, speaks nowhere else · `[Canvas]` · **`built`**

**Why it matters (demo angle):** Analysts keep scratch material they would never publish into a
company's record: a draft note, a half-read deck. Dropping it on a board makes it citable by that
board's steps and **invisible to everything else**: no brief count, no lead, no Graph node, no
claim. *Add to Library* promotes the same document in place (same id, same chunks), so the
citations already made stay valid. A peer company's file is refused, naming both companies.

**How it works:** ADR 0149 (reference outside this repository: `decisions/0149-a-canvas-file-is-a-workspace-document-that-can-be-read-but-does-not-speak.md`),
0153 (reference outside this repository: `decisions/0153-work-in-flight-belongs-to-where-it-started.md`). `documents` became a VIEW that
filters out `standing='canvas'` rows, so a reader that forgets canvas files fails closed;
lifecycle writers and addressed reads name `all_documents` by an allow-list the probe greps. A
fencing ticket makes a read that outlives its document (a delete) write nothing. Word and text
arrive through a LibreOffice rendition. Instrument: `canvas_files_probe` (G1–G4, including a real
delete-while-reading race).

**Demo moment:** drag a PDF onto a board → *Reading* → *Canvas only* → wire it into a step and read
the cited page → open the Library: the count has not moved; its *Canvas files* section lists it.

## Notes
_No entries yet._

## Connectors
_No entries yet._

## Cross-cutting — later waves

> Same surface as **Cross-cutting** above; kept as a second section so a later wave's entries stay
> readable in date order. The **Index** is the single list — if an entry is in one section and not
> the Index, the Index is the bug.

### F23 · We measure our own extraction's honesty — a no-fabrication trust floor · `[Cross-cutting]` · `built`
**Why it matters (demo angle):** This is a **Q&A-prep** proof point, not a stage moment — the answer to the
single hardest question a seasoned analyst or investor asks any AI research tool: *"How do I know it isn't
making things up?"* Most tools have no honest answer. N4A does: we **measure** it. The strongest form of the
claim is the inverse of hallucination — when a passage states *nothing an analyst would track* (a customer
testimonial, a signature block, an accounting-policy note), the extractor must produce **nothing**. We hold a
labelled trust floor to exactly that, plus number-grounding (a claim's figure must appear in its cited span)
and temporal sanity (a defaulted period can't land in the future). It reframes "trust me" into "here's the
scorecard."
**How it works:** The Library-rework 1A `app/eval` scorecard (`uv run python -m app.eval`) is built on one
discipline — **enumerate expected answers only where they're stable; otherwise *observe***. So it pairs a
deterministic **claims-live trust floor** (no-fabrication / number-grounding / temporal-sanity — invariants
that survive any future redefinition of a "claim") with an **exemplars** row that runs *real analyst
questions* end-to-end through the live Ask pipeline and hands the sourced answers to a human to judge — no
brittle answer key to game. Honest states throughout: a missing key or store makes a suite skip **loudly**,
never fake a green (the same posture the product itself takes — an honest decline over a confident wrong
answer). See `services/ai/app/eval/`, ADR 0042; pairs with the provenance proof point (F4) and computed-not-
guessed contestation (F1, invariant #9).
**Demo moment:** Reserve for Q&A. If pushed on hallucination, show the scorecard: point at the *no-fabrication*
row (a testimonial passage → zero claims) and the *exemplars* row (a real "what's Infosys's AI story?" answer,
cited). Frame it: *"We don't ask you to trust the model — we measure where it would lie, and we watch it."*
(Not for the happy-path walkthrough; it's the credibility card for a skeptical room.)

### F24 · A broker note can never become audited evidence — authority is captured, not guessed · `[Cross-cutting]` · `built`
**Why it matters (demo angle):** Every AI research tool says it "reads your documents." Ask one question and
most of them fall over: *does it know the difference between an audited annual report and a sell-side note
talking its own book?* An analyst does — it's most of the job. If a system treats both as "a document," its
confidence is worthless, and its "three sources agree" is a sentence about nothing. N4A fixes a source's
identity **at the front door**: a document enters through a typed section (Annual Reports · Results ·
Transcripts · Analyst Reports · News · …), and that section — asserted by the analyst, not guessed by a
classifier — deterministically fixes its **kind, class, and authority tier**. A broker note is
`broker_research` and *cannot* become `audited_filing`; there is no code path that does it. The companion
half is quieter and sharper: a document's identity is its **content hash**, so the same PDF uploaded twice
under two names is **one** source — it can't be counted as two independent confirmations of itself. That's
the failure mode nobody demos, because most systems have it.
**How it works:** Library-rework 1B (ADR 0043). One mapping table (`app/ingestion/passport.py`) is the only
producer of kind/class/authority — the old `sourceType="filing"` upload default and the
`_AUTHORITY_BY_SOURCE` lookup that made it audited evidence are **deleted**, not deprecated. Authority flows
to every claim from the document's passport, so the tier on a claim traces to an asserted fact about the
source, not an inference. Unknown filings default **down** to a new lowest tier `unverified` + a
needs-confirmation chip (precision-first: unknown is untrusted, D4/D20). Passports are visible and editable
per row, and an edit re-stamps the affected claims' tiers in the same transaction — no stranded stale
authority. Proven by the `authority` eval suite, which was **red by design** before this slice (tier 3/9,
kind 0/9, class 0/9) and is now a **green gate** (9/9 / 9/9 / 9/9), with a regression test that re-reds it
if the old lookup ever regrows. The same-day hardening pass (D27–D29) made the promises *structural*:
one-artifact identity is a **unique database index** (not a lookup a future writer could skip), every upload
attempt leaves a durable `acquisitions` record (where the bytes kept coming from), issuer names resolve to
**one spine identity** so "HDFC Bank" / "HDFC Bank Ltd" can't count as separate voices — and the passport
only claims `verified` when the analyst actually reviewed every field (`section_asserted` in between).
Pairs with F1 (computed contestation — which is only meaningful if source
authority is real) and F4 (provenance).
**Demo moment:** Upload a broker note and an annual report in one gesture, filing each into its own section
— the rows come back wearing different authority. Then re-upload the annual report under a different
filename: it doesn't duplicate, it reports *"already in Annual Reports as '…'"*. Land the line: *"Two copies
of one PDF are not two sources. Most tools would have just told you three sources agree."*

### F25 · Honest failure states + change receipts — the pipeline never lies about itself · `[Cross-cutting]` · `built`
**Why it matters (demo angle):** The question every AI-research skeptic should ask is *"what happens when it
breaks?"* — because in most tools the answer is a silent green checkmark over missing data. N4A's answer is
structural: a document's status is **derived** from its per-layer states and cannot be independently written,
so `ready` *means* every layer landed; a layer that produced a real zero (`done_zero`) is distinguishable
from one skipped for a missing key (`skipped_no_provider`) and from one that broke (`failed`, with the reason
on the badge and a one-click retry). A failed re-run **keeps the last good result active** — the analyst
never trades working research for a broken attempt. And when a source's *identity* is corrected (the wrong
company on a passport), the claims extracted under the wrong identity are **quarantined immediately** — they
stop feeding Ask, the graph, and Canvas that instant, rather than lingering behind a warning badge.
**How it works:** Library-rework 1C (ADR 0045, D30–D33). Every derived layer writes through run tables; a
re-run stages invisibly and flips active in one atomic transaction (advisory lock + a partial unique index no
writer can bypass), storing a **change receipt** (added/revised/removed) at activation. The D33 sensitivity
map grades passport corrections: a date fix costs a cheap LLM-free re-resolve; an issuer-identity change
stales the extraction itself (the prompt consumed the wrong identity) and quarantines its output. Re-resolves
make **zero** extraction-provider calls — saved mentions × a content-addressed spine snapshot, with the one
nondeterministic verdict memoized. Pairs with F23 (we measure our own extraction) and F24 (authority at the
front door): together they answer *"why should I trust this?"* at the source, the extraction, and the
lifecycle level.
**Demo moment:** Yank the API key and re-run a layer — the document lands `Partial` with the reason on the
badge and the previous good claims still serving. Then fix a passport's published date, watch `resolve` go
`stale` with a retry chip, click it, and read the receipt: *"revised: 1 — the claim's period re-derived under
the corrected date."* Land the line: *"It didn't re-read the document to fix that — and it will never show
you a green checkmark it can't back."*

### F26 · Citations name *where in the filing* — not just a page · `[Cross-cutting]` · `built`
**Why it matters (demo angle):** "Page 187 of a 370-page annual report" is a location, not evidence. An
analyst's very next question is *what part of the filing is this?* — because a number from the **audited
financial statements** carries different weight from the same number in **MD&A** narrative, a **broker's**
estimate, or the **AGM notice** back matter. N4A's citations answer that in the chip itself:
`AR FY25 · Auditor's Report · p.187`, `AR FY25 · AGM Notice · p.369–370`, `DOC · Q&A · p.11–12`. It also
quietly fixes two things demo audiences catch: the Indian **fiscal year is named by its end** (an FY 2024-25
filing is FY25, not FY24), and a chunk that spans a page break cites the **range** rather than pretending to
sit on one page.
**How it works:** Library-rework 1D (ADR 0046/0047/0048). Parsing emits typed **elements** instead of page
blobs, and a merged-evidence **section tree** (PDF outline + printed contents page + guarded in-page
headings) maps each section onto a controlled class vocabulary. Chunks became **views** over those elements
— grouped, never windowed — so a chunk never straddles a section boundary and inherits exactly one section
path. The locator is minted at ingest, so every consumer (Library chips, Canvas, the C8 citation grammar)
inherited it with **zero** frontend changes. Deterministic — no model is involved. Hardening mattered: a
composite filing's PDF bookmarks are the typesetter's *filenames*, so 104 chunks were briefly citing
`· Untitled ·` until an admissibility gate stopped publishing structure that names nothing real.
**Demo moment:** Ask a margin question over a concall and an annual report side by side. The chips read
`DOC · Q&A · p.11–12` and `AR FY25 · Auditor's Report · p.187` — then say: *"Same page number, completely
different evidentiary weight. The system knows which is which, and so do you — before you click."*

### F27 · Document role ≠ statement voice — a quoted manager is not a new source · `[Cross-cutting]` · `built`
**Why it matters (demo angle):** The question a buy-side analyst asks that breaks most "reads your
documents" tools: *when a news article quotes the CEO, is that a second independent confirmation — or the
same voice, re-printed?* Counting it as independent is how a tool inflates "three sources agree" into a
sentence about nothing. N4A separates the **document's role** from the **statement's voice**: an outlet is
the *publisher*, the company it writes about is *covered*, and a management quote it reprints keeps
**management's** voice with a `quoted` lineage — never minted as the journalist's own claim, nor as a fresh
independent source. A broker's estimate stays the **broker's** voice even when the covered company is the
subject. This is India-shaped: sell-side research and business-press reprints of management commentary are
everywhere in the corpus.
**How it works:** Library-rework 1F (ADR 0053 §3). The passport carries typed `document_roles` (filing ·
publisher · covered) instead of one overloaded `issuer` scalar, and every proposition carries `attribution`
(voice · speaker · role · quoted status · origin/publisher lineage atoms), threaded mention → DB → resolved
claim. Extraction gates on a safely-resolved **covered** company — a news/broker document stops as
`blocked_missing_details` before spending a model call rather than guessing — and correcting the covered
company quarantines and re-extracts the contaminated claims. The independence *counting* policy that
consumes these atoms is deliberately Phase 2: 1F persists the truth, it does not yet score it. Proven by the
`propositions` gate's voice (4/4) and quotation-lineage (4/4) dimensions on the two frozen news-quotation
witnesses. Pairs with F24 (authority at the front door) and F1 (computed contestation).
**Demo moment:** Upload the HDFC/Upstox news article that quotes management next to HDFC's own results. Show
that the article resolves as *publisher = the outlet, covered = HDFC*, its reprinted management quote keeps
management's voice, and it does **not** add a second "independent" agreeing source to the signal. Land the
line: *"A newspaper quoting the CEO isn't a second opinion. Most tools would have counted it as one."*

### F31 · Guidance is a **band**, and “healthy growth” is not a direction · `[Cross-cutting]` · **`built`**
**Why it matters (demo angle):** Two failures that look like nothing on a screenshot and poison every
number downstream. First, **Indian management guides in ranges** — *"revenue growth of 2–3% in constant
currency"*, *"margin band of 20–22%"*. A store with one numeric slot has to throw half the sentence away;
ours kept the band by writing the upper bound **into the unit field** (`value=2`,
`unit="% to 3% in constant currency terms"`), which meant the figure was wrong, the unit no longer
resolved to a unit family, the comparability frame went `flagged` — and a flagged frame fires **no
relation at all**. So the later guidance revision that superseded it *silently never appeared*. A wrong
number and a missing supersession, from one missing shape. Second, an analyst asking *"do these two
sources disagree?"* must not be told yes because one speaker said *healthy* and the other said
*muted* — that is a tone difference, not a contradiction, and inventing it is worse than missing one.
**How it works:** Phase-2 rung 3 (ADR 0068). A quantity is a **discriminated union** —
`point(value, unit)` XOR `bounded_range(low, high, unit)` — enforced in Zod, in Pydantic, and by a
Postgres CHECK, so *"a point that also has a high"* is unrepresentable and no consumer has to guess which
endpoint is authoritative. Movement and stance were then split: `direction` (`up`/`down`/`flat`) carries
**only observed movement** and is the **sole** input to contestation, while the speaker’s `assessment`
(`favorable`/`unfavorable`/`mixed`/`neutral`) sits beside it — shown to the analyst, never compared.
That is invariant 9 made structural: conflicts are **computed** from the claim key, never adjudicated
from good/bad language. The comparator is exercised across the shapes ranges actually produce — point
inside a range, two overlapping ranges, two disjoint ranges, one range containing another, a unit
mismatch that must refuse to compare at all. `propositions` went **24/30 → 30/30 at the same model and
the same reasoning effort**, which is the point: the gap was a **contract defect, not a model defect**.
**Demo moment:** Open the Infosys guidance claim and show it reads **2–3%**, both endpoints intact, with
the revised band superseding it — then show the pre-rung-3 row that stored *2* with the rest of the
sentence stuffed into the unit. Run `uv run python -m app.eval.range_probe` live: it scans the frozen
corpus across **four issuers in two sectors** and prints, band by band, what the old contract stored
against what the tagged one does. Land the line: *"It wasn’t reading the range. It was reading the
first number in the range — and quietly dropping the correction that followed."*

### F7 · Sector-general analytical frame · `[Cross-cutting]` · `built`
**Why it matters (demo angle):** Pre-empts the most damaging skeptical question — *"This only works because
you tuned it for Infosys / Indian IT, right?"* No. The knowledge model is built on the **equity analyst's
universal mental model**: **16 sector-agnostic analytical ROLES in 5 landmark groups** — what it sells and
to whom · what it takes to deliver · how it's financed and what can go wrong · what the owner gets · trust
and licence — that a bank, pharma, FMCG and IT analyst all evaluate (ADR 0059; the 11-value lens it
replaced hid *which* question was being asked behind words like "growth" and "risk"). Adding a sector is a **data** change
(seed a few drivers + entities), never a code change — so the same substrate serves company / industry /
portfolio / M&A research across sectors. The disagreement that powers the contested signal (F1) fires on a
genuinely-shared **fine** attribute, which is what makes the badge credible.
**How it works:** The coarse lens is the universal frame; sector-specific metrics (attrition for IT, NIM /
GNPA / CASA for banks) live as **fine drivers** tagged by sector, selected by a `sector` tag on the subject
entity. Resolution is **fine-first** — a concrete term rolls up to its coarse — and each fine driver carries
its own polarity hint so "attrition down → improving" stays correct without any good/bad judgement
(invariant #9). See `app/spine/seeds.py`, `app/claims/resolve.py`; ADR 0024 (§2–3) + 0025 + 0059/0076–0078.
Proven live 2026-08-18 over both foundation workspaces: **all 16 roles populated · 595 claims · 58.5% also
carrying a fine driver**, with Infosys reaching 14/16 and HDFC 15/16 *independently* — neither issuer is
carrying the other. Resolution gold **20/20**. The anti-bias mapping is visible in the data rather than
asserted: GNPA up → deteriorating, attrition down → improving, cost-to-income down → improving, and **0**
claims with no observed movement carry a directional verdict.
**Proof, not just design — see F29:** the D68 held-out run ingested **TCS + ICICI blind** (never tuned
for) and came back with all four invariant scans clean. Lead with the claim, then produce the receipt.
**Demo moment:** Mid-demo, swap the corpus to a non-IT name (e.g. a bank) — the *same* graph, lens, and Ask
work unchanged, surfacing NIM/GNPA where an IT report surfaced attrition/TCV. "It's not an Infosys demo."

### F5 · Mid-session multi-provider switch · `[Cross-cutting]` · `building`
**Why it matters (demo angle):** Shows N4A is provider-agnostic (no lock-in) and that keys/logic stay
server-side. A clean way to answer "which model is this?" — *whichever you want.* Note the deliberate
nuance: **Ask** switches providers, but the **extraction model stays pinned** so signals don't shift —
a sophisticated point that lands well with technical viewers.
**How it works:** All LLM reasoning lives behind a provider-router in `services/ai` (`complete/stream/embed/
list_models`) over the official SDKs, with per-call selection + failover; the Next app renders streams via
the Vercel AI SDK. Provider keys are server-side only. See `ARCHITECTURE.md §6`; ADR 0003; RESEARCH §4.
**Built so far (2026-06-24, ss4 + ss5a):** the **chat side of the router is live** — `complete()/stream()/
list_models()` with adapters for **Anthropic** (`claude-opus-4-8`), **OpenAI** (`gpt-4o`/`-mini`/**`gpt-5-nano`,
now the default**; `gpt-5.4-mini` stays selectable), and an offline **extractive** provider for keyless/CI runs
(`app/llm/chat.py`, ADR 0018/0020).
`/ask` accepts a `modelId`; `resolve_default_model()` degrades to whatever key is present, so the box always
answers. Verified live: `--list-models` shows the switcher, the same question answered by `gpt-4o-mini` and the
offline provider; streaming confirmed. The **extraction model is separately pinned** (`extraction_model`
= `gpt-5.4-nano`/`low` since 1F-3 — the *conversational* default is `gpt-5-nano`; ADR 0037) so the
conversational default can change without shifting what counts as contested (invariant 9). The **frontend**
switcher is a later slice. Indian-context formatting (₹ lakh/crore, FY Apr–Mar, IST) is pinned in the Ask prompt.
**Demo moment:** Re-run the same Ask across Claude → GPT → Gemini from the switcher; note that the contested
signal is unchanged because extraction is pinned.

### F40 · An empty cell says WHY it is empty — and never blames the company for our own gap · `[Cross-cutting]` · **`built`** (the absence half reached the screen at rung 12, as a lead citing the procedure that looked; the rest lands at rung 13)
**Why it matters (demo angle):** Every research tool shows blanks. Ask any of them *"is this blank
because the company didn't disclose it, because you didn't fetch the filing, or because your parser
choked?"* and they cannot answer — so an analyst learns to distrust every blank equally, which
destroys the value of the ones that matter. N4A answers it, and the **hardest** part is the answer it
refuses to give: an absence is **ours** until proven otherwise. Extraction is open-ended, so nothing
ever asks a document whether it addresses a topic — which means *"the company did not disclose this"*
is an assertion about a real Indian issuer that we cannot yet earn, and the system says so instead of
guessing. That refusal is the differentiator: this is the one product decision that separates a
research tool from a rumour mill.
**How it works:** Phase-2 rung 7 (ADR
0094 (reference outside this repository: `decisions/0094-an-expectation-licenses-a-question-never-an-assertion.md`) →
0098 (reference outside this repository: `decisions/0098-a-duty-is-not-scoped-to-the-cell-it-is-drawn-in.md`)). Nine states are
**DERIVED, never stored** — they are not mutually exclusive, so they resolve through a **recorded
precedence** over six orthogonal receipts (applicability · acquisition · processing · evidence ·
comparability · review), every one of which stays individually inspectable. The positive expectation
comes from **mandated Indian disclosure** — Ind AS 7, Ind AS 24/108, Companies Act s.134(3)/s.143(3),
SEBI LODR Reg 33/34, and for banks **AS 17 / AS 18** and the RBI Master Direction, because RBI's Ind AS
deferral for scheduled commercial banks still stands and citing the wrong rulebook sends the analyst
to the wrong place. A duty is judged against the **exact disclosure** its instrument names — a filed
line item (looked up across every analytical role, since Ind AS 7's operating/investing/financing
lines sit in two different roles) or **the note's own parsed heading**, `15. Segment reporting` being
the AS 17 disclosure in a way that no amount of prose about a "diversified portfolio" is. Where only
neighbouring evidence exists the verdict is **`None` — unverified**, never a satisfaction: a caveat
the consumer can discard is not a caveat, so it lives in the verdict's type.
**Demo moment:** *"Your screen has a blank. Whose fault is it?"* Run
`uv run python -m app.eval.evidence_state_probe --store --grid` — or, since rung 8 (ADR 0099), open **`/evidence?workspaceId=…`** and read the same states on screen, where the workspace is NAMED rather than defaulted. The grid prints every
`(role × period)` cell across four workspaces — **three issuers, two sectors** — with two marks that
mean different things: `*` a mandated disclosure is **unmet** here, `?` a mandated disclosure could
**not be checked** at the precision the rule requires. Point at HDFC's `asset_quality_loss` row: net
NPA is `?`, because HDFC's FY25-26 annual report heads it nowhere the RBI instrument's language
reaches — while **ICICI Bank verifies the same duty** off its own `Net NPA Ratio` heading. Then the
line that lands it: **disclosure breaks = 0**, printed with its reason, because every series in this
corpus is still running at the window's edge. The system had reported two, and both were false.

### F34 · A capture of a number you never saw is **refused**, not recorded · `[Cross-cutting]` · **`built`**
**Why it matters (demo angle):** An analyst clips a figure into their file, and three weeks later the
memo rests on it. Between the moment the number appeared on screen and the moment they clicked, the
filing can be re-parsed — a better table reader, a re-fetch, a corrected page. Every research tool we
know of records the clip against a **coordinate** and calls it done, so the clip quietly comes to
point at *different content* and still reads as verified. That is the worst possible failure for a
provenance-first product: not a missing citation, but a **confidently wrong** one. The demo line is
short — *"we would rather refuse your capture than let it lie to you later."*
**How it works:** Phase-2 rung 8d (ADR
0099 (reference outside this repository: `decisions/0099-the-surface-reads-the-contract-not-the-drawing.md`) →
0100 (reference outside this repository: `decisions/0100-a-coordinate-is-not-an-identity.md`) →
0101 (reference outside this repository: `decisions/0101-a-receipt-taken-after-the-fact-is-not-an-observation.md`)). An element id is
`p{page:04d}-e{index:03d}` — a **position**, and a re-parse deletes and re-inserts, so the same id
exists before and after with different content. Carrying `docId` detects nothing, because the
document id is unchanged too. So the server stamps a **content fingerprint** of the object it serves,
and the client echoes it back as `observedVersion` when it captures — `If-Match`, not a
client-computed hash: the client never builds or reads the token, and **only the client knows what it
rendered**, so only a round trip can span the gap between render and click. A capture with no token
is a **422**; one carrying a stale token is a **409** and leaves no row behind. Where a target cannot
be fingerprinted the reason is **declared** rather than assumed — a document's identity is its bytes,
a page number indexes the same artifact either way — and a `changed` verdict names the cause **per
type**, because a finding does not move for the reason an element does.
**Demo moment:** Capture a graph node. Re-run the projection so the node's evidence changes. Capture
it again with the token you were served the first time — **409, refused**, and the store shows no
row. Then the honest half: a capture taken before the fingerprint column existed reads as
**unverifiable**, never as unchanged. *"A null receipt is not a matching receipt"* is the whole
design in one line.

### F32 · *“FY26 growth was 9.6%”* — three different numbers, all true · `[Cross-cutting]` · **`built`**
**Why it matters (demo angle):** Put the Infosys Q3 FY26 fact sheet on screen and it reports FY26
revenue growth as **9.6%**, **4.6%** and **3.1%** — in the same document, all correct. They are growth
in **rupee terms**, in **dollar terms**, and in **constant currency**. An analyst knows instantly which
one a headline means; a naive extractor stores three contradictory numbers for one metric and either
picks one at random or "detects" a conflict that does not exist. Ours had the second failure shape
exactly: all three stored `currency='INR'` and **collapsed into one reading**. The same class of error
is everywhere in Indian filings — *consolidated* vs *standalone*, *reported* vs *adjusted*, **average**
deposits vs **end-of-period** deposits, Ind AS vs IFRS. Every one of them is the same label attached to
a different measurement, and merging any pair silently is worse than showing nothing.
**How it works:** Phase-2 rung 6a-i (ADR
0085 (reference outside this repository: `decisions/0085-the-frame-is-inherited-not-extracted.md`) /
0086 (reference outside this repository: `decisions/0086-comparison-asserts-only-what-the-sources-stated.md`)). Every figure carries a
**measurement frame** — six dimensions (consolidation · adjustment *and what was excluded* ·
accounting standard · denomination currency · currency basis · averaging) — and, crucially, the frame
is **inherited, not extracted**. We measured that first: **0 of 559** basis-empty claims carry a basis
word in the claim body. The basis lives in the table header, the section, and the document's front
matter, so the producer walks `inline → table → section → document` and stops at the first tier that
states one, **recording which tier answered**. A tier that names two values (HDFC's annual report
carries both a `CONSOLIDATED BALANCE SHEET` and a `STANDALONE BALANCE SHEET`) yields `unspecified`
rather than falling through to a guess. And the tiers are **not equal**: a value inherited from the
whole document may **block** a comparison but may never **clear** one — a brake may fire on weak
evidence, a verdict may not. A document can never declare *"adjusted"* at all, by database constraint:
letting one artifact-level word wash over every number inside it is precisely the manufactured basis
the rule forbids.
**Demo moment:** *"Which growth number do you want — and does the system know the difference?"* Run
`uv run python -m app.eval.frame_probe`. Its **DISTINGUISHED** section prints the three FY26 readings
as `denominationCurrency=INR(inline)`, `denominationCurrency=USD(inline)` and
`currencyBasis=constant(inline)` — three frames, from the real fact sheet, with the sentence that fired
each one. Then the harder half: the **REFUSED** section shows what the system declines to invent —
a table naming *both* bases yields no basis, a magnitude word yields no currency, a document may not
declare an adjustment. The honest punchline is that this slice made **`contested` stay at zero**, on
purpose: reading the 27 previously-blocked pairs as an analyst would showed **none was a finding** —
one was reported-vs-adjusted for the same quarter (both true), one had **both sides agreeing** and was
still being handed over as homework. Thirteen items stopped reaching the analyst as work. *"We removed
thirteen questions rather than adding thirteen answers"* is the demo, and it is the more credible one.

### F38 · The business, in its own parts — and a figure that can prove which part it belongs to · `[Cross-cutting]` · **`built`**

**Why it matters (demo angle):** Every research tool can show you a company's revenue. Almost none
can show you *where it came from* from the filing itself, because the one table that says so — the
Ind AS 108 / AS 17 segment note — is the most hostile table in an Indian annual report. It is
**transposed, and the issuers do not agree how**: HDFC and TCS put the metric on the row and the
SEGMENT on the column with the period in a sentence above the grid; Infosys puts the PERIOD on the
row inside a metric block; ICICI puts the segment on the row. Read it by position and you attribute
five industry verticals' revenue to a column heading. The demo line: *"this is a real filed segment
note, read on the axis the filer chose — and every figure in it can prove which part of the business
it belongs to."*

**How it works:** Phase-2 rung 6d (ADR
0116 (reference outside this repository: `decisions/0116-a-part-of-the-business-is-not-the-business.md`), audited by
0117 (reference outside this repository: `decisions/0117-a-part-is-proved-by-its-own-cell.md`),
0118 (reference outside this repository: `decisions/0118-a-verification-is-worth-what-it-was-taken-over.md`) and
0119 (reference outside this repository: `decisions/0119-a-receipt-is-the-conclusion-not-its-inputs.md`)). The column axis is
reconstructed from **word geometry** at parse time — the last layer still holding x-positions —
and carries a fingerprint of the grid it was read over, so metadata can never outlive what it
describes. The axes are then **identified, never assumed by position**, and the segment axis is the
one carrying the note's **own total**: positive, structural evidence, because identifying it by
exclusion made TCS's `…YoY Revenue Growth %` column a "segment".

Three things the reader will not do. **It never sums** — the disclosed whole is read or there is
none, because the gap between the parts and the whole is itself the finding (HDFC's segment revenue
is ₹6.01 lakh crore against income from operations of ₹4.08 lakh crore; the difference is
inter-segment revenue it eliminates). **A segment total never lands on a whole-company line item.**
**A short row is never positioned** — its blanks were dropped by the parse, so which column each
survivor belongs to is unknowable, and it is refused with a receipt rather than shifted into place.

And the attribution is proved per figure rather than per note. **A sum is invariant under a
permutation of its members**, so swapping two parts' values leaves every total intact — which means
reconciliation can never be the proof. Each figure re-derives from the cell its citation OPENS: the
value from the printed text times the scale that cell recorded, the part from the anchor's own
label. The citation then carries a **column receipt** and an **interpretation receipt**, and opening
it re-runs the reader over the element on screen — so re-dating the note's banner, re-titling the
block heading above the row, or adding a units line that outranks the one it was read under are all
reported as *changed* rather than quietly verified.

**Demo moment:** Open Infosys' FY24-25 segment note and read the parts: *Financial Services ₹49,908
crore · Energy, Utilities, Resources and Services ₹21,710 crore · Communication ₹19,108 crore*.
Click any one — the viewer lands on **that cell**, highlighted, and says the row label, the column
heading, the printed figure **and** what the note says around it all still match. Then the line that
lands: *"before this shipped, `Energy,` sat 0.25pt closer to the wrong column, so two of those
segments were named wrong in twelve stored readings — and every total still added up perfectly."*

### F35 · The price tells you **when it was true** — and when it can't, it says which of us failed · `[Cross-cutting]` · **`built`**

**Why it matters (demo angle):** A price is the one datum on a research page an analyst cannot
sanity-check by reading it. ₹1,130 is equally convincing whichever company, whichever hour, whichever
currency it belongs to — which is exactly why every product renders it with the least care and the
most confidence. Ours did too: it captioned a reading that was true at **15:15 IST** as *"as of
19:17"*, because 19:17 was when **we** asked. Four hours, on the single field that decides whether to
trust a number, live on two surfaces. The demo line is one sentence: *"this is the only market row
we know of that can tell you it does not know."*

**How it works:** Phase-2 rung 9 (ADR
0102 (reference outside this repository: `decisions/0102-a-price-carries-two-clocks-and-neither-is-ours.md`) →
0103 (reference outside this repository: `decisions/0103-a-presence-relationship-is-not-a-meaning.md`) →
0104 (reference outside this repository: `decisions/0104-one-price-one-truth.md`)). The reading and its timestamp come from **one**
provider payload, so the pair is coherent by construction, and the receipt carries **two clocks** —
`asOf`, the provider's, and `fetchedAt`, ours — with the measured lag between them. A boolean could
only ever say *our refresh failed*, so freshness is **four values** in a recorded precedence
(`unavailable ▸ undated ▸ stale ▸ current`, because you cannot judge an age without a date), and
`stale` names **which** of three things went wrong: our refresh, the feed's silence, or a provider
clock stamping the future. **Two staleness horizons**, both published — 30 minutes while the exchange
is trading, four days when it is shut, which is a Friday close read the Tuesday after a Monday
holiday. One horizon would call every Indian weekend stale, and an alarm that fires on correct data
is an alarm nobody reads.

Nothing is inferred: the currency, the exchange and the trading session are **read**, so a reading the
provider will not denominate renders without a ₹ rather than with a guessed one. Six different
absences get six different repairs, and a provider is **named only when one was actually asked** —
four of those six never reach a network. **No market object carries a `Citation`**, deliberately:
nobody files a price, so it is orientation context and never evidence, and the boundary sentence
travels on the wire so a surface cannot quietly drop it.

**Demo moment:** Open the row on a trading afternoon — `NSE · trading · as of 14:58 IST · 15 min
behind`. Then **unplug the wifi**, wait a minute, reload: the number does not change and does not
pretend — an amber **STALE** chip appears, the as-of stays exactly where it was, and the sentence says
***we* could not refresh it**, not that the market went quiet. Plug back in: `current`. The closing
line is the one that lands: *"and if the provider ever stamps a price in the future, we call it
unusable rather than the freshest thing we have"* — which is a real defect that shipped, survived a
green probe, and was found by an audit reading values instead of counting fields.
