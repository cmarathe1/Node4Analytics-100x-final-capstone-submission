# Bloomberg AI Solution Page — Design Analysis

**Source pages analyzed:**
- Primary: `https://professional.bloomberg.com/solutions/ai/`
- Context: `https://www.bloomberg.com/professional/` (redirected from `professional.bloomberg.com`)
- Secondary reference: Bloomberg UX writings on Terminal design

**Analyst:** FinQuira Design Agent
**Purpose:** Extract the "Bloomberg Standard" for institutional finance UX so FinQuira can borrow its authority and deliberately break its legacy patterns.

---

## 1. Company Overview

Bloomberg L.P. is the category-defining financial data and analytics incumbent. The Bloomberg Terminal (launched 1982) is the de facto distribution system for market data, news, analytics, and communications across institutional finance — used by roughly 325,000 subscribers at ~$30k/year/seat. "Bloomberg AI" (and its conversational product **ASKB**) is the firm's 2024–2025 push to embed generative and agentic AI into the Terminal workflow: research, screening, earnings prep, news summarization.

The AI page sits within `professional.bloomberg.com`, the B2B marketing site for the Terminal and Bloomberg's enterprise data products. The audience is explicit: buyside analysts, PMs, sellside research, traders, risk, and compliance at institutions that already use or are considering the Terminal. This is not a growth-funnel page for individual users. It is a category-authority statement aimed at procurement, CIOs, heads of research, and existing Terminal power users.

---

## 2. Visual Identity

### Brand Signature

Bloomberg has arguably the most recognizable color signature in finance: **amber/orange on pure black**. It originated in the 1980s as a hardware constraint (monochrome CRTs in amber or green) and hardened into a deliberate brand moat — executives have publicly described being "religiously consistent" to protect the Terminal's status-symbol aesthetic. On a trading floor you can identify a Bloomberg shop from across the room by the glow.

The AI solution page inherits this DNA but tempers it. It is not the Terminal. It is the corporate face of the Terminal, so it translates the amber-on-black trading aesthetic into a more editorial, marketing-grade dark mode.

### Logo & Wordmark

- Bloomberg wordmark is set in its proprietary **AvenirNextPForBBG** (a Bloomberg-commissioned Avenir Next cut) — geometric humanist sans, tight tracking, no pictorial mark alongside it. The word *Bloomberg* is the mark.
- Placement: top-left of navigation, small scale, restrained. Bloomberg does not need to shout its name.
- On the AI page, "Bloomberg AI" is styled as a product lockup in the same typeface — no separate AI logo, no gradient wordmark, no tech-startup sparkle icon. The restraint is the signal.

### Visual Tone

- **Corporate gravity** over tech enthusiasm.
- Information density is signaled but curated — the marketing page is less dense than the Terminal itself (which is intentionally cluttered), and more whitespace-forward than Terminal screens.
- The aesthetic reads "institutional, proven, measured" rather than "frontier, fast, experimental."

---

## 3. Typography

**Primary typeface:** `AvenirNextPForBBG` — Bloomberg's licensed custom cut of Avenir Next. Helvetica / Arial fallbacks. No secondary display serif, no mono accent on the marketing page (the mono Terminal font by Matthew Carter is reserved for the actual product UI).

**Hierarchy observed (desktop):**

| Role | Size | Line-height | Tracking | Notes |
|---|---|---|---|---|
| H1 (hero) | 62px | 67px | -1.1px | Tight, confident, not oversized |
| H2 (section) | 50px | 55px | -1.1px | Consistent with H1 rhythm |
| H3 (feature) | ~28–32px | ~36px | ~-0.5px | Responsive |
| Body | ~16–18px | ~26–28px | 0 | Generous reading measure |
| Eyebrow / caption | ~13–14px, uppercase | — | +0.08em | Used sparingly |

**Typographic character:**

