import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const Withdraw = () => {
  const { sendWithdrawalRequest } = useContext(CustomerContext);

  const { getCustomerProfileDetails } = useContext(CustomerContext);
  const [customerProfileData, setCustomerProfileData] = useState();
  const [selectedWallet, setSelectedWallet] = useState();

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      setCustomerProfileData(data);
      return;
    };

    fetchCustomerProfileDetails();
  }, []);

  const [requestAmount, setRequestAmount] = useState(0);

  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requestAmount || !walletAddress) {
      toast.error("Both request amount and wallet address are required.");
      return;
    }
    await sendWithdrawalRequest(requestAmount, walletAddress);
  };

  return (
    <div className="p-4 w-full md:w-1/2 mx-auto flex justify-center items-center flex-col">
      <div className="bg-[#20265d] w-full shadow rounded-xl overflow-hidden mb-2">
        {/* Header */}
        <div className=" px-6 py-3 text-lg font-bold text-white">
          Withdraw Amount
        </div>

        {/* Balance Amount */}
        <div className="px-6 py-4 border-b text-white font-medium">
          {selectedWallet === "roi" ? "ROI Wallet Balance" : "Main Wallet Balance"}:{" "}
          <span className="font-bold text-white">
            $
            {(selectedWallet === "roi"
              ? customerProfileData?.roiWalletBalance
              : customerProfileData?.mainWalletBalance
            )?.toFixed(2) || "0.00"}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div className="mb-4">
            <label className="block font-medium text-white mb-1">
              Select Widhraw Wallet
            </label>
            <select
              className={`w-full px-3 py-2 border text-gray-700 bg-white border-gray-300 rounded-md transition`}
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
            >
              <option value="main">Main Wallet</option>
              <option value="roi">ROI Wallet</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-white mb-1">
              Request Amount
            </label>
            <input
              type="number"
              required
              value={requestAmount}
              onChange={(e) => setRequestAmount(e.target.value)}
              className={`w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md transition `}
              placeholder="Enter amount to withdraw"
            />
          </div>

          <div className="">
            <label className="block font-medium text-white mb-1">
              Wallet Address
            </label>
            <div className="flex items-center">
              <input
                type="text"
                required
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className={`w-full px-3 py-2 border text-gray-700 bg-white border-gray-300 rounded-md transition mr-2`}
                placeholder="Enter Wallet Address"
              />
              <button
                onClick={() =>
                  navigator.clipboard
                    .readText()
                    .then((text) => setWalletAddress(text))
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Paste
              </button>
            </div>
          </div>

          <button
            type="submit"
            className=" text-white px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
      <p className="text-white">
        Withdrawal will be approved within 24–48 hrs.
      </p>
    </div>
  );
};

export default Withdraw;
