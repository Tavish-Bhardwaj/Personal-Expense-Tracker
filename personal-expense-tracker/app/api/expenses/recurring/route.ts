import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware"

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse.status === 401){
        return tokenValidationResponse;
    }

    const {expenseId, recurring, frequency} = await req.json();
    try{

        const updatedExpense = await prisma.expense.update({
            where:{id: expenseId},
            data:{
                recurring,
                frequency,
            },
        })

        return NextResponse.json(updatedExpense, {status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Error updating expense"}, {status: 500});
    }
}


// create a cron-job implementation for this route