# Dossier: HDFC Bank (v1)

> **status:** working (temporary) · **authoritative for:** what the HDFC Bank corpus supports, as of
> the demo date (31 Jul 2026, D15): the numbers on stated bases, what the Q1 FY27 call changed, the
> storylines, the guidance ledger, contested points, the events calendar, the broker grid and the
> ICICI Bank comparison. Every figure carries doc + **PDF page**; the prototype's HDFC content is
> rebuilt from this file · **last verified:** 2026-10-06 — **v1**: all 20 PDFs, including the new
> Q1 FY27 call (Cjl26). Every figure in a table, and every quote, is a registry entry in
> [`figures/hdfc-kpi.json`](figures/hdfc-kpi.json), [`figures/hdfc-story.json`](figures/hdfc-story.json)
> or [`figures/hdfc-v1.json`](figures/hdfc-v1.json), checked on its page by
> `../tools/check_figures.py` (reference outside this repository: `../tools/check_figures.py`) (`--only hdfc`). The ICICI sheet is
> [`PEER-ICICI.md`](PEER-ICICI.md).

**How to read it.** §1 is the numbers, §A–§B what changed and the storylines, §C–§E the ledger, the
disputes and the calendar, §F the peer, §G what v1 corrected in v0, §H the prototype against all this,
and **§I the proposed first 90 seconds** (PLAN 0.7, for the user's sign-off).

## 0. Corpus key and conventions

| Code | File in `data/seed/HDFC Bank/` | Kind | Period | Date | PDF pages |
|---|---|---|---|---|---|
| Q3D | `Q3FY26-earnings-presentation-HDFC.pdf` | earnings deck | Q3 FY26 | 17 Jan 2026 | 37 |
| Q4D | `Q4FY26-earnings-presentation-HDFC.pdf` | earnings deck | Q4 FY26 | 18 Apr 2026 | 38 |
| Q1D | `Q1FY27-earnings-presentation-HDFC.pdf` | earnings deck | Q1 FY27 | 18 Jul 2026 | 36 |
| KPd | `HDFC-key-parameters-…-december-31-2025.pdf` | key-parameter sheet (six quarters) | Q3 FY26 | with the 17 Jan 2026 results | 2 |
| KPm | `HDFC-key-parameters-…-march-31-2026.pdf` | key-parameter sheet | Q4 FY26 | with the 18 Apr 2026 results | 2 |
| KPj | `HDFC-key-parameters-…-june-30-2026.pdf` | key-parameter sheet | Q1 FY27 | with the 18 Jul 2026 results | 2 |
| AR24 | `HDFC-annual-report-FY 23-24.pdf` | integrated annual report | FY24 | filed 18 Jul 2024 | 610 |
| AR25 | `HDFC-annual-report-FY 24-25.pdf` | integrated annual report | FY25 | filed 14 Jul 2025 | 609 |
| AR26 | `HDFC-annual-report-FY 25-26.pdf` | integrated annual report | FY26 | filed 10 Jul 2026 | 678 |
| Cj25 | `HDFC-Concall-Transcript-Jan-2025.pdf` | earnings call | Q3 FY25 | held 22 Jan 2025, filed 29 Jan | 20 |
| Ca25 | `HDFC-Concall-Transcript-Apr-2025.pdf` | earnings call | Q4 FY25 | held 19 Apr 2025, filed 24 Apr | 18 |
| Cjl25 | `HDFC-Concall-Transcript-Jul-2025.pdf` | earnings call | Q1 FY26 | held 19 Jul 2025, filed 25 Jul | 17 |
| Co25 | `HDFC-Concall-Transcript-Oct-2025.pdf` | earnings call | Q2 FY26 | held 18 Oct 2025, filed 27 Oct | 16 |
| Cj26 | `HDFC-Concall-Transcript-Jan-2026.pdf` | earnings call | Q3 FY26 | held 17 Jan 2026, filed 23 Jan | 18 |
| GOV | `HDFC-Concall-Transcript-Mar-2026.pdf` | **not an earnings call**: the investor call on the chairman's resignation (X2) | — | held 19 Mar 2026 | 13 |
| **Cjl26** | `HDFC-Concall-Transcript-Jul-2026.pdf` | earnings call · **new** | Q1 FY27 | held 18 Jul 2026, filed 24 Jul | 17 |
| AX | `HDFC-analyst-report-AxisDirect.pdf` | broker result update | Q4 FY26 | 20 Apr 2026 | 9 |
| DC | `HDFC-analyst-report-DevenChoksey.pdf` | broker result update | Q4 FY26 | 22 Apr 2026 | 6 |
| GJ | `HDFC-analyst-report-BNP Paribas.pdf` | broker company update, **in fact Geojit** (geojit.com p.1; signed Arun Kailasan p.4; D8, X2) | Q4 FY26 | 22 Apr 2026 | 4 |
| UP | `HDFC-news-Upstox-Q1FY27-selloff-analysts-20Jul2026.pdf` | news; quotes Bernstein, Nomura, Jefferies, Investec | Q1 FY27 | 20 Jul 2026 | 3 |

**Conventions** (DECISIONS D5).
- **Pages are the PDF page index**, never the printed folio. Earnings-call transcripts carry an exchange
  cover letter on p.1, so the printed "Page n of N" = PDF page − 1 (Co25 prints no folio); **GOV has no
  cover letter**, so its printed page = PDF page.
- **Units.** Decks and key-parameter sheets print ₹ bn: tables show ₹ crore (= ₹ bn × 100) at the
  source's precision, prose uses ₹ lakh crore, and the printed unit stays in the citation. Annual
  reports print ₹ crore.
- **Basis.** Standalone unless marked. Every NIM names its base: **total assets** (the bank's headline,
  decks p.3) or **interest-earning assets** (KP sheets, Schedule 18). ᵇ = printed by a broker, never
  shown as the bank's. "(computed)" or ᵈ = N4A arithmetic, a derived registry entry. "n/f" = not in the
  corpus.
- **Labels.** **Filed** = a reported figure; **Attributed** = someone said it, named; **N4A's reading** =
  our inference, always with a *Would be wrong if…* line.
- **True-of-the-corpus gaps** (D2, shown quietly): no **Q4 FY26 earnings call**; no broker note written
  after Q1 FY27; no two-decimal NIM, RoA, RoE or NNPA for Q1–Q2 FY26 (the Oct-25 CFO gives only a range:
  RoA "between 1.8% to 1.85% to 1.95%", Co25 p.11). **Needs data nobody gave us:** consensus estimates,
  live peer prices, a system credit-growth figure after AxisDirect's "~16%" (AX p.1).

---

## 1. The numbers

### 1.1 KPI spine, quarterly, standalone (Q3 FY25 → Q1 FY27)

Quarters are Indian FY (Q3 FY25 = Oct–Dec 2024 … Q1 FY27 = Apr–Jun 2026); period-end columns are 31 Dec
2024 … 30 Jun 2026. Decks (Q3D/Q4D/Q1D) and the key-parameter sheets (KPd/KPm/KPj) print ₹ bn: every ₹
figure below is ₹ bn × 100 = ₹ crore, at the source's precision (a deck's ₹335.3 bn is shown as
33,530). The KP sheets print yield, cost of funds and both NIMs to **one decimal**; the decks' headline
page (p.3) prints NIM on total assets to two decimals for the last three quarters only. "n/f" = not in
the corpus (no Q3 FY25 – Q2 FY26 deck, results release or press release is in it). Every ratio is the
bank's own, standalone, unless marked ᵇ (printed by a broker).

