import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { FaRegCalendarAlt } from "react-icons/fa";

const RewardTeamBonus = () => {
  const { getCustomerProfileDetails, getUserRoyaltyIncomeDetails } =
    useContext(CustomerContext);

  const [customerProfileData, setCustomerProfileData] = useState();
  const [royaltiesDetails, setRoyaltiesDetails] = useState([]);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRoyaltyReward, setTotalRoyaltyReward] = useState(0);

  useEffect(() => {
    const fetchCustomerProfileDetails = async () => {
      const data = await getCustomerProfileDetails();
      setCustomerProfileData(data);
    };

    const handleGetUserRoyaltyDetails = async () => {
      const royaltyDetails = await getUserRoyaltyIncomeDetails();
      setRoyaltiesDetails(royaltyDetails.data);

      setTotalRoyaltyReward(royaltiesDetails.royaltyIncome || 0);
    };

    fetchCustomerProfileDetails();
    handleGetUserRoyaltyDetails();
  }, []);

  const totalPages =
    entries === "all" ? 1 : Math.ceil(royaltiesDetails.length / entries);

  const startIdx = entries === "all" ? 0 : (currentPage - 1) * entries;
  const endIdx =
    entries === "all" ? royaltiesDetails.length : startIdx + entries;

  const paginatedData = royaltiesDetails.slice(startIdx, endIdx);

  const handleEntriesChange = (e) => {
    const value = e.target.value;
    setEntries(value === "all" ? "all" : Number(value));
    setCurrentPage(1); // Reset to first page on entry change
  };

  const businessReports = [
    {
      title: `$${totalRoyaltyReward}`,
      value: `$${totalRoyaltyReward}`,
      icon: <FaRegCalendarAlt className="text-red-500" />,
    },
  ];

  return (
    <div className="bg-[#20265d] w-full mt-2 rounded-xl shadow-lg  mt-10 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3">
        <h2 className="text-white font-semibold text-lg">Royalty Income</h2>
      </div>

      {/* Status Cards */}
      <div className="flex flex-wrap items-center justify-center mx-auto w-1/2 px-4 py-3 gap-4">
        <div className="w-full flex justify-center items-center gap-4 mb-6">
          {businessReports.map((item, idx) => (
            <Card
              key={idx}
              title={item.value}
              subtitle={"Royalty Reward"}
              icon={item.icon}
            />
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className=" p-3 sm:p-5 rounded-2xl bg-[#20265d] overflow-y-auto">
        {/* <h2 className="text-base sm:text-xl font-semibold text-white py-2 sm:py-3 rounded-t-xl">
          👥 Royalty Income Details
        </h2> */}

        {/* Controls */}
        {/* <div className="flex flex-col sm:flex-row justify-between bg-white gap-3 px-3 sm:px-6 py-4 rounded-t-md">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Show</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={entries}
              onChange={handleEntriesChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="all">See All</option>
            </select>
            <span className="text-sm font-medium text-gray-700">entries</span>
          </div>
        </div> */}

        {/* Table */}
        {/* <div className="overflow-x-auto ">
          <table className="min-w-[900px] w-full table-auto text-sm text-center border-t">
            <thead className="bg-gray-100 text-gray-700 font-semibold whitespace-nowrap">
              <tr>
                <th className="p-3">S.N.</th>
                <th className="p-3">User ID</th>
                <th className="p-3">Royalty Type</th>
                <th className="p-3">Reward</th>
                <th className="p-3">From Date</th>
                <th className="p-3">To Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-6 bg-gray-50"
                  >
                    No data available in table
                  </td>
                </tr>
              ) : (
                paginatedData.map((entry, index) => (
                  <tr key={entry._id} className="hover:bg-gray-50 bg-white">
                    <td className="p-2">
                      {(currentPage - 1) * (entries === "all" ? 1 : entries) +
                        index +
                        1}
                    </td>
                    <td className="p-2">{entry?.userId}</td>
                    <td className="p-2">
                      {entry?.royaltyType === "week"
                        ? "Weekly"
                        : entry?.royaltyType === "tenDays"
                        ? "Ten Days"
                        : "-"}
                    </td>
                    <td className="p-2">${entry?.royaltyReward || 0}</td>
                    <td className="p-2">
                      {new Date(entry?.dateFrom).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {new Date(entry?.dateTo).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          entry?.status === "paid"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {entry?.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div> */}

        {/* Total Income */}
        {/* <div className="text-white text-lg font-semibold mt-4">
          Total Entries: {royaltiesDetails.length}
        </div> */}

        {/* Pagination */}
        {/* {entries !== "all" && (
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-white gap-2 mb-6">
            <div>
              Showing {royaltiesDetails.length === 0 ? 0 : startIdx + 1} to{" "}
              {Math.min(endIdx, royaltiesDetails.length)} of{" "}
              {royaltiesDetails.length} entries
            </div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 border rounded ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )} */}
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
