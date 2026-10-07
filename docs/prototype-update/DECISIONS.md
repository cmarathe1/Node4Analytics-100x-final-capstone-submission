# Prototype update — decisions, doctrine, open questions

> **status:** working (temporary) · **authoritative for:** every decision the user has made for the
> prototype update, the doctrine the work follows, what is still open, and what was found outside
> scope · **last verified:** 2026-10-06 (O6 answered by the new Q1 FY27 calls).

The user agreed to **every** recommendation, finding and piece of reasoning in the review on
2026-10-05, with two amendments (D3, D6). Record new decisions here as `D15…`, with the date, the
moment they are made.

## Agreed decisions

**D1 · Audience and format.** The demo is **presenter-led, 15–20 minutes, for buy-side analysts and
PMs** (sell-side analysts are the secondary audience). The guided tour is the **leave-behind**, not
the live path. Consequence: dense, expert screens are right; every screen must make sense in ten
seconds of narration; the live path must never hit a dead end or a wrong answer.

**D2 · The gap doctrine — three kinds of gap.** The prototype's founding rule was *"the gaps are the
product argument"* (`PHASE-2-PROTOTYPE.md` (reference outside this repository: `../specs/PHASE-2-PROTOTYPE.md`) §1). It stays, but is
sharpened, because the review found most of the prototype's gaps are not true of the documents:

| Kind | Example | Treatment |
|---|---|---|
| **True of the corpus** — the documents do not hold it | HDFC has no Q4 FY26 / Q1 FY27 earnings-call transcript (until the user adds one) | stays visible, **quietly** |
| **True only of the pipeline or the prototype** — the documents hold it, nothing extracted it | Infosys Q3 FY25 revenue "not acquired" though FS Q3 p.4 prints it; HDFC's loan-to-deposit ratio "absent" though the Q1 deck p.5 balance sheet gives it | **filled from our own research**, cited to doc + PDF page — this is the end product doing its job |
| **Needs data nobody gave us** | consensus estimates; live peer prices | an explicit, honest **boundary** (e.g. *"No consensus feed connected"*), never invented |

**Peers are real, not invented:** TCS (for Infosys) and ICICI Bank (for HDFC Bank) each have an
annual report FY25-26 and two earnings calls in `data/seed/Additional Documents/`. Neither is a
held-out issuer. Per ADR 0069 D1 / 0149 D5, another company's documents arrive on the **Canvas** as
canvas files, not in the Library.

**D3 · The demo date and newer documents.** *(User amendment.)* The user will **add newer documents
to the company seed folders** (`data/seed/HDFC Bank/`, `data/seed/Infosys Ltd/`) **before phase 0
research starts** — e.g. Infosys Q1 FY27 factsheet and call, the HDFC Q1 FY27 call transcript. Phase
0 then sets one demo "today" for every workspace: just after the newest document in either corpus.
Today's file has `TODAY = '31 Jul 2026'` while the price data runs to 6 Aug (INFY) / 7 Aug (HDFCBANK),
a known inconsistency (ledger A-28). If "today" lands after the price data ends, the price history
must be re-pulled for real — see O3.

**D4 · Follow the product, lead where the vision is ahead.** Adopt the product's design system and
module patterns wholesale — the 48 px top navbar (ADR 0139), the three type voices and current tokens,
the Library's key-figures strip and compact series table, the Graph's toolbar / filter menu / panes /
structured answer, the Canvas's wire styles, file drop, model picker and usage meter. **Lead** only
where the vision is ahead of the build: contradictions drawn on the graph, Canvas story mode,
results-day forecast and variance, the IC pack, a valuation frame and event calendar on the Dashboard,
the said-vs-did ledger, the broker grid with basis. The prototype keeps a **real workspace switcher**
(it holds several companies; the product only states the workspace) — placement is O2.

