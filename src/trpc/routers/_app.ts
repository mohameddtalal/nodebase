

import {createTRPCRouter } from '../init';

import { workflowsRouter } from '@/features/workflows/server/routers';



export const appRouter = createTRPCRouter({
 workflows: workflowsRouter,  //mapping
});

export type AppRouter = typeof appRouter;