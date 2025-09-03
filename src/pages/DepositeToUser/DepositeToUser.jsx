import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { toast } from "react-toastify";

const DepositeToUser = () => {
  const { transferAmount, fetchUserName, getCustomerProfileDetails } =
    useContext(CustomerContext);

  const [customerProfileData, setCustomerProfileData] = useState();
  const [userName, setUserName] = useState("");
  const [remark, setRemark] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      setCustomerProfileData(data);
    };

    fetchCustomerProfileDetails();
  }, []);

  useEffect(() => {
    if (userId) {
      const handleFetchUserName = async (userId) => {
        const data = await fetchUserName(userId);
        setUserName(data?.name || "");
        setUserEmail(data?.email || "");
      };
      handleFetchUserName(userId);
    }
  }, [userId]);

  const getPlanForAmount = (investmentAmount) => {
    const numAmount = parseFloat(investmentAmount);
    if (isNaN(numAmount) || numAmount <= 0) return null;

    if (numAmount >= 100 && numAmount <= 999) {
      return { name: "Plan 1", roi: "0.40% / day" };
    }
    if (numAmount >= 1000 && numAmount <= 4999) {
      return { name: "Plan 2", roi: "0.50% / day" };
    }
    if (numAmount >= 5000) {
      return { name: "Plan 3", roi: "0.60% / day" };
    }
    return { name: "No Plan", roi: "Min deposit $100 required" };
  };

  const plan = getPlanForAmount(amount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || userId.trim() === "") {
      toast.error("Please enter a User ID.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid deposit amount greater than zero.");
      return;
    }

    await transferAmount(userId, parsedAmount, remark);
  };

  return (
    <div className="p-4 w-full md:w-1/2 mx-auto">
      <div className="bg-[#030626] shadow rounded-xl overflow-hidden">
        {/* Header */}
        <div className=" px-6 py-3 text-lg font-bold text-white">
          Deposit for User
        </div>

        {/* Balance Amount */}
        <div className="px-6 py-4 border-b text-white font-medium">
          Commission Balance Amount:{" "}
          <span className="font-bold text-white">
            ${customerProfileData?.mainWallet?.toFixed(2)}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* User ID */}
          <div>
            <label className="block font-medium text-white mb-1">
              UID{" "}
              <span className="text-green-500">
                {userName && ` ( ${userName} ) `}
                {userEmail && `  - ${userEmail}  `}
              </span>
            </label>
            <input
              type="text"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md"
              placeholder="Enter UID"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block font-medium text-white mb-1">
              Deposit Amount
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 mb-2 border text-gray-700 bg-white border-gray-300 rounded-md"
              placeholder="Enter amount to transfer"
            />

            {/* Plan Preview */}
            {plan && (
              <div className="mt-2 text-sm text-yellow-300">
                <strong>{plan.name}</strong> → ROI: {plan.roi}
              </div>
            )}
          </div>

          {/* Remark */}
          <div>
            <label className="block font-medium text-white mb-1">Remark</label>
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md"
              placeholder="Remark (optional)"
            />
          </div>

          <button
            type="submit"
            className=" text-white px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition"
          >
            Deposit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositeToUser;
