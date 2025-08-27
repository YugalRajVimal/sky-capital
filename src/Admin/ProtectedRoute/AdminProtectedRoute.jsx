// src/routes/ProtectedRoute.js
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../AdminContext/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("admin-token");
  const { setIsAdminAuthenticated } = useContext(AdminAuthContext);
  useEffect(() => {
    if (isAdminAuthenticated) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  return isAdminAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default AdminProtectedRoute;
