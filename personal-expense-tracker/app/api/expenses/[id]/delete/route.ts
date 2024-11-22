import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware"

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}){

    const tokenValidationResponse = await validateToken(req);
    if(tokenValidationResponse === undefined){
        
        
        // 
        const {id} = params;
        
        try{
            
            const userIdString = req.user?.id;
            const userId = parseInt(userIdString as string, 10);
            const deletedExpense = await prisma.expense.deleteMany({
                where:{
                    id: parseInt(id),
                userId,
            }
        })
        
        if(deletedExpense.count === 0){
            return NextResponse.json({error: "Expense not found"}, {status: 404});
        }

        return NextResponse.json({message: "Expense deleted Successfully"}, {status: 200});
    }
    
    catch(error){
        console.log(error);
        return NextResponse.json({error: "Error deleting expense"}, {status: 500});
    }
    
    
}else{
    return NextResponse.redirect("/auth/login");
}
}