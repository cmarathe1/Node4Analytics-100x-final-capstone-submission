# Verify the landing page and research

> **status:** manual guide · **authoritative for:** checks that apply to this repository ·
> **last verified:** 2026-10-07.

## Clean run and bring up

No fresh database, workspace ID, provider key, or backend reset is needed. From the repository root:

```bash
cd frontend
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Leave `.env.local` absent for the default analytics-free run.

## Do this and expect

1. Read the root README, then follow Research and insights, the documentation guide, and one competitor study. Expect a clear distinction between working landing-page features, product requirements, and historical records.
2. On desktop, use How It Works, Why n4a, and Features in navigation. Expect each to scroll to its named section. Request Early Access should lead to contact; Request a Walkthrough should open an email draft addressed to the creator.
3. Inspect the canvas. Drag a node, expand a panel, and close it. Expect node/edge movement and a responsive preview, with an explicit sample-content label. This preview does **not** run live data, AI, ingestion, or persistence.
4. On a narrow screen, open the mobile menu and choose a section. Expect the menu to close and the target section to be reachable; no page-wide horizontal overflow.
5. Enable your system's reduced-motion preference and reload. Expect content to remain usable without entrance animations.
6. Open `Financial Workflow Canvas.html` directly in a desktop browser with internet access. Expect the early canvas experiment to load; it uses sample content and external CDN scripts.

## Static and production checks

Stop the development server first, then from `frontend/`:

```bash
npm run check
npm run build
npm start
```

From the repository root:

```bash
node scripts/verify-repository.mjs
```

The GitHub workflow runs frontend checks and build. Local verification does not establish that a GitHub-hosted workflow has run successfully.

## If it is off

- Installation or font/CDN errors: check network access and Node.js version.
- Port 3000 in use: stop the previous local server or use `npm run dev -- --port 3001`.
- Stale production assets: stop both servers before building again.
- Analytics warning: leave the optional PostHog key blank unless you are configuring your own project.
- Historical backend command fails: use the root README; that service is not included here.

## Reset for the next run

Stop the server with Ctrl+C. Reload the page to reset the illustrative canvas. No DB reset or paid provider run applies.

## Verification receipt — 2026-10-07

| Check | Observed result |
| --- | --- |
| Repository instrument | PASS: 61 Markdown files, 177 local links, 8 ignore checks; no unpublished linked targets |
| Initial documentation baseline | 158 unpublished links found; 15 repaired to included files, 143 preserved as plain references |
| ESLint + TypeScript | PASS via `npm run check`; initial lint baseline was 3 errors, final 0 |
| Production build | PASS via `npm run build`, Next.js 16.2.3; network access was needed for Google Fonts |
| Lockfile install plan | PASS via `npm ci --dry-run --ignore-scripts --offline`; this checks the install plan, not a fresh dependency download |
| Chrome desktop | Correct Inter body font, section navigation, canvas node/edge drag, spreadsheet/document panel open and close |
| Chrome narrow viewport | Checked at 390 × 844: menu expanded/collapsed states, responsive layout, no horizontal page overflow |
| Contact | Rendered anchor has `mailto:cmarathe1@gmail.com`; no email was sent |
| Analytics-free run | Browser reports analytics disabled; no browser errors observed |
| Standalone HTML | Loaded through a temporary local HTTP server; external React/Babel scripts loaded and sample-content label appeared |

The [landing-page image](assets/landing-page.jpg) records the final typography and copy. A limited scan of publication candidates found no matches for common provider/GitHub/AWS token or private-key patterns; it is not a comprehensive security audit.

**Not yet verified:** the first GitHub-hosted workflow run, a deployed site, OS reduced-motion behavior, and opening the standalone HTML with a `file://` URL. The browser concept check used HTTP. No Python/backend, real-provider, or company-corpus run applies to this repository. User manual sign-off is pending.
