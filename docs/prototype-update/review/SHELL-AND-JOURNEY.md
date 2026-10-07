# Review — the shell, the demo journey and the guided tour

> **status:** working (temporary) · **authoritative for:** findings on the global shell (rail vs top
> navbar), the demo journey from sign-in to the surfaces, and the guided tour · **last verified:**
> 2026-10-05 at baseline `102c2ef`. Line numbers are at baseline.

Sources: the shell/journey review agent (read the prototype and `apps/web/app/components/`,
`layout.tsx`, `dashboard/`, `packages/ui`, ADR 0139) and rendered screenshots of the sign-in and
console screens.

## 1. The journey as it plays today

| Step | What the viewer sees | Time | Verdict |
|---|---|---|---|
| **Sign-in** (3253–3283, `signIn` 14278) | Logo, serif line "Investment research for Indian markets", prefilled fields, footer "Node4Analytics · Demo · Prototype" | ~5 s | Fine opening shot. The **"Demo · Prototype" footer undercuts "end product"**. Login email `analyst@node4analytics.com` (3269) ≠ account email `you@fund.in` (3554). |
| **Console** (3313–3335, 14487–14544) | Infosys and HDFC cards, a New-workspace card, Account rows (Sources · Team · Security), a Ctrl K palette | 45–60 s | Earns its place — it teaches *a workspace is a company*. But cards show "Edited 2d ago" (14357), not **coverage age**, which spec §9.1 makes one of the card's four facts; `coverage()` (14312–14325) computes "99 days stale" and nothing draws it. Conviction shows as lowercase "watch" (14368). |
| **Source intake** (15040–16139) | Folder chooser → rows stage one by one → a discovery agent → authority by section → **Process** → a forming graph (~30–35 s, pacing 15393–15406) → a job card born on the console | 2.5–3.5 min | **The most cinematic moment, and it dead-ends**: "Open the brief" shows *"This demonstration stops here… Infosys and HDFC Bank are"* (16092–16099). The viewer just "made" Hindustan Unilever and must go back to open Infosys. → D6 / O1. |
| **Workspace** | Library ~4–5 min · Graph 2–3 · Canvas 3–4 · Dashboard ~2 · Notes, Connectors ~30–45 s each | ~12–15 min | The surfaces carry the demo. Ending on Notes and Connectors is an anticlimax. Connectors appears twice (a page and the Account sheet's tab). |
| **Guided tour** | 26 spotlight steps for "the whole loop" | 8–12 min | Doesn't fit beside a live 15–20 min demo → the leave-behind (D1). |

Without the tour the journey already runs ~17–21 min. Infosys opens **stale** — honest, but a hook
only if the demo then fixes it.

## 2. Global shell: the rail vs the product's top navbar

**What the product's navbar does** (`apps/web/app/components/app-navbar.tsx`, ADR 0139):
- One **48 px** row (`h-12`, `--panel`, bottom hairline, `gap-5`). Left: "N4A" in the 22 px display
  serif, linking to the Library (104–113); then **text-only surface tabs** at 12.5 px semibold
  (114–125); the active tab is `--text` on `--panel-2`. Notes and Connectors are `aria-disabled`,
  faint, titled "Not built yet" (146–158).
- Right: the workspace **stated, not offered** — company name, else the id, no chevron (243–264); the
  AI-service health dot (words only when stale, hung or down, 275–293); an icon theme toggle
  (`theme-toggle.tsx`).
- States: no workspace line before the workspace is read; "No workspace named"; label or id. At
  ≤760 px the tabs fold into one disclosure on the shared Escape stack (181–240).
- It has **no** search, capture, pinned notes, tour or account entry, and no scope control (scope
  lives in `saved-scope.ts`).

**What porting it into the prototype implies:**
- **Layout:** `.app` becomes a column. Remove the rail CSS (340–419), the ≤1000 px rail rules
  (3130–3138), `toggleRail` / `S.rail` (~3908–3913) and the rail tooltip branch (~3738). `renderNav`
  (3866) writes tabs; the 1–6 shortcuts move into tab titles.
- **Topbar:** merge the 52 px `.topbar` (3219–3237) into the navbar; drop `#crumbPage` (the active tab
  says where you are). Search, pinned, capture, theme and tour move into a right-hand cluster, plus an
  account avatar.
- **Space:** Graph and Canvas gain **212 px**. At 1440 px the Graph canvas grows from ~564 to ~784 px;
  at 1280 px from ~404 to ~616 px.
- **Workspace switcher:** keep a **real picker** (the prototype has several companies). Proposed
  placement left, after the logo — `N4A · Console › Infosys ▾ · tabs` (O2; diverges from ADR 0139
  D3, which states the workspace on the right).
- **Logo** keeps pointing to the Console, not the Library.
- **Platform layer:** the console header `hm-top` (3317–3333) is already a top bar — make it the same
  component without tabs, so console → workspace reads as the bar gaining its tabs. The settings
  sheet keeps its own header.
- **Tour:** content targets are unaffected; keep the `.pinned-btn` class (Notes tour step 2); rewrite
  the Library step-1 copy "switcher at the top of the rail" (11463; HDFC copy 14019) and the boot log
  (16279).
- **Theme:** keep the prototype's light default (ADR 0075 D5); the product's `layout.tsx` follows the
  OS (outside-scope X4).
- **Health dot:** drop it — the prototype has no backend.

## 3. The guided tour

- **Steps:** 9 Library · 4 Graph · 5 Canvas · 4 Dashboard · 2 Notes · 2 Connectors (11456–11643).
  Library holds 35%; the tour **ends on infrastructure**.
- **No platform story** — the console and intake are never toured.
- **The loop is told, not shown.** The AI/headcount question does recur from Library → Graph
  (`c-compress`) → Canvas (`ai-change`) → falsifiers, but nothing is *carried*: no note is captured,
  no conviction changes (the Dashboard step only describes it, 11610). Notes comes after Dashboard.
- **Copy:** mostly excellent and specific ("one year, three growth rates", "sequence, not
  causation"); some aphoristic or preachy ("a confident answer would be the dishonest one"); some
  jargon ("opposite polarity" 11494, "artefact id" 11500, "scope grant" 11554); comma splices
  (11463). Naming varies: "Walkthrough" (11744) vs "Guided tour" (3212).
- **Factually wrong step:** tells the viewer to add TCS / ICICI / Axis filings to the Library
  (ledger A-41).

**Proposed re-cut (phase 6.6):** one thread of 10–12 steps that carries one question across the
product — console → a lead → its evidence page → the Graph contradiction → the Canvas memo turning
amber → a captured note → a falsifier → conviction change → decision log → hand-over.

## 4. Recommendations (ranked by demo impact)

1. **Give intake an ending** (O1; HUL kept, D6).
2. **One 48 px navbar** replacing rail + topbar, with a real switcher, "Ask N4A or search · Ctrl K",
   pinned, capture, tour, theme and avatar, unified with the console header.
3. **Re-cut the tour** as one thread (§3).
4. **Valuation frame + dated event calendar** on "My view" (see `DASHBOARD-NOTES-CONNECTORS.md`).
5. **`Triggered` falsifier state; reason before conviction moves.**
6. **Console as the coverage book:** coverage age, capitalised conviction, triggered falsifiers, next
   dated event per company.
7. **Fix the consistency errors** (ledger §3).
8. **Product fonts and tokens; ~8-step type scale** (`CROSS-CUTTING.md`).
9. **Punctuation and jargon sweep.**
10. **Remove prototype seams** — a showcase of the end state has no "this is a prototype" moments.
11. **Notes as a journal** (dated entries, types, capture keeps context, no stickies).
12. **Connectors:** one authority ladder, toggleable permissions with an audit line, where each model
    provider's data goes, current model names.