**D5 · Units, periods and number formatting — one convention for every company.**
- Money: **₹ crore in tables, ₹ lakh crore in prose**, Indian digit grouping (`1,78,650`); the
  source's printed unit (HDFC's deck prints ₹ bn) appears in the **citation**, never mixed into the
  figure. Port the semantics of the product's `apps/web/app/library/figure-format.ts` (precision as
  printed by the source).
- Periods: **`Q1 FY27`**, never `Q1'27` (reads as calendar). Indian FY: FY27 = Apr-2026 → Mar-2027.
- Ratio changes in **bps**; share changes in **pp**; a true minus `−`, never a hyphen.
- Every number shows its **basis** where more than one exists: standalone / consolidated · period-end
  / average · NIM on total assets / on interest-earning assets · reported / adjusted · ₹ / US$ /
  constant currency.
- Timestamps IST.
- **Citations use the PDF page index** (what a page-opening viewer lands on), never the printed folio.

**D6 · Hindustan Unilever stays the intake's third company.** *(User amendment.)* The intake keeps
creating HUL. How the intake *ends* is still open (O1), because today it ends on *"This demonstration
stops here"*.

**D7 · Depth on the three unbuilt surfaces.** Dashboard gets a **valuation frame, a dated event
calendar, a `Triggered` falsifier state** and *reason-before-conviction-moves*. Notes and Connectors
get **polish only** (plus Notes capture keeps its context and stays on the page; Connectors gains a
plain "where does my data go" line).

**D8 · Where the research lives.** The per-company research dossiers live in this folder
([`research/`](research/)). The seed file `data/seed/HDFC Bank/HDFC-analyst-report-BNP Paribas.pdf`
is in fact a **Geojit** note (geojit.com on p.1; signed by Arun Kailasan, p.4) — the user owns the
seed folder and may rename it; if renamed, phase 0 updates references here.

**D9 · Scope rule.** Only `N4A-Prototype.html` and this folder change. See README §"Scope rule".

**D10 · Order and cadence.** Phases 0 → 6 in [`PLAN.md`](PLAN.md). Each phase ends with screenshots
of both companies, `verify-prototype` green and the user's sign-off.

