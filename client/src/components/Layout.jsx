import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '../utils/cn';

function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleMenuClick}
        isMobile={isMobile}
        isOpen={isMobileMenuOpen}
      />
      
      <Header 
        onMenuClick={handleMenuClick}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <main className={cn(
        'pt-16 min-h-screen transition-all duration-300',
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      )}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