- Headlines are **tightly tracked** (negative letter-spacing) and set in **medium/demi weight**, not ultra-thin. Bloomberg does not use hairline Didone elegance — it uses confident humanist sans, which reads as "serious but not stuffy."
- No editorial serif for long-form body on the marketing page. This is a deliberate departure from finance-magazine typography (FT, WSJ, Economist) — Bloomberg's marketing site aligns with its software, not its print heritage.
- Line-heights are generous (~1.6 on body), which pulls the feel slightly toward a SaaS marketing site and away from the Terminal's ultra-dense monospace.
- No fluid `clamp()`-style typography in the wild — the page has fixed-step breakpoints, which is part of why it reads as legacy.

**Anti-pattern to note:** the typeface is bespoke and excellent, but it does all the work alone. There is no typographic *drama* — no oversized display moment, no mixed-case tension, no deliberate constraint like a single-weight page. It is professionally neutral to a fault.

---

## 4. Color Palette

### Extracted palette (AI solution page)

| Token | Value (approx) | Usage |
|---|---|---|
| `--bbg-black` | `#000000` | Hero, feature section backgrounds, nav |
| `--bbg-off-white` | `#F3F4EF` | Primary text on black, body backgrounds |
| `--bbg-gray-bg` | `#F7F7F7` | Jump links bar, overview sections (light mode blocks) |
| `--bbg-orange` | `#FF9D00` / `#FF9600` | Primary CTA, carousel chevrons, accents |
| `--bbg-text-dark` | `~#1A1A1A` | Body text on light sections |
| `--bbg-border` | `~#E5E5E5` | Card dividers, footer rules |

### Palette Logic

1. **Black is the base.** Not navy, not charcoal, not `#0A0A0F`. True `#000`. This is a deliberate link back to the Terminal and it is a very strong brand asset — most fintech startups soften black into navy and lose contrast authority.
2. **Off-white, not pure white.** `#F3F4EF` has a very slight warm cream tint that keeps the page from feeling sterile and subtly echoes the amber warmth of the Terminal.
3. **Orange as a single accent.** The `#FF9D00` orange is doing triple duty: brand marker, primary CTA, and attention anchor. There is no secondary brand color. No purple. No teal. No gradient. One accent, used sparingly.
4. **Section alternation** between full-black and light-gray (`#F7F7F7`) blocks creates rhythm and breaks up what could otherwise be a monotone dark page. This is one of the page's better moves — it uses color as pacing.

### What Bloomberg does *not* do

- No gradients. Anywhere. No orange-to-pink, no radial glow behind the hero.
- No glassmorphism, no frosted panels.
- No duotone imagery, no photo treatments.
- No data-viz color system visible on this page (the color system lives inside the Terminal, not the marketing site).

This restraint is both a strength (authority, timelessness) and a weakness (the page cannot generate any visual excitement through color).

---

## 5. Layout & Spatial Rhythm

### Page architecture

The AI page follows a classic long-scroll institutional B2B template:

1. **Top nav** — mega-menu, light weight, Bloomberg logo left, product categories center, utility right.
2. **Hero** — full-width black, centered H1, centered subhead, single orange CTA, supporting paragraph.
3. **Jump-link bar** — light gray, sticky-ish, anchors: *Overview, ASKB, Bloomberg AI, Pro Tips, Contact Us*. A Terminal-literate move: give power users immediate shortcuts.
4. **Feature carousel** — 6 rotating AI capability cards.
5. **Video-driven ASKB section** — full-bleed video with dark overlay, product narration.
6. **Feature detail tabs** — vertical layout of ASKB benefits with screenshots.
7. **Stats / data section** — "30,000+ news sources," "800+ research providers," animated counters.
8. **Six alternating feature modules** — left/right image+text blocks, one per capability.
9. **Footer** — dense, global, multi-column.

### Grid & rhythm

- 12-column grid on desktop, breaking to stacked single column on mobile.
- Max content width roughly 1200–1280px, centered with wide side gutters on ultra-wide — meaning the page feels "contained" even on a 27" monitor. This is a legacy choice: the page does not exploit widescreen real estate the way modern editorial sites do.
- Vertical rhythm is **generous but conservative** — ~120px section padding on desktop, ~60px on mobile. No tight modular rhythm, no asymmetric offset columns. Everything lines up.
- Alternating sections are **centered-symmetric** — hero is centered, feature modules alternate left/right but remain within the same column container. There is no editorial breaking-the-grid moment, no text that escapes its column, no diagonal composition.

