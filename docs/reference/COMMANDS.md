# N4A commands and instruments — the full reference

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](../README.md) for current scope.

> **status:** live · **authoritative for:** every CLI, probe, door and backfill, with its flags,
> gates and history · **last verified:** 2026-09-25. Moved VERBATIM out of `AGENTS.md` (which now
> keeps a one-line index) so every session stops paying ~74 KB for it. Open the entry you need.

- Install: `pnpm install` (root) · `uv sync` (in `services/ai`). Prereq: `uv` on PATH (installed to
  `~/.local/bin`); restart the shell after first install. **LibreOffice** powers the Excel recalc
  engine (`winget install TheDocumentFoundation.LibreOffice`, installed 2026-07-10) — without it
  workbook formulas render as text (`engine: "cached"`) and `recalc_and_read` is unregistered;
  detection is cached per process, so restart `pnpm dev:ai` after installing (GOTCHAS #7).
- Dev: `pnpm dev` (web shell, port 3000) · `pnpm dev:ai` (FastAPI, port 8000) ·
  `docker compose -f infra/docker-compose.yml up -d` (Postgres 16 + pgvector + AGE, host **port 5433**
  → container 5432, so the store coexists with any native Postgres on 5432; `DATABASE_URL` matches).
- Check (web + packages): `pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm format:check`.
- Check (AI, in `services/ai`): `uv run ruff check . && uv run ruff format --check . && uv run mypy app tests && uv run pytest --basetemp="$LOCALAPPDATA/Temp/n4a-pt"`.
  **Faster full run (2026-09-24): `uv run python tests/run_sharded.py`** — the same 2,627 tests in
  ~122 s instead of ~254 s: `test_corpus_structure.py` and `test_eval.py` (~150 s of PDF parsing,
  no store) each run in their own process beside the serial store-bound rest. Each offline shard
  gets a dead `DATABASE_URL` and any SKIP there fails the run (`test_run_sharded.py` proves the
  guard fires). pytest-xdist was tried and deadlocked: many tests reach the shared store indirectly
  (concurrent `apply_schema` DDL, fixed ids), and a killed run leaves canvases behind that later
  collide (`NodeIdCollisionError`) — delete that debris by workspace prefix if it ever happens.
  (The `--basetemp` flag IS the fix for the Windows temp-dir `PermissionError` — run pytest with it
  by default, don't rediscover it from a 21-error run; background → `docs/GOTCHAS.md` #6.)
- Ingestion smoke (AI, in `services/ai`): `uv run python -m app.ingestion.cli` — fetches the seed PDF from
  `data/seed/`, runs parse → chunk → land, and prints what landed (the Stage-1 ss1 manual-verify surface;
  inspect `data/derived/<slug>/pages.jsonl`).
- Retrieval smoke (AI, in `services/ai`): `uv run python -m app.ingestion.cli --to-db --embed` then
  `uv run python -m app.retrieval.cli "<question>"` — grounded, cited Ask over the live L2 (the ss4 surface);
  `--list-models` shows the provider switcher, `--model {gpt-4o-mini|extractive|…}` switches providers,
  `--stream` streams. KPI / graph / signals questions decline by design (ADR 0017/0018).
- Spine smoke (AI, in `services/ai`): `uv run python -m app.spine.cli` — seeds + prints the entity/attribute
  **resolution spines** (the ss5a surface: the user-curated coarse lens + entity basket; no claims/graph).
  Add `--derive` to grow corpus-grounded fine metrics (needs the AR ingested via `--to-db` + a key; uses
  `settings.concept_discovery_model`), `--rebuild` to re-derive from scratch, `--show` to print without
  re-seeding (ADR 0019/0020).
- Claim-core smoke (AI, in `services/ai`): `uv run python -m app.claims.cli` — atomic-fact extraction over the
  AR's Lane-3 narrative → **two-spine resolve** (subject→entity spine, attribute→coarse lens; reuses
  `app/spine/resolve.py`) → relational `claims` table, printed grouped by subject for review (the ss5b surface;
  needs the spine seeded first + a key; uses `settings.extraction_model`). `--gold` scores the resolution gold set, `--rebuild`
  re-extracts clean, `--show` prints persisted claims, `--sample N` bounds cost, `--reresolve` re-resolves every
  document's SAVED mentions against the live spine under one sweep id — **zero extraction-provider calls** (the
  1C run substrate; claims live in `claim_versions`, read via the `active_claims` view).
  **`--review`** lists the mentions HELD FOR ROLE REVIEW with their evidence — the published queue
  (0059/0077 D3; the full inbox is rung 12). **`--by-role [--per-role N]`** samples real claims per
  ROLE with citations — the rung-4 **precision read**, which reachability is only a floor for and
  which only a human can close (0059 · 0013). Both are read-only: no providers, no extraction.
  **No signals/contestation yet (Part 2)** (ADR 0019 ss5b). **`--reresolve` REPORTS what it could
  not sweep** — a document whose passport moved since its extraction is listed as `BLOCKED` and the
  sweep continues. Before rung 6a-i one `StalePassportError` propagated out of the loop and every
  document after it was silently never re-resolved, which from the outside looked identical to a
  clean sweep. The guard itself is correct: the repair for those documents is a fresh EXTRACTION.
- Entity-harvest smoke (AI, in `services/ai`): `uv run python -m app.graph.harvest` — narrative-passage
  co-occurrence harvest (client/competitor/geography/segment → the connection layer, Phase 5). `--rebuild`
  clears prior harvested relations first, `--show` prints persisted relations without harvesting, `--gold`
  scores the precision gold set **offline** (no DB, no provider key — grounding/self-reference gate, kind→
  relation classification, resolution-class isolation; ADR 0027 §E).
- Eval scorecard (AI, in `services/ai`): `uv run python -m app.eval` — the Library-rework **1A
  analyst-outcome scorecard** (ADR 0042): `exemplars` (live Ask over `ws-infosys`, human-read),
  `claims-live` (extraction trust floor), `authority` (1B mapping — green gate), `parse` (1D₁
  golden-pages gate: reading order / table fidelity + uniqueness negatives / transcript turns /
  OCR flag over **9** checked-in corpus pages (the 9th is the broker alternating-shaded-row witness
  that caught silent table row LOSS — 13 rows emitted as 7); the pre-1D₁ red baseline — 9/49
  original gold, 16/57 hardened gold — stays reproducible via `parse_suite.run_baseline()`;
  document-level structure
  gates live in `tests/test_corpus_structure.py` over the local seed corpus), `resolver`/
  `harvest` (deterministic gates), `coverage` (the 1F-1 **evidence-planner gate**: does the planner
  put the analyst's own 1F-0 gold evidence in front of the extractor, and does it beat the
  pre-1F-1 even stride? parses the frozen corpus with no DB/key — `uv run python -m
  app.eval.coverage_suite` for the per-document receipts; skips loudly without `data/seed`).
  `--offline` runs the deterministic set (no key, no store);
  `--suite <name>` runs one; `--strict` for a future CI hook. Honest states (P4): live suites
  skip *loudly* on a missing prereq, never a fake green.
- **Role migration (AI, in `services/ai`): `uv run python -m app.spine.migrate_roles --workspace <ws>`**
  — moves a POPULATED workspace onto the sixteen analytical roles (ADR 0076). **Dry run by
  default; `--apply` writes.** Reseeding does NOT migrate: seeding only inserts what is
  missing, the live fine spine is projected from the stored registry (and resolution tries
  FINE FIRST), and nothing retires the predecessors. It **retires, never deletes** —
  `claim_versions.attribute_coarse` is `ON DELETE CASCADE`, so dropping a role would destroy
  its claims with no ledger entry. A concept it cannot place is **reported, never guessed**.
  It **preflights** (schema current, workspace present, every target role seeded) and
  **refuses** rather than half-migrating; `--apply` then verifies its own postconditions and
  **exits non-zero** if they fail. The dry run prints every planned move with the tier that
  decided it (author / label / rename), because a dry run of counts is not reviewable.
  Follow it with `uv run python -m app.claims.cli --reresolve` to move the claims themselves:
  **zero EXTRACTION calls**, but it does re-embed. **`--apply` alone leaves every claim on the
  old role** — that half-migrated state is what `role_probe --store` now fails on.
- **Role probe (AI, in `services/ai`): `uv run python -m app.eval.role_probe [--store] [--deep]`**
  — the rung-4 instrument. Offline, no key/DB: scores role reachability on WHOLE WORDS across
  4 issuers / 2 sectors, prints each sample sentence **with the alias that fired** (a sample
  without it cannot be adjudicated), and **exits non-zero when the rung’s criteria fail**
  (16 live roles · 5 groups · every expected role on ≥2 sectors · the 0066 floor).
  **Reachability is a CEILING, not a floor** — it scans whole sentences while the resolver
  matches an exact attribute string, so it is a looser matcher than the pipeline. Per-role
  **precision** is measured through the real resolution path by the `resolver` gold suite.
  **`--store` GATES the live store** and folds into the exit code: no active claim on a retired
  role (the half-migrated workspace), conservation by mention **identity** rather than totals,
  only run-produced claims counted, an unrecognised drop reason is a regression, and an empty
  or unreachable store FAILS instead of passing vacuously. Review volume is published on its
  own line, never as a drop. **`--deep`** adds one annual report per issuer and exempts **no**
  role (~10 min) — it is what EARNS the fast leg's four exemptions rather than asserting them.
  Those four (concentration · asset base · external exposure · governance) are annual-report
  **disclosures**, not what management discusses on a call; `--deep` is the reachability gate.
