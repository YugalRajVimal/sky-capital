import React, { useContext, useState } from "react";
import {
  FaHome,
  FaUserCog,
  FaUsers,
  FaBan,
  FaUniversity,
  FaTrophy,
  FaLayerGroup,
  FaMoneyCheckAlt,
  FaEnvelope,
  FaPowerOff,
  FaShareAlt,
  FaArrowRight,
  FaUser,
  FaEdit,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AdminAuthContext } from "./AdminContext/AdminAuthContext";

const SidePanel = () => {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const { sidebarOpen, isSidebarOpen, isAdminAuthenticated } =
    useContext(AdminAuthContext);
  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  console.log("context is ", sidebarOpen);

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, link: "/admin" },
    {
      label: "Notification",
      icon: <FaEnvelope />,
      link: "/admin/add-get-del-notifications",
    },
    {
      label: "Maintenance",
      icon: <FaBan />,
      link: "/admin/maintenance-page",
    },

    // { label: "Company TurnOver",
    //   icon: <FaMoneyCheckAlt />,
    //   link: "/admin/company-turnOver",
    // },
    // { label: "Subscription Amount", icon: <FaShareAlt />, link: "/admin/subscription-amount" },

    // {
    //   label: "Royalty Achiever",
    //   icon: <FaUserCog />,
    //   arrow: true,
    //   subItems: [
    //     {
    //       name: "Week Royalty Achiever",
    //       link: "/admin/royalty-achiever/weekly-royalty-achiver",
    //     },
    //     {
    //       name: "Ten Days Royalty Achiever",
    //       link: "/admin/royalty-achiever/ten-days-royalty-achiver",
    //     },
    //   ],
    // },
    // {
    //   label: "Admin Profile Details",
    //   icon: <FaUsers />,
    //   link: "/admin/admin-profile-details",
    // },
    {
      label: "Update Payment Link",
      icon: <FaEdit />,
      link: "/admin/update-payment-link",
    },

    // {
    //   label: "Reset Password",
    //   icon: <FaUsers />,
    //   link: "/admin/reset-password",
    // },

    {
      label: "All Users",
      icon: <FaUser />,
      arrow: true,
      subItems: [
        { name: "Subscribed User", link: "/admin/users/subscribed-user" },
        { name: "All User", link: "/admin/users/all-users" },
        { name: "Edit User", link: "/admin/users/edit-users" },

        { name: "Blocked User", link: "/admin/users/blocked-users" },
      ],
    },
    // {
    //   label: "Royalty Achievers",
    //   icon: <FaUsers />,
    //   link: "/admin/royalty-achievers",
    // },

    {
      label: "Approve Pending Subscriptions",
      icon: <FaUsers />,
      link: "/admin/approve-pending-subscription",
    },
    {
      label: "Approved Subscriptions",
      icon: <FaUsers />,
      link: "/admin/approved-subscription",
    },

    {
      label: "Approve Withdraw",
      icon: <FaUsers />,
      link: "/admin/approve-withdraw",
    },

    // {
    //   label: "Income Details",
    //   icon: <FaUniversity />,
    //   arrow: true,
    //   subItems: [
    //     { name: "Direct Income", link: "/direct-income" },
    //     { name: "Level Income", link: "/refer-income" },
    //     { name: "World Leg Income", link: "/world-leg-income" },
    //     { name: "Royalty Income", link: "/royalty-income" },
    //   ],
    // },
    // { label: "Single-Leg Team", icon: <FaTrophy />, link: "/single-leg" },
    // {
    //   label: "Activation Fund",
    //   icon: <FaLayerGroup />,
    //   link: "/activationfund",
    //   arrow: true,
    //   subItems: [
    //     { name: "Fund Request", link: "/fund-request" },
    //     { name: "Fund Transfer", link: "/fund-transfer" },
    //     { name: "Fund History", link: "/fund-history" },
    //   ],
    // },
    // {
    //   label: "Withdraw & Transaction",
    //   icon: <FaMoneyCheckAlt />,
    //   arrow: true,
    //   subItems: [
    //     { name: "Withdraw", link: "/withdraw" },
    //     { name: "Withdraw History", link: "/withdraw-history" },
    //   ],
    // },
    // { label: "Message", icon: <FaEnvelope />, link: "/message" },
    // { label: "Logout", icon: <FaPowerOff />, link: "/admin/logout" },
  ];

  return (
    <div
      className={`flex max-h-[90vh] w-full flex-col relative ${
        !isAdminAuthenticated && "hidden"
      }`}
    >
      {/* <button
        className={`m-2 p-2  text-white rounded-md flex justify-center items-center   z-50 bg-[#050a1e]  ${
          sidebarOpen
            ? "absolute left-[2px]  bg-blue-900"
            : " left-[2px] bg-red-900"
        }`}
        onClick={() => isSidebarOpen((prev) => !prev)}
      >
        <span
          className={`inline-block transition-transform duration-300 transform whitespace-nowrap `}
        >
          {sidebarOpen ? <FaArrowRight /> : "Close Sidebar"}
        </span>
      </button> */}
      <div
        className={`${
          sidebarOpen ? "w-0 " : "w-[90vw] md:w-full"
        }  h-[92vh] overflow-y-auto hide-scrollbar ${
          sidebarOpen ? "p-0" : "p-4"
        } shadow-md space-y-1 bg-[#20265d] transition-all duration-[0.4s]`}
      >
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.link;
          return (
            <div key={index}>
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer
                ${
                  isActive
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-black"
                }
              `}
                onClick={() => item.subItems && toggleMenu(item.label)}
              >
                {item.link ? (
                  <Link
                    to={item.link}
                    className="flex items-center gap-2 text-white w-full"
                    onClick={() => isSidebarOpen(true)}
                  >
                    <span className="text-white text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <div className="flex items-center text-white gap-2">
                    <span className="text-white text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                )}

                {item.arrow &&
                  (item.subItems ? (
                    openMenus[item.label] ? (
                      <IoIosArrowDown className="text-white" />
                    ) : (
                      <IoIosArrowForward className="text-white" />
                    )
                  ) : (
                    <IoIosArrowForward className="text-white" />
                  ))}
              </div>

              {/* Submenu for dropdowns */}
              {item.subItems && openMenus[item.label] && (
                <div className="ml-8 space-y-1">
                  {item.subItems.map((subItem, subIndex) => {
                    const isSubActive = location.pathname === subItem.link;
                    return (
                      <Link
                        to={subItem.link}
                        key={subIndex}
                        className={`block text-sm p-2 rounded cursor-pointer ${
                          isSubActive
                            ? "bg-black text-white font-semibold"
                            : "text-white hover:bg-black"
                        }`}
                        onClick={() => isSidebarOpen(true)}
                      >
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidePanel;
