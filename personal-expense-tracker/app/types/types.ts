// src/types/types.ts

export interface TotalExpensesByCategoryData {
    totalAmount: any;
    categoryId: string;
    _sum: {
        amount: number;
    };
}

export interface MonthlyTotalExpensesData {
    month: string;
    total: number;
}

export interface SpendingTrendsData {
    createdAt: string;
    _sum: {
        amount: number;
    };
}

export interface AnalyticsData {
    totalExpenseByCategory: TotalExpensesByCategoryData[];
    monthlyTotals: MonthlyTotalExpensesData[];
    spendingTrends: SpendingTrendsData[];
}

export interface Category {
    id: number; // or number, depending on your database schema
    name: string;
}