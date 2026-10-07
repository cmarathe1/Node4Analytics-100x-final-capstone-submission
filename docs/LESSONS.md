# N4A — Lessons: the evidence behind the rules

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](README.md) for current scope.

> **status:** live · **authoritative for:** *why* each hard-won rule in `AGENTS.md` exists — the real
> incident, the real numbers · **last verified:** 2026-07-27.
>
> `AGENTS.md` carries the **rules**, in one or two lines each, because it is loaded into **every**
> session. This file carries the **stories**, and is opened only when you need to know whether a rule
> applies to the case in front of you. Splitting them cut ~5 KB off the cost of every session while
> losing nothing: a rule with no evidence gets argued with, so the evidence is kept — just not in the
> hot path.
>
> **Adding a lesson:** land the rule in `AGENTS.md` (≤ 2 lines, imperative) and the incident here
> under a matching heading. If you cannot state the rule in two lines, you have a finding, not a rule.

---

## 1. A gate that can never fire is as dishonest as one that fires wrongly

**Rule:** every detection gate needs **must-fire positive cases** beside its must-not-fire negatives.

**The incident — finding ⑨.** The harvest gold set was **16/16 green** while the live connection
layer contained exactly **one edge**. The suite tested only precision: it could confirm that nothing
wrong was emitted, and was structurally incapable of noticing that almost nothing was emitted at all.
A tightened rule had driven output to near-zero, and the scorecard read "clean".

**A third tell, found 2026-08-27 — a gate can read a code path the CODE DOES NOT USE.** The two
instances above are about what a gate *asserts*. This one is about what it *looks at*. Docs-drift
gate 1b was written on 2026-08-17 with the explicit rationale *"table presence was never the thing
that drifts: a table is created once, columns are added forever"* — and its parser read only
``CREATE TABLE`` bodies. This schema is idempotent by decision, so **102 of its columns arrive by
`ALTER TABLE … ADD COLUMN IF NOT EXISTS`**, and rung 6a-i's arrive inside a `DO $frame$` loop where
the table name is a `format(%1$I)` variable that never appears beside the column. The gate was green
for ten days on the fact that somebody had hand-documented those columns anyway, and it was hiding
**29 undocumented ones**. It fired on real drift within a minute of being fixed — then caught a row
the very same doc pass had deleted by accident.

**So the check to run is: name the mechanism this gate is protecting against, then confirm the gate
READS that mechanism.** A gate written from the schema's *idea* rather than the schema's *text* will
pass forever. Cheap proof, and it is the one that would have caught this: feed the gate the real
artifact and count what it sees — 102 columns invisible to a column gate is not a subtle signal.

**The sibling rule — grade properties, not membership.** For a gold set over anything under rework,
ask *"did this get typed into the wrong family?"* rather than *"is X in the list?"*. A membership
gold freezes the design the slice exists to change. That was the 1A `driver_coverage` lesson
(ADR 0042 / 0049).

## 2. Bind a behavioral check to ONE item, and score only KEPT output

**Rule:** never search a whole result list for a property; bind to the one item the case is about,
filter to kept output first, and normalize anything date-shaped before comparing.

**The incident — the 1F-0 `propositions` gold review.** Checking "does ANY produced claim carry
subject S / modality M / period P" **independently per field** let unrelated fields from *different*
claims — or from a REJECTED mention the pipeline discards — combine into a false green the analyst
never actually receives.

**The date trap in the same family.** A bare-year substring check passes on the exact mis-map it
exists to catch: *"quarter ended 30-Jun-2025"* contains the literal, wrong `"2025"` when the correct
answer is Indian **FY2026**.

**The proof the fix was real:** after tightening, the RED baseline was **numerically unchanged** —
confirming the earlier greens were genuine, not scorer artifacts.

## 3. Never score CAPABILITY DECLARED where you mean OUTCOME DELIVERED

**Rule:** reachability means **declared AND observed-populated on real evidence**. An explicit
unknown/unspecified floor never counts as populated.

**The incident — 1F-2, finding ⑭.** A check asking *"does the contract have a `voice` field?"* is
satisfied by the very act of adding the field. So the slice that lands the **carrier** silently
harvests the greens the slice that **populates** it was supposed to earn. The unchanged check would
have moved `propositions` from **5/30 to ~19/30 while the analyst received nothing.**

1F-0 had even left a tripwire test *predicting* the flip. The resolution: **strengthen the rule, never
relax the test.** Close the symmetric trap in the same change — whatever the check reads for evidence
(a snapshot, a receipt) must be able to *express* the populated fact, or the next slice inherits a
gate that cannot fire. Prove the fix by showing the headline number is **numerically unchanged**
across the landing.

Crediting an unknown floor scores a non-answer as an answer. This was the **third** instance of one
family — see also §1 and §4.

## 4. Prove a change on an instrument the change can actually MOVE

**Rule:** before adopting a baseline as a slice's parity target, trace the input path and confirm the
slice is upstream of it.

**The incident — 1F-1.** Evidence *selection* was chartered to clear parity against `propositions`.
But that suite feeds hand-authored passages straight into `extract_mentions`, so it never touches
selection at all: the number is **structurally immovable** by a planner. Confirmed empirically —
exactly **5/30 before and after**. Watching it would have been finding ⑨ inverted: a green that proves
nothing, because the gate cannot fire.

**The fix:** a new instrument at the right altitude — `coverage`, re-using the same gold passages as a
**recall probe**, scored head-to-head against the *real* legacy code path over an identical parse.
Never a re-implementation of the legacy path, which would drift and flatter the new work.

**Corollary — give a probe three states, not two:** `selected` / `missed` / `unparsed`, so a parse gap
is never charged to the component under test and never laundered into a green.

