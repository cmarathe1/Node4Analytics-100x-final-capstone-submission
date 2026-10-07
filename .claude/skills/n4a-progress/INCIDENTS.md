# n4a-progress - the incidents behind each step

> Moved verbatim out of SKILL.md on 2026-09-24 so the routine itself is a short checklist.
> Open the section a checklist item points to when the item is unclear or when it fires.

# n4a-progress — review, log, and improve after a step

Run at the end of every coherent slice (a surface, a pipeline stage, a connector). This is what keeps the
project honest and the docs alive.

## 0. Precondition — the user has signed off
This skill runs **only after the user has manually tested the slice and confirmed it's correct**. Building a
slice ends by handing the user a **"Verify this slice" card** (clean-run reset commands · bring-up commands ·
exact manual steps · observable pass criteria · likely culprits if off) and waiting. The user is the final
arbiter; expect iteration/debug side-tracks before sign-off. If they haven't signed off, stop here and hand
them the card instead of logging the slice as done.

## 0a. Detect log drift before scoping the diff
Before assuming the diff is "just the current slice," compare `git diff --stat` / `git log --oneline -10`
against the last dated entry in `docs/PROGRESS.md`. If the working tree (or recent commits) touch files or
implement ADRs that entry never mentions, **more than one slice landed since the last log** — this has
happened twice already (ADR 0027 §5/§C.1/§E, 0028, and 0029 all landed with zero log entries before a much
later session finally caught it). For any file whose change isn't explained by an already-logged slice, read
its diff and fold it into this run's log entry too — don't silently log only the most recent conversation's
work while a backlog of unlogged slices sits underneath it. A stale log is a defect, not a formatting nitpick.

