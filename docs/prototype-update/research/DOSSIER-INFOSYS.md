# Dossier: Infosys (v1)

> **status:** working (temporary) · **authoritative for:** what the Infosys corpus supports, as of the
> demo date (31 Jul 2026, D15): the numbers on stated bases (IFRS factsheet vs Ind AS statements, US$ vs
> ₹, reported vs constant currency), what the Q1 FY27 call changed, the guidance ledger, storylines,
> contested points and the TCS comparison. Every figure carries doc + **PDF page**; the prototype's
> Infosys content is rebuilt from this file · **last verified:** 2026-10-06 — **v1**: all 19 PDFs,
> including the new Q1 FY27 press conference and call (C-Jul26). Every figure in a table, and every
> quote, is a registry entry in [`figures/infosys-kpi.json`](figures/infosys-kpi.json),
> [`figures/infosys-story.json`](figures/infosys-story.json) or
> [`figures/infosys-v1.json`](figures/infosys-v1.json), checked on its page by
> `../tools/check_figures.py` (reference outside this repository: `../tools/check_figures.py`) (`--only infosys`). The TCS sheet is
> [`PEER-TCS.md`](PEER-TCS.md).

**How to read it.** §1 is the numbers, §A–§D the Q1 FY27 call, the guidance ledger, the storylines and
the disputes, §E the peer, §F the honest boundary, §G what v1 corrected in v0, §H the prototype
against all this, and **§I the proposed first 90 seconds** (PLAN 0.7, for the user's sign-off).

## 0. Corpus key and conventions

| Code | File in `data/seed/Infosys Ltd/` | Kind | Period | Date | PDF pages |
|---|---|---|---|---|---|
| FS3 | `Infosys-Factsheet-Q3-FY 25-26.pdf` | factsheet (IFRS) | Q3 FY26 | 14 Jan 2026 | 5 |
| FS4 | `Infosys-Factsheet-Q4-FY 25-26.pdf` | factsheet (IFRS); every page carries a stale "Second Quarter, Fiscal 2023" header, ignore it | Q4 FY26 | 23 Apr 2026 | 6 |
| CFS3 | `Infosys-consol-fy26-q3-and-9m-finstatement.pdf` | consolidated statements (Ind AS) | Q3 / 9M FY26 | 14 Jan 2026 | 40 |
| CFS4 | `Infosys-consol-fy26-q4-and-12m-finstatement.pdf` | consolidated statements (Ind AS) | Q4 / FY26 | 23 Apr 2026 | 39 |
| SFS3 | `Infosys-sa-fy26-q3-and-9m-finstatement.pdf` | standalone statements | Q3 / 9M FY26 | 14 Jan 2026 | 32 |
| SFS4 | `Infosys-sa-fy26-q4-and-12m-finstatement.pdf` | standalone statements | Q4 / FY26 | 23 Apr 2026 | 32 |
| C-Jan25 | `Infosys-Concall-Transcript-Jan-2025.pdf` | press conference + earnings call | Q3 FY25 | board 16 Jan 2025, filed 21 Jan | 45 |
| C-Apr25 | `Infosys-Concall-Transcript-Apr-2025.pdf` | press conference + earnings call | Q4 FY25 | board 17 Apr 2025, filed 22 Apr | 48 |
| C-Jul25 | `Infosys-Concall-Transcript-Jul-2025.pdf` | press conference + earnings call | Q1 FY26 | board 23 Jul 2025, filed 28 Jul | 40 |
| C-Oct25 | `Infosys-Concall-Transcript-Oct-2025.pdf` | press conference + earnings call | Q2 FY26 | board 16 Oct 2025, filed 21 Oct | 38 |
| C-Jan26 | `Infosys-Concall-Transcript-Jan-19-2026.pdf` | press conference + earnings call | Q3 FY26 | board 14 Jan 2026, filed 19 Jan | 39 |
| AID | `Infosys-Concall-Transcript-Feb-24-2026.pdf` | **not an earnings call**: the Investor AI Day (X3) | — | held 17 Feb 2026, filed 24 Feb | 64 |
| **C-Jul26** | `Infosys-Concall-Transcript-Jul-2026.pdf` | press conference (pp.2–24) + earnings call (pp.25–48) · **new** | Q1 FY27 | board 23 Jul 2026, filed 28 Jul | 48 |
| AR25 | `infosys-annual-report-FY 24-25.pdf` | integrated annual report | FY25 | filed 2 Jun 2025 | 370 |
| AR26 | `infosys-annual-report-FY 25-26.pdf` | integrated annual report | FY26 | filed 29 May 2026 | 383 |
| HSIE | `Infosys-Analyst-Report-Feb26-HSIE.pdf` | broker company update (HDFC Securities) | after the AI Day | 18 Feb 2026 | 12 |
| Sahi | `Infosys-news-Sahi-Q4FY26-cautious-outlook-23Apr2026.pdf` | news (updated 25 Jun 2026) | Q4 FY26 | 23 Apr 2026 | 3 |
| PR-S | `Infosys_PR_24062026.pdf` | press release: collaboration with Sentara | — | 24 Jun 2026 | 4 |
| PR-C | `Infosys_PR_24062026_2.pdf` | press release: with ANA's Global CMO Growth Council and LIONS | — | 24 Jun 2026 | 4 |

**Conventions** (DECISIONS D5).
- **Pages are the PDF page index**, never the printed folio. AR26's printed folios run about 30 above
  the PDF index in its back half (PDF p.81 = printed 111; ledger A-09).
- **Bases.** Default **consolidated**. The factsheets are **IFRS**, the CFS/SFS statements **Ind AS**; they
  place some items differently (§1.6). Growth is **constant currency (CC)** unless marked US$ or ₹. The
  operating margin Infosys guides on is the IFRS US$ headline (FS p.1).
- **Units.** ₹ crore in tables with Indian grouping (`1,78,650`); US$ as printed.
- **Marks.** ᵈ or "(computed)" = N4A arithmetic, a derived registry entry; n/f = not in the corpus.
  **Filed** / **Attributed** / **N4A's reading** with a *Would be wrong if…* line, as in the HDFC dossier.
- **What each quarter rests on.** Q3 FY25, Q4 FY25 and Q2 FY26 appear as comparative columns in FS3 /
  FS4. Q1 FY26 has no factsheet (revenue and EPS derive from FS3's 9M figures; the rest is C-Jul25).
  **There is no Q4 FY26 earnings call** (FS4 only). **Q1 FY27 has no factsheet**: every Q1 FY27 figure is
  management's, from C-Jul26, not yet in a filed table. The full boundary is §F.

---

## 1. The numbers

### 1.1 KPI spine, Q3 FY25 → Q1 FY27

| Metric | Q3 FY25 | Q4 FY25 | Q1 FY26 | Q2 FY26 | Q3 FY26 | Q4 FY26 | Q1 FY27 | Sources |
|---|---|---|---|---|---|---|---|---|
| Revenue, US$ mn | 4,939 | 4,730 | 4,942ᵈ | 5,076 | 5,099 | 5,040 | 5,082 | FS3 p.3 (Q3 FY25, Q2–Q3 FY26; 9M 15,117); FS4 p.3 (Q4s); C-Jul26 p.30 (Q1 FY27) |
| Revenue, ₹ crore | 41,764 | 40,925 | 42,279ᵈ | 44,490 | 45,479 | 46,402 | n/f | FS3 p.4 (9M 1,32,248 on p.5); FS4 p.5; C-Jul26 gives no ₹ revenue |
| Growth QoQ, CC % | 1.7 | −3.5 | 2.6 | 2.2 | 0.6 | −1.3 | 1 | C-Jan25 p.23; C-Apr25 p.26; C-Jul25 p.18; C-Oct25 p.18; FS3 p.1; FS4 p.1; C-Jul26 p.29 |
| Growth YoY, CC % | 6.1 | 4.8 | 3.8 | 2.9 | 1.7 | 4.1 | 2.4 | same pages |
| Growth QoQ, reported US$ % | n/f | −4.2ᵈ | 4.5ᵈ | 2.7ᵈ | 0.5 | −1.2 | 0.8ᵈ | derived from the revenue row; FS3 p.1; FS4 p.1 |
| Growth YoY, reported US$ % | n/f | n/f | n/f | n/f | 3.2 | 6.6 | 2.8ᵈ | FS3 p.1; FS4 p.1; Q1 FY27 = 5,082 / derived 4,942 |
| Operating margin %, reported | 21.3 | 21.0 | 20.8 | 21.0 | 18.4 | 20.9 (₹ basis 21.0) | 21.1 | FS3 p.3; FS4 p.3; C-Jul25 p.18; FS3 p.3; FS3 p.1; FS4 p.1 and p.5; C-Jul26 p.29 |
| Operating margin %, adjusted | = reported | = reported | = reported | = reported | **21.2** (ex Labour Codes) | = reported | none published | FS3 p.1; Infosys adjusts only Q3 FY26 / FY26 |
| Large-deal TCV, US$ bn | 2.5 | 2.6 | 3.8 | 3.1 | 4.8 | 3.2 | 3.6 | C-Jan25 p.25; C-Apr25 p.26; C-Jul25 p.20; C-Oct25 p.20; FS3 p.1; FS4 p.1; C-Jul26 p.31 |
| — net-new share % | 63 | 63 | 55 | 67 | 57 | n/f | 61 | same pages; Q4 FY26 not printed and not restated in C-Jul26 (see §F) |
| Headcount, period-end | 3,23,379 | 3,23,578 | 3,23,788 | 3,31,991 | 3,37,034 | 3,28,594 | n/f | FS3 p.2; FS4 p.2; C-Jul25 p.20 |
| — net change QoQ | +5,591 | +199ᵈ | +210ᵈ | +8,203ᵈ | +5,043ᵈ | −8,440ᵈ | ≈ −500 | C-Jan25 p.25; derived from the row above; C-Jul26 p.31 ("after adding over 2,000 employees from acquisitions") |
| Utilisation ex-trainees % | 86.0 | 84.9 | 85.2 | 85.1 | 84.1 | 83.0 | 84.9 | FS3 p.2; FS4 p.2; C-Jul25 p.20; C-Jul26 p.31 |
| Voluntary attrition, LTM % | 13.7 | 14.1 | 14.4 | 14.3 | 12.3 | 12.6 | 13 | FS3 p.2; FS4 p.2; C-Jul25 p.20; C-Jul26 p.31 |
| FCF, US$ mn | 1,263 | 892 | 884 | 1,101 | 915 (adj. 965) | 833 | 955 | FS3 p.2; FS4 p.2; C-Jul25 p.20; C-Jul26 p.31 |
| Basic EPS, ₹ | 16.43 | 16.98 | 16.71ᵈ | 17.76 | 16.17 (adj. 18.53) | 21.01 | 19.19 | FS3 p.4 (9M 50.64 on p.5); FS4 p.5; C-Jul26 p.31 |
| DSO, days (LTM) | 74 | 69 | n/f | 71 | 74 | 67 | 63 | FS3 p.1; FS4 p.1; C-Jul26 p.31 |
| Clients > US$100 mn | 41 | 39 | n/f | 41 | 41 | 41 | n/f | FS3 p.1; FS4 p.1 |
| Clients > US$50 mn | 89 | 85 | n/f | 85 | 84 | 88 | n/f | FS3 p.1; FS4 p.1 |
| Top-5 / top-10 / top-25 share % | 12.7 / 19.9 / 34.2 | 13.1 / 20.7 / 34.8 | n/f | 13.0 / 20.7 / 35.2 | 12.8 / 20.6 / 35.0 | 12.6 / 20.2 / 34.5 | n/f | FS3 p.1; FS4 p.1 |

**Notes on the spine.**
- **Derived Q1 FY26.** Revenue = 9M FY26 − Q3 − Q2: US$15,117 − 5,099 − 5,076 = **4,942** (FS3 p.3);
  ₹1,32,248 − 45,479 − 44,490 = **42,279** cr (FS3 p.4–5). FS3 p.5 note 3 warns quarters may not add
  exactly to the 9M total (rounding), so ±1 in the last digit. EPS 50.64 − 17.76 − 16.17 = **16.71** is
  only approximate: per-share figures use each period's weighted share count, and the 10 crore-share
  buyback (4 Dec 2025) sits inside 9M.
- **Q1 FY27 is management-stated.** Revenue US$5,082 mn, +1% QoQ and +2.4% YoY CC, of which
  acquisitions ~1.1% sequentially (C-Jul26 p.29–30). AI services 8.2% of revenue (C-Jul26 p.29), from
  5.5% in Q3 FY26 (CFO, C-Jul26 p.41). EPS ₹19.19 "up approximately 15%" (p.31) is consistent with the
  derived Q1 FY26 ₹16.71 (+14.8%).
- **The margin basis.** The factsheets print an IFRS margin on the US$ statement and on the ₹ statement;
  they agree except Q4 FY26 (20.9% on US$ — the factsheet headline, FS4 p.1 — vs 21.0% on ₹, FS4 p.5).
  The calls' margins are the US$ headline.
- **FCF one-offs.** Q3 FY26 FCF US$915 mn is after US$50 mn (₹450 cr) of Labour Codes payments; adjusted
  US$965 mn (FS3 p.2). Q4 FY26 US$833 mn *includes* a further US$49 mn (₹452 cr) of such payments, with
  no adjusted figure printed (FS4 p.2 note 2). Q3 FY25 and Q2 FY26 FCF were lifted by income-tax refunds
  (C-Jan25 p.26; C-Oct25 p.20).
- **The Q2 FY26 EPS.** The C-Oct25 transcript reads "Rs. 17.6" (p.20); the factsheet prints ₹17.76
  (FS3 p.4). Use the factsheet.
- **Revised FY27 guide (C-Jul26).** 1.5–3% YoY CC (p.29), down from the April band of 1.5–3.5% (the
  CFO restates it, p.34). It contains ~1.7 pp from the Optimum Healthcare and Stratus acquisitions
  (p.33), so the ex-acquisition guide is **−0.2% to 1.3%ᵈ**; the BNP analyst's like-for-like midpoint
  "about 0.8%", confirmed by the CFO, against an April organic midpoint "around 2.2%" (p.34). Margin
  band 20–22% kept (p.29).

### 1.2 Vertical × geography

The corpus prints the full segment table only for **Q3 FY26 (FS3 p.1)** and **Q4 FY26 (FS4 p.1)**, each
with two comparative share columns (Q2 FY26 and Q3 FY25 in FS3; Q3 FY26 and Q4 FY25 in FS4). For Q3 FY25
→ Q2 FY26 and Q1 FY27 only what the CFO said is available (second table). Q1 FY26 shares: **n/f**.

**YoY growth, % — reported US$ / CC.** (FS3 p.1 for Q3 FY26; FS4 p.1 for Q4 FY26; parentheses in the
source are shown as −.)

| Segment | Q3 FY26 reported | Q3 FY26 CC | Q4 FY26 reported | Q4 FY26 CC | Change in CC growth |
|---|---|---|---|---|---|
| Financial Services | 4.8 | 3.9 | 5.0 | 2.9 | slowing |
| Manufacturing | 10.8 | 6.6 | 5.9 | 1.3 | sharp slowdown |
| Energy, Utilities, Resources & Services (EURS) | 1.3 | 0.5 | 8.3 | 6.7 | accelerating |
| Retail | −3.8 | −5.5 | 2.9 | 0.5 | back to growth |
| Communication | 11.6 | 9.9 | 12.6 | 9.0 | steady, high |
| Hi-Tech | −2.6 | −2.2 | −1.5 | −1.2 | still shrinking |
| Life Sciences | −3.1 | −5.4 | 15.5 | 11.6 | swing of 17 pp |
| Others | −10.4 | −9.3 | 13.0 | 14.0 | small base |
| **North America** | −1.2 | −1.0 | 4.1 | 4.1 | |
| **Europe** | 13.3 | 7.2 | 11.4 | 4.1 | currency flatters reported |
| **Rest of the world** | 2.4 | 2.5 | 9.3 | 5.0 | |
| **India** | −6.2 | −1.8 | −5.2 | 0.0 | |
| **Total** | 3.2 | 1.7 | 6.6 | 4.1 | (§1.1) |

**Revenue share, %.**

| Segment | Q3 FY25 | Q4 FY25 | Q2 FY26 | Q3 FY26 | Q4 FY26 | Sources |
|---|---|---|---|---|---|---|
| Financial Services | 27.8 | 28.4 | 27.7 | 28.2 | 28.0 | FS3 p.1 (Q3 FY25, Q2–Q3 FY26); FS4 p.1 (Q4s) |
| Manufacturing | 15.5 | 15.9 | 16.5 | 16.7 | 15.9 | same |
| EURS | 13.5 | 13.0 | 13.4 | 13.2 | 13.2 | same |
| Retail | 13.8 | 13.3 | 12.7 | 12.8 | 12.8 | same |
| Communication | 11.2 | 11.7 | 12.1 | 12.1 | 12.4 | same |
| Hi-Tech | 7.9 | 8.3 | 8.3 | 7.4 | 7.7 | same |
| Life Sciences | 7.6 | 6.8 | 6.4 | 7.2 | 7.3 | same |
| Others | 2.7 | 2.6 | 2.9 | 2.4 | 2.7 | same |
| North America | 58.4 | 57.1 | 56.3 | 55.9 | 55.7 | same |
| Europe | 29.8 | 31.2 | 31.7 | 32.7 | 32.6 | same |
| Rest of the world | 8.7 | 8.8 | 8.9 | 8.6 | 9.1 | same |
| India | 3.1 | 2.9 | 3.1 | 2.8 | 2.6 | same |

**Quarters without a printed table — what management said (YoY CC unless stated).**

| Quarter | Statement | Source |
|---|---|---|
| Q3 FY25 | North America 4.8% (first growth after 4 quarters); Europe 12.2% | C-Jan25 p.25 |
| Q4 FY25 | Europe 15% (~30% of revenue); Financial Services 12.6%; Manufacturing 14% | C-Apr25 p.26 |
| Q1 FY26 | Manufacturing "double digits"; FS and EURS "about 5%"; Europe 12.3%; North America +2.9% **QoQ** CC | C-Jul25 p.20 |
| Q2 FY26 | FS and Manufacturing "above 5%" (Q2 and H1); Europe "greater than 5%" | C-Oct25 p.20 |
| Q3 FY26 | FS 3.9% and Europe 7.2% (= FS3 p.1); FS "approximately 5%" over 9M | C-Jan26 p.21, p.23 |
| Q1 FY27 | Manufacturing "CC growth 1%" (editor's correction of the CFO's "close to 1.5%"; YoY or QoQ not stated); FS ~US$1 bn of large-deal net-new TCV; Retail and Communication "continue to see challenges"; FS and EURS to grow above company average | C-Jul26 p.15, p.32, p.33 |

**Reading.** Financial Services went 12.6% (Q4 FY25) → ~5% → >5% → 3.9% → 2.9% (Q4 FY26);
Manufacturing 14% → 1.3%; Europe 15% → 4.1% CC (its 11.4% reported growth in Q4 FY26 is mostly
currency). Q4 FY26 was carried by EURS (6.7%), Communication (9.0%) and Life Sciences (11.6%). On Life
Sciences the corpus **does** link the jump to the NHS deal: the CFO, asked about "almost $44 mn of
incremental revenues" in healthcare in Q3 FY26 (the Ambit analyst's number), answered "healthcare did
benefit from the contribution from the NHS deal" (C-Jan26 p.27) — v0 said the corpus does not make
this link (§G).

### 1.3 Margin bridge per quarter (sequential, bps, as the CFO gave it)

Each walk is quoted from the CFO's prepared remarks; "Σ" is N4A's check that the quoted components sum
to the quoted net change.

| Quarter | Margin (from → to) | Tailwinds (bps) | Headwinds (bps) | Net, as stated | Σ check | Source |
|---|---|---|---|---|---|---|
| Q3 FY25 | → 21.3% | currency +40 · Maximus +30 · lower post-sales-support and credit-loss provisions, net of higher third-party costs +20 | furloughs and fewer working days, net of leave utilisation −70 | +20 | +20ᵈ ✓ | C-Jan25 p.25–26 |
| Q4 FY25 | 21.3 → 21.0% | lower post-sale support +80 · Maximus +30 · currency +20 · lower third-party +20 | compensation −140 · acquisitions (amortisation of intangibles) −40 | −30 | −30ᵈ ✓ (travel/visa offset by other costs) | C-Apr25 p.26–27 |
| Q1 FY26 | 21.0 → 20.8% | realisation from **Maximus and seasonality** +70 · lower amortisation +40 · lower third-party +20 | compensation and variable pay −100 · currency −30 · sales investment −20 | −20 | −20ᵈ ✓ | C-Jul25 p.21 |
| Q2 FY26 | 20.8 → 21.0% | currency +60 · Maximus +30 (pricing, lean/automation, net of higher subcontracting) | post-sale support and other expenses −70 | +20 | +20ᵈ ✓ | C-Oct25 p.20–21 |
| Q3 FY26 (adjusted) | 21.0 → 21.2% adj. (18.4% reported) | currency +40 · Maximus +40 (**+50 at the same day's press conference**, C-Jan26 p.5) | furloughs and fewer working days −70 | +20 | +10ᵈ — the other +10 is "higher variable pay … partly offset by one-off benefits", unquantified (p.23) | C-Jan26 p.22–23 |
| Q4 FY26 | 21.2% adj. / 18.4% rep. → 20.9% | n/f | n/f | −30ᵈ vs adjusted · +250ᵈ vs reported | — | FS4 p.1, p.3; **no Q4 FY26 call in the corpus** |
| Q1 FY27 | 20.9 → 21.1% | rupee +70 · Maximus +20 · net amortisation benefit (Q4 intangibles costs, net of new acquisitions) +10 · one-time cost benefit ≈ +30 | AI sales and marketing −50 · EURS programme termination −40 · other expenses −20 | +20 | +20ᵈ ✓ | C-Jul26 p.30–31 |

**What the walks say.**
- **Maximus is real but small and partly seasonal**: +30, +30, +70 (*including* seasonality), +30, +40,
  +20 bps. Quoted Q1–Q3 FY26 it totals **+140 bpsᵈ**, yet the adjusted margin went 21.1% (FY25) →
  21.0% (FY26): the gains paid for compensation, sales and marketing (≈ −50 bps over 9M FY26, C-Jan26
  p.22) and lower utilisation.
- **Currency is the swing factor**: +40, +20, −30, +60, +40, +70 bps. The CFO's rule of thumb is 15–17
  bps of margin per 1% rupee depreciation, partly offset because ~45% of revenue is non-US (C-Jul26
  p.18).
- **Q3 FY26's "+20 bps" is not clean.** The quantified items sum to +10; the CFO says one-off benefits
  offset higher variable pay. The one-off was a ₹165 cr property gain (≈ 36 bpsᵈ) — see §1.6.
- **Q1 FY27 needed a one-time cost benefit (≈ +30) to print +20**, against a −40 bps hit from the EURS
  termination. Gross margin +60 bps QoQ (C-Jul26 p.30).
- **Forward:** FY27 margin guide 20–22% absorbs a 50 bps acquisitions headwind (Optimum Healthcare,
  Stratus; C-Jul26 p.33) and October / January wage hikes (p.31).
- **Inconsistency to flag**: the CFO gave Q3 FY26 Maximus as **50 bps** at the press conference
  (C-Jan26 p.5) and **40 bps** on the earnings call the same day (C-Jan26 p.22). The call's walk sums
  with 40; use 40, and note it.

### 1.4 Client buckets trend

Buckets are on LTM revenue. Printed only in FS3 p.1 (Q3 FY25, Q2 FY26, Q3 FY26) and FS4 p.1 (Q4 FY25,
Q3 FY26, Q4 FY26). **Q1 FY26 and Q1 FY27: n/f** (neither C-Jul25 nor C-Jul26 gives them).

| Bucket | Q3 FY25 | Q4 FY25 | Q2 FY26 | Q3 FY26 | Q4 FY26 | Sources |
|---|---|---|---|---|---|---|
| Active clients | 1,876 | 1,869 | 1,896 | 1,949 | 1,965 | FS3 p.1; FS4 p.1 |
| Added in quarter (gross) | 101 | 91 | 118 | 121 | 111 | same |
| > US$1 mn | 997 | 992 | 1,012 | 1,012 | 1,018 | same |
| > US$10 mn | 301 | 309 | 322 | 326 | 328 | same |
| > US$50 mn | 89 | 85 | 85 | 84 | 88 | same |
| > US$100 mn | 41 | 39 | 41 | 41 | 41 | same |
| Top-5 share % | 12.7 | 13.1 | 13.0 | 12.8 | 12.6 | same |
| Top-10 share % | 19.9 | 20.7 | 20.7 | 20.6 | 20.2 | same |
| Top-25 share % | 34.2 | 34.8 | 35.2 | 35.0 | 34.5 | same |

**Reading.** The US$50 mn+ count rose by 7 in Q3 FY25 (C-Jan25 p.25) to 89, slipped to 84–85 through
FY26, and ended FY26 at 88 — "+3 Y-o-Y" in the annual report (AR26 p.17; 88 − 85 = +3ᵈ). Concentration
eased slightly: top-5 13.1% → 12.6% (−0.5 ppᵈ), top-25 34.8% → 34.5% (−0.3 ppᵈ), Q4 FY25 → Q4 FY26. The
US$100 mn+ tier has been flat at 41 for a year. Growth in the client count is in the long tail
(US$1–10 mn), not the top.

### 1.5 Capital return, reconciled

Two bases are both true and the corpus uses both: cash **paid in** a fiscal year (the cash-flow
statement) and amounts **declared for** it (the annual report, incl. a final dividend paid after
year-end). ₹ crore, consolidated.

| | FY25 | FY26 | Source |
|---|---|---|---|
| Dividends paid (cash) | 20,287 (incl. the FY24 special dividend) | 18,653 (FY25 final ₹22 + FY26 interim ₹23) | CFS4 p.7 |
| Buyback paid, incl. ₹58 cr costs | — | 18,058 = 18,000 + 58 | CFS4 p.7; AR26 p.39 |
| **Cash returned in the year** | 20,287 | **36,711**ᵈ | computed |
| Declared for the year: interim + final dividend | 8,698 + 9,116 = 17,814ᵈ | 9,534 + 10,117 (₹23 + ₹25 a share) | AR26 p.39 |
| Declared for the year: buyback | — | 18,000: 10 crore shares at ₹1,800 (2.41% of equity), completed 4 Dec 2025 | CFS4 p.23 |
| **Declared for the year, total** | 17,814ᵈ | **37,651**ᵈ (37,709 incl. buyback costs) | computed |
| Payout as % of FCF (the issuer's) | 51.6% | **113.9%** | AR26 p.39 |
| Free cash flow / net profit | — | ₹33,097 cr = 112.3% of ₹29,440 cr | AR26 p.17; FS4 p.6 |

- **Cumulative:** ₹55,523 cr returned for FY25–26 = **82.1%** of cumulative FCF, against a policy of
  ~85% over five years from FY25 (AR26 p.37).
- **The CEO's figure:** "over US$4 billion" = US$2.1 bn dividends + US$2 bn buybacks, against FY26 FCF of
  US$3.7 bn (AR26 p.19): the cash basis in US$.
- **The ₹37,500 crore:** "Over ₹37,500 crore has been returned to shareholders for fiscal 2026" (AR26
  p.27) is the declared basis (₹37,651 cr); Sahi repeats it as "in FY26" (Sahi p.2). Not a news-only
  figure, and it reconciles (ledger A-01, amended).
- **Against profit:** cash returned in FY26 = 110.9% of FCF and 124.7% of net profit; declared for FY26 =
  128% of net profit (computed). Cash and investments fell from ₹47,549 cr to ₹43,075 cr (FS4 p.2).
- **Q1 FY27:** "more than US$1 bn" paid as dividends (the FY26 final), cash US$3.9 bn (C-Jul26 p.31). No
  buyback mentioned.
- **The price paid:** the buyback's ₹1,800 compares with ₹1,391 on 17 Feb 2026 (HSIE p.1), 22.7% below
  (computed); market capitalisation fell from ₹6,52,332 cr to ₹5,07,192 cr over FY26 (AR26 p.17).

### 1.6 One-offs, and the two accounting bases they sit in

Which basis a figure is on decides whether a one-off is inside it. The IFRS factsheet carries the
operating margin Infosys guides on; the Ind AS statements present some of the same items below
operating profit.

| Item | When | Amount | IFRS factsheet | Ind AS statements | Effect |
|---|---|---|---|---|---|
| Labour Codes: past-service gratuity and leave liability | Q3 FY26 | ₹1,289 cr (US$143 mn) | **inside operating profit**: ₹8,355 cr reported + ₹1,289 cr = ₹9,644 cr adjusted; margin 18.4% → **21.2%** (+2.8 pp) (FS3 p.4) | an **exceptional item** below "profit before exceptional item and tax" (CFS3 p.3) | FY26 margin 20.3% reported, 21.0% adjusted (−0.7 pp, FS4 p.6) |
| Labour Codes cash payments | Q3, Q4 FY26 | US$50 mn (Q3), US$49 mn (Q4) | in FCF: Q3 US$915 mn reported, US$965 mn adjusted; Q4 US$833 mn with no adjusted figure (FS3 p.2; FS4 p.2) | — | Q4 FY26 FCF understated by the payment |
| Profit on sale of property | Q3 FY26 | ₹165 cr | inside operating profit, ≈36 bps of revenue: the IFRS "other income, net of finance cost" (₹874 cr, FS4 p.5) = Ind AS other income ₹1,139 cr − finance cost ₹100 cr (CFS3 p.3) − ₹165 cr | other income (CFS3 p.32) | the Q3 adjusted margin is ≈20.8% ex the gain, vs 21.0% in Q2 (N4A's reading, §D3) |
| Reversal of tax provisions (orders u/s 250, 254) | Q4 FY26 (all of FY26's) | ₹774 cr, plus ₹381 cr pre-tax interest in other income | below operating profit (FS4 p.5, p.6) | same | Q4 EPS +23.8% reported, +13.9% ex tax orders and Labour Codes (FS4 p.1); Q4 net profit ₹8,501 cr, ≈₹7,727 cr ex the reversal, ≈₹7,442 cr ex the interest too (computed); FY26 tax rate 26.3%, lowered 2.2 points (AR26 p.80) |
| Reversal of tax provisions | Q4 FY25 | ₹101 cr | below operating profit (FS4 p.6) | same | small |
| EURS programme termination | Q1 FY27 | ~50 bps of revenue, −40 bps of margin | (call only, C-Jul26 p.30–31) | — | inside the guidance cut (§A2) |
| One-time cost benefit, unnamed | Q1 FY27 | ≈+30 bps of margin | (call only, C-Jul26 p.31) | — | needed to print +20 bps QoQ (§1.3) |

**Reading.** The TCS comparison turns on this. TCS's margin excludes all its exceptional items, and its
own Labour Codes charge (₹2,128 cr) is one of them; Infosys's IFRS headline includes its ₹1,289 cr. That
is a presentation basis, not a different economic treatment: in Infosys's Ind AS statements the charge
is exceptional too. Compare TCS with Infosys's **adjusted** IFRS margin (PEER-TCS §C).

### 1.7 Annuals, FY24–FY26

IFRS consolidated unless marked.

| Metric | FY24 | FY25 | FY26 | Source |
|---|---|---|---|---|
| Revenue, US$ mn | 18,562 | 19,277 | **20,158** | AR26 p.17; FS4 p.4 |
| Growth, US$ reported | — | +3.9%ᵈ | +4.6% | computed; FS4 p.4 |
| Growth, CC | — | 4.2% | **3.1%** | C-Apr25 p.25; FS4 p.1 |
| Revenue, ₹ crore | 1,53,670 | 1,62,990 | **1,78,650** (+9.6%) | AR26 p.17; FS4 p.6 |
| Operating margin, reported | — | 21.1% | 20.3% | FS4 p.6 |
| Operating margin, adjusted (ex Labour Codes) | — | 21.1% | **21.0%** | FS4 p.6 |
| Net profit (after NCI), ₹ crore | — | 26,713 | 29,440 (+10.2%) | FS4 p.6 |
| Basic EPS, ₹ | — | 64.50 | 71.58 (+11.0%) | FS4 p.6 |
| Dividend per share, ₹ | — | 43.00 | 48.00 | FS4 p.6 |
| Return on equity | — | — | 31.6% | AR26 p.17 |
| Large-deal TCV, US$ bn (net-new share) | — | 11.6 (56%) | **14.9 (55%)**, +28%ᵈ | C-Apr25 p.26; FS4 p.1; AR26 p.17 |
| Selling and marketing expense growth | — | — | +19.6% (₹9,077 cr) | FS4 p.6 |
| Sub-contractor cost, % of revenue | — | 7.9% | 8.6% | AR26 p.79 |
| Effective tax rate | — | — | 26.3% (guided 29–30%) | AR26 p.80; C-Apr25 p.27 |
| Headcount, year-end | — | 3,23,578 | 3,28,594 | FS4 p.2 |
| Cash and investments, ₹ crore | — | 47,549 | 43,075 | FS4 p.2 |
| Market capitalisation, ₹ crore | — | 6,52,332 | 5,07,192 | AR26 p.17 |

**Segment operating margin, FY26 vs FY25** (₹, before unallocable costs; AR26 p.81, printed folio 111):

| Segment | FY25 | FY26 | Change |
|---|---|---|---|
| Financial Services | 24.6% | 25.3% | +70 bps |
| Manufacturing | 19.3% | 22.1% | **+280 bps** |
| Energy, Utilities, Resources and Services | 28.1% | 25.1% | **−300 bps** |
| Retail | 32.3% | 30.7% | −160 bps |
| Communication | 17.5% | 17.7% | +20 bps |
| Hi-Tech | 24.6% | 23.1% | −150 bps |
| Life Sciences | 22.5% | 20.0% | **−250 bps** |
| All other segments | 17.2% | 14.8% | −240 bps |
| **Total** | 24.1% | 23.7% | −40 bps |

**Reading.** FY26 is bigger bookings (TCV +28%), slower growth (CC 4.2% → 3.1%), a margin held at the
band's middle only on the adjusted basis, and a return of capital well above the year's profit. The
segments that grew into FY27's story lost margin in FY26: Life Sciences (the healthcare build-out, §C5)
−250 bps and EURS (whose programme termination hit Q1 FY27, §A10) −300 bps. AR26 itself names the
causes: "lower utilization; and investments in talent, AI, sales & marketing" (AR26 p.81).

---

## A. What the Q1 FY27 call says

**The new document.** `C-Jul26` = the Q1 FY27 transcripts, filed 28 Jul 2026 (C-Jul26 p.1): a **media
press conference** (PDF pp.2–24; journalists, one question each) and the **earnings call** (pp.25–48;
sell-side analysts). Speakers: Nandan Nilekani (Chairman; announcement only, "Nandan will not be taking
any questions", p.4), Salil Parekh (CEO), Jayesh Sanghrajka (CFO), Sandeep Mahindroo (IR, p.27). Both
parts are cited separately below because they sometimes differ.

### A1. The headline numbers (Filed, C-Jul26)

| Item | Q1 FY27 | Page | Note |
|---|---|---|---|
| Revenue | US$5,082 mn | p.30 | CFO |
| Growth, CC | **+1% QoQ · +2.4% YoY** | p.29, p.30 | acquisitions added ~1.1% sequentially (p.30) |
| AI services revenue | **8.2%** of revenue | p.29, p.30 | was 5.5% in Q3 FY26 — "in 2 quarters" (CFO, p.41) |
| Large deals | **US$3.6 bn, 61% net new**; 22 deals, three of ~US$400 mn each | p.31 | vendor consolidation = 20% of large-deal TCV (p.31) |
| Operating margin | **21.1%**, +20 bps QoQ; gross margin +60 bps QoQ | p.30 | walk in A3 |
| Free cash flow | US$955 mn = **116.5%** of net profit | p.31 | |
| EPS | ₹19.19, up ~15% YoY (₹ terms) | p.31 | |
| Utilisation ex-trainees | **84.9%**, up 1.9 | p.31 | Q4 FY26 was 83.0% (FS4 p.2) |
| DSO | 63 days, −4 QoQ | p.31 | |
| Headcount | **−500** QoQ, *after* adding over 2,000 from acquisitions | p.31 | i.e. organic headcount fell ~2,500 (N4A's arithmetic) |
| Attrition (LTM) | 13% vs 12.6% | p.31 | "in-line with Q1 seasonality" |
| Cash | US$3.9 bn, after returning more than US$1 bn as dividends | p.31 | the FY26 final dividend of ₹25 (CFS4 p.23) |
| Effective tax rate, FY27 | **29% to 30%** | p.31 | |

Salil Parekh's own one-line summary at the close: **"we had neutral revenues, strong margins, strong
free cash flow and very strong large deals"** (C-Jul26 p.48).

### A2. FY27 revenue guidance: **revised down**, not restated

- **April band (23 Apr 2026): 1.5% to 3.5% CC.** The call itself now confirms it, in the CFO's words:
  *"…20 bps was the Stratus which was already baked in, in the guidance, which was 1.5% to 3.5%"*
  (Jayesh Sanghrajka to Kumar Rakesh, BNP Paribas, C-Jul26 p.34). A journalist put it the same way —
  *"first to increase it between 1.5% to 3.5%, now you sort of cut it down to 3%"* (Avik Das,
  Business Standard, p.12; Attributed). Until now the April band lived only in Sahi p.1, p.3.
- **July band (23 Jul 2026): 1.5% to 3% CC** — top end cut 50 bps, bottom unchanged. Salil Parekh,
  opening the call: *"Outside of that, we continue to see the macro-environment remaining uncertain.
  With our Q1 results and a view of the rest of the financial year, we have changed our revenue growth
  guidance to 1.5% to 3% Y-on-Y growth in constant currency terms."* (p.29; same words at the press
  conference, p.6). The CFO's sentence: *"Considering lower-than-expected Q1 revenues and revised view
  of the rest of the year, we are revising our revenue guidance to 1.5% to 3%."* (p.33).
- **What is inside the new band** (CFO, p.33): *"approximately 1.7% contribution from recently closed
  acquisitions of Optimum Healthcare and Stratus"*; *"slightly over 1% impact from large a European
  Manufacturing client due to reduced client spend along with our conscious decision to not pursue
  certain deals that were not aligned to our return expectations"*; *"approximately 0.75% to 1% impact
  from shift towards offshore."*
- **The reasons Q1 missed** (CFO, prepared remarks, p.30): *"one-off 50 basis point impact on account
  of program termination by an EURS client during the quarter. This was not factored in the earlier
  guidance."* · *"Volumes were soft and weaker than expectations and also versus the historical Q1
  trends"* · *"client expectation on productivity, along with high competitive intensity is resulting
  in softer increase in price versus our expectations."*
- **The scenario logic** (CFO, p.33): *"The lower end of the guidance assumes further deterioration in
  macro. Top end of the guidance assumes an improvement in macro, though lower than what we had assumed
  in April guidance."* Salil at the press conference: *"The upper end of the guidance was really based
  on if the macro was improving, we now see the macro, it may improve, but not at the level that we
  were thinking initially."* (p.7). On the band width: *"instead of 2 points, it is now like a 1.5
  point band as we go through the quarters"* (p.16).
- **The like-for-like cut is larger than the headline.** Kumar Rakesh (BNP Paribas) put the
  arithmetic: the new midpoint *"suggesting 2.25% sort of growth"* includes ~1.7% of acquisitions
  (p.33–34). The CFO answered that *"the last quarter midpoint would be around 2.2%"* once the 20 bps of
  Stratus already in April's band is set aside; Kumar: *"like-to-like this time, it would be about 0.8%
  sort of a number, excluding the incremental acquisition that we have baked in?"* — CFO: *"Yes."*
  (p.34; Attributed, accepted by management). **N4A's reading:** on the call's own inputs the organic
  midpoint fell from **2.3%** (2.5% − 0.2) to **0.55%** (2.25% − 1.7), a cut of about **1.75 pp**,
  while the printed band moved only 0.5 pp at the top; the CFO's "around 2.2%" is 0.1 pp below that
  arithmetic, and "about 0.8%" compares a figure that still includes Stratus. *Would be wrong if* the
  "~1.7%" and the April "20 bps" are measured on different bases (e.g. the 1.7% includes Stratus's
  full-year effect measured differently from April's 20 bps) — the call does not define either.
- **Margin band unchanged at 20% to 22%** (p.29, p.33): *"This assumes headwind from wage hikes
  productivity pass-throughs, AI investments and 50 basis point impact from acquisitions of Optimum
  Healthcare and Stratus. These headwinds will be partly offset by initiatives under Project Maximus and
  currency benefits."* (p.33). CFO to Gaurav Rateria (Morgan Stanley): *"we are very confident of that
  guidance"* (p.37).
- **H1 vs H2:** *"We expect the normal seasonality that will come. We are not expecting anything
  unusual there."* (Salil, press, p.8).
- **Q2 carry-over:** *"typically, whatever happens in Q1, it will have a cascading effect in Q2"* (CFO
  to Kumar Rakesh, p.34); the programme termination — *"What we know at this point in time has been
  considered in Q1."* (CFO to Ankur Rudra, JP Morgan, p.41); the European deal *"will have an additional
  impact in Q4 as the deal comes to a closure in December. So, that is also baked in our guidance."*
  (CFO, press, p.17).

### A3. Q1 margin walk (Filed, CFO, C-Jul26 p.30–31)

Operating margin 20.9% → **21.1%** (+20 bps):

| Tailwinds | bps | Headwinds | bps |
|---|---|---|---|
| Rupee depreciation | +70 | Investment in AI sales and marketing | −50 |
| Project Maximus | +20 | One-time revenue impact (programme termination) | −40 |
| Net benefit: amortisation of intangibles incurred in Q4, offset by new acquisitions | +10 | Increase in various other expenses | −20 |
| One-time cost benefit | ~+30 | | |

Sensitivity (CFO, press, p.18): *"every 1% change in the currency or depreciation in dollar typically
gives you anywhere between 15 to 17 bps on margin"*, partly offset because *"roughly 45% of revenue
coming from non-U.S. geography"*. **N4A's reading:** 70 bps of currency plus ~30 bps of one-time cost
benefit is 100 bps of help in a quarter that gained 20 bps; ex-currency and one-offs the quarter's
margin fell. *Would be wrong if* the "one-time cost benefit" is recurring in nature — the call does not
name it.

### A4. Demand by vertical and discretionary spend (Filed, CFO p.30–33; Salil p.14)

- **Overall:** *"Clients continue to prioritize investments in AI, modernization, cloud and
  productivity initiatives while remaining selective in discretionary spending."* (CFO, p.30).
- **Financial Services** — above company average: *"Financial Services and EURS, both we expect to
  deliver higher than the company average going forward or for the rest of the year."* (CFO, press,
  p.15; repeated in the call, p.33). But near-term caution: client priorities on efficiency *"with
  discretionary spend being evaluated more carefully"*; *"approximately $1 bn in large deal net new
  TCV"* in FS this quarter (p.32).
- **EURS** — *"impacted by one-off client termination, adjusted for which the growth was strong"*
  (p.32). The termination is *"nothing to do with AI here. It is a termination of the contract and
  therefore, a reduction in revenue."* (CFO to Gaurav Rateria, p.37); it came *"towards the end of the
  quarter"* (p.35).
- **Manufacturing** — *"Growth in Manufacturing continues to be impacted due to lower revenue from a
  large client"*, European auto elongated (p.32); *"While AI adoption is creating new opportunity
  areas, it is also raising productivity expectations from clients. We are getting better pricing on AI
  skills and consulting."* (p.32). The CFO at the press conference said Manufacturing grew *"close to
  1.5% or slightly over 1.5%"*, with the transcript's own correction *"(Editor’s comment: CC growth
  1%)"* (p.15) — period not stated.
- **Retail and CPG** — *"Clients are asking for AI-led productivity commitments leading to new pricing
  structures."*; pipeline healthy, *"decision cycles are longer"* (p.32).
- **Communications** — *"operating environment remains challenging"* (p.32). CFO: *"only two segments
  that continue to see challenges is Communication and Retail"* (press, p.15).
- **Life Sciences** — *"we will see benefit coming on the back of the acquisition in Healthcare and Life
  Sciences"* (CFO, press, p.15).
- Large deals by vertical: 5 each in Financial Services and Communications, 4 EURS, 3 Manufacturing, 2
  Retail, 1 each Life Sciences, Hi-Tech, others; by region 11 North America, 8 Europe, 3 Rest of world
  (p.31) — sums to the 22.

### A5. AI: share, definition, pricing, deflation, pass-through

- **Share and pace:** 8.2% of Q1 revenue, *"growing at a strong double-digit sequentially over the last
  many quarters"* (CFO, p.30); 5.5% for Q3 FY26 → 8.2% *"in 2 quarters"* (CFO to Ankur Rudra, p.41).
- **Definition** (Abhishek Pathak, Motilal Oswal, asked): it is *"AI first"* revenue — the six
  "Hexagon" areas; *"AI augmented revenue is what we presented on the AI Day also. That is not part of
  this."* (CFO, p.39). Asked by Shilpa Phadnis (Times of India) *"This is not reclassification in any
  format?"* — CFO: *"No."* (press, p.11).
- **Deflation, named for the first time as a guidance factor.** CFO to Abhishek Pathak: *"On the back
  of AI, there is an additional deflation or the AI led deflation as we call it. So that is a headwind
  that is there."* — on large and non-large deals alike, *"getting offset by the net new business"*
  (p.38). Salil: *"we do not quantify that compression part externally, but we acknowledge of course
  there is a compression"* (p.39); press: *"we have not externally quantified that compression at this
  stage"* (p.14).
- **Pass-through timing** (Ankur Rudra asked): *"there is a demand for AI productivity, which is
  across most industries"*; at renewal *"it is definitely there. Sometimes it does come in between the
  timeframe of the contracts’ renewal as well."* (Salil, p.40). How much of the backlog has been
  re-priced (Bryan Bergin, TD Cowen): *"it is something we look at internally, but it is not something
  we share externally."* (Salil, p.43).
- **Pricing still positive, but less than planned** (Jonathan Lee, Guggenheim, asked why pricing was
  not in the April outlook): *"we have not seen as much price increase that we envisaged at the
  beginning of the year on the back of the AI productivity ask of the clients, plus the intensifying
  competitiveness in the market. But we are still seeing a net increase in the pricing."* (CFO, p.36).
- **Outcome-based pricing** is *"one of the specific tracks within Project Maximus"* (CFO, press, p.15).
- **Scale claims:** *"over 80,000 employees are working today on coding tools such as Claude Code or
  Codex"* (p.29); *"Our plan is to have 6,000 frontier engineers over the next few years."* (p.29);
  Topaz Fabric works *"with 15 different models"* (p.44). Salil's long-run analogy: digital went from
  *"20% and then over a few years, we then went to 60% of our revenue"* (p.40).

### A6. Large deals, net-new, vendor consolidation, renewals

- US$3.6 bn, 61% net new; *"Out of the 22 large deal won, we had three deals worth $400 mn each. We
  have been on the positive side of vendor consolidation with 20% of the total large deal TCV being from
  new vendor consolidation deals."* (CFO, p.31).
- Consolidation deals: *"of the six deals that we have won, it is a $700 mn of net new business"* (CFO,
  press, p.17). ⚠ The transcript is internally inconsistent on the count: Salil earlier says *"there are
  5 (Editor’s comment) of those deals which are consolidation deals"* (p.7). Use "six … US$700 mn net
  new" with the CFO as speaker, and flag the count.
- TCV conversion: deal terms *"still remain between on an average between 3 to 5 years"* (CFO to
  Abhishek Pathak, p.38); Salil: conversion *"at the same type of a level"* (press, p.10).
- Discipline: *"we will compete aggressively in the market, but we are not going to underwrite
  uneconomic productivity assumptions."* (CFO to Keith Bachman, BMO, p.47). On the European
  manufacturing client: *"we decided not to pursue the deals beyond a certain point because it did not
  make economic sense for us"* (CFO to Gaurav Rateria, p.36–37).
- Lost renewals (Beena Parmar, Economic Times, asked about three): *"we do not comment on any specific
  deals in the environment, in any case."* (Salil, press, p.16).

### A7. People: headcount, freshers, utilisation, wages

- Freshers: *"We have recruited 20,000 college graduates last year. This year, we have a plan to
  recruit 20,000 college graduates. We have already done almost 4,000 in the first quarter."* (Salil,
  press, p.18). In the analyst call the same figure is *"over 4,000"* (p.46) — ⚠ "almost" vs "over".
- Headcount (Keith Bachman asked): *"So, the same amount of work can be done maybe with fewer people, but
  there is more work."*; no year-end number given (p.46). *"We have not done any staff restructuring in
  the company, we have done essentially all reskilling."* (Salil to James Friedman, Susquehanna, p.47).
- Wages: *"We plan to give salary hikes to most of our employees effective October while the rest of
  the employees will be covered in January '27."* (CFO, p.31). The FY27 wage effect is smaller than
  FY26's: *"the relative impact is going to be lower in FY27 versus FY26"* (CFO to Vibhor Singhal,
  Nuvama, p.45).
- Onsite mix: *"We expect Onsite mix excluding new acquisitions to reduce by 75 bps to 1% for the
  year."* (p.31) — a revenue headwind (A2) and a margin tailwind (p.37).

### A8. Project Maximus, capital, M&A, data centres

- Maximus: +20 bps in Q1 (p.30); *"Project Maximus is working well"* (CFO, press, p.13); it now runs
  an outcome-based-pricing track (p.15).
- Capital return: more than US$1 bn returned through dividends in Q1 (p.31). No buyback was mentioned.
- M&A: Optimum Healthcare and Stratus closed in Q1 (p.17, p.33); *"we are continuing to look at
  acquisitions. We have a good pipeline in that."* (Salil, press, p.16). **Versent is not mentioned
  anywhere in C-Jul26.**
- Data centres / AI infrastructure (Avik Das asked): *"we have decided to not do anything in that space
  at this stage."* (Salil, press, p.13).

### A9. Leadership change (Filed — announced by the Chairman on both calls)

- *"his term is coming to an end on March 31, 2027 and the Board has decided today to appoint a new
  CEO who is coming from inside Infosys"* … *"His name is Ashiss Dash."* (Nilekani, call, p.27).
- *"the Board has appointed his successor, our new CEO, who will take over on April 1, 2027"*
  (Nilekani, press, p.4). Dash: 31 years at Infosys; *"he has been a Segment Head for many years
  running the EURS"* practice (p.27); based in Los Angeles, two to three months of CEO coaching, then
  *"from October 1, Salil will take him on as his mentee"* (press, p.4).
- AR26 p.13 already printed Salil Parekh's term-ending date as March 31, 2027.
- Mandate (Ritu Singh, CNBC TV18; Jas Bardia, Mint): continuity — *"there will be some things which we
  will look at in terms of fine-tuning but that is a natural course of evolution"* (Salil, press, p.8).

### A10. One-offs in the quarter

- **Revenue:** the EURS programme termination, ~50 bps of revenue (p.30), −40 bps of margin (p.31).
- **Cost:** ~30 bps one-time cost benefit (p.31), unnamed.
- No exceptional item, tax reversal or property gain is mentioned for Q1 FY27 in C-Jul26.

### A11. What management would not say (Q&A mining)

AI deflation size (p.14, p.39) · share of backlog re-priced (p.43) · AI-deal margins *"we do not comment
separately on the margin"* (p.21) · lost renewals (p.16) · GCC milestone *"We do not externally share
the milestone"* (p.11) · year-end headcount (p.46). And one contrast inside the same day — **N4A's
reading:** asked by Ritu Singh about peers' talk of irrational competitive pricing, Salil said *"Yes.
So maybe they are seeing that, you should check with them."* (press, p.8); in the analyst call the
same day the CFO listed *"high competitive intensity"* among the reasons for the guidance cut (p.30)
and *"intensifying competitiveness in the market"* (p.36). *Would be wrong if* Salil meant only that
Infosys does not see *irrational* pricing, which the CFO's words do not contradict.

---

## B. Guidance ledger v1 — said vs did

Midpoints are N4A arithmetic (registry `*.midpoint`). "Filed" for every management statement below.

### B1. Revenue growth (CC)

| FY | Said (doc, page) | Band | Mid | Reason given (verbatim) | Outcome (doc, page) | Verdict |
|---|---|---|---|---|---|---|
| FY25 | 16 Jan 2025 · C-Jan25 p.24 | **4.5–5%** | 4.75% | *"Based overall on our strong performance in this quarter and our view for the rest of this financial year"* — and *"an increase in our growth guidance, third in 3 quarters"* (p.45) | **4.2%** (C-Apr25 p.25) | **Missed** — 0.3 pp below the bottom. Why: *"pretty much two-third of our decline was on the back of that"* [third-party] *"…some of them slipped through"* (CFO, C-Apr25 p.15); *"two-third of the sequential revenue drop was due to reduction in third party with the decline being higher than our expectation"* (p.26). The FY25 starting band is not in the corpus. |
| FY26 | 17 Apr 2025 · C-Apr25 p.25 (press p.4) | **0–3%** | 1.5% | top end *"assumed steady to marginally improving environment"*; bottom *"some deterioration"* (CFO, press p.6) | — | — |
| FY26 | 23 Jul 2025 · C-Jul25 p.19 (press p.3) | **1–3%** | 2.0% | *"we have narrowed the guidance and increased the lower end"* (Salil, press p.4); *"This continues to assume a reduction in third-party revenues versus FY25"* (CFO, p.22) | — | raised |
| FY26 | 16 Oct 2025 · C-Oct25 p.19 (press p.3) | **2–3%** | 2.5% | *"we have seen good traction, and that is how we have actually increased the guidance"* (Salil, press p.4); excludes the Telstra JV (p.23) | — | raised |
| FY26 | 14 Jan 2026 · C-Jan26 p.21 (press p.4) | **3–3.5%** | 3.25% | *"With the strong performance in this quarter, we have revised our revenue guidance"* (p.21); still excludes the JV *"as we still await the regulatory approvals"* (p.24) | **3.1%** (FS4 p.1; AR26 p.78) | **Met, bottom half** — 0.15 pp under the final midpoint, after Q4 fell −1.3% QoQ (FS4 p.1). Three raises in a row; the last one over-reached. |
| FY27 | 23 Apr 2026 · Sahi p.1 (news, Attributed) — **confirmed by the CFO in C-Jul26 p.34** | **1.5–3.5%** | 2.5% | Sahi: *"signalling that management is cautious"* (p.1, the writer's reading). The April assumptions are known only through July: top end assumed macro improvement (C-Jul26 p.33; Salil press p.7); included 20 bps of Stratus (p.34) | — | revised in July |
| FY27 | 23 Jul 2026 · C-Jul26 p.29, p.33 (press p.6) | **1.5–3%** | 2.25% | *"Considering lower-than-expected Q1 revenues and revised view of the rest of the year"* (CFO p.33); one-off EURS termination *"not factored in the earlier guidance"*, soft volumes, softer pricing (p.30) | Q1: +1% QoQ, +2.4% YoY (p.29) | **Pending — cut.** Now carries ~1.7% of acquisitions (p.33); organic midpoint ~0.55% vs ~2.3% in April (N4A, §A2) |

### B2. Operating margin band

| FY | Band (said) | Outcome | Verdict |
|---|---|---|---|
| FY25 | 20–22% (C-Jan25 p.24, "unchanged") | **21.1%**, +50 bps on FY24 (C-Apr25 p.25) | met, mid-band |
| FY26 | 20–22% (C-Apr25 p.25; held every call: C-Jul25 p.19, C-Oct25 p.19, C-Jan26 p.21) | **20.3% reported / 21.0% adjusted** for the ₹1,289 cr Labour Codes charge (FS4 p.1) | met on both bases |
| FY27 | 20–22% (April: Sahi p.3, Attributed; July: *"Margin guidance is maintained at 20% to 22%"*, C-Jul26 p.33) | Q1 21.1% (p.30) | pending; assumes wage hikes from October, 50 bps acquisition drag, offset by Maximus and currency (p.33) |

### B3. Other guidance

| Said (doc, page) | Target | Outcome (doc, page) | Verdict |
|---|---|---|---|
| *"We expect Project Maximus to further aid in margin improvements from current levels."* (CFO, C-Apr25 p.27) | FY26 vs FY25's 21.1% | adjusted margin **21.0%** (FS4 p.1) | **Not delivered** at company level; by AI Day management had re-framed it: *"we will take all of that, that we save, which is quite substantial from our margin program and invest that into scaling up AI even faster"* (Salil, AID p.56) |
| ETR *"29% to 30%"* (C-Apr25 p.27; C-Jul25 p.21) | FY26 | **26.3%** (AR26 p.80), lower *"by 2.2%"* from the tax-provision reversal (AR26 p.80) | below band — explained by a one-off |
| FCF *"above 100% of net profit"* (C-Apr25 p.27; C-Jul25 p.20) | FY26 | **112.3%** of net profit (AR26 p.17) | met |
| *"over 20,000 freshers in FY'26"* (C-Apr25 p.27) | FY26 | *"Last year we recruited over 20,000 college graduates"* (AR26 p.19) | met |
| *"we expect stronger H1 compared to H2 on account of normal seasonality"* (CFO, C-Jul25 p.21) | FY26 | QoQ CC 2.6% · 2.2% · 0.6% · −1.3% (C-Jul25 p.18; C-Oct25 p.18; FS3 p.1; FS4 p.1); H1 3.3% (C-Oct25 p.20) | met |
| *"Buyback is expected to be completed in Q3, subject to shareholder approval."* (CFO, C-Oct25 p.21) | Q3 FY26 | completed **4 Dec 2025**, ₹18,000 cr at ₹1,800 (CFS4 p.23) | met |
| Telstra JV (Versent) *"which we expect to close later this year"* (CFO, C-Oct25 p.23); agreement 13 Aug 2025, up to AUD 233 mn for 75% (CFS4 p.11) | calendar 2025 | Jan 2026: *"as we still await the regulatory approvals"* (C-Jan26 p.24); still a "Proposed Acquisition" in the FY26 statements, *"subject to regulatory approvals"* (CFS4 p.11); AR26 p.40 lists it as an agreement, not a completion; **C-Jul26 does not mention it** | **Slipped**; no closing in the corpus as of 23 Jul 2026 |
| *"our utilization comfort level is 83% to 85%"* (CFO, C-Jan25 p.44) | standing | 83.0% Q4 FY26 (FS4 p.2) → **84.9%** Q1 FY27 (C-Jul26 p.31) | inside the range; Q1 FY27 near its top |
| FS and EURS: *"we expect acceleration in"* … *"financial year 2027 over financial year 2026"* (Salil, C-Jan26 p.20–21); *"next year, we definitely see in Financial Services a strong growth"* (AID p.56) | FY27 | July wording: *"FS and EURS are expected to grow higher than the company average."* (C-Jul26 p.33); EURS hit by a termination in Q1 (p.32) | **Pending; softened** — N4A's reading: "acceleration over FY26" became "above company average", a lower bar when the company average is ~2%. *Would be wrong if* management meant the two as the same claim. |
| 20,000 freshers in FY27 (AID p.12; CFO via Sahi p.2) | FY27 | plan reaffirmed; *"almost 4,000"* (press p.18) / *"over 4,000"* (call p.46) done in Q1 | pending, on track |
| Wage hikes FY27: *"no decision has been made on timing or quantum yet"* (Sahi p.2, Attributed, Apr 2026) | FY27 | decided: most employees October 2026, the rest January 2027 (C-Jul26 p.31) | resolved |
| Onsite mix down *"roughly around 0.75% to 1%"* — *"as I had called out at the beginning of the year"* (CFO, C-Jul26 p.34) | FY27 | Q1: −30 bps ex-acquisitions (p.31) | pending |
| ETR *"29% to 30%"* (C-Jul26 p.31) | FY27 | — | pending |

**Read-across (N4A's reading).** Infosys's guidance record over the corpus: FY25 raised three times
then **missed**; FY26 raised three times and landed in the **bottom half** of the final band; FY27 **cut
in its first quarter**, with acquisitions now doing most of the work inside the band. The margin band
has held every year. *Would be wrong if* the FY27 cut proves conservative (the CFO says the lower end
already assumes *"further deterioration in macro"*, C-Jul26 p.33).

---

## C. Storylines v1

Each link carries `CODE p.N` and a label. v0's ten storylines are re-checked first (C1–C10), then the
new ones the call reveals (C11–C15).

### C1. Guidance: raised all FY26, landed low, then cut in Q1 FY27 *(v0 #1 — updated, the FY27 gap closed)*
- FY25 raised to 4.5–5% (C-Jan25 p.24), delivered 4.2% — a miss (C-Apr25 p.25), blamed on
  third-party revenue slipping (C-Apr25 p.15). **Filed**
- FY26: 0–3% → 1–3% → 2–3% → 3–3.5% (C-Apr25 p.25; C-Jul25 p.19; C-Oct25 p.19; C-Jan26 p.21); delivered
  3.1%, bottom half of the final band, after Q4 fell −1.3% QoQ (FS4 p.1). **Filed**
- FY27: 1.5–3.5% in April (Sahi p.1, **Attributed**; now confirmed by the CFO, C-Jul26 p.34, **Filed**)
  → **1.5–3%** on 23 Jul 2026 (C-Jul26 p.29, p.33). **Filed**
- The organic midpoint fell ~1.75 pp while the printed band lost 0.5 pp at the top (§A2). **N4A's
  reading** — *Would be wrong if* the 1.7% acquisition contribution is not incremental to April's band
  in the way the CFO's answers imply (C-Jul26 p.34).

### C2. Bookings up, growth down — and management now names the leak *(v0 #2 — updated)*
- Large-deal TCV US$11.6 bn in FY25 (C-Apr25 p.26) → US$14.9 bn in FY26 (FS4 p.1; AR26 p.17), **+28%**
  (N4A arithmetic); 9M FY26 net-new TCV +40% (C-Jan26 p.22). **Filed**
- Over the same span CC growth went 4.2% → 3.1% (C-Apr25 p.25; FS4 p.1) and Q1 FY27 printed +2.4% YoY
  on another US$3.6 bn, 61% net-new quarter (C-Jul26 p.29, p.31). **Filed**
- Deal timelines *"remaining similar"* (CFO, AID p.54); terms *"between 3 to 5 years"* (C-Jul26 p.38);
  conversion *"at the same type of a level"* (Salil, C-Jul26 p.10). **Filed**
- **New:** the CFO's own explanation — renewals carry the usual productivity ask, and *"On the back of
  AI, there is an additional deflation or the AI led deflation as we call it"* … *"So that is what is
  getting offset by the net new business that we are seeing."* (C-Jul26 p.38). **Filed**
- So net-new TCV is partly replacing revenue lost to re-pricing rather than adding to it. **N4A's
  reading** — *Would be wrong if* the shortfall is mostly the one-off termination and the European
  client (C-Jul26 p.30, p.33), which management says have *"nothing to do with AI"* (p.37).

### C3. Project Maximus: savings reinvested, not banked *(v0 #3 — updated)*
- Maximus margin tailwind every quarter: +30 bps Q3 FY25 (C-Jan25 p.25), +30 Q4 FY25 (C-Apr25 p.26),
  +70 Q1 FY26 *"due to Maximus and seasonality"* (C-Jul25 p.21), +30 Q2 (C-Oct25 p.21), +40 Q3
  (C-Jan26 p.22 — ⚠ the same day's press conference says *"50 basis points came from the Project
  Maximus"*, C-Jan26 p.5), **+20 Q1 FY27** (C-Jul26 p.30). **Filed**
- Promised *"further aid in margin improvements from current levels"* (C-Apr25 p.27); FY26 adjusted
  margin 21.0% vs FY25 21.1% (FS4 p.1; C-Apr25 p.25). **Filed** — re-framed at AI Day as savings to
  *"invest that into scaling up AI even faster"* (AID p.56). **Filed**
- Where it went: selling and marketing +19.6% in FY26 (FS4 p.6); −50 bps of AI sales and marketing in
  Q1 FY27 (C-Jul26 p.31); subcontractor cost 8.6% of revenue vs 7.9% on *"higher use of
  sub-contractors"* (AR26 p.79), though *"reducing sub-contractors"* is one of Maximus's own levers
  (AR26 p.78). **Filed**
- Maximus now also carries an outcome-based-pricing track (C-Jul26 p.15). **Filed**
- Q1 FY27's +20 bps margin needed +70 bps of rupee and ~+30 bps of one-time cost benefit (C-Jul26
  p.30–31); the underlying run-rate fell. **N4A's reading** — *Would be wrong if* the one-time benefit
  recurs.

### C4. Vertical rotation: the Q4 FY26 carriers are Q1 FY27's problems *(v0 #4 — updated)*
- **FS** decelerated: 12.6% Q4 FY25 (C-Apr25 p.26) → "about 5%" Q1 FY26 (C-Jul25 p.20) → "above 5%"
  Q2 (C-Oct25 p.20) → 3.9% Q3 (FS3 p.1) → 2.9% Q4 (FS4 p.1). Q1 FY27: ~US$1 bn of FS net-new TCV and
  "above company average" (C-Jul26 p.32, p.33), but *"discretionary spend being evaluated more
  carefully"* (p.32). **Filed**
- **Manufacturing** 14% Q4 FY25 (C-Apr25 p.26) → 6.6% Q3 FY26 (FS3 p.1) → 1.3% Q4 (FS4 p.1); share 16.7%
  → 15.9% (FS4 p.1); Q1 FY27 *"impacted due to lower revenue from a large client"* (C-Jul26 p.32), and
  the same European client costs *"slightly over 1%"* of FY27 growth (p.33). **Filed**
- **Europe** 15% Q4 FY25 (C-Apr25 p.26) → 12.3% Q1 FY26 (C-Jul25 p.20) → 7.2% Q3 (C-Jan26 p.21) →
  4.1% Q4 (FS4 p.1). **Filed**
- Q4 FY26 was carried by EURS 6.7%, Communication 9.0%, Life Sciences 11.6% (FS4 p.1). In Q1 FY27 EURS
  took the one-off termination (C-Jul26 p.32) and Communication is one of *"only two segments that
  continue to see challenges"* (p.15). **Filed**
- **N4A's reading:** no vertical carried two consecutive quarters; FY27 leans on FS and EURS
  delivering "above average" (C-Jul26 p.33) and on acquisitions in healthcare and insurance (p.33).
  *Would be wrong if* the termination-adjusted EURS growth the CFO calls *"strong"* (p.32) is the
  better guide to the segment.

### C5. A healthcare build-out across five documents *(v0 #5 — extended; the NHS link stays a reading)*
- A US$1.6 bn mega deal announced after Q2 FY26 closed (C-Oct25 p.19) — *"the mega deal announcement
  this week with NHS"* (C-Oct25 p.20). **Filed**
- 25 Mar 2026: agreement to acquire Optimum Healthcare IT for up to US$465 mn (CFS4 p.11; AR26 p.40);
  **closed in Q1 FY27** — *"recently closed acquisitions of Optimum Healthcare and Stratus"* (C-Jul26
  p.33). **Filed**
- Life Sciences share 6.4% (Q2 FY26) → 7.2% (Q3) → 7.3% (Q4) (FS3 p.1; FS4 p.1); Q4 growth 11.6% CC
  (FS4 p.1). **Filed**
- 24 Jun 2026: Sentara collaboration on Topaz Fabric, no value stated (PR-S p.2). **Filed**
- Q1 FY27: for a healthcare client, AI agents cut *"medicaid eligibility verification"* from about 6–8
  days to about 4 minutes (C-Jul26 p.29); CFO: *"Life Sciences, we will see benefit coming on the back
  of the acquisition in Healthcare and Life Sciences."* (press p.15); Salil names *"a little bit more in
  Healthcare"* as an M&A area (press p.17). **Filed**
- Cost side: Life Sciences segment margin 22.5% → 20.0% in FY26 (AR26 p.81). **Filed**
- **N4A's reading:** the Q3–Q4 FY26 Life Sciences jump reflects the NHS ramp. *Would be wrong if* the
  NHS contract is reported outside Life Sciences — AR26 p.80 says "All other segments" include
  *"Infosys Public Services and identified enterprises in public services"*, and "Others" also grew
  14.0% CC in Q4 (FS4 p.1). No corpus document attributes Life Sciences growth to NHS; the call
  attributes FY27 Life Sciences benefit to the **acquisition**, not to NHS.

### C6. AI: 8.2% of revenue and rising fast — while the rest shrinks *(v0 #6 — updated)*
- AI ("AI first", the six Hexagon areas) = 5.5% of Q3 FY26 revenue (AID p.10; AR26 p.19) → **8.2%** in
  Q1 FY27 (C-Jul26 p.30, p.41); *"not reclassification"* (press p.11); AI-augmented work excluded
  (p.39). **Filed**
- Projects 2,500+ (C-Oct25 p.23) → 4,600 (C-Jan26 p.20); over 80,000 staff on coding tools (C-Jul26
  p.29). **Filed**
- Stance on the net effect: *"I don't have a view on which of these two factors will be larger or
  smaller"* (Salil, C-Oct25 p.34) → *"the expansion number from what we see today looks larger than the
  compression number"* (AID p.53) → July: compression acknowledged, AI-led deflation named as a
  headwind, still unquantified (C-Jul26 p.38, p.39). **Filed**
- Pricing: clients *"expecting the model type of benefit in the pricing or the cost and we are not able
  to make that happen"* (Salil, AID p.60) → *"we have not seen as much price increase that we
  envisaged"* (CFO, C-Jul26 p.36). **Filed**
- **N4A's arithmetic:** applying the shares to US$ revenue, AI ≈ US$280 mn in Q3 FY26 (5.5% × US$5,099
  mn, FS3 p.3) and ≈ US$417 mn in Q1 FY27 (8.2% × US$5,082 mn, C-Jul26 p.30) — about +49% in two
  quarters, ~22% a quarter compounded; everything else ≈ US$4,819 mn → US$4,665 mn, **−3.2%**, even
  with acquisitions adding ~1.1% in Q1 alone (C-Jul26 p.30). **N4A's reading** — *Would be wrong if* the
  5.5% and 8.2% are shares of different revenue bases (CC vs reported, or one excluding
  acquisitions); the call does not state the denominator.

### C7. HSIE's model vs the guide — a wider gap *(v0 #7 — updated)*
- HSIE (18 Feb 2026) models FY27 US$ revenue **US$21,611 mn, +6.7%**, EBIT margin 21.6% (HSIE p.8);
  BUY, target ₹1,870 from ₹2,100, 21× (HSIE p.1). **Attributed**
- Its FY26 revenue estimate overshot: US$20,256 mn vs actual US$20,158 mn (HSIE p.8; AR26 p.17).
  **Attributed / Filed**
- Against the July guide of 1.5–3% CC (C-Jul26 p.33) and a Q1 of US$5,082 mn (p.30), HSIE's year needs
  the remaining three quarters to average **~US$5,510 mn, ~8.4% above Q1**. **N4A's reading** — *Would
  be wrong if* currency moves inflate US$ revenue (HSIE's line is US$ reported, not CC). HSIE predates
  both the April guide and the cut; it is stale, not necessarily wrong on its own basis.

### C8. The Q4 FY26 "beat" was mostly a tax order *(v0 #8 — sharpened)*
- Q4 net profit ₹8,501 cr includes a ₹774 cr reversal of tax provisions **and** ₹381 cr of pre-tax
  interest income, *"on account of orders received under sections 250 and 254 of the Income Tax Act"*
  (FS4 p.5); AR26 p.79 ties the ₹381 cr interest to those orders. **Filed**
- Infosys's own adjusted figure: Q4 EPS +13.9% excluding the tax orders and Labour Codes, vs +23.8%
  reported (FS4 p.1). **Filed**
- Ex the reversal alone ≈ ₹7,727 cr — inside the ₹7,500–₹7,800 cr brokerage range Sahi cites (Sahi
  p.1, **Attributed**); ex the interest as well (taxed at the 25.17% statutory rate, AR26 p.80) ≈
  **₹7,442 cr**, just below it. **N4A's reading** — *Would be wrong if* the interest carries a different
  tax charge, or brokers' estimates already included the orders.

### C9. Capital return: the buyback was priced near the top *(v0 #9 — updated)*
- FY26 cash returned: dividends ₹18,653 cr + buyback ₹18,058 cr = **₹36,711 cr** (CFS4 p.7). **Filed**
- Including the FY26 final dividend, ₹55,523 cr = 82.1% of FY25–26 free cash flow vs the ~85% five-year
  policy (AR26 p.37); FY26 payout 113.9% (AR26 p.39). **Filed**
- Buyback: 10 crore shares at ₹1,800, completed 4 Dec 2025 (CFS4 p.23); the stock was ₹1,391 on 17 Feb
  2026 (HSIE p.1, **Attributed**), 22.7% below the buyback price (N4A arithmetic). Market cap ₹6,52,332
  cr → ₹5,07,192 cr (AR26 p.17). **Filed**
- Q1 FY27: more than US$1 bn returned through dividends; no buyback mentioned (C-Jul26 p.31). **Filed**
- The CEO's "over US$4 billion" (AR26 p.19) and Sahi's "over ₹37,500 crore" (Sahi p.2) — see D2.

### C10. Headcount falls, hiring plans hold *(v0 #10 — updated)*
- Q4 FY26 headcount 3,28,594 vs 3,37,034 in Q3: **−8,440** (FS4 p.2). **Filed**
- Q1 FY27: **−500**, after adding over 2,000 from acquisitions (C-Jul26 p.31) — organic ≈ −2,500 (N4A
  arithmetic). **Filed**
- Plans: 20,000 college graduates in FY27, ~4,000 done in Q1 (C-Jul26 p.18, p.46); *"the same amount
  of work can be done maybe with fewer people, but there is more work"* (p.46). **Filed**
- Utilisation 83.0% in Q4 FY26 (FS4 p.2) — the floor of the *"83% to 85%"* comfort range (C-Jan25
  p.44) — then 84.9% in Q1 FY27 (C-Jul26 p.31). **Filed**
- Hiring freshers while net headcount falls and utilisation rises means the pyramid is being
  re-shaped from the bottom. **N4A's reading** — *Would be wrong if* Q1's exits were mostly seasonal
  (attrition 13%, *"in-line with Q1 seasonality"*, C-Jul26 p.31).

### C11. NEW — A CEO succession from inside, from the segment that just took the hit
- Ashiss Dash named CEO from 1 Apr 2027; Salil Parekh's term ends 31 Mar 2027 (C-Jul26 p.4, p.27; AR26
  p.13 already printed the term end). **Filed**
- Dash ran the EURS segment *"for many years"* (Nilekani, C-Jul26 p.27); EURS took Q1 FY27's one-off
  programme termination (p.30, p.32). **Filed**
- Strategy continuity, *"some things"* to fine-tune (Salil, press p.8). **Filed**
- **N4A's reading:** the transition runs through the whole of FY27, the year of the cut; the incoming
  CEO inherits a guide his predecessor set. *Would be wrong if* Dash had already left EURS before the
  termination — the transcript's "has been a Segment Head" does not say when.

### C12. NEW — Acquisitions now carry the growth band
- ~1.7 pp of the 1.5–3% band is Optimum Healthcare + Stratus (C-Jul26 p.33); acquisitions added ~1.1%
  sequentially in Q1 (p.30); Stratus (insurance, up to US$95 mn) and Optimum (healthcare, up to US$465
  mn) were both signed 25 Mar 2026 (CFS4 p.11). **Filed**
- They also cost margin: *"50 basis point impact from acquisitions of Optimum Healthcare and Stratus"*
  (C-Jul26 p.33). **Filed**
- More may come: *"We have a good pipeline in that."* (Salil, press p.16). **Filed**
- **N4A's reading:** organic FY27 growth at the guide's midpoint is ~0.5%; the reported number will
  flatter it. *Would be wrong if* organic H2 recovers to the April assumption (the top end assumes
  macro improvement, p.33).

### C13. NEW — Margin over growth: walking away, offshoring, holding the band
- Declined to pursue a European client's deals *"beyond a certain point"* (C-Jul26 p.37); *"not going to
  underwrite uneconomic productivity assumptions"* (p.47); consolidation deals came *"at a very healthy
  margins"* (p.47). **Filed**
- A deliberate offshore shift, *"our conscious decision of derisking our business model"* (CFO, press
  p.17), costs ~0.75–1% of growth (p.33) and helps margin (p.37). **Filed**
- Margin band held at 20–22% while revenue guidance was cut (p.33). **Filed**
- **N4A's reading:** management is choosing margin and risk over volume. *Would be wrong if* the
  walk-aways are lost renewals forced on Infosys (a journalist asked about three; Salil would not
  comment, press p.16).

### C14. NEW — AI-led deflation: from "not quantified" to a named guidance headwind
- AI Day: expansion *"looks larger than the compression"*; *"We have not quantified that number"* (AID
  p.53). **Filed**
- July: pricing softer on *"client expectation on productivity"* (C-Jul26 p.30); *"AI led deflation"*
  (p.38); asks come *"in between the timeframe of the contracts’ renewal"* (p.40); backlog re-pricing
  *"not something we share externally"* (p.43). **Filed**
- **N4A's reading:** the first time Infosys has tied AI-driven price pressure to a guidance change; with
  C6's arithmetic, the debate moves from "whether" to "how fast". *Would be wrong if* the price
  shortfall is mostly competition rather than AI — the CFO names both (p.30, p.36).

### C15. NEW — Same day, two answers on competitive pricing
- Press conference: *"Yes. So maybe they are seeing that, you should check with them."* (Salil,
  C-Jul26 p.8). **Filed**
- Analyst call: *"high competitive intensity"* (CFO, p.30); *"intensifying competitiveness in the
  market"* (p.36). **Filed**
- **N4A's reading:** the analyst call is the more candid record; the demo can show both quotes side by
  side. *Would be wrong if* Salil was rejecting only the word "irrational" in Ritu Singh's question
  (press p.6).

---

## D. Contested points v1

Status key: **settled** (a corpus document resolves it) · **open** · **opened** (the new call creates or
widens it) · **reconciled** (both sides right on different bases).

### D1. Was Q4 FY26 a "beat"? — *open; sharpened*
- **For:** *"Most brokerages had projected net profit in the range of ₹7,500–₹7,800 crore, making the
  actual figure of ₹8,501 crore a significant beat."* (Sahi p.1, Attributed).
- **Against:** ₹774 cr reversal of tax provisions plus ₹381 cr pre-tax interest from the same
  income-tax orders sit in Q4 (FS4 p.5; AR26 p.79); Infosys's own ex-items Q4 EPS growth is 13.9% vs
  23.8% reported (FS4 p.1, Filed).
- N4A's adjustment: ₹7,727 cr ex the reversal (inside the range); ≈ ₹7,442 cr ex the interest too
  (below it) — §C8. C-Jul26 does not revisit Q4.

### D2. How much went back to shareholders in FY26? — *reconciled (new)*
- Filings, **cash paid in FY26**: dividends ₹18,653 cr (final FY25 + interim FY26) + buyback ₹18,058 cr
  incl. costs = **₹36,711 cr** (CFS4 p.7; CFS4 p.23).
- Sahi: *"Including the interim dividend and a buyback, Infosys returned over ₹37,500 crore to
  shareholders in FY26"* (Sahi p.2, Attributed).
- CEO: *"return over US$4 billion to shareholders through dividends (US$2.1 billion) and share buybacks
  (US$2 billion)"* (AR26 p.19).
- **Reconciliation (N4A's reading):** Sahi's figure is the **declared-for-FY26** basis — interim ₹9,534
  cr + final ₹10,117 cr + buyback ₹18,000 cr = **₹37,651 cr** (AR26 p.39) — "over ₹37,500 crore". The
  two differ by which final dividend is counted (FY25's paid in FY26, or FY26's paid in June 2026) and
  by the ₹58 cr of buyback costs. *Would be wrong if* Sahi built its number another way; it shows no
  working. Ledger A-01's "unreconciled" should become "two bases, both correct; label the basis".

### D3. Did the Q3 FY26 margin really expand? — *settled for JP Morgan (new evidence)*
- CFO: *"Adjusted operating margins increased by 20 basis points sequentially to 21.2%."* (C-Jan26
  p.22).
- Ankur Rudra (JP Morgan): *"Margins appear to be down 20 basis points if I adjust the gains from the
  property sale this time."* — CFO: *"you are right, there was a benefit that we got this quarter"*,
  offset by higher variable pay (C-Jan26 p.25). Sandeep Shah put it at *"35, 36 bps"* (p.36).
- The gain: ₹165 cr profit on sale of property, plant and equipment in Q3 (CFS3 p.32). In the Ind AS
  statements it sits in other income (CFS3 p.32; AR26 p.79). **N4A's check:** the IFRS factsheet's Q3
  *"Other Income, net of finance cost"* is ₹874 cr (FS4 p.5) = Ind AS other income ₹1,139 cr − finance
  cost ₹100 cr (CFS3 p.3) − ₹165 cr — so on the IFRS basis the margin is reported on, the gain is
  **inside operating profit**: ₹165 cr / ₹45,479 cr revenue ≈ 36 bps; ex-gain adjusted margin ≈ 20.8%
  vs 21.0% in Q2 (C-Oct25 p.20). *Would be wrong if* another item explains the ₹165 cr gap between the
  two other-income lines.

### D4. Is AI net positive or deflationary? — *opened wider*
- Positive: HSIE — *"the expansive USD 300-400bn AI opportunities from new AI first services over the
  next five years will outpace the pace of legacy compression"* (HSIE p.1, Attributed); management at AI
  Day — expansion *"looks larger than the compression"* (AID p.53).
- Negative: Sahi — *"it also brings deflationary pressures"* (Sahi p.2, Attributed).
- **July:** management names *"AI led deflation"* as a headwind (C-Jul26 p.38), cites the productivity
  ask in the guidance cut (p.30), and still will not size it (p.39, p.43); AI share 8.2% (p.30). N4A's
  arithmetic: non-AI revenue −3.2% over two quarters (§C6). The debate is now about pace, not existence.

### D5. How big is the AI market, and whose estimate? — *open; July uses the low end only*
- *"the 6 areas with an external analysis, we understand that the opportunity is between $300 bn and
  $400 bn in the year getting to 2030"* (Salil, AID p.11); HSIE: *"Infosys estimates the "AI First
  services opportunity" to be USD 300-400bn by 2030"* (HSIE p.1, Attributed); *"US$300 billion
  opportunity, based on market estimates"* (AR26 p.19).
- July: *"we had outlined a $300 bn market opportunity, addressable market"* (Salil, press p.11) and
  *"the new addressable market of $300 bn"* (p.38). Source still unnamed.

### D6. FY27 outlook — *settled on direction: cut*
- April: management *"not making a comment on the overall business"* for FY27 in January (C-Jan26 p.25);
  1.5–3.5% in April (Sahi p.1; C-Jul26 p.34); Sahi read it as *"cautious"* (p.1); HSIE modelled +6.7% in
  US$ (HSIE p.8).
- July: cut to 1.5–3% with ~1.7% from acquisitions (C-Jul26 p.33); FS/EURS claim softened from
  "acceleration" to "above company average" (B3). Sahi's direction was right; HSIE's line now needs
  ~8.4% above Q1 every remaining quarter (§C7).

### D7. NEW — Q1 FY27: one-offs or a trend? — *opened*
- One-offs: the EURS termination (*"nothing to do with AI here"*, C-Jul26 p.37) and the European client
  walk-away (p.36–37), both near quarter-end (p.35).
- Trend: *"Volumes were soft and weaker than expectations and also versus the historical Q1 trends"* and
  price increases softer on productivity asks and competition (p.30); Gaurav Rateria (Morgan Stanley)
  asked whether the client issues share *"common links"* (p.36). Unresolved until Q2 FY27, which the
  corpus does not hold.

### D8. NEW — Competitive pricing: is it hurting Infosys? — *opened (management on both sides)*
- *"Yes. So maybe they are seeing that, you should check with them."* (Salil, press, C-Jul26 p.8) vs
  *"high competitive intensity"* (CFO, p.30) and *"intensifying competitiveness in the market"* (p.36).

### D9. NEW — small transcript inconsistencies to show, not resolve
- Consolidation deals: *"5 (Editor’s comment)"* (Salil, press p.7) vs *"six deals"* (CFO, press p.17).
- Q1 freshers: *"almost 4,000"* (press p.18) vs *"over 4,000"* (call p.46).
- Q3 FY26 Maximus: +40 bps (call, C-Jan26 p.22) vs *"50 basis points"* (press, C-Jan26 p.5).

---

## E. Peer: TCS alongside (summary of [`PEER-TCS.md`](PEER-TCS.md))

In the demo the TCS documents arrive on the **Canvas** as canvas files, never in the Library (ADR 0069
D1 / 0149 D5). Like-for-like pairs only; the full sheet names every mismatch.

| Pair | TCS | Infosys | Read |
|---|---|---|---|
| CC growth QoQ, Q1 FY27 | +0.4% (TCS-Jul26 p.24) | +1% (C-Jul26 p.29), of which ~1.1 pp acquired (p.30) | organically Infosys ≈ −0.1% (computed) |
| CC growth YoY, Q1 FY27 | +3.2% (TCS-Jul26 p.4) | +2.4% (C-Jul26 p.29) | TCS ahead by 0.8 pp |
| CC growth, FY26 | −2.4% (TCS-Apr26 p.7) | +3.1% (FS4 p.1) | TCS's India fall (−28.5%) is −2.5 pp of it (computed, TCS-AR26 p.69) |
| Operating margin, Q4 FY26 (no one-offs either side) | 25.3% (TCS-Apr26 p.6) | 21.0% on ₹ (FS4 p.5) | 430 bps |
| Operating margin, FY26, ex one-offs | 25.0% (TCS-AR26 p.58) | 21.0% adjusted (FS4 p.6) | 400 bps; Infosys's reported 20.3% includes the Labour Codes charge TCS excludes (§1.6) |
| Operating margin, Q1 FY27 | 24% (TCS-Jul26 p.4), wage increments −170 bps | 21.1% (C-Jul26 p.30), wage hikes from October (p.31) | 290 bps; flatters Infosys until Q3 |
| FCF conversion, FY26, on Infosys's definition | 97.7% (computed, TCS-AR26 p.172) | 112.3% (AR26 p.17) | Infosys converts more |
| Cash returned in FY26 (cash basis) | ₹39,437 cr dividends, no buyback (TCS-AR26 p.173) | ₹36,711 cr incl. the buyback (§1.5) | match on basis |
| Revenue guidance | none: "we don't provide any specific revenue or earnings guidance" (TCS-Jul26 p.2) | 1.5–3% CC for FY27 (C-Jul26 p.29) | only Infosys can be held to a number |
| AI revenue | US$2.6 bn annualised, +13.6% QoQ, ≈8.5% of revenue (computed) (TCS-Jul26 p.2) | 8.2% of revenue (C-Jul26 p.30), "AI first" revenue only, excluding AI-augmented work (p.39) | **definitions differ**; the closeness proves nothing |
| Deals | all-deal TCV US$9.5 bn (TCS-Jul26 p.2) | large-deal TCV US$3.6 bn, 61% net new (C-Jul26 p.31) | **not comparable**; never ratio one to the other |
| Headcount, Jun-26 | 5,93,798 (TCS-Jul26 p.7) | −500 QoQ after +2,000 acquired (C-Jul26 p.31) | TCS has ~1.8× the people for 1.5× the revenue |

## F. The honest boundary: what this corpus does not hold

Shown quietly, never as a headline (D12). True of the corpus (D2):
- **No Q4 FY26 earnings call** (FS4 only): no Q4 margin walk, no Q4 net-new TCV share.
- **No Q1 FY26 or Q1 FY27 factsheet**: Q1 FY27 ₹ revenue, the segment table, client buckets and DSO
  history rest on the call alone or are n/f; Q1 FY26 segment shares, DSO and buckets are n/f.
- **The FY25 starting guidance band** is not in the corpus (only the January raise to 4.5–5%).
- **No broker note after 18 Feb 2026**: HSIE's model predates both FY27 guidance prints.
- **Versent (Telstra JV):** no closing in the corpus; C-Jul26 does not mention it.
- **Infosys's large-deal threshold** is not printed, so its TCV cannot be scaled against TCS's.

Needs data nobody gave us: consensus estimates ("brokerages had projected… ₹7,500–7,800 crore", Sahi
p.1, unnamed, is the only estimate in the corpus); live peer prices; the AI-deflation size (management
"do[es] not quantify", C-Jul26 p.39).

## G. What v1 corrected or settled in v0

- **FY27 guidance is now the issuer's**, and it was cut: April 1.5–3.5% (confirmed by the CFO, C-Jul26
  p.34) → July 1.5–3% (p.29, p.33), ~1.7 pp of it from acquisitions (p.33). v0 had it "only in Sahi"
  (O6 answered).
- **The CEO succession is in the corpus:** Ashiss Dash from 1 Apr 2027 (C-Jul26 p.27; press p.4).
- **The Life Sciences jump is linked to the NHS deal in the corpus**: asked about "almost $44 mn of
  incremental revenues" in healthcare, the CFO said "healthcare did benefit from the contribution from
  the NHS deal" (C-Jan26 p.27). v0 said the corpus does not make the link.
- **Capital return reconciles** (§1.5): ₹37,500 cr is the issuer's declared-for-FY26 figure (AR26 p.27),
  ₹36,711 cr the cash paid in FY26 (CFS4 p.7). v0 called it unreconciled (ledger A-01, amended).
- **The Labour Codes charge** is confirmed on FS3 p.4 (IFRS, inside operating profit) and CFS3 p.3 (Ind
  AS, exceptional), and on FS4 p.6 for the year; v0 asked to confirm the page (§1.6).
- **The ₹774 cr tax reversal** is all of FY26's and all in Q4 (FS4 p.5, p.6).
- **The Q3 FY26 property gain** (₹165 cr, ≈36 bps) sits inside the IFRS margin (§1.6, §D3).
- **PR-S / PR-C mapped:** `_PR_24062026.pdf` = Sentara, `_2` = the ANA CMO Growth Council and LIONS.
- **The Q2 FY26 EPS** is ₹17.76 (FS3 p.4); the call transcript's "Rs. 17.6" is a transcription slip.
- **Maximus in Q3 FY26** was 40 bps on the call and 50 bps at the same day's press conference (C-Jan26
  p.22, p.5); the walk sums with 40.
- **The healthcare build-out** spans five documents, not four (§C5).

**v0 checklist (§6), resolved.** PR-S / PR-C: mapped and read. Newer documents: the Q1 FY27 call (no
factsheet added). Margin bridge per quarter: §1.3. Vertical × geography: §1.2. Q1 FY26 vertical mix,
DSO, buckets: n/f. Q4 FY26 net-new TCV share: n/f. AR citations in the prototype: phase 1 (ledger
A-09; the checker finds them). TCS peer sheet: §E.

## H. The prototype against this corpus

- **Coverage.** `DOCS` (L3967–3976 at baseline) registers **8 of 19**. Absent: the four 2025 calls, the
  consolidated and standalone statements, the two June-2026 press releases, and the new Q1 FY27 call
  (C-Jul26). Phase 1 registers them (D2).
- **Shown well:** the AI net-effect contest; the Labour Codes break in the margin series; headcount vs
  utilisation; the three growth bases.
- **Now wrong by date:** the FY27 guide "arriving only through a news piece" (the call confirms and cuts
  it); "no company evidence" after 24 Apr (ledger A-08); View health's newest evidence (A-12).
- **Missing, now researched:** the FY25 miss and the FY26 ratchet (§B1); bookings vs conversion (§C2);
  Maximus reinvested and sub-contractor costs (§C3); segment margins (§1.7); the tax-reversal "beat"
  (§C8, §D1); the healthcare thread (§C5); the Versent slip (§B3); the pricing admission and AI
  deflation (§A5, §C14); the vertical slowdown (§C4); the CEO succession (§C11); acquisitions carrying
  the band (§C12).
- **Defects:** ledger A-01 … A-15 (A-01, A-07, A-08, A-12 amended for v1).

## I. The first 90 seconds (proposal for sign-off, PLAN 0.7)

What the Library's first screen should say for Infosys at 31 Jul 2026, built only from this file.
Figures as the prototype would print them (D5); each opens its page.

**Key figures** (value · period · change · basis):
- **CC growth +2.4% YoY** · Q1 FY27 · +1% QoQ, ~1.1 pp acquired · against the FY27 band **1.5–3%**, cut
  from 1.5–3.5% · C-Jul26 p.29–30, p.33
- **Operating margin 21.1%** · Q1 FY27 · +20 bps QoQ · IFRS, against the 20–22% band · C-Jul26 p.30
- **Large-deal TCV US$3.6 bn** · Q1 FY27 · 61% net new · C-Jul26 p.31
- **Utilisation 84.9%** · Q1 FY27 · +1.9 pts · ex-trainees; headcount −500 after +2,000 acquired · C-Jul26 p.31
- **AI services 8.2% of revenue** · Q1 FY27 · from 5.5% in Q3 FY26 · "AI first" definition · C-Jul26 p.30, p.41
- **FCF 116.5% of net profit** · Q1 FY27 · US$955 mn · C-Jul26 p.31

**This quarter, in one line.** "Neutral revenues, strong margins, strong free cash flow and very strong
large deals" (the CEO's own summary, C-Jul26 p.48); the guidance cut and the one-offs are what that
sentence leaves out (§A2, §A3).

**The debate.** *Is Infosys buying its growth band?*
- *For:* bookings are strong (FY26 large-deal TCV +28%, Q1 US$3.6 bn); AI work 8.2% of revenue and
  climbing; the margin band has held every year; FCF above profit; capital returned above profit.
- *Against:* ~1.7 pp of the 2.25% midpoint is acquisitions, so the organic midpoint is ~0.55% against
  ~2.3% in April (N4A, §A2); bookings are not converting (§C2); AI deflation is now a named guidance
  headwind (§C14); the Q1 margin needed +70 bps of currency and ~+30 bps of a one-time benefit (§A3).

**Said vs did** (from §B): FY25 raised to 4.5–5% → 4.2%, **missed** · FY26 raised three times to 3–3.5%
→ 3.1%, **bottom half** · FY27 **cut in its first quarter** · Maximus "to further aid in margin
improvements" → savings reinvested (adjusted margin 21.1% → 21.0%) · the 20–22% margin band, **met**
every year.

**The street.** One broker note: HSIE, 18 Feb 2026, BUY ₹1,870 (from ₹2,100) at 21× Mar-28E EPS, written
at ₹1,391, modelling FY27 US$ revenue +6.7% (HSIE p.1, p.8), before both guidance prints. The Q4 "beat"
against brokerages' ₹7,500–7,800 cr (Sahi p.1) was mostly the ₹774 cr tax reversal (§C8). At the 31 Jul
close of ₹1,130.1 (the prototype's daily series, D15; not page-checked) HSIE's target implies +65%.

**The honest boundary** (quiet, D12): Q1 FY27 numbers are management's words on a call, no factsheet; no
Q4 FY26 call; no broker note since February; no consensus feed.
