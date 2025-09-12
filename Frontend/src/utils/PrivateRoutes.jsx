// frontend/src/utils/PrivateRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, roles }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      // token expired
      localStorage.removeItem("auth");
      return <Navigate to="/login" replace />;
    }
    if (roles && !roles.includes(decoded.role)) {
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    localStorage.removeItem("auth");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