### Information density

Bloomberg's marketing site density is **moderate** — substantially less dense than the Terminal itself, which is the densest consumer-of-any-kind software interface on earth. This mismatch is telling: the marketing site is optimized for scannable procurement reading, not for Terminal power users. The dense workflow is something you *buy* via this page, not something you experience *on* this page.

---

## 6. Motion & Animation Philosophy

**Observed motion:**

- Lottie animations for stat counters (30,000+ news sources, 800+ research providers).
- Fade-in on scroll for feature modules.
- Video playback in ASKB section with click-to-play.
- Carousel auto-advance with orange chevron controls.
- Subtle hover state on feature cards (shadow lift, ~200ms).

**Motion philosophy:** restrained, functional, legacy-SaaS. There is no orchestrated page-load sequence, no hero entrance animation, no scroll-tied parallax, no cursor effects, no GSAP/Framer Motion-grade choreography. The page moves just enough to feel alive and not a pixel more.

This is a deliberate posture: institutional buyers are suspicious of "flashy." But compared to 2025-era design-led fintech sites (Ramp, Mercury, Brex, Arc), the motion vocabulary is dated. The page feels like it was designed in 2019 and last updated in 2023.

**`prefers-reduced-motion`:** assumed respected (Bloomberg has real accessibility discipline internally) but not visibly advertised on the page.

---

## 7. Component Patterns

### Navigation
- Top bar, ~72px tall, black background, light text.
- Mega-menu on hover/click with product categories: Terminal, Data, Trading, Risk, Compliance, Indices.
- Utility cluster right: Solutions, Insights, Support, Contact, search.
- Mobile: hamburger collapses to full-screen overlay.
- **Pattern strength:** the mega-menu is dense and opinionated — it treats the site like a product catalog for a 40-year-old company, which it is.

### Hero
- Full-bleed black.
- Centered, symmetrical composition: H1, subhead, paragraph, CTA.
- Background treatment: subtle dark imagery or gradient, not a product screenshot.
- **No product dashboard mockup in the hero.** This is unusual for SaaS and very on-brand for Bloomberg — the product doesn't need a screenshot because the audience already knows what the Terminal looks like.

### Primary CTA
- Orange (`#FF9D00`) solid fill, white text, rectangular with slight radius (~4px, not pill).
- Copy: **"Contact Us"** — not "Get started," not "Try free," not "Book a demo." The CTA signals "we are a procurement conversation, not a credit-card sign-up." This is the single most Bloomberg-coded choice on the entire page.
- Hover: darken + slight lift.

### Feature cards
- Dark cards on dark background with thin border or subtle elevation.
- Icon (thin line, white or orange), title, short description.
- No gradients on cards. No "glow" hover states.

### Data/stats section
- Large numeric displays with Lottie counter animation.
- Labels beneath in smaller sans.
- Pattern: hard numbers as trust signal (30,000+, 800+, "hundreds of millions of documents") — a very institutional tell. Bloomberg doesn't name-drop customer logos, because its customers *are* everyone, and because name-dropping one client would implicitly insult the others.

### Video blocks
- Full-bleed video with dark overlay + centered play icon.
- Copy overlay: narrative headline + CTA to read more.
- **Weakness:** video thumbnails feel like stock product walkthroughs rather than cinematic brand pieces. Apple, Stripe, and Linear use video more assertively.

### Footer
- Multi-column, extremely dense — company info, customer self-service, global regional support phone numbers (Americas, EMEA, Asia-Pacific), products, industry verticals, media, social.
- This footer is a sitemap. It reflects a company that expects visitors to navigate by intent, not by funnel.

---

## 8. Messaging & Tone

### Exact hero copy

> **"AI for finance. Built on Bloomberg."**
>
> *Agentic AI built for the speed of the markets*
>
> Any company can promise AI for finance. Only one can deliver AI built on Bloomberg. Bloomberg AI is built on Bloomberg's long-standing leadership in artificial intelligence and its application in finance. We've been creating purpose-built AI solutions since 2009…

