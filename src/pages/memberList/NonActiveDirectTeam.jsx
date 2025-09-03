import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const NonActiveDirectTeamTable = () => {
  const { getTeamDetails } = useContext(CustomerContext);
  const [directTeam, setDirectTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDirectTeam = async () => {
      const data = await getTeamDetails(0);
      if (data?.nonSubscribedUsers) {
        const nonActiveUsers = data.nonSubscribedUsers.filter(
          (user) => !user?.subscribed
        );
        setDirectTeam(nonActiveUsers);
      }
    };
    fetchDirectTeam();
  }, []);

  const filteredTeam = directTeam.filter(
    (entry) =>
      entry?.name?.toLowerCase().includes(search.toLowerCase()) ||
      entry?.email?.toLowerCase().includes(search.toLowerCase()) ||
      entry?.phoneNo?.includes(search)
  );

  const totalPages = Math.ceil(filteredTeam.length / entries);
  const startIdx = (currentPage - 1) * entries;
  const paginatedData = filteredTeam.slice(startIdx, startIdx + entries);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [entries, search]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  return (
    <div className="grow-1 w-full h-full mt-2  p-3 sm:p-5 rounded-2xl bg-[#030626] shadow-lg overflow-y-auto">
      <h2 className="text-base sm:text-xl font-semibold text-white px-4 py-2 sm:py-3 rounded-t-xl">
        👥 Non Active Direct Team
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
              {/* <th className="p-3">Sponsor ID</th> */}
              {/* <th className="p-3">Active Date</th> */}
              {/* <th className="p-3">Status</th> */}
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
                    <td className="p-2">{startIdx + index + 1}</td>
                    <td className="p-2">{entry?._id}</td>
                    <td className="p-2">{user?.name || "-"}</td>
                    <td className="p-2">{user?.email || "-"}</td>
                    <td className="p-2">{user?.phoneNo || "-"}</td>
                    {/* <td className="p-2">{user?.sponsorId || "-"}</td>
                    <td className="p-2">{formatDate(user?.subscribedOn)}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          user?.subscribed ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {user?.subscribed ? "Active" : "Inactive"}
                      </span>
                    </td> */}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-gray-600 gap-2 text-white mb-6">
        <div>
          Showing{" "}
          {filteredTeam.length === 0
            ? 0
            : `${startIdx + 1} to ${Math.min(
                startIdx + entries,
                filteredTeam.length
              )}`}{" "}
          of {filteredTeam.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonActiveDirectTeamTable;
