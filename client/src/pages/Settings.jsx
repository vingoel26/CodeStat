import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Switch } from '../components/ui/Switch';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Palette, Shield, ChevronRight } from 'lucide-react';

function Settings() {
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Shield },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Sidebar */}
                <aside className="lg:w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === tab.id 
                                    ? "bg-primary/10 text-primary" 
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Settings Content */}
                <div className="flex-1 space-y-6">
                    {activeTab === 'account' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input defaultValue="User Name" />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input defaultValue="user@example.com" />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button>Save Changes</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'appearance' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Theme Preferences</CardTitle>
                                <CardDescription>Customize how CodeStat looks on your device.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="font-medium">Dark Mode</p>
                                        <p className="text-sm text-muted-foreground">Switch between light and dark themes.</p>
                                    </div>
                                    <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    
                    {/* Other tabs placeholders */}
                </div>
            </div>
        </div>
    );
}

export default Settings;
