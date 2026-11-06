import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  currentUserPhone: string | null;
  login: (phone?: string) => void;
  logout: () => void;
  isUserRegistered: (phone: string) => boolean;
  registerUser: (phone: string) => void;
}

// Initial demo registered phone numbers
const DEFAULT_REGISTERED_USERS = [
  '9876543210',
  '9821300000',
  '9988776655',
  '9890098900',
  '9123456789',
];

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentUserPhone: null,
  login: () => {},
  logout: () => {},
  isUserRegistered: () => false,
  registerUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserPhone, setCurrentUserPhone] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<string[]>(DEFAULT_REGISTERED_USERS);

  const login = (phone?: string) => {
    if (phone) setCurrentUserPhone(phone);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setCurrentUserPhone(null);
    setIsLoggedIn(false);
  };

  const isUserRegistered = (phone: string): boolean => {
    const cleaned = phone.replace(/[^0-9]/g, '');
    return registeredUsers.includes(cleaned);
  };

  const registerUser = (phone: string) => {
    const cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned && !registeredUsers.includes(cleaned)) {
      setRegisteredUsers(prev => [...prev, cleaned]);
    }
    setCurrentUserPhone(cleaned);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUserPhone,
        login,
        logout,
        isUserRegistered,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
