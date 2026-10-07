# Review — Graph (the relationship workspace)

> **status:** working (temporary) · **authoritative for:** findings on the prototype's Graph versus
> the built product, the analyst critique, and the port list for phase 4 · **last verified:**
> 2026-10-05 at baseline `102c2ef`.

Sources: the Graph review agent (prototype + `apps/web/app/graph/**` + ADRs 0136–0140, 0144) and a
rendered screenshot of the HDFC graph. The founder's own observation: the product's graph page — *"and
especially the filters and how much less clutter it has"* — is better.

## 1. Prototype anatomy

- **Chrome, top to bottom:** 212 px left rail (3182) · topbar (3219) · an always-on origin bar
  "Origin · Explore · Infosys · FY26 · current scope" (7272) · a toolbar with Explore | Table, "Find an
  object", Reset (7296–7315) · then a **308 / canvas / 356** grid (1174). At 1440 px the canvas gets
  **~564 px**.
- **Left pane:** Details and Scope as two tabs (7283); Scope holds document toggles and "Not in scope:
  peer filings" (~7440). **Right pane:** Ask N4A with three suggestion chips and a composer (~7550).
- **Canvas:** an SVG force simulation that settles and stops (7141–7205); type hubs with dashed
  community ellipses (7097–7121); a floating legend (7325) and zoom (7331).
- **Nodes:** company · segment · geography · metric · claim · external entity · source, each with a
  two-letter glyph (SG, GE, MX, CL, EN, SR). **Edges:** structural / supports / complicates /
  contradicts, each with a relation phrase.
- **Details** (~7457): sticky header with Focus · Expand one hop · Note this; a large mono measure with
  its posture; sparkline; verbatim quote with "Read it in context"; Figures table; an interpretive
  note; connections grouped Contradicts → Complicates → Supported by → Structure; "Evidenced by".
- **Ask** (~7568): one scripted `ASK` per workspace — a scope line, a head sentence, four prose rows
  (Observed / Attributed / Alternatives / Missing), "What would discriminate", a citation list, "Focus
  supporting subgraph".
- **Table** (7641): From · Relationship · To · Kind.

## 2. Where the product is better (port these back)

- **Filters.** The prototype has **no type filter**; its search *removes* non-matching nodes and
  re-runs physics on every keystroke (7132, 7747–7757). The product's `FilterPanel`
  (`graph-menus.tsx`) is one menu: **Show** doubles as the legend (each kind's swatch is the node
  itself, with a count and an "Only" button on hover); **line families** listed only when drawn
  (`legendFamilies`, `graph-frame.ts`) under "Size is the connections drawn here, not importance";
  **Evidence:** All / Corroborated only (hollow = one voice so far); **Statements about:** a period.
  Search highlights, never removes (ADR 0140 D8).
- **Toolbar.** `GraphToolbar` (`graph-toolbar.tsx`) — one measured 46 px row that drops labels in a
  set order when space is short (`useFitLevels`); a menu button shows its value, in accent, only when
  it narrows the view; counts "N of M objects · K connections"; one Refresh. It replaces four
  prototype layers: origin bar, toolbar, floating legend, floating zoom.
- **Menus.** Sources, Areas, Filter as anchored popovers (Esc closes, focus returns).
  `SourcesPanel` groups documents by kind, newest first, three-state checkbox per group, "Turn all
  on", a message when a switch is rolled back. `AreasPanel` fits the camera to the chosen area and
  says "N connections cross two areas — all drawn". Areas are read off the data (`graph-views.ts`
  `FIXED_AREAS`: Group companies, Clients named, Regulators, Competitors named…) — the prototype's
  hard-coded `COMMUNITY_GROUP` (7103) calls HDFC's subsidiaries "Partners".
- **Panes** (`graph-panes.tsx`): Details left, Ask right, each its own pane — widths 240–560, snap
  closed, `[` / `]` to toggle; Ask opens automatically only at ≥1360 px; the canvas never drops below
  360. With the 48 px navbar instead of the rail, the canvas at 1440 grows ~564 → ~784 px.
- **Arrival bar** (`arrival-bar.tsx`) only after a hand-off: "← Back to the lead │ Brief › What
  deserves attention › … · landed on 1 position · FY2025 ×", and the seed is selected, focused and
  framed. The prototype's `leadToGraph` (~6950) sets the label but selects nothing.