### What this copy is doing

1. **"Built on Bloomberg" is the whole pitch.** The moat is the data, not the model. The headline is structured as an adjective (AI for finance) + a possessive claim (Built on Bloomberg). The noun "Bloomberg" is asserted as a category, not a brand.
2. **The "only one" sentence** is a direct shot at OpenAI, Anthropic, and every fintech AI startup. The subtext: anyone can wire up a foundation model; no one else has 40 years of proprietary financial data, research, and Terminal distribution.
3. **"Since 2009" is a weapon.** Most AI startups are 18 months old. Bloomberg is saying "we were doing NLP on earnings transcripts before your company existed."
4. **"Agentic AI"** is the 2025 vocabulary Bloomberg chose to wear — signaling they are not behind, while anchoring back to Bloomberg provenance.

### Tone attributes

- **Authoritative.** No hedging, no "we believe," no "our mission."
- **Capability-first.** Headlines describe what the product *does* for the user's workflow, not how the user will *feel*.
- **Zero hype vocabulary.** No "revolutionary," "game-changer," "reimagine" (except once, strategically, on the overview heading).
- **Workflow-specific.** Pre-earnings prep. Post-earnings analysis. Multi-document queries. BQL code for Excel. The specificity itself is a trust signal — it says "we know exactly what your day looks like."
- **We/our used institutionally, not intimately.** "We've been creating…" is corporate, not founder-voice.

### Messaging architecture (section by section)

| Section | Heading |
|---|---|
| Overview | "Reimagine the way you discover, analyze and act on information on the Terminal with Bloomberg AI" |
| ASKB intro | "A powerful new AI interface for the Terminal" |
| ASKB benefit | "Dramatically accelerate investment research and insight generation with ASKB" |
| Data | "Bloomberg AI taps into Bloomberg's vast collection of structured data and unstructured documents, news, research and analytics" |
| Solutions | "Experience a broad range of Bloomberg AI solutions" |

Note that every heading contains the word "Bloomberg." This is not laziness — it is drilling.

---

## 9. Target Audience Signals

The page is aimed at (in order of priority):

1. **Existing Terminal users** who need to justify staying with Bloomberg as cheaper AI tools appear. The page reassures them Bloomberg is not being disrupted.
2. **Heads of research / CIOs at buyside firms** evaluating whether to add seats or consolidate to Bloomberg-plus-AI vs. adopting a newer stack.
3. **Procurement and compliance officers** who need to see "responsible AI," "transparent attribution," enterprise-grade language.
4. **Sellside and banking analysts** whose daily workflow (earnings prep, research synthesis) is the benefit-page hero use case.
5. **IT / data engineers** at institutions (BQL, BQuant, Excel integration language).

Signals that confirm the audience:

- The CTA is "Contact Us," not "Sign up."
- Pricing is absent.
- Trial is absent.
- Regional support phone numbers in the footer (Americas / EMEA / APAC) — a nod to global 24/5 desk reality.
- Vocabulary: "asset classes," "BQL," "BQuant," "press release," "beta program."
- No social-share icons on content. No newsletter capture. No interactive product demo.
- No "Watch our founder story." Bloomberg is beyond founder-story territory.

---

## 10. "The Bloomberg Standard" — Why Every Fintech Measures Itself Here

Bloomberg is the category anchor because it occupies a specific place in the institutional mind:

1. **The data is the moat.** In finance, the winning product isn't the slickest UI — it's the one with the most proprietary, structured, cross-asset, globally-normalized data. Bloomberg has 40 years of that.
2. **The Terminal is a ritual.** Analysts learn it in training programs. They type `GO` keystrokes faster than they speak. Ripping it out is a cultural, not just a technological, decision.
3. **Amber-on-black is tribal identity.** The palette marks belonging. A trading floor lit in amber is visibly "institutional finance." Any new tool must either imitate that signal or deliberately break it to mean something else.
4. **The restraint is the authority.** Bloomberg's marketing site is intentionally not exciting. It is procurement-grade. The boringness *is* the trust — if the page looked like a VC-funded startup, institutional buyers would trust it less.
5. **Specificity over aspiration.** Bloomberg sells to people whose bonuses depend on being right about specific companies. Bloomberg's messaging mirrors that specificity. Aspirational SaaS copy ("Unlock your potential") reads as amateur in this category.

