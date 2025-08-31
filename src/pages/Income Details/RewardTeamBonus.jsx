import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { FaRegCalendarAlt } from "react-icons/fa";

const RewardTeamBonus = () => {
  const { getCustomerProfileDetails, getUserRoyaltyIncomeDetails } =
    useContext(CustomerContext);

  const [customerProfileData, setCustomerProfileData] = useState();
  const [royaltiesDetails, setRoyaltiesDetails] = useState([]);
  const [totalRoyaltyReward, setTotalRoyaltyReward] = useState(0);
  const [
    rewardTeamBusinessIncomeLevelPaidFlagData,
    setRewardTeamBusinessIncomeLevelPaidFlagData,
  ] = useState();

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      // setCustomerProfileData(data);
      setRewardTeamBusinessIncomeLevelPaidFlagData(
        data?.rewardTeamBusinessIncomeLevelPaidFlag
      );
      // console.log(rewardTeamBusinessIncomeLevelPaidFlagData);
    };

    const handleGetUserRoyaltyDetails = async () => {
      const royaltyDetails = await getUserRoyaltyIncomeDetails();
      setRoyaltiesDetails(royaltyDetails.data);
      setTotalRoyaltyReward(royaltyDetails.royaltyIncome || 0);
    };

    fetchCustomerProfileDetails();
    handleGetUserRoyaltyDetails();
  }, []);

  // Rewards Config (can later be moved to DB/config file)
  const rewardsConfig = [
    { teamBusiness: 5000, reward: 100 },
    { teamBusiness: 10000, reward: 200 },
    { teamBusiness: 20000, reward: 300 },
    { teamBusiness: 40000, reward: 500 },
    { teamBusiness: 70000, reward: 700 },
    { teamBusiness: 100000, reward: 1000 },
    { teamBusiness: 200000, reward: 2000 },
    { teamBusiness: 500000, reward: 5000 },
    { teamBusiness: 1000000, reward: 10000 },
    { teamBusiness: 2500000, reward: 20000 },
  ];

  return (
    <div className="grow-1 w-full h-full mt-2  p-3 p-5 rounded-2xl bg-[#20265d] shadow-lg overflow-y-auto pb-10 md:pb-3">
      {/* Header */}
      <div className="px-4 py-3">
        <h2 className="text-white font-semibold text-lg">
          Reward Team Business Income
        </h2>
      </div>

      {/* Rewards Info Section */}
      <div className="p-5 bg-white rounded-xl mx-3 mb-6 shadow max-w-3xl mx-auto">
        <p className="text-sm text-gray-700 mb-4">
          Rewards Team Business are based on{" "}
          <span className="font-semibold">50% volume from one leg</span> and{" "}
          <span className="font-semibold">
            50% cumulative volume from other legs
          </span>
          .
        </p>

        {/* Rewards Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm text-center">
            <thead className="bg-gray-400 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-2 border">Team Business</th>
                <th className="px-4 py-2 border">Reward</th>
              </tr>
            </thead>
            <tbody>
              {rewardsConfig.map((row, idx) => (
                <tr
                  key={idx}
                  className={` hover:bg-gray-50 ${
                    rewardTeamBusinessIncomeLevelPaidFlagData?.[idx] // works if keys are numbers
                      ? "bg-green-400"
                      : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 border">
                    ${row.teamBusiness.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">
                    ${row.reward.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 🔷 Reusable Card Component
const Card = ({ title, subtitle, icon }) => (
  <div className="bg-white w-full text-black p-4 mx-auto rounded-lg relative min-h-[100px] shadow flex flex-col justify-center items-center">
    <div className="text-sm text-gray-600">{subtitle}</div>
    <div className="text-xl md:text-2xl font-bold">{title}</div>
    <div className="absolute top-2 right-2 bg-blue-100 p-1 rounded shadow">
      {icon}
    </div>
  </div>
);

export default RewardTeamBonus;
