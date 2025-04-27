import React, { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Home, 
  Settings, 
  User, 
  File,
  Plus,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import BackgroundEffects from './BackgroundEffects';
import UserButton from './auth/user-button';
import { useAuth } from '@/lib/auth-context';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-primary/90 to-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Kuro AI</h1>
            <p className="text-sm text-muted-foreground/80">Intelligent Learning Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1.5">
        <Link to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium group transition-all duration-200
                        ${location.pathname === '/' 
                          ? 'bg-gradient-to-r from-primary/90 to-primary text-white shadow-lg shadow-primary/20' 
                          : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
                        `}>
          <Home className="h-4 w-4 mr-3" />
          Dashboard
        </Link>
        
        {!isLoading && isAuthenticated && (
          <>
            <Link to="/courses"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium group transition-all duration-200
                            ${location.pathname.includes('/course') 
                              ? 'bg-gradient-to-r from-primary/90 to-primary text-white shadow-lg shadow-primary/20' 
                              : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
                            `}>
              <BookOpen className="h-4 w-4 mr-3" />
              My Courses
            </Link>
            
            <div className="py-3 px-4">
              <p className="text-xs font-semibold text-muted-foreground/70 tracking-wider">TOOLS</p>
            </div>
            
            <Link to="/create"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium group transition-all duration-200
                            ${location.pathname === '/create' 
                              ? 'bg-gradient-to-r from-primary/90 to-primary text-white shadow-lg shadow-primary/20' 
                              : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
                            `}>
              <Plus className="h-4 w-4 mr-3" />
              Create Course
            </Link>
            
            <Link to="/notes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium group transition-all duration-200
                            ${location.pathname === '/notes' 
                              ? 'bg-gradient-to-r from-primary/90 to-primary text-white shadow-lg shadow-primary/20' 
                              : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
                            `}>
              <File className="h-4 w-4 mr-3" />
              My Notes
            </Link>
          </>
        )}
      </nav>
      
      <UserButton />
    </div>
  );
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BackgroundEffects />
      <div className="flex min-h-screen bg-background">
        {/* Mobile Menu Button */}
        <Button
          size="icon"
          variant="ghost"
          className="fixed top-4 right-4 z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block fixed left-0 top-0 h-full z-40 w-72 border-r border-white/10 bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-xl">
          <SidebarContent />
        </aside>
        
        {/* Sidebar - Mobile */}
        <aside 
          className={`fixed left-0 top-0 h-full z-50 w-72 border-r border-white/10 bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-xl transform transition-transform duration-300 md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarContent />
        </aside>
        
        {/* Main Content */}
        <main className="w-full md:ml-72 bg-gradient-to-b from-background to-background/95">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
