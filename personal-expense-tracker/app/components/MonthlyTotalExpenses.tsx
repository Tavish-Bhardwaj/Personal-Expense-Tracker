"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MonthlyTotalExpensesData } from '../types/types';

interface MonthlyTotalExpensesProps {
    data: MonthlyTotalExpensesData[];
}

const MonthlyTotalExpenses: React.FC<MonthlyTotalExpensesProps> = ({ data }) => {
    return (
        <div className="chart-container bg-card p-4 rounded-lg shadow-lg">
            <h2 className="chart-title text-xl font-semibold mb-4">Monthly Total Expenses</h2>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
};

export default MonthlyTotalExpenses;