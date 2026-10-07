# Documentation guide

> **status:** current · **authoritative for:** navigating the research and documentation included here ·
> **last verified:** 2026-10-07.

Start with [Research and insights](RESEARCH-INSIGHTS.md). It explains the problem and the reasoning behind the product without requiring the full development history.

## A short reading route

1. [Product requirements](prd.md): audience, workflow, intended outcomes, requirements, and risks. KPI ranges are proposed targets, not measured results.
2. [Research and insights](RESEARCH-INSIGHTS.md): the design conclusions and their evidence boundaries.
3. [Competitive research](Competitor%20research/README.md): ten dated analyses, spanning workflow tools and investment-research products.
4. [Analyst comprehension research](ANALYST-COMPREHENSION-RESEARCH-2026-07-27.md): why an evidence brief should precede relationship exploration; includes a historical corpus diagnosis.
5. [Research paper index](reference/RESEARCH-PAPER-INDEX.md): fourteen papers, the design consequence of each, and what it does not establish.
6. [Verification guide](VERIFY.md): how to run and assess the landing page included here.

## Product and design

| Document | Scope |
| --- | --- |
| [PRD](prd.md) | Product intent; features beyond the landing page are requirements |
| [Design philosophy](design-philosophy.md) | Early brand and visual exploration, including the FinQuira working name; not an exact specification of the current landing page |
| [Copy brief](copy-brief.md) | Earlier landing-page messaging; current wording lives in `frontend/src/components` |
| [Design system](../DESIGN-SYSTEM.md) | Broader workspace anatomy, tokens, and interactions |
| [Validation backlog](VALIDATION-BACKLOG.md) | Open hypotheses and questions for user testing |
| [Workflow concept](../Financial%20Workflow%20Canvas.html) | Early standalone interaction experiment; illustrative content |

## Analyst research and case studies

The [prototype research guide](prototype-update/README.md) introduces analyst personas, company dossiers, figure checks, and surface critiques. Those records discuss a separate six-surface prototype named `N4A-Prototype.html`; that artifact is not included here. `Financial Workflow Canvas.html` is an earlier concept, not a replacement for it.

- [Analyst workflow research](prototype-update/research/ANALYST-USER.md)
- [Infosys dossier](prototype-update/research/DOSSIER-INFOSYS.md) and [HDFC Bank dossier](prototype-update/research/DOSSIER-HDFC.md)
- [TCS peer research](prototype-update/research/PEER-TCS.md) and [ICICI Bank peer research](prototype-update/research/PEER-ICICI.md)
- [Accuracy ledger](prototype-update/ACCURACY-LEDGER.md): how figures and citations were challenged and corrected
- [Library review](prototype-update/review/LIBRARY.md) and [Graph review](prototype-update/review/GRAPH.md)

The dossiers retain source/page references, but the original PDFs are not distributed here. Readers can follow external source links where supplied; local PDF citations are evidence records, not clickable bundled documents.

## Technical thinking and historical records

[Architecture](reference/ARCHITECTURE.md), [flow diagrams](reference/MERMAID-DIAGRAMS.md), and [technology research](reference/RESEARCH.md) describe the broader platform, rather than executable services in this tree. [Eval doctrine](reference/EVAL-DOCTRINE.md) and [lessons](LESSONS.md) preserve reasoning about provenance, measurable outcomes, and failure cases.

[Progress](PROGRESS.md), [roadmap](ROADMAP.md), [stage plan](PLAN.md), [commands](reference/COMMANDS.md), [runtime gotchas](GOTCHAS.md), [demo notes](DEMO-FEATURES.md), and [model-price notes](reference/MODEL-PRICES.md) are historical development references. Their service commands, workspace IDs, test totals, and pricing are not current instructions for this repository. References to absent ADRs, specs, scripts, or services belong to that broader development record.

Use the root [README](../README.md) and [frontend README](../frontend/README.md) for commands that work here. [SESSION](SESSION.md) tracks the current repository task.

## How to read the evidence

Research is dated. Competitor observations are snapshots, not current feature guarantees. Vendor claims are not independent validation. Academic results inform particular design choices; they do not prove this product improves investment returns or analyst productivity. Financial examples preserve their original period and source context.
