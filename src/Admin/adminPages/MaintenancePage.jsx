import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../AdminContext/AdminContext";
import { FaTools } from "react-icons/fa";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

const MaintenancePage = () => {
  const { toggleSiteMaintenance, isSiteOnMaintenance } =
    useContext(AdminContext);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMaintenance = async () => {
      const maintenanceStatus = await isSiteOnMaintenance();
      setIsMaintenance(maintenanceStatus);
      setLoading(false);
    };
    checkMaintenance();
  }, [isSiteOnMaintenance]);

  const handleToggleMaintenance = async () => {
    setLoading(true);
    await toggleSiteMaintenance();
    const updatedStatus = await isSiteOnMaintenance(); // Refresh status
    setIsMaintenance(updatedStatus);
    setLoading(false);
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center transition-all duration-300">
        <div className="flex justify-center mb-4 text-blue-600 text-4xl">
          <FaTools />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Maintenance Mode
        </h2>
        <p className="text-gray-600 mb-6">
          The site is currently{" "}
          <span
            className={`font-semibold ${
              isMaintenance ? "text-red-600" : "text-green-600"
            }`}
          >
            {isMaintenance ? "Enabled" : "Disabled"}
          </span>
        </p>
        <button
          onClick={handleToggleMaintenance}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${
            isMaintenance
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isMaintenance ? (
            <>
              <MdToggleOff className="text-2xl" /> Disable Maintenance
            </>
          ) : (
            <>
              <MdToggleOn className="text-2xl" /> Enable Maintenance
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;
