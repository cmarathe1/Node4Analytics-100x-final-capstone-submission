---
name: n4a-improve
description: Reflect on friction from recent N4A work and improve the meta-layer — skills, agents, AGENTS.md/CLAUDE.md ground rules, and docs — so the next session is faster and the project keeps resembling expert work. Use when something was unclear, repeated, or slower than it should have been.
---

# n4a-improve — sharpen the meta-layer

The skills, agents, and ground rules are *living*. This skill turns friction into permanent improvements
so the project compounds toward expert quality instead of drifting.

## When to run
- After `n4a-progress` flags friction.
- When you corrected the same thing twice.
- When a doc/skill was wrong, stale, or missing.
- When you discover a better technique (record it, with a source, in `RESEARCH.md`).

## Steps
1. **Name the friction** in one sentence. (e.g. "the frontend-port skill didn't say where tokens live.")
2. **Find the right home for the fix — in THIS order (cheapest-to-carry first):**
   - **A check in code** — a test, a lint rule, a type (a parameter with no default), a hook. It
     enforces itself and costs no reading. Prefer this whenever the friction can be detected.
   - A workflow → the relevant `.claude/skills/*/SKILL.md` (a checklist line; the story goes in a
     supporting file beside it, e.g. `n4a-progress/INCIDENTS.md`).
   - A track behavior → the relevant `.claude/agents/*.md`.
   - The story of WHY → `docs/LESSONS.md`; a command's detail → `docs/reference/COMMANDS.md`; an eval
     rule's full text → `docs/reference/EVAL-DOCTRINE.md`.
   - **`AGENTS.md` only for a new invariant or ground rule everyone needs, ONE line, and it must
     replace or merge an existing line** — the file is loaded into every session of both tools and
     is capped at 24 KB by `test_docs_drift.py` (Codex stops reading at 32 KiB). It grew 7 KB →
     113 KB in three months by this step appending a paragraph per incident.
   - A decision → a new ADR only if structure/contract/invariant changed. Status → `PROGRESS.md`.
   `.claude/skills` and `.claude/agents` are the **source of truth**; the Codex mirrors
   (`.agents/skills`, `.codex/agents`) are generated — never hand-edit them.
3. **Make the smallest durable edit** that prevents the friction recurring. Be specific and concrete;
   avoid vague "be careful" advice — give the exact path, value, or step.
4. **Keep it lean.** If a doc is getting bloated, tighten it. Delete advice that turned out wrong.
5. **If you touched any `.claude/skills/*` or `.claude/agents/*`, re-sync Codex:**
   `node scripts/sync-agent-config.mjs` (keeps the `.agents/skills` + `.codex/agents` mirrors in
   parity so the same skills/subagents work in Codex).
6. **Log it** in the current `PROGRESS.md` entry under "meta-layer friction / change".

## Guardrails
- Don't expand scope of the meta-layer for its own sake — only fix real, observed friction.
- **One in, one out.** Every rule you add to a file that is always loaded should retire or merge
  one. A rule the agent already follows without being told is deleted, or turned into a check.
- Don't duplicate: one fact, one home. Cross-link instead of copying.
- Ground-rule changes that alter architecture need an ADR, not just an edit.
