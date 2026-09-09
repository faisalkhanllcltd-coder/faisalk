import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN,
  // Low sampling for production performance
  tracesSampleRate: 0.1,
  // Replay completely disabled to eliminate heavy canvas/recording bundles
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  debug: false,
});
