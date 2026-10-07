# FinQuira — Landing Page Copy Brief

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

**For:** Developer implementation  
**Purpose:** Complete copy replacement across all landing page sections, including page metadata.  
**Status:** Final. Replace existing strings exactly as specified.

---

## How to use this document

Each section maps to a specific component file. Under each section you will find:
- The **location** in the codebase
- The **current copy** (so you can find the right string)
- The **new copy** to replace it with

Do not change any code structure, component logic, or styling. String replacements only.

---

## Page Metadata

**File:** `frontend/src/app/layout.tsx`

| Field | Current | New |
|---|---|---|
| `title` | `FinQuira — Workflow Orchestration for Financial Analysis` | `FinQuira \| Research Workspace for Financial Analysts` |
| `description` | `FinQuira orchestrates the complete equity research journey — from data discovery to final report — on an AI-powered infinite canvas.` | `FinQuira orchestrates the complete equity research journey from data to decisions.` |

---

## Navigation

**File:** `frontend/src/components/navigation.tsx`

### Nav Links

| Current | New |
|---|---|
| `Workflow` | `How It Works` |
| `Benefits` | `Why FinQuira` |
| `Features` | `Features` |

### CTA Button

| Location | Current | New |
|---|---|---|
| Desktop nav button | `Get in Touch` | `Request Early Access` |
| Mobile nav button | `Get in Touch` | `Request Early Access` |

---

## Hero Section

**File:** `frontend/src/components/hero-section.tsx`

### Badge

| Current | New |
|---|---|
| `AI Workspace for Financial Analyst` | `Built for Equity Research` |

### Headline

| Current | New |
|---|---|
| `One workspace for the` + `entire analyst` + `workflow` | `Stop switching tools.` + `Start orchestrating research` |

> Note: The headline splits across two JSX nodes with a styled span. The accent span should wrap `orchestrating research` with the same teal styling (`hsl(196 55% 38%)`). Replace accordingly.

New full headline reads: **Stop switching tools. Start orchestrating research.**

### Subheading

**Current:**
```
FinQuira orchestrates the complete equity research journey — from
data discovery to final report — on an AI-powered infinite canvas.
Reduce tool switching, retain full context, and produce cited,
decision-ready analysis.
```

**New:**
```
FinQuira is the AI workspace where equity researchers run the full
analyst workflow. From data discovery to insight extraction to
financial modelling to final report, without losing context between
steps. Improve efficiency. Boost productivity.
```

### Primary CTA Button

| Current | New |
|---|---|
| `Contact to Try it out` | `Request Early Access` |

### Secondary CTA Button

| Current | New |
|---|---|
| `See How It Works` | `See How It Works` |

> Keep as-is. It still reads well and the arrow-down icon pairs correctly.

### Trust Markers

| Current | New |
|---|---|
| `SOC 2 compliance-ready architecture` | `SOC 2-aligned from day one` |
| `Built for research teams` | `Built for research teams, not general use` |

---

## Workflow Story Section

**File:** `frontend/src/components/workflow-story-section.tsx`

> **Framing note for this section:** This section should be functional and forward-looking. It shows what happens inside FinQuira. Do not re-state pain points here. The value props section handles that. Every step title and description should speak the analyst's language, not internal product terminology.

### Section Badge

| Current | New |
|---|---|
| `How It Works` | `The Research Workflow` |

### Section Headline

| Current | New |
|---|---|
| `From raw data to analyst report — orchestrated` | `From data to decisions. One platform.` |

### Section Subheading

**Current:**
```
Every step of your research workflow connects on a single canvas.
Context flows forward. Nothing is lost.
```

**New:**
```
Most analysts know their research process well.
They just do not have a tool built around it. FinQuira does.
```

### Workflow Steps

#### Step 01

| Field | Current | New |
|---|---|---|
| Title | `Search & Discover Financial Documents` | `Find Every Filing That Matters` |
| Description | `Search for any public company and instantly access financial filings, earnings reports, news articles, and analyst coverage in one unified view.` | `Search any public company and pull its filings, earnings transcripts, news coverage, and analyst reports into a single structured view. Nothing scattered across tabs.` |

