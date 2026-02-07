import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const data = [
    { name: 'Easy', value: 15, color: '#22c55e' }, // Green-500
    { name: 'Medium', value: 15, color: '#f59e0b' }, // Amber-500
    { name: 'Hard', value: 2, color: '#ef4444' }, // Red-500
];

const totalSolved = data.reduce((acc, curr) => acc + curr.value, 0);

export default function ProblemDonut() {
    return (
        <Card className="col-span-1 shadow-sm border-none h-full bg-white">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Problems Solved</CardTitle>
                <p className="text-sm text-gray-500 font-medium">DSA</p>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="h-48 w-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                                <Label 
                                    value={totalSolved} 
                                    position="center" 
                                    className="text-3xl font-bold fill-gray-900"
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-4 pl-4">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                             <span className={`text-sm font-medium`} style={{ color: item.color }}>{item.name}</span>
                             <span className="text-sm font-bold text-gray-700">{item.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
