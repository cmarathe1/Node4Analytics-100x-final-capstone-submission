# Node4analytics — Product requirements

> **status:** product intent · **authoritative for:** proposed workflows, requirements, and success targets ·
> **last verified:** 2026-10-07 (scope only). KPI ranges are hypotheses, not measured outcomes. The landing page implements the visual preview; the broader platform requirements below are not shipped by this repository.

## Contents
Abstract Business Objectives KPI Success Criteria User Journeys Scenarios User Flow Functional Requirements Model Requirements Data Requirements Prompt Requirements Testing & Measurement Risks & Mitigations Costs Assumptions & Dependencies Compliance/Privacy/Legal GTM/Rollout Plan

## 📝 Abstract
An AI-powered orchestration platform for equity and investment analysts that consolidates fragmented research workflows into a single web-based workspace. The product is built around an **infinite canvas workflow orchestrator with a node-based visual programming UI**, allowing analysts to gather public company data, build a project knowledge corpus, conduct grounded analysis, work with spreadsheet and document-style tools, and produce decision-ready outputs such as analyst reports and investment analyses.

The platform’s core value is not only AI assistance, but **workflow orchestration**: reducing tool switching, repetitive work, and context loss across the full journey from data collection to final output. AI acts as a tool of thought throughout the workflow by summarising, extracting insights, assisting with analysis, supporting report creation, and answering factual questions grounded in approved sources and project context.

## 🎯 Business Objectives
- Consolidate fragmented analyst workflows into one orchestrated platform.
- Reduce time spent on repetitive data gathering, context switching, and manual report assembly.
- Improve trust and consistency in AI-assisted outputs through grounded, reference-backed responses.
- Deliver a complete v1 workflow for analysing a listed company to support investment decisions.
- Build an MVP that is feasible for a solo technical founder while preserving a path to enterprise-grade trust, security, and future collaboration features.
- Establish a differentiated product position as a **workflow operating system for analysts**, not just another AI research assistant.

## 📊 KPI

| GOAL | METRIC | QUESTION |
|---|---|---|
| Workflow Consolidation | % of core workflow completed inside the platform | Can analysts complete most of a company-analysis workflow without leaving the product? |
| Efficiency | Median time saved per company analysed | Does the platform materially reduce analysis time? |
| Output Usability | % of outputs accepted with only minor edits | Are AI-assisted outputs useful enough to reduce rewrite effort? |

### Suggested initial target ranges for first 8 to 12 weeks
- **Workflow completed inside platform:** 60% to 80%
- **Time saved per company analysed:** 25% to 40%
- **Outputs accepted with only minor edits:** 50% to 70%

## 🏆 Success Criteria
- A user can complete one end-to-end listed-company analysis workflow inside the platform.
- The platform feels materially more seamless than using multiple disconnected tools.
- AI outputs are consistently grounded in retrieved or linked evidence and include references where relevant.
- Users report meaningful reduction in workflow friction across research, synthesis, and reporting.
- Early users repeatedly use the product for real company analysis, not just one-off experimentation.
- The MVP is stable enough to support pilot users and structured iteration.
- The product proves that **workflow orchestration** is the key source of value, beyond standalone AI assistance.

## 🚶‍♀️ User Journeys
1. An analyst starts a new project for a listed company by entering a company name, ticker, or sector.
2. The platform retrieves relevant public documents, financial data, and news and presents them in a structured screener-style interface.
3. The analyst selects relevant sources and adds them to a project knowledge corpus.
4. The corpus becomes reusable context across the project and can be routed into different nodes on the canvas.
5. On the infinite canvas, the analyst creates and connects nodes such as data connector, spreadsheet, and document.
6. AI inside each tool uses routed context from the selected project corpus rather than unsupported assumptions.
7. The analyst explores data, performs analysis, extracts insights, and drafts an output.
8. The final output is an analyst report or decision-support analysis generated with traceable references and editable by the user.

## 📖 Scenarios
- Analyst wants to analyse one listed company before forming an investment view.
- Analyst needs to consolidate earnings materials, filings, market data, and news in one place.
- Analyst wants AI to summarise long documents and extract decision-relevant insights.
- Analyst needs specific data points routed into a spreadsheet-style analysis node.
- Analyst wants a report draft generated from connected workflow outputs and grounded evidence.
- Analyst uploads notes or documents and wants them linked to the same project context.
- Analyst asks factual questions and expects answers only from connected project sources or approved datasets.
- Analyst wants to orchestrate multiple workflow steps visually rather than switching across separate applications.

## 🕹️ User Flow

### Happy path
- User creates a new project
- User enters company name, ticker, or sector
- Platform retrieves public data, filings, and news
- User reviews sources in screener format
- User adds selected items to project knowledge corpus
- Platform stores source documents and derived representations
- User opens the infinite canvas workspace
- User creates a data connector node
- User creates a spreadsheet node
- User connects relevant project data/context into the spreadsheet node
- AI assists analysis inside the spreadsheet context
- User creates a document node
- Spreadsheet outputs and contextual evidence are connected to the document node
- AI drafts structured analysis/report with references
- User reviews, edits, saves, and exports final output

### Key alternatives
- User uploads their own files or notes to enrich project corpus
- User skips report drafting and uses the platform only for analysis support
- User asks factual questions directly against the project corpus
- AI abstains when evidence is insufficient or conflicting
- User reuses an existing workflow template on the canvas for another company analysis

## 🧰 Functional Requirements

| SECTION | SUB-SECTION | USER STORY & EXPECTED BEHAVIORS | SCREENS |
|---|---|---|---|
| Signup | Email | As a user, I can create an account with email to access my projects securely. Basic verification and session management should work reliably. | TBD |
| Signup | Google | As a user, I can sign up with Google for faster onboarding. | TBD |
| Login | Email | As a user, I can log in securely and access my saved projects and workspace. | TBD |
| Login | Google | As a user, I can log in with Google and resume work quickly. | TBD |
| Forgot Password | Email Recovery | As a user, I can reset my password securely without losing project data. | TBD |
| Project Setup | New Project | As a user, I can start a project using company name, ticker, or sector and define the analysis target. | Project creation screen |
| Data Discovery | Public Data Retrieval | As a user, I can search and retrieve relevant public financial documents, news, and datasets. | Data search / screener view |
| Data Discovery | Source Selection | As a user, I can review candidate sources and add selected ones to project context. | Screener / source selection view |
| Knowledge Corpus | Corpus Management | As a user, I can view, organise, and reuse project sources and notes as a persistent knowledge base. | Project corpus view |
| Knowledge Corpus | User Uploads | As a user, I can upload my own documents and notes into a project. | Upload / corpus management |
| Canvas | Infinite Canvas Orchestrator | As a user, I can build, rearrange, and expand workflows on an infinite canvas using connected nodes that represent tools, data sources, and outputs. The system should make dependencies and flow of context visually clear. | Canvas workspace |
| Canvas | Node-Based Visual Programming | As a user, I can compose workflows by connecting nodes visually rather than manually repeating steps across tools. | Canvas workspace |
| Canvas | Workflow Persistence | As a user, I can save and reopen workflows so I can continue analysis without rebuilding the flow. | Canvas workspace |
| Canvas | Workflow Templates | As a user, I can reuse a workflow structure for future company analyses. | Canvas workspace / template library TBD |
| Canvas | Data Connector Node | As a user, I can create a node that brings selected project data or source outputs into the workflow. | Canvas workspace |
| Analysis Tooling | Spreadsheet Node | As a user, I can open a spreadsheet-style node and analyse structured data with AI assistance grounded in linked context. | Spreadsheet node |
| Analysis Tooling | Document Node | As a user, I can open a document node and draft reports using outputs and evidence from other connected nodes. | Document node |
| AI Assistance | Summarisation & Extraction | As a user, I can ask AI to summarise documents and extract insights from selected evidence. | Embedded AI assistant in tools |
| AI Assistance | Research Q&A | As a user, I can ask factual questions and receive answers grounded in linked project sources and approved datasets. | Embedded assistant / side panel |
| AI Assistance | Citation & Grounding | As a user, I can see what evidence the AI used and when it cannot support an answer. | Source traceability UI |
| AI Assistance | Context Routing | As a user, I can control which sources or node outputs are passed into downstream AI tools so results stay relevant and accurate. | Canvas + tool context panel |
| Output | Report Drafting | As a user, I can generate a first-draft analyst report or analysis memo from connected workflow nodes. | Document/export view |
| Output | Save / Export | As a user, I can save and export my outputs for later use. | Export/share view TBD |

### Additional functional notes
- The infinite canvas is the **primary control surface** for composing analyst workflows.
- Node connections define how data, context, and intermediate outputs move across the workflow.
- The system should preserve project context across sessions.
- AI should not answer as though it knows facts outside approved sources when the task requires grounding.
- The platform should be modular so additional node types, team workspaces, and collaboration features can be added later.
- v1 should prioritise a small, high-value set of node types over platform breadth.

## 📐 Model Requirements

| SPECIFICATION | REQUIREMENT | RATIONALE |
|---|---|---|
| Open vs Proprietary | Likely proprietary-first for MVP, with abstraction for future model swaps | Faster execution and better quality/latency trade-offs for solo-founder MVP |
| Context Window | Large enough to handle multi-document project context and structured summaries | Analysts work across many long documents and linked sources |
| Modalities | Text first; document parsing and tabular understanding required | Core workflows rely on filings, notes, news, and structured financial data |
| Fine Tuning Capability | Not required for MVP; prefer prompt + retrieval + workflow grounding | Product needs current factual grounding more than static pattern learning |
| Latency | Target P50: 3 to 8 seconds for common assistive actions; P95: under 15 to 20 seconds for heavier tasks | Analysts need responsiveness, but can tolerate modest delay for high-value tasks |
| Parameters | TBD based on provider and cost envelope | Should be abstracted behind a model service layer |

### Additional model requirements
- Very low hallucination tolerance.
- Mandatory evidence-grounding for factual and report-generation tasks where applicable.
- Support for tool calling or structured orchestration is strongly preferred.
- Model stack should support abstention and confidence-aware UX patterns.
- Routing between lighter and heavier models may be needed for cost control.
- The system should separate **retrieval, reasoning, and generation** steps wherever possible for observability and trust.

## 🧮 Data Requirements
- **Fine tuning purpose**
  - No fine tuning required in MVP.
  - Focus on retrieval, context routing, grounded prompting, and structured outputs.

- **Data preparation plan**
  - Ingest public company documents, news, and financial data through selected APIs/connectors.
  - Parse, chunk, tag, and link documents to project entities such as company, period, metric, and source type.
  - Store original document plus derived forms for retrieval and analysis.
  - Represent project knowledge across:
    - relational database for structured entities and relationships
    - vector database for semantic retrieval
    - knowledge graph for entity links and cross-document reasoning

- **Quantity and coverage targets**
  - Coverage sufficient for one complete listed-company analysis workflow.
  - Prioritise high-value public sources over broad connector count.
  - Initial coverage target: public filings, core financial datasets, and relevant company/news context.
  - Exact source list: TBD.

- **Ongoing collection plan**
  - Refresh approved public sources on a regular cadence.
  - Track source freshness, provenance, and retrieval timestamps.
  - Allow user-added documents and notes at project level.

- **Iterative fine tuning plan**
  - Phase 1: retrieval + prompting + workflow instrumentation
  - Phase 2: collect anonymised interaction data and failure cases
  - Phase 3: consider lightweight fine tuning only if stable repetitive patterns justify it

## 💬 Prompt Requirements
- **Policy and refusal handling**
  - AI must abstain or qualify answers when evidence is missing, weak, or conflicting.
  - The model should clearly distinguish sourced facts from inferred suggestions.
  - It must avoid presenting unsupported financial claims as fact.
  - The assistant should not imply investment certainty where evidence is partial.

- **Personalization rules such as pronouns and tone**
  - Tone should be professional, concise, analytical, and neutral.
  - Responses should align with analyst workflow expectations rather than consumer-chat tone.
  - User preferences for output style can be added later.

- **Output format guarantees such as JSON schema**
  - Structured outputs should be used where downstream workflows depend on machine-readable responses.
  - Citation fields, source references, and confidence markers should be included when applicable.
  - Node-to-node handoffs should prefer schema-constrained outputs.

- **Accuracy target tied to the Testing Plan**
  - Accuracy expectation should be tied to evidence-grounded tasks, not open-ended generation.
  - For factual questions, target should be high citation validity and low unsupported-claim rate.
  - For drafted outputs, target should be strong reviewer acceptance with minor edits.

## 🧪 Testing & Measurement
- **Offline eval plan**
  - Build golden sets from representative analyst tasks:
    - document summarisation
    - factual Q&A
    - insight extraction
    - report drafting
    - node-to-node context transfer
  - Use a rubric covering:
    - citation correctness
    - factual consistency
    - completeness
    - relevance
    - abstention quality
  - Define pass thresholds per task type.
  - Include adversarial cases with missing evidence or conflicting sources.

- **Online plan**
  - Pilot with a small set of early users.
  - Track task completion, time saved, edit rate, and workflow completion inside the platform.
  - Compare AI-assisted workflows against the user’s current manual baseline where possible.
  - Include guardrails and rollback paths for unreliable model behaviours.

- **Live performance tracking and alerting**
  - Monitor latency, retrieval failures, unsupported-answer rate, citation usage, and task abandonment.
  - Flag hallucination-like incidents and source-traceability failures.
  - Instrument node usage and flow drop-off to learn which orchestration patterns create value.

## ⚠️ Risks & Mitigations

| RISK | MITIGATION |
|---|---|
| Too many integrations required for MVP | Prioritise a narrow source set that supports one complete listed-company workflow |
| Users do not feel meaningful workflow improvement | Focus v1 on one high-value end-to-end job and measure actual workflow completion and time saved |
| Canvas adds complexity instead of clarity | Ship a small set of opinionated node types and example workflows |
| Hallucinations damage trust | Use strict grounding, abstention rules, citation UX, and evidence-linked prompting |
| Poor source coverage weakens usefulness | Choose the most decision-relevant public datasets first and make source gaps visible |
| Distribution channels underperform | Continue customer discovery alongside build and launch with a narrow user wedge |
| Solo-founder scope risk | Keep v1 tightly constrained and modular, avoid broad platform breadth |
| Future collaboration needs force rework | Design project/workspace model with extensibility, even if collaboration is not exposed in v1 |
| Invalid structured outputs break downstream workflows | Use schema validation, retries, and graceful failure states |
| Security expectations rise before enterprise maturity | Build with SOC 2-aligned practices from the start, even before certification |

## 💰 Costs
- **Development costs**
  - integration and ingestion work for public data sources
  - document parsing and indexing
  - infinite canvas and workflow orchestration UI
  - spreadsheet and document tooling
  - eval setup and QA
  - security and logging foundations

- **Operational costs**
  - model inference and token usage
  - vector storage and search
  - relational and graph database infrastructure
  - background jobs for ingestion and refresh
  - monitoring, logging, and alerting
  - hosting and authentication infrastructure

- **Cost strategy**
  - Prioritise high-value workflows over broad connector count
  - Use model routing and caching where possible
  - Minimise expensive generation by reusing structured intermediate outputs

## 🔗 Assumptions & Dependencies
- v1 is limited to public-company analysis workflows.
- v1 is single-user, but architecture should support future collaboration.
- Spreadsheet and document nodes are essential for initial value delivery.
- Public data sources selected for MVP will be sufficient to support one complete company-analysis workflow.
- Users will accept grounded AI assistance if citations and source traceability are strong.
- Formal SOC 2 certification is not required before MVP launch, but SOC 2-aligned controls should inform architecture.
- Success depends on continued access to reliable public datasets and APIs.
- Success also depends on converting customer-discovery insights into a tight launch wedge.
- The infinite canvas workflow orchestrator is the right primary UX metaphor for the target user.

## 🔒 Compliance/Privacy/Legal
- Build with SOC 2 eligibility in mind, including logging, access control, auditability, and secure infrastructure practices.
- Apply least-privilege access and role-ready architecture even if v1 is single-user.
- Maintain clear provenance for retrieved and user-uploaded data.
- Define data retention and deletion policies at project level. Exact values: TBD.
- Separate user content, system metadata, and derived representations cleanly.
- Ensure encrypted data storage and transport.
- Be explicit about what data is public-source derived versus user-provided.
- Add usage terms and disclaimers appropriate for decision-support software, especially where outputs may influence investment decisions.
- Review third-party data licensing constraints for all connectors and datasets.
- Prepare for future enterprise requirements such as audit logs, SSO, workspace permissions, and customer-managed security controls.

## 📣 GTM/Rollout Plan
- **Milestones**
  - Define narrow launch wedge and day-one data source set
  - Build end-to-end single-company workflow
  - Validate grounding and report quality with pilot users
  - Launch to a small early-access group
  - Iterate based on usage and failure points
  - Expand integrations, workflows, and collaboration features

- **Launch strategy**
  - Position as an orchestration platform for public-market company analysis rather than just an AI chatbot
  - Lead with workflow consolidation, grounded analysis, and reduced tool switching
  - Use customer discovery conversations to recruit pilot users
  - Emphasise real analyst outcomes such as speed, evidence traceability, and usable first drafts

- **Phased rollout including beta and full launch**
  - Phase 1: internal prototype and workflow validation
  - Phase 2: invite-only pilot with individual analysts
  - Phase 3: refined beta focused on one narrow listed-company analysis workflow
  - Phase 4: broader early access with improved integrations and reusable workflow templates
  - Phase 5: expand into collaboration, team workflows, and stronger enterprise controls
