---
name: n4a-frontend-port
description: Port a surface from the N4A prototype HTML into idiomatic React/Next + the design-system tokens. Use when building or refining any of the six surfaces (Library, Graph, Canvas, Dashboard, Notes, Connectors) or a shared component.
---

# n4a-frontend-port — port a prototype surface to React

The prototype (`N4A Workspace (standalone).html`) is the exact visual/behavioral spec. Rebuild it
idiomatically — **do not transliterate** the `DCLogic` class/template prototype.

## Steps
1. **Read the intent:** open the matching section of `DESIGN-SYSTEM.md` (§5.1 Library, §5.2 Dashboard,
   §5.3 Canvas, §5.4 Notes, §5.5 Connectors) and the relevant component recipes in §3.
2. **Find it in the prototype:** locate the surface's markup + logic in the HTML for exact values
   (sizes, weights, durations, behavior). Treat values as authoritative; treat structure as a reference.
3. **Tokens first:** confirm every color/surface/shadow is a CSS var in `packages/ui` (Tailwind v4
   `@theme`). Add any missing token (e.g. `--amber-soft` — a known gap) rather than hard-coding hex.
4. **Build components:** idiomatic React 19 / Next App Router. Client state in Zustand; server state in
   TanStack Query. Use the right lib per ADR 0006 (React Flow for Canvas; react-force-graph for the
   Library graph; graph physics off React state).
5. **Wire data:** use the typed client generated from OpenAPI. Mock only what the backend hasn't shipped,
   behind a clearly-flagged boundary; never hard-code fake market numbers as if real.
6. **Honor the cross-cutting patterns** (`DESIGN-SYSTEM.md §4`): provenance chips on every output, quick
   capture, global pins, conviction inline-edit, theming — these are shared, global, and consistent.
7. **Verify:** light/dark parity, the documented interactions/animations, keyboard + aria basics, ₹/IST
   formatting. Run typecheck + a smoke test. **Grep the new/changed files for `#[0-9a-fA-F]{3,6}\b` and
   `\bwhite\b|\bblack\b` before calling it done** — lint/typecheck don't catch a one-off hex, and it's
   cheaper to fix at build time than to have `n4a-progress`'s invariant pass catch it later (recurred
   twice now: `--amber-soft`, then a Canvas port's `color: #fff` on the port glyph — promoted to
   `--on-accent`, 2026-07-07).

## Done when
Surface matches design intent, all outputs cite sources, styling is tokens-only, interactions match the
prototype, and it's wired to real data (or an explicit flagged stub). Then run `n4a-progress`.
