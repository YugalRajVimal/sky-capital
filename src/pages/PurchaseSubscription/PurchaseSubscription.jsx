import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { AdminContext } from "../../Admin/AdminContext/AdminContext";
import { toast } from "react-toastify";
import { IoCopy } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const PurchaseSubscription = () => {
  const { purchaseSubscription } = useContext(CustomerContext);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [hashString, setHashString] = useState("");
  const { getPaymentDetails } = useContext(AdminContext);
  const [showQRCode, setShowQRCode] = useState(false);
  const { logout } = useContext(AuthContext);

  const [oldPaymentLink, setOldPaymentLink] = useState();
  const [QRPath, setQRPath] = useState();

  useEffect(() => {
    const handleGetOldPaymentLink = async () => {
      try {
        const response = await getPaymentDetails();
        setOldPaymentLink(response.paymentLink);
        setQRPath(response.qrPath);
      } catch (error) {
        console.error("Failed to fetch old payment link:", error);
      }
    };
    handleGetOldPaymentLink();
  }, []);

  const handlePurchase = async () => {
    if (paymentScreenshot && hashString) {
      const response = await purchaseSubscription(
        paymentScreenshot,
        hashString
      );
      if (response.status === 211) {
        await logout();
        window.location.href = "/login";
      }
    } else {
      toast.error("Payment screenshot and transaction hash are required.");
    }
  };

  return (
    <div className="bg-gradient-to-br h-full from-[#20265d] to-[#13183a] w-full mt-3 p-6 md:p-10 rounded-3xl shadow-xl text-white overflow-y-auto">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#9ae600] mb-6 text-center">
          Investment Plans
        </h2>
        <div className="text-gray-200 text-lg space-y-3 text-center mb-10">
          <p>
            <span className="font-bold text-yellow-400">Plan 1:</span> $100 –
            $999 → <span className="text-[#9ae600]">0.40%/day</span>
          </p>
          <p>
            <span className="font-bold text-yellow-400">Plan 2:</span> $1000 –
            $4999 → <span className="text-[#9ae600]">0.50%/day</span>
          </p>
          <p>
            <span className="font-bold text-yellow-400">Plan 3:</span> $5000+ →{" "}
            <span className="text-[#9ae600]">0.60%/day</span>
          </p>
          <p className="text-yellow-400 font-semibold">
            ROI will be credited only from Monday to Friday.
          </p>
          <p className="text-yellow-400 font-semibold">
            Earn until 2X of invested amount 🚀
          </p>
        </div>

        {/* Wallet Section */}
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#9ae600]">
            Payment Wallet
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm break-all text-gray-300 flex-1">
              {oldPaymentLink}
            </p>
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(oldPaymentLink);
                toast("Wallet Address Copied");
              }}
              className="p-2 bg-[#9ae600] text-black rounded-lg hover:scale-110 transition"
            >
              <IoCopy />
            </button>
          </div>
          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className="mt-4 px-4 py-2 rounded-xl border border-[#9ae600] text-[#9ae600] hover:bg-[#9ae600] hover:text-black transition"
          >
            {showQRCode ? "Hide QR Code" : "Show QR Code"}
          </button>

          {showQRCode && (
            <div className="flex flex-col items-center mt-6">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${QRPath}`}
                alt="Wallet QR"
                className="w-52 h-52 object-contain rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Upload + Transaction Hash */}
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-md p-6 mb-8">
          <label
            htmlFor="paymentScreenshot"
            className={`block cursor-pointer text-center px-6 py-3 rounded-xl ${
              paymentScreenshot
                ? "bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition`}
          >
            {paymentScreenshot
              ? `Uploaded: ${paymentScreenshot.name}`
              : "Upload Payment Screenshot"}
          </label>
          <input
            type="file"
            id="paymentScreenshot"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setPaymentScreenshot(e.target.files[0])}
            className="hidden"
          />

          <div className="mt-6">
            <input
              type="text"
              id="hashString"
              value={hashString}
              onChange={(e) => setHashString(e.target.value)}
              placeholder="Enter your Transaction Hash"
              className="w-full px-4 py-3 rounded-xl border border-gray-500 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9ae600]"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handlePurchase}
          className="w-full md:w-auto px-10 py-3 text-lg font-bold rounded-xl bg-[#9ae600] text-black shadow-lg hover:scale-105 hover:shadow-xl transition"
        >
          Purchase Now
        </button>
      </div>
    </div>
  );
};

export default PurchaseSubscription;
