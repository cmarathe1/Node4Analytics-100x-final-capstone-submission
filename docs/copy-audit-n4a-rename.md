# Copy Audit: Node4analytics / n4a Rename + Quality Pass

## Rename Guidance

The product formerly called "FinQuira" is now **Node4analytics** (formal) and **n4a** (casual/readable).

**Usage rules:**
- **Node4analytics** — use only where the full formal company name is appropriate: page title meta tag, legal copyright line, first-mention introduction on the page, and the brand logo text in navigation/footer.
- **n4a** — use everywhere else. Body copy, CTAs, feature descriptions, workflow steps, subheadings, value prop cards, and contact section. The shorter form is faster to read, easier to remember, and better suited to the casual-confident tone the page aims for.

**Current state:** The codebase has already replaced all "FinQuira" references with "Node4analytics." That was the right first step. This audit identifies which of those should now become "n4a" and flags copy quality improvements alongside.

---

## Section-by-Section Audit

---

### 1. Page Metadata (`layout.tsx`)

**Current title:**
`Node4analytics | Research Workspace for Financial Analysts`

**Suggested:**
`Node4analytics | Research Workspace for Equity Analysts`

**Rationale:** "Financial Analysts" is generic. The product is positioned for equity research specifically. Say so in the title tag where every word counts for search intent.

---

**Current description:**
`Node4analytics orchestrates the complete equity research journey from data to decisions.`

**Suggested:**
`n4a orchestrates the complete equity research workflow, from data discovery to final report. One workspace. Full context. Every source cited.`

**Rationale:** The current description is too compressed to be useful. Meta descriptions get ~155 characters. This version uses them to name what the product actually does and lands three differentiators: unified workspace, retained context, cited outputs.

---

### 2. Navigation (`navigation.tsx`)

**Current brand text:** `Node4analytics`
**Suggested:** `Node4analytics` (keep)
**Rationale:** Brand logo position is the right place for the formal name. No change needed.

---

**Current nav link:** `Why Node4analytics`
**Suggested:** `Why n4a`
**Rationale:** Nav links need to be scannable. "Why Node4analytics" is 18 characters in a tight horizontal nav. "Why n4a" is 7. Fits better at all breakpoints and reads more naturally as a section label.

---

**Current nav CTA:** `Request Early Access`
**Suggested:** `Request Early Access` (keep)
**Rationale:** Clear, appropriate for the product stage. No change.

---

### 3. Hero Section (`hero-section.tsx`)

**Current badge:** `Built for Equity Research`
**Suggested:** `Built for Equity Research` (keep)
**Rationale:** Strong, specific, audience-qualifying. Works.

---

**Current headline:**
`Stop Switching Tools Start Orchestrating`

**Suggested:**
`Stop switching tools. Start orchestrating research.`

**Rationale:** The current headline is missing a period between the two sentences, which makes it read as a run-on. The copy brief specified "Stop switching tools. Start orchestrating research." with "orchestrating research" as the accent-styled phrase. The word "research" was dropped from the live implementation. It needs to come back. Without it, "Start Orchestrating" is vague. Orchestrating what?

---

**Current subheading (paragraph 1):**
`Node4analytics is the AI workspace where financial researchers run the entire research workflow. From data discovery to insight extraction to financial modelling to final report, without losing context.`

**Suggested:**
`n4a is the AI workspace where equity researchers run the full analyst workflow. From data discovery to insight extraction to financial modelling to final report, without losing context between steps.`

**Rationale:** Three changes. (1) "Node4analytics" to "n4a" for readability in body copy. (2) "financial researchers" to "equity researchers" for specificity — the product is built for equity research, not all finance. (3) "between steps" added to the end to complete the thought on context loss.

---

**Current subheading (paragraph 2):**
`Improve efficiency. Boost productivity.`

**Suggested:**
`Your process stays intact. Your AI keeps up.`

**Rationale:** "Improve efficiency. Boost productivity." is generic SaaS filler. It could appear on any product page without changing a word. The replacement ties directly to the two core value props (workflow continuity and context-aware AI) and sounds like it was written for this product.

**Variant:**
`One canvas. Full context. Every source cited.` — lands the three differentiators in staccato form. More feature-forward than the recommended version.

