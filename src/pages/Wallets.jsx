import React, { useContext, useEffect, useState } from "react";
import {
  FaUsers,
  FaUserAlt,
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaUserCheck,
  FaRegCalendarAlt,
  FaHandshake,
  FaLayerGroup,
  FaCrown,
  FaMoneyBillWave,
  FaGlobe,
  FaUserFriends,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { FcGlobe } from "react-icons/fc";
import { SiLevelsdotfyi } from "react-icons/si";
import { PiTreeStructureFill } from "react-icons/pi";
import { TbBinaryTreeFilled } from "react-icons/tb";
import { FaWallet as FaWalletAlt } from "react-icons/fa";

import { IoCopy } from "react-icons/io5";
import { CustomerContext } from "../context/CustomerContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Wallets = () => {
  const { getCustomerProfileDetails } = useContext(CustomerContext);
  const [customerProfileData, setCustomerProfileData] = useState();

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      setCustomerProfileData(data);
      return;
    };

    fetchCustomerProfileDetails();
  }, []);

  const incomeReports = [
    {
      title: "ROI Wallet",
      value: `$${customerProfileData?.totalEarning?.toFixed(2) || "0.00"}`,
      icon: <FaWallet className="text-blue-500 h-6 w-6" />,
    },
    {
      title: "Main Wallet",
      value: `$${customerProfileData?.mainWalletBalance?.toFixed(2) || "0.00"}`,
      icon: <FaWallet className="text-green-500 h-6 w-6" />,
    },
    {
      title: "Pending Wallet",
      value: `$${customerProfileData?.walletBalance?.toFixed(2) || "0.00"}`,
      icon: <FaWallet className="text-red-500 h-6 w-6" />,
    },
  ];

  return (
    <div className=" h-[90vh] w-full grow-1 px-2 mb-4 text-white overflow-y-auto rounded-md flex justify-center ">
      <div className="overflow-y-auto pb-10 w-full">
        {/* Income Reports */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-4 mt-4">Wallets & Balance</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {incomeReports.map((wallet, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg flex justify-between items-center shadow-lg bg-gradient-to-br from-[#1e2550] to-[#14172b] border border-gray-700 hover:scale-[1.02] transition"
                >
                  <div className="flex items-center gap-3">
                    {wallet.icon}
                    <span className="font-semibold">{wallet.title}</span>
                  </div>
                  <div className="font-bold">{wallet.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔷 Reusable Card
const Card = ({
  title,
  subtitle,
  icon,
  withButtons,
  withButtons2,
  linkButtonText,
  activeLink,
  nonActiveLink,
  link,
}) => (
  <div
    className={`bg-[#20265d] text-white px-4 py-6 w-full shadow rounded-md relative flex flex-col  ${
      withButtons ? "items-between" : "items-center"
    } justify-center gap-2 md:gap-6 overflow-hidden`}
  >
    <div className={`flex flex-col gap-6 justify-between items-between w-full`}>
      <div className="flex gap-2 md:gap-6 items-center">
        <div className=" p-1 h-10 w-10 rounded ">{icon}</div>
        <div className="text-2xl text-white font-bold tracking-wide">
          {subtitle}
        </div>
      </div>

      <div className="text-2xl  text-center md:text-2xl font-bold break-words">
        {title}
      </div>
    </div>
    {/* {withButtons2 && (
      <div className="flex gap-2">
        <Link to={nonActiveLink} className="px-4 py-1 bg-green-500 rounded-md">
          Widhraw
        </Link>
        <Link to={activeLink} className="px-4 py-1 bg-red-500 rounded-md">
          Widhraw History
        </Link>
      </div>
    )} */}
    {withButtons && (
      <div className="flex gap-2">
        <Link
          to={activeLink}
          className="px-2 py-[0.5px] bg-green-500 rounded-md"
        >
          Active
        </Link>
        <Link
          to={nonActiveLink}
          className="px-2 py-[0.5px] bg-red-500 rounded-md"
        >
          Non Active
        </Link>
      </div>
    )}
    {/* {link && (
      <div className="flex gap-2">
        <Link to={link} className="px-2 py-[0.5px] bg-green-500 rounded-md">
          Income Detailed List
        </Link>
      </div>
    )} */}
  </div>
);

// 🔷 Reusable Action Button
const ActionButton = ({ icon, label, color }) => (
  <button
    className={` px-2 py-1 md:px-4 md:py-2 rounded-md flex items-center gap-2 ${color}`}
  >
    {icon}
    {label}
  </button>
);

export default Wallets;
