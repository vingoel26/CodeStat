import { useAccounts } from '../context/AccountsContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

function CodeforcesCombined() {
    const { accounts } = useAccounts();
    const cfAccounts = accounts.filter(a => a.platform === 'codeforces');

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Codeforces Leaderboard</h1>
                    <p className="text-muted-foreground mt-2">Compare statistics across your connected accounts.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Add Handle
                </Button>
            </div>

            <Card className="overflow-hidden border-border/60 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">Handle</th>
                                <th className="px-6 py-4 font-medium cursor-pointer hover:text-foreground transition-colors">
                                    <div className="flex items-center gap-1">
                                        Current Rating <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-medium cursor-pointer hover:text-foreground">
                                    <div className="flex items-center gap-1">
                                        Max Rating <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-medium">Rank</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {cfAccounts.length > 0 ? (
                                cfAccounts.map((account) => {
                                    const profile = account.cachedData?.profile || {};
                                    return (
                                        <tr key={account._id} className="bg-card hover:bg-secondary/20 transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">
                                                {account.handle}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-primary">
                                                {profile.rating || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {profile.maxRating || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                                    profile.rank === 'candidate master' 
                                                        ? 'bg-purple-500/10 text-purple-600 border-purple-200' 
                                                        : 'bg-secondary text-muted-foreground border-transparent'
                                                }`}>
                                                    {profile.rank ? profile.rank.toUpperCase() : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/codeforces/${account.handle}`} className="text-primary hover:underline font-medium">
                                                    View Profile
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                                        No Codeforces accounts connected.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

export default CodeforcesCombined;
