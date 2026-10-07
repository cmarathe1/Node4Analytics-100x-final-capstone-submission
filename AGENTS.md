# AGENTS.md — Node4analytics repository guide

## Scope and orientation

Read `docs/SESSION.md` first. This repository contains the **landing page, an early workflow concept, and product research/documentation**. The runnable app is in `frontend/`. The Python AI service, database, shared contracts, and six-surface application described by historical research are not included.

Use `README.md` for project scope and setup, and `docs/README.md` for the research map. Do not execute historical backend commands or quote historical test totals as verification of this repository.

## Stack and commands

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Base UI, Framer Motion, and optional PostHog.
- Use npm and the committed `frontend/package-lock.json`; do not add a second package manager or backend framework.
- From `frontend/`: `npm ci`, `npm run dev`, `npm run check`, `npm run build`, `npm start`.
- Stop the development server before building: both write `.next`.
- From the repository root: `node scripts/verify-repository.mjs` checks published documentation and repository hygiene.
- No backend, DB reset, API key, or workspace ID is needed for the landing page.

## Editing rules

1. Match the surrounding React/TypeScript code. Read the applicable bundled Next.js documentation in `frontend/node_modules/next/dist/docs/` before framework changes; follow `frontend/AGENTS.md` for frontend-specific instructions.
2. Use **Node4analytics** as the public name and **n4a** for new internal identifiers. FinQuira in older research is a historical working name; do not silently rewrite original observations.
3. New colors, surfaces, and shadows use existing CSS tokens, or add named tokens in `frontend/src/app/globals.css` before use. Avoid expanding existing hard-coded styling.
4. Preserve accessible interactions, responsive layout, reduced-motion behavior, and the existing design unless the user requests a redesign.
5. Keep the preview honest: figures, AI messages, and reports are illustrative UI content. Do not imply live market feeds, model calls, ingestion, or persistence where none exists.
6. Research claims retain their citations, dates, reporting periods, and caveats. Distinguish targets, hypotheses, vendor claims, historical evaluations, and newly verified results. Do not fabricate data or validation.
7. Keep third-party PDFs, local agent settings, secrets, build outputs, generated review snapshots, and unfinished downloads out of Git. `.env.example` has blank optional values; `NEXT_PUBLIC_*` values are public.
8. Keep changes scoped and reviewable. Existing staged changes belong to the user; do not reset them. Do not commit, push, or deploy unless requested.
9. Keep documentation aligned with the code present here. Historical architecture records are context, not runtime instructions. Link only to published files; absent broader-platform references may be named as plain text.

## Verification and handoff

Before handing over a change, run the checks appropriate to it. For frontend changes, run lint, TypeScript, and a production build, then inspect relevant browser interactions. For presentation changes, run the repository instrument and inspect the reading route. Record the actual outcome and any limitation; do not claim a CI run or browser check that did not happen.

After each coherent slice, update `docs/SESSION.md` and provide a **Verify this slice** card: clean run, bring up, precise steps, expected behavior, likely culprits, and reset. Wait for user sign-off before calling the slice complete or updating `docs/PROGRESS.md`. For this repository, the card explicitly states that the preview has no live data/AI/backend and that no DB or real-provider check applies.
