import Image from "next/image";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import { json } from "stream/consumers";
//to find rows that i made in table user
const page= async()=> {
  const users = await prisma.user.findMany();
  return (

    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    {JSON.stringify(users)}
    </div>
  );
};
export default page;