- **Still map** (`graph-layout.ts`, `communities-canvas.tsx`): deterministic, no overlapping areas, a
  greedy label-placement pass (24 names, 0 overlaps on HDFC, ADR 0140 D4), select → focus with focused
  lines naming their relation, hover lights and never dims, a blank click or Esc steps back one level.
  The prototype re-settles on every drag release and search, and cuts labels at 18 characters with
  no collision check (~7255).
- **Table** (`relationship-table.tsx`): From · Relationship · To · Area · **Evidence** (document
  count + citation chips), sortable, lists unconnected objects. The prototype's header promises
  "every one resolves to the document that evidences it" (7649) but no column shows a document; Kind
  is a raw internal value.
- **GraphAnswer** (`ask-answer.tsx`, `graph-ask.ts`): a checked plain-language answer first
  (`AnswerInWords`, "N sentences held back"); a standing label (Filed · Partly filed · Only an account
  states it · The record cannot settle it); six collapsible blocks with counts — filed figures by
  period, each cited, with "for comparison" readings and "also filed as" restatements; Observed and
  Attributed via `StatementRow` with speaker and page chip; Alternatives still live; Missing or
  incompatible; What would discriminate — then "Show the N objects it rests on" + a count not drawn,
  a refusal line, "Selected by {model}; sections, gaps and standing computed". It can **decline** and
  say which kind; starters come from the selected object; several chats; Continue on Canvas; "Reads 7
  of 9 sources".
- **Details** (`node-details.tsx`): a kind line with "One voice so far / Corroborated" and "Not drawn
  under the Filter · Draw it"; Focus (n) · **Trace to…** · ⋯ (Expand, Hide); for positions, "Sides —
  the record holds more than one" with statements · documents · voices.
- **Visual weight.** Source links are their own faint dashed family (`FAMILY_STYLE` "Source link",
  0.4 opacity). The prototype paints every source → object edge as a green "supports" line.

## 3. What the prototype has that the product lacks (keep — this is where the showcase leads)

- **Disagreements drawn on the map** — claim ↔ claim edges (c-outpace↔c-deflate, c-nimup↔c-nimflat,
  c-weak↔c-inline) and claim → metric tensions ("forecast against a falling actual", "basis break",
  "below FY26 actual"). The product has no producer for these edges (ADR 0136 D4). **The prototype's
  most demo-able idea.**
- **Node depth**: headline measure with period and basis, sparkline, figures table, verbatim quote
  with speaker, page, date and "Read it in context" (the product has 0 snippets on 331 Infosys claim
  citations — X6).
- **Company passport**: growth on three bases, margin reported vs adjusted, market cap marked derived,
  last close with its source.
- **Subsidiary stakes on edges** (74.12%, 50.54%…) with facts per entity.
- A source's **"what this document contributed"** (5652); a broker note flagged as misfiled ("Geojit
  · misfiled").
- **Connections ordered by tension** (Contradicts first); the "What would discriminate" call-out.

## 4. Fineness gaps

- **Ask ignores the question** (ledger A-36, P0).
- **Counts disagree** (A-29).
- **A hairball** (screenshot): ~70% of edges are bookkeeping — Infosys 33 of 47 (19 company spokes, 14
  source links), HDFC 40 of 56; only 1 and 2 edges respectively are contradictions.
- **Truncated labels drop the number:** "Margin expands to …", "Labour Codes charg…", "FY27 guidance
  1.5–…", "HDB Financial Serv…".
