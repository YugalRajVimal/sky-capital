import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const DepositeToUser = () => {
  const { transferAmount, fetchUserName } = useContext(CustomerContext);

  const { getCustomerProfileDetails } = useContext(CustomerContext);
  const [customerProfileData, setCustomerProfileData] = useState();
  const [userName, setUserName] = useState();

  const [remark, setRemark] = useState("");
  const [userId, setUserId] = useState(""); // Added userId field

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      setCustomerProfileData(data);
      return;
    };

    fetchCustomerProfileDetails();
  }, []);

  useEffect(() => {
    if (userId) {
      const handleFetchUserName = async (userId) => {
        const data = await fetchUserName(userId);
        setUserName(data.name);
        return;
      };

      handleFetchUserName(userId);
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await transferAmount(userId, remark); // Added userId to sendTransferRequest
  };

  return (
    <div className="p-4 w-full md:w-1/2 mx-auto">
      <div className="bg-[#20265d] shadow rounded-xl overflow-hidden">
        {/* Header */}
        <div className=" px-6 py-3 text-lg font-bold text-white">
          Deposit for User
        </div>

        {/* Balance Amount */}
        <div className="px-6 py-4 border-b text-white font-medium">
          Commission Balance Amount:{" "}
          <span className="font-bold text-white">
            ${customerProfileData?.walletBalance.toFixed(2)}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block font-medium text-white mb-1">
              UID{" "}
              <span className="text-green-500">
                {userName && ` ( ${userName} ) `}
              </span>
            </label>
            <input
              type="text"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={`w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md transition `}
              placeholder="Enter UID"
            />
          </div>
          {/* <div>
            <label className="block font-medium text-white mb-1">
              Deposit Amount
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md transition `}
              placeholder="Enter amount to transfer"
            />
          </div> */}

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
            Deposit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositeToUser;