**When the backlog is large, isolating the delta from prose is expensive — consider a WIP commit per
logged slice.** The 2026-07-07 session found a *second* Dashboard slice (KB-opt-in rework) plus two
unrelated slices (harvest geo/segment refinement, Library routing/multi-chat/node-card) all sitting
uncommitted on top of an already-logged-but-unverified S1+S2+S3 — with no commit boundary anywhere,
"what's new since the last log entry" had to be reconstructed by diffing actual file contents against
the *prose* of the last PROGRESS.md entry (two dispatched research passes). This project only commits
on explicit user request (don't change that), but when several slices are going to land same-day
before a verify/commit checkpoint, it's worth **asking the user** whether to commit each one to the
local branch as it's logged (not pushed) — a cheap, squashable checkpoint that turns the next slice's
drift-detection back into a plain `git diff <sha>..HEAD` instead of a reconstruction exercise.

**Drift can be CONCURRENT, not only historical — two sessions may share one working tree.**
On 2026-08-03 step 0a found 18 files of an unrelated slice (the ADR 0037 ladder revision) sitting
beside the session's own work, because a second Claude session was running against the same folder
for a different purpose. That is now a normal way this repo is used, and it has three consequences:

- **Never assume `git status` is yours.** Before committing, split the change set by authorship —
  the diff you did not write must not ride inside a message describing the diff you did. Ask the
  user how to handle the other slice rather than guessing; its verification state is not yours to
  assert (that one was explicitly *not* live-verified, with two eval suites amber by construction).
- **Expect edit collisions in the shared live docs.** `SESSION.md` and `decisions/README.md` are the
  two both sessions inevitably touch. Symptoms: a "file modified on disk since you last read it"
  notice, or a string replacement failing because the block was rewritten underneath you. **Re-read
  before editing those two files**, and make surgical replacements rather than rewriting whole
  sections, so the other session's paragraphs survive.
- **A shared file with interleaved edits cannot be split cleanly.** Commit it with the slice that
  owns most of it and *say so in the message* — an undisclosed foreign hunk is the thing to avoid,
  not the hunk itself.
- **`git fetch` before pushing.** The other session may have pushed while you worked.

## 1. Review the diff against the invariants
Check the change (use `git diff`) against `ARCHITECTURE.md §9` / `AGENTS.md`:
- Provenance present on every new AI output / note / signal / edge?
- Tokens-only styling (no one-off hex)?
- Contract honored — did cross-service changes update `packages/contracts` + OpenAPI?
- Graph physics kept off React state?
- Indian-market correctness (₹/lakh-crore, NSE/BSE, IST)?
- Typed + tested? Did checks pass (`pnpm lint/typecheck/test`, `uv run pytest`)?

Report any violations and fix them (or file them as a follow-up in PROGRESS if out of scope).

**When you fix a gate for being VACUOUS, grep for its siblings in the same breath.** A gate that asserts
a *mechanism's own output shape* proves nothing, because the mechanism always produces it. ADR 0048
caught one — the split-table gate asserted "a Markdown separator exists," which the renderer always
inserts — rewrote it, and shipped. The **identical shape** sat one gate away: the section gate asserted
`" · " in locator` (a separator the locator formatter always inserts) while 104 chunks cited
`AR FY25 · Untitled · p.315`. Same defect, same file, found a pass later. The tell is a gate whose
assertion cannot fail while the code path runs at all. When you find one, ask *what else in this suite
asserts presence where it should assert meaning?* — and fix those in the same pass.

**A second tell: a gate can READ A CODE PATH THE CODE DOES NOT USE.** The paragraph above is about
what a gate *asserts*; this is about what it *looks at*, and it is invisible to the same reading.
Docs-drift gate 1b was added 2026-08-17 with the rationale *"a table is created once, columns are
added forever"* — and parsed only `CREATE TABLE` bodies. This schema is idempotent, so **102 of its
columns arrive by `ALTER TABLE … ADD COLUMN IF NOT EXISTS`** and some arrive inside a `DO` loop where
the table name is a `format(%1$I)` variable. It was green for ten days on hand-documentation while
hiding **29 undocumented columns**, all from the slice then in flight (2026-08-27, rung 6a-i).
**The check: name the mechanism the gate protects against, then confirm the gate reads THAT
mechanism** — feed it the real artifact and count what it sees. And when you extend a gate's reach,
its new must-fire tests belong in the same commit, or you have moved the blind spot rather than
closed it.

**A third tell: a must-fire test can be green because its FIXTURE never exercises the path.** The
first two tells are about what a gate asserts and what it reads; this is about what it is fed. At
the rung-6d third audit, four new must-fire tests for a segment note's period banner passed
immediately — because the fixture was ICICI-shaped, and an ICICI note states its period in the
COLUMN, so the banner is correctly never consulted. Tampering with it could not fail, and a test
that cannot fail is the thing the whole doctrine exists to prevent. The check is one question:
**does the dimension under test DECIDE the outcome in this fixture?** Prove it by reading the
fixture's own output before asserting on it (here: assert the reading's period came from the
banner), and keep a second fixture where the dimension lives somewhere else — the corpus has both
shapes precisely because issuers disagree, and one fixture can only ever cover one of them.

**A fourth tell: a render assertion over RAW MARKUP passes on text no reader can reach.** At the
rung-11b audit, why a row showed `—` lived only in a `title` and an `aria-label` on a role-less
`span`. `expect(html).toContain(reason)` would have been green, because the string IS in the markup,
while a touch or keyboard user could not see it at all. Assert on what is *visible*: strip every
tag and attribute (`visibleText` in `structure-module.test.tsx`) and assert there. The same
question applies to any conditional render: **would this assertion still pass if the text moved into
an attribute?** And its sibling, from the same audit: a producer and a contract that each pass
their own per-condition tests can still disagree on an OVERLAP of conditions. Test the product of
conditions (`combination_failures`), not each one alone.

