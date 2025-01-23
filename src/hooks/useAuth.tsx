import { useCallback } from "react";
import { AUTH_TOKEN } from "../store";
import { useMutation, useQuery } from "@apollo/client";
import { USER_LOGIN, USER_LOGOUT } from "../graphql/mutations/users";
import { User } from "../__generated__/graphql";
import { GET_CURRENT_USER } from "../graphql/queries/users";
import { client, setGraphqlHeaders } from "../store";

interface UseAuthProps {
  onLoginSuccess?: (data: { session: User }) => void;
  onLogoutSuccess?: () => void;
}

export const useAuth = ({ onLoginSuccess, onLogoutSuccess }: UseAuthProps) => {
  const [loadGetUser, { error: loginError }] = useMutation(USER_LOGIN);
  const { data: currentUserData, loading } = useQuery(GET_CURRENT_USER);
  const [logoutUser] = useMutation(USER_LOGOUT);

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      loadGetUser({
        variables: { email: email, password: password },
        onCompleted: (data) => {
          if (data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordSuccess') {
            localStorage.setItem(AUTH_TOKEN, data.authenticateUserWithPassword.sessionToken);
            setGraphqlHeaders(data.authenticateUserWithPassword.sessionToken);
            client.refetchQueries({
              include: [GET_CURRENT_USER],
            });
            if (onLoginSuccess) {
              onLoginSuccess({
                session: data.authenticateUserWithPassword.item,
              });
            }
          } else if (
            data?.authenticateUserWithPassword?.__typename ===
            "UserAuthenticationWithPasswordFailure"
          ) {
            throw new Error(data?.authenticateUserWithPassword?.message);
          }
        },
      });
    },
    [loadGetUser, onLoginSuccess]
  );

  const logout = useCallback(() => {
    logoutUser()
      .then((res) => {
        if (res) {
          localStorage.removeItem(AUTH_TOKEN);
          setGraphqlHeaders(undefined);
          client.refetchQueries({
            include: [GET_CURRENT_USER],
          });
          if (onLogoutSuccess) onLogoutSuccess();
        }
      })
      .catch((err) => console.error(err));
  }, [logoutUser, onLogoutSuccess]);

  return { currentUser: currentUserData?.authenticatedItem, login, loginError, logout, loading };
};
