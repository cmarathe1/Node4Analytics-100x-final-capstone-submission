# N4A Workspace — Design System & Implementation Reference

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](docs/README.md) for current scope.

> **What this is.** A complete, granular spec of the N4A research-workspace prototype as built — every token, component, layout, interaction, and the reasoning behind each decision. Use it as the source of truth when you design the real frontend.
>
> **Product in one line.** N4A is an AI-native investment-research workspace: it lets an analyst pull every source they trust into one place (filings, news, market data, models, AI), reason over them on an infinite canvas, track conviction on a customizable dashboard, capture insight as notes, and explore how everything connects in a live knowledge graph — with **provenance on every output**.

---

## 0. Reading guide

The doc goes **foundations → shell → components → patterns → per-page detail → behaviors → props → principles → gaps**. Each item lists *what was implemented* and *why*. Concrete values (hex/oklch, px, weights) are given verbatim so the real build matches the prototype exactly.

The prototype is a single self-contained file (`N4A Workspace.dc.html`) with three parts:
- a **template** (markup),
- a **logic class** (`Component extends DCLogic`) holding all state + derived render values,
- a tiny **props** block (`accentColor`, `presence`).

All styling is **inline** and driven by **CSS custom properties** defined once in `:root` (light) and `[data-theme="dark"]` (dark). This is the single most important structural fact: **there are no CSS classes** — every color, surface, and shadow is a `var(--token)`. When you rebuild, recreate the token layer first; everything else references it.

---

## 1. Foundations

### 1.1 Color system

Colors are defined as CSS variables and **never hard-coded** in components (with deliberate exceptions for pure white `#fff` on accent fills, and a couple of one-off "amber soft" backgrounds noted below). Two themes share the same variable names; only the values change.

#### Brand / accent
| Token | Light | Dark | Use |
|---|---|---|---|
| `--accent` | `#6C4CF1` | `#8B6BFF` | Primary actions, active nav, links, focus, "N4A" AI identity |
| `--accent-2` | `#8E73FF` | `#A78BFF` | Hover state of accent buttons, gradient partner |
| `--accent-soft` | `#EFEBFE` | `#241C46` | Accent-tinted backgrounds (active nav row, badges, soft buttons) |

> **Reasoning.** A single violet accent gives the product one confident identity color. Violet reads as "intelligent / software-native" without the over-used SaaS blue, and crucially it's *distinct from* the semantic up/down greens and reds so AI actions never get confused with market direction. `--accent-2` exists purely so hover is a lighter tint of the same hue (energy on hover) rather than a darker one. `--accent` is also the one token exposed as a **tweakable prop** so the whole product can be re-skinned from one value.

#### Semantic / market direction
| Token | Light | Dark | Use |
|---|---|---|---|
| `--up` | `#15976A` | `#34C892` | Gains, positive deltas, "supports", BUY, triggered-positive |
| `--up-soft` | `#E4F4ED` | `#14271F` | Up-tinted backgrounds (badges, corroborated tiles) |
| `--down` | `#DB4F3D` | `#FF6B57` | Losses, negative deltas, "contradicts", destructive/delete |
| `--down-soft` | `#FBE9E6` | `#2A1714` | Down-tinted backgrounds, delete-hover |
| `--amber` | `#C98A1A` | `#E0A93B` | Caution / "contested" / "watching" conviction / overvaluation flags |

> **Reasoning.** Finance needs an unambiguous up/down vocabulary that the eye reads pre-attentively. The greens/reds are intentionally **desaturated and slightly muted** (not pure `#00C000`/`#FF0000`) so a dense screener of green/red numbers stays calm and legible rather than alarming. Amber is the third "it's complicated" signal — used everywhere there's genuine ambiguity (contested claims, watching-but-not-committed conviction). *(Historic note: the prototype had no `--amber-soft` and hard-coded `#FBF1DD` in two places. **The real token package has shipped it since** — `packages/ui/src/tokens.css`, light `#fbf1dd` and dark `#2a2012`. §10's "missing token" bullet was stale and is corrected.)*

#### Neutrals / surfaces
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FAFAFB` | `#08080B` | App background (behind main column) |
| `--panel` | `#FFFFFF` | `#141419` | Cards, sidebars, popovers, top bar — the "raised" surface |
| `--panel-2` | `#F5F5F7` | `#1B1B22` | Inset surfaces: inputs, hover fills, secondary buttons |
| `--panel-3` | `#EFEFF2` | `#23232B` | Deepest inset: progress-bar track, shimmer mid-tone |
| `--border` | `#EAEAEF` | `#26262F` | Default hairline divider/outline |
| `--border-2` | `#E0E0E6` | `#32323C` | Stronger border on hover / emphasis |
| `--text` | `#17171C` | `#F2F2F6` | Primary text |
| `--muted` | `#6C6C78` | `#9A9AAA` | Secondary text, body copy, inactive labels |
| `--faint` | `#9A9AA6` | `#62626E` | Tertiary text, captions, placeholder, disabled |
| `--canvas` | `#F1F1F4` | `#0B0B0F` | Infinite-canvas + graph backdrop (one notch darker than `--bg`) |
| `--dot` | `#D5D5DD` | `#212129` | Canvas dot-grid dots |

> **Reasoning.** A **three-step surface ramp** (`panel` → `panel-2` → `panel-3`) plus a **three-step text ramp** (`text` → `muted` → `faint`) is enough to build the entire hierarchy without ever inventing a one-off gray. Elevation reads through surface lightness + shadow, not borders alone. The canvas/graph backdrop (`--canvas`) is deliberately *darker than the app bg* so floating white node-cards pop — the opposite of the rest of the app, where panels are lighter than bg. This inversion is what makes the canvas feel like a distinct "workspace surface."

#### Categorical node palette (the most deliberate color decision)
Defined in **OKLCH** with a *shared lightness and chroma, only hue varies* — so the six node categories feel like one family, not six random colors. Each has a `-soft` companion (very high L, very low C, same hue) for fills.

| Token (light) | OKLCH | Maps to | `-soft` |
|---|---|---|---|
| `--cat-source` | `0.56 0.15 252` (blue) | File / document / "Source" graph cat | `0.955 0.028 252` |
| `--cat-feed` | `0.64 0.14 64` (amber-orange) | News feed / "Theme" graph cat | `0.955 0.034 70` |
| `--cat-ai` | `0.55 0.20 285` (violet) | AI assistant / "Claim" graph cat / data edges | `0.955 0.030 285` |
| `--cat-data` | `0.58 0.11 192` (teal) | Table / "Source" doc cat | `0.955 0.028 192` |
| `--cat-viz` | `0.58 0.13 232` (cyan-blue) | Chart / "Person" graph cat | `0.955 0.030 232` |
| `--cat-output` | `0.57 0.13 156` (green) | Report / "Metric" graph cat | `0.955 0.030 156` |
| `--cat-alert` | `0.59 0.17 22` (red-orange) | reserved for alert nodes | `0.955 0.034 22` |
| `--cat-segment` | `0.58 0.12 140` (olive) | "Segment" graph cat (business vertical) | `0.955 0.030 140` |
| `--cat-geography` | `0.58 0.13 330` (muted rose) | "Geography" graph cat — a place the company operates in (ADR 0028) | `0.955 0.032 330` |
| `--cat-entity` | `0.59 0.16 42` (terracotta) | "Entity" graph cat (external actor: client / supplier / partner) | `0.955 0.034 42` |

The last three are the **Phase-5 harvest** categories. `--cat-geography` (ADR 0028) is its own category, split out of `--cat-segment`: *where* a company operates and *what verticals* it reports are different analyst questions, so a place gets a distinct hue, legend chip, and filter toggle. Hue 330 sits clear of position-violet (285) and alert-red (22).

In **dark mode** the same hues are used but lightness is raised (`~0.70–0.76`) and the softs become low-L tints (`0.30 C~0.06`) — so categories stay recognizably "the same color" while remaining legible on a near-black canvas.

> **Reasoning.** This is the backbone of the whole product's legibility. Node type must be identifiable *at a glance and at any zoom*, including by the accent rail and the icon chip. Picking colors in OKLCH with **locked L+C** guarantees no single category screams louder than another (equal perceived weight) — impossible to achieve reliably in hex/HSL. `--cat-ai` is intentionally the same violet family as `--accent`, tying "AI" visually to the brand. Note `--cat-ai` doubles as the **data-edge** color on canvas, reinforcing "data flows out of AI."

