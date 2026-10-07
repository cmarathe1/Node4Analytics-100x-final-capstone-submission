# N4A — Research Log & Technology Decisions

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](../README.md) for current scope.

> **status:** reference · **authoritative for:** why each technology and product choice was made ·
> **last verified:** 2026-07-27.

> Living record of the research behind each major technology choice. When a choice is
> revisited, append a dated note rather than deleting — we want the reasoning trail.
> Last updated: 2026-06-22.

## Locked product constraints (from the user, 2026-06-19)

| Decision | Choice | Implication |
|---|---|---|
| Target | **Investor / portfolio demo** | Impressive end-to-end; keep infra lean (no billing/heavy multi-tenancy), but architecture stays SaaS-ready. |
| Stack | **TS app + Python AI service** | Next.js/TS front + FastAPI Python AI service. Contract-first boundary between them. |
| Data | **Indian markets, real from day one** | Swap the prototype's US 10-Q/EDGAR contract for NSE/BSE filings, Indian fundamentals, Indian news. No mock data path as the primary build. |
| LLM | **Multi-provider from the start** | Provider-agnostic router (Claude + OpenAI + Gemini). Matches the model switcher in the mockup. |
| Brand | **Node4Analytics (N4A)** | Company = Node4Analytics; product/UI brand = N4A. ("FinQuira" is only a local folder name, not the brand.) |
| Demo basket | **Indian IT services, Infosys flagship** | Infosys → TCS/HCLTech/Wipro/LTIMindtree. The GenAI tailwind-vs-threat thesis showcases contested signals (ADR 0007). |
| Sources | **Dynamic, user-configurable connectors** | Pluggable registry: free defaults now, paid connectors added with user keys later (ADR 0008). |

---

## 1. Indian market data (real from day one)

The prototype assumed US-style sources ("10-Q p.14", EDGAR). For India there is **no single free
EDGAR-equivalent**, so we compose several sources behind a connector abstraction.

**Chosen for the demo build:**
- **Prices / quotes / historical** — `yfinance` with `.NS` (NSE) / `.BO` (BSE) ticker suffixes. Free, no key, reliable enough for a demo. Powers Dashboard watchlist/screener/metrics.
- **Fundamentals** (P&L, balance sheet, ratios, shareholding) — start with what `yfinance` exposes; enrich from **screener.in** style data where needed (respect ToS; cache aggressively). Paid fallback: **FinEdge API** / RapidAPI NSE-BSE financial data if we need clean structured statements.
- **Filings / annual reports / concall transcripts** (the RAG documents that build the knowledge graph) — **NSE corporate filings & annual reports**, **BSE corporate announcements**, **SEBI** filings. These PDFs are the Indian analogue of 10-Q/10-K and are what `parse → embed → graph` ingests.
- **News** — RSS from Moneycontrol / Economic Times / LiveMint / Business Standard for the feed + "Theme" graph nodes.
- **Broker APIs (optional, later)** — ICICI **Breeze** (free), Angel One **SmartAPI** (free), Zerodha **Kite** (paid) for real-time/intraday if the demo needs live ticks.

**Why this shape:** every source sits behind one `Connector` interface (matches the Connectors page), so we can upgrade `yfinance` → a paid feed without touching the app. Filings are the differentiator — they feed the graph; prices are commodity data for the dashboard.

