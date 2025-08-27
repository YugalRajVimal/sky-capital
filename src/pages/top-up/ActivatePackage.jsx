import { useState } from "react";

const ActivatePackage = () => {
  const [userId, setUserId] = useState("");
  const [plan, setPlan] = useState("");
  const [walletType, setWalletType] = useState("wallet");

  return (
    <div className="bg-[#050a1e] rounded-xl shadow-lg max-w-3xl  mx-auto mt-10">
      {/* Header */}
      <div className=" px-4 py-3 rounded-t-xl">
        <h2 className="text-white font-bold text-lg">Activate By User ID</h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Wallet Option */}
        <div className="flex items-center space-x-2 text-[#fff] text-sm sm:text-base">
          <input
            type="radio"
            id="wallet"
            checked={walletType === "wallet"}
            onChange={() => setWalletType("wallet")}
          />
          <label htmlFor="wallet">Wallet Amount 0.00</label>
        </div>

        {/* User ID */}
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
        />

        {/* Select Plan */}
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
        >
          <option value="">Select Plan</option>
          <option value="basic">Basic Plan</option>
          <option value="standard">Standard Plan</option>
          <option value="premium">Premium Plan</option>
        </select>

        {/* Activate Button */}
        <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded-md transition w-fit">
          Activate
        </button>
      </div>
    </div>
  );
};

export default ActivatePackage;
