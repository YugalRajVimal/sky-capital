import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const TransferToMainWallet = () => {
  //   const {  } = useContext(CustomerContext);

  const { getCustomerProfileDetails, transferMoneyToMainWallet } =
    useContext(CustomerContext);
  const [customerProfileData, setCustomerProfileData] = useState();

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      setCustomerProfileData(data);
      return;
    };

    fetchCustomerProfileDetails();
  }, []);

  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await transferMoneyToMainWallet(amount, remark);
    if (result) {
      toast.success("Money transferred to main wallet successfully");
      setAmount("");
      setRemark("");
    } else {
      toast.error("Failed to transfer money to main wallet");
    }
  };

  return (
    <div className="p-4 w-full md:w-1/2 mx-auto">
      <div className="bg-[#20265d] shadow rounded-xl overflow-hidden">
        {/* Header */}
        <div className=" px-6 py-3 text-lg font-bold text-white">
          Transfer Amount to Main Wallet
        </div>

        {/* Balance Amount */}
        <div className="px-6 py-4 border-b text-white font-medium">
          Balance Amount:{" "}
          <span className="font-bold text-white">
            ${customerProfileData?.walletBalance?.toFixed(2)}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block font-medium text-white mb-1">
              Transfer Amount
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md transition `}
              placeholder="Enter amount to transfer"
            />
          </div>

          <div>
            <label className="block font-medium text-white mb-1">Remark</label>
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className={`w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md transition `}
              placeholder="Remark (optional)"
            />
          </div>

          <button
            type="submit"
            className=" text-white px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition"
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferToMainWallet;
