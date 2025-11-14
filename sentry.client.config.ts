import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://f3f07cad7fddd3ee44463fbcc68a5e00@o4510363533639680.ingest.us.sentry.io/4510363534950400",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  enableLogs: true,

  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
});