**Corollary — when something FAILS TO MATCH, read what it was ASKED to match before tuning how it
matches** (2026-08-18, rung 4 / ADR 0078). Same discipline, opposite direction. `attribute_fine`
resolved on **zero** claims across the whole corpus. `ROADMAP.md` §3 diagnosed it carefully — read
the spine (42 healthy drivers, all mapped, applicable to both issuers), read `_resolve_fine`
(accepts only ALIAS or EMBEDDING at `accept 0.62`) — and concluded *"which places the failure in
matching … not in the data."* It never read the extractor's **input**. `grep -c fine
app/claims/extract.py` returned **0**: the prompt listed the sixteen ROLES under "Tracked
attributes" and told the model to *name the closest*, so it named the group — `"Growth"` on
*"reported total revenue growth of 6.1%"*, the metric sitting in the same sentence. No threshold
change could ever have helped. Showing the model sector-scoped METRIC names moved the fine axis
**0% → 58.5%** with nothing tuned. An empty input and a too-strict threshold look identical from
the outside — the same two-state trap as above, arriving from upstream instead of downstream.

## 5. Thresholds follow REVERSIBILITY, never uniformity

**Rule:** a **merge** is destructive — two real things collapse into one id and cannot be separated
downstream. A **classification** is recoverable — remap it later. They get separate, separately-tuned
constants, with merge set conservatively.

**The incident — finding ⑫·3.** One shared threshold of `0.62` was doing both jobs on the spine, while
harvest correctly used `harvest_merge_accept: 0.92` for its merge decision.

**The same asymmetry governs auto-accept policy:** deterministic operations may auto-apply;
model-inferred ones need review (ADR 0049, D40/D41).

## 6. The manual-test gate — what a "Verify this slice" card must not get wrong

**Rule:** hand the card, update `SESSION.md`, wait for sign-off. The card's shape is in `AGENTS.md`.

**Update `SESSION.md` when you hand the card, not when you get sign-off.** Sign-off often lands in a
*different* session, and a `SESSION.md` still reading "Next: build X" makes the next session believe X
was never built. That is the **1C drift**, caught 2026-07-18 only by the progress skill's step-0a
git-vs-log diff.

**Say what a preview surface does *and does not* do.** A raw-retrieval probe shows nearest chunks —
*not* a synthesized, cited answer — and excludes numeric KPIs. Learned in ss3, where the L2 probe read
to the user as "retrieval" and the wrong thing got judged.

**Run the REAL provider end-to-end before writing the card** for any LLM-extraction/synthesis slice.
Unit tests with offline providers prove the plumbing, not the output. Learned in ss5b, where the
pinned `gpt-5.4-mini` **400'd on every call** — newer OpenAI reasoning models require
`max_completion_tokens` and reject `temperature` — *and* the first real extraction ran at ~50%
precision on AR boilerplate. Both were invisible behind 86 green tests.

**Use the REAL workspace id in every curl command.** `DEFAULT_WORKSPACE` in
`app/ingestion/pipeline.py` is **`ws-demo`**, not `default`. The wrong id silently returns
`{"nodes":[],"edges":[]}` — the assembler returns empty for an unknown workspace rather than erroring.
Keep the id in `SESSION.md`'s "What runs today" accurate too (learned ss5d).

## 7. The model escalation ladder — diagnose before you climb

**Rule:** step ONE tier on live evidence, never jump to a flagship. The ladder and the two-phase
policy are in `AGENTS.md`; the experiment protocol is in
`LIBRARY-ANALYST-READINESS.md` (reference outside this repository: `LIBRARY-ANALYST-READINESS.md`) §3.

**Diagnose first.** The C7 "the assistant feels lazy" finding turned out to be a **missing tool verb**,
not a capability gap (ADR 0038). A model swap would have masked a design bug and cost more forever.

**Record the evidence where the choice lands** — a comment at the pin plus the slice's ADR — so the
next session neither re-litigates the decision nor silently upgrades past it.

## 8. Production code never encodes tested examples

**Rule:** no company name, no gold-set instance, no few-shot example drawn from the corpus may appear
in a production code path or prompt.

**The incident — finding ㉓.** Few-shot examples naming the tested company are hardcoding: they make
the suite pass for the wrong reason and quietly fail on the held-out issuer. Fix the root class;
instances live in gold sets and tests only. The D68 held-out run — TCS and ICICI, ingested blind — is
what turns that discipline into evidence.
## 9. A corpus profile is cheaper than a phase-close surprise

**The rule.** Before scoping a slice around a document kind, **count which issuers actually have
one**. Generality is proved per slice against a declared held-out set — never at phase close.

**Bought with (2026-08-11).** ADR 0061 scoped Lane-2 numeric extraction to "the results/KPI lane"
— factsheets, key-parameter sheets, earnings presentations. The scoping was written from reading
two issuer folders. A one-command profile of `data/seed` then showed:

```text
9 issuers · 58 documents · issuers with a results/KPI doc: 2
```

Infosys and HDFC Bank hold every factsheet in the corpus. The other seven — AU Small Finance Bank,
Bajaj Finance, HDFC Life, HUL, ICICI Bank, L&T, TCS — hold **exactly three documents each**: one
annual report and two concall transcripts. The phase's largest rung would have been proved on two
companies of two sectors and shipped as general, and the failure would have surfaced at rung 24,
under every surface built on it.

The same profile paid twice: the *"sparse or poor-disclosure issuer"* archetype the charter asks for
**already exists seven times over**, so it needs no acquisition and no synthetic fixture.

**The rule this produces (ADR 0066).** A development set of at most four issuers; a **held-out set
never developed against**; a per-slice floor of ≥3 issuers across ≥2 sectors; a per-block held-out
run that asks *"correct or honestly degraded?"* rather than *"as rich?"*; and two greppable
structural checks — no issuer name in a production path, no branch keyed on sector or company.

**The generalisable form:** *a scope decision made by reading the data you know is a scope decision
made on a biased sample.* Profile first; it costs one command.

## 10. A gate that only one implementation can pass

**Rule:** rework is *supposed* to change gates. What must never happen is changing one because it is
red and the slice is late. Discriminator: **after the change, can the gate fail for a reason that is
a real defect?** If a correct-but-different implementation fails it, the gate is over-fitted and
fixing it belongs to the rung. Receipt: three numbers — old gate/old code · new gate/new code ·
**new gate/OLD code, which must still fail.** Full rule: ADR 0067.

**The incident — charter §6·4 gap 4d, still open as this was written.** The `propositions` gold
binds its selectors by **lexical substring** to phrases the incumbent extractor invented:
`('earnings outcome', 'est. vs. actual')` is `gpt-5.4-nano`'s own label, not a concept. The
consequence, from `SESSION.md`: **`extraction_model` is pinned on a knowingly RED gate.** Swapping to
`gpt-5.6-luna`@`low` dropped the suite 30/30 → 24/30, root-causing found *the pipeline* not the
model, and two eval suites have read amber ever since. **The pin cannot move because the gate cannot
recognise a correct answer phrased differently** — and `gpt-5-nano` retires 2026-12-11, so the change
is coming whether the gate is ready or not.

A gate spent ten days steering a model decision. That is the shape of the failure: not a gate that
was too weak, but one that measured **sameness instead of correctness**.

**The mirror.** §1 says a gate that can never fire is dishonest. This is its twin: a gate that can
only be passed by the implementation it was authored against is equally dishonest, and harder to
spot — it reads green right up until someone tries to improve the thing underneath it.

**The generalisable form:** *a gold set should encode the OUTCOME the analyst needs, never the STRING
the current implementation happens to produce.* Where it cannot, it is a snapshot, and it should be
labelled one.


## 11. A red baseline EXPIRES the moment the corpus is re-derived

**The rule.** A baseline is a *measurement*, not a constant. Any slice that re-extracts, re-ingests
or re-resolves invalidates every downstream rung's stored baseline. **Re-measure at slice start and
correct the plan in the same pass — never quote a number you did not just take.** Corollary for
gates: a doc-level gate that checks *containers* (tables, files, sections) does not check
*contents*, and contents are what drift.

**Bought with (2026-08-17, rung 3 sign-off).** `PHASE-2-LADDER.md` wrote rung 4's red baseline while
sequencing the phase: **558 claims across 11 buckets**, `profitability` 127 / `risk` 72 /
`capital_allocation` 56, and **20 of 558 (3.6%)** carrying a fine attribute. ADR 0059's splitting
rule was sized against those numbers — *"the 46% that cannot be renamed."* Rung 3 then re-extracted
both foundation workspaces, because its migration was re-extraction rather than a backfill. Nobody
re-measured. Live at sign-off:

```text
590 claims across 11 buckets   profitability 93 · risk 62 · capital_allocation 52
"cannot be renamed"  =  207/590  =  35.1%,  not 46%
claims carrying a fine attribute  =  0,  not 20
```

Two different-sized errors, and the second is the worse one. Mis-sizing the splitting rule by a third
is a planning error a careful implementer notices. But **the fine axis carrying nothing** is a fact
about the store that the plan asserted the opposite of — a rung-4 gate written to cross-check a
role against its fine metric would have had *nothing to check against*, and would have looked green
for the same reason an empty gate looks green.

**The second half, same session, same shape.** Rung 3 added six columns —
`quant_kind`/`value_low`/`value_high`/`assessment` to `claim_mentions`, `direction`/`assessment` to
`claim_versions` — and the drift gate stayed green through all of it, because it asserted that every
*table* in `schema.sql` appears in the physical reference. Both tables had been documented for
months. A table is created once; columns are added forever, so table presence was never the thing
that drifts. `DATABASE-SCHEMA.html` and `ARCHITECTURE.md` (still teaching `quant` as
`{direction, value, unit}`) were both silently wrong.

**What was done.** Both docs repaired, and gate **1b** added to `test_docs_drift.py`: every column
must appear in **its own table's block** of the reference. Scoping to the block is the whole point —
a whole-file search passes `claim_versions.direction` purely because `claim_mentions` documents a
column of that name, so the loose version of this gate would have been the vacuous kind §10 warns
about. ADR 0067 receipt: **new gate / old docs = 6 FAIL**, new gate / new docs = PASS.

**The generalisable form:** *anything derived has a shelf life, and the plan that quotes it does
not know when it expired.* Measure at the start of the slice that depends on it.

## 12. Every gate a producer ships points at the producer — and that is where the defects aren't

**Bought by the rung-6 audit (2026-08-27), ADR 0089 (reference outside this repository: `decisions/0089-a-rerun-must-not-empty-the-store-and-agreement-is-not-the-frame.md`)
· 0090 (reference outside this repository: `decisions/0090-the-consumer-reaches-the-filed-lane-and-segments-are-declared.md`).**

Rung 6 shipped a probe with six gates. It read 30 of 30 gold figures off the page, accounted for
1,404 cells, proved four issuers across two sectors, and printed PASS. An audit then found **eight**
real defects, and the reason it could is structural rather than embarrassing: **every one of the six
gates pointed at the producer.** None pointed at the run lifecycle, none at the consumer, and none
at the probe's own dead code.

What that let through:

- **The run lifecycle.** A second `--apply` on a populated workspace took it from 512 facts to
  **0** — a stable row id plus `ON CONFLICT DO NOTHING`, then activation of the run that had just
  inserted nothing. Every producer gate still passed, because the producer still produced 512
  facts; only the *store* had none. The CLI printed the count it had **computed**, so the log was
  identical either way.
- **The consumer.** **15 of the 30 line items the producer landed had no question that could
  retrieve them.** The facts existed, carried citations, and were unreachable. Meanwhile the
  Dashboard captioned filed figures *"Yahoo Finance snapshot"* and still promised that filed ₹
  figures would "land with the exchange-filing lane next" — months after they had.
- **The probe's own body.** `unit_failures` promised a monetary/percentage check in its docstring
  and tested `abs(value) < 1e-9 and value != 0` in its body, which is true only for a denormal
  float. It could not fire. `score_gold` could not fail on `unparsed`, so a parse regression could
  shrink the numerator while the headline still read PASS.

**The rule.** A slice that ships a producer ships **at least one gate on each of three surfaces**:

1. **the producer** — is the output right? (what rung 6 had);
2. **the lifecycle** — does the output SURVIVE a re-run, a re-resolve, an interrupted swap? Run the
   write path **twice** and assert the store is unchanged. A count computed in memory is not a
   receipt; read it back;
3. **the consumer** — can the end user REACH it, and does the surface still describe where its
   numbers come from? Copy that names a source the data no longer comes from is a provenance claim
   that is false, and no producer gate can see it.

This is `§1`'s *"a census is not a test"* aimed one layer out: counting that a producer produced
says nothing about whether the store kept it or whether anyone can ask for it. And it is the natural
extension of rule 8 — **read the output as the end user** — with the emphasis on *as the end user*:
the analyst never sees `outcome.facts`, they see a board caption, an Ask answer, and a cell drawer.

**Corollary, bought the same day.** *Collapsing on the frame is not collapsing on the number.*
Deduplicating same-frame readings without comparing their **values** hid a restatement ₹6,025 crore
wide between two audited annual reports. Comparing them naively would have manufactured six false
conflicts out of a presentation rounding 33.6% to 34%. **Agreement is judged at the precision each
source stated** — and you cannot know which case you are in without reading the actual rows.

## 13. A fix ships with the same confidence as the bug — audit it just as hard

**Bought by the SECOND rung-6 audit (2026-08-27), ADR
0091 (reference outside this repository: `decisions/0091-precision-is-printed-not-derived-and-the-numeric-route-honours-scope.md`).**

The first audit found eight defects and fixed them. A second audit found six more, and **two were
in the first audit's own fixes**:

- **The precision rule was worse than the bug it fixed.** §12's corollary says agreement must be
  judged at the precision each source stated. The implementation derived that precision *from the
  float*, reasoning that trailing zeros are an artifact of the scale multiplier — true for
  `2,565,891.41 × 1e7`, and catastrophic for a round number. `Decimal(100.0).normalize()` is
  `1E+2`, so the rule read "stated to the nearest hundred" and declared **100 and 200 in
  agreement**. It concealed more than the collapse rule it replaced. The printed precision lives in
  the verbatim cell text and nowhere else; it had to be **stored**.
- **"30/30 reachable" was a number in prose.** The fix widened the question vocabulary and the ADR
  claimed every landed line item was now askable. Nothing executed it. `borrowings` still resolved
  to `total_debt` — nineteen live facts with no question that retrieved them — and the gate finally
  written to check the claim caught a *second* collision (`cost of revenue` → `total_revenue`)
  within a minute of existing.

**Three rules follow.**

1. **A new PREDICATE is riskier than a new value, and needs its own must-not-fire set.**
   `readings_agree` was written to stop hiding disagreements and hid two more. Any predicate that
   decides "these are the same" must be fed the pairs it would be most damaging to conflate —
   `100 vs 200`, `33% vs 34%` — not only the pairs it was written for.
2. **Never derive a property the source stated.** If the record printed it, store it. Reconstructing
   printed precision from a float, a period from a publication date, or a currency from a
   jurisdiction are the same mistake at three layers, and each one looks right on the examples that
   motivated it. **And before refusing a figure for lack of a stated property, go and look at the
   page.** Turning the currency default into a refusal took gold from 30/30 to **28/30**, which is
   what forced the question the fix had skipped: HDFC's key-parameters sheet prints `(₹ bn)` in
   plain sight, and 1D₁ normalises it to `"billion"` — the magnitude survives, the mark does not.
   The census was reading element metadata and never the page. Refusal and inference are both
   wrong when the answer is *printed and unread* (eval rule 4's mirror).
3. **A number in an ADR is a claim, and a claim needs a gate.** §1 says a gate that cannot fire is
   as dishonest as one that fires wrongly; a headline with no gate at all is the limiting case.
   Before writing "N of M" into a document, write the assertion that computes it.

**Corollary, from the same audit — the scope leak.** Ask's docstring said scope "is what makes *the
AI only uses what you switch on* literally true", and its one deterministic route resolved scope
**after** it had already answered: a request with every source switched off returned six citations
from six excluded documents. It was latent for a whole stage because the vendor lane gave each
company exactly one document, and rung 6b made it live by putting seventeen filings behind the same
query. So: **when a slice multiplies the data behind an existing path, re-test that path's
guarantees — the slice did not break them, it made them observable.**

## 14. A rule fixed at one call site is not fixed

*Bought 2026-08-29, by a THIRD audit of rung 6 (ADR 0092) — whose two high-severity findings were
both the SECOND instance of a class the second audit had just repaired.*

§13 says a fix ships with the same confidence as the bug. This is the sharper version: **the fixes
themselves were correct, and they were still incomplete**, because each was applied to a call site
when the defect was a rule.

1. **The scope conversion.** `_resolve_scope` returns `list | None` and has always been right.
   Every defect has been in what a caller did with it — `None` and `[]` are both falsy and mean
   opposite things ("no scope given, read the workspace" versus "the analyst switched every source
   off"). 0091 fixed the numeric route. The findings route, forty lines up, still read
   `"selected" if doc_ids else "all"`, so a deselected-everything question came back with **8
   findings and 12 citations from 12 excluded documents** — while the numeric route, on the same
   request, correctly declined. One store, two truths. By then the same conversion had been
   written correctly three times (ADR 0082 at the HTTP client, 0065 in the graph router, 0091 in
   the KPI route) and wrongly once; the graph router's own docstring names "three surfaces, two
   truths" as the defect it exists to prevent, directly above its copy of the inference.

2. **The precision predicate.** 0089/0091 built `readings_agree` so that 33.6% and 34% collapse as
   rounding while a ₹6,025 crore restatement does not. Its step parameters **defaulted to `None`**,
   which selects exact equality. `answer_kpi` had never heard of `value_step`, did not select it,
   and could not pass it — so it silently took the pre-0089 path and went on telling the analyst
   *"CASA ratio Q3 FY2026: 33.60% … The record does not state this once: 34.00%"* over the very
   readings the Dashboard was collapsing, out of the same rows of the same store.

**So, two rules.** *When you fix a rule, grep for its other call sites before you write the test* —
the test proves the site you were looking at, and the audit finds the one you were not. Then, more
durably: *remove the choice*. Scope is now converted **once**, above every route, so a route added
later has nothing left to derive it from. A parameter whose value changes the ANSWER now carries
**no default**, so the type checker asks every caller instead of a future auditor. A convenience
default on a semantic parameter is not a convenience; it is a silent, plausible wrong answer.

**Two corollaries from the same pass.**

* **A gold witness that can go stale should be DERIVED.** 0091 replaced a prose claim of "30/30
  reachable" with a gate — which ran the matcher and stopped there. Run through the real
  `answer_kpi`, its own 30/30 is **28/30**, and both failures are in the WITNESS: `ASK_PHRASES`
  baked a company into each question and asked Infosys for a cash-flow line only HDFC had landed.
  The store already knows who owns facts for a line item. A witness composed from the data cannot
  contradict it, and it stays right when a third issuer lands. (And note the shape: *resolving* is
  capability, *answering* is outcome — eval rule 3, one layer in from where it was first learned.)
* **A stored property nobody renders is half a feature.** The whole point of storing printed
  precision is that 33.6% and 34% can legitimately agree — and both surfaces drew them to two
  decimals, `33.60%` and `34.00%`. That overstates certainty **and hides its own mechanism**: an
  analyst sees two figures of equal apparent precision and no reason on screen why the system
  treats them as one reading. The inverse trap is real too, and reading the store is what caught
  it: money must NOT be step-driven, because `₹27,73,300 crore` from a `27,733` ₹-billion cell has
  trailing zeros **forced by the unit conversion** and is exact. Digits a conversion forces cannot
  mislead; digits asserted in the unit the source itself used can.

## 15. Name the door, and check the algebra

*Bought 2026-08-29, by a fourth audit of rung 6 (ADR 0093). Both findings sit one boundary further
out than the fix immediately before them.*

**The door.** §14 said a rule fixed at one call site is not fixed. This is the same shape applied to
a *gate*: the boundary you measure at is itself a claim, and it is easy to move one step and believe
you have arrived. Rung 6's reachability gate has now been promoted twice.

| gate ran | reported | what it proved |
|---|---|---|
| `match_line_item` | 30 / 30 | a matcher resolves a phrase to an id |
| `answer_kpi` | 37 / 37 | an inner function returns a cited answer |
| `answer_question` | **2 / 37** | what an analyst receives |

Each promotion looked like the outcome from where it stood. The third number is the product: the
router requires a period or a hard numeric cue, and a bare `"HDFC Bank advances"` carries neither,
so 35 of the 37 questions fell through to narrative retrieval while the ADR said 37/37.

So: **gate at the outermost boundary the user crosses**, and where you genuinely cannot reach it,
say which boundary you gated at instead of letting the number imply the other. Two supports that
made the fix hold. **Bind every case to a real stored row** — the question is composed from the
fact's own company, period and document, so a witness cannot drift from the data it claims to
test — and **scope the request to the document the fact came from**, which re-tests the source
switch through the public path for free. A gate that constructs its own inputs tests its author's
imagination; a gate that reads them from the store tests the system.

**The algebra.** `readings_agree` was added so that 33.6% and 34% collapse as rounding while a
₹6,025 crore restatement does not. Both consumers then used it the obvious way — *collapse a
reading if it agrees with any peer we have kept* — and that is correct only if agreement is
**transitive**. It is a **tolerance**, not an equivalence. One frame, three readings:

* `34%`, printed to the whole point
* `33.6%` and `34.1%`, each printed to the tenth

The coarse reading is inside the tolerance of both; the two precise readings are outside each
other's. Each agreed with the lead, each was dropped, and the cell returned `34%` with
**`ambiguous=false`** — an active assertion that the record is settled, over two audited readings
half a point apart. The comparison added to stop a disagreement being hidden was hiding one.

**Before reusing a comparison to group or deduplicate, check the relation has the algebra that
assumes.** Equality does; "within a tolerance", "similar enough", "close to", "matches fuzzily" do
not — and a dedup loop over a *retained prefix* silently assumes it. Judge the predicate against
the **whole group** instead: the answer stops depending on which peer a reading met first, and the
safety property holds by construction (if any pair disagrees, neither is subsumed, and at most one
can be the lead — so at least one survives).

**Two smaller ones from the same pass.**

* **A total order that is not STABLE only looks reproducible.** The projection broke ties on
  `fact.id`, which is minted per (run × mention), so two equal-tier readings of one frame could
  swap places for no reason but a re-resolve. The comment above it promised "the same store renders
  the same table every time". Order on the identity that survives the run.
* **A gate stricter than the code it guards is not a passing gate — it is an unexercised one.** The
  probe's disclosure gate already compared ALL pairs, so it *would* have caught this. No live group
  had the shape and no test supplied one, so it never fired. When a gate is stricter than its
  consumer, that gap is exactly where the missing test lives.

## §16 — A receipt taken on a re-typed copy is not a receipt (rung 7 audit, ADR 0095)

**The incident.** Rung 7 replaced a tautological pack-portability test with a real one, and took
ADR 0067's three-number receipt for it: new gate on new code PASS, new gate on poisoned code FAIL,
old gate on poisoned code PASS. All three numbers were true. None was about the shipped file — the
receipt ran in a scratch script that **re-typed** the regex, while the file that shipped contained
two literal **ASCII backspace** characters where `\b` was intended, because a heredoc had eaten the
escapes. The gate matched nothing and passed vacuously: exactly the defect it replaced, wearing the
paperwork of a fix.

Two more gates in the same slice could not fire. `generality_failures` took one dict and answered
two questions with it, and the probe passed **sector labels** where the hold-out check compared
**issuer names** — so a leak was undetectable, and the unit test defending it encoded the wrong
contract by passing `{"ws-a": "HUL"}` as a value.

**The rules.**

1. **Take the receipt against the SHIPPED artifact, by importing it.** A test that re-implements
   the thing under test proves the re-implementation. Where a gate is a function, call *that
   function*; where it is a test, invoke *that test* (`test_the_pack_gate_can_actually_fire` calls
   the real one under `pytest.raises`).
2. **A parameter that answers two questions will answer one of them wrong.** Split it, and give
   each half **no default**, so the type checker asks every caller. That is eval rule 10's "remove
   the choice", applied to arguments rather than call sites — and it is what caught the second
   caller of `role_applicability` the moment its signature changed.
3. **When you widen a vocabulary, re-run every gate that CENSUSES it.** `coverage_gap` and
   `disclosure_break` went into `FindingFamily`; `finding_probe` reads that enum and requires every
   member to fire; the slice ran `lane2_probe` and `role_probe` and declared no regression. The
   probe that would have caught it in one second was the one nobody thought to run, because the
   change looked like a contract edit rather than a behaviour change.


## §17 — A projection over a display value inherits none of its guarantees (rung 7 audit 2, ADR 0096)

**The incident.** Rung 7's lead projection asked *"is this disclosure still being made?"* by reading
the cell's **display state** — `state == "available"` for present, two absence pills for absent. It
reported that Infosys had **stopped disclosing revenue and profit at Q2 FY2026**. Both statements
were false, and each was false twice over.

The "absent" cells were not empty: `value_revenue_engine/Q2 FY2026` held **three claims** and
`profitability_returns` one. And the series does not stop — it resumes at Q3 FY2026 and is still
running at the edge of the window:

```text
        Q3'25 Q4'25 Q1'26 Q2'26 Q3'26 Q4'26
