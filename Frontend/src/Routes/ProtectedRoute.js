import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ element, requiredRoles }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // Decode the JWT token to get user information, including roles
  const decodedToken = jwtDecode(token);

  // Check if the user has the required roles to access the route
  const hasRequiredRoles = requiredRoles.some(role => decodedToken[role]);

  if (!hasRequiredRoles) {
    // Redirect to unauthorized page or show an error message
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected route if the user is authenticated and has the required roles
  return <Route element={element} />;
};

export default ProtectedRoute;
