import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  selectedCountry: 'brazil' | 'colombia' | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setCountry: (country: 'brazil' | 'colombia') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<'brazil' | 'colombia' | null>(null);

  const login = (username: string, password: string): boolean => {
    // Simulación de autenticación
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === '123456') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedCountry(null);
  };

  const setCountry = (country: 'brazil' | 'colombia') => {
    setSelectedCountry(country);
  };

  return (
    <AuthContext.Provider value={{
      user,
      selectedCountry,
      login,
      logout,
      setCountry
    }}>
      {children}
    </AuthContext.Provider>
  );
};