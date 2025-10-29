// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0a32e5e388d0dd20ed4bc0c138ef0ff5@o4510261773074432.ingest.us.sentry.io/4510274338881536",



   integrations: [
    // Add the Vercel AI SDK integration 
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true,
    }),
        Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),

  ],  //from site


  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
 
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
