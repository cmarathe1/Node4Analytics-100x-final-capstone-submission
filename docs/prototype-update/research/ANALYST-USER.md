# Research — the Indian equity analyst, for the showcase

> **status:** working (temporary) · **authoritative for:** who the demo's viewer is, what they track
> for a private bank and an IT exporter and in what format, how competing AI research tools earn or
> lose trust, and what the demo must show · **last verified:** 2026-10-05 (web research by one agent;
> see caveats).

**What this adds to earlier research.** `docs/ANALYST-COMPREHENSION-RESEARCH-2026-07-27.md` and
`docs/PHASE-2-ANALYST-ORIENTATION-RESEARCH-2026-07-27.md` already cover sensemaking theory, the
graph-first critique, Screener's pros/cons, AlphaSense / FactSet / Quartr / Koyfin / NotebookLM, the
"Lazy Prices" finding, analysts' attention to Q&A, and CFA/SEBI standards (incl. SEBI's AI-disclosure
rule). This file covers what they did not (§7).

**Caveats.**
- Some sites blocked the reader (WSO, G2, parts of Business Standard and Bloomberg returned 403);
  claims resting only on a search-result summary are marked *(snippet)*.
- Tags: **[practitioner]** broker notes, analysts, forums · **[vendor]** a product's own claims or a
  competitor's comparison · **[press]** journalism and content sites · **[primary]** company or
  regulator filings · **[corpus]** our `data/seed` files.
- ⚠ **Events after the corpus** (marked ⚠ below) come from the web, after the reviewing model's
  knowledge, and were **not verified**. Per O6 they enter the prototype **only** if a document the user
  adds says so.

## 1. Personas

