"use client"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SpendingTrendsData } from '../types/types';

interface SpendingTrendsProps {
    data: SpendingTrendsData[];
}

const SpendingTrends: React.FC<SpendingTrendsProps> = ({ data }) => {
    return (
        <div className="chart-container bg-card p-4 rounded-lg shadow-lg">
            <h2 className="chart-title text-xl font-semibold mb-4">Spending Trends</h2>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="createdAt" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="_sum.amount" stroke="#ff7300" />
            </LineChart>
        </div>
    );
};

export default SpendingTrends;