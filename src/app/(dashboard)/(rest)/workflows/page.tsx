//b3ml default route mn config.ts

import { requireAuth } from "@/lib/auth-utils";

const Page = async() =>{
  await requireAuth();  //protected layer 
  return <p> Workflows </p>
   
};

export default Page;