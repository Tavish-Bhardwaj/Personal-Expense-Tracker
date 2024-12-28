


import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { SpendingTrendsData } from '../types/types';

interface SpendingTrendsProps {
    data: SpendingTrendsData[];
}

const SpendingTrends: React.FC<SpendingTrendsProps> = ({ data }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Spending Trends</h2>
            <div className="w-full h-[300px] min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <XAxis 
                            dataKey="createdAt" 
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
                            dataKey="_sum.amount" 
                            stroke="#ff7300"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpendingTrends;