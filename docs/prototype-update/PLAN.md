# Prototype update — the plan

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](../README.md) for current scope.

> **status:** working (temporary) · **authoritative for:** the order of work, each subtask's inputs
> and *done when*, and what is out of scope · **last verified:** 2026-10-06 (phases 0–1 signed off; phases 2–6 implemented and reviewed; user visual sign-off pending).

**Goal.** After this task, a buy-side analyst watching a 15–20 minute demo sees the product N4A will
become: the first 90 seconds on a company tell them the numbers that matter, the debate, and what
management said versus did, every figure one click from its page with its basis printed — and
nothing on screen is wrong, stale, unfinished or written for an engineer.

**How to work a phase** (adapted from `CLAUDE.md` §"Running a slice" to this folder's scope rule):
tick each subtask here with a two-line note as you finish it · run only what the subtask touched
while building · at phase end: `node scripts/verify-prototype.mjs`, the figure checker once it
exists, screenshots of both companies with `tools/shoot.mjs`, then a short **verify card** (what
changed · how to look · what to expect · what is deliberately not done) and **stop for the user's
sign-off**. Work picked up mid-phase (a bug, a side request) becomes a subtask here *before* its
first edit.

Line numbers below are at baseline (`102c2ef`) — re-grep before use.

---

## Phase 0 — Research dossiers v1 *(no HTML edits)*

**Starts when** the user says the newer documents are in the seed folders (D3).
**Read:** `DECISIONS.md` D2, D3, D5, D13 · `research/DOSSIER-*.md` (v0) · `research/ANALYST-USER.md` §3–4.

- [x] **0.1 Inventory the corpus.** List every PDF in `data/seed/HDFC Bank/` and
  `data/seed/Infosys Ltd/`: kind (AR / results / factsheet / deck / call / broker / news / PR),
  period, document date, PDF page count. Flag mislabels (X2, X3 are known). Add the list to the top
  of each dossier. *Done when:* every file is listed and classified, the new ones marked **new**.
  *2026-10-05: inventory run (page counts, text layers, page-1 text). Only two new files:
  `HDFC-Concall-Transcript-Jul-2026.pdf` (Q1 FY27 call, filed 24 Jul 2026, code `Cjl26`) and
  `Infosys-Concall-Transcript-Jul-2026.pdf` (Q1 FY27, board 23 Jul, filed 28 Jul 2026, `C-Jul26`).
  No Infosys Q1 FY27 factsheet. PR-S = `Infosys_PR_24062026.pdf` (Sentara), PR-C = `_2` (ANA CMO
  Growth Council / LIONS). Codes for all four companies: `research/figures/docs.json`. Tables go
  into the dossiers' §0 at assembly.* *2026-10-06: merged into both dossiers' §0; `drafts/inventory.md` deleted.*
- [x] **0.2 Fix the demo date.** Choose one "today" for every workspace (D3); record it as D15.
  Compare with the price data's last bar (INFY 6 Aug 2026, HDFCBANK 7 Aug 2026); if later, raise O3.
  *Done when:* D15 is written and O3 is answered or raised.
  - [x] *2026-10-05: D15 = Fri 31 Jul 2026 (newest doc: Infosys call filed 28 Jul). Both series hold
    a 31 Jul bar → O3 answered, no re-pull; phase 1 trims and re-derives the head. New defect A-47
    (HDFC monthly series dated a month early, 59/61 months); bonus adjustment verified clean.*
- [x] **0.3 HDFC Bank dossier v1.** Upgrade `research/DOSSIER-HDFC.md` with the new documents:
  KPI spine to 6–8 quarters on stated bases; storylines re-checked against the new quarter (does the
  loan-to-deposit ratio keep rising? does NIM recover?); guidance ledger outcomes updated; contested
  points; **broker grid** (rating · target · basis · date · price when written); the **results-review
  table** for the latest quarter (Q | Q-4 | YoY | Q-1 | QoQ, bps); **bad-loan walk**; NIM / yield /
  cost-of-funds trend on both NIM bases; the events timeline (merger comparability break, HDB
  listing, chairman exit and law-firm finding, Rajiv Kumar, anything new). *Done when:* every cell
  carries doc + **PDF page**, every v0 item marked *verify in phase 0* is resolved.
  *2026-10-05: in progress via six research agents (stopped once on the session limit, resumed),
  each writing a draft + a registry file: `research/drafts/hdfc-numbers.md` + `figures/hdfc-kpi.json`
  · `hdfc-narrative.md` + `hdfc-story.json` · `infosys-numbers.md` + `infosys-kpi.json` ·
  `infosys-narrative.md` + `infosys-story.json` · `peer-icici.md` + `icici.json` · `peer-tcs.md` +
  `tcs.json`. Then I assemble each dossier v1 from v0 + `drafts/inventory.md` (0.1) + its two drafts
  + its peer draft, run the checker over every registry file, and delete `drafts/` once merged.*
  *2026-10-06 (resumed in a new chat): all six drafts + registries landed; checker over the whole
  registry **2,015 / 2,015 pass**. But three agents were cut off mid-write: `hdfc-numbers.md` stops
  after §B (missing: results-review table, bad-loan walk, loan/deposit mix, broker grid, v0 fix
  list); `hdfc-narrative.md` stops after storylines (missing: guidance ledger, contested points,
  events timeline); `infosys-numbers.md` stops after §D (missing: capital return §E, one-offs and
  IFRS vs Ind AS §F, annuals, not-in-corpus list, v0 fix list). Much of the data is already in the
  registries (bad-loan walk, mix, capital return). Finishing them here, then assembly.*
  - [x] 0.3a results-review table + bad-loan walk + mix (from registry; deltas as derived entries)
    *New registry `figures/hdfc-v1.json` (80 entries, 80 pass): the bank's printed QoQ/YoY (Q1D p.4),
    ratio deltas in bps as derived entries, four walk identities (open + slip − upg − w/o = close).*
  - [x] 0.3b broker grid (rating · target · basis · method · date · price when written), on pages
    *AX 20 Apr BUY ₹975 @ ₹800 (17 Apr), 1.9× FY28E ABV, SOTP 844 + 129 = **973** (₹2 short of its
    own target); DC 22 Apr BUY ₹1,011 @ ₹812, 2.0× ABV 901 + 110 ✓; GJ 22 Apr HOLD→BUY ₹896 @ ₹799,
    1.9× consolidated BVPS (from HOLD ₹1,022, 10 Feb). Must-fire on the new entries: 5/5 + SOTP alone.*
  - [x] 0.3c guidance ledger v1, contested points v1, events timeline
    *§C (17 rows; DevenChoksey's credit-cost / cost-to-income views removed: a broker's, not
    guidance), §D (16 points with status), §E (dated calendar incl. the forward rows for the Dashboard).
    Every v0 row re-read on its page first; hdfc-v1 grew to 122 entries, all pass.*
  - [x] 0.3d v0 checklist: RoA/RoE Q1–Q2 FY26, NNPA to two decimals
    *Not in the corpus: no 2025 call or KP sheet prints them (searched); the Oct-25 CFO gives only a
    range, "between 1.8% to 1.85% to 1.95%" (Co25 p.11). v1 shows n/f, never a broker's figure as the bank's.*
  - [x] 0.4a capital return, one-offs, annuals, not-in-corpus list
    *Capital return + one-offs were already registered (kpi `cr_*`/`bb_*`, story `q3fy26.*`/`q4fy26.*`);
    new `figures/infosys-v1.json` (55, 55 pass): FY24–26 annuals, segment margins (AR26 p.81 = folio
    111), and the Labour Codes charge's two placements — inside IFRS operating profit (FS3 p.4) but an
    Ind AS exceptional item (CFS3 p.3). FS4 p.5/p.6 confirm all FY26's ₹774 cr tax reversal fell in Q4.*
  - [x] 0.3e/0.4b assemble both dossiers v1; peers to `PEER-ICICI.md` / `PEER-TCS.md`; delete `drafts/`
    *Assembled by script (headings renumbered, cross-refs rewritten, anchors asserted); v0 + drafts
    backed up outside the repo first. HDFC 80 KB, Infosys 81 KB. PEER-TCS corrected: Infosys does
    define its AI share (C-Jul26 p.39); the Labour Codes gap is a presentation basis (IFRS vs Ind AS).
    Ledger A-01/07/08/12/19/27 amended for v1; ANALYST-USER §3's SOTP line corrected.*
- [x] **0.4 Infosys dossier v1.** Same for `research/DOSSIER-INFOSYS.md`: KPI spine to 6–8
  quarters; **guidance ledger** (FY25, FY26 ratchet, FY27 and any revision in the new documents);
  margin bridge per quarter where the call gives one; vertical × geography CC-growth table;
  client buckets; capital return reconciled to the filings; storylines re-checked. *Done when:* same
  as 0.3.
  *2026-10-06: done (see 0.4a, 0.3e/0.4b). The call answers O6: FY27 cut to 1.5–3% CC, CEO succession.*
- [x] **0.5 Peer sheets.** From `data/seed/Additional Documents/`: **TCS** (AR FY25-26, calls Apr and
  Jul 2026) beside Infosys — CC growth, operating margin, TCV, headcount, utilisation, attrition;
  **ICICI Bank** (AR FY25-26, calls Apr and Jul 2026) beside HDFC — NIM (state the basis), CASA,
  loan-to-deposit, GNPA/NNPA, credit cost, RoA/RoE, CET1. Put each as a section in the matching
  dossier. *Done when:* every peer figure is cited and its basis matches the HDFC/Infosys figure it
  sits beside, or the mismatch is stated.
  *2026-10-05: ICICI done — `drafts/peer-icici.md` (34 KB) + `figures/icici.json` 261/261 pass
  (re-run by me). Headlines: like-for-like NIM on IEA 4.36% vs 3.4% (Q1 FY27), 4.32% vs 3.50%
  (FY26); RoA gap 39 bps is margin, not efficiency; credit cost 0.32% vs 0.29% net of recoveries.
  Found a v0 error: HDFC FY26 NIM 3.34% is on average assets (IEA 3.50%, AR26 p.460) — handed to
  the HDFC numbers agent with the other HDFC "⁺" figures. Assembly: the full sheet is too long for a
  dossier section — keep it as `research/PEER-ICICI.md`, put the comparison table + headlines in
  the HDFC dossier. Pair LDR on Mar-26 (86.6% vs 94.6%, both from balance sheets) in the demo; the
  Jun-26 ICICI LDR (≈89.0%) is derived from printed growth, labelled so.*
  *2026-10-06: TCS done too (`tcs.json` 316 entries, all pass). Both sheets live as
  `research/PEER-ICICI.md` / `PEER-TCS.md`; each dossier carries a like-for-like summary (HDFC §F,
  Infosys §E).*
- [x] **0.6 Figure → page checker.** Build `tools/check_figures.py` (+ a `research/figures.json`
  registry: `{id, display, doc, pdf_page, basis, raw_match}` for every figure the prototype will
  show). It opens each cited page with PyMuPDF and asserts the figure's printed form is on it;
  derived figures carry `derived_from` instead and are re-computed. **Must-fire:** run it against
  ledger items A-01 and A-17 as they stand in the baseline HTML and show it fails them. *Done when:*
  the checker exists, fails the two known-bad citations, passes the dossier figures.
  *2026-10-05: built. Registry = `research/figures/*.json` (one file per writer, not one
  `figures.json`: six agents write in parallel) + `docs.json` (codes + the prototype's doc keys and
  `loc` strings as aliases). Two modes: registry, and `--html [--rev]` which reads the prototype's
  `fig()` calls, `XC.v` cells, `{d,p,q}` quotes and `'… p.N'` rows. `--must-fire` runs
  `research/figures/legacy/baseline-must-fire.json`: **4/4 fired** (A-01, A-17, A-21, A-09); their
  truths in `ledger-truth.json` **8/8 pass**. Baseline HTML (`--html --rev 102c2ef`): 380 claims ·
  253 pass · 12 loose · **115 fail** (97 AR printed-folio pages, the rest mostly real: transcript
  quotes one page early, notes carrying another page's figure, derived figures shown as printed) ·
  152 prose-level `{d,p}` cites NOT scanned (said so in the output). Phase 1's worklist. Remaining:
  pass the dossier figures once the agents land them.*
  *2026-10-06: **registry 2,198 / 2,198 pass** (10 files incl. the new `hdfc-v1` 122 and
  `infosys-v1` 61), 0 loose, 0 unverified; `--must-fire` still 4/4. The new entries' own must-fire
  (wrong SOTP, a broken walk total, a bps delta off by 10, a wrong prior target) fired 5/5. A one-off
  lint of the dossiers' prose citations: 1,755 `CODE p.N` cites, every code known and every page in
  range (13 flags, all false positives: a name or "PDF" before "p.N").*
- [x] **0.7 User reviews the dossiers.** Hand over the storyline list per company and the proposed
  "first 90 seconds" content (key figures, the debate, said-vs-did) for sign-off — this is what the
  Library will say. *Done when:* the user signs off.
  *2026-10-06: **signed off**, with phase 0 as a whole. The user asked for phase 1 "quickly and
  efficiently" so phases 2+ (the visible edits) can start in the next chat.*

## Phase 1 — Truth pass *(HTML: data and copy only, no layout)*

**Read:** `ACCURACY-LEDGER.md` (all) · the dossiers · `PROTOTYPE-MAP.md`.

- [x] **1.1** Fix every **P0** ledger item, then every **P1**; mark each `fixed` in the ledger with
  the new line. False gaps are filled by adding the document to the workspace's `DOCS` where it is
  not registered (e.g. HDFC `KP Dec-25`, `KP Mar-26`, the four 2025 calls; Infosys's four 2025
  calls, the consolidated statements, the June press releases) — D2.
- [x] **1.2 One citation convention** — PDF page index everywhere (D5); convert annual-report
  citations that use the printed folio.
- [x] **1.3 No dead citations.** Every citation the live demo path can reach opens a facsimile
  (`EVIDENCE` / `HDFC_EVIDENCE`): transcribe the missing pages (ledger A-15, A-26), starting with the
  first figure of each company's lede.
- [x] **1.4 One demo date** (D15) applied to `TODAY`, document ages, View health, console ages.
- [x] **1.5** Run the figure checker and `verify-prototype`. *Done when:* ledger P0/P1 all `fixed`,
  checker green, verifier green, screenshots show no visual change beyond the corrected content.

**Phase 1 worklist** (2026-10-06, written before the first edit; tick as done). Start state: HTML
= baseline `a721ed23`; checker `--html` 380 claims · 253 pass · 12 loose · **115 fail**; verifier
**261/261**. P2 items that are one-line truth fixes are done here; P2 layout/colour items wait for
their phase (A-27 layout → 3.8 · A-31/A-32 → 6.3 · A-37 → 4 · A-43/A-44/A-45/A-33 → 2.5 · A-46 → 2.3).
- [x] **1a Date + market** (1.4, D15, A-28, A-47, A-12, A-14): trim both daily series at 31 Jul,
  re-derive the price head and 52-week closing range, drop the day range; relabel HDFC monthly;
  document ages, View health, console ages from 31 Jul.
  *Script `market_trim.py` (scratchpad): A-47 re-measured (HDFC monthly = NEXT month-end 59/61), shifted;
  INFY ₹1,130.10 / HDFC ₹748.15, closing 52w 985.30–1,689.80 / 731.55–1,009.50 (`rangeFrom`); day row
  gone; P/E, P/B, upside, market cap re-derived; 14 "10 Aug" canvas stamps → 31 Jul; HUL TODAY 31 Jul.*
- [x] **1b Register the corpus** (D2): Infosys `DOCS` 8 → 19, `HDFC_DOCS` 12 → 20; rewrite
  `GAPS`, `frameMiss`, timeline gap bands to the true-of-the-corpus gaps (dossier §0); A-08, A-18,
  A-20, A-27 extent.
  *New keys: Infosys cfs3/4 sfs3/4 trq1 tr2fy26 tr1fy26 tr4fy25 tr3fy25 prs prc; HDFC ar24 kpq3 kpq4 trq1
  tr2fy26 tr1fy26 tr4fy25 tr3fy25 (aliases in `docs.json`). Posture line now derived (`PROFILE.posture`).
  Both dashboards, gaps, frame lines and timelines rewritten for the Q1 FY27 calls (f1/f4 Infosys
  resolved; HDFC f3/f4/f5/f6; SINCE; HEALTH); both gap bands removed; new events q1g, ceo, review.
  Verifier 258/261: 3 gates hard-code the 8-doc corpus → X9 (scripts/ out of scope).*
- [x] **1c PDF-page citations** (1.2, A-09, A-21): every AR citation on the PDF index, both
  companies' workbook cells + facsimile keys + prose cites; HDFC `ar26 p.1` → real pages.
  *`ar_remap.py`: 155 rewrites. Infosys AR25 +27 / AR26 +30 (verified on page heads). HDFC's were folios
  too: AR25 320/321 → 333/334, AR26 358/359 → 378/379 (statements print ₹ '000; checker factor 1e-4).
  `ar26 p.1` → p.67 / p.30 / p.83. Infosys `ar26|18` quoted text in NEITHER report → re-transcribed p.11.*
- [x] **1d Infosys figures**: A-01, A-02 (+A-11), A-03, A-04, A-05, A-06, A-07, A-10.
  *Series 6/6 quarters (Q1 FY26 derived or from the call, labelled); GEO on CC; segment margins AR26 p.81;
  sub-contractor cost AR26 p.79; AI share + Anthropic from AI Day / Q1 call. FY27 guidance now the July
  band (1.5–3%) everywhere it was stated in the present tense: bridge (re-computed), leads, graph node,
  canvas answer, memo, note. `q4-call` lead rewritten: the April band, then the cut.*
- [~] **1e HDFC figures**: A-16, A-17, A-18, A-19, A-22, A-23, A-25; **A-24 units** (₹ bn → ₹ crore
  in tables / ₹ lakh crore in prose, the printed unit stays in the citation).
  *Done: A-24 (`a24_units.py`, 155 strings + series, 3 workbook sheets re-computed, chart units); A-16/A-18
  in Library "what could change", `commit` event, c-faster, gaps, falsifier f3, forward-model note; A-17
  rows, f4, m-gnpa; A-19 timeline (law-firm finding AR26 p.42, appointment p.38), c-nomat; A-23. HDFC Q3
  call facsimiles + cites shifted one page (cover letter): 3→4, 4→5, 12→13. Payments "20% of fee income"
  was the retail-assets line → 36% (KPj p.2). Left: A-22, A-25, the `cd-glide` lead text.*
- [x] **1f Graph truth**: A-29 counts, A-30 uncited notes, A-34/A-35 HDFC semantics, **A-36 Ask**
  (question shown back; an answer only for the question it answers; honest decline otherwise —
  per-starter answers are phase 4.1).
  *Ask: `S.graph.asked`, question echoed, decline for anything else, typed input passed through; starters
  cut to the one with an answer per company (phase 4.1 adds the rest WITH answers). Scope line counted
  (`askScope()`). Node notes labelled "N4A's reading". `gName()` + `PROFILE.graphNames`: HDFC shows Loan
  product / Branch network / Group company(ies). Both answers updated for the Q1 FY27 calls.*
- [x] **1e (rest)**: A-22 Net NPA row; A-25 "Other retail, incl. gold" + note; `cd-glide`, `q1-selloff`,
  `governance` leads rewritten with verbatim Q1-call / AR26 quotes; NII summary on like-for-like bases;
  canvas step + tour no longer say the Q1 call is absent. Checker 867 · 0 fail.
- [x] **1g Canvas/tour/models**: A-38, A-39, A-40, A-41, A-42 (+A-13).
  *Share modal derives counts from the board; only broker notes withhold, and only for people without the
  research licence. Haystack from `PROFILE`. Empty step → "Step not run". Tour: peers arrive as canvas files.
  `CV_MODELS`/chips/Connectors on the `models.toml` ladder; internal escalation hint removed. One "no view".*
- [x] **1h Facsimiles** (1.3, A-15, A-26): every citation on the demo path opens its page.
  *New `tools/dead_cites.py` (exit 1 on any dead pair): Infosys 44 cited pages · 44 facsimiles · 0 dead;
  HDFC 61 · 62 · 0 dead.*
- [x] **1i Remaining checker fails** (quotes a page early, figures on the wrong page, derived
  figures shown as printed) + the checker learns to verify the 152 prose-level `{d,p}` cites.
  *Checker now scans 174 cite objects + 50 facsimiles (string/comment-aware brace scanner): figures/facts
  are a hard gate (on a cited page, a registered derivation, or a vendor reading); prose numbers a census.
  Derived figures need a passing derivation (`figures/prototype-v1.json`, 28 entries). Timeline figure rows
  may carry their own page (`[label, value, 'doc|p']`, rendered as a p.N link). New `tools/where.py`.
  Result: **863 checked · 818 pass · 45 loose · 0 unverified · 0 fail**; must-fire 4/4; registry 2,226.*
- [x] **1j Close**: checker + verifier green, screenshots both companies, ledger marked, verify card.
  *2026-10-06. Checker `--html` **945 checked · 875 pass · 70 loose · 0 fail** (start: 380 · 115 fail);
  `--must-fire` catches every baseline defect; registry 2,226/2,226. Verifier **258/261**: the 3 fails are
  X9 (gates encode the old 8-doc corpus; `scripts/` out of scope). Ledger: 38 fixed, A-27 partly, 8 P2
  open with their phase. Screenshots both companies, light: content changed, layout did not.*

*2026-10-06: Phase 1 signed off by the user. D16 authorizes parallel phases 2–6 and one integrated verify card. Agent status lives in work/; central checkboxes are ticked only after integration and inspection.*

## Phase 2 — Shell and fineness

**Read:** `review/SHELL-AND-JOURNEY.md` §2 · `review/CROSS-CUTTING.md` (all) · product
`apps/web/app/components/app-navbar.tsx`, `packages/ui/src/tokens.css`, `packages/ui/src/theme.css`.

- [x] **2.1 Top navbar** replacing the rail + topbar (ADR 0139 shape; O2 for the switcher). Search,
  pinned notes, capture, tour, theme and account move to the right cluster; the console header
  becomes the same bar without tabs. Fix tour copy that says "top of the rail" and the boot log.
  *2026-10-06: root integrated a 48 px bar, left workspace picker, six text tabs and right actions; mobile disclosure; console shares height/brand. Offline Instrument Sans (400–700) and Serif embedded. 1440×900 Notes screenshot confirms the shell; remaining full theme/surface pass is integration QA.*
- [x] **2.2 Type.** The three voices (Instrument Serif display ≥18 px only · Instrument Sans body
  with tabular figures · JetBrains Mono for every figure) embedded offline (O4); cut **38 font sizes
  to ~8 steps**; one page-title size.
- [x] **2.3 Tokens.** Sync with the product: add `--ev-estimate`, `--ev-lead`, `--judgment-ink`;
  `--judgment` must differ from `--accent`; a resolved falsifier must not use `--market-up`; notes
  must not be tinted as evidence.
  *2026-10-06: added estimate/lead tokens in both themes and a distinct judgment hue + ink; resolved falsifiers now use neutral slate. Notes semantic cleanup follows phase 6.*
- [x] **2.4 Jargon sweep** — the glossary in `review/CROSS-CUTTING.md` §2; zero hits after.
- [x] **2.5 Punctuation and seam sweep** — em-dash artefacts, stray `,` placeholders, raw enums,
  "Demo · Prototype", "No facsimile… prototype transcribes a subset", "This demonstration stops
  here" (replaced in phase 6), stale model names (`gpt-5.6-luna` → the current catalogue), engineering
  notes on screen.
- [x] **2.6 Number formatter** per D5 for every company; `Q1 FY27` labels everywhere.
  *Done when:* screenshots of every surface, both companies, light and dark; jargon and seam greps
  return zero; verifier green.

## Phase 3 — Library: the first 90 seconds

**Read:** `review/LIBRARY.md` · dossiers · `research/ANALYST-USER.md` §3–5 · product
`apps/web/app/library/` (`key-figures.tsx`, `story-module.tsx`, `attention-module.tsx`,
`series-module.tsx`, `timeline-module.tsx`, `brief-workspace.tsx`, `figure-format.ts`).

- [x] **3.1** Head with the price block (`MarketHeadBlock` pattern); the evidence line becomes one
  quiet row ("19 documents · 15 from the company · 4 outside · Not held: …"); the 268 px market card
  moves behind an expand (or into the Timeline).
- [x] **3.2 Key-figures strip** per sector, from data: HDFC — NIM · CASA · GNPA · CET1 · RoA (+
  loan-to-deposit); Infosys — CC growth vs guidance band · adjusted margin vs 20–22% band · TCV ·
  headcount / utilisation. Value · period · change · basis; basis-break dot; each opens its page.
- [x] **3.3 "This quarter and the debate"** — the print vs guidance; what management said vs did;
  the one debate on the stock; the street view (ratings, targets, basis, price when written).
- [x] **3.4 Said-vs-did ledger** (from the dossier guidance tracker) — as a module or inside 3.3.
- [x] **3.5 What changed → compact table** (metric · sparkline · per-period values · YoY/QoQ ·
  Quarterly | Annual); a row opens the full chart and its coverage note (the coverage essay moves
  there). New series: HDFC advances, credit cost, slippages, loan-to-deposit; Infosys CC growth, TCV,
  attrition.
- [x] **3.6 The story** keeps its voice; sentences marked Filed / Attributed / N4A's reading with a
  "Would be wrong if" line on N4A's readings; a "Since the annual report" current chapter.
- [x] **3.7 Attention cards** lead with the numbers on the card face; plain-language factors.
- [x] **3.8 Timeline** — no clipped or colliding labels; the gap band never overlaps plotted events;
  axis from data; compact with Expand.
  *Done when:* both companies' first screen shows key figures + the debate without scrolling at
  1440×900; every figure opens its page; checker + verifier green.

*2026-10-06: Phase 3 integrated through 33 exact hunks. Six cited key figures, debate/street/said-vs-did, compact Quarterly/Annual series, story standing/current chapter, specific attention face figures and compact/expanded timeline. Added 36 literal source-page extracts. Both-company integrated browser and visual checks passed; see work/FINAL-REVIEW.md. Receipt: work/PHASE3-STATUS.md.*

## Phase 4 — Graph

**Read:** `review/GRAPH.md` · dossiers · product `apps/web/app/graph/`.

- [x] **4.1 Ask answers the question asked** — one scripted answer per starter, the question shown
  back, an honest decline for anything off-record (P0: today every question gets the same answer).
- [x] **4.2 Answer layout** of the product's `ask-answer.tsx`: checked plain answer → standing label
  → Filed figures / Observed / Attributed / Alternatives / Missing / What would discriminate, with a
  citation chip on every line → "Show the N objects it rests on".
- [x] **4.3 Chrome**: one toolbar row (Explore | Table · Sources · Areas · Filter · search · counts);
  the filter menu's "Show" list doubles as the legend; remove origin bar, floating legend, Scope tab;
  Details left and Ask right as resizable panes; arrival row only after a hand-off, and it lands on
  the seed.
- [x] **4.4 Still map** with precomputed positions per area, collision-free labels that never cut a
  number, select → focus, relation names on focused lines; bookkeeping lines (company spokes, source
  links) faint.
- [x] **4.5 Driver chains** (`drives` family): HDFC deposit mix → cost of funds → NIM ← yield → NII →
  RoA (+ costs carrying RoA, the merger as an event, loan-to-deposit, repricing lag); Infosys TCV and
  verticals → CC revenue; utilisation, headcount, subcontracting, Maximus, Labour Codes → margin vs the
  band. Every node and edge cited.
- [x] **4.6 Contradictions** kept and sharpened (rose only for computed contradictions); a "Where do
  the brokers disagree?" starter lights the pairs; broker targets in Details.
- [x] **4.7 Semantics and table**: HDFC subsidiaries → "Group companies"; branch mix → "Branch
  network"; relationship table with an Evidence column (document chips) instead of raw Kind; counts
  correct (ledger A-29).
  *Done when:* every starter returns its own cited answer; the map at rest shows no truncated label;
  both companies screenshot clean.

*2026-10-06: Phase4 integrated through 42 exact base-relative hunks. Five checked starters per company, still map, toolbar/filter menus, resizable panes, cited drivers/relationship table and page extracts. Final both-theme map and answer review passed; event categories and forecast horizons were corrected during integration. Details: work/PHASE4-STATUS.md.*

## Phase 5 — Canvas

**Read:** `review/CANVAS.md` · dossiers (peer sheets) · product `apps/web/app/canvas/`,
`apps/web/app/canvas-files/`.

- [x] **5.1 Story mode** — a play bar that builds the board from blank in captioned stages: the
  question → sources (page-1 thumbnails) → wires → the AI step runs (trace ticks, citations arrive) →
  the workbook fills cell by cell with page pins → the memo drafts and the analyst writes "Our view".
  Finale: edit one cell, amber travels to exactly one memo section.
- [x] **5.2 Legibility**: numbered stage rail with plain verbs; a one-line caption on each step
  ("Compared the Q3 call with the Q4 print · 4 sources · 4 citations · 1 gap · AI"); authorship (AI
  vs You) on every card + a small legend; the product's three wire styles; provenance path highlight
  from a memo citation back to its source card.
- [x] **5.3 The file beat** — drop a real peer document (TCS or ICICI) onto the board: overlay →
  Reading → Ready · canvas only → wire it → the step waits, re-runs → the memo's peer section re-drafts
  with new citations; the Library count does not move.
- [x] **5.4 Results-day work**: forecast columns (FY27E/FY28E), actual vs guidance vs our estimate
  (consensus = honest boundary, D2), an estimate-change table; basis reconciliation as a visible step.
- [x] **5.5 End in an IC pack** — memo + exhibits + model + the rating/target linked to Dashboard
  conviction; export.
- [x] **5.6 Continue on Canvas** from a Graph answer into an Ask node led by checked sentences.
- [x] **5.7 Canvas bugs** (ledger A-38 … A-42).
  *Done when:* a first-time viewer can narrate the board from the story mode alone; both companies
  run end to end.

*2026-10-06: Phase5 integrated through 24 exact hunks. Seven-stage story, peer read/wire/run/redraft, explicit user forecasts, HTML/CSV IC export and checked Graph hand-off. Both-company real-browser lifecycle and focused polish checks passed; actual PDF thumbnails, provenance wires and reduced-motion cell progression reviewed. Peer pages use separate canvas registry; no Library mutations. Details/limitations: work/PHASE5-STATUS.md.*

## Phase 6 — Journey and close

**Read:** `review/SHELL-AND-JOURNEY.md` §1, §4 · `review/DASHBOARD-NOTES-CONNECTORS.md` · O1, O5.

- [x] **6.1 Intake ending** per O1 (HUL kept, D6) and, if agreed, O5.
- [x] **6.2 Console as the coverage book**: coverage age (spec §9.1, `coverage()` already computes
  it), conviction capitalised, triggered falsifiers, next dated event per company.
- [x] **6.3 Dashboard** (D7): valuation frame (target / fair-value band, method, horizon, upside vs
  price, bull/base/bear — from the broker SOTPs in the dossiers, labelled as the brokers'), dated event
  calendar, `Triggered` falsifier state, reason recorded before conviction moves, role check on
  conviction.
- [x] **6.4 Notes**: dated entries and note types (call · meeting · channel check); capture keeps the
  current object as a reference and stays on the page; no rotated stickies; edit icon not a wand.
- [x] **6.5 Connectors**: one authority ladder; "where does my data go" per model provider; current
  model names.
- [x] **6.6 Tour** re-cut as one thread of 10–12 steps: console → a lead → its evidence page → the
  Graph contradiction → the Canvas memo turning amber → a captured note → a falsifier → conviction
  change → decision log → hand-over.
- [x] **6.7 Close**: full screenshot pass, final verify card, hand the outside-scope log to the user,
  O7.

## Out of scope (whole task)

Product code · every doc outside this folder · `scripts/` · seed files · the AI pipeline · any data
not in `data/seed/` · the Notes/Connectors redesign beyond D7.


## Integrated implementation receipt — 2026-10-06

Phases 2–6 are implemented and integrated under D16. Checked boxes record implementation and agent review, **not the user's manual sign-off**. Next action: the user follows [VERIFY.md](VERIFY.md) and signs off or requests specific refinements. No changes outside the prototype and this folder.

- **2.2–2.6:** offline Instrument Sans/Serif and JetBrains Mono, eight CSS size steps, consistent page titles, distinct semantic inks, plain claim directions, repaired placeholders/account identity, source-record wording and company-neutral search. Both themes reviewed. True minus and Indian grouping retained; original PDF passages keep their printed units and wording.
- **3.1–3.8:** Library head, six cited key figures and debate fit the first desktop screen for both companies. Drawers, guidance ledger, annual/quarterly compact series, chapter standing, numeric attention and expanded timeline integrated. HDFC's provision buffer is an explicit registered calculation; the bank/system growth comparison cites each page separately.
- **4.1–4.7:** distinct page-backed starter answers, scoped refusal, own-answer object focus, still map, resizable panes, filter/legend, source-backed drivers, evidence table. HDFC forecast horizons and differing expectations are amber tensions; historical events are distinct from subsidiaries. Interpretations use N4A reading standing.
- **5.1–5.7:** seven-stage replay, actual PDF thumbnails, cell-wise model arrival, source-to-output wire highlight, canvas-only peer file lifecycle, results-day basis/estimates, checked Graph continuation and HTML/CSV IC exports. Exactly the model-backed memo section goes amber after the model edit. Captures retain peer pages after company switches without promoting the peer to Library.
- **6.1–6.6:** HUL source-record completion, coverage ages/triggered counts/next dates, broker valuation bases and user scenarios, event calendar, reason-before-owner-decision, dated journal with preserved context, provider disclosure/permissions, and 11-step whole-loop tour. HDFC Commenter remains read-only for conviction.
- **6.7:** combined verification card, screenshots and machine receipts provided. Repository verifier expectations that conflict with the new corpus or designed HUL completion are preserved and recorded in DECISIONS X9/X10; no gate or out-of-scope script was changed. Optional O5 remains deferred; O7 remains the user's folder-retention choice.

Evidence and limits: work/FINAL-REVIEW.md (reference outside this repository: `work/FINAL-REVIEW.md`), work/EXECUTION.md (reference outside this repository: `work/EXECUTION.md`), and the per-phase receipts. AI and ingestion are offline scripted sequences; no live service or provider was exercised.
