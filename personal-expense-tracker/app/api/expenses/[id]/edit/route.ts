import {NextRequest, NextResponse} from 'next/server'
import {PrismaClient} from "@prisma/client"
import {validateToken} from "@/app/middleware"

const prisma = new PrismaClient();

export async function PUT(req: NextRequest){

    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse === undefined){
        
        
        // extract the id from url
        const {pathname} = new URL(req.nextUrl);
        const id = pathname.split('/').pop();// assuming id is the last segment of the url
        
        const {amount, description, date, categoryId} = await req.json();
        
        try{
            const userIdString = req.user?.id;
        const userId = parseInt(userIdString as string, 10);
        const updatedExpense = await prisma.expense.update({
            where:{id: parseInt(id as string),
                userId
            },
            data:{
                amount,
                description,
                date: date ? new Date(date) : undefined,
                categoryId,

            }
        })
        return NextResponse.json(updatedExpense, {status: 200});
    }catch(error){
        console.error(error);
        return NextResponse.json({error: "Error updating expense"}, {status: 500});
    }
}else{
    return NextResponse.redirect("/auth/login");
}
}

