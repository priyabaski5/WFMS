import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../utils/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !authService.hasRole(requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;