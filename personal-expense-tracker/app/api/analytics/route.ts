import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();


export async function GET(request: NextRequest){
    const userId = request.headers.get('userId');

    if(!userId){
        return NextResponse.json({error: "Unauthorised"}, {status: 401})
    }

    try{
        // total expenses by category
        const totalExpenseByCategory = await prisma.expense.groupBy({
            by: ['categoryId'],
            _sum:{
                amount: true,
            },
            where:{
                userId: Number(userId),
            },
        })

        // monthly total expenses

        const monthlyTotals = await prisma.expense.groupBy({
            by:['createdAt'],
            _sum:{
                amount: true,
            },
            where:{
                userId: Number(userId),
            },
            orderBy:{
                createdAt: 'asc'
            }

        })

        // all spending trends organised in ascending order

        const spendingTrends = await prisma.expense.groupBy({
            by:['createdAt'],
            _sum:{amount: true,},
            where:{userId: Number(userId),},
            orderBy:{createdAt: 'asc'}
        })

        // formatting the montly totals in a displayable format

        const formattedMonthlyTotals = monthlyTotals.map(item =>({
            month: item.createdAt.toISOString().slice(0,7),  //YYYY-MM Format
            total: item._sum.amount || 0
        }))


        // sending the response with formatted data

        const responseData={
            totalExpenseByCategory,
            monthlyTotals: formattedMonthlyTotals,
            spendingTrends
        };

        return NextResponse.json(responseData);
    }catch(error){
        console.error("Error fetching analytics data", error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}