**A. Sell-side sector analyst at an Indian broker** (Axis, Motilal, Geojit, Deven Choksey).
- Day: 9:00 morning call; earnings calls in market hours; model and note 4–8 pm. Earnings season is
  3–4 weeks with several results a day ([quintedge](https://quintedge.com/blog/what-is-equity-research) [press]).
- Output within hours: a **result update** whose page 1 reads "Est. vs Actual: NII INLINE; PPOP
  INLINE; PAT INLINE", then estimate changes (FY27E/FY28E NII −3.5% / −2.6%), a Q/Q and Y/Y table
  with ratio changes in bps, a SOTP valuation and the recommendation history
  ([Axis HDFCB Q1FY27](https://simplehai.axisdirect.in/app/index.php/insights/reports/downloadReport/file/HDFC+Bank+Ltd+-+Q1FY27+Result+Update+-+200726_20-07-2026_10.pdf/type/fundamental) [practitioner]).
- Pains: HDFC Bank reported Q1 on a **Saturday** (18 Jul) ([deck](https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/pdf/about-us/financial-results/2026-2027/quarter-1/q1fy27-earnings-presentation.pdf) [primary]);
  call audio is due within 24 h but the **transcript can take 5 working days**
  ([NSE guidance note](https://nsearchives.nseindia.com/web/sites/default/files/inline-files/Guidance%20note%20on%20disclosures%20pertaining%20to%20analysts,%20institutional%20investors%20meet%20and%20best%20practices.pdf) [primary]) —
  so the first note is written from the results deck and the live call, not a transcript; one-offs
  distort YoY.

**B. Buy-side analyst at an AMC, insurer or PMS.**
- A large AMC fund manager draws on 15–25 sector analysts, each on 15–30 companies
  ([fundsageai](https://www.fundsageai.com/blog/how-mutual-fund-fund-manager-works-india) *(snippet)* [vendor blog]).
- Reads several broker notes per name; watches consensus direction (Trendlyne Forecaster aggregates
  40+ brokers, [Trendlyne](https://trendlyne.com/equity/consensus-estimates/what-is/modal/) [vendor]).
- Reads the numbers first, then the Q&A, the CEO's remarks last; tracks "what management deflects" and
  tone across 3–4 quarters ([Deodhar](https://ashishdeodhar.substack.com/p/reading-the-concall-for-growth-investors) [practitioner]).
- Pains: brokers report on different bases; "what changed since last quarter"; whether management's
  guidance has proved credible.

**C. PM or CIO** (PMS, AIF, family office). Asks "is the thesis broken, and what is priced in?" — e.g.
is HDFC Bank's ~25% fall this year a governance discount or an earnings story; foreign institutional
holding fell from 49.2% to 44.05% ([niftytrader](https://www.niftytrader.in/markets/hdfc-bank-down-25pct-fii-exit-governance/) [press]).
Wants one page: the view, the falsifiers, the decision log.

## 2. Competitive UX patterns

| Product | Pattern analysts value | Complaint / limit |
|---|---|---|
| **Daloopa** | every figure links to the exact page and line; one-click model update flags newly disclosed KPIs ([Daloopa](https://daloopa.com/blog/product-updates/automate-financial-model-updates) [vendor]) | "deliberately not a research platform" — no narrative or tone ([Marvin Labs](https://www.marvin-labs.com/blog/ai-tools-for-equity-research-complete-platform-comparison/) [vendor]) |
| **Hebbia Matrix** | documents as rows, questions as columns, every cell cited | steep learning curve; slow on scanned PDFs, tables need manual checks; enterprise pricing ([G2](https://www.g2.com/products/hebbia-ai-2026-02-24/reviews?qs=pros-and-cons) *(snippet)* [practitioner]) |
| **AlphaSense** | breadth (broker research, expert calls); sentence-level citations | thin Asian / EM coverage; noisy search ([G2](https://www.g2.com/products/alphasense/reviews) *(snippet)* [practitioner]) |
| **Rogo** | agentic deal workflows | WSO: "nothing I can submit… without review"; citations at answer level, not sentence level ([vantaige](https://vantaige.io/ai-tool/rogo-ai) [press]) |
| **Fintool** (Microsoft, Apr 2026) | fast answers cited to the passage | US filings only; chat with no surrounding workflow ([Rundown](https://www.therundown.ai/tools/fintool) [press]) |
| **BamSEC** | redline between two filings; tables to Excel, merged across periods ([findmymoat](https://www.findmymoat.com/tools/bamsec) [press]) | US-only |
| **Bloomberg Document Insights / Capital IQ Doc Intelligence 2.0** | questions across documents with precise citations ([Bloomberg](https://www.prnewswire.com/news-releases/bloomberg-accelerates-financial-analysis-with-gen-ai-document-insights-302421875.html), [S&P](https://press.spglobal.com/2025-10-22-S-P-Global-Redefines-Financial-Insights-with-New-AI-Powered-Multi-Document-Research-and-Analysis-Tool-in-Capital-IQ-Pro-ChatIQ) [vendor]) | terminal-priced |
| **Screener.in** | standalone/consolidated toggle; Excel export | silently falls back to standalone by its own rule ([support](https://support.screener.in/article/41-standalone-or-consolidated) [vendor]) |
| **Tijori** | bank KPIs (CASA, NIM) and operating metrics, with source | data lags; premium paywall ([Finology](https://insider.finology.in/business/tijori-finance-review) [press]; [ValuePickr](https://forum.valuepickr.com/t/tijori-view-key-non-financial-metrics-from-annual-reports/19594?page=7) [practitioner]) |
| **Trendlyne** | consensus figures + a broker-report library | proprietary 0–100 "DVM" scores, opaque by construction ([Trendlyne](https://trendlyne.com/score-details/) [vendor]) |
| **Indian AI entrants 2025–26** — Quartermark, InvestorStack, Multibagg, concall-alpha, Altys | earnings-call summary; guidance tracker ("guided 15%, hit 14%"); questions attributed to the analyst who asked; Altys "fails closed" when unsupported ([Quartermark](https://quartermark.in/companies/INFY/earnings-calls/Q1-FY27/transcript), [InvestorStack](https://www.investorstack.in/earnings-calls/infy), [concall-alpha](https://concall-alpha.vercel.app/), [Altys](https://tryaltys.ai/) [vendor]) | retail-grade; **call summaries and guidance trackers are already commodity in India** |

**Implication (→ D13):** N4A will not win on summaries. What is left to win on: citations down to the
cell; numbers normalised to a stated basis; reconciling what different brokers say; honesty about
what the sources do not cover.

## 3. HDFC Bank — what the analyst wants first

**The live debate, three strands:**
1. **Profitability after the merger.** NIM 3.26% on total assets (3.4% on interest-earning assets),
   the lowest on record ([BS](https://www.business-standard.com/companies/quarterly-results/hdfc-bank-q1fy27-results-net-profit-rises-5-to-19-060-cr-nii-grows-7-126071800598_1.html) [press]);
   CASA 32% vs ~38% at the merger, against a 38–40% "aspiration" (Axis [practitioner]); loan-to-deposit
   ~95.8% vs the CFO's 85–90% by FY27 ([MarketScreener](https://www.marketscreener.com/quote/stock/HDFC-BANK-LIMITED-105516154/news/India-s-HDFC-Bank-sees-loan-to-deposit-ratio-at-85-90-by-FY27-CFO-says-49662339/) [press]).
2. **Governance and leadership.** The chairman resigned 18 Mar 2026 citing ethics; a ₹45 cr payments
   probe followed (niftytrader [press]). ⚠ Anup Bagchi (from ICICI) reported as MD & CEO from 27 Oct
   2026, RBI approval 1 Oct ([Outlook](https://www.outlookbusiness.com/corporate/hdfc-bank-gets-rbi-nod-for-anup-bagchi-as-next-ceo),
   [The Week](https://www.theweek.in/news/biz-tech/2026/10/05/please-dont-put-me-in-a-spot-why-icicis-anup-bagchi-hesitated-to-accept-hdfcs-ceo-post.html) [press]) — unverified, not in corpus.
3. **Valuation and rule changes.** ~1.8–2.1× book; RBI's expected-credit-loss rules from 1 Apr 2027
   with a glide path to 2031 ([JM Financial](https://www.jmfinancialservices.in/blogs-and-articles/rbi-unveils-final-ecl-framework-for-banks) [press]).

**Results day.** Loan and deposit growth are pre-announced in a business update (4 Jul;
[BS](https://www.business-standard.com/companies/news/hdfc-bank-q1fy27-business-update-advances-rise-15-4-deposits-14-7-126070400526_1.html) [press]).
On the day the analyst looks at NIM and cost of funds, fees ex one-offs, cost-to-income, credit cost,
slippages, provision coverage, then the subsidiaries.

**Canonical tables** (deck [primary] and Axis [practitioner]):
1. **Results review:** Q1FY27 | Q1FY26 | YoY | Q4FY26 | QoQ, ratio changes in bps. PAT ₹190.6 bn,
   +5.0%, or **+9.8% adjusted**; non-interest income **−41%**, purely because last year's base held the
   HDB IPO gain.
2. **Liability franchise:** average vs period-end deposits; CASA %; retail/wholesale 80/20; borrowings
   run-down (₹5,101 bn → ₹4,618 bn); loan-to-deposit glide path against the guided band.
3. **Loan mix:** retail, mortgage, commercial & rural, business banking, corporate — with **three
   correct "loan growth" figures**: 15.4% (period-end gross), 12.4% (period-end AUM), 10.8% (average
   AUM).
4. **NIM, yield, cost of funds** — 8 quarters, both NIM bases.
5. **Bad-loan walk (GNPA, ₹ bn):** 341 opening + 80 slippages − 40 upgrades − 23 write-offs = 358;
   GNPA 1.17% (0.91% ex-agri); PCR 66%; credit cost 40 bps (29 bps net of recoveries); provisions split
   specific / contingent / floating (₹214 bn) / general.
6. **RoA tree:** RoA 1.85%, RoE 13.8%.
7. **SOTP:** core book at 1.9× FY28E adjusted book = ₹844 + subsidiaries ₹161 less a 20% holdco
   discount = ₹129 (HDB 74.1%, HDFC Securities 94.0%, HDFC Life 50.2%, HDFC AMC 52.4%, ERGO 50.3%) →
   target ₹975, though the components sum to ₹973 (AX p.3). *Corrected 2026-10-06 in phase 0; this line
   first said ₹847 + ₹128 with three wrong stakes — see `DOSSIER-HDFC.md` §1.6.*
8. **Broker grid:** rating · target · **basis** · date · history (Axis BUY ₹975 standalone; Geojit
   BUY ₹896 consolidated [corpus]).

## 4. Infosys — what the analyst wants first

**State of play (web, mostly after the corpus — ⚠ unverified):** FY27 guidance reported cut on 23 Jul
2026 from 1.5–3.5% to 1.5–3.0% CC, margin band 20–22% kept
([April band](https://www.prnewswire.com/news-releases/revenue-crosses-20-billion-mark-with-resilient-growth-of-3-1-in-fy-26-in-constant-currency-302751870.html) [primary];
[Q1 6-K](https://www.stocktitan.net/sec-filings/INFY/6-k-infosys-ltd-current-report-foreign-issuer-8d158ed1d87f.html) [press]).
Reported Q1 FY27: revenue $5,082 mn, +2.4% YoY CC, +1.0% QoQ; operating margin 21.1%; large deals
$3.6 bn, 61% net new; AI services 8.2% of revenue. Reported: Ashiss Dash becomes CEO 1 Apr 2027. The
debate: AI-led price deflation and weaker discretionary spend
([BusinessToday](https://www.businesstoday.in/markets/stocks/story/indian-it-stocks-fall-tcs-infosys-wipro-hcl-tech-reliance-market-cap-ai-impact-540988-2026-07-04) [press]);
vendor consolidation is 20% of large-deal value; whether AI revenue offsets the price compression.

**First 90 seconds:** QoQ CC growth and what the band implies for the rest of the year; the **margin
walk** from the call (Q1 FY27 reported as: rupee +70 bps, Project Maximus +20, AI sales and marketing
−50, programme termination −40 — [transcript](https://www.fool.com/earnings/call-transcripts/2026/07/23/infosys-infy-q1-2027-earnings-call-transcript/) [primary via press], ⚠);
large-deal value and its net-new share; the history of guidance revisions.

**Canonical tables:**
1. **Guidance-vs-actual ledger** — date, band, midpoint, reason for change, outcome.
2. **8–12 quarter KPI sheet** — US$ revenue; growth reported vs CC; margin reported vs adjusted;
   large-deal value and net-new share; utilisation ex-trainees; LTM attrition; DSO; FCF (Q4 FY26
   factsheet [corpus]).
3. **Vertical × geography CC-growth heatmap** (FS 28.0% of revenue; North America 55.7%; Europe
   32.6%).
4. **Client buckets** (41 clients above $100M; top-5/10/25 = 12.6% / 20.2% / 34.5%).
5. **Margin-bridge waterfall.**
6. **Deal-win chart.**
7. **Capital return** — policy ~85% of FCF over 5 years; ₹18,000 cr buyback completed Dec 2025
   ([20-F](https://www.sec.gov/Archives/edgar/data/1067491/000095017025091925/infy-20250331.htm) [primary]).
8. **Peers** — TCS, HCLTech, Wipro (TCS documents are in the corpus).

## 5. Ten things the demo must show to convince an Indian equity analyst

1. **Click any number → the exact page or cell, with its basis printed** (standalone/consolidated;
   average/period-end; total/interest-earning assets; reported/adjusted; CC/US$/₹). Daloopa's core and
   the credibility floor.
2. **A results-day variance table in the broker's own format**; compare against estimates only where
   periods match; say "no quarterly consensus in sources" rather than fake one.
3. **A "said vs did" guidance ledger** (Infosys bands; HDFC loan-to-deposit 85–90% guided vs 95.8%;
   CASA 38–40% aspiration vs 32%).
4. **YoY adjusted for one-offs with the adjustment visible** (HDB IPO gain; Infosys ₹774 cr tax
   reversal; ₹1,289 cr Labour Codes charge [corpus]).
5. **Broker reconciliation** — one metric across Axis, Geojit, DevenChoksey normalised to one basis;
   rating and target history; disagreements flagged.
6. **Native charts, not prose** — the bad-loan walk, the margin bridge, the loan-to-deposit glide path.
7. **Q&A mining** — what analysts pressed on across quarters, and what management deflected.
8. **Source-boundary honesty** — "Infosys Q1 FY27 is not in your sources; the guidance shown may be
   superseded".
9. **An events timeline** — merger comparability break (1 Jul 2023), 1:1 bonus (Aug 2025), chairman
   exit, successions, ECL rules.
10. **Expert feel** — dense tables with inline sparklines ([Tufte](https://en.wikipedia.org/wiki/Sparkline));
    instant loads, since speed is part of density ([Ström](https://mattstromawn.com/writing/ui-density/) [practitioner]);
    keyboard navigation; Excel export that keeps the links; bps deltas.

## 6. Eight things that would make them distrust it instantly

Evidence base: FinanceBench — GPT-4-Turbo with retrieval got 81% of questions wrong or refused them
([Patronus](https://github.com/patronus-ai/financebench)); Daloopa's benchmark — general chatbots
answered only 11–64% of number questions exactly ([Daloopa](https://daloopa.com/benchmark/benchmarking-ai-agents-on-financial-retrieval) [vendor]);
WSO thread "Got caught with a wrong number in an IC meeting because I trusted AI output"
([WSO](https://www.wallstreetoasis.com/forum/private-equity/got-caught-with-a-wrong-number-in-an-ic-meeting-because-i-trusted-ai-output) *(title only)* [practitioner]).

1. **A number with no basis label** (NIM 3.26% vs 3.4%; consolidated cost-to-income ~60% — it includes
   HDFC Life — vs 39% standalone [corpus Geojit]).
2. **Rupee growth headlined for an IT exporter** (INR +14.0% vs CC +2.4% for Q1 FY27 ⚠;
   [ICICI Direct](https://www.icicidirect.com/research/equity/rapid-results/infosys-ltd) [practitioner]).
3. **Raw YoY across a break** — across one-offs (the −41% other income), across the merger (the deck
   itself says prior periods are "not comparable"), across the bonus without adjustment, which would
   draw a fake ~50% price crash in Aug 2025 ([bonus](https://www.businessupturn.com/business/corporates/hdfc-bank-announces-11-bonus-issue-record-date-set-for-august-27/) [press]).
   ⚠ Check the prototype's price chart around the bonus record date.
4. **Invented or stale guidance.** During the research the agent's own AI reader gave Infosys's prior
   band as "2.0–3.5%" (the filing says 1.5–3.5%) and FCF as "16.5% of net profit".
5. **A source attributed to the wrong broker** — the "BNP Paribas" file is Geojit (D8); the prototype
   already handles it.
6. **Unit and period confusion** — ₹ bn / cr / tn mixed; lakh-style grouping beside western; FY vs
   calendar; stale document headers (the Infosys Q4 FY26 factsheet says "Second Quarter, Fiscal 2023"
   on every page [corpus]).
7. **US-centric framing** — HDFC Bank's 20-F is US GAAP, materially different from Indian GAAP
   ([20-F](https://www.sec.gov/Archives/edgar/data/1144967/000119312525158722/d854075d20f.htm) [primary]);
   ADR prices; $ EPS; "fiscal Q1" used ambiguously.
8. **Generic prose or opaque scores** — "robust asset quality" with no number; a 0–100 score with no
   derivation.

## 7. What the earlier research did not cover

1. **Indian earnings cadence** — Saturday bank results; a business update that pre-announces growth;
   transcripts up to 5 working days late. The first view must work from the results deck and the live
   call.
2. **Canonical sector tables** (§3–4) — the earlier docs only named the KPIs.
3. **The competitor teardown** (§2) — summaries and guidance trackers are commodity in India.
4. **Basis normalisation is the core of trust** — HDFC has three correct loan-growth figures and two
   NIMs; Infosys growth comes in three currencies.
5. **The corpus and prototype were stale against the demo date** — no Infosys Q4 FY26 / Q1 FY27 call or
   Q1 factsheet, no HDFC Q4 FY26 / Q1 FY27 call; the prototype states FY27 guidance as 1.5–3.5% and AI
   at 5.5% of revenue. → D3: the user adds the newer documents.
6. **Both live debates now involve leadership and governance** → a leadership timeline.
7. **The corpus mixes bases** (Axis standalone, Geojit consolidated) — which makes cross-broker
   reconciliation both necessary and demonstrable.
