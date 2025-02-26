import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoadingCircle } from "../loading";

export const HomeRedirect: React.FC = () => {
  const { currentUser, loading } = useAuth({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!currentUser) {
      console.log("Redirecting to /welcome");
      navigate("/welcome", { replace: true });
    } else if (!currentUser.isRegistrationComplete) {
      navigate("/registration", { replace: true });
    } else if (!currentUser.isOnboardingComplete) {
      navigate("/onboarding", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate, loading]);

  if (currentUser) {
    console.log("hello");
    return <LoadingCircle />;
  }

  return <LoadingCircle />
};