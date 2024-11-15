import React from 'react';
import {  Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/welcome" replace />
  );
};

export default ProtectedRoute;