import { useState } from 'react';
import { useAccounts } from '../context/AccountsContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Label } from '../components/ui/Input';
import { Plus, Trash2, RefreshCw, AlertCircle, Check, X } from 'lucide-react';

const PLATFORMS = [
    { id: 'codeforces', name: 'Codeforces', color: 'hsl(var(--codeforces))' },
    { id: 'codechef', name: 'CodeChef', color: 'hsl(var(--codechef))' },
    { id: 'leetcode', name: 'LeetCode', color: 'hsl(var(--leetcode))' },
    { id: 'atcoder', name: 'AtCoder', color: 'hsl(var(--atcoder))' },
];

function ManageAccounts() {
    const { accounts, loading, addAccount, removeAccount, refreshAccount } = useAccounts();
    const [isAdding, setIsAdding] = useState(false);
    const [newPlatform, setNewPlatform] = useState('codeforces');
    const [newHandle, setNewHandle] = useState('');
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(null);

    const handleAddAccount = async (e) => {
        e.preventDefault();
        if (!newHandle.trim()) {
            setError('Please enter a handle');
            return;
        }

        setActionLoading('add');
        const result = await addAccount(newPlatform, newHandle.trim());

        if (result.success) {
            setNewHandle('');
            setIsAdding(false);
            setError('');
        } else {
            setError(result.error);
        }
        setActionLoading(null);
    };

    const handleRemoveAccount = async (id) => {
        setActionLoading(id);
        await removeAccount(id);
        setActionLoading(null);
    };

    const handleRefreshAccount = async (id) => {
        setActionLoading(`refresh-${id}`);
        await refreshAccount(id);
        setActionLoading(null);
    };

    const getAccountsByPlatform = () => {
        const grouped = {};
        PLATFORMS.forEach((p) => {
            grouped[p.id] = accounts.filter((acc) => acc.platform === p.id);
        });
        return grouped;
    };

    const groupedAccounts = getAccountsByPlatform();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
                        Manage Accounts
                    </h1>
                    <p className="text-[hsl(var(--muted-foreground))]">
                        Connect your competitive programming profiles
                    </p>
                </div>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Account
                    </Button>
                )}
            </div>

            {/* Add Account Form */}
            {isAdding && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddAccount} className="space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="platform">Platform</Label>
                                    <select
                                        id="platform"
                                        value={newPlatform}
                                        onChange={(e) => setNewPlatform(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                                    >
                                        {PLATFORMS.map((p) => (
                                            <option key={p.id} value={p.id} className="bg-[hsl(var(--background))]">
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="handle">Handle / Username</Label>
                                    <Input
                                        id="handle"
                                        placeholder="Enter your handle"
                                        value={newHandle}
                                        onChange={(e) => setNewHandle(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsAdding(false);
                                        setError('');
                                        setNewHandle('');
                                    }}
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={actionLoading === 'add'}>
                                    {actionLoading === 'add' ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4 mr-2" />
                                            Add Account
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Connected Accounts by Platform */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 animate-spin text-[hsl(var(--muted-foreground))]" />
                </div>
            ) : (
                <div className="grid gap-4">
                    {PLATFORMS.map((platform) => (
                        <Card key={platform.id}>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: platform.color }}
                                    />
                                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                        ({groupedAccounts[platform.id]?.length || 0} accounts)
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {groupedAccounts[platform.id]?.length > 0 ? (
                                    <div className="space-y-2">
                                        {groupedAccounts[platform.id].map((account) => (
                                            <div
                                                key={account._id}
                                                className="flex items-center justify-between p-3 rounded-md bg-[hsl(var(--muted))]/30 border border-[hsl(var(--border))]"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium">{account.handle}</span>
                                                    {account.isVerified && (
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRefreshAccount(account._id)}
                                                        disabled={actionLoading === `refresh-${account._id}`}
                                                        title="Refresh data"
                                                    >
                                                        <RefreshCw
                                                            className={`w-4 h-4 ${
                                                                actionLoading === `refresh-${account._id}`
                                                                    ? 'animate-spin'
                                                                    : ''
                                                            }`}
                                                        />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRemoveAccount(account._id)}
                                                        disabled={actionLoading === account._id}
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                        title="Remove account"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[hsl(var(--muted-foreground))] py-2">
                                        No accounts connected
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManageAccounts;
