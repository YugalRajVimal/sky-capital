import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
   
    logout();
    navigate("/");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
