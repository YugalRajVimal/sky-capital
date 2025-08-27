import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AdminAuthContext } from "../../AdminContext/AdminAuthContext";

const AdminLogout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AdminAuthContext);

  useEffect(() => {
    logout();
    navigate("/admin/login");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default AdminLogout;
