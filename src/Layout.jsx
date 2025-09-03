import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Navbar from "./components/Navbar";
import { AdminContext } from "./Admin/AdminContext/AdminContext";
import { FaBullhorn } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CustomerContext } from "./context/CustomerContext";

const Layout = ({ isLoginPage }) => {
  const { getNotification } = useContext(AdminContext);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      const data = await getNotification();
      if (data?.notification) {
        setNotificationText(data.notification);
        setShowNotification(true);

        // Only show close button after 5 seconds (no auto-close)
        setTimeout(() => {
          setShowCloseButton(true);
        }, 5000);
      }
    };

    fetchNotification();
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
    setShowCloseButton(false);
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden fixed top-0 left-0">
      {/* Notification Pop-Up */}
      {showNotification && (
        <div className="fixed h-screen w-screen md:h-fit md:w-fit flex justify-center items-center top-0 right-0 md:right-0 md:top-6 md:right-6 z-50 bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] text-white px-2  py-2 md:rounded-xl shadow-2xl animate-fade-in-out  md:max-w-[350px]">
          <div className="flex items-start justify-between gap-4 relative w-full md:w-auto">
            <div className="flex flex-col w-full md:w-auto">
              <div className="flex justify-between w-full md:w-auto">
                <p className="text-sm mb-1">🌎 3X Future</p>
                {showCloseButton && (
                  <button
                    className="absolute top-0 right-0 text-white hover:text-gray-300 text-xl"
                    onClick={handleCloseNotification}
                  >
                    <IoMdClose />
                  </button>
                )}
              </div>

              <p className="font-semibold text-lg flex gap-2 items-center">
                <FaBullhorn /> Notification
              </p>
              <p className="text-sm bg-[#030626] text-gray-100 p-2 min-w-[250px] rounded-md mt-1 leading-snug whitespace-pre-wrap break-words pr-4">
                {notificationText}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="h-[10vh]">{!isLoginPage && <Navbar />}</div>

      <div
        className={`flex justify-between items-center bg-gradient-to-tr from-[#163289] to-[#44abf9] ${
          isLoginPage ? "h-[100vh]" : "h-[90vh]"
        }`}
      >
        <div className="h-full">{!isLoginPage && <Sidebar />}</div>
        <div
          className={`flex h-full w-full justify-start bg-black items-start px-2 pb-6`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
