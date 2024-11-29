import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware"

const prisma = new PrismaClient();

export async function PUT(req: NextRequest){
    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse === undefined){
        
        
        const {categoryId, newName} = await req.json();
        
        if(!categoryId || !newName){
            return NextResponse.json({error: "CategoryId and new name are Required"}, {status:400});
        }

        try{
        const updatedCategory = await prisma.category.update({
            where:{id: categoryId},
            data:{name: newName},
        });

        return NextResponse.json(updatedCategory, {status:200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Error updating category"}, {status: 500});
    }
}
}