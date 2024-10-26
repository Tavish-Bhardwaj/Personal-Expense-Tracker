import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware";

const prisma = new PrismaClient();

export async function GET(req: NextRequest){
    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse.status === 401){
        return tokenValidationResponse;
    }

    const {userId} = JSON.parse(req.nextUrl.searchParams.get('user') || '{}');

    try{
        const categories = await prisma.category.findMany({
            where: {userId},
        });

        return NextResponse.json(categories, {status: 200});
    }catch(error){
        console.log(error);
        return NextResponse.json({error: "Error fetching categories"}, {status: 500});
    }
}