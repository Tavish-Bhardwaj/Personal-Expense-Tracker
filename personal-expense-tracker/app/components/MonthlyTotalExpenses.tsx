

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { MonthlyTotalExpensesData } from '../types/types';

interface MonthlyTotalExpensesProps {
    data: MonthlyTotalExpensesData[];
}

const MonthlyTotalExpenses: React.FC<MonthlyTotalExpensesProps> = ({ data }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Monthly Total Expenses</h2>
            <div className="w-full h-[300px] min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <XAxis 
                            dataKey="month" 
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line 
                            type="monotone" 
                            dataKey="total" 
                            stroke="#82ca9d"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MonthlyTotalExpenses;