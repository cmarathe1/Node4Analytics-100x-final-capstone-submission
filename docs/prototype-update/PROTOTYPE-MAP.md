# Prototype update — a map of `N4A-Prototype.html`

> **status:** working (temporary) · **authoritative for:** where things are in the 16,285-line
> prototype at baseline, how a company's data is bound, and how to drive the file headless ·
> **last verified:** 2026-10-05 against `102c2ef` (line numbers drift from the first edit — re-grep
> the banner or symbol; update this file when a section moves for good).

## 1. The file at a glance

One hand-built file: CSS (tokens → primitives → shell → one block per surface), static HTML
skeleton, then one `<script>` with a ~150-line `data-act` delegation core, company data registries
and one render module per surface. No build, no network. Fonts: system-ui + Iowan/Palatino stacks
(L123–125) and an embedded mono. 262 `data-act=` handlers.

## 2. CSS (`<style>`)

| Lines | Section |
|---|---|
| 9–172 | header comment + **tokens** (`:root`, `[data-theme=dark]`) |
| 173–333 | §2 reset + primitives |
| 334–623 | §3 app shell (rail 340–419) |
| 624–1158 | §4a Library `.lib-` |
| 1159–1497 | §4b Graph `.gr-` (grid 308 / canvas / 356 at L1174) |
| 1498–2115 | §4c Canvas `.cv-` (edges 1521–1541; unused `flowdash` 1531) |
| 2116–2286 | §4d Dashboard `.db-` |
| 2287–2339 | §4e Notes `.nt-` |
| 2340–2400 | §4f Connectors `.cn-` |
| 2401–2435 | §4g Log in `.lg-` |
| 2436–2699 | §4h Console `.hm-` |
| 2700–2923 | §4i Source intake `.ing-` |
| 2924–3061 | §4j Account settings `.st-` |
| 3062–3096 | §5 guided tour |
| 3097–3175 | §6 responsive + motion (≤1000 px rail rules 3130–3138; orphaned `.cv-stages` / `.cv-caption` 3116–3128) |

## 3. HTML skeleton

| Lines | Element |
|---|---|
| 3176–3216 | nav rail (`#wsMark`, `#wsName`, `#wsSub` workspace chip) |
| 3217–3249 | main: `.topbar` (3219–3237, `#crumbPage`), `#pages` with one `section.page` per surface (3240–3245) |
| 3250–3284 | log in (`#login`, `#loginForm`, `#lgEmail`) |
| 3285–3307 | account settings sheet |
| 3308–3336 | platform home / console (`#home`, header `hm-top` 3317–3333) |
| 3337–3367 | overlays (drawer, modal, toast) |
| 3368–3405 | source intake (`#intake`, `#ingFoot`) |
| 3406–3432 | guided tour spotlight |

## 4. Script — core and per-surface modules

