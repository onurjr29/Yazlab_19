import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateRoute = () => {
    // Kullanıcı token'ı al
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" />;

    try {
        const decoded = jwt_decode(token); // Token'i çöz
        return decoded ? <Outlet /> : <Navigate to="/login" />;
    } catch (error) {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