| Metric (standalone) | Q3 FY25 | Q4 FY25 | Q1 FY26 | Q2 FY26 | Q3 FY26 | Q4 FY26 | Q1 FY27 |
|---|---|---|---|---|---|---|---|
| **Balance sheet, ₹ crore** |  |  |  |  |  |  |  |
| Gross advances, period-end | 25,42,600 (KPm p.1) | 26,43,500 (KPj p.1) | 26,53,200 (KPj p.1) | 27,69,200 (KPj p.1) | 28,44,600 (KPj p.1) | 29,60,000 (KPj p.1) | 30,60,800 (KPj p.1) |
| Gross advances, YoY | n/f | n/f | n/f | 9.9% (computed) | 11.9% (Q3D p.10) | 12.0% (Q4D p.10) | 15.4% (Q1D p.10) |
| AUM (advances under management), period-end | 26,83,900 (KPm p.1) | 27,73,300 (KPj p.1) | 27,82,000 (KPj p.1) | 28,68,800 (KPj p.1) | 29,46,000 (KPj p.1) | 30,57,300 (KPj p.1) | 31,27,200 (KPj p.1) |
| AUM, YoY | 6.1% (KPd p.2) | 7.7% (KPm p.2) | 8.0% (KPj p.2) | 8.9% (KPd p.2) | 9.8% (KPd p.2) | 10.2% (KPm p.2) | 12.4% (KPj p.2) |
| Average AUM | 26,27,600 (Q4D p.8) | 26,95,500 (Q1D p.8) | 27,42,300 (Q1D p.8) | 27,94,600 (Q1D p.8) | 28,64,100 (Q1D p.8) | 29,64,400 (Q1D p.8) | 30,38,600 (Q1D p.8) |
| Average AUM, YoY | n/f | n/f | n/f | 9.0% (computed) | 9.0% (Q3D p.3) | 10.0% (Q4D p.3) | 10.8% (Q1D p.3) |
| Net advances, period-end | 25,18,200 (Q3D p.5) | 26,19,600 (Q4D p.5) | 26,28,400 (Q1D p.5) | 27,46,400 (Q3D p.5) | 28,21,400 (Q3D p.5) | 29,37,200 (Q1D p.5) | 30,37,300 (Q1D p.5) |
| Deposits, period-end | 25,63,800 (Q3D p.5) | 27,14,700 (Q4D p.5) | 27,64,100 (Q1D p.5) | 28,01,800 (Q3D p.5) | 28,60,100 (Q3D p.5) | 31,05,300 (Q1D p.5) | 31,70,800 (Q1D p.5) |
| Deposits, period-end, YoY | 15.8% (KPd p.2) | 14.1% (KPm p.2) | 16.2% (KPj p.2) | 12.1% (KPd p.2) | 11.6% (KPd p.2) | 14.4% (KPm p.2) | 14.7% (KPj p.2) |
| Average deposits | 24,52,800 (Q4D p.7) | 25,28,000 (Q1D p.7) | 26,57,600 (Q1D p.7) | 27,10,500 (Q1D p.7) | 27,52,400 (Q1D p.7) | 28,51,100 (Q1D p.7) | 30,11,500 (Q1D p.7) |
| Average deposits, YoY | n/f | n/f | n/f | 15.1% (computed) | 12.2% (Q3D p.3) | 12.8% (Q4D p.3) | 13.3% (Q1D p.3) |
| CASA ratio, period-end | 34.0% (KPd p.2) | 34.8% (KPm p.2) | 33.9% (KPj p.2) | 33.9% (KPd p.2) | 33.6% (KPd p.2) | 34.1% (KPm p.2) | 32.3% (KPj p.2) |
| LDR = net advances ÷ deposits, period-end | 98.2% (computed) | 96.5% (computed) | 95.1% (computed) | 98.0% (computed) | 98.6% (computed) | 94.6% (computed) | 95.8% (computed) |
| **Margin** |  |  |  |  |  |  |  |
| NIM on total assets | 3.4% (KPd p.2) | 3.5% (KPm p.2) | 3.4% (KPj p.2) | 3.3% (KPd p.2) | 3.35% (Q3D p.3) | 3.38% (Q4D p.3) | 3.26% (Q1D p.3) |
| NIM on interest-earning assets | 3.6% (KPd p.2) | 3.7% (KPm p.2) | 3.5% (KPj p.2) | 3.4% (KPd p.2) | 3.5% (KPd p.2) | 3.5% (KPm p.2) | 3.4% (KPj p.2) |
| Yield on assets | 8.3% (KPd p.2) | 8.4% (KPm p.2) ¹ | 8.1% (KPj p.2) | 7.8% (KPd p.2) | 7.8% (KPd p.2) | 7.8% (KPm p.2) | 7.7% (KPj p.2) |
| Cost of funds (incl. shareholders' funds) | 4.9% (KPd p.2) | 4.9% (KPm p.2) | 4.8% (KPj p.2) | 4.6% (KPd p.2) | 4.5% (KPd p.2) | 4.4% (KPm p.2) | 4.4% (KPj p.2) |
| **Asset quality** |  |  |  |  |  |  |  |
| Credit cost, % of advances | 0.50% (KPd p.2) | 0.48% (KPm p.2) | 0.56% (KPj p.2) ² | 0.51% (KPd p.2) | 0.55% (KPd p.2) ³ | 0.35% (KPm p.2) | 0.40% (KPj p.2) |
| Credit cost net of recoveries | 0.36% (KPd p.2) | 0.29% (KPm p.2) | 0.41% (KPj p.2) ² | 0.37% (KPd p.2) | 0.41% (KPd p.2) ³ | 0.21% (KPm p.2) | 0.29% (KPj p.2) |
| Gross slippages, ₹ crore | n/f | n/f | n/f | 7,400 (Q3D p.18) | 8,600 (Q3D p.18) | 6,200 (Q4D p.18) | 8,000 (Q1D p.18) |
| GNPA, % of gross advances | 1.42% (KPd p.2) | 1.33% (KPm p.2) | 1.40% (KPj p.2) | 1.24% (KPd p.2) | 1.24% (KPd p.2) | 1.15% (KPm p.2) | 1.17% (KPj p.2) |
| NNPA, % of net advances | 0.46% (DC p.2) ᵇ | 0.43% (AR25 p.380) | 0.47% (DC p.2) ᵇ | 0.42% (DC p.2) ᵇ | 0.42% (AX p.1) ᵇ | 0.38% (AR26 p.425) | 0.4% (Q1D p.17) |
| Specific PCR | 68% (KPd p.2) | 68% (KPm p.2) | 67% (KPj p.2) | 67% (KPd p.2) | 66% (KPd p.2) | 67% (KPm p.2) | 66% (KPj p.2) |
| Total provisions ÷ GNPA | 169% (KPd p.2) | 172% (KPm p.2) | 194% (KPj p.2) | 211% (KPd p.2) | 204% (KPd p.2) | 210% (KPm p.2) | 202% (KPj p.2) |
| **Returns and capital** |  |  |  |  |  |  |  |
| RoA (annualised) | n/f | n/f | n/f | n/f | 1.92% (Q3D p.2) | 1.96% (Q4D p.2) | 1.85% (Q1D p.2) |
| RoE (annualised) | n/f | n/f | n/f | n/f | 13.9% (Q3D p.2) | 14.1% (Q4D p.2) | 13.8% (Q1D p.2) |
| CRAR | 20.0% (Q4D p.6) | 19.6% (Q1D p.6) | 19.9% (Q1D p.6) | 20.0% (Q1D p.6) | 19.9% (Q3D p.3) | 19.7% (Q4D p.3) | 19.6% (Q1D p.3) |
| Tier 1 | 18.0% (Q4D p.6) | 17.7% (Q1D p.6) | 17.8% (Q1D p.6) | 17.9% (Q1D p.6) | 17.8% (Q1D p.6) | 17.7% (Q1D p.6) | 17.8% (Q1D p.6) |
| CET1 | n/f | 17.23% (AR25 p.359) | n/f | n/f | 17.4% (Q3D p.3) | 17.3% (Q4D p.3) | 17.4% (Q1D p.3) |
| Core cost-to-income | 40.6% (Q4D p.16) | 39.8% (Q1D p.16) | 39.6% (Q1D p.16) ⁴ | 39.2% (Q1D p.16) | 39.2% (Q1D p.16) ⁵ | 39.9% (Q1D p.16) | 39.2% (Q1D p.16) |
| **P&L, ₹ crore** |  |  |  |  |  |  |  |
| Net interest income (NII) | 30,650 (Q3D p.4) | 32,070 (Q4D p.4) | 31,440 (Q1D p.4) | 31,550 (Q3D p.4) | 32,620 (Q4D p.4) | 33,080 (Q1D p.4) | 33,530 (Q1D p.4) |
| NII, YoY | 8% (Q4D p.13) | 10% (Q1D p.13) | 5% (Q1D p.13) | 5% (Q1D p.13) | 6.4% (Q3D p.4) | 3.2% (Q4D p.4) | 6.7% (Q1D p.4) |
| Other (non-interest) income | 11,450 (Q3D p.4) | 12,030 (Q4D p.4) | 21,730 (Q1D p.4) ⁶ | 14,350 (Q3D p.4) | 13,250 (Q4D p.4) | 13,200 (Q1D p.4) | 12,820 (Q1D p.4) |
| Operating expenses | 17,110 (Q3D p.4) | 17,560 (Q4D p.4) | 17,430 (Q1D p.4) | 17,980 (Q3D p.4) | 18,770 (Q4D p.4) ⁷ | 18,480 (Q1D p.4) | 18,190 (Q1D p.4) |
| PPOP = net revenue − opex | 24,990 (computed) | 26,540 (computed) | 35,740 (computed) ⁶ | 27,920 (computed) | 27,100 (computed) ⁷ | 27,800 (computed) | 28,170 (computed) |
| Provisions | 3,150 (Q3D p.4) | 3,190 (Q4D p.4) | 14,440 (Q1D p.4) ⁸ | 3,500 (Q3D p.4) | 2,840 (Q4D p.4) | 2,610 (Q1D p.4) | 3,060 (Q1D p.4) |
| Profit after tax, reported | 16,740 (Q3D p.4) | 17,620 (Q4D p.4) | 18,160 (Q1D p.4) | 18,640 (Q3D p.4) | 18,650 (Q4D p.4) | 19,220 (Q1D p.4) | 19,060 (Q1D p.4) |
| PAT, YoY | 2% (Q4D p.20) | 7% (Q1D p.20) | 12% (Q1D p.20) | 11% (Q1D p.20) | 11.5% (Q3D p.4) | 9.1% (Q4D p.4) | 5.0% (Q1D p.4) |
| **Franchise** |  |  |  |  |  |  |  |
| Employees, period-end | 2,10,219 (KPd p.2) | 2,14,521 (KPm p.2) | 2,18,822 (KPj p.2) | 2,20,339 (KPd p.2) | 2,15,739 (KPd p.2) | 2,11,178 (KPm p.2) | 2,12,958 (KPj p.2) |
| Branches, period-end | 9,143 (Q4D p.11) | 9,455 (Q1D p.11) | 9,499 (Q1D p.11) | 9,545 (Q1D p.11) | 9,616 (Q1D p.11) | 9,689 (Q1D p.11) | 9,694 (Q1D p.11) |

Notes. ¹ Q4 FY25 yield is 8.4% as reported (KPm p.2; Q1D p.14); the Q3D and Q4D decks show **8.3%
excluding ₹700 crore (₹7 bn) of interest on an income-tax refund** (Q3D p.14, Q4D p.14 footnote) — the
Q1 FY27 deck drops the footnote and shows 8.4%. ² Q1 FY26 credit cost excludes the ₹9,000 crore
floating and ₹1,700 crore contingent provisions (KPj p.2 note). ³ Q3 FY26 excludes the release of a
provision on a large borrower group (KPd p.2). ⁴ Q1 FY26 core cost-to-income excludes the HDB
transaction gain; including it, 32.8% (Q1D p.16). ⁵ Q3 FY26 excludes the labour-code
employee-benefit charge. ⁶ Q1 FY26 other income and PPOP include the ₹9,130 crore (₹91.3 bn) HDB
Financial Services IPO transaction gain (KPj p.2 footnote). ⁷ Q3 FY26 opex as restated in Q4D p.4
includes the 800 (Q3D p.4) labour-code charge; Q3D p.4 shows opex of
17,970 (Q3D p.4) and the charge on a separate "Provisions – EB under NLC" line. PPOP ex the
charge would be 27,900. ⁸ Q1 FY26 provisions include the ₹9,000 crore floating and ₹1,700 crore
contingent provisions funded by the HDB gain (Q1D p.19 footnote). ᵇ broker-printed: Q3 FY25, Q1 FY26
and Q2 FY26 NNPA come from a DevenChoksey chart labelled "Source: Company" (DC p.2), whose last bar
(0.40% for Q4 FY26) disagrees with the bank's 0.38% and with DC's own text; the bank's charts print
one decimal: 0.5% (Q3D p.17) for Q3 FY25, 0.5% (Q1D p.17) for Q1 FY26, 0.4% (Q1D p.17)
for Q2 FY26. Q3 FY26 NNPA is AxisDirect's (AX p.1).

**Cross-checks that hold.** PPOP 28,170 (computed) matches Upstox's ₹28,169 crore "operating profit"
(UP p.1) and Q1 FY26's 35,740 (computed) its ₹35,734 crore; Q4 FY26 / Q4 FY25 / Q3 FY26 PPOP match
AxisDirect's ₹278.0 / 265.4 / 271.0 bn (AX p.4). The computed LDRs for Mar-26 and Dec-25 match
AxisDirect's "C-D Ratio improved to 94.6% VS 98.7% QoQ" (AX p.1), and Mar-25's matches the bank's own
"96 per cent as on March 31, 2025" (AR25 p.33). PAT for Q1 FY27 / Q1 FY26 in crore: ₹19,060 / ₹18,155
(UP p.1).

### 1.2 Annual, FY24 / FY25 / FY26 (standalone)

Annual-report figures are ₹ crore as printed (to one decimal where the AR prints one). FY24 is the
merger year (HDFC Ltd merged on 1 Jul 2023), so FY24 growth rates are not comparable.

| Metric (standalone) | FY24 | FY25 | FY26 |
|---|---|---|---|
| Net advances, ₹ crore | 24,84,862 (AR24 p.236) | 26,19,608.6 (AR25 p.222) | 29,37,166.3 (AR26 p.273) |
| Advances growth | 55.2% (AR24 p.236) ¹ | 5.4% (AR25 p.222) | 12.1% (AR26 p.272) |
| Deposits, ₹ crore | 23,79,786 (AR24 p.236) | 27,14,714.9 (AR25 p.222) | 31,05,250.5 (AR26 p.273) |
| Deposit growth | 26.4% (AR24 p.236) ¹ | 14.1% (AR25 p.222) | 14.4% (AR26 p.272) |
| CASA ratio, year-end | 38.2% (AR24 p.242) | 34.8% (AR25 p.228) | 34.1% (AR26 p.280) |
| LDR, net advances ÷ deposits, year-end | 104.4% (computed) | 96.5% (computed) | 94.6% (computed) |
| Borrowings, ₹ crore, year-end | 6,62,153.1 (AR24 p.58) | n/f | n/f |
|  |  |  |  |
| NIM on average total assets (NII ÷ working funds) | 3.53% (AR24 p.392) ² | 3.48% (AR25 p.417) | 3.34% (AR26 p.460) |
| NIM on average interest-earning assets | 3.74% (AR24 p.392) | 3.67% (AR25 p.417) | 3.50% (AR26 p.460) |
| Interest income ÷ working funds | 8.41% (AR24 p.392) | 8.52% (AR25 p.417) | 7.98% (AR26 p.460) |
| Cost of deposits | 4.87% (AR24 p.392) | 5.21% (AR25 p.417) | 5.05% (AR26 p.460) |
| Non-interest income ÷ working funds | 1.60% (AR24 p.392) | 1.29% (AR25 p.417) | 1.62% (AR26 p.460) |
| Operating profit ÷ working funds | 3.07% (AR24 p.392) | 2.84% (AR25 p.417) | 3.07% (AR26 p.460) |
|  |  |  |  |
| GNPA, % of gross advances | 1.24% (AR24 p.355) | 1.33% (AR25 p.380) | 1.15% (AR26 p.425) |
| NNPA, % of net advances | 0.33% (AR24 p.355) | 0.43% (AR25 p.380) | 0.38% (AR26 p.425) |
| Specific PCR (ex write-offs) | 74.04% (AR24 p.355) | 67.86% (AR25 p.380) | 67.21% (AR26 p.425) |
| Floating provisions held, ₹ crore | 12,351.28 (AR24 p.355) | 12,351.28 (AR25 p.380) | 21,351.28 (AR26 p.425) |
|  |  |  |  |
| RoA (average) | 1.98% (AR24 p.392) | 1.91% (AR25 p.417) | 1.94% (AR26 p.460) |
| RoE (average) | 16.09% (AR24 p.392) | 14.56% (AR25 p.417) | 14.29% (AR26 p.460) |
| CET1 | 16.30% (AR24 p.336) | 17.23% (AR25 p.359) | 17.28% (AR26 p.403) |
| Tier 1 | 16.79% (AR24 p.336) | 17.69% (AR25 p.359) | 17.73% (AR26 p.403) |
| CRAR | 18.80% (AR24 p.336) | 19.55% (AR25 p.359) | 19.71% (AR26 p.403) |
| Cost-to-income, reported | 40.2% (AR24 p.242) | 40.5% (AR25 p.228) | 38.0% (AR26 p.69) ³ |
| Cost-to-income, ex the HDB gain | n/f | n/f | 39.9% (computed) |
|  |  |  |  |
| NII, ₹ crore | 1,08,532.5 (AR24 p.58) | 1,22,670.1 (AR25 p.228) | 1,28,686.0 (AR26 p.279) |
| Other income, ₹ crore | 49,241.0 (AR24 p.242) | 45,632.3 (AR25 p.228) | 62,532.6 (AR26 p.279) ³ |
| Net revenue, ₹ crore | 1,57,773.5 (AR24 p.58) | 1,68,302.4 (AR25 p.222) | 1,91,218.6 (AR26 p.279) |
| Operating expenses, ₹ crore | 63,386.0 (AR24 p.242) | 68,174.9 (AR25 p.228) | 72,660.3 (AR26 p.279) |
| Provisions, ₹ crore | 23,492.2 (AR24 p.242) ⁴ | 11,649.4 (AR25 p.228) | 23,389.6 (AR26 p.279) ⁴ |
| Profit after tax, ₹ crore | 60,812.3 (AR24 p.242) | 67,347.4 (AR25 p.222) | 74,671.3 (AR26 p.273) |
| Branches, year-end | 8,738 (AR24 p.52) | 9,455 (AR25 p.56) | 9,689 (AR26 p.647) |
| Employees, year-end | 2,13,527 (AR24 p.33) | 2,14,521 (KPm p.2) | 2,11,178 (AR26 p.33) |

Notes. ¹ FY24 growth includes the merger. ² **The FY24 "Core Net Interest Margin 3.53 per cent" (AR24
p.236) is NII ÷ working funds — the average-total-assets basis** (AR24 p.392 prints 3.53% for that
line and 3.74% on interest-earning assets). The AR's headline NIM every year is this total-assets
figure: FY26's 3.34% is stated as "(as percentage of average assets)" in the directors' report
(3.34% (AR26 p.279); also AR26 p.41). ³ FY26 other income includes the
9,179.4 (AR26 p.279) HDB Financial Services transaction gain, which lowers reported cost-to-income to
38.0%; ex the gain it is 39.9% (computed), and other income grew 16.9% (computed) ex
the gain (the AR prints 16.9 per cent). FY25's other income fell 7.33% only because FY24 held
7,341.42 (AR25 p.228) of HDFC Credila stake-sale gains. FY26 other income also carries
4,014.4 (AR26 p.279) of recoveries from written-off accounts. ⁴ FY24 provisions include ₹10,900
crore of floating provisions, FY26 ₹9,000 crore (AR24 p.355, AR26 p.425). The bank's own LDR for FY25:
96% (AR25 p.33). FY25 NNPA, CET1 and employees are the same entries as in §1.1 (Q4 FY25 column).

### 1.3 Results review, Q1 FY27

Standalone. P&L changes are **the bank's own printed QoQ / YoY** (Q1D p.4, ₹ bn statement); ratio
changes are in bps, computed from the printed levels (registry `hdfc.rr.*`). Levels and their pages
are in §1.1.

| Metric | Q1 FY27 | Q1 FY26 | YoY | Q4 FY26 | QoQ |
|---|---|---|---|---|---|
| Net interest income, ₹ cr | 33,530 | 31,440 | **+6.7%** | 33,080 | +1.4% |
| Non-interest income, ₹ cr | 12,820 | 21,730 ¹ | −41.0% | 13,200 | −2.9% |
| Net revenue, ₹ cr | 46,360 | 53,170 ¹ | −12.8% | 46,280 | +0.2% |
| Operating expenses, ₹ cr | 18,190 | 17,430 | +4.3% | 18,480 | **−1.6%** |
| PPOP, ₹ cr | 28,170 | 35,740 ¹ | −21.2%ᵈ | 27,800 | +1.3%ᵈ |
| Provisions, ₹ cr | 3,060 | 14,440 ² | −78.8% | 2,610 | +17.2% |
| Profit before tax, ₹ cr | 25,110 | 21,290 | +17.9% | 25,190 | −0.3% |
| **Profit after tax, ₹ cr** | **19,060** | 18,160 | **+5.0%** | 19,220 | −0.8% |
| PAT on the bank's adjusted base ³ | 19,060 | 17,370 | **+9.8%** | 19,220 | −0.8% |
| Gross advances, ₹ cr | 30,60,800 | 26,53,200 | +15.4% | 29,60,000 | +3.4% |
| Deposits, ₹ cr | 31,70,800 | 27,64,100 | +14.7% | 31,05,300 | +2.1%ᵈ |
| Total assets, ₹ cr | 43,97,500 | 39,54,100 | +11.2%ᵈ | 43,64,900 | — |
| NIM, total assets | **3.26%** | 3.4% (one decimal) | −0.1 pp at one decimal | 3.38% | **−12 bps** |
| NIM, interest-earning assets | 3.4% | 3.5% | −0.1 pp | 3.5% | −0.1 pp |
| Yield on assets / cost of funds | 7.7% / 4.4% | 8.1% / 4.8% | −40 / −40 bps | 7.8% / 4.4% | −10 / 0 bps |
| CASA ratio | 32.3% | 33.9% | −160 bps | 34.1% | **−180 bps** |
| LDR (computed) | 95.8% | 95.1% | +70 bps | 94.6% | **+120 bps** |
| GNPA | 1.17% | 1.40% | −23 bps | 1.15% | +2 bps |
| Credit cost / net of recoveries | 0.40% / 0.29% | 0.56% / 0.41% ⁴ | −16 / −12 bps | 0.35% / 0.21% | +5 / +8 bps |
| Core cost-to-income | 39.2% | 39.6% | −40 bps | 39.9% | −70 bps |
| RoA (annualised) | 1.85% | n/f | — | 1.96% | −11 bps |
| CET1 | 17.4% | n/f | — | 17.3% | +10 bps |
| Employees | 2,12,958 | 2,18,822 | −5,864ᵈ | 2,11,178 | +1,780ᵈ |

¹ Includes the ₹9,130 crore HDB Financial Services IPO gain (KPj p.2). ² Includes ₹9,000 crore of
floating and ₹1,700 crore of contingent provisions funded by that gain (Q1D p.19). ³ Q1 FY26 "adjusted
for transaction gains (HDBFS), certain provisions and tax credit" (Q1D p.4): the bank adjusts the base,
not the current quarter. ⁴ Q1 FY26 credit cost excludes the floating and contingent provisions (KPj p.2).

**Reading.** Profit grew 5.0% as reported and 9.8% on the bank's adjusted base; the HDB base effect hits
non-interest income (−41.0%) and provisions (−78.8%) at once, which is why PBT reads +17.9%. Quarter on
quarter, NII rose 1.4% on gross advances up 3.4%: that gap is the 12 bps of margin. CASA, the LDR and
credit cost moved the wrong way; operating expenses (−1.6%) did the work.

### 1.4 Bad-loan walk (gross NPAs, ₹ crore)

The decks print the walk in ₹ bn (Q3D p.18 for Q2–Q3 FY26; Q4D p.18; Q1D p.18). Each column passes the
identity *opening + slippages − upgrades & recoveries − write-offs = closing* (registry
`hdfc.walk.close_check.*`). The corpus holds no walk before Q2 FY26.

| | Q2 FY26 | Q3 FY26 | Q4 FY26 | Q1 FY27 |
|---|---|---|---|---|
| Opening GNPA | 37,000 | 34,300 | 35,200 | 34,100 |
| + Gross slippages | 7,400 | 8,600 | 6,200 | **8,000** |
| · of which agri (computed) | 1,100 | 1,900 | 800 | **1,900** |
| · ex-agri | 6,300 | 6,700 | 5,400 | 6,100 |
| − Upgrades and recoveries | 6,800 | 4,500 | 4,600 | **4,000** |
| − Write-offs | 3,300 | 3,200 | 2,700 | 2,300 |
| = Closing GNPA | 34,300 | 35,200 | 34,100 | **35,800** |
| GNPA ratio (§1.1) | 1.24% | 1.24% | 1.15% | 1.17% |

Annualised slippage ratio, Q1 FY27: **1.08%**, 0.82% ex-agri, on opening gross advances (computed).

**Reading.** v0 and the narrative (§B5) read the Q1 rise as agri, and it is: ₹1,100 crore of the
₹1,800 crore increase in slippages. The walk shows a second, quieter movement. **N4A's reading:**
upgrades and recoveries have fallen three quarters running (₹6,800 → ₹4,000 crore) and write-offs with
them, so outflows fell from ₹7,300 crore in Q4 to ₹6,300 crore in Q1 while inflows rose. The stock grew
₹1,700 crore because both moved at once. *Would be wrong if:* Q2 FY26's ₹6,800 crore held a one-off
large recovery (the deck does not say), which would make the decline a return to normal rather than a
trend.

### 1.5 Loan and deposit mix (YoY, period-end)

From the key-parameter sheets (KPd p.2 for Q3 FY25, Q2 FY26, Q3 FY26; KPm p.2 for Q4 FY25, Q4 FY26;
KPj p.2 for Q1 FY26, Q1 FY27). Advances are **under management** (AUM), the bank's segment view.

| YoY growth | Q3 FY25 | Q4 FY25 | Q1 FY26 | Q2 FY26 | Q3 FY26 | Q4 FY26 | Q1 FY27 |
|---|---|---|---|---|---|---|---|
| Retail | 10.4% | 8.9% | 8.1% | 7.4% | 6.9% | 6.5% | 7.2% |
| Small and mid-market | 16.7% | 17.4% | 17.1% | 17.0% | 17.2% | 17.2% | 18.7% |
| Corporate and other wholesale | −7.5% | −0.9% | 1.7% | 6.4% | 10.3% | 13.0% | **18.6%** |
| **AUM, total** | 6.1% | 7.7% | 8.0% | 8.9% | 9.8% | 10.2% | 12.4% |
| CASA deposits | 4.4% | 3.9% | 8.5% | 7.4% | 10.1% | 12.3% | 9.4% |
| · current accounts | 4.4% | 1.3% | 11.5% | 7.6% | 12.1% | 12.9% | 8.9% |
| · savings accounts | 4.4% | 5.3% | 7.1% | 7.3% | 9.3% | 11.9% | 9.7% |
| Term deposits | 22.7% | 20.3% | 20.6% | 14.6% | 12.3% | 15.5% | **17.4%** |
| **Deposits, total** | 15.8% | 14.1% | 16.2% | 12.1% | 11.6% | 14.4% | 14.7% |
| Retail share of deposits (quarterly average) | 83% | 83% | 82% | 83% | 83% | 82% | **80%** |
| GNPA, retail ex-agri | 0.83% | 0.80% | 0.82% | 0.77% | 0.73% | 0.69% | 0.67% |
| Total provisions, % of advances | 2.39% | 2.29% | 2.71% | 2.61% | 2.52% | 2.42% | 2.36% |

**Borrowings run-down** (₹ crore, period-end; Q3D p.5, Q4D p.5, Q1D p.5): 5,70,200 (Dec-24) → 5,47,900 →
5,10,100 → 5,09,600 → 5,21,100 → 4,89,400 → **4,61,800** (Jun-26): from 12.9% of total assets at Jun-25
to 10.5% at Jun-26 (computed; the deck rounds to 11%, Q1D p.14).

**Reading.** In six quarters corporate lending went from shrinking 7.5% to growing 18.6% while retail
slowed from 10.4% to 7.2%: the growth the bank now reports is wholesale growth, at "very thin" spreads
(CEO, Cjl26 p.4). On the funding side, term deposits outgrew CASA in every one of the seven quarters, and
the retail share of deposits fell to 80% in Q1 FY27. Retail asset quality improved throughout (GNPA ex
agri 0.83% → 0.67%).

### 1.6 Broker grid

Every broker note in the corpus predates the Q1 FY27 results. Targets and ratings as printed; the
method column is what reconciles them (D13 #3).

| Broker | Date | Rating | Target | Price when written | Upside stated | Method | Basis | Change |
|---|---|---|---|---|---|---|---|---|
| AxisDirect | 20 Apr 2026 (AX p.1) | BUY, maintained | **₹975** (AX p.1) | ₹800, as of 17 Apr (AX p.1) | 22% (AX p.3) | SOTP: bank at 1.9× FY28E adjusted book = ₹844, + subsidiaries ₹161 less a 20% holdco discount = ₹129 (AX p.3) | standalone book + subsidiary stack | from ₹1,020 at 2.1× Sep-27E book (AX p.1) |
| DevenChoksey | 22 Apr 2026 (DC p.1) | BUY, reiterated | **₹1,011** (DC p.1) | ₹812 (DC p.1) | ~25% (DC p.1) | SOTP: bank at 2.0× FY28E adjusted book = ₹901, + subsidiaries ₹110 net of a 15% holdco discount (DC p.1) | standalone book + subsidiary stack | no prior target printed |
| Geojit | 22 Apr 2026 (GJ p.1) | **BUY, upgraded from HOLD** | **₹896** (GJ p.1) | ₹799 (GJ p.1) | +12% (GJ p.1) | 1.9× FY28E book value per share (GJ p.1) | **consolidated** (GJ p.1) | from HOLD ₹1,022 on 10 Feb 2026; last BUY ₹1,096 on 6 May 2025 (GJ p.4) |

**After Q1 FY27** (via Upstox, 20 Jul 2026, UP p.2): Nomura values the bank at 1.9× FY28E book value per
share (no target in the article) and calls the quarter "broadly in line with expectations"; Jefferies
"in line with estimates"; Bernstein "another steady quarter"; Investec "weak". No post-Q1 note is in the
corpus.

**Reconciliation.**
- **AxisDirect's components sum to ₹973** (844 + 129, computed), ₹2 short of its stated ₹975 target. v0
  and `ANALYST-USER.md` §3 wrote "₹847 + ₹128": both numbers were wrong. DevenChoksey's sum matches its
  target (901 + 110 = 1,011).
- The ₹896–1,011 spread is mostly method: the core multiple (1.9× vs 2.0×), the holdco discount (20% vs
  15%), and Geojit valuing **consolidated** book, which already contains the subsidiaries, at the same
  1.9× AxisDirect applies to the standalone bank alone. DevenChoksey does not print its subsidiary value
  before the discount; ₹110 at 15% implies ≈₹129, against AxisDirect's ₹161 (computed).
- Geojit's FY26 profit lines are not a contradiction: ₹79,219 crore is reported profit before ₹3,193
  crore of minority interests, ₹76,026 crore after (GJ p.1, p.3).
- **Price at the demo date.** The 31 Jul 2026 close was ₹748.15 (the prototype's daily series, D15; a
  price feed, not a seed PDF, so not page-checked). Against it the April targets imply +30.3%
  (AxisDirect), +35.1% (DevenChoksey) and +19.8% (Geojit), all set before the quarter that moved the
  stock.

---

## A. What the Q1 FY27 call says (Cjl26)

**The call.** Held Saturday 18 Jul 2026, filed with the exchanges 24 Jul 2026 (Cjl26 p.1). Management:
Sashidhar Jagdishan (MD & CEO), Kaizad Bharucha (Deputy MD), Srinivasan Vaidyanathan (CFO) (Cjl26 p.2).
Eight analysts asked questions: Mahrukh Adajania (Tara Capital Partners), Pranav Gundlapalle (Bernstein),
Kunal Shah (Citigroup), Seshadri Sen (Emkay Global), Suresh Ganapathy (Macquarie), Abhishek Murarka
(HSBC), Nitin Aggarwal (Motilal Oswal), Piran Engineer (CLSA India). The CFO notes the FY26 annual
report was "just published few days ago" (Cjl26 p.12), so AR26 and the call are near-simultaneous.

### A1. NIM and margins

- **Nobody on the call says "3.26%".** The bank files NIM of 3.26% on total assets (Q1D p.3; 3.38% in
  Q4 FY26, Q4D p.3) and 3.4% on interest-earning assets (KPj p.2). The only margin level spoken aloud
  is an analyst's, on the interest-earning basis: Kunal Shah (Citi), "now we are almost down to 3.4 odd
  percent" (Cjl26 p.7).
- **Why it fell: CEO, opening remarks.** "This quarter, you may see some amount of mix change in terms
  of more non-retail shorter-term asset mix, the cost of funds moderation, these are all elements which
  I believe are just tactically being managed" (Cjl26 p.4). On pricing: "Competition has been very
  intense, both on the corporate side where the spreads continue to be very thin and we have been rather
  selective"; deposit rates "on the non-granular side, I think rates have continued to remain elevated"
  (Cjl26 p.4). No number is put on the 12 bps fall.
- **Have margins bottomed?** Asked by Mahrukh Adajania ("Do you think margins have bottomed out now?",
  Cjl26 p.4). CFO: "whether the margins have bottomed out for the year we can talk about.
  Quarter-to-quarter we cannot and we don't manage for the shorter term… on a full-year basis, we are
  well positioned with our reach and with our customer selection to be better" (Cjl26 p.5). A
  full-year hint, no level, no date.
- **The lever is cost of funds, and it is slow.** CFO: "the cost of funds is the biggest opportunity on
  the margin… there can be 40, 50 basis points change, but it is not going to change in a hurry"
  (Cjl26 p.5). "But the non-retail deposit costs have been elevated." Borrowings "have not come off yet.
  We still remain at about 11%" (Cjl26 p.5); filed: borrowings 11% of total liabilities (Q1D p.14).
- **Cost of funds this quarter.** Piran Engineer (CLSA) asked. CFO: "Sequential quarter I think it's
  almost there flat a couple of basis points" and "40 basis points or so year-to-year" (Cjl26 p.15).
  Filed: cost of funds 4.4% → 4.4% QoQ, 4.8% → 4.4% YoY; yield on assets 7.8% → 7.7% QoQ (KPj p.2).
- **Where margins settle (Kunal Shah's question).** Borrowings: "we don't expect that it will just settle
  at 8% or 9%… The industry is more like a 5% or a 6%" (CFO, Cjl26 p.8). "Cost of funds benefit will play
  out and it is very much in the works." Asset mix: "Today we are at a 52% retail mix… we were at about 60%
  or so" (CFO, Cjl26 p.8); filed: retail 52% of AUM, from 55% a year ago (Q1D p.10).
- **Borrowing run-off.** Abhishek Murarka (HSBC) asked. CFO: "INR40,000 crores or INR50,000 crores over
  the next couple of years"; borrowings cost "a little more than 7%, if you get a retail, it could be
  6%-odd. So you can pick up 100 basis points, 125 basis points" (Cjl26 p.12).
- **The CEO de-prioritises margin.** "margin will play out as we move forward. I'm sure assuming all
  things remaining same from next year there will be the base effect will wear off"; better margins
  would be "kind of a bonus" (Cjl26 p.10). Later: efficiencies are "our key strategy in terms of how we
  balance growth and efficiencies offsetting some of the margins, if at all there is in the same levels
  as we are today" (Cjl26 p.16).
- **The corporate-lending mix.** Kaizad Bharucha: corporate and wholesale "We've seen that grow at about
  18%" (Cjl26 p.13). Filed: corporate & other wholesale +18.6% YoY vs retail +7.2% (Q1D p.10).
  Jefferies (via Upstox): corporate lending "lifted loan growth to 16% YoY, but compressed NIM by 12 basis
  points sequentially" (UP p.2).
- **FCNR (B) deposits.** CEO: "the FCNR policy window that has been offered to the banking system is a
  great opportunity" (Cjl26 p.3). He declines a number: "I'm sorry I can't sort of put a number to that
  in the public domain" (Cjl26 p.8); "we just don't want to commit any number… we will be a significant
  portion of the system" (Cjl26 p.15). Mahrukh Adajania's question on how FCNR affects margins (Cjl26
  p.4–5) gets no direct answer.
- **Deposit repricing.** The call gives **no update** on how much time-deposit repricing is done (in
  January the CFO said "about two-third" of the 125 bps policy cut, Cj26 p.13). What it does give: cost
  of funds flat QoQ (above), non-retail deposit costs "elevated".

### A2. Loan-to-deposit ratio

- **The call never mentions it.** No analyst asks; no executive raises it. "LDR", "loan to deposit",
  "credit deposit" and "CD ratio" occur nowhere in Cjl26's 17 pages (searched with `pdf_pages.py
  --grep`; an absence cannot be registered in the figure checker, so it is stated here). The Q1 FY27
  deck prints no LDR line either.
- **Filed:** LDR 95.8% at Jun-26, computed from net advances ₹30,37,300 crore ÷ deposits ₹31,70,800
  crore (Q1D p.5, ₹ bn), up from 94.6% at Mar-26. In the quarter net advances rose ₹1,00,100 crore
  against deposits ₹65,500 crore: an incremental LDR of ~153% (Q1D p.5).
- **The FY27 85–90% target is neither restated nor withdrawn. It went unasked.** Last on the record
  from management in the corpus: the CEO in January, "we should land somewhere around the 85% to 90% for
  FY '27" and then "somewhere around the 90% is something that we'll be happy with" (Cj26 p.6, p.8); in
  April, AxisDirect reports "Management indicated that hereon LDR will not be a binding constraint" (AX
  p.2, from the Q4 FY26 call, which is not in the corpus).

### A3. FY27 loan growth versus the system

- **Asked directly, no number and no "above system".** Nitin Aggarwal (Motilal Oswal): "We earlier talked
  about that we'll want to grow higher than the system, but I believe with the system in a different
  tangent… So any number if you can share or growth estimate outlook that we are targeting at" (Cjl26
  p.13). Kaizad Bharucha answers with segments: corporate and wholesale "about 18%" (p.13); business
  banking "grow at 22.3% this year"; ECLGS 5.0 disbursements of "close to INR14,000 crores" by 30 June;
  mortgage disbursements up "close to 14%"; wheels and unsecured disbursements "about 20% odd"; and a
  caveat, El Niño's impact "plays out in the third quarter of the financial year" (Cjl26 p.14). The
  January promise, "a couple of hundred basis points over system growth next year" (Kaizad Bharucha,
  Cj26 p.17), is not repeated.
- **CEO's framing:** "Advances, as we had envisioned a while ago, I think we are on the verge of pressing
  the pedal" (Cjl26 p.3). (Upstox renders this as "We are at the cusp of pushing the pedal", UP p.1, not
  the transcript's words; see §D16.)
- **Retail is the laggard.** Piran Engineer: retail growth "range-bound at 7%, 8%" (Cjl26 p.15). Kaizad
  Bharucha: "we do see that certainly picking up over the next several quarters. It doesn't happen
  overnight" (Cjl26 p.16). Filed: retail +7.2%, business banking +22.3%, AUM +12.4%, gross advances
  +15.4% YoY (Q1D p.10). Cards: "the book growth on cards is 2.3% or something, while the spends growth
  at 13%" (CFO, Cjl26 p.15).

### A4. Deposits and CASA

- **Share gains claimed.** CEO: "We continue to gain market share both on an incremental basis and on a
  stock basis as well" (Cjl26 p.3). Filed: deposits +14.7% YoY period-end, +13.3% average (Q1D p.2).
- **CASA aspiration, now stated as a level.** Seshadri Sen (Emkay) asked whether the CASA decline is
  temporary. CEO: "the endeavor and our vision is to reach to somewhere near the pre-merger levels or just
  around the time of the merger, which was around 38"; CFO: "Post the merger we at we were 38 and before
  that we were 40" (Cjl26 p.9). CEO, on timing: "maybe over the next nine months we hope to see a fair
  amount of change in the acquisition numbers and hence value" (Cjl26 p.9). Filed: CASA 32.3% at Jun-26
  (KPj p.2); 38% at Sep-23 and Mar-24 (Q1D p.14).
- **Suresh Ganapathy (Macquarie)** put CASA at "34%" with "All of your peers are at 40%" (Cjl26 p.11;
  34% is the Mar-26 figure, the Jun-26 figure is 32.3%). CFO: "can it organically go by the nominal rate
  of a 10%? Yes, it can go" (Cjl26 p.12).
- **Wholesale deposits.** Seshadri Sen: the wholesale share has "gone up from 17% to 20%" (Cjl26 p.9);
  CEO: "this quarter it could be a 20% mix in terms of deposits" (Cjl26 p.10). Filed: average retail mix
  of deposits 82% → 80% (KPj p.2).
- **Time deposits are also a target.** CFO: "only 14% of our customers have time deposits with us"
  (Cjl26 p.11). Filed: CASA +9.4% YoY vs term deposits +17.4% (KPj p.2).
- **Account quality explains slower acquisition (CEO).** Mule accounts led the bank to tighten
  acquisition "over the periods of FY24, '25 and '26… reflected in the slowdown in the new acquisitions"
  (Cjl26 p.7).
- **Branch productivity (CFO).** "INR 330 crores per branch currently", against "INR 266 crores per
  branch" in FY23 (Cjl26 p.6).

### A5. Credit cost, coverage, agri

- **Coverage: the agri mix explains the drift (CFO, to Nitin Aggarwal).** "the overall coverage that
  you see now is 66%… it was 71, now it is 66… excluding agri it is 70" (Cjl26 p.14). Filed: specific
  PCR 66%, ex-agri 70% (Q1D p.19).
- **ECL from 1 Apr 2027.** CFO: "the overall provision that we are carrying seems adequate and sufficient
  for the ECL methodology" (Cjl26 p.12); on the ongoing credit-cost effect, "I don't think there will be
  anything material, but there will be some" (Cjl26 p.13).
- **Q1 credit cost and agri seasonality are not discussed by management.** Filed: credit cost 40 bps,
  29 bps net of recoveries (KPj p.2). Investec (via Upstox) attributes the rise to "seasonal factors"
  (UP p.2–3). Risks named by management: El Niño and West Asia (CEO, Cjl26 p.4; Kaizad Bharucha, p.14).

### A6. Opex and headcount

- **No headcount number on the call.** Piran Engineer asked whether the bank is under-investing. CEO:
  "whilst investments will be slightly muted, especially in distribution for now", technology continues;
  "over the next two to three years, returns in terms of efficiencies will start to play out" (Cjl26
  p.16).
- **Filed:** opex ₹18,190 crore, −1.6% QoQ and +4.3% YoY (Q1D p.4, ₹181.9 bn); core cost-to-income
  39.2% (Q1D p.3); employees 2,12,958 at Jun-26, **up 1,780 in the quarter** from 2,11,178 but 5,864
  fewer than a year earlier (2,18,822) (KPj p.2); branches 9,694, +5 in the quarter (Q1D p.11).

### A7. HDB, earnings growth and capital

- **HDB appears only as last year's base.** Suresh Ganapathy: PAT growth "just 5%" while "Balance sheet
  growth is well upwards of 13%, 14%" (Cjl26 p.11). CFO: last year "included certain one-timers like HDB
  gains"; adjusted, "it shows 9.8% profit growth"; "in the longer term that the profit growth should be at
  or above the balance sheet growth" (Cjl26 p.11). Filed: PAT ₹19,060 crore, +5.0% reported, +9.8%
  adjusted (Q1D p.4).
- **Capital: not discussed.** Filed: CRAR 19.6%, CET1 17.4% (Q1D p.3).

### A8. Chairman, CEO reappointment, board

- **Chairman.** CEO, opening: thanks "Keki Mistry for chairing as the Interim Chairman during this
  period. I also heartily welcome our new Chairman, Rajiv Kumar"; the appointment gives "a sense of
  stability and a clear signal to minimize uncertainties" (Cjl26 p.3). **RBI approval is not mentioned
  on the call.** The annual report, published days earlier, says the board appointed him on 29 Jun 2026
  "subject to approval of RBI and shareholders respectively" (AR26 p.38).
- **CEO reappointment.** Kunal Shah: "on CEO reappointment… because it's now due" (Cjl26 p.8). Kaizad
  Bharucha: "the GNRC and Board is fully seized of the matter and that is work in progress" (Cjl26 p.8).
  No date, no decision.
- **One more whole-time director.** Mahrukh Adajania: "HDFC Bank does require one more ED, right?"
  (Cjl26 p.5). CEO: "a fair amount of action will be visible in a short time period" (Cjl26 p.5).

### A9. New numeric guidance in the call

None in the conventional sense: no NIM, loan-growth, LDR, credit-cost or opex number for FY27. The
numbers management put on record are directional and mostly untimed:

| Statement | Speaker, page | Time frame |
|---|---|---|
| Cost of funds: a "40, 50 basis points" opportunity vs history and industry, "not going to change in a hurry" | CFO, Cjl26 p.5 | none |
| Borrowings to fall from ~11% toward the industry's "5% or a 6%", not settle at "8% or 9%" | CFO, Cjl26 p.5, p.8 | none |
| Retail mix back toward ~60% (52% today) | CFO, Cjl26 p.8 | none |
| CASA back to ~38% (the merger level) | CEO and CFO, Cjl26 p.9 | none; acquisition change "over the next nine months" |
| ₹40,000–50,000 crore of borrowings maturing, 100–125 bps cheaper to replace | CFO, Cjl26 p.12 | "next couple of years" |
| ECL transition: "nothing material" | CFO, Cjl26 p.13 | from 1 Apr 2027 |
| Profit growth "at or above the balance sheet growth" | CFO, Cjl26 p.11 | "longer term" |
| Margins better "on a full-year basis" | CFO, Cjl26 p.5 | FY27, no level |
| FCNR (B): "a significant portion of the system" | CEO, Cjl26 p.15 | no number |

Explicitly declined: an FCNR number (p.8, p.15), a quarterly view on margins (p.5), a loan-growth number
(p.13–14).

---

## B. Storylines v1

Each storyline: a headline in plain analyst language, then the evidence chain. v0 storylines 1–9 are
re-checked against Cjl26; 10–13 are new.

### 1. The loan-to-deposit glide path: promised down, moving up, and no longer discussed

*Headline: The bank promised 85–90% by FY27. It is at 95.8% and rising, and on the Q1 call nobody asked.*

- **Filed.** ~110% at the merger to 96% at 31 Mar 2025 (AR25 p.33). 94.6% at Mar-26, inside the FY26
  band; 95.8% at Jun-26 (computed, Q1D p.5). Q1 FY27 incremental LDR ~153% (net advances +₹1,00,100
  crore vs deposits +₹65,500 crore, Q1D p.5).
- **Attributed (the promise, in five versions).** CFO, Apr-25: "85 to 90 is what we have operated, that
  will come into that range in FY '27" (Ca25 p.11). CFO, Jul-25: "between 85 and 90 is the range that in
  the medium term we aspire to be there" (Cjl25 p.13). CFO, Oct-25: "call it 85 to 90 or below the 90 mark"
  (Co25 p.5). CEO, Jan-26: "somewhere around the 85% to 90% for FY '27" (Cj26 p.6), two pages later
  "somewhere around the 90% is something that we'll be happy with" (Cj26 p.8); CFO the same day: "the
  90s or low 90s" over "the next 1 year to 2 years" (Cj26 p.5). AxisDirect, Apr-26: "LDR will not be a
  binding constraint" (AX p.2). Jul-26: silence (Cjl26, see A2).
- **Attributed (the market never believed it).** Chintan (Autonomous), Jan-26: consensus "expecting 13%
  loan growth and 93% LDR" (Cj26 p.8). AxisDirect models 92.8% for FY27E (AX p.6).
- **N4A's reading.** The target has softened at every restatement (FY27 → "medium term" → "around 90%" →
  "not a binding constraint") and the Q1 FY27 call dropped it from the conversation while the CEO talks
  of "pressing the pedal". Treat the 85–90% as retired unless restated. *Would be wrong if:* the FCNR (B)
  inflows the CEO expects in Jul–Sep (Cjl26 p.8; Upstox cites a 30 September deadline, UP p.1) pull the
  Sep-26 LDR back toward 90%, or management restates the band at the Q2 FY27 call.

### 2. Growth versus the system: FY25 delivered, FY26 missed, FY27 no longer promised aloud

*Headline: The bank said "in line with the system" for FY26. The system grew 14.1%; HDFC's advances grew
12.1%. Asked for FY27, it gave segments, not a number.*

- **Attributed (the promise).** CEO, Jan-25: "FY '25 will be lesser than the system. FY '26 will be in line
  with the system. FY '27 will be faster than the system" (Cj25 p.10); repeated by the CEO in Jul-25
  (Cjl25 p.3) and Jan-26 (Cj26 p.4) and by the CFO in Oct-25 (Co25 p.5). Deputy MD, Jan-26: system 12–13% in FY27 and HDFC "a couple of hundred
  basis points over system growth next year" (Cj26 p.17).
- **Filed.** FY25: advances +5.4% (AR26 p.41) vs system credit +11.0% (AR25 p.33): delivered as promised.
  FY26: advances +12.1% (AR26 p.41) vs system credit +14.1% (AR26 p.40): **missed**. The MD's letter
  compares only deposits with the system ("Deposit growth rate at 14.4 per cent has been faster than that
  of the system again", AR26 p.41; system deposits +11.5%, AR26 p.40). Q1 FY27: AUM +12.4%, gross advances
  +15.4% period-end (Q1D p.10).
- **Attributed.** AxisDirect, Apr-26: "the recent uptick in systemic credit growth to ~16% YoY tempers its
  relative outperformance" (AX p.1). Jul-26: Nitin Aggarwal asked for "any number"; none was given
  (Cjl26 p.13–14).
- **N4A's reading.** The FY27 "faster than the system" line has quietly gone the way of the LDR target:
  with system credit running near 16% (AxisDirect's figure), 12–15% is no longer "above system", and
  management did not repeat the claim. *Would be wrong if:* a system credit-growth figure for Q1 FY27 (not
  in the corpus) is below HDFC's 15.4% gross-advances growth, or management restates the claim later.

### 3. Margin: the recovery that was promised did not arrive, and management has stopped promising it

*Headline: In October the CEO promised a deposit-repricing tailwind "over the next 6 to 12 months". Nine
months later NIM is 3.26% (Investec: "the lowest level since the merger"), and the CFO says the lever is
"not going to change in a hurry".*

- **Attributed (the promise).** Jul-25: asked whether Q2 FY26 would be the trough, the SEVP Finance said
  "logically, yes" but "We do not want to give guidance of any form or manner"; the CEO expected "a little
  bit of a trough in the coming months" (Cjl25 p.16). Oct-25, CEO: "We should see over the next 6 to 12
  months the deposit repricing having some amount of tailwind effect in the NIMs" (Co25 p.3); CFO: the
  time-deposit rate change of "between 70 and 80 basis points" "takes almost six quarters to flow in"
  (Co25 p.5). Jan-26, CFO: "about two-third" of the 125 bps policy cut passed on, "almost 5 quarters to
  flow in" (Cj26 p.13).
- **Filed.** NIM on total assets 3.35% (Q3 FY26, Q3D p.3) → 3.38% (Q4 FY26, Q4D p.3) → **3.26%** (Q1 FY27,
  Q1D p.3), −12 bps QoQ. Cost of funds flat QoQ at 4.4%; yield 7.8% → 7.7% (KPj p.2). FY26 NIM 3.34% on
  average assets (AR26 p.41).
- **Attributed (Jul-26).** CEO: the mix shift to "more non-retail shorter-term asset mix" is "tactically
  being managed"; corporate spreads "very thin" (Cjl26 p.4). CFO: a 40–50 bps cost-of-funds opportunity
  "not going to change in a hurry"; margins judged "for the year", not the quarter (Cjl26 p.5). CEO: margin
  "will play out"; better margins would be "kind of a bonus" (Cjl26 p.10).
- **N4A's reading.** With cost of funds flat and yield down 10 bps (one-decimal prints), the Q1 fall came
  from the asset side (the corporate mix), not from funding: the repricing tailwind did not reverse, it
  stalled. The 6–12 month window opened in April 2026 and the first quarter inside it went the wrong way.
  Management's language has moved from a dated tailwind (Oct-25) to an undated "journey" (Jul-26). The
  CEO's "from next year there will be the base effect will wear off" (Cjl26 p.10) does not say which base;
  we do not read it as guidance. *Would be wrong if:* two-decimal yield and cost-of-funds figures (the
  corpus prints one decimal) split the 12 bps differently, or Q2 FY27 NIM recovers above 3.38%.

### 4. Costs are carrying RoA, but headcount has turned up

*Headline: "Despite the lower NIMs, the return on assets continued to be stable at 1.9 per cent mainly due
to cost efficiencies." The bank's own sentence. The question for FY27 is whether cost can keep doing it.*

- **Filed.** AR26 p.41 (the sentence above). Opex −1.6% QoQ, +4.3% YoY (Q1D p.4); core cost-to-income
  39.2% (Q1D p.3); RoA 1.85% (Q1D p.2). Employees 2,18,822 (Jun-25) → 2,11,178 (Mar-26) → 2,12,958
  (Jun-26): down 5,864 YoY, **up 1,780 QoQ** (KPj p.2). Branches +5 in the quarter (Q1D p.11). RoE 16.1%
  (FY24, the first post-merger year) → 14.6% → 14.3% → 13.8% (Q1 FY27) (Q1D p.29; the deck warns pre-merger
  periods "are not comparable").
- **Attributed.** CEO, Jul-26: distribution investment "slightly muted… for now"; efficiencies to "play
  out" over "two to three years"; "offsetting some of the margins" (Cjl26 p.16).
- **N4A's reading.** v0 read the headcount as falling; the latest quarter reverses that. RoA held because
  opex and credit cost both fell while margin compressed; if FCNR mobilisation and "pressing the pedal"
  bring hiring back, the offset narrows. *Would be wrong if:* the Q1 headcount rise is seasonal (campus
  intake, for instance; the corpus does not say) and reverses in Q2.

### 5. Asset quality is clean; agri is the seasonal swing, and the Q1 slippage rise was mostly agri

*Headline: Slippages rose by ₹1,800 crore in the quarter. ₹1,100 crore of that was agri.*

- **Filed.** GNPA 1.17%, 0.91% ex-agri (Q1D p.2). Slippages ₹80 bn in Q1 FY27 (ex-agri ₹61 bn) vs ₹62 bn
  in Q4 FY26 (ex-agri ₹54 bn) (Q1D p.18): agri slippages ₹19 bn vs ₹8 bn. Agri ~4% of AUM (₹1,241 bn of
  ₹31,272 bn, KPj p.1). Credit cost 40 bps, from 35 bps (KPj p.2). Provisions ₹724 bn, of which floating
  ₹214 bn and contingent ₹156 bn (Q1D p.19). Specific PCR 66%, 70% ex-agri (Q1D p.19).
- **Attributed.** CFO, Jan-26: an RBI inspection required "about 5 billion or so" of agri provisions,
  "subsumed in December" (Cj26 p.5). CFO, Jul-26: the PCR drift is the agri mix, "excluding agri it is 70"
  (Cjl26 p.14); ECL provisions "adequate and sufficient" (Cjl26 p.12). Investec: credit cost rose on
  "seasonal factors" (UP p.2–3).
- **N4A's reading.** The quarter's slippage increase is overwhelmingly agri (₹11 bn of ₹18 bn), which fits
  the seasonal pattern management describes; ex-agri slippages rose ₹7 bn. *Would be wrong if:* the
  ex-agri figures on Q1D p.18 measure something other than slippages (we read them from the chart labels,
  confirmed on the rendered page).

### 6. The HDB IPO breaks the comparison base, and the basis decides the headline

*Headline: Profit grew 5.0% standalone, 9.8% adjusted, 18.4% consolidated. All three are filed. Only one
of them is like-for-like.*

- **Filed.** HDB listed 2 Jul 2025 (Cjl25 p.4; AR26 p.37). Transaction gain ₹91.3 bn standalone (KPj p.2)
  and ₹69.49 bn consolidated (Q1D p.27); Q1 FY26 also carried floating provisions of ₹90 bn and contingent
  ₹17 bn (KPj p.2). Q1 FY27 PAT ₹19,060 crore: +5.0% reported, +9.8% adjusted (Q1D p.4); consolidated
  profit +18.4% (Q1D p.27). Non-interest income −41.0% (Q1D p.4); net revenue −13% reported, +5% excluding
  the prior-year gain (Q1D p.12). HDB in Q1 FY27: loan book ₹1,218 bn (+11.4%), gross stage 3 2.34%,
  PAT ₹7.9 bn (+38%) (Q1D p.22).
- **Attributed.** CFO, Jul-26: last year "included certain one-timers like HDB gains"; adjusted "9.8%"
  (Cjl26 p.11).
- **N4A's reading.** The two bases book the HDB gain differently (₹91.3 bn standalone; ₹69.49 bn
  consolidated, after a deduction transferred to minority interest, Q1D p.27), so standalone +5.0% and
  consolidated +18.4% are not comparable with each other, and the bank adjusts only the standalone figure
  (+9.8%). Quote the adjusted standalone growth, with the adjustment shown. *Would be wrong if:* a filing
  outside the corpus publishes an adjusted consolidated growth rate.

### 7. The governance arc: closed on the chairman's charge, open on both top seats

*Headline: The law firms found the resignation letter's charge "not substantiated". The new chairman
awaits RBI approval in the filings, and the CEO's term ends on 26 October 2026 with no decision on record.*

- **Filed.** Chairman Atanu Chakraborty resigned with effect from 18 Mar 2026; the board appointed external
  law firms, domestic and international (AR26 p.37, p.41). Findings received 26 Jun 2026: his statement
  "and its implications were not substantiated by the record reviewed and witness interviews" (AR26 p.42).
  Keki Mistry interim from 19 Mar 2026, extended "until September 18, 2026 or till appointment of a regular
  Part-time Chairman, whichever is earlier" (AR26 p.315). Board meeting 29 Jun 2026 appointed Rajiv Kumar
  "subject to approval of RBI and shareholders respectively" (AR26 p.38); independent director from 30 Jun
  2026 (AR26 p.4); his chairmanship runs from "the date as may be approved by RBI" (AR26 p.18). The CEO's
  current term runs "from October 27, 2023 up to October 26, 2026" (AR24 p.512). Executive Director
  Bhavesh Zaveri retired 18 Apr 2026; Deputy MD Kaizad Bharucha reappointed to 18 Apr 2029 (AR26 p.340).
- **Attributed.** Interim chairman, 19 Mar 2026: "there are no material matters at this point of time"
  (GOV p.2). Renu Karnad: "that was a bit baffling" (GOV p.7). Kunal Shah: CEO reappointment "due in next 7
  months" (GOV p.3); Keki Mistry: "There is still time to do that" (GOV p.4). Jul-26: CEO "heartily
  welcome[s] our new Chairman, Rajiv Kumar" (Cjl26 p.3); Deputy MD: the CEO reappointment is "work in
  progress" (Cjl26 p.8). AxisDirect: CEO succession "a key monitorable" (AX p.1).
- **N4A's reading.** The CEO speaks of Rajiv Kumar as chairman; the annual report filed eight days before
  the call (10 Jul 2026, AR26 p.1) still says "subject to approval of RBI". The corpus holds no RBI approval,
  so the demo must say "proposed chairman, RBI approval pending in the filings". The CEO's term ends
  26 Oct 2026 and the reappointment goes to the RBI (Kunal Shah asks whether it "has it been already applied
  to RBI", Cjl26 p.8); at the call, three months before the term ends, the board had not concluded. *Would be wrong if:* an RBI approval was announced between 10 and 18 Jul
  2026 in a filing outside the corpus.

### 8. The Q1 FY27 selloff, and now the call that preceded it

*Headline: The stock fell as much as 5.41% on the Monday. The Saturday call had already told investors
there would be no margin number, no growth number and no LDR.*

- **Filed / attributed.** Results and call Saturday 18 Jul 2026 (Q1D p.1; Cjl26 p.1). Monday 20 Jul: the
  share "tumbled as much as 5.41% to ₹777.50" (UP p.1; the headline says 5.5%). Investec "weak"; Nomura
  "broadly in line with expectations"; Jefferies "in line with estimates" (UP p.2). All three broker
  notes predate Q1: AxisDirect 20 Apr 2026, BUY ₹975 at ₹800 (AX p.1); DevenChoksey 22 Apr 2026, BUY
  ₹1,011 at ₹812 (DC p.1); Geojit 22 Apr 2026, BUY ₹896 at ₹799 (GJ p.1).
- **N4A's reading.** v0 said "nothing records management's answer on margins". The call now does, and the
  answer is a refusal to quantify (A1, A9). A market that sold off on a 5% profit print heard management
  decline to put numbers on margin, growth or FCNR. *Would be wrong if:* the selloff traced to something
  outside the corpus (the article attributes it to the results).

### 9. Surprises and absences (updated)

- **Filed.** The "BNP Paribas" file is a Geojit note (GJ p.1, geojit.com; D8). HDFC Life stake 50.21% →
  50.54% and investment ₹56 bn → ₹66 bn in one quarter (Q4D p.21 → Q1D p.21); neither the deck nor the call
  explains it. Top-20 borrower exposure 9.4% → 10.2% of total exposure in the quarter (Q1D p.33), the
  highest in the six quarters shown.
- **N4A's reading.** The concentration rise fits the corporate-lending mix shift (storyline 3). *Would be
  wrong if:* the rise reflects a single large exposure unrelated to the growth push (the deck does not say).
- **Removed from v0.** "AR24 contradicts itself on one page (core NIM 3.53% and 3.4%; Tier-1 16.8% and
  16.3%)": AR24 p.236 prints core NIM 3.53% and Tier 1 16.8% only (text layer and rendered page checked).
  See §G.

### 10. NEW. Growth over the glide path: the bank has chosen to grow, and is funding it at the margin

*Headline: "Pressing the pedal" with loans growing faster than deposits, corporate lending at 18.6%, and
wholesale deposits back to a fifth of the book. The LDR is the price.*

- **Filed.** Corporate & wholesale +18.6%, retail +7.2% (Q1D p.10). Incremental LDR ~153% (Q1D p.5).
  Average retail share of deposits 82% → 80% (KPj p.2). Term deposits +17.4% vs CASA +9.4% (KPj p.2).
- **Attributed.** CEO: "on the verge of pressing the pedal" (Cjl26 p.3); "this quarter it could be a 20% mix
  in terms of deposits" (Cjl26 p.10); FCNR "a great opportunity" (Cjl26 p.3). CEO, Jan-26: "we don't think
  that we shall be constrained by the CD ratio" (Cj26 p.4).
- **N4A's reading.** The FY27 strategy on the record is growth first, margin and LDR as outcomes. FCNR (B)
  deposits are term deposits: they help the LDR and hurt the CASA ratio. *Would be wrong if:* H1 FY27
  shows CASA outgrowing term deposits while loan growth holds above 15%.

### 11. NEW. Profit is growing slower than the balance sheet, and the CFO concedes it

*Headline: The balance sheet is 11.2% bigger than a year ago; like-for-like profit is 9.8% higher and
like-for-like revenue 5%. That gap is not cost or credit. It is margin.*

- **Filed.** Total assets +11.2% YoY (₹39,541 bn → ₹43,975 bn, Q1D p.5). NII +6.7% YoY (Q1D p.4). Net
  revenue +5% YoY excluding the prior-year gain (Q1D p.12). Opex +4.3% YoY (Q1D p.4). Adjusted PAT +9.8%
  (Q1D p.4).
- **Attributed.** Suresh Ganapathy: "Balance sheet growth is well upwards of 13%, 14%" (Cjl26 p.11). CFO:
  "9.8% profit growth is still lower than the overall balance sheet growth"; "in the longer term… at or
  above the balance sheet growth" (Cjl26 p.11).
- **N4A's reading.** Revenue (NII +6.7%, net revenue +5% like-for-like) lags assets (+11.2%); opex (+4.3%)
  and credit cost help, so the gap is the margin. *Would be wrong if:* fee income ex one-offs (Q1D p.15
  footnotes give other income ex-gain at +2%) is the larger drag; the two together are the revenue line.

### 12. NEW. CASA now has a number: back to 38%, from 32.3%

*Headline: For the first time on a call, the CEO names the CASA target: the merger-time 38%. It is 32.3%
and the quarter's funding mix pushes it lower.*

- **Filed.** CASA 38% (Sep-23, Mar-24) → 34.1% (Mar-26) → 32.3% (Jun-26) (Q1D p.14; KPj p.2). EOP CASA
  fell ₹0.35 tn QoQ (Q1D p.2).
- **Attributed.** CEO: "around 38"; CFO: "Post the merger we at we were 38 and before that we were 40"
  (Cjl26 p.9); CEO, timing: acquisition change "over the next nine months" (Cjl26 p.9); CFO: CASA can grow
  at "the nominal rate of a 10%" (Cjl26 p.12). Suresh Ganapathy: "All of your peers are at 40%" (Cjl26 p.11).
- **N4A's reading.** With term deposits growing 17.4% and FCNR (term) deposits about to be mobilised, the
  ratio is likelier to fall than rise in FY27; the 38% is a multi-year aspiration with no date. *Would be
  wrong if:* CASA growth exceeds term-deposit growth in Q2 FY27.

### 13. NEW. Expected-credit-loss rules from April 2027: management says the buffer covers it

*Headline: ECL arrives on 1 April 2027. The CFO says the transition is covered and the ongoing cost is
"nothing material". The buffer he points to is ₹37,000 crore of floating and contingent provisions.*

- **Filed.** Floating ₹214 bn + contingent ₹156 bn = ₹370 bn (₹37,000 crore) of the ₹724 bn stock
  (Q1D p.19).
- **Attributed.** CFO: ECL "going to kick in in 1st of April'27"; provisions "adequate and sufficient";
  floors of 1% (unsecured stage 1) and 5% (stage 2) against ~40 bps on standard assets today; ongoing impact
  "nothing material" (Cjl26 p.12–13). DevenChoksey: "a 125 bps contingency provisioning buffer" (DC p.1).
- **N4A's reading.** The claim is plausible on the size of the buffer but unquantified: management gave no
  day-one number. *Would be wrong if:* the final RBI floors (not in the corpus) apply to a larger stage-2
  pool than the contingent provision covers.

---

## C. Guidance ledger v1: said vs did

Management's statements only; a broker's paraphrase of management is marked *via*, and a broker's own
expectation is not guidance (v0 listed DevenChoksey's "credit cost ~35–45 bps; cost-to-income below
40%" here: both are DevenChoksey's views, DC p.4). Outcomes as at the demo date, 31 Jul 2026.

| What was said | Who, where | Target | Outcome | Verdict |
|---|---|---|---|---|
| "FY '25 will be lesser than the system. FY '26 will be in line with the system. FY '27 will be faster than the system" | CEO, Cj25 p.10; repeated Cjl25 p.3, Co25 p.5 (CFO), Cj26 p.4 | FY25 · FY26 · FY27 | FY25 advances +5.4% vs system +11.0% (AR26 p.41; AR25 p.33). FY26 +12.1% vs system +14.1% (AR26 p.41, p.40). FY27: asked for "any number", management gave segments (Cjl26 p.13–14); gross advances +15.4% in Q1 (Q1D p.10) vs a system "~16%" (AX p.1) | FY25 **met** · FY26 **missed** · FY27 **not repeated** |
| FY27 growth "a couple of hundred basis points over system growth", system 12–13% | Deputy MD, Cj26 p.17 | FY27 | not restated on Cjl26 | **open, unrestated** |
| LDR "between 90% to 96% in the year FY '26", then "85% to 90% for FY '27" | CEO, Cj26 p.6 (softened on p.8 to "around the 90%"); CFO "85 to 90… in FY '27", Ca25 p.11 | Mar-26 · Mar-27 | 94.6% at Mar-26; **95.8%** at Jun-26, incremental ~153% (Q1D p.5, computed). "LDR will not be a binding constraint" (via AX p.2). Not raised on Cjl26 by anyone (§A2) | FY26 **met** · FY27 **moving away, unasked** |
| NIM trough in Q2 FY26, then deposit repricing a tailwind "over the next 6 to 12 months" | CEO, Cjl25 p.16; Co25 p.3 | to ~Oct-26 | 3.35% → 3.38% → **3.26%** (Q3D, Q4D, Q1D p.3); CFO Jul-26: the cost-of-funds lever is "not going to change in a hurry" (Cjl26 p.5) | **against the guidance so far**; now undated |
| Deposit repricing "about two-third" of the 125 bps cut done | CFO, Cj26 p.13 | — | no update on Cjl26; cost of funds flat QoQ at 4.4% (KPj p.2) | **unknown** |
| Legacy borrowings run down, "0.5 trillion or thereabouts" maturing | CFO, Ca25 p.14; "about 13%" of the balance sheet, Cj26 p.13 | ongoing | ₹5,10,100 cr (Jun-25) → ₹4,61,800 cr (Jun-26), 12.9% → 10.5% of total assets (Q1D p.5, computed); CFO "We still remain at about 11%" (Cjl26 p.5); next: "INR40,000 crores or INR50,000 crores over the next couple of years" (Cjl26 p.12) | **on track, slow** |
| Branch additions well below "500 to 700 branches annual" | CFO, Cj26 p.14 | FY27 | +234 in FY26, +5 in Q1 FY27 (Q1D p.11) | **met** |
| No material LCR impact from the April 2026 rules | CFO, Cj26 p.12 (LCR 116 in Q3 FY26) | Apr-26 | average LCR 116% → 114% → 115% (Q1D p.6) | **met** |
| MSME growth 18–20% | via AX p.1 (reporting the Q4 call, not in the corpus) | FY27 | small and mid-market +18.7%, business banking +22.3% (KPj p.2; Q1D p.10) | **met so far** |
| Deposit market share gains of 30–50 bps a year | via AX p.2 | annual | FY26 deposits +14.4% vs system +11.5% (AR26 p.41, p.40); "We continue to gain market share" (CEO, Cjl26 p.3) | **met** |
| Capital "for about three to four years of growth" from FY27 | CFO, Co25 p.6 | FY27+ | CET1 17.4% (Q1D p.3) | **open** |
| A new chairman within three months | interim chairman, GOV p.9 | Jun-26 | Rajiv Kumar appointed 29 Jun 2026 "subject to approval of RBI and shareholders respectively" (AR26 p.38); welcomed as chairman by the CEO (Cjl26 p.3) | **met by the board; RBI approval not in the corpus** |
| CEO reappointment "due in next 7 months" | analyst, GOV p.3; "There is still time to do that" (GOV p.4) | term ends 26 Oct 2026 (AR24 p.512) | "work in progress" (Deputy MD, Cjl26 p.8) | **open, three months before term end** |
| **New on Cjl26:** CASA back to "around 38" | CEO and CFO, Cjl26 p.9 | no date ("over the next nine months" for acquisition) | 32.3% (KPj p.2) | new |
| **New:** profit growth "at or above the balance sheet growth" | CFO, Cjl26 p.11 | "longer term" | adjusted PAT +9.8% vs total assets +11.2% (Q1D p.4, p.5) | new; behind |
| **New:** margins better "on a full-year basis" | CFO, Cjl26 p.5 | FY27 | 3.26% in Q1 | new |
| **New:** ECL from 1 Apr 2027, "nothing material" | CFO, Cjl26 p.12–13 | Apr-27 | buffer of floating + contingent provisions ₹37,000 cr (Q1D p.19) | new |

**Read-across. N4A's reading:** the bank delivered what it controls (costs, branches, asset quality,
deposit share, liquidity) and has missed or stopped promising what the market sets (margin, growth
against the system, the LDR glide path). On the Q1 FY27 call no new numeric target replaced the dropped
ones; the new statements (§A9) are directional and undated. *Would be wrong if:* the Q2 FY27 call
restates the LDR band or the "faster than system" line with a number.

## D. Contested points v1 (both sides, with source authority)

Conflicts are shown, not adjudicated (invariant 9). Status: **open** · **settled** (the corpus resolves
it) · **basis** (both are right on different bases).

| # | Point | One side | Other side | Status |
|---|---|---|---|---|
| D1 | How much deposit repricing is done | CFO, Oct-25: time-deposit rates down "between 70 and 80 basis points" (Co25 p.5); CFO, Jan-26: "about two-third" of 125 bps (Cj26 p.13) | DevenChoksey: "only ~40–50 bps vs 125 bps rate cuts on assets" (DC p.1) | **open**; no update on Cjl26 |
| D2 | Where NIM goes | DevenChoksey: "a NIM expansion from 3.38% to ~3.55%" by FY28E (DC p.1) | AxisDirect: "amidst limited opportunities for NIM expansion" (AX p.1), FY27E 3.4% (AX p.6). Q1 FY27 printed 3.26% (Q1D p.3), "the lowest level since the merger" (Investec, UP p.2) | **open**; the first print after the notes went against DevenChoksey's path |
| D3 | How Q1 FY27 reads | Nomura "broadly in line with expectations"; Jefferies "in line with estimates"; Bernstein "another steady quarter" (UP p.2) | Investec "weak" (UP p.2) | **open** (all four via one news article) |
| D4 | RoA | bank 1.85% for Q1 FY27 (Q1D p.2); 1.96% for Q4 FY26 (Q4D p.2) | Investec 1.74% (UP p.2); AxisDirect's table 1.8% for Q4 FY26 (AX p.1) | **basis**: the brokers do not state theirs |
| D5 | Q1 loan growth | bank: AUM +12.4%, gross advances +15.4%, average AUM +10.8% (Q1D p.10, p.3) | Jefferies 16%; Investec 15.6% (UP p.2) | **basis**: three bank figures on three bases |
| D6 | NIM on interest-earning assets | bank 3.4% (KPj p.2); analyst "almost down to 3.4 odd percent" (Cjl26 p.7) | Upstox "3% based on interest-earning assets" (UP p.1) | **settled**: a press error |
| D7 | Q4 FY26 profit | ₹19,221 cr standalone (AX, DC; Q4D p.4) | Geojit ₹21,074 cr, consolidated incl. minority interest (GJ p.1) | **basis** |
| D8 | Geojit's FY26 profit | ₹79,219 cr (GJ p.1) | ₹76,026 cr (GJ p.1) | **settled**: the difference is ₹3,193 cr of minority interests (GJ p.3) |
| D9 | The PCR change in Q1 FY27 | bank 67% → 66%, whole numbers (KPm, KPj p.2; Mar-26 67.21%, AR26 p.425); CFO "it was 71, now it is 66… excluding agri it is 70" (Cjl26 p.14) | Investec "declined by 170 basis points QoQ to 66%" (UP p.3) | **open**: consistent only if Jun-26 was ≈65.5%, which the corpus does not print (ledger A-17) |
| D10 | Credit cost, Q1 FY27 | bank 0.40% (KPj p.2) | Investec 41 bps (UP p.2) | **basis** (rounding or base) |
| D11 | The LDR target | CEO "85% to 90% for FY '27" (Cj26 p.6) | consensus "93% LDR" (analyst, Cj26 p.8); AxisDirect FY27E 92.8% (AX p.6) | **open**; unasked on Cjl26 |
| D12 | System credit growth | Deputy MD: system 12–13% in FY27 (Cj26 p.17) | AxisDirect: "uptick in systemic credit growth to ~16% YoY" (AX p.1) | **open**; no later figure in the corpus |
| D13 | The chairman's resignation | analysts quoting the letter: "not in congruence with his personal values and ethics" (GOV p.3) | the board's law firms: "not substantiated by the record reviewed and witness interviews" (AR26 p.42) | **settled in the filings** (the board's own commissioned review) |
| D14 | The chairman's status | "new chairman" (UP p.1); "our new Chairman, Rajiv Kumar" (CEO, Cjl26 p.3) | "subject to approval of RBI and shareholders respectively" (AR26 p.38); chairmanship from "the date as may be approved by RBI" (AR26 p.18) | **open**: no RBI approval in the corpus |
| D15 | Valuing the subsidiaries | AxisDirect ₹129 a share after a 20% holdco discount, ₹161 before (AX p.3) | DevenChoksey ₹110 after 15% (DC p.1), ≈₹129 before (computed) | **open** (§1.6) |
| D16 | "Pressing the pedal" | transcript: "we are on the verge of pressing the pedal" (CEO, Cjl26 p.3) | Upstox, in quotation marks: "We are at the cusp of pushing the pedal" (UP p.1) | **settled**: a paraphrase printed as a quote; cite the transcript |

## E. Events calendar

Dated events in the corpus, oldest first; the forward rows feed the Dashboard event calendar (D7).

| Date | Event | Source |
|---|---|---|
| 1 Jul 2023 | HDFC Ltd merges into HDFC Bank: the comparability break for every FY24 growth rate | AR24 p.43 |
| 27 Oct 2023 | CEO's current term begins (to 26 Oct 2026) | AR24 p.512 |
| 22 Jan 2025 | Q3 FY25 call: "below / in line with / faster than the system" for FY25 / FY26 / FY27 | Cj25 p.10 |
| 19 Apr 2025 | Q4 FY25 call: LDR "85 to 90… in FY '27" | Ca25 p.11 |
| 2 Jul 2025 | HDB Financial Services lists; the ₹9,130 cr standalone gain lands in Q1 FY26 | Cjl25 p.4; AR26 p.37; KPj p.2 |
| 27 Aug 2025 | Record date of the first-ever 1:1 bonus issue (the price series is adjusted; D15) | AR26 p.10 |
| 18 Oct 2025 | Q2 FY26 call: repricing tailwind "over the next 6 to 12 months" | Co25 p.3 |
| 17 Jan 2026 | Q3 FY26 results and call; ₹800 cr labour-code charge in Q3; LDR 90–96% / 85–90% | Q3D p.1, p.4; Cj26 p.6 |
| 18 Mar 2026 | Chairman Atanu Chakraborty resigns; Keki Mistry interim from 19 Mar | AR26 p.37, p.315 |
| 19 Mar 2026 | Investor call on the resignation: "no material matters" | GOV p.2 |
| 18 Apr 2026 | Q4 FY26 results (**the call is not in the corpus**); ED Bhavesh Zaveri retires; Deputy MD Kaizad Bharucha reappointed to 18 Apr 2029 | Q4D p.1; AR26 p.340 |
| 20–22 Apr 2026 | AxisDirect, DevenChoksey, Geojit notes (§1.6) | AX p.1; DC p.1; GJ p.1 |
| 26 Jun 2026 | Law firms' findings received: "not substantiated" | AR26 p.42 |
| 29–30 Jun 2026 | Board appoints Rajiv Kumar, subject to RBI and shareholder approval; independent director from 30 Jun | AR26 p.38, p.4 |
| 10 Jul 2026 | Annual report FY26 filed | AR26 p.1 |
| 18 Jul 2026 | Q1 FY27 results and call (Saturday) | Q1D p.1; Cjl26 p.1 |
| 20 Jul 2026 | Shares fall as much as 5.41% to ₹777.50 | UP p.1 |
| 24 Jul 2026 | Q1 FY27 call transcript filed | Cjl26 p.1 |
| **31 Jul 2026** | **Demo date** (D15) | — |
| 5 Aug 2026 | AGM | AR26 p.1 |
| by 18 Sep 2026 | Interim chairman's extended term ends at the latest | AR26 p.315 |
| 30 Sep 2026 | FCNR (B) window deadline the bank is mobilising against | UP p.1 |
| 26 Oct 2026 | CEO's current term ends; reappointment "work in progress" | AR24 p.512; Cjl26 p.8 |
| 1 Apr 2027 | Expected-credit-loss regime begins | Cjl26 p.12 |
| Q2 FY27 results | date **not in the corpus** (do not invent one) | — |

## F. Peer: ICICI Bank alongside (summary of [`PEER-ICICI.md`](PEER-ICICI.md))

In the demo the ICICI documents arrive on the **Canvas** as canvas files, never in the Library (ADR 0069
D1 / 0149 D5). Like-for-like pairs only; the full sheet names every basis and every mismatch.

| Pair (standalone) | ICICI | HDFC | Gap |
|---|---|---|---|
| NIM on interest-earning assets, Q1 FY27 | 4.36% (IC-Jul26 p.7) | 3.4% (KPj p.2) | ≈0.9–1.0 pp |
| NIM on interest-earning assets, FY26 | 4.32% (IC-AR26 p.170) | 3.50% (AR26 p.460) | 82 bps |
| Cost of deposits, FY26 | 4.62% (IC-AR26 p.170) | 5.05% (AR26 p.460) | HDFC pays 43 bps more |
| CASA ratio, Mar-26 | 41.4% (computed, IC-AR26 p.125) | 34.1% (KPm p.2) | 7.3 pp |
| LDR, Mar-26 / Jun-26 | 86.6% / ≈89.0% (computed; Jun-26 estimated) | 94.6% / 95.8% (computed, Q1D p.5) | 8.0 → ≈6.8 pp |
| RoA, FY26 | 2.33% (IC-AR26 p.170) | 1.94% (AR26 p.460) | 39 bps, almost all margin |
| Cost-to-income, FY26, ex one-offs | 39.75% (IC-AR26 p.117) | 39.9% (computed, AR26 p.279) | level |
| Credit cost net of recoveries, Q1 FY27 | 0.32% (IC-Jul26 p.3) | 0.29% (KPj p.2) | level; the headline 0.32% vs 0.40% flatters ICICI |
| Specific PCR, Q1 FY27 | 74.7% (IC-Jul26 p.3) | 66% (KPj p.2) | ICICI holds more specific cover |
| CET1, Q1 FY27 | 16.19% (IC-Jul26 p.4) | 17.4% (Q1D p.3) | HDFC holds more capital |
| Loan growth YoY, Jun-26 | +19.6% (IC-Jul26 p.3) | +15.4% gross advances (Q1D p.10) | ICICI growing faster |
| PAT growth, Q1 FY27, each ex its one-off | ≈+12.4% (N4A's adjustment) | +9.8% (the bank's, Q1D p.4) | adjusters differ |

**What an analyst draws** (PEER-ICICI §D): headline NIM against headline NIM overstates the gap by
0.14 pp (HDFC's 3.26% is on total assets); funding is the visible half of the gap; ICICI is spending
its LDR headroom fast; the RoA gap is margin, not efficiency; on credit the two are level once treated
the same way.

## G. What v1 corrected or settled in v0

- **AxisDirect's SOTP** is ₹844 + ₹129 = ₹973 against a stated ₹975 (AX p.3), not "₹847 + ₹128"; three
  subsidiary stakes in `ANALYST-USER.md` §3 were also wrong (corrected there).
- **FY24 CASA** is 38.2% at 31 Mar 2024 (AR24 p.242); Q1D p.14 prints 38% for both Sep-23 and Mar-24.
- **AR24 p.236 does not contradict itself**: it prints core NIM 3.53% and Tier 1 16.8% only; v0's "3.4%"
  and "16.3%" are not on that page (16.30% is CET1, AR24 p.336). v0 storyline 9's "surprise" is withdrawn.
- **Every NIM carries its basis.** The FY26 3.34% is on average total assets (AR26 p.41, p.460); on
  interest-earning assets it is 3.50% (AR26 p.460). Over two years NIM fell 19 bps on total assets and
  24 bps on interest-earning assets (§1.2).
- **FY25 RoA / RoE** are cited to AR25 p.417 (Schedule 18: 1.91%, 14.56%), not AR26 p.30.
- **Borrowings start points** ₹5,479 bn vs ₹5,101 bn are two dates (Mar-25, Q4D p.5; Jun-25, Q1D p.5).
- **Geojit's two FY26 profits** are one before and one after minority interests (GJ p.3).
- **Q3 FY26 opex** is ₹17,970 cr plus a separate ₹800 cr labour-code line in Q3D p.4, but ₹18,770 cr as
  restated in Q4D p.4: Q4 FY26's quarter-on-quarter opex change is measured against the restated base.
- **Q4 FY25 yield** is 8.4% as reported, 8.3% excluding ₹700 cr of income-tax-refund interest (Q3D, Q4D
  p.14 footnote); the Q1 FY27 deck drops the footnote.
- **NNPA to two decimals** for Q3 FY25, Q1 FY26 and Q2 FY26 exists only in a DevenChoksey chart (DC p.2),
  whose Q4 FY26 bar (0.40%) disagrees with the bank (0.38%) and with DevenChoksey's own text; v1 marks
  them ᵇ and never shows them as the bank's.
- **The guidance ledger** no longer lists DevenChoksey's credit-cost and cost-to-income expectations as
  management guidance (§C).
- **Headcount** turned up in Q1 FY27 (+1,780, KPj p.2); v0 read it as falling.
- **The pre-merger RoE comparison** (v0: "17.4% (FY23) → 13.8%") is dropped; the deck warns pre-merger
  periods "are not comparable" (Q1D p.29).
- **"No Q1 FY27 call in the corpus"** no longer holds: Cjl26 records management's answers (§A), and they
  are mostly refusals to quantify.

**v0 checklist (§6), resolved.** Average vs period-end growth: verified (ledger A-16). FY24 CASA: 38.2%
at Mar-24. Borrowings start point: two dates. RoA / RoE for Q1–Q2 FY26: **not in the corpus** (the
CFO's range only, Co25 p.11). NNPA to two decimals for Q1–Q2 FY26 and Q1 FY27: **not in the corpus**
from the bank. Broker rating, target, date, price: §1.6. Price history around the bonus: adjusted, no
fake drop (PLAN 0.2). The newer document: §A. ICICI peer sheet: §F.

## H. The prototype against this corpus

- **Coverage.** `HDFC_DOCS` (L11849–11862 at baseline) registers **12 of 20**. Absent: AR24, KPd, KPm,
  the four 2025 calls, and the new Q1 FY27 call (Cjl26). Phase 1 registers them (D2): several "false
  gaps" in the ledger (A-18, A-20) close the moment they are.
- **Storylines already shown:** the broker split on NIM; the HDB base break; the selloff; RoA 1.85% vs
  1.74%; the governance resignation; CASA erosion; the labour-code basis break.
- **Missing, now researched:** the numeric LDR guidance and its silent retirement (§B1); the FY26 growth
  miss against the system (§B2); the stalled margin recovery and the Q1 call's refusals (§A1, §B3);
  costs carrying RoA (§B4); the bad-loan walk with falling recoveries (§1.4); the law-firm finding and
  the RBI-pending chairman (§B7); the CASA target of 38% (§B12); ECL (§B13); the broker grid with method
  (§1.6); the ICICI pairing (§F).
- **Defects:** ledger A-16 … A-27, A-34, A-35, A-47 (A-19 and A-27 amended for v1).
- **Checker baseline** (`check_figures.py --html --rev 102c2ef`, both companies): 380 claims, 253 pass,
  12 loose, 115 fail, mostly annual-report citations on the printed folio. Phase 1's worklist.

## I. The first 90 seconds (proposal for sign-off, PLAN 0.7)

What the Library's first screen should say for HDFC Bank at 31 Jul 2026, built only from this file.
Figures as the prototype would print them (D5); each opens its page.

**Key figures** (value · period · change · basis):
- **NIM 3.26%** · Q1 FY27 · −12 bps QoQ · on total assets (3.4% on interest-earning assets) · Q1D p.3
- **CASA 32.3%** · Jun-26 · −180 bps QoQ · period-end · KPj p.2
- **Loan-to-deposit 95.8%** · Jun-26 · +120 bps QoQ · computed from the balance sheet · Q1D p.5 (promised
  85–90% by FY27)
- **GNPA 1.17%** · Jun-26 · +2 bps QoQ · 0.91% ex-agri · Q1D p.3
- **RoA 1.85%** · Q1 FY27 · −11 bps QoQ · annualised · Q1D p.2
- **CET1 17.4%** · Jun-26 · +10 bps QoQ · Q1D p.3

**This quarter, in one line.** Profit rose 5.0%, or 9.8% against last year's HDB-adjusted base, on a
balance sheet 11.2% bigger: costs and credit did their part, the gap is margin (§1.3, §B11).

**The debate.** *Is HDFC Bank buying growth with its margin and its LDR promise?*
- *For growth paying off:* corporate lending +18.6% and business banking +22.3% (KPj p.2; Q1D p.10);
  RoA held by costs ("Despite the lower NIMs… stable at 1.9 per cent mainly due to cost efficiencies",
  AR26 p.41); a ₹37,000 cr floating-and-contingent buffer (Q1D p.19); ₹40,000–50,000 cr of borrowings to
  reprice 100–125 bps cheaper (Cjl26 p.12); FCNR (B) inflows by 30 Sep (UP p.1).
- *Against:* NIM at "the lowest level since the merger" (Investec, UP p.2); LDR rising, target unasked;
  CASA 32.3% against an undated aim of 38% (Cjl26 p.9); term deposits outgrowing CASA for seven quarters
  (§1.5); upgrades and recoveries falling (§1.4).

**Said vs did** (three rows from §C): LDR 85–90% by FY27 → 95.8% and rising · repricing tailwind within
6–12 months → NIM 3.38% → 3.26% · FY26 growth "in line with the system" → 12.1% vs 14.1%. And what was
delivered: branches, costs, deposit share, liquidity.

**The street.** Three April BUYs, ₹896–1,011, written at ₹799–812, before Q1; Geojit's is an upgrade with
a lower target, on consolidated book (§1.6). After Q1: Nomura at 1.9× FY28E book, Investec "weak" (UP
p.2). At the 31 Jul close of ₹748.15 the targets imply +20% to +35%.

**The honest boundary** (quiet, D12): no Q4 FY26 call; no broker note after Q1; no consensus feed; the
chairman's RBI approval is not in the documents.
