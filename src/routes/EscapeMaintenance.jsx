import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";

const EscapeMaintenanceRoute = ({ children }) => {
  const {
    checkSiteMaintenanceStatus,
    setIsSiteOnMaintenance,
    isSiteOnMaintenance,
  } = useContext(CustomerContext);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkMaintenance = async () => {
      const status = await checkSiteMaintenanceStatus();
      console.log(status);
      setIsSiteOnMaintenance(status);
      setChecked(true);
      console.log(status);
    };

    checkMaintenance();
  }, []);

  if (!checked) {
    return <div>Loading...</div>; // Or a spinner component
  }

  //   if (!isSiteOnMaintenance) {
  //     return <Navigate to="/profile" replace />;
  //   }

  // Allow Admins even when under maintenance
  if (!isSiteOnMaintenance) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default EscapeMaintenanceRoute;
