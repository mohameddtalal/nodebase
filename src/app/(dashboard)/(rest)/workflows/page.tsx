//b3ml default route mn config.ts

import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows";
import { prefecthWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async() =>{
  await requireAuth();  //protected layer 
  prefecthWorkflows();
  return (
  <WorkflowsContainer>
  <HydrateClient>
   <ErrorBoundary fallback={<p>Error!</p>}>
   <Suspense fallback = {<p>Loading...</p>}>
    <WorkflowsList/>
   </Suspense>

   </ErrorBoundary>
  </HydrateClient>
    </WorkflowsContainer>
  )
};

export default Page;