import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware"

const prisma = new PrismaClient();

export async function DELETE(req:NextRequest){
    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse.status === 401){
        return tokenValidationResponse;
    }

    const categoryId = await req.json();

    if(!categoryId){
        return NextResponse.json({error: "CategoryId is required"}, {status:400});
    }

    try{
        // check if the category has associated expenses
        const categoryExpenses = await prisma.expense.findMany({
            where: {categoryId},
        })

        if(categoryExpenses.length>0){
            return NextResponse.json({error:"Category cannot be deleted as it has associated expenses"},{status:400});
        }

        const deletedCategory = await prisma.category.delete({
            where:{id: categoryId},
        })
        return NextResponse.json(deletedCategory, {status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Error deleting category"}, {status:500});
    }
}