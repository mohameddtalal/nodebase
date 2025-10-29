import prisma from "@/lib/db";
import { inngest } from "./client";
import * as Sentry from "@sentry/node";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { gemini } from "inngest";

const google = createGoogleGenerativeAI();


export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {

    await step.sleep("pretend" , "5s");


    Sentry.logger.info('User triggered test log', { action: 'test_log' })
    console.warn("something is missing");
    console.error ("this is an error i want to track");

    
   const {steps : geminiSteps } =await step.ai.wrap("gemini-generate-text",
     generateText ,
     {
    
    model:google("gemini-2.5-flash"),
    system : "you are a helpful assistant.",
    prompt: "what is 2+2",
     experimental_telemetry: {
    isEnabled: true,
    recordInputs: true,
    recordOutputs: true,
  },
   });
   return geminiSteps;
  },
);