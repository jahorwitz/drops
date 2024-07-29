import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface UserSessionData {
  id: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

interface UseAuthProps {
  onLoginSuccess?: (data: { token: string; session: UserSessionData }) => void;
  onLogoutSuccess?: () => void;
}

const useAuth = ({ onLoginSuccess, onLogoutSuccess }: UseAuthProps) => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { currentUser, isLoggedIn, login, logout } = context;

  const wrappedLogin = (user: UserSessionData) => {
    login(user);
    if (onLoginSuccess) {
      onLoginSuccess({ token: user.token, session: user });
    }
  };

  const wrappedLogout = () => {
    logout();
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }
  };

  return { currentUser, isLoggedIn, login: wrappedLogin, logout: wrappedLogout };
};

export default useAuth;