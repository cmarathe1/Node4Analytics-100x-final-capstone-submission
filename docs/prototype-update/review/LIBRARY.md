# Review — Library (the coverage brief, the flagship)

> **status:** working (temporary) · **authoritative for:** findings on the prototype's Library versus
> the built product, the analyst critique, and the port list for phase 3 · **last verified:**
> 2026-10-05 at baseline `102c2ef`.

Sources: the Library review agent (prototype + `apps/web/app/library/**` + ADRs 0105, 0143, 0144),
the two corpus scans, and screenshots of both companies' full Library. Figure defects are in
`ACCURACY-LEDGER.md`, not repeated here.

## 1. Prototype anatomy

`renderLibrary()` (6438–6639), in order:
1. **Head** (6453) — name, ticker, sector, basis ("Indian FY, standalone · Indian GAAP").
2. **Evidence frame** (6466–6486) — a boxed panel: documents · span · pages, "N issuer-origin · M
   independent", a "Not in scope" line, a Sources button.
3. **Market card** (`marketModule` 5940–6020) — price, day range, 52-week bar, a 268 px chart
   (1M–MAX), 50/200 DMA, volume, crosshair.
4. **How this business works** (6491–6512) — a lede, an "Evidenced by" source list and six question
   blocks (what it sells and to whom · what it takes to deliver · how it is financed · what the owner
   gets · trust and licence to operate · what could change the answer). Every figure is a `.fig`
   citation button.
5. **What deserves attention** — 4 of 6 lead cards; the drawer (6904–6949) holds Observed /
   Attributed / Alternatives / Missing / Question, "Why N4A surfaced this", citations, Trace in graph
   / Add to notes.
6. **Business structure** — segment bars + a geography bar, with a basis note.
7. **What changed** — six per-series charts with dashed gaps, each beside a prose "evidence
   coverage" column; a source-history drawer (~6972).
8. **Timeline** — three thematic lanes; each event opens a drawer (~6310).

Per company: **Infosys** (8 documents) — the story is constant-currency vs rupee growth; leads: is AI
net-additive (contested), the Labour Codes basis break, headcount −8,440, three growth bases, no Q4
call, utilisation; structure by vertical and client geography. **HDFC Bank** (12 documents, 3
brokers) — the story is the spread business; leads: which way NIM goes, the HDB base effect, the Q1
selloff, RoA 1.85% vs 1.74%, the chairman's resignation, the loan-to-deposit glide path; structure by
loan product + branches by centre type.

## 2. Where the product is better (port these back)

- **Head and evidence line.** Price sits beside the name (`MarketHeadBlock`,
  `apps/web/app/components/market-context-row.tsx:125`); evidence is **one line** with *Not held*
  grouped by kind (`EvidenceFrame` / `InventoryLines`, `apps/web/app/library/brief-workspace.tsx:557–699`).
  The prototype spends ~600 px on a box and a chart before one business fact.
- **Key-figures strip** (`key-figures.tsx`) — four tiles: value · period · YoY · basis; an amber dot
  marks a basis break; each opens its source cell. The prototype has nothing like it.
- **The story** (`story-module.tsx`) — lede → question blocks → a **"Since the annual report"**
  current-chapter column; each sentence marked **Filed / Attributed / N4A's reading** with a lens to
  isolate one kind; a sentence's trail shows **"Would be wrong if"**; disagreements show both sides +
  **"What would settle it"**.
- **Attention** (`attention-module.tsx`) — numbers on the card face (`ChangeBars`), a *What management
  says* list in the company's voice, an "N to decide" action, a signal detail table. Prototype cards
  are text + "2 documents · 2 origins · 0 independent confirmations".
- **What changed** (`series-module.tsx`) — a **compact table**: metric · sparkline · per-period
  figures · YoY/QoQ, with a **Quarterly | Annual** switch; a row opens the full chart
  (`series-overlay.tsx`, `BriefOverlay`).
- **Timeline** (`timeline-module.tsx`) — compact inline; key, price axis and event list behind
  Expand.
- **Indian magnitudes** (`figure-format.ts`) — crore in cells, lakh crore in prose, precision as the
  source printed it. The prototype's HDFC data is ₹ bn throughout.
- **Shared patterns** — one module header (`ModuleHeader`, `brief-overlay.tsx:91`); pending / failed /
  answered always distinct; every citation opens the evidence viewer and returns to the same place
  (`evidence/viewer/evidence-viewer.tsx`). The prototype toasts "No facsimile…" (ledger A-15, A-26).

## 3. What the prototype has that the product lacks (keep)

- **Prose with a point of view** — "That gap is not lending. It is cost and credit." (12402). The
  product's HDFC story reads like a compliance summary (outside-scope X5).
- **Bank structure by loan product** from the key-parameters sheet (KPj p.1) — far more useful than
  the RBI segment note the product reads.
- **Business-specific timeline lanes** ("Performance & margin · Funding & asset quality · Governance
  & capital", 12983).
- **Event drawer** (What happened / Why it is here / Figures) and **lead drawer** (Alternatives, a
  Question to investigate, Add to notes).
- **52-week position in words**, DMA, volume.
- The sources **posture sentence** ("Strong issuer record, thin outside challenge", 6859).
- **Market-vs-evidence** and **governance** leads; **derived rows** in series drawers (revenue per
  employee, client buckets).

## 4. Fineness gaps (beyond the ledger)

- **The voice is bookkeeping-forward** (screenshots): the first ~600 px is a document box + a price
  card; "What changed" gives ~¼ of its width to an "Evidence coverage" essay per series; charts have
  **no y-axis values except the last point** (an analyst cannot read magnitude); lead cards end in
  provenance counts. → D12: substance first, provenance one click away.
- **Engineering notes on screen**: "The vendor's 52-week fields are intraday extremes, so they sit
  just outside the closing line the chart draws" (5979); "Averages hidden: MAX is not daily bars".
- **Internal vocabulary**: "Evidence frame" (wearing the "reported" chip colour, 6474), "issuer-origin",
  a "Not in scope" CSS pseudo-label (808); lead factors "Overlapping referent period", "Same claim key
  · no: different layers", "Analyst endorsement · Not yet"; lead families "Unresolved driver",
  "Operational / narrative divergence"; viewer "Artifact INFY-FS-26Q4-001", "Derived layers are
  rebuildable" (7035–7041); "Estimate / model output"; the "live · vendor" pill (the spec itself says
  it over-claims; the product says `NSE close` / `NSE trading`).
- **Em-dash artefacts**: "in rupee terms: but only" (4428), `figure: "growth of 3.1%": when` (4596),
  "start from · 20.3% reported" (4566), "factual · which is" (12528); titles "Fact Sheet.
  Consolidated", "HSIE Research. Company Update" (3970–3974, 11853–11858).
- **Truncation**: "Corporate & other wholes…" in the HDFC loan-book bars.
- **Period labels** "Q4'25 … Q1'27" read as calendar quarters (D5: `Q1 FY27`).
- **Timeline** labels clipped at the right edge and colliding (ledger A-27).

## 5. Analyst critique — the first 60–90 seconds

An analyst looks for the **key numbers, the print vs guidance, the debate on the stock, the street
view**. Here they get the name, a box about documents, a price chart, then prose.

**Infosys.** FY27 guidance (1.5–3.5% CC, margin band 20–22%) appears only in paragraph 6 and a drawer.
Q4 CC growth −1.3% QoQ, TCV ($3.2 bn Q4 / $14.9 bn FY) and net-new share live only in a series
drawer. Attrition, client buckets and capital return are buried; no vertical or geography trend over
time. The brief is dated August 2026 but has no Q1 FY27 print while HDFC has its Q1 — it reads as a
stale product, not a principled gap (D3 resolves).

**HDFC Bank.** Missing from the first view: an **advances growth** series (only deposits drawn),
**credit cost**, **slippages** (absent entirely), **PCR**, the **RoA/RoE trend**, the **CET1 trend**,
and the **loan-to-deposit ratio** — the post-merger metric — which the prototype declares absent
(ledger A-16). The street view (3 BUYs, targets ₹896–1,011 vs ₹731) is buried in a timeline drawer.

**The "so what".** Both debates exist (AI deflation for Infosys; NIM path and LDR glide for HDFC) but
each is only the first lead card. Neither page states *what changed last quarter*. Said-vs-did exists
only for HDFC, and only partly.

What the corpus supports for this (see the dossiers): a full **guidance ledger** for both companies, a
**results-review table** in the broker's own format, the **bad-loan walk**, the **margin bridge**, a
**broker grid with basis**, and **one-off-adjusted growth** with the adjustment visible.

## 6. Port list for phase 3 (ranked by demo impact)

1. **Key-figures strip** under the head, chosen per sector from data (Infosys: revenue with CC growth
   vs guidance · adjusted margin vs the 20–22% band · TCV · headcount / utilisation; HDFC: NIM ·
   CASA · GNPA · CET1 · RoA, + loan-to-deposit). The first number lands in three seconds.
2. **"This quarter and the debate"** lede (the product's current-chapter column): print vs guidance,
   said vs did, the one debate, the street view.
3. **Fix the ledger items** first (phase 1).
4. **Shrink the market card** into the head (`MarketHeadBlock`) with 52-week position and broker
   targets; the chart moves behind Expand / into the Timeline.
5. **Every cited page transcribed** — no "No facsimile" on the demo path.
6. **What changed → the compact table** with Quarterly | Annual, adding HDFC advances, credit cost,
   slippages, loan-to-deposit; Infosys CC growth, TCV, attrition.
7. **Sentence marking** (Filed / Attributed / N4A's reading + "Would be wrong if") while keeping the
   prototype's sharper prose.
8. **De-jargon** — "19 documents · 15 from the company · 4 outside"; plain lead factors; no artifact
   ids, "rebuildable", `not_acquired`, "live · vendor".
9. **Copy and format pass** — em-dash artefacts, true minus, D5 units, `TODAY` aligned, Infosys
   geography in CC.
10. **Bring both companies to the same demo date** (D3/D15); show public documents as one-click
    acquire; keep gaps only for what the documents genuinely don't hold (D2).
