import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware"

const prisma = new PrismaClient();

export async function GET(req:NextRequest){
    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse.status === 401){
        return tokenValidationResponse;
    }
    const {searchParams} = new URL(req.url)
    const categoryId = searchParams.get('categoryId');

    if(!categoryId){
        return NextResponse.json({error:'Category ID is required'},{status:400});
    }

    try{
        const category = await prisma.category.findUnique({
            where:{id:parseInt(categoryId)},
        })

        if(!category){
            return NextResponse.json({error:"category not found"},{status:404});
        }

        return NextResponse.json(category, {status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Error fetching category"}, {status:500});
    }
}