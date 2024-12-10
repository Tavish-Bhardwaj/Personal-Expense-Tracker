

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateToken } from "@/app/middleware";
import { getUserFromToken } from "@/app/utils/auth";

const prisma = new PrismaClient();

interface ExpenseFilters {
    userId: number;
    categoryId?: number;
    date?: {
        gte: Date;
        lte: Date;
    };
}

export async function GET(req: NextRequest) {
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
        const { userId, email } = user;
        const userIdNumber = parseInt(userId, 10); // Convert userId to a number
        console.log(`Email: ${email}, User ID: ${userIdNumber}`);

        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        const filters: ExpenseFilters = {
            userId: userIdNumber, // Use the parsed userIdNumber
        };

        if (categoryId) {
            filters.categoryId = parseInt(categoryId);
        }

        if (startDate && endDate) {
            filters.date = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }
//just a check commit
        try {
            const expense = await prisma.expense.findMany({
                where: filters,
                include: {
                    category: true,
                },
            });
            return NextResponse.json(expense, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "Error fetching expenses" }, { status: 500 });
        }
    } else {
        return NextResponse.redirect("/auth/login");
    }
}