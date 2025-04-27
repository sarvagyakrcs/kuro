import { Bell, LogOut, Settings } from 'lucide-react'
import React from 'react'
import { Avatar } from '../ui/avatar'
import { User } from 'lucide-react'
import { Button } from '../ui/button'
import { useAuth } from '@/lib/auth-context'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserButton = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Redirect is handled in auth context
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 mx-4 mb-4">
        <Link to="/login">
          <Button 
            className="w-full bg-gradient-to-r from-primary/90 to-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200"
          >
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 mx-4 mb-4 border border-white/10 rounded-xl bg-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="ring-2 ring-primary/20">
                  <img src='public/default-profile-pic.png' alt='profile-pic' className='rounded-full' />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-primary/80 font-medium">Premium Plan</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-white">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-white">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserButton;