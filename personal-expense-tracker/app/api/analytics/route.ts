

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateToken } from "@/app/middleware";
import { getUserFromToken } from "@/app/utils/auth";

const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
    // Validate the token
    const tokenValidationResponse = await validateToken(req);
    if (tokenValidationResponse === undefined) {
        // Extract the token from cookies
        const tokenCookie = req.cookies.get('token'); // Adjust the cookie name if necessary
        if (!tokenCookie) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // Extract the token value
        const token = tokenCookie.value; // Assuming tokenCookie is of type RequestCookie
        const user = getUserFromToken(token); // Utility method

        if (!user) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 402 });
        }

        const { userId } = user; // Use the userId from the token
        const userIdNumber = parseInt(userId, 10); // Convert userId to a number

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 402 });
        }

        try {
            // Total expenses by category with category names
            const totalExpenseByCategory = await prisma.expense.groupBy({
                by: ['categoryId'],
                _sum: {
                    amount: true,
                },
                where: {
                    userId: userIdNumber,
                },
            });

            // Fetch category names based on category IDs
            const categoryIds = totalExpenseByCategory.map(item => item.categoryId);
            const categories = await prisma.category.findMany({
                where: {
                    id: { in: categoryIds },
                },
            });

            // Create a mapping of categoryId to categoryName
            // Define the type for categoryMap
            const categoryMap: { [key: number]: string } = categories.reduce((acc, category) => {
                acc[category.id] = category.name;
                return acc;
            }, {} as { [key: number]: string });

            // Format the total expenses by category to include category names
            const formattedTotalExpenseByCategory = totalExpenseByCategory.map(item => ({
                categoryId: item.categoryId,
                categoryName: categoryMap[item.categoryId] || 'Unknown', // Fallback to 'Unknown' if not found
                totalAmount: item._sum.amount || 0,
            }));

            // Monthly total expenses
            const monthlyTotals = await prisma.expense.groupBy({
                by: ['createdAt'],
                _sum: {
                    amount: true,
                },
                where: {
                    userId: userIdNumber,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });

            // All spending trends organized in ascending order
            const spendingTrends = await prisma.expense.groupBy({
                by: ['createdAt'],
                _sum: { amount: true },
                where: { userId: userIdNumber },
                orderBy: { createdAt: 'asc' },
            });

            // Formatting the monthly totals in a displayable format
            const formattedMonthlyTotals = monthlyTotals.map(item => ({
                month: item.createdAt.toISOString().slice(0, 7), // YYYY-MM Format
                total: item._sum.amount || 0,
            }));

            // Sending the response with formatted data
            const responseData = {
                totalExpenseByCategory: formattedTotalExpenseByCategory,
                monthlyTotals: formattedMonthlyTotals,
                spendingTrends,
            };

            return NextResponse.json(responseData);
        } catch (error) {
            console.error("Error fetching analytics data", error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
}