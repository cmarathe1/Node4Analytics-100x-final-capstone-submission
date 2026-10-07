# N4A — Master Build Plan

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

> **status:** live · **authoritative for:** the stable Stage 0→5 arc and each stage's exit criteria ·
> **NOT authoritative for status** — [`SESSION.md`](SESSION.md) is the single live briefing and
> [`ROADMAP.md`](ROADMAP.md) is the forward backlog. **last verified against code:** 2026-07-29.
>
> The reference plan for building N4A from the prototype to a working investor demo. Read with
> [`reference/ARCHITECTURE.md`](reference/ARCHITECTURE.md) (how) and `DESIGN-SYSTEM.md` (frontend
> intent). This file is the stable map; update via the `n4a-progress` skill after each step.
>
> ⚠ **Read the checkboxes as a map, not a status board.** They were stale for a month before the
> 2026-07-27 docs pass corrected them (Stage-1 ss5 still read unchecked long after the knowledge graph
> shipped). If this file and `SESSION.md` disagree, **`SESSION.md` wins** — and fix this one.
>
> **Where the Library rework fits.** Stage 2 was executed as a dedicated program — the Library
> Analyst-Readiness rework, Phase 1 (1A–1G), closed and signed off 2026-07-25 (ADRs 0042–0054). Its
> sub-slice ladder is recorded in `LIBRARY-ANALYST-READINESS.md` (reference outside this repository: `LIBRARY-ANALYST-READINESS.md`), not
> re-litigated here.
>
> ⚠ **The five-surface arc below became SIX on 2026-07-29** (ADR 0057): **Library · Graph · Dashboard ·
> Canvas · Notes · Connectors**. Phase 2 splits the Library — the coverage brief stays in Library, the
> relationship workspace becomes its own top-level destination — so Stage 2's "the graph" bullet and
> "signals rail" bullet are re-scoped by `PHASE-2-CHARTER.md` (reference outside this repository: `PHASE-2-CHARTER.md`) and ADR 0055–0058.
> The **stage arc itself is unchanged**; what changed is what the flagship surface *is*.

## Build philosophy

**Walking skeleton, then thicken — not frontend-first-then-backend.** A pure frontend-first build risks
polishing UI against backend assumptions that later break (especially with real Indian data + GraphRAG).
Instead:

1. **Contract-first.** Freeze the graph schema + API DTOs (`packages/contracts`, OpenAPI) up front so
   tracks build in parallel against a shared, frozen interface.
2. **One thin vertical slice end-to-end** (Stage 1) proves the riskiest path: real filing → ingest →
   graph → grounded answer that focuses the subgraph. Everything risky is de-risked here, small.
3. **Then go deep on the Library — the flagship and foundation — to full fidelity** (Stage 2), *before any
   other surface* (ADR 0013). The Library **builds the substrate** (L0–L3, the entity/attribute spines,
   structured claims, the signals engine, retrieval) that every other surface consumes; nailing it
   depth-first de-risks in dependency order and lets shared concerns (e.g. global conviction) be built once,
   correctly. Depth-first ≠ polish-from-day-one — the skeleton (step 2) still goes first to de-risk.
4. **Then thicken the other four surfaces in parallel tracks** (Stage 3) — Dashboard, Canvas, Notes,
   Connectors — each already knowing the contract holds and the substrate is real.
5. **Integrate & polish** (Stage 4), then **harden the demo** (Stage 5).

> Every slice is **manually verified by the user before it counts as done** (ADR 0013) — build a slice,
> hand over a "Verify this slice" card, and wait for sign-off before running the progress routine.

> The prototype's *visual* completeness is a gift: it removes UI ambiguity, so backend/AI can move first
> without guessing what the frontend needs. We port UI surface-by-surface as each backend slice lands.

## The five tracks (run in parallel once contracts are frozen)

| Track | Owner agent / skill | Scope |
|---|---|---|
| **A · Frontend** | `frontend-builder` | Port the 5 surfaces to Next/React + `packages/ui` design system; wire to API. |
| **B · Backend/API** | `contract-keeper` + claude | FastAPI resources, Postgres schema, BFF route handlers, auth. |
| **C · AI/ML** | `ai-pipeline` | Routed ingestion (4 lanes) + dual-spine resolution + structured claims (ADR 0011), hybrid GraphRAG retrieval, **computed** signals engine, provider-router. |
| **D · Data** | `data-connector` | Indian connectors: yfinance, NSE/BSE filings, fundamentals, news RSS. |
| **E · Auth/Security** | claude + `design-reviewer` | Auth.js, secrets, rate limits, provenance integrity, file scanning. |

Parallelism rule: a track may start when its **inputs in the contract are frozen**. Frontend can build
any surface against the frozen contract; AI/Data can build against the schema without the UI.

**Sequencing note (ADR 0013):** the tracks run, but they point at the **Library first** — A–E all build the
Library to full fidelity (Stages 1–2) *before* the other four surfaces are thickened (Stage 3).

---

**Checkbox legend:** `[x]` done & user-verified · `[~]` partially delivered, remainder in
[`ROADMAP.md`](ROADMAP.md) · `[ ]` not started.

## Stage 0 — Foundation  *(complete — 2026-06-22)*

Goal: a repo any new Claude/Codex session can pick up and contribute to immediately.

- [x] Read prototype + design system; lock product decisions (see `RESEARCH.md`).
- [x] Write `RESEARCH.md`, `ARCHITECTURE.md`, `PLAN.md`, `PROGRESS.md`, ADRs.
- [x] Write AI-tool ground rules (`AGENTS.md`, `CLAUDE.md`) + project skills & agents.
- [x] Scaffold monorepo: pnpm + Turborepo, `apps/web` (Next 15), `services/ai` (FastAPI),
      `packages/{ui,contracts,config}`.
- [x] `infra/docker-compose.yml`: Postgres 16 + pgvector + **Apache AGE** (one store). Health-checked;
      both extensions verified live (`vector 0.8.3`, `age 1.6.0`).
- [x] Extract the **design tokens** from the prototype into `packages/ui` (Tailwind v4 `@theme`); added
      the missing `--amber-soft` token.
- [x] Freeze `packages/contracts` (display graph schema **+ the L3 structured-claim schema §3.1**, core
      DTOs) + the **FastAPI OpenAPI skeleton — the real seam, stubbed `501`**. No throwaway mock (ADR 0012).
- [x] CI: lint/typecheck/test for both stacks; pre-commit hooks (lefthook).

**Exit criteria (met):** `pnpm dev` boots the web shell; the FastAPI service boots (`/healthz` + the typed
OpenAPI surface); `docker compose up` gives Postgres+pgvector+AGE; `packages/contracts` builds and is
honored by both sides (zod in web + Pydantic mirror in the service); local lint/typecheck/test green on both
stacks (CI workflow defined). Mock dropped per ADR 0012.

## Stage 1 — Walking skeleton (one real vertical slice)

Goal: prove the core loop on **one real Indian company** (flagship **Infosys**, ADR 0007).

> **Decomposed + test-gated (ADR 0013).** This Stage bundles data + AI + API + frontend — too big for a
> single manual verification. Build it as the **smallest testable vertical sub-slices** (e.g. fetch + parse
> one filing and see it land → embed/extract/graph → `/ask`), and **stop after each for the user's manual
> sign-off** before continuing.

- [x] **Data:** fetch one real annual-report PDF (Infosys AR, `LocalFileConnector`). *(quotes/fundamentals
      via yfinance + Lane-2a/2b structured KPI feeds deferred to a later stage — ADR 0017.)*
- [x] **AI (ss1–ss3):** parse → chunk → **embed (L2)** on the real doc; stored in Postgres (ADR 0014/0015/0016).
- [x] **AI (ss4) — retrieval `/ask` (ADR 0017/0018):** grounded LLM synthesis over **hybrid** retrieval
      (vector + keyword → **RRF** → **MMR**), built as the §11 kernel/router seam, **non-bypassable citation
      enforcement**, honest **decline** for numeric-KPI / graph / signals routes. Chat provider-router
      (`complete`/`stream`/`list_models`: Anthropic + OpenAI + offline extractive). Closed the ss3 gap on the
      real Infosys AR (synthesized, cited margin answer, p.82); user-verified 2026-06-24.
