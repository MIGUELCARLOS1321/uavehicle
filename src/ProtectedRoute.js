// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ element }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the current authenticated user

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
