import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware"


const prisma = new PrismaClient();
export async function POST(req:NextRequest){
    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse === undefined){
        return NextResponse.redirect("/auth/login")

    }

    const {userId} = JSON.parse(req.nextUrl.searchParams.get('user') || '{}');
    const{name} = await req.json();

    if(!name){
        return NextResponse.json({error: "Category name is required"}, {status:400});
    }

    try{
        const category = await prisma.category.create({
            data: {
                name,
                userId,
            },
            
        });
        return NextResponse.json(category, {status:201});
    }catch(error){
        console.log(error);
        return NextResponse.json({error: 'Error creating category'},{status:500});
    }
}