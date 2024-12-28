"use client";

import React, { useEffect, useState } from "react";
import TotalExpensesByCategory from "../../components/TotalExpenseByCategory";
import MonthlyTotalExpenses from "../../components/MonthlyTotalExpenses";
import SpendingTrends from "../../components/SpendingTrends";
import axios from "axios";
import { AnalyticsData, Category } from "../../types/types";
import { FaChartLine, FaCalendarAlt, FaDollarSign, FaTags } from "react-icons/fa";

const Dashboard: React.FC = () => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const userId = "1";

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get("/api/analytics");
                setAnalyticsData(response.data);
            } catch (error) {
                console.error("Error fetching analytics data", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("/api/categories/getAll");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchAnalyticsData();
        fetchCategories();
    }, []);

    if (!analyticsData || categories.length === 0) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    const categoryNames = categories.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
    }, {} as { [key: string]: string });

    const { totalExpenseByCategory, monthlyTotals, spendingTrends } = analyticsData;

    // Calculate stats for the quick stats section
    const getTotalMonthlySpending = () => {
        return monthlyTotals.reduce((sum, m) => sum + m.total, 0).toFixed(2);
    };

    const getTopSpendingDay = () => {
        if (spendingTrends.length === 0) return "No data";
        const topDay = spendingTrends.reduce((max, current) => 
            (current._sum.amount || 0) > (max._sum.amount || 0) ? current : max
        );
        return new Date(topDay.createdAt).toLocaleDateString('en-IN', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTopSpendingCategory = () => {
        if (totalExpenseByCategory.length === 0) return "No data";
        const topCategory = totalExpenseByCategory.reduce((max, current) => 
            current.totalAmount > max.totalAmount ? current : max
        );
        return categoryNames[topCategory.categoryId] || "Unknown";
    };

    const getSpendingTrend = () => {
        if (spendingTrends.length < 2) return "Insufficient data";
        const lastTwo = spendingTrends.slice(-2);
        if (lastTwo.length === 2) {
            const trend = (lastTwo[1]._sum.amount || 0) - (lastTwo[0]._sum.amount || 0);
            return trend > 0 ? "Rising" : trend < 0 ? "Falling" : "Stable";
        }
        return "Calculating...";
    };

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            {/* Header Section */}
            <div className="w-full bg-card shadow-sm py-4">
                <div className="w-[95%] max-w-5xl mx-auto px-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">Analytics Dashboard</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-[95%] max-w-5xl mx-auto px-4 py-6">
                {/* Quick Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <TotalStat
                        title="Top Spending Day"
                        value={getTopSpendingDay()}
                        icon={<FaCalendarAlt size={24} className="text-indigo-500" />}
                    />
                    <TotalStat
                        title="Total Monthly Spending"
                        value={`₹${getTotalMonthlySpending()}`}
                        icon={<FaDollarSign size={24} className="text-green-500" />}
                    />
                    <TotalStat
                        title="Top Spending Category"
                        value={getTopSpendingCategory()}
                        icon={<FaTags size={24} className="text-orange-500" />}
                    />
                    <TotalStat
                        title="Spending Trends"
                        value={getSpendingTrend()}
                        icon={<FaChartLine size={24} className="text-indigo-500" />}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-6">
                    <ChartContainer>
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="w-full max-w-md">
                                <TotalExpensesByCategory
                                    data={totalExpenseByCategory}
                                    categoryNames={categoryNames}
                                />
                            </div>
                        </div>
                    </ChartContainer>
                    <ChartContainer>
                        <div className="w-full max-w-md mx-auto">
                            <MonthlyTotalExpenses data={monthlyTotals} />
                        </div>
                    </ChartContainer>
                    <ChartContainer>
                        <div className="w-full max-w-md mx-auto">
                            <SpendingTrends data={spendingTrends} />
                        </div>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
};

interface TotalStatProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

const TotalStat: React.FC<TotalStatProps> = ({ title, value, icon }) => {
    return (
        <div className="bg-card p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-foreground">{value}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</div>
                <div className="mt-2">{icon}</div>
            </div>
        </div>
    );
};

interface ChartContainerProps {
    children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
    return (
        <div className="bg-card rounded-lg shadow-md p-4 min-w-0">
            {children}
        </div>
    );
};

export default Dashboard;