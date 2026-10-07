# Peer sheet: ICICI Bank beside HDFC Bank (v1)

> **status:** working (temporary; phase 0, PLAN 0.5) · **authoritative for:** the ICICI Bank figures the prototype's
> Canvas peer beat may show, each with its basis, and the like-for-like pairing with HDFC Bank ·
> **last verified:** 2026-10-05 — every ICICI figure is a registry entry in
> [`figures/icici.json`](figures/icici.json) (261 entries: 208 page figures, 24 computed, 29
> verbatim quotes; `check_figures.py --only icici`: 261 pass, 0 fail). HDFC figures are from
> `DOSSIER-HDFC.md` v0 §1 or, where the dossier lacks the like-for-like basis,
> from the HDFC page cited (marked ⁺); all were re-opened on their page for this sheet (93 checks, 93
> on the page); they are now registry entries in `figures/hdfc-kpi.json` (Schedule 18 ratios, FY26
> P&L lines, growth). The HDFC side's own analysis is [`DOSSIER-HDFC.md`](DOSSIER-HDFC.md) v1 (§F summarises this sheet).

## 0. Corpus key and conventions

| Code | File in `data/seed/Additional Documents/` | What it is |
|---|---|---|
| **Jul** = IC-Jul26 | `ICICI-Bank-Concall-Transcript-Jul-2026.pdf` (24 pp) | Q1 FY27 earnings call, 18 Jul 2026 (ICICI says "Q1-2027") |
| **Apr** = IC-Apr26 | `ICICI-Bank-Concall-Transcript-Apr-2026.pdf` (29 pp) | Q4 FY26 earnings call, held 18 Apr 2026 |
| **AR** = IC-AR26 | `ICICI-Bank-annual-report-FY 25-26.pdf` (349 pp) | annual report FY26 |

- **There is no ICICI investor presentation in the corpus.** Quarterly figures come from the calls'
  **prepared remarks** (Bakhshi pp.2–4, Anindya Banerjee pp.5–10/11); FY figures from the AR. Each
  cell names its document.
- Pages are the **PDF page index**. ICICI prints ₹ **billion**; tables show ₹ crore (₹ bn × 100), and
  the registry's `basis` keeps the source figure. All figures **standalone** unless marked.
- "n/f" = not in the corpus. "computed" = arithmetic on cited figures, inputs named. "≈" = an
  estimate whose error is stated.
- **ICICI's own definitions** (AR p.170, Schedule 18): NIM = NII ÷ average of **daily** balances of
  interest-earning assets; RoA = PAT ÷ **monthly-average** total assets; working funds = simple
  average of monthly total assets. Credit cost on the calls = total provisions (net of write-backs)
  ÷ average advances, **annualised** (registry `icici.calc.credit_cost_annualised.q1fy27` shows the
  printed 0.32% is only reachable annualised). Recoveries from written-off accounts are **netted in
  the provision line** (Apr p.14).

## A. ICICI Bank sheet

### A.1 Quarterly (standalone)

