import React, { useContext } from 'react';
import { authContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
  const { token } = useContext(authContext);

  // If token is not present, redirect to home
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