Sources: [Indian-Stock-Market-API (yfinance wrapper)](https://github.com/0xramm/Indian-Stock-Market-API) · [NSE corporate filings](https://www.nseindia.com/companies-listing/corporate-filings-annual-reports) · [BSE announcements (Trendlyne)](https://trendlyne.com/bse-corporate-announcements/) · [SEBI corporate filings](https://www.sebi.gov.in/curation/corporate_filings.html) · [FinEdge API](https://www.finedgeapi.com/) · [Screener annual reports](https://www.screener.in/annual-reports/) · [ICICI Breeze](https://www.icicidirect.com/futures-and-options/api/breeze)

## 2. Retrieval: hybrid vector + graph RAG ("GraphRAG done pragmatically")

State of the art (2026): **production stacks use vector + graph hybrid, routed by query type.**
Vector RAG wins point lookups; graph RAG wins global / multi-hop "how does it all connect"
questions — which is exactly N4A's pitch. Full **Microsoft GraphRAG** is accuracy-strong but its
indexing cost was historically huge; **LightRAG / LazyGraphRAG** cut indexing cost 50–6000× with
comparable multi-hop accuracy.

**Chosen:** a **lightweight LightRAG-style pipeline we control**, not a heavyweight framework:
`parse → chunk → embed (pgvector) → LLM extraction of entities/claims/relations → store typed graph in Postgres`.
Query path routes: factual lookup → vector search; "what's contested / most central / how connected"
→ graph traversal over the typed edges. This keeps the **graph schema as the backend contract**
(see `ARCHITECTURE.md`) and avoids a $$$ indexer.

Sources: [Graph RAG in 2026 — what actually works](https://medium.com/graph-praxis/graph-rag-in-2026-a-practitioners-guide-to-what-actually-works-dca4962e7517) · [When to use Graphs in RAG (arXiv 2506.05690)](https://arxiv.org/html/2506.05690v3) · [Microsoft GraphRAG](https://microsoft.github.io/graphrag/) · [GraphRAG/LightRAG 2026 guide](https://medium.com/@tongbing00/graphrag-in-2026-a-practical-buyers-guide-to-knowledge-graph-augmented-rag-43e5e72d522d)

## 3. Datastore: Postgres + pgvector (one database)

Under ~100M vectors, **pgvector is the simpler, correct starting point** — one service,
transactional consistency, SQL you already know; `pgvectorscale` keeps it competitive with dedicated
DBs at moderate scale. Qdrant is faster at raw scale but adds a second service we don't need for a demo.

**Chosen:** **Postgres 16 + pgvector** as the single store for relational data, embeddings, **and** the
knowledge graph (adjacency tables + recursive CTEs; optionally Apache AGE for Cypher later). Redis only
if/when we need a real ingestion queue.

Sources: [pgvector vs Qdrant (Encore)](https://encore.dev/articles/pgvector-vs-qdrant) · [Vector DB comparison 2026 (4xxi)](https://4xxi.com/articles/vector-database-comparison/) · [Choosing a vector DB 2026 (KnowSync)](https://www.knowsync.ai/blog/choosing-vector-database-qdrant-pinecone-pgvector-2026)

**Update 2026-06-21 — Apache AGE confirmed (no Neo4j).** Unbiased re-research: AGE is an Apache top-level
project (PG 11–18) and **Microsoft ships AGE + pgvector as its official GraphRAG-on-Postgres stack** —
graph + vectors in **one transaction, no cross-store sync**, the key provenance win. Caveat: AGE is not
index-free adjacency (variable-length paths bypass indexes — Trendyol's 2026 case), immaterial at our
scale (shallow 1–3 hop traversals; Signals precomputes the heavy ones). Ladder: adjacency CTEs now → AGE
when queries get rich → Neo4j only on a *measured* bottleneck. The four storage formats are modeled as
layers L0–L3 (ADR 0009). Sources: [Combining pgvector + AGE (Microsoft)](https://techcommunity.microsoft.com/blog/adforpostgresql/combining-pgvector-and-apache-age---knowledge-graph--semantic-intelligence-in-a-/4508781) · [GraphRAG for Azure Postgres](https://techcommunity.microsoft.com/blog/adforpostgresql/introducing-the-graphrag-solution-for-azure-database-for-postgresql/4299871) · [Trendyol → AGE (the traversal caveat)](https://medium.com/trendyol-tech/migrating-graph-operations-to-apache-age-from-writes-to-reads-3b8334628e1c) · [Apache AGE](https://age.apache.org/)

## 4. Multi-provider LLM gateway

2026 gateways matured into routing/failover infra. Trade-off: managed (Vercel AI Gateway, OpenRouter)
vs self-hosted (LiteLLM — note the **March 2026 PyPI supply-chain compromise of 1.82.7/1.82.8**, so pin
versions if used).

**Chosen:** keep all LLM reasoning **inside the Python AI service** behind a thin **provider-router
module** wrapping the official SDKs (`anthropic`, `openai`, `google-genai`). Optionally front it with
**OpenRouter / Vercel AI Gateway** for breadth, but the router is ours so failover and model-switching
(the mockup's Claude→GPT→Gemini→Local cycle) are first-class. The Next.js app renders streamed answers
via the **Vercel AI SDK**, but the provider keys/logic live server-side in Python only.

Sources: [AI gateway comparison 2026 (Inworld)](https://inworld.ai/resources/ai-gateway-comparison) · [Best LiteLLM alternatives 2026](https://inworld.ai/resources/best-litellm-alternatives) · [OpenRouter alternatives 2026 (Pinggy)](https://pinggy.io/blog/best_ai_llm_routers_openrouter_alternatives/)

## 5. Frontend graph & canvas libraries

Two different visualisations, two different right tools:
- **Canvas page (n8n-style node editor)** → **React Flow / `@xyflow/react`** — purpose-built for
  node-based UIs with rich React nodes, ports, edges, pan/zoom, minimap out of the box (36k★, actively
  maintained May 2026). DOM nodes cost raw perf on huge graphs but buy the full React ecosystem inside
  each node — exactly what the AI/source/report node cards need.
- **Library knowledge graph (force-directed, circles, progressive disclosure)** → **`react-force-graph-2d`**
  (d3-force under the hood) or d3-force + a custom canvas/SVG renderer. The prototype already implements a
  velocity-Verlet sim; porting to d3-force is clean and keeps the "alive, explorable" feel. Cytoscape.js is
  the WebGL fallback if node counts explode.

Sources: [React Flow / xyflow](https://reactflow.dev/) · [awesome-node-based-uis](https://github.com/xyflow/awesome-node-based-uis)

## 6. Frontend app stack

- **Next.js 15 (App Router) + React 19 + TypeScript** — SSR/streaming, route handlers as the BFF.
- **Tailwind CSS v4** with the prototype's tokens as CSS custom properties — Tailwind v4's CSS-first
  `@theme` maps 1:1 onto the doc's "recreate the token layer first" rule.
- **Zustand** for client state (the design doc explicitly recommends Zustand/Redux; graph physics stays
  in a ref/worker, off React state) + **TanStack Query** for server state.
- **Recharts** (fast) or **visx** (custom) for dashboard charts — the doc flags charts as a known gap.
- **Vercel AI SDK** for streaming AI chat rendering.

## 7. Open items to confirm with the user (non-blocking)

Resolved 2026-06-19: brand = **Node4Analytics (N4A)**; demo basket = **Indian IT, Infosys flagship**
(ADR 0007); data = **dynamic user-configurable connectors**, free-first then paid (ADR 0008).

Still open:
- Final **deployment host** (Vercel + Railway/Render + Neon is the assumed default).
- **Which paid fundamentals/market API** to add later (FinEdge / RapidAPI / broker) — decide when free
  sources' gaps start blocking the demo; user is willing to pay reasonably at the right stage.

## 8. AI architecture & memory (2026-06-21)

Decided the cross-cutting AI model: a **blackboard** (shared substrate L0–L3 + event/provenance log),
**not** an agent swarm — chosen because N4A's #1 invariant is provenance and agent-to-agent chatter breaks
the citation chain. One **kernel of composable primitives**, each role a thin composition declared via a
profile (ADR 0010). `enforceCitations()` is non-bypassable middleware; context assembly is separated from
the agent; **tools are the extensibility surface**; in Canvas the user's edges are the scope spec.

**Memory** reuses the substrate (no parallel memory store): raw transcripts (L0/L1) + note/conversation-
derived claims in the graph (L3), tagged `source`/`trust` so user-curated facts outrank AI-extracted ones.
This consciously diverges from generic "three-layer agent memory" patterns (facts → episodes → raw
sentences) by *reusing the knowledge graph as the fact layer* rather than standing up a second system. An
episodic layer and telemetry-driven personalization are deferred; reactive AI ships before proactive.

## 9. Domain-fit knowledge model — claim schema, dual spines, temporal model (2026-06-22)

Refined the knowledge model from a generic GraphRAG schema toward the **information structure of financial
research** (ADR 0011). The reasoning trail:

- **Why structured claims, not free-text nodes.** N4A's hero signal is *contested* (ADR 0007), and
  contestation is only mechanically computable if claims share a normalized key — `(subject, attribute,
  period)` + directional polarity. With free-text claims, `supports/contradicts` edges must be *guessed* by
  the extractor (unreliable across documents/time, unexplainable). With a key, contestation is a
  **deterministic signals-engine query** — explainable, and able to catch conflicts the model never saw side
  by side. We chose a **semi-structured** claim (key + polarity + optional quantitative slot + body) over a
  fully structured quad (too brittle; drops qualitative claims like "GenAI cannibalization risk") and over
  free-text + embeddings (unexplainable, unreliable live). This mirrors how financial-research tools
  normalize language (AlphaSense-style topic/synonym normalization; Daloopa-style normalized line items).

- **Why two resolution spines.** Entity resolution (Infosys = INFY = INFY.NS) gets all the attention, but
  *attribute* resolution (operating margin = EBIT margin = "margins") is what actually makes contestation
  fire — and it was the missing pipeline stage. Same mechanism, applied to the predicate: one resolver, an
  **entity spine** and a **two-level attribute spine** (coarse for contesting, fine for citing), hybrid
  (seeded + open-propose → resolve → promote). Contents are derived empirically from the corpus, not
  enumerated up front.

- **Why bitemporal-lite.** A claim has two times — the **referent period** (what it describes) and the
  **assertion time** (when it was said). Conflating them is the classic financial-data trap: FY23 vs. FY24
  margin looks like a contradiction but is a time series. We adopt point-in-time discipline *lite*: store
  both, require overlapping referent period for contestation, distinguish **supersession** (same lineage,
  frame-compatible semantic revision/restatement) from **contestation** (independent sources disagree),
  classify actual-vs-guidance as `variance_to_expectation`, and keep adjacent periods as a time series. Full
  as-of replay (bitemporal reconstruction) is deferred but reachable — assertion time is stored from day one.

- **Why detect-don't-adjudicate.** The strongest defense against injected bias is to *not* decide who is
  right: compute and **present** conflicts with both sides cited and authority shown, and let the analyst
  judge. Reinforced by directional (not good/bad) polarity, counting **independent sources not documents**
  (the financial-news echo-chamber), authority shown not hidden-weighted, and a **pinned extraction model**
  so multi-provider routing never changes what counts as contested. Residual bias → auditability (provenance
  to L0) + a user-correction loop (`VALIDATION-BACKLOG.md` V1/V2).

- **Why a router, not one pipeline.** Financial inputs are heterogeneous shapes (tables, prose, dialogue,
  structured records); one "chunk + embed" lane discards the structure that *is* the signal. Ingestion routes
  each input into one of four lanes by information shape, all converging on the shared schema.

Domain references (practice, not single URLs): point-in-time / bitemporal data modeling; financial-NLP
normalization (AlphaSense, Daloopa, Bloomberg-style line-item taxonomies); structure-aware document
extraction. These informed the model; the schema is ours (ADR 0011).

## 10. 1F user/workflow research — decision-grade evidence propositions (2026-07-21)

**Primary user decided:** a fundamental Indian public-equity analyst (buy-side or independent) who
repeatedly updates company coverage after filings, results, calls, presentations, broker research and
news. The serious self-directed investor is secondary. The job is not "extract claims"; it is to determine
what changed, who owns the statement, whether the comparison is valid, and whether the evidence is safe
enough to update a view.

Evidence behind the 1F recharter:

- A survey of 344 buy-side analysts found primary disclosures more useful than calls/guidance for stock
  recommendations, while sell-side research added industry knowledge and access. N4A therefore anchors on
  first-party evidence but preserves independent interpretation and challenge.
  ([CFA Institute study](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2458544))
- CFA's analyst workflow and standards center on collecting evidence, analysing company economics and
  earnings, reaching recommendations on a reasonable basis and retaining records—not on retrieval alone.
  ([role](https://www.cfainstitute.org/programs/cfa-program/careers/research-analyst),
  [research process](https://rpc.cfainstitute.org/policy/positions/analyst-research-process))
- Indian research practice emphasizes company financials, earnings quality and industry conditions; the
  regulatory environment rewards documentary basis and auditability.
  ([SEBI investor guidance](https://investor.sebi.gov.in/research_analyst.html))
- Incumbent products already teach users to expect speaker/time-aware transcript search, source context and
  exact citations. These are table stakes; N4A's differentiation is safe typed comparison, visible coverage,
  Indian FY/unit correctness and analyst-owned correction.
  ([Quartr](https://quartr.com/features/transcript-search),
  [AlphaSense](https://help.alpha-sense.com/hc/en-us/articles/52886436185363-Reviewing-Documents-in-AlphaSense))
- Finance-specific evaluations show that fluent retrieval is not reliable financial reasoning, and an
  Indian benchmark finds numerical/temporal reasoning especially discriminative. This supports separate
  critical-field gates and Indian-corpus tests rather than one aggregate quality score.
  ([FinanceBench](https://arxiv.org/abs/2311.11944),
  [IndiaFinBench](https://arxiv.org/abs/2604.19298))

**Product implication (ADR 0053):** 1F emits decision-grade propositions from context-preserving evidence
bundles, separates document roles from originating voice, models temporal relations semantically, exposes
structural/targeted/open coverage, and proves one append-only analyst correction. Claim count is explicitly
not a success metric. External research sets the hypothesis; the closing analyst read and
`VALIDATION-BACKLOG.md` V5 remain the user-validation gate.
