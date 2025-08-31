import React, { useContext, useEffect, useMemo, useState } from "react";
import { CustomerContext } from "../../../context/CustomerContext";

const ReferTeamIncome = (props) => {
  const { getTeamDetails } = useContext(CustomerContext);
  const { levelIndex } = props;

  const levelIncomePer = [0.05, 0.04, 0.02];

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchLevelUsers = async () => {
      try {
        const data = await getTeamDetails(1);
        const levelsData = data.levels || {};
        const levelUsers = levelsData[levelIndex] || [];

        const filteredUsers = levelUsers.filter(
          (entry) => entry.user?.subscribed === true
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching level team data:", error);
      }
    };

    fetchLevelUsers();
  }, [levelIndex]);

  const filteredUsers = useMemo(() => {
    setCurrentPage(1); // reset to page 1 on new search
    return users.filter(
      (user) =>
        (user?.user?.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (user?.user?.email || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (user?.user?.phoneNo || "").includes(search)
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / entries);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * entries;
    return filteredUsers.slice(start, start + entries);
  }, [filteredUsers, currentPage, entries]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  return (
    <div className="grow-1 w-full h-full mt-2  p-3 p-5 rounded-2xl bg-[#20265d] shadow-lg overflow-y-auto pb-10 md:pb-3">
      <h2 className="text-xl font-semibold text-white md:px-6 py-3">
        👥 Level {levelIndex} User's Income
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between bg-white gap-3 px-3 sm:px-6 py-4 overflow-auto rounded-t-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Show</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1);
            }}
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
            className="border border-gray-300 text-black rounded px-3 py-1 w-full sm:w-auto text-sm"
            placeholder="Search name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-md mb-10">
        <table className="w-full table-auto text-sm text-center border-t">
          <thead className="bg-gray-100 text-gray-700 font-semibold whitespace-nowrap">
            <tr>
              <th className="p-3">S.N.</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Referral ID</th>
              <th className="p-3">Income</th>
              {/* <th className="p-3">Join Date</th>
              <th className="p-3">Active Date</th> */}
              {/* <th className="p-3">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-6 bg-gray-50"
                >
                  No users in this level
                </td>
              </tr>
            ) : (
              paginatedUsers.map((u, idx) => (
                <tr
                  key={`${u.userId}-${idx}`}
                  className="hover:bg-gray-50 bg-white text-black"
                >
                  <td className="p-2">
                    {(currentPage - 1) * entries + idx + 1}
                  </td>
                  <td className="p-2">{u.userId || "-"}</td>
                  <td className="p-2">{u.user?.name || "-"}</td>
                  <td className="p-2">{u.user?.email || "-"}</td>
                  <td className="p-2">{u.user?.phoneNo || "-"}</td>
                  {/* <td className="p-2">{u.user?.sponsorName || "-"}</td> */}
                  <td className="p-2">{u.user?.referalId}</td>
                  <td className="p-2">
                    ${u.user?.firstInvestment * levelIncomePer[levelIndex]}
                  </td>
                  {/* <td className="p-2">{formatDate(u?.date)}</td>
                  <td className="p-2">{formatDate(u.user?.subscribedOn)}</td> */}
                  {/* <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        u.user?.subscribed ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {u.user?.subscribed ? "Active" : "Inactive"}
                    </span>
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-white gap-2 mb-6">
        <div>
          Showing{" "}
          {filteredUsers.length === 0 ? 0 : (currentPage - 1) * entries + 1} to{" "}
          {Math.min(currentPage * entries, filteredUsers.length)} of{" "}
          {filteredUsers.length} entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferTeamIncome;
