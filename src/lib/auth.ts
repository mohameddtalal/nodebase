import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
import {checkout ,polar,portal } from "@polar-sh/better-auth";
import { polarClient } from "./polar";

export const auth = betterAuth({
 
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // هينشئ Session تلقائي بعد signUp
  },
  plugins:[
    polar({
     client: polarClient,
    createCustomerOnSignUp:true,
   use:[
    checkout({
    products:[
      {
        productId:"d4181b14-2613-49e8-9cab-9f70da631df6",
        slug:"pro",
      }
    ],
    successUrl: process.env.POLAR_SUCCESS_URL,
    authenticatedUsersOnly:true,
    }),
    portal(),
   ],

})

  ],
});