filed      ok    ok   ACQ     —    ok    ok
```

Neither error is in the state machine. `expected_not_found` was doing its job under a rule that had
a genuine hole (§1 below), and the resolver's own numbers were right. The falsehood was manufactured
one layer up, by a consumer that treated a **presentation** as a **fact**.

Three more from the same audit, all of the same family — a value that had to mean more than it
could. `Acquisition.satisfied` was a bool, so *no duty exists* and *the duty is unmet* were the same
value, and `FY2026 profitability_returns` reported a broken mandate over 19 claims and 26 filed
facts. `role_applicability` returned "a pack resolved" under the name `confirmed`, so every cell
claimed a human ratification while **all 3,696** stored rows carry `confirmed = FALSE`. And a pack
removal was recorded as a **DELETE**, which is not a decision — so the reader restored the default,
the next seed re-inserted the row, and the user's edit evaporated three separate ways.

**The rules.**

1. **A consumer of a derived value must read the RECEIPT the value was derived from.** A display
   state answers *what should this look like*; it is lossy in both directions about *is this duty
   met*. If a projection needs a proposition, gate on the field that IS that proposition — and
   unit-test that the two selections agree, so a later edit cannot quietly re-point it at the pill.
2. **An availability state may not contradict the cell's contents.** `expected_not_found` asserts
   *our scope does not carry it*; a populated cell refutes that. `not_acquired` asserts the
   *source* is outside the corpus, which a populated cell does not refute — so the guard belongs on
   one and not the other, and the asymmetry has to be written down where both are defined.
3. **A claim about an ENDING must be checked to the end of the series.** "Stopped disclosing" is
   terminal by construction. An interior hole is a coverage gap, is already reported as one, and
   reporting it again under a name that asserts cessation is ADR 0086's manufactured finding. Give
   the scan a fourth verdict for *we never fetched this period's filing*: it must BLOCK the
   inference, never extend it.
4. **When a bool has to mean three things, the third one is the bug.** Make it tri-state and
   convert once, above every consumer, with an identity comparison — `None` is falsy, so `not x`
   silently reinstates the defect the type change was meant to remove. Same for a name that means
   two things: `declared` (a source spoke) and `confirmed` (a human ratified) are different facts,
   and a receipt that asserts one while the store records the other is worse than no receipt.
5. **A decision the schema cannot represent is a decision the system discards.** "This does not
   apply" needs a row, not a missing row — an absence is indistinguishable from *never asked*, and
   every reader and every seeder will resolve that ambiguity its own way.
6. **A gate may move when the store contradicts its premise — with the receipt, and never for
   convenience.** 0094 §3 required a `confirmed` applicability row before `not_applicable` could
   hide a module. No such row exists or ever has, so the rule forbade the state outright and what it
   forced was *worse* for the analyst: `not_found_in_scope` — "we have no explanation" — over the
   one role we can explain perfectly. The precondition became `declared`, which still refuses the
   guess case that 0094 was actually protecting, and `confirmed` stayed on the receipt as the true
   flag the surface needs. ADR 0067's discriminator held: the new gate FAILS on the old code.

## §18 — A rule shaped around one instance of a plural loses the others (rung 7 audit 3, ADR 0097)

**The incident, three times over.** Rung 7's third audit found nine defects. Two were in the second
audit's own repairs, and the pattern under most of them is one shape: a rule written while every
live case happened to be singular.

`read_receipts` handed the migration guard `axes.roles` as the live role registry. *Which roles are
live* and *which roles the caller asked about* are different questions, and at the only call site
they were the same value — so a read-only request for ONE role raised
`UnmigratedStoreError: 42 of 50 line items disagree` on a healthy store. That guard was written the
previous day, as the fix for a finding about a parameter answering two questions.

`effective_packs` read "any stored row means the question is answered" and dropped the sector
defaults wholesale. `packs_for_entity` returns a tuple and its docstring says applicability may be
SEVERAL — but no sector in the seed maps to two packs, so the atomic rule was never wrong in
testing. Applying one pack to a two-pack entity silently loses the other.

And `_mandate_met` judged a duty against a whole analytical ROLE, because with two issuers each
role's duties happened to be discharged by whatever landed. `inventory` and `trade_receivables`
share `cash_conversion_earnings_quality`, so either satisfied the Ind AS 7 cash-flow duty; fifteen
items share `profitability_returns`, so `roe_pct` satisfied *"profit or loss for the quarter"*. The
live store shows the cost: Infosys' only `cfo` figures come from a factsheet, so the **annual cash
flow statement has never been read**, and the duty read satisfied for a year.

**The rules.**

1. **When a type says "several", write the rule for several — the corpus is not the contract.** A
   collection that happens to hold one element in every fixture will hold two the day a real
   workspace arrives, and the failure is silent because the singular rule still returns something.
   Compose (defaults, then per-item overrides) rather than treating a set as atomic.
2. **A projection is not the universe.** Any function taking "the things that exist" must not be
   fed "the things this caller wants". Give the registry its own accessor and call it from both
   the default path and the guard, so the two cannot drift.
3. **Judge a duty at the granularity the duty is stated at.** A regulation names a disclosure; an
   analytical role is a bucket of a dozen. Where a duty can name its filed lines, name them; where
   it cannot, **report the precision you actually checked at** rather than letting the consumer
   assume the stronger one.
4. **Two independent questions get two independent answers.** Acquisition (*do we hold the
   statutory artifact?*) and satisfaction (*can we see the disclosed content?*) were ANDed, so a
   substitute source that carried the number suppressed the missing filing entirely.
5. **Uniformity is not a correctness argument.** A `not has_evidence` guard was added to
   `is_not_acquired` for symmetry with the other absence states, and it made a live producer
   unreachable. The right test is *does this state make a FALSE claim about the cell* — three of
   the four absence states are refuted by a populated cell and one is not.
6. **A jurisdiction is part of the rule, not a footnote.** Indian banks sit outside the Ind AS
   roadmap, so citing Ind AS 108 to a bank sends the analyst to the wrong rulebook. Where the
   framework varies, the carve-out is a data row and a gate requires **exactly one instrument per
   disclosure per business model** — two means a doubled gap, none means a silent hole.
7. **A register that proves a policy must be DERIVED from the policy.** The gate proving no issuer
   name is hardcoded held a hand-written token list that had silently lost three of the five
   held-out names. It was shrinking because bare-substring matching made it unpassable (`axis` in
   `no_column_axis`) — and the fix for that is a boundary match, not a shorter register.

## §19 — A rule applied as DATA on some rows is not applied (rung 7 audit 4, ADR 0098)

§18 ruled that a duty must be judged at the granularity it is stated at, and the fix was real: four
registry rows gained the filed line items that discharge them. **Six rows got nothing**, so they
kept the old behaviour, and a user-run audit found the consequence live — four mandated disclosures
reading SATISFIED off one sentence each:

> "HDFC Bank states that its diversified portfolio, supported by prudent underwriting standards,
> enhances resilience against sectoral and external shocks."

That discharged the AS 17 reportable-segment norm. The actual segment note was in the same document,
parsed, headed `15. Segment reporting`. Seven lessons, each bought here.

1. **A rule applied as DATA is applied to the rows you filled in.** §14's *"a rule fixed at one call
   site is not fixed"*, one layer out. The repair is to make the rule STRUCTURAL — a gate that every
   row declares what discharges it — so a new row cannot be added without answering the question.
   A row that cannot answer it is **withdrawn**, not asserted: two NPA sub-duties were, after
   measuring found neither is a *section* in a bank's annual report.
2. **A caveat the consumer discards is not a caveat — put it in the VERDICT'S TYPE.**
   `precision="role"` was recorded faithfully beside every false satisfaction and changed nothing,
   because the lead projection selected on `if duty.satisfied: continue`. `satisfied` is tri-state
   now, and `None` (*unverified at the precision the rule requires*) folds into neither neighbour:
   into `True` it hides a gap, into `False` it restates *we cannot tell* as *they did not disclose
   it* — an assertion about an issuer manufactured from our own limitation.
3. **A field doing two jobs is wrong in BOTH directions at once.** A duty's `role` meant *where it
   is displayed* and *what may discharge it*. A role holds a dozen disclosures ⇒ too wide. One
   disclosure spans several roles ⇒ too narrow: Ind AS 7 names a statement whose `cfo`/`cfi`/`cff`
   the role map splits in two, so the same field accepted a sentence AND rejected the filed cash
   flow statement it names. Two false satisfactions and two false gaps, one cause.
4. **Between your strongest witness and your weakest, look for the one in the middle.** Rung 7 had
   a filed figure (strong, available to three duties) and *any claim in the role* (noise). The
   missing tier was already in the store: **a note's meaning is its heading** — the same instinct as
   Lane 2's *a cell's meaning is its coordinates*. Matching parsed `heading`/`table_caption`
   elements and never body text is the single restriction that excluded all four false
   satisfactions, since none of them was a heading.
5. **Derive a vocabulary from the INSTRUMENT, then measure; never loosen it to make a number move.**
   HDFC files `DIRECTORS' REPORT` where Infosys files `Board's report` — several spellings per
   disclosure, as data. When `npa_net` came back *unverified* on HDFC it stayed unverified: HDFC's
   FY25-26 report heads it nowhere the instrument's language reaches, and ICICI verifies the same
   duty on its own `Net NPA Ratio` heading. A metric that will not move may be CORRECT (§8).
6. **An optimisation that can change the answer is not an optimisation.** The SQL pre-filter written
   to narrow the heading scan used `%auditors%report%`, which cannot match `INDEPENDENT AUDITOR'S
   REPORT`: the singular possessive puts the apostrophe INSIDE the token. Both banks' auditor's
   reports read absent over documents naming one on page one, and the plural possessive hid it
   (`DIRECTORS'` keeps its token intact). A narrowing pass must be provably LOOSER than the matcher
   it feeds, and the test that says so runs both over the real corpus.