- **Finding probe (AI, in `services/ai`): `uv run python -m app.eval.finding_probe`** — the rung-5
  instrument (ADR 0079 Gate · **0082** · **0083**). Rung 5 has **nothing to look at** (`/findings`
  gets a surface at rung 12), so for this belief-layer slice the instrument IS the deliverable. Needs
  the store; skips LOUDLY without it. **Exit non-zero on any failure**, across three questions:
  1. **Census** — does every declared family have a producer that actually FIRED (the governing rule
     made executable, what `central`/`emerging` failed)? A family may be EXEMPT only with a stated
     reason AND a named unblocker, and a **stale exemption fails** the moment it fires.
  2. **Properties — does each family MEAN what the contract says?** The half that was missing: the
     first version printed PASS while **51 of 51** `corroborated` findings carried ONE lineage and
     told the analyst they were *independently* corroborated. Gates: `corroborated` ⇒ ≥2 independent
     lineages · `trend` ⇒ ≥3 periods AND an established direction · provenance covers **every**
     contributing document (invariant #1) · one finding carries **one** blocker · kind matches verb.
  3. **Band, scope and generality** — is `eligible` counted after the floor · is the band ever
     **100% one kind** (then half of reading never reaches the analyst) · does the **clamp bind**
     (the count is an OUTPUT, not a target) · what is **withheld to rung 12** · does a `selected`
     scope naming NO documents yield zero · and the **structural** issuer check (0083), executed
     rather than printed.
  4. **Identity and the graph handoff** (ADR **0084**) — it runs the REAL response path, not the
     projection alone: `reconcile` stamps durable ids from the `findings` table and
     `resolve_node_ids` fills `nodeIds`, so the probe measures what an analyst receives. Gates: every
     computed finding has a persisted identity · every finding carries first/last-seen receipts ·
     the surfaced band resolves graph nodes (it printed `nodeIds=[]` for months while ADR 0065 §2
     required the field to stop being empty).
  Every gate is a **pure function** — `family_failures`, `property_failures`, `band_failures`,
  `identity_failures`, `structural_failures`, `_generality_failures` — unit-tested against pre-fix
  shapes and asserted to FAIL, which is the 0067 receipt. **A census is not a test:** counting that
  a family fired says nothing about whether it means what it claims.
  **Rung 12 (ADR 0122) made it the module-3 instrument: `[--offline] [--store]`.**
  - **Offline (~5 s)** runs 16 constructed witness cases through the real projection. They must
    pass the current build and fail the replayed rung-5 build (38 failures).
  - **The absence UNIT** is gated the same way. One unheld filing is one lead; the per-duty
    replay fails.
  - **`--store` DISCOVERS its workspaces** (closing ROADMAP ⑥, the hard-coded pair) and requires
    **≥3 issuers and ≥2 sectors**.
  - **It gates what the analyst reads:** meaning, witness, one story per key, no machine talk,
    the dual receipt re-derived, absences, the door's recency order (`legacy_order`, a severity
    ranking, must fail), the badge equal to the inbox's counts, review decisions current only at
    their digest, and the grid agreeing with every decision.
  - **It FAILS until a human records a decision.** *Reviewed as not material* is the must-fire
    gate, and it is the analyst's to make. Open the brief and mark one ABSENCE lead (a coverage
    gap) not material: this probe needs a decision on any lead, and `evidence_state_probe --store`
    needs one on an absence, since only an absence marks a grid cell. Reopen it to reset.
  - **Its audit (ADR 0123)** added `conservation_failures` (every comparison declined for a
    counted reason or named), `gap_cells` (a missing filing marks EVERY duty's cell), and tests for
    both review gates, each beside a replay of the rule it replaced.
  - **Its second audit (ADR 0124)** added six, each with a unit test asserting it FAILS on the
    pre-fix shape: `absence_digest_failures` (every receipt field hashed into what a decision is
    taken over, or declared in `EXCLUDED_FROM_DIGEST` with its reason — MEASURED, never a list) ·
    `machine_verdict_failures` and `instant_order_failures` (off the syntax tree: one reader of
    `machineResult`, and no ISO instant ordered OR COMPARED as text, over a field set DERIVED from
    the contract) · `unsearched_claim_failures` + `record_negative_failures` (a negative about the
    record only where a search RAN, in either word order, over the COPY of both stacks and never a
    comment) · `digest_symmetry_failures` (a receipt is ordered the way the identity is) ·
    `decision_receipt_failures` and `correction_currency_failures` (`--store`).
  - **Its third audit (ADR 0125)** found TWO of those six could not fire — each recomputed the
    producer's own formula on the producer's own output, or restated what the contract already
    refuses to construct. Both are re-pointed at an independent witness: a second, NARROWED
    computation held against the covering one, and the ledger's own rows. Each now fails when its
    premise was never exercised, because a check that could not have fired has measured nothing.
  - **Its web halves:** `attention-{frame,module,crossstack}.test.*` in vitest, and
    **`node scripts/verify-attention-layout.mjs`**. That one needs `pnpm dev` + `pnpm dev:ai` and
    exits 2 (UNVERIFIED) without them. It opens EVERY lead's detail, See all and the inbox at
    1,280 and 400 px.
  - **Fixtures:** `app.eval.record_fixture --door {attention,inbox} --trim --out <path>`.
- **Attention and review doors (AI, in `services/ai`), rung 12, ADR 0122.** Scoped like
  `/findings`, and `workspaceId` has **no default**.
  - **`GET /brief/attention`** returns the brief's module 3. Leads come ranked by recency of
    evidence, never severity. Reviewed leads and observations follow, then what was withheld,
    counted per reason, and whether absences were judged and over what. The badge is two numbers:
    `inboxOwed` and `inboxOptional`.
  - **`GET /review/inbox`** is the ONE inbox: leads routed by `judge`, then comparisons our own
    reading could not decide (optional), then the unfiled sentences as one aggregate.
  - **`POST /review/decisions`** takes a finding decision (`not_material` / `reopen`), which is
    append-only in `finding_review_versions`, or a comparison correction. **Both arms carry
    `observedEvidence`, the digest of what the analyst was SHOWN** — `Finding.evidence.digest` or
    `ClaimComparison.evidenceDigest` — and the finding arm takes its OWN covering computation at
    write time rather than quoting the store's digest (ADR 0124 D1/D2). It is refused **409** over
    evidence that is not what was shown (a narrowed view, or a record that moved), a no-op, an
    observation (only a lead is reviewed), or cells the ledger cannot certify against the
    computation's own digest. `Finding.evidence.complete` says whether a response showed ALL of a
    lead's evidence; the surface does not offer the form when it did not, and an absence is
    complete in every scope.
  - A mixed-issuer workspace is **not** refused: its `absences.status` says why none were judged.
- **Passport reclassification (AI, in `services/ai`): `uv run python -m app.ingestion.reclassify
  --workspace <ws>`** — re-runs the source passport over ALREADY-INGESTED documents after
  `infer_doc_kind` gained factsheet / financial-statement / press-release patterns (ADR 0080 §4).
  **Dry run by default; `--apply` writes.** Never touches a **verified** passport (the user is
  final, D1) or a `source = 'user'` role; preflights and refuses rather than half-applying; verifies
  its own postconditions and rolls back on failure. Prints **every planned move**, not a count — a
  count would have hidden the two bugs its dry run caught (a name-slug lineage that would have
  SPLIT `hdfc_bank::primary`, and a covered-entity publisher voice that would have collapsed three
  broker houses into one origin). Follow with `claims.cli --reresolve`: claims persist their own
  lineage, and that re-resolve **expires downstream baselines** (`LESSONS.md` §11).
- **Frame probe (AI, in `services/ai`): `uv run python -m app.eval.frame_probe [--store]`** — the
  rung-6a-i instrument (ADR **0085**/**0086**). Offline by default (no key, no DB, ~90 s).
  **Its headline is NOT `contested 0 → N`: the frame is a BRAKE**, so it scores what the brakes
  STOP. Exits non-zero on any gate failure, across four questions: **earned** (is every declared
  dimension demonstrated on ≥3 issuers / ≥2 sectors — 0060's producer rule made executable, with
  the sample sentence that fired) · **refused** (the three manufacturing cases: a table naming
  BOTH bases yields no basis · a magnitude word yields no currency · a document can never declare
  an `adjustment`) · **distinguished** (the prototype's *"growth three ways"* — 9.6% / 4.6% / 3.1%
  must stay three frames) · **prevented** (`--store`: false pairs stopped, and **our ignorance vs
  the record's silence**, which is the analyst-facing number). A **RISE** in `contested` is printed
  as a RED FLAG; **near zero is CORRECT** for this corpus and is reported as such. Every gate is a
  pure function (`earned_failures`, `bounded_failures`, `refusal_failures`, `distinction_failures`,
  `store_failures`), unit-tested against the pre-fix shape and asserted to FAIL — the 0067 receipt.
  A dimension the WORLD confines to one sector may be declared `SECTOR_BOUNDED` **with its
  evidence**, and `bounded_failures` then fails if it turns up in the sector it was declared absent
  from — a claim that can be falsified, never a waiver.
- **Series probe (AI, in `services/ai`): `uv run python -m app.eval.series_probe [--store]`** —
  the rung-11a instrument (ADR **0112**). Offline, no key/DB, **~2 s**. Its headline is NOT *"a
  series rendered"* — a chart of filed figures is what the Dashboard has drawn since S2. It scores
  whether the two things a LINE asserts without saying so can be false: that the points either side
  of a span are **comparable**, and that the periods it draws are **the periods there are**. Ten
  gates, each a pure function unit-tested against the pre-fix shape and asserted to FAIL
  (`legacy_bridge` replays *filter the nulls and join the survivors*, which on the witness produces
  a segment spanning two quarters nobody filed anything for; `legacy_frame_equality` replays the
  scope rule that shattered a real series over an omitted `IFRS` header; `legacy_expected_not_found`
  replays this rung's own first defect, a gap reason that read the duty and not the acquisition):
  **never bridged** (one span per ADJACENT pair, each naming its two periods, and a span touching a
  silence is never drawable) · **the break, not the trend** — the ladder's Labour Codes witness,
  with FOUR must-not-fires (a restatement · two bases that AGREE at the precision each printed · a
  consolidation difference, which is a parallel series · a treatment stated at EVERY period, which
  has not moved) · **a silence carries its reason at the precision it was established** · **one
  line, totally ordered** (12 shuffles identical; two currencies never share an axis) · **the axis
  is the record's own span** (ICICI's two annual reports draw two years, not six manufactured
  absences) · **a line is not shattered by an omitted header, nor merged across a real one** · the
  **consumer delegates** — the MECHANISM, not a name census: a chart cannot join two points without
  reaching a neighbour by index OR turning `points` into a polyline, so the component may do
  neither, its strokes must come from `geometry.segments`, and the gate ALSO checks the vitest half
  exists and executes the geometry · **generality** (0083, executed — producer, router AND
  surface, every non-docstring string) ·
  **declared absences**, each with an unblocker that expires (`incompatible` · `not_disclosed` · a
  **`CY` axis**, which `period_interval` cannot place · **segment series**, rung 6d). It also runs a
  **design-system gate** — `undefined_token_failures` reads `tokens.css` and fails on any
  `var(--name)` PAINTED in an attribute that the token layer never defines, invariant 2's silent
  half: a one-off hex is loud, an undefined variable renders as nothing — and
  `undefined_utility_failures` does the same for Tailwind COLOUR utilities against `theme.css`,
  whose `--color-*: initial` reset means a typo'd `text-amber-inc` generates nothing. `--store`
  runs the REAL read model over every graded workspace: **>=3 issuers / >=2 sectors**, every drawn
  reading's citation carrying an address, and a sample **OPENED through the real
  `read_passage`** — checking `anchor is not None` re-tested the property 0109 replaced.
  **Audited by ADR 0113**, whose review found two blocking defects visible in the checked-in
  fixture with no gate catching either; `series-crossstack.test.ts` parses that live recording
  through the zod refinements and is re-recorded whenever the producer's output changes.
  **Audited again by ADR 0114**, which added five gates, each beside a `legacy_*` replay and
  injectable so its test hands it the pre-fix decision: **identity** (a second currency is a
  parallel series, never a treatment) · **disagreement** (`ambiguous` ⇔ the drawn measurement is
  RESTATED, judged over the whole group — the lead-against-each rule missed 34% beside
  33.6%/34.1% and flagged constant-currency growth) · **expectation** (a role's
  `expected_not_found` lends no obligation to a line no duty names) · **contract** (eight shapes
  the old wire accepted, including a continuous span through a declared break) · **accounting**
  (only a figure a DOCUMENT states is read; a sparse metric says which of two reasons; an
  annual-only metric on a quarterly axis is listed `offAxis`). `--store` adds **conservation**:
  every document-stated metric has exactly one place, read off the store.
  **Audited a third time by ADR 0115**, which added three more, each beside a replay:
  **monotonicity** (a rounder print never erases a break — breaks are judged over every
  reading, a hidden reading must share every comparison with one that stays, and a break
  resting on an undrawn print carries it as `witness`) · **silence** (read one way, derived
  from each treatment's vocabulary: an unlabelled figure IS the `reported` one where that is a
  value; elsewhere silence is unknown and never a difference) · **spans** (an off-axis reason
  is checked on the calendar for EVERY period it lists, offline and in `--store`).
  **Layout: `node scripts/verify-series-layout.mjs [--ai <url>]`** — the browser half, needing
  `pnpm dev` + `pnpm dev:ai` and Chrome or Edge (CDP, no dependencies). It opens every source
  history at 1,280 px and 400 px on the graded workspaces and fails on anything that spills
  past the module, a desktop table that needs scrolling, or a cell wider than its column;
  it proves it can fire on an injected spill every run, and exits 2 (UNVERIFIED) with no
  browser or app. `--ai` rewrites the page's API origin — for a `dev:ai` wedged mid-reload.
  **A Python probe cannot render TSX**, so the render decisions run in vitest
  (`apps/web/app/library/series-frame.test.ts`) — and the COMPONENT is rendered to markup in
  `series-module.test.tsx` (`vitest.config.ts` sets the automatic JSX runtime), because 0114's
  two P1 render defects lived between green helper tests and the screen. A verify card names
  all three halves.
- **Series door (AI, in `services/ai`): `GET /brief/series?workspaceId=<ws>[&grain=quarter|fiscal_year]`**
  — the brief's *what changed* module. `grains` on the answer lists every grain the record carries;
  `grain=` asks for one of them (absent: the record's majority grain), and the answer's `grain` says
  which was drawn — never an empty axis (ADR 0143 D4). Window (4-6 periods at that grain) · one series per metric on
  the frame it is DRAWN on (coverage first, then the UNTREATED basis on a tie) · every other frame
  disclosed with its coverage and citations · a silent period as a `gap` arm with a **cause** —
  `record_silent` (rung 7's reason and the **precision** it was reached at) or `other_basis_only`
  (the scopes that DO carry it, since an absence beside them is refuted by them) · a basis
  break where the record states the metric two ways and the two disagree · a point flagged
  `ambiguous` only where its own measurement is restated · every other document-stated metric
  as `sparse` (with its reason) or `offAxis` (spans, each with the reason true of its periods)
  — one place each (ADR 0114/0115). A point lists `restatements` and `otherBases` separately,
  and a break may carry the `witness` print it rests on. Vendor and computed figures are not read here. `workspaceId` has **no
  default**. A **mixed-issuer workspace is REFUSED** here where `/brief/head` answers 200 — a series
  is one company's figure over time, and two filers on one line is a chart of nothing (ADR 0112).
  Every refusal is a **200 carrying a reason**; only an unreachable store is a 503, and a **404
  means the running service predates the route — restart `pnpm dev:ai`**. Web: `/library`.
- **Structure probe (AI, in `services/ai`): `uv run python -m app.eval.structure_probe [--store]`**
  — the rung-11b instrument (ADR **0120**). Offline ~25 s: ten gates on constructed witnesses plus
  four issuers' REAL segment notes through the real reader (TCS, which the store does not hold,
  composes nothing and says `not_composable` — honestly degraded). Its headline is NOT *"a
  composition rendered"*: it scores the three ways a share track lies — **normalised** to the
  largest part, a share of the **sum** of the parts (every track full, the gap row deleted), a share
  and a growth rate under **one unlabelled column** — and whether each delta is the **note's own
  comparison** (never across reports: HDFC renames segments in its own comparatives). Every gate
  takes an injectable builder and fails on a `legacy_*` replay built PAST the contract, so the gate's
  own predicate fires. `--store` reads every graded workspace through the real door: conservation
  (every disclosure drawn or listed, once), **>=3 issuers / >=2 sectors**, every figure addressed,
  every prior GATED to its own note's document, each lead's figure OPENED on its own cell
  (`anchor_content`). Labels pair on `pairing_key` — marks and footnote references only, so
  `Retail (excluding cards)` never pairs with `Retail`. The render decisions run in vitest
  (`structure-frame.test.ts`, `structure-module.test.tsx`, `structure-crossstack.test.ts`) and the
  layout in **`node scripts/verify-structure-layout.mjs`** (needs `pnpm dev` + `pnpm dev:ai`; exits 2
  UNVERIFIED without them; measures each fill's RENDERED width against its share). Door: **`GET
  /brief/structure?workspaceId=<ws>`** — business and geography, every refusal a 200 with a reason,
  a mixed-issuer workspace refused like the series. Fixture: **`uv run python -m
  app.eval.record_fixture --door structure --trim --out <path>`** drives the real route over the
  store's graded workspaces and formats the result — re-record whenever the producer's output moves.
  **Audited by ADR 0121**, which added two gates beside replays: **reconciliation** — *within
  rounding* is each figure's OWN printed step summed, whole included (`reconciliation_allowance`,
  one definition, re-derived by both contracts; the coarsest step × the count called a ₹2.40 crore
  gap rounding) — and **combinations**, the product of every disclosure condition built beside a
  valid composition, because a lone margin total refused the WHOLE response on a precedence the
  producer and contract stated differently. Test a PRODUCT of conditions, never each one alone.
- **Timeline probe (AI, in `services/ai`): `uv run python -m app.eval.timeline_probe [--store]
  [--seed] [--held-out] [--live]`** — the rung-13 instrument (ADR **0126**, audited by **0127**).
  Offline, no key/DB. Its headline is NOT *"a timeline rendered"*: it scores each way a mark can
  state a date, a grouping or a cause nobody printed, every gate beside a `legacy_*` replay that
  must FAIL. The date is PRINTED (the PDF stamp and the stored period are never drawn; an
  independent hand-read gold, **0 WRONG**) · a month stays a month · a checkpoint groups one day
  and one voice, an undated record joining only through the QUARTER it states · a gap is rung 12's
  missing filing, one key · every record has exactly one place · nothing joins two marks (field
  sets, a causal lexicon over all copy, a price lane that reads no mark). **0127 added five:**
  *occurrence is not association* — an event is dated only where a clause of its passage ties the
  SAME action to the date (`legacy_occurrence` dated a payment by a balance date) · *a parser's line
  break is not the page's* — gated over EVERY split point of each witness page · *sameness is an
  identity* — a dividend declared the day of a call is an event, not the call · *the cutoff is not
  the axis* — nothing after `asOf` is drawn · *nothing dated keeps its gaps and lists*. `--store`
  adds ≥3 issuers / ≥2 sectors, the partition on the live store, spans equal to rung 12's
  missing-filing keys, and every dateline citation OPENED on the element printing its date;
  `--seed` grades every development seed PDF; `--held-out` prints the five held-out issuers for a
  human to judge; `--live` asks the price provider once. The render decisions run in vitest
  (`timeline-{frame,module,crossstack}.test.*`), and the layout and the JOURNEYS in
  **`node scripts/verify-timeline-layout.mjs [--ai <url>]`** (needs `pnpm dev` + `pnpm dev:ai`;
  exits 2 UNVERIFIED without them): every mark at its date at 1,280 and 400 px, plus gap → lead,
  mark → citation → return, and a chronology with nothing dated INJECTED at the door — a journey
  that never ran fails. Fixtures: `app.eval.record_fixture --door {timeline,market-history}`.
- **Timeline doors (AI, in `services/ai`): `GET /brief/timeline?workspaceId=<ws>`** — the record
  lane (calls by their title blocks, documents by their datelines), the dated company events by ADR
  0059 landmark group, the coverage spans keyed as rung 12's leads, and every record not drawn
  listed with its reason. An event carries its `action` and its `when.clause`, one assertion. Read
  on `asOf` (IST); a mixed-issuer workspace is refused; `no_dated_record` still carries the lists.
  **`GET /market/history?workspaceId=&start=&end=`** is the price lane: a SERIES receipt
  (split-and-dividend adjusted, as-of = the last bar), a close only for a session that ENDED, and a
  provider outage a 200 with an `unavailable` receipt. `workspaceId` has no default on either; a
  **404 means the running service predates the route — restart `pnpm dev:ai`**. Web: `/library`.
- **Graph probe (AI, in `services/ai`): `uv run python -m app.eval.graph_probe [--store]`** — the
  rung-15 instrument (ADR **0136**). Offline, no key/DB. Its headline is NOT *"a graph rendered"*:
  it scores the four ways a node-link view lies, each gate beside `legacy_*` replays that must FAIL
  — **every edge traces to a document in scope** (a derived edge's passages come from what it
  derives from; a curated seed is never drawn; a relation surviving a toggle carries only its
  in-scope passages) · **a metric node is the brief's series under the Graph's scope** (no figure
  from an excluded report; gaps `unexplained`, never a rung-7 reason unchecked) · **a node's detail
  is the record's** (kind by `statement_of`, both sides, a quote only for a named speaker's
  direct/quoted words) · **a seed lands on its own evidence or says why** — plus the contract's
  refusals, the frontend consumer (size = VISIBLE degree, the legend says *not importance*,
  families on evidence tokens, no perpetual particles, reduced motion) and generality. `--store`
  reads every graded workspace through the real door: 0 uncited edges, metric readings equal to
  `/brief/series` figure for figure, a narrowed scope citing nothing excluded, a lead / a figure's
  cell / a document each landing, the same seeds under an empty scope `excluded_by_scope`, and ≥3
  issuers / ≥2 sectors. Self-tests: `tests/test_graph_probe.py` (every detector fed a defect planted
  in CODE — the gate reads prose-free source). The render decisions run in vitest
  (`app/graph/{graph-frame,node-details,graph-crossstack}.test.*`) and the journeys in
  **`node scripts/verify-graph-layout.mjs`** (needs `pnpm dev` + `pnpm dev:ai`; exit 2 UNVERIFIED):
  the canvas settles, search→Enter opens a node, lead → Graph → *Back to the lead*, metric → Graph,
  at 1,280 and 400 px — and since rung 16 the breadcrumb on a direct entry, the **Table** (rows =
  drawn edges, a row's object opens the same Details, its evidence opens citations, `?view=table`
  kept, no sideways scroll at 400 px), **Communities** (areas drawn, settles, a chip focuses) and
  one **Ask** (a view-derived question → a standing + five blocks, or a reasoned decline). Fixture:
  `app.eval.record_fixture --door graph --trim` (asked the way a lead's handoff asks: seeded, whole
  workspace). `--store` also gates that every live seed the record holds carries a `label`.
- **Graph Ask probe (AI, in `services/ai`): `uv run python -m app.eval.graph_ask_probe [--store]
  [--live]`** — the rung-16 instrument (ADR **0137**). Its headline is NOT *"Ask returned text"*:
  a why settled by an attribution, a non-answer dressed in citations, a model sorting the record,
  a missing line reporting a search nobody ran, and a switched-off source still speaking. Offline
  (no key/DB): nine must-fire compose cases (incl. a contest shown from one side and a view
  nothing has been read from called silent) run on the shipped `compose_answer` AND on
  `legacy_ask` (the pre-16 Ask replayed as structure — 8 fire), the contract's refusals (incl.
  no free-text answer field), the web consumer (blocks in order, parsed not cast, table and canvas
  read one function over one graph, the brief fetchers send the view), §1c (ADR **0144**: a named
  basis binds, a disagreement settles nothing, each period asked is covered, a chain folds, a
  signal compares one basis) and generality. `--store`
  (~70 s, no model): per graded workspace the most-cited document is switched off — **no brief
  module may cite it** (printed old → new: the legacy doors must leak), the series keeps the
  record's axis, a module that lost content says so (`outOfView`); the Ask is offered nothing from
  outside the view (documents or period) and every composed answer validates and lights only
  drawable objects. `--live` asks the pinned model (`graph_ask_model`, 6-luna@none) four DERIVED
  questions per workspace (causal · forward · descriptive · off-record) and grades properties:
  why/forecast `cannot_settle`, off-record declined with no evidence, ≥3 issuers / ≥2 sectors.
  Self-tests: `tests/test_graph_ask_probe.py`. Web halves: `app/graph/{graph-ask,ask-answer,
  graph-views,graph-layout,relationship-table,arrival-bar}.test.*`, `app/library/evidence-frame.test.tsx`.
- **Story probe (AI, in `services/ai`): `uv run python -m app.eval.story_probe [--store] [--live
  [--fresh]] [--workspace <id>]...`** — the rung-14 instrument (ADRs **0145–0146**). Its headline is NOT
  *"a story was generated"*: fluent prose can type a number, read a cause off a filing, call one
  broker "analysts" and pick a winner. Offline (no key/DB): eight planted defects (stray numeral ·
  uncited · cause as filed · unnamed voice · no falsifier · verdict · cite not in the dossier · a
  claim the record lacks something) each withheld by the shipped `enforce`; the naive writer
  replayed WITHOUT it fires 8/8; the contract refuses all eight; the after-review stages (a
  disagreement's unsupported words dropped, a dangling statement withheld) with a scripted judge;
  generality. `--store` (~20 s, no model, writes nothing served): the census
  baseline, each workspace's dossiers, hash + fingerprint stable across two reads, a stored key
  equal to a fresh gather's (the memo is honest), and a scripted write over every real dossier.
  `--live` first grades the REAL reviewer on a must-fire set (`story_store.reviewer_failures`: three
  bad falsifiers, an invented fact in a disagreement's words, a dangling statement — each beside a
  sound control), then runs writer + reviewer at their pins (`story_model`, `story_verify_model`) on the graded
  four, STORES the stories (the verify card's brief reads them), prints each for a human, and
  reports the reviewer's support rate; `--fresh` rewrites parts already stored. Gate: a standing
  story keeps ≥4 statements and ≥1 interpretation. Tests: `tests/test_story.py`. Web:
  `app/library/story-module.test.tsx` (fixture `__fixtures__/story-hdfc.json`, the door's real
  output) and **`node scripts/verify-story-layout.mjs`** (the laid-out page: no digit outside a
  figure, a falsifier one click away, nothing spills; exit 2 UNVERIFIED). ⚠ **Do not open a
  Library page while `--live` writes**: a page view over a workspace with no stored story starts
  its own job in the dev server (the lock is per process), so two writers pay for one story and
  the later save wins.
- **Story door (AI): `GET /brief/story`** `{workspaceId, docIds, mode}` → `StoryResponse`
  (`ready | writing | partial | thin | unavailable`) — never waits on a model: a miss on the record's
  fingerprint starts ONE background job. `POST /brief/story/rewrite` writes one for exactly the
  view (D7).
- **Graph Ask door (AI): `POST /graph/ask`** `{workspaceId, question, docIds, mode, period,
  previousQuestions}` (the chat's earlier questions, oldest first, ≤ 4 — folded, ADR 0144) → `GraphAnswer` — always a 200: answered (standing · observed · attributed ·
  alternatives · missing · discriminate · focus · refused) or declined (`nothing_in_view` —
  nothing READ bears on it · `nothing_read` — nothing read from the view yet · `model_unavailable`,
  with the reason). Only an unreachable store is a 503. A `docIds` entry the workspace does not
  hold is dropped, like `/ask`'s.
- **Graph Ask chats (AI, round 3): `/graph/ask/threads`** — `GET ?workspaceId=` → a workspace's
  chats, most recently asked first (≤ 20) · `PUT /{id}` `AskThreadWrite` (title + settled turns,
  whole) → `AskThread` with the store's times · `DELETE /{id}?workspaceId=` → 204, twice is fine.
  No default workspace; a 404 means the running service predates the route (restart `pnpm dev:ai`).
- **Brief doors read the view (rung 16):** `/brief/{series,structure,timeline}` take `docIds` +
  `mode` like `/brief/attention`; the series axis stays the record's (a toggle-caused silence is
  `outside_view`) and each response counts what the toggles set aside (`outOfView`).
- **Graph door (AI): `GET /graph?workspaceId=&expand=&docIds=&mode=&period=&seed=&origin=`** — the
  projection under a server-side `ResearchScope`. `seed` is a JSON `ObjectRef` (finding · claim ·
  page/element/cell · document · graph_node) resolved at render time into `GraphResponse.seed`
  (`resolved` with `nodeIds` + `outOfScope`, or `unresolved` with `excluded_by_scope` ·
  `not_in_record` · `no_graph_object`); a seed that is no `ObjectRef`, or an unknown `origin`, is a
  422. `period` narrows STATEMENTS, never a metric's series. Web: `/graph?workspaceId=&from=&seed=
  &period=&off=` (a handoff; `off` = the switched-off documents, tracked in the URL).
- **Brief probe (AI, in `services/ai`): `uv run python -m app.eval.brief_probe [--store]`** — the
  rung-10a instrument (ADR **0106** under **0105**). Offline, no key/DB, **~2 s**. Its headline is
  NOT *"a brief rendered"* — rendering is what the Phase-1 Library did for months while pinned to a
  dev fixture carrying the vocabulary rung 4 retired. It scores whether the two lines an analyst
  reads FIRST can over-claim, across seven gates, each a pure function unit-tested against the
  pre-fix shape and asserted to FAIL (`legacy_identity` replays identity through the market door;
  `legacy_page_total` replays an unparsed document counted as zero pages; `legacy_independence`
  replays independent DOCUMENTS counted as sources): **identity is not a price** (an unlisted
  company keeps its name; the read model never reaches `app/market/`, and the two head components
  never read a market reading — scoped to the COMPONENT, because the surface legitimately PLACES
  rung 9's row) · **present-iff-absent** (seven broken pairings refused, four correct shapes
  accepted) · **stated, never derived** (a corpus declaring no basis reports `undeclared`; the span
  is order-INDEPENDENT, because `FY2026` and `Q4 FY2026` end on the same day and `max` over a
  partial order is a coin flip; the exchange comes from the listing master, never a `.NS` suffix) ·
  **an uncounted page is not zero pages** · **the second filer is a STATE** carrying the documents
  that repair it, and the router raises exactly ONE HTTP failure — an unreachable store ·
  **the consumers delegate**, following the delegation one hop to `brief-frame.ts`, plus the
  structural half: **no file under `apps/web/app/library/` names a workspace** (a `*.test.ts` may
  name a fixture id; the deleted constant is banned everywhere) · **generality and copy** — no
  issuer, no sector branch, and no absence phrased as an accusation (ADR 0095 §1). `--store` runs
  the REAL read model over every workspace and requires **>=3 issuers / >=2 sectors**. **A Python
  probe cannot render TSX**, so the render decisions are executed in vitest
  (`apps/web/app/library/brief-frame.test.ts` — the independence composition must ACCOUNT for
  every document, which is a property and not a copy assertion). Neither half is sufficient; a
  verify card names both. **Audited by ADR 0107**, which made it test the proposition the analyst
  reads through producer AND consumer: the basis gate replays the collapsed-column read
  (`legacy_basis`) and `--store` recounts each workspace's declarations from raw inputs, printing
  how many workspaces the old read called `undeclared` (3) · every query key the brief USES must be
  in `CORPUS_QUERY_KEYS` · every upload path must ask `routesThroughFilingDialog`. **A second audit
  (ADR 0108)** added three more gates. The hook runs `corpusWatcher` and `savePassport`, and
  never compares a processing count with its previous value. The Ask panel steers the graph only
  through `steersTo` (rung 16: `GraphAskPanel`), using a handle its unmount clears. No brief navigation writes the
  analyst's search.
- **Brief door (AI, in `services/ai`): `GET /brief/head?workspaceId=<ws>`** — the coverage brief's
  company head and the record's own shape (identity · declared basis · reported span · the filer
  census). `workspaceId` has **no default**. A **mixed-issuer workspace answers 200 carrying
  `ambiguous_issuer` with both companies and their document ids**, never a 503 — the one place this
  door deliberately differs from `/evidence`, which cannot draw a grid over two filers and refuses
  (ADR 0105 D5). A store failure is a 503; a **404 means the running service predates the route —
  restart `pnpm dev:ai`**. Web: `/library` (the brief).
- **Citation probe (AI, in `services/ai`): `uv run python -m app.eval.citation_probe [--store]
  [--open-all]`** —
  the rung-10b instrument (ADR **0109**). Offline, no key/DB, **~3 s**. Its headline is NOT *"a
  citation resolves"* — a citation always resolved, to a STRING: for a whole stage a Lane-2 fact
  citation joined page, element id, row, column and both labels into one `·`-separated DISPLAY
  label, and reaching the cell meant splitting it (ADR 0091's named deferral). The gate is RAISED
  from *names a location* to *opens it*, and `legacy_address` replays the old capability rather
  than describing it. Seven gates, each a pure function unit-tested against the pre-fix shape and
  asserted to FAIL: **register** (every family that MINTS a `Citation` — read off the syntax tree,
  since a register checked only against its own rows is a census — declares its anchor, or declares
  an absence with a reason AND a named unblocker) · **drift** (a restated figure, a shifted row, a
  shrunk table and an element that is no longer a table all report `changed`; an UNCHANGED cell
  does not — that half is the one that nearly shipped broken) · **no parsing** (nothing recovers an
  address from a locator, executed over the tree) · **consumers** (ONE viewer, mounted once in the
  root layout; nothing outside `app/evidence/viewer/` decides openability, builds the passage
  request, or assembles a `ViewerRequest`; and the Library's and Canvas's old chips are GONE, not
  hardened beside it) · **assertion** (a highlight is refused under `changed`/`missing`, both
  halves) · **generality** (0083, executed) · **receipt**. `--store` runs the REAL `read_passage`
  over real citations from every producing family: **>=3 issuers / >=2 sectors**, every sampled
  citation opening onto its own evidence with a Lane-2 one landing on its CELL, and **every citation
  in a graded workspace carrying an address** (gated, not printed — the whole-store figure is
  printed beside it because `ws-test-*`/`ws-doc-*` debris would otherwise understate a finished
  slice). **A Python probe cannot render TSX**, so the render decisions run in vitest
  (`apps/web/app/evidence/viewer/*.test.ts`). A verify card names both halves.
  **Audited by ADR 0110**, which added four things the first version could not have caught. The
  drift gate now checks the **COLUMN** — `valueText` and `rowLabel` both match while a re-parse
  shifts a figure onto another period, and `_legacy_no_column` replays the two-field rule to prove
  it. Every opened mark must carry a **basis** (`anchor_content` | `recorded_position`), and a
  Lane-2 one must earn the first. The headline **states each denominator** — address / absent /
  JSON null / malformed, per scope — because `p->'anchor' IS NOT NULL` is TRUE for a jsonb null,
  which is exactly what a producer minting without an anchor writes; `SURFACED_CITATIONS` now
  includes `active_relations`, whose 614 chips the graph inspector draws and the old headline
  ignored. And no rendered copy may **deny a capability the product has** (`denial_failures`): the
  Library went on printing *"No citation opens its source"* under working buttons.
  **A second audit (ADR 0111)** asked what each verification was taken OVER. The drift gate now
  covers a period qualifier SPANNING the column — `legacy_no_qualifier` replays the old receipt and
  is unchanged across a quarter/year swap that moved **13,908 of 19,674** live cells. A receipt is
  minted only where the grid is a WITNESS to the reading it certifies (`certified_column_header`),
  because the BACKFILL pairs immutable extraction-time labels with today's `elements.rows` and
  without the gate stamped today's heading on yesterday's reading. And a `PassageResponse` claiming
  `anchor_content` must SHOW the grid holding the cited value: `read_passage` resolved, verified
  and rendered in three reads at READ COMMITTED, so changing only the third produced `resolved`,
  `anchor_content` and a facsimile showing another figure. **`--open-all` opens EVERY citation**
  instead of four per family per workspace — slower (minutes), and it is what turns *"the sampled
  ones opened"* into a census: **1,910/1,910 resolved, 460 `anchor_content`, 1,450 `recorded_position`** — and on
  its first run it FAILED a store gate that demanded `anchor_content` from every cell citation,
  including the 72 whose grid cannot witness the reading. A cell CARRYING a receipt must verify;
  one without must say so with a reason; and a floor fails the day no graded workspace mints one.
  **And the run GATES its own coverage** (ADR 0118 D7): counting, parsing and opening all read one
  `SURFACED_CITATIONS` registry, and `opened == addressed` is asserted — the opening loop kept its
  own hard-coded family list when `active_segment_facts` joined the census, so an exhaustive run
  counted **2,214**, opened **1,938**, and printed a clean pass over the 276 it never touched,
  including the 24 that were failing. *Exhaustive* is an adjective on a loop, and a loop cannot say
  what it did not iterate. Today: **2,214/2,214 opened, 756 `anchor_content`**. Each row also
  declares the RECEIPTS a cell citation of its lane must carry (`cell_receipts`), because which
  dimensions a cell can record differs by lane and one list for all of them is a gate only one
  implementation can pass (0119 D3).
- **Citation-anchor backfill (AI, in `services/ai`): `uv run python -m app.provenance.backfill
  [--workspace <ws>] [--rebuild]`** — fills `Citation.anchor` on an already-ingested store (ADR
  0109 D7). **Dry run by default; `--apply` writes.** Deterministic: a narrative citation's address
  is its chunk's page, a Lane-2 citation's is its own `fact_mentions` columns — **no model, no
  parse, nothing downstream recomputed, so NO baseline expires** (`backfill_frames`' posture).
  **Nothing is derived from a locator**; a row it cannot address is REPORTED, never guessed. Prints
  every refusal in full and a per-shape census for the rest, because 56,550 identically shaped
  moves is a wall of text nobody reads. `--apply` verifies its postconditions by RE-READING the
  store. `--rebuild` re-derives anchors that already exist — the escape hatch for a change to the
  anchor SHAPE, without which a re-run would skip them and report a clean pass over the old one.
  **It was needed once already**: ADR 0110 added `CellRef.colHeader`, the column's own header cells,
  so the drift rule can check the dimension `colLabel` cannot. Its verifier's predicate was also
  wrong in the mirror of the probe's — `e->'anchor' IS NULL` never matches a jsonb null — so both
  now share `has_address_sql` / `lacks_address_sql`, which partition. **`--rebuild` re-derives the
  ADDRESS freely and may not erase a RECEIPT it cannot itself certify** (ADR 0111): the stored one
  is then the only record able to report the drift.
- **Evidence viewer door (AI, in `services/ai`): `POST /evidence/passage`** — the terminal
  resolution of every citation in the product (rung 10b). Body: `{workspaceId, anchor, chunkId?}`;
  `workspaceId` has **no default**. A POST for a read, because the body carries an `ObjectRef`
  discriminated union and flattening it into query params would admit the bare `{type,id}` the
  union exists to refuse. **A ref that no longer resolves is a 200** carrying `missing`/`changed`
  with its reason — a 404 would render as a dead chip; only an unreachable STORE is a 503, and a
  **404 means the running service predates the route — restart `pnpm dev:ai`**. The facsimile is
  PARSED ELEMENTS, never page text: `chunks.edges.elements` knows exactly which elements a passage
  is, so nothing is string-matched. **Every mark states what it RESTS ON** (`highlight.basis`,
  ADR 0110): `anchor_content` only for a ref carrying the content it points at — today a `cell`,
  whose row label, column heading and printed value are all compared — and `recorded_position` for
  everything else, which is the honest state of the narrative lane and not a fault. Present-iff a
  mark exists, both directions, on both stacks — and `anchor_content` is refused unless the
  response SHOWS that element's grid holding the cited value, because the verdict and the facsimile
  were once two reads free to disagree (ADR 0111). Web: the overlay, mounted once in `app/layout.tsx`,
  registered on the app's ONE Escape stack (`app/components/escape-stack.ts`) with the shared focus
  trap beside it; deep-link entry is `?ev=<anchor>` beside `workspaceId`, and the link the viewer
  COPIES takes its workspace from the request, never from the address bar.
- **Market context (AI, in `services/ai`): `GET /market/context?workspaceId=<ws>`** — the rung-9
  door. Workspace → **exactly one** filing issuer → **ticker** → listed instrument → the provider,
  with a named reason at every break (`no_covered_issuer` · **`ambiguous_issuer`** ·
  `no_listed_instrument` · `no_vendor_symbol` · `vendor_unreachable` · `vendor_incomplete`). It
  **refuses a mixed-issuer workspace** rather than pricing the majority filer, because the evidence
  grid already refuses that workspace and a price is the one datum an analyst cannot sanity-check by
  reading it (ADR **0103** D5). Only the two `vendor_*` reasons ever reached a network, and only
  those name a provider or carry a `fetchedAt`. **A provider outage is a 200 carrying an
  `unavailable` receipt, never a 5xx** — a market outage is a fact about the world, not a fault in
  this service; a STORE failure is a 503, and a **404 means the running service predates the route:
  restart it**. `workspaceId` has **no default** on either side. Web: `/market` (the substrate
  preview — no chart, no live tick; the chart is rungs 11/13).
- **Lane-2 facts (AI, in `services/ai`): `uv run python -m app.facts.cli --workspace <ws>`** — the
  rung-6b/6c producer: results/KPI-lane tables → immutable `fact_mentions` → resolved
  `fact_versions` → the atomic swap into `active_facts` (ADR **0088**). **Deterministic — no model,
  no key, no network:** a cell's meaning is its coordinates, so a model here would be a guessing
  layer over data we can read exactly. **An upload runs this lifecycle itself** (ADR 0129 —
  `app.facts.lifecycle`, after embed ∥ extract, never failing the document); the CLI is for a
  document landed before 2026-09-24 or by the sync `--to-db` path, and for inspection.
  **Dry run by default; `--apply` writes.** `--show` prints
  the persisted facts WITH the cell each came from, because a count is not reviewable and this
  lane's failure mode is a plausible number on the wrong period. `--reresolve` re-runs the producer
  over stored elements under the ORIGINAL run id: free, and an integrity check — mention ids hash
  `run|element|row|col`, so a document re-parsed since extraction has diverging ids and is REPORTED
  rather than resolved against cells that moved. Scope is a **router**, not an intention: every
  table of a results filing, but only an annual report's **named statements** (HDFC's AR offers 717
  tables; 31 are admitted). Broker research is excluded — its tables are forecasts. Every refused
  cell is a persisted row with a reason, so `figure_cells == kept + rejected + notes_dropped` holds
  per table and a `done_zero` statement page is auditable. **A re-run is idempotent since ADR
  0089**: the row id is minted per (run × mention) and `fact_key` carries the stable identity.
  Before that split an identical `--apply` inserted ZERO rows (`ON CONFLICT DO NOTHING` against
  rows bound to the previous run) and then activated the empty run it had just created — 512 facts
  to 0, while printing the count it had COMPUTED. `--reresolve` compares the **whole anchor** (row
  label, column label, value text), never just ids: an id hashes `run|element|row|col`, so a
  re-parse changing a cell IN PLACE leaves the id set byte-identical. A monetary cell whose header
  lost its currency mark inherits the document's **only when the document names exactly one**
  currency — two, and it is refused (`currency_ambiguous`); the inherited count is printed.
  **`--segments` prints the filed PARTS of the business** (rung 6d) — one block per (metric,
  period, partition, basis), the note's own disclosed whole beside the parts, the GAP between
  them, and the cell each came from. A count cannot tell you that ₹233,634.50 crore landed under
  `Other retail banking` rather than `Wholesale banking`, which is this lane's signature failure.
- **Segment facts (AI, in `services/ai`): rung 6d, ADR 0116, audited by 0117/0118/0119.** An Indian segment note has THREE
  axes and does not agree with itself about which is which — HDFC and TCS put the metric on the
  row and the SEGMENT on the column with the period in a sentence above the grid; Infosys puts the
  PERIOD on the row inside a metric block; ICICI puts the segment on the row. So the axes are
  **identified, never assumed by position**, and the segment axis is **the one carrying the note's
  own total** (positive, structural evidence — identifying it by exclusion made TCS's
  `…YoY Revenue Growth %` column a "segment"). Three rules the reader will not break: **it never
  sums** (the disclosed whole is read or there is none — rung 11b's gap row is their difference);
  **a segment total never lands on a whole-company line item** (HDFC's segment revenue is ₹6.01
  lakh crore against income from operations of ₹4.08 lakh crore, the difference being inter-segment
  revenue); **a short row is never positioned** (its blanks were dropped by the parse and which
  column each survivor belongs to is unknowable). The PART is `fact_versions.segment` and its
  PARTITION is `segment_dimension` (`business` / `geography`, never defaulted) — both in
  `fact_key`, because two parts of one metric are different measurements and the two partitions
  each sum to the SAME whole. **THREE views, three questions** (0117 D9): `active_facts` is the
  company's figures and excludes the lane entirely · **`active_segment_facts`** is the parts ·
  **`active_lane2_facts`** answers AVAILABILITY only — *does this workspace hold filed evidence
  here* — and is declared for `app/evidence/` alone, because a third view is a third chance to
  serve a part's figure as the company's.
  **0117's four rules, each bought by a defect the first cut shipped.** A header word is placed by
  OVERLAP or by the LABEL BLOCK its own wrapped lines build, never by distance: a 0.25pt margin
  renamed two of Infosys' segments, and a word nothing places is now REFUSED. A period expression
  is extracted WHOLE by the shared grammar (`facts.tables.period_expressions`) — `Quarter ended 31
  March 2026` read as its bare year and landed three quarterly figures on FY2026. A metric may not
  decide a PARTITION, and a source naming BOTH stops the walk. And **a part is proved by its own
  cell**: reconciliation is invariant under a swap, so every stored figure must re-derive from the
  cell its citation opens — the value from `value_text × scale`, the PART from the anchor's own
  label. One shared **`facts/disclosure.py`** groups parts and wholes for the gate, the review
  surface and rung 11b, with additivity AUTHORED so a margin gets no gap at all.
  **0118's rule is one sentence: a check is worth only what it was taken OVER**, and six of its
  eight findings are that sentence. The capture resolver fetched an element's `rows` and never its
  `meta`, so it judged a segment cell by the grid-header rule and reported drift on an unchanged
  page — **24 of 276** live citations, all ICICI's, and the viewer's own axis-aware check agreed
  the cell was fine and could not undo it, because a resolution may only be DOWNGRADED. One
  `ingestion.elements.table_witness` reads that metadata for every consumer now. A receipt-MINTING
  gate is not a drift check: `certified_axis_column`'s `None` means four things, and reading the
  fourth (*this column is called something else*) as *no heading available* left a figure moved
  from `North` to `South` openable — `axis_column_header` answers only what the column is called
  NOW and the caller compares. **A receipt covers the whole meaning, including what is stated
  outside the grid**: `CellRef.qualifiers` carries the note's period banner and units line, so
  re-dating the banner is DRIFT rather than a verified reading of another year; it is tri-state
  (`[]` = depends on nothing outside the grid; `null` = not recorded) and the anchor backfill
  DECLINES it rather than copying today's banner onto yesterday's figure. A **separator is not a
  property of a date format** — 0117's own period fix survived in the format it did not enumerate
  (`Quarter ended 31-Mar-2026` → FY2026) — so one `_DATE_SEP` spans every joint and
  `unparsed_qualifier` REPORTS a qualifier no expression covers rather than letting the fragment
  that matched stand in for it. The re-resolve comparison carries the printed METRIC and the SCALE
  as well (`MentionMeaning`, a NamedTuple): a re-titled block heading and a crore→lakh
  re-denomination both swept clean without them.
  **0119's rule: a receipt is the CONCLUSION, not the inputs to it.** 0118's receipt listed the
  statements a reading depended on and checked each was still there — and presence is
  MONOTONE while meaning is not, so it could not see a statement ADDED beside the recorded ones,
  nor any dimension it never listed. Three passed it: re-titling the one-cell row that heads a
  metric block (`Segmental operating income` → `Segmental revenues`) changed what every
  figure beneath MEASURES while `read_passage` still returned `anchor_content`; adding a
  `unitHint` of `INR lakh` above a kept `INR crore` moved every figure by 100x; and adding a
  SECOND period banner made the note indeterminate — the producer refuses the cell and the
  citation went on verifying. So `CellRef.reading` carries what the surroundings MADE of the cell
  (measure, period, part, unit) and `cell_verdict` RE-RUNS the segment reader over the element the
  response is about to display. That reader consumes only that element, so the re-reading is a
  pure function of the bytes on screen — ADR 0111 one step on. It records the period
  RESOLVED, not the phrase, so a re-wrapped banner is not a restatement; receipt applicability is
  declared PER LANE (`SurfacedCitations.cell_receipts`), because demanding the segment lane's
  receipt of the statement lane made 560 correct citations report `recorded_position`, which is a
  gate only one implementation can pass; and **a banner naming TWO periods is refused** — it
  was resolved once per LINE and answered with one, landing three figures on FY2026 with no
  rejection.
  Prereq on an already-ingested store: **`uv run python -m
  app.ingestion.backfill_segment_axis --workspace <ws>`** (dry run by default, `--apply` writes) —
  it re-parses only segment-note pages and writes the column axis into `elements.meta`, touching
  no `rows`, so **no baseline expires**; a page it cannot prove an axis for is REPORTED, never
  guessed, and so is one whose STORED GRID is not the one this parse read (the axis carries that
  grid's fingerprint, so metadata cannot outlive what it describes). **It OWNS its `meta` keys,
  emptiness included** (0118 D6): they are deleted before the merge and re-written with whatever
  this parse proved, because `meta = meta || payload` kept a stale axis alive under a note the
  parse had just refused — the refusal printed and changed nothing. `verify` fails on that state,
  so the refusal is a postcondition rather than a line of log. **And it reconciles in BOTH
  directions** (0119 D5): the plan reads what the STORE calls a segment note as well as what the
  fresh parse does, so a classification this parse WITHDRAWS is removed rather than left feeding
  the producer — only for a document it could actually re-parse, since *this parse did not
  classify it* is not a statement about a parse that never happened.
- **Lane-2 probe (AI, in `services/ai`): `uv run python -m app.eval.lane2_probe [--store]`** — the
  rung-6b/6c instrument (ADR **0088**, audited by **0089**/**0090**/**0092**/**0093**; rung 6d's
  segment gates added by **0116**, audited by **0117**/**0118**). Offline, no
  key/DB, **25 s**: parses five frozen corpus documents and runs the real producer. **Twelve**
  gates, each a
  pure function unit-tested against the pre-fix shape and asserted to FAIL (`legacy_read` replays
  the pre-fix axis rule):
  **gold** — 30 figures read off the page, scored `produced`/`missed`/`unparsed`. The three states
  ATTRIBUTE a failure (rule 4); they never excuse one, so **`unparsed` fails too** — it was 0 of 30
  at landing, and gating on `missed` alone let a 1D₁ regression shrink the numerator while the probe
  printed PASS · **row loss** — every figure-bearing cell accounted for · **unit slip** —
  lakh/crore/₹'000 and ₹-vs-$ survive, AND every landed fact carries its line item's declared unit
  (the version of this gate that only promised that in its docstring could not fire: fed a
  `revenue_from_operations` fact carrying `percent` it returned nothing) · **absence** — a period no
  document covers produces NO row · **generality** — three shapes across ≥3 issuers / ≥2 sectors,
  one owning **no results document** (TCS, ICICI) · **structure** — no issuer name, no sector
  branch, read off the syntax tree · **declared absence** — the segment tables rung 6's must-fire
  named and this rung did NOT build, printed with its reason and unblocker and failing the day 1D₁
  classifies a segment note or a third issuer publishes one (0090).
  **`--store` reads the live store for TRUTH, not counts**: every figure re-derived from its own
  cell (`mention.value × multiplier`) · a stored currency that contradicts its frame, is
  inherited inside a two-currency document, or was ASSUMED where the document names none · every
  same-frame intersection whose readings DISAGREE run through the REAL `_resolve_cell` and
  required to come back `ambiguous` (invariant #9) · a workspace holding mentions and zero active
  facts, which is the emptied-run state · **REACHABILITY** — every landed line item resolved
  through the real question matcher, because ADR 0090 claimed 30/30 in prose and `borrowings`
  was still going to `total_debt` · **ANSWERABILITY**, which is a different question — the
  matcher resolving is capability, and between it and a served analyst sit the subject match, the
  scope filter, the frame collapse and the citation join. It runs the REAL `answer_kpi` for every
  `(company, line item)` pair IN THE STORE and requires an answer, ≥1 citation, and an answer that
  NAMES the item asked for. Run for real, reachability's own 30/30 was **28/30** — and both
  failures were in the WITNESS, because the phrases baked in a company and named the wrong one
  twice, so the subject is now DERIVED from the store (0092) · **PUBLIC ASK**, which is the
  headline and a third boundary out: the same facts asked through `answer_question` itself, each
  case bound to a REAL stored (fact, period, document) and scoped to that document, requiring the
  **structured** route, an answer naming the item, a citation, and **no** citation naming any other
  document (0092's scope guarantee, re-tested on the public path). Answerability stays as the
  DIAGNOSTIC that separates a router failure from a consumer failure · **CITATION VOCABULARY**, a
  declared gap that expires itself: our citations print the column label verbatim, so the analyst
  reads `Year ended March 31, 2024` — and **9 of 63** such labels are period words Ask can parse.
  Not fixed here, because widening the router without `match_period` would serve the LATEST period
  under a question naming another; the gate fails the day `match_period` learns a date (0093) ·
  plus the guessed-period and incomplete-anchor checks. · **SEGMENTS** (rung 6d, ADR 0116, audited
  by **0117**) — this
  section REPLACES rung 6's `declared_absence` exemption, whose two legs (1D₁ classifies no segment
  note; only the two reference companies can supply one) are both now false. Its successors ask the
  harder question: a **gold set of 27 segment figures** read off four issuers' pages, bound to the
  DOCUMENT, PAGE and PARTITION each was read from, and scored
  `produced`/`missed`/**`WRONG`** (a right-looking figure under the wrong part is this lane's
  signature failure) · every (metric, period, partition, frame) group **reconciles to the note's
  OWN disclosed total** — a gate, never a producer rule · **ATTRIBUTION**, which is the gate
  reconciliation cannot be: a sum is invariant under a permutation of its members, so every figure
  must re-derive from the cell its citation OPENS, and a part-for-part swap that leaves every total
  intact fails here and nowhere else (0117 D11) · **COLLAPSE**, inspecting the CANDIDATES rather
  than the survivors, because an identity check after deduplication reads a list the fold has
  already made consistent · **ACCOUNTING** (`figure_cells == kept + rejected` per note, so a short
  row that is refused is also COUNTED) · **VOCABULARY** (every segment metric has a line item, a
  unit, a role and an additivity, or the resolver drops it in silence) · **no whole this lane did
  not READ** · no two parts sharing one identity · **no part reaching `active_facts`**, read off
  the schema and the syntax tree · every segment citation carrying a COLUMN receipt · and what
  6d still cannot read **declared with an unblocker that expires the day it starts working**.
- **Market probe (AI, in `services/ai`): `uv run python -m app.eval.market_probe [--store]
  [--live]`** — the rung-9 instrument (ADR **0102**, audited by **0103**). Offline, no key/DB,
  **~3 s**. Its headline is NOT *"a price was fetched"* — fetching is what the connector already did
  for months while captioning a four-hour-old reading *"as of"* the moment we asked. It scores
  whether the row can **lie about time**, across eight gates, each a pure function unit-tested
  against the pre-fix shape and asserted to FAIL (`legacy_freshness` replays the old `stale`
  boolean; `legacy_clock_blind` replays this rung's OWN resolver before the clock branch;
  `legacy_to_reading` replays `currency or "INR"`): **never silently current** (a failed refresh ·
  an **undated** reading · a feed frozen mid-session · a price past the calendar's longest gap · a
  reading stamped in the **FUTURE** · no reading at all — the old model called **4 of 5** `current`,
  and the clock-blind replay calls exactly 1) · **correct is correct**, the must-not-fire half (a
  normally-delayed open feed, an evening reading of the day's close and a **Friday close read on
  Sunday** are all `current`; ordinary machine skew is not an implausible clock) · **stated, not
  derived** (a payload stating nothing yields a receipt claiming nothing — no INR, no NSE, no now;
  a **non-finite price is an ABSENT price**; a provider is named only on the two reasons that
  reached one) · **two clocks stay two** · **the LIFECYCLE** (warm cache → expiry → outage, driven
  through the real `TTLCache` on an injectable clock and then through the **FastAPI route**, for
  both the served-stale and nothing-cached states — the sequence the verify card asks a human to
  reproduce by unplugging their wifi) · **the CONSUMERS** — which is now two halves, because
  the first was a census: each COMPONENT must delegate **`display.kind`** (WHETHER a price may be
  shown) as well as `marketPriceText` / `marketReceiptSegments` / `marketFreshnessAttrs`, scoped to
  the component rather than the file (a file-wide token ban failed three real 0056 §7 confusions
  belonging to another slice); **and nine bad WIRE SHAPES** — a price with no receipt, a price
  beside an `unavailable` receipt, an absence beside a served one, NaN, negative, a green arrow
  over a fall, an inverted range, a change that is not `price − previousClose`, a price outside its
  own session range — are offered to the real `CompanyOverview` and required to be refused. A
  Python probe cannot render TSX, so it gates the wire the renderer consumes and the render
  decision is executed in vitest (ADR 0104) · **not evidence** (no `Citation`, no `--ev-*` in
  the market pattern, and **no causal price annotation** — a causal phrase and price vocabulary in
  the same rendered string) · **generality** (0066, executed). `--store` runs the REAL resolver over
  every workspace: **3 issuers / 2 sectors**, every other workspace degrading with a named reason.
  `--live` makes ONE real provider call and prints the receipt an analyst would read. **Both modes
  now FAIL as UNVERIFIED when they cannot reach their boundary** — `--live` printed PASS over a real
  `exchangeTimezoneName` error, and `--store` over a missing store (0103 D7).
- **Evidence-state probe (AI, in `services/ai`): `uv run python -m app.eval.evidence_state_probe
  [--store] [--grid]`** — the rung-7 instrument (ADR **0064**/**0094**, audited by **0095**,
  **0096**, **0097** and **0098**). Offline by default. Rung 7 has **nothing to look at** — the states get a surface at
  rungs 10-13 — so the instrument IS the deliverable, and **`--grid` prints the cells**, because a
  verify card naming witnesses the command cannot show is not performable (LESSONS §6). **Its
  headline is not "states produced":** the numbers are **absences EXPLAINED** vs **correctly
  DECLINED** vs **populated-with-a-caveat**, kept apart because folding the third into the first
  let 21 `incompatible` cells — cells full of working comparisons — count as absences the rung had
  explained. A floor of ZERO is a red flag, not a win. Gates, each a pure function unit-tested
  against the pre-fix shape and asserted to FAIL: **census** (a stale exemption fails the day it
  fires) · **co-occurrence**, which checks the MACHINERY on a constructed four-receipt cell because
  0 of 224 live cells stack and the cause is measured · **precedence must-not-fire** · **floor**,
  failing at BOTH extremes · **blind spot**, derived so it cannot go stale · **expectation**, that a
  bank duty never reaches a services exporter and an annual duty never creates a quarterly one ·
  **structural generality**, executed · **retired roles**, failing on GROWTH past 38 · and four
  added by 0096: **lead** (a reported break must be refuted by no later period — both live breaks
  were followed by the disclosure resuming, and both cells it called empty held claims) ·
  **mandate** (a required statutory ARTIFACT is not an acceptable evidence source, and an
  `unknown`/`unverified` document may not discharge a SEBI duty) · **applicability** (a
  `not_applicable` may rest on an authored default, and may never claim a ratification the store
  contradicts — all 3,696 rows carry `confirmed = FALSE`) · **orphan evidence** (a claim or fact
  whose source document no longer resolves drops out of the kind join and its cell reports an
  absence over evidence the workspace holds — the `line_items.role` failure one join along). ADR
  **0097** sharpened three of these: a duty is judged against the **filed lines it names**, not the
  analytical role that holds a dozen of them (and reports `precision="role"` where it cannot);
  **exactly one instrument per disclosure per pack**, because Indian banks are cited AS 17 / AS 18
  rather than Ind AS; and the Lane-2 blind spot is **sector-scoped and monotonic**.
  **Four things it will NOT tell you, by design.** `not_disclosed` is **unreachable**:
  `answer_question` declines *before* the provider is called, so `no_evidence` reports OUR retriever
  and can never be the record's silence (0095 §1) — the honest state is `expected_not_found`, and
  even a working check must be worded **scoped** ("a directed review of these documents found no
  disclosure"), never as a claim about the issuer. `incompatible` means comparison **stops**, not
  that one pair failed. **`disclosure breaks 0` is CORRECT**, not a dead producer: a break needs a
  duty discharged and then unmet *to the window's edge*, and every series in this corpus is still
  running at its edge. **The two-issuer WAIVER IS GONE** (0098): it fired when a third issuer
  *arrived*, so a green probe was compatible with never satisfying 0066, and its premise was false —
  ICICI was ingested and the bar is now gated at **>=3 issuers, failing while one is absent**.
  A duty is judged against the **exact disclosure** its instrument names — a filed line item (looked
  up ACROSS roles, since Ind AS 7's `cfo`/`cfi`/`cff` span two) or the note's own parsed **heading**
  — and role-level evidence yields `satisfied=None`, **unverified**, never a verdict. The grid marks
  `*` unmet and `?` unverified, because *we could not check this* and *they did not disclose it* are
  different sentences to an analyst.
- **Fact probe (AI, in `services/ai`): `uv run python -m app.eval.fact_probe [--store]`** — the
  rung-6a-ii instrument (ADR **0087**). Offline, no key/DB. **It does NOT count facts** — 6b is
  the producer and its own probe gates the count; a probe failing on zero would pressure the
  substrate rung to fabricate rows. It measures whether the substrate can hold what the record *says*, across
  six gates, each a pure function unit-tested against the pre-6a-ii shape and asserted to FAIL:
  **persistence** (two measurements on one `(line_item, period)` are both REACHABLE, not merely
  storable) · **ambiguity** (several stated readings ⇒ `ambiguous` + `alternatives`; ONE reading is
  must-not-fire, or every cell wears an amber marker) · **determinism** (the same input projected
  forwards and backwards yields the same number — the gate the ladder did not ask for, and the one
  that caught the real defect: the pre-6a-ii tie-break `rank < best[key][0]` is false on equality
  with no `ORDER BY` anywhere, so two equal-tier readings rendered **100.0 one way and 200.0 the
  other**) · **lifecycle** (nothing from a non-active run reaches the screen; `run_id IS NULL` is
  active by design — a deterministic producer has no run to stage) · **anchor** (a fact names the
  CELL; a page-only reference FAILS, and so does a coordinate with no verbatim labels, because
  `elements.id` is run-scoped and a re-parse would resolve it to a *different* cell) ·
  **generality** (0066, executed). `legacy_project` replays the pre-6a-ii body rather than
  describing it, so the 0067 receipt is taken, not quoted. **`--store`** adds what the live store
  holds and fails if `fin_facts` still exists or if `active_facts` is not a filter over
  `fact_versions`.
- **Document-frame backfill (AI, in `services/ai`): `uv run python -m app.ingestion.backfill_frames
  --workspace <ws>`** — fills the measurement frame's **document tier** on an already-ingested
  store (`db_writer` does it at ingest for anything new). **Dry run by default; `--apply` writes.**
  Reads `pages` + the parsed section headings already in the store — no parse, no provider, nothing
  downstream touched, **so no baseline expires**. Never writes over a **verified** passport (0080
  D1); prints **every planned move**, not a count; `--apply` verifies its own postconditions.
  A document declares a dimension only when every declaration it makes **AGREES** — HDFC's annual
  report carries both `CONSOLIDATED BALANCE SHEET` and `STANDALONE BALANCE SHEET`, so it declares
  neither, and the section tier resolves each figure on its own.
- **Range probe (AI, in `services/ai`): `uv run python -m app.eval.range_probe`** — the rung-3
  instrument (ADR 0066/0068). Offline, no key/DB, <2 min: scans the frozen corpus for **stated
  bands** across **4 issuers / 2 sectors** (two beyond the references) and prints, per band, what
  the pre-rung-3 single-`value` contract stored (**the low endpoint, upper bound spilled into
  `unit`**) versus the tagged `bounded_range` — the red baseline stays reproducible on demand.
  `--store` adds what the running pipeline ACTUALLY LANDED per workspace (capability declared is
  not outcome delivered — eval rule 3); a pre-rung-3 store necessarily reports 0 bands.
- **Responsiveness probe (AI, in `services/ai`): `uv run python -m app.eval.responsiveness_probe
  [--pdf PATH …] [--legacy-thread]`** — ADR 0135's instrument (GOTCHAS #19). Runs the PRODUCTION
  parse (`pipeline.parse_and_chunk_isolated`) on real annual reports — ICICI Bank + TCS + a TWIN
  read of ICICI, all at once by default — while timing, every 0.5 s, the real app's `/healthz`
  (in-loop, via ASGI) and a syscall-heavy sibling thread (the source scan the old `/healthz` did
  per request). Gates: both under **1 s** throughout (the page calls the service hung past 8 s),
  and the twin readings **identical** (0135 D5). `--legacy-thread` replays the pre-0135
  `asyncio.to_thread` parse and **must FAIL** sibling + determinism. No store, no key; ~2 min.
  Exit 2 = a PDF is missing (UNVERIFIED). Run it after adding any CPU-heavy work to the service.
- **Scope probe (AI, in `services/ai`): `uv run python -m app.eval.scope_probe [--workspace <id>]...`**
  — rung 17a's instrument (ADR **0148** D1–D4), over HDFC Bank · Infosys · TCS by default. **G1**:
  a source switched off through `PATCH /scope` is what a FRESH client `GET`s (a reload, a second
  tab, the next surface), and the analyst's own scope is restored exactly. Structurally, no web
  surface reads the scope from browser memory, and no handoff carries it as `?off=`. **G2**: every
  Canvas, workbook and document door REQUIRES `workspaceId` (read off the OpenAPI spec);
  `POST /canvases/open` lands in the workspace named; the most recently UPDATED of two canvases
  opens; an empty workspace gets exactly one blank canvas. **G3**: through the production run
  (`run_node_events`), a stand-in model that cites nothing writes NO artifact and ends `declined`,
  while a citing one lands, cited to the wired source. Replays that must FAIL: a per-tab memory
  scope, oldest-first opening, the padding safety net. Needs the store (exit 2 = UNVERIFIED);
  no key; ~10 s. Probe canvases are deleted before it exits.
- **Canvas work probe (AI, in `services/ai`): `uv run python -m app.eval.canvas_work_probe
  [--workspace <id>]...`** — rung 17b's instrument (ADR **0150**, **0148** D5). **G1**: `/models`
  is the catalogue's picker in its order (6-luna first and default, 6.1-sol second, astra off), and
  registry · prices · the effort a provider enforces · `/models` all say what `models.toml` says;
  then THE EDIT — a copy with a model added, one moved, one taken off the picker, read by a fresh
  process (`N4A_MODEL_CATALOGUE`) — comes back exactly; a bad pin is refused; no model id is code in
  `chat.py`/`pricing.py` or the web app. **G2** (HDFC · Infosys · TCS): a node's effort reaches the
  provider, a refused effort or an off-picker model is refused with a sentence, the receipt records
  the effort SENT, a changed effort moves the hash, a no-dial model's hash is unchanged. **G3**
  (probe workspace, the RECORDED live answers): a Graph chat moved to Canvas lands on the most
  recently updated canvas, keeps every turn (answers as cited `graph_answer` artifacts equal to the
  Graph's, the decline unwritten), moving again finds the same node, the history survives the Graph
  evicting the chat, a follow-up sends the earlier questions + the carried scope, and a memo wired
  from it reads the answer, cited. **G4–G6** (17b-r, ADRs **0151**/**0152**, in
  `app/eval/canvas_work_gates.py`): **G4** every canvas AI operation is metered — an answer and a
  decline each one row with the provider's counts and the price table's cost, a table run through
  the usage door, an unpriced model `null`, a stream's own usage exact and a silent stream
  tiktoken-`estimated`; **G5** an Ask leads with checked sentences — a typed digit, an unknown cite,
  a reading with no falsifier, a filed sentence on an account and a verdict over contested
  explanations are each withheld, a reviewer outage shows none, a decline carries no lead, a memo
  reads the lead with figures written out; **G6** ask → ai and ai → ai validate (a cycle does
  not), a chained run cites only its upstream's L0 passages and records the upstream in its
  receipt, the hash moves with the upstream, an unrun upstream refuses the run; an Ask answer
  whose evidence lives in ANOTHER workspace grounds nothing (must-fire, 0153). Replays that must
  FAIL: the prefix effort table, the effort-blind hash, a node pointing at the chat, the unmetered
  stream, the answer as composed before 0151, the context-only scope. Needs the store (exit 2 =
  UNVERIFIED); no key; ~15 s. Probe canvases and chats are deleted before it exits.
- **Canvas files probe (AI, in `services/ai`): `uv run python -m app.eval.canvas_files_probe
  [--workspace <id>]...`** — rung 17c's instrument (ADR **0149**), over HDFC · Infosys · TCS, each
  with the first pages of its OWN company's real filing and a PEER's (`CASES`), dropped together
  through `POST /canvas-files`. **G1** read where wired, speaks nowhere: two canvases' steps cite the
  file; the Library inventory and `/brief/head` are byte-identical to before the drop; no attention
  lead, Timeline, Graph, review inbox or story names it; `PATCH /scope` refuses it; no derived row
  names it; a whole-workspace step never reads it; it IS listed as a canvas file (origin +
  placements) and both citations open; structurally, `documents` is the view with its CHECK OPTION
  and `all_documents` is named only on `BASE_TABLE_READERS`. **G2** through *Add to Library* (in
  `ws-probe-17c-*`, purged after — a join runs door 4, Lane 2 and the sweep): same id, same chunk
  fingerprint, both citations still open; in the REAL workspace a peer's filing is refused (409, a
  sentence naming both companies) and left a canvas file. **G3** arrival and removal: same bytes →
  one row (`already_a_canvas_file`); a Library document's bytes → `already_in_library`; an
  unreadable file refused with a reason; the filed-figures hint exactly on the company's own file
  with a table; a step over a file still being read → 422 *Waiting for 1 source*; the manifest names
  both citers; delete takes the Sources off both canvases, moves their revs, keeps the artifacts.
  Replays that must FAIL: a reader on the base table, a join that copies to a new id (ADR option C),
  a door minting a row per drop. **G4** the lifecycle holds (ADR **0153**, `canvas_files_gates.py`,
  in its own `ws-probe-17c-life-*`): a file deleted WHILE it is read stays deleted at both doors (a
  real race — red, never skipped, if the read wins it); a keyless canvas read joins without a fake
  `embed: done`; a wired file is read under Workspace scope; a step chained on an answer whose
  source was deleted does not cite it. On the pre-fix tree G4 fails 5/5. Needs the store (exit 2 =
  UNVERIFIED); no key (hash embedder, stand-in model); ~90 s (each parse spawns a process, ADR
  0135). Leaves the store as found.
- **Prototype instrument (repo root): `node scripts/verify-prototype.mjs`** — boots
  `N4A-Prototype.html` against a minimal DOM shim (which now models **timers** too, since staging
  spreads over them) and asserts what a screenshot cannot: the platform layer's coverage numbers are
  **derived** from the documents · every graph object is attributed to the document that is its
  **first evidence** · **nothing ingests before the analyst asks** · the reveal follows real pipeline
  order (sources → structure → claims) · the forming simulation **anneals and stops** · the
  background job's **card is the dialog** · a notice is **dismissible and never overstays** · the
  **one typed delete gate** takes the exact resource name · **light is the default** · **three**
  issuers across three sectors behave identically through one code path. **261 assertions**, no
  deps, no network, <2 s. It has caught **four** live defects — `GEDGES` normalised to objects but
  indexed as arrays (**0 of 47 edges landed** while the panel still looked right) · a frame function
  that would have advanced a *staged* batch · the console job card **never created, only updated**
  (invisible until something else re-rendered) · and a default-appearance gate that **could never
  fire** (0075). Run it after ANY edit to the prototype's data shapes.
- **All Python commands run via `uv run`** (the deps live in the uv-managed venv, not system `python`) —
  this includes every command on a **"Verify this slice" card**. Bare `python -m app.…` fails with
  `ModuleNotFoundError`; always write `uv run python -m app.…` (learned ss5a).
- **Environment / toolchain / runtime traps live in `docs/GOTCHAS.md`** — read it before debugging a
  build or runtime oddity. It covers: extensionless TS imports (`transpilePackages`), pnpm 10
  `onlyBuiltDependencies`, Prettier vs. authored Markdown, ruff's 100-col reach into
  comments/docstrings/prompt-literals, the **Windows `python -m app` event-loop trap** (bare `uvicorn`
  kills the async ingest pool), the pytest `--basetemp` fix, and `ensure_schema` vs. `apply_schema` during
  ingest polling. Each cost real debugging time and is invisible to a green test suite.

