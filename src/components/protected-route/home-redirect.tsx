import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoadingCircle } from "../loading";

export const HomeRedirect: React.FC = () => {
  const { currentUser, loading } = useAuth({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const getRedirectPath = () => {
        if (!currentUser) return "/welcome";
        if (!currentUser.isRegistrationComplete) return "/registration";
        if (!currentUser.isOnboardingComplete) return "/onboarding";
        return "/dashboard";
      };

      navigate(getRedirectPath(), { replace: true });
    }
  }, [currentUser, navigate, loading]);

  return <LoadingCircle />;
};
