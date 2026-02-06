import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    ChevronDown,
    ChevronRight,
    Settings,
    Users
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAccounts } from '../context/AccountsContext';

// Platform icons using colored circles
const platformIcons = {
    codeforces: { color: 'bg-[hsl(var(--codeforces))]', label: 'CF' },
    codechef: { color: 'bg-[hsl(var(--codechef))]', label: 'CC' },
    leetcode: { color: 'bg-[hsl(var(--leetcode))]', label: 'LC' },
    atcoder: { color: 'bg-[hsl(var(--atcoder))]', label: 'AC' },
};

function PlatformIcon({ platform }) {
    const icon = platformIcons[platform];
    return (
        <span className={cn(
            'w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center text-white',
            icon?.color || 'bg-gray-500'
        )}>
            {icon?.label || '?'}
        </span>
    );
}

function SidebarItem({ to, icon: Icon, label, children, isCollapsed }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = children && children.length > 0;

    if (hasChildren) {
        return (
            <div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors',
                        isCollapsed && 'justify-center'
                    )}
                >
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    {!isCollapsed && (
                        <>
                            <span className="flex-1 text-left text-sm font-medium">{label}</span>
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </>
                    )}
                </button>
                {isExpanded && !isCollapsed && (
                    <div className="ml-6 mt-1 space-y-1">
                        {children.map((child, index) => (
                            <NavLink
                                key={index}
                                to={child.to}
                                className={({ isActive }) => cn(
                                    'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                                    isActive
                                        ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                                        : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]'
                                )}
                            >
                                {child.icon}
                                <span>{child.label}</span>
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                    : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]',
                isCollapsed && 'justify-center'
            )}
        >
            {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
            {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
        </NavLink>
    );
}

function Sidebar({ isCollapsed, onToggle, isMobile, isOpen }) {
    const { accounts } = useAccounts();

    // Group accounts by platform
    const platformGroups = accounts.reduce((acc, account) => {
        if (!acc[account.platform]) {
            acc[account.platform] = [];
        }
        acc[account.platform].push(account.handle);
        return acc;
    }, {});

    const platforms = Object.entries(platformGroups).map(([platform, handles]) => ({
        platform,
        handles
    }));

    return (
        <>
            {/* Mobile overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onToggle}
                />
            )}

            <aside
                className={cn(
                    'fixed left-0 top-0 h-full bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] flex flex-col z-50 transition-all duration-300',
                    isCollapsed && !isMobile ? 'w-16' : 'w-64',
                    isMobile && !isOpen && '-translate-x-full',
                    isMobile && isOpen && 'translate-x-0'
                )}
            >
                {/* Logo */}
                <div className={cn(
                    'h-16 flex items-center border-b border-[hsl(var(--border))] px-4',
                    isCollapsed && !isMobile && 'justify-center'
                )}>
                    <span className="text-xl font-bold text-[hsl(var(--primary))]">
                        {isCollapsed && !isMobile ? '🚀' : '🚀 CodeStat'}
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    <SidebarItem to="/" icon={Home} label="Dashboard" isCollapsed={isCollapsed && !isMobile} />

                    {/* Connected Platforms */}
                    {platforms.map((platform) => (
                        <SidebarItem
                            key={platform.platform}
                            icon={() => <PlatformIcon platform={platform.platform} />}
                            label={platform.platform.charAt(0).toUpperCase() + platform.platform.slice(1)}
                            isCollapsed={isCollapsed && !isMobile}
                            children={[
                                ...platform.handles.map(handle => ({
                                    to: `/${platform.platform}/${handle}`,
                                    icon: <span className="w-2 h-2 rounded-full bg-[hsl(var(--muted-foreground))]" />,
                                    label: handle
                                })),
                                ...(platform.handles.length > 1 ? [{
                                    to: `/${platform.platform}/combined`,
                                    icon: <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />,
                                    label: 'Combined'
                                }] : [])
                            ]}
                        />
                    ))}

                    {/* Show message if no accounts */}
                    {platforms.length === 0 && !isCollapsed && (
                        <p className="text-xs text-[hsl(var(--muted-foreground))] px-3 py-2">
                            No accounts connected yet
                        </p>
                    )}
                </nav>

                {/* Bottom section */}
                <div className="p-3 border-t border-[hsl(var(--border))] space-y-1">
                    <SidebarItem to="/accounts" icon={Users} label="Accounts" isCollapsed={isCollapsed && !isMobile} />
                    <SidebarItem to="/settings" icon={Settings} label="Settings" isCollapsed={isCollapsed && !isMobile} />
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