| Lines | Module | Key symbols |
|---|---|---|
| 3433–3535 | core | `ICON` 3458 · `ico()` 3514 · `fmt` 3520 (`fmt.pct` uses a hyphen minus) |
| 3536–3915 | account layer + state + delegation | `S` 3593 · `ACTS` 3631 · `on()` 3632 · `toast()` 3674 · `drawer()` 3813 · `NAV` 3855 · `RENDERERS` 3863 · `MOUNTED` 3864 · `renderNav()` 3866 · `go(page)` 3887 (writes the hash) · `toggleRail` ~3908 |
| 3916–5428 | **Infosys data** (workspace `ws-infy`) | `PROFILE` 3946 · `TODAY` 3961 · `DOCS` 3967 (8 docs) · series ~4398–4471 · `GAP_INR` ~4910 · canvas board: sections 4776–4783, nodes 4785–4822, wires 4830–4841, workbook sheets 5057–5116, memo 5201–5229 · not-loaded legacy board pieces 4994–5051, 5179–5195, 5231–5287 · graph `GNODES`/`GEDGES` ~4647/~4692 · Ask ~4746 · notes 5339–5357 · connectors 5368–5425 |
| 5429–5686 | Graph node-detail depth | per-node figures, quotes, notes (uncited, A-30) |
| 5687–6076 | market module | `marketModule()` 5940 |
| 6077–6656 | **Library** | `renderLibrary()` 6438 (head 6453 · evidence frame 6466 · market 6488 · how it works 6491 · attention 6514 · structure 6526 · what changed 6586 · timeline 6612) · timeline axis hard-coded ~6188 |
| 6657–7058 | Library overlays | `EVIDENCE` 6666 (Infosys facsimiles) · lead drawer 6904–6949 · `leadToGraph` ~6950 · source history ~6972 · "No facsimile" toast ~7008 |
| 7059–7758 | **Graph** | `grSeed()` 7079 · community hubs 7097–7121 · `COMMUNITY_GROUP` 7103 · `GSIM` 7123 · force sim 7141–7205 · `paintGraph()` 7212 · label cut at 18 chars ~7255 · origin bar 7272 · Details/Scope tabs 7283 · toolbar 7296–7315 · legend 7325 · zoom 7331 · Scope panel ~7440 · Details ~7457 · Ask panel ~7550–7630 (`grAsk` ~7630, A-36) · Table 7641 · search 7747–7757 |
| 7759–10550 | **Canvas** | port rules 7801–7811 · `cvBoot()` 7813 · layout plan 7864–7921 · wire kinds 7960 · scope 7992 · input hash 8056–8079 · RENDERING 8128 · NODE BODIES 8366 · EDGES+CHROME 8758 · inspector 8921–9035 · `CV_MODELS` 9036 · VIEWPORT 9039 · `cvGoStage()` 9072 · RUNS 9089 · `cvHaystack()` 9142 · memo decline 9163–9200 · ACTIONS 9236 · section delete 9348–9377 · step picker 9512–9519 · new step `answer:''` ~9543 · INTERACTIONS 9565 · FOCUS VIEWS 9995 · assistant rail / receipts ~10340–10426 · SHARING 10450 (modal 10456–10526) |
| 10551–11073 | **Dashboard** | `COMPANIES['ws-infy'] = {…}` 10673 · `renderDashboard()` 10695 · conviction 10690 · falsifiers ~10761–10971 · `dbConv` ~10914 · custom board ~11025 |
| 11074–11240 | **Notes** | `renderNotes()` 11095 · capture ~11237 |
| 11241–11435 | **Connectors** | `renderConnectors()` 11258 · `switchWorkspace` handler ~11376 · search placeholder ~11409 |
| 11436–11803 | **Walkthrough / tour** | Infosys steps 11456–11643 · `buildTour()` 11653 · `endTour()` 11780 |
| 11804–14262 | **HDFC Bank data** (workspace `ws-hdfc`) | `HDFC_PROFILE` 11833 · `HDFC_DOCS` 11849 (12 docs) · story/mechanism ~12399–12451 · series ~12306 · leads ~12545–12562 · graph ~12578–12690 · timeline ~12983–13063 · `HDFC_EVIDENCE` 13069 · dashboard 13289–13348 · notes 13367–13385 · legacy six-stage canvas 13462–13605 (not loaded) · `HDFC_DEMO_*` canvas 13622–13699 · HDFC tour ~14019–14148 · `COMPANIES['ws-hdfc']` 14231 |
| 14263–14283 | Log in | `showLogin()` 14272 · `signIn()` 14278 |
| 14284–14779 | Platform home / console | `coverage(C)` 14312 (computes coverage age; never drawn) · `renderHome()` 14487 · `showHome()` 14759 · `hideHome()` 14766 · `openWorkspace` handler ~14770 |
| 14780–15039 | Account settings | |
| 15040–15105 | Source intake intro | |
| 15106–15951 | **Hindustan Unilever** (third company, no workspace) + intake engine | `HUL_DOCS` 15128 · `HUL_GNODES` 15183 · `HUL_GEDGES` 15216 · `HUL_GDETAIL` 15242 · `'ws-hul'` template 15270 · `INTAKE` 15287 · `intakeBuild()` 15335 · pacing ~15393–15406 · `renderIntakeHead()` 15645 · `openIntake(mode, wsKey)` 15877 |
| 15952–16139 | the file chooser (intake) | drop zone 16110–16126 · "This demonstration stops here" toast ~16092–16099 |
| 16140–16232 | workspace binding | `bindCompany(key)` 16164 · `syncWorkspaceChip()` |
| 16233–16285 | boot | `boot()` — light theme default, renders all, routes the hash, wires sign-in |

## 5. How a company is bound

`COMPANIES[key]` holds one object per workspace (`'ws-infy'`, `'ws-hdfc'`; HUL is a template at
15270, not a workspace). `bindCompany(key)` reassigns these module-level `let`s **by reference**:

`PROFILE TODAY DOCS GAPS MARKET KPI PERIODS SERIES SEGMENTS GEO LEADS GNODES GEDGES GDETAIL ASK
SUGGESTIONS CV_SECTIONS CV_NODES CV_EDGES CV_PLAN CV_COMMENTS CV_CURSORS CV_BOOKS CV_DOCS CV_TABLES
CV_HISTORY TL_EVENTS TL_GAPS TL_LANES EVIDENCE LIB_NARRATIVE LIB_MECH LIB_MECH_NOTE LIB_MECH_SRC
STRUCT SEG_NOTE SCORECARD NOTES CONNECTORS VIEW FALSIFIERS DECISIONS SINCE DBB TENSION HEALTH
BOARD_TITLES TOURS`

…then rebuilds derived state (`DOC`, `ISSUER_KEYS`, `PX_DMA`, graph `GP`/`GBY`/`GADJ`/`DEGREE`,
canvas `CN`/`CE`/`CS`), resets view state, and re-runs every renderer. **A new data field must be
added to that destructuring list and to both companies**, or one company's data is left behind on a
surface. `GEDGES` is normalised from arrays to objects at bind — index it as objects
(the 2026-08-12 incident: 0 of 47 edges landed while the panel looked fine).

## 6. Driving it headless

- It opens at **sign-in**; while `S.login` is true the hashchange handler ignores the hash. A hash
  naming a destination (`#graph`) on a **fresh load** deep-links past sign-in; on the same document,
  call `signIn()` or set `S.login=false` and remove `#login.show`, then `hideHome()`.
- Switch company: `bindCompany('ws-hdfc'); go('library')`.
- The Library scrolls inside the **first child of `#page-library`** (not the page, not `#pages`;
  HDFC's brief is ~4,150 px tall at 1600×1000), so a full capture needs a viewport grown to hold that
  scroller, then clips.
- `tools/shoot.mjs` does all of this — every surface, both companies, Library in readable bands.
- `node scripts/verify-prototype.mjs` boots the file against a DOM shim and asserts derived
  coverage, attribution of graph objects, intake order, simulation stop, and second-company parity
  (261 checks at baseline). It is not a renderer — layout and truth are not its job.
