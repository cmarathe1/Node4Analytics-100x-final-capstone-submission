# Node4analytics landing page

A Next.js 16 App Router site built with React 19, TypeScript, Tailwind CSS 4, Base UI components, Lucide icons, and Framer Motion. Product context and research live in the [root README](../README.md) and [documentation guide](../docs/README.md).

## Local setup

Use Node.js 22 LTS and npm (minimum Node.js 20.9).

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The site works without an `.env.local` file or backend. Google Fonts are downloaded by Next.js during the first development compile or production build.

## Checks and production preview

Stop the development server before building; both use `.next`.

```bash
npm run check
npm run build
npm start
```

`npm run lint` runs ESLint, `npm run typecheck` runs TypeScript, and `npm run check` runs both. Follow the [manual verification guide](../docs/VERIFY.md) to inspect desktop/mobile navigation and the interactive canvas. No automated unit or browser suite is bundled.

## Optional analytics

Analytics are disabled by default. To enable them, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_POSTHOG_KEY` to your PostHog project's public ingestion key. The existing `/ingest` proxy targets PostHog's US region. Do not put provider keys or other secrets in `NEXT_PUBLIC_*` variables; those values are delivered to the browser.

## Structure

- `src/app`: page composition, metadata, global styles, and brand icon.
- `src/components`: navigation, hero, workflow story, interactive canvas, benefits, features, and contact section.
- `src/components/ui`: shared Base UI components.
- `src/instrumentation-client.ts`: optional analytics initialization.
- `next.config.ts`: response headers and analytics proxy.

The canvas uses local illustrative data and messages. It has no live market-data, AI, document-ingestion, or persistence connection. The walkthrough action opens the user's email app.

## Deployment

Choose `frontend` as the root directory on a Next.js hosting service. Use `npm ci` to install and `npm run build` to build. Use the host's Next.js runtime, or `npm start` for a Node.js server. No database or AI service is needed for this site.
