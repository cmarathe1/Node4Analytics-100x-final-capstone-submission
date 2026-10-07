# Review — Canvas (the working board)

> **status:** working (temporary) · **authoritative for:** findings on the prototype's Canvas versus
> the built product, process clarity for a demo audience, and the port list for phase 5 · **last
> verified:** 2026-10-05 at baseline `102c2ef`.

Sources: the Canvas review agent (prototype + `apps/web/app/canvas/**`, `apps/web/app/canvas-files/**`,
ADRs 0034, 0039, 0148–0153) and a rendered screenshot of the Infosys board. The founder's own
observation: *"adding new files is something not there, and I would like to show the process in a much
better and clearer way that makes it intuitive to follow in the demo."*

## 1. Prototype anatomy

- **The loaded board is three jobs, not six stages.** Infosys (sections 4776–4783, nodes 4785–4822,
  wires 4830–4841, layout plan 7864–7868) has **9 cards** in three sections:
  - *FY26 Model Update* — AR FY25, AR FY26 and FS Q4 feed one workbook (P&L, balance sheet, cash flow,
    Q4-update sheets; 5057–5116).
  - *Q4 Results Delta* — the Q3 call, a news article and an analyst sticky note feed the AI step
    "What changed since the Q3 call?" (4809–4817).
  - *FY27 IC Memo* — four sections; "Our view" owned by the analyst (5201–5229).
  - HDFC loads the same shape with 10 cards (`HDFC_DEMO_*` 13622–13699, bound at 14235).
  - The six-stage board (scope · series · basis · record · model · write; 13462–13605) is kept but
    **not loaded**; also unloaded: Infosys's bridge workbook, the questions document and the claim
    tables (4994–5051, 5179–5195, 5231–5287). `PHASE-2-PROTOTYPE.md` §4 describes the unloaded board
    (outside-scope X1).
- **Node types** (4861–4876): source · sticky note · AI · table · chart · Excel · document. Port rules
  7801–7811 (an AI node accepts no data input, 7802). Wire kind comes from the ports (7960); scope is
  one hop (7992); an input hash makes steps stale (8056–8079). Grid auto-layout (7872–7921); below 0.44
  zoom cards switch to large labels (8285–8292).
- **Sections** are tinted regions; their explanatory `what` text shows only in the inspector (8957);
  deleting one asks two questions (9348–9377).
- **Runs** stream a canned answer with trace rows (8435–8440) and a toast that downstream steps went
  stale (9133). A memo draft declines when its brief names something nothing wired mentions
  (9163–9200). *Update facts* (8742–8745).
- **Focus views** (9995–10448): source facsimiles with authority; the AI step's citations, a "what
  this step did" trace and run history; workbook edit sessions with a colour key; memo Edit/Preview
  with endnotes. The assistant rail has replay chips; turn receipts are built from the operations
  (10386).
- **Sharing and presence** (10450–10547, 8139–8143, 8207–8212): avatars, cursors anchored to cards,
  comment pins, roles with "withheld" sources.
- **Inspector** (8921–9035): wire counts, scope list, model select, output type, the workspace-scope
  opt-in, source authority. **Tour:** canvas steps at 11546–11587 and 14109–14148.

## 2. Where the product is better (port these back)

