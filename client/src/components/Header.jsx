import { Moon, Sun, Menu, Bell, Search, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

function Header({ onMenuClick }) {
    const { theme, toggleTheme } = useTheme();
    const { user } = useAuth();

    return (
        <header className="fixed top-0 right-0 left-0 md:left-16 h-16 bg-background/80 backdrop-blur-md border-b border-border z-30 transition-all duration-200">
            <div className="h-full flex items-center justify-between px-4 lg:px-8">
                
                {/* Left: Mobile Menu & Breadcrumbs */}
                <div className="flex items-center gap-4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden text-muted-foreground"
                        onClick={onMenuClick}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    
                    <h1 className="text-xl font-semibold tracking-tight text-foreground hidden md:block">
                        Dashboard
                    </h1>
                </div>

                {/* Center: Search Bar */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                    <div className="relative w-full group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                        <input 
                            type="text" 
                            placeholder="Search accounts, contests, or problems..." 
                            className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary/50 border-transparent focus:bg-background focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all duration-200 text-sm outline-none placeholder:text-muted-foreground/70"
                        />
                    </div>
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-primary">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button>

                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
                    </Button>

                    <div className="h-8 w-px bg-border mx-1 hidden sm:block"></div>

                    <button className="flex items-center gap-3 pl-2 sm:pl-0 focus:outline-none group">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-foreground leading-none">{user?.name || 'User'}</p>
                            <p className="text-xs text-muted-foreground mt-1">@{user?.email?.split('@')[0] || 'handle'}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 p-0.5 shadow-sm group-hover:shadow-md transition-shadow">
                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center border-2 border-transparent">
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500 text-sm">
                                    {user?.name?.[0] || 'U'}
                                </span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
