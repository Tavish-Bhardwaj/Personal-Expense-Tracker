
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateToken } from "@/app/middleware";
import { getUserFromToken } from "@/app/utils/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const tokenValidationResponse = await validateToken(req);
    if (tokenValidationResponse === undefined) {
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
            return NextResponse.redirect("/auth/login");
        }

        // Now TypeScript knows user is of type { userId: string; email: string }
        const userIdNumber = parseInt(user.userId, 10); // Convert userId to a number

        // Get the ID from the URL parameters
        const expenseId = parseInt(params.id, 10); // Convert the ID to a number

        if (isNaN(expenseId)) {
            return NextResponse.json({ error: "Invalid expense ID" }, { status: 400 });
        }

        try {
            const expense = await prisma.expense.findUnique({
                where: {
                    id: expenseId,
                    userId: userIdNumber, // Ensure the user owns the expense
                },
                include: {
                    category: true,
                },
            });

            if (!expense) {
                return NextResponse.json({ error: "Expense not found" }, { status: 404 });
            }

            return NextResponse.json(expense, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "Error fetching expense" }, { status: 500 });
        }
    } else {
        return NextResponse.redirect("/auth/login");
    }
}