7. **A waiver must fail while the thing is ABSENT, not when it arrives.** The generality waiver fired
   the day a third issuer was graded, asking to be removed — so a green probe was compatible with
   never satisfying ADR 0066 at all. Its premise was false too: it said every candidate sat behind a
   hold-out, and two did not. **Check a waiver's premise before renewing it**; ingesting the third
   issuer cost one run and immediately paid for itself, because it is the only thing that
   distinguishes a modelled rule from one shaped around the two corpora you already had.

---

## §20 — A type that says "total" is not a total, and a query that compiles is not a query (rung 8, ADR 0099)

Three defects in one slice, none predicted by the plan and none visible from a code read. All three
were found by RUNNING the thing — the build, the endpoint, the output — which is the only reason
they are here rather than in a rung-10 audit.

1. **`z.record` over an enum types as total and parses as partial.** The evidence census promises a
   count for every state, zeros included, because *a missing key and a zero are different facts to a
   consumer*. `z.record(EvidenceState, z.number())` gives the TypeScript type `Record<K, V>`, so the
   compiler agreed the object was total — and zod v3 accepted a nine-key object at runtime without
   complaint. The type checker was confirming the claim while the parser disproved it. **Eval rule 3
   one layer down: capability declared is not outcome delivered, and a TYPE is a declaration.** The
   fix belongs in the refinement, never in the annotation, and its test feeds the parser an object
   with one key removed.

2. **`(a, b) = ANY(%s)` is a runtime `FeatureNotSupported`, and only sometimes.** The capture
   resolver looks documents, pages and elements up in batches. Postgres cannot take an anonymous
   composite type as a parameter, so the two-column lookups raise — **but only when a page or
   element ref is actually in the batch.** A batch of document refs passes cleanly. Every unit test
   passed, because they all feed the pure descriptor function a lookup dict and none of them
   executes the SQL that BUILDS one. The endpoint would have 500'd the first time an analyst
   captured a page. **A batch query needs a test that runs it, over an empty workspace if need be:
   asserting nothing about what resolves, only that the query executes.** (`unnest` of two parallel
   arrays is the working form.)

3. **A locator that resolves, is non-empty, and says nothing.** A captured claim printed
   `a7d28bae-eb7f-5c33-a6cc-f57bc776f298` where the document title belongs, because the title lookup
   was built over the document/page/element refs and a claim reaches its document through
   `source_doc_id`. `titles.get(doc_id, doc_id)` fell through to the raw id. Every gate stayed green
   — `exists` true, `locator` non-empty, the ref resolved — and the OUTPUT was worthless. **§8 in
   miniature: read the output as the end user would.** A count told me the producer fired; only
   reading the seven rows told me what one of them meant.

**The through-line.** Each defect sat in a place nothing was looking: a type instead of a value, a
query builder instead of a pure function, a fallback instead of a branch. The unit tests were not
weak — they were pointed at the parts that had been designed, and each defect lived one layer out
from there. That is §12's "every gate a producer ships points at the producer" restated for a slice
with no producer at all.

## §21 — A coordinate is not an identity, and a count is not the property its name claims (rung 8 audit, ADR 0099)

An independent audit of the landed rung-8 slice found ten defects. Every gate was green, the
instrument printed ALL GREEN, and 1,670 tests passed. The ten collapse into **three root causes**,
each one a rule this repo had already written and applied in exactly one place.

**A · A coordinate was mistaken for an identity.** `ObjectRef.element` stores `docId` +
`elementId`, and `element_id()` is `f"p{page:04d}-e{index:03d}"` — a POSITION. A re-parse runs
`DELETE FROM elements WHERE doc_id = %s` and re-inserts, so `p0003-e007` exists before and after. If
content shifted while the position survived, an old capture resolved **cleanly** to different
evidence and said nothing. Worse, the contract's own docstring claimed carrying `docId` "lets the
resolver detect the mismatch" — it cannot, because the document id is unchanged too. **A comment
asserting a capability the code does not have is worse than no comment**, because it stops the next
reader looking. Lane 2 had already learned this (ADR 0089: *compare the whole anchor, never just
ids*) and rung 8d did not inherit it. The fix is a content fingerprint stamped **server-side** at
capture time — never asked of the caller, because a hash a client supplies is one a client can omit,
and the guarantee must hold for every arm rather than the one that remembered.

**B · A count was mistaken for the property its name claims.** Twice, in two layers:

- *"The grid is dense"* was implemented as `cells.length === roles × periods`. Dense is a
  **bijection**; that is arithmetic. A grid with one pair duplicated and another missing parsed
  happily, and the consumer maps by `(role, period)` — so the duplicate silently overwrote and its
  partner rendered as a hole. Same for the census, the receipt coordinates, and the positional
  pairing between captures and resolutions: all four were **documented** and none was **checked**.
- *"Independent"* was implemented as `count(documents where class = independent_secondary)`. It
  rendered **"3 independent"** over a workspace holding **zero identified independent lineages** —
  every one carried `lineageId = null` — while a comment three lines above cited charter §5.4,
  *"three documents must never imply three independent confirmations"*. Invariant #9 says count
  independent **sources, not documents**. This is the worst kind of defect the product can ship:
  not a missing number, a **falsely confident** one, on the exact figure an analyst uses to judge
  corroboration. **An unknown lineage never raises an independence count** — publish it in its own
  column so the gap stays visible.

**C · A failure was rendered as a value.** A failed `/documents` fetch became `[]`, which rendered
*"0 documents · 0 issuer-origin · 0 independent"* — three claims about the record manufactured out
of a network error. The grid beside it already had a refusal state; the same rule, fixed at one call
site (§14). And the page defaulted to `ws-demo`, a dev fixture still on the **pre-rung-4 eleven-role
ontology**, so opening it with no parameter drew a plausible 77-cell grid over a retired vocabulary
with nothing saying so. **This is rung 7's own thesis turned on the surface that renders it:** an
absent answer and a zero answer are different facts. A slice that spent itself distinguishing
`not_acquired` from `not_found_in_scope` shipped a surface that could not distinguish "we could not
read this" from "there is nothing here".

**Three corollaries, each bought in this pass.**

- **A bool asked to mean three things is a bug, and the third meaning is the one you need**
  (0096, third instance). `exists: boolean` could say *resolved* and *missing* but not **changed** —
  the target still occupies the coordinate and is not what was captured. Folding it into `resolved`
  re-anchors a note to evidence never read; into `missing`, it reports a deletion that did not
  happen. And **a null receipt is not agreement**: a legacy row with no fingerprint must read
  *unverifiable*, never *unchanged*.
- **Contrast is arithmetic, so a reviewer should never be the one asserting it.** Standing rule 8
  makes it an acceptance criterion and nothing executed it, so a 2.63:1 pill shipped against a
  4.5:1 requirement. Eyeballing cannot catch this — the pair looks fine, it is simply too close in
  luminance. Once computed, the gate found **four more failures the audit had not reported**
  (`--slate` at 4.47:1 in three states, `--judgment` at 4.25:1 in dark). Root cause each time: a
  **mark** colour used as **ink**, because the ink token did not exist — the same "the token was
  unavailable" cause as the 30 literal-colour sites.
- **A gate must not fail a correct implementation.** The first independence gate flagged
  `findings.ts` — the contract that *enforces* the rule, whose refinement message contains the word
  it greps for. ADR 0067: a gate only one implementation can pass is as dishonest as one that can
  never fire. Scope the trigger to what can actually be wrong (a surface rendering a figure), and
  accept every legitimate way of being right.

## §22 — A receipt taken after the fact is not an observation, and a boundary has two sides (rung 8, 2nd audit, ADR 0101)

The rerun confirmed ten fixes closed and found **six more, two of them inside the previous round's
repairs**. Every one was correct where it was applied. Every one was applied in one place.

**A · A check is only as good as the MOMENT it is taken.** The content fingerprint was stamped
inside `save_capture`, which proves what the server held when the POST **arrived** — not what the
analyst **saw**. Between render and click a re-parse lands, the server fingerprints the NEW content,
and the capture reads as cleanly resolved forever: the analyst kept version A, the workspace records
B and calls it verified. The previous round's test could not see this, because it mutated the
element *after* the POST — **the order of a test's steps is part of what it tests**, and a race is
invisible to a test written in the safe order.

The rule that produced the gap was *"never ask the client for a hash."* It was right about a
client-**computed** hash and wrong about a client-**echoed** one. A computed hash is the client's
claim about content and cannot be trusted; an echoed opaque token is the server's own claim making a
round trip. **Only the client knows what it rendered**, so no amount of server-side care can close a
time-of-check/time-of-use window — the check has to span it, which means a round trip.
Corollary: **a guarantee the caller cannot satisfy is a door nobody can open.** Requiring a token
nothing serves would make those objects uncapturable, so each versioned type either names its
serving field or is declared as owing one with its rung.

**B · A boundary has two sides, and only one of them is upstream.** Every promise the grid makes was
turned into a refinement — in the TypeScript. The Pydantic model still checked cardinality and
census keys, and accepted a counterexample carrying a duplicated coordinate, a missing one, a
foreign subject, misfiled receipts and a census of 999 over two cells. Zod guards what a browser
will **render**; Pydantic guards what the service will **emit**. With only the consumer half, a
backend regression ships a malformed grid, the framework signs it off, and the frontend rejects it —
so **the analyst sees a parse error and the fault is reported one service away from its cause.**
When a rule protects an interface, ask which side can be WRONG, and put it there first.

**C · A field the server sends and the contract omits is worse than one neither has.** `nextCursor`
was returned by the store, the router and the Pydantic model, and undeclared in zod — which strips
unknown keys. A typed consumer got a perfect first page and no way to reach the second: the exact
"older captures become unreachable" defect pagination existed to fix, reintroduced one layer out.
**It fails silently and it fails in the direction of looking fine**, which is the worst combination
a schema can produce.

**D · An exemption may document a risk; it may not make the outcome safe.** `graph_node` was exempt
from fingerprinting on the true grounds that a display node is a projection minted per request. The
reasoning was sound and the outcome was that a capture resolved as unchanged while its summary,
trust and **citations** had all moved. A declared exemption is honest bookkeeping, not a fix — and
the test is always *what does the analyst end up believing?* Its twin, from the same fix: **one
explanation for several causes is wrong in every case but one.** Every mismatch reported *"the
document was re-parsed"*, which sends the reader to look in the wrong place for a finding whose
evidence changed or a fact that was restated.

**E · Two fixes from the previous round were applied to a route and not a rule.** A failed
`/documents` becoming an empty scope was fixed in the Evidence census and left live in the Graph
hook, where it turned an inventory failure into *"no visible graph"* — a claim about the analyst's
research manufactured from a failed request about our own bookkeeping. And the workspace was
parameterised on one surface while the other stayed pinned to the stale dev fixture, so **navigation
itself silently changed which company was on screen**. Workspace identity is navigation substrate,
not a per-page detail. The generalisation: after fixing a rule at one call site, **grep for the
others before writing the test** (§14) — and when a framework requirement (a Suspense boundary)
would otherwise have to be remembered at N call sites, put it inside the component that needs it, so
the next page cannot forget.

## §23 — A gate that reads PROSE as CODE fails the correct implementation (rung 9, ADR 0102)

Three times in one slice, and each time the gate was pointed at exactly the right rule.

- The **citation gate** asserts no market type carries a `Citation`. It read the whole contract file
  and failed on the docstring explaining *why* there is none.
- The **causal-annotation gate** bans a vocabulary held in `packages/ui/src/market.ts`. It failed on
  that file — the file that DECLARES the list.
- The **posture-colour gate** forbids `--ev-*` in the market pattern. It failed on the comment that
  says *"no `--ev-*`, no `--judgment`, anywhere below."*

And a fourth, in a gate that had been green for a rung: `verify-design-system.mjs`'s `stripComments`
handled JS comments only, while `DESIGN_SURFACE` had been feeding it **Python files since rung 8**.
Every docstring in `captures/resolve.py` and `evidence/project.py` was being read as executable code
and passed only because none happened to name an issuer. The market resolver's docstring explains
why it matches on a **ticker** rather than a company name — and the generality gate reported that
explanation as the very defect it describes.

This is `LESSONS.md` §21's last corollary at scale: **a gate only one implementation can pass is as
dishonest as one that can never fire** (ADR 0067). The failure mode is specific and it is not
"noisy" — it is *inverted*: the more carefully a file documents the rule it obeys, the more likely
the gate is to flag it, so the gate punishes exactly the code that deserves it least, and the cheap
way to go green is to **delete the explanation**.

**Two repairs, and the second is the general one.**

1. **Strip prose before matching, per language.** Obvious, and insufficient on its own — it only
   moves the line between what is read and what is not.
2. **Scope the trigger to what can actually be wrong.** The rule is *no causal PRICE annotation*,
   not a ban on the word "because". A finding now needs a causal phrase **and** price vocabulary in
   the same **rendered string** — quoted literals and JSX text, which is the only path by which a
   claim reaches an analyst. The declaration block of the vocabulary itself is cut before scanning,
   structurally, the way `patternConsumers` refuses to count `packages/ui` defining a helper as a
   surface rendering it: **a definition is not a use.**

**The tell that a gate has this defect**: its finding is in a comment, a docstring, or its own
dictionary. When that happens, do not weaken the rule — narrow the trigger. And the one honest
exception is worth naming, because it happened here too: the causal gate's *last* finding was real.
The `/market` preview's own copy read *"…the hardest kind of mistake to notice, because a price
looks equally convincing…"* — a causal connective beside the word "price", in text an analyst reads.
**The copy was reworded, not the gate.** A surface that has to phrase things carefully around a
price is the discipline the rung was bought to install.

## §24 — A presence check is not a meaning check, and a mode that did not run is not a PASS (rung 9 audit, ADR 0103)

**What happened.** Rung 9 shipped with its probe printing PASS, 94 design assertions green and 1749
tests passing. An audit found **six defects**, three High. The first thing a human hit was a **404**
that the surface diagnosed as a workspace-store failure.

**The six, and what each one really was.**

1. **A mixed-issuer workspace got a price.** `read_receipts` refuses such a workspace outright;
   `resolve_target` took the **majority filer** and drew an ordinary price under it. Two surfaces,
   one workspace, opposite answers — and the vote fell on the one datum an analyst cannot
   sanity-check by reading it: a four-figure rupee number is equally convincing whichever company it
   belongs to. **The cause was two copies of one query**, which is §14 again.
2. **The Dashboard was half migrated and could 500.** The producer became state-or-nothing
   (`currency: str | None`) while the consumer contract still said `str`. Widening the type was not
   enough: the board also formatted with a hard-coded rupee sign, collapsed two distinct absences
   into one null and captioned both *"vendor unreachable"*, classified direction from
   `(change ?? 0) >= 0` while the canonical `direction` sat unused on the wire, and dressed a
   connector outage in the price-fall tokens. **The receipt had to move UP** to the overview: the
   case that matters is the one with no quote, and a field nested inside the thing that is missing
   cannot explain why it is missing.
3. **The contract validated presence, not meaning.** Every refinement asked *is this field present?*
   None asked *can this be true?* — so it accepted an unparseable timestamp, a negative horizon, a
   NaN price, a green arrow over a fall, `dayHigh < dayLow`, and an **`asOf` thirty days in the
   future classified `current`**. That last was a **resolver** hole, not a schema one: `now − asOf`
   is negative for a future stamp, `age > horizon` is false, and the reading is `current` **forever**
   — the silent persistence the rung exists to prevent, arriving through the front door.
4. **Stale and unavailable claimed what the system did not hold.** *"The provider has not updated it
   since"* is false in the commonest case: OUR refresh failed while the provider published all
   along. And a receipt for a workspace with no instrument **named a vendor and carried a
   `fetchedAt`** — we asked and were let down, about a call nobody made.
5. **The instrument could print PASS without testing its subject.** `--live` met a real vendor error
   and **exited 0**; `--store` skipped a missing store and **exited 0**; the Dashboard was in no
   source list, which is why 2 was invisible; nothing executed *warm cache → expiry → provider
   gone*, the one sequence the rung is FOR; and a **module-level** skip mark suspended three tests
   that needed no store.
6. **A comment promised what the code could not keep.** The cache said *one call per symbol per
   minute*; concurrent cold reads each called the vendor.

**The rules.**

- **Bound the values, parse the timestamps, and make an object check its own arithmetic.** A
  published lag must EQUAL the two clocks published beside it, or a receipt can disagree with itself
  about the only thing it measures — invisibly, because the row shows one of the three.
- **A requested mode that could not reach its boundary is UNVERIFIED and exits non-zero.** What the
  PRODUCT correctly does with an outage says nothing about whether the CHECK ran.
- **A slice that ships a producer gates its consumers**, and gates them at the COMPONENT. The first
  version of that gate scanned whole files and found three real 0056 §7 confusions belonging to
  another slice — failing rung 9 for them is the over-fitted shape 0067 forbids.
- **Execute the lifecycle; do not describe it.** Every other gate scored a hand-built value. The
  cache, the fetch path, the route and the JSON a browser parses are where rung 6's audit found
  eight defects, and they are where this one found five.
- **When a verdict is three facts, carry the cause** — and when a receipt did not contact anyone,
  name nobody.
- Corollary: **a zero price is an absent price.** `previousClose: 0.0` was displayed while
  `build_quote` already refused to compute a change from it. Refusing to compute from a number while
  still showing it is half a rule.

## §25 — A parallel model of one fact will be hardened in one copy (rung 9 audit 2, ADR 0104)

**What happened.** 0103's repairs were correct. A second audit found four more defects, and three
were the same shape the slice had already been taught twice.

1. **The Dashboard kept its own model of a price.** `MarketQuote` had gained finite/positive
   values, a direction that must agree with its own change and a range that cannot invert;
   `LiveQuote` had gained none of them, so one surface accepted `NaN`, a negative price, a green
   arrow over a fall and an inverted range while the other refused all four. Its envelope had never
   been given the pairing rule either, so it accepted **a quote with no receipt** — and the
   component drew the price FIRST, appending the receipt and the boundary line
   `{receipt ? … : null}`. An unqualified number: no as-of, no provider, no *"not evidence"*.
2. **A zero vendor price was a 500.** The producer accepted every finite number; the contract
   requires a positive one; the crash landed four functions later. This is 0103's own *"0.0 is an
   absent price"* rule, applied to `previousClose` and not to `price`.
3. **The quote did not check its own arithmetic**, though 0103 had made the receipt agree with its
   own two clocks. It accepted `price=100, previousClose=50, change=-5, changePercent=-99,
   dayHigh=90` — six individually-valid fields describing four different readings.
