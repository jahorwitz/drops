import { useCallback, useEffect, useMemo, useState } from "react";
import { AUTH_TOKEN, setGraphqlHeaders } from "../store";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphql/mutations/users";

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

export const useAuth = ({
  onLoginSuccess /*, onLogoutSuccess */,
}: UseAuthProps) => {
  const [currentUser, setCurrentUser] = useState<UserSessionData | undefined>();
  const [loadGetUser] = useMutation(USER_LOGIN);

  const login = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      loadGetUser({
        variables: { email: email, password: password },
      })
        .then((res) => {
          const result = res.data.authenticateUserWithPassword;
          if (result.message)
            return alert(JSON.stringify(result.message, null, 2));
          const session = {
            id: result.item.id,
            name: result.item.name,
            email: result.item.email,
            token: result.sessionToken,
          };
          setCurrentUser(session);
          localStorage.setItem(AUTH_TOKEN, session.token);
          if (onLoginSuccess) onLoginSuccess({ session });
        })
        .catch((err) => console.error(err));
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

  useEffect(() => {
    setGraphqlHeaders(currentUser?.token);
  }, [currentUser]);

  return { currentUser, isLoggedIn, login, logout };
};