---

**Current trust marker 1:** `SOC 2 compliance-ready architecture`
**Suggested:** `SOC 2-aligned from day one`
**Rationale:** The copy brief already specified this. The live page still has the old version. Shorter and more confident.

---

**Current trust marker 2:** `Built for research teams`
**Suggested:** `Built for research teams, not general use`
**Rationale:** The copy brief already specified this. The qualifier "not general use" is important because it signals this is not another generic AI tool. Differentiation in five words.

---

**PostHog event label (non-visible but worth flagging):**
`hero_cta_primary_clicked` still sends `{ label: 'Contact to Try it out' }`. The button text is now "Request Early Access." The event label should match.

---

### 4. Workflow Story Section (`workflow-story-section.tsx`)

**Current badge:** `The Research Workflow`
**Suggested:** `The Research Workflow` (keep)
**Rationale:** Clean, functional, does its job.

---

**Current headline:** `From Data to Decisions. One platform.`
**Suggested:** `From data to decisions. One platform.`
**Rationale:** Minor: lowercase "data" and "decisions" to match natural reading rhythm. Not a critical fix.

---

**Current subheading:**
`Most analysts know their research process well. They just do not have a tool built around it. Node4analytics does.`

**Suggested:**
`Most analysts know their research process well. They just do not have a tool built around it. n4a does.`

**Rationale:** Body copy position. "n4a does." is punchier and reads faster as a sentence closer. "Node4analytics does." is five syllables too many for a three-word sentence that's supposed to land hard.

---

**Step 02 description:**
`Choose the documents that belong in your analysis. Node4analytics organizes them into a structured research base where every source stays tagged and traceable from the start.`

**Suggested:**
`Choose the documents that belong in your analysis. n4a organizes them into a structured research base where every source stays tagged and traceable from the start.`

**Rationale:** Same principle. Body copy, readability-first.

---

**Step 05 title:**
`Model in Spreadsheets You Already Know.`

**Suggested:**
`Model in Spreadsheets You Already Know`

**Rationale:** Remove the trailing period. No other step title has a period. Consistency.

---

All other workflow step titles and descriptions are strong. No changes recommended for steps 01, 03, 04, 06.

---

### 5. Value Props Section (`value-props-section.tsx`)

**Current badge:** `Why Analysts Switch`
**Suggested:** `Why Analysts Switch` (keep)
**Rationale:** Good. Audience-specific, curiosity-provoking.

---

**Current headline:** `Your research lives in six tools. It shouldn't.`
**Suggested:** `Your research lives in six tools. It shouldn't.` (keep)
**Rationale:** One of the strongest lines on the page. Keep it.

---

**Current subheading:**
`Between screeners, filings, Excel, Word, and email, the average equity analyst makes a dozen context switches and wastes hours around it. Node4analytics fixes this.`

**Suggested:**
`Between screeners, filings, Excel, Word, and email, the average equity analyst makes a dozen context switches before lunch. n4a fixes the workflow, not just the tools.`

**Rationale:** Two changes. (1) "Node4analytics" to "n4a." (2) "wastes hours around it" is vague. "before lunch" is specific and slightly wry, which fits the analyst voice. "fixes the workflow, not just the tools" is a sharper closer that distinguishes n4a from point solutions.

---

**Card 1 solution:**
`Node4analytics runs the full research cycle from discovery through reporting without asking you to start over between steps.`

**Suggested:**
`n4a runs the full research cycle from discovery through reporting without asking you to start over between steps.`

**Rationale:** Body copy position. n4a.

---

**Card 2 problem:**
`Your generic AI assistant does not know what is in the Excel you opened two windows ago. Neither does the next one.`

**Note:** The copy brief said "Your AI assistant does not know..." The live page added "generic" which actually improves it by drawing a contrast. Good edit. Keep.

---

**Card 4 solution:**
`Node4analytics AI surfaces relevant content, extracts key insights, and compels critical thinking to drafts grounded in your selected sources.`

**Suggested:**
`n4a surfaces relevant content, extracts key data points, and helps you compile drafts grounded in your selected sources. It handles the retrieval. Your judgment handles the rest.`

