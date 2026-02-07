import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    Settings, 
    LogOut, 
    Code2, 
    BarChart3 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

function Sidebar({ isOpen, onClose }) {
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Accounts', path: '/accounts' },
        { icon: BarChart3, label: 'Leaderboard', path: '/codeforces/combined' }, // Placeholder for combined view
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-40 w-16 bg-card border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className="flex flex-col h-full py-4">
                {/* Logo Area */}
                <div className="flex items-center justify-center h-16 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Code2 className="w-6 h-6" />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) => cn(
                                "flex items-center justify-center w-12 h-12 mx-auto rounded-xl transition-all duration-200 group relative",
                                isActive 
                                    ? "bg-primary/10 text-primary" 
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            
                            {/* Tooltip */}
                            <span className="absolute left-full ml-3 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-border">
                                {item.label}
                            </span>
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-2 mt-auto">
                    <button
                        onClick={logout}
                        className="flex items-center justify-center w-12 h-12 mx-auto rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors duration-200 group relative"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="absolute left-full ml-3 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-border">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
            
            {/* Mobile Overlay is handled in Layout usually, but could be here if self-contained */}
        </aside>
    );
}

export default Sidebar;