Every fintech startup, whether it admits it or not, is asking: *"Do we look serious enough that a buyside analyst will put us on a Bloomberg-adjacent screen?"* That is the Bloomberg Standard.

---

## 11. Strengths

1. **Unshakeable brand discipline.** Black + off-white + one orange. Same typeface everywhere. No trend-chasing. This consistency over decades is worth more than any clever campaign.
2. **Hero copy is a sniper shot.** "Any company can promise AI for finance. Only one can deliver AI built on Bloomberg." One of the best competitive-moat sentences in contemporary fintech marketing.
3. **CTA honesty.** "Contact Us" is correct for the audience. It signals the real sales motion instead of pretending to be product-led.
4. **Numbers as trust.** 30,000+ news sources / 800+ research providers / since 2009. Hard, verifiable numerics instead of customer logos.
5. **Information architecture respects expertise.** Jump links at the top, workflow-specific language, BQL/BQuant/Excel references — it treats the reader as a professional.
6. **Restraint.** No gradient hero glow, no glass cards, no 3D AI orb, no "meet our AI agent" mascot. The absence of clichés is a feature.
7. **Absence of product screenshots in the hero.** Bloomberg doesn't need to show the Terminal. The audience knows.

---

## 12. Weaknesses — Where Bloomberg Feels Legacy

1. **Typography is safe.** AvenirNextPForBBG is a fine workhorse but it does nothing dramatic. No display moment, no oversized type, no character-setting typographic voice beyond "competent sans."
2. **No fluid type / fluid grid.** Fixed H1 of 62px reads as legacy 2019 design. Modern design-led sites use `clamp()` and feel alive at every viewport. Bloomberg's site snaps at breakpoints.
3. **Centered-symmetric hero.** The hero is a centered H1 with a centered CTA. It is the single most defaulted-to layout pattern in B2B SaaS. Bloomberg gets away with it because of brand authority, but the layout itself is unremarkable.
4. **Motion is dated.** Fade-in on scroll, a carousel, Lottie counters. No orchestrated page load, no scroll-driven storytelling, no GSAP-grade choreography. Compared to Linear, Vercel, Arc, Ramp, Mercury — Bloomberg feels a software generation behind in motion design.
5. **Feature modules are the classic alternating left/right image-text pattern.** This is the most generic B2B SaaS structure that exists. Bloomberg does not break it.
6. **Video is unremarkable.** The product videos feel like walkthroughs, not brand pieces. There is no "Apple keynote" cinematic moment.
7. **The ultra-wide viewport is wasted.** Max-width container at ~1280px means a 27" monitor shows large empty side gutters. Modern editorial layouts use that real estate.
8. **The light-gray `#F7F7F7` blocks feel like 2018 SaaS.** Pure black alternated with pure white would be braver.
9. **No typographic rhythm within prose.** Body copy has no pull quotes, no drop caps, no oversized numerics inline. Institutional finance content could borrow more from editorial design.
10. **Defensive posture.** The entire page is "we are still relevant in the AI era." It is reactive. It does not open a new category; it defends an existing one. A challenger can exploit this by *opening* a category Bloomberg cannot follow into.

---

## 13. Aesthetic Positioning Summary

**Bloomberg AI page, one sentence:** *Institutional gravity rendered in pure black, one confident orange, and the typographic equivalent of a bespoke navy suit.*

**Positioning axis:**

```
               Editorial / Expressive
                        |
                        |
Legacy / ------- BLOOMBERG ------- Challenger / Experimental
Conservative            |
                        |
                 Neutral / Procurement
```

Bloomberg sits in the **"legacy-conservative × neutral-procurement"** quadrant. It earns that position through history, not by design choice — which means the position is defensible for Bloomberg and dangerous for any startup that imitates it. A startup imitating Bloomberg's aesthetic reads as "trying to look like Bloomberg," which is instantly weaker than "actually Bloomberg."

