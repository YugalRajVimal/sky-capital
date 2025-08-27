// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sidebarOpen, isSidebarOpen] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default: false

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/check-auth`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        setIsAuthenticated(true);
        return true;
      } else if (response.status == 503) {
        setIsAuthenticated(false);
        return false;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  const signup = async (credentials) => {
    console.log(credentials);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/signup`,
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

  const forgetPassword = async (credentials) => {
    console.log(credentials);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/reset-password`,
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
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/verify-account`,
        credentials
      );
      console.log(response);
      toast.success(response?.data?.message);
      localStorage.setItem("token", response?.data?.token);
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/login`,
        {
          email: credentials?.username,
          password: credentials?.password,
        }
      );
      console.log(response);
      if (response?.status === 200) {
        toast.success("Login successfully");
        localStorage.setItem("token", response?.data?.token);
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
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.error("Logout successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        checkAuth,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        signup,
        isSidebarOpen,
        sidebarOpen,
        otpVerification,
        forgetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
