import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { FaUsers, FaGift } from "react-icons/fa";

const ReferBonus = () => {
  const { getCustomerProfileDetails } = useContext(CustomerContext);
  const [customerProfileData, setCustomerProfileData] = useState();

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      setCustomerProfileData(data);
    };
    fetchCustomerProfileDetails();
  }, []);

  // Bonus Tiers (configurable later if needed)
  const bonusTiers = [
    { directs: 10, bonus: 30 },
    { directs: 20, bonus: 70 },
    { directs: 30, bonus: 150 },
  ];

  // Get user’s current direct referrals count (fallback 0)
  const directReferrals = customerProfileData?.referredUserHistory?.length || 0;

  return (
    <div className="bg-[#030626] w-full  mt-2 rounded-xl shadow-lg mt-10 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3">
        <h2 className="text-white font-semibold text-lg">Referral Bonus</h2>
      </div>

      {/* Bonus Table */}
      <div className="p-5 max-w-3xl mx-auto">
        <table className="w-full text-sm sm:text-base text-center border-collapse overflow-hidden rounded-xl">
          <thead className="bg-zinc-400 text-black">
            <tr>
              <th className="py-3 px-4">🌟 Direct Referrals</th>
              <th className="py-3 px-4">💰 Bonus Income</th>
            </tr>
          </thead>
          <tbody>
            {bonusTiers.map((tier, idx) => (
              <tr
                key={idx}
                className={`${
                  directReferrals >= tier.directs ? "bg-green-300" : "bg-white"
                } border-t`}
              >
                <td className="py-3 px-4 font-semibold">
                  {tier.directs} Direct
                </td>
                <td className="py-3 px-4 font-bold">${tier.bonus}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Current Progress */}
        <div className="mt-5 text-center text-white">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            <FaUsers /> You have{" "}
            <span className="text-yellow-300">{directReferrals}</span> Direct
            Referrals
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <FaGift className="text-yellow-400" />
            {directReferrals >= 30
              ? "🎉 You unlocked the max bonus!"
              : `Reach the next tier to earn more bonuses!`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferBonus;
