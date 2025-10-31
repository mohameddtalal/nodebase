"use client";

import{
CreditCardIcon,
FolderOpenIcon,
HistoryIcon,
KeyIcon,
LogOutIcon,
StarIcon,

} from "lucide-react"

import Image from "next/image";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";


import {

    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { group } from "console";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";

const menuItems =[
    {
        title:"Main",
        items:[
            {
                tittle:"Workflows",
                icon: FolderOpenIcon,
                url:"/workflows"

            },
               {
                tittle:"Credentials",
                icon: KeyIcon,
                url:"/credentials",

            },
               {
                tittle:"Executions",
                icon: HistoryIcon,
                url:"/executions",

            },
        ],
    }
];


export const AppSidebar= ()=>{
    const router = useRouter();
    const pathname =usePathname();
    const{ hasActiveSubscription , isLoading} = useHasActiveSubscription();
return (
<Sidebar collapsible="icon">
    <SidebarHeader>
        <SidebarMenuItem> 
            <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                <Link href="/workflows " prefetch>
                <Image src="/logos/logo.svg" alt ="Nodebase" width={30} height={30} />
                <span className="font-semibold
                text-sm"> Nodebase
                </span>
                </Link>

            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarHeader>
<SidebarContent>
    {menuItems.map((group)=>(
    <SidebarGroup key={group.title}>
      <SidebarContent>
        <SidebarMenu>
        {group.items.map((item)=>(
            <SidebarMenuItem key={item.tittle}>
               <SidebarMenuButton
                tooltip ={item.tittle}
               isActive={
                item.url==="/"
                ?pathname==="/"
                :pathname.startsWith(item.url)
               }
               asChild
               className="gap-x-4 h-10 px-4 "
               >
                <Link href = {item.url} prefetch>
                <item.icon className="size-4 "/>
                <span>{item.tittle}</span>
                </Link>

               </SidebarMenuButton>
            </SidebarMenuItem>
        ))}   
        </SidebarMenu>
      </SidebarContent>
    </SidebarGroup>

    ))}
</SidebarContent>
<SidebarFooter>
    <SidebarMenu>
        {!hasActiveSubscription && !isLoading &&(  //law hoa msh 3aml subscription ezhr button lkn law 3aml khlas mtl3sh button bta3 pro
        <SidebarMenuItem>
            <SidebarMenuButton tooltip="upgrade to pro" 
            className="gap-x-4 h-10 px-4 "
            onClick={()=>authClient.checkout({slug:"pro"})}>
                <StarIcon className="h-4 w-4"/>
                <span>Upgrade to Pro</span>

            </SidebarMenuButton>
        </SidebarMenuItem>
        )}
        <SidebarMenuItem>
            <SidebarMenuButton tooltip="Billing portal" 
            className="gap-x-4 h-10 px-4 "
            onClick={()=>{authClient.customer.portal()}}>
              <CreditCardIcon className="h-4 w-4" />
                <span>Billing portal</span>

            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sign out" 
            className="gap-x-4 h-10 px-4 "
            onClick={()=> authClient.signOut({
                fetchOptions:{
                    onSuccess:()=>{
                        router.push("/login")
                    },
                },
            })}>
                <LogOutIcon className="h-4 w-4"/>
                <span>Sign out</span>

            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
</SidebarFooter>

</Sidebar>


);


};