// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from './Loader'; // Assume you have a Loader component

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user } = useAuth();
  const isLoading = false; // You might have a loading state for initial auth check

  if (isLoading) {
    return <Loader />; // Show a loader while checking auth status
  }

  if (!user) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && (!user || !user.isAdmin)) {
    // If adminOnly and user is not an admin, redirect to a non-admin page or show unauthorized
    return <Navigate to="/" replace />; // Or to a specific unauthorized page
  }

  // If authenticated and authorized, render the child routes/components
  return <Outlet />;
};

export default ProtectedRoute;