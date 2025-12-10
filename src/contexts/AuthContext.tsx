import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'user' | 'admin' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - replace with actual Django backend integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo: admin@accenthubs.com logs in as admin, others as regular users
    const isAdmin = email.toLowerCase() === 'admin@accenthubs.com';
    
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      role: isAdmin ? 'admin' : 'user',
    });
    
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call - replace with actual Django backend integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      email,
      name,
      role: 'user',
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
