# Prototype update — the working folder

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](../README.md) for current scope.

> **status:** working (temporary) · **authoritative for:** the side task that refines
> `N4A-Prototype.html` (reference outside this repository: `../../N4A-Prototype.html`) into an expert-grade showcase of the end product —
> its decisions, plan, findings and research · **last verified:** 2026-10-06 (phase 0 signed off;
> phase 1 signed off; phases 2–6 integrated and reviewed; user visual sign-off pending).

**Start every new chat here.** This folder is the memory of a multi-chat task. The chat that produced
it ran a seven-agent review (four surface reviews, one analyst-user study, two page-by-page corpus
scans) plus rendered screenshots of every surface for both companies, and the user agreed to every
recommendation on 2026-10-05. Nothing you need from that chat lives anywhere else.

## The task in one paragraph

The prototype is what the founder shows prospective analyst-users to convey what N4A will become. The
product (`apps/web`) has since built Library, Graph and Canvas, and in places it is now *better* than
the prototype (top navbar, Library layout, Graph filters and calm, Canvas file handling). The
prototype also lacks *fineness*, and in places it is *wrong*. The goal: make it the showcase of the
**ultimate** product, built on **real research of the real documents** — what an expert analyst would
want to see from these filings, connected across documents, every figure cited to its page.

## Scope rule — read twice

**Only two things change during this task: `N4A-Prototype.html` and this folder.** No product code,
no other doc (not `SESSION.md`, `PROGRESS.md`, `ROADMAP.md`, ADRs, specs, `docs/README.md`), no
`scripts/`, no seed files (the user owns `data/seed/`). Anything found elsewhere that needs fixing is
written to [`DECISIONS.md`](DECISIONS.md) §"Outside-scope log" for the user to act on. A tool this
task needs lives in `tools/` (reference outside this repository: `tools/`). This folder is deliberately absent from `docs/README.md`'s map
— it is temporary; the user decides at close whether it is archived or deleted.

## How to start a new chat

1. Read this file, then [`DECISIONS.md`](DECISIONS.md) (every agreed decision + the open ones).
2. Open [`PLAN.md`](PLAN.md), find the current implementation or manual-review checkpoint, read only its section.
3. Read only the review/research files that phase names. Never read the prototype whole (16,285 lines,
   1.1 MB) — use [`PROTOTYPE-MAP.md`](PROTOTYPE-MAP.md) and Grep.
4. Work the phase subtask by subtask; tick each in `PLAN.md` with a two-line note. The plan file is
   the memory — whatever it does not say is lost at compaction.
5. Under D16, phases 2–6 share one final review in [VERIFY.md](VERIFY.md). Keep screenshots of **both** companies (`tools/shoot.mjs` (reference outside this repository: `tools/shoot.mjs`)),
   the figure/page receipts, the existing wiring verifier result and a verify card. **The user signs off the integrated result.** Legacy verifier expectations are recorded in DECISIONS X9/X10.

## Status board

| Phase | What | Status |
|---|---|---|
| — | Review, analyst research, corpus scans v0 | ✅ done 2026-10-05 |
| 0 | Research dossiers v1 (after the user adds newer documents) | ✅ signed off 2026-10-06 |
| 1 | Truth pass — every defect in the accuracy ledger | ✅ signed off 2026-10-06 |
| 2 | Shell + fineness — top navbar, type, tokens, jargon/seam sweep | implemented + reviewed; user sign-off pending |
| 3 | Library — the first 90 seconds | implemented + reviewed; user sign-off pending |
| 4 | Graph | implemented + reviewed; user sign-off pending |
| 5 | Canvas — story mode, the file beat, results-day work | implemented + reviewed; user sign-off pending |
| 6 | Journey — intake ending, Dashboard, Notes/Connectors, tour, close | implemented + reviewed; user sign-off pending |

## Folder map

