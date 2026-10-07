# Prototype update — the accuracy ledger

> **status:** working (temporary) · **authoritative for:** every known place where the prototype is
> wrong — a wrong or misattributed figure, a false "not disclosed", a dead or misdirected citation, an
> inconsistency, or a function that produces a wrong answer · **last verified:** 2026-10-06 (phase 1 closed: every P0/P1
> `fixed`; checker 945 · 0 fail) · 2026-10-05 (v0, at baseline `102c2ef`); truths amended 2026-10-06 where the v1 dossiers and the new Q1 FY27 calls moved
> them (A-01, A-07, A-08, A-12, A-19, A-27 — each marked **v1**).

**Why this file comes first.** The product's pitch is provenance, and the research found one wrong
number is the fastest way to lose an analyst (`research/ANALYST-USER.md` §6). `verify-prototype`
passes 261/261 with every item below present — it checks wiring, not truth.

**How to use it.** Phase 1 fixes P0 then P1; P2 is fixed when its surface is reworked. Mark an item
`fixed (phase · step)` when done (the step's note in `PLAN.md` says how); never delete one. A new defect gets the next id. Line numbers are at
baseline — re-grep. **Pages are the PDF page index** (what a viewer lands on) unless marked
*printed*. Document codes are defined in the two dossiers (`research/DOSSIER-*.md` §0).

**Provenance of these findings.** Each was found by a review agent reading the prototype and the
source PDF; the ones marked ✔✔ were found **independently by two agents**. Every item is to be
re-read on its page in phase 0 (`tools/pdf_pages.py`) before the fix is written — a fix ships with
the same confidence as the bug.

Priority: **P0** wrong figure / wrong conclusion / wrong answer on the live path · **P1** false
absence, misattribution, inconsistency an analyst would spot · **P2** minor.

---

## 1. Infosys — figures, citations, claims of absence

**A-01 · P0 · ✔✔ · Library "what the owner gets" · L6375–6376** `fixed (phase 1 · 1d)`
- **Prototype:** "over ₹37,500 cr" returned to shareholders, cited to **FS4 p.6**; presented as "most
  of what the business earned".
- **Truth:** FS4 p.6 has no such figure; it comes from the **Sahi news article p.2**. The filings give
  dividends **₹18,653 cr** (CFS4 p.7) + buyback **₹18,058 cr** (AR26 p.296) = **₹36,711 cr**; the CEO
  says "over US$4 billion" (AR26 p.19). ₹36,711 cr is about **125% of FY26 profit (₹29,440 cr)** — not
  "most of" it.
- **Fix:** cite the filed total with both pages; if the ₹37,500 cr appears, attribute it to Sahi and
  state it does not reconcile.
- **v1 (2026-10-06) — truth refined:** the ₹37,500 cr **is** the issuer's: "Over ₹37,500 crore has been
  returned to shareholders **for** fiscal 2026" (AR26 p.27), the declared basis = interim ₹9,534 cr +
  final ₹10,117 cr + buyback ₹18,000 cr = ₹37,651 cr (AR26 p.39); Sahi repeats it as "in FY26". ₹36,711 cr
  is the **cash paid in** FY26 (CFS4 p.7). Both reconcile; they are two bases. Either is above 100% of
  FY26 profit (125% cash, 128% declared incl. buyback costs), so "most of what the business earned" stays
  wrong. **Fix (replaces the above):** cite AR26 p.27 (or the cash figure, CFS4 p.7) and name the basis.
  Detail: `DOSSIER-INFOSYS.md` §1.5.

**A-02 · P0 · ✔✔ · What changed (₹ revenue, margin) · L4417–4471; `GAP_INR` L4910** `fixed (phase 1 · 1d)`
- **Prototype:** Q3 FY25 and Q2 FY26 marked "Not acquired"; coverage "3 of 6".
- **Truth:** **FS3 p.4** (in scope) prints ₹41,764 cr / 21.3% (Q3 FY25) and ₹44,490 cr / 21.0% (Q2
  FY26). Q1 FY26 is not empty either: C-Jul25 p.18–20 gives margin 20.8%, utilisation 85.2%,
  headcount 323,788; revenue derives as 9M − Q2 − Q3 = ₹42,279 cr / US$4,942 mn (FS3 p.3, p.5).
- **Fix:** fill the cells (derived ones marked derived); coverage becomes 6 of 6 for these series.

**A-03 · P1 · Library structure · L6413** `fixed (phase 1 · 1d)` — "No segment-level margin is disclosed." **Truth:** AR26
**p.81** gives FY26 vs FY25 segment operating margins (FS 25.3 vs 24.6 · Mfg 22.1 vs 19.3 · EURS 25.1
vs 28.1 · Retail 30.7 vs 32.3 · Comm 17.7 vs 17.5 · Hi-Tech 23.1 vs 24.6 · LS 20.0 vs 22.5 · total
23.7 vs 24.1).

**A-04 · P1 · Library / Canvas · L4581, L5187** `fixed (phase 1 · 1d)` — "No disclosure of subcontractor cost." **Truth:**
AR26 **p.79**: subcontractor cost 8.6% of revenue vs 7.9%, attributed to "higher use of
sub-contractors".

**A-05 · P1 · Graph detail · L5630, L5656, L5642** `fixed (phase 1 · 1d)` — AI's share of revenue is stated "only… by a
broker"; the Anthropic partnership "not from an issuer document". **Truth:** issuer documents carry
both — AID p.10, p.42, p.44; AR26 p.19 (AI 5.5% of Q3 revenue).

**A-06 · P1 · Graph detail · L5469** `fixed (phase 1 · 1d)` — financial services share "drifted down for three quarters".
**Truth:** 27.7% → 28.2% → 28.0% (FS3 / FS4 p.1) — not a three-quarter drift.

**A-07 · P2 · Timeline · L6250** `fixed (phase 1 · 1d)` — final dividend "paid" 25 Jun. **Truth:** Sahi p.2 says
"scheduled". **v1 (2026-10-06):** at the demo date it has been paid: the CFO reports cash of US$3.9 bn
"after returning more than US$1 bn as dividends" in Q1 FY27 (C-Jul26 p.31), the ₹25 final dividend
(AR26 p.39). Keep "paid 25 Jun", cite C-Jul26 p.31 and AR26 p.39, not Sahi.

**A-08 · P1 · Timeline · L6257** `fixed (phase 1 · 1b)` — "no company evidence in scope" from 24 Apr to 31 Jul 2026.
**Truth:** the AR26 letters are dated 22–23 May (AR26 p.18–19); two press releases are dated 24 Jun
2026 (not registered in the prototype's `DOCS` — register them, D2). **v1 (2026-10-06):** the Q1 FY27
press conference and call (board 23 Jul, filed 28 Jul 2026, C-Jul26) also fall in the window: it holds
the FY27 guidance cut and the CEO succession. Register it.

**A-09 · P0 · citations, all AR · e.g. "ar26 p.318"** `fixed (phase 1 · 1c)` — annual-report citations use the **printed**
folio while transcript and factsheet citations use the PDF page. AR26's printed numbers run about 30
higher than the PDF index in its back half (PDF p.81 = printed p.111); PDF p.318 is an
FX-sensitivity page. A page-opening viewer lands on the wrong page. **Fix:** PDF page index
everywhere (D5); re-derive every AR citation.

**A-10 · P1 · Library structure** `fixed (phase 1 · 1d)` — geography shows **reported** growth (Europe +11.4%) beside
segments in **constant currency** (Europe CC +4.1%). **Fix:** one basis (CC) and say so.

**A-11 · P2 · What changed** `fixed (phase 1 · 1d)` — the "6 quarters" chip, though most Infosys series hold 3–5 (until
A-02 is fixed).

**A-12 · P1 · Dashboard View health · L10648, L3953** `fixed (phase 1 · 1a)` — "newest evidence 24 Jun, 37 days", but the
newest document in scope is 23 Apr (L3970, L3975); `verify-prototype` itself prints 99 days.
**v1 (2026-10-06):** once C-Jul26 is registered (A-08), Infosys's newest evidence is 28 Jul 2026, 3 days
before the demo date; HDFC's is the Q1 FY27 call filed 24 Jul (Cjl26), 7 days.

**A-13 · P2 · Dashboard decision log · L10608–10609** `fixed (phase 1 · 1g)` — two consecutive "no view →" entries (HDFC's
chain, L13305, is correct).

**A-14 · P1 · Dashboard · L10616, L3961** `fixed (phase 1 · 1a+1b)` — "No Q1 FY27 results yet" on 31 Jul. Resolved by D3 (new
documents) and the demo date (D15).

**A-15 · P0 · evidence viewer · L7008** `fixed (phase 1 · 1h)` — citations that open the *"No facsimile… This prototype
transcribes a subset"* toast: Infosys **FS4 pp.3–4**, **FS3 pp.2, 3, 5**. Every citation reachable
on the demo path must open its page.

## 2. HDFC Bank — figures, citations, claims of absence

**A-16 · P0 · ✔✔ · Library story, lead `cd-glide`, falsifier f3 · L12562, L12949, L12451, L12556,
L13289** `fixed (phase 1 · 1e)`
- **Prototype:** "No loan-to-deposit ratio appears in any deck in scope · the 94.6% figure reaches
  this workspace only through a broker note"; and the conclusion "Deposits are still winning" ("In
  Q1 FY27 deposits grew 13.3% and advances 10.8%").
- **Truth:** no deck prints a *labelled* LDR line, but **Q1D p.5** prints net advances ₹30,373 bn and
  deposits ₹31,708 bn (Jun-26) → **95.8%**, and ₹29,372 bn / ₹31,053 bn (Mar-26) → **94.6%**. The
  issuer also states it: "96 per cent as on March 31, 2025" (AR25 p.33); "about 95%" (Cjl25 p.3).
  The ratio **rose 120 bps** in the quarter; incremental LDR was ~153% (net advances +₹1,001 bn vs
  deposits +₹655 bn, Q1D p.5). The prototype's 13.3% vs 10.8% pairs **average deposits with average
  AUM**; on like-for-like bases advances outgrew deposits — Q1D p.2 prints, YoY: deposits average
  13.3% / period-end 14.7%; AUM average 10.8% / period-end 12.4%; **gross advances average 13.4% /
  period-end 15.4%**. *(Q1D p.2 and p.5 re-read on the page 2026-10-05 with `tools/pdf_pages.py`:
  p.5 net advances 26,284 / 29,372 / 30,373 and deposits 27,641 / 31,053 / 31,708 ₹ bn for Jun'25 /
  Mar'26 / Jun'26 → LDR 95.1% / 94.6% / 95.8%.)*
- **Fix:** LDR becomes a computed, cited series (labelled *computed from the balance sheet*); the
  story, the lead and falsifier f3 are rewritten on stated bases. This also changes the Dashboard
  view.

**A-17 · P0 · ✔✔ · Library / Dashboard · L12319, L12805, L13292** `fixed (phase 1 · 1e)` — specific PCR "66%, down 170
bps", cited to **Q1D p.19**. **Truth:** Q1D p.19 and KPj p.2 show **67% → 66%** in whole numbers;
AR26 p.425 gives Mar-26 at 67.21%. The 170 bps is **Investec's**, quoted in the **Upstox article
p.3** — consistent with the issuer only if June was ~65.5%. **Fix:** cite the issuer's 66% and, if
the 170 bps is kept, attribute it to Investec via Upstox.

**A-18 · P0 · Library "what could change the answer", Timeline · L11873, L13025–13027** `fixed (phase 1 · 1b+1e)` — "publishes
no numeric guidance" ("low 90s", "none"). **Truth:** Cj26 **p.6**: "FY '26 90% to 96%… FY '27 85% to
90%" for LDR (softened on p.8 to "around the 90%"); Cj26 **p.17**: FY27 growth "a couple of hundred
basis points" above a 12–13% system. Also Ca25 p.11–12: "85 to 90… in FY '27".

**A-19 · P1 · Timeline, Dashboard, governance lead · L13059, L13300, L12545–12546** `fixed (phase 1 · 1e)` — the chairman
story "reaches this workspace through a news article, not a filing"; "nothing in the record tests"
the March claims. **Truth:** AR26 (registered as `ar26`) holds the law firms' finding, received 26 Jun
2026, that the claims were "not substantiated by the record reviewed and witness interviews" (AR26
p.41–42, p.37), and Rajiv Kumar's appointment as additional independent director from 30 Jun 2026,
proposed part-time chairman **"subject to approval of RBI"** (AR26 p.4, p.18); Keki Mistry's interim
term extended to 18 Sep 2026 (AR26 p.315). Upstox p.1 calls him "new chairman" — the filing is more
careful; check the Dashboard falsifier that says he "was welcomed as chairman".
**v1 (2026-10-06):** the welcome is now on the record: the CEO "heartily welcome[s] our new Chairman,
Rajiv Kumar" on the Q1 FY27 call (Cjl26 p.3), which does not mention RBI approval. The board appointed
him on 29 Jun 2026 "subject to approval of RBI and shareholders respectively" (AR26 p.38). Say
"proposed chairman, RBI approval pending in the filings" and cite both.

**A-20 · P1 · What changed (GNPA) · L12306–12308** `fixed (phase 1 · 1b)` — Q4 FY25 "broker note… not a filing", Q2 FY26
"no value". **Truth:** KPm p.2 gives **1.33%** (also AR25 p.380); KPd p.2 gives **1.24%**. Both files
are absent from the prototype's `HDFC_DOCS` — fill by registering them (D2).

**A-21 · P1 · citations · L12410, L12435, L13328** `fixed (phase 1 · 1c)` — "AR FY26 p.1" cited for DPS and customer count.
PDF p.1 is the exchange covering letter; DPS ₹15.50 is on **AR26 p.30**.

**A-22 · P2 · Library** `fixed (phase 1 · 1e)` — Net NPA "flat across five quarters". **Truth:** 0.5% at Jun-25 (Q1D p.17)
→ flat four quarters.

**A-23 · P2 · Timeline / broker drawer · L13053** `fixed (phase 1 · 1e)` — "Price when written ₹812" is DevenChoksey's only;
AxisDirect's was ₹800 (AX p.1), Geojit's ₹799 (GJ p.1).

**A-24 · P1 · all HDFC surfaces · e.g. L12411, L13013, L13321, L13348** `fixed (phase 1 · 1e)` — HDFC figures in **₹ bn**
while Infosys uses crore; one drawer mixes ₹ bn with "5.6 crore shares"; the Graph details panel
shows **₹43,975 bn** beside **₹11,25,000 cr**. **Fix:** D5.

**A-25 · P2 · Business structure** `fixed (phase 1 · 1e)` — "Other retail" silently includes gold loans, which grew ~35% YoY
(KPj p.1). Disclose.

**A-26 · P0 · evidence viewer** `fixed (phase 1 · 1h)` — HDFC citations that open the "No facsimile" toast: **Q1D pp.2, 5,
6, 7, 11, 14, 16, 33** and **Q3D p.3** — including the first figure of the Library lede, ₹43,975 bn
(L12399).

**A-27 · P2 · Timeline · L13063, L6188** `partly fixed (1b: band removed) · layout → phase 3.8` — the "no earnings call" gap band crosses the Funding lane
from Jan to Jul with two events plotted inside it; the axis is hard-coded. In screenshots, labels are
clipped at the right edge ("Q1 FY27 · margin at 3.26…", "New chairman name…") and collide.
**v1 (2026-10-06):** the band itself is now wrong in extent: the Q1 FY27 call (18 Jul 2026, Cjl26) is in
the corpus, so the only missing earnings call is Q4 FY26 (18 Apr 2026). The gap is one event, not a
Jan–Jul span.

## 3. Cross-cutting consistency

**A-28 · P1 · L3961, L14232** `fixed (phase 1 · 1a)` — `TODAY = '31 Jul 2026'` while the price is "as of" 6 Aug (INFY) / 7
Aug 2026 (HDFCBANK). Resolved by D15.

**A-29 · P1 · Graph Ask scope line · L4746/L4755, L12675–12690** `fixed (phase 1 · 1f)` — Infosys says "9 nodes · 4
documents" but focuses 10; HDFC says "8 nodes · 5 documents" but focuses 10 and cites 4.

**A-30 · P1 · Graph details** `fixed (phase 1 · 1f)` — per-node "notes" are interpretive sentences with **no citation**
(provenance rule). Cite them with a standing label, or drop them.

**A-31 · P2 · Dashboard custom metric · L11025, L11033** `fixed (phase 6.3)` — the value is typed free text but labelled
"inherits their citations".

**A-32 · P2 · Dashboard · L3584, L3562, L10914** `fixed (phase 6.3)` — the role matrix says only the Owner moves
conviction and "You" are a Commenter on HDFC, but `dbConv` does not check the role.

**A-33 · P2 · sign-in · L3269 vs L3554** `fixed (phase 2.5)` — login email `analyst@node4analytics.com` ≠ account email
`you@fund.in`.

**A-34 · P1 · Graph (HDFC)** `fixed (phase 1 · 1f)` — the branch mix is drawn as "geography" under a hub whose comment says
it answers "where revenue comes from" (L7094). Branches by centre type say nothing about revenue.

**A-35 · P1 · Graph (HDFC) · `COMMUNITY_GROUP` L7103** `fixed (phase 1 · 1f)` — HDFC's five subsidiaries are grouped as
**"Partners"** / "External entity". They are group companies.

**A-47 · P1 · Library market card, 5Y / Max range (HDFC) · `HDFC_MARKET.monthly` ~L12150–12167** `fixed (phase 1 · 1a)` —
every HDFC monthly close is dated **one month early**, back to 1995: the point labelled 30 Jun 2026
(₹748.15) is the 31 Jul 2026 daily close, 31 May (₹797.95) is the 30 Jun close, 31 Jul 2025 (₹951.6)
is the 29 Aug 2025 close. Measured over the 61 months both series cover: HDFC's monthly point equals
the **next** month's last daily close in 59, and the two left are the appended August points
(`'2026-07-31',735` is a part-August close, `'2026-08-07',731` the last bar). Infosys's monthly series
is correct (61 of 61 equal their own month-end). **Fix:** relabel each HDFC monthly point to the
following month-end; drop the part-August point; end at 31 Jul 2026 (D15). *(Found 2026-10-05,
phase 0.2, by comparing the two series in the file.)* The daily series is bonus-adjusted across the
1:1 bonus (record date 27 Aug 2025): no false drop.

## 4. Functions that produce a wrong result

**A-36 · P0 · Graph Ask · `grAsk` ~L7630** `fixed (phase 1 · 1f)` — returns the same scripted answer for every chip and for
anything typed, and never shows the question back. Clicking "Why did headcount fall while revenue
rose?" returns the AI-tailwind answer. The most likely live click returns a wrong answer.

**A-37 · P2 · Graph search · L7755** `fixed (phase 4)` — search silently changes the selection without refreshing
Details.

**A-38 · P1 · Canvas share modal · L10456–10506, L10526** `fixed (phase 1 · 1g)` — hard-coded to Infosys: mentions an HSIE
licence (HSIE is not on the board), "both workbooks and both documents" (the board has one of each);
on HDFC it marks the Q1 deck, the annexure and AR FY25 as **withheld for every person**, Editor
included.

**A-39 · P1 · Canvas · `cvHaystack` L9142–9144** `fixed (phase 1 · 1g)` — hard-codes "infosys infy", so an HDFC memo brief
that names Infosys is not declined. (Also an issuer name in a renderer — D14.)

**A-40 · P1 · Canvas · L9543** `fixed (phase 1 · 1g)` — a newly added AI step has `answer:''`; Run reports "Step complete ·
0 citations" instead of declining honestly as the assistant chat already does (L10421–10426).

**A-41 · P1 · tour copy · L11583–11586, L14145–14147** `fixed (phase 1 · 1g)` — tells the viewer to add TCS, ICICI or Axis
filings to the **Library**; one company per workspace (ADR 0069 D1, 0149 D5) means they arrive as
canvas files.

**A-42 · P1 · stale model names** `fixed (phase 1 · 1g)` — `gpt-5.6-luna` on AI chips (L4810, L13656), the composer
(L10340) and Connectors (L5408); `CV_MODELS` (L9036) lists terra/nano; the inspector hint "Escalate
one rung at a time…" (L9005) is internal policy, not analyst copy. Use the current catalogue
(`services/ai/app/llm/models.toml`) — read it, do not edit it.

## 5. Copy artefacts that read as errors

**A-43 · P2** `fixed (phase 2.5)` — raw enum `not_acquired` on screen (L6986); a stray "," shown as an "Old" value
(L6742); a lone "," fallback for a falsifier's reason (L10971); "," placeholders (L3343, L3357,
L3422); hyphen "-1.2%" from `fmt.pct` beside a true minus "−8,440".

**A-44 · P2 · L11409** `fixed (phase 2.5)` — the search placeholder suggests Infosys terms in every workspace.

**A-45 · P2 · L15272** `fixed (phase 2.5)` — the Hindustan Unilever workspace name lacks "coverage" (the others have it).

**A-46 · P2 · colour semantics** `fixed (phase 2.3/6.4)` — a resolved falsifier uses `--market-up` (L2222); Library-captured
notes are tinted `--ev-reported-soft`, painting judgment as evidence (L5360, L2310); `--judgment`
equals `--accent` (L40, L78), so the tour's "the only place colour means a human decided" (L11595) is
visibly false.

**Em-dash sweep artefacts** (D14) are listed in `review/CROSS-CUTTING.md` §4 rather than here.

**Phases 2–6 integration, 2026-10-06:** remaining P2 items above are implemented. Root and independent agents repaired additional period, standing, capture and path findings during final review. Figure/page gate, displayed Library figures and citation availability receipts: work/FINAL-REVIEW.md. Agent verification is complete; user visual sign-off remains pending.
