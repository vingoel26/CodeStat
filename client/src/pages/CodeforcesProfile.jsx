import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { platformsAPI } from '../services/api';
import { Loader2 } from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

function CodeforcesProfile() {
    const { handle } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await platformsAPI.getCodeforcesProfile(handle);
                if (response.success) {
                    setData(response.data);
                } else {
                    setError('Failed to fetch profile data');
                }
            } catch (err) {
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        if (handle) {
            fetchData();
        }
    }, [handle]);

    if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    if (error) return <div className="text-center text-destructive p-8">{error}</div>;
    if (!data) return <div className="text-center p-8">No data found</div>;

    const { profile, stats, ratingHistory } = data;

    // Heatmap Data Prep
    const today = new Date();
    const heatmapData = [];
    // Last 365 days
    for (let i = 364; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        heatmapData.push({
            date: dateStr,
            count: stats?.submissionsByDate?.[dateStr] || 0
        });
    }

    // Tag Data Prep for Radar
    const tagData = Object.entries(stats?.problemsByTag || {})
        .map(([subject, A]) => ({ subject, A, fullMark: 100 })) // Normalize if needed
        .sort((a, b) => b.A - a.A)
        .slice(0, 6); // Top 6 tags

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
                    <p className="font-medium text-foreground">{`Rating: ${payload[0].value}`}</p>
                    <p className="text-sm text-muted-foreground">{`Rank: ${payload[0].payload.rank}`}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(label).toLocaleDateString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8">
            {/* Header Stats */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-card p-8 rounded-xl border border-border/60 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg overflow-hidden border-4 border-background">
                        {profile.avatar ? (
                            <img src={profile.avatar} alt={handle} className="w-full h-full object-cover" />
                        ) : (
                            handle[0].toUpperCase()
                        )}
                    </div>
                     <div>
                        <h1 className="text-3xl font-bold">{handle}</h1>
                        <p className={`text-lg font-medium ${
                            profile.rank?.includes('candidate master') || profile.rank?.includes('master') || profile.rank?.includes('grandmaster') 
                            ? 'text-purple-500' 
                            : 'text-muted-foreground'
                        }`}>
                            {profile.rank ? profile.rank.toUpperCase() : 'UNRATED'}
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-8 mt-6 md:mt-0 text-center">
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Current Rating</p>
                        <p className="text-4xl font-bold mt-1 text-foreground">{profile.rating || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Max Rating</p>
                        <p className="text-4xl font-bold mt-1 text-muted-foreground/80">{profile.maxRating || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Solved</p>
                        <p className="text-4xl font-bold mt-1 text-primary">{stats?.totalSolved || '0'}</p>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rating History */}
                <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/60">
                    <CardHeader>
                        <CardTitle>Rating History</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        {ratingHistory && ratingHistory.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={ratingHistory}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={(date) => new Date(date).getFullYear()}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <YAxis 
                                        domain={['dataMin - 50', 'dataMax + 50']} 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="newRating" 
                                        stroke="hsl(var(--primary))" 
                                        strokeWidth={2}
                                        dot={{ r: 0 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground">
                                No rating history available
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Submission Heatmap */}
                <Card className="shadow-sm border-border/60">
                    <CardHeader>
                        <CardTitle>Activity (Last 365 Days)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] overflow-hidden">
                        <div className="flex flex-wrap gap-1 content-start h-full overflow-y-auto pr-2">
                             {heatmapData.map((day, i) => {
                                let bgClass = "bg-secondary";
                                if (day.count > 0) bgClass = "bg-green-300 dark:bg-green-900";
                                if (day.count > 3) bgClass = "bg-green-400 dark:bg-green-800";
                                if (day.count > 6) bgClass = "bg-green-500 dark:bg-green-600";
                                if (day.count > 10) bgClass = "bg-green-600 dark:bg-green-500";
                                
                                return (
                                    <div 
                                        key={i} 
                                        className={`w-3 h-3 rounded-[2px] ${bgClass}`} 
                                        title={`${day.date}: ${day.count} submissions`}
                                    />
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Problem Tags - Radar Chart */}
                <Card className="shadow-sm border-border/60">
                    <CardHeader>
                        <CardTitle>Strongest Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {tagData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={tagData}>
                                    <PolarGrid stroke="hsl(var(--border))" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                    <Radar
                                        name="Problems"
                                        dataKey="A"
                                        stroke="hsl(var(--primary))"
                                        fill="hsl(var(--primary))"
                                        fillOpacity={0.3}
                                    />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        ) : (
                             <div className="h-full flex items-center justify-center text-muted-foreground">
                                No tag data available
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default CodeforcesProfile;
