import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { gemini } from "inngest";

const google = createGoogleGenerativeAI();


export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend" , "5s");
   const {steps : geminiSteps } =await step.ai.wrap("gemini-generate-text",
     generateText ,
     {
    
    model:google("gemini-2.5-flash"),
    system : "you are a helpful assistant.",
    prompt: "what is 2+2",
   });
   return geminiSteps;
  },
);