- **Adding files.** In the prototype the step picker offers only Library documents (9512–9519); the
  only drag-and-drop belongs to workspace intake (16110–16126). The product drops files straight on
  the board: `canvas/file-drop.tsx` (`useBoardFileDrop`; `FileDropOverlay` — "Drop to read on this
  canvas… canvas only — not added to the Library"); `canvas-files/routing.ts` routes PDF/Word/text to a
  Source and `.xlsx` to a workbook; `node-picker.tsx` groups *Library* and *Canvas files* and offers
  *Upload a file…*; `canvas-files/mark.tsx` (`CanvasOnlyMark`) and `canvas-files/actions.tsx`
  (`CanvasFileActions`) give *Add to Library… → File it under* and a delete that names everything
  citing the file; the AI step waits by name for a file still being read (`nodes.tsx` 522–533).
- **Page-1 thumbnail** on Source cards (`source-preview.tsx`) vs the prototype's striped "AUDITED · AR
  FY26" label (8385).
- **Continue on Canvas.** `graph/ask-answer.tsx` `ContinueOnCanvas` (373–428) moves a Graph chat onto
  the board; `ask-node.tsx` shows the answer led by checked sentences (`LeadPreview`), Filed / Observed
  / Attributed rows (`CardSections`) and a follow-up composer. The prototype has no Graph → Canvas route.
- **Steps chain by their evidence.** The AI node has a data `in` port (`nodes.tsx` 372–377); an
  upstream step that has not run blocks the run ("Waiting on 'X' — run it first"); carried citations
  still resolve to the filing pages (ADR 0152 D3, 0153 D2).
- **Model + effort picker** (`model-picker.tsx` `ModelSelect`) — two controls from the model
  catalogue. The prototype's list is stale (9036–9037).
- **Usage meter** (`usage-meter.tsx` `UsageMeter`, `UsageSection`) — tokens and USD per operation and a
  board total; ≈ when estimated; "not priced" rather than $0.
- **Scope mark** (`scope-mark.tsx` `OffInLibrary`) — a source switched off in the Library is marked
  quietly, never blocked.
- **Wires that read at a glance** (`edges.tsx`) — context dashed; data solid with a travelling dot
  (`animateMotion` 62–64); live as marching dashes. The prototype draws one faint line at 0.55 opacity
  and shows its meaning only on hover (1521–1541, 8767–8791).
- **Output choice explains itself** (`inspector.tsx` `OutputChoice` 229–267).
- **A blank board with three ways to start** (`canvas-workspace.tsx` `BlankBoard` 931–1006).
- **An answer that cites nothing is declined** (ADR 0148 D4).

## 3. What the prototype has that the product lacks (keep)

- A **trace of what a step did**, on the AI card and in its focus view (8435–8440, 10110–10116) — the
  product's `panels.tsx` `TraceRow` shows only in assistant chats.
- **Sharing**: roles, *withheld* sources, presence, comment pins anchored to cards.
- **Absence drawn as data**: empty cells with stated reasons (4888–4911), chart gap bands
  (8583–8590), a coverage sheet.
- **Contested rows** in tables (8491, 10176).
- **Source cards say who reads them** — "read by N steps / in no step's scope" (8389–8391).
- **Turn receipts built from the operations**, never from model prose (10386–10397).
- **Grid auto-layout**, **section narratives**, a guided tour.

## 4. Process clarity — the founder's main concern

A first-time viewer sees a **finished, static board at ~0.5 zoom with ~10 px text** (screenshot: the
three sections are legible as shapes, nothing inside is readable). The story does not come through:
- **No order.** Sections are unnumbered (the legacy ones were "1 · …"); their explanations hide in the
  inspector. Leftover CSS and comments show a stage rail and caption existed and were removed
  (`.cv-stages` / `.cv-caption` 3116–3128; comment at 9053).
- **Nothing moves.** Every step is already "Done". Re-running streams text into one card; no evidence
  visibly travels. The `flowdash` animation is defined but never used (1531).
- **The wires don't speak** without hovering.
- **Who did what is illegible.** The analyst's hand shows only as the yellow sticky (the tour calls it
  "the yellow card", 11568) and a "✎ yours" chip inside the memo; AI and human work look the same.
- **Provenance is invisible on the board.** Memo sections record which step they came from (`from`);
  nothing draws it.
- **No way to add a file.**

**Proposed mechanisms:**
1. **Story mode (replay).** A bottom play bar (◀ 2/6 ▶ ⏵) rebuilds the board from blank: ① the
   question — the sticky lands first, centred · ② sources drop in with page-1 thumbnails · ③ wires draw
   · ④ the AI step runs — trace rows tick, pulses travel source → AI, the [1]–[4] chips fly in and attach
   · ⑤ the workbook fills cell by cell, each cell with its page pin · ⑥ the memo drafts; the analyst's
   avatar types "Our view". **Finale:** edit one cell and amber travels to exactly one memo section.
   Reuse `cvGoStage` (9072) and node dimming (`.cv-node.dim` 1564) as the spotlight.
2. **Numbered stage rail** with plain verbs and a status per stage: "1 Frame · 2 Gather · 3 Model ·
   4 Test · 5 Write"; clicking flies to it.