4. **Gate 6 was a false green.** It searched component source for helper NAMES, and every name was
   present in the component from 1.

**The rules.**

- **Delete a parallel model; do not harden it.** Two schemas for one fact is two places to keep in
  step, and the audit trail shows which one loses. Everything the second carried already had a
  home: the numbers are the canonical type, and `symbol` / `currency` / `fetchedAt` were receipt
  fields the consumer was already reading.
- **Where two envelopes carry the same relationship, write the predicate ONCE** and assert that
  neither re-implements it. The Dashboard's copy of the pairing rule was not wrong; it was absent.
- **Check a value against the arithmetic that DEFINES it**, not merely against its own type. A
  quote is one reading, not six fields.
- **A name appearing is not a property holding** — §11's rule, applied to the gate that enforces it.
  A probe that cannot execute the renderer gates the SHAPES the renderer consumes, and says which
  boundary it reached.
- **Make the decision a type.** `marketDisplay` returns a discriminated union, so the price is
  reachable only in the arm that has a receipt and a bad render does not compile. That is stronger
  than any gate, because it removes the choice rather than policing it.
- Corollary from an adversarial sweep of the finished lane: **a value we have shown to be
  impossible is not a value we may publish — and the PRICE is never the casualty.** A range that
  cannot contain its own price, a half range, a percentage that overflows against a denormal close
  and a negative stated delay were each a 500; each is now dropped and logged, leaving the number
  the analyst came for.

---

## §26 — One slice, the rule it wrote, broken twice — a display value read as the proposition (rung 10a audit, 2026-09-11)

**What happened.** Rung 10a quoted eval rule 11 in its own comments and then violated it twice. The
brief's basis census counted `documents.frame_consolidation` — a value collapsed by UNANIMITY — and
read its NULL as *"declared nothing"*. It also means *"declared both"*, and every bank annual report
heads a standalone AND a consolidated balance sheet: the head told an analyst three such reports did
not declare a basis. The frame's coverage line counted `available` cells — a presentation state —
as *"cells carry evidence"*: 50 where 55 hold claims or facts. The third form was subtler and was
caught by no gate: the fix for the record span (a union of both lanes) was correct by construction
and, **read as an analyst would**, admitted event dates — *"FY2024 – 2026-06-24 (22 periods)"* —
which is rule 9's *a period from a publication date*, reintroduced by the fix.

A fourth, in state rather than data: a chat store holding ONE workspace's chats and swapping which
workspace they belonged to failed three ways (a setState during render, an in-flight answer dropped
on a workspace switch, an SSR crash) that were one missing key — a turn's address was `(chatId)`
when it is `(workspaceId, chatId)`.

**The rules.**

- **Before counting a field, ask what its NULL means.** A collapsed value — unanimity, precedence, a
  display state — has a null that stands for several propositions. Count the UNCOLLAPSED reading and
  let each consumer choose its own collapse (`document_declarations` / `infer_document_frame`).
- **Read the fixed output, not just the fixed code.** A gate proves the rule it encodes; only reading
  the result catches the rule you did not know you needed.
- **When state is keyed by X, every write's address includes X.** "Addressed by chat id" protected a
  conversation switch and not a workspace switch; a singleton with a swappable identity is the
  rule-at-one-call-site defect (§14) in state form.
- **A test that expects an error must fail for the reason it names.** When a field became required,
  the broken-pairing test went on passing — on correct shapes too, because the new field was missing.
  Pin that a correct shape passes the same path, or the test is a gate that cannot fire (rule 1).
- **Test the proposition the analyst reads through producer AND consumer.** Ids in the payload are
  not ids on the page; a component importing a helper is not the brief refreshing what it draws; a
  count over an unknown inventory is not zero. Each of those passed a gate in the first version.

---

## §27 — A rule has a unit, and a side effect has an owner (rung 10a audit 2, ADR 0108)

**What happened.** The second audit of rung 10a found five defects. Four were a rule built around
the wrong unit: a count standing in for an identity, one promise for two facts, a file for a batch,
a title for an address. The fifth was a lifetime. The brief refreshed when the COUNT of processing
documents fell, but a document that finished between two polls was never counted, so the count
never fell. With the SSE stream down, the head, grid and market row went on describing the corpus
from before the upload. A passport save and the restart it triggered were one promise, so a
committed save whose restart failed was reported as a failed save, and the brief never refreshed.
The filing rule judged ONE file, so two annual reports from two companies dropped together into an
empty workspace were each "the first filing", and neither was warned. A repair link navigated by
writing a title into the shared search, and two documents share a title as easily as one. And an Ask
continuation steered the graph through a ref that kept its value after its panel unmounted, so an
answer that arrived after the analyst left painted another workspace's graph.

**The rules.**

- **Detect an event by identity, never by an aggregate.** A count that did not change can hide one
  item arriving while another leaves, and a count that never saw an item cannot fall. Compare
  observations item by item (`corpusLanded`): what reached a settled state it was not in, and what
  left.
- **When the act is plural, the rule's type is plural.** `routesThroughFilingDialog(section)` could
  not express "two filings must be one company's"; `(sections[])` can, and a scalar call no longer
  compiles. This is §18 one layer up: the corpus had one file per upload, and the contract did not.
- **A composite operation is as many facts as it has commits.** A save that committed and a restart
  that failed are two outcomes. A union arm (`saved_restart_failed`) makes it impossible to write
  a UI that renders one as the other.
- **A side effect's guard must die with its owner.** A ref that an effect updates but its cleanup
  never clears outlives the component. The record (the transcript) may outlive the panel; a visual
  side effect may not.
- **Navigate by the address, never by a description of it.** A title, a label or a search string is
  a description; an id is an address.
- **A gate that cannot pass the correct code is as broken as one that cannot fail the old code.** The
  first refresh gate read the `=>` of an arrow before `isProcessingStatus(` as a comparison and
  failed the shipped hook. The "passes on the shipped tree" test caught it first, which is why
  every new gate carries one.


## §28 — A verification is worth only what it was taken OVER (rung 10b, ADR 0110 / 0111)

Rung 10b shipped green: every citation an analyst could see carried an address, opened onto its own
evidence, and drew a highlight the contract refused to serve under a `changed` or `missing`
resolution. Two audits then found the same class three times, at three layers. In each case a real
check existed, ran, and passed — over a different proposition from the one being claimed.

- **The assertion and the thing asserted about were two different objects.** A highlight says *this
  is the passage you were shown*, and it was gated on `resolution.status`, which is about the
  ANCHOR. For every narrative citation the MARK comes from a chunk, whose id is `chunk-{doc}-{seq}`
  — derived from position — so a re-parse leaves the id and replaces the content: `resolved`, a
  confident mark, and nothing in the path had compared the passage against what was cited. Measured
  before designing the fix: **614 of 614 claim citations carry no verbatim quote at all**, and on
  the 614 relation citations that do, a quote comparison reports drift on **49 unchanged** ones.
  There was no receipt to check, and deriving one from today's parse would MANUFACTURE the
  agreement it claims to prove. So the response reports the BASIS instead — `anchor_content` or
  `recorded_position` — which is ADR 0098's tri-state rule pointed at an assertion instead of a
  verdict. Two corollaries: **present-iff, both directions** (a mark with no basis is unearned; a
  basis with no mark is a receipt for no claim), and **render it as a receipt, not a warning** — a
  caveat on every narrative citation is a caveat on nothing (§19).