- [x] **AI (ss5) — the L3 knowledge graph, then signals (ADR 0019).** ss5 splits into **two parts in order:
      build the knowledge *structure* first, compute *signals* on top second** (signals stand on the graph;
      the graph emits nodes + structural edges, signals compute the semantic edges over the shared key —
      invariant #9). **Part 1 (the graph)** decomposes into four manually-gated sub-slices:
  - [x] **ss5a — the spines.** Derive the **attribute spine** (hybrid: small user-curated **coarse** lens +
        corpus-derived **fine** metrics, ADR 0011 §7 / ADR 0019) + seed the **entity spine** (Indian-IT
        basket). *Spine-before-claims, or contestation silently fails.* **No claims/graph yet — the user
        reviews the derived taxonomy.** *(Done & verified, ADR 0020.)*
  - [x] **ss5b — the claim core.** **Atomic-fact** extraction (not page-window chunks) over the AR's Lane-3
        narrative → **EDC two-spine resolve** (embedding-first, LLM-residual) → relational claim tables.
        Precision-gated against a small gold set. *(Done & verified, ADR 0021 — subjects open-propose,
        off-lens attributes drop; precision controls + 8/8 gold set. V3 follow-up: subject-typing guard.)*
  - [x] **ss5c — the connection layer.** Add the **seeded / high-confidence** entity↔entity edges (never
        free-extracted from prose) + assemble the full **layered** graph. Relational source-of-truth;
        **Apache AGE deferred** to a later projection (ADR 0019).
  - [x] **ss5d — dynamic merge.** Ingest a **second** source; incremental cross-document entity resolution
        (`Gᵗ = Gᵗ⁻¹ ⊕ Gₛᵗ`) — verify cross-doc identity holds (the graph is genuinely *dynamic*).
  - [x] **Part 1 complete** (ss5a–d, ADRs 0020–0023): spines → claim core → connection layer → dynamic merge.

- [x] **Milestone 1.5 — generalize the foundation + make it real in the UI (ADR 0024).** *Inserted before
      signals after the ground-up audit reframed N4A as a **general research substrate** (company / industry /
      portfolio / M&A across sectors), not a single-company IT demo. The narrowness is in seed data + prompts
      + heuristics, not the architecture — so this is mostly relocating assumptions into data/config + fixing
      the audit's precision findings, then **building the Library UI so the foundation is judgeable**.* **Nail
      this — user-signed-off through real UI/UX — before any signal is computed.**
  - [x] **C · generalize the spine:** attribute spine = **universal analytical frame (coarse) + sector/corpus
        drivers (fine)**; reclassify today's 14 IT attributes; seed a **second sector's** drivers to prove the
        frame generalizes. Entity spine seeded from a **market master / the documents** (sector-tagged), not a
        hand basket. (ADR 0024 §2/§4)
  - [x] **C · de-narrow + precision fixes (audit):** parameterize the extraction prompt by filer + doc-kind +
        sector (kills the hardcoded "Infosys", #1); real **publication date** for `asserted_at` (#2);
        **contestation at fine granularity** + stated-vs-defaulted period flag (#4/#5); within-source
        restatement dedup (#3); neutral-attribute contestation off `quant.direction` (#7); graph aggregates
        near-duplicate claims (#8). (ADR 0024 §3/§5)
  - [x] **A · the Library surface, for real:** sources panel (ingested docs + `ent · claims · cites` line) →
        knowledge graph (`GET /graph`: entity + claim nodes, force layout off React state) → **Ask N4A** (the
        live grounded, cited answer) — **provenance on everything**. Enough to *use and judge* the foundation,
        not yet the full Stage-2 fidelity.
  - [~] **API/Auth:** `/documents`, `/graph`, `/ask` (streaming) live against real data; demo login gates the
        workspace.
  - [x] **Prove generality through the UI** on a **multi-source, ideally cross-sector** corpus (e.g. Infosys +
        a second source on it + a non-IT name) and **user-verify via real UI/UX**.

- [~] **Part 2 — signals + graph-couple `/ask`** *(after Milestone 1.5 is signed off).* The **computed**
      signals engine — now firing at **fine granularity** on the **general** spine (ADR 0024 §3) — over the
      shared key (needs **one contrasting independent source** so *contested* can fire), then graph-couple
      `/ask` (the `retrieve()` seam gains the graph leg + `focusNodeIds` — no rewrite). *(The broader
      "signal = surface the highlights" framing vs. the frozen deterministic enum is a Part-2 brainstorm
      item — ADR 0019.)*

**Exit criteria:** From a clean DB, ingest one real filing and watch `parse→embed→graph` progress, see
real nodes appear, ask a question, get a **grounded, cited** answer that lights up the graph — all on
real Indian data, switchable across ≥2 LLM providers.

## Stage 2 — Library to full fidelity (the flagship, depth-first)

> **Status: delivered as the Library Analyst-Readiness rework, Phase 1 (1A–1G) — closed and signed off
> 2026-07-25** (ADRs 0042–0054). The belief layer beneath this stage is done: source passports and
> authority-at-acquisition · the run substrate · the element evidence model · the typed concept
> registry · decision-grade propositions with deterministic comparison · the business-model connection
> layer. **Still open from the list below:** the full five-signal rail (only computed *comparison* ships
> today), Lane 2b operational KPIs, and the source-discovery agent. **Phase 2 — the analyst-experience
> phase — is chartered (2026-07-29): `PHASE-2-CHARTER.md` (reference outside this repository: `PHASE-2-CHARTER.md`), ADR 0055–0058.** It
> re-scopes two bullets below — the graph moves to its own top-level destination, and the "signals
> rail" becomes **research leads** with re-cut families. Read the charter before building from this
> list. Backlog view: [`ROADMAP.md`](ROADMAP.md) §1.

Take the Library from walking skeleton to the prototype's full behavior **before any other surface**
(ADR 0013) — it builds the substrate every other page consumes. Build as vertical sub-slices, each
manual-test-gated:

- **Sources + ingestion:** the 4 extraction lanes for real — incl. **Lane 2a** (statutory financials via a
  structured feed) + **Lane 2b** (operational KPIs via the quarterly fact sheet), ADR 0017 — **Add** menu
  (upload / pull from feed / paste link), live per-doc progress, the **include/exclude eye**, the
  `ent · claims · cites` stat line, collection chips, the ingestion banner. *(A NotebookLM-style
  **source-discovery agent** — "search the web to seed the corpus" — is a **forthcoming brainstorm**, ADR
  0017; an acquisition role, distinct from Ask.)*
- **The graph:** force sim **off React state**, three layouts (Force / Radial / Clusters), progressive
  disclosure, hover preview card, node inspector + **Evidence**/Connections, category + edge legends, zoom.
- **Signals rail:** the **computed** signals engine (contested / corroborated / central / emerging /
  revised) over the structured claim key `(subject, attribute, period)`, count tiles, filter chips,
  click-to-focus. Detect-and-present, never adjudicate.
- **Ask N4A (full):** routed hybrid retrieval, multi-provider switch, citation chips, suggested questions,
  and **subgraph focus on every answer** — the graph + signals routes added behind the same `retrieve()`
  seam stood up in Stage 1 ss4 (ADR 0017), no rewrite.
- **Shared/global bits, surfaced here first:** the conviction store + provenance polish — built once,
  correctly, since the other surfaces inherit them.

**Exit criteria:** the Library matches the prototype end-to-end on real Infosys data; every output carries
provenance; signals are computed (not LLM-guessed); the graph sim stays off React state; tokens-only with
light/dark parity. **User-verified.**

## Stage 3 — Thicken the other four surfaces (parallel tracks)

> **Status: half delivered.** **Dashboard** S1–S3 + the KB-opt-in rework (ADR 0033) and **Canvas**
> C1–C8 (ADRs 0034–0041) are built and user-verified. **Notes** and **Connectors** are not started;
> Dashboard S4 (BSE XBRL filing-grade upgrade) is deferred. See [`ROADMAP.md`](ROADMAP.md).

With the substrate proven, take the remaining surfaces from skeleton to full fidelity. Run as parallel
sessions/agents, each bound by `packages/contracts`.

- **Dashboard:** real Indian market data → watchlist (sparklines + conviction), sortable screener
  (unit-aware ₹ lakh/crore parsing), compare board, conviction board, news feed, alerts, metric boards;
  bento edit mode (drag-reorder, width stepper, custom-metric builder, add-board modal).
- **Canvas:** React Flow node editor — file/news/AI/table/chart/report nodes, ports, typed edges
  (context/data/live), drag-to-connect & drag-to-create picker, mid-edge insert, run AI node (real),
  inspector, minimap, snap guides, tidy-up. Presence optional (behind a flag).
- **Notes:** research journal — list + sticky board, source badges, star vs global-pin, `@`-references
  (real linking to tickers/sources/nodes), quick-capture from any page.
- **Connectors:** real connector registry — AI models (provider-router status), data feeds (NSE/BSE/news),
  MCP/plugins, permissions + connect/manage, status dots.

**Exit criteria:** every surface matches the prototype's behavior on real data, all outputs carry
provenance, conviction/pins/notes stay globally consistent.

## Stage 4 — Integration & polish

- [ ] Cross-surface consistency (conviction/pins/notes shared store; capture-from-anywhere).
- [ ] Canvas AI pipelines execute end-to-end (source node → AI node → table/chart/report) on real data.
- [ ] Charts with real tooltips/axes (the design-doc gap). Light/dark parity; `--amber-soft` token added.
- [ ] Accessibility pass (aria-labels, focus styles, keyboard paths for canvas/graph).
- [ ] Persistence everywhere (no state lost on reload); optimistic updates.

## Stage 5 — Demo hardening

- [ ] Seed an impressive **Indian-market demo dataset** (chosen theme/basket) with pre-ingested filings.
- [ ] Performance: graph at scale, ingestion latency, streaming smoothness.
- [ ] Deploy (Vercel + Railway/Render + Neon, or chosen host). Demo script + reset path.
- [ ] Observability: request/cost tracing for LLM calls; error surfaces.

---

## Working agreement (how we run this with AI tools)

- **One step at a time, user-verified (ADR 0013).** A "step" = a coherent slice (a surface, a pipeline
  stage, a connector). When the slice is built, **stop and hand the user a "Verify this slice" card**
  (clean-run reset commands · bring-up · do-this · expect · reset) and wait — the **user is the final
  arbiter**. *Only after sign-off* run the **`n4a-progress`** skill: review the diff against the invariants
  (`ARCHITECTURE.md §9`), update `PROGRESS.md`, append an ADR if a decision changed.
- **Auto-improve.** `n4a-progress` ends by asking "what slowed us down?" and updates the relevant
  skill/agent/ground-rule (the **`n4a-improve`** loop). The meta-layer gets better as we go.
- **New session?** Run **`n4a-onboard`** first — it reads PLAN + PROGRESS + ARCHITECTURE + design system
  and reports exactly where we are and what's next.
- **Parallel work:** spin a track agent (`frontend-builder`, `ai-pipeline`, `data-connector`) per surface,
  each scoped to its track, all bound by `packages/contracts`. Use git worktrees for isolated branches.
- **Definition of done (every slice):** matches design intent · provenance present · tokens-only styling ·
  contract honored · typed · tested · **user manually verified & signed off** · `PROGRESS.md` updated.

## Dependency map (what unblocks what)

```
Stage 0 contracts ──▶ everything
Postgres+pgvector ──▶ Track C (AI), Track B (API)
Track D (one connector) ──▶ Stage 1 AI slice
Stage 1 skeleton ──▶ Stage 2 (Library to full fidelity, depth-first)
Library substrate (Stage 2) ──▶ Stage 3 (other four surfaces, parallel)
packages/ui tokens ──▶ Track A (all surfaces)
Signals engine (C) ──▶ Library signals rail (A)
```
