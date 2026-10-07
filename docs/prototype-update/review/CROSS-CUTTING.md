# Review — cross-cutting fineness

> **status:** working (temporary) · **authoritative for:** voice, the jargon glossary, type, tokens,
> units, prototype seams, punctuation artefacts and the screenshot observations that apply across
> surfaces · **last verified:** 2026-10-05 at baseline `102c2ef`.

Sources: all four review agents, plus rendered screenshots (1600 px wide, both companies, every
surface, the Library in bands) taken with what is now `tools/shoot.mjs`.

## 1. Voice — the single biggest fineness issue

The prototype **talks about its evidence more than about the company**. On the Library the first
~600 px is a box describing the documents and then a price card; "What changed" spends a quarter of
its width on an essay per series about coverage; lead cards end in "2 documents · 2 origins · 0
independent confirmations"; engineering caveats sit on screen. It contradicts the user's standing rule
that bookkeeping is disclosed **quietly and on demand**, and it hides the content an analyst came for.

**The rule (D12):** substance first · provenance one click away, sitting *on the number* · honesty
present but quiet · prominence earned only by what changes judgment (a real contradiction, a missing
figure the analyst asked for).

**Keep the prose voice** — it is the prototype's strongest asset: "That gap is not lending. It is cost
and credit." · "one year, three growth rates" · "sequence, not causation" · "A view with nothing that
could disprove it is a preference, not a view." Cut the aphoristic or preachy lines ("a confident
answer would be the dishonest one").

## 2. Jargon glossary — internal words that reach the analyst

Phase 2.4 replaces each; the user signs off wording at the phase-2 verify. Suggestions, not decisions:

