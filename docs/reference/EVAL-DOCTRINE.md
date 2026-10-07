# N4A eval doctrine — the full rules

> **status:** live · **authoritative for:** the full text of the thirteen eval rules and the
> incidents that bought each one · **last verified:** 2026-09-24. Moved VERBATIM out of `AGENTS.md`
> (which now carries one line per rule) so every session stops paying ~25 KB for it. Read the rule
> you are applying before designing or changing a gate or gold set.

- **Eval doctrine — twelve rules, each bought with a real incident.** Full evidence and numbers:
  [`docs/LESSONS.md`](../LESSONS.md) §1–§5, §10, §17–§19, §24. Read it before designing OR CHANGING any gate or
  gold set.
  1. **A gate that can never fire is as dishonest as one that fires wrongly.** Every detection gate
     needs **must-fire positive cases** beside its must-not-fire negatives. For a gold set over
     anything under rework, grade **properties, not membership** — else the gold freezes the design
     the slice exists to change. **"Properties, not membership" governs PROBES too, not just gold
     sets — a census is not a test.** The rung-5 probe asked *"did every declared family fire at
     least once?"*, which is membership, and printed PASS over **seven** real defects — including 51
     of 51 `corroborated` findings that carried ONE lineage while telling the analyst they were
     *independently* corroborated (ADR 0082). Counting that a producer fired says nothing about
     whether its output **means what the contract says it means**. So for every name the system
     asserts, write the predicate that name claims, and gate on it (ADR 0083 does the same for a
     claim a probe merely *prints*).
  2. **Bind a behavioral check to ONE target item and score only KEPT output.** Never search a whole
     result list for a property; filter to kept/grounded output first; normalize anything date-shaped
     before comparing (Indian FY, not the literal year).
  3. **Never score CAPABILITY DECLARED where you mean OUTCOME DELIVERED — and NAME THE DOOR you
     gated at.** Reachability = declared **AND** observed-populated on real evidence; an
     unknown/unspecified floor never counts. Prove such a fix by showing the headline number is
     **numerically unchanged** across the landing. "Outcome" is not one boundary, and rung 6 moved
     this gate **twice** believing each time it had arrived: the matcher resolved 30/30, then
     `answer_kpi` served 37/37, and through `answer_question` — the door an analyst actually opens
     — **2 of 37** reached the deterministic lane, because the router needs a period or a numeric
     cue and a bare *"HDFC Bank advances"* has neither. So gate at the outermost boundary the user
     crosses, **bind each case to a real stored row** (a question shaped like the data cannot drift
     from it), and where you cannot reach that boundary, say which one you gated at instead of
     letting the number imply the other (ADR 0093). **For anything DRAWN, the outermost door is
     the laid-out page:** rung 11a's reviews found defects between green helper tests and the
     rendered markup, then between green markup tests and a browser at 1,280 px — so render the
     component, lay it out, and make the layout check prove it can fire (ADR 0114/0115;
     `LESSONS.md` §29).
  4. **Prove a change on an instrument the change can actually MOVE.** Trace the input path first and
     confirm the slice is upstream of the baseline. Give a probe **three** states —
     `selected` / `missed` / `unparsed` — so a parse gap is never charged to the component under test.
     **Mirror rule: when something fails to MATCH, read what it was ASKED to match before tuning how
     it matches.** `attribute_fine` sat at zero for a whole corpus and was diagnosed as a threshold
     problem after reading the spine and the resolver but never the extractor's *input* — which
     never contained a single fine driver. An empty input and a too-strict threshold look identical
     from the outside (ADR 0078).
  5. **Thresholds follow REVERSIBILITY, never uniformity.** A merge is destructive; a classification
     is recoverable. Separate, separately-tuned constants, merge set conservatively. Deterministic
     operations may auto-apply; model-inferred ones need review (ADR 0049 D40/D41).
  6. **A gate that only ONE implementation can pass is as dishonest as one that can never fire**
     (ADR 0067). Rework is *supposed* to change gates — re-point, re-grade, retire, raise. The
     discriminator: **after the change, can the gate fail for a reason that is a real defect?** A
     correct-but-different implementation failing it ⇒ the gate is over-fitted, and **fixing it is
     part of the rung, not a deferral**. Only a broken implementation failing it ⇒ the gate is sound.
     The one illegitimate reason to touch a gate is *"it is red and the slice is late."* Every change
     reports **three** numbers — old gate/old code · new gate/new code · **new gate/OLD code, which
     must still FAIL** (else it stopped protecting anything) — and is declared on the verify card.
     Deleting a gate names its successor. **A slice that changes behaviour and no gate is
     suspicious.**
  7. **A red baseline EXPIRES when the corpus is re-derived** (§11). Any slice that re-extracts,
     re-ingests or re-resolves invalidates every *downstream* rung’s stored baseline — so
     **re-measure at slice start and correct the plan in the same pass; never quote a number you
     did not just take.** Rung 3’s re-extraction moved rung 4’s baseline from 558 claims to 590,
     its splitting-rule scope from 46% to **35.1%**, and the claims carrying a fine attribute from
     20 to **0** — the last one an assertion the store flatly contradicted. Corollary: a gate over
     **containers** (tables, files, sections) does not gate their **contents**, and contents are
     what drift.
  8. **READ the output as the end user would, before designing the slice that changes it.** A
     number tells you a producer fired; it never tells you the output MEANS anything to an analyst.
     Rung 6a was specified from a schema read and justified as *"unblock `contested`"*. Reading the
     27 actual blocked pairs took ten minutes and found **none of them was a finding**: one was
     reported-vs-adjusted for the same quarter (both true), one had **both sides agreeing** and was
     still handed over as homework, three were *"9-month" / "last year" / "this quarter"* growth
     flattened onto one period. The cause was not the field being fixed — `period_source` is
     **`defaulted` on 63.9% of claims** and appears **nowhere in either comparator** — and the
     field being fixed was the only thing suppressing the bad output, so the slice as specified
     would have made the product **worse** (ADR 0086). Corollaries: **a finding must show what IS
     there, never what our machinery manufactured**; a family name that asserts a verdict
     (`contested`) is weaker than a juxtaposition the analyst reads for themselves (invariant 9);
     and **a metric that is zero may be CORRECT** — never engineer thresholds until it moves.
  9. **A fix ships with the same confidence as the bug — audit it just as hard, and a slice that
     ships a PRODUCER gates three surfaces, not one.** The second half first. Rung 6's probe shipped six
     gates, read 30 of 30 gold figures, and printed PASS — and **every gate pointed at the
     producer**. An audit then found eight real defects living where nothing was looking:
     (a) **the lifecycle** — a second `--apply` took a workspace from 512 facts to **0** (a stable
     row id + `ON CONFLICT DO NOTHING`, then activation of the run that had just inserted nothing),
     and every producer gate still passed because the producer still produced; the CLI printed the
     count it had **COMPUTED**, so the log was identical either way. (b) **the consumer** — **15 of
     30** landed line items had no question that could retrieve them, while the Dashboard captioned
     filed figures *"Yahoo Finance snapshot"* and promised filed ₹ figures would "land next" months
     after they had. (c) **the probe's own body** — `unit_failures` promised a monetary/percentage
     check in its docstring and tested `abs(value) < 1e-9 and value != 0`, which no real value
     satisfies. So: **run the write path TWICE and read the store back** (a count computed in
     memory is not a receipt) · **gate that the end user can REACH the output and that the surface
     still names where its numbers come from** · and unit-test each gate against the shape it was
     written to catch. Corollary from the same audit: **collapsing on the frame is not collapsing
     on the number** — deduplicating same-frame readings without comparing VALUES hid a ₹6,025
     crore restatement, and comparing them naively would have manufactured six false conflicts out
     of a presentation rounding 33.6% to 34%. Agreement is judged at the precision each source
     stated (ADR 0089/0090; `LESSONS.md` §12). **And the first half, bought when a SECOND audit
     found two of the first audit's own fixes defective (ADR 0091; `LESSONS.md` §13):** the
     precision rule written to stop hiding disagreements derived the precision from the FLOAT, so
     `Decimal(100.0).normalize()` read as "nearest hundred" and it declared **100 and 200 in
     agreement** — worse than the bug. And *"30/30 reachable"* went into an ADR with nothing
     executing it, while `borrowings` still resolved to `total_debt` (19 live facts). So: **a new
     PREDICATE needs its own must-not-fire set** (feed it the pairs it would be most damaging to
     conflate, not the ones it was written for) · **never DERIVE a property the source stated** —
     printed precision from a float, a period from a publication date, a currency from a
     jurisdiction are one mistake at three layers · **a number in an ADR is a claim and needs a
     gate** · and **when a slice multiplies the data behind an existing path, re-test that path's
     guarantees** — Ask's source scope was ignored by its numeric route for a whole stage, latent
     while each company had one vendor document and live the moment seventeen filings sat behind
     the same query.
  10. **A rule fixed at ONE CALL SITE is not fixed — and a fix is not done until the consumers
     have nothing left to decide.** A third audit of rung 6 found seven defects, and **two of its
     three high findings were the second instance of a class the previous audit had just fixed**.
     Rule 9's fixes were correct; they were applied to a call site when the defect was a rule, so
     each left a live copy of itself one function away. `_resolve_scope` was repaired on the
     numeric route while the findings route still read `"selected" if doc_ids else "all"` — `[]`
     and `None` are both falsy and mean opposite things, so a **deselected-everything** question
     was answered from the whole workspace: **12 citations from 12 excluded documents**, beside a
     numeric route that correctly declined. The same conversion had by then been written correctly
     three times (0082, 0065, 0091) and wrongly once. And `readings_agree` was given its
     precisions in the Dashboard but not in Ask, where they **defaulted to `None`** — which
     selects exact equality — so Ask went on announcing *"the record does not state this once:
     34.00%"* over the very readings the Dashboard collapses as rounding. So: **when you fix a
     rule, grep for its other call sites before you write the test**; then remove the choice —
     convert ONCE above every consumer, and give a parameter whose value changes the ANSWER **no
     default**, so the type checker asks each caller instead of a future auditor. Corollaries from
     the same pass: **a gold witness that can go stale should be DERIVED** — the reachability
     gate's own 30/30 was 28/30 through the real consumer, and both failures were in its
     hand-written witnesses, which asked one company for a line item only another had landed; and
     **a stored property nobody renders is half a feature** — the precision that lets 33.6% and
     34% agree was invisible on screen, where both were drawn to two decimals (ADR 0092). And the
     sharpest form of the same rule, from the audit after: **before reusing a comparison to GROUP
     or DEDUPLICATE, check the relation actually has the algebra that assumes.** "Collapse a
     reading if it agrees with any peer we kept" is correct only if agreement is transitive, and
     `readings_agree` is a TOLERANCE — a coarse `34%` sits inside the tolerance of `33.6%` and
     `34.1%`, which are outside each other's. Both were dropped and the cell asserted
     `ambiguous=false` over a live disagreement, which is the exact defect the comparison had been
     added to prevent. Judge such a predicate against the **whole group**, never a retained prefix:
     it is order-independent, and the safety property then holds by construction (ADR 0093).
     **And the ORDER of a collapse is part of that algebra** (rung 11a, ADR 0115): judging
     agreement within each group and THEN comparing the survivors let a rounder `34%` erase a
     real break. Hide a reading only where a kept one shares every comparison the page draws
     with it, and sweep that adding a print never retires a shown outcome.
     **And its widest form, from rung 7's third audit: a rule shaped around one instance of a
     PLURAL loses the others, silently, because the singular rule still returns something.** Three
     in one slice — a guard handed the caller's PROJECTION as the live registry (a read-only
     request for one role then crashed on a healthy store, and the guard was the previous day's fix
     for a parameter answering two questions) · pack resolution treating a set documented as
     "possibly several" as atomic, so applying one dropped the untouched defaults · and a duty
     judged against a whole analytical ROLE, so `inventory` discharged the Ind AS 7 cash-flow duty
     and `roe_pct` discharged *"profit or loss for the quarter"*. **When a type says several, write
     the rule for several — the corpus is not the contract**; compose rather than replace; and
     judge an obligation at the granularity it is STATED at, reporting the precision you actually
     checked at where you cannot reach it (ADR 0097; `LESSONS.md` §18).
     **And the form rung 12's second audit found FIVE times in one slice: a good rule arrives at
     one object, one call site, one field list** (ADR 0124; `LESSONS.md` §36). *A judgment is
     honoured only over the evidence it was taken over* was enforced against the STORED digest and
     not against what the screen SHOWED · never reached the other reviewable object (a comparison
     correction, whose durable identity is the right identity and is not a receipt) · and took a
     field list complete for one producer and short for the other, so a disclosure break widening
     from one absent quarter to three kept a byte-identical digest. Three corollaries. **When a fix
     deliberately makes a value INSENSITIVE to something, check what was relying on it to be
     sensitive** — `version` was frozen under a narrowed view on purpose, which left the write
     boundary's only token blind to exactly the difference that mattered. **A durable identity and
     a verification receipt are two different jobs**, and an object with the first still needs the
     second. And the repair for a short field list is never a longer argument list: derive the
     digest from the RECEIPT and **gate that every field is hashed or declared with a reason**,
     because a list is something to remember and a structural check is not.
     **And the form that closed rung 7: a rule applied as DATA ON SOME ROWS is not applied, and a
     caveat the consumer discards is not a caveat.** 0097's fix was correct and landed as
     `satisfied_by_items` on four registry rows; the six rows that got nothing kept the old
     behaviour, so four duties still read SATISFIED off one sentence each — a marketing line about
     a *"diversified portfolio"* discharging an RBI reportable-segment norm while the segment note
     sat in the same parsed document under its own heading. `precision="role"` was recorded
     faithfully beside every one of those verdicts and changed nothing, because the lead projection
     selected on `if duty.satisfied: continue` and never read it. So: make the rule STRUCTURAL —
     gate that every row declares what discharges it, rather than filling rows in — and when a
     verdict has a caveat that must change behaviour, **put it in the VERDICT'S TYPE**, not beside
     it. `satisfied` is tri-state now, and `None` (*unverified at the precision the rule requires*)
     may be folded into neither neighbour: into `True` it hides a gap, into `False` it restates
     *we cannot tell* as *they did not disclose it*. Corollary, from the same audit: **a field
     doing two jobs will be wrong in both directions at once** — a duty's `role` said both *where
     it is displayed* and *what may discharge it*, which is too wide where a role holds a dozen
     disclosures and too narrow where one disclosure spans several roles, so the same field both
     accepted a sentence and rejected the filed statement it named (ADR 0098; `LESSONS.md` §19).
  11. **A projection over a DERIVED DISPLAY VALUE inherits none of its guarantees — read the
     receipt the value came from.** Rung 7's lead projection asked *"is this disclosure still being
     made?"* by testing the cell's pill, and announced that Infosys had **stopped disclosing
     revenue and profit at Q2 FY2026**. False twice over: the cells it called empty held **three
     claims** and one, and the series **resumes at Q3 and is still running at the window's edge**.
     Neither error was in the state machine — the resolver's numbers were right, and the falsehood
     was manufactured one layer up by a consumer treating a *presentation* as a *fact*. A display
     state answers *what should this look like*; it is lossy in both directions about any
     proposition. So gate on the field that IS the proposition, and unit-test that the two
     selections agree so a later edit cannot re-point it at the pill. Three corollaries from the
     same audit: **an availability state may never contradict the cell's contents** (`expected_not_found`
     asserts *our scope does not carry it*, which a populated cell refutes; `not_acquired` asserts
     the *source* is absent, which it does not — so the guard belongs on one and not the other) ·
     **a claim about an ENDING must be checked to the end of the series**, with a fourth verdict for
     *we never fetched this period's filing* that BLOCKS the inference rather than extending it ·
     and **when a bool has to mean three things, the third one is the bug** — make it tri-state,
     convert ONCE above every consumer with an identity comparison, because `None` is falsy and
     `not x` silently reinstates what the type change was meant to remove. Its twin: a name meaning
     two things (`declared` = a source spoke, `confirmed` = a human ratified) will assert one while
     the store records the other — **all 3,696** applicability rows carry `confirmed = FALSE` and
     every receipt claimed otherwise. And **a decision the schema cannot represent is a decision
     the system discards**: "this does not apply" needs a row, not a missing one (ADR 0096).
  12. **A schema that checks which fields are PRESENT has not checked what they MEAN — and a
     mode the operator asked for and that did not RUN is not a pass.** Rung 9's receipt refined
     five presence relationships, all correct, all green, and accepted an unparseable timestamp, a
     negative staleness horizon, a NaN price (which the JSON encoder emits as the bare token `NaN`,
     so the browser's parse throws), `direction: "up"` beside a fall, and an **`asOf` thirty days in
     the FUTURE classified `current`** — the last not a schema gap but a resolver hole, since
     `now − asOf` is negative for a future stamp so `age > horizon` is false and the reading stays
     `current` forever. Every refinement asked *is this field present?*; none asked *can this be
     true?* So bound the numbers, parse the timestamps, and make the object check its **own
     arithmetic** (a published lag must EQUAL the two clocks published beside it). Its twin, from
     the same audit: `--live` met a real vendor error and **exited 0**, `--store` skipped a missing
     store and **exited 0**, so a probe printed PASS having tested nothing it was invoked for. A
     requested mode that could not reach its boundary reports **UNVERIFIED and exits non-zero** —
     what the PRODUCT correctly does with an outage says nothing about whether the CHECK ran. Three
     corollaries from the same pass: a **module-level** skip mark suspended three tests that needed
     no store · nothing anywhere executed the one sequence the rung exists for (warm cache →
     expiry → provider gone), so it is now driven through the real cache, the real route and the
     real JSON · and **a comment that promises what the code cannot deliver is a defect** — the
     cache said *one call per symbol per minute* and every concurrent cold reader called the vendor
     (ADR 0103; `LESSONS.md` §24).
     **And the form a SECOND audit found, which is the same rule pointed at a consumer (ADR 0104;
     `LESSONS.md` §25): a PARALLEL MODEL of one fact will be hardened in one copy.** `MarketQuote`
     gained finite/positive prices, a direction that must match its own change and a range that
     cannot invert; the Dashboard's `LiveQuote` — its own model of the same price — gained none of
     it, so that board accepted NaN, a negative price and a green arrow over a fall long after the
     other surface could not. **Delete the second model; do not harden it.** Its envelope had also
     never been given the pairing rule, so it accepted **a quote with no receipt** — and the
     component rendered the price FIRST, appending the receipt conditionally, which is an
     unqualified number with no as-of and no boundary line. So: **make the display decision a
     discriminated union** (`quote` reachable only in the arm that has a receipt, so a bad render
     does not compile), and **check a value against the arithmetic that defines it** — the contract
     had accepted six individually-valid fields describing four different readings. Corollary,
     bought at the same time: **a gate that searches for helper NAMES is a census** — it printed
     PASS over that component — so gate the SHAPES the renderer consumes, and say which boundary
     you reached.
  13. **A verification is worth only what it was taken OVER — and a receipt derived AFTER the fact
     manufactures the agreement it claims to prove.** Rung 10b's two audits found the same class
     three times, at three layers (ADR 0110/0111; `LESSONS.md` §28). A highlight asserted *this is
     the evidence you were shown* and was gated on `resolution.status`, which is about the ANCHOR
     while the mark came from a CHUNK whose id is derived from position — so a re-parse left the id
     and replaced the content and nothing had compared anything. A cell's column receipt kept only
     header rows whose width matched the axis, dropping the qualifier SPANNING the column, so
     **13,908 of 19,674** live cells survived a quarter→year swap unchanged: the same figure, a
     different fact. And the same response resolved, verified and RENDERED in three reads at READ
     COMMITTED, so changing only the third gave `resolved`, `anchor_content`, and a page showing
     another figure. The three repairs are one rule each: **verify the WHOLE meaning** (a period
     qualifier is part of what a column means, not decoration beside it); **derive the verdict from
     the bytes you are DISPLAYING**, and make the contract refuse a verified claim over content the
     response does not show; and where no receipt exists, **say so** — `PassageResponse.highlight`
     reports `recorded_position` rather than implying a check nobody made, which is ADR 0098's
     tri-state rule pointed at an assertion instead of a verdict. Its migration corollary, bought
     separately: a backfill pairing IMMUTABLE extraction-time labels with today's parse stamped
     today's heading on yesterday's reading and the pair then verified cleanly — **the drift erased
     by the step meant to record it**. So a historical receipt is issued only where the current
     parse demonstrably WITNESSES the reading it certifies, and a `--rebuild` may re-derive an
     address freely but may never erase a receipt it cannot itself certify.
