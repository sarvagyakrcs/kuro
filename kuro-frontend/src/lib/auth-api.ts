import { config } from './config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getStoredToken = () => localStorage.getItem(config.authTokenKey);

// Simulated user data storage
const USER_DATA_KEY = 'kuro_user_data';

export const getCurrentUser = async (): Promise<User> => {
  // In a real app, you would decode the JWT token or make an API call
  // For demo, we'll store user data in localStorage alongside the token
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (userData) {
    return JSON.parse(userData);
  }
  throw new Error('No user data found');
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate API call delay
  await delay(1000);
  
  // Simulate successful response
  const response: AuthResponse = {
    token: 'mock_jwt_token_' + Math.random().toString(36).substr(2),
    user: {
      id: '1',
      email: credentials.email,
      name: 'Demo User',
    },
  };

  // Store token and user data
  localStorage.setItem(config.authTokenKey, response.token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));
  return response;
};

export const logout = async (): Promise<void> => {
  await delay(500);
  localStorage.removeItem(config.authTokenKey);
  localStorage.removeItem(USER_DATA_KEY);
};

export const validateToken = async (): Promise<boolean> => {
  const token = getStoredToken();
  if (!token) return false;

  // Simulate API validation delay
  await delay(500);
  return true; // For demo, always return true if token exists
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
}; 