#### Step 02

| Field | Current | New |
|---|---|---|
| Title | `Build a Knowledge Corpus` | `Build Your Research Foundation` |
| Description | `Select and organize documents into a structured knowledge graph. Every piece of data retains provenance and citation links for full traceability.` | `Choose the documents that belong in your analysis. FinQuira organizes them into a structured research base where every source stays tagged and traceable from the start.` |

#### Step 03

| Field | Current | New |
|---|---|---|
| Title | `AI-Generated Dashboard & Insights` | `Surface the Signal` |
| Description | `AI analyzes your knowledge corpus and produces a dashboard with key metrics, trends, and data visualizations grounded in your selected sources.` | `AI reads your selected documents and surfaces key metrics, trend indicators, and data visualizations. You see exactly where each insight came from. You decide which ones matter.` |

#### Step 04

| Field | Current | New |
|---|---|---|
| Title | `Orchestrate on the Infinite Canvas` | `Wire Your Workflow on Canvas` |
| Description | `Open the canvas UI, create data connector nodes, attach annual reports and conference calls, and visually wire your analysis workflow.` | `Drop data sources, analysis tools, and output nodes onto an infinite canvas. Connect them. This is your research process made visible and editable.` |

#### Step 05

| Field | Current | New |
|---|---|---|
| Title | `Analyze with Spreadsheet Nodes` | `Model in Spreadsheets You Already Know. Only Better.` |
| Description | `Drop an Excel node onto the canvas, connect data inputs, and let AI assist your analysis using the full context of attached documents.` | `The spreadsheet works the way you expect it to, but now with an AI assistant connected to the context you need. It assists your analysis without guessing at what the numbers mean.` |

#### Step 06

| Field | Current | New |
|---|---|---|
| Title | `Generate Decision-Ready Reports` | `Write the Report with Confidence` |
| Description | `Connect your analysis to a document node. AI helps draft the final analyst report, with every insight traceable back to source data.` | `Connect your analysis to a document node and generate a first-draft analyst report. Every insight links back to its source document. You edit, verify, and send with confidence.` |

---

## Value Props Section

**File:** `frontend/src/components/value-props-section.tsx`

> **Framing note for this section:** This is the one place on the page where the pain of the current analyst workflow should be named specifically. Make it land once, clearly. Do not repeat these themes elsewhere on the page.

### Section Badge

| Current | New |
|---|---|
| `Why FinQuira` | `Why Analysts Switch` |

### Section Headline

| Current | New |
|---|---|
| `Stop juggling tools. Start orchestrating research.` | `Your research lives in six tools. It shouldn't.` |

### Section Subheading

**Current:**
```
Analysts lose hours switching between data terminals, spreadsheets,
document editors, and communication tools. FinQuira replaces the
chaos with a connected, context-aware workflow.
```

**New:**
```
Between screeners, filings, Excel, Word, and email, the average equity
analyst makes a dozen context switches. The research is sharp. The
workflow around it wastes hours. FinQuira fixes this.
```

### Value Prop Cards

All four cards follow the same structure: a title, a problem statement (red panel), and a solution statement (green panel).

#### Card 1 — Unified Workflow

| Field | Current | New |
|---|---|---|
| Title | `Unified Workflow` | `One Platform That Connects It All` |
| Problem | `Analysts juggle 5+ disconnected tools to gather, analyze, and report.` | `Every tool change is a context reset. Filings in one tab, model in another, notes somewhere else.` |
| Solution | `FinQuira consolidates data collection, analysis, and reporting into a single orchestrated workspace.` | `FinQuira runs the full research cycle from discovery through reporting without asking you to start over between steps.` |

#### Card 2 — Retained Context

| Field | Current | New |
|---|---|---|
| Title | `Retained Context` | `Context That Carries Forward` |
| Problem | `Switching tools means losing context and re-establishing references.` | `Your AI assistant does not know what is in the Excel you opened two windows ago. Neither does the next one.` |
| Solution | `Context flows across every node in your workflow. AI always knows what data it is working with.` | `Every node in your workflow shares the same research context. When you reach the report, the AI already knows what data you built it on.` |