3. **A one-line caption on each step**, before the detail: "Compared the Q3 call with the Q4 print ·
   read 4 sources · 4 citations · stopped at 1 gap · by AI".
4. **Authorship**: ✦ AI vs a "You" chip on every card; workbooks show "4 AI edits · 1 yours"; a small
   permanent legend (Source · Your note · AI step · Output, and the three wire kinds).
5. **Wires that speak**: the product's three edge styles; at readable zoom, mid-wire chips ("reads
   pp.1–2", "carries 4 citations").
6. **Provenance path highlight**: hover any [n] in the memo and the path back lights up (memo section →
   AI step → FS Q4 card), the card's thumbnail flipping to the cited page.
7. **The file beat, before/after**: open on the memo's own "Next evidence" gap or a declined *Peer
   comparison* section (restore from 5150–5152, 5170–5175) → drag a **real peer document** (TCS for
   Infosys, ICICI Bank for HDFC — D2) onto the board → overlay → *Reading* → *Ready · canvas only* →
   wire it → the step shows "waiting for 1 source", re-runs → the memo section re-drafts with new
   citations → show the Library count did not move, and that *Add to Library* refuses another
   company's filing. No fabricated file, ever.

## 5. Fineness gaps (beyond the ledger's A-38 … A-42)

- **Jargon:** "assistant", "memo · living", "workbook · live", "note · manual", "live · v5",
  "deterministic", "inputs unchanged", "Output contract", "one hop only", tool ids like
  `read_scope` / `align_periods`, the section name "Q4 Results Delta".
- **Density:** three near-identical source cards per section; 9.5–10.5 px text.
- **The loaded workbook and memo chats lack traces and receipts** (5111–5115, 5225–5228) — only the
  unloaded legacy ones have them, so "↺ replay" shows a bare bubble.
- **Orphaned code:** `flowdash`, `.cv-stages`, `.cv-caption`, `HDFC_CV_TABLES` bound but never read.

## 6. Analyst critique

**What is real:** genuine sell-side work — an annual report becomes a model with page-cited cells; the
exceptional item kept on its own line; reported vs adjusted margin as separate rows; "what changed
since the call" is a real earnings-review task; an IC memo with an analyst-owned "Our view" and a
"Next evidence" list is right; honesty about gaps differentiates.

**What is missing:**
- **No forecast.** The workbook is history only; a model exists for FY27E/FY28E drivers, EPS and a
  target or multiple. The legacy bridge (4994–5051) had a guidance band but isn't loaded.
- **No variance table.** Results day is actual vs guidance vs our estimate vs consensus. The guidance
  data exists (FY26 3.1% against a guided 3.0–3.5%, 4943); consensus needs a connector → honest
  boundary (D2).
- **No estimate-revision table** (old vs new EPS).
- **Basis reconciliation is buried** in a sheet; the legacy HDFC basis step (13538–13545) showed it as
  a step.
- **Peers are absent** — TCS and ICICI documents exist (D2).

**What makes an analyst say "that's my workflow, faster":** a results-day sequence with timestamps —
factsheet dropped at 16:05 → the Q4 column filled with cited cells + variance + estimate changes → a
change note → the memo flash by 16:30, every number one click from its page.

**What the board ends in:** an **IC pack**, not just a memo — the memo with exhibits drawn from the
board's charts, an estimate-change table, a rating/target line linked to Dashboard conviction, the
`.xlsx` model, endnotes; exportable (.docx export already exists).

## 7. Port list for phase 5 (ranked)

1. **Story mode** that builds the board from blank with stage captions.
2. **The product's three wire styles** with the travelling dot, mid-wire chips and the provenance path
   highlight.
3. **The file-drop before/after beat** with a real peer document.
4. **Authorship on the board** — ✦ AI vs "You" + a legend.
5. **Numbered stage rail** with plain names (restore what was removed, better).
6. **Results-day forecast and variance** — forecast columns, estimate-change sheet, actual vs guidance
   vs our estimate.
7. **Continue on Canvas from Graph** into an Ask node led by checked sentences.
8. **The declined peer section and the computed contest table** as an optional stage — trust in
   action.
9. **The fineness bugs** (ledger A-38 … A-42, orphaned CSS, receipts on replayed turns).
10. **End on "Open the IC pack"** — memo preview, exhibits, the model, the conviction link.