**Rationale:** Three problems with the current version. (1) "compels critical thinking to drafts" is grammatically broken. It does not parse as English. (2) The copy brief version ("helps compile drafts... It handles the retrieval and keeps outputs traceable. Your judgment handles the rest.") was better. The live implementation diverged and lost clarity. (3) "Node4analytics AI" is heavy. "n4a" alone carries the subject.

---

### 6. Feature Highlights Section (`feature-highlights-section.tsx`)

**Current badge:** `What's Inside`
**Suggested:** `What's Inside` (keep)

---

**Current headline:** `Everything an analyst needs. Nothing they don't.`
**Suggested:** Keep. One of the best lines on the page.

---

**Current subheading:**
`Purpose-built capabilities for the financial research workflow. Familiar tools, connected to power your analysis.`

**Suggested:**
`Purpose-built for the equity research workflow. Familiar tools, wired together so context flows between them.`

**Rationale:** "Financial research" to "equity research" for consistency with the rest of the page. "Connected to power your analysis" is vague. "Wired together so context flows between them" is specific and echoes the canvas/node metaphor.

---

**Feature 3 title:** `AI That Is Reliable`
**Suggested:** `AI You Can Verify`

**Rationale:** "Reliable" is a claim. "You Can Verify" is a mechanism. Analysts trust mechanisms, not claims. It also better matches the description, which is about seeing exactly where each output came from.

---

**Feature 6 description:**
`From the first document pulled to the last line of the report, every step is logged. Built for teams where sourcing accountability is not optional.`

**Suggested:**
`From the first document pulled to the last line of the report, every step is logged. Built for teams where traceability is not optional.`

**Rationale:** "Sourcing accountability" is awkward as a compound noun. "Traceability" is a single word that says the same thing and is standard terminology in compliance contexts the audience knows.

---

All other feature titles and descriptions are solid. No changes needed for features 1, 2, 4, 5.

---

### 7. Contact Section (`contact-section.tsx`)

**Current badge:** `Early Access`
**Suggested:** Keep.

---

**Current headline:** `See it run on a real research workflow`
**Suggested:** Keep. Strong.

---

**Current subheading:**
`We walk you through Node4analytics using an actual equity research scenario. Your sector, your workflow, your questions. Thirty minutes. No slides. No pitch.`

**Suggested:**
`We walk you through n4a using an actual equity research scenario. Your sector, your workflow, your questions. Thirty minutes. No slides. No pitch.`

**Rationale:** Body copy. n4a.

---

**Current CTA:** `Request a Walkthrough`
**Suggested:** `Request a Walkthrough` (keep)
**Rationale:** Clear promise of value. Works well with the "No slides. No pitch." framing above it.

---

### 8. Footer (`footer.tsx`)

**Current brand text:** `Node4analytics`
**Suggested:** `Node4analytics` (keep)
**Rationale:** Footer brand mark. Formal name is correct here.

---

**Current tagline:** `Built for the analyst who expects more from their tools.`
**Suggested:** Keep. Good closer.

---

**Current copyright:** `© 2026 Node4analytics. All rights reserved.`
**Suggested:** `© 2026 Node4analytics. All rights reserved.` (keep)
**Rationale:** Legal line. Full formal name.

---

## Rename Map

Every occurrence of the brand name in the frontend source, with the proposed replacement.

| File | Line | Current Text | Proposed | Why |
|---|---|---|---|---|
| `layout.tsx` | 19 | `Node4analytics \| Research Workspace...` | `Node4analytics` (keep) | Page title. Formal name appropriate. |
| `layout.tsx` | 21 | `Node4analytics orchestrates...` | `n4a` | Meta description is body copy, not a formal introduction. |
| `navigation.tsx` | 16 | `Why Node4analytics` | `Why n4a` | Nav link. Needs to be short and scannable. |
| `navigation.tsx` | 55 | `Node4analytics` (brand logo) | `Node4analytics` (keep) | Brand mark position. Formal. |
| `hero-section.tsx` | 242 | `Node4analytics is the AI workspace...` | `n4a` | Hero subheading body copy. Readability. |
| `workflow-story-section.tsx` | 44 | `...Node4analytics organizes them...` | `n4a` | Step description body copy. |
| `workflow-story-section.tsx` | 417 | `...Node4analytics does.` | `n4a` | Section subheading closer. Punchier at 3 letters. |
| `value-props-section.tsx` | 34 | `Node4analytics runs the full...` | `n4a` | Value prop card solution copy. |
| `value-props-section.tsx` | 64 | `Node4analytics AI surfaces...` | `n4a` | Value prop card solution copy. |
| `value-props-section.tsx` | 214 | `...Node4analytics fixes this.` | `n4a` | Section subheading closer. |
| `contact-section.tsx` | 51 | `...Node4analytics using an actual...` | `n4a` | Contact section body copy. |
| `footer.tsx` | 22 | `Node4analytics` (brand text) | `Node4analytics` (keep) | Footer brand mark. Formal. |
| `footer.tsx` | 29 | `Node4analytics. All rights reserved.` | `Node4analytics` (keep) | Legal copyright. Formal. |

