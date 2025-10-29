


import {  baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

import { inngest } from '@/inngest/client';
import { TRPCError } from '@trpc/server';



export const appRouter = createTRPCRouter({
  testAi:baseProcedure.mutation(async()=>{
 
    await inngest.send({
   name: "execute/ai",
  });
  return {success:true , message : "job queued" }
  }),
  getWorkflows: protectedProcedure.query (({ctx}) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async()=>{
  await inngest.send({
name:"test/hello.world", //same as event el fe el functions 
data:{
  email:"mohamedtalal881@gmail.com",
},
  })

  return {success:true , message : "job queued" }
  }),
});

export type AppRouter = typeof appRouter;