| On screen today | Where (examples) | Plain replacement |
|---|---|---|
| Evidence frame | Library 6474 | one line: "19 documents · 15 from the company · 4 outside · Not held: …" |
| issuer-origin · independent | Library, Dashboard 6093, 11002 | from the company · outside |
| Not in scope | Library 808 | Not in your documents / Not held |
| posture | Graph, Library | how well it is supported (the product's standing labels: Filed · Partly filed · Only an account states it · The record cannot settle it) |
| Negative / Positive polarity | Graph 5572–5601 (as a 22 px headline value) | the direction in words: "expects the margin to fall" |
| referent period · assertion time | Graph, leads | the period it is about · said on |
| Same claim key · different layers · layer | leads, Graph 4709 | drop |
| Independent confirmations 0 | leads, Graph | no outside source confirms it yet |
| Overlapping referent period | lead factors | about the same period |
| Analyst endorsement · Not yet | lead factors | you haven't reviewed this |
| Unresolved driver · Operational / narrative divergence | lead families | Open question · What they say vs what the numbers show |
| Artifact INFY-FS-26Q4-001 · Derived layers are rebuildable | evidence viewer 7035–7041 | the document's name and page; drop the rest |
| deterministic reconciliation · deterministic | Graph, Canvas | computed, not AI |
| Origin · Explore · Scoped question | Graph 7272 | drop · "Ask about these documents" |
| Estimate / model output | Library | our estimate |
| live · vendor | market pill | NSE close / NSE trading (the product's wording) |
| Connector reading, not evidence | market footer | keep only as a tooltip |
| scope grant | tour 11554 | access |
| opposite polarity · artefact id | tour 11494, 11500 | plain words |
| assistant · memo · living · workbook · live · note · manual · live · v5 | Canvas cards | AI step · Memo · Model · Your note · "updated 2 min ago" |
| Output contract · one hop only · inputs unchanged | Canvas inspector | What this step produces · reads only what is wired to it · nothing new to read |
| `read_scope` · `align_periods` (tool ids) | Canvas traces | Read 4 sources · Lined up the periods |
| Q4 Results Delta | Canvas section | What changed in Q4 |
| Reason over this · Form a view | lead CTAs | Look into this · Take a view |
| Inherited | Connectors 11301 | Shared by your team |
| Escalate one rung at a time… | Canvas inspector 9005 | drop (internal policy) |
| KP Jun26 · Sahi 23 Apr 26 (source short names) | Graph, citations | readable names in the style of the product's `graph/document-names.ts` |

## 3. Type and tokens

- **Fonts.** The prototype uses system-ui + Iowan/Palatino stacks (123–125) and a mono; the product
  uses the **three voices** — Instrument Serif display (≥18 px only), Instrument Sans body with tabular
  figures, JetBrains Mono for every figure (`packages/ui/src/theme.css` 128–131; DESIGN-SYSTEM §1.2).
  Adopt them, embedded offline (O4).
- **Scale.** **38** distinct font sizes, many at 8–9.5 px; page titles at 22, 20 and 24 px (10699,
  11110, 11264). Target ~8 steps and one page-title size.
- **Inline styles.** 345 `style=` attributes; form inputs styled as `.btn`.
- **Tokens.** Good: zero one-off hex outside the token block (one in a `console.log`). Behind the
  product: no `--ev-estimate`, `--ev-lead`, `--judgment-ink` (`packages/ui/src/tokens.css` 74–87).
- **Colour semantics** (ledger A-46): `--judgment` = `--accent`; a resolved falsifier uses
  `--market-up`; Library notes tinted as evidence. In the Graph, company, claim and selection are all
  violet; source blue = "reported" blue; supports-green ≈ segment-green (and green reads "up" to a
  market eye).
- **Motion:** the product's mechanism motion (`--ease-mech`, 120/160/220 ms, no bounce) — the story
  mode and file beat in phase 5 must use it.

## 4. Punctuation artefacts from the em-dash sweep (D14 — rewrite, don't substitute)

"N4A. AI-native…" (the page `<title>`, L6) · "Fact Sheet. Consolidated" / "HSIE Research. Company
Update" (3970–3974, 11853–11858) · "Anthropic. Claude" (5403–5412) · "in rupee terms: but only"
(4428) · `figure: "growth of 3.1%": when` (4596) · "start from · 20.3% reported" (4566) · "factual ·
which is" (12528) · "an outward action: sending mail…: is off" (11318) · a lone "," falsifier-reason
fallback (10971) · "," placeholders (3343, 3357, 3422) · a stray "," as an "Old" value (6742). Grep
for `: [a-z]` after a closing quote, `\. [A-Z][a-z]+ [A-Z]` in titles and lone `','` to find the rest.

## 5. Prototype seams (a showcase of the end state has none)

"Node4Analytics · Demo · Prototype" (sign-in footer) · "No facsimile… This prototype transcribes a
subset" (7008) · "This demonstration stops here…" (16092–16099) · further seams at 10147, 10426, 11170,
11328, 15036 · "Search reports its own failure…" (11433) · the console log "Design prototype…"
(16279, not visible — fine to keep). Replace each with the real end-state behaviour or a designed
state.

## 6. Units, periods, numbers (D5)

Today: Infosys in ₹ crore, HDFC in ₹ bn; one HDFC drawer mixes ₹ bn with "5.6 crore shares"; the HDFC
Graph Figures table shows **₹43,975 bn** beside **₹11,25,000 cr**; period labels "Q4'25 … Q1'27" read
as calendar quarters; `fmt.pct` emits a hyphen minus beside true minus signs elsewhere. Target: ₹ crore
in tables, ₹ lakh crore in prose, Indian grouping, `Q1 FY27`, bps / pp, true minus, basis on every
multi-basis number, the source's printed unit in the citation.

## 7. Responsive

At ≤1000 px the Notes filters and the search bar vanish with no replacement (3145–3146); phones keep a
58 px rail (3131). The navbar port (phase 2.1) replaces both with the product's fold-into-a-disclosure
at ≤760 px.

## 8. What the screenshots showed (my own pass, 2026-10-05)

- **Sign-in:** clean; the footer's "Demo · Prototype" is the only off note.
- **Console:** a well-made object model; but it shows "Edited 6h ago", not coverage age, and "watch"
  in lowercase.
- **Library (both):** the evidence box + price card push the first business sentence to ~820 px down
  at 1600×1000; "What changed" charts show no y-axis values except the endpoint (an analyst cannot read
  magnitude — the CASA line "falls" from Q4 to Q1 with no visible numbers); the Timeline clips labels
  at the right edge and collides a gap-band label with a plotted dot.
- **Graph (HDFC):** a hairball of two-letter glyph circles; truncated labels; three columns of chrome
  squeeze the map; the Figures table wraps values over 3–4 lines and mixes ₹ bn and ₹ cr; the Ask
  panel is a large empty area until used.
- **Canvas (Infosys):** at fit zoom (51%) nothing inside a card is readable; wires cross from the left
  section to the far right; the three sections read as shapes, not as a sequence.
- **Dashboard (HDFC):** strong falsifier content; "My view" leaves a large empty column; no valuation
  or dates.

## 9. The instrument

`node scripts/verify-prototype.mjs` at baseline: **261 PASS, 0 FAIL, "ALL GREEN"** across 31 sections
(boot, platform layer, intake, account, console, colour, generality, chooser, job card, sign-in →
platform → workspace, routing, delete gate). It is a DOM-shim logic check: it does not test layout, or
whether a figure is true, or the consistency of Dashboard and Notes data — which is why the ledger's
date and decision-log errors pass it. It has no dependency on the rail, so the navbar swap will not
break it, but it will not verify the new bar either. The figure → page checker (phase 0.6) closes the
truth gap; screenshots close the layout gap.
