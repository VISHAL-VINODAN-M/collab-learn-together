
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

// Mock user data for demo purposes
const MOCK_USER: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@classcollab.com',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
  role: 'student',
  createdAt: new Date(),
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in local storage for persistence
    const storedUser = localStorage.getItem('classCollab_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // Mock login functionality until we integrate Firebase
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setCurrentUser(MOCK_USER);
        localStorage.setItem('classCollab_user', JSON.stringify(MOCK_USER));
        setIsLoading(false);
        resolve(MOCK_USER);
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<User> => {
    // Mock register functionality until we integrate Firebase
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = { ...MOCK_USER, name, email };
        setCurrentUser(newUser);
        localStorage.setItem('classCollab_user', JSON.stringify(newUser));
        setIsLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  const logout = async (): Promise<void> => {
    // Mock logout functionality
    return new Promise((resolve) => {
      setCurrentUser(null);
      localStorage.removeItem('classCollab_user');
      resolve();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
