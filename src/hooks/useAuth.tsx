import { useCallback, useEffect, useMemo, useState } from 'react';
import { AUTH_TOKEN, setGraphqlHeaders } from "../store";
import { useMutation } from "@apollo/client";
import { USER_LOGIN, USER_LOGOUT } from "../graphql/mutations/users";
import { User } from "../__generated__/graphql";

interface UseAuthProps {
  onLoginSuccess?: (data: { session: User }) => void;
  onLogoutSuccess?: () => void;
}

export const useAuth = ({
  onLoginSuccess, onLogoutSuccess,}: UseAuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [loadGetUser, { error: loginError }] = useMutation(USER_LOGIN);
  const [logoutUser] = useMutation(USER_LOGOUT);

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      loadGetUser({
        variables: { email: email, password: password },
        onCompleted: (data) => {
          if (data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordSuccess') {
            localStorage.setItem(AUTH_TOKEN, data.authenticateUserWithPassword.sessionToken);
            setToken(data.authenticateUserWithPassword.sessionToken);
            setCurrentUser(data.authenticateUserWithPassword.item);
            if (onLoginSuccess) {
              onLoginSuccess({ session: data.authenticateUserWithPassword.item });
            }
          } else if (data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordFailure') {
            throw new Error(data?.authenticateUserWithPassword?.message);
          }
        },
      });
    },
    [loadGetUser, onLoginSuccess],
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
  }, [logoutUser, onLogoutSuccess]);

  const isLoggedIn = useMemo(() => !!currentUser, [currentUser]);

  useEffect(() => {
    setGraphqlHeaders(token);
  }, [token]);

  return { currentUser, isLoggedIn, login, loginError, logout };
};