import { requireAuth } from "@/lib/auth-utils";

interface PageProps{
params: Promise<{
workflowId:string; //ttktb zay esm folder bzbt ashan hya dynamic folder


}>

};

//http://localhost:3000/workflows/123

const Page = async({params}:PageProps) =>{
    await requireAuth();  //bkhly pages protected
    const {workflowId}=await params;  //estkhdmna await w peomise ashan hoa dynamic api
  return <p>Workflow id: {workflowId} </p>
   
};

export default Page;