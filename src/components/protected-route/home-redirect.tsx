import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const HomeRedirect: React.FC = () => {
  const { currentUser, loading } = useAuth({});
  const hasCompletedRegistration = true;
  const hasCompletedOnboarding = true;

  if (loading) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/welcome" replace />;
  } else if (!hasCompletedRegistration) {
    return <Navigate to="/registration" replace />;
  } else if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};