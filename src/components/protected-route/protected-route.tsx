import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth({});

  if (loading) {
    return null;
  }

  if (!currentUser || 
    !currentUser.isRegistrationComplete ||
    (!currentUser.isOnboardingComplete && !location.pathname.startsWith("/onboarding"))
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
