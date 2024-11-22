import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { validateToken } from "@/app/middleware"


const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    const tokenValidationResponse =  await validateToken(req);
    if(tokenValidationResponse === undefined){
    
        
        const {amount, description, date, categoryId} = await req.json();
        
        
        
        try{
            
            // taking the userId from the token middleware
            const userIdString = req.user?.id;
            
            if(!userIdString){
                return NextResponse.json({error:"User Id not found"}, {status:404});
            }
        // checking if the userId is number or not
        const userId = parseInt(userIdString, 10);
        if(isNaN(userId)){
            return NextResponse.json({error:"Invalid User Id"}, {status:400});
        }
        const expense = await prisma.expense.create({
            data:{
                amount,
                description,
                date: new Date(date),
                userId,
                categoryId,
            }
        })
        return NextResponse.json(expense, {status: 201});
    }catch(error){
        console.log(error);
        return NextResponse.json({error: "Error creating expense"}, {status: 500})
    }
}else{
    return NextResponse.redirect("/auth/login");
}
}