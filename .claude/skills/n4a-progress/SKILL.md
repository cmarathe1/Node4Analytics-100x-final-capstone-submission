---
name: n4a-progress
description: Run after completing a step/slice on N4A. Reviews the change against the project invariants, updates docs/PROGRESS.md, logs any demo-worthy feature in docs/DEMO-FEATURES.md, adds an ADR if a decision changed, and triggers the auto-improve loop. Use whenever a coherent piece of work is finished.
---

# n4a-progress — review, log, and improve after a slice

A checklist. Each item names the section of [`INCIDENTS.md`](INCIDENTS.md) that explains WHY it
exists — open that section only when the item is unclear or when it fires.

## 0. Preconditions
- [ ] **The user has signed off** on the "Verify this slice" card. If not, stop and hand them the
      card instead. (INCIDENTS §0)
- [ ] **Log drift:** compare `git log --oneline -10` / `git diff --stat` with the last dated
      `PROGRESS.md` entry. Anything unexplained is an unlogged slice — fold it in. Another session
      may share this working tree: never assume `git status` is yours; re-read `SESSION.md` and
      `decisions/README.md` before editing them; `git fetch` before any push the user asked for.
      (INCIDENTS §0a)
- [ ] **Unrun checks in the plan's log:** grep `docs/plans/<slice>.md` for "NOT run" / "NOT
      re-verified" and run each named check BEFORE logging. A sign-off covers what the user
      clicked, not a suite nobody ran (rung 15: post-review web edits reached sign-off unformatted).
      Then run the full suites ONCE, alone, and write THOSE counts into SESSION/PROGRESS — never
      copy the plan's (rung 14: SESSION said web 1,042, the last run said 1,051).

## 1. Review the diff against the invariants
- [ ] Provenance on every new output · tokens-only styling · contract + OpenAPI updated together ·
      graph physics off React state · ₹/lakh-crore, NSE/BSE, IST · typed and tested.
- [ ] A gate you touched can FIRE, reads the mechanism it protects, and its fixture exercises the
      dimension under test; a render assertion checks VISIBLE text. (INCIDENTS §1, four tells)
- [ ] Pipeline slice? Read the STORE it produced (a few `psql` queries), confirm it came from the
      current code, and check conservation (inputs vs outputs). (INCIDENTS §1a)
- [ ] Run the `--store` probes of every door the slice touched, alone. A red one is OLD or NEW: read
      it at HEAD (`git grep <needle> HEAD`) before fixing. A probe that borrows the analyst's live state
      (a saved scope, an upload) must work from ANY state and restore it exactly (rung 17: two stale
      probes surfaced only at the close).
- [ ] Run `uv run pytest tests/test_docs_drift.py` (<1 s) BEFORE any full suite, never beside doc
      edits. (INCIDENTS §1a, last two paragraphs)

## 2. Log it
- [ ] `docs/PROGRESS.md`: one dated entry, newest on top — what changed, why, what now runs, ADR
      links. No status block (SESSION.md owns status). Roll a closed era into `docs/archive/`.
- [ ] `docs/SESSION.md`: rewrite to what is true NOW + the next action, ≤ 8 KB (`ls -l`, the gate's
      measure). Cut the past, not the present. Write files LF (`write_bytes`). (INCIDENTS §2a)
- [ ] `docs/ROADMAP.md`: tick what closed, add what was deferred.
- [ ] Reference docs: a changed table → `DATABASE-SCHEMA.html`; a changed contract →
      `ARCHITECTURE.md`; a changed flow or gate → `MERMAID-DIAGRAMS.md`. Bump `last verified`.
      (INCIDENTS §2·5)
- [ ] Changed a pinned VALUE or renamed an enum? Grep the OLD literal across `AGENTS.md`,
      `docs/*.md` and settings comments. (INCIDENTS §4)
- [ ] Delete the slice's `docs/plans/<slice>.md`.

## 3. Decisions
- [ ] A new ADR ONLY if a structure, contract, invariant or dependency changed — a fixed audit
      finding is a test + commit message. ≤ 8 KB; over it, look for a separable decision, then
      delete whole paragraphs rather than rewording. (INCIDENTS §2·5, §3)
- [ ] Add ONE line to `docs/decisions/README.md` with its status; flip the status of any ADR it
      refines/supersedes; flip `Proposed` → `Accepted` for an ADR this slice implemented; banner a
      remediated audit doc as historical. (INCIDENTS §3)
- [ ] Numbered registers (`LESSONS.md` §N, `DEMO-FEATURES.md` FN): take the next free id; the
      drift gate checks duplicates. (INCIDENTS §2·5)

## 4. Demo features
- [ ] Would a viewer notice it or an analyst push on it? Add/update `docs/DEMO-FEATURES.md`
      (why · how · demo moment). Skip plumbing.

## 5. Improve (always)
- [ ] What slowed this slice down? Run **`n4a-improve`** — and prefer a CHECK IN CODE over a new
      rule in prose.

## 6. Next
- [ ] State the next action (ROADMAP §1 / the ladder) so the user can continue or redirect.
