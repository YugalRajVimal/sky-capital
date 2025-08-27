import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../AdminContext/AdminContext";
// import { CustomerContext } from "../../context/CustomerContext";

const TenDaysRoyaltyAchiever = () => {
  const [allWeekRoyaltyAchievers, setAllWeekRoyaltyAchievers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [entries, setEntries] = useState(10);

  const { getRoyaltyAchievers } = useContext(AdminContext);

  useEffect(() => {
    const handleGetAllWeekRoyaltyAchievers = async () => {
      try {
        const achievers = await getRoyaltyAchievers();
        if (achievers.TenDaysRoyaltyAchiever) {
          console.log(achievers.TenDaysRoyaltyAchiever);
          const temp = achievers.TenDaysRoyaltyAchiever;
          setAllWeekRoyaltyAchievers(temp);
          setFilteredTeam(temp); // ✅ initialize filteredTeam
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetAllWeekRoyaltyAchievers();
  }, []);

  useEffect(() => {
    const filtered = allWeekRoyaltyAchievers?.filter((entry) => {
      const user = entry?._id;
      return (
        entry?.name?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.email?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.phoneNo?.includes(search)
      );
    });
    setFilteredTeam(filtered);
  }, [search]); // ✅ depend on both

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  return (
    <div className="grow-1 mx-2 sm:mx-5 mt-6 p-3 sm:p-5 rounded-2xl bg-[#20265d] shadow-lg h-full overflow-y-auto">
      <h2 className="text-base sm:text-xl font-semibold  text-white px-4 py-2 sm:py-3 rounded-t-xl">
        👥 Ten Days Royalty Achiever List
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between bg-white gap-3 px-3 sm:px-6 py-4 rounded-t-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Show</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm font-medium text-gray-700">entries</span>
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 mr-2">
            Search:
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-1 w-full sm:w-auto text-sm"
            placeholder="Search name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-md">
        <table className="min-w-[900px] w-full table-auto text-sm text-center border-t">
          <thead className="bg-gray-100 text-gray-700 font-semibold whitespace-nowrap">
            <tr>
              <th className="p-3">S.N.</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Sponsor ID</th>
              <th className="p-3">Referral ID</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeam.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-6 bg-gray-50"
                >
                  No data available in table
                </td>
              </tr>
            ) : (
              filteredTeam.slice(0, entries).map((user, index) => {
                return (
                  <tr
                    key={`${user.userId?._id}-${index}`}
                    className="hover:bg-gray-50 bg-white"
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{user.userId?._id}</td>
                    <td className="p-2">{user?.userId?.name || "-"}</td>
                    <td className="p-2">{user?.userId?.email || "-"}</td>
                    <td className="p-2">{user?.userId?.phoneNo || "-"}</td>
                    <td className="p-2">{user?.userId?.sponsorId || "-"}</td>
                    <td className="p-2">{user?.userId?.referalId || "-"}</td>

                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          user?.userId?.subscribed
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user?.userId?.subscribed ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-gray-600 gap-2 text-white">
        <div>
          Showing {filteredTeam.length === 0 ? 0 : 1} to{" "}
          {Math.min(entries, filteredTeam.length)} of {filteredTeam.length}{" "}
          entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black"
            disabled
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black"
            disabled
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenDaysRoyaltyAchiever;
