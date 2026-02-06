import { Moon, Sun, Menu, Bell, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

function Header({ onMenuClick, isSidebarCollapsed }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={cn(
      'fixed top-0 right-0 h-16 bg-[hsl(var(--card))]/80 backdrop-blur-sm border-b border-[hsl(var(--border))] flex items-center justify-between px-4 z-30 transition-all duration-300',
      isSidebarCollapsed ? 'left-16' : 'left-64',
      'max-md:left-0'
    )}>
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hidden md:flex"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <h1 className="text-lg font-semibold text-[hsl(var(--foreground))] hidden sm:block">
          Dashboard
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
