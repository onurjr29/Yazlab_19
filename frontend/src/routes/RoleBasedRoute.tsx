// routes/RoleBasedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/auth/login" replace />;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const userRole = decoded.role;

    if (allowedRoles.includes(userRole)) {
      return <Outlet />;
    } else {
      return <Navigate to="/yetkisiz" replace />;
    }
  } catch (error) {
    return <Navigate to="/auth/login" replace />;
  }
};

export default RoleBasedRoute;
