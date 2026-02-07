import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Info } from 'lucide-react';

const data = [
    { name: 'Arrays', value: 24 },
    { name: 'Hash Map', value: 8 },
    { name: 'Two Pointers', value: 7 },
    { name: 'Math', value: 7 },
    { name: 'Sorting', value: 6 },
    { name: 'DP', value: 6 },
    { name: 'Binary Search', value: 4 },
];

export default function TopicAnalysis() {
    return (
        <Card className="col-span-1 shadow-sm border-none h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">DSA Topic Analysis</CardTitle>
                <Info className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category" 
                                width={100}
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip 
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} fill="#3b82f6">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="#3b82f6" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                    <button className="text-sm text-blue-500 hover:underline">show more</button>
                </div>
            </CardContent>
        </Card>
    );
}
