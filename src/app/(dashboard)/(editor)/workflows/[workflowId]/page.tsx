import { Editor, 
  EditorError, 
  EditorLoading } from "@/features/editor/components/editor";
import { prefecthWorkflow } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EditorHeader } from "@/features/editor/components/editor-header";

interface PageProps{
params: Promise<{
workflowId:string; //ttktb zay esm folder bzbt ashan hya dynamic folder


}>

};

//http://localhost:3000/workflows/123

const Page = async({params}:PageProps) =>{
    await requireAuth();  //bkhly pages protected
    const {workflowId}=await params;  //estkhdmna await w peomise ashan hoa dynamic api
    prefecthWorkflow(workflowId);
  return (
 <HydrateClient>
   <ErrorBoundary fallback={<EditorError/>}>
   <Suspense fallback = {<EditorLoading/>}>
   <EditorHeader workflowId={workflowId}/>
   <main className="flex-1">  
   <Editor workflowId={workflowId}/>
   </main>
   </Suspense>
   </ErrorBoundary>
   </HydrateClient>

  )
   
};

export default Page;