**D11 · Accuracy before polish, and an instrument for it.** One wrong number discredits everything
around it (research: the #1 distrust trigger), and corrected data changes what the layout must hold.
`scripts/verify-prototype.mjs` checks wiring, not truth (261/261 green with every ledger defect
present), and `scripts/` is out of scope — so a **figure → page checker** lives in `tools/` (phase 0
builds it; phase 1 runs it).

**D12 · Voice: substance first, provenance one click away, bookkeeping quiet.** The prototype talks
about its evidence more than about the company (see `review/CROSS-CUTTING.md`). The end product
leads with the business; provenance sits *on the number* (one click to the page); honesty about
coverage is present but quiet — the user's standing rule that bookkeeping is disclosed subtly and on
demand. Prominence is earned only by what changes the analyst's judgment (a real contradiction, a
missing figure they asked for). **Keep the prose voice** — it is genuinely expert ("That gap is not
lending. It is cost and credit.").

**D13 · What the demo leads with.** Call summaries and guidance trackers are commodity among Indian
AI tools launched 2025–26 (`research/ANALYST-USER.md` §2). The demo leads with what is not:
1. every number clickable to its page **with its basis printed**;
2. a **said-vs-did** ledger with outcomes;
3. **broker views reconciled** to a common basis (Axis reports standalone, Geojit consolidated);
4. growth **adjusted for one-offs with the adjustment visible** (HDFC's HDB IPO gain; Infosys's ₹774
   cr tax reversal and ₹1,289 cr Labour Codes charge);
5. an **honest boundary** of what the documents do not cover.

**D14 · Standing directives for the prototype** (carried from earlier work).
- Single hand-built file, buildless, no network, edit in place; run `verify-prototype` after any
  data-shape change.
- **No manufactured data.** Every figure is transcribed from a document in `data/seed/` and carries
  its page. Hand research is not manufacture — it is the analyst's work done carefully, cited.
- **Provenance on every individual figure.**
- **No em dashes in prototype copy.** A bulk em-dash replacement left broken punctuation
  ("Fact Sheet. Consolidated", "Anthropic. Claude") — fix by rewriting the sentence, never by a
  mechanical substitution.
- Light is the default theme on every machine.
- No issuer name in a renderer; company-shaped content is data bound by `bindCompany()` — the second
  company is the honest test that nothing is templated.

**D15 · The demo date.** *(2026-10-05, phase 0.2.)* One "today" for every workspace: **Friday 31 Jul
2026, IST**, three days after the newest document in either corpus (the Infosys Q1 FY27 call
transcript, filed 28 Jul 2026; HDFC's Q1 FY27 call was filed 24 Jul). `TODAY` already reads
`31 Jul 2026`, so it stays. Both price series hold a 31 Jul bar (INFY ₹1,130.1, HDFCBANK ₹748.15)
and run past it to 6 / 7 Aug, so **O3 is answered: no re-pull**. Phase 1 trims both daily series at
31 Jul and re-derives, from the file's own bars, everything read off the last bar: price, previous
close, change, volume, `asOf` ("31 Jul 2026 · close"), and the 52-week range over 1 Aug 2025 –
31 Jul 2026, **labelled a closing range** (the daily bars hold close and volume only). The day's
low / high are not in the file: drop the day range rather than invent it (a re-pull would restore
it — a network action, ask first). Document ages, View health and console ages count from this
date (phase 1.4). The HDFC monthly series is misdated (ledger A-47) and is fixed in the same pass.

**D16 · Parallel implementation, 2026-10-06 (user instruction).** Phase 1 is signed off. Implement phases 2–6 concurrently, then present one integrated visual/interaction review. This overrides D10’s sequential phase approval cadence for this run. Root integrates isolated HTML copies; agents never rewrite the shared file. Scope remains D9. HUL uses O1(b), a designed completion state without reading held-out documents. O2 uses the recommended left-hand workspace picker. O5 remains optional and is deferred. Durable ownership/status: work/EXECUTION.md.

## Open questions

| # | Question | Recommendation | Decide by |
|---|---|---|---|
| O1 | How does the HUL intake end? | (a) open a **thin but real HUL brief** built from its AR FY25-26 + two calls — "correct or honestly degraded", which is exactly the held-out doctrine's own test; or (b) a graceful, designed end state instead of a toast. ⚠ **HUL is a held-out issuer for the product pipeline** (AGENTS.md). Hand-researched demo content tunes no pipeline, but the prototype is the product's visual target — **ask the user before reading HUL's documents**. | phase 6 start |
| O2 | Where does the workspace switcher sit in the navbar? | Left, after the logo: `N4A · Console › Infosys ▾ · Library Graph Canvas …`. ADR 0139 D3 states the workspace on the right with no picker; the prototype diverges because it holds several workspaces. | phase 2 verify |
| O3 | If the demo date passes the price data (6–7 Aug 2026), re-pull prices? | **Answered 2026-10-05 (D15): no.** The demo date (31 Jul) is inside the data; trim, don't pull. | ~~phase 0~~ |
| O4 | Fonts: embed Instrument Serif / Instrument Sans as base64 (the file must stay offline)? | Yes, subsetted to Latin + ₹; watch file size (1.1 MB today). Find the files the product uses (`packages/ui`) first. | phase 2 |
| O5 | Add an "Add sources to an existing workspace" beat on Infosys as well? | Optional second intake beat: adding documents to an existing workspace visibly updates its brief (the guidance ledger fills). Decide after O1. | phase 6 |
| O6 | Events reported on the web after the corpus (Infosys FY27 guidance revised 23 Jul 2026; CEO successions at both companies) | **Answered 2026-10-06 from the corpus.** Infosys: FY27 guidance cut from 1.5–3.5% to 1.5–3% CC on 23 Jul 2026 (C-Jul26 p.29, p.33; the April band confirmed by the CFO, p.34), and Ashiss Dash named CEO from 1 Apr 2027 (C-Jul26 p.27). HDFC Bank: **no succession in the corpus**: the CEO's term ends 26 Oct 2026 (AR24 p.512) and the reappointment is "work in progress" (Cjl26 p.8). Only the documented events enter the prototype. | ~~phase 0~~ |
| O7 | The folder's fate at close; landing the outside-scope log | User's call. | close |

## Outside-scope log (found during this task, NOT fixed — for the user)

| # | Where | What | Found |
|---|---|---|---|
| X1 | `docs/specs/PHASE-2-PROTOTYPE.md` §4 | Describes a six-stage Canvas board (scope · series · basis · record · model · write) that the demo no longer loads; the loaded board is three jobs (Model update · Results delta · IC memo). §1's "the gaps are the product argument" should gain D2's three kinds. | 2026-10-05 |
| X2 | `data/seed/HDFC Bank/` | `HDFC-analyst-report-BNP Paribas.pdf` is a Geojit note (D8). `HDFC-Concall-Transcript-Mar-2026.pdf` is the 19-Mar-2026 **governance investor call** on the chairman's resignation, not an earnings call. | 2026-10-05 |
| X3 | `data/seed/Infosys Ltd/` | `Infosys-Concall-Transcript-Feb-24-2026.pdf` is the **Investor AI Day** (held 17 Feb 2026, filed 24 Feb), not an earnings call. | 2026-10-05 |
| X4 | `apps/web/app/layout.tsx` | Follows the OS theme, while ADR 0075 D5 makes light the default (prototype is right). | 2026-10-05 |
| X5 | product Library (HDFC) | The story reads like a compliance summary ("says it has a compliance policy"); business structure reads the RBI segment note (Treasury / Retail digital / Wholesale) rather than the loan book by product — the prototype's choice is the more useful one. | 2026-10-05 |
| X6 | product Graph | 0 of 331 Infosys claim citations carry a snippet, so no verbatim quotes can show. | 2026-10-05 |
| X7 | product pipeline (`data/derived/foundation/hdfc-foundation.md`) | Zero claims extracted from the Geojit file, the three key-parameter PDFs and the Upstox article. | 2026-10-05 |
| X9 | `scripts/verify-prototype.mjs` | Three gates encode the old 8-document Infosys corpus and fail once phase 1 registers the true 19 (D2): **"the two workspaces differ in age tier"** (both are truthfully *fresh* at 31 Jul: Infosys 8 days, HDFC 11; the gate should assert the tier is *derived*, e.g. move `TODAY` in a copy and watch the tier change, not that two real corpora differ) · **"an eight-document batch takes 14–26s"** (its clock stops at 30 s; a 19-document batch takes ~33 s, which the HUL gate already accepts at 26–40 s) · **"no quiet stretch longer than ~4s"** (4.5 s: the 11 newly registered documents yield no graph objects yet, so the forming graph pauses while they read; phase 4 cites graph objects to them, which should restore the cadence). Proposed: let the pace gates scale with `DOCS.length`, like the HUL gate. Not edited (scope rule). | 2026-10-06 |
| X8 | Claude memory `prototype-single-file-no-build` | Said the prototype is "one company (Infosys) only" — stale since HDFC and HUL were added. **Fixed 2026-10-05** (Claude's memory lives outside the repo), and a memory pointer to this folder was added so a fresh chat finds it. | 2026-10-05 |

**X10 · Existing verifier and the designed HUL completion (2026-10-06).** The final wiring verifier additionally fails ‘and offers the brief’: its literal fixture expects `Open coverage brief`. D16 selected O1(b), so the truthful action is `Review source record`, and completion explicitly says no finished HUL brief is shown. The actual staged intake and both completion actions pass the browser journey checks. Preserve this designed boundary; update the out-of-scope script separately. Final verifier: 257/261, versus Phase 1's 258/261; the additional failure is the changed, agreed completion action, not a runtime defect.
