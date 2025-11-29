
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import logger from '../utils/logger';
import { login as loginApi } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockAdmin: User = { id: '1', name: 'System Administrator', email: 'admin@mashroo3k.com', role: 'admin', status: 'active', analyses: 0, lastLogin: new Date().toISOString() };
const mockUser: User = { id: '2', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', analyses: 0, lastLogin: new Date().toISOString() };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking for a stored session
    logger.info('Checking for stored user session...');
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        logger.success('User session restored:', parsedUser.email);
      } else {
        logger.info('No stored user session found');
      }
    } catch (error) {
      logger.error("Failed to restore session", error);
      sessionStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    logger.info('Login attempt for:', email);
    setLoading(true);
    try {
      const { user: apiUser, token } = await loginApi(email, password);
      const loggedInUser: User = { ...apiUser, token };
      setUser(loggedInUser);
      sessionStorage.setItem('user', JSON.stringify(loggedInUser));
      if (token) sessionStorage.setItem('token', token);
      setLoading(false);
      logger.success('Login successful:', email, '- Role:', loggedInUser.role);
      if (loggedInUser?.role === 'admin') {
        logger.info('Navigating to admin panel');
        navigate('/admin');
      } else if (loggedInUser?.role === 'developer') {
        logger.info('Navigating to developer dashboard');
        navigate('/developer');
      } else {
        logger.info('Navigating to dashboard');
        navigate('/dashboard');
      }
    } catch (error: any) {
      logger.error('Login failed for:', email, error);
      alert(error?.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  const logout = () => {
    logger.info('User logging out:', user?.email);
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    logger.success('Logout successful');
    navigate('/login');
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
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
