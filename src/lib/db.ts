//we can import prisma client but problem is we would also have to do new prisma client w hena fe hot reload y3ni law server run w hasl ay change hytghyr
import { PrismaClient }   from "@/generated/prisma/client";
const globalForPrisma = global as unknown as {
//add to global object a new prisma property 
prisma : PrismaClient;

}

const prisma=globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !=="production"){
//hena el hot reload
globalForPrisma.prisma=prisma;
}

export default prisma ;