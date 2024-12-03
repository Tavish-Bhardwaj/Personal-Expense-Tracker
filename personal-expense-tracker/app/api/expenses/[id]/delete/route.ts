// import {NextRequest, NextResponse} from "next/server"
// import {PrismaClient} from "@prisma/client"
// import { validateToken } from "@/app/middleware"

// const prisma = new PrismaClient();

// export async function DELETE(req: NextRequest, {params}: {params: {id: string}}){

//     const tokenValidationResponse = await validateToken(req);
//     if(tokenValidationResponse === undefined){
        
        
//         // 
//         const {id} = params;
        
//         try{
            
//             const userIdString = req.user?.id;
//             const userId = parseInt(userIdString as string, 10);
//             const deletedExpense = await prisma.expense.deleteMany({
//                 where:{
//                     id: parseInt(id),
//                 userId,
//             }
//         })
        
//         if(deletedExpense.count === 0){
//             return NextResponse.json({error: "Expense not found"}, {status: 404});
//         }

//         return NextResponse.json({message: "Expense deleted Successfully"}, {status: 200});
//     }
    
//     catch(error){
//         console.log(error);
//         return NextResponse.json({error: "Error deleting expense"}, {status: 500});
//     }
    
    
// }else{
//     return NextResponse.redirect("/auth/login");
// }
// }


import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateToken } from "@/app/middleware";
import { getUserFromToken } from "@/app/utils/auth";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    // Validate the token and extract user information
    const tokenValidationResponse = await validateToken(req);
    
    if (tokenValidationResponse === undefined) {
        const { id } = params;

        try {
            // Extract user information from the validated token
            const tokenCookie = req.cookies.get('token'); // Adjust the cookie name if necessary
            
            // Check if the token cookie exists
            if (!tokenCookie) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }

            // Extract the token value
            const token = tokenCookie.value; // Assuming tokenCookie is of type RequestCookie
            const user = getUserFromToken(token); // Implement this function to decode the token
            
            // Check if user is null
            if (!user) {
                return NextResponse.redirect("/auth/login");
            }

            // Now TypeScript knows user is of type { userId: string; email: string }
            const userIdNumber = parseInt(user.userId, 10); // Convert userId to a number

            // Perform the delete operation
            const deletedExpense = await prisma.expense.deleteMany({
                where: {
                    id: parseInt(id),
                    userId: userIdNumber, 
                }
            });

            if (deletedExpense.count === 0) {
                return NextResponse.json({ error: "Expense not found or you do not have permission to delete this expense." }, { status: 404 });
            }

            return NextResponse.json({ message: "Expense deleted successfully" }, { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Error deleting expense" }, { status: 500 });
        }
    } else {
        return NextResponse.redirect("/auth/login");
    }
}