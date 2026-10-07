# Research and insights

> **status:** synthesis · **authoritative for:** the product rationale and links to supporting research ·
> **last verified:** 2026-10-07 against the included research notes.

## The question

How can an equity analyst move from a collection of documents to an investment view without losing the trail of evidence?

The [PRD](prd.md) frames the problem as workflow fragmentation: collecting sources, reading filings, maintaining models, recording a thesis, and writing a report happen in separate tools. Node4analytics proposes a connected workspace with AI assistance inside that process. Time savings and output quality are hypotheses to measure, not results established by this repository.

## What the research changed

| Insight | Product consequence | Evidence and limit |
| --- | --- | --- |
| Understanding starts with evidence gathering and framing | Library should introduce the business and its evidence before the user explores a graph | [Comprehension research](ANALYST-COMPREHENSION-RESEARCH-2026-07-27.md), drawing on sensemaking research; intelligence-analysis findings are adapted to equity research |
| A graph can show relationships while hiding the questions that matter | Give Graph its own investigation role; use tables and quantitative comparisons where those are clearer | [Paper index](reference/RESEARCH-PAPER-INDEX.md) and [Graph review](prototype-update/review/GRAPH.md); a rationale, not a measured usability improvement |
| Financial claims need a source, reporting period, and comparable frame | Keep citations with outputs; distinguish guidance from actuals and consolidated from standalone figures | [Architecture](reference/ARCHITECTURE.md) and [accuracy ledger](prototype-update/ACCURACY-LEDGER.md); platform requirements, not functionality of the landing-page preview |
| Disclosure changes and analyst questions may deserve attention alongside headline figures | Preserve sections, speakers, revisions, and reporting context | [Paper index](reference/RESEARCH-PAPER-INDEX.md), especially disclosure-change and conference-call studies; findings do not establish an investment-return advantage here |
| The analyst needs to inspect and revise the reasoning | Connect sources, AI reading, models, and reports on a visible workflow canvas | [PRD](prd.md) and [Canvas review](prototype-update/review/CANVAS.md); demonstrated as an illustrative interaction in the landing page |
| Different sectors require different questions | Research an IT exporter and a bank, then inspect peer cases | [Infosys](prototype-update/research/DOSSIER-INFOSYS.md), [HDFC Bank](prototype-update/research/DOSSIER-HDFC.md), [TCS](prototype-update/research/PEER-TCS.md), and [ICICI Bank](prototype-update/research/PEER-ICICI.md); these cases do not establish universal coverage |

## Competitive positioning

The [ten competitive studies](Competitor%20research/README.md) cover three workflow tools and seven research/data products. They inform two decisions: make the connected workflow visible, and earn trust through inspectable evidence rather than broad AI claims.

The intended distinction is the combination of an analyst-oriented evidence brief, relationship exploration, connected research steps, and a record of judgment. It remains a positioning hypothesis. The research does not prove that competitors lack every part of that combination.

## A concrete analyst journey

1. Gather filings, results, transcripts, and relevant independent sources.
2. Read an evidence brief: business structure, key figures, changes, and unresolved questions.
3. Follow a relationship or question into the Graph and inspect its supporting sources.
4. Continue on Canvas with selected evidence, AI reading, a financial model, and a report draft.
5. Record the investment view, what would falsify it, and the next evidence to watch.

This is the product journey documented by the research. The landing page demonstrates its visual orchestration idea with sample content; it does not execute the data or AI steps.

## What still needs validation

- Can an analyst find and explain a material question faster than with their existing workflow?
- Can they trace a generated statement to the correct source and reporting period?
- Does the canvas reduce context switching during real modelling and report preparation?
- Does the brief stay useful for companies with sparse evidence?
- Do users return to maintain a thesis and its falsifiers?

The [validation backlog](VALIDATION-BACKLOG.md) and [PRD](prd.md) provide further hypotheses. Historical technical evaluations measure particular pipeline or display properties; they are not substitutes for these user outcomes.

## Evidence boundaries

The repository includes desk research, dated competitor observations, published-paper references, company case studies, and historical technical review records. It does not contain a verified customer interview dataset or a measured productivity study. Sources retain their own dates and scope; older working names and superseded proposals are part of the research trail.
