import { useState, useContext } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { toast } from "react-toastify";

const UpdateBank = () => {
  const [idType, setIdType] = useState("");
  const [bepAddress, setBepAddress] = useState("");

  const { updateBankDetails } = useContext(CustomerContext);
  const handleUpdateBankDetails = async () => {
    if (!idType || !bepAddress) {
      toast.error("Please fill all details.");
      return; // Added return statement to exit early if any field is empty
    }
    await updateBankDetails(idType, bepAddress);
  };

  return (
    <div className="flex h-[90vh] w-full sm:h-full flex justify-center items-center rounded-md">
      {/* Main Content */}
      <main className="flex-1 p-4 w-full">
        {/* PAYMENT OPTION BOX */}
        <div className="bg-[#030626] rounded-xl overflow-hidden shadow-lg max-w-xl mx-auto w-full">
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-bold text-white tracking-wide text-base sm:text-lg">
              Update Wallet Details
            </h3>
          </div>
          {/* Body */}
          <div className="p-4">
            <label className="block mt-2 mb-1 text-white font-semibold text-sm sm:text-base">
              Network Type
            </label>
            <input
              type="text"
              placeholder="Network Type"
              value={idType}
              onChange={(e) => setIdType(e.target.value)}
              className={`w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md transition`}
              id="id-type-input"
            />
            <label className="block mb-1 text-white font-semibold text-sm sm:text-base">
              Wallet Address
            </label>
            <input
              type="text"
              placeholder="Bep20 Address"
              value={bepAddress}
              onChange={(e) => setBepAddress(e.target.value)}
              className={`w-full px-3 py-2 mb-4 border text-gray-700 bg-white border-gray-300 rounded-md transition`}
              id="payment-id-input"
            />

            <button
              onClick={handleUpdateBankDetails}
              className="bg-[#9ae600] hover:bg-[#030626] text-black font-bold py-2 px-4 rounded my-4"
            >
              Update Wallet Details
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateBank;