- **Verify the WHOLE meaning, not the part that is easy to compare.** The cell receipt compared a
  column's own header cells and kept only header rows whose width matched the axis. A period
  qualifier is ONE cell over MANY columns, so it never matched and was silently dropped — leaving
  `["2026"]` to stand for *"Year ended March 31, 2026"*. Over the live store, **13,908 of 19,674**
  qualifier-bearing cells survived a quarter→year swap with a byte-identical receipt: the same
  printed figure, a different fact. A quarterly flow and an annual flow are not the same number
  twice. The general form: when you drop a comparison because it compares the wrong things (the
  first audit's `colLabel`, 3 of 3,063), you have removed a broken check, not discharged the
  dimension — and the dimension is still owed.

- **Derive the verdict from the bytes you are DISPLAYING.** `read_passage` resolved, verified and
  rendered in three separate reads on a READ COMMITTED connection. Changing only the third produced
  `resolved`, `anchor_content`, and a facsimile showing `999999999` where the citation said
  `(222,369,351)`. Every check passed, over data that was not the data on screen. The repair is
  structural: fetch the facsimile UNMARKED, take the verdict against the grid it carries, mark that
  same object — and make the contract refuse a verified claim over content the response does not
  show, on both stacks. A refinement is what makes a shape unrepresentable rather than merely
  unproduced.

- **The migration corollary: a receipt derived AFTER the fact manufactures the agreement.** The
  backfill paired a mention's IMMUTABLE extraction-time row label, column label and value with
  `elements.rows` as they stood TODAY. Fed a mention stating `FY2026` over a grid now headed
  `FY2025`, it minted `colHeader: ["FY2025"]` beside `colLabel: FY2026` — and the pair then
  verified cleanly, **the drift erased by the very step meant to record it**. A historical receipt
  may be issued only where the current parse demonstrably WITNESSES the reading it certifies
  (reproducing every dimension the caller already states). And `--rebuild` may re-derive an ADDRESS
  freely — coordinates come from immutable rows — while never erasing a RECEIPT it cannot itself
  certify, because the stored one is then the only record able to report the drift.

- **A gate that cannot RUN protects nothing.** `verify-design-system.mjs` walked into
  `.pytest_cache` on a second machine and threw `EPERM`, so every assertion below went unexecuted
  and the operator saw a stack trace instead of a verdict. Caches are skipped; an unreadable entry
  is reported and FAILED rather than swallowed (ADR 0103 D7, applied to a static walk).

- **Say which denominator you are quoting, and make the exhaustive one runnable.** The headline
  counted anchor presence with `p->'anchor' IS NOT NULL`, which is TRUE for a jsonb null — exactly
  what a producer minting without an anchor writes — and excluded a third read model whose 614
  citations the graph inspector draws. It also sampled four opens per family per workspace while
  reading as a census. Both are fixed by saying so: four anchor states printed per scope, an
  exhaustive PARSE beside the sampled OPENS, and `--open-all` so the census is reproducible by the
  operator rather than only by an auditor.

## §29 — The screen is three boundaries from the helper, and the order of a collapse is part of its algebra (rung 11a, ADR 0113 / 0114 / 0115)

Rung 11a shipped a metric series whose producer, contracts and render helpers were all green, and
three reviews found 29 defects. Two classes recurred across reviews, which is this file's bar.

- **A visual claim has THREE boundaries, and each hid defects from the one inside it.** The frame
  helpers were tested, and 0114 still found two P1s in the component: the axis printed *no source*
  under every gap — false for **17 of Infosys' 33** silences, where we hold the source — and the
  restatement flag was computed but never drawn. Both lived between green helper tests and the
  markup, so the component is now rendered in vitest (receipt: **14/16** of those tests fail with the
  old decisions restored). 0115 then found a source history needing **1,575 px in an 832 px panel**,
  which no markup assertion can see, because overflow is a property of LAYOUT. The headless-browser
  check built for it found two more on its first run: a Value column too narrow for a four-decimal
  crore figure, and an SVG end label that spilled at phone width and was distorted by the stretched
  `viewBox`. The CSS cause is worth knowing by name: a flex child keeps `min-width: auto`, so
  `truncate` on the shared citation chip could not engage. So, for anything drawn, rule 3's door is
  **helper → rendered markup → laid-out page at real widths**, and the layout check must prove it can
  fire (it injects a spill every run) and exit UNVERIFIED without a browser.

- **The order of a collapse is part of its algebra.** §13 (ADR 0093) established that a tolerance is
  not transitive, so agreement must be judged over the whole group. 0114 applied that correctly
  within each basis — and then compared the survivors ACROSS bases. With reported 33.6% beside
  adjusted 34.1%, an adjusted `34%` won its group's collapse, and `34` agrees with `33.6` within its
  own tolerance: **the break was erased by adding a rounder print of evidence already held.** The fix
  for non-transitivity reintroduced non-monotonicity one step later. State the rule as a property,
  not an order: hide a reading only where a kept one has the SAME outcome in every comparison the
  page draws with it. Then sweep it over both sides, three precisions and adversarial orderings for
  *adding a print never retires a shown outcome, and never creates one between bases that agree*.

- **`None` compared as a value is a silent treatment.** `same_treatment` compared a missing
  `adjustment` with `reported` and found them different, so an unlabelled figure and a `reported`
  one split into two lines, and two figures across them read as an adjustment break rather than a
  restatement. The repair is DERIVED, not listed: a treatment whose vocabulary includes `reported`
  has an as-filed form, so silence IS that form; a treatment without one is unknown when silent, and
  an unknown is never a difference. A hand-written list of such dimensions would drift the day the
  vocabulary does.

- **A reason attached to a set is a claim about each member.** One metric-level `before_window`
  captioned *"Q1 FY2024, FY2026"*, and FY2026 was current annual evidence. This is rule 10's plural
  form once more: reasons now live per span, and the gate checks every listed period on the calendar.

- **A checked-in fixture is output, and it has a reader.** Two of 0113's four blocking findings — a
  legend describing the break as a gap, and an identical headcount flagged as a disagreement — were
  visible in `__fixtures__/series-live.json` with no gate catching either. The cross-stack test parses
  every re-recording through the zod refinements, and each earlier recording FAILS the newer
  contract: the third number, taken on real data.

---

## §30 — A gate that cannot fire prints PASS, and the tool that writes your code can build one (rung 6d, ADR 0116)

`leak_failures` was written to catch any consumer reading `fact_versions` around the two views. It
compiled, imported, ran over every production module, and matched **nothing** — because a shell
heredoc had turned the `` word boundary in its pattern into a literal **backspace** (0x08). The
regex required a backspace after `fact_versions`. It printed clean over a deliberately planted leak.

Three things fall out of it, and the first is the one that matters.

- **It surfaced only because that gate had a MUST-FIRE test.** Every must-not-fire passed
  perfectly, as they do for a predicate that returns `()` unconditionally. Eval rule 1 says a
  detection gate needs positive cases beside its negatives; this is that rule with no product
  defect behind it at all — the gate itself was the defect, and nothing but a must-fire could see
  it. A green suite is compatible with a gate that has stopped being a gate.
- **The environment writes your source, not just your text.** The repo already knew heredocs
  mangle quotes and backslashes here (`GOTCHAS.md`, and a standing memory note). What was new is
  that the damage was INVISIBLE: the file linted, typechecked and read correctly on screen —
  `inspect.getsource` showed the right characters — and only `co_consts` revealed the 0x08. Use
  the editor tools for source, and `write_bytes` when a script must generate it.
- **So the class is now checked structurally.**
  `test_no_source_file_carries_a_control_character` scans the whole tree for 0x00/0x07/0x08/0x0B/
  0x0C/0x1B, because the next one will be in a different file and will look just as correct.


## §31 — Agreement between totals is not evidence of ownership (rung 6d audited, ADR 0117)

Rung 6d shipped with a reconciliation gate: every group of filed segment figures must sum to the
total the note itself printed, and 34 of 34 did. It is a strong gate and it was quoted as the
strongest available evidence that each figure reached the right part of the business. **It is not
that evidence, and the audit proved it by swapping two parts' values inside one note**: every total
unchanged, every group still reconciling, the live gate still green. A gold set of 27 covers a
fraction of 276, so nothing else saw it either.

The generalisation is the one worth carrying: **an aggregate is invariant under permutation of its
members, so no check on an aggregate can ever constrain which member is which.** If the property
you care about is per-row, the check has to be per-row — and the only thing that can settle a row
is the evidence that row already carries.

- **So attribution is checked against the row's OWN receipt.** Each stored figure must re-derive
  from the cell its citation opens: the value from the cell's printed text times the scale that
  cell recorded, the PART from the anchor's own row or column label. Three stored fields written
  once at extraction, which have to agree — an agreement no permutation survives.
- **And gold binds to its SOURCE.** Matching on `(metric, period, part)` alone let any issuer's
  fact answer any issuer's gold row whose value happened to agree. On a corpus where four issuers
  disclose `segment_revenue FY2026`, that is ordinary rather than exotic. Document, page and
  partition are part of the row now.

**Its twin, from the same audit: the gate and the product must GROUP the same way, or the gate is
measuring something nobody reads.** The store reconciled 34/34 while `--segments` — the surface an
analyst actually opens — printed a **-₹6.01 lakh crore UNACCOUNTED** gap on one of those very
notes. The gate keyed the group on `(subject, document, metric, period, partition, frame)`; the CLI
keyed it on four of those and not the document, so an annual report's comparative year was added to
the current one and a single total taken. It also summed MARGINS, and applied its display `--limit`
before grouping, so the gap moved when you asked for more rows.

Each of those is a small bug. Together they are eval rule 3 one level up: **capability declared is
not outcome delivered, and a grouping is a capability.** The repair is not three fixes but one
shared object — `facts/disclosure.py` — that the gate, the review surface and rung 11b all read,
with additivity AUTHORED beside the vocabulary so a metric cannot be added without someone deciding
whether subtracting its parts from its whole means anything.

- **A number a surface cannot compute is a number nobody has checked.** `-155.10` appeared under
  the word UNACCOUNTED for a set of percentages. Nothing in the pipeline was wrong; the surface
  invented a finding, which is the one thing this lane exists not to do.
- **Corollary for any "shared representation" refactor: put the KEY in the object.** The three
  consumers did not disagree because anyone was careless — they disagreed because each had its own
  copy of a six-field tuple, and five fields of agreement look like six.

**And the third strand: metadata is only as good as its binding to what it describes.** The
segment axis is reconstructed from word geometry and stored on the element, while the figures live
in `elements.rows`. Element ids are position-derived, so the backfill could — and did — attach a
freshly-parsed axis to a stored grid it had never compared itself against. ADR 0111 found this
shape in the citation backfill and ADR 0110 in chunk ids; this is its third appearance, which
makes it a rule rather than an incident: **a derived artefact carries a fingerprint of its source,
and a consumer that cannot verify the fingerprint refuses rather than reads.** The same applies to
the re-resolve integrity check, which compared row label, column label and value text — and on a
lane where the period is a sentence above the grid and the part is an axis beside it, reported
**zero** divergence over a note whose banner now named a different year. Compare the whole
extraction-time MEANING, not the cell text that happens to be easy to reach.


## §32 — A verification is worth what it was taken over (rung 6d's 2nd audit, ADR 0118)

§31's rule was that an aggregate cannot constrain its members, so attribution has to be checked
against each row's own receipt. A second audit asked the next question — **what was that receipt
taken OVER?** — and found six defects with one shape between them.

A verification has two halves: the thing recorded and the thing it is compared against. Every one
of these was a mismatch between them, and every one of them PASSED, because a comparison that
reaches less than the meaning still returns True.

- **The reading was judged by a rule that could not see the evidence it was minted through.**
  `resolve_refs` fetched an element's `rows` and not its `meta`, so a segment cell — whose column
  is named by a reconstructed axis stored in `meta` — was checked with the grid-header rule and
  reported drift on an unchanged page. **24 of 276 live citations**, every one of them ICICI's.
  The viewer's own later check DID read the axis, agreed the cell was fine, and could not undo the
  verdict: a resolution may only be downgraded, which is correct, and which is exactly why the
  FIRST read has to be the complete one. Read the witnesses out of the same row of the same query.
- **A minting gate was reused as a drift check.** `certified_axis_column` returns `None` for four
  different reasons and only one of them is *cannot tell*; the fourth is *the column is now called
  something else*, which is the drift the receipt exists to report. Renaming a column under a
  citation produced "this table no longer states a heading for this column" and the figure stayed
  openable. **Asking *may I certify this?* is not asking *what does it say now?*** — separate the
  reading from the judgement, and let the caller, which holds both sides, compare.
- **The receipt covered what was inside the grid, and the meaning was not.** On a segment note the
  period is a sentence above the cells. Re-date it and the row label, the column heading and the
  printed figure all still agree — `anchor_content`, over a figure that now describes another
  year. A reading's dimensions are wherever the source put them, so the ref carries the statements
  the reader took something FROM, and the backfill DECLINES to record them rather than copying
  today's banner onto yesterday's figure (ADR 0111's rule, one field along).
- **The same comparison, at the migration layer:** the re-resolve check held six fields and missed
  the printed METRIC and the SCALE. Re-title a block heading and every figure beneath is a
  different measurement; re-print `crore` as `lakh` and every figure moves by 100×. Neither is in
  the cell, and both swept clean.

**And the twin, which is §31's own corollary generalised: a fix that lands a SHARED object has not
landed until the copies are deleted.** 0117 wrote `facts/disclosure.py` for the review CLI and
left the reconciliation gate's own grouping in place, so the gate decided additivity by a name
suffix while the product read the authored table. 0117 added `active_segment_facts` to the
citation census and left the opening loop's hard-coded three families, so `--open-all` counted
**2,214** citations, opened **1,938**, and printed a clean exhaustive pass over the 276 it never
touched — including the 24 that were failing. **"Exhaustive" is an adjective on a loop, and a loop
cannot tell you what it did not iterate**: state it as an equation between two numbers the run
already holds (`opened == addressed`) rather than as a promise in a docstring.

Two smaller rules, each bought here:

- **A separator is not a property of a date format.** 0117 widened the period grammar and spelled
  the separator `\s*,?\s*`, so `Quarter ended 31-Mar-2026` matched nothing but its bare year — the
  defect that fix was written to remove, surviving in the format it did not enumerate. Enumerating
  formats is open-ended, so the parser also REPORTS a qualifier it could not read, and a fragment
  is never believed in place of the phrase the source printed.
- **A migration owns its fields, emptiness included.** `meta = meta || payload` keeps what the
  payload omits, so "the axis could not be proved" printed a line and changed nothing: the stale
  axis stayed live and kept landing figures. Delete the owned keys before the merge, write the
  empty list, and make the REFUSAL a postcondition — every assertion passed, and the one thing
  that had to stop being true was never asked about (ADR 0098's absence rule, pointed at a writer).


## §33 — A receipt is the conclusion, not the inputs to it (rung 6d's 3rd audit, ADR 0119)

§32's repair gave a citation a receipt for the statements its reading depended on — a segment
note's period banner, its units line — and the verdict checked each was still there. A third audit
broke it three ways, and the three are one sentence:

**presence is MONOTONE and meaning is not.** A check that asks *is every recorded statement still
there?* can only ever see removals. It is blind to a statement ADDED beside the recorded ones, and
blind by construction to any dimension the receipt never listed.

- **A dimension it never listed.** A transposed segment note states its METRIC on a one-cell row
  heading the block beneath it. Re-title `Segmental operating income` to `Segmental revenues` and
  every figure under it measures something else — while the banner, the units line, the row, the
  column and the printed value are all exactly where they were. `read_passage` returned `resolved`
  with `anchor_content`, which is the strongest statement the viewer can make: the evidence viewer
  would certify a revenue reading as support for an operating-income claim.
- **A statement added that OUTRANKS a recorded one.** `unitHint` beats the header band in the
  reader's precedence, so leaving `INR crore` in place and adding `INR lakh` above it moves every
  figure by 100× with every recorded string still present.
- **A statement added that makes the reading INDETERMINATE.** A second period banner removes
  nothing. It means the note no longer says which year these figures are — the producer refuses
  the cell outright — and the old citation went on verifying, which is the worst of the three: a
  receipt standing over a reading the producer will not make.

**So record the CONCLUSION and re-derive it.** The segment reader consumes only what is on one
element — the grid, the axis, the value columns, the header notes, the title, the unit hint — so
its answer for a cell is a pure function of what the response is about to display. That makes
*does this document still read this figure the way the citation says?* a question with an exact
answer, and it is the only form that survives all three. ADR 0111 said derive the verdict from the
bytes you are displaying; this is the same rule one step on — **re-run the interpretation over the
bytes you are displaying.**

Three corollaries, each bought in the same pass:

- **Record what a value MEANS, not the words it was read from.** The first version compared the
  period EXPRESSION, so a re-parse that re-wrapped a banner across two lines took a different
  phrase out of it, reached the same year, and reported a restatement nobody made. The phrase is
  what a citation shows; the resolved period is what the figure means, and a receipt compares the
  second.
- **Applicability is declared, not inferred from a field list.** Which receipts a cell can carry
  differs by LANE: the statement lane's interpretation inputs are in the grid and in its column
  receipt, and it has no per-element re-reader at all, because a continuation table inherits its
  axis from the element before it. Demanding the same fields of both made **560** correct
  citations report `recorded_position` — a gate only one implementation can pass, caught on the
  first run after it was written.
- **Resolve each statement on its own, not the line that carries them.** A banner reading
  `FY2026 and FY2025` was resolved ONCE and answered with one period, so three figures landed on
  FY2026 with no rejection. The ambiguity was between two statements on one line, and a function
  returning one period could not express it. The rule already held across separate notes; the
  defect was treating a LINE as a statement.

**And the migration twin: a set is owned in BOTH directions.** §32's repair made the axis backfill
delete its own keys before writing, which handles a note whose axis the parse cannot prove. It did
not handle a note the parse no longer CLASSIFIES: the plan was built only from the fresh parse, so
a table the new parser withdraws produced no row, no warning and no change — and the stale
classification went on feeding the producer. A migration that can add and correct but never
withdraw has not reconciled anything; read the stored side too, and make the withdrawal a
postcondition, because the thing that has to happen is that something STOPS being true.

## §34 — An allowance is a sum of its inputs' uncertainties, and a precedence must be stated where it is checked (rung 11b's audit, ADR 0121)

Two defects, one shape: **a rule stated correctly in words and implemented as a cheaper rule that
agreed with it on every case anybody had looked at.**

- **"At the precision the sources printed"** was implemented as the COARSEST step times the number
  of parts. On a note printed at one precision the two agree, so 6d's gate, the review CLI and 11b's
  live store all read 36/36 and nobody could tell. On a note mixing ₹1 crore and ₹0.01 crore figures
  they part ways: a ₹2.40 crore gap was called rounding where the figures could explain ₹1.03. A
  difference of printed figures can be off by the SUM of what each figure can be off by — its own
  step, the whole included. That is the tight bound, and it is the convention `readings_agree`
  already stated for a pair. **When a tolerance is derived from several inputs, derive it per
  input.** A max or an average is a claim that the inputs are alike, and the case it breaks on is
  the one where they are not. The receipt that the fix was safe was the live store: numerically
  unchanged, five tolerances one step wider, no verdict moved.
- **The producer ranked a listed disclosure's reasons and the contract did not.** Each condition
  was tested alone and each passed. The overlap (a margin whose total was read and none of its
  parts) was where they disagreed, and it raised a `ValidationError` that took every usable
  composition with it. **Test the PRODUCT of conditions, not each one**: the combination gate
  builds every tuple beside a valid neighbour, and its replay of the old contract found a second
  route the audit had not named, a lone margin total in the PRIOR year.

Two corollaries from the same pass. **A field the wire carries and the object does not re-derive
is a field a producer can inflate**: `tolerance` was trusted, and an inflated one turned any gap
into rounding (eval rule 12, pointed at an allowance). And **a sentence may say only what the
figures show**: *"other parts are negative"* was printed over two positive shares because the
branch that chose it tested *"is anything clamped?"* and then asserted a cause. A note should fire
at the precision it prints, too, or float dust over an exactly-reconciling note reads *"add up to
100.0%"*.

## §35 — Read the recording before the card, and measure what the eye sees (rung 12, ADR 0122)

Rule 8 was applied at the START of rung 12 and it reshaped the slice: all 56 `measurement_gap`
buckets paired different measures, so the producer was made honest before the module was built.
It was applied again at the END — over the recorded door, after every gate was green — and found
**five more defects no gate could see, because no gate had been told what the analyst reads**:

- **One unheld filing was two leads.** The absence producer's unit was the DUTY, so Infosys'
  missing Q1 results filing, owed under two Reg 33 duties, took two of the brief's four cards and
  counted as two open leads. The unit of an absence is **what is absent**: an artifact is one thing
  to fetch; a disclosure is one duty's line.
- **The badge summed two asks.** "Review inbox · 80 open" — 78 of them comparisons OUR reading
  could not decide. Owed and optional are two numbers.
- **A label said what it did not count.** `Times tested = 2` beside *"3 drivers proposed, none
  tested"* — it counted documents. `Still open = no` on an open lead — it measured the period.
- **A storage format reached the card** (`2025-02`), and `en-IN` spells the month "Sept" where the
  server spells "Sep".
- **An inbox item promised a change nothing makes**: every lead listed an evidence cell as
  affected, and the grid only reads decisions on absences.

So: **record the door, then read the recording as the analyst, before handing the verify card.**
The fixture recorder exists for the vitest half; it is also the cheapest place to read the product.

The layout check taught the second half. Its first detector measured element BOXES, and a
paragraph whose unbreakable text runs past the drawer keeps its box inside — the likeliest spill in
the inbox (the machine's decision, in mono) was invisible to it. Its own must-fire self-test caught
this on the first run. **Measure what the eye sees** (where overflow is visible, the reach is the
content's `scrollWidth`, not the box), and keep one planted defect per detector, because a count of
failures lets a dead detector pass on the strength of a live one.

**And the independent review taught two more (ADR 0123).** First, **a version is a claim about the
record, so a view may not move it.** The brief always asks in `selected` mode, so "every source
switched on" never counted as the whole workspace, and every toggle bumped a lead's version and
reopened its decision. Nothing in the code was wrong in isolation; the defect lived in the join
between a scope rule written for supersession and a version rule written for evidence. Second,
**the analyst's must-fire action failed the probe that exists to watch for it**: the grid gate
keyed a missing filing on its FIRST duty's role, while the decision correctly marked both. It is
rule 10's plural once more. A gate that was never run against the very action it gates is a
census, however carefully its predicate is written, so give every gate a test built from the
action it is for.


## §36 — One rule, one object, one field list: the three ways a good rule fails to arrive (rung 12 audit 2, ADR 0124)

Rung 12 shipped a rule worth having: **a judgment is honoured only over the evidence it was taken
over.** A second review found six defects, and five of them are that rule not reaching somewhere it
had to. The interesting part is that none was a mistake in the rule; each was a boundary the rule
was never carried across.

**1. It was enforced against the stored digest, never against what was SHOWN.** A lead rests on two
documents; switch one off, read the other, mark the lead *not material*, and the decision was
recorded against the whole-workspace digest. The token that crossed the write boundary was
`observedVersion` — and 0123 D1 had frozen `version` under a narrowed view **on purpose**, so that a
source toggle would not reopen decisions. Both intentions were right, and their intersection was a
door that could not see the one difference that mattered. **When a fix deliberately makes a value
insensitive to something, check what else was relying on that value to be sensitive to it.**

**2. The boundary quoted a measurement instead of taking one.** The digest it compared against came
off the `findings` row — a number some earlier request wrote, which a narrowed projection may not
update. So a workspace whose evidence changed while the analyst browsed one source handed back a
basis nobody had measured. Eval rule 7 is usually read as being about probes; it is about **any**
place that decides on a number. The door now recomputes, at write time, and pays one computation per
write for it.

**3. The rule never reached the second reviewable object.** Comparison corrections predate the
finding ledger and had no currency check at all. Their identity is the two RAW MENTIONS — correct,
so a judgment survives a re-resolve — and the thing the analyst actually judged is the PROPOSITION
the mention was resolved into. Replace both claim versions, move the fiscal year, keep the mentions:
the old judgment silently re-applied to a different interpretation. **A durable identity and a
verification receipt are two different jobs, and an object that has the first still needs the
second.**

**4. The digest took a field list complete for one producer and short for the other.** `coverage_gap`
and `disclosure_break` share one digest function, whose four arguments are the whole assertion of a
gap. A break also asserts *last present, first absent, how many periods* — and widening one from a
single quarter to three rewrote every sentence on screen while the digest stayed byte-identical. The
repair is not a longer argument list: it is deriving the digest from the RECEIPT, plus a gate that
**measures** which fields move it and refuses any field that is neither hashed nor declared with a
reason. A field list is something to remember; a structural check is not (ADR 0098).

**5. And two rules written at a call site.** `machineResult or result` was coalesced in the inbox's
comparison item and not in its lead item — ADR 0123 D6's own defect, one function from D6's own fix.
`moment_order` was written for one `max()` while five call sites in four packages went on comparing
ISO text, one of them writing the wrong instant back into the fact table. Both now live above every
consumer, and both are gated off the syntax tree.

**The sixth is a different lesson, and it is eval rule 8's.** `driver_findings` reads the claims that
propose a cause and consults nothing else, and its copy said *"nothing in scope tests it"*. That is a
claim about the record made by a producer that never read the record. Writing the gate taught the
rule its own shape: the first regex was a phrase blocklist and it fired on the FIX — *"we have not
tested it"* — which showed that the rule is not about which words are used but **whose negative it
is**. A quantifier over the record standing as the subject of a searching verb is a claim about the
record, and only a finding carrying an `AbsenceReceipt` — the one producer here that searches the
documents held and can name what it searched — may make one. Everything else says it in the first
person, clause by clause, because a *we* in one sentence does not license the next.


## §37 — A gate over the producer's own formula has measured nothing (rung 12 audit 3, ADR 0125)

§36's repair shipped six gates. A review found two of them could not fire, and both were the same
shape: **the gate recomputed the rule the code had just applied, on the output the code had just
produced.**

`decision_receipt_failures` asked whether `complete == (covering or absence)`. The producer had set
`complete` to exactly that, from exactly those inputs. The gate was green, and the formula it was
confirming was itself the defect: `complete` answered *was this REQUEST covering?* when the sentence
on screen says *are you seeing all of THIS lead?* — different questions, and `covers_workspace`
counts every row in `documents` while the brief can only select the readable ones. One document
still ingesting and every lead in the workspace became undecidable, under a note telling the analyst
to switch on a source that cannot be switched on.

`correction_currency_failures` was the same in the other register: four branches, three of which the
Pydantic validator refuses to construct, and one a restatement of two variables the producer had
assigned from one value. Its must-fire passed only because `model_copy(update=...)` skips
validation — the gate fired on a shape the wire cannot carry.

**The repair in both cases is a second, independent measurement.** `complete` is now held against a
narrowed computation compared with a covering one; currency is held against the ledger's own rows.
And each gate fails if its own premise was never exercised — a narrowing that hid nothing says so
rather than printing a green, because a check that could not have fired has measured nothing.

**Two smaller instances of the same class, from the same review.**

A receipt must be ordered the way the identity it accompanies is ordered. `_stable_id` sorts the two
raw mentions of a comparison; the digest took them in the caller's order, and `active_claims` comes
back on a key that ties for exactly the pairs an analyst corrects. A row-order change left the id
identical, moved the digest, and told the analyst their two statements had been re-read — which
nothing had done. A comparison is a SET, and its digest is judged over the whole (§28's algebra rule
at a new object).

And **a new predicate needs its must-FIRE set, not only its must-not-fire one** (eval rule 9). §30's
copy rule matched a record-quantifier as SUBJECT, so *"the record tests none of them"* — the exact
sentence the rule was written to retire — passed its own gate. Widening it to both word orders
immediately caught a second live sentence nobody had looked at: *"The record states no alternative.
That is not evidence there is none"*, which asserts a fact about the record and withdraws it one
clause later. Its first version also scanned LINES, so it fired on the comments explaining the rule;
a check is worth only what it was taken over, and what an analyst reads is copy, not a file.
