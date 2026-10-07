# N4A — Progress Log

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

> **status:** live · **authoritative for:** the recent slice log, newest first — **Block L onward**
> (rungs 12 → 17, Library v2) · **last verified:** 2026-10-05. Older eras: `archive/` (reference outside this repository: `archive/`).

> **Recent** append-only log, newest on top. For where-we-are-now + the next action read
> `docs/SESSION.md` (the single live briefing); for the decisions themselves, `docs/decisions/`.
> This file is the narrative history of recent slices; older Stage-1 entries are archived (bottom
> of this file). Updated after every slice by the `n4a-progress` skill.

## Track status

| Track | Status | Notes |
|---|---|---|
| A · Frontend | **Rung 17 (ADR 0148–0153), signed off 2026-10-05:** Canvas reads the ONE saved scope (`saved-scope.ts`, a quiet mark, never a filter), follows its workspace, starts blank; a model + effort picker; an `ask` node (*Continue on Canvas*); AI ← AI/Ask chaining with a usage meter; sections select and delete through one dialog; page-1 source preview; trackpad pan/pinch; canvas files (`app/canvas-files/`, board drop, a collapsed Library section); a board epoch guards every async result · **Rung 14 (ADR 0145–0146), signed off 2026-10-01:** `story-module.tsx` draws *How this business works* after key figures from `story-frame.ts` — a briefing grid (lede, question blocks, the current chapter beside it), the whole statement as the target with its trail inline, a Filed · Attributed · N4A's reading lens, a qualified figure's rose mark, prose figures through `formatProse`; `brief-story` joins `CORPUS_QUERY_KEYS`; laid out at two widths (`scripts/verify-story-layout.mjs`). · **Rung 16 + Graph redesign + Library v2 (ADR 0137–0144), signed off 2026-09-30:** a 48 px top navbar replaces the left rail (0139); `/graph` is a still SVG community map (`graph-layout.ts`, no force engine) with Details and Ask panes, a relationship table, server-kept chats and an Ask answer read off the question (0140); `/library` is brief v2 — price beside the name, key figures, Quarterly/Annual series, signals and an expanded Timeline (0143). · **PHASE 2 rung 15 — the Graph workspace (ADR 0136), signed off 2026-09-26:** node size is the VISIBLE degree (legend: *connections shown here, not importance*), four edge families on evidence tokens, a glyph per type, no particles; a **Details | Ask** rail with typed node detail; an origin bar; *Trace in graph* on a lead and *Show in graph* on a series row land ON the object with the brief's scope and route back. · **New-company slice (ADR 0131–0135), signed off 2026-09-25:** one *New company* card (drawer + brief head) only for a filer door 4 could not decide; an inferred business model is a one-line *"inferred from its filings · Change"*; rows say *Confirm company*, never *Partial*, for what waits on it; a stale-service restart banner off `/healthz` `codeStale`; a call-stated series point is labelled. · **PHASE 2 rung 13 — the *Timeline* landmark (ADR 0126–0128), signed off 2026-09-24:** `timeline-module.tsx` draws the brief's Timeline from `timeline-frame.ts` — three temporal objects told apart without colour (a **pin**: a dot for a day, a whisker for a month; a counted **checkpoint** square; a dashed hollow **span** on its own row), lanes that are the record then ADR 0059's landmark groups, every record in exactly one place (drawn · attached · listed with its reason · counted as a restatement), the caption *"Sequence, not causation"*, and a DAILY price lane under its series receipt coupled to nothing but the x axis. A gap routes to its lead in module 3; a mark opens its citation and returns. Rendered in vitest, laid out at 1,280/400 px with three journeys (`scripts/verify-timeline-layout.mjs`). | **2026-09-23 (rung 12):** **PHASE 2 rung 12 — *What deserves attention* (ADR 0122, audited by 0123–0125), signed off 2026-09-23:** `attention-module.tsx` draws the brief's third module from `attention-frame.ts` — at most four leads ordered by the RECENCY of their evidence, never a severity ranking, each with its dual receipt and a verb; a detail of five blocks and a factor table; then observations, what was withheld counted per reason, and whether absences were judged. `review-inbox.tsx` is the ONE inbox (owed · optional · the unfiled aggregate) and `review-decision.tsx` records a judgment that echoes the evidence SHOWN, so the form is not offered over a view that did not draw the whole lead. `findings-panel.tsx` is deleted. Rendered in vitest, laid out at 1,280/400 px (`scripts/verify-attention-layout.mjs`). **2026-09-22 (rung 11b):** **PHASE 2 rung 11b — *Business structure* (ADR 0120, audited by 0121), signed off 2026-09-22:** `structure-module.tsx` draws each part's share of the total the segment note PRINTED (a business table of independent tracks; a geography stacked bar) beside the gap row, the note's own YoY and a chip for every figure; every decision is `structure-frame.ts`'s and every sentence the contract's. The basis is named whole through the shared `frame-words.ts`, why a delta is a dash is visible text, and a clamped mark says only what it observes. Rendered in vitest, laid out at 1,280/400 px (`scripts/verify-structure-layout.mjs` on the shared `scripts/lib/layout-harness.mjs`). **2026-09-17 (rung 11a):** **PHASE 2 rung 11a — *What changed*, the metric series (ADR 0112–0115), signed off 2026-09-17:** `series-module.tsx` draws one line per metric from `series-frame.ts`'s geometry — strokes only for `continuous` spans; a gap or a break is a labelled vertical rule, a restated point a red double ring (`--ev-gap`), the latest figure is text. The source history expands in place: fixed-layout table, local scroll on a phone, and the shared citation chip can finally truncate (`min-w-0`). The COMPONENT is rendered in vitest (`vitest.config.ts`, automatic JSX) and laid out in a real browser at 1,280/400 px (`scripts/verify-series-layout.mjs`). Tokens-only; `brief-series` joins `CORPUS_QUERY_KEYS`. **2026-09-12 (rungs 10a + 10b):** PHASE 2 rungs 10a + 10b — the coverage brief and the evidence viewer (ADR 0105–0111), signed off 2026-09-12:** `/library` is the **brief** (head · frame · market row PLACED · four **declared** landmarks · findings · sources drawer) and `/graph` is scope · graph · Ask; `library-workspace.tsx` is **deleted**, closing F14. **ONE evidence viewer**, mounted once in the root layout, replacing two disagreeing chips — every citation an analyst can see now OPENS onto its own evidence, a Lane-2 one landing on its **cell**, with a metadata rail and an exact return (scroll restored BEFORE focus). ONE Escape stack and ONE focus trap for the whole app (`app/components/`). Tokens-only; `verify-design-system.mjs` **103** assertions. **2026-07-24 (Library 1G, ADR 0054):** `graph-canvas.tsx`/`graph-utils.ts` — `EDGE_STYLES`/force-layout maps gained the universal-vocabulary edge types; `atoms` (mentions·voices·docs·authority) replaced the scalar trust weight as the analyst-facing edge basis (D63). Tokens-only. **2026-07-22 (Library 1F-4, ADR 0053):** `library-workspace.tsx` — the **Signals rail** fed by `fetchLibrarySignals` (`api.ts`), invalidated when ingestion settles / a document is deleted / a passport changes; the passport editor split into separate **Publisher** and **Covered company** fields (publisher-owned for `news`/`analyst_reports`), requiring one covered-company anchor before a secondary source extracts; a `blocked_missing_details` row shows "Covered company needed" and auto-repairs the layer on save. `types.ts`/`passport.ts` gained the `roles` array (publisher/covered, `confirmed`/`entityId`). Tokens-only (no one-off hex); both cited sides shown, no winner. **2026-07-18 (Library 1C, ADR 0045):** `library-workspace.tsx` — the honest status vocabulary rendered (`Partial` pill for `ready_partial`; per-stage badges with the visible `detail` reason); per-layer **retry** menu actions via `api.ts`'s `retryDocumentLayer` (one safe action per row — the most-upstream degraded layer); `ready_partial` rows stay searchable/selectable (their L2 landed — the badge says which capability is missing). **2026-07-16 (Library 1B + same-day hardening, ADR 0043/0044, D24/D25/D27):** `library-workspace.tsx` — typed section groups in analyst reading order, files-first per-file filing dialog + drag-drop, ONE authority mark per row (tier=color, kind=label), passport chips + editor; hardening added the quiet faint "Confirm details" state for `section_asserted` (amber "Confirm" stays for `needs_confirmation`) and extracted the PATCH-body logic to `passport.ts` (three-valued: emptied field → explicit null clears; unit-tested in `passport.test.ts`). ADR 0044 design language: serif dialog/empty-state headlines, authority dot, `--ease-mech` motion. **C8 craft pass (2026-07-11, ADR 0040/0041):** one focus-overlay mechanism for every node type (`focus-overlay.tsx`/`focus-document.tsx`/`focus-excel.tsx`/`focus-views.tsx` — same stores/autosave as the card, no forked state) with a layered Esc stack (`escape-stack.ts`); the citation display grammar (`citations.tsx` — inline `[n]` markers clickable, `cited · N` collapse pill, loud `UncitedChip`); Excel direct-edit **sessions** (`edit-session.ts` — stage locally, Done posts one version); background **sections** + alignment **snap guides** (`sections.ts`/`section-node.tsx`/`snap.ts` — computed membership, no persisted geometry); interaction craft (multi-select marquee, one top toolbar, collapsible minimap, inline rename, scope popover, resizable panels, text de-verbosing); `inspector.tsx` slimmed ~789 lines to params+wiring (focus views absorbed the assistant/versions panels). **C7/C7b (2026-07-10, same day):** `document-node.tsx` (new) — the Document node card: labeled brief field, AI-fillable titles, a first-use "How this works" hint, per-section Draft/Re-draft/✦-Update-facts actions gated by `origin`, a per-section staleness chip derived from `consumed`, a **Versions** panel (artifact history + one-click restore), `.docx`/`.md` export buttons and a drag-drop **import** (replace) lane; `markdown.tsx` (new) — dependency-free, XSS-safe (React-elements-only, no `innerHTML`) read-view renderer for the exported markdown subset (bold/italic/code/lists/tables/`[n]` refs), ✎ toggles the raw textarea edit (flips `origin="user"`); `document.ts` (new) — section CRUD helpers, the client-side merge (`changedSectionIds` bodies only; `addedSectionIds` may introduce new ids, an unknown changed id stays dropped — no resurrection of a mid-turn analyst delete), staleness derivation from `consumed` vs. producer artifact freshness, `[C#]`↔`[n]` marker bookkeeping; `types.ts`'s `report` node type renamed `document` (`DocumentParams`, `DOCUMENT_NODE_WIDTH`, `CREATABLE_TYPES`); `api.ts` gained `documentDocxUrl`/`importDocumentFile` and `runNodeStream` takes a `sectionId`. **C4–C6 (2026-07-10):** `data-nodes.tsx` (table node — mono numerals, sort, per-cell citation popovers, `data` edges + staleness chip + mid-edge splice), `edges.tsx`, chart node (deterministic Recharts projection, C5), `excel-node.tsx` + `canvas/excel/` support (windowed grid, sheet tabs, version chain, assistant panel — C6), `assistant-store.ts`/`upstream.ts`/`inputs-hash.ts`/`a1.ts` + colocated tests. `apps/web/app/canvas/` (new, Stage 3) — controlled React Flow + Zustand (`canvas-store.ts`), tokenized dot-grid/minimap/ports/edge languages (`globals.css`), node chrome for `source`/`sticky`/`ai`/`table`/`chart`/`excel`/`report` types (`nodes.tsx`), drag-to-connect + drop-on-pane picker (`node-picker.tsx`), inspector + context toolbar (`inspector.tsx`), debounced whole-graph autosave with a `rev` conflict guard (`api.ts`/`canvas-store.ts`), "Add from Library" source palette (C2), and a live SSE-streamed AI-node run with citation chips + artifact history (`run-store.ts`, C3). `apps/web/app/routes.ts` gained `/canvas`; `app-sidebar.tsx` wired its nav entry. `apps/web/app/library/` — sources panel, orbital + organic graph canvas, Ask N4A rail, Signals placeholder. **H1/H2:** see prior entries (toggle honesty, SSE-driven upload, IngestionStrip). **ADR 0028 (2026-07-03):** `geography` is its own `CATEGORY_STYLES` entry + `ALL_CATEGORIES` filter chip. **ADR 0029 + session-2 (2026-07-03):** `graph-canvas.tsx` — three-zone `forceRadial`/`forceX`/`forceY` orbital layout, moon link tuning, greedy label de-overlap, bloom seeding, a same-category hover-dim tier, unified double-tap (recenter any node + toggle a theme's bloom); `graph-utils.ts` — `layoutGroup`/`primaryCompanyIds` (structural-hub-only classifier) /absolute degree→radius bands/`buildOrbitalGraph`; `library-store.ts` — multi-theme expand/reveal state with per-theme collapse clearing card-revealed positions; `library-workspace.tsx` — header reflows under open side panels instead of crushing the title. `types.ts` gained `fillAlpha` (confidence→interior-opacity). **2026-07-05:** `library-workspace.tsx`'s status pill now derives its human word (Reading/Indexing/Extracting/Connecting) from the running `IngestionStage` instead of a static per-status label (`STAGE_PHASE`/`STATUS_PHASE`), and hides once a doc reaches `ready`; `INGESTION_STAGES` renamed `graph`→`harvest`. **2026-07-06:** `apps/web/app/dashboard/` (new) — company shell (search → overview → owned Recharts price chart → RSS news board) + statement tables + a "Ratios & growth" tab (S3), all tokens-only; `app/components/app-sidebar.tsx` extracted from `library-workspace.tsx` to host cross-surface nav (Library/Dashboard). **2026-07-07:** `app/routes.ts` (new) — `/library` and `/dashboard` are real routes, `/` redirects to `LANDING_ROUTE`; `app/library/chat-store.ts` (new) — Zustand+`persist` multi-chat store (new/select/delete chat, 20-chat/80-message caps) wired into Ask-N4A, with a `history` array sent per ask for follow-up resolution; `graph-canvas.tsx`/`library-workspace.tsx` — the hover-tooltip and click-inspector merged into one `NodeCard` (peek on hover → expand on click, animated). |
| B · Backend/API | **Rung 17 (ADR 0148–0153), 2026-10-05:** `PATCH/GET /scope`, `POST /canvases/open`, `/canvases/ask-moves`, `/canvases/{id}/usage`, `/documents/{id}/preview`, `/canvas-files` (+ manifest · add-to-library); every canvas/workbook/document door requires `workspaceId`; `documents` is a VIEW over `all_documents`; `read_ticket` fences a read to its row; `app/processes.py` owns every child process · **Rung 14 (ADR 0145–0147), 2026-10-01:** `GET /brief/story` + `POST /brief/story/rewrite` → `StoryResponse` (`packages/contracts/src/story.ts` + Pydantic; no verdict field; status `ready · writing · partial · thin · unavailable`); `story_versions` / `story_index` tables; `create_pool` refuses a pool below `2 × cap + 2`. · **2026-09-30 (ADR 0137–0144):** `POST /graph/ask` → `GraphAnswer` (`graph-ask.ts` + Pydantic, no free-text field; `previousQuestions`, `restatements`, `nothing_read`); ask-thread routes; `GraphResponse.coveredNodeId`; `/brief/series?grain=`; `AttentionResponse.signals`; `PendingCompaniesResponse.unnamed`; brief doors read the source toggles. · **Rung 15 (ADR 0136), 2026-09-26:** `GET /graph?seed=<ObjectRef>&origin=` resolves a handoff at render time (a 200 with a reason when it cannot); every `GraphEdge` carries ≥1 citation; `GraphNode.detail`, `GapCause.unexplained`, `EdgeType.reports`. · **New-company slice (ADR 0131–0135), signed off 2026-09-25:** `GET /companies/pending` + `POST /companies/confirm` (`packages/contracts/src/company.ts` + Pydantic), `HealthResponse.codeStale`, `StatementReading.origin` (`filed`/`stated`); `entities.sector_source`; `app.workspace.cli` purge. · **PHASE 2 rung 13 — `GET /brief/timeline` + `GET /market/history` (ADR 0126–0128), and door 3 (ADR 0130), signed off 2026-09-24:** `packages/contracts/src/{timeline,day}.ts` and their Pydantic mirror; `workspaceId` has no default. An event carries `TimelineWhen.clause` and `TimelineItem.action`, both-or-neither with `when`; `asOf` is checked by both contracts; `TimelineUnplacedReason` gains `bounded` (bounded ⇔ ≥1 candidate, ambiguous ⇔ ≥2). `MarketBarInterval` narrows to `1d`. Saving a primary document's passport mints its unknown filer as a governed company (`filer_verified`, no default), and a retry heals a document verified before that. | **2026-09-23 (rung 12):** **PHASE 2 rung 12 — `GET /brief/attention`, `GET /review/inbox`, `POST /review/decisions` (ADR 0122–0125), signed off 2026-09-23:** `packages/contracts/src/attention.ts` and its Pydantic mirror carry leads, receipts and the two-number badge; `workspaceId` has no default. A decision is append-only in `finding_review_versions` and both arms carry **`observedEvidence`** — the digest of what the analyst was shown — refused **409** over evidence that is not what was drawn, a no-op, an observation, or cells the ledger cannot certify. The write boundary takes its OWN covering measurement rather than quoting the store's, and `comparison_digest` is ordered the way the identity is. A mixed-issuer workspace is not refused: `absences.status` says why none were judged. **2026-09-22 (rung 11b):** **PHASE 2 rung 11b — `GET /brief/structure` (ADR 0120/0121), signed off 2026-09-22:** `StructureResponse` on both stacks re-derives every share, gap and growth rate and, since 0121, the rounding allowance (`reconciliation_allowance`: each figure's own printed step, summed, whole included); a listed disclosure's reason is the first that holds; a mixed-issuer workspace is a 200 carrying a reason. **2026-09-21 (rung 6d):** **PHASE 2 rung 6d — the segment cell's ADDRESS and its RECEIPTS (ADR 0116–0119), signed off 2026-09-21:** `CellRef` gained `colHeader`'s sibling `reading` — what the document's SURROUNDINGS made of the cell (measure, period, part, unit) — mirrored in `packages/contracts/src/object-ref.ts` and `app/contracts/models.py` in the same change. It is a RECEIPT, not an address, so `sameRef` ignores it and a `--rebuild` cannot orphan a capture bound to that cell. Tri-state like `colHeader`: `null` is *not recorded* and is folded into neither neighbour. The evidence viewer's verdict now re-runs the segment reader over the element it is about to draw rather than comparing recorded text. **PHASE 2 rung 11a (ADR 0112–0115), signed off 2026-09-17:** `packages/contracts/src/series.ts` + its Pydantic mirror. `SeriesPoint` is a discriminated union whose `gap` arm carries no reading; `MetricSeries.links` holds one span per ADJACENT pair, and its kind is a FUNCTION of its endpoints on both stacks; `SeriesBreak` (with `witness`), `SparseMetric`, `OffAxisMetric.spans`; the silence rule (`statedTreatment`/`treatmentDifference`) is DERIVED from each treatment's vocabulary and exported on both stacks. `GET /brief/series` refuses a mixed-issuer workspace as a 200 with a reason; only an unreachable store is a 503. **2026-09-12 (rung 10b, ADR 0109–0111):** `Citation.anchor` lands contract-first on both stacks and **`cell` joins the `ObjectRef` union**, carrying the whole anchor (row label · column label · value text · column header). Two doors: `GET /brief/head` (a mixed-issuer workspace is a **200** carrying `ambiguous_issuer`, never a 503) and `POST /evidence/passage` (a ref that no longer resolves is a **200** carrying `missing`/`changed` with its reason). `PassageResponse.highlight` states what a mark RESTS ON — present-iff a mark exists, and refused unless the response SHOWS the grid holding the cited value. **2026-07-24 (Library 1G, ADR 0054):** contract-first in one change — `EntityType += regulator`; `EdgeType`/`RelationType += offers`/`regulated_by` (harvested `subsidiary` reuses `parent_of`; `partner`→curated `partners`); the computed `EvidenceLabel` (`reported`/`explicit`/`co-mentioned`) + `EdgeAtoms` (D63, `atoms: EdgeAtoms.nullish()`) on `ConnectionEdge`; five DB CHECK migrations verified live + `relation_mentions.evidence_label` column; `relation_versions.weight` DROPPED (atoms replace the scalar). Zod↔Pydantic↔schema.sql + web styles in the same diff; contract tests green. **2026-07-22 (Library 1F-2/1F-4, ADR 0053):** contract-first across Zod → Pydantic/OpenAPI → Postgres in one change. `packages/contracts`: typed `document_roles` (filing/publisher/covered) join the overloaded `issuer` scalar; `Claim.attribution` (voice·speaker·role·quoted·origin/publisher lineage) + the 1E frame facets (objectKind·basis·comparator·scenario·qualifiers); `Signal`/comparison shapes; `StageStatus` gained `blocked_missing_details`. `schema.sql` (+300): `document_roles`, claim/relation attribution + facet columns, the comparison projection. New `routers/claims.py` — `GET /claims/comparisons` (factored result, both sides, authority, citations) + append-only correction `POST`s; `routers/signals.py` now **live** (was 501), `not_comparable`-aware. 40 contract tests green. **2026-07-18 (Library 1C, ADR 0045):** `IngestionStatus` reworked to the honest derived vocabulary (`processing/ready/ready_partial/error` — zod ↔ Pydantic, status is a pure function of layer states) + new `StageStatus` enum (`not_run·running·done·done_zero·skipped_no_provider·failed·stale` + `detail`, `blocked_ocr`/`needs_review` defined for 1D/1E); `RetryLayer` + **`POST /documents/{id}/retry`** (202; per the retry-dependency map); claim ids now bare UUIDs under the TS contract (the `claim-…` mismatch fixed). `schema.sql`: `extraction_runs`/`resolution_runs` (partial-unique one-active index + active-state CHECKs), `claim_mentions`/`relation_mentions` (kept/rejected + reason CHECK), `claim_versions`/`relation_versions` (provenance ≥ 1 CHECKs), `spine_snapshots` (content-addressed), `resolve_verdict_memo`, **`active_claims`/`active_relations` views** — the only consumer surface. **2026-07-16 (Library 1B + same-day hardening, ADR 0043, D27–D29):** `SourceSection`/`DocumentKind`/`SourceClass`/`MetadataConfidence` vocab + passport fields on `Document`; `MetadataConfidence` gained D27's `section_asserted` middle state; `PassportUpdate` is **three-valued** (`issuerName`/`publishedAt` `.nullish()` — omitted=keep · value=assert · null=CLEAR; router reads `model_fields_set`); `duplicatesOf` on the batch 202; `PATCH /documents/{id}/passport` re-stamps claim tiers in-transaction (D21). `schema.sql`: passport vocabulary CHECKs, composite `documents(workspace_id, issuer_entity_id)→entities` FK + `derived_from_doc_id` FK, **unique partial (workspace_id, artifact_sha256) index** (supersedes the non-unique lookup), new `acquisitions` table (one artifact, many acquisition records; dedup atomically behind a per-(ws, sha) advisory lock — D29). **2026-07-11 (Canvas C8, ADR 0040/0041):** `SectionColor` enum + `section` node type (zod + Pydantic + `schema.sql` `CHECK` widened in BOTH the `CREATE` and the drop/re-add `ALTER` block — GOTCHAS #10); `WorkbookCellEdit`/`WorkbookEditRequest` (direct cell edits, `edits` cap 100), `DocumentPage`/`DocumentPagesResponse` (source viewer text layer), `prompt` on `ArtifactScope`/`ArtifactSummary` (which question produced a history entry), `ManualNote.kind="document"` (a document node wired in as manual context) — all mirrored zod↔Pydantic with contract tests. New endpoints: `POST /workbooks/{id}/cells` (one user-authored version via the assistant's ops path), `GET /documents/{id}/file` (raw L0 bytes, inline) + `GET /documents/{id}/pages` (parsed, locator-anchored text layer). **2026-07-10 (Canvas C7/C7b, ADR 0036/0038):** `CanvasNodeType`/`ArtifactKind` `report` → `document` renamed before any row ever carried it (zod + Pydantic + DB `CHECK`s, idempotent migration in `schema.sql`); `DocumentSection` (`{id, title, instruction, content, citations, consumed, origin}`, 120k-char param cap) and `DocumentPayload` (`sections`, `changedSectionIds`, `note`, plus C7b's `addedSectionIds`/`deletedSectionIds`/`title`) mirrored zod↔Pydantic with contract tests; `artifacts_ai_kinds_need_citations` widened again — `document` joins `chart_spec`/`changeset` in the exemption (mixed-authorship snapshot; invariant #1 enforced per-section instead); `ArtifactSummary` gained `note` (feeds the new Versions panel). New endpoints: `POST …/nodes/{id}/run` accepts `sectionId`; `GET …/nodes/{id}/document.docx` (builds from the persisted outline) and `POST …/nodes/{id}/document/import` (`.docx`/`.md`, full-replacement artifact, `model_id="import"`). **2026-07-10 (Canvas C4–C6, ADR 0035):** `packages/contracts/src/canvas.ts` extended — `TablePayload`/`TableColumn`/`TableCell` (per-cell citations), chart mapping, `ManualNote`, and the workbook shapes (`WorkbookMeta`/`WorkbookWindow`/`WorkbookCell`/`WorkbookCreateRequest`/`WorkbookRevertRequest`/`WorkbookVersionsResponse`), all mirrored in `services/ai/app/contracts/models.py` with contract tests; `WorkbookCell.b` is `.nullish()` (GOTCHAS #4c). `db/schema.sql` gained `workbooks`/`workbook_versions`; the `artifacts_ai_kinds_need_citations` CHECK widened so `changeset` joins `chart_spec` in the exemption. `app/main.py` mounts `routers/canvas.py` (run/graph/artifacts) + `routers/workbooks.py`. `packages/contracts` (zod): `NodeCategory` now includes `position`/`segment`/`geography`/`entity`; `NodeTrust` added; `EdgeType` includes `cites`/`has_theme`/`discusses`/`serves`/`operates_in`/`has_segment`; `.nullish()` fixes for Pydantic null compat; all routes live: `/graph` · `/ask` · `/documents` · `/healthz` · `/dashboard/*`; `/signals` still 501. **H2:** `DocumentBatchAccepted` + `DocumentProgressEvent`. **2026-07-03:** `GraphNode.confidence` (float, `[0,1]`, nullish) — the third trust axis, mirrored zod↔Pydantic with contract tests. **2026-07-05:** `IngestionStageName`'s `graph` renamed `harvest` (zod + Pydantic, same diff) — the real final LLM pass, not the no-op graph-assembly placeholder it replaced. **2026-07-06 (ADR 0033):** `packages/contracts/src/dashboard.ts` (new) — `InstrumentHit`, `CompanyOverview`/`LiveQuote`, `PriceSeriesResponse`, `StatementTable`/`Row`/`Cell`, `CompanyNewsResponse`, `Derivation`/`DerivationInput` (S3); `AuthorityTier` gained `vendor_data`/`computed` (zod + Pydantic + both DB CHECK constraints); `schema.sql` gained `instruments`/`line_items`/`fin_facts`/`filings` (a `fin_facts` sibling table to `claims`, not a second store — invariant #8). **2026-07-07:** `AskTurn`/`AskRequest.history` (chat memory, zod `dto.ts` ↔ Pydantic) — assistant content only, citations excluded, server bounds how much reaches the model; `KbStatus`/`KbAddResult` (zod `dashboard.ts` ↔ Pydantic, `CompanyOverview.kb: KbStatus \| null`) — the KB-opt-in rework's read/write split; `schema.sql` gained `vendor_snapshots` (per-symbol L0 registry under a company's own vendor document). **2026-07-07 (Canvas C1–C3, ADR 0034):** `packages/contracts/src/canvas.ts` (new) — `CanvasNode`/`CanvasEdge`/`CanvasDetail`, `Artifact` (`kind` discriminated payloads, DB `CHECK` mirrors the zod refinement that non-`chart_spec` kinds need ≥1 citation), `RunEvent` SSE frames; `dto.ts`'s `AskRequest.scope` gained `manualNotes` (Canvas sticky → `manual`-sourceType citation). |
| C · AI/ML | **Rung 17 (ADR 0148–0153), 2026-10-05:** one model catalogue (`llm/models.toml`, `gpt-6.1-sol` on the ladder); `GraphAnswer.lead` — checked answer sentences; carried evidence re-read from the store; provider-reported usage metering; an uncited answer is declined · **Rung 14 (ADR 0145–0147), 2026-10-01:** `app/brief/story/{gather,dossier,write,enforce,review,keep}.py` — a numbered dossier, one writer call, a pure enforcer over ONE rule module (`story_rules.py`, `text_cues.py`), a per-statement independent reviewer (luna@low), a coherence pass; `document_slot` + `stopped_stage_changes` in the ingest orchestrator (0147). Instrument: `story_probe [--store --live]`. · **2026-09-30 (ADR 0137–0144):** `app/graph/ask.py` (one `QuestionFrame`, filed readings, grounded labels); `app/brief/signals.py`; `app/company/siblings.py` (a brand-only document binds only from a filer position); the segment lane reads merged headings, `J` and captions (0142). Instrument: `graph_ask_probe`. · **Rung 15 (ADR 0136), 2026-09-26:** metric nodes are the brief's series under the Graph's scope (`series_over`, brief byte-identical); derived edges cite one passage per document; uncited edges 462/444/47 → 0. · **New-company slice (ADR 0131–0135), signed off 2026-09-25:** door 4 (a listed filer decided at identify, business model inferred) · the re-derive cascade · the verifier can answer · a transcript's reporting period · merged-cell segment headers · bank ratio/Form B vocabulary · a shared 429 pace · parse in its own process · the GPT-6 ladder (0133). · **PHASE 2 rung 13 — the dated record (ADR 0126–0129), signed off 2026-09-24:** `app/ingestion/dateline.py` reads the date a source PRINTED (a transmittal letter above its salutation, a call by its own title block; the PDF export stamp is never drawn) — hand-read gold of 43 documents **0 WRONG**, calls 21/21. `app/claims/when.py` dates a company event only when the claim and a clause of its passage assert the same whole PROPOSITION — action, the thing acted on, actor, stage, polarity and an exact day (a bound reads `bounded`). `app/brief/timeline.py` is the read model; `app/market/history.py` the daily series. `app/facts/lifecycle.py` is Lane 2's one implementation, now run by every upload (0129). Instrument: `timeline_probe [--store --seed --held-out --live]`. | **2026-09-23 (rung 12):** **PHASE 2 rung 12 — the attention read model (ADR 0122–0125), signed off 2026-09-23:** `app/findings/{attention,compute,absence,statements}.py` project leads from the claim comparator through ONE `is_one_thing` predicate shared with the evidence grid, so a pair of different measures counts toward neither side — the fix for all 56 of rung 5's `measurement_gap` buckets. A derived polarity neither revises nor confirms; an absence cites a PROCEDURE (`provenance` XOR `AbsenceReceipt`) and its unit is what is ABSENT. Divergence was COMPUTED and REFUSED (34/34 candidates unrelated). Instrument: `app.eval.finding_probe [--offline\|--store]` — 16 witnesses, 0 failures against **38** on the replayed rung-5 build; `--store` DISCOVERS its workspaces (closing ROADMAP ⑥) over 3 issuers / 2 sectors. **2026-09-22 (rung 11b):** **PHASE 2 rung 11b — the business-structure read model (ADR 0120/0121), signed off 2026-09-22:** `app/brief/structure.py` groups `active_segment_facts` through `facts/disclosure.py`: share of the printed whole, growth only against the SAME note's prior-year comparative (`PeriodInterval.year_earlier`), the delta's kind a vocabulary row (`SEGMENT_DELTA_KIND`), every disclosure drawn or listed once. Instrument: `structure_probe` (14 sections + `--store`). **2026-09-21 (rung 6d):** **PHASE 2 rung 6d — filed SEGMENT facts (ADR 0116, audited by 0117/0118/0119), signed off 2026-09-21:** `app/facts/segments.py` reads a TRANSPOSED note on three axes, identified rather than assumed, with the segment axis the one carrying the note's own total; `app/ingestion/column_axis.py` reconstructs the column axis from WORD GEOMETRY at 1D₁, bound to its grid by a fingerprint, so `rows` is untouched and no baseline expires. The part is `fact_versions.segment` and its partition `segment_dimension`, both in `fact_key`; the whole is READ, never summed. One shared `app/facts/disclosure.py` groups parts and wholes for the gate, the review CLI and rung 11b. Live: **276 facts · 3 issuers · 2 sectors · 33 parts · 36/36 reconciling · 276/276 re-deriving from their own cited cell**. **PHASE 2 rung 11a — `app/brief/series.py` (ADR 0112–0115), signed off 2026-09-17:** a deterministic read over `active_facts`, of figures a DOCUMENT states (vendor and computed figures are not read). Scope vs treatment is read off `FRAME_TIERS_ALLOWED`; a silence carries rung 7's state AND the precision it was reached at; a break is judged over every underlying reading; every metric has exactly one place (series · sparse · off-axis). No model, no baseline expired. Instrument: `app.eval.series_probe [--store]`, every gate beside a `legacy_*` replay. **2026-09-12 (rung 10b, the address layer, ADR 0109–0111):** `app/provenance/anchors.py` is the ONLY place an anchor is minted, and its register is checked against the **syntax tree** rather than its own rows. `app/evidence/passage.py` resolves one to the evidence, judging the grid it is about to SHOW. `certified_column_header` mints a receipt only where the grid WITNESSES the reading it certifies — a backfill pairing yesterday's labels with today's parse would otherwise erase the drift it exists to record. **65,353 citations anchored**, deterministic, no baseline expired. **2026-07-24 (Library 1G, ADR 0054):** harvest rebuilt from a chunk sampler into a business-model map. `graph/disclosures.py` (Ind AS 108/AS-17 segment+geography notes → zero-LLM `reported` edges from the note's defining enumeration) + `graph/plan.py` (planner-selected LLM lane over `claims/plan.py`); the `_CAPABILITY_TERMS` IT-lens stoplist DELETED for per-company `reconcile_segment` authority (finding ㉓). `graph/relational.py` computes `explicit` vs `co-mentioned` (a deterministic 2nd gate beyond grounding); the edge-activation gate is label-driven (SOLID auto-applies, co-mentioned withheld). `graph/invariants.py` D67 authoring-free gates (`--scan` any ws) + `graph/geo.py`/`graph/aliasing.py`. `spine/issuer.py`/`resolve.py` — the D66 doors (org-form-insensitive resolution + issuer→proposal graduation into a `derived` center) + single-source `RESOLUTION_CLASS`/`org_entity_types()`. `store.active_relations` computes edge atoms (D63); `store.evidence_by_edge` + `harvest.format_business_model_map` render the map with quote↔class matched by construction. Pinned gpt-5.4-nano/low (ADR 0037). New `eval/relations_{gold,suite}.py` (10th scorecard row). No company names in any production code path. **2026-07-22 (Library 1F-1→1F-4, ADR 0053 §1–§7):** flat even-sample extraction became **decision-grade propositions**. `app/claims/plan.py`+`evidence.py` (1F-1) — context-preserving `EvidenceBundle`s off 1D elements, three coverage lanes (structural/targeted/open) with honest per-doc receipts (covered/starved/filtered/absent), the blind even stride **deleted**; new `coverage` GATE (planner recall 16/16 vs the real legacy even-sample 13/16). `extract.py` rewritten + `period.py` (1F-3) — one shared envelope with kind adapters (filings/presentations/transcripts/broker/news), closed enums, one evidence-constrained repair, literal field grounding, role-aware subject/origin gates, Indian-FY `stated\|inferred\|defaulted`, pinned **gpt-5.4-nano/low** (ADR 0037, one tier on live evidence). `compare.py`+`review.py`+`routers/claims.py`+`routers/signals.py` (1F-4) — the 1E factored comparator projects `active_claims` into revision/variance/time-series/corroboration/contest (both cited sides, no winner) via `GET /claims/comparisons` + `/signals`; append-only corrections replay over zero-LLM re-resolution. `parallel.py`/`stages.py`/`db/pool.py` — a visible `identify` stage + bounded evidence concurrency + autocommit pool (manual-verify hardening). `propositions` **5/30 → 30/30 GATE**; findings ⑦(P0)/⑧/⑭–㉒ closed. **2026-07-21 (Library 1F-0, ADR 0053 §8):** `app/eval/propositions_gold.py` (30-case property gold, 9 analyst dimensions, structural contract-absence proofs + a behavioral live-snapshot scorer) + `propositions_suite.py` (baseline row, per-dimension precision) + two real news-quotation witness PDFs in `data/seed/` + the frozen-bundle manifest; RED baseline **5/30**, unchanged after a same-session scorer hardening (grounded-only, bound-to-target, normalized-FY period matching). No production/contract change. **2026-07-19 (Library 1D, ADR 0046/0047/0048):** parse rebuilt on a typed **element** substrate — `elements.py` (literal ≠ normalized text), `layout.py` (x-cluster reading order), `tables.py` (one word-grid reconstruction, borderless coverage, Lane-2 guard intact), `turns.py`, `sections.py` (merged-evidence tree + classes + scoped basis + the `is_publishable_title` gate that keeps typesetter filenames out of citations), `fiscal.py` (FY keyed to the END year), `parse_elements.py`; `chunk.py` rewritten as element VIEWS with persisted `envelope`/`edges` + section-pathed locators; new `elements` table; `app/eval/parse_suite.py` golden-pages GATE (red baseline 9/49 → **72/72**). Deterministic, zero LLM calls. **2026-07-18 (Library 1C, ADR 0045, D30–D33):** new **`app/runs/`** (models/store/snapshot) — the derived-layer lifecycle: extraction runs → immutable full-envelope mentions (rejects persisted with reasons); resolution runs = saved mentions × a content-addressed spine snapshot (**zero extraction-provider calls** — `claims/run.py` `reresolve_document_claims`/`_harvest` + workspace sweeps under one `sweep_id`, CLI `--reresolve`); atomic swap under per-(doc, layer) advisory locks + stored change receipts (a spine remap reads as *revised*, not remove+add) + retention (all mentions + 1 inactive run) + run-aware orphan sweep; the D31 `resolve_verdict_memo` (ambiguous-band verdicts memoized on candidate-set × verifier hash); D33 passport-sensitivity staling with **quarantine** on issuer-identity change (activation re-checks the live passport inside the swap — in-flight work can never overwrite an analyst correction); harvest split into the same mention/resolution legs with `active_relations` aggregating across documents (finding ⑨'s aggregation half); honest stage writes with the terminal-state guard + startup reconcile; all consumers (Ask/assemble/canvas figures/dashboard bridge/merge/CLIs) moved onto the active views. The build's concurrency probe caught + fixed a real zero-active-runs bug (prune vs. staged concurrent retry). **2026-07-16 (Library 1B + same-day hardening, ADR 0043, D27–D29):** `app/ingestion/passport.py` — the ONE deterministic section→kind/class/tier mapping (LLM-free; `_AUTHORITY_BY_SOURCE` pruned), `passport_for_upload` lands `section_asserted` (D27), `lineage_for` reworked to identity precedence (resolved entity id ⊃ corporate-form-insensitive slug) + the `::publisher` voice for broker/news; `filer.py` — exchange-addressee gazetteer gate (finding ⑦'s deterministic half: BSE/NSE + the bare-"India" NSE fragment rejected in both detection paths); NEW `app/spine/issuer.py` — deterministic threshold-free issuer→entity-spine resolver (longest token-boundary alias, `proposed` excluded) filling `documents.issuer_entity_id` at the ingest issuer stage (`parallel.py::_issuer_stage`) and on passport edits. **2026-07-15 (Library rework 1A, ADR 0042):** `app/eval` analyst-outcome scorecard — `uv run python -m app.eval` (exemplars observe · claims-live trust floor · authority baseline · resolver/harvest gates; enumerate-vs-observe, P4 honest states, corpus guard → `ws-infosys`); `app/claims/gold.py` 8→12 fine-graded (must-not-merge + bank KPIs); `LocalFileConnector` `glob`→`rglob`. No contract/DB change. **Post-approval fixes (2026-07-15):** `resolve.default_period_fy` (kind-aware period default — retrospective AR/DRHP → last-closed FY; `DocMeta.doc_kind` threaded through `store.py`; fixed the live FY2027 invariant-#10 break, temporal-sanity **0/4→7/7**); exemplars "read-me-now" smoke signal; claims-live trust floor **frozen** (no-fab 25/30 · temporal 7/7 · grounding 3/3). **2026-07-11 (Canvas C8, ADR 0040):** prompt-side citation rule added to both assistants — cite inline only when *asserting a source-derived fact*, never when narrating one's own actions (the display grammar's assistant half; the turn receipt stays the accountability surface, ops expose citations on expand). No backend provenance change (frontend + prompt-side only). **2026-07-10 (agent substrate tools, ADR 0039):** `app/canvas/figures.py` (new, shared) — `get_filed_figures` unions `claims` ∪ `fin_facts` (found live: a vendor market-data source's absolute figures live in `fin_facts`, not `claims` — the tool's spec only covered half of L1) under one doc-scoped query, two-pass exact→widened vocabulary match, structured-doc honesty notes; `_resolve_citations` (excel/assistant.py) resolves figure ids (not just chunk ids) into real citations. `compute` (document_assistant.py) — whitelisted-AST derived-figure calculator, result marker inherits input citations. `fill_range` (excel/ops.py) — Translator-based fill-handle tool, closed a live off-by-one a model hand-wrote. `recalc_and_read` (excel/assistant.py) — mid-turn LibreOffice verify, registered only when the engine is present. LibreOffice installed (server-side-only dependency, confirmed); `heal_cached_file` (recalc.py) self-heals pre-engine version files on preview read. `settings.excel_assistant_model = "gpt-5.4-nano"` (ADR 0037 applied, live off-by-one evidence). **2026-07-10 (Canvas C7/C7b, ADR 0036/0037/0038):** `app/canvas/document_run.py` (new) — the per-section draft path, the canvas's first fan-in consumer (walks table nodes through to their producing AI node, doc-balanced context retrieval + notes); an upstream `[C#]` marker, when cited, expands to *that artifact's own* L0-resolving citations (invariant #7 chains) and lands remapped as `[n]` section refs — no token streaming, since raw markers must never flash by; a draft that grounds nothing declines rather than land an anonymous section. `app/canvas/document_assistant.py` (new) — agent profile #2 (`app/llm/agent.py`/`toolcall.py`, ADR 0035's reuse claim made real): `read_document`/`read_section`/`write_section`/`search_sources` (C7), then C7b's co-author completion — `add_section`/`update_section_meta`/`move_section`/`delete_section` (destructive, opt-in-gated like Excel)/`set_document_title`/`read_source` (marker-free reference-doc skim); `write_section` **rejects** (in-band `ToolExecutionError`) content that resolves no citations while the palette has entries — the model self-repairs with markers, observed live — one carve-out for a pure style pass on the analyst's own uncited words; the excel honesty guard (`claims_edits`) reused for "claimed an edit, wrote nothing." `app/canvas/docx_io.py` (new, python-docx, no LLM) — deterministic markdown-subset↔Word export/import (Title/Heading styles, cited-section Sources line; import splits oversized sections at block boundaries under the 12k cap; python-docx joins AI-service deps). `app/canvas/artifact_text.py` (new) — shared section/citation text-shaping helpers. **Model escalation ladder (ADR 0037, user policy):** GPT-5 nano → 5.4 nano → 5.4 mini → 5.6 Luna/Terra/Sol — diagnose first, step ONE tier with live evidence, never jump; the C7 live probe caught `gpt-5-nano` leaking reasoning monologue into section content (perfect tool plumbing, garbage prose — the ss5b failure mode again), stepped to `gpt-5.4-nano` (`settings.document_assistant_model`, a preference not a pin) which passed the re-probe and beat `gpt-4o` on wording preservation. That step surfaced two live-only adapter quirks fixed in `app/llm/chat.py::OpenAIChatProvider._params`: the 5.4/5.6 tiers reject `reasoning_effort="minimal"` (they take `none`/`low`/…/`xhigh`) and refuse function tools on `/v1/chat/completions` with any effort except `'none'` — the second bug had left the long-registered `gpt-5.4-mini` 400ing on every tool-calling call since C6, invisible to green tests until this live run. `gpt-5.4-nano` added to `MODEL_REGISTRY`. **2026-07-10 (Canvas C4–C6, ADR 0035):** `app/canvas/table_run.py` (strict-JSON `table` contract + one repair round + per-`[C#]`-marker citation enforcement + drop-ungrounded-rows/decline-on-empty — invariant #1); `app/canvas/excel/` (`assistant.py` node-scoped agent profile, `ops.py` deterministic openpyxl toolbox, `recalc.py` LibreOffice recalc, `serialize.py`/`a1.py`/`store.py`); **`app/llm/toolcall.py` + `app/llm/agent.py`** — tool-calling as the router's third capability (provider-neutral shapes + a bounded argument-validated tool loop, "the port"), Excel = first profile. ss7 + parallel pipeline (ADR 0026) + L3 claims retrieval + Graph Phase 5 harvest (`graph/harvest.py`). H1/H2: see prior entries. **2026-07-03:** `app/graph/trust.py` (new) — the three-axis trust model (authority/confidence/corroboration kept orthogonal) + a unified `promote()` ladder replacing the divergent entity/position promotion rules; `harvest.py` now asks the extractor for a per-mention confidence (edge `weight` = strongest mention, was a flat `_HARVEST_WEIGHT`); `harvest_gold.py` (new) — offline precision gate for the harvester (grounding/self-reference/classification/resolution-isolation, 11/11), `--gold` CLI flag; `assemble.py` `_entity_category` maps `geography` to its own category (ADR 0028, was folded into `segment`). **2026-07-05:** `app/ingestion/filer.py` (new, ADR 0030) — deterministic cover scan + grounded LLM fallback for the filer, feeding `build_doc_contexts`; `parse.py`/`db_writer.py` sanitize NUL/control chars (RC1); `db_writer.py` `PendingDocument`/`reserve_pending_async`/`fail_pending_async` + `parallel.py`'s `_ingest_one` computing `doc_id` upfront (RC2 — a landing failure can no longer vanish); `classify.py`/`spine/store.py` — `investor_presentation` doc-kind + per-kind narrative digit-ratio ceiling (RC3, ADR 0031); `parallel.py` splits the old `_mark_graphing`/inline harvest into `_mark_extracting`→`_mark_harvesting`→`_harvest_stage` (harvest is now its own post-gather stage, not hidden inside `extract`). **2026-07-06 (ADR 0033, Dashboard S1+S2+S3):** `app/dashboard/` (new) — `instruments.py` (ISIN-keyed exchange-master seed + entity-spine resolve), `statements.py` (Lane 2a: yfinance snapshot → real L0 artifact → conservative field mapper → `fin_facts` at `vendor_data` tier → statement-table projection with tier-ranking), `derived.py` + `bridge.py` (S3: 8 ratio/growth items at `computed` tier with `{formula, inputs[]}` provenance, bridged into `public.claims` for 4 lens attributes), `kpi.py`, `charts.py` (price/PE/margin series), `news.py`, `seed.py`; `app/ingestion/connectors/yfinance_market.py` (new connector, ADR 0008); `retrieval/router.py`/`ask.py` — `structured_kpi` answers for real with a soft period-cue fallback to semantic on a miss. **2026-07-07 (KB opt-in, ADR 0033 amendment):** `instruments.py` split into read-only `resolve_entity` vs. write-only `ensure_entity`; `routers/dashboard.py` gained `POST`/`DELETE /dashboard/company/{isin}/kb` as the only KB-writing/removing paths (module rule: "GET never writes the knowledge base"); `statements.py` vendor source card is per-company again (`vendor_source_uri`) with `_retire_orphan_vendor_docs` sweeping orphaned cards at runtime. **2026-07-07 (harvest refinement, user feedback):** `graph/harvest.py` gained a gazetteer-based geography canonicalizer (with a locative-evidence gate for places outside it) and a segment normalizer (strips noise suffixes, rejects bare capability terms like "Generative AI") via `refine_mention`, wired into `_compute_harvest`; minted entities now carry `aliases` so gazetteer variants ("the US" / "United States") merge onto one node; `harvest_gold.py` gained 7 hand-labeled cases + a `label_ok` check. **2026-07-07 (ask.py/router.py):** `AskRequest.history` → deterministic anaphora detection (`retrieval_query`) folds the prior turn into the retrieval query for short/pronoun-led follow-ups without any LLM query rewriting; `router.py`'s `structured_kpi` classification now reuses `kpi.match_line_item` (routing and answering can't drift apart) and its decline text names the KB-opt-in flow explicitly. **2026-07-07 (Canvas C1–C3, ADR 0034):** `app/canvas/` (new) — `store.py` (canvas/node/edge CRUD, `rev`-guarded whole-graph `PUT`), `validate.py` (edge-kind-from-port-pair re-derivation + data-edge-cycle rejection, server-side even if the client validated), `run.py` (the kernel composition — `resolveScope`→`assembleContext`→`callModel`→`enforceCitations`→`writeArtifact`→SSE `emitEvent`, reusing `retrieval/ask.py` internals with `scope.docIds`); `routers/canvas.py` — `GET/POST /canvases`, `GET /canvases/{id}`, `PUT /canvases/{id}/graph`, `POST /canvases/{id}/nodes/{nodeId}/run` (SSE), `GET /artifacts/{id}`; `db/schema.sql` gained `canvases`/`canvas_nodes`/`canvas_edges`/`artifacts` (layout+wiring only — invariant #8, no second knowledge store; the `artifacts_ai_kinds_need_citations` CHECK enforces invariant #1 at the schema level). `retrieval/ask.py`'s `_blend_context` gained `manual_notes` (Canvas sticky context, labeled to the model as the analyst's own words, not corpus evidence) and `answer_question` gained `balance_docs` (per-document retrieval quota so a multi-source Canvas task can't have one document sweep the whole context window — Library's Ask keeps global ranking, unaffected). |
| D · Data | **Daily price history for the Timeline (rung 13, ADR 0126–0128), 2026-09-24:** a daily series over every window (`_5Y_DAILY`), each close dated by the session that ENDED it — bars after the fetch, and today's before 15:30 IST, dropped. · **yfinance market connector live, and honest about time (rung 9, ADR 0102-0104), 2026-09-05** | Indian connectors listed in `RESEARCH.md §1`. **2026-07-06:** `app/ingestion/connectors/yfinance_market.py` — quotes, price history, statements, profile (ADR 0008 registry, ADR 0033 Dashboard). **Lane 2 split (ADR 0017):** 2a statutory financials — **yfinance bootstrap done**, XBRL/premium filing-grade upgrade still deferred (S4) — + 2b operational KPIs via the quarterly fact sheet still deferred; + the discovery-agent web-search connector (forthcoming) |
| E · Auth/Security | foundation | secrets isolated to `services/ai` env (server-side keys only); Auth.js demo posture not built |

## Log

### 2026-10-05 — **Rung 17: Canvas is where the work happens — one saved scope, an Ask that continues on a board, steps chained by their evidence, canvas files that speak nowhere else — and the closing-pass audit that made work in flight belong to where it started** — ADR 0148–0153 — user-verified & signed off 2026-10-05

Rung 17 ran as three hand-verified slices (17a, 17b + its six refinements 17b-r, 17c), then ONE
closing pass: the heavy suites, an audit of the whole diff (eight findings, a re-audit of the fixes,
two more P1s), and the fixes. Per CLAUDE.md the heavy gates ran once, not three times.

**17a · one saved scope, a canvas that follows its workspace, no padded citations (ADR 0148).**
*Goal:* switch a source off once and it is off in the Library, the Graph and Canvas, after a reload
and in a second tab; a canvas opens in the workspace the URL names; an answer that cites nothing is
declined, never padded. `scope_exclusions` rows written as deltas (`PATCH /scope`), `useSavedScope`
on the client (the Library's in-memory `excludedDocIds` and the Graph's `?off=` handoff are gone);
`POST /canvases/open` under an advisory lock returns the most recently updated canvas or a blank
one; every canvas/workbook/document door requires `workspaceId` (the `ws-demo` default left both
stacks); `enforce_citations` returns `[]` and every caller declines `uncited`; `RunEvent.declined`
renders calmly with Re-run. Canvas shows the saved scope **quietly** and never filters by it.
*Instrument:* `app.eval.scope_probe`. *Red → green:* **0/3 (46 failures) → 3/3**, three replays fire.

**17b · one model catalogue, a model + effort picker, Ask → Canvas, sections first-class (ADR 0150,
0148 D5).** `llm/models.toml` is the ONE file for registry, pricing, effort checks, `/models` and the
picker; `gpt-6.1-sol` joins the ladder at `medium`; a stale pin refuses to start the service; the
effort rides the node, the receipt and the inputs hash (a no-dial model's hash is byte-identical to
before). *Continue on Canvas* moves a Graph chat, with every turn, into an `ask` node that owns its
history. Sections select, rename, and delete through one dialog naming the wires. *Instrument:*
`canvas_work_probe` G1–G3, **0/3 (8 failures) → 3/3**.

**17b-r · six refinements from the user's hand check (ADR 0151, 0152).** An Ask now **leads with 1–4
checked sentences** (filed · attributed · N4A's reading + falsifier; the story's rules and reviewer
reused; amends 0137 D1). A step wired into another reads the upstream's **evidence**, each upstream
citation carried as the original block, so a downstream can only cite filings. Every AI call is
**metered**: provider usage first, tiktoken only where none came, marked `≈ estimated`. A source
node previews page 1. Two fingers pan; a pinch follows the fingers (xyflow multiplies a pinch by 10
only on macOS — root cause, fixed). `canvas_work_probe` G4–G6 **3/6 → 6/6**.

**17c · canvas files (ADR 0149).** A dropped file is a workspace document with standing `canvas`:
parsed, chunked, identified (find-only, no spine write), embedded; never extracted, harvested or
filed as facts. `documents` became a **VIEW** over `all_documents` that hides it, so a reader that
forgets canvas files fails closed. It is read only where wired, appears in no brief count, lead or
Graph node, and *Add to Library* promotes it on the same id so citations survive; a peer company's
file is refused. Word/text arrive through a LibreOffice rendition (₹ drift found and fixed by
routing text through .docx). `canvas_files_probe` **0/3 (11 failures) → 3/3**.
**A live bug the user hit (17c item 10):** a dropped 17-page PDF failed three times with "ended its
process without an answer". Root cause by PROCESS: an ORPHANED `:8000` worker whose terminal had
closed handed every parse child a dead console (`0xC0000142`). Fixed at the root: one constant
(`app/processes.py`, `CREATE_NO_WINDOW`) for every child the service spawns, a reload worker dies with
its reloader, and a second `pnpm dev:ai` refuses a served port naming the holder (`/healthz` `pid`).
*Receipt:* the dead-console test old `IsolatedJobCrashed` (the user's exact message) → new: the job runs; spawn scan 5 hits → 0.

**Closing-pass audit (ADR 0153).** Eight findings (4 P1 · 4 P2), one root per group. **R1** a
lifecycle write did not know which read it belonged to — a delete during a read re-created the
document: `read_ticket` fences landing and failure, delete cancels the read. **R2** carried evidence
was trusted from the artifact: now re-read from the store; one citation per block; withdrawn support
is said, never cited. **R3** a stage's status asserted by the caller: derived from the strip.
**R4** one precedence rule stated differently on each stack: wired sources decide, Workspace scope
is the fallback. **R5** an async result applied to "whatever board is open": a board epoch guards
every post-await write. **R6** output size from untrusted input: a fixed preview box + an isolated
render. **R7** a view ignoring the lifecycle it shows. The design-reviewer's re-audit of the fixes
found two more P1s (a sibling sweep run inside a deleted document's cancel scope; D2 fixed at one
consumer — rule 10), all fixed with tests. *Receipts:* `canvas_files_probe` G4 **old (no G4) · new
4/4 · G4 on `audit-start` FAIL 5/5**; `canvas_work_probe` G6 MOVED (rule 6: its Ask → AI leg
relabelled ONE recorded answer into every workspace) — old pass over a leak · new 6/6 · new G6 on
`audit-start` FAIL. The full sharded run also caught two 17c regressions (a `GROUP BY` over the new
view; a launcher test hitting the served-port guard) — fixed, GOTCHAS #20.

**Verified 2026-10-05 (this commit), one full run, alone:** pytest **3,175** (sharded) · web **1,143**
· contracts **322** · ruff / format (446 files) / mypy (443 files) / eslint / tsc / prettier clean ·
`test_docs_drift` 32 · `scope_probe` 3/3 · `canvas_work_probe` 6/6 · `canvas_files_probe` 4/4 ·
`graph_probe` · `brief_probe` · `citation_probe` · `graph_ask_probe` `--store` PASS ·
`app.eval --offline` 6 pass · 2 amber (no worse). *Generality:* HDFC Bank, Infosys, TCS (banking and
IT services); live runs on gpt-6-luna cited on all three.
**Two probes were red on this closing run and are repaired here, neither by lowering a gate.**
`scope_probe` G1 picked a document without reading the analyst's own saved scope, so it failed
whenever that document was already off (the live store held 19 of HDFC's 20 documents switched
off, written 5 s apart at 10:57 UTC by a source not identified — not this suite, whose tests use
`ws-test-*`); the round trip now flips either way and restores the exact prior state, so those 19
are untouched and the user's to keep or reset. `graph_probe --store`'s consumer gate named `series-module.tsx` for the Graph handoff,
which `series-overlay.tsx` has owned since the brief v2 (red at HEAD, not a rung-17 regression); it
now reads the file that owns it.

**Declared, not fixed** (ROADMAP §1 "Found by rung 17"): 6.1-sol cache writes ($2.50/M) are not in
`cost_of` · the Ask node runs the Graph Ask pin and no wire re-scopes it · strip writes after landing
are fenced across PROCESSES only by cancellation (one worker, 0147) · the preview render child has no
OS memory cap · ACLs (0072).

**Meta-layer friction / change (n4a-improve):** (1) *`verify-graph-layout` sat silent for 30
minutes behind a stale `:8000` worker.* Fix in code: `layout-harness.mjs` now has a 20-minute
watchdog (`--budget-ms`) that exits 2 UNVERIFIED, proved by a harness that never answers → rc 2 —
every layout script inherits it. (2) *Two `--store` probes were red only at the close* (one
depended on the analyst's live scope, one named a file the handoff left in the brief v2) — the
`n4a-progress` §1 checklist now says to run the touched doors' `--store` probes alone, triage a red
one OLD vs NEW at HEAD, and make a state-borrowing probe work from any state and restore it.
(3) The layout scripts were NOT run at the close — recorded as such in SESSION, not as a pass.

### 2026-10-01 — **Rung 14: *How this business works* is an expert's story, checked before it ships — and a 14-document upload that stranded six documents** — ADR 0145–0147 — user-verified & signed off 2026-10-01

Three bodies of work on one unsigned tree: the rung, two rounds of the user's verify notes, and a
live bug the user hit while testing.

**1 · The module (ADR 0145).** *Goal:* an analyst opening a company's brief reads, in a couple of
minutes, an expert's account of it: what it does, where it earns, what matters and what it could
mean, and what is happening now. Every figure opens its page, every statement shows whether it is
*filed*, *attributed* or *N4A's reading* (with a falsifier), and a disagreement is laid out, never
decided. The pipeline is **gather → write → enforce → review → coherence → keep**
(`app/brief/story/`). Gather is deterministic and numbered (`F#` figures, `C#` claims, `P#` passages,
`T#` contests); the writer is ONE call; `enforce.py` is a pure function over ONE rule module
(`app/story_rules.py`, `app/text_cues.py`, which `graph/ask.py` now imports instead of copying) that
the Pydantic contract and the probe call too, so the rule exists once; the reviewer is a separate
model that sees one statement and ONLY its own citations. The story is kept in `story_versions` /
`story_index`, keyed on a dossier hash + model pins + prompt version, so a page view never gathers
and a new document moves only the key it touches (standing = documents up to the latest annual
report, chapter = after it). Doors: `GET /brief/story`, `POST /brief/story/rewrite`
(`packages/contracts/src/story.ts` + Pydantic). The contract has no verdict field and no free
number, so D3/D4's defects cannot be constructed.
*Instrument:* `app.eval.story_probe [--store --live]`. *Red baseline:* the module absent on every
workspace. *Now:* 8/8 planted defects fire the gate and are withheld, the contract refuses them, a
naive single-prompt writer replayed WITHOUT the enforcer breaks all 8, and `--store` passes on 9
workspaces (hash and record fingerprint stable). Live (v13): graded PASS 83%, held-out PASS 75%.
*Model ladder:* writer `gpt-6-luna@none`; reviewer climbed ONE rung, `none → low`, on a measured
failure (same nine must-fire checks ×3: 22/27 → 26/27; settings.py holds the evidence). The first
effort A/B (reviewer `low` vs `none` on identical drafts) did not move, so every earlier failure was
a pipeline defect, not a model limit.

**2 · Verify notes, two rounds (ADR 0146).** Round 1 evidence read first (rule 8): of 5 shipped
equations **none** had every term bound, and 7 of 9 standing stories said what the record *lacks*.
So: the equation, the `unfigured_landmark` gap and the receipt line were **removed**; rule
`absence_claim` was added (one function: enforcer, contract, probe; on the OLD output 9/147 served
sentences carry the cue); the module became a briefing grid with the chapter beside the story, the
whole statement is the target (its trail opens inline, one at a time) and a Filed · Attributed ·
N4A's reading lens; a figure the record carries two ways (`restated`, another basis) wears a rose
mark and its trail lists both; a falsifier must be incompatible with its reading, and a disagreement's
words and the story as a whole are reviewed (a statement leaning on a withheld one is dropped,
`dangling`). v10 → v13: kept 147 → 140, interpretations 58 → 35, absence shown 9 → 0. A
design-review pass before round 1 found five P1s (a "26%" exempted as a year, cited figures missing
from the trail, a *stated* figure shown as filed, a reviewer outage cached as `unsupported`, a Rewrite
that reverted) — all fixed in-slice with tests.

**3 · The upload bug (ADR 0147, user side-request).** A 14-document IDFC FIRST upload stranded six
documents, all `couldn't get a connection after 30.00 sec`. Three roots, read from the store and code:
the concurrency cap was per CALL while the pool is per PROCESS (the web client sends one batch per
section, so 11 documents wanted ~22 connections of a 10-connection pool); the extract and embed legs
were gathered without joining, so an orphaned leg re-opened a document already marked `error`; and the
failure recorder needed the very resource that had failed. Fix: one process-wide `document_slot` shared
by ingest, re-derive and retry; `create_pool` refuses a size below `2 × cap + 2`; both legs join before
any terminal write; a stopped document is recorded on its own connection with the strip settled by one
pure rule (`stopped_stage_changes`, also used by reconcile). A fourth finding while verifying: a
Windows reload hung forever behind the Library's never-ending progress stream — bounded by
`timeout_graceful_shutdown` (GOTCHAS #17 now diagnosed). *Receipt:* the new tests against the OLD
orchestrator 6 red / 1 green (the pure rule is new by construction); 15/15 on the new code.
`ws-idfc-test` repaired through the live retry door: 14/14 ready, every chunk embedded.

**Also:** `verify-graph-layout.mjs` now drives the v2 brief (see-all, series overlay, a new chat) —
**PASS on 15 journeys** (it was declared red 09-30); `test_isolated` asserts the gate's own 0.3 s
(the CI red was Linux 0.34 s against a Windows-tuned 0.6 s). `formatProse` renders ₹27.15 lakh cr in
a sentence while the trail and cell keep the exact figure.

**Verified 2026-10-01 (this commit):** pytest **3,047** (sharded) · web **1,051** · contracts **310** ·
ruff / format / mypy (414 files) / eslint / tsc / prettier clean · `test_docs_drift` 32 ·
`story_probe` offline + `--store` PASS 9/9 · `verify-story-layout` PASS on 4 graded workspaces × 2
widths (AU: all gates pass; its figure gates are vacuous, it has no filed figure). **Held-out five:**
read by `story_probe --live` (PASS 75%), correct or honestly thin. *Generality:* nine workspaces — Infosys and TCS (IT
services), HDFC and ICICI (banks), and the held-out AU, Bajaj, HDFC Life, HUL, L&T; no issuer name in
any query, prompt or branch (`story_probe` §3).

**Declared, not fixed** (ROADMAP §1 "Found by rung 14"): attributed figures cannot reach the story
(only a filed token carries a number) · 0 `contested` comparisons on any graded store, so the
two-sided view is fixture-tested only · no absence is ever said (a scope-aware check over the whole
record would let disclosure gaps ship) · the retry door accepts `extract` on an unindexed document ·
the P3 list. *No story CITES a qualified figure in v13* (the writer steers round them), so the rose
mark is test-proven, not seen live.

**Meta-layer friction / change (n4a-improve):** (1) *The slice's own plan file grew to 27 KB and a
compaction cost a re-read; the SESSION counts (web 1,042) had drifted from the plan's last run
(1,051).* Fix: this pass re-measured every number from a fresh full run instead of copying the
plan's, and the n4a-progress checklist now says so (§1). (2) *A live run and a page view both start
a story job* — one line in COMMANDS beside `story_probe`, where the next live run will read it.
(3) 0147's lesson (a cap enforced per CALL over a resource held per PROCESS) is held by a check in
code, `create_pool` refusing a pool below `2 × cap + 2`, rather than by a prose rule.

### 2026-09-30 — **Rung 16 closes Block G; the Graph page is redesigned under a top navbar; the Library brief v2; and the tree audit that held every projection to its evidence** — ADR 0137–0144 — user-verified & signed off 2026-09-30

Four bodies of work, built 09-26 → 09-30 on one unsigned tree and signed off together.

**1 · Rung 16 — Graph Ask, the relationship table, communities (ADR 0137, audited by 0138).**
*Goal:* an analyst asks the Graph a question and gets an answer that separates what the record
FILES from what someone ATTRIBUTES, which explanations stay live, what is missing and what would
discriminate — or a decline where the record cannot settle it. `POST /graph/ask` returns a
`GraphAnswer` with no free-text field (`packages/contracts/src/graph-ask.ts` + Pydantic): the model
selects and labels, the record sorts, counts and stands (`app/graph/ask.py`). Missing lines are
checks that ran. The relationship table is the canvas's equal, and communities are semantic areas
read off the data. Series, structure and Timeline take the source toggles (0106 D2 revisited). The
audit (0138) found each stage answering a different question: one `QuestionFrame` is now read by
every stage. The Ask reads FILED readings rather than drawable series, the question's period
decides, a named metric is offered and never forced, and `filed` requires every requested item. A
label may use only its statements' words. **Found and fixed in the build:** `/ask` crossed
workspaces (P1; test red on old code). Citations to excluded documents went 10/154/15 · 8/131/9 ·
12/80/6 · 98/186/9 → 0 on four workspaces. Old `AskPanel`/`ask-flow`/`chat-store` deleted.
*Instrument:* `app.eval.graph_ask_probe [--store --live]`.

**2 · The Graph page redesign + a top navbar (ADR 0139, 0140).** *Goal:* the map never jumps,
Details and Ask sit side by side, and every surface gets its width back. The global left rail is
replaced by a 48 px `app-navbar.tsx`: unbuilt surfaces are visibly disabled, the workspace is
stated, and health is a dot. `/graph` is a deterministic SVG community layout (`graph-layout.ts`,
no force engine; `react-force-graph-2d` and `d3-force-3d` are removed). Choosing has two levels,
names use semantic zoom, search highlights and never removes, and each document has one name from
its passport (`document-names.ts`). Size stays the visible degree. Ask keeps several chats, now
server-side (`routers/ask_threads.py`). States are paint, and the camera glides one composited
picture. *Measured on HDFC, old → new:* labels at rest 0 → ≥ 20 with 0 overlaps; worst frame sweep
167 → 17 ms, select 267 → 17, focus 567 → 33–50.

**3 · Library coverage brief v2 (ADR 0141–0143).** *Goal:* a company's Library page tells an
analyst in a minute what the company is, what state it is in (quarterly AND annual), what moved and
how the business is composed, and an upload binds every document the company files. The red
baseline was a fresh TCS upload: 3/7 documents had no issuer name (brand-only covers), and
Structure was empty (a merged spanning heading, a third rupee glyph `J`, and captions that never
reached the reader). 0141: a document the workspace's company files is bound by the workspace
(`app/company/siblings.py`: find, never mint; upload order never decides); what is left is said at
the top (`PendingCompaniesResponse.unnamed`). 0142: the segment lane reads merged headings,
captions stored at parse, and a caption that names the measure. 0143: *What deserves attention* is
about the company, with signals from filed figures (`app/brief/signals.py`), `/brief/series?grain=`
for quarterly and annual, a 1,120 px page with price beside the name, and an expanded Timeline that
puts price and events on one axis.

**4 · The tree audit — every projection keeps the evidence's qualifications (ADR 0144).** A Codex
audit of the whole unsigned tree found 8 issues, all verified on the code and all fixed here. One
root cause: each new projection simplified away a qualification the read already carried. The
fixes: a basis the question names binds; a disagreement among filed readings travels
(`restatements`) and is never settled; coverage is per metric × period; a signal compares one
measurement (`alike()`); a follow-up chain folds (`previousQuestions` ≤ 4); a document binds only
where it names itself the company's (a filer position, never a mention); chats merge by turn; a
failed delete is restored and said. *Repro:* old code 1/8 green → 8/8.

**Verified 2026-09-30 (this session, the committed tree):** pytest **3,014** (sharded; 4
store-bound tests deadlocked under a concurrent browser run and pass alone) · web **1,031** ·
contracts **293** · ruff / format / mypy (401 files) · tsc / eslint / prettier · `pnpm build` in a
scratch worktree (GOTCHAS #4b) · browser `verify-{series,structure,attention,timeline}-layout` PASS.
**`verify-graph-layout` FAILED (3), declared:** its lead and metric journeys ran over nothing
(`[data-lead-card]` 0 on every workspace while the door serves 9/7 leads), because v2 (0143) shows
signals first and moves leads behind *See all* and "Show in graph" into the series overlay, and
the script was never updated or run at v2's sign-off. HDFC focus 117 ms > 100 was measured under a
concurrent suite. Canvas, labels, table reach and legacy replays passed on 3 workspaces × 2 widths.
Owner: the next session's first task. **Block G closed on the held-out five** (declared figures-only before
the run, each annual report into `ws-heldout-*`): **correct or honestly degraded on 5/5**. The run
found a root-class defect: the Ask declined "nothing bears on this" over sources nothing had been
read from, so it now declines `nothing_read` (both contracts, a must-fire gate). Lane 2 read 0
facts on four held-out issuers (unmapped labels, `currency_ambiguous`); that went to ROADMAP and
was not tuned. ROADMAP §1 owns the rest.

### 2026-09-26 — **Rung 15: the Graph draws what a document in scope says, and a lead or a metric walks into it** — ADR 0136 — user-verified & signed off 2026-09-26

**Goal (0066):** an analyst carries a specific object out of the brief (a lead, a metric) into the
Graph and lands ON it, in the same source scope and period. There, every object answers *what is
it, how is it measured, what figures and whose words, which documents*, and every connection drawn
traces to a document still in scope.

**Instrument:** `app.eval.graph_probe [--store]`, with gates `edge_trace_failures`,
`metric_failures`, `seed_failures` and the consumer halves, plus `legacy_*` replays. **New gate on
old code (HEAD 90ae5b2):** offline **46** failures, `--store` **86**. After: **PASS** on 6
workspaces. Web halves: `graph-frame.test.ts`, `node-details.test.tsx` and `graph-crossstack.test.ts`
(the latter two on a REAL `/graph` recording from `record_fixture --door graph --trim`), and the
browser half `scripts/verify-graph-layout.mjs` (settled, keyboard, lead → graph → back, metric,
1,280 + 400 px). Python: `test_graph_contract.py` · `test_graph_door.py` · `test_graph_metrics.py`
· `test_graph_probe.py`; zod `graph-workspace.test.ts`.

**What was red (live store, before any change):** 40–54% of every workspace's edges reached the
client with **no citation** (Infosys 462/1,021 · HDFC 444/887 · ICICI 47/119). That covered every
`about`/`mentions`/`has_theme`/`discusses` edge, against invariant 1. A curated seed (issuer names
in `seeds.py`) was drawn under every scope. `metric` was declared in the contract and produced by
nothing (0 nodes, while the brief drew 7–16 series). Radius read the server's degree ("bigger ⇒ more
relevant"), supports/contradicts painted in market-direction tokens, particles never stopped, the
node card had no reveal path below 1,024 px, and no Library → Graph handoff existed.

**What changed (ADR 0136 D1–D7):**
- **D2 · every edge carries its documents.** A derived edge gets one representative citation per
  document from the evidence it derives from; `build_graph` refuses an uncited edge; a
  document-less seed is not drawn. The work found two more leaks, both fixed. A `cites` edge carried
  the first passage seen for its document ANYWHERE, which was another position's words. A relation
  surviving a source toggle shipped the excluded document's passage (now `citations_in_scope`).
  Uncited **462/444/47/316/225/394 → 0**.
- **D1 · metric nodes are the brief's series under the Graph's scope.** `series_over` was split
  out of `read_series` (the brief's output is **byte-identical** on 6 workspaces, `series_probe`
  PASS) → `app/graph/metrics.py`, with a `reports` edge carrying the figures' citations. A gap here is
  the new `GapCause.unexplained`, because the Graph did not ask why and does not pay the brief's
  1.27 s receipts per toggle. Metric nodes **0 → 16/12/7/14/14/14**, each equal to the brief figure
  for figure.
- **D3/D4 · size is VISIBLE degree** (computed in the browser, legend *connections shown here,
  not importance*). Edges fall into four families on evidence tokens (no `--up/--down`). Type has a
  glyph, not only colour. There are no particles, and reduced motion settles off-screen.
- **D5 · typed node detail.** A metric shows its scoped series. A position shows its statements
  (rung 12's `statement_of`, now naming the **speaker**), its sides with their source breadth, and a
  quote only where a named speaker's words exist verbatim. **Measured 0/331** Infosys claim citations
  carry a snippet, so no live quote shows (declared).
- **D6 · the handoff seed is an `ObjectRef`**, resolved by `GET /graph?seed=&origin=` at render time
  (`app/graph/seed.py`). An unresolved seed is a 200 with `excluded_by_scope` / `not_in_record` /
  `no_graph_object`. `ResearchScope.seedRef` is now an `ObjectRef`; the uncalled `includes()` is gone.
- **D7 · layout:** scope · canvas · **Details | Ask** rail (`graph-rail.tsx`, `node-details.tsx`), and
  an origin bar with *Back to …*. `HandoffScope` applies the link's scope BEFORE the first fetch.
  Library gets *Trace in graph* on a lead and *Show in graph* on a series row; `?lead=` reopens the
  lead on return. `StatementRow` is shared by both surfaces.

**Review (design-reviewer, triaged in the slice):** no P0. **P1s fixed:** the `HandoffScope` gate
re-closed on every toggle and unmounted the whole Graph body · a URL↔store scope ping-pong on a
double toggle (the URL is authoritative once, then the store) · every click reheated and refit the
camera · *Note this* 409'd under a narrowed scope (33/244 HDFC nodes), so it is now disabled with the
reason in words. Nine P2s fixed; the rest are in ROADMAP §1 *Found by rung 15*.

**Generality:** 4 issuers / 2 sectors on the live store (Infosys · HDFC · ICICI · IDFC FIRST),
17 seeds landed. No issuer name or sector branch in the new paths; `seeds.py` is no longer drawn.
**No regression:** sharded pytest **2,839** (base 2,782) · web **729** (676) · contracts **269**
(254) · ruff / format / mypy (387 files) / eslint / tsc / `format:check` clean · `pnpm build` ok ·
probes graph/series/brief/structure/timeline/citation/finding(offline)/evidence_state PASS ·
eval `--offline` 6 pass · 2 amber (= baseline) · design-system ALL GREEN. The sign-off pass found 4
files unformatted by the post-review edits (web tsc/vitest re-run here: green); they were formatted
in the commit. **Cost:** `/graph` payload Infosys 933 KB → 1.7 MB (passages and statements on
arrival); latency unchanged (0.17–0.8 s).

**Declared, not fixed** (ROADMAP §1): no quote until the claim lane records its span · segment
figures on segment nodes · no supports/contradicts producer · `seeds.py` to retire · a lazy detail
door if 1.7 MB bites · the review P2/P3 list. **Owned by rung 16:** Ask, the relationship table,
communities, breadcrumb, the frame reading the toggles (0106 D2), the held-out five at block close.

### 2026-09-25 — **The new-company slice: an upload decides its company, reads what a bank's filing prints, and the service stays answerable while it does** — ADR 0131–0135 — user-verified & signed off 2026-09-25

**Goal (0066):** an analyst uploads the filings of a company the workspace has never met, clicks
nothing, and the Library brief and the Graph fill: the company is named, listed and classified, a
bank's own ratios and segments are drawn, and no row reads "Partial" for something the analyst
cannot act on. The only question they are asked is one the record cannot answer (no listing, or two
of them), and they are asked it once.

**Instrument:** the store read on a fresh upload, nothing clicked, plus the gates each iteration
added: `test_new_company.py` · `test_bank_filings.py` · `test_stated_readings.py` (11 must-not-fire
arms) · `test_reporting_period.py` · `test_isolated.py` · `test_llm_retry.py` ·
`test_workspace_purge.py`; `lane2_probe` (gold **31/31**, segments reconcile 21/21) ·
`series_probe` (new `filed_first_failures` gate) · the new `app.eval.responsiveness_probe` (legacy
thread arm FAILS, isolated arm PASSES) · `app.eval.business_model_probe` (17 filings). Web halves:
`company-confirm.test.ts`, `company-crossstack.test.ts`, `health.test.ts`.

**Generality:** door 4 and the business-model inference are company-agnostic (synthetic issuers in
pytest; 17 real filings across banking, NBFC, insurance, IT and conglomerate in the probe, including
held-out Bajaj Finance). Transcript periods were checked across HDFC, Infosys, ICICI, TCS and IDFC,
covering `banking` and `it_services`. Segment headers were checked on the IDFC and ICICI goldens,
and stated readings live on HDFC and IDFC. **User sign-off:** `ws-idf-test2`, 5 IDFC FIRST Bank
documents (2 ARs, 3 calls) uploaded 17:10 IST on a current worker. All 5 are `ready` and bound to
*IDFC FIRST Bank Limited · IDFCFIRSTB · banking (inferred)* with nothing clicked: 208 claims, 174
filed figures. **No regression:** sharded pytest **2,782** · web **676** · contracts **254** ·
ruff / format / mypy (380 files) / lint / typecheck / format:check clean · eval `--offline` 6 pass ·
2 amber (`relations` stale, `propositions` stale after the 0133 pin move, receipt in 0133). The
sign-off run found a contracts **typecheck** failure (`series.test.ts` built a `StatementReading`
without the new `origin`; vitest does not typecheck). It was fixed in the commit.

**Iteration 1 (ADR 0131): a new company is confirmed once, and what it staled is re-derived.** Read
on `ws-upload-check`: 187/191 claims held `provisional_subject` and 431/431 figures had no issuer.
Confirming then looped forever: activation compared covered-role KEYS and called a renamed-but-same
company "contaminated", and the refusal staled the stage, not the run, so retry offered the same
doomed re-resolve. Fixed: one voice rule (`subject_anchors_preserved`); a refusal stales its
extraction run; one cascade (`rederive_after_passport_change`: facts → re-resolve → harvest);
`/companies/pending` + `/confirm`; one *New company* card. Also found: `Profit & Loss Account`
despaced to `profitlossaccount`, so a P&L was classed `schedule`. `heading_key` now reads `&` as
`and`.

**Iteration 2 (ADR 0132): the upload decides.** Your fresh test broke 3 of 4 docs. (a) A resolve
used the registry loaded before a 3-minute extraction, so it never saw the company minted
mid-read. (b) Subject grounding compared exact strings (`X Limited` ≠ `X`). (c) **Store-wide:**
the verifier ran with `max_tokens=20`, read the empty reply as "none" and memoized it (HDFC 117 of
118 verdicts). Fixed: the run reloads the registry; grounding uses the identity rule (both
call sites); provider-side reasoning headroom; an empty reply is never a verdict. **Door 4:** a
filer with exactly one NSE/BSE listing of its identity is minted at identify with its ticker, and
its business model is inferred once (`sector_source = 'inferred'`, correctable). Only
analyst-actionable waits make a row Partial. A transcript's resolve fell from ~6 min to ~33 s.

**Iteration 3 (ADR 0134): an upload reads what the filing prints.** The strip showed copy from a
**stale worker**. The fix is `/healthz` `codeStale` + a banner, and `--reload` now watches `app/`
only. A call is dated by the quarter its cover reports (the Apr-2026 call's "Q4 NIM" read `Q4
FY2027`). A segment header set in merged cells is read as a block. The RBI *Business ratios*
note and Form B P&L lines became vocabulary (data rows). The company's own call fills a series point
only where no filing gives it (`origin: stated`), and a filed point always wins. The E2E found two
more defects. `db_writer` had its own metadata copy that dropped the axis, so **no upload since 6d
had stored one**; there is now one serializer. The account's 200K TPM also defeated a per-caller
retry, so a **shared** pace now waits out 429s on the provider's clock. The card also raced door 4.
Run 4: 371 s, 4/4 Ready, nothing clicked. `app.workspace.cli` purged 2,429 test/IDFC workspaces.

**Iteration 4 (ADR 0135): a parse runs in its own process.** "AI service not answering" appeared
while every door answered. A 415-page parse in `asyncio.to_thread` held the GIL for ~55 s, so
`/healthz` took 13 s and calls queued behind ARs. Now parse + chunk run in a spawned process per
job (a crash fails one document; the job dies with its parent), and `/healthz` answers from a watcher
snapshot. Probe: sibling 2,504 → 25 ms; 2 ARs 212 → 102 s wall. **Found while proving it (D5):**
two concurrent PyMuPDF parses in one process read tables differently, so earlier uploads are
suspect (ROADMAP, your call).

**Track M (ADR 0133, your decision): the GPT-6 ladder.** `gpt-6-luna` @ none→max, then
`gpt-6-sol` @ medium→max. `gpt-5-nano` leaves the ladder. Each moved pin was re-measured:
extraction 6-luna@low (26/30 vs 21/30), business model 6-luna@none (17/17 ×3), verifier
6-luna@low (13 of 19 disagreements). Assistants keep 5.6-luna@none.

**Declared** (ROADMAP §1): Schedule III `Ratios` · HDFC's torn ratio note · stated INR amounts ·
stored transcript claims keep old periods until re-extraction · foundation workspaces keep v2
verifier memos · uploads before 0135 suspect · no listing search · serial verifier.

**Meta-layer friction.** (1) A **stale worker** served old code through two iterations before
anyone could tell. It is now a contract field and a banner, not a note (GOTCHAS #17). (2) Live
cascades and `.py` edits collided under `--reload` (GOTCHAS #18). (3) A slice that grew to four
iterations kept its memory in `plans/new-company-upload.md` (deleted at sign-off). The iteration headers carried each
"found" list, and CLAUDE.md rule 1 held. (4) **vitest does not typecheck.** A contract field with a
`.default()` broke `tsc` in a test that vitest passed, and only the full chain caught it. The fix
is a check, not a rule: `lefthook.yml` now runs `pnpm typecheck` pre-commit, mirroring CI. It exits
2 on the old fixture.

### 2026-09-24 — **Rung 13 — the *Timeline*: a mark on a time axis asserts WHEN and says how it knows, a pin asserts the whole proposition, and the two audits it took** — ADR 0126–0130 — user-verified & signed off 2026-09-24

**Goal (0066):** an analyst opening `/library` sees the brief's *Timeline* landmark: when the
record's documents were released, when the calls were held, when the company paid, declared,
approved or completed something, and which periods have no evidence. They can trust that every pin
is THE event its claim names, on the exact day the source printed. Three objects are told apart
without colour: a pin, a checkpoint and a span. A daily price lane sits beneath, coupled to nothing
but the x axis, under the caption *"Sequence, not causation"*. Separately, a newly uploaded company
now gets its filed figures and its own claims without an operator step.

**Instrument:** `uv run python -m app.eval.timeline_probe [--store] [--seed] [--held-out] [--live]`
— gates 1–18 over constructed witnesses, the hand-read dateline gold, the store's receipts (every
drawn event's clause verbatim in its passage and stating its date, every dateline citation OPENED
on the element that prints it) and the price lane. Web halves: `timeline-frame.test.ts`,
`timeline-module.test.tsx`, `timeline-crossstack.test.ts`, and `node
scripts/verify-timeline-layout.mjs` (3 workspaces × 1,280/400 px + the journeys gap → lead and mark
→ citation → return; exits 2 without `pnpm dev` + `pnpm dev:ai`). Fixtures: `timeline-live.json`,
`market-history-live.json`. Facts on upload: `tests/test_facts_stage.py`.

**Generality:** 3 live workspaces across `banking` and `it_services`: **Infosys 16 marks** (5
results checkpoints, the Q1 FY26 gap, the capital actions), **HDFC 13** (3 restatements), **ICICI
2**, the honest degradation on three documents. **Held out, untuned:** AU SFB, HDFC Life, L&T and
HUL date their calls correctly; Bajaj Finance's call title blocks are not found, so its calls are
listed undated, which is honestly degraded. **No regression:** sharded pytest **2,673** · web
**634** · contracts **254** · eval `--offline` **7 pass · 1 amber** (`relations`, the known stale
snapshot) · ruff / mypy (361 files) / lint / typecheck / format:check / build clean.

**What landed (ADR 0126).** Read before built (eval rule 8), which changed the slice: a document's
only stored date was a PDF **export stamp**, WRONG for 15 of 43 against a hand-read gold set; a
transcript event carried no date though its title block prints one; a company event's stored
period is the extraction model's and wrong where it matters (*declared … on October 16* stored
`2025-10-01`).
- **A date is one the source printed** (`ingestion/dateline.py`, D1): governed dates (*as of*,
  *ended*, *dated*…) are about something else, two distinct days are `ambiguous`, an
  analyst-confirmed passport date wins, and the stamp is never drawn.
- **A company event is dated by two witnesses** (`claims/when.py`, D2): its sentence and a clause
  of its cited passage. A month stays a month, and a sentence naming only a period is LISTED,
  never drawn.
- **Pin · checkpoint · span** (D3); lanes are the record, then ADR 0059's landmark groups (D4); a
  gap is rung 7's, counted once through the shared `artifact_absences` helper (D5); **every record
  has exactly one place** (D6); **no mark refers to another** (D7), gated on field sets, a causal
  lexicon over every authored string, and a price lane that may not read a mark.
- **The price lane is its own door** (`GET /market/history`, D8) with a SERIES receipt; the axis is
  the evidence grid's window stretched to the latest printed date (D9).

**Audit 1 (ADR 0127): a date is the date of an ACTION.** Eight defects, three with one root: where
to draw, what to call and whether it repeats a call were decided from three proxies that could
disagree. Live, Infosys' shareholder *approval* was drawn on the day the ballot's *results were
declared*. The review of the first repair found the deeper rule, **a claim paraphrases its passage,
so a rule's blind spot fires on both witnesses and "agrees"**. One assertion now carries the date,
the action and the source clause on the wire; a negated, unrealised or conditional action blocks
its date; a parser's element boundary is not the page's; label, grouping and identity read the
assertion; the cutoff is not the axis (`after_today`); a close is a session that ENDED; copy says
what we READ. Eight `legacy_*` replays, each failing its gate.

**Audit 2 (ADR 0128): a pin asserts the whole PROPOSITION.** Six false-pin shapes that all agreed
on action and date: *paid interest* confirmed *paid its dividend*; another company's acquisition
confirmed Probe's; the shareholders' approval confirmed the Board's; *approved no dividend* read as
an approval; *before June 30* pinned the 30th; an investor day vanished as a repeat of that day's
earnings call. Outside events, a weekly bar was aged by its week's START, and a date split across
two parser elements cited only the first. The rule had checked two slots of six. **The fix binds the
witness to the claim's argument:** the thing acted on, the actor, the organ's stage and the call's
kind. Negation reaches the predicate. A governor is a tri-state (`about` / `relative`), so a bound is
`bounded`, never a day. A call is the same call only if its KIND matches. The price lane is daily at
every window. A split date is cited on every element it spans. **Live readings byte-identical** (46
event claims, 9 drawn). Six replays, each today's rule minus one repair, each FAILS on its own shape.

**Filed figures on upload (ADR 0129).** `ws-demo`, where a new company's upload landed, held 5
documents and **0 facts**: Lane 2 ran only from `app.facts.cli --apply`. The per-document lifecycle
moved into `app/facts/lifecycle.py` (the CLI's dry run is byte-identical on all three workspaces)
and `parallel._facts_stage` runs it after embed ∥ extract for every landed document, keyless, never
failing the document. A real HDFC key-parameters upload → 1 active facts run; run twice → same count.
**Declared:** the strip does not show the stage (no honest backfill state for older documents).

**A new company lands (ADR 0130, door 3).** A verified five-document upload of a company outside
the seeded basket landed **0 claims and 0 edges**: doors 1–2 only FIND a company, and extraction had
minted it twice, which door 2 rightly refuses. A verified PRIMARY filer is now minted as a governed
company under the registry lock (`filer_verified`, no default; a broker's *issuer* is never
minted); a retry heals a document verified before this; the strip counts claims waiting for their
company. The two born-once tests FAIL with the mint leg removed (measured at sign-off).

**The efficiency pass (meta, same session).** Measured 2026-09-24: ~80% of spend was re-reading a
long context each step, ~40% of calls were test/probe runs. `AGENTS.md` **110 KB → 20 KB**. The
doctrine and command essays moved verbatim to `docs/reference/{EVAL-DOCTRINE,COMMANDS}.md`, and a
drift gate now holds it ≤ 24 KB, because Codex silently stops reading at 32 KiB. The ADR index went
148 KB → 22 KB (the verbose index archived; gate ≤ 32 KB), and `PHASE-2-LADDER.md` 147 KB → 53 KB
(signed-off rungs archived). `n4a-progress` is now a 4 KB checklist over `INCIDENTS.md`.
`CLAUDE.md` gains *Running a slice* (plan file, tiered verification, fewer round trips).
`tests/run_sharded.py` runs the same pytest suite as three concurrent shards. GOTCHAS: the `Edit`
tool first, and #17's variant (a stale `:8000` worker ANSWERS with yesterday's wire).

**Meta-layer friction / change (sign-off).** (1) Door 3 was built outside the slice's plan and
reached sign-off with no ADR or log line; `n4a-progress`'s log-drift check caught it, and ADR 0130
was written then, with its gate measured failing on the code minus the mint leg. `CLAUDE.md` rule 1
now puts mid-slice work in the plan before its first edit. (2) Five prose copies of the schema
census said 42, 45, 42 + 3 or 45 + 4; `schema.sql` holds **46 tables + 6 views**. Fixed, and a new
drift gate (`test_a_stated_table_count_is_the_schemas`) checks the two sites that still state a
number (it FAILS on HEAD's docs: 42 vs 46, 3 vs 6). (3) ROADMAP fell to 49 KB by compressing Phase
1's closed 1A–1G narrative to an archive pointer, so its ratchet graduated to a hard 50 KB budget.

**Declared, not done:** drawing a bound as a half-open interval · pronoun / cross-sentence
coreference (`it was paid on …` refuses) · `scheduled for` an occurrence · rung 7 still places a
document by what it PRODUCED, not the period its cover states · the Dashboard's
`PriceSeriesResponse` weekly bars (rungs 19–21) · a facts segment on the ingestion strip · the
`reviewed_not_material` human gate from rung 12 is still open.

### 2026-09-23 — **Rung 12 — *What deserves attention*: a lead is a cited reason to LOOK, a judgment sticks only over the evidence it SAW, and the three audits it took** — ADR 0122–0125 — user-verified & signed off 2026-09-23

**Goal (0066):** an analyst opening `/library` sees, in the brief's third module, at most four
**leads** — each a cited reason to look at something, ordered by the RECENCY of its evidence and
never by a severity ranking we invented — beside what the record settles (observations), what was
withheld and counted per reason, and whether absences were judged and over what. Every lead opens
into a detail of five blocks and a factor table, and from one **review inbox** the analyst records a
judgment the system then honours *only over the evidence that was actually shown*.

**Instrument:** `uv run python -m app.eval.finding_probe [--offline] [--store]` — rung 5's probe
re-pointed at module 3. **Offline (~5 s)** runs 16 constructed witnesses through the real
projection: 0 gate failures now against **38** on the replayed rung-5 build, and the absence unit
0 now against **2** on the per-duty replay (the 0067 receipt, taken rather than quoted). **`--store`
DISCOVERS its workspaces**, closing ROADMAP ⑥ (the hard-coded pair), and requires ≥3 issuers /
≥2 sectors. Its web halves are vitest (`attention-frame.test.ts`, `attention-module.test.tsx`,
`attention-crossstack.test.ts`) and a browser check, `node scripts/verify-attention-layout.mjs`,
which opens every lead's detail, See all and the inbox at 1,280 px and 400 px and exits 2
(UNVERIFIED) without `pnpm dev` + `pnpm dev:ai`. Fixtures: `app.eval.record_fixture --door
{attention,inbox}`.

**Generality:** 3 workspaces DISCOVERED — `hdfc_bank` · `icici_bank` · `infosys` across `banking`
and `it_services`. **Live:** HDFC 9 leads · Infosys 7 (+12 observations) · **ICICI 0**, the honest
degradation — three documents carry no comparison worth a lead. **No regression:** `pnpm test` web
**573** · contracts **228** · eval `--offline` **7 pass · 1 amber** (`relations`, the known stale
snapshot) · ruff / ruff format / mypy / lint / typecheck / format:check all clean.

**What landed (ADR 0122).** Read before built, which changed the slice: all **56** `measurement_gap`
buckets rung 5 named on three issuers paired *different measures sharing a concept*, revisions fired
on an inferred stance, and `why` printed the comparator's dict reprs.
- **A gap is ONE measure on two frames** (D1) — a structured `cause`, one predicate (`is_one_thing`)
  read by BOTH the findings projection and the evidence grid, so such a pair counts toward neither
  side.
- **A derived polarity neither revises, confirms nor establishes direction** (D2); **one key, one
  story** (D3); **copy is composed from structure**, the machine's own words appearing only in the
  inbox (D4).
- **An absence cites a PROCEDURE** — `provenance` XOR `AbsenceReceipt` (D5) — and its unit is WHAT
  IS ABSENT: one unheld filing is one lead listing every duty it would discharge; a missing
  disclosure is one duty's, by an authored name.
- **A judgment sticks only over what it saw** (D7): decisions are append-only in
  `finding_review_versions`, honoured only at the digest they were taken over, each grid cell's
  digest CERTIFIED at decision time.
- **One inbox, one door** (D8) — `GET /review/inbox` + `POST /review/decisions`, owed and optional
  counted apart; **leads by recency, never severity** (D9); `origins` vs `independent confirmations`
  as two names for two meanings (D10); probe discovery and a period fix (D11).
- **Divergence stays DEFERRED** (D6): computed and refused — all 34 candidate pairs across three
  issuers were unrelated, because a claim resolves to a concept and never to the line item a fact is
  filed under.
- Surface: `attention-module.tsx` / `attention-frame.ts` / `attention-api.ts`, `review-inbox.tsx`,
  `review-decision.tsx`; `findings-panel.tsx` **deleted**. Service:
  `app/findings/{attention,compute,absence,statements}.py`, `app/review/`, `app/routers/review.py`,
  `app/instants.py`. Contract: `packages/contracts/src/attention.ts` + its Pydantic mirror.

**Audit 1 (ADR 0123): a source toggle is a VIEW, not evidence.** Two P1s — switching off one of a
lead's documents moved its `version` and read a *not material* decision as "the evidence has
changed" (a version now moves only on a projection COVERING the workspace); and the probe's grid
gate keyed a missing filing on its FIRST duty only, so the analyst's own must-fire action could not
green it. Also: only a lead is reviewed (D3) · a derived direction confirms nothing (D5) · the
machine's verdict survives a correction (D6) · every decision per cell kept (D7) · `unnamed`/`named`
so declined + named accounts for every comparison (D8) · Ask agrees with the brief (D9) · the drawer
keeps focus and receipts across a refetch (D10).

**Audit 2 (ADR 0124): one rule, one object, one field list — the three ways a good rule fails to
arrive.** 0122's rule was right; it was implemented once, for one object, against one hand-picked
field list, and five of six defects are that.
1. **P1 · `observedVersion` could never name the evidence.** It is frozen under a narrowed view BY
   DESIGN (0123 D1) and so was blind to the one difference that mattered. `Finding.evidence`
   `{digest, complete}` and `observedEvidence` replace it.
2. **P1 · the write boundary MEASURES, never quotes.** It read the store's `evidence_digest`; it now
   takes its OWN covering computation at write time.
3. **P1 · a correction is honoured only over the propositions it was taken over** —
   `comparison_digest` + `ClaimComparison.correction.current`.
4. An absence digest is taken over the whole RECEIPT (D4), so a break widening from one absent
   quarter to three moves it — and the digest is **MEASURED**: every field hashed, or declared in
   `EXCLUDED_FROM_DIGEST` with its reason, because a list is something to remember.
5. ONE `machine_verdict` accessor (D5) · `moment_order` at all six call sites, one of which had
   written its wrong answer into the fact table (D6) · a negative about the record only where a
   search RAN (D7).

**Audit 3 (ADR 0125): a receipt is a property of the THING, not of the request that fetched it** —
and the part worth recording is that **two of audit 2's six new gates could not fire**, which makes
them defects of the slice under eval rule 1.
- **P1 · `evidence.complete` asked *was this REQUEST covering?*** — so one document still ingesting
  made every lead undecidable, and one unrelated toggle told an analyst they were seeing part of a
  lead that was whole. It is now measured per FINDING against the last covering computation.
- **P1 · `comparison_digest` took its two sides in the CALLER's order** while `_stable_id` sorts
  them, so a row-order change voided corrections and blamed the record.
- **The two dead gates** each recomputed the producer's own formula on the producer's own output, or
  restated what the contract already refuses to construct. Both are re-pointed at an INDEPENDENT
  witness — a second, NARROWED computation held against the covering one, and the ledger's own rows
  — and each now fails when its premise was never exercised.
- Also: ONE `duty_is_lead` above the producer and the grid (D5) · the record-negative rule reads
  both word orders, on both stacks, over COPY and never comments (D6) · `INSTANT_FIELDS` derived
  from the contract (D7) · the wire carries no sentinel default (D8).

**Open at sign-off — the human gate has NOT fired.** `finding_probe --store` and
`evidence_state_probe --store` each fail on exactly ONE gate, by design: `reviewed_not_material` /
"no analyst has recorded a *not material* decision". `finding_review_versions` holds **0 rows**, and
it is append-only, so this is not a decided-then-reopened state. Every other gate in both probes is
green. It closes the moment an analyst opens the brief's review inbox and marks one ABSENCE lead (a
coverage gap) not material; reopening resets it. Recording it from a script would manufacture the
green the gate exists to prevent, so it stays open and is carried in `SESSION.md` / `ROADMAP.md`.

**Meta — the routine found the SAME defect twice, and closed it with a gate rather than a rule.**
`LESSONS.md` carried **two §30s and two §31s** (rung 12's two lessons numbered over rung 6d's), so
`AGENTS.md` eval rule 10's citation of "§30" resolved to ADR 0116's story instead of 0124's; they
are renumbered **§36/§37** and AGENTS.md repointed. Adding rung 12's demo entry then found
`DEMO-FEATURES.md` carrying **two F33s**, each with its own detail section, while F12's row says
*"superseded in substance by F33"* and could no longer say which — rung 7's becomes **F40**, rung
12's new one is **F41**. Both registers are appended to over months, cross-referenced BY number
from other documents, and a collision renders perfectly, so neither is catchable by reading. The
repair is **gate 5 in `tests/test_docs_drift.py`** (`duplicate_ids`), with must-fire tests built
from both real collisions; ADR 0067 receipt taken against the reconstructed pre-fix files —
`{'30': 2, '31': 2}` and `{'F33': 2}` red, both green after. The `n4a-progress` skill gains the
authoring half (take the next free id, run the gate), mirrored to `.agents/` by
`sync-agent-config`. Also fixed: a `SyntaxWarning` printed on every pytest run (an unescaped
backtick in `taught_tombstones`' docstring).

**Not a regression, worth recording:** two `test_canvas.py` reaping tests failed the first full run
with `422 … already belongs to another canvas`. The store said why — node id `x2` was held by an
orphaned canvas in `ws-test-5d9fe97a`, one of three left by an earlier interrupted run, **one of
them titled "Keeper"**, which is **GOTCHAS #12** down to the test name and the title. Cleared with
the documented `DELETE … WHERE workspace_id LIKE 'ws-test%'` (3 canvases, 82 workbooks); green
after. The lesson the gotcha already states held: check the STORE before believing a failure is
pre-existing.

## Earlier history (archived)

This file is the **Block-L log** (the Library/Graph surfaces block). Older entries are preserved
verbatim, one file per era:

| Archive | Covers |
|---|---|
| `archive/PROGRESS-phase-2-block-l-brief.md` (reference outside this repository: `archive/PROGRESS-phase-2-block-l-brief.md`) | 2026-09-12 → 2026-09-22 — **Block L's first modules, rungs 10a → 11b** · the coverage brief and the citation's address · *What changed* · filed segment facts · *Business structure* · ADR 0105–0121 |
| `archive/PROGRESS-phase-2-foundation.md` (reference outside this repository: `archive/PROGRESS-phase-2-foundation.md`) | 2026-08-17 → 2026-09-05 — **Phase 2's substrate, rungs 3 → 9** · Block P · the sixteen analytical roles · `Signal` → `Finding` · the measurement frame and the fact substrate · Lane 2's cited numeric producer · the evidence-state read model · the shell and design foundation · the market-context receipt · ADR 0061–0104 · closed the day Block L opened |
| `archive/PROGRESS-phase-2-chartering.md` (reference outside this repository: `archive/PROGRESS-phase-2-chartering.md`) | 2026-07-27 → 2026-08-03 — **Phase 2 chartering and the four shaping decisions** (D1–D4) · ADR 0055–0060 · the pre-Phase-2 docs audit · closed the day the ladder was sequenced |
| `archive/PROGRESS-phase-1-library-rework.md` (reference outside this repository: `archive/PROGRESS-phase-1-library-rework.md`) | 2026-07-15 → 2026-07-25 — the **Library Analyst-Readiness rework**, 1A → 1G · ADR 0042–0054 · closed and signed off 2026-07-25 |
| `archive/PROGRESS-stage-3-canvas-dashboard.md` (reference outside this repository: `archive/PROGRESS-stage-3-canvas-dashboard.md`) | 2026-06-27 → 2026-07-11 — ss7 Library surface · the graph-improvement plan · hardening H1/H2 · ADR 0027–0029 · the docs consolidation · Dashboard S1–S3 + KB opt-in · **Canvas C1–C8** |
| `archive/PROGRESS-stage-1-history.md` (reference outside this repository: `archive/PROGRESS-stage-1-history.md`) | 2026-06-19 → 2026-06-25 — Stage-0 scaffold · ss1–ss6 · the foundation audit · the KG-construction brainstorms |

The decisions from those eras live in `decisions/` (reference outside this repository: `decisions/`); the architecture they produced is in
[`reference/ARCHITECTURE.md`](reference/ARCHITECTURE.md).

---

## How to update this file (for the `n4a-progress` skill / any session)

Append a dated entry under **Log** (newest on top) with: what changed, why, decisions made (link
ADRs), what is now runnable, and any meta-layer friction discovered. Then refresh the **Track
status** table above and `docs/SESSION.md` (the single source of live status). Do **not** re-add a
verbose "Current state / at-a-glance" section here — SESSION.md is the one-glance briefing (ADR
0032). Keep entries tight; link to code/ADRs rather than restating them. When a Stage completes,
roll its log entries into `archive/PROGRESS-stage-<n>-history.md` and leave a one-paragraph summary.
