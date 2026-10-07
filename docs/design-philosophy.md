# FinQuira Design Philosophy

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

*Living document. Updated iteratively as reference sites are analyzed.*
*Last updated: 2026-04-11 — Post Reference #7: hudson-labs.com*

---

## 1. Brand Character

FinQuira is a **professional instrument**, not a consumer product. It should feel like opening a Bloomberg terminal for the first time — dense with capability, visually authoritative, immediately signaling that this is a tool built by people who understand the work. But unlike Bloomberg, it should also feel *orchestrated* — there is a calm logic to how information flows, how tools connect, how the canvas composes a workflow. The product's character lives at the intersection of **precision engineering and visual composability**.

**What it feels like to use:** Controlled confidence. The interface says "I was built for exactly this task." Every element earns its place. Nothing decorative without function. The sensation is closer to a well-designed cockpit instrument panel than a marketing dashboard — layered information, clear hierarchy, zero ambiguity about what each control does.

**What it feels like to look at:** Structurally rigorous. Dense but not cluttered. There is a sense of *depth* — layers of information existing in parallel, connected by visible logic (the node/canvas metaphor). The landing page should carry this DNA even though it is marketing material, not product UI. A visitor should feel they are looking at the surface of something substantial underneath.

**What emotions it should trigger:** Authority. Intellectual respect. Curiosity about the workflow beneath. A slight sense of gravity — this tool handles real decisions with real consequences.

**What emotions it must NOT trigger:**
- Playfulness or whimsy (this is not a consumer AI toy)
- Hype or breathlessness (analysts are allergic to marketing overclaim)
- Generic "AI magic" wonder (the value is workflow orchestration, not AI novelty)
- Intimidation or opacity (density is fine, confusion is not)
- Cheapness or template-origin signals (the audience recognizes generic SaaS instantly)

---

## 2. Target User Lens

The target user is an **equity or investment analyst**. This person:

- Spends 8-12 hours a day inside dense information environments (Excel, FactSet, Bloomberg, Capital IQ, PDF filings, broker research)
- Has refined taste for information density — they do not want things oversimplified or dumbed down
- Is deeply skeptical of marketing claims, especially from AI products — they have been burned by tools that overpromise
- Evaluates tools by asking: "Will this actually save me time on a real workflow, or is this a demo?"
- Trusts evidence over assertions. Show, don't tell. Specificity beats superlatives.
- Respects tools that feel like they were built by domain experts, not generic product teams

**What signals trust to this audience:**
- Precise language — specific claims with numbers ("reduces tool-switching by consolidating 6 workflow steps into one canvas") rather than vague promises ("supercharge your research")
- Information density that mirrors their working environment — they are comfortable with complex interfaces
- Evidence of understanding their actual workflow (data gathering, corpus building, analysis, report generation) — not abstract "productivity" language
- The audience named by role, not by abstraction — "equity analysts" / "investment analysts" directly, not "knowledge workers" or "research teams." Role-naming is an instant recognition signal.
- Deep workflow vocabulary used without translation — filings, earnings, comps, diligence, models, memos, broker research, data room. Softening these terms reads as "built by people who don't know the work."
- Professional typography and restrained color — the visual register of institutional finance, not consumer tech
- Visible structure — grids, clear hierarchy, systematic spacing. These users live in spreadsheets; they notice when things don't align.

**What would make them immediately distrust the product:**
- "AI-powered" as the headline with no specifics on grounding or accuracy
- Floating 3D mockups with fake data
- Purple/blue gradient hero sections that look like every other AI startup
- Chatbot-forward positioning (they have seen dozens of "AI research assistants" — FinQuira must not look like one)
- Consumer-grade illustrations or cartoon iconography
- Vague feature descriptions without workflow context
- Any visual pattern they have seen on 10 other SaaS landing pages this week

---

## 3. Visual Identity Direction

### Color Palette

**Direction: Dark-ground, warm-neutral palette with a single, precise accent.**

The analyst's working environment is dominated by dark-themed terminals and dense data interfaces. A dark foundation signals seriousness and provides natural depth for layered information. The palette must avoid the cold blue-black of generic dark modes and the purple-leaning navy of developer tools — both read wrong for institutional finance.

**Refined palette:**
- Base dark: warm charcoal — `#141210` to `#1A1816` range (near-black with brown/amber undertone, not blue/purple)
- Raised surface: `#1E1C1A` to `#24211E` range — luminosity step up, same hue
- Elevated surface: another luminosity step — no new hues, only brightness
- Accent: muted amber/copper — `#C4915C` to `#B8845A` (desaturated, institutional; think oxidized bronze, not flame orange)
- Text primary: warm off-white — `#E8E4DF` (not pure white, harsh on warm dark grounds)
- Borders: very subtle warm gray — `rgba(255,248,240,0.08)` range

