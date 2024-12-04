

"use client";
import React, { useEffect, useState } from 'react';
import TotalExpensesByCategory from '../../components/TotalExpenseByCategory';
import MonthlyTotalExpenses from '../../components/MonthlyTotalExpenses';
import SpendingTrends from '../../components/SpendingTrends';
import axios from 'axios';
import { AnalyticsData, Category } from '../../types/types'; // Adjust the path as necessary

const Dashboard: React.FC = () => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [categories, setCategories] = useState<Category[]>([]); // State to hold category names
    const userId = '1'; // Replace with actual user ID logic

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get('/api/analytics', {
                    headers: {
                        userId: userId,
                    },
                });
                console.log("API Response:", response.data); // Log the response data
                setAnalyticsData(response.data);
            } catch (error) {
                console.error("Error fetching analytics data", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories/getAll'); // Adjust the endpoint as necessary
                setCategories(response.data); // Assuming response.data is an array of categories
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchAnalyticsData();
        fetchCategories();
    }, []);

    if (!analyticsData || categories.length === 0) {
        return <div className="text-center">Loading...</div>;
    }

    // Create a mapping of category IDs to category names
    const categoryNames = categories.reduce((acc, category) => {
        acc[category.id] = category.name; // Assuming category has 'id' and 'name' properties
        return acc;
    }, {} as { [key: string]: string });

    return (
        <div className="dashboard-container p-6 bg-background min-h-screen">
            <h1 className="dashboard-title text-3xl font-bold text-center mb-6">Analytics Dashboard</h1>
            <div className="charts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                <TotalExpensesByCategory 
                    data={analyticsData.totalExpenseByCategory} 
                    categoryNames={categoryNames} 
                />
                <MonthlyTotalExpenses data={analyticsData.monthlyTotals} />
                <SpendingTrends data={analyticsData.spendingTrends} />
            </div>
        </div>
    );
};

export default Dashboard;