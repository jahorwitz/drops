import { useCallback, useEffect, useMemo, useState } from "react";
import { AUTH_TOKEN, setGraphqlHeaders } from "../store";
import { useMutation } from "@apollo/client";
import { USER_LOGOUT } from "../graphql/mutations/users";

interface UserSessionData {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface UseAuthProps {
  onLoginSuccess?: (data: { session: UserSessionData }) => void;
  onLogoutSuccess?: () => void;
}

//TODO: Remove the commented out variables as they become necessary
const useAuth = ({ /* onLoginSuccess,*/ onLogoutSuccess }: UseAuthProps) => {
  const [currentUser, setCurrentUser] = useState<UserSessionData | undefined>();
  const [logoutUser] = useMutation(USER_LOGOUT);

  const login = useCallback(
    (/*username: string, password: string*/) => {
      // TODO: Implement login logic
      // 1) Call API to authenticate user with username/email and password
      // 2) If successful:
      //      - save token to localStorage using AUTH_TOKEN key from store/apollo-client.tsx
      //      - set current user to the session data
      //      - call onLoginSuccess callback if provided
    },
    [],
  );

  const logout = useCallback(() => {
    logoutUser()
      .then((res) => {
        if (res) {
          localStorage.removeItem(AUTH_TOKEN);
          setCurrentUser(undefined);
          if (onLogoutSuccess) onLogoutSuccess();
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const isLoggedIn = useMemo(() => !!currentUser, [currentUser]);

  useEffect(() => {
    setGraphqlHeaders(currentUser?.token);
  }, [currentUser]);

  return { currentUser, isLoggedIn, login, logout };
};

export default useAuth;
