# Peer sheet: TCS beside Infosys (v1)

> **status:** working (temporary; phase 0, PLAN 0.5) · **authoritative for:** the TCS figures the
> Canvas peer beat may show, their basis, and the TCS-vs-Infosys comparison with every basis
> mismatch named · **last verified:** 2026-10-05 — every figure is in
> [`figures/tcs.json`](figures/tcs.json) and passes `tools/check_figures.py --only tcs`.

## 0. Corpus key and conventions

| Code | File in `data/seed/Additional Documents/` | What it is | Page note |
|---|---|---|---|
| TCS-AR26 | `TCS-annual-report-FY 25-26.pdf` | Integrated Annual Report FY26 (360 pp.) | AR back-half folios run ~30 above the PDF index (PDF p.58 = printed 88) |
| TCS-Apr26 | `TCS-Concall-Transcript-Apr-2026.pdf` | Q4 FY26 earnings call, held 9 Apr 2026, filed 14 Apr | PDF p.1 is the exchange cover letter, so **PDF index = printed "Page x of 34" + 1** |
| TCS-Jul26 | `TCS-Concall-Transcript-Jul-2026.pdf` | Q1 FY27 earnings call, held 9 Jul 2026 | no cover letter: PDF index = printed page |

Infosys comparators come from [`../DOSSIER-INFOSYS.md`](DOSSIER-INFOSYS.md) §1 (v0), re-verified
here on the page: `FS4` (factsheet Q4 FY26), `AR26` (Infosys AR FY26), and `C-Jul26`
(`Infosys-Concall-Transcript-Jul-2026.pdf`, which holds a **media conference on PDF pp.2–27 and the
analyst earnings call from PDF p.27 on** — every Infosys Q1 FY27 figure below is from the earnings
call, pp.29–34).