#### Card 3 — Cited and Traceable

| Field | Current | New |
|---|---|---|
| Title | `Cited & Traceable` | `Every Number Has a Source` |
| Problem | `Outputs lack transparent sourcing, creating compliance and trust issues.` | `"Where did this come from?" is a question that should never slow down a final review.` |
| Solution | `Every insight links back to its source documents. Full audit trail from raw data to final report.` | `Every figure, claim, and insight in your report links directly to the source document it came from. Compliance-ready by design.` |

#### Card 4 — AI as a Tool of Thought

> **Note:** This card replaces the current "Speed & Quality" card. The speed outcome is a consequence of the workflow, not a standalone value prop. This card earns more differentiation by addressing how AI works in FinQuira specifically, which is the most common point of skepticism for an analyst audience.

| Field | Current | New |
|---|---|---|
| Title | `Speed & Quality` | `AI That Works With Your Judgment` |
| Problem | `Manual workflows are slow, repetitive, and error-prone.` | `Most AI tools answer confidently from sources you cannot verify. That is not useful when the output influences a real decision.` |
| Solution | `Automate repetitive steps, reduce errors, and deliver higher-quality analysis in less time.` | `FinQuira's AI surfaces relevant content, extracts key insights, and helps compile drafts grounded in your selected sources. It handles the retrieval and keeps outputs traceable. Your judgment handles the rest.` |

---

## Feature Highlights Section

**File:** `frontend/src/components/feature-highlights-section.tsx`

> **Framing note for this section:** This is where the analyst evaluates feature depth. Speak their language, not internal product terminology. The "familiar tools" angle is most relevant for the spreadsheet and document features.

### Section Badge

There is currently no badge on this section. Add one:

| Field | Value |
|---|---|
| New badge text | `What Is Inside` |
| Badge color | Use same styling as workflow section badge (mint: `hsl(162 45% 90%)` bg, `hsl(162 45% 40%)` text, `hsl(162 45% 80%)` border) |

### Section Headline

| Current | New |
|---|---|
| `Everything an analyst needs, nothing they don't` | `Everything an analyst needs, nothing they don't` |

> Keep exactly as-is. Punctuation with the apostrophe in `don't` is correct and the line works.

### Section Subheading

**Current:**
```
Purpose-built capabilities for the financial research workflow. No
feature bloat. No learning curve friction.
```

**New:**
```
Purpose-built capabilities for the financial research workflow.
Familiar tools, connected to power your analysis.
```

### Feature Cards

#### Feature 1

| Field | Current | New |
|---|---|---|
| Title | `Node-Based Orchestration` | `Visual Workflow Canvas` |
| Description | `Build complex research workflows visually. Connect data sources, analysis tools, and output nodes on an infinite canvas that scales with your process.` | `Build your research process as a connected graph. Link data inputs to analysis tools to output documents. See the full picture. Control every step.` |

#### Feature 2

| Field | Current | New |
|---|---|---|
| Title | `Knowledge Corpus & Graph` | `Structured Research Library` |
| Description | `Curate, organize, and explore your research materials as an interconnected knowledge graph with full citation lineage.` | `Pull documents into a curated, searchable research library. Every source tagged, every citation traceable from the first document added to the last line of your report.` |

#### Feature 3

| Field | Current | New |
|---|---|---|
| Title | `Grounded AI Analysis` | `AI That Is Reliable` |
| Description | `Every AI-generated insight is factually grounded in your selected sources, with transparent citations and zero hallucination risk.` | `Every AI output references the specific document and passage it drew from. Before anything reaches your report, you can see exactly where it came from.` |

#### Feature 4

| Field | Current | New |
|---|---|---|
| Title | `Spreadsheet Workflow Support` | `Spreadsheet Node` |
| Description | `Integrate spreadsheet-style analysis directly into your workflow. AI understands your data context and assists computations.` | `The spreadsheet you already know, with the document context you have been building. AI assists your analysis using the sources attached to the workflow, not assumptions.` |

