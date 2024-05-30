import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return authService.isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