| Metric | Q4 FY25 | Q1 FY26 | Q4 FY26 | Q1 FY27 | Basis |
|---|---|---|---|---|---|
| **NIM** | n/f | 4.34% (Jul p.8) | 4.32% (Apr p.8) | **4.36%** (Jul p.7) | NII ÷ avg interest-earning assets (AR p.170 definition; calls do not restate it). Q3 FY26 4.30% (Apr p.8) |
| NIM ex tax-refund interest | n/f | 4.27% (Jul p.8) | 4.27% (Jul p.8) | 4.28% (Jul p.8) | company's adjustment; refund benefit 7 / 5 / 8 bps (Jul p.8, Apr p.8) |
| Cost of deposits | n/f | 4.85% (Jul p.8) | 4.43% (Apr p.8) | 4.41% (Jul p.8) | quarterly; Q3 FY26 4.55% (Apr p.8) |
| Loans on repo / external benchmarks | — | — | 56% (Apr p.8) | 57% (Jul p.8) | share of domestic loans, "about"; FY26 year-end 55.3% (AR p.119) |
| NII, ₹ cr | n/f | n/f | 22,979, +8.4% (Apr p.8) | **24,384, +12.7%** (Jul p.7) | YoY |
| Non-interest income ex-treasury, ₹ cr | n/f | n/f | 7,415 (Apr p.8) | 8,425, +16.0% (Jul p.8) | excludes treasury |
| of which fees, ₹ cr | n/f | n/f | 6,779, +7.5% (Apr p.8) | 7,286, +23.5% (Jul p.8) | Q1 FY27 "off a low base" (Jul p.8) |
| Treasury, ₹ cr | n/f | gain 1,241 (Jul p.9) | **loss** 106 (Apr p.9) | gain 151 (Jul p.9) | |
| Operating expenses, YoY | n/f | n/f | +12.0% (Apr p.8) | +10.4% (Jul p.8) | opex ₹12,574 cr in Q1 FY27, computed (NII + non-int. ex-treasury − core op. profit) |
| Cost-to-income | n/f | n/f | 39.9% computed (39.8% ex-treasury) | **38.1%** computed (38.3% ex-treasury) | opex ÷ (NII + all non-interest income) = the AR's definition (reproduces FY26 39.75%) |
| Core operating profit, ₹ cr | n/f | n/f | 18,305, +5.1% (Apr p.3) | 20,235, +15.6% (Jul p.2) | pre-provision, ex-treasury |
| Provisions, ₹ cr | 891 (Apr p.9) | 1,815 (Jul p.9) | 96 (Apr p.3) | 1,260 (Jul p.3) | total, net of write-backs |
| **Credit cost** | n/f | n/f | 0.03% (Apr p.3) | **0.32%** (Jul p.3) | ÷ average advances, annualised; Q4 FY26 had high corporate recoveries (Apr p.9) |
| PBT ex-treasury, ₹ cr | n/f | n/f | 18,209, +10.1% (Apr p.2) | 18,975, **+20.9%** (Jul p.2) | ICICI's own headline metric |
| PAT, ₹ cr | n/f | ≈12,774 (computed: 14,805 ÷ 1.159) | 13,702, +8.5% (Apr p.3) | **14,805, +15.9%** (Jul p.3) | Q1 FY27 tax includes a ₹446 cr write-back (Jul p.9); ex write-back growth ≈+12.4% (computed, N4A's adjustment) |
| PAT consolidated, ₹ cr | n/f | n/f | 14,755, +9.3% (Apr p.3) | 15,440, +13.9% (Jul p.9) | consolidated |
| Deposits YoY, **period-end** | n/f | n/f | +11.4% (QoQ +8.1%) (Apr p.3) | +14.0% (QoQ +2.2%) (Jul p.3) | total deposits |
| Deposits YoY, **average** | n/f | n/f | n/f ¹ | +14.0% (QoQ +6.1%) (Jul p.3) | quarterly average |
| Average CASA growth | n/f | n/f | +11.3% YoY, +2.7% QoQ (Apr p.3) | +12.1% YoY, +4.7% QoQ (Jul p.3) | average balances; **no quarterly CASA ratio in the corpus** |
| LCR | n/f | n/f | ≈126% (Apr p.3) | ≈124% (Jul p.3) | quarterly average, "about" |
| **Loan growth YoY** (overall) | n/f | n/f | +15.8% (QoQ +6.0%) (Apr p.3) | **+19.6%** (QoQ +5.0%) (Jul p.3) | period-end, incl. international branches; same basis as AR's net advances (both +15.8% at Mar-26) |
| Domestic loans | n/f | n/f | +15.3% (Apr p.3) | +18.8% (Jul p.3) | period-end |
| Retail | n/f | n/f | +9.5% (Apr p.3) | +12.0% (Jul p.3) | ICICI retail **excludes** rural and business banking, **includes** CV & equipment |
| · Mortgages | n/f | n/f | +13.2% (Apr p.5) | +14.6% (Jul p.5) | |
| · Personal loans | n/f | n/f | +7.2% (Apr p.5) | +12.9% (Jul p.5) | |
| · Auto | n/f | n/f | +1.7% (Apr p.5) | +3.6% (Jul p.5) | |
| · CV & equipment | n/f | n/f | +11.6% (Apr p.5) | +12.8% (Jul p.5) | |
| · Credit cards | n/f | n/f | −5.6% (Apr p.5) | −1.9% (Jul p.5) | declines |
| Rural incl. gold loans | n/f | n/f | +25.6% (Apr p.3) | +35.4% (Jul p.3) | call's definition |
| Business banking | n/f | n/f | +24.4% (Apr p.3) | +28.2% (Jul p.3) | ICICI's SME-type book; **no separate SME line** on either call |
| Domestic corporate | n/f | n/f | +9.3% (Apr p.3) | +18.5% (Jul p.3) | call's definition (AR says 6.3% at Mar-26 — see A.3) |
| Retail share of portfolio | — | — | 41.7% (Apr p.3) | 41.1% (Jul p.3) | incl. non-fund-based outstanding |
| Overseas share of loans | — | — | 2.7% (Apr p.3) | 3.1% (Jul p.3) | |
| **LDR** | — | — | 86.6% computed (AR) | **≈89.0%** computed | advances ÷ deposits; Jun-26 estimated from Mar-26 balances × printed QoQ growth (±0.1 pp) — the calls print no balance sheet |
| Gross NPA additions, ₹ cr | 5,142 (Apr p.6) | 6,245 (Jul p.6) | 4,242 (Apr p.6) | 5,552 (Jul p.6) | Q1 FY27 includes 706 from kisan credit cards (seasonal in Q1/Q3) |
| Net additions to GNPA, ₹ cr | 1,325 (Apr p.6) | 3,034 (Jul p.6) | 1,174 (Apr p.6) | 2,707 (Jul p.6) | after recoveries/upgrades, before write-offs and sales |
| Slippage ratio, annualised | — | — | — | 1.43% computed (1.25% ex-KCC) | additions × 4 ÷ Mar-26 advances |
| GNPA ratio | n/f | n/f | 1.44% (AR p.199) | **n/f** | deck-only for quarters; Jun-26 GNPA stock ≈₹23,847 cr, computed by walking the call's flows from the AR's Mar-26 stock (the same walk reconciles FY26 exactly) |
| **NNPA ratio** | 0.39% (Apr p.3) | 0.41% (Jul p.3) | 0.33% (Apr p.3) | **0.35%** (Jul p.3) | basis not stated on the calls; the Mar-26 0.33% equals the AR's **net NPA ÷ net customer assets** (AR p.130); on net advances Mar-26 is 0.35% (AR p.199) |
| PCR | n/f | n/f | 75.8% (Apr p.3) | 74.7% (Jul p.3) | specific provisions ÷ NPLs, excl. technical write-offs (AR p.123) |
| Contingency provisions, ₹ cr | n/f | n/f | 13,100, ≈0.9% of advances (Apr p.4) | 13,100, ≈0.8% (Jul p.3) | outside the specific PCR |
| Non-specific provisions, ₹ cr | n/f | n/f | 22,710, 1.5% of loans (Apr p.7) | 22,963, 1.4% (Jul p.7) | contingency + general + NFB-NPA + restructured + BB-and-below; **plus** a ₹1,283 cr RBI-directed agri standard-asset provision held separately (Jul p.7) |
| **CET1 / CRAR** | n/f | n/f | 16.35% / 17.18% (Apr p.4) | **16.19% / 16.84%** (Jul p.4) | Basel III; Mar-26 after proposed dividend; Q1 profit inclusion not stated |
| RoA / RoE | n/f | n/f | n/f | n/f | quarterly returns are deck-only |
| Branches | — | — | 7,511 (Apr p.9) | 7,608, +97 in the quarter (Jul p.8) | |

¹ On the Q4 call an analyst put average deposit growth at "almost 10.8%"; management said only that
average deposit growth "would also be very similar to the average loan growth" (Apr p.13). Not
treated as a company figure.

### A.2 Annual (standalone, FY26 vs FY25)

| Metric | FY25 | FY26 | Basis / source |
|---|---|---|---|
| **NIM** | 4.32% | **4.32%** | Schedule 18, NII ÷ avg daily interest-earning assets (AR p.170); includes 3 bps of tax-refund interest in FY26 (AR p.119) |
| Yield on IEA / cost of funds | — | 8.33% / 4.75% | AR p.118; cost of funds = cost of interest-bearing liabilities (excludes equity) |
| **Cost of deposits** | 4.91% | **4.62%** | Schedule 18, on average deposits (AR p.170, p.119) |
| NII ÷ working funds | — | ≈4.08% computed | (interest income ÷ WF 7.88%) × NII ₹88,075 cr ÷ interest income ₹1,69,946 cr (AR p.170, p.117) |
| CASA ratio, **average** | 39.0% | 38.9% | AR p.125 |
| CASA ratio, **period-end** | — | **41.4%** computed | CASA ₹7,43,588 cr ÷ deposits ₹17,94,625 cr (AR p.125) |
| Advances / deposits, ₹ cr | 13,41,766 / 16,10,348 | **15,53,893 / 17,94,625** | AR p.123 (advances net of BRDS/IBPC) / p.125 — in prose ₹15.54 / ₹17.95 lakh cr |
| Advances / deposits growth | — | +15.8% / +11.4% | period-end (Apr p.3; AR p.116) |
| Average advances / deposits growth | — | +9.7% / +9.9% | AR p.120 (₹14,21,634 cr / ₹15,80,662 cr) |
| **LDR** | 83.3% computed | **86.6%** computed | advances ÷ deposits (AR p.123, p.125) |
| Borrowings ÷ total liabilities | — | 5.3% computed | ₹1,24,994 cr ÷ ₹23,72,531 cr (AR p.125, p.123); deposits 93.5% of funding (AR p.125) |
| NII, ₹ cr | — | 88,075, +8.5% | AR p.116 |
| Core operating profit, ₹ cr | — | 70,401, +7.7% | Apr p.3 |
| Opex, ₹ cr | — | 47,234, +11.5% | AR p.117; Apr p.8 |
| **Cost-to-income** | 38.64% | **39.75%** | opex ÷ (NII + non-interest income **incl. treasury**) (AR p.117) — recomputed exactly from AR p.117 lines |
| Provisions, ₹ cr | — | 5,380 | net of write-backs (AR p.117) |
| **Credit cost** | — | **38 bps** (Apr p.9) | = provisions ÷ average advances (computed 0.38%); company-adjusted for the agri provision and corporate recoveries: "under 50 bps" (Apr p.9) |
| PBT ex-treasury, ₹ cr | — | 65,021, +7.1% | Apr p.2 |
| PAT, ₹ cr | — | **50,147, +6.2%** | Apr p.3 |
| PAT consolidated, ₹ cr | — | 54,208, +6.2% | Apr p.3 |
| **GNPA ratio** | 1.73% | **1.44%** | gross NPA ÷ gross advances (AR p.199) |
| **NNPA ratio** | — | **0.35%** on net advances (AR p.199) · 0.33% on net customer assets (AR p.130) | two bases, both printed |
| PCR | 76.2% | 75.8% | AR p.199 |
| GNPA / NNPA stock, ₹ cr | 24,166 (AR p.131) | 23,052 / 5,459 (AR p.130) | net of write-offs |
| Gross NPA additions, ₹ cr | — | 19,147 (AR p.131) | slippage ratio 1.43% computed (÷ Mar-25 advances) |
| **RoA** | 2.41% | **2.33%** | Schedule 18, PAT ÷ monthly-average total assets (AR p.170); the MD&A table prints 2.40% / 2.32% (AR p.117) |
| **RoE** | 17.95% | **15.97%** | PAT ÷ quarterly-average equity (AR p.117); consolidated RoE 16.0% (AR p.12) |
| **CET1 / CRAR** | 15.94% / 16.55% | **16.35% / 17.18%** | after deducting proposed dividend (AR p.116) |
| Branches | — | 7,511, +528 in the year | AR p.116; Apr p.9 |
| Employees | 1,30,957 | **1,24,324** (−6,633, computed) | incl. sales executives, fixed-term contracts and interns (AR p.122) |

### A.3 ICICI's two documents disagree on segment growth (Mar-26)

The call and the AR print different FY26 segment growth for the same date, because their segment
definitions differ; the AR does not reconcile them. Neither is wrong; the sheet must not mix them.

| Segment, YoY at 31 Mar 2026 | Call (Apr p.3) | AR (p.124) |
|---|---|---|
| Retail | +9.5% | +9.4% (net retail advances) |
| Business banking | +24.4% | +24.2% |
| Rural | +25.6% (incl. gold loans) | +29.4% computed (rural advances ₹78,340 → ₹1,01,376 cr) |
| **Domestic corporate** | **+9.3%** | **+6.3%** |

The total is the same in both (+15.8%), so the difference is classification, not arithmetic. The
quarterly series in A.1 uses the call's definitions throughout.

## B. Management's outlook (the two calls)

All Q&A answers are by Anindya Banerjee; the prepared remarks are his and Sandeep Bakhshi's. **ICICI
gives no numeric guidance** on growth or NIM in either call. The only numbers it anchors to are a
"normalised" credit cost of about 50 bps and a NIM that stays "range bound". Registry ids are
`icici.quote.apr.*` / `icici.quote.jul.*`.

| Topic | Q4 FY26 call (18 Apr 2026) | Q1 FY27 call (18 Jul 2026) | Direction |
|---|---|---|---|
| **NIM: drivers** | "The margins for the quarter reflect the impact of repricing of external benchmark linked loans, repricing of term deposits and seasonally lower interest reversal on the KCC portfolio." (Apr p.8) · yields have "this quarter seen the impact of the December repo cut" (Apr p.18) | "the NIM reflects the healthy funding franchise, our disciplined approach consistently on both deposit and loan pricing as well as our management of the government securities book" (Jul p.12) | — |
| **NIM: outlook** | "range-bound margins, unlikely to move up, but should be broadly in this range is what we would think" (Apr p.18–19) · "overall, on the margin side, we expect it to be range bound from here on" (Apr p.28) | "Based on current conditions and assuming no policy rate movements, I would say it should be range bound." (Jul p.14) · "But other things being equal, I would still say range bound." (Jul p.15) | flat; **conditional on no rate move** in July |
| **NIM: new risk** | — | FCNR(B) deposits: "the best guess we have now is that there could be some impact on the NIM" (Jul p.15) · "But from an earnings perspective, it is quite positive." (Jul p.15) · all-in cost "somewhere maybe 6.30-6.40%, which is, of course, lower than wholesale rates" (Jul p.12) | NIM dilution, earnings accretion |
| **Deposit repricing** | "maybe till the last summer, our peak rates were more in the 1-year kind of level. So that's kind of the repricing horizon." (Apr p.23) | cost of deposits 4.41% vs 4.43% (Jul p.8): repricing has largely run | tailwind fading |
| **Loan growth** | "We wouldn't get into giving a growth number." (Apr p.16) · "since March, the conflict in West Asia has clouded the outlook in the sense that it has created some amount of uncertainty" (Apr p.16) | "And the momentum continues to be pretty good as far as we can see it." (Jul p.11) · on the 19.6%: "Average loan growth on a year-on-year basis will be somewhat lower" (Jul p.18) · competition: "that is not sort of something that is holding us back currently" (Jul p.19) | positive, no number |
| **Deposits / funding** | "Deposit growth is not something that will constrain us from pursuing loan growth." (Apr p.13) · "average deposit growth would also be very similar to the average loan growth" (Apr p.13) · "Government SA is a low-teen share of SA." (Apr p.25) | (no new statement; LCR ≈124%, Jul p.3) | no constraint claimed |
| **Credit cost** | FY26 38 bps; "under 50 basis points" adjusted (Apr p.9) · "So, the underlying credit cost remains pretty stable." (Apr p.14) | reported 32 bps, but "a more normalised level, adjusting for chunky recoveries would be around 50 bps, and that is where it stays" (Jul p.16) · the chunky item: "So that recovery did come through this quarter. This is an asset that had been previously sold to NARCL." (Jul p.16) | **~50 bps normalised**: reported is flattered by recoveries |
| **Agri provision (₹1,283 cr)** | "maybe we will have an update on that a quarter-or-so from now" (Apr p.24) | "I wouldn't really be able to comment on the timing." (Jul p.13) | write-back pending, undated |
| **ECL transition** | — | "On the net worth, we will not really have any impact." (Jul p.16) | — |
| **Costs** | "we would want to have opex growth at a level which is below the top line growth. That would be our objective." (Apr p.22) · "it's not that we are looking at managing or targeting a particular cost-to-income metric" (Apr p.29) | opex +10.4% vs NII +12.7% (Jul p.8, p.7): positive jaws delivered in Q1 | positive jaws, no ratio target |
| **Fees / retail** | — | 23.5% fee growth: "there is some amount of a base effect" (Jul p.14) · personal loans: "I don't want to really give an outlook per se." (Jul p.22) | — |

**Said vs did, Q4 → Q1 (N4A's reading).** Opex growth "below the top line" (Apr p.22) was delivered
(opex +10.4% vs NII +12.7%). "Range bound" NIM held: 4.32% → 4.36% reported, 4.27% → 4.28% ex
tax refund (Jul p.8). Credit cost fell to 32 bps, but management itself puts the run-rate near 50 bps
(Jul p.16), so the Q1 figure should not be extrapolated.

## C. ICICI vs HDFC, metric by metric

Both banks **standalone**. HDFC codes as in the HDFC dossier (Q1D = Q1 FY27 deck, KPj = key
parameters Jun-26, AR26 = HDFC annual report FY26). ⁺ = HDFC figure that was not in dossier v0, cited
from the page and since added to `figures/hdfc-kpi.json`. **Basis** says `match`, `near-match` (same concept, a stated small difference) or names
the mismatch; where bases differ, the **bold** row is the like-for-like pairing.

### C.1 Q1 FY27 (quarter to 30 Jun 2026)

| Metric | ICICI | HDFC | Basis |
|---|---|---|---|
| NIM (headline as each prints it) | 4.36% (Jul p.7) | 3.26% (Q1D p.3) | **MISMATCH**: HDFC's 3.26% is on **total assets** (Q1D p.3 footnote "based on total assets"); ICICI's is on interest-earning assets. Do not compare. |
| **NIM on interest-earning assets** | **4.36%** (Jul p.7; definition AR p.170) | **3.4%** (KPj p.2; Q1D p.13 "NIM (IEA)") | match. Gap ≈0.96 pp; HDFC prints one decimal, so 0.91–1.01 pp. ICICI ex tax-refund 4.28% (Jul p.8) → gap 0.83–0.93 pp; HDFC's refund content not disclosed |
| Funding cost | cost of deposits 4.41% (Jul p.8) | cost of funds incl. shareholders' funds 4.4% (KPj p.2) | **MISMATCH**: different numerator and denominator (HDFC's includes borrowings and zero-cost equity). No HDFC quarterly cost of deposits in the corpus; see FY26 |
| CASA ratio | n/f (deck-only) | 32.3% period-end (KPj p.2) | no ICICI figure for the quarter |
| Average CASA, QoQ | +4.7% (Jul p.3) | +4.2% (Q1D p.2) | match (average balances, QoQ) |
| **Loan growth YoY, period-end** | **+19.6%** (Jul p.3) | **+15.4%** gross advances (Q1D p.2) | near-match: both net of IBPC/BRDS; ICICI's are net of provisions, HDFC's gross (immaterial to growth). HDFC's AUM grew +12.4% (Q1D p.2), the difference being the run-off of its securitised/IBPC book |
| Loan growth YoY, average | n/f ("somewhat lower", Jul p.18) | +13.4% (Q1D p.2) | no ICICI figure |
| Deposit growth YoY, period-end | +14.0% (Jul p.3) | +14.7% (Q1D p.2) | match |
| Deposit growth YoY, average | +14.0% (Jul p.3) | +13.3% (Q1D p.2) | match |
| Retail loans | +12.0% (Jul p.3) | +7.2% (KPj p.2) | **MISMATCH**: ICICI retail excludes rural and business banking and includes CV & equipment; HDFC retail includes agri, gold and two-wheelers and excludes commercial transportation. Compare products, not "retail" |
| · Mortgages | +14.6% (Jul p.5) | +6.8% computed (KPj p.1: ₹9,005 bn ÷ ₹8,428 bn, AUM) | near-match: product lines; definitions not reconciled |
| · Personal loans | +12.9% (Jul p.5) | +10.3% computed (KPj p.1: 2,224 ÷ 2,016) | near-match |
| · Auto | +3.6% (Jul p.5) | +9.2% computed (KPj p.1: 1,619 ÷ 1,483) | near-match |
| · Cards | −1.9% (Jul p.5) | payments business +2.3% computed (KPj p.1: 1,161 ÷ 1,135) | near-match: HDFC's line may hold more than cards |
| Business banking | +28.2% (Jul p.3) | +22.3% computed (KPj p.1: 4,823 ÷ 3,944) | near-match: same name, definitions not reconciled |
| SME / mid-market | n/f (no SME line) | small and mid-market +18.7% (KPj p.2) | **MISMATCH**: HDFC's line is business banking + commercial transportation |
| Rural / gold | rural incl. gold +35.4% (Jul p.3) | gold loans +34.9%, agri +7.6% computed (KPj p.1: 255 ÷ 189; 1,241 ÷ 1,153) | **MISMATCH**: ICICI's rural blends farm credit and gold loans |
| Corporate | domestic corporate +18.5% (Jul p.3) | corporate and other wholesale +18.6% (KPj p.2) | near-match: HDFC includes "other wholesale"; ICICI excludes overseas |
| **LDR** | **≈89.0%** computed estimate | **95.8%** computed (Q1D p.5: ₹30,373 bn ÷ ₹31,708 bn) | match in definition (net advances ÷ deposits); ICICI's is an estimate (±0.1 pp) |
| Borrowings ÷ liabilities | n/f at Jun-26 | 10.5% computed (Q1D p.5: 4,618 ÷ 43,975; deck rounds to 11%, Q1D p.14) | no ICICI figure for the quarter; see FY26 |
| GNPA ratio | n/f | 1.17% of gross advances (Q1D p.3; basis KPj p.2) | no ICICI ratio. Stocks: ICICI ≈₹23,847 cr computed vs HDFC ₹35,800 cr (₹358 bn, Q1D p.18) |
| NNPA ratio | 0.35% (Jul p.3) | 0.4% (Q1D p.17, chart, one decimal) | **MISMATCH**: ICICI's series is on net customer assets (inferred, see A.1), HDFC's on net advances, and HDFC's is rounded. Like-for-like only at FY26 |
| **PCR** | **74.7%** (Jul p.3) | **66%** specific PCR (KPj p.2) | match: specific provisions ÷ GNPA, both excluding written-off accounts |
| Slippages, ₹ cr | 5,552, of which 706 kisan credit card (Jul p.6) | 8,000 (₹80 bn), ex-agri 6,100 (Q1D p.18) | near-match: ICICI strips only KCC, HDFC all agri |
| **Slippage ratio, annualised** | **1.43%** (ex-KCC 1.25%) computed | **1.08%** (ex-agri 0.82%) computed (80 × 4 ÷ ₹29,600 bn Mar-26 gross advances, KPj p.1) | near-match: both ÷ opening advances; ICICI's denominator is net of provisions (≈1% smaller), immaterial |
| Credit cost (headline) | 0.32% (Jul p.3) | 0.40% (KPj p.2) | **MISMATCH**: ICICI nets recoveries from written-off accounts in provisions (Apr p.14); HDFC books them in other income (₹4,014.4 cr in FY26, AR26 p.279⁺) |
| **Credit cost, net of recoveries** | **0.32%** | **0.29%** "net of recoveries" (KPj p.2) | match after pairing. ICICI's is ÷ average advances, annualised; HDFC states only "% of advances", and its ₹30.6 bn of Q1 provisions (Q1D p.4) × 4 ≈ 0.41% of advances implies annualised too. ICICI's own "normalised" figure is ~50 bps (Jul p.16) |
| Non-specific provision buffer | 1.4% of loans, ₹22,963 cr (Jul p.7), + ₹1,283 cr agri provision | 1.60% of advances, "total provisions (ex. specific)" (KPj p.2); floating ₹21,400 cr + contingent ₹15,600 cr (Q1D p.19) | near-match: both = floating/contingency + general; component lists differ |
| RoA / RoE | n/f (deck-only) | 1.85% / 13.8% (Q1D p.3, p.2) | no ICICI figure for the quarter; see FY26 |
| **CET1 / CRAR** | **16.19% / 16.84%** (Jul p.4) | **17.4% / 19.6%** (Q1D p.3) | match (Basel III, standalone); neither states whether Q1 profit is included |
| **Cost-to-income** | **38.1%** computed (38.3% ex-treasury) | **39.2%** "core" (Q1D p.3) = opex ₹181.9 bn ÷ net revenue ₹463.6 bn (Q1D p.4) | match after computing ICICI on HDFC's basis (opex ÷ all revenue incl. treasury). HDFC's revenue also carries written-off recoveries, which flatters its ratio slightly |
| NII growth YoY | +12.7% (Jul p.7) | +6.7% (Q1D p.4) | match |
| NII, ₹ cr | 24,384 (Jul p.7) | 33,530 (₹335.3 bn, Q1D p.4) | match |
| PAT growth YoY, reported | +15.9% (Jul p.3) | +5.0% (Q1D p.4) | **MISMATCH**: HDFC's Q1 FY26 base holds the HDB transaction gain; ICICI's Q1 FY27 holds a ₹446 cr tax write-back (Jul p.9) |
| **PAT growth YoY, adjusted** | **≈+12.4%** computed (ex the tax write-back; N4A's adjustment) | **+9.8%** (Q1D p.4; company's adjustment for "transaction gains (HDBFS), certain provisions and tax credit") | near-match: each adjusted for its own one-off; the adjusters differ (N4A vs company) |
| PAT, ₹ cr | 14,805 (Jul p.3) | 19,060 (₹190.6 bn, Q1D p.4) | match |
| Branches | 7,608 (Jul p.8) | 9,694 (Q1D p.11) | match |
| Employees | n/f at Jun-26 | 2,12,958 (KPj p.2) | no ICICI figure for the quarter |

### C.2 FY26 (year to 31 Mar 2026)

| Metric | ICICI | HDFC | Basis |
|---|---|---|---|
| NIM (headline as each prints it) | 4.32% (AR p.170) | 3.34% (AR26 p.273 / dossier) | **MISMATCH**: HDFC's 3.34% is "as percentage of average assets" (AR26 p.41⁺, p.279⁺) |
| **NIM on average interest-earning assets** | **4.32%** (AR p.170, Schedule 18) | **3.50%** (AR26 p.460⁺, Schedule 18) | match: both Schedule 18 "NII ÷ average interest-earning assets" (ICICI states daily averages). **Gap 82 bps.** HDFC FY25 3.67% (AR26 p.460⁺) |
| NII ÷ average total assets (working funds) | ≈4.08% computed | 3.34% (AR26 p.460⁺) | near-match: ICICI's working funds are monthly averages, HDFC's daily. Gap ≈74 bps |
| **Cost of deposits** | **4.62%** (AR p.170) | **5.05%** (AR26 p.460⁺) | match: both Schedule 18, interest on deposits ÷ average deposits. **Gap 43 bps** |
| **CASA ratio, period-end** | **41.4%** computed (AR p.125) | **34.1%** (KPj p.2, Mar-26 column; dossier: KPm p.2) | match (both period-end; ICICI's computed) |
| CASA ratio, average | 38.9% (AR p.125) | n/f in the HDFC corpus as researched | no HDFC figure |
| Advances growth YoY | +15.8% (Apr p.3) | +12.1% (AR26 p.272⁺) | match |
| Deposit growth YoY | +11.4% (Apr p.3) | +14.4% (AR26 p.272⁺) | match |
| **LDR** | **86.6%** computed | **94.6%** computed (Q1D p.5, Mar-26 column: 29,372 ÷ 31,053) | match |
| Borrowings ÷ total liabilities | 5.3% computed | 11.2% computed (Q1D p.5: 4,894 ÷ 43,649) | match |
| **GNPA ratio** | **1.44%** (AR p.199) | **1.15%** (AR26 p.425) | match: gross NPA ÷ gross advances |
| NNPA ratio | 0.33% on net customer assets (AR p.130; the call's figure) | 0.38% on net advances (AR26 p.425) | **MISMATCH** — pair the next row |
| **NNPA ratio, net advances** | **0.35%** (AR p.199) | **0.38%** (AR26 p.425) | match |
| **PCR** | **75.8%** (AR p.199) | **67.21%** (AR26 p.425) | match: both exclude written-off accounts |
| Credit cost | 38 bps (Apr p.9) | n/f in the HDFC corpus as researched (quarterly only: 0.35% in Q4 FY26, KPj p.2) | no HDFC FY figure |
| **RoA** | **2.33%** (AR p.170, Schedule 18) | **1.94%** (AR26 p.460⁺, Schedule 18) | match. HDFC's FY26 holds the HDB gain net of offsetting provisions: Q1 FY26 PAT ₹181.6 bn reported vs ₹173.7 bn adjusted (Q1D p.4), a ₹790 cr net effect ≈2 bps of RoA (N4A's estimate, on average assets from AR26 p.41⁺). **Gap 39 bps** |
| RoE | 15.97% (AR p.117) | 14.29% (AR26 p.460⁺) | near-match: ICICI on quarterly-average equity, HDFC on average equity incl. ESOPs outstanding |
| **CET1 / CRAR** | **16.35% / 17.18%** (AR p.116) | **17.28% / 19.71%** (AR26 p.403) | match (Basel III, standalone); ICICI states "after deducting proposed dividend", HDFC's page does not say |
| Cost-to-income (headline) | 39.75% (AR p.117) | 38.0% (AR26 p.69) | **MISMATCH**: HDFC's income includes the ₹9,179.4 cr HDB gain (AR26 p.279⁺) |
| **Cost-to-income, ex one-off** | **39.75%** | **39.9%** computed (opex ₹72,660.3 cr ÷ (net revenue ₹1,91,218.6 cr − gain ₹9,179.4 cr), AR26 p.279⁺) | match. Also removing HDFC's written-off recoveries (which ICICI nets in provisions): ≈40.8% |
| Opex ÷ working funds | 2.19% computed | ≈1.89% computed (72,660.3 ÷ (1,28,686.0 ÷ 3.34%), AR26 p.279⁺, p.460⁺) | near-match (working-fund definitions as above) |
| Non-interest income ÷ working funds | 1.43% (AR p.170) | 1.62% (AR26 p.460⁺); ≈1.38% ex the HDB gain, computed | **MISMATCH** on headline (one-off) |
| Operating profit ÷ working funds | 3.32% (AR p.170) | 3.07% (AR26 p.460⁺) | match (Schedule 18) |
| NII growth | +8.5% (AR p.116) | +4.9% (AR26 p.279⁺) | match |
| PAT, ₹ cr / growth | 50,147, +6.2% (Apr p.3) | 74,671, +10.9% (AR26 p.272⁺) | **MISMATCH** on growth: HDFC's includes the HDB gain |
| Branches | 7,511 (AR p.116) | 9,689 (Q1D p.11) | match |
| Employees | 1,24,324 (AR p.122) | 2,11,178 (KPj p.2, Mar-26 column) | near-match: ICICI's count includes sales executives, fixed-term contracts and interns; HDFC's definition not stated |

## D. What an analyst would draw from it

1. **Filed.** Like-for-like, ICICI's margin lead is 0.8–1.0 pp, not 1.1 pp: NIM on interest-earning
   assets 4.36% vs 3.4% in Q1 FY27 (Jul p.7; KPj p.2) and 4.32% vs 3.50% in FY26 (AR p.170; AR26
   p.460). Setting ICICI's 4.36% beside HDFC's headline 3.26% (total assets, Q1D p.3) overstates the
   gap by 0.14 pp: exactly the mismatch an expert reader catches first.
2. **N4A's reading** (on filed inputs). Funding is the visible half of that gap: in FY26 ICICI paid
   43 bps less for deposits (4.62% vs 5.05%, AR p.170; AR26 p.460), ran a period-end CASA ratio of
   41.4% vs 34.1% (computed, AR p.125; KPj p.2) and funded 5.3% of its balance sheet with borrowings
   against HDFC's 11.2% (computed, AR p.125; Q1D p.5). The asset-side half cannot be sized: the
   corpus has no HDFC yield on interest-earning assets to set against ICICI's 8.33% (AR p.118).
3. **N4A's reading.** ICICI is spending its loan-to-deposit headroom fast: 83.3% (Mar-25) → 86.6%
   (Mar-26) → ≈89.0% (Jun-26), computed, as loans grew 19.6% against deposits' 14.0% (Jul p.3);
   HDFC sits at 95.8% (Q1D p.5). The gap narrowed from 8.0 pp to ≈6.8 pp in one quarter. Management
   says deposits will not constrain growth (Apr p.13) and is raising FCNR(B) money at about
   6.30–6.40% all-in (Jul p.12), which it expects may dent the NIM (Jul p.15).
4. **N4A's reading.** The 39 bps RoA gap (2.33% vs 1.94%, both Schedule 18: AR p.170; AR26 p.460) is
   margin, not efficiency. Per rupee of working funds (FY26):

   | % of working funds | ICICI | HDFC | ICICI − HDFC |
   |---|---|---|---|
   | NII | ≈4.08 (computed) | 3.34 (AR26 p.460) | +0.74 |
   | Non-interest income | 1.43 (AR p.170) | 1.62 (AR26 p.460); ≈1.38 ex HDB gain | −0.19 (+0.05 ex gain) |
   | Operating expenses | 2.19 (computed) | ≈1.89 (computed) | −0.30 |
   | Operating profit | 3.32 (AR p.170) | 3.07 (AR26 p.460) | +0.25 |
   | RoA | 2.33 | 1.94 | +0.39 |

   ICICI spends more per rupee of assets and earns more, so cost-to-income is level (39.75% vs 39.9%
   ex the HDB gain); the remaining ≈0.14 pp of RoA comes from below operating profit (provisions and
   tax). Working funds are monthly averages at ICICI, daily at HDFC, so treat the second decimal as
   noise.
5. **N4A's reading.** On credit, the headline 32 vs 40 bps flatters ICICI. Treated the same way (net
   of recoveries from written-off accounts) it is 0.32% vs 0.29% (Jul p.3; KPj p.2); ICICI's
   annualised slippages run higher (1.43% vs 1.08%, computed; Jul p.6; Q1D p.18), its FY26 GNPA ratio
   is higher (1.44% vs 1.15%, AR p.199; AR26 p.425), and its own "normalised" run-rate is about 50 bps
   after a chunky NCLT recovery (Jul p.16). What ICICI holds more of is specific cover (PCR 74.7% vs
   66%, Jul p.3; KPj p.2); what HDFC holds more of is capital and general buffers (CET1 17.4% vs
   16.19%, Q1D p.3; Jul p.4; non-specific provisions 1.60% vs 1.4% of loans, KPj p.2; Jul p.7).

## E. Boundaries: what this corpus does not let you compare

- **No ICICI investor presentation.** The calls point to it ("slides 33 to 35 and 54 to 59 in the
  investor presentation", Jul p.9; Apr p.10) but it is not in the corpus. So for the quarters there is
  no ICICI CASA ratio, GNPA ratio, RoA, RoE, cost-to-income, yield on advances, balance sheet,
  segment amounts or average balances. Every quarterly ICICI LDR, cost-to-income and GNPA stock on
  this sheet is **computed or estimated**, and labelled so.
- **No earlier ICICI quarters.** Q1 FY26 and Q4 FY25 appear only where a call says "Q1 of last year"
  or "Q4 of last year"; no YoY for NII, fees or core operating profit in those quarters.
- **Segment definitions do not line up** between the banks (retail, SME / mid-market, rural) or even
  inside ICICI (call vs AR, A.3). Only product lines (mortgages, personal loans, auto, business
  banking, corporate) are near-comparable, and the definitions behind them are not published here.
- **Precision.** HDFC's key-parameter sheet and deck charts print one decimal (NIM on IEA 3.4%, NNPA
  0.4%), so those gaps carry ±0.05 pp. ICICI's Jun-26 LDR estimate carries about ±0.1 pp.
- **Not in the corpus or dossier v0 for HDFC:** quarterly cost of deposits, average CASA ratio, FY26
  credit cost, yield on interest-earning assets, the tax-refund content of NIM.
- **Capital.** Neither bank says whether Q1 FY27 profit is inside the CET1 figure.
- **Valuation, prices, consensus.** No feed is connected (DECISIONS D2, third kind of gap); this
  sheet compares fundamentals only.

## Hand-offs (for the HDFC dossier v1 and its registry) — done 2026-10-06

- HDFC figures marked ⁺ are not in `DOSSIER-HDFC.md` v0 and should join the HDFC registry:
  Schedule 18 ratios (AR26 p.460: NIM on IEA 3.50% / 3.67%, NII ÷ WF 3.34%, non-interest income ÷ WF
  1.62%, cost of deposits 5.05%, operating profit ÷ WF 3.07%, RoA 1.94%, RoE 14.29%); FY26 P&L lines
  (AR26 p.279: net revenue ₹1,91,218.6 cr, NII ₹1,28,686.0 cr +4.9%, HDB gain ₹9,179.4 cr, written-off
  recoveries ₹4,014.4 cr, opex ₹72,660.3 cr); growth (AR26 p.272: advances +12.1%, deposits +14.4%).
- **Dossier v0 §1 Annual shows HDFC FY26 NIM 3.34% without a basis.** AR26 p.41 and p.279 say it is
  "as percentage of average assets"; the interest-earning-assets figure is 3.50% (AR26 p.460). Any
  peer pairing must use the 3.50%.
- These HDFC checks were run with the registry checker's own functions from a scratch script (72 +
  21 citations, all on their page); they are not a registry file.