- **Colour clashes:** company (accent #6c4cf1), claim (hue 285) and the selection ring are all violet;
  source (252) is the same blue as "reported"; supports-green (150) is near segment-green (140), and
  to a market eye green means "up".
- **Legend:** a floating card of 10 entries with codes SG/GE/MX/CL/EN/SR; never says what size means.
- **Jargon:** "Origin · Explore", "Scoped question", "different layer" (an internal L0–L3 term,
  4709), "opposite polarity, overlapping period", **"Negative polarity" as a claim's 22 px headline
  value**, "Referent period", "Independent confirmations 0", "deterministic reconciliation", raw Kind
  values in the table, source names like "KP Jun26" and "Sahi 23 Apr 26".
- **Units mixed in one panel** (screenshot): "₹43,975 bn" beside "₹11,25,000 cr · derived, not
  reported"; values wrap over 3–4 lines in the Figures table ("1,539 cr · from the broker notes'
  share count").
- **HDFC semantics:** subsidiaries as "Partners" (A-35); branch mix as "geography" (A-34).
- **Provenance:** per-node notes are uncited interpretation (A-30); search changes the selection
  without refreshing Details (A-37).

## 5. Analyst critique

An analyst opens a relationship graph to answer four questions: **what drives the number I forecast,
where the street is split, what is one-off, what would change my view.** The prototype is a star
around the company, with the real argument (~14 edges) tucked into the claims corner.

**HDFC Bank.**
- **Funding → earnings chain:** deposits (time vs CASA) → cost of funds → NIM ← yield on advances →
  NII → RoA. Today three disconnected fragments (m-dep→m-nii "funds", m-casa→m-nim, m-nim→m-roa) as
  generic lines. Missing: advances / loan growth, the loan-to-deposit ratio, cost of funds and yield
  (only in the Ask text), the repricing lag (the CFO's "5 quarters"), and **costs carrying RoA** (AR26
  p.41 says so outright).
- **The HDFC Ltd merger** as an event node explaining CASA 38% → 32.3%, the mortgage share, the
  loan-to-deposit glide path, why deposits are outgrowing loans (on average balances).
- **Subsidiaries** need a value view — listed/unlisted, sum-of-parts contribution (Axis ₹129/share at
  a 20% holdco discount vs DevenChoksey ₹110 at 15%), the HDB listing gain as the one-off that breaks
  the base.
- **RBI:** capital rules; priority-sector → agri NPA (the RBI-inspection agri provision, Cj26 p.5).
- **Street split:** NIM to 3.55% (DevenChoksey) vs "limited opportunities" (Axis); Q1 "weak"
  (Investec) vs "in line" (Nomura); targets ₹975 / ₹1,011 / ₹896 appear only on source labels today.

**Infosys.**
- **Revenue drivers:** verticals and geographies → CC revenue; TCV → forward revenue (bookings +28%
  while growth fell — dossier storyline 2); Hi-Tech's decline as a leading indicator.
- **Margin levers:** utilisation, headcount and pyramid, subcontracting (8.6% vs 7.9%), currency,
  Project Maximus (+30–70 bp a quarter, reinvested), the Labour Codes one-off → operating margin vs the
  20–22% band. Today only `c-labour` touches the margin node.
- **AI:** the AI contest already exists and works — keep it.
- **Guidance:** FY27 1.5–3.5% vs FY26 3.1%, and the FY26 ratchet.
- **Peers** (TCS, HCLTech, Wipro): TCS documents exist (D2) — draw TCS as a peer node fed by them;
  others as honest "not in the record".

**The questions the demo graph should visibly answer:** "What drives NIM?" · "Where do the brokers
disagree?" · "What connects to the guidance cut?" (Trace) · "What is one-off this quarter?" · "What
would change my view?" Every new node must come from the seed documents; where something is not in
the record, draw a dashed "not in the record" placeholder linked to the Missing block.

## 6. Port list for phase 4 (ranked)

1. **Ask answers the question asked** — one scripted answer per starter, a decline for off-record
   questions, the question shown back.
2. **Answer in the product's GraphAnswer layout** with a citation chip on every line.
3. **The product's chrome** — navbar, one toolbar row (Sources · Areas · Filter), arrival row only
   after a hand-off that lands on the seed; no origin bar, floating legend or Scope tab.
4. **Driver-chain edges** as a typed `drives` family (§5).
5. **Claim ↔ claim disagreements kept and sharpened** — rose only for computed contradictions; each
   side's statements · documents · voices and the broker targets in Details; Contradicts first; a
   "Where do the brokers disagree?" starter that lights the pairs.
6. **Still, precomputed positions** per area + collision-free full labels; select → focus; relation
   names on focused lines.
7. **Bookkeeping recedes** — company spokes and source links as faint Structure / Source-link lines.
8. **Semantics and jargon** — Group companies, Branch network, document names in the style of the
   product's `document-names.ts`, no polarity / layer / referent / "Origin · Explore"; Evidence column
   instead of Kind.
9. **Details: product layout, prototype depth** — corroboration on the kind line, Focus · Trace to… ·
   ⋯, measure, sparkline, figures, quote; the note becomes a cited line with a standing label or goes;
   one scripted Trace (guidance cut → headcount / utilisation).
10. **Honest gaps and correct counts** — RBI and the HDFC Ltd merger where the ARs name them; peers
    as placeholders where not held; answer scope lines correct.
