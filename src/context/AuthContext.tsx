import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import useLocalStorage from "use-local-storage";
import axios from 'axios';

interface UserSessionData {
  id: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

interface AuthContextType {
  currentUser: UserSessionData | null;
  isLoggedIn: boolean;
  login: (user: UserSessionData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserSessionData | null>(null);
  const [token, setToken] = useLocalStorage<string | null>('authToken', null);

  const fetchSessionData = useCallback(async (token: string) => {
    try {
      const response = await axios.get('/api/session', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sessionData = response.data;
      setCurrentUser({ ...sessionData, token });
    } catch (error) {
      setToken(null);
    }
  }, [setToken]);

  useEffect(() => {
    if (token) {
      fetchSessionData(token);
    }
  }, [token, fetchSessionData]);

  const login = (user: UserSessionData) => {
    setCurrentUser(user);
    setToken(user.token);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const isLoggedIn = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };