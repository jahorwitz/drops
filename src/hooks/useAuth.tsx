import { useCallback, useMemo, useState } from "react";
import { AUTH_TOKEN } from "../store";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphql/mutations/users";
import { User } from "../__generated__/graphql";

interface UseAuthProps {
  onLoginSuccess?: (data: { session: User }) => void;
  onLogoutSuccess?: () => void;
}

export const useAuth = ({
  onLoginSuccess /*, onLogoutSuccess */,
}: UseAuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [loadGetUser, { error: loginError }] = useMutation(USER_LOGIN);

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      loadGetUser({
        variables: { email: email, password: password },
        onCompleted: (data) => {
          if (data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordSuccess') {
            localStorage.setItem(AUTH_TOKEN, data.authenticateUserWithPassword.sessionToken);
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
    // TODO: Implement logout logic
    // 1) Call API to end the session (see endSession mutation in graphql schema)
    // 2) If successful:
    //      - remove token from localStorage using AUTH_TOKEN key from store/apollo-client.tsx
    //      - set current user to undefined
    //      - call onLogoutSuccess callback if provided
  }, []);

  const isLoggedIn = useMemo(() => !!currentUser, [currentUser]);

  return { currentUser, isLoggedIn, login, loginError, logout };
};
