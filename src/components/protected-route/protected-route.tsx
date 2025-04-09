import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoadingCircle } from "../loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingCircle />;
  }

  const isAuthenticated = Boolean(currentUser);
  const isRegistered = currentUser?.isRegistrationComplete;
  const isOnboarded = currentUser?.isOnboardingComplete;
  const isOnboardingRoute = location.pathname.startsWith("/onboarding");

  // Redirect to home if not authenticated or registration incomplete
  if (!isAuthenticated || !isRegistered) {
    return <Navigate to="/" replace />;
  }

  // Allow access to onboarding routes if onboarding is incomplete
  if (!isOnboarded && !isOnboardingRoute) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
