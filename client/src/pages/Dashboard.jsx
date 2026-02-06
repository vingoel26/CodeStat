import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { TrendingUp, Code, Trophy, Activity } from 'lucide-react';

function StatCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-[hsl(var(--primary))]" />
            </div>
          )}
        </div>
        {trend && (
          <div className="mt-4 flex items-center gap-1 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back! 👋</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          Here's an overview of your coding activity across all platforms.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Problems"
          value="1,234"
          subtitle="Across all platforms"
          icon={Code}
          trend="+12% this month"
        />
        <StatCard
          title="Contests"
          value="47"
          subtitle="Participated"
          icon={Trophy}
        />
        <StatCard
          title="Best Rating"
          value="1,892"
          subtitle="Codeforces"
          icon={Activity}
        />
        <StatCard
          title="Current Streak"
          value="15 days"
          subtitle="Keep it up!"
          icon={TrendingUp}
          trend="Personal best!"
        />
      </div>

      {/* Platforms Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Codeforces', handles: 2, problems: 456, color: 'hsl(var(--codeforces))' },
              { name: 'CodeChef', handles: 1, problems: 234, color: 'hsl(var(--codechef))' },
              { name: 'LeetCode', handles: 2, problems: 389, color: 'hsl(var(--leetcode))' },
              { name: 'AtCoder', handles: 1, problems: 155, color: 'hsl(var(--atcoder))' },
            ].map((platform) => (
              <div
                key={platform.name}
                className="p-4 rounded-lg border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{platform.name}</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {platform.handles} handle{platform.handles > 1 ? 's' : ''} • {platform.problems} solved
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-[hsl(var(--muted-foreground))] border border-dashed border-[hsl(var(--border))] rounded-lg">
              📈 Rating chart will be displayed here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-[hsl(var(--muted-foreground))] border border-dashed border-[hsl(var(--border))] rounded-lg">
              📊 Activity heatmap will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
