import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { ExternalLink, Crown, MapPin, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { useAccounts } from '../context/AccountsContext';
import { useAuth } from '../context/AuthContext';

function ProfileCard() {
    const { user } = useAuth();
    const { accounts } = useAccounts();

    // Find specific accounts
    const leetcodeAccount = accounts.find(a => a.platform === 'leetcode');
    const codechefAccount = accounts.find(a => a.platform === 'codechef');
    const codeforcesAccount = accounts.find(a => a.platform === 'codeforces');

    return (
        <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="relative pb-0">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-tr from-orange-400/20 to-pink-500/20 rounded-t-xl" />
                <div className="relative pt-12 flex flex-col items-center">
                     <div className="w-24 h-24 rounded-full border-4 border-background shadow-lg bg-gradient-to-br from-orange-400 to-pink-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-pink-500">
                                {user?.name?.[0] || 'U'}
                            </span>
                        </div>
                     </div>
                     {codeforcesAccount?.rank && (
                        <div className="absolute top-[8.5rem] bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-200 shadow-sm flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            {codeforcesAccount.rank.toUpperCase()}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pt-4 text-center space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-foreground">{user?.name || 'User Name'}</h2>
                    <p className="text-sm text-muted-foreground">@{user?.email?.split('@')[0] || 'username'}</p>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>India</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <LinkIcon className="w-3 h-3" />
                        <span className="truncate max-w-[120px]">codestat.dev</span>
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left pl-1">Accounts</p>
                    
                    {['leetcode', 'codechef', 'codeforces'].map(platformId => {
                        const account = accounts.find(a => a.platform === platformId);
                        const platformName = platformId === 'leetcode' ? 'LeetCode' : platformId === 'codechef' ? 'CodeChef' : 'Codeforces';
                        const platformColor = platformId === 'leetcode' ? 'text-[#FFA116] bg-[#FFA116]/10' : platformId === 'codechef' ? 'text-[#5B4638] bg-[#5B4638]/10' : 'text-[#1F8ACB] bg-[#1F8ACB]/10';
                        const shortName = platformId === 'leetcode' ? 'LC' : platformId === 'codechef' ? 'CC' : 'CF';

                        return (
                            <div key={platformId} className="flex items-center justify-between group p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg ${platformColor} flex items-center justify-center`}>
                                        <span className="font-bold text-xs">{shortName}</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium">{platformName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {account ? (account.cachedData?.profile?.rating ? `Rating: ${account.cachedData.profile.rating}` : 'Connected') : 'Not Connected'}
                                        </p>
                                    </div>
                                </div>
                                {account ? (
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
                                ) : (
                                     <AlertTriangle className="w-4 h-4 text-orange-400" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20" variant="default">
                    Edit Profile
                </Button>
            </CardContent>
        </Card>
    );
}

export default ProfileCard;