---

## 14. FinQuira Design Takeaways

FinQuira is an AI-powered financial research tool targeting analysts. That means FinQuira competes *directly* with ASKB-on-the-Terminal in the daily workflow. The design question is not "how do we look as trustworthy as Bloomberg" — it is "how do we signal that we are the tool an analyst opens *in addition to* Bloomberg (and eventually *instead of* it), because we move faster, think cleaner, and feel native to how analysts work in 2026?"

FinQuira must borrow Bloomberg's **authority primitives** while decisively breaking its **legacy visual grammar**.

### What to Borrow from Bloomberg

1. **Restraint as authority.** No gradient heroes, no "AI sparkle" icons, no glass cards, no purple. Commit to a single strong palette and never drift. The discipline is the trust signal.
2. **One accent color, used sparingly.** Bloomberg has orange. FinQuira should have exactly one accent — not orange (that's Bloomberg's), not blue (that's every SaaS), not purple (that's every AI tool). Make the accent specific and own it.
3. **Dark mode as institutional signal.** The black-on-amber Terminal aesthetic is *the* visual language of professional finance. FinQuira's landing page should lean dark, not because dark mode is trendy, but because the audience associates dark with Terminal, with trading floors, with professional after-hours research.
4. **Workflow-specific language.** "Pre-earnings prep." "Post-earnings analysis." "Multi-document query." Bloomberg's copy is specific to an analyst's day. FinQuira copy should be at that level of specificity or better. No "unlock insights." No "democratize finance." Real verbs, real artifacts.
5. **Numbers as social proof.** Institutional buyers trust hard numerics (documents processed, filings indexed, latency, coverage breadth) more than customer logos. FinQuira should feature numbers, not testimonials.
6. **"Contact Us" is not embarrassing.** If FinQuira is truly enterprise, act like it. If it's self-serve, act like that. Don't fake the wrong motion. But borrow the idea that the CTA should honestly reflect the sales motion.
7. **No hero product screenshot (maybe).** Bloomberg omits the Terminal screenshot because it doesn't need one. FinQuira probably *does* need to show the product — but consider whether the hero screenshot is the obligatory SaaS default or actually the right move. A typographic hero with the product revealed on scroll can feel more confident.
8. **Dense, useful footer.** Institutional audiences navigate by intent. A proper sitemap footer signals "real company," not "launch weekend."
9. **Jump links for power users.** Bloomberg's jump-link bar is a small Terminal-coded gesture that respects reader expertise. FinQuira can do an even better version — keyboard-accessible, command-palette-flavored, `⌘K`-style.
10. **Competitive moat sentence in the hero.** Bloomberg's "Any company can promise AI for finance. Only one can deliver AI built on Bloomberg" is a template. FinQuira's hero copy needs an equivalent single-sentence moat claim — something only FinQuira can honestly say.

### What to Deliberately Break

