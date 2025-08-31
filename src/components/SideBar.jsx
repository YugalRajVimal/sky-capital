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
  FaQuestionCircle,
  FaWallet,
  FaClipboardList,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const { sidebarOpen, isSidebarOpen } = useContext(AuthContext);
  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  console.log("context is ", sidebarOpen);

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, link: "/" },
    {
      label: "Investment",
      icon: <FaMoneyCheckAlt />,
      link: "/purchase-subcription",
    },
    // {
    //   label: "Investment History",
    //   icon: <FaLayerGroup />,
    //   link: "/purchase-subcription-histroy",
    // },
    {
      label: "Wallets & Balance",
      icon: <FaWallet />,
      link: "/wallets",
    },
    // {
    //   label: "Transfer To Main Wallet",
    //   icon: <FaMoneyCheckAlt />,
    //   link: "/transfer-to-main-wallet",
    // },

    { label: "Referral", icon: <FaShareAlt />, link: "/referral" },
    {
      label: "Profile",
      icon: <FaUserCog />,
      arrow: true,
      subItems: [
        { name: "Profile", link: "/profile" },
        { name: "Connect Wallet", link: "/updatebank" },
        { name: "Change Password", link: "/changepassword" },
      ],
    },
    {
      label: "Team List",
      icon: <FaUsers />,
      arrow: true,
      subItems: [
        // { name: "Global Active Team", link: "/global-team" },
        // { name: "Global Non Active Team", link: "/non-active-global-team" },
        { name: "Direct Active Team", link: "/direct-team" },
        { name: "Direct Non Active Team", link: "/non-active-direct-team" },
        { name: "Level Active Team", link: "/level-team" },
        { name: "Level Non Active Team", link: "/non-active-level-team" },

        // { name: "Single Leg", link: "/direct-team" },
      ],
    },
    // {
    //   label: "Topup",
    //   icon: <FaBan className="text-red-500" />,
    //   arrow: true,
    //   subItems: [
    //     { name: "Activate Package", link: "/activate-package" },
    //     { name: "Activation History", link: "/activation-history" },
    //   ],
    // },
    {
      label: "Income Details",
      icon: <FaUniversity />,
      arrow: true,
      subItems: [
        // { name: "ROI Income", link: "/roi-income" },
        { name: "Refer Income", link: "/refer-income" },
        { name: "Refer Bonus", link: "/refer-bonus" },
        // { name: "ROI to Level Income", link: "/roi-to-level-income" },
        { name: "Reward Team Bussiness", link: "/reward-team-bussiness" },
      ],
    },
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
    {
      label: "Withdraw & Transaction",
      icon: <FaMoneyCheckAlt />,
      arrow: true,
      subItems: [
        { name: "Withdraw", link: "/withdraw" },
        { name: "Withdraw History", link: "/withdraw-history" },
      ],
    },
    {
      label: "Deposite User",
      icon: <FaMoneyCheckAlt />,
      arrow: true,
      subItems: [
        { name: "Deposite User", link: "/deposite-to-user" },
        { name: "Deposite User History", link: "/deposite-to-user-history" },
      ],
    },
    // {
    //   label: "All Logs",
    //   icon: <FaClipboardList className="text-white" />,
    //   link: "/all-logs",
    // },
    {
      label: "Help",
      icon: <FaQuestionCircle className="text-white" />,
      link: "/help",
    },
    // { label: "Message", icon: <FaEnvelope />, link: "/message" },
    {
      label: "Logout",
      icon: <FaPowerOff className="text-red-900" />,
      link: "/logout",
    },
  ];

  return (
    <div className="max-h-[90vh] h-[90vh] bg-[#20265d] overflow-y-auto shadow-md">
      <div className="flex  flex-col relative  ">
        <div
          className={`${sidebarOpen ? "w-0 " : "w-60"}  ${
            sidebarOpen ? "p-0" : "p-4"
          }  space-y-1  transition-all duration-[0.4s]`}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.link;
            return (
              <div key={index}>
                <div
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer
                ${isActive ? " text-white font-semibold" : "hover:bg-black"}
              `}
                  onClick={() => item.subItems && toggleMenu(item.label)}
                >
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="flex text-white items-center gap-2 w-full"
                      onClick={() => isSidebarOpen(true)}
                    >
                      <span className="text-white text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <div className="flex text-white items-center gap-2">
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
                              : "text-white hover:bg-black hover:text-white"
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
      <div className="h-[200px]"></div>
    </div>
  );
};

export default Sidebar;
