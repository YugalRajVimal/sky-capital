import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../AdminContext/AdminContext";

const SubscribedUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { getAllSubscribedUsers } = useContext(AdminContext);

  useEffect(() => {
    const handleGetAllSubscribedUsers = async () => {
      try {
        const users = await getAllSubscribedUsers();
        if (users) {
          setAllUsers(users);
          setFilteredTeam(users);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleGetAllSubscribedUsers();
  }, []);

  useEffect(() => {
    const filtered = allUsers?.filter(
      (entry) =>
        entry?.name?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.email?.toLowerCase().includes(search.toLowerCase()) ||
        entry?.phoneNo?.includes(search)
    );
    setFilteredTeam(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [search, allUsers]);

  const totalPages = Math.ceil(filteredTeam.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentData = filteredTeam.slice(startIndex, endIndex);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  return (
    <div className="grow-1 w-full p-3 sm:p-5 mt-2 rounded-2xl bg-[#20265d] shadow-lg h-full overflow-y-auto">
      <h2 className="text-base sm:text-xl font-semibold text-white px-4 py-2 sm:py-3 rounded-t-xl">
        👥 All Subscribed Users List
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between bg-white gap-3 px-3 sm:px-6 py-4 rounded-t-md">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Show</label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={entries}
            onChange={(e) => {
              setEntries(Number(e.target.value));
              setCurrentPage(1); // Reset to first page on entries change
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
              <th className="p-3">Active Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-6 bg-gray-50"
                >
                  No data available in table
                </td>
              </tr>
            ) : (
              currentData.map((user, index) => (
                <tr
                  key={`${user._id}-${index}`}
                  className="hover:bg-gray-50 bg-white"
                >
                  <td className="p-2">{startIndex + index + 1}</td>
                  <td className="p-2">{user?._id}</td>
                  <td className="p-2">{user?.name || "-"}</td>
                  <td className="p-2">{user?.email || "-"}</td>
                  <td className="p-2">{user?.phoneNo || "-"}</td>
                  <td className="p-2">{user?.sponsorId || "-"}</td>
                  <td className="p-2">{user?.referalId || "-"}</td>
                  <td className="p-2">{formatDate(user?.subscribedOn)}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        user?.subscribed ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user?.subscribed ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-sm text-gray-600 gap-2 text-white">
        <div>
          Showing {filteredTeam.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, filteredTeam.length)} of {filteredTeam.length}{" "}
          entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-black"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribedUsers;
