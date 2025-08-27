import React, { useContext, useEffect, useState } from "react";
import { FaWhatsapp, FaCopy, FaTelegram } from "react-icons/fa";
import { CustomerContext } from "../context/CustomerContext";
import { toast } from "react-toastify";

const ReferralLinkBox = () => {
  const [referralLink, setReferralLink] = useState("");
  const { getReferalDetails } = useContext(CustomerContext);

  useEffect(() => {
    const fetchReferralDetails = async () => {
      const { referalId, name, message } = await getReferalDetails();
      if (!referalId || !name) {
        setReferralLink(
          message || "Activate your subscription to unlock referral link."
        );
      } else {
        setReferralLink(
          `${
            import.meta.env.VITE_DOMAIN
          }/signup?referId=${referalId}&name=${encodeURIComponent(name)}`
        );
      }
    };
    fetchReferralDetails();
  }, [getReferalDetails]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };

  return (
    <div className="bg-[#20265d]/90 max-w-7xl mx-auto w-full backdrop-blur-xl mx-5 mt-10 p-6 rounded-3xl shadow-xl border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        🔗 Your Referral Link
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl">
        {/* Referral Input with Copy */}
        <div className="flex items-center w-full bg-gray-100 rounded-xl shadow-inner">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 bg-transparent p-3 rounded-l-xl text-gray-900 font-mono text-sm sm:text-base focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 transition rounded-r-xl flex items-center justify-center"
          >
            <FaCopy className="text-gray-800" />
          </button>
        </div>

        {/* Share Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              referralLink
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-md transition"
          >
            <FaTelegram className="text-lg" /> Telegram
          </a>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-md transition"
          >
            <FaWhatsapp className="text-lg" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReferralLinkBox;
