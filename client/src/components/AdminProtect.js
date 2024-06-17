import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtect = ({ children, isAuthenticated, role }) => {
  if (!isAuthenticated || role !== "admin")
    return <Navigate to={!isAuthenticated ? "/" : "/home"} />;
  return children;
};

export default AdminProtect;
