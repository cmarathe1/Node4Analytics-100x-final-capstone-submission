import posthog from 'posthog-js'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim()

if (!posthogKey) {
  console.warn('[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set — analytics disabled')
} else {
  try {
    posthog.init(posthogKey, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      defaults: '2026-01-30',
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.debug()
      },
    })
  } catch (e) {
    console.warn('[PostHog] Failed to initialize:', e)
  }
}
