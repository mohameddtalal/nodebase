
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { error } from "console";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";
//fetch all workflows in suspense means hydration boundary


export const useSuspenseWorkflows =() =>{
    const trpc =useTRPC();
    const [params] = useWorkflowsParams();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions (params))
};

/**
 * hook to create a new workflow
 */

//create workflow
export const useCreateWorkflow =() => {

const queryClient =useQueryClient();
const trpc= useTRPC();
return useMutation(trpc.workflows.create.mutationOptions({
   onSuccess : (data) =>{
    toast.success (`Workflow "${data.name}" 
        created`);
       
        queryClient.invalidateQueries(
            trpc.workflows.getMany.queryOptions({}),
        );
   },
   onError :(error) => {
    toast.error(`Failed to create workflow: 
        ${error.message}`);
   },
}),

);
};

/**
 * hook to remove workflow
 * 
 */

export const useRemoveWorkflow=()=>{
const queryClient =useQueryClient();
const trpc= useTRPC();
return useMutation(
    trpc.workflows.remove.mutationOptions({
        onSuccess:(data)=>{
           toast.success (`Workflow "${data.name}" removed`) ;
           queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions
            ({

            }));
            queryClient.invalidateQueries(
                trpc.workflows.getOne.queryFilter({id:data.id}),
            );

        }
    })
)

}