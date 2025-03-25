import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    id: string;
    role: string;
    exp: number;
}

const AdminRoute = () => {
    const token = localStorage.getItem("token");
  
    if (!token) return <Navigate to="/login" />;
  
    try {
      const decoded = jwtDecode<DecodedToken>(token); // Token'i çöz
  
      if (decoded.role === "admin" || decoded.role === "jury") {
        return <Outlet />; // sadece alt route'ları göster
      } else {
        return <Navigate to="/" />;
      }
    } catch (error) {
      return <Navigate to="/login" />;
    }
  };
  
export default AdminRoute;