Depth is created through luminosity shifts between surface layers — not hue variety, not glassmorphism, not atmospheric gradients. Glassmorphism is now explicitly ruled out by Hudson Labs' negative example: translucent `bg-white/[0.02-0.08]` panels with backdrop blur on dark grounds read as 2022 SaaS template, not institutional instrument. FinQuira's card surfaces are opaque luminosity-stepped panels with hairline warm-gray borders, never translucent overlays. The accent is used only for primary actions and critical attention points — never decoratively, and explicitly never as a card border color (Verity uses a saturated warm accent for card borders and it over-activates the palette; Hudson Labs uses `border-violet-500/30` on feature-emphasis cards with the same dilution effect; FinQuira's copper stays reserved for actions and active states, with systemic borders in subtle warm gray). The warm undertone must be unambiguous — two direct competitors now occupy the cold-dark register (Hebbia at pure `#000` and Hudson Labs at `#0a0a0a`), so FinQuira's warm charcoal must visibly read as warm against both on side-by-side comparison. The single-accent position is triply load-bearing: Hebbia commits to strict monochrome (zero accent), Hudson Labs commits to violet (the universal generalist-AI accent that undermines its own anti-generalist-AI positioning), and FinQuira's muted copper is the institutional-finance inverse of both — warm enough to distinguish from Hebbia's monochrome austerity, specific enough to distinguish from Hudson Labs' generic violet. **Violet is now explicitly banned as an accent direction for FinQuira** — using it would read as a Hudson Labs echo and would directly contradict FinQuira's anti-generalist-AI positioning, exactly as it contradicts Hudson Labs'.

### Typography

**Direction: A sharp, high-contrast serif for display. A technical sans-serif with strong tabular figures for body.**

A display serif places FinQuira in the register of financial editorial authority (FT, Economist, Bloomberg Opinion) and makes it visually unconfusable with developer tools, all of which default to geometric sans. The serif must be modern — high contrast, sharp terminals — not a classic old-style cut. At large fluid sizes (`clamp(4rem, 9vw, 10rem)`), a well-chosen serif creates visual authority that no geometric sans can match. **The serif instinct is now validated by two direct competitors:** Verity Platform uses Reckless (warm renaissance register) and Hudson Labs uses Source Serif 4 (transitional literary register). The display serif is no longer an unoccupied category chasm — it is an adopted category move, and FinQuira must now claim a specific, differentiated sub-register within the serif space. The remaining unclaimed slot is **sharp modern editorial** — high-contrast, architecturally-precise, explicitly financial-editorial cuts (GT Sectra, GT Super, PP Editorial New territory) distinct from both Verity's warm renaissance Reckless and Hudson Labs' softer transitional Source Serif 4. A third direct competitor (Hebbia) uses uppercase-tracked sans at confident display scale, raising the compositional weight bar, but its largest display is still bounded by `~5.625rem`. **Both serif competitors also capped their display scale at moderate sizes (Hudson Labs at `text-7xl` / ~72px, Verity similarly bounded); neither pushes into editorial-display territory. Scale is therefore the single strongest axis of differentiation within the serif space — FinQuira's serif must be set at full `clamp(4rem, 9vw, 10rem)` (64–160px), larger than every direct competitor, in mixed case, with the sharper modern-serif character needed to out-serif the serif competitors.** The combination of sharp modern editorial serif + full display scale + warm dark ground + asymmetric editorial composition remains unoccupied across all seven analyzed references. A secondary typographic layer — uppercase-tracked sans at small sizes for eyebrow labels, card metadata, and status indicators — is a defensible borrow from Hebbia's institutional DNA at a subordinate level, enriching the type system without contesting the display-serif claim.

The body typeface must support strong tabular/monospaced figures (analysts read columns of numbers constantly — misaligned figures destroy credibility). Geometric or humanist sans with technical DNA — precise, legible at small sizes, strong x-height. Not warm and friendly. Not cold and robotic. **Inter is directly contested: Hudson Labs pairs Source Serif 4 + Inter, and this serif-plus-Inter pairing is becoming the default AI-SaaS combination.** FinQuira's body face must be a characterful technical sans (ABC Diatype, Söhne, Graphik, or a precision-cut like Pitch territory) — not Inter, not Roboto, not GT America (carries Notion/general-tech association), not any of the banned list. Body-face differentiation is now a specific anti-Hudson-Labs requirement, not just a generic standard.

Both typefaces available via Google Fonts.

### Layout and Density

**Direction: Asymmetric editorial grid with calibrated density. Structured and layered.**

The landing page should read more like a financial publication's feature spread than a typical SaaS marketing page. Content-forward, with typographic hierarchy doing the heavy lifting. The editorial ceiling for product marketing is higher than most SaaS pages use — FinQuira should reach for it through display scale, confident whitespace around the hero, asymmetric bento-style feature composition, and copy written with editorial voice rather than marketing assembly.

Key principles:
- **Asymmetric composition** — break the centered-headline-plus-symmetric-cards pattern
- **Visible grid logic** — subtle structural borders or alignment rails that echo the spreadsheet/canvas environment
- **Layered depth** — sections that feel like they exist on different z-planes, communicating the canvas metaphor through the page's own structure
- **Calibrated spacing** — rhythmic, varied rather than uniform. Tighter where content is related, generous at conceptual breaks
- **Higher density than typical SaaS, but not at the cost of editorial breathing room** — operate between generic SaaS density and broad-consumer sparseness, closer to financial-publication rhythm. Sparse enough to feel composed; dense enough that an analyst trusts there is substance underneath. Two broad-committee competitors (AlphaSense and Verity) converge on moderate SaaS density; a third direct competitor (Hebbia) pushes measurably denser through a **two-layer density model** — moderate breathing room *between* sections, dense populated content *within* sections (visible earnings matrices, deal-term tables, 10+ rows of parsed data). This two-layer pattern is the nearest-to-target exemplar in the reference set and should be FinQuira's explicit density model: breathe between sections, pack real workflow content inside them. The target remains a focused FT feature spread, not a Bloomberg terminal screen.
- **Bento-style feature grid with asymmetric spans** — varied card sizes create rhythm and avoid the monotonous 3-column SaaS pattern. Differentiate cards through luminosity and structure, not through color-coding (color-coded features imply independence; FinQuira's features are a single orchestrated workflow).

Section transitions use luminosity shifts within the dark palette — background steps slightly lighter or darker — but luminosity shifts alone are insufficient on a monochromatic warm dark ground (the step between `#141210` and `#1E1C1A` is too subtle to register as deliberate architecture). Structural horizontal rules, hairline alignment marks, or connector-line decorations are required at section boundaries to signal composition. No decorative shapes, no hue-based differentiation, no wave dividers. The structural cues themselves carry the page-as-canvas metaphor, which is the differentiating move — no reference in the competitor landscape uses structural or connector-line transitions.

### Iconography and Graphic Language

**Direction: Node/canvas metaphor as the graphic language. The page itself reads as an abstracted canvas. No generic icons or illustrations.**

The visual language derives from the product's core metaphor: nodes, connections, flows, canvases. Diagrams that show workflow topology. Line-drawn connections between information elements.

The landing page should use node/connection visual language as the **structural design system of the entire page**, not only as a hero visualization. Feature cards rendered as node-shaped rectangular containers. Section transitions carrying subtle connector-line decoration that evokes node-graph edges. The layout itself readable as an abstracted workflow — elements visually linked by implied lines, structural alignment echoing the grid of a workflow diagram. Execution should be rigorous and engineering-document in tone (precise rectangles, grid-aligned connectors) rather than informal whiteboard-sketch. This communicates the interaction model through the page structure rather than through a product screenshot — especially important pre-launch.

The hero visualization must show the canvas in its **assembled, connected, working end-state** — nodes populated, connections resolved. Never an empty canvas. The node-connection animation draws into an already-populated workflow, not into a blank field. Populated means literal: node labels must carry real analyst workflow vocabulary (10-K filing, earnings transcript, KPI extract, comps table, memo draft, broker research synthesis) and at least one node should display a sample output (a revenue figure, a draft memo line, a populated comp row) so the viewer sees what the product produces without requiring a full UI screenshot. The diagram is executed at production-UI craft quality — precise geometry, rigorous typography, considered spacing, aligned to the underlying grid — because Hebbia's embedded product screenshots set a visual-craft bar that an abstract diagram must meet to avoid reading as pre-launch-thin.

No generic feature icons. No isometric illustrations. No humanized character illustrations. No abstract blob shapes. If a graphic element appears, it should look like it was extracted from the product itself.

---

## 4. Motion & Interaction Principles

**Philosophy: Orchestrated precision, not decorative flourish.**

Motion should feel like a well-timed mechanism — things move because they have somewhere to go, not because movement looks interesting.

### Page Load
One orchestrated entrance sequence, 800ms–1200ms total. Content reveals in logical order mirroring the product's data flow: headline establishes the proposition, then supporting elements build outward like nodes appearing on a canvas. Staggered, purposeful, fast. After 1200ms, the page is fully settled and static.

**Signature moment:** The hero entrance includes connection lines drawing themselves between workflow stage nodes — 800–1200ms, communicating the canvas metaphor through motion. This is the only animation on the page that earns its complexity. Everything else is functional and near-invisible. The animation must teach the product metaphor in the act of animating, not decorate the hero atmospherically — a direct competitor (Hebbia) now uses an atmospheric helix animation that feels premium but communicates nothing about the product concept, and FinQuira's motion must differentiate by being explanatory (nodes appearing, connections resolving into a populated workflow) rather than decorative.

### Scroll Behavior
Minimal scroll-triggered animation. Viewport entries: short upward translate (12–16px) with opacity fade, 250–350ms, controlled easing. No parallax. No scroll-jacking. No continuous animation on scroll.

### Hover and Interaction
Subtle and immediate — opacity shifts, border reveals, slight scale (1.01–1.02 max). 150ms or less. Feels like activating a control, not triggering an effect.

On touch devices: active/pressed states replace hover states entirely.

### Prefers-reduced-motion
All animations collapse to instant state changes. The signature hero animation renders as a static, fully-connected diagram. No delays, no transforms. Non-negotiable.

### What motion must NOT do:
- Bounce, overshoot, or spring
- Parallax scroll anything
- Animate continuously or loop
- Delay content visibility beyond the 1200ms page load
- Use atmospheric blur/glow animations as decorative filler

---

## 5. The Landing Page's Job

### The Single Most Important Thing It Must Communicate

**"FinQuira is a workflow operating system for analysts — not another AI chatbot."**

Every AI company leads with "AI-powered research." FinQuira leads with **workflow orchestration**. The landing page must make the visitor understand, within 5 seconds, that this product consolidates their fragmented workflow into one composable canvas — and that AI is the engine inside, not the interface on top. AI should be described by what it produces inside the workflow (drafted memos, extracted KPIs, cross-document comparisons, populated model cells), never by how the user talks to it. The word "chat" should not appear on the page. Four direct competitors now triangulate the AI-framing spectrum — AlphaSense leads trust-forward with citation language, Verity barely mentions AI at all, Hebbia leads with category ("AI for Finance") and enterprise-compliance trust, and Hudson Labs leads method-first with "high-precision AI built for institutional investors" and the positioning hook "the precision of a terminal with the adaptability of AI." FinQuira sits between Verity and Hebbia, closer to Verity: do not lead with AI, do not abandon trust signals, borrow Hebbia's reasoning/intelligence/context vocabulary palette for the AI positioning section, and surface enterprise compliance badges (SOC 2, encryption, no training on user data) as a secondary trust touch near the footer. Hebbia owns "AI for Finance" and "Institutional Intelligence"; Hudson Labs owns "terminal precision," "find what matters," and "high-precision AI" — FinQuira must not claim any of these, and any "AI for X" or "High-precision AI for X" construction is banned. **"Terminal" as a hero anchor word is now also occupied** — FinQuira evokes Bloomberg-terminal gravity through design execution (dark ground, density, tabular figures, node-canvas as instrument), not through naming the reference. **Anti-chat rhetoric is sharpened by Hudson Labs' "no prompting gymnastics" technique:** name and reject the operational cost of chat-based AI tools by specific failure mode (prompt crafting, context resetting, conversation-state management, blank-page problem) rather than generic "we're not a chatbot" framing. The workflow / canvas / orchestration / operating-system vocabulary territory is confirmed fully unoccupied by both direct AI competitors (Hebbia uses "matrix," Hudson Labs uses "precision") and is FinQuira's clearest linguistic white space.

The hero headline leads with **outcome**, not method, and asserts a vision rather than defending against a category weakness. Not "Build your workflow visually," not "AI insights you can trust" — but "Your entire research workflow, one canvas." Analysts do not self-identify as builders, and leadership copy beats catch-up copy with this audience. Trust and auditability belong as a secondary reinforcement, not the primary hero claim. The headline itself carries only the outcome proposition — the audience name ("equity analysts," "investment analysts") lives in the hero subhead, not the headline, because both direct competitors converge on this pattern and it keeps the headline short and memorable. Consider a two-beat declarative structure with a full stop between beats for typographic rhythm ("Your research workflow. One canvas.") — a technique validated by Verity at display serif scale.

**Hero discipline: one idea, set large, nothing else fighting for attention.** The hero must commit to a single outcome-first proposition and let the rest of the page do the rest of the work. No feature list in the fold. No three parallel value props. One headline, one supporting visual (the node-connection diagram), one primary CTA. Everything else defers below. If FinQuira adopts a single interactive demo element (Q14), it lives mid-page in section 3 or 4 — never in the hero fold, where it would compete with the headline and dilute the conversion path.

### What a Visitor Should Understand in 5 Seconds
1. This is a professional tool for investment/equity analysts (not a general AI product)
2. It orchestrates the full research-to-report workflow in one place (not just one step)
3. It is built around a visual canvas where tools connect (a distinctive interaction model)

### What a Visitor Should Feel in 5 Seconds
- "This was built for people like me" (domain recognition)
- "This is serious" (professional authority, not startup hype)
- "I want to see how the canvas works" (curiosity about the orchestration model)

### The Conversion Job
Converting interest into early-access signups. The visitor needs enough understanding and trust to give their email:
- Clear enough product explanation that they can picture using it
- Enough specificity that they believe it is real
- Enough restraint that they do not feel oversold
- Low-friction email capture — not a multi-step form

Pre-launch social proof must be different in kind from established products. No "trusted by X Fortune 500 companies." Use domain credibility (team understanding of analyst workflow, specificity of the problem statement) and any early testimonials. The specificity of the problem description itself is the strongest implicit proof of expertise. **The pre-launch statistics-block pattern is now resolved via Hudson Labs:** instead of Hebbia-style AUM/scale numbers (unavailable pre-launch), use concrete before/after time-saving claims with specific numbers — Hudson Labs' "Get up to speed in 2 hours instead of 2 weeks" is the reference rhetorical shape. Candidate FinQuira metrics: "6 tools → 1 canvas," "2 weeks of research in 2 days," "17 workflow steps → 1 composable flow." Before/after concrete numbers, not percentages. Founder credibility signaling (analyst-workflow background, domain-expert bios) should be surfaced explicitly, not buried in the About section — Hudson Labs' explicit "CPA and data scientist" / "author of *Designing LLM Applications*" bios do meaningful trust work for a skeptical audience.

### What the Landing Page Is NOT
- A product demo (make visitors want a demo, not replace one)
- A feature comparison matrix
- A technical whitepaper
- A generic "AI for finance" pitch

---

## 6. Anti-patterns to Avoid

### Visual Anti-patterns
1. **Centered hero with floating product mockup** — the most common SaaS pattern
2. **Purple-to-blue gradient backgrounds** — universal "AI company" signal
3. **3-column feature grid with icons** — default SaaS feature section, uninformative
4. **Wave or curved section dividers** — decorative and meaningless
5. **Glassmorphism cards with blur effects** — dated, signals "followed a Figma trend"
6. **Abstract 3D renders or mesh gradients** — generic AI-startup aesthetic
7. **Stock photography of people looking at screens** — destroys credibility
8. **Chatbot UI as the hero visual** — opposite of FinQuira's differentiation
9. **Midnight navy + flame orange** — reads as developer tool, not financial instrument
10. **Atmospheric gradient/blur decoration around product screenshots** — generic, says nothing
11. **Violet / `#7c3aed` / "AI purple" as accent color** — universal generalist-AI signal, directly contradicts anti-generalist-AI positioning (Hudson Labs' self-inflicted wound)
12. **Gradient-overlay section transitions on dark ground** — the dark-mode equivalent of wave dividers; reads as generic SaaS rhythm not structural composition

### Copy Anti-patterns
13. **"Supercharge / Revolutionize / Transform"** — hyperbolic verbs analysts tune out
14. **"AI-powered" / "High-precision AI" as the lead descriptor** — every competitor says some variant; lead with workflow
15. **Vague benefit statements** — "Save time" means nothing; "Consolidate 6 tools into one canvas" means something
16. **Feature lists without workflow context** — features matter only in workflow sequence
17. **Method-first headlines for a non-builder audience** — "Build visually" is right for developers, wrong for analysts; lead with outcome
18. **"Terminal" as a hero anchor word** — Hudson Labs owns "the precision of a terminal with the adaptability of AI"; FinQuira evokes Bloomberg-terminal gravity through design execution, not through naming the reference
19. **"AI for Finance" / "AI for X" construction** — Hebbia owns the category phrase

### Interaction Anti-patterns
20. **Scroll-jacking** — disrespectful of user control
21. **Auto-playing video with sound** — immediate bounce trigger
22. **Excessive loading animations on a static page** — page should load fast and render complete
23. **Chat widget on the landing page** — ironic for a product that differentiates from chat tools
24. **Hover-only information reveals** — fails on touch devices
25. **Carousel-based product showcases** — hides content behind interaction, harms scannability

### Structural Anti-patterns
26. **More than 6 sections before the primary CTA** — focused, not exhaustive
27. **Testimonial carousels** — show the best ones statically
28. **"Trusted by" logo bars pre-launch** — analysts will check; hollow without real logos

---

## 7. Open Questions

### Resolved by Reference #1 — n8n.io
*(See [docs/references/01-n8n-io.md](Competitor%20research/01-n8n-io.md) for full analysis.)*

- **Q1 — How dark is the dark?** Warm charcoal (`#141210`–`#1A1816`), not navy/purple-black. Purple undertone signals developer tool.
- **Q2 — Accent color?** Muted amber/copper (`#C4915C`–`#B8845A`). Significantly lower saturation than developer tool oranges.
- **Q3 — Serif or sans-serif?** **Serif confirmed** as structural differentiator — every node/canvas tool uses geometric sans.
- **Q7 — Signature motion moment?** **Yes.** Hero entrance with connection lines drawing. n8n proved the gap exists in this product category.

### Resolved by Reference #2 — notion.com
*(See [docs/references/02-notion-com.md](Competitor%20research/02-notion-com.md) for full analysis.)*

- **Q4 — How editorial can a fintech landing page go?** The ceiling is higher than most SaaS pages use. Editorial feel comes from four techniques: one big idea per section at magazine-headline scale, confident whitespace around the hero, asymmetric bento composition for features, and copy written with voice rather than assembled from templates. For a finance audience, FinQuira can go further than Notion by adding a display serif and operating at higher structural density.
- **Q12 — Asymmetric hero composition for a node-canvas product?** Large left-anchored headline owns the fold, supported by one concept-communicating visual (the node-connection animation). Headline is the primary visual element. No centered symmetry, no three-column split, no feature list in the hero.

### Resolved by Reference #3 — miro.com
*(See [docs/references/03-miro-com.md](Competitor%20research/03-miro-com.md) for full analysis.)*

- **Q5 — Canvas visualization without a product screenshot?** Three-part answer: (1) show the canvas in its assembled end-state, never empty; (2) use tight-cropped product fragments for detail sections (validated across Notion and Miro); (3) most importantly, use the canvas's own visual language — nodes, connection lines, node-shaped containers — as the design system of the page itself, not just as content inside a screenshot. The page should read as an abstracted canvas.
- **Q10 — Best canvas tool landing pages beyond n8n?** The canvas-tool design consensus is now clear: left-anchored asymmetric hero, no live canvas embed in the hero, flat card surfaces, single load-bearing accent, sans-serif typography, moderate density. FinQuira conforms on structural decisions (hero composition, no glassmorphism, single accent, no live embed) and differentiates on typographic and tonal decisions (display serif, higher density, editorial-authoritative voice). Figma/Linear/Retool remain useful but the core pattern is established.
- **Q14 (placement) — Interactive demo element location.** Mid-page, never in the fold. Both Miro and Notion place interactive elements in section 3 or later, after the visitor has absorbed the hero narrative. A live element in the hero competes with the headline and dilutes conversion. Scope of the element remains open.

### Resolved by Reference #4 — alpha-sense.com
*(See [docs/references/04-alphasense-com.md](Competitor%20research/04-alphasense-com.md) for full analysis.)*

- **Q9 — What do competing analyst tool landing pages look like?** The category baseline is **enterprise SaaS visual convention (cool light ground, generic sans-serif, corporate blue accent, whitespace-only separation, centered/hero-video composition, moderate density) combined with finance-specific copy (named roles, workflow vocabulary, trust-forward AI framing, specificity in claims)**. The visual identity is generic; copy does all the domain work. FinQuira's strategy: **match on copy discipline and domain vocabulary, subvert on every visual-identity axis.** Warm dark instead of cool light, display serif instead of generic sans, editorial density instead of SaaS moderate, structural rules instead of whitespace-only separation, asymmetric editorial hero instead of hero-video composition, bespoke concept-carrying animation instead of product video, assertive vision copy instead of trust-hedge defensive copy. The visual identity should be a positioning statement in its own right — something AlphaSense has explicitly left on the table.

### Resolved by Reference #5 — Verity Platform
*(See [docs/references/05-verityplatform-com.md](Competitor%20research/05-verityplatform-com.md) for full analysis.)*

- **Q11 — Border/surface treatment on warm palette?** **Resolved.** Verity is the first warm-ground reference in the set and uses visible 1px hairline borders on primary cards, confirming directly that warm monochromatic grounds require structural cues rather than whitespace-only separation. FinQuira's warm dark ground uses subtle warm-gray hairlines (`rgba(255, 248, 240, 0.10–0.14)`) as systemic card treatment, with an optional offset-border variant (pseudo-element, 6px offset, same color) for one or two signature cards. Accent copper is reserved for primary actions and active states, never card borders.
- **Q17 — Where does explicit audience-naming live?** **Resolved.** Both direct competitors converge on audience naming in the hero subhead, not the hero headline. Headline carries the outcome proposition ("Your research workflow. One canvas."); subhead carries the audience specificity ("For equity and investment analysts"). This keeps the headline crisp and memorable while establishing role recognition immediately beneath it.
- **Q18 — How prominently should AI trust/hallucination be addressed?** **Resolved.** The two direct competitors bracket the spectrum — AlphaSense leads trust-forward, Verity barely mentions AI at all. FinQuira sits between: do not lead with AI, do not ignore trust entirely, secondary reinforcement only (in the AI-positioning section, not the hero), always framed through what the AI produces inside the workflow, never through interface. The word "chat" is banned; "AI-powered" as a lead descriptor is banned; explicit citation/grounding language appears once as reinforcement, never as the primary hero claim.

### Resolved by Reference #6 — Hebbia
*(See [docs/references/06-hebbia-com.md](Competitor%20research/06-hebbia-com.md) for full analysis.)*

- **Q15 — Page-as-canvas literalness.** **Resolved.** Hebbia proves that literal populated product surfaces convert better than abstract diagrams at the institutional-finance tier. FinQuira's page-as-canvas principle means four things together: (a) the hero visualization is a populated canvas with real analyst workflow labels (10-K filing, earnings transcript, KPI extract, comps table, memo draft), not an abstract node pattern; (b) at least one node displays a sample output so the viewer sees what the product produces; (c) mid-page feature sections include realistic canvas fragments showing specific use cases; (d) the page's structural vocabulary (node-shaped containers, hairline connectors, canvas-metaphor section transitions) echoes the canvas visual system as the design language of the entire page. The combination of literal populated canvases and abstract structural vocabulary is the full treatment — neither alone is sufficient.
- **Q20 — How to avoid reading as "warm-dark Verity" (or warm-dark Hebbia)?** **Resolved.** With three direct competitors now mapped, the answer is commitment on all six differentiation axes simultaneously: warmth (warm charcoal, not Hebbia's cold black, not Verity's warm cream), typography (sharp modern serif at editorial scale, not Hebbia's uppercase sans, not Verity's Reckless), AI framing (workflow-first, not Hebbia's category-first, not AlphaSense's trust-first), product visualization (populated node canvas, not Hebbia's matrix, not Verity's Venn), composition (asymmetric editorial with concept-carrying animation, not Hebbia's atmospheric helix, not Verity's static hero), and section architecture (structural connector-line transitions, not Hebbia's whitespace, not Verity's decorative SVGs). Differentiation is a vector, not a single move. Weakening any one axis makes the page read as derivative of one competitor; the combination is the brand.

### Resolved by Reference #7 — Hudson Labs
*(See [docs/references/07-hudson-labs-com.md](Competitor%20research/07-hudson-labs-com.md) for full analysis.)*

- **Q19 — Which specific display serif, given Reckless is now occupied by Verity?** **Resolved to sub-register and scale constraint; specific face still pending prototype.** Hudson Labs is the second direct competitor to use a display serif (Source Serif 4 — a transitional literary cut at `text-7xl` / ~72px). The serif-competitor set now occupies two sub-registers: **warm renaissance (Verity/Reckless)** and **transitional literary (Hudson Labs/Source Serif 4)**. FinQuira's remaining differentiated slot is **sharp modern editorial** — high-contrast, architecturally-precise, explicitly financial-editorial cuts (GT Sectra, GT Super, PP Editorial New). Critically, both serif competitors capped their display scale at moderate sizes; neither pushes into true editorial-display territory. **Scale is therefore the strongest axis of differentiation within the serif space** — FinQuira's serif must be set at full `clamp(4rem, 9vw, 10rem)` (64–160px), genuinely larger than every direct competitor, in mixed case, to out-serif the serif competitors. Specific face choice (GT Sectra vs. GT Super vs. PP Editorial New) still requires working prototypes on warm charcoal ground.

- **Q22 — Pre-launch scale-metric statistics block.** **Resolved (rhetorical shape).** Hudson Labs' "Get up to speed in 2 hours instead of 2 weeks" is the strongest pre-launch-compatible proof pattern in the reference set — concrete before/after time-savings with specific numbers, skeptic-resistant and imaginable. FinQuira adopts this rhetorical shape instead of Hebbia's AUM/scale three-number block (unavailable pre-launch). Candidate FinQuira metrics: "6 tools → 1 canvas," "2 weeks of research in 2 days," "17 workflow steps → 1 composable flow." Before/after concrete numbers, not percentages, not absolute scale. Specific metric choice depends on product telemetry but the rhetorical form is locked.

- **Q23 — Positioning hook phrase.** **Largely resolved (territory locked, final phrasing pending).** Four direct competitors now confirm the pattern that every direct competitor operates a memorable positioning phrase: Hebbia owns "Institutional Intelligence" and "AI for Finance"; Hudson Labs owns "The precision of a terminal with the adaptability of AI" and "Find What Matters in Public Markets"; Verity owns "Fund Performance. Accelerated."; AlphaSense owns "AI insights you can trust." The **workflow / canvas / orchestration / operating-system vocabulary is confirmed fully unoccupied** by both direct AI competitors (Hebbia uses "matrix," Hudson Labs uses "precision" and "terminal"). **"Terminal" is now occupied by Hudson Labs and is banned from FinQuira's hero anchor.** Leading FinQuira candidate territory: "The Analyst's Canvas," "One Canvas for Research," "Workflow, Composed.," "Research, Composed.," "The Research Operating System." Final phrasing decision pending hero-copy pass.

### Partially Addressed

- **Q6/Q13 — Information density calibration?** Not advanced by Hudson Labs. Hudson Labs operates at the same moderate SaaS density as AlphaSense and Verity (three of four direct competitors now converge on moderate; Hebbia remains the only dense-within-section exemplar). The updated density triangle holds: Notion (sparse) → AlphaSense/Verity/Miro/Hudson Labs (moderate) → Hebbia (two-layer, dense-within) → FinQuira (modestly denser than Hebbia via structural richness) → FT/Bloomberg (dense editorial). The absolute dense-editorial upper bound is still unexemplified.
- **Q8 — Section transitions on dark ground?** Further advanced by Hudson Labs (negative evidence). Hudson Labs uses whitespace + subtle `bg-gradient-to-b` gradient overlays on a cold dark ground and the result reads as generic SaaS rather than institutional instrument — confirming that gradient-overlay section transitions are a dark-mode anti-pattern (the equivalent of wave dividers) and that structural connector-line/hairline-rule transitions are the functionally necessary alternative on warm dark ground. Direct validation on a *warm* dark ground is still pending.
- **Q14 (scope) — Interactive element scope.** Not advanced by Hudson Labs.

### Still Open

- **Q13 — Density at the truly dense-editorial upper bound.** Hebbia is the densest reference so far (two-layer model) but does not reach FT/Economist/Bloomberg density. A direct dense-editorial finance publication or dense professional tool reference is still needed to anchor the absolute upper bound.
- **Q16 — Above-hero promotional strip** — worth reserving as a structural slot in the layout system for future waitlist counts, launch beats, or milestones? Decision deferrable; slot worth keeping.
- **Q21 — Uppercase-tracked secondary typography.** Should FinQuira explicitly adopt uppercase-tracked-sans treatment for secondary typography (eyebrow labels, card metadata, status indicators) to borrow Hebbia's institutional DNA at a subordinate level without contesting the display-serif claim? The combination of display serif headlines + uppercase-tracked sans eyebrows creates a richer typographic system than either alone. Decide at next design-system pass.
- **Q24 — Card corner geometry as structural differentiator.** Every mapped SaaS reference uses 12px (`rounded-xl`) rounded corners. Should FinQuira adopt sharper corners (4–6px, or fully square) on signature cards to structurally echo the node/canvas metaphor and differentiate from the universal SaaS rounded-rectangle convention? Rounded corners soften and domesticate the rectangular node geometry. Decide at next design-system pass.
- **Q25 — Anti-chat rhetoric specificity.** Hudson Labs' "no prompting gymnastics" names the operational cost of chat-based AI by specific failure mode. Should FinQuira commit to a specific anti-chat failure-mode list in the AI-positioning section (naming prompt crafting, context resetting, conversation-state management, blank-page problem) rather than generic "we're not a chatbot" framing? The rhetorical technique is validated; FinQuira's specific copy still needs drafting.
- **Q26 — Body-face differentiation specifically from Hudson Labs.** Two of four direct competitors now pair a serif display with Inter body (Hudson Labs confirmed; Verity's exact body face less certain). If the serif-plus-Inter pairing becomes the category default, FinQuira's body face choice becomes more urgent. Candidates: ABC Diatype, Söhne, Graphik, or a precision-cut like Pitch. GT America carries Notion/general-tech baggage. Needs a concrete pick at the next design-system pass.

---

## Reference Log

| # | Reference | Date | Key Extractions | Full Analysis |
|---|-----------|------|-----------------|---------------|
| 1 | n8n.io | 2026-04-09 | Navy+orange palette = developer register, not finance; all-geometric-sans = generic, confirms serif differentiator; centered SaaS layout = no editorial risk; glassmorphism = dated; no signature animation = opportunity gap; method-first copy wrong for analyst audience | [01-n8n-io.md](Competitor%20research/01-n8n-io.md) |
| 2 | notion.com | 2026-04-09 | Editorial ceiling for product marketing is high but reachable through specific techniques (big idea per section, whitespace, bento, voiced copy); hero discipline = one idea set large, no feature list in the fold; tight-cropped product fragments beat full-screenshot glamour; bento with asymmetric spans beats 3-column grid; hue-coded feature cards wrong for FinQuira's single-workflow narrative; Notion's low density too sparse for analysts; GT America sans-only confirms serif as live differentiation | [02-notion-com.md](Competitor%20research/02-notion-com.md) |
| 3 | miro.com | 2026-04-09 | Canvas-tool design consensus established (left-anchored asymmetric hero, flat cards, single load-bearing accent, no live canvas embed in hero, sans-only typography); page-as-canvas principle = use node/connection visual language as the design system of the entire page, not just hero; never show an empty canvas (always assembled end-state); interactive element placement = mid-page never in fold; three canvas tools in a row with no serif = differentiation gap fully validated; Miro's warmth and illustration characters wrong for analyst register; density triangle calibrated (Notion sparse → Miro moderate → FinQuira target → Bloomberg dense) | [03-miro-com.md](Competitor%20research/03-miro-com.md) |
| 4 | alpha-sense.com | 2026-04-10 | Direct competitor baseline is generic enterprise SaaS visual register (cool light, corporate blue, sans-only, whitespace-only, hero-video) combined with finance-specific copy (named roles, workflow vocabulary, trust-forward AI framing); visual identity contributes zero to positioning, copy does all domain work = strategic weakness and FinQuira's opportunity; match on copy discipline + subvert on every visual-identity axis; four references in a row with zero serif including direct competitor = serif is no longer hypothesis, it's the category chasm; AlphaSense density moderate because serves broad buying committee, FinQuira's narrower scope permits denser editorial calibration; name the audience by role explicitly; frame AI as reasoning/output never chat; assert vision in hero, do not hedge with trust-defensive copy | [04-alphasense-com.md](Competitor%20research/04-alphasense-com.md) |
| 5 | verityplatform.com | 2026-04-10 | Second direct buy-side competitor and first reference to use a display serif (Reckless, Displaay) — serif instinct empirically validated by direct-audience competitor; FinQuira must diverge on specific serif choice to maintain differentiation; first warm-ground reference in the set, uses visible 1px hairline borders on cream ground = direct resolution for Q11 (warm monochromatic grounds need structural cues, whitespace alone insufficient); offset-border pseudo-element trick as optional signature-card treatment; burnt-orange `#F04C24` accent = loud brand register, confirms FinQuira's desaturated copper is the institutional-instrument inverse; AI near-silent on Verity vs. trust-forward on AlphaSense = brackets the AI-framing spectrum, FinQuira sits between; both direct competitors put audience name in subhead not headline = resolves Q17; two-beat declarative headline with full stop ("Fund Performance. Accelerated.") validated at display serif scale; architectural visualization (Venn) not interfacial (screenshots) validates FinQuira's node-diagram approach pre-launch; decorative SVG section transitions confirm pure luminosity shifts insufficient on monochromatic grounds; moderate SaaS density matches AlphaSense, FinQuira target only modestly denser | [05-verityplatform-com.md](Competitor%20research/05-verityplatform-com.md) |
| 6 | hebbia.com | 2026-04-11 | Third direct competitor and tightest product-audience overlap in the set (buy-side analyst-operator doing document-intensive reasoning work — same user as FinQuira); first dark-ground direct competitor, but dark is cool/neutral-black (terminal register) not warm charcoal — FinQuira's warm charcoal must now read as unambiguously warm against Hebbia as the reference cold-dark point; strict monochrome (zero accent color) = brave but functionally airless, FinQuira's single muted copper preserved as wayfinding; uppercase-tracked sans display (`clamp(2.19rem, 1.35rem + 4.17vw, 5.625rem)`) raises compositional-weight bar for FinQuira's display serif → set serif at `clamp(4rem, 9vw, 10rem)` minimum, mixed case, sharp modern-serif character (not renaissance revival) to sit in Hebbia's neighborhood without reading as soft; two-layer density model (moderate breathing between sections, dense populated content within sections — embedded earnings matrices, deal term grids, 10+ rows of parsed data) is first dense-within-section exemplar and becomes FinQuira's explicit density target; light-UI product screenshots embedded directly on dark ground = confident visualization choice but unavailable to pre-launch FinQuira, hero node diagram must match the craft bar via populated real workflow vocabulary (filings, KPI extract, comps, memo draft) + sample outputs inside at least one node; Hebbia owns "AI for Finance" headline and "Institutional Intelligence" positioning hook — FinQuira cannot claim either, must own workflow/canvas/orchestration territory instead; Hebbia uses atmospheric helix hero animation (mix-blend-mode exclusion, rotated canvas) = premium feel but teaches nothing, validates FinQuira's concept-carrying node-connection animation as still unique in the category; whitespace-only section transitions on dark ground work for Hebbia via brutalist typographic weight — FinQuira's softer editorial register will not carry the same load, structural connector-line transitions are now functionally necessary not just metaphorically valuable; enterprise compliance badges (SOC 2, ISO, GDPR, encryption, "no training on user data") as trust signal pattern — borrow for secondary trust section near footer; Hebbia names six verticals (AM/Legal/Credit/Corporate/Consulting/Real Estate) and "replace your best people" framing — both rejected for FinQuira (single audience discipline, augmentation not replacement); uppercase-tracked sans for secondary typography (eyebrow labels, metadata) is a defensible subordinate borrow; Q15 (page-as-canvas literalness) and Q20 (avoid reading as derivative) both resolved — page-as-canvas = populated literal canvas + abstract structural vocabulary together, differentiation = commitment on all six axes simultaneously | [06-hebbia-com.md](Competitor%20research/06-hebbia-com.md) |
| 7 | hudson-labs.com | 2026-04-11 | Fourth direct competitor (finance-specific LLM company, Co-Analyst product targeting hedge funds / asset managers / family offices with $1T+ AUM beta); substance-strong, visual-identity-generic — sharp anti-generalist-AI copy ("no prompting gymnastics," "2 hours instead of 2 weeks," "precision of a terminal with adaptability of AI") undermined by default-AI-SaaS visual execution (violet `#7c3aed` accent, `#0a0a0a` cold off-black, glassmorphism cards, standard `text-7xl` serif, no signature motion); **second direct competitor to adopt a display serif** (Source Serif 4 — transitional literary cut) alongside Verity's Reckless (warm renaissance), narrowing FinQuira's differentiated serif slot to **sharp modern editorial** (GT Sectra / GT Super / PP Editorial New) and confirming **display scale as the strongest axis of differentiation within the serif space** (both serif competitors capped at ~72px; FinQuira's `clamp(4rem, 9vw, 10rem)` remains uncontested); **pairs Source Serif 4 with Inter body** — the serif-plus-Inter combination is becoming the AI-SaaS default and FinQuira's body face must explicitly diverge (ABC Diatype, Söhne, Graphik territory, not Inter); **violet accent is the clearest negative example in the reference set** — using the universal generalist-AI color while competing against generalist AI is a direct self-contradiction, reinforcing FinQuira's muted copper as the institutional-finance inverse and explicitly banning violet from FinQuira; **glassmorphism ruled out** — translucent `bg-white/[0.02-0.08]` + backdrop blur reads as 2022 SaaS template not institutional instrument; homepage tagline "Find What Matters in Public Markets" and product hook "The precision of a terminal with the adaptability of AI" claim **"terminal" and "find what matters" as occupied territory** — FinQuira evokes Bloomberg-terminal gravity through design execution not naming; **workflow / canvas / orchestration / operating-system vocabulary confirmed fully unoccupied** by both direct AI competitors (Hebbia uses "matrix," Hudson Labs uses "precision"/"terminal") — FinQuira's clearest linguistic white space; "no prompting gymnastics" is the sharpest anti-chat line in the set and establishes the rhetorical technique of naming chat's operational cost by specific failure mode; "Get up to speed in 2 hours instead of 2 weeks" is the strongest pre-launch-compatible proof pattern — concrete before/after time-savings with specific numbers, adopted as FinQuira's Q22 rhetorical shape; founders' explicit credibility signals ("CPA and data scientist," "author of *Designing LLM Applications*") do meaningful trust work and should be surfaced in FinQuira's About section not buried; no signature animation across four direct competitors (only Hebbia's decorative helix) = FinQuira's concept-carrying node-connection motion remains the only explanatory signature in the category; **Q19 resolved to sub-register and scale**, **Q22 resolved (rhetorical shape)**, **Q23 largely resolved (territory locked)**; new Q24 (card corner geometry), Q25 (anti-chat rhetoric specificity), Q26 (body-face Inter-divergence) | [07-hudson-labs-com.md](Competitor%20research/07-hudson-labs-com.md) |

---

## Revision History

| Date | Change |
|------|--------|
| 2026-04-09 | Initial foundation document created from PRD analysis. All directions are hypotheses pending reference validation. |
| 2026-04-09 | Post Reference #1 (n8n.io): sharpened color to warm charcoal + desaturated copper; locked in serif display as differentiator; confirmed asymmetric layout by contrast; added signature hero animation; refined copy to outcome-first; added anti-patterns #9–10, #15, #21; resolved Q1–Q3, Q7; partially resolved Q5, Q8. Full analysis in references/01-n8n-io.md |
| 2026-04-09 | Post Reference #2 (notion.com): calibrated editorial ceiling — resolved Q4 (editorial feel = big idea + whitespace + bento + voiced copy, FinQuira can go further via serif + density); resolved Q12 (asymmetric hero = large left-anchored headline + single visual, no centered symmetry); added bento-with-asymmetric-spans to Section 3 layout principles with explicit rejection of hue-coded feature differentiation; added hero discipline paragraph to Section 5 (one idea, set large, no feature list in fold); refined density target (between generic SaaS moderate and Notion's sparseness, closer to financial-publication rhythm); partially advanced Q5 (tight-cropped fragments), Q6, Q8, Q11; raised new Q13 (dense-editorial end still unexemplified) and Q14 (single interactive element scope). Full analysis in references/02-notion-com.md |
| 2026-04-09 | Post Reference #3 (miro.com): resolved Q5 (canvas visualization = page-as-canvas principle, use node/connection visual language as the design system of the entire page, hero shows assembled end-state never empty); resolved Q10 (canvas-tool design consensus established — conform on structural decisions, differentiate on typographic and tonal); resolved Q14 placement (mid-page, never in fold); strengthened Section 3 iconography direction with page-as-canvas architectural principle and "never empty canvas" rule; added mid-page interactive placement to Section 5 hero discipline; advanced Q6 with density triangle (Notion → Miro → FinQuira → Bloomberg) and Q8 with connector-line section transitions; raised Q15 (page-as-canvas literalness calibration) and Q16 (above-hero promotional strip slot). Three canvas tools in a row now confirm the serif-display gap in the category. Full analysis in references/03-miro-com.md |
| 2026-04-10 | Post Reference #4 (alpha-sense.com): resolved Q9 — direct competitor baseline is generic enterprise SaaS visual register + finance-specific copy, meaning every visual-identity axis is available as differentiation space; FinQuira's strategy distilled to "match on copy discipline, subvert on visual identity." Strengthened Section 2 with explicit audience-naming and deep-vocabulary-without-translation trust signals. Strengthened Section 3 typography direction: four references in a row (including direct competitor) with zero serif elevates the display serif from hypothesis to the single highest-leverage visual-identity move in the category. Strengthened Section 3 density direction: AlphaSense operating at SaaS-moderate density confirms denser calibration is a differentiation move not a misread. Strengthened Section 5: lead with assertive vision, not trust-defensive hedging; frame AI as reasoning/output never chat; ban the word "chat" from the page. Advanced Q6, Q8, Q11 by competitive contrast. Raised Q17 (where does explicit audience-naming live?) and Q18 (how prominently to address AI trust/hallucination?). Full analysis in references/04-alphasense-com.md |
| 2026-04-10 | Post Reference #5 (verityplatform.com): resolved Q11 — first warm-ground reference in the set, Verity uses visible 1px hairline borders on cream, confirming that warm monochromatic grounds require structural cues; FinQuira adopts subtle warm-gray hairlines for systemic card treatment, copper reserved for actions never borders, offset-border pseudo-element as optional signature-card variant. Resolved Q17 — both direct competitors put audience name in hero subhead not headline; FinQuira follows (headline carries outcome, subhead carries audience specificity). Resolved Q18 — AlphaSense and Verity bracket the AI-framing spectrum (trust-forward vs. near-silent); FinQuira sits between with secondary reinforcement, never hero copy, always output-framed. Sharpened Section 3 typography: Verity's use of Reckless (Displaay serif) directly validates FinQuira's serif instinct via a direct buy-side competitor — the serif direction moves from "unoccupied category chasm" to "empirically validated, must diverge on specific face (GT Super/GT Sectra/PP Editorial New territory) to avoid reading as Verity-derivative." Sharpened Section 3 color: Verity's saturated burnt orange confirms FinQuira's desaturated copper is the institutional-instrument inverse, and borders should stay subtle warm gray not copper. Sharpened Section 3 layout: density target calibrated as modestly denser than the two-competitor moderate baseline, not dramatically denser. Sharpened Section 3 section transitions: pure luminosity shifts insufficient on monochromatic grounds, structural cues are required. Sharpened Section 5: add two-beat declarative hero headline technique with full-stop rhythm. Advanced Q6/Q13, Q8, Q15. Raised Q19 (which specific serif given Reckless is now occupied) and Q20 (how to avoid reading as warm-dark Verity). Full analysis in references/05-verityplatform-com.md |
| 2026-04-11 | Post Reference #7 (hudson-labs.com): resolved Q19 to sub-register and scale — second direct competitor uses a display serif (Source Serif 4, transitional literary), narrowing FinQuira's remaining differentiated slot to sharp modern editorial (GT Sectra / GT Super / PP Editorial New) and confirming display scale (`clamp(4rem, 9vw, 10rem)`, larger than both serif competitors) as the strongest differentiation axis within the serif space. Resolved Q22 (rhetorical shape) — Hudson Labs' "Get up to speed in 2 hours instead of 2 weeks" concrete before/after time-savings pattern adopted as FinQuira's pre-launch statistics shape, replacing Hebbia's AUM scale block. Largely resolved Q23 — workflow/canvas/orchestration/operating-system vocabulary confirmed fully unoccupied by both direct AI competitors; "terminal" and "find what matters" now occupied by Hudson Labs and banned from FinQuira's hero; final phrasing still pending hero-copy pass. Sharpened Section 3 typography: serif-plus-Inter pairing is becoming the AI-SaaS default (Hudson Labs uses it), so FinQuira's body face must explicitly diverge (ABC Diatype, Söhne, Graphik territory, not Inter); two serif competitors at moderate scale reinforce scale as FinQuira's strongest serif-differentiation axis. Sharpened Section 3 color: Hudson Labs' violet accent is the clearest negative example in the set (universal generalist-AI color undermines anti-generalist-AI positioning), explicitly banning violet from FinQuira and reinforcing muted copper as the institutional-finance inverse; glassmorphism ruled out on dark ground (reads as 2022 SaaS template not institutional instrument). Sharpened Section 5: "terminal" as a hero anchor word now banned (Hudson Labs owns it); anti-chat rhetoric sharpened toward specific failure-mode naming ("no prompting gymnastics" technique); pre-launch social proof pattern locked to Hudson Labs' concrete before/after shape with founder-credibility signals surfaced not buried. Advanced Q8 with negative evidence (gradient-overlay dark-mode transitions classified as anti-pattern). Raised Q24 (card corner geometry), Q25 (anti-chat rhetoric specificity), Q26 (body-face Inter-divergence specifically vs Hudson Labs). Full analysis in references/07-hudson-labs-com.md |
| 2026-04-11 | Post Reference #6 (hebbia.com): resolved Q15 — page-as-canvas literalness answered by Hebbia's populated-product-surfaces precedent; FinQuira's canvas visualization must combine literal populated content (real workflow vocabulary, sample outputs inside at least one node) with abstract structural vocabulary (node-shaped containers, connector-line transitions) as the design language of the entire page. Resolved Q20 — differentiation is a vector not a scalar; defensibility requires commitment on all six axes simultaneously (warmth, typography, AI framing, product viz, composition, section architecture), no single axis is sufficient and weakening any one makes the page read as derivative. Sharpened Section 3 color: warm charcoal must now read as unambiguously warm against Hebbia's cold pure-black terminal register, single muted copper accent preserved as functional wayfinding against Hebbia's strict zero-accent monochrome. Sharpened Section 3 typography: Hebbia's uppercase-tracked sans at confident display scale raises the compositional-weight bar, FinQuira's display serif set to `clamp(4rem, 9vw, 10rem)` minimum in mixed case with sharper modern-serif character (not renaissance revival) to sit in Hebbia's neighborhood; secondary uppercase-tracked sans layer for eyebrow labels / metadata as defensible borrow from Hebbia's institutional DNA. Sharpened Section 3 layout: Hebbia's two-layer density model (moderate between sections, dense within sections) becomes FinQuira's explicit density target — breathe between, pack real workflow content inside. Sharpened Section 3 iconography: hero diagram must contain real analyst workflow vocabulary (10-K filing, earnings transcript, KPI extract, comps table, memo draft) and at least one node with sample output, executed at production-UI craft quality to match Hebbia's embedded screenshot bar. Sharpened Section 4 motion: signature animation must teach the product metaphor in the act of animating, not decorate atmospherically — Hebbia's helix is premium but explanatory-empty, FinQuira's node-connection drawing differentiates by being explanatory. Sharpened Section 5: Hebbia owns "AI for Finance" and "Institutional Intelligence" — FinQuira must not claim either and any "AI for X" framing is banned; borrow Hebbia's reasoning/intelligence/context vocabulary for the AI positioning section; surface enterprise compliance badges (SOC 2, encryption, no training on user data) as secondary trust touch near footer. Advanced Q6/Q13, Q8, Q14, Q19. Raised Q21 (uppercase-tracked secondary typography), Q22 (pre-launch scale-metric statistics block), Q23 (positioning hook phrase). Full analysis in references/06-hebbia-com.md |
