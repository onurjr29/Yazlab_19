import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token); // Token decode edildi
    return decoded ? <Outlet /> : <Navigate to="/login" />;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
