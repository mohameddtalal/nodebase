import type { inferInput } from "@trpc/tanstack-react-query";
import{prefetch , trpc} from "@/trpc/server";


type Input = inferInput <typeof trpc.workflows.getMany>;

/**
 * prefecth all workflows
 */

export const prefecthWorkflows=(params:Input)=>{
    return prefetch(trpc.workflows.getMany.queryOptions(params)); //hatet params ashan law ayz a search ala workflows
};

/**
 * prefetch for single workflow
 */


export const prefecthWorkflow=(id:string)=>{
    return prefetch(trpc.workflows.getOne.queryOptions({ id })); 
};

