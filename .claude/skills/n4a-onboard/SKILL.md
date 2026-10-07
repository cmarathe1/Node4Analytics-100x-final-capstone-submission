---
name: n4a-onboard
description: Deep orientation for N4A — reads architecture, plan, and design system for the active task. Use only when SESSION.md feels stale or you need full architecture/design context. For routine session starts, read docs/SESSION.md directly instead.
---

# n4a-onboard — deep orient on N4A

Use when `docs/SESSION.md` isn't enough — e.g. you're touching a new architectural layer, a new frontend
surface, or SESSION.md hasn't been updated recently. Goal: get full context on what's built, why, and
what's next.

## Steps

**Read bounded, not whole.** These files are large by design; a full read costs tens of thousands of
tokens and is almost never what you need. `docs/README.md` is the tier map if you're unsure where
something lives.

1. Read `docs/SESSION.md` — Stage, what runs, next action. **Stop here if it's sufficient** (it
   usually is).
2. Read **only the newest entries** of `docs/PROGRESS.md` — `Read` it with `limit: 150`, which covers
   the last few slices. It is a ~100 KB append-only log; older eras live in `docs/archive/`.
   Then `docs/ROADMAP.md` §1 for what's next and what's deferred.
3. `docs/PLAN.md` — the stable Stage arc + definition of done. Its checkboxes are a **map, not a
   status board**; `SESSION.md` wins on any disagreement.
4. `docs/reference/ARCHITECTURE.md` — read the **sections you need**: §3 contracts · §4 pipeline ·
   §9 invariants · §10 layers. For runtime *flows* use `docs/reference/MERMAID-DIAGRAMS.md`; for the
   physical schema, `docs/reference/DATABASE-SCHEMA.html`.
5. `DESIGN-SYSTEM.md` **only** §5.x for the surface you're about to touch — never whole.
6. `docs/decisions/README.md` for any ADR relevant to the task — the index carries live-vs-superseded
   status, so you rarely need to open more than one or two.
7. If the next task is a frontend surface, locate it in the prototype HTML for exact values.

**Anything in `docs/specs/` describes work that may not exist yet** — treat it as intent, not as a
description of the running system. Anything in `docs/archive/` is history; you almost never need it.

## Output (report back to the user, concise)
- **Stage & status:** e.g. "Stage 1, walking skeleton; Library renders mock graph, Ask not wired."
- **What runs today** and what doesn't.
- **Next action** (from PLAN/PROGRESS), with the 1–3 files you'll touch first.
- **Open questions / blockers** for the user, if any (from `RESEARCH.md §7` or PROGRESS).

Keep it to a short briefing — the user should be able to say "go" or redirect in one read.
