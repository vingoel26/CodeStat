import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAccounts } from '../context/AccountsContext';
import { Plus, Trash2, RefreshCw, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PLATFORMS = [
    { id: 'codeforces', name: 'Codeforces', color: 'bg-[#1F8ACB]', text: 'text-[#1F8ACB]' },
    { id: 'leetcode', name: 'LeetCode', color: 'bg-[#FFA116]', text: 'text-[#FFA116]' },
    { id: 'codechef', name: 'CodeChef', color: 'bg-[#5B4638]', text: 'text-[#5B4638]' },
];

function ManageAccounts() {
    const { accounts, loading, addAccount, removeAccount, refreshAccount } = useAccounts();
    const [isAdding, setIsAdding] = useState(false);
    const [newHandle, setNewHandle] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('codeforces');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddAccount = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitLoading(true);

        try {
            await addAccount(selectedPlatform, newHandle);
            setIsAdding(false);
            setNewHandle('');
        } catch (err) {
            setError(err.message || 'Failed to add account');
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* Add Account Modal Overlay */}
            {isAdding && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md p-6 shadow-xl border-2 border-primary/10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Connect Account</h2>
                            <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        
                        <form onSubmit={handleAddAccount} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Platform</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {PLATFORMS.map(p => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setSelectedPlatform(p.id)}
                                            className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                                                selectedPlatform === p.id 
                                                ? 'border-primary bg-primary/10 text-primary' 
                                                : 'border-border hover:bg-secondary'
                                            }`}
                                        >
                                            {p.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">User Handle</label>
                                <Input 
                                    placeholder="e.g. tourist" 
                                    value={newHandle}
                                    onChange={(e) => setNewHandle(e.target.value)}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-destructive text-sm bg-destructive/10 p-2 rounded flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> {error}
                                </div>
                            )}

                            <div className="flex justify-end pt-2">
                                <Button type="submit" disabled={submitLoading} className="w-full">
                                    {submitLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                                        </>
                                    ) : (
                                        'Connect Account'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Accounts</h1>
                    <p className="text-muted-foreground mt-2">Connect your competitive programming profiles.</p>
                </div>
                <Button onClick={() => setIsAdding(true)} className="gap-2">
                    <Plus className="w-4 h-4" /> Add Account
                </Button>
            </div>

            <div className="grid gap-4">
                {accounts.length === 0 ? (
                    <Card className="p-8 text-center text-muted-foreground border-dashed">
                        No accounts connected yet. Click "Add Account" to get started.
                    </Card>
                ) : (
                    accounts.map((account) => {
                        const platformInfo = PLATFORMS.find(p => p.id === account.platform) || {};
                        const profile = account.cachedData?.profile || {};
                        
                        return (
                            <Card key={account._id} className="p-6 flex items-center justify-between group hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${platformInfo.color}/10 flex items-center justify-center shrink-0`}>
                                         {profile.avatar && account.platform === 'codeforces' ? (
                                             <img src={profile.avatar} alt={account.handle} className="w-full h-full rounded-xl object-cover" />
                                         ) : (
                                            <span className={`font-bold text-lg ${platformInfo.text}`}>
                                                {platformInfo.name?.[0]}
                                            </span>
                                         )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{platformInfo.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="font-mono text-foreground">{account.handle}</span>
                                            {profile.rating && (
                                                <>
                                                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                                    <span>Rating: {profile.rating}</span>
                                                </>
                                            )}
                                            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                            <span className="flex items-center gap-1 text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full text-xs font-medium">
                                                <CheckCircle2 className="w-3 h-3" /> Connected
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => refreshAccount(account._id)}>
                                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeAccount(account._id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default ManageAccounts;
