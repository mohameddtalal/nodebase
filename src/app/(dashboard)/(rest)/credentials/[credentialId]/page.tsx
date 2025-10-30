import { requireAuth } from "@/lib/auth-utils";

interface PageProps{
params: Promise<{
credentialId:string; //ttktb zay esm folder bzbt ashan hya dynamic folder


}>

};

//http://localhost:3000/credentials/123

const Page = async({params}:PageProps) =>{
    await requireAuth();
    const {credentialId}=await params;  //estkhdmna await w peomise ashan hoa dynamic api
  return <p>Credential id: { credentialId } </p>
   
};

export default Page;