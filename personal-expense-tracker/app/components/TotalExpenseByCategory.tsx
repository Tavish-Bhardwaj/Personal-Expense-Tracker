

"use client";
import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { TotalExpensesByCategoryData } from '../types/types';

interface TotalExpensesByCategoryProps {
    data: TotalExpensesByCategoryData[];
    categoryNames: { [key: string]: string }; // Mapping of categoryId to category name
}

const TotalExpensesByCategory: React.FC<TotalExpensesByCategoryProps> = ({ data, categoryNames }) => {
    // Transform data to include category names
    const transformedData = data.map(item => ({
        name: categoryNames[item.categoryId] || 'Unknown', // Use category name or fallback to 'Unknown'
        value: item.totalAmount, // Use totalAmount directly
    }));

    // Define colors for the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699', '#A569BD', '#F39C12', '#E74C3C'];

    return (
        <div className="chart-container bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="chart-title text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">Total Expenses by Category</h2>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg"> {/* Added wrapper for the pie chart */}
                <PieChart width={400} height={400}>
                    <Pie
                        data={transformedData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {transformedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div className="mt-4">
                {transformedData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center mb-2">
                        <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-gray-700 dark:text-gray-300">{entry.name}: ₹{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TotalExpensesByCategory;