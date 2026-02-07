import ProfileCard from '../components/ProfileCard';
import StatsGrid from '../components/StatsGrid';
import ActivityGraph from '../components/ActivityGraph';
import { useAuth } from '../context/AuthContext';
import { useAccounts } from '../context/AccountsContext';

function Dashboard() {
    const { user } = useAuth();
    const { accounts, loading } = useAccounts();

    // Aggregate data from all accounts
    const stats = {
        totalSolved: 0,
        totalSubmissions: 0,
        maxRating: 0,
        activeDays: 0, 
        currentStreak: 0, 
        longestStreak: 0
    };

    accounts.forEach(acc => {
        const accStats = acc.cachedData?.stats || {};
        const accProfile = acc.cachedData?.profile || {};

        stats.totalSolved += (accStats.totalSolved || 0);
        stats.totalSubmissions += (accStats.totalSubmissions || 0);
        stats.maxRating = Math.max(stats.maxRating, accProfile.maxRating || 0);
        stats.activeDays += Object.keys(accStats.submissionsByDate || {}).length; 
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Profile Card (3 columns on large screens) */}
            <div className="md:col-span-4 xl:col-span-3">
                <ProfileCard user={user} accounts={accounts} />
            </div>

            {/* Right Column: Stats & Charts (9 columns) */}
            <div className="md:col-span-8 xl:col-span-9 space-y-8">
                {/* Stats Grid */}
                <StatsGrid stats={stats} />

                {/* Main Charts Area */}
                <div className="grid grid-cols-1 gap-8">
                    <ActivityGraph />
                    {/* Add more charts like Breakdown or Heatmap here */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
