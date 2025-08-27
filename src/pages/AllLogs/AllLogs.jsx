import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const AllLogs = () => {
  const { getTeamDetails } = useContext(CustomerContext);
  const [directTeam, setDirectTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDirectTeam = async () => {
      const data = await getTeamDetails(0);
      if (data?.users) {
        setDirectTeam(data?.users);
      }
    };
    fetchDirectTeam();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entries]);

  // Filter by search
  const filteredTeam = directTeam.filter(
    (entry) =>
      entry?.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      entry?.userId?.email?.toLowerCase().includes(search.toLowerCase()) ||
      entry?.userId?.phoneNo?.includes(search)
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredTeam.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const paginatedData = filteredTeam.slice(startIndex, endIndex);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  return (
    <div className="grow-1 w-full h-full mt-2  p-3 sm:p-5 rounded-2xl bg-[#20265d] shadow-lg overflow-y-auto">
      <h2 className="text-base sm:text-xl font-semibold text-white pr-6 py-2 sm:py-3 rounded-t-xl">
        👥 Direct Team Income
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
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Type of Log</th>
              <th className="p-3">Credited In</th>
              {/* (Wallet Type / Invested) */}
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-6 bg-gray-50"
                >
                  No data available in table
                </td>
              </tr>
            ) : (
              paginatedData.map((entry, index) => {
                const user = entry;
                return (
                  <tr
                    key={`${entry.userId}-${index}`}
                    className="hover:bg-gray-50 bg-white"
                  >
                    <td className="p-2">{startIndex + index + 1}</td>
                    <td className="p-2">
                      {entry?.createdAt
                        ? new Date(entry.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-2">
                      {entry?.createdAt
                        ? new Date(entry.createdAt).toLocaleTimeString()
                        : "N/A"}
                    </td>
                    <td className="p-2">{entry?.rewardType || "-"}</td>
                    <td className="p-2">{entry?.creditedWallet || "-"}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          entry?.status === "completed"
                            ? "bg-green-500"
                            : entry?.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {entry?.status || "N/A"}
                      </span>
                    </td>
                    <td className="p-2">
                      ${Number(entry?.amount || 0).toFixed(2)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Total Income */}
      <div className="text-white text-lg font-semibold mt-4">
        Total Income: ${filteredTeam.length}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-gray-600 gap-2 text-white mb-6">
        <div>
          Showing {filteredTeam.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, filteredTeam.length)} of {filteredTeam.length}{" "}
          entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || filteredTeam.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllLogs;
