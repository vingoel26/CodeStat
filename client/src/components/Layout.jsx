import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '../utils/cn';

function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary">
            {/* Sidebar */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Header */}
            <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Main Content Area */}
            <main className={cn(
                "pt-16 min-h-screen transition-all duration-300 ease-in-out",
                "md:ml-16" // Desktop offset for sidebar
            )}>
                <div className="container max-w-7xl mx-auto p-4 lg:p-8 animate-in slide-in-from-bottom-2 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