1. **Break the typography.** Do not use Avenir, AvenirNextPForBBG-alikes, or any geometric humanist sans that reads as corporate-safe. Pick a typeface with character — a distinctive neo-grotesque (e.g., GT America, Söhne, ABC Diatype, ABC Favorit), an editorial workhorse with an opinionated cut, or a pairing that introduces a serif or mono voice. **Absolutely forbidden by project rules:** Inter, Roboto, Helvetica, Arial, system-ui, Space Grotesk, DM Sans, Plus Jakarta Sans.
2. **Break the centered-symmetric hero.** Bloomberg centers the H1 and the CTA. FinQuira should not. Use asymmetric composition — left-aligned display type that pushes to the edge, offset CTA, a second-column anchor, an element that escapes the container. Anything but centered.
3. **Break the black-plus-orange palette.** Black is fine — even mandatory for the institutional signal — but the accent must not be Bloomberg's amber. Candidates: an acid chartreuse, a precise electric teal, a single desaturated plasma magenta, or a near-white signal color. Pick one and own it.
4. **Break the fixed type scale.** Bloomberg's 62px H1 is fixed. FinQuira must use fluid `clamp()` everywhere. A hero that reads `clamp(3.5rem, 9vw, 10rem)` will feel native at every viewport and instantly more modern.
5. **Break the 1280px max-width.** Bloomberg wastes ultra-wide real estate. FinQuira should design for 1440–1920px as a first-class viewport — let display type and editorial compositions breathe.
6. **Break the motion budget.** Bloomberg has fade-in and counters. FinQuira should deliver exactly one orchestrated, cinematic page-load sequence (stagger-reveal, easing curve like `cubic-bezier(0.22, 1, 0.36, 1)`, 800–1200ms total, respecting `prefers-reduced-motion`) that is the page's single signature motion moment. Do not scatter twitchy micro-interactions. One choreographed arrival beats ten hover effects.
7. **Break the alternating left/right feature grid.** It is the most SaaS-default structure. FinQuira's features should be presented as an editorial layout — a typographic manifesto, a numbered index, an interactive workflow demo, a grid that breaks into an asymmetric composition. Anything but six alternating image+text blocks.
8. **Break the "Contact Us" corporate coldness.** FinQuira's audience is individual analysts, not procurement. The CTA should reflect that: "Start researching," "Open FinQuira," or even just a keystroke-styled `⌘ + Enter` affordance. Keep an institutional-sales CTA secondary.
9. **Break the absence of editorial craft.** Bloomberg's body copy is a flat corporate register. FinQuira should write like a research note — first-person voice from an implied senior analyst, numbered claims, inline small caps, occasional oversized numerics, footnote-style attribution. Make the prose itself a demonstration of the product's value.
10. **Break the product-catalog mega-menu.** Bloomberg's mega-menu reflects a 40-year sprawling catalog. FinQuira has one product. The nav should be spare — five links maximum, no mega-menu, no submenus. Simplicity here is a direct visual anti-signal to legacy.
11. **Break the video-walkthrough habit.** If FinQuira uses video, it should be either (a) a silent, looping, taste-level hero loop of the product in motion, or (b) omitted entirely. Never a narrated walkthrough.
12. **Break the light-gray alternating sections.** `#F7F7F7` is the color of corporate SaaS 2018. Alternate true black with a second intentional surface color (a deep off-black, a warm near-black, or a single bright light-mode section used as a deliberate disruption), not a gray-wash.

### The FinQuira Positioning Statement (design-side)

FinQuira's landing page should read as: **"the research tool that speaks to an analyst the way Bloomberg's data speaks to a trader."** Institutional in gravity, editorial in craft, modern in motion, and typographically specific enough that a reader knows within 300 milliseconds that this is not another generic AI-for-finance wrapper.

If Bloomberg is "institutional gravity in a bespoke navy suit," FinQuira should be **"institutional gravity in a black knit, steel frame glasses, and a research note printed on heavy cream stock"** — same audience, same seriousness, different generation, different vocabulary, different taste.

---

## Appendix — Source References

- [Bloomberg AI Solutions page (primary source)](https://professional.bloomberg.com/solutions/ai/)
- [Bloomberg Professional (brand context)](https://www.bloomberg.com/professional/)
- [Designing the Terminal for color accessibility — Bloomberg UX](https://www.bloomberg.com/ux/2021/10/14/designing-the-terminal-for-color-accessibility/)
- [Designing the Terminal for Color Accessibility — Bloomberg LP](https://www.bloomberg.com/company/stories/designing-the-terminal-for-color-accessibility/)
- [How Bloomberg Terminal UX designers conceal complexity](https://www.bloomberg.com/company/stories/how-bloomberg-terminal-ux-designers-conceal-complexity/)
- [Bloomberg's customer-centric design ethos](https://www.bloomberg.com/company/stories/bloombergs-customer-centric-design-ethos/)
- [Amber on Black — Ted Merz (Bloomberg alumnus on the palette's origin)](https://ted-merz.com/2021/06/26/amber-on-black/)
- [The Impossible Bloomberg Makeover — UX Magazine](https://uxmag.com/articles/the-impossible-bloomberg-makeover)
- [Bloomberg L.P. Brand Color Palette — Mobbin](https://mobbin.com/colors/brand/bloomberg)
