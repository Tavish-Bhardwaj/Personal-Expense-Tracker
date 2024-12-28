


import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { TotalExpensesByCategoryData } from '../types/types';

interface TotalExpensesByCategoryProps {
    data: TotalExpensesByCategoryData[];
    categoryNames: { [key: string]: string };
}

const TotalExpensesByCategory: React.FC<TotalExpensesByCategoryProps> = ({ data, categoryNames }) => {
    const [chartWidth, setChartWidth] = useState(400);
    const [chartHeight, setChartHeight] = useState(400);

    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            if (width < 380) {
                setChartWidth(280);
                setChartHeight(280);
            } else if (width < 768) {
                setChartWidth(320);
                setChartHeight(320);
            } else {
                setChartWidth(400);
                setChartHeight(400);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const transformedData = data.map(item => ({
        name: categoryNames[item.categoryId] || 'Unknown',
        value: item.totalAmount,
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699', '#A569BD', '#F39C12', '#E74C3C'];

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Total Expenses by Category</h2>
            <div className="w-full flex justify-center">
                <div style={{ width: chartWidth, height: chartHeight }}>
                    <PieChart width={chartWidth} height={chartHeight}>
                        <Pie
                            data={transformedData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={Math.min(chartWidth, chartHeight) / 3}
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
            </div>
            <div className="mt-4 w-full max-w-sm">
                {transformedData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center mb-2 px-2">
                        <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm sm:text-base">{entry.name}: ₹{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TotalExpensesByCategory;