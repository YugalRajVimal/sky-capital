import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import SidePanel from "./AdminSidePanel";
import DashboardCard from "./DashboardCard";
import AdminNavbar from "./AdminComponents/AdminNavbar";
import { AdminAuthContext } from "./AdminContext/AdminAuthContext";

const AdminLayout = () => {
  const { isAdminAuthenticated } = useContext(AdminAuthContext);
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {isAdminAuthenticated && (
        <div className="h-[10vh]">
          <AdminNavbar />
        </div>
      )}

      <div
        className={`w-[100%] bg-gradient-to-tr from-[#163289] to-[#44abf9] flex ${
          isAdminAuthenticated ? "h-[90vh]" : "h-[100vh]"
        }`}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden shrink-0">
          <SidePanel />
        </div>
        <div className="w-full h-full overflow-y-auto overflow-x-hidden transition-all duration-[0.4s] p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
