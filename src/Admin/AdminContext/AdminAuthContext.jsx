// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [sidebarOpen, isSidebarOpen] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const forgetPassword = async (credentials) => {
    console.log(credentials);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/reset-password`,
        credentials
      );
      console.log(response);
      toast.success(response?.data?.message);
      return true;
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
      return false;
    }
  };

  const otpVerification = async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/verify-account`,
        credentials
      );
      console.log(response);
      toast.success(response?.data?.message);
      localStorage.setItem("admin-token", response?.data?.token);
      setIsAdminAuthenticated(true);
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/login`,
        {
          email: credentials?.username,
          password: credentials?.password,
        }
      );
      console.log(response);
      if (response?.status === 200) {
        toast.success("Login successfully");
        setIsAdminAuthenticated(true);
        localStorage.setItem("admin-token", response?.data?.token);
        return true;
      } else if (response?.status === 401) {
        toast.error("Invalid credentials. Please try again.");
        return false;
      } else {
        toast.error("Login failed. Please try again.");
        return false;
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
      return false;
    }
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("admin-token");
    toast.error("Logout successfully");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        setIsAdminAuthenticated,
        isAdminAuthenticated,
        login,
        logout,
        otpVerification,
        forgetPassword,
        sidebarOpen,
        isSidebarOpen,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAuth = () => useContext(AdminAuthContext);
