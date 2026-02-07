import { Card } from './ui/Card';
import { Layers, Calendar, Flame, Trophy } from 'lucide-react';

import { TrendingUp } from 'lucide-react';

function StatsGrid({ stats }) {
    const displayStats = [
        { 
            label: "Total Solved", 
            value: stats?.totalSolved?.toLocaleString() || '0', 
            icon: Layers, 
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        { 
            label: "Active Days", 
            value: stats?.activeDays?.toLocaleString() || '0', 
            icon: Calendar, 
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
        { 
            label: "Max Rating", 
            value: stats?.maxRating?.toLocaleString() || '0', 
            icon: TrendingUp, 
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
         { 
            label: "Total Submissions", 
            value: stats?.totalSubmissions?.toLocaleString() || '0', 
            icon: Trophy, 
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayStats.map((stat, index) => (
                <Card key={index} className="p-4 border-none shadow-sm hover:shadow-md transition-all duration-200 bg-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1 tracking-tight text-foreground">{stat.value}</h3>
                        </div>
                        <div className={`p-2 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                    </div>
                    {/* Optional: Add percentage change here if available */}
                    <div className="mt-3 flex items-center text-xs text-green-500 font-medium">
                        <span>+2.4%</span>
                        <span className="text-muted-foreground ml-1">from last month</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default StatsGrid;
