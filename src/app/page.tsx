import { getQueryClient, trpc } from "@/trpc/server";
import { caller } from "@/trpc/server";
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
//to find rows that i made in table user

const page= async()=> {
  const queryClient =getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
// lma agy a refresh byhsl loading bdl error
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

   <HydrationBoundary state={dehydrate(queryClient)}>
     <Suspense fallback = {<p>loading...</p>}> 
     
      <Client />
     </Suspense>
    
   </HydrationBoundary>
  
    </div>
  );
};
export default page;
