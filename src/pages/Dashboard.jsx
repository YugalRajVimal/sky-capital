import React, { useContext, useEffect, useState } from "react";
import { FaGlobe, FaUserFriends, FaWallet } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { CustomerContext } from "../context/CustomerContext";
import { toast } from "react-toastify";

import {
  FaMoneyBillWave,
  FaUsers,
  FaUserTimes,
  FaBusinessTime,
  FaGift,
  FaCoins,
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaEthereum,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  const { getCustomerProfileDetails } = useContext(CustomerContext);
  const [customerProfileData, setCustomerProfileData] = useState();

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      setCustomerProfileData(data);
    };
    fetchCustomerProfileDetails();
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const walletReports = [
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

  // const incomeCards = [
  //   { title: "Total Income", value: "$0" },
  //   { title: "ROI Income", value: "$0" },
  //   { title: "Refer Income", value: "$0" },
  //   { title: "Refer Bonus Income", value: "$0" },
  //   { title: "Reward Team Income", value: "$0" },
  //   { title: "ROI to Level Income", value: "$0" },
  // ];

  // Grouped Stats
  // const statsSections = [
  //   {
  //     heading: "Transactions",
  //     cards: [
  //       { title: "Total Deposit", value: 0 },
  //       { title: "Total Withdrawal", value: 0 },
  //     ],
  //   },
  //   {
  //     heading: "Active Team",
  //     cards: [
  //       { title: "Direct Team Members", value: 0 },
  //       { title: "Level Team Members (3)", value: 0 },
  //       { title: "Global Team Count", value: 0 },
  //     ],
  //   },
  //   {
  //     heading: "Non Active Team",
  //     cards: [
  //       { title: "Direct Team Members", value: 0 },
  //       { title: "Level Team Members (3)", value: 0 },
  //       { title: "Global Team Count", value: 0 },
  //     ],
  //   },
  //   {
  //     heading: "Rewards",
  //     cards: [
  //       { title: "Direct Bonus", value: 0 },
  //       { title: "Reward Income", value: 0 },
  //       { title: "Trade Income", value: 0 },
  //     ],
  //   },
  // ];

  // Income Cards
  const incomeCards = [
    {
      title: "Total Income",
      value: "$0",
      color: "bg-green-900",
      icon: <FaMoneyBillWave className="text-green-400 h-6 w-6" />,
    },
    {
      title: "ROI Income",
      value: "$0",
      color: "bg-orange-900",
      icon: <FaCoins className="text-orange-400 h-6 w-6" />,
    },
    {
      title: "Refer Income",
      value: "$0",
      color: "bg-purple-900",
      icon: <FaUsers className="text-purple-400 h-6 w-6" />,
    },
    {
      title: "ROI to Level Income",
      value: "$0",
      color: "bg-blue-900",
      icon: <FaChartLine className="text-blue-400 h-6 w-6" />,
    },
    {
      title: "Refer Bonus ",
      value: "$0",
      color: "bg-teal-900",
      icon: <FaGift className="text-teal-400 h-6 w-6" />,
    },
    {
      title: "Reward Team Bonus",
      value: "$0",
      color: "bg-pink-900",
      icon: <FaBusinessTime className="text-pink-400 h-6 w-6" />,
    },
  ];

  // Stats Section (grouped & styled)
  const statsSections = [
    {
      heading: "Transactions",
      cards: [
        {
          title: "Total Deposit",
          value: 0,
          color: "bg-green-900",
          icon: <FaArrowCircleDown className="text-green-400 h-6 w-6" />,
        },
        {
          title: "Total Withdrawal",
          value: 0,
          color: "bg-purple-900",
          icon: <FaArrowCircleUp className="text-purple-400 h-6 w-6" />,
        },
      ],
    },

    // {
    //   heading: "Rewards",
    //   cards: [
    //     {
    //       title: "Refer Bonus",
    //       value: 0,
    //       color: "bg-gray-900",
    //       icon: <FaGift className="text-gray-400 h-6 w-6" />,
    //     },
    //     {
    //       title: "Reward Team Bonus",
    //       value: 0,
    //       color: "bg-green-900",
    //       icon: <FaCoins className="text-green-400 h-6 w-6" />,
    //     },
    //   ],
    // },
  ];

  const teamsSection = [
    {
      heading: "Active Team",
      theme: "text-indigo-400",
      cards: [
        {
          title: "Direct Team Members",
          value: 0,
          color: "bg-indigo-900",
          icon: <FaUsers className="h-6 w-6" />,
        },
        {
          title: "Level Team Members (3)",
          value: 0,
          color: "bg-green-900",
          icon: <FaUserFriends className="h-6 w-6" />,
        },
        {
          title: "Global Team Count",
          value: 0,
          color: "bg-blue-900",
          icon: <FaGlobe className="h-6 w-6" />,
        },
      ],
    },
    {
      heading: "Non Active Team",
      theme: "text-yellow-400",
      cards: [
        {
          title: "Direct Team Members",
          value: 0,
          color: "bg-yellow-900",
          icon: <FaUsers className="h-6 w-6" />,
        },
        {
          title: "Level Team Members (3)",
          value: 0,
          color: "bg-orange-900",
          icon: <FaUserFriends className="h-6 w-6" />,
        },
        {
          title: "Global Team Count",
          value: 0,
          color: "bg-red-900",
          icon: <FaGlobe className="h-6 w-6" />,
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full px-4 py-6 overflow-y-auto text-white space-y-8">
      {/* Wallet Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {walletReports.map((wallet, idx) => (
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

      {/* Profile & Referral Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Profile & Referral</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile */}
          <div className="w-full md:w-1/2 p-5 rounded-lg flex justify-start gap-4 items-center shadow-lg bg-gradient-to-br from-[#1e2550] to-[#14172b] border border-gray-700 hover:scale-[1.02] transition">
            <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center text-black font-bold">
              {customerProfileData?.name?.[0] || "U"}
            </div>
            <div>
              <div className="text-xl font-bold">
                {customerProfileData?.name || "User"}
              </div>
              <div className="text-sm text-gray-300">
                {customerProfileData?.email}
              </div>
            </div>
          </div>

          {/* Referral */}
          <div className="w-full md:w-1/2 p-5 rounded-lg flex md:flex-row flex-col gap-4 justify-between md:items-center shadow-lg bg-gradient-to-br from-[#1e2550] to-[#14172b] border border-gray-700 hover:scale-[1.02] transition">
            <div>
              <div className="font-semibold">Your Referral Link</div>
              <div className="text-sm text-gray-300 truncate max-w-[200px]">
                {customerProfileData?.referalLink ||
                  "https://example.com/ref/12345"}
              </div>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  customerProfileData?.referalLink ||
                    "https://example.com/ref/12345"
                )
              }
              className="bg-blue-500  px-2 py-1 md:px-4 md:py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <IoCopy /> Copy
            </button>
          </div>
        </div>
      </div>

      {/* Income Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Income</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {incomeCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-lg flex justify-between items-center shadow-lg bg-gradient-to-br from-[#1e2550] to-[#14172b] border border-gray-700 hover:scale-[1.02] transition`}
            >
              <div className="flex items-center gap-3">
                {card.icon}
                <span className="text-lg font-semibold">{card.title}</span>
              </div>
              <div className="text-2xl font-bold mt-2">{card.value}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Stats Section */}

      <div>
        {/* <h2 className="text-xl font-bold mb-6">Stats</h2> */}
        <div className="space-y-8">
          {statsSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-3">{section.heading}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.cards.map((stat, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-lg flex justify-between items-center shadow-lg bg-gradient-to-br from-[#1e2550] to-[#14172b] border border-gray-700 hover:scale-[1.02] transition`}
                  >
                    <div className="flex items-center gap-3">
                      {stat.icon}
                      <span className="text-sm text-gray-200">
                        {stat.title}
                      </span>
                    </div>
                    <div className="text-xl font-bold mt-2">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section  */}
      <div>
        {/* <h2 className="text-xl font-bold mb-6">Stats</h2> */}
        <div className="space-y-10">
          {teamsSection.map((section, idx) => (
            <div key={idx}>
              <h3 className={`text-lg font-semibold mb-4 `}>
                {section.heading}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.cards.map((stat, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-lg flex justify-between items-center shadow-lg bg-gradient-to-br from-[#1e2550] to-[#14172b] border border-gray-700 hover:scale-[1.02] transition`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {/* Icon Badge */}
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.color} `}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-sm text-gray-300">{stat.title}</div>
                    </div>

                    <div className="text-2xl font-bold mt-1">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
