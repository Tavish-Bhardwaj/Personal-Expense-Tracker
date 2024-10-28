import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware"

const prisma = new PrismaClient();

interface ExpenseFilters{
    userId: number;
    categoryId? : number;
    date?: {

        gte: Date;
        lte: Date;
    }
}

export async function GET(req: NextRequest){
    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse.status === 401){
        return tokenValidationResponse;
    }

    const userIdString = req.user?.id;
    const userId = parseInt(userIdString as string, 10);
    const {searchParams} = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const filters: ExpenseFilters ={
        userId,
    }

    if(categoryId){
        filters.categoryId = parseInt(categoryId);
    }

    if(startDate && endDate){
        filters.date = {
            gte: new Date(startDate),
            lte: new Date(endDate),
        }
    }

    try{
        const expense = await prisma.expense.findMany({
            where: filters,
            include:{
                category:true
            }
        })
        return NextResponse.json(expense, {status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Error fetching expennses"}, {status: 500});
    }
}