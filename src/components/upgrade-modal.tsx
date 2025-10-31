"use client";
//from shdcn
import{
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {authClient } from "@/lib/auth-client";

//recieve open and un open change
interface UpgradeModalProps{
open:boolean;
onOpenChange:(open:boolean) =>void;

};


export const UpgradeModal=({
    open,
    onOpenChange}:UpgradeModalProps) =>{
return(
    <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
           <AlertDialogHeader>
            <AlertDialogTitle>Upgrade to pro</AlertDialogTitle>
            <AlertDialogDescription>
                you need an active subscription to perform this action . Upgrade to pro to unlock all features.
            </AlertDialogDescription>
        
            </AlertDialogHeader> 
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=> authClient.checkout({slug:"pro"})}>
                    Upgrade Now
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)

    };

