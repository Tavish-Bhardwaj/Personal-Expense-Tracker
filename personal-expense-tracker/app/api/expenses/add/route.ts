import {NextRequest, NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import { getUserFromToken } from "@/app/utils/auth";
import { validateToken } from "@/app/middleware"


const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    const tokenValidationResponse =  await validateToken(req);
    if(tokenValidationResponse === undefined){
    
        
        const {amount, description, date, categoryId} = await req.json();
        
        
        
        try{
            
            const tokenCookie = req.cookies.get('token'); // Adjust the cookie name if necessary
      
    
            if (!tokenCookie) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
              }
              
        // Extract the token value
        const token = tokenCookie.value; // Assuming tokenCookie is of type RequestCookie
        const user = getUserFromToken(token);//util method
        
        if (!user) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 402 });
          }
          
          const { userId, email } = user;
          const userIdNumber = parseInt(userId, 10); // Convert userId to a number
        const expense = await prisma.expense.create({
            data:{
                amount,
                description,
                date: new Date(date),
                userId:userIdNumber,
                categoryId,
            }
        })
        console.log(expense)
        return NextResponse.json(expense, {status: 201});
    }catch(error){
        console.log(error);
        return NextResponse.json({error: "Error creating expense"}, {status: 500})
    }
}else{
    return NextResponse.redirect("/auth/login");
}
}