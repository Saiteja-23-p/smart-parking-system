import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User, LoginRequest } from '../types';
import { authService } from '../services/authService';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    const storedUser = authService.getCurrentUser();
    
    if (token && storedUser) {
      setUser(storedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const data = await authService.login(credentials);
      const { jwt, id, name, email, role } = data;
      
      const userData: User = { id, name, email, role };
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(userData));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      setUser(userData);
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || error.response?.data || error.message || 'Login rejected by gateway.' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthProviderBase user={user} loading={loading} login={login} logout={logout}>
      {children}
    </AuthProviderBase>
  );
};

// Internal wrapper to avoid TypeScript circular references
const AuthProviderBase: React.FC<{
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  children: React.ReactNode;
}> = ({ user, loading, login, logout, children }) => {
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
