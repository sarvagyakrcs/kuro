import React, { createContext, useContext, useEffect, useState } from 'react';
import * as auth from './auth-api';
import { config } from './config';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initial auth check and user data load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = auth.getStoredToken();
        if (token) {
          const isValid = await auth.validateToken();
          if (isValid) {
            // Get user data from token or API
            const userData = await auth.getCurrentUser();
            setUser(userData);
          } else {
            // Invalid token, clean up
            auth.logout();
            setUser(null);
            if (window.location.pathname !== '/') {
              window.location.href = config.marketingAppUrl;
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await auth.login({ email, password });
      setUser(response.user);
      navigate('/courses');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      setUser(null);
      window.location.href = config.marketingAppUrl;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user, // Directly tie authentication state to user presence
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 