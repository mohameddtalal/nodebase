import { auth } from '@/lib/auth';
import { polarClient } from '@/lib/polar';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
import superjson from "superjson"


export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    auth: session, // 👈 this defines what "ctx.auth" will be
  };
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
//intialize trpc
const t = initTRPC.create({
transformer : superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure=baseProcedure.use(async({
  ctx,next})=>{
const session =await auth.api.getSession({
  headers:await headers(),
});
if(!session){
  throw new TRPCError({
    code:"UNAUTHORIZED",
    message:"UNAUTHORIZED",
  });
}
   return next({ctx : {...ctx, auth: session }}); 
  });
//integrate premium procedure
  export const premiumProcedure = protectedProcedure.use(
  async ({ctx,next})=>{
     const customer =await polarClient.customers.getStateExternal({
    externalId: ctx.auth.user.id,
    });
    if(
      !customer.activeSubscriptions || 
    customer.activeSubscriptions.length ===0
     ){
     throw new TRPCError({
    code:"FORBIDDEN",
    message:"Active subscription required",
       });
  }
  return next({ctx: {...ctx ,customer}});
},

  );