| File | What it holds | Read when |
|---|---|---|
| [`DECISIONS.md`](DECISIONS.md) | agreed decisions D1–D14, open questions, doctrine, the outside-scope log | every chat |
| [`PLAN.md`](PLAN.md) | phases 0–6: subtasks, files, *done when*, out of scope | every chat |
| [`ACCURACY-LEDGER.md`](ACCURACY-LEDGER.md) | every verified defect (wrong figure, false gap, bad citation, wrong output) with the truth and its page | phase 1, and before touching any figure |
| [`PROTOTYPE-MAP.md`](PROTOTYPE-MAP.md) | line map of the HTML, data registries, key functions, how to drive it headless | before editing |
| [`review/SHELL-AND-JOURNEY.md`](review/SHELL-AND-JOURNEY.md) | sign-in → console → intake → workspace → tour; rail vs navbar | phases 2, 6 |
| [`review/LIBRARY.md`](review/LIBRARY.md) | Library: product vs prototype, analyst critique, port list | phase 3 |
| [`review/GRAPH.md`](review/GRAPH.md) | Graph: product vs prototype, analyst critique, port list | phase 4 |
| [`review/CANVAS.md`](review/CANVAS.md) | Canvas: process clarity, story mode, file beat, port list | phase 5 |
| [`review/DASHBOARD-NOTES-CONNECTORS.md`](review/DASHBOARD-NOTES-CONNECTORS.md) | the three unbuilt surfaces | phase 6 |
| [`review/CROSS-CUTTING.md`](review/CROSS-CUTTING.md) | voice, jargon glossary, type, tokens, units, seams, my screenshot observations | phase 2, and any copy edit |
| [`research/ANALYST-USER.md`](research/ANALYST-USER.md) | who the Indian equity analyst is, competitors, sector first views, must-shows, distrust triggers | phases 0, 3, 4, 5 |
| [`research/DOSSIER-HDFC.md`](research/DOSSIER-HDFC.md) | HDFC Bank **v1**: numbers on stated bases, results review, bad-loan walk, mix, broker grid, the Q1 FY27 call, storylines, said-vs-did, contested points, events calendar, ICICI summary, **§I the first 90 seconds** | phases 1, 3–6, and before touching any HDFC figure |
| [`research/DOSSIER-INFOSYS.md`](research/DOSSIER-INFOSYS.md) | Infosys **v1**: spine, segments, margin bridges, capital return, one-offs on both accounting bases, annuals, the Q1 FY27 call, guidance ledger, storylines, contested points, TCS summary, boundary, **§I** | same, for Infosys |
| [`research/PEER-ICICI.md`](research/PEER-ICICI.md) · [`research/PEER-TCS.md`](research/PEER-TCS.md) | the full peer sheets, every basis and mismatch named (canvas files in the demo) | phase 5 (the file beat), any peer figure |
| [`research/figures/`](research/figures/) | the figure registry: one JSON per writer + `docs.json` (doc codes); `legacy/` holds the must-fire baseline | adding or changing any figure |
| `tools/` (reference outside this repository: `tools/`) | `check_figures.py` (figure → page checker: registry, `--html [--rev]`, `--must-fire`), `shoot.mjs` (screenshots), `pdf_pages.py` (page text), `pdf_render.py` (page image), `dead_cites.py` (citations with no facsimile), `where.py` (which page prints a figure) | verifying |

## Baseline (so "before" can always be reproduced)

- Repo HEAD at review: `7f98835` (branch `stage-4-analyst-readiness`). The prototype last changed in
  `102c2ef` (2026-08-17); SHA-256 prefix `a721ed23e8bf037f`. `git show 102c2ef:N4A-Prototype.html`
  restores the reviewed file.
- `node scripts/verify-prototype.mjs` at baseline: **261 PASS, 0 FAIL** (it checks wiring, not truth
  — every defect in the ledger passes it).
- All prototype line numbers in this folder are **at baseline** and drift as soon as editing starts —
  re-grep by section banner or symbol before using one.

**Current next action (2026-10-06):** review [VERIFY.md](VERIFY.md). Implementation is complete; final receipts are in work/FINAL-REVIEW.md (reference outside this repository: `work/FINAL-REVIEW.md`). The folder is retained for recovery and user sign-off.
