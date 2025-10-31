//b3ml default route mn config.ts

import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows";
import { useWorkflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefecthWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


type Props={
searchParams: Promise<SearchParams>;

}

const Page = async({searchParams}:Props) =>{
  await requireAuth();  //protected layer 
  const params= await useWorkflowsParamsLoader(searchParams)
  prefecthWorkflows(params);


  
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