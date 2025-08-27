import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const {
    checkAuth,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(AuthContext);

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const isValid = await checkAuth(); // call context's checkAuth
      setIsAuthenticated(isValid);
      setIsAuthChecked(true);
    };
    verifyAuth();
  }, [checkAuth, setIsAuthenticated]);

  if (!isAuthChecked) {
    return <div>Loading...</div>; // Optional: replace with a spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