## 1a. Read the DATA the slice produced, not just the diff and the gates
A green suite proves the code does what a test says; it does not prove the *store* is right. At the
2026-07-16 1B sign-off, three green gates (authority 9/9, harvest gold 16/16, 412 pytest) coexisted with
a `ws-demo` where **40% of claims were attributed to the wrong company** (a concall's cover-letter
addressee became the filer), the connection layer was **one edge**, and every `proposed` entity was junk
— none of it visible to any test, because each test asserted a *mechanism*, and no gate owned the
question "is the resulting knowledge base actually true?". A few `psql` queries against the live
workspace found all of it in minutes.

So when a slice touches the pipeline (ingestion / extraction / resolution / harvest / assembly), spend
five minutes on the store before writing the log entry:
- Group `entities` by `origin, type` — are `proposed` rows real things? Any type with **zero** rows that
  the schema/display code claims to support (dead vocabulary)?
- Group `claims` by `subject` — is the biggest subject the company you expect? Is any subject a *metric*?
- Count `entity_relations` — is the connection layer plausible for the corpus size?
- Cross-check the derived row against its source document (`documents.issuer_name`, kind, title).

Log what you find as a numbered finding in the program doc **and** route it to the sub-slice that owns
the fix — findings are only useful where someone will read them before building. Diagnose to root cause
(query the data, don't infer from code alone); do not fix out of scope.

**Confirm the live store was produced by the CURRENT code, not an older run.** Reading the data proves
nothing if the rows predate the fixes. At the 1D review, `ws-1d2-live` — the workspace SESSION.md named
as the verify corpus — held **pre-hardening** output (`AR FY24` locators, zero `elements` rows) while
every doc described post-hardening behaviour; its source path pointed at a deleted scratchpad, so it
could not even be re-derived without re-staging the PDFs. Cheap check: pick a column the slice changed
and query it (`SELECT count(*) … WHERE locator LIKE '%FY24%'`, `SELECT count(*) FROM elements`). If the
store is stale, **re-ingest into a fresh workspace before reading anything**, and say in SESSION.md
which workspace reflects which code.

**When a slice touches parse/chunk/extract, check CONSERVATION, not just correctness.** The nastiest
defects in this area are silent *loss*: 1D found a table emitting 7 of 13 rows and, one layer up, no
test at all covered "does every parsed element reach a chunk?". Both were invisible to a green suite
because every test asserted that what WAS produced looked right. Write the probe that counts inputs vs
outputs (elements → chunks, cells → text, rows → rows) — it takes minutes and it is the only thing that
catches a vanished row.

**Do NOT run a long test suite concurrently with doc edits.** The docs-drift gate stats files at
*execution* time, so a suite launched before the doc pass finishes reads a mid-edit snapshot and
reports a phantom failure — costing a full re-run to disprove. Sequence it: code + tests → doc pass
→ one final full run.

**The checkable form of that rule — do this, don't just intend it:** immediately before launching
the full suite, run `uv run pytest tests/test_docs_drift.py` (no DB, no key, <1s). If it is green,
the docs are settled and the long run is safe; if it is red, fix first. Stating the rule was not
enough — it was written on 2026-08-02 and violated **twice in the same session**, each time costing
a ~10-minute run that failed only on a SESSION.md byte count already corrected on disk. A one-second
pre-flight is the difference between a rule and a habit.

## 2. Update `docs/PROGRESS.md` (the recent log only)
- Append a dated **Log** entry (newest on top): what changed, why, what's now runnable, decisions made
  (link ADRs). Refresh the **Track status** table.
- **Do NOT re-add a "Current state / at-a-glance" block** — `SESSION.md` is the single live briefing
  (ADR 0032). PROGRESS is the append-only recent log, nothing more; keeping status in two places is the
  redundancy that bloated it to 100 KB before.
- Keep it tight — link to code/ADRs rather than restating.
- **When a Stage or program completes,** roll its log entries into
  `docs/archive/PROGRESS-<era>.md` **that day** and leave a pointer row in PROGRESS's "Earlier history"
  table. Two eras are already archived; follow their shape.

## 2·5. Docs hygiene — run this every time (added 2026-07-27)

The 2026-07-27 audit found `docs/` had grown **6.4× in a month** while the *most authoritative* files
went stale — `ARCHITECTURE.md` taught a dropped table, `PLAN.md` showed the knowledge graph unbuilt a
month after it shipped, and `MERMAID-DIAGRAMS.md` described a pipeline three slices out of date. Both
halves of that came from the same cause: the loop updated logs and never touched reference docs. So:

- **Did this slice change a contract, a table, a stage, or a flow?** Then update the reference doc in
  the SAME change and bump its `last verified` date:
  - a schema table → `docs/reference/DATABASE-SCHEMA.html` (hand-maintained — the drift test fails
    otherwise) and, if it changes a *contract*, `docs/reference/ARCHITECTURE.md`
  - a pipeline stage, gate, or runtime flow → `docs/reference/MERMAID-DIAGRAMS.md` (validate any
    diagram you touch — a broken one silently renders as nothing)
  - a model pin → `app/settings.py` comment + `SESSION.md` + the slice's ADR
- **Respect the tiers** (`docs/README.md`): live status at `docs/*.md` · look-up in `reference/` ·
  unbuilt designs in `specs/` · closed programs in `archive/`. A new doc must land in one of them.
- **Budgets:** `SESSION.md` ≤ 8 KB · `PROGRESS.md` ≤ 120 KB (roll an era out when it exceeds) ·
  `ROADMAP.md` ≤ 50 KB · one ADR ≤ 8 KB — put long-form annexes in a program doc, not the ADR.
  **All four are now MEASURED.** A budget a file is already over would fail on arrival and get
  deleted rather than obeyed, so an oversized file starts on a **ratchet** — free to shrink, unable
  to grow — and graduates to a hard bound the day it fits: the oversized ADRs still sit in
  `_GRANDFATHERED_ADRS`; ROADMAP, found **28% over** on 2026-09-04, walked down to 49 KB on its ratchet and joined `_SIZE_BUDGETS` at
  rung 13's sign-off (2026-09-24). **Lower the mark in the same pass whenever you trim one** — a
  ratchet nobody tightens is a debt register that has quietly become a waiver.

  **When an ADR busts 8 KB, ask "is there a SEPARABLE decision in here?" before shaving adjectives.**
  Shaving is a byte-at-a-time loop that converges slowly and makes the prose worse — the 2026-08-23/24
  passes spent a dozen round trips getting 0082 from 10,302 to 8,191. Twice in the same session the
  right answer was a **split**, and both splits improved findability rather than merely fitting:
  §7 of 0079 (*selection is computed, articulation may be generated*) became **0081**, and §8 of 0082
  (*generality's structural half is executed*) became **0083** — each a platform-wide rule that a
  future reader would never have found buried in a rung's ADR. The tell: a section that would still
  make sense with the host ADR deleted. Only shave once you are sure everything left is one decision.

  **And when you do have to shrink prose: DELETE, never re-word.** This is the mechanical half the
  rule above was missing, and it cost ~15 round trips on 2026-09-01 (ADR 0098, 10.6 KB → 8.1 KB) plus
  six more on SESSION.md. Every attempt to "tighten" a paragraph came back within ~50 bytes of where
  it started — you cut ten words and add eight, because the ideas are still all there. What actually
  moves the number is removing a **whole unit**: a paragraph, a section, a bullet. So on a budget
  bust, pick the two or three paragraphs whose content already lives somewhere else — a code
  docstring, a test name, a program doc — replace each with a one-line pointer, and stop. Two
  deletions beat twenty rewordings, and the doc reads better afterwards rather than worse.
- **Adding to a NUMBERED register? take the next free id, and let the gate confirm it.** `LESSONS.md`
  (§N) and `DEMO-FEATURES.md` (FN) are appended to over months and cross-referenced BY that number
  from other documents, so a collision renders perfectly and silently re-points a citation at the
  wrong story. The rung-12 sign-off found BOTH at once: two §30s and two §31s, which left
  `AGENTS.md` eval rule 10 citing a "§30" that resolved to ADR 0116's rung-6d lesson instead of
  0124's; and two F33s, each with its own detail section, while F12's row said "superseded in
  substance by F33" and could no longer say which. Neither is catchable by reading. Gate 5 in
  `tests/test_docs_drift.py` (`duplicate_ids`) now fails on either, with must-fire tests built from
  both real collisions — so take the next free number and run the gate rather than counting by eye.

- **One fact, one home.** If you're about to write something that already lives in another doc, write
  a link instead. Every mirror is both a context cost and a future contradiction.
- Run `uv run pytest tests/test_docs_drift.py` (in `services/ai`) before you call the routine done.

## 2b. Keep `docs/ROADMAP.md` current (forward work lives here)
ROADMAP is the single forward backlog. If this slice **completed** a backlog item, tick/remove it; if
scoping **surfaced a new deferral** ("we'll come back to this"), add it to ROADMAP rather than burying it
in a log entry. Forward work → ROADMAP; PROGRESS/SESSION stay backward-looking + live-status (ADR 0032).

## 2a. Refresh `docs/SESSION.md`
After updating PROGRESS.md, rewrite SESSION.md to reflect the new state. Target **under ~500 words**
(300 was the Stage-1 target; by Stage 3's 5-surface scope it had drifted to ~1000 words across several
sessions with no one pass catching it — 500 is the recalibrated ceiling, not a new floor to grow into).
Every rewrite, actively cut: fold completed-slice narrative into one short clause + an ADR link rather
than re-explaining *how* a past slice works (that detail lives in `PROGRESS.md`/the ADR) — SESSION.md's
job is *what's true now*, not a running history.
- **Stage & status** — current Stage + which sub-slices are done
- **What runs today** — exact CLI commands that work right now
- **What does NOT run yet** — surfaces/layers still pending
- **Next action** — the next sub-slice + 1–2 sentence description
- **Open questions** — non-blocking forks still unresolved
- Update the `*Last updated*` footer with today's date and the completed slice name.
This file is the low-cost context source for future session starts — keep it accurate and concise.

**The 8 KB budget is a HARD gate, and rewriting "Next action" almost always blows it.** Run
`ls -l docs/SESSION.md` immediately after that rewrite and cut in the *same* pass — discovering it
from the drift gate at the end turns into a shave-and-recheck loop (eight passes on 2026-08-02).
**Cut from the past, not the present:** a closed phase's narrative compresses to one clause + a
`PROGRESS.md` link, while "what's true now" and "what's next" are the file's actual job. If it still
won't fit, that is the signal a completed era is overdue for `docs/archive/` (§2's roll-out) — not a
reason to shave adjectives off the current state.

**Measure the bytes the GATE measures — `ls -l docs/SESSION.md`, never an encode count.** The two
numbers diverge the moment anything writes the file CRLF: `len(s.encode("utf-8"))` then reports
~115 bytes short of what `test_log_size_budgets` stats on disk, and reporting 8,187 while failing
at 8,302 turns one cut into six (2026-08-30). The cause is **GOTCHAS #13** — `pathlib.write_text`
on Windows. Write docs with `write_bytes(s.encode("utf-8"))` and the two counts agree exactly, so
you can use the full 8,192 rather than padding down to ~8,050 against a discrepancy that should
not exist. If they *disagree*, do not shave — sweep the CRLF first (#13 has the one-liner).

## 3. Record decisions
If a structural choice was made or changed, add `docs/decisions/NNNN-*.md` (Context→Decision→
Consequences→Status) and link it from `docs/decisions/README.md` — **into the right theme group, with a
Status value**. If the new ADR refines or supersedes an earlier one, update that earlier ADR's **Status**
in the index (e.g. "Accepted · refined by NNNN") so the live-vs-historical signal stays true (ADR 0032).

**A mid-slice review/audit doc gets the same live-vs-historical discipline.** An audit, `/code-review`,
or hardening-review doc left in the tree (e.g. `docs/<slice>-AUDIT.md`) reads as *current status* once
its findings are fixed — the next reader re-pays the whole re-check to discover it's stale (the 1E
sign-off cost exactly this). When its findings are remediated, banner it **SUPERSEDED / historical
(date)** at the top with a one-line "all findings remediated, see PROGRESS" pointer (or archive it),
the same way an ADR's Status is flipped.

**Check for an ADR the diff just implemented, not just ones it created.** A "brainstorm" ADR is often
written as `Proposed`/`pre-implementation` *before* the code lands, and a companion planning doc (e.g.
`DASHBOARD-PLAN.md`) may itself say "amendments applied after review of this doc" — that review-and-apply
step is easy to silently skip once the code is what everyone's looking at. If this slice built what an
existing ADR proposed: flip its Status to `Accepted` (or note what's still open), fold in any
plan-doc amendments the ADR itself deferred, and update its `decisions/README.md` row — in the *same*
pass as the code, not a "later" that never comes (caught in the 2026-07-06 Dashboard slice: ADR 0033
still read "no code yet" after S1+S2 were built and green).

## 4. Capture demo-worthy features
Ask: *did this slice produce something a viewer would notice or an analyst would push on?* — differentiating,
non-obvious, India-specific, or likely to draw a question. If so, add/update an entry in
`docs/DEMO-FEATURES.md` (**Why it matters (demo angle)** · **How it works** · **Demo moment**), set its
status, and keep the index table in sync. Skip routine CRUD/plumbing (see that file's "What counts").

**The same rule applies to a CHANGED CONSTANT VALUE, not just a renamed one — and it is the more common
drift.** A model pin, a threshold, a suite score, a test count: the *name* stays valid, so nothing looks
broken, while every doc that narrated the old **value** silently becomes a lie. Found five in one pass at
the 2026-07-25 Phase-1 sign-off — a ROADMAP bullet still saying "G4 is NOT built" after the commit that
built it; `settings.py` calling `gpt-5-nano` "the pinned spine/claim extractor" (untrue since 1F-3);
`DEMO-FEATURES.md` repeating that same dead pin; and two `AGENTS.md` CLI entries naming the wrong model.
Prose does not typecheck, and an agent reading a stale pin will "helpfully" revert a hard-won escalation.
So when a slice moves a pinned value, **grep the literal OLD value** across `AGENTS.md`, `CLAUDE.md`,
`docs/*.md` and the settings/comment blocks — not the variable name, the value — and fix or re-point
every prose hit in the same pass. Prefer naming the **setting** (`settings.extraction_model`) over its
current value in prose: a pointer stays true when the pin moves.

**If this slice renamed a stage/status/enum value** (e.g. a pipeline stage, an `IngestionStatus`), grep
`docs/DEMO-FEATURES.md`, `docs/SESSION.md`, `docs/ROADMAP.md`, and `docs/reference/MERMAID-DIAGRAMS.md` for the OLD literal value —
these files narrate stage lists and event names as prose (not code), so a rename doesn't show up in any
typecheck and quietly goes stale. Caught twice now (ss7→H2's `graph` terminology drift, then the literal
`graph`→`harvest` enum rename in the 2026-07-05 slice re-breaking the same three files).

## 5. Auto-improve (always finish here)
Ask: *what slowed this step down?* A missing convention, an unclear doc, a repeated correction, a tool
gap. If anything surfaced, run/invoke **`n4a-improve`** (or directly update the relevant
skill / agent / `AGENTS.md` / `CLAUDE.md`) and note the meta-change in the PROGRESS entry.

## 6. Suggest the next step
End by stating the next action per `docs/ROADMAP.md` §1 (and the `PLAN.md` stage it sits in), so the user
can continue or redirect immediately.
