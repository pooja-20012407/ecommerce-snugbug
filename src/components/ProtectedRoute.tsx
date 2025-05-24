import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const getUserRoleFromToken = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_type || null;
  } catch (error) {
    return null;
  }
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  blockSellerOnPaths?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, blockSellerOnPaths = [] }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const user_type = getUserRoleFromToken(token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  console.log("User role from token:", user_type);
 
  if (
    user_type === 'seller' &&
    blockSellerOnPaths.some((path) => location.pathname.startsWith(path))
  ) {

    return <Navigate to="/not-allowed" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