**Summary:** 13 occurrences total. 4 keep "Node4analytics" (page title, nav logo, footer brand, copyright). 9 change to "n4a."

---

## Top 5 Highest-Impact Rewrites

Ranked by how much they improve the page if actioned individually.

**1. Hero headline: add the missing word "research" and the period.**
Current: `Stop Switching Tools Start Orchestrating`
Fix: `Stop switching tools. Start orchestrating research.`
Impact: The headline is the single highest-traffic line on the page. Right now it is a grammatical run-on and the accent-styled word "Orchestrating" floats without an object. Adding "research" completes the thought and gives the accent phrase meaning.

**2. Value prop card 4 solution: fix the broken sentence.**
Current: `Node4analytics AI surfaces relevant content, extracts key insights, and compels critical thinking to drafts grounded in your selected sources.`
Fix: `n4a surfaces relevant content, extracts key data points, and helps you compile drafts grounded in your selected sources. It handles the retrieval. Your judgment handles the rest.`
Impact: The current sentence is grammatically broken ("compels critical thinking to drafts" does not parse). This is the AI-positioning card, which is the most important differentiator for a skeptical analyst audience. It needs to be flawless.

**3. Hero subheading paragraph 2: replace generic filler.**
Current: `Improve efficiency. Boost productivity.`
Fix: `Your process stays intact. Your AI keeps up.`
Impact: "Improve efficiency. Boost productivity." is the weakest copy on the page. It could appear on any SaaS landing page without changing a word. The hero is the one place every visitor reads. These two sentences are burning prime real estate on nothing.

**4. Trust markers: update to match the copy brief.**
Current: `SOC 2 compliance-ready architecture` / `Built for research teams`
Fix: `SOC 2-aligned from day one` / `Built for research teams, not general use`
Impact: These are small text elements but they do disproportionate work for an analyst audience that reads fine print. The qualifier "not general use" is a fast differentiator that costs nothing to add.

**5. All 9 body-copy brand name swaps from "Node4analytics" to "n4a."**
Impact: This is not one rewrite but one find-and-replace. Every time "Node4analytics" appears mid-sentence, it breaks reading flow. "n4a" is 3 characters instead of 15. In the closer "n4a does." vs. "Node4analytics does." the difference in punch is significant. This single change makes the entire page feel tighter.

---

## Copy Audit Summary

**Overall tone:** The page has improved significantly from the original FinQuira copy. It now speaks the analyst's language rather than startup marketing language. The workflow section is strong. The value prop cards are well-structured. The contact section removes friction effectively.

**What is working well (preserve):**
- "Your research lives in six tools. It shouldn't." is the best headline on the page. Do not touch it.
- "Everything an analyst needs. Nothing they don't." is the second-best. Keep.
- The checklist items in the contact section ("Honest answers on integrations, data sources, and what is still being built") signal transparency that this audience values. Protect these.

**3 biggest copy opportunities (ranked):**
1. The hero headline and subheading para 2 are the weakest part of the strongest section. Fix them and the entire first impression improves.
2. Value prop card 4 has a broken sentence in the most strategically important card on the page. This is the card that differentiates the product's AI philosophy. It needs to be airtight.
3. The brand name swap from "Node4analytics" to "n4a" in body copy is a readability improvement that touches every section. One change, compounding benefit across the entire scroll.