#### Feature 5

| Field | Current | New |
|---|---|---|
| Title | `Document & Report Generation` | `Report and Memo Generation` |
| Description | `Produce polished analyst reports and investment memos that reference your analysis and maintain end-to-end traceability.` | `Draft analyst reports and investment memos directly from your canvas. Outputs are structured for stakeholder review with every insight already linked to its source.` |

#### Feature 6

| Field | Current | New |
|---|---|---|
| Title | `Decision-Ready Outputs` | `Full Audit Trail` |
| Description | `Every output is structured for decision-makers: clearly cited, well-organized, and ready for stakeholder review.` | `From the first document pulled to the last line of the report, every step is logged. Built for teams where sourcing accountability is not optional.` |

---

## Contact Section

**File:** `frontend/src/components/contact-section.tsx`

### Section Badge

| Current | New |
|---|---|
| `Get Started` | `Early Access` |

### Section Headline

| Current | New |
|---|---|
| `See FinQuira in action` | `See it run on a real research workflow` |

### Section Subheading

**Current:**
```
Request a personalized demo to explore how FinQuira fits your
team's research workflow. No commitment required.
```

**New:**
```
We walk you through FinQuira using an actual equity research
scenario. Your sector, your workflow, your questions.
Thirty minutes. No slides. No pitch.
```

### Checklist Items

Replace all three items in `CHECKLIST_ITEMS`:

| # | Current | New |
|---|---|---|
| 1 | `Personalized walkthrough of the platform` | `Live walkthrough using a real company analysis, not a scripted demo` |
| 2 | `See your workflow mapped on the canvas` | `Your current research process mapped onto the canvas` |
| 3 | `Understand integration options for your data stack` | `Honest answers on integrations, data sources, and what is still being built` |

### CTA Button

| Current | New |
|---|---|
| `Get in Touch` | `Request a Walkthrough` |

> Also update the `href` target — this is a `mailto:` link. No change needed to the email address itself.

---

## Footer

**File:** `frontend/src/components/footer.tsx`

### Tagline

There is currently no tagline in the footer. Add one line of text below the FinQuira brand mark:

**New text to add:**
```
Built for the analyst who expects more from their tools.
```

> Place this as a `<p>` or `<span>` directly below the brand logo row, before the copyright line. Style it at `text-xs` with muted color to match the copyright text. No design change required — match existing text styling.

### Copyright

| Current | New |
|---|---|
| `© [year] FinQuira. All rights reserved.` | Keep as-is. |

---

## Editorial Notes

These are not implementation instructions. They explain the reasoning behind specific choices, for anyone reviewing the brief.

**On AI language:** The copy deliberately avoids phrases like "AI automates," "AI replaces," or "AI handles your research." AI is positioned as a tool that amplifies analyst judgment rather than substituting it. The clearest expression of this principle is the hero subheading's closing line: "AI surfaces the signal. You decide what it means." Every AI-adjacent description in the copy follows this same logic.

**On em dashes:** Removed from all copy. Long dashes create a slightly editorial, formal register that can feel impersonal. Sentences are restructured with periods for rhythm instead.

**On repetition:** The tool-switching and context-loss pain is concentrated in the value props section only. It does not appear in the workflow steps, feature descriptions, or contact section. Each section has a distinct job: workflow section shows the product, value props section names the problem, features section validates depth, contact section removes friction from the ask.

**On the hero headline:** "One canvas to run sharper research" is adapted from the structural pattern of "one [X] to create better [Y]" as discussed. It introduces the canvas metaphor early, which primes the workflow section visually. "Sharper" is deliberately chosen over "better" because analysts respond to precision over generality.

**On the fourth value prop card:** "Speed and Quality" was replaced with "AI That Works With Your Judgment." Speed is a downstream outcome of a better workflow, not a standalone value proposition for a skeptical analyst. The AI card earns more differentiation because it directly addresses the most common objection an analyst has to AI tools: that they produce outputs with no visible reasoning.
