

import { promise } from 'zod';
import {  createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { resolve } from 'path';
import { inngest } from '@/inngest/client';

export const appRouter = createTRPCRouter({
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