#### Status / misc
| Token | Value | Use |
|---|---|---|
| `--run` | `oklch(0.55 0.20 285)` (light) / `0.74 0.18 285` (dark) | Node "running" state, spinner |
| `--ok` | `#15976A` / `#34C892` | success (mirrors `--up`) |
| `--err` | `#DB4F3D` / `#FF6B57` | error (mirrors `--down`) |
| `--guide` | `#F24E8E` / `#FF6FA5` | Figma-style alignment/snap guides (hot pink) |

> **Reasoning.** Snap guides use a **hot pink that appears nowhere else** — exactly like Figma. A color reserved for one transient meaning is instantly readable as "this is an alignment hint," with zero risk of being mistaken for data.

### 1.2 Typography

> **2026-07-15 revision (ADR 0044).** Moved from a single Grotesk to a **three-voice system** —
> the earlier one-family setup read as generic/AI-authored (a common tell). The intent is a
> distinct, editorial-but-technical pairing.

Three families, loaded from Google Fonts, each with **one job** (`--font-display` / `--font-sans` /
`--font-mono` tokens):
- **Instrument Serif** (`--font-display`) — a **sharp, high-contrast display serif**, used **only at
  ≥18px** for surface titles, dialog headlines, empty-state lines, big editorial numbers. Never body.
  This is the voice that makes the product feel authored, not templated.
- **Instrument Sans** (`--font-sans`) — a **technical sans with strong tabular figures** (`tnum` on
  by default via `font-variant-numeric: tabular-nums` on `body`); all UI and prose.
- **JetBrains Mono** (`--font-mono`) — every number, ticker, metadata, keyboard shortcut, type label.

Base: `font-size:14px; line-height:1.45;` with `-webkit-font-smoothing:antialiased;
text-rendering:optimizeLegibility;` and `letter-spacing:-.01em`/`-.02em` tightening on larger
headings. **Display serif is set tighter and larger** (leading-none/snug at 19–34px).

> **The display serif is a hard gate, not a suggestion.** A serif used at body sizes reads as a
> word-processor document; at ≥18px on titles it reads as editorial confidence. If a title is under
> 18px it stays in the sans — do not shrink the serif to fit.

Historical note: the prototype and Stages 1–3 shipped on **Hanken Grotesk**; any code still naming
it (e.g. canvas `ctx.font` draws) should migrate to `"Instrument Sans"` as it's touched.

#### Type scale as actually used (px)
| Role | Size / weight | Notes |
|---|---|---|
| Big metric numbers | 34px / 800, `-.03em` | dashboard metric boards |
| Conviction stance | 26px / 800, `-.02em` | conviction board |
| Section/topbar title | 15px / 700, `-.01em` | page title, board headers, modal titles |
| Brand "N4A" | 16px / 800, `-.02em` | sidebar logo |
| Card title | 13.5px / 700 | board headers, note titles, source rows |
| Body / prose | 13px / 1.55, `--muted` | note bodies, descriptions |
| Standard UI label | 12.5–13px / 500–600 | buttons, nav, list rows |
| Node card title | 12.5px / 700 | canvas node headers |
| Small label / meta | 11–11.5px / 500–600, `--faint`/`--muted` | timestamps, sublabels |
| **Eyebrow / section caps** | 10–11px / 700, `letter-spacing:.05–.08em`, `text-transform:uppercase`, `--faint` | "WORKSPACE", "FILTER", "EVIDENCE", "TYPE" |
| Micro labels | 9–10px / 700 (often mono) | node kind labels, status pills, badges |

> **Reasoning.** **Grotesk + Mono is the canonical "fintech-but-modern" pairing** — Hanken Grotesk is warmer and rounder than Inter (which we explicitly avoid), giving personality without sacrificing neutrality; JetBrains Mono makes every number tabular and scannable, and signals "this is data" wherever it appears. The rule is strict and worth keeping: **any figure, ticker, percentage, market cap, P/E, timestamp, or keyboard hint is mono; everything else is Grotesk.** The uppercase tracked eyebrow at 10–11px/700 is the single repeated device for sectioning panels — cheap, consistent, and instantly legible as "group label."

### 1.3 Spacing, radius, sizing

- **Spacing** is informal but consistent: card padding `11–16px`, gaps `6–14px`, page gutters `18–24px`, section bottom-margins `24–26px`. Dense surfaces (node bodies, screener rows) run tighter (`5–11px`).
- **Radius ladder:** `5–6px` (micro pills, shortcut keys) → `7–9px` (buttons, inputs, small chips) → `10–11px` (rows, larger buttons) → `13–14px` (cards, popovers) → `18px` (modals) → `50%` (avatars, ports, dots). Sticky-notes use an asymmetric `4px 4px 11px 11px` to feel "peeled."
- **Control heights:** primary buttons `34px`, secondary/compact `30–32px`, icon buttons `26–28px` (in-card) / `34–38px` (toolbars). Inputs `~36px`.
- **Hit targets:** toolbar tools `38×38`, canvas control buttons `36×36`, node ports `16–18px` — small visually but with generous crosshair cursor + hover scale.

> **Reasoning.** The radius ladder is the main thing that makes the UI feel cohesive: **smaller elements get smaller radii, larger containers get larger radii**, so corner curvature stays visually proportional (a 5px radius on a modal would look sharp; a 14px radius on a shortcut key would look bloated). Heights cluster around 30–38px — comfortable for a dense pro tool without being chunky. The intentionally tiny but high-feedback node ports come straight from node-editor convention (n8n/Figma): the *interactive* area is bigger than the *drawn* dot, and hover scale (`1.22×`) confirms targetability.

### 1.4 Elevation (shadows)

Three named tiers, redefined per theme:
| Token | Light | Role |
|---|---|---|
| `--shadow-s` | `0 1px 2px rgba(20,20,35,.05), 0 2px 6px rgba(20,20,35,.04)` | resting cards, buttons |
| `--shadow-m` | `0 2px 8px /.06, 0 16px 40px /.08` | node cards, inspector, dashboard board hover |
| `--shadow-l` | `0 6px 16px /.10, 0 28px 64px /.14` | popovers, modals, minimap, selected node, dragged sticky |

Dark mode uses pure-black shadows at much higher opacity (`.4–.6`) since soft shadows are invisible on near-black.

> **Reasoning.** **Two-layer shadows** (a tight contact shadow + a wide diffuse one) read as real physical elevation far better than a single blurred box-shadow. The blue-black tint (`rgba(20,20,35,…)`) instead of neutral black keeps shadows from looking muddy against the cool-gray surfaces. Elevation maps to interaction priority: resting (s) → floating object (m) → "above everything / demands attention" (l).

### 1.5 Motion

Keyframes defined once: `dashmove` (marching ants on temp edges), `flowdash` (flowing dashes on live edges), `pulse` (LIVE dots, thinking dots, processing), `fadein` (4px rise — inspector), `popin` (scale .9→1 — popovers/menus/context toolbars), `shimmer` (200% sweep — AI generation skeleton), `spin` (loaders), `ringpulse` (selection ring).

Durations: micro-feedback `.1–.15s`; transitions on size/transform `.14–.18s`; ambient loops `1–1.6s` (pulse), `1.2s` (shimmer), `1.4–1.5s` (flow). Easing defaults to `ease`; collaborator cursors use `cubic-bezier(.4,0,.2,1)` over `1.6s` for a smooth glide.

> **Reasoning.** Motion is split into two jobs. **Transient UI** (menus, toolbars, inspector) uses fast scale/opacity `popin`/`fadein` (~120–150ms) so it feels instant but not jarring. **Ambient "this is alive" motion** (pulsing LIVE dots, flowing edges, shimmer skeletons, roaming cursors) runs on slow 1–1.6s loops — present in peripheral vision, never distracting. The shimmer skeleton specifically signals "the AI is actually working" rather than a static spinner, which makes a faked latency feel like real computation.

#### Motion doctrine (2026-07-15, ADR 0044) — "a well-timed mechanism"

Motion exists to show something **going somewhere it already had to go** — a menu arriving, a value
updating — never as decoration. One ease, three durations, both tokens (invariant #2):

- **`--ease-mech`** = `cubic-bezier(0.2, 0, 0, 1)` — fast start, firm settle, **zero overshoot**.
  Bound as the Tailwind `ease-mech` utility. This is the *only* transition ease new work should use.
- Durations: **micro 120ms** (hover/press feedback) · **base 160ms** (transitions, entrances) ·
  **large surfaces 220ms** (a panel sliding). Existing per-surface durations stay; new work uses these.
- **`animate-mech-in`** (`--animate-mech-in`) — the one entrance for transient surfaces (menus,
  dialogs, popovers): a 160ms opacity fade + **3px** settle. No scale, no spring.

Motion must **NOT**: bounce, overshoot, or spring; parallax-scroll anything; animate continuously or
loop *except* the three legitimate "alive" ambients above (LIVE pulse, edge flow, shimmer — each
tied to real state); use atmospheric blur/glow as decorative filler; or delay content visibility past
the ~1200ms first-load budget (fonts use `display=swap`; skeletons show immediately, never a blank
hold). Scroll-triggered animation is minimal — content is present on load, it does not "arrive" as
you scroll.

> **Reasoning.** Bounce/spring easings and looping decorative motion are the strongest "designed by
> a template" tells — they signal movement-for-its-own-sake. A single asymmetric cubic-bezier that
> decelerates hard into place reads as *mechanical precision*, which is exactly the register a
> research tool wants: things move because they have a destination, and they arrive with authority.

### 1.6 Iconography

All icons are **inline SVG, 24×24 viewBox, stroke-based** (`stroke-width:1.8–2.4`, `stroke-linecap:round`, `stroke-linejoin:round`, `fill:none`), drawn at 11–22px. `stroke="currentColor"` so an icon inherits its parent's text color (set the color on the wrapper, the SVG follows). A few are filled (play triangle, grip dots, pin when active).

> **Reasoning.** A single icon language — **outline, rounded, ~2px stroke** (the Lucide/Feather idiom) — keeps the whole product visually coherent and is the right weight for a dense pro tool: thin enough not to shout, heavy enough to read at 12px. `currentColor` is what makes the categorical-color system cheap: one icon path is reused across light/dark and across every tint just by changing the wrapper color. **No emoji, no filled/duotone mixing** (deliberately avoided as AI-slop tropes).

**Icons earn their place; they don't decorate (2026-07-15, ADR 0044).** An icon may appear only when
it *classifies or acts* — a menu verb (delete, hide), a state (running spinner, error), a control
(chevron, checkbox). It may **not** be a generic label ornament: no file-type glyph next to a
filename the section already classifies, no icon-in-a-tinted-circle as a heading flourish, no
feature-tile icons. If a spot wants a graphic and no icon *means* anything there, use **type** (a
serif line) or a **meaningful mark** (the authority dot, whose color encodes the tier) instead. Any
graphic element should look like it was extracted from the product itself — a real node, a real
mark — never stock illustration, isometric art, mascots, or abstract blobs.

---

### 1.7 Anti-generic doctrine (what keeps this from looking AI-authored)

The tells that make an interface read as machine-generated, and the standing rule against each. These
apply **everywhere on the platform**, not just the surface that prompted them (ADR 0044):

| Tell | Rule |
|---|---|
| Default/stock color choices | Only `--*` tokens; the OKLCH categorical family and the single violet accent are the identity — never a raw hex or a generic Tailwind color. |
| One flat sans everywhere | The three-voice type system (§1.2): serif display ≥18px, tabular sans body, mono figures. A page with no serif and no mono is a red flag. |
| Wordiness / descriptive text everywhere | **Say it once.** No helper paragraph under a control whose label already says it; no chip that repeats the row title; tooltips carry the long form, not the layout. Cut every sentence that doesn't change what the user does next. |
| Pill / chip / card fatigue | A pill must encode a *fact* (the authority dot+word). Don't wrap plain text in a rounded tinted box for emphasis — use weight/color. Prefer a quiet divider to a boxed card when grouping. |
| Icon soup | §1.6 — icons classify or act; type and meaningful marks fill the rest. |
| Text cropped / hard to reach | Nothing important is clipped; menus open on-screen and dismiss on outside-click/Escape; hit targets are reachable, not half-hidden behind siblings. |
| Decorative motion | §1.5 — mechanism ease, no bounce/spring/parallax/loops-for-looks. |
| Isometric/mascot/blob art | Banned. Graphics are extracted from the product (a real mark, a real node). |


> **Added 2026-08-12: absence is not an error, and red is a reservation.**
> Rose/`--ev-gap` had one token comment covering *"contradiction or missing"*, and that licensed one
> colour for two unlike things. The result was that a page whose whole point is honest gaps painted
> every gap in the loudest colour it owns, dragging the eye to the one thing nobody can act on and
> spending the colour a real contradiction needs. The grade is by **what the state costs the
> analyst**, following Carbon's status ladder:
>
> | tier | means | examples |
> |---|---|---|
> | **neutral** (grey) | the record does not hold it. Nothing is wrong | `not_acquired` · `not_parsed_or_modelled` · `reviewed_not_material` · `not_applicable` · the coverage-boundary line · a dashed gap in a series |
> | **amber** (`--warn`) | needs your judgement | `incompatible` / a basis break · `not_disclosed` (which needs a positive expectation, ADR 0064) · `processing_failed_withheld` |
> | **red** (`--ev-gap`) | the record contradicts itself, or an action destroys | a `contradicts` edge · a contested claim · an uncited AI output · delete |
>
> Absence is carried by **typography and a label**, never a colour or a container: the coverage
> boundary reads `NOT IN SCOPE  No peer filings · …` in the muted voice. `verify-prototype.mjs`
> asserts the grade, including that a real contradiction *keeps* the red, since a reservation that
> reserves nothing buys nothing.

> **Added 2026-08-13: how a transient notice behaves.** One component carries every message the
> product sends, so it is worth designing once. **Read at the top** — bottom-centre is where an
> *undo* belongs, attached to the row it just changed; system state is read at the top. **In the
> page's palette, never inverted against it**: an inverted block is the loudest object a light page
> owns, so *Saved* shouted exactly as hard as *Draft declined*. One tinted icon tile carries the
> only colour, toned from the four existing families, never a fifth. **A title and a detail line**,
> not one long sentence; detail is sentence-cased only when it is prose, since `ar26` and `p.12`
> are worse capitalised. **Duration is read from the text** (about a second per three words over a
> base, floored so a notice cannot leave before it is read), it is **dismissible**, hovering
> **pauses** the countdown, and **two at a time** is the cap. Full rule: ADR 0075.
>
> **The product opens LIGHT, on every machine.** Following the OS made "what does N4A look like"
> un-answerable. Dark is a choice the analyst makes, one switch away in Appearance.

> **Added 2026-08-12: two overlay rules, both about not losing the place you came from.**
>
> **A detour is a sheet; a workflow is a page.** Choose by whether the user needs the underlying
> screen **kept**. Account settings is a detour taken mid-task from the console, with four short
> read-mostly sections, so it is a large sheet with its own nav on the shared overlay stack — which
> is where Escape, the scrim, focus trapping and focus restoration already live. Reimplementing any
> of those on a bespoke full-screen layer is how a surface ends up with no way back but a chevron.
>
> **Friction on a destructive action is proportionate to the LOSS, never to the word.** Three tiers
> — *immediate* (one object: a toast naming what went with it) · *confirm* (more than one object, or
> a container holding objects) · *typed gate* (a whole workspace, and it is the **only** one in the
> product). The gate takes the **resource name**, exactly and case-sensitively, because a generic
> word confirms *that* you meant to delete and only the name confirms **which**. The manifest of
> what goes is **derived from the object**, so it cannot understate the loss as the object grows.
> A typed gate on a routine action is melodrama, and melodrama is what trains people to type past
> it. Full rule: ADR 0073.

> **Reasoning.** None of these is about taste-for-taste; each is a specific pattern that correlates
> with "a template filled this in." The cure is almost always **subtraction** (fewer words, fewer
> boxes, fewer ornamental icons) plus **one deliberate distinctive choice** (the serif, the tokened
> palette, the mechanism motion). A dense research tool earns trust by looking *considered*, and
> considered reads as restraint, not decoration.

---

## 2. The persistent shell

> **Superseded in two places by ADR 0069 (reference outside this repository: `docs/decisions/0069-workspace-object-model-and-the-platform-layer.md`) (2026-08-12).**
> **(a)** The shell is not the outermost thing. A **platform layer** sits above it — where coverage
> is created and tracked — drawn as a layer *over* the shell, never a page inside the page body,
> because the page body is scoped to one workspace and the platform layer is what *contains*
> workspaces. It is **not a seventh nav destination**.
> **(b)** A workspace is **one company under coverage**, so §2.1's switcher subtitle
> ("Semiconductors '26 · Personal · 6 sources") describes an object model that no longer exists: the
> switcher names a *company*, and its subtitle is that company's evidence. Nav is also six, not five
> (Graph joined — ADR 0057).
>
> **Source intake** (`create` / `add`) is a **flow**, not a destination: one overlay built on the
> existing overlay system, adding **no new tokens**. Its per-document terminal states are the
> evidence-state patterns of §4, not per-component CSS.

Two regions wrap every page: the **top navbar** and the **page body** (ADR 0139 replaced the left
rail). Root is `display:flex; flex-direction:column; height:100vh; overflow:hidden` — the app never
scrolls as a whole; only inner panes scroll.

### 2.1 Top navbar (48px) — `components/app-navbar.tsx`, ADR 0139
- One row, `--panel`, bottom hairline, `gap:20px`, padding `0 12px 0 18px`.
- **Left:** "N4A" in the display serif (22px) — a link to the Library — then the six surfaces in
  `NAV_ORDER` (Library · Graph · Canvas · Dashboard · Notes · Connectors): 12.5px/600 `--muted`,
  hover `--text`; the current one `aria-current="page"`, `--text` on `--panel-2`. Unbuilt surfaces
  are visibly disabled (`--faint`, *Not built yet*), never working-looking links. Every link
  carries the workspace.
- **Right:** the workspace, STATED (the covered company's name where the surface knows it, else the
  id; no chevron — there is no workspace list to pick from) · the AI service's health as an 8px dot,
  in words only when degraded · the theme as an icon button.
- **≤ 760px:** the surfaces fold into one disclosure naming the current surface.

> **Reasoning.** A rail cost every surface 64–236px of width it needed for its own panes, while each
> surface repeated its name, the workspace and the health chip in a header of its own. One bar
> holds all of it once. A picker that opens nothing, and "service up" printed on every page, are
> chrome an analyst learns to ignore — the one time it says *running old code* must be read.

### 2.2 Top bar (54px) — prototype only
The prototype's per-page bar, kept for reference; the built app carries a surface's own controls in
its own header, and navigation in §2.1. Fixed height, `--panel`, bottom border, `z-index:30`. Left → right: **page title + subtitle** (changes per page from a `titles` map), **center command bar** (`min(420px,100%)`, "Ask N4A or search tickers, notes, sources… ⌘K"), then right cluster: **quick-capture**, **pinned tray**, **notifications** (with red dot), **New** (accent button).

> **Reasoning.** One **persistent command/search bar** ("Ask N4A *or* search…") collapses search and AI-ask into a single affordance — the core bet that asking and finding are the same gesture in an AI-native tool. The right cluster holds the two genuinely cross-page tools (capture + pins, see §4); keeping them in the chrome is what makes "capture from anywhere, keep on every page" true.

### 2.3 Page body
`flex:1; position:relative; overflow:hidden`. Each page is an absolutely-positioned `inset:0` layer toggled by `isCanvas/isDashboard/...`. Scrolling pages (`dashboard`, `connectors`, `notes` list) own their own `overflow-y:auto`; canvas and graph manage their own pan/zoom and never scroll.

---

## 3. Component inventory

Reusable visual patterns, with their exact recipe.

### 3.1 Buttons
- **Primary:** `height:34px; bg:var(--accent); color:#fff; radius:9px; font 13px/600–700; box-shadow:var(--shadow-s)`; hover → `--accent-2`. Usually an icon + label.
- **Secondary:** `border:1px solid var(--border); bg:var(--panel); color:var(--muted)`; hover → `bg:var(--panel-2); color:var(--text)`.
- **Ghost icon button:** transparent, `--muted`/`--faint`; hover fills `--panel-2`. Destructive variant hovers to `--down-soft`/`--down`.
- **Segmented control:** wrapper `bg:var(--panel-2); border; radius:9–10px; padding:3px`; active segment gets `bg:var(--panel)` + `--shadow-s` + weight 700 (the "raised pill" idiom). Used for notes view/sort, graph layout, rail tabs, conviction stance, metric polarity.

> **Reasoning.** Exactly three button weights (accent / outline / ghost) cover every need and keep priority obvious. The **raised-pill segmented control** — active option lifts to the lightest surface with a shadow — is reused for *every* small mode switch so "pick one of these" always looks the same.

### 3.2 Badges, pills, chips
- **Status pill:** `font 9–10.5px/700`, tiny leading dot, tinted bg (`*-soft`) + matching text color, `radius:6px`. Two sub-forms: with animated `pulse` dot = "live/processing"; static dot = state.
- **Eyebrow:** uppercase tracked caption (see §1.2).
- **Count badge:** mono, `--panel-2` bg, `radius:6px` (nav) — or accent circle with white number + 2px panel ring for the pinned-tray count (notification style).
- **Tag/@mention:** `--accent` text, `@` prefix, weight 600.
- **Reference chip:** outline pill with a link/file icon + mono label — used for citations ("10-Q p.14", "feed: WSJ").

> **Reasoning.** The dot+label status pill is the product's universal "state" atom — same shape whether it's a connector status, a node run-state, an ingestion stage, or a market signal, so users learn it once. **Citation/reference chips are a deliberate trust device**: every AI output and note carries visible provenance, reinforcing the product promise that nothing is unsourced.

### 3.3 Cards
- **Standard card:** `bg:var(--panel); border:1px solid var(--border); radius:13–14px; box-shadow:var(--shadow-s)`; hover often raises border to `--border-2`.
- **Node card** (canvas): same but `--shadow-m` at rest, `--shadow-l` + accent ring when selected, **3px categorical accent rail** down the left edge, visible connection ports.
- **Sticky note** (notes board): tinted via `color-mix(category 13%, panel)`, 3px colored top border, asymmetric radius `4px 4px 11px 11px`, slight rotation, `--shadow-m`; hover straightens (`rotate(0)`) and lifts to `--shadow-l`.

> **Reasoning.** One card recipe, three escalations of "objectness." A flat list card barely lifts; a canvas node is clearly a draggable *thing* (mid shadow, accent rail, ports); a sticky note is the most physical of all (tint + tilt + peel-corner radius) because the notes board is explicitly a tactile mood-board metaphor. The tilt-straighten-on-hover is a small but high-delight touch that sells the sticky metaphor.

### 3.4 Inputs
Text inputs/textareas: `bg:var(--panel-2); border:1px solid var(--border); radius:9px; padding:9px 11px; font 13px; font-family:inherit; outline:none`. Search fields pair a leading magnifier icon with a borderless input inside a `--panel-2` pill.

> **Reasoning.** Inset (`--panel-2`) inputs read as "type here" wells against the lighter `--panel` cards without needing heavy borders. `font-family:inherit` keeps typed text in Hanken Grotesk (never the browser default).

### 3.5 Popovers, menus, modals
- **Popover/menu:** `--panel`, `border`, `radius:13–14px`, `--shadow-l`, `popin` animation, `z-index:40–60`. A full-screen invisible backdrop catches outside-clicks to close.
- **Modal:** centered-ish (`padding-top:60px`), scrim `rgba(15,15,22,.42)`, `radius:18px`, `--shadow-l`; inner click-stop via `noop`.

> **Reasoning.** All transient surfaces share one look (panel + large shadow + popin) so "this floats above the page" is a single learned cue. The invisible click-catching backdrop is the standard dismissal pattern and prevents menus getting stuck open.

### 3.6 Data viz primitives (hand-built, no chart lib)
- **Sparkline:** `<polyline>` in a `0 0 120 34` (or `120 30`) viewBox, `preserveAspectRatio:none`, normalized min→max, colored by direction (`--up`/`--down`) or board accent.
- **Bar chart:** flex row of bars, height as `%`, gradient fill (`color-mix` light top → solid).
- **Knowledge graph:** SVG `<circle>` nodes + `<line>` edges in a pan/zoom `<g transform>`, radius scaled by degree, fill by category/stance.

> **Reasoning.** Charts are intentionally **dependency-free SVG** — they're decorative/indicative at this fidelity, so a polyline beats pulling in a charting library. Sparkline color always encodes direction so a glance reads sentiment before the number. The normalization (`(v-min)/(max-min)`) makes any data array fill the box nicely.

---

## 4. Cross-cutting patterns

### 4.1 Provenance everywhere
Every AI answer shows model + source count + citation chips; every note shows a **source badge** (Canvas/Dashboard/Library/Connectors/Manual, each with its own color); every graph claim shows supports/contradicts evidence; every connector output "shows which connector it came from."

> **Reasoning.** This is the product's central trust mechanic and the thing most worth preserving: **no output is anonymous.** The source-badge color system (`srcMeta`) is reused identically in notes list, notes board, pinned tray, and capture popover, so an insight's origin is always one glance away.

### 4.2 Quick capture (global)
Top-bar capture button → popover titled "New note" stamped **"From {currentPage}"**, with title + body fields. Saves into the Notes store tagged with the originating page (`srcType`), prepended to the list. Available on every page.

> **Reasoning.** Insight strikes anywhere — on the canvas, mid-screener, in the graph. Capture must be **one click from any context** and must **remember where it came from** automatically, so the Notes section becomes a provenance-stamped research journal rather than a dumb text pile.

### 4.3 Global pins
Any note can be **pinned to all pages** (pin icon → `note.pin`). The top-bar pin tray shows pinned notes with a live count badge and is reachable everywhere; clicking one jumps to Notes. Distinct from **star** (`pinned`), which only sorts a note to the top of the notes board.

> **Reasoning.** Two levels of "keep this": **star** = "important within Notes," **pin** = "I want this in my peripheral vision no matter what I'm doing." Separating them avoids overloading one control, and the persistent tray means a key thesis or risk travels with the analyst across the whole workspace.

### 4.4 Conviction tracking
A per-ticker conviction value (`high / building / watching / pass`) with its own color+label (`convMeta`) is editable by **clicking the conviction chip** anywhere it appears (watchlist, screener, compare, conviction board) — cycling or set-directly. State is shared, so changing it in one board updates all.

> **Reasoning.** Conviction is the analyst's own subjective layer on top of objective data — the product's most "personal" signal. Making it **inline-editable from every surface** and **globally consistent** turns a passive data tool into something that reflects *the user's evolving view*, which is the emotional core of doing research.

### 4.5 Theming
`toggleTheme` flips `data-theme` on the root; every token swaps. The `accentColor` prop overrides `--accent` at mount/update via a ref.

> **Reasoning.** Because everything is tokens, dark mode is "free" and guaranteed consistent. Exposing accent as a prop means the whole identity is re-skinnable without touching components.

---

## 5. Pages in detail

### 5.1 Library — Knowledge base & graph (the flagship)

> ⚠ **SUPERSEDED for Library and Graph by ADR 0056 / 0057 (2026-07-29).** Phase 2 splits this surface
> in two: **Library** becomes an evidence-led coverage brief with a stable reading order (evidence
> frame → business frame → research leads → business structure → what changed → Timeline), and the
> **graph moves to its own top-level destination** — so the three-column, graph-in-the-centre layout
> below is no longer the intent. "Signals" is renamed and re-familied to **research leads**. Read
> `docs/PHASE-2-CHARTER.md` (reference outside this repository: `docs/PHASE-2-CHARTER.md`) and the mockup +
> reading guide (reference outside this repository: `docs/specs/PHASE-2-LIBRARY-GRAPH-MOCKUP.md`) before building anything here.
> **Library v2 (ADR 0143, 2026-09-30) — the live reading order and density:** head (name · identity
> · the price beside it) → one evidence line (+ *Not held*) → four key figures → *What deserves
> attention* (signal cards from the filed figures, two-sided leads, *What management says*) →
> Business structure (partitions side by side) → What changed (a table, Quarterly | Annual; a row
> opens its full chart) → Timeline (compact; Expand opens the detailed view). Module headers are
> `ModuleHeader` (serif ≥ 18px + right-side controls); expanded views are `BriefOverlay`
> (`apps/web/app/library/brief-overlay.tsx`). **Legends, caveats and method notes live in the
> expanded view or a tooltip, never inline on every visit.**
> **What is preserved below and still authoritative:** the source-panel anatomy, the include/exclude
> scope model (with one correction — ADR 0056 drops the *eye* icon for analytical inclusion, since
> users read an eye as visual visibility), the node/edge visual vocabulary, and the Ask↔graph coupling.
> The rest is the pre-Phase-2 design, kept for reference.

**Three-column layout:** left **Sources** panel (316px), center **live knowledge graph**, right **Signals / Ask N4A** rail (330px). Both side panels collapse to 46px vertical-label strips; the layout auto-collapses panels on narrow viewports (`responsiveLib`: hide right <1180px, hide left <980px).

**Left — Sources.** Header with doc count, **Add** menu (Upload / Pull from feed / Paste link), collapse button, search field, and a horizontal **collection chip** row (All/Filings/Calls/News/Reports/Models). An **ingestion banner** appears when any doc is processing ("N source(s) being ingested · parse → embed → graph"). Each source row shows a type icon, name, source+meta (mono), an **eye toggle** (include/exclude from graph), and either a live progress bar (busy) or a `ent · claims · cites` stat line (ready).

**Center — graph.** Toolbar: title + "N of M nodes · click to expand", **layout segmented control** (Force / Radial / Clusters), a Live indicator, and a Signals re-open button when the rail is closed. The graph is an SVG with a force simulation (see §6.4). Nodes are circles sized by degree, colored by category (or by stance for claims), with optional `+N` hidden-neighbor badge and labels that fade in past 0.55 zoom. Overlays: **hover preview card**, **node inspector** (right, with Evidence for claims, Connections, Expand/Center/Collapse/Exclude actions), **category legend** + supports/contradicts edge legend (bottom-left), **zoom controls** (bottom-right).

**Right — Signals / Ask.** Two tabs.
- **Signals:** two count tiles (Contested / Corroborated), filter chips (All/Contested/Corroborated/Central/Emerging), and a list of signal cards (stance chip + title + summary + evidence count). Clicking focuses those nodes in the graph.
- **Ask N4A:** a chat thread (user bubbles right/accent, AI bubbles left/panel) with suggested-question chips, citation chips, and a "highlighted in graph" note. Asking runs a scripted answer (see §6.5) and **focuses the relevant subgraph**.

> **Reasoning.** This page *is* the pitch: "we read across all your sources and show you how everything connects." The **sources → graph → signals** left-to-right flow mirrors the mental model (inputs → structure → conclusions). The graph being the visual centerpiece (not a list) is what differentiates the product. Crucially, **Ask and the graph are coupled** — answers don't just appear as text, they *light up the evidence in the graph* — which makes the AI feel like it's reasoning over a real, inspectable structure rather than hallucinating prose. The include/exclude eye on each source makes "the AI only uses what you switch on" literally true and visible.

### 5.1a Graph — the relationship workspace (rung 15, ADR 0136; page ADR 0140)

One task: read how the record connects, and open the evidence behind a connection. **Layout:**
navbar · **Details** pane (left, 304 px) · the work column · **Ask N4A** pane (right, 352 px, open
by default ≥ 1360 px). Both panes drag 240–560 px from their inner edge (a 2 px `--accent` line on
hover), never leave the canvas under 360 px, snap closed under 60 % of the minimum, collapse by
the header's `«` `»` / double-click / `[` `]`, and float over the canvas ≤ 1000 px. An OPEN pane names
itself — its icon (filled 16 %) and title in a 46 px header level with the toolbar; its toolbar tab
appears only while it is closed. No card ever covers the canvas.

**Toolbar — ONE row, measured (46 px):** (a closed Details' tab) · Graph | Table · find (a hit count
inside, `/` focuses) · Sources · Areas · Filter · counts · refresh (re-reads the graph AND puts every
moved object back) · (a closed Ask's tab). A menu states its value only when it
narrows the view (`--accent`); when the row runs out it sheds counts → pane labels → resting values
→ view labels → a narrowing menu's own label → menus to icons with an accent dot → the search hints.
**Menus:** Sources (grouped by document kind, newest first, tri-state, one short name per document)
· Areas (a radiogroup; the covered company is the centre, not an area) · Filter (Show — each kind's
swatch IS its node, the legend, with *Only* · the line families drawn · *Size is the connections
drawn here, not importance* · Evidence: corroborated only, *drawn hollow: one voice so far* ·
Statements about: a fiscal period).

**Graph (the canvas, SVG):** a deterministic layout — no simulation, the map is still. Each
area a dashed ellipse (3 % `--text`, `--border-2`, 4/4) around its members' circles AND labels,
named above in 10.5 px uppercase `--faint` (a button that chooses the area). An object is a solid
`--cat-*` circle (the covered company `--accent`) with a 2 px `--canvas` ring and its glyph
(`CO SG GE MX PO TH SR PE EN`) in `--on-cat` (`--on-feed` on the theme amber); one voice so far =
hollow (`-soft` fill, dashed stroke). Label under it, 11 px/550, two lines max, canvas halo. Lines
are straight, four families on evidence tokens: structure `--graph-link` · source link `--cat-source`
40 %, dashed 2/4 · supports `--ev-derived` · contradicts `--ev-gap` dashed (red is ONLY a real
contradiction); never `--up/--down`. **Level of detail (semantic zoom):** every name holds ~11 px
on screen, in a layer above every mark, and is drawn only where it covers no placed name and no named
object's circle — chosen · hovered neighbourhood · focus · matches · the company · area names · then
each area's most-connected member, round-robin (a theme's node yields to its outline's name). Zoomed
out, marks grow (capped 2.4×) and glyphs go. No legend on the canvas — the Filter menu names every
kind. **Performance rule:** no state sets an element's `opacity` (dims are fill/stroke-opacity,
hiding is `visibility`); the drawing renders once and states are attributes; a camera move glides
the whole SVG as one composited picture, then commits crisp — every interaction under a frame.

**Interactions — two levels.** Click = SELECT (Details, an `--accent` ring, its lines lifted to
`--muted`; nothing dims; the camera holds). Click it again / double-click / Details › *Focus* = FOCUS
(the neighbourhood lit, the rest at 16 %, its lines `--accent` 1.7 px naming their relation where
clear; the camera fits the neighbourhood). Blank canvas and Esc peel one level: menu → area → focus
→ selection. Hover LIGHTS, never dims: the hovered name (drawn last, bold, a thick halo), its lines lifted, a
`--muted` ring on each neighbour — nothing else on the map changes. Drag:
the object glides to the pointer, its same-area neighbours trail and settle — no spring. No pills;
no text is ever selected by a double-click. Arrows move a focused object (Shift ×3); wheel zooms
toward the cursor; `− % + ⤢` bottom-right.

**Details:** a pinned header — a mini-node, *Kind · The company covered · Corroborated* (each `·`
belongs to the word after it), the title in the display serif (23 px), the summary, *Focus
(pressed while it is the focus) · Trace to… · ⋯* (Expand one hop · Hide from the graph, each saying
why when off). No *Note this* until Notes (rung 22). Sections with an eyebrow and a mono count: **Filed readings** (the latest at 20 px mono,
a sparkline, every period newest first with its cell) · **What the record says** (statements with a
7 px voice dot, never quotation marks) · sides · **Connections** by relation, six each then *+N more
in the Table*, each opening its citations in place. No separate Evidence list — an object whose body cites nothing
of its own (a document, a theme, a name without passage text) lists its documents under **Named
in**, once each.

**Table:** fixed columns (From 25 · Relationship 13 · To 25 · Area 17 · Evidence 20 %), nothing
scrolls sideways, glyph-in-colour names, `A → B` areas, sortable with `aria-sort`, narrowed by the
toolbar search and the Areas menu; rows touching the chosen object on `--accent-soft`; 300-row cap.

**Arrival (only after a handoff):** a 36 px `--panel-2` row — *← Back to the lead · Brief › origin ›
"seed" · landed on 1 position · FY2025 · ×* — no coloured mark.

**Ask** — several chats, kept per workspace in the store (header: *New chat* while one is on screen
· the workspace's chats, each titled by its first question, switch/delete; a chat the store could
not take says *not saved*). A NEW chat: *Ask about X* (display serif; the chosen object,
else the company) · one line on what an answer holds · starters *From X*, then *Across the record*
(its most-connected figure and themes), never one already asked · *Your chats*. No prose answer
and no cards: the question (13.5/650), what it was asked over (and that the
view has since changed), the standing as a 7 px dot + uppercase word + its sentence, then five
disclosure blocks in order — **Observed** (`● Metric · filed`, `period · value · cell`) ·
**Attributed** · **Alternatives still live** (each with its statements' citations) · **Missing or
incompatible** · **What would discriminate**. The pane lands on the newest answer's START.
**No coloured side bar anywhere** — a dot and a word; one short name per document in every chip.

### 5.2 Dashboard — Screener · watchlist · signals

> **⚠ SUPERSEDED for Phase 2 by ADR 0062 + the prototype.** The Dashboard's target is a **conviction
> file** — my view and thesis, falsifiers bound to research leads, *since I formed this view*, view
> health, decision log — **not a screener**. The **board grammar below is still authoritative**
> (4-column bento, 1–4 spans, `row dense`, edit mode, width stepper, add-board): the Phase-2 work is
> new board *types* on that system, which is why it is a rung and not a rewrite. The board *types*
> named below (watchlist, screener, compare, news, alerts) are the pre-Phase-2 set; which of them
> survive is decided in ladder rung 21.
A **4-column dense grid** (`repeat(4, minmax(0,1fr))`, `grid-auto-flow:row dense`) of **boards**, each spanning 1–4 columns. Board types: **watchlist** (ticker cards w/ sparkline + conviction), **screener** (sortable fundamentals table), **compare** (NVDA vs AMD head-to-head), **conviction** (stance + what-you-weigh), **news** (headline feed), **alerts** (triggers), **metric** (big number + delta + sparkline).

**Edit mode** (`toggleDashEdit`): boards become **drag-to-reorder** (HTML5 DnD with drop-target outline), gain a **width stepper** (`w/4`, narrower/wider), a remove button, and a dashed "Add a board" tile appears. **Add-board modal** offers a **custom-metric builder** (name/value/delta/source + positive/negative polarity) plus prebuilt board options.

> **Reasoning.** "Arrange it your way" is the promise, so the dashboard is a **true bento grid the user composes**, not a fixed layout. `row dense` packing lets mixed-width boards tile without gaps. The custom-metric builder is the key feature — it says "found a unique signal? pin it" — turning the dashboard into the analyst's personal instrument panel. Conviction and compare boards put *the user's judgment* on the same surface as market data, reinforcing the conviction-tracking pattern (§4.4).

### 5.3 Canvas — Infinite research canvas
A pannable/zoomable dot-grid surface (`--canvas` bg, `--dot` radial-gradient grid that scales with zoom). **Nodes** (file / news / AI / table / chart / report) are draggable cards with input/output **ports**; dragging from an output port draws a **bezier edge** or, if released on empty canvas, opens a **node-type picker** (n8n-style add-on-drop). Edges carry meaning: **context** (dashed gray), **data** (solid violet, animated flow dot), **live** (green marching dashes). Mid-edge **+** buttons insert a node into a connection.

Selection shows a **context toolbar** (Run / Duplicate / Comment / Delete) above the node and a **right inspector** (type, in/out connection counts, open/delete). The **AI node** is the richest: model switcher, source count, prompt, Run → shimmer skeleton → grounded answer + citation chips. **Figma/Miro affordances:** drag **snap guides** (hot-pink), **alignment** during drag, **minimap** (Miro), **bottom-center creation toolbar** (move/hand tools + add buttons + comment toggle), **zoom/fit/tidy** controls (bottom-right), **roaming collaborator cursors** + **comment pins**.

> **Reasoning.** The canvas borrows the **node-graph metaphor (n8n) for AI pipelines** — sources flow into an AI node, which flows into tables/charts/reports — making "grounded, multi-source reasoning" spatial and manipulable. Edge *types with distinct visual language* teach the dataflow (context vs data vs live) without labels. The full Figma/Miro vocabulary (snap guides, minimap, presence cursors, comments, tidy-up) is deliberate: it signals "this is a real, collaborative canvas," and meeting those expectations is what makes a novel concept feel familiar enough to use.

### 5.4 Notes — Captured insights & citations
Left filter rail (All / From canvas / From dashboard / Manual) + a composer prompt ("type @ to reference a ticker, source, or canvas node…"). Two views via segmented control: **List** (full cards: source badge, star, timestamp, pin/edit/delete, title, body, @tags, reference chips) and **Board** (tilted sticky notes colored by source, sortable by Updated/Created/Color, with a source-color legend). Star pins to top; global-pin adds to the cross-page tray.

> **Reasoning.** Notes is the **research journal** where everything captured lands. Two views serve two modes: **List** for focused reading/citation review, **Board** for spatial/visual triage (the sticky metaphor invites rearranging and "seeing the shape" of your thinking). Source-colored stickies make provenance scannable across the whole board at once. The `@`-reference composer hints that notes are *linked* to the rest of the workspace, not isolated.

### 5.5 Connectors — Models, data feeds & plugins
An intro banner ("Everything N4A can reason over") then grouped sections: **AI models** (Claude/GPT/Local), **Data feeds** (EDGAR/Market data/News wire), **MCP connectors** (Sheets/Drive), **Plugins** (Backtest). Each connector card shows icon, name, description, status dot, meta (sync time), **permissions**, and a Connect/Manage toggle.

> **Reasoning.** This page makes the product's reach concrete and **foregrounds permissions + connection status** — the trust/control layer. Grouping by kind (models vs feeds vs MCP vs plugins) communicates the architecture: N4A is a reasoning layer over *your* chosen, permissioned sources. The explicit mention that "N4A only uses sources you switch on" ties back to the Library include/exclude control.

---

## 6. Interactive behaviors & mock logic

Everything is faked client-side but modeled to feel real. Document these so the real build knows the *intended* behavior.

### 6.1 Canvas pan / zoom / drag
- **Viewport** `vp:{x,y,scale}`. Wheel zooms toward cursor (factor 1.08/0.926, clamped 0.25–2.2); `zoomBy` zooms toward center; `fitView` frames all nodes with 80px pad; `resetZoom` → 100%.
- **Pan** when hand tool active or clicking empty canvas; **node drag** from header/body via `worldPt` coordinate conversion.
- **Snap/align:** during drag, node edges+centers are compared to every other node within `6/scale` px; the nearest match snaps and draws a hot-pink guide spanning both nodes. **Tidy up** distributes nodes into 4 preset columns by flow order.
- **Minimap** computes world bounds + scale, draws node rects + a viewport rectangle; clicking jumps the viewport.

> **Reasoning.** Zoom-toward-cursor and fit-to-content are the two non-negotiable canvas behaviors users expect; getting the math right is what separates "real canvas" from "toy." Snap guides only appear within a *scale-aware* threshold so they help at any zoom without fighting the user.

### 6.2 Connections & node picker
Output-port drag creates a `conn` temp edge tracking the cursor; releasing on an input port calls `completeConn` (dedupes existing edges); releasing on empty canvas opens the **node picker** positioned at the drop point. Picking from a mid-edge **+** *splices* the new node into the edge (original edge replaced by two). New AI nodes default to `idle`.

> **Reasoning.** Two creation paths from one gesture (drag-to-connect *or* drag-to-create-and-connect) is the n8n insight that makes pipeline-building fast — you never have to "add node, then connect" as separate steps. Edge-splice insertion matches how analysts actually iterate ("put a transform between these two").

### 6.3 AI node run + model cycle
`runNode` sets `running` → after 1900ms picks from a pool of 3 grounded-sounding answers and sets `ok` + citation chips. `cycleModel` rotates Claude Sonnet 4.5 → GPT-4o → Gemini 2.5 Pro → Local Llama 70B.

> **Reasoning.** The ~1.9s fake latency + shimmer skeleton makes generation *feel* like real inference. Rotating real model names communicates the multi-model promise and that the same node can be re-run against different reasoners.

### 6.4 Knowledge-graph force simulation
A real velocity-Verlet-ish sim (`simStep`): O(n²) repulsion (`1500/d²·alpha`), spring attraction along visible links (ideal length varies by link type: about 74 / evidence 98 / mention 112), plus a layout force — **force** (gravity to origin), **radial** (rings by category), or **clusters** (category centers on a circle). `alpha` cools at `×0.975`/frame via `requestAnimationFrame`, reheated on interaction. Nodes drag with `fx/fy` pinning. **Progressive disclosure:** only `core` nodes + expanded neighbors are visible; clicking a node expands its neighbors and `placeNeighbors` seeds their positions nearby.

> **Reasoning.** A genuine force sim (not static coordinates) is what makes the graph feel *alive and explorable* — nodes settle, rearrange on layout change, and respond to drags. Progressive disclosure (start with hubs, expand on demand) is essential: showing all ~40 nodes at once would be hairball soup; revealing on click turns exploration into a guided unfolding. Three layouts answer three questions: force = "natural structure," radial = "what's central," clusters = "what types exist."

### 6.5 Ask N4A (scripted)
Four canned scripts (contested / central / strong / china) each return an answer, citations, a node-focus set, and sometimes a layout switch; free text falls back to a generic grounded answer. Sending shows a thinking indicator (~880ms) then appends the AI message and **focuses the cited subgraph**.

> **Reasoning.** Scripting four high-value analyst questions ("what's contested?", "most central?", "strongest evidence?", "the China thread") demonstrates the *kind* of cross-source reasoning the product enables — and each one *acts on the graph*, proving the answer is grounded in visible evidence.

### 6.6 Source ingestion pipeline
`addSource` inserts a doc at `parsing`, adds a graph node, then `advanceIngest` steps **parsing → embedding → graphing → ready** (~1.4–1.5s each), finally wiring the new node to `nvda`/`dcdemand` and focusing it. Status drives a colored progress bar (28/62/86/100%).

> **Reasoning.** Showing the **parse → embed → graph** stages (not just a spinner) teaches users *what the system does* with a source and sets the expectation that ingestion is real work. Auto-connecting + focusing the new node closes the loop: "I added a source and immediately saw where it fits."

### 6.7 Dashboard editing & screener sort
Drag-reorder via HTML5 DnD (`dragId`/`overId` with dashed drop outline); width stepper clamps 1–4 cols; custom-metric form builds a metric board. Screener `sortScreener` toggles asc/desc, parses values with unit-aware `numOf` (handles `T/B/%/x/—`), special-cases conviction order and name locale-sort.

> **Reasoning.** Unit-aware numeric parsing is the unglamorous detail that makes the screener *actually sortable* (so "2.91T" > "766B" > "129B" sorts correctly) — the kind of thing that's invisible when right and infuriating when wrong.

### 6.8 Presence (ambient)
Two collaborator cursors (`Amara`, `Kenji`) roam every 1700ms to random anchor points, gliding via a 1.6s cubic-bezier transition. Gated by the `presence` prop. Comment pins sit at world coordinates.

> **Reasoning.** Ambient presence makes the canvas feel **shared and current** even in a static prototype — a cheap, powerful signal that research here is collaborative. Gating it behind a prop lets you turn it off for solo/screenshot contexts.

---

## 7. Tweakable props

| Prop | Editor | Default | Effect |
|---|---|---|---|
| `accentColor` | color | `#6C4CF1` | Overrides `--accent` on the root (re-skins primary identity) |
| `presence` | boolean | `true` | Shows/hides roaming collaborator cursors on canvas |

> **Reasoning.** Kept deliberately minimal. Accent is the one brand lever worth exposing; presence toggles the one ambient effect that isn't always wanted. Everything else (copy, individual colors) is editable in place, so it isn't duplicated as a prop.

---

## 8. State architecture (for the real build)

All state lives in one component's `state`; derived display values are computed in `renderVals()` and passed down by name. Key stores: `page`, `theme`, `sidebarCollapsed`; canvas (`vp`, `nodes`, `edges`, `comments`, `selectedId`, `drag`, `conn`, `tool`, `picker`, `guides`, `cursors`); dashboard (`dash.boards`, `conviction`, `screenerSort`, `watchlist`, `screenerRows`, `feed`, `alerts`); `notes` (+ `notesFilter/View/Sort`); `connectors`; and the large `lib` object (graph view state, docs, chat). The graph's *physics* state (positions/velocities) lives **outside** React state on instance fields (`_gnodes`, `_glinks`, …) and is committed to the DOM via `forceUpdate` per animation frame.

> **Reasoning.** Single-source-of-truth state with a pure derive step keeps the UI predictable and every surface in sync (change conviction once, it updates everywhere). The graph physics is intentionally kept off React state because mutating 40 nodes' x/y 60×/sec through `setState` would thrash reconciliation — instance fields + `forceUpdate` is the right escape hatch for high-frequency animation. **In a production React build, model this as a store (Zustand/Redux) with the graph sim in a ref/worker.**

---

## 9. Design principles (the through-lines)

1. **Provenance is non-negotiable.** Every output names its source. Build no feature that produces an anonymous claim.
2. **The user's judgment is first-class.** Conviction, stars, pins, custom metrics — the product reflects *the analyst's evolving view*, not just market data.
3. **AI is grounded and visible.** AI never just emits prose; it shows its sources and acts on the shared structure (the graph). Latency is shown as *work* (stages, shimmer), not a void.
4. **One token layer, zero one-off colors.** Every color is a semantic variable; theming and consistency fall out for free.
5. **Borrow familiar metaphors for novel ideas.** n8n pipelines, Figma/Miro canvas, sticky boards, bento dashboards — meet expectations so the new concept (AI-native research) feels usable on contact.
6. **Calm density.** Pro-tool information density, kept legible by the muted semantic palette, the mono/sans/serif type split, and restrained, purposeful motion.
7. **Everything composes.** Dashboards, canvases, and graphs are user-arranged, not fixed — the workspace is *theirs*.
8. **Considered, not decorated (anti-generic — §1.7, ADR 0044).** The product must never read as template-filled. The cure is subtraction — fewer words, fewer boxes, fewer ornamental icons — plus a few deliberate distinctive choices (the display serif, the tokened OKLCH palette, the single mechanism motion). Every graphic element looks extracted from the product itself.

---

## 10. Known gaps / TODOs for the real build

- ~~**Missing `--amber-soft` token.**~~ **RESOLVED — it exists.** `packages/ui/src/tokens.css` defines `--amber-soft` in **both** light (`#fbf1dd`) and dark (`#2a2012`), and `theme.css` exposes `--color-amber-soft`. This bullet claimed otherwise for months and the Phase-2 ladder repeated the claim on 2026-08-08; both corrected 2026-08-11. *Check the token package before adding a token.*
- **`--cat-alert` is defined but unused.** Either wire up an alert node type on canvas or drop it.
- **Spacing is ad-hoc.** No formal spacing scale — values are chosen per-component. Consider codifying a 4px-based scale before scaling the team.
- **Charts are non-interactive SVG.** Fine for prototype; real build needs a charting solution with tooltips/axes for the dashboard metric/compare boards.
- **All data + AI is mocked.** Answer pools, ingestion timing, presence, and graph evidence are hard-coded. The graph schema (`graphData()`: nodes with cat/stance/summary, typed links supports/contradicts/about/mentions/competes/supplies) is a good contract to build the real backend against.
- **Note editing is a stub** (`onEdit:()=>{}`), and the `@`-reference composer is visual-only.
- **No persistence.** State resets on reload; wire to storage/backend.
- **Accessibility pass needed.** Icon-only buttons have `title`/`aria-label` in most but not all places; focus styles rely on default outlines; the canvas/graph need keyboard alternatives.

### 10.1 Owed by Phase 2 (added 2026-07-29 — ADR 0044/0056/0057; refreshed 2026-08-08 against `N4A-Prototype.html`)

- **The design system needs a domain-pattern layer.** Tokens and components exist; *domain patterns* do not, and Phase 2 needs ten of them: evidence boundary / source-scope receipt · coverage-gap and evidence-state treatment · epistemic object label · comparison frame and series receipt · research-lead card and why-surfaced detail · multi-track Timeline lane, anchored event marker, grouped checkpoint and coverage span · market-quote receipt with stale/unavailable states · analyst endorsement/correction controls · graph origin/scope breadcrumb · exact-evidence viewer with stable return. Detail: reading guide §6 (reference outside this repository: `docs/specs/PHASE-2-LIBRARY-GRAPH-MOCKUP.md`). **Since ADR 0062 all six surfaces claim these — build each as a *pattern*, never as a Library component.**
- **An evidence-posture token family this system does not have.** The prototype defines `--ev-reported` (audited/reported fact) · `--ev-attributed` (someone's explanation) · `--ev-external` (outside voice) · `--ev-derived` (deterministic transformation) · `--ev-gap` (contradiction ONLY, never "missing"), each with a `-soft` companion and a dark value, plus `--judgment` for analyst judgment. **The prototype's five are not enough for §5.2's seven object types, and rung 8a-1 adds two** (2026-09-01, ADR 0099 D3): `--ev-estimate` (hue 70 — a projection, which must NOT borrow `--ev-external`, since a broker estimate is external-voiced and company guidance is issuer-voiced, so the two axes would be reading each other) and `--ev-lead` (hue 330 — N4A's own voice, deliberately NOT the accent/judgment hue 285, because the prototype paints `.epistemic[data-kind="lead"]` with `--accent` and a machine-generated lead then renders identically to the one colour its own comment reserves for *"a human decided"*). The seventh, `decision_action`, shares `--judgment` with `analyst_judgment` — same voice, an opinion versus an act — and is told apart by **fill**, which survives a colour-vision deficiency a 20° hue shift would not. `--ev-external` and `--ev-gap` are **spoken for by the other two axes** (source voice, evidence state) and an object chip may never use either.
- **NINE evidence states each need a defined treatment, not seven** (corrected 2026-09-01, ADR 0094/0095/**0099**). The prototype's `.state[data-s="…"]` styles the pre-0094 seven; the shipped vocabulary in `services/ai/app/evidence/model.py` is `not_applicable`, `reviewed_not_material`, `processing_failed_withheld`, `not_parsed_or_modelled`, `not_acquired`, **`expected_not_found`**, `not_disclosed`, `incompatible`, **`not_found_in_scope`** — plus `available`, which is what the interface shows when availability is not in question and needs **no** treatment. Two traps the drawing sets: **`not_disclosed` is structurally unreachable** (0095 — `answer_question` declines before the provider is called), so its treatment is designed-but-dormant and its copy must be **scoped** — *"a directed review of these documents found no disclosure"* — never a claim about the issuer; and **`not_found_in_scope` is the majority answer** (43 of 112 cells on Infosys, 63 on HDFC) with no treatment in the drawing at all. A quiet absence looks exactly like completeness; these are what stop that — and each state is a **different instruction to the analyst**, so the label is a sentence, never the enum name.
- **Four more tokens this system lacks:** `--market-up`/`--market-down` (+ `-soft`) — a *market direction* family, deliberately separate from evidence posture — plus `--slate` (+ `-soft`), `--grid`, and **`--scrim`** (the prototype defines it; its absence is why 4 sites write `bg-black/40`). **`--cyan` is struck** (2026-09-01, ADR 0099): listed as owed here, in the ladder and in the prototype spec, it appears **nowhere** in `N4A-Prototype.html` — it survives only in `docs/specs/PHASE-2-LIBRARY-GRAPH-MOCKUP.html`, the two-surface mockup **ADR 0062 superseded**. The claim was carried forward from a drawing that is no longer the target. Add tokens, not per-component hex (invariant 2). **Rung 8a-1 landed all of these** on 2026-09-01, plus `--market-flat`, `--ev-estimate`/`--ev-lead` (above) and **`--cursor-cut`** — the scissors cursor's whole `url()` as a token, because a data URI is opaque to the cascade and the inlined version carried `%23e5484d`, a hex matching no token, invisible to a `#` grep and unable to follow the theme. **Verify each against `packages/ui/src/tokens.css` first** — `--amber-soft` was on this list for months and had already shipped, and **`--on-accent` is the inverse case**: defined in `tokens.css`, never bound in `theme.css`, so `text-on-accent` does not compile and 26 sites write `text-white` instead.
- **Colour semantics must split into four families.** Market direction, evidence posture, system status and user judgment are separate meanings that must never share a token merely because all four can be "green" or "red" (ADR 0056 §7). Today they blur — `--market-up` exists *because* market movement must not reuse positive/negative evidence semantics.
- **Residual Hanken→Instrument migration wording.** Typography/token prose in §1 still carries language from before the ADR 0044 type-voice migration. A reconciliation pass is owed; it was deliberately not done during the Phase-2 promotion.

---

*Generated from `N4A Workspace.dc.html`. When the implementation and this doc disagree, the implementation is authoritative for values; this doc is authoritative for intent. **§5.1 is superseded for Library/Graph by ADR 0056/0057 — see the notice there.***
