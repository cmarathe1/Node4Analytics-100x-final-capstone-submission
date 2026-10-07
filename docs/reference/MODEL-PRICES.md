# Model price reference (OpenAI API)

> **Repository scope · 2026-10-07:** This is a broader-product research or historical development record. Features, commands, evaluation counts, prices, and status below retain their original context; they are not verification of the landing page included here. Some referenced services, ADRs, source PDFs, and prototypes are not distributed in this repository. See the [documentation guide](../README.md) for current scope.

> **status:** reference · **authoritative for:** nothing — this is a **human-readable mirror**.
> **last verified:** 2026-10-02.
>
> ⚠ **The authority is the model catalogue, `services/ai/app/llm/models.toml`** (ADR 0150): one
> block per model with its efforts and prices, `price_table_version` at the top. `pricing.py`
> derives `PRICES` and stamps that version on every telemetry record, reporting an honest
> `unpriced_model` rather than a fabricated ₹0; `experiments/prices.py` re-exports the same table.
> When a price changes, edit the catalogue (and bump its version), then this file.
>
> Reference for the model × reasoning right-sizing experiments
> (`LIBRARY-ANALYST-READINESS.md` (reference outside this repository: `../LIBRARY-ANALYST-READINESS.md`) §3, ADR 0037 amendment).
> **Re-verify before each experiment run** — prices move.

All prices **USD per 1M tokens**, standard tier (not batch/flex/priority).

## The 2026-09-22 GPT-6 release (why the ladder changed again — ADR 0133)

OpenAI released `gpt-6-luna` and `gpt-6-sol` on **2026-09-22** at permanent (not introductory)
prices, and re-priced `gpt-5.6-sol` to $4 / $20. On one index (Artificial Analysis Intelligence
Index v4.3.2, read 2026-09-25), by effort `none · low · medium · high · xhigh · max`:

| Model | Input | Cached | Output | AA index by effort | Role |
|---|---|---|---|---|---|
| `gpt-6-luna` | $0.10 | $0.01 | $0.50 | 18 · 21 · 29 · 32 · 34 · 37 | **ladder rungs 1–6** (effort dial) |
| `gpt-6.1-sol` | $2.00 | $0.10 | $10.00 | not yet read · efforts `low`→`max`, default `medium`, **no `none`** | **ladder rungs 7–10** (`medium`→`max`, ADR 0150 D5, 2026-10-02) · cache writes $2.50 (not in our cost formula — ROADMAP §1) |
| `gpt-6-sol` | $2.00 | $0.20 | $10.00 | 28 · 34 · 40 · 43 · 44 · 48 | the top rung until 2026-10-02; on the picker |
| `gpt-6-astra` | $10.00 | $1.00 | $50.00 | max 53 | ⛔ flagship — off the ladder; only with the user's explicit OK |
| `gpt-5.6-luna` | $0.20 | $0.02 | $1.20 | 16 · 21 · 25 · 32 · 35 · 37 | off the ladder (dominated); assistants' default by user choice |
| `gpt-5.6-terra` | $2.00 | $0.20 | $12.00 | max 42 | off the ladder (dominated by `gpt-6-sol`) |
| `gpt-5.6-sol` | $4.00 | $0.40 | $20.00 | 28 · 33 · 39 · 42 · 44 · 47 | off the ladder (dominated by `gpt-6-sol`) |
| `gpt-5-nano` | $0.05 | $0.005 | $0.40 | best 13 (`high`) | off the ladder — deprecated 2026-12-11 |
| `gpt-5.4-nano` | $0.20 | $0.02 | $1.25 | — | ⛔ retired 2026-08-02 — priced only so historical runs cost |
| `gpt-5.4-mini` | $0.75 | $0.075 | $4.50 | — | ⛔ retired 2026-08-02 — priced only so historical runs cost |

Why the new order: `gpt-6-luna` is half 5.6-luna's price and scores the same or higher at every
effort (xhigh 34 vs 35 is noise); `gpt-6-sol` beats terra's best at `high` for less output cost and
matches 5.6-sol at half the price. `gpt-5-nano` is cheapest by list price, but its BEST score is
below `gpt-6-luna` with reasoning OFF, and it always spends hidden reasoning tokens — for a
one-word answer to a 1,500-token question, nano@low costs ~$0.00024 against 6-luna@none's
~$0.00016. `gpt-6-sol@low` (34) is below `gpt-6-luna@max` (37), so sol enters at `medium`.
Two caveats from independent evaluation: 6-luna writes ~23% more output tokens per task (still
~60% cheaper per task), and it slipped on analyst-facing DELIVERABLE quality (AA-Briefcase −46
Elo) while hallucinating less (it declines rather than invents) — a clean win for machine-read
work, a measurement first for prose a person signs off on.

**Why the off-ladder rows stay priced and registered:** an absent row reports `unpriced_model` →
`None`, which would turn a real, already-billed run into "we can't price this", and an analyst can
still choose any registered model in the AI switcher. Off the ladder ≠ unavailable.

## Cost formula (per run)

```
cost = (input − cached_input) × input_price
     + cached_input × cached_input_price
     + output × output_price
```

- Token counts come from the **provider usage object**, whose field names differ per endpoint —
  `app/llm/chat.py` carries one extractor for each and they are NOT interchangeable:
  - `/v1/chat/completions` → `prompt_tokens` · `prompt_tokens_details.cached_tokens` ·
    `completion_tokens` · `completion_tokens_details.reasoning_tokens`
  - `/v1/responses` (the tool-calling path since 2026-08-02) → `input_tokens` ·
    `input_tokens_details.cached_tokens` · `output_tokens` ·
    `output_tokens_details.reasoning_tokens`

  Reasoning tokens bill as **output** — an effort change IS a cost change, which is why cost is
  measured per combination, never assumed. ⚠ Reading the wrong shape fails *silently*: every field
  is fetched with `getattr(..., None)`, so a mismatch reports `no_usage` / `None` rather than
  raising. `tests/test_llm_router.py` pins both shapes for that reason.
- **GPT-5.6 treats `reasoning_effort` as a CEILING, not a floor** (the `gpt-5*` family treated it as
  a floor). On prompts it judges easy the model may emit zero reasoning tokens even at a high
  setting — so a higher effort is a *permission to spend*, not a committed spend, and the only
  setting that guarantees zero reasoning tokens is `none`.
- **Never assume cache behavior — measure it.** A developer-community thread reports
  `gpt-5.4-nano` returning zero prompt-cache hits despite >1024-token shared prefixes; the
  measured `cached_tokens` count is the only number a cost report may use.
- Regional (data-residency) endpoints carry a 10% uplift for models released on/after 2026-03-05
  — we don't use them; flat standard-tier pricing applies.

## Notes

- `gpt-6-luna` takes `none · low · medium · high · xhigh · max` (default `medium`; no `minimal`),
  1.05M context, 128K max output, structured outputs supported (model page, 2026-09-25).
- ⏳ **`gpt-5-nano` carries a deprecation clock.** OpenAI's 2026-06-11 notice retires the
  `gpt-5-nano-2025-08-07` snapshot on **2026-12-11**, recommended replacement `gpt-5.6-luna`. The
  floating alias `gpt-5-nano` points at that snapshot. Since ADR 0133 no task depends on it.
- Embeddings (`text-embedding-3-small`) are deliberately not priced here — no reasoning dial, not
  part of the model × effort grid. Add if an embedding experiment is ever designed.

**Sources:** [developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing) ·
[developers.openai.com/api/docs/models/gpt-5-nano](https://developers.openai.com/api/docs/models/gpt-5-nano) ·
[models/gpt-5.6-luna](https://developers.openai.com/api/docs/models/gpt-5.6-luna) ·
[models/gpt-6-luna](https://developers.openai.com/api/docs/models/gpt-6-luna) ·
[Artificial Analysis — GPT-6 luna](https://artificialanalysis.ai/models/releases/gpt-6-luna) ·
[— GPT-6 sol](https://artificialanalysis.ai/models/releases/gpt-6-sol) ·
[— GPT-5.6 luna](https://artificialanalysis.ai/models/releases/gpt-5-6-luna) ·
[— GPT-5.6 sol](https://artificialanalysis.ai/models/releases/gpt-5-6-sol) ·
[changelog](https://developers.openai.com/api/docs/changelog) (2026-07-30 cut) ·
[deprecations](https://developers.openai.com/api/docs/deprecations) (2026-06-11 notice)
