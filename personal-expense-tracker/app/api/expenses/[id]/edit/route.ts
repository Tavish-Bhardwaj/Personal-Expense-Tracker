

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { validateToken } from "@/app/middleware";
import { getUserFromToken } from '@/app/utils/auth';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
    const tokenValidationResponse = await validateToken(req);
    const tokenCookie = req.cookies.get("token");
    if (tokenValidationResponse === undefined) {
        // Extract the ID from the URL
        const { pathname } = new URL(req.nextUrl);
        const segments = pathname.split('/'); // Split the pathname into segments
        const id = segments[segments.length - 2]; // Get the second-to-last segment
        console.log(id)
        // Parse the ID to an integer
        const expenseId = parseInt(id as string, 10);
        console.log(typeof(expenseId))
        if (isNaN(expenseId)) {
            return NextResponse.json({ error: "Invalid expense ID" }, { status: 400 });
        }

        // Extract data from the request body
        const { amount, description, date, categoryId } = await req.json();

        try {
            const tokenCookie = req.cookies.get('token'); // Adjust the cookie name if necessary
         
            // Check if the token cookie exists
            if (!tokenCookie) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
    
            // Extract the token value
            const token = tokenCookie.value; // Assuming tokenCookie is of type RequestCookie
            const user = getUserFromToken(token);
    
            // Check if user is null
            if (!user) {
                return NextResponse.redirect("/auth/logicn");
            }
    
            // Now TypeScript knows user is of type { userId: string; email: string }
            const userIdNumber = parseInt(user.userId, 10); // Convert userId to a number
    
            // Assuming user ID is stored in the token validation response
            // const userIdString = req.user?.id; // Ensure this is correctly set in your middleware
            // const userId = parseInt(userIdString as string, 10);
            // if (isNaN(userId)) {
            //     return NextResponse.json({ error: "Invalid user ID" }, { status: 401 });
            // }

            // Update the expense
            const updatedExpense = await prisma.expense.update({
                where: {
                    id: expenseId,
                    userId: userIdNumber // Ensure the user owns the expense
                },
                data: {
                    amount,
                    description,
                    date: date ? new Date(date) : undefined,
                    categoryId,
                }
            });

            return NextResponse.json(updatedExpense, { status: 200 });
        } catch (error) {
            console.error("Error updating expense:", error);
            return NextResponse.json({ error: "Error updating expense" }, { status: 500 });
        }
    } else {
        return NextResponse.redirect("/auth/login");
    }
}