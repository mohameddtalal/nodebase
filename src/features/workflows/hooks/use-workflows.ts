
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { error } from "console";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
//fetch all workflows in suspense means hydration boundary
export const useSuspenseWorkflows =() =>{
    const trpc =useTRPC();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions())
};

/**
 * hook to create a new workflow
 */


export const useCreateWorkflow =() => {

const queryClient =useQueryClient();
const trpc= useTRPC();
return useMutation(trpc.workflows.create.mutationOptions({
   onSuccess : (data) =>{
    toast.success (`Workflow "${data.name}" 
        created`);
       
        queryClient.invalidateQueries(
            trpc.workflows.getMany.queryOptions(),
        );
   },
   onError :(error) => {
    toast.error(`Failed to create workflow: 
        ${error.message}`);
   },
}),

);
};