**There is no TCS factsheet in the corpus.** Every TCS quarterly figure is what management *said* on
a call (CFO's prepared remarks unless noted); the AR supplies FY26. So TCS utilisation, quarterly
attrition, vertical and geography growth rates in numbers, and TCS's own book-to-bill are not
available — see §E.

Conventions (DECISIONS D5): pages are the PDF index; ₹ crore with Indian grouping; US$ as printed
(US$ bn → US$ mn where a table needs one unit, scale in the registry); reported vs constant currency
(CC) always stated; `−` is a true minus. **Derived** = computed by N4A from registry inputs
(formula in the registry). **n/f** = not found in the corpus.

**Three definitions decide every comparison on this sheet:**
1. **TCS "operating margin"** = EBIT before other income / revenue, **excluding exceptional items**
   (TCS-AR26 p.58 table; p.4: "All financial figures and metrics presented in this report are stated
   after excluding exceptional items"). FY26 excludes ₹4,526 cr (derived) of restructuring, Labour
   Codes and a legal provision. Infosys's headline margin is **reported IFRS** and *includes* its
   ₹1,289 cr Labour Codes charge; its "adjusted" margin excludes only that.
2. **TCV.** TCS's TCV is **every deal signed** in the period, renewals included ("about 50% to 55%
   could be on renewals", TCS-Apr26 p.30). Infosys reports **large-deal TCV** only, with a net-new
   share. (Infosys's large-deal threshold is not printed in any corpus document read for this sheet.)
   The two numbers are not the same measure and are never subtracted or ratioed against each other.
3. **"Reported" growth.** TCS's reported growth is **₹** (FY26 +4.6%); Infosys's headline reported
   growth is **US$** (FY26 +4.6% in US$, +9.6% in ₹). Both define CC as growth at prior-period
   exchange rates (TCS-AR26 p.340 glossary; Infosys FS4 p.1 footnote) — CC is the only growth basis
   compared directly.

## A. TCS sheet

### A1. Revenue and growth

| Metric | Q4 FY26 | Q1 FY27 | FY26 | Source |
|---|---|---|---|---|
| Revenue, ₹ cr (consolidated) | 70,698 | 72,275 | 2,67,021 (FY25: 2,55,324) | Apr26 p.6 · Jul26 p.4 · AR26 p.36 |
| Revenue, US$ mn | 7,621 (printed US$7.621 bn) | 7,624 | 30,017 (printed US$30.017 bn) | Apr26 p.6 · Jul26 p.4 · Apr26 p.7 |
| Growth QoQ, ₹ reported | +5.4% | +2.2% | — | Apr26 p.6 · Jul26 p.4 |
| Growth QoQ, US$ reported | +1.5% | flat | — | Apr26 p.6 · Jul26 p.4 |
| Growth QoQ, CC | **+1.2%** | **+0.4%** | — | Apr26 p.6 · Jul26 p.24 (p.4: "40 bps sequentially") |
| Growth YoY, ₹ reported | n/f | +13.9% | +4.6% | Jul26 p.4 · Apr26 p.7 |
| Growth YoY, US$ reported | n/f | +2.7% | −0.5% | Jul26 p.4 · Apr26 p.7 |
| Growth YoY, CC | n/f | **+3.2%** | **−2.4%** | Jul26 p.4 · Apr26 p.7 |
| Currency effect on ₹ growth | — | — | +7.0 pp | AR26 p.58 |

Why FY26 fell in CC, in TCS's words: "The decline was largely a result of one of the Company's large
transformation programmes in India coming to an end this year" (AR26 p.24). Q4 FY26 was the "third
consecutive quarter of sequential growth" (Apr26 p.3) and Q1 FY27 the "fourth consecutive quarter of
growth" (Jul26 p.2). TCS did not state Q4 FY26 YoY growth on the call.

### A2. Margins

| Metric | Q4 FY26 | Q1 FY27 | FY26 | Source |
|---|---|---|---|---|
| Operating margin (EBIT before other income, ex exceptional items) | **25.3%** (+10 bps QoQ) | **24%** (−130 bps QoQ) | **25.0%** (FY25 24.3%; +70 bps) | Apr26 p.6 · Jul26 p.4 · AR26 p.58, Apr26 p.8 |
| Operating margin *including* exceptional items | no one-offs in Q4 (Apr26 p.23) | — | 23.3% (derived: (₹66,838 − ₹4,526) / ₹2,67,021) | AR26 p.58, p.35 |
| Net margin | 19.4% | 19.2% | 19.8% ex exceptional · 18.4% reported (derived: ₹49,210 / ₹2,67,021) | Apr26 p.7 · Jul26 p.5 · Apr26 p.8, AR26 p.35 |
| EPS growth YoY | +12.2% | n/f | +8.8% ex exceptional (EPS ₹145.99; reported ₹136.01) | Apr26 p.7 · Apr26 p.8, AR26 p.58, p.167 |
| Effective tax rate | n/f | n/f | 24.6% | Apr26 p.8 |

**Q4 FY26 margin walk (+10 bps), CFO, Apr26 pp.6–7:** realisations **+40 bps**, currency **+110 bps**;
reinvested as — *Build*: external consultants **−40 bps**, talent interventions plus "the ingoing impact
of the India wage code" **−40 bps**; *Partner*: partnerships and go-to-market **−50 bps**; *Acquire*:
integration **−10 bps**. The six items sum to +10 bps (derived), matching the stated change.

**Q1 FY27 margin walk (−130 bps), CFO, Jul26 p.4:** annual increments **−170 bps**; currency **+40 bps**
plus unquantified operational efficiencies, against unquantified partnership and targeted
investments. In April the CFO had guided the increment hit at "150 to 200 basis points" (Apr26 p.30)
— it landed at 170, inside the band.

**Exceptional items FY26** (consolidated, pre-tax, AR26 p.35; excluded from every AR and call margin):
restructuring ₹1,388 cr · new Labour Codes ₹2,128 cr · legal claim (CSC) ₹1,010 cr · **total ₹4,526 cr**
(derived). ⚠ **Unreconciled:** on the Q4 call the CFO said "The combined one-off for the year is
₹1,300 crores" (Apr26 p.23). That matches none of the AR lines nor their total (the restructuring line,
₹1,388 cr, is the closest — N4A's reading, not TCS's).

**Basis change, Q1 FY27:** "we have undertaken a refinement of cost categories … This change has no
impact on overall expenses or operating margins, and prior periods have been aligned for
comparability" (Jul26 p.4); the COR/SG&A split is no longer given (Jul26 p.11).

### A3. Deals

| Metric | Q4 FY26 | Q1 FY27 | FY26 | Source |
|---|---|---|---|---|
| TCV (all deals) | **US$12 bn**, three mega deals | **US$9.5 bn**, incl. SKF US$800 mn (net new) | **US$40.7 bn**, 5 mega deals | Apr26 p.3 · Jul26 p.2 · AR26 p.58, Apr26 p.5 |
| Book-to-bill (TCV / US$ revenue) | 1.6× (derived) | 1.2× (derived) | 1.4× (derived) | registry |
| Renewal share of TCV | ~50–55% (CEO estimate) | "very marginal shift towards the more AI transformative deals" (Jul26 p.20) | — | Apr26 p.30 |
| Clients > US$100 mn / > US$50 mn | 66 (+4 QoQ) / 139 (+3 QoQ) | n/f | 66 (+2 YoY) / 139 (+9 YoY) | Apr26 p.4 · AR26 p.23 |

### A4. People

| Metric | Q4 FY26 | Q1 FY27 | FY26 | Source |
|---|---|---|---|---|
| Headcount, period-end | 5,84,519 | 5,93,798 | 5,84,519 (FY25: 6,07,979) | Apr26 p.13 · Jul26 p.7 · AR26 p.69 |
| Net adds | n/f for the quarter | **+9,279** (derived; acquisition share n/f) | **−23,460** (derived) | registry |
| Attrition, voluntary LTM, IT services | 13.7% (FY26 = LTM at Q4) | n/f | 13.7% | AR26 p.25 |
| Utilisation | n/f | n/f | n/f | — (factsheet not in corpus) |
| Fresher hiring | — | 14,000 campus graduates (CHRO says "last quarter"; period ambiguous) | 44,000+ | Jul26 p.23 · AR26 p.55 |

### A5. Verticals

**FY26, the AR's six reportable segments** (AR26 p.59; growth is **₹ reported, not CC**):

| Segment | Share of revenue | Revenue ₹ cr | YoY (₹) | Segment margin FY26 | FY25 | Δ |
|---|---|---|---|---|---|---|
| BFSI | 38.7% | 1,03,363 | +9.3% | 26.1% | 26.6% | −50 bps |
| Consumer Business | 15.9% | 42,432 | +5.6% | 28.5% | 27.9% | +60 bps |
| Communication, Media & Technology | 14.8% | 39,474 | **−14.0%** | 29.1% | 20.9% | **+820 bps** |
| Life Sciences & Healthcare | 10.4% | 27,745 | +4.9% | 27.0% | 28.2% | −120 bps |
| Manufacturing | 10.0% | 26,614 | +5.7% | 30.3% | 32.7% | −240 bps |
| Others (ERU, public services, products) | 10.2% | 27,393 | +19.0% | 22.9% | 25.2% | −230 bps |

Segment-margin basis: segment result / segment revenue, **before depreciation, finance cost and
exceptional items**. Segment results total ₹72,398 cr = 27.1% of revenue (derived; AR26 p.225), which
equals EBIT ₹66,838 cr + D&A ₹5,560 cr (derived check); the table's "Total 25.0" is the company EBIT
margin, not the sum of the segments. Shares are donut labels; the label-to-value mapping was read off
the rendered page.

**The calls use a different, finer taxonomy** (BFSI, Consumer Business Group, Life Sciences &
Healthcare, Manufacturing, Technology & Software/Services, CMI, ERU, Regional Markets) and give
**no numbers**, only direction:

| Vertical (call taxonomy) | Q4 FY26 (Apr26) | Q1 FY27 (Jul26) |
|---|---|---|
| BFSI | "continued to grow" (p.16) | "delivered good growth across geographies" (p.8) |
| Consumer Business Group | "another quarter of good growth" (p.16) | discretionary spend hit by "inflationary pressures and ongoing geopolitical uncertainties" (p.8) |
| Life Sciences & Healthcare | "marginal growth" (p.18) | "saw a decline" (p.9) |
| Manufacturing | "good growth" (p.18) | "softness in certain segments like auto" (p.9) |
| Technology & software / services | "reasonable growth … given the environment" (p.18) | "continued its growth momentum" (p.8) |
| CMI | "a modest decline" (p.19) | "modest growth" (p.9) |
| ERU | "robust growth" (p.20) | "a slight decline" (p.9) |
| Regional Markets | — | growth "driven by India, Public services, and our products and platforms" (p.9) |

Q1 FY27 growth "was led by BFSI, Technology, software and services, regional markets, and products
and platforms" (Jul26 p.2).

### A6. Geography

| Geography | Share of FY26 revenue (AR26 p.59) | FY26 revenue ₹ cr (AR26 p.69) | FY25 ₹ cr | YoY, ₹ reported (derived) | Q4 FY26 QoQ, CC (Apr26 p.3) |
|---|---|---|---|---|---|
| North America | 48.6% | Americas (incl. LatAm 1.9%) 1,34,998 | 1,27,870 | +5.6% | **+1.4%** |
| United Kingdom | 17.4% | 46,444 | 42,977 | +8.1% | **+2.4%** |
| Continental Europe | 15.4% | 41,023 | 36,510 | +12.4% | **+1.0%** ("Europe") |
| India | 5.9% | 15,775 | 22,060 | **−28.5%** | n/f |
| APAC 8.3% · MEA 2.5% | — | Others 28,781 | 25,907 | +11.1% | n/f |

The ₹ growth rates include the +7.0 pp currency tailwind (AR26 p.58) on everything except India, so
only India's −28.5% is close to a constant-currency number. **India's fall alone is −2.5 pp of TCS's
FY26 growth** (derived: (₹15,775 − ₹22,060) / ₹2,55,324) against a total CC decline of −2.4% — the
arithmetic form of TCS's own explanation (AR26 p.24). Q1 FY27 geography growth: n/f in numbers.

### A7. AI

| Metric | Q4 FY26 | Q1 FY27 | Source |
|---|---|---|---|
| Annualised AI services revenue | US$2.3 bn ("surpassed") | **US$2.6 bn** ("crossed"), +13.6% QoQ | Apr26 p.4 · Jul26 p.2, p.24 |
| Implied share of the quarter's revenue (floor) | 7.5% (derived) | 8.5% (derived) | (annualised ÷ 4) ÷ US$ revenue |
| AI services partner for clients > US$50 mn | 130 of 139 (FY26) | — | AR26 p.27 |
| Productivity passed to clients | — | "around 10% to 15%" over a project's tenure | Jul26 p.12 |

Definition: "annualised AI revenue (based on latest quarterly revenue)" (AR26 p.5); "we are only
calling out the specific AI for business transformation revenue" — AI embedded in mega deals is
*not* counted (Apr26 p.32). AI work is lumpy: "Many of these projects tend to be one quarter, two
quarter projects" (Jul26 p.12). An analyst (Kotak, not management) computed "$75 million of
incremental AI revenue this quarter versus $125 million … in the March quarter" (Jul26 p.12); the
CEO did not dispute the arithmetic.

### A8. Guidance stance

**TCS gives no numeric revenue or earnings guidance**: "we don't provide any specific revenue or
earnings guidance" (Apr26 p.3; Jul26 p.2, same words). Asked for an FY27 international growth number:
"Kumar, I don't want to put a number, but … we are quite positive about FY27, quite positive about the
international growth" (Apr26 p.22). What management *has* put numbers on is margin: increments to cost
"150 to 200 basis points" (Apr26 p.30); "We'd like to move towards 26%, but on a longer-term basis"
(Apr26 p.26); after Q1's 24%: "We want to exit at 25% plus and strive to achieve it sooner rather than
later" (Jul26 p.22). Infosys, by contrast, guides a numeric band every quarter (§C).

### A9. Capital return and cash

| Metric | Q4 FY26 | Q1 FY27 | FY26 | Source |
|---|---|---|---|---|
| Dividend per share (declared/recommended for the year) | — | — | **₹110** = 3 × ₹11 interim + ₹46 special + ₹31 final (FY25: ₹126) | Apr26 p.8 · AR26 p.24, p.36 |
| Dividend amount for the year | — | — | ₹39,799 cr (FY25 ₹45,588 cr) | AR26 p.36 |
| Shareholder payout ratio | — | — | 80.9% (= dividends ÷ **reported** PAT, derived check) | AR26 p.23 |
| Buyback | — | — | none in FY26 — the payout series "including … Buyback and Taxes" shows ₹39,799 cr, equal to the dividends alone (N4A's reading) | AR26 p.24, p.36 |
| Cash conversion (operating cash flow ÷ net income) | 106.7% (OCF US$1.6 bn) | 93% | 105.9% (OCF ₹52,094 cr) | Apr26 p.7 · Jul26 p.5 · AR26 p.23–24 |
| DSO ("in dollar terms") | 74 days (−2) | 74 days (flat) | — | Apr26 p.7 · Jul26 p.5 |
| Invested funds | US$5.3 bn | US$5.3 bn | ₹50,020 cr | Apr26 p.7 · Jul26 p.5 · AR26 p.59 |
| Return on equity | — | — | 51.4% | AR26 p.23 |

"Our capital allocation policy remains unchanged" (Jul26 p.5). TCS has made "five buyback offers"
since listing (AR26 p.24), none in FY26.

## B. Management's outlook in the two calls

Verbatim; speaker and page given. The arc: **confident in April, conditional in July.**

**Demand.**
- Apr26, CEO: "So overall, we are getting into our next year with a lot of positivity and confidence."
  (p.22) · "By and large, most of the headwinds we know probably are behind us" (p.27) · "We are also
  expecting a stronger 1H. Our planning assumption is along those lines only." (p.23)
- Jul26, CEO: "around March, we started seeing geopolitical uncertainties increase" (p.10) · "our
  clients defer some of the projects during the quarter" (p.11) · "we are still optimistic that the
  demand will resume at some time in Q2" (p.11) · "As we speak, we see a good turnaround in almost every
  other sector." (p.17, i.e. other than consumer) · "Manufacturing, we believe will turn around in Q2,
  life sciences could turn around in Q2, tech services will continue to grow." (p.16)

**Discretionary spend.**
- Apr26, CEO: "the clients are more comfortable in getting into larger transformation programs or
  some amount of discretionary spend improving" (p.33).
- Jul26, CEO (Consumer Business Group): "the quarter was driven by a combination of inflationary
  pressures and ongoing geopolitical uncertainties impacting discretionary spend" (p.8).
- AR26 outlook: "Customers continue to extend decision-making cycles while applying heightened
  scrutiny to discretionary spending." (p.60)

**AI deflation and pricing.**
- Apr26, CEO: "our expectation is AI will be net accretive, like to see the initial year, our attempt
  would be to ensure that we arrest the degrowth while the AI revenue increase" (p.33) · "AI revenue to
  overcompensate for the reduction in the revenue in other parts of the service line. But the timelines
  probably can vary." (p.28) · "We don't lose deals on pricing." (p.29)
- Jul26, CEO: "the productivity gain passed on is around 10% to 15% range" (p.12) · "customers give us
  additional work and the top line is not significantly impacted" (p.12) · "At this time, we don't see
  such a massive contraction or deflation happening in the world." (p.23)
- AR26 outlook: "AI-driven productivity gains may continue to influence pricing structures and
  engagement models in the near term" (p.60).

**BFSI.**
- Apr26, CEO: "Increased uncertainty around interest rates, inflation, and central bank actions
  influenced client sentiment, resulting in cautious investment decision-making." (p.16) — then, asked
  whether the caution was broad-based: "our direct impact from the geopolitical situation, so far has
  been restricted to Middle East and to some extent into our travel and transportation industry"
  (p.25).
- Jul26, CEO: "BFSI delivered good growth across geographies." (p.8) · "the banks are doing very well
  in US, we also are quite optimistic about the sustained growth in BFSI segment" (p.15).

**North America.**
- Apr26: North America +1.4% QoQ in CC in Q4 (p.3), behind the UK's +2.4%.
- Jul26, CEO: "Airlines in North America is definitely one of the areas and by and large, the
  non-essential retail also comes under stress." (p.17). No Q1 FY27 North America number was given.

**People** (context for the margin walk): "We don't agree with the view that overall white-collar
employment will go down." (Jul26 p.17)

## C. TCS vs Infosys

Infosys sources: FS4 (factsheet Q4 FY26) pages as cited in the registry; FY26 FCF and buyback price
AR26 p.17; FY26 cash returned CFS4 p.7; **Q1 FY27 from the Infosys earnings call C-Jul26 pp.29–34**
(read for this sheet; ids `tcs.vs.infosys.*`). **Basis** says `match`, or names the mismatch. Where a
like-for-like figure exists it is given in the basis cell, derived and labelled.

| Metric | TCS Q4 FY26 | Infosys Q4 FY26 | TCS Q1 FY27 | Infosys Q1 FY27 | TCS FY26 | Infosys FY26 | Basis |
|---|---|---|---|---|---|---|---|
| Revenue, US$ mn | 7,621 | 5,040 | 7,624 | 5,082 | 30,017 | 20,158 | **match** (US$ reported). TCS is 1.49× Infosys in FY26 and 1.50× in Q1 FY27 (derived). |
| Revenue, ₹ cr | 70,698 | 46,402 | 72,275 | n/f (not stated on the call) | 2,67,021 | 1,78,650 | **match** (consolidated). |
| Growth QoQ, CC | **+1.2%** | **−1.3%** | **+0.4%** | **+1%** | — | — | **match** on CC definition (both: prior-period exchange rates). Q4 gap 2.5 pp to TCS (derived). ⚠ Q1: Infosys's +1% includes ~1.1 pp from acquisitions (C-Jul26 p.30) → organic ≈ −0.1% (derived, approximate); TCS's acquisition contribution n/f. |
| Growth YoY, CC | n/f | +4.1% | **+3.2%** | **+2.4%** | **−2.4%** | **+3.1%** | **match** (CC). FY26 gap 5.5 pp to Infosys (derived) — of which India's fall is −2.5 pp of TCS's growth (derived, §A6). Q1 FY27 gap 0.8 pp to TCS (derived). |
| Growth YoY, reported | n/f | +6.6% (US$) | +13.9% (₹) · +2.7% (US$) | n/f | +4.6% (₹) · −0.5% (US$) | +4.6% (US$) · +9.6% (₹) | **mismatch: "reported" currency.** TCS's headline is ₹, Infosys's is US$. FY26 "+4.6% vs +4.6%" is a coincidence of different currencies; like-for-like US$: −0.5% vs +4.6%; ₹: +4.6% vs +9.6%. |
| Operating margin (headline) | **25.3%** | **21.0%** (₹) · 20.9% (US$) | **24%** | **21.1%** | **25.0%** | **20.3%** reported · **21.0%** adjusted | **mismatch: margin definition.** TCS = EBIT before other income, ex *all* exceptional items; Infosys reported includes its ₹1,289 cr Labour Codes charge, "adjusted" excludes only that. Like-for-like gaps (derived): **Q4 430 bps** (no one-offs on either side, ₹ basis) · **Q1 290 bps** (⚠ wage timing, next row) · **FY26 400 bps** adjusted-vs-adjusted · **304 bps** with TCS's exceptional items charged (23.3%) vs Infosys reported. |
| Margin change QoQ | +10 bps | — | **−130 bps** | **+20 bps** | +70 bps YoY | — | **mismatch: wage-cycle timing.** TCS's increments are effective 1 April (Apr26 p.4) and cost −170 bps in Q1; Infosys gives "salary hikes to most of our employees effective October" and the rest in January (C-Jul26 p.31). Q1 flatters Infosys relative to TCS; Q3 will do the reverse. |
| Net margin | 19.4% | 18.3% (derived) | 19.2% | n/f | 19.8% ex exceptional · 18.4% reported (derived) | 16.5% (derived) | **mismatch: one-offs.** Infosys Q4 and FY26 include a ₹774 cr tax reversal (FS4 p.5) and the Labour Codes charge; TCS's headline excludes its exceptional items. Reported vs reported FY26: 18.4% vs 16.5%. |
| EPS growth YoY | +12.2% | +23.8% reported · +13.9% adjusted | n/f | ~15% (EPS ₹19.19) | +8.8% ex exceptional | +11.0% reported · +12.1% adjusted | **mismatch: exclusions.** TCS excludes restructuring, Labour Codes and the legal provision; Infosys "adjusted" excludes tax orders and Labour Codes. Closest pair: Q4 +12.2% vs +13.9%; FY26 +8.8% vs +12.1%. |
| Deals signed | TCV **US$12 bn** | large-deal TCV **US$3.2 bn** | TCV **US$9.5 bn** | large-deal TCV **US$3.6 bn**, 61% net new | TCV **US$40.7 bn** | large-deal TCV **US$14.9 bn**, 55% net new | **mismatch — not comparable.** TCS counts every deal, ~50–55% renewals (Apr26 p.30); Infosys counts large deals only (threshold not printed in the corpus) and reports a net-new share. Never ratio one against the other. |
| Book-to-bill | 1.6× (derived) | not comparable | 1.2× (derived) | not comparable | 1.4× (derived) | not comparable | Infosys's equivalent would need its total TCV (n/f). |
| Headcount (period-end) | 5,84,519 | 3,28,594 | 5,93,798 (+9,279, derived) | −500 QoQ, after +2,000 acquired | net −23,460 (derived) | — | **match** (total employees). TCS has 1.78× Infosys's people (derived) for 1.5× its revenue. |
| Attrition | 13.7% | 12.6% | n/f | 13% | 13.7% | — | **match** at Q4 (voluntary, LTM, IT services, both). Infosys Q1's 13% is "versus 12.6% sequentially" — basis implied, not restated. |
| Utilisation | n/f | 83.0% ex trainees | n/f | 84.9% ex trainees | n/f | — | **TCS not disclosed in the corpus** (its factsheet is not held). |
| AI revenue | US$2.3 bn annualised (≈7.5% of the quarter, derived floor) | n/f | US$2.6 bn annualised (≈8.5%, derived floor), +13.6% QoQ | **8.2%** of revenue | — | — | **mismatch: definition.** TCS counts only "specific AI for business transformation revenue", annualised from the latest quarter (Apr26 p.32; AR26 p.5); Infosys's 8.2% is "AI first" revenue (the six Hexagon areas), and "AI augmented revenue… is not part of this" (CFO, C-Jul26 p.39). The ~8.5% vs 8.2% closeness proves nothing about relative AI exposure. |
| Clients > US$100 mn / > US$50 mn | 66 / 139 | 41 / 88 | n/f | n/f | 66 / 139 | — | **approximately match** (Infosys on LTM revenue; TCS "annually", undefined). |
| DSO | 74 days | 67 days | 74 days | 63 days (76 incl. unbilled net of unearned) | — | — | **mismatch / undefined.** TCS says "in dollar terms" and does not define it in the corpus. |
| Cash conversion (headline) | 106.7% (OCF ÷ net income) | FCF US$833 mn | 93% (OCF ÷ net income) | 116.5% (FCF ÷ net profit) | 105.9% (OCF ÷ net income) | 112.3% (FCF ÷ net profit) | **mismatch: OCF vs FCF.** Like-for-like FY26 on Infosys's definition: TCS FCF ₹48,057 cr = **97.7%** of reported PAT (derived from AR26 pp.172, 35) vs Infosys **112.3%**. |
| Cash returned to shareholders | — | — | — | — | ₹39,437 cr dividends paid, no buyback (82.1% of FCF, derived) | ₹36,711 cr = ₹18,653 cr dividends + ₹18,058 cr buyback (110.9% of FCF, derived) | **match** (cash paid in FY26, cash-flow statements: AR26 p.173; CFS4 p.7). TCS's ₹39,799 cr (AR26 p.36) is a different basis — declared *for* FY26, incl. the final dividend paid after year-end. |
| Labour Codes one-off | — | — | — | — | ₹2,128 cr, exceptional (outside the margin) | ₹1,289 cr, inside IFRS operating profit in Q3 (FS3 p.4); an exceptional item in Infosys's Ind AS statements (CFS3 p.3) | **match in nature** (past-service gratuity and leave); **mismatch in presentation basis**: TCS's margin excludes exceptional items, Infosys's IFRS headline includes the charge. On Ind AS both are exceptional. This is most of why the FY26 reported margins are not comparable; compare with Infosys's adjusted margin (`DOSSIER-INFOSYS.md` §1.6). |
| Revenue guidance | none ("we don't provide any specific revenue or earnings guidance") | FY27 **1.5–3.5%** CC (April band, per C-Jul26 p.34) | none (same words) | FY27 **1.5–3%** CC, incl. ~1.7% from acquisitions; margin **20–22%** | — | — | **mismatch: TCS gives no numbers.** Only margin aspirations (§A8). |
| BFSI / Financial services | — | 28.0% of revenue, +2.9% YoY CC | — | — | 38.7% of revenue, +9.3% YoY (₹ reported) | — | **mismatch: period (FY vs Q4), currency basis (₹ reported vs CC) and taxonomy** (TCS BFSI explicitly includes insurance; Infosys's scope not defined in the corpus). Shares only: BFSI is a larger part of TCS. Growth rates not comparable. |
| North America share | — | 55.7% | — | — | 48.6% | — | **mismatch: period** (TCS FY26 vs Infosys Q4 FY26); shares move slowly, so the ~7 pp difference is indicative only. |
| Europe incl. UK share | — | 32.6% | — | — | 32.8% (UK 17.4 + CE 15.4, derived) | — | **mismatch: period**; geography definitions otherwise align (Infosys "Europe" includes the UK). |
| India share | — | 2.6% | — | — | 5.9% | — | **mismatch: period**; TCS's India fell −28.5% in FY